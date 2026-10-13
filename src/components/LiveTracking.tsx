import React, { useState, useEffect } from 'react';
import { PilgrimLocation } from '../types';
import { MOCK_PILGRIMS, KAABA_COORDS, MINA_COORDS, ARAFAT_COORDS, HARAM_MADINAH_COORDS } from '../data/mockData';
import { getDistanceMeters } from '../services/prayerService';
import {
  Radio, MapPin, Compass, ShieldAlert, CheckCircle2, Battery, RefreshCw,
  Volume2, VolumeX, Navigation, Phone, Users, Flame, Info
} from 'lucide-react';

interface LiveTrackingProps {
  onNotifyAdminSOS?: (pilgrimName: string, message: string) => void;
}

export const LiveTracking: React.FC<LiveTrackingProps> = ({ onNotifyAdminSOS }) => {
  // Current pilgrim position state (starts near Kaaba)
  const [currentLat, setCurrentLat] = useState<number>(21.4225);
  const [currentLng, setCurrentLng] = useState<number>(39.8262);
  const [battery, setBattery] = useState<number>(88);
  const [pilgrimName, setPilgrimName] = useState<string>('Haji Mohammad Farooq');
  const [groupTag, setGroupTag] = useState<string>('Group Alpha (VIP-15)');
  const [sosSent, setSosSent] = useState<boolean>(false);
  const [isPlayingTalbiyah, setIsPlayingTalbiyah] = useState<boolean>(false);

  // Tawaf lap tracker
  const [tawafLap, setTawafLap] = useState<number>(3);

  // Calculate distance to Kaaba in meters
  const distanceToKaaba = getDistanceMeters(currentLat, currentLng, KAABA_COORDS.lat, KAABA_COORDS.lng);

  // Automatic Geofencing Status Computation
  const computeGeofenceStatus = (dist: number, lat: number, lng: number): {
    status: PilgrimLocation['activityStatus'];
    description: string;
    zoneName: string;
    isInKaaba300m: boolean;
  } => {
    // 1. If within 300m of Kaaba -> "Performing Tawaf" (The core requirement from prompt)
    if (dist <= 300) {
      return {
        status: 'Performing Tawaf',
        description: `Pilgrim is within ${dist}m (<300m) radius of the Holy Kaaba. Live geofence detected Tawaf circumambulation.`,
        zoneName: 'Mataf Floor - Al-Masjid Al-Haram',
        isInKaaba300m: true
      };
    }

    // 2. Safa & Marwah Mas'a precinct (~150m-350m east)
    if (dist <= 500 && lng > 39.8268) {
      return {
        status: "Performing Sa'i",
        description: 'Pilgrim is walking between Mount Safa and Mount Marwah corridor.',
        zoneName: "Mas'a Corridor",
        isInKaaba300m: false
      };
    }

    // 3. Inside Grand Mosque courtyard (300m - 650m)
    if (dist <= 650) {
      return {
        status: 'In Haram',
        description: `Pilgrim is in Masjid Al-Haram courtyard (${dist}m from Kaaba). Offering prayers / Qur’an recitation.`,
        zoneName: 'Masjid Al-Haram Courtyard & Expansion',
        isInKaaba300m: false
      };
    }

    // 4. Mina Tent City check
    const distToMina = getDistanceMeters(lat, lng, MINA_COORDS.lat, MINA_COORDS.lng);
    if (distToMina <= 2000) {
      return {
        status: 'At Mina Camp',
        description: 'Pilgrim is located inside the VIP European Tent compound in Mina.',
        zoneName: 'Mina Tent City (Camp Al Hindwan)',
        isInKaaba300m: false
      };
    }

    // 5. Mount Arafat check
    const distToArafat = getDistanceMeters(lat, lng, ARAFAT_COORDS.lat, ARAFAT_COORDS.lng);
    if (distToArafat <= 3000) {
      return {
        status: 'At Plain of Arafat',
        description: 'Pilgrim is present at the sacred grounds of Mount Arafat & Jabal Al-Rahma.',
        zoneName: 'Plain of Arafat',
        isInKaaba300m: false
      };
    }

    // 6. Madinah Prophet's Mosque check
    const distToMadinah = getDistanceMeters(lat, lng, HARAM_MADINAH_COORDS.lat, HARAM_MADINAH_COORDS.lng);
    if (distToMadinah <= 800) {
      return {
        status: 'In Haram',
        description: 'Pilgrim is inside Masjid An-Nabawi courtyard in Madinah.',
        zoneName: 'Masjid An-Nabawi (Madinah)',
        isInKaaba300m: false
      };
    }

    // 7. Clock Tower Hotel (~350m - 500m south)
    if (dist <= 1200) {
      return {
        status: 'At Hotel',
        description: 'Pilgrim is at Fairmont Clock Tower / Abraj Al Bait hotel precinct.',
        zoneName: 'Fairmont Clock Tower Hotel',
        isInKaaba300m: false
      };
    }

    // 8. Default fallback for outer areas
    return {
      status: 'At Ziyarat',
      description: `Pilgrim is on an excursion / Ziyarat visit (${dist}m away from Kaaba).`,
      zoneName: 'Historic Ziyarat Location',
      isInKaaba300m: false
    };
  };

  const geofenceResult = computeGeofenceStatus(distanceToKaaba, currentLat, currentLng);

  // Quick preset location teleporters
  const teleportLocations = [
    {
      name: 'Kaaba Mataf (Tawaf Zone)',
      lat: 21.4225,
      lng: 39.8262,
      note: '45m from Kaaba (Triggers Tawaf)',
      color: 'bg-emerald-700'
    },
    {
      name: "Safa & Marwah (Sa'i)",
      lat: 21.4230,
      lng: 39.8270,
      note: '180m from Kaaba',
      color: 'bg-emerald-800'
    },
    {
      name: 'Clock Tower Hotel',
      lat: 21.4190,
      lng: 39.8258,
      note: '410m from Kaaba',
      color: 'bg-amber-800'
    },
    {
      name: 'Mina European Tents',
      lat: 21.4133,
      lng: 39.8933,
      note: '6.9 km east of Haram',
      color: 'bg-blue-800'
    },
    {
      name: 'Plain of Arafat',
      lat: 21.3549,
      lng: 39.9841,
      note: '18.4 km southeast',
      color: 'bg-stone-800'
    },
    {
      name: 'Cave of Hira (Jabal Nour)',
      lat: 21.4578,
      lng: 39.8592,
      note: '5.2 km northeast (Ziyarat)',
      color: 'bg-teal-800'
    }
  ];

  const handleTriggerSOS = () => {
    setSosSent(true);
    if (onNotifyAdminSOS) {
      onNotifyAdminSOS(
        pilgrimName,
        `EMERGENCY SOS: Haji Farooq triggered distress beacon from ${geofenceResult.zoneName} (${currentLat.toFixed(4)}, ${currentLng.toFixed(4)})!`
      );
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header & Geofencing Status Banner */}
        <div className="bg-gradient-to-r from-[#062e22] via-[#093e2f] to-[#062e22] text-white rounded-2xl p-6 border border-[#c5a059]/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-amber-300 tracking-wider uppercase flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-amber-400" />
                  Live Geofencing & Pilgrim Radar (Active FusedLocation)
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Real-Time Kaaba Geofence & Pilgrim Status
              </h2>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl">
                Background service automatically tracks pilgrim coordinates. If pilgrim is within <strong>300 meters</strong> of the Holy Kaaba, status automatically changes to <strong>"Performing Tawaf"</strong>.
              </p>
            </div>

            {/* Quick stats badge */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-right">
                <span className="text-[10px] text-emerald-300 uppercase block">Distance to Kaaba</span>
                <span className="text-2xl font-bold text-amber-300 font-mono">
                  {distanceToKaaba}m
                </span>
                <span className="text-[10px] text-emerald-200/80 block">
                  {geofenceResult.isInKaaba300m ? '✓ Inside 300m Tawaf Ring' : 'Outside 300m ring'}
                </span>
              </div>

              {/* SOS Emergency button */}
              <button
                type="button"
                onClick={handleTriggerSOS}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  sosSent
                    ? 'bg-red-600 border-red-500 text-white animate-pulse'
                    : 'bg-red-950/70 border-red-800 text-red-200 hover:bg-red-900'
                }`}
              >
                <ShieldAlert className="w-5 h-5 text-red-400 mb-0.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {sosSent ? 'SOS ACTIVE' : 'EMERGENCY SOS'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SOS Alert Banner if triggered */}
        {sosSent && (
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-500 text-red-900 flex items-start justify-between gap-3 shadow-md animate-bounce">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block">EMERGENCY ASSISTANCE DISPATCHED!</span>
                <p className="text-xs text-red-800">
                  Ground Coordinators Sheikh Tariq & Medical Escort Dr. Fatima have received your live GPS coordinates ({currentLat.toFixed(4)}, {currentLng.toFixed(4)}). Stay calm and remain where you are.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSosSent(false)}
              className="text-xs text-red-700 hover:text-red-950 underline font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Grid: Radar Canvas + Geofence Control & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Radar Precinct (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-800" />
                <span className="font-heading text-base font-bold text-slate-900">
                  Makkah Holy Sanctuary Radar (GPS Projection)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Center: 21.4225° N, 39.8262° E (Holy Kaaba)</span>
              </div>
            </div>

            {/* Radar Visual Display Container */}
            <div className="relative h-96 sm:h-[420px] rounded-2xl bg-[#031d15] overflow-hidden border border-emerald-900/80 shadow-inner flex items-center justify-center">
              {/* Radar circular concentric grid */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* 100m ring */}
                <div className="w-24 h-24 rounded-full border border-emerald-600/30 border-dashed" />
                {/* 200m ring */}
                <div className="w-48 h-48 rounded-full border border-emerald-600/20" />
                {/* 300m KAABA GEOFENCE RING (Highlighted in gold) */}
                <div className="w-72 h-72 rounded-full border-2 border-amber-400/80 bg-amber-400/5 relative animate-pulse flex items-start justify-center">
                  <span className="text-[10px] font-bold text-amber-300 bg-[#062e22] px-2 py-0.5 rounded -mt-2.5 border border-amber-400/60">
                    300m Kaaba Tawaf Geofence
                  </span>
                </div>
                {/* 600m Haram Boundary */}
                <div className="w-96 h-96 rounded-full border border-emerald-700/20 border-dotted" />
              </div>

              {/* Crosshair axes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-[1px] bg-emerald-400" />
                <div className="h-full w-[1px] bg-emerald-400 absolute" />
              </div>

              {/* KAABA Icon at exact center */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-black border-2 border-[#c5a059] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <span className="text-2xl">🕋</span>
                </div>
                <span className="text-[11px] font-bold text-amber-300 mt-1 drop-shadow bg-[#062e22]/90 px-2 py-0.5 rounded border border-amber-400/30">
                  Holy Kaaba
                </span>
                <span className="text-[9px] text-emerald-300 font-mono">0.00m</span>
              </div>

              {/* Current Pilgrim Marker (Dynamically positioned on radar relative to distance) */}
              {(() => {
                // Compute offset pixels on visual canvas (clamped to fit radar box)
                const scale = 0.45; // pixels per meter
                const dLat = (currentLat - KAABA_COORDS.lat) * 111000;
                const dLng = (currentLng - KAABA_COORDS.lng) * 111000 * Math.cos((KAABA_COORDS.lat * Math.PI) / 180);
                const visualX = Math.max(-170, Math.min(170, dLng * scale));
                const visualY = Math.max(-170, Math.min(170, -dLat * scale));

                return (
                  <div
                    className="absolute z-20 flex flex-col items-center transition-all duration-700 ease-out"
                    style={{
                      transform: `translate(${visualX}px, ${visualY}px)`
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-600 shadow-xl overflow-hidden flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                          alt="Haji Farooq"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#062e22] rounded-full animate-ping" />
                    </div>

                    <div className="bg-[#062e22]/95 border border-amber-400/60 rounded px-2 py-0.5 mt-1 text-center shadow-md whitespace-nowrap">
                      <span className="text-[10px] font-bold text-white block">
                        {pilgrimName.split(' ')[1] || 'Pilgrim'}
                      </span>
                      <span className="text-[9px] font-mono text-amber-300">
                        {distanceToKaaba}m · {geofenceResult.status}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Other Active Group Pilgrims markers */}
              {MOCK_PILGRIMS.slice(1, 4).map((p, idx) => {
                const offsets = [
                  { x: 45, y: -40 },
                  { x: -90, y: 35 },
                  { x: 30, y: 110 }
                ];
                const off = offsets[idx];
                return (
                  <div
                    key={p.id}
                    className="absolute z-10 flex flex-col items-center opacity-85"
                    style={{ transform: `translate(${off.x}px, ${off.y}px)` }}
                  >
                    <div className="w-7 h-7 rounded-full border border-amber-400/80 overflow-hidden bg-slate-800">
                      <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[8px] text-emerald-200 bg-[#042017]/90 px-1 rounded mt-0.5">
                      {p.name.split(' ')[0]} ({p.distanceToKaabaMeters}m)
                    </span>
                  </div>
                );
              })}

              {/* Bottom legend inside radar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-emerald-200/90 pointer-events-none">
                <div className="flex items-center gap-2 bg-[#042017]/80 px-2.5 py-1 rounded backdrop-blur border border-emerald-800/60">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Gold Ring = 300m Tawaf Threshold</span>
                </div>
                <div className="bg-[#042017]/80 px-2.5 py-1 rounded backdrop-blur border border-emerald-800/60 font-mono">
                  GPS: {currentLat.toFixed(5)}° N, {currentLng.toFixed(5)}° E
                </div>
              </div>
            </div>

            {/* Quick Teleport Simulator buttons */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                  Live Geofence Teleport Simulator (Test Real-time Status Trigger)
                </span>
                <span className="text-[11px] text-slate-500">
                  Click any location to move pilgrim instantly:
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {teleportLocations.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentLat(loc.lat);
                      setCurrentLng(loc.lng);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all text-xs cursor-pointer ${
                      currentLat === loc.lat && currentLng === loc.lng
                        ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block truncate">{loc.name}</span>
                    <span className="text-[10px] text-slate-500 block">{loc.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Geofencing Status & Pilgrim Device telemetry (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Geofence Status
                </span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </div>

              {/* Active status indicator */}
              <div className={`p-4 rounded-xl border-2 ${
                geofenceResult.status === 'Performing Tawaf'
                  ? 'border-amber-500 bg-amber-50/50'
                  : 'border-emerald-500 bg-emerald-50/50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-base font-extrabold text-slate-900">
                    {geofenceResult.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {geofenceResult.description}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-emerald-900 bg-white/80 p-1.5 rounded border border-emerald-200/80">
                  Zone: {geofenceResult.zoneName}
                </div>
              </div>

              {/* Pilgrim Details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Pilgrim Name</span>
                  <span className="font-bold text-slate-900">{pilgrimName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Group</span>
                  <span className="font-semibold text-slate-900">{groupTag}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Hotel & Room</span>
                  <span className="font-semibold text-slate-900">Clock Tower #1402</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Battery Level</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5" /> {battery}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Emergency Phone</span>
                  <span className="font-mono text-slate-900">+91 98201 44829</span>
                </div>
              </div>
            </div>

            {/* Tawaf Circuit Companion (Active if in Tawaf) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Tawaf Lap Counter
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  Round {tawafLap} of 7
                </span>
              </div>

              <div className="flex items-center justify-between gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTawafLap(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      tawafLap === num
                        ? 'bg-[#062e22] text-amber-300 shadow'
                        : num < tawafLap
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950">
                <span className="font-bold block mb-0.5">Sunnah Dua for Lap {tawafLap}:</span>
                <p className="font-arabic text-xs leading-normal">
                  رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                </p>
                <p className="text-[10px] text-slate-600 mt-1">
                  "Our Lord, give us in this world that which is good and in the Hereafter that which is good and save us from the torment of the Fire."
                </p>
              </div>

              <button
                type="button"
                onClick={() => setTawafLap((prev) => (prev < 7 ? prev + 1 : 1))}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
              >
                {tawafLap < 7 ? `Advance to Lap ${tawafLap + 1}` : 'Tawaf Completed (Reset)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
