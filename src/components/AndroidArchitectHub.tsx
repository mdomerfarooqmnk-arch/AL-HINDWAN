import React, { useState } from 'react';
import { Smartphone, Copy, Check, Code, FileText, Shield, Layers, Terminal } from 'lucide-react';

interface AndroidArchitectHubProps {
  onOpenApkModal?: () => void;
}

export const AndroidArchitectHub: React.FC<AndroidArchitectHubProps> = ({ onOpenApkModal }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'bookingVM' | 'trackingService' | 'dataModels' | 'rules' | 'manifest'>('bookingVM');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  const codeSnippets = {
    bookingVM: `package com.alhindwan.travels.ui.viewmodel

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.alhindwan.travels.data.model.*
import com.alhindwan.travels.data.repository.BookingRepository
import com.alhindwan.travels.data.repository.StorageRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class BookingUiState(
    val currentStep: Int = 1,
    val selectedPackage: TravelPackage? = null,
    val sharingType: String = "Double",
    val departureDate: String = "",
    val passengers: List<Passenger> = emptyList(),
    val passportFrontUri: Uri? = null,
    val passportBackUri: Uri? = null,
    val panCardUri: Uri? = null,
    val photoWhiteBgUri: Uri? = null,
    val isLoading: Boolean = false,
    val bookingReference: String? = null,
    val errorMessage: String? = null
)

class BookingViewModel(
    private val bookingRepository: BookingRepository,
    private val storageRepository: StorageRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(BookingUiState())
    val uiState: StateFlow<BookingUiState> = _uiState.asStateFlow()

    fun selectPackage(pkg: TravelPackage, date: String, sharing: String) {
        _uiState.update {
            it.copy(
                selectedPackage = pkg,
                departureDate = date,
                sharingType = sharing
            )
        }
    }

    fun updatePassengers(passengersList: List<Passenger>) {
        _uiState.update { it.copy(passengers = passengersList) }
    }

    fun setDocumentUri(type: DocumentType, uri: Uri) {
        _uiState.update { state ->
            when (type) {
                DocumentType.PASSPORT_FRONT -> state.copy(passportFrontUri = uri)
                DocumentType.PASSPORT_BACK -> state.copy(passportBackUri = uri)
                DocumentType.PAN_CARD -> state.copy(panCardUri = uri)
                DocumentType.WHITE_BG_PHOTO -> state.copy(photoWhiteBgUri = uri)
            }
        }
    }

    fun nextStep() {
        if (_uiState.value.currentStep < 4) {
            _uiState.update { it.copy(currentStep = it.currentStep + 1) }
        }
    }

    fun previousStep() {
        if (_uiState.value.currentStep > 1) {
            _uiState.update { it.copy(currentStep = it.currentStep - 1) }
        }
    }

    fun finalizeBooking(userId: String) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            try {
                val state = _uiState.value
                val bookingId = "bk_\${System.currentTimeMillis()}"

                // Upload documents into storage path: documents/{userId}/{bookingId}/
                val passportFrontUrl = state.passportFrontUri?.let {
                    storageRepository.uploadDocument(userId, bookingId, "passport_front.jpg", it)
                } ?: ""
                val passportBackUrl = state.passportBackUri?.let {
                    storageRepository.uploadDocument(userId, bookingId, "passport_back.jpg", it)
                } ?: ""
                val panCardUrl = state.panCardUri?.let {
                    storageRepository.uploadDocument(userId, bookingId, "pan_card.jpg", it)
                } ?: ""
                val photoUrl = state.photoWhiteBgUri?.let {
                    storageRepository.uploadDocument(userId, bookingId, "white_photo.jpg", it)
                } ?: ""

                val refNo = "ALH-2026-UMR-\${(1000..9999).random()}"
                val newBooking = Booking(
                    bookingId = bookingId,
                    referenceNo = refNo,
                    userId = userId,
                    packageId = state.selectedPackage?.id ?: "",
                    packageTitle = state.selectedPackage?.title ?: "",
                    sharingType = state.sharingType,
                    departureDate = state.departureDate,
                    passengers = state.passengers,
                    documents = DocumentLinks(
                        passportFront = passportFrontUrl,
                        passportBack = passportBackUrl,
                        panCard = panCardUrl,
                        whiteBgPhoto = photoUrl
                    ),
                    status = "Confirmed",
                    createdAt = System.currentTimeMillis()
                )

                bookingRepository.saveBooking(newBooking)
                _uiState.update {
                    it.copy(isLoading = false, bookingReference = refNo, currentStep = 4)
                }
            } catch (e: Exception) {
                _uiState.update { it.copy(isLoading = false, errorMessage = e.localizedMessage) }
            }
        }
    }
}`,

    trackingService: `package com.alhindwan.travels.service

import android.app.*
import android.content.Context
import android.content.Intent
import android.location.Location
import android.os.IBinder
import android.os.Looper
import androidx.core.app.NotificationCompat
import com.alhindwan.travels.R
import com.google.android.gms.location.*
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.GeoPoint

/**
 * Background Tracking Service for Al Hindwan Pilgrims.
 * Implements FusedLocationProviderClient and Kaaba 300m Geofencing Logic.
 */
class TrackingService : Service() {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private val firestore = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    companion object {
        const val CHANNEL_ID = "al_hindwan_tracking_channel"
        const val NOTIFICATION_ID = 1447

        // Exact coordinates of the Holy Kaaba in Makkah
        const val KAABA_LAT = 21.4225
        const val KAABA_LNG = 39.8262
        const val TAWAF_THRESHOLD_METERS = 300.0f
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                result.lastLocation?.let { location ->
                    evaluateGeofenceAndSyncFirestore(location)
                }
            }
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val notification = buildTrackingNotification("Tracking active: Pilgrimage Safety Guard")
        startForeground(NOTIFICATION_ID, notification)
        startLocationUpdates()
        return START_STICKY
    }

    private fun startLocationUpdates() {
        val request = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 10000L)
            .setMinUpdateIntervalMillis(5000L)
            .setMinUpdateDistanceMeters(10.0f)
            .build()

        try {
            fusedLocationClient.requestLocationUpdates(request, locationCallback, Looper.getMainLooper())
        } catch (e: SecurityException) {
            e.printStackTrace()
        }
    }

    private fun evaluateGeofenceAndSyncFirestore(location: Location) {
        val kaabaLoc = Location("Kaaba").apply {
            latitude = KAABA_LAT
            longitude = KAABA_LNG
        }
        val distanceToKaaba = location.distanceTo(kaabaLoc)

        // Geofencing Logic: If <= 300m of Kaaba -> "Performing Tawaf"
        val activityStatus = when {
            distanceToKaaba <= TAWAF_THRESHOLD_METERS -> "Performing Tawaf"
            distanceToKaaba <= 650.0f -> "In Haram"
            else -> "At Hotel"
        }

        // Update notification banner
        val updatedNotif = buildTrackingNotification(
            "Status: $activityStatus (\${distanceToKaaba.toInt()}m from Kaaba)"
        )
        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.notify(NOTIFICATION_ID, updatedNotif)

        // Write live telemetry to Firestore 'live_tracking' collection
        val userId = auth.currentUser?.uid ?: return
        val trackingData = hashMapOf(
            "userId" to userId,
            "geoPoint" to GeoPoint(location.latitude, location.longitude),
            "distanceToKaabaMeters" to distanceToKaaba.toInt(),
            "activityStatus" to activityStatus,
            "accuracy" to location.accuracy,
            "timestamp" to com.google.firebase.Timestamp.now()
        )

        firestore.collection("live_tracking").document(userId)
            .set(trackingData)
    }

    private fun buildTrackingNotification(content: String): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Al Hindwan Pilgrim Radar")
            .setContentText(content)
            .setSmallIcon(R.drawable.ic_kaaba)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "Pilgrim Geofencing Tracking",
            NotificationManager.IMPORTANCE_LOW
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

    override fun onDestroy() {
        super.onDestroy()
        fusedLocationClient.removeLocationUpdates(locationCallback)
    }

    override fun onBind(intent: Intent?): IBinder? = null
}`,

    dataModels: `package com.alhindwan.travels.data.model

import com.google.firebase.firestore.GeoPoint

data class User(
    val userId: String = "",
    val email: String = "",
    val fullName: String = "",
    val role: String = "user", // "user" or "admin"
    val phoneNumber: String = "",
    val groupTag: String = "Group Alpha",
    val emergencyContact: String = ""
)

data class TravelPackage(
    val id: String = "",
    val title: String = "",
    val tier: String = "", // VIP Luxury, Deluxe 5-Star, Economy
    val durationDays: Int = 15,
    val priceQuad: Double = 0.0,
    val priceDouble: Double = 0.0,
    val makkahHotel: String = "",
    val makkahDistanceMeters: Int = 50,
    val madinahHotel: String = "",
    val madinahDistanceMeters: Int = 80,
    val airline: String = "",
    val departureDates: List<String> = emptyList(),
    val inclusions: List<String> = emptyList()
)

data class Passenger(
    val fullName: String = "",
    val gender: String = "Male",
    val age: Int = 0,
    val nationality: String = "Indian",
    val passportNumber: String = "",
    val passportExpiry: String = "",
    val panNumber: String = "",
    val phone: String = ""
)

data class DocumentLinks(
    val passportFront: String = "",
    val passportBack: String = "",
    val panCard: String = "",
    val whiteBgPhoto: String = "",
    val verificationStatus: String = "verified"
)

data class Booking(
    val bookingId: String = "",
    val referenceNo: String = "",
    val userId: String = "",
    val packageId: String = "",
    val packageTitle: String = "",
    val sharingType: String = "Double",
    val departureDate: String = "",
    val passengers: List<Passenger> = emptyList(),
    val documents: DocumentLinks = DocumentLinks(),
    val status: String = "Confirmed",
    val createdAt: Long = 0L
)

data class LiveTracking(
    val userId: String = "",
    val geoPoint: GeoPoint = GeoPoint(21.4225, 39.8262),
    val distanceToKaabaMeters: Int = 45,
    val activityStatus: String = "Performing Tawaf", // "Performing Tawaf", "In Haram", "At Hotel", "At Ziyarat"
    val timestamp: Long = 0L
)

enum class DocumentType {
    PASSPORT_FRONT, PASSPORT_BACK, PAN_CARD, WHITE_BG_PHOTO
}`,

    rules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }

    // Packages Collection (Public read, admin write)
    match /packages/{packageId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Bookings Collection (Only user who booked and admin can view/manage)
    match /bookings/{bookingId} {
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // Live Tracking Collection (Kaaba geofence updates)
    match /live_tracking/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }
  }
}

// Firebase Cloud Storage Rules
service firebase.storage {
  match /b/{bucket}/o {
    // KYC Documents directory: documents/{userId}/{bookingId}/{fileName}
    match /documents/{userId}/{bookingId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == userId || 
         firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}`,

    manifest: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.alhindwan.travels">

    <!-- Essential Permissions for Pilgrim Tracking & Document Capture -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:name=".AlHindwanApp"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AlHindwan">

        <!-- Google Maps API Key -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="\${MAPS_API_KEY}" />

        <!-- Foreground Geofencing Service -->
        <service
            android:name=".service.TrackingService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="location" />

        <activity
            android:name=".ui.MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Architect Banner */}
        <div className="bg-[#062e22] text-white rounded-2xl p-6 border border-[#c5a059]/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  Android Studio Architect Blueprint
                </span>
                <span className="text-xs text-emerald-200">Jetpack Compose & Kotlin MVVM</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Production Android Source Code Hub
              </h2>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl">
                Ready-to-use Kotlin source files matching your prompt specifications: ViewModel with StateFlow, FusedLocation TrackingService with 300m Kaaba geofencing, Firestore security rules, and Manifest declarations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onOpenApkModal && (
                <button
                  onClick={onOpenApkModal}
                  className="px-4 py-2.5 rounded-lg bg-emerald-950/90 border border-amber-400 text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-emerald-900 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Deploy & Download APK</span>
                </button>
              )}

              <button
                onClick={() => copyToClipboard('all', Object.values(codeSnippets).join('\n\n// ==========================================\n\n'))}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] font-bold text-xs flex items-center gap-1.5 shadow hover:brightness-105 cursor-pointer"
              >
                {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied === 'all' ? 'All Files Copied!' : 'Copy Kotlin Code'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Code Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-200 rounded-xl overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveCodeTab('bookingVM')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCodeTab === 'bookingVM' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-emerald-700" />
            <span>BookingViewModel.kt</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('trackingService')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCodeTab === 'trackingService' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>TrackingService.kt (300m Geofence)</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('dataModels')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCodeTab === 'dataModels' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>DataModels.kt</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('rules')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCodeTab === 'rules' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>firestore.rules</span>
          </button>

          <button
            onClick={() => setActiveCodeTab('manifest')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCodeTab === 'manifest' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-700" />
            <span>AndroidManifest.xml</span>
          </button>
        </div>

        {/* Code View Card */}
        <div className="bg-[#0b1320] text-slate-200 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="px-5 py-3 bg-[#080d17] border-b border-slate-800 flex items-center justify-between">
            <span className="font-mono text-xs text-amber-400 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              {activeCodeTab === 'bookingVM' && 'ui/viewmodel/BookingViewModel.kt'}
              {activeCodeTab === 'trackingService' && 'service/TrackingService.kt (FusedLocation)'}
              {activeCodeTab === 'dataModels' && 'data/model/DataModels.kt'}
              {activeCodeTab === 'rules' && 'firestore.rules (Security Lockdown)'}
              {activeCodeTab === 'manifest' && 'AndroidManifest.xml'}
            </span>

            <button
              onClick={() => copyToClipboard(activeCodeTab, codeSnippets[activeCodeTab])}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied === activeCodeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === activeCodeTab ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-5 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed max-h-[550px]">
            {codeSnippets[activeCodeTab]}
          </pre>
        </div>

        {/* Setup Instruction checklist */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
          <h4 className="font-heading text-sm font-bold text-slate-900">
            Android Studio Implementation Steps:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">1. Fused Location Setup</strong>
              Add <code>play-services-location:21.0.1</code> to app <code>build.gradle.kts</code>. Register <code>TrackingService</code> as a foreground location service.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">2. Document Storage Structure</strong>
              Upload passports to Firebase Storage bucket under <code>documents/{'{userId}'}/{'{bookingId}'}/[file].jpg</code>. Deploy the enclosed security rules.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">3. Live Geofence Trigger</strong>
              The service checks <code>distanceToKaaba &lt;= 300.0f</code> and updates <code>activityStatus = "Performing Tawaf"</code> in real time!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
