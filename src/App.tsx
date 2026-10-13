/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { PackageList } from './components/PackageList';
import { BookingWizard } from './components/BookingWizard';
import { LiveTracking } from './components/LiveTracking';
import { AdminControlRoom } from './components/AdminControlRoom';
import { SpiritualTools } from './components/SpiritualTools';
import { InfoHub } from './components/InfoHub';
import { RawdahPermitHub } from './components/RawdahPermitHub';
import { AndroidArchitectHub } from './components/AndroidArchitectHub';
import { ApkDeploymentModal } from './components/ApkDeploymentModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminAuthGate } from './components/AdminAuthGate';
import { ServicesHub } from './components/ServicesHub';
import { PhotoGallery } from './components/PhotoGallery';
import { ContactOfficesSection } from './components/ContactOfficesSection';
import { FloatingContactHelp } from './components/FloatingContactHelp';
import { Footer } from './components/Footer';
import { TravelPackage, BookingRecord, ServiceCategory } from './types';
import { INITIAL_SAMPLE_BOOKINGS, MOCK_PACKAGES } from './data/mockData';
import { apiService, AuthUser } from './services/apiService';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showApkModal, setShowApkModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('alhindwan_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('alhindwan_auth_user');
      if (stored) {
        const u = JSON.parse(stored);
        return u.role === 'admin';
      }
    } catch {}
    return false;
  });

  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('umrah');

  // Stored packages (managed dynamically from server database)
  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    try {
      const stored = localStorage.getItem('alhindwan_packages');
      return stored ? JSON.parse(stored) : MOCK_PACKAGES;
    } catch {
      return MOCK_PACKAGES;
    }
  });

  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TravelPackage | null>(null);

  // Stored bookings
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const stored = localStorage.getItem('alhindwan_bookings');
      return stored ? JSON.parse(stored) : INITIAL_SAMPLE_BOOKINGS;
    } catch {
      return INITIAL_SAMPLE_BOOKINGS;
    }
  });

  // Active SOS notices
  const [sosAlerts, setSosAlerts] = useState<string[]>([]);
  const [dbVersion, setDbVersion] = useState<number>(0);

  // 1. Initial Load from Centralized Backend Database
  useEffect(() => {
    apiService.fetchPackages().then((data) => {
      if (data && data.length > 0) setPackages(data);
    });
    apiService.fetchBookings().then((data) => {
      if (data && data.length > 0) setBookings(data);
    });
  }, []);

  // 2. Real-Time Dynamic Sync Poller (Detects admin changes live across all end-users)
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const serverVer = await apiService.checkVersion();
      if (serverVer && serverVer !== dbVersion) {
        setDbVersion(serverVer);
        // Refresh packages from database automatically
        const updated = await apiService.fetchPackages();
        if (updated && updated.length > 0) {
          setPackages(updated);
        }
      }
    }, 3500); // Polls every 3.5 seconds

    return () => clearInterval(pollInterval);
  }, [dbVersion]);

  // Admin package handlers with centralized server database sync
  const handleSavePackage = async (updatedPkg: TravelPackage) => {
    // 1. Update state immediately (optimistic UI)
    setPackages((prev) => {
      const exists = prev.some((p) => p.id === updatedPkg.id);
      if (exists) {
        return prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p));
      } else {
        return [updatedPkg, ...prev];
      }
    });

    // 2. Sync to centralized database
    const token = localStorage.getItem('alhindwan_auth_token') || undefined;
    await apiService.savePackage(updatedPkg, token);
  };

  const handleDeletePackage = async (pkgId: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== pkgId));
    const token = localStorage.getItem('alhindwan_auth_token') || undefined;
    await apiService.deletePackage(pkgId, token);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: AuthUser, token: string) => {
    setCurrentUser(user);
    const adminRole = user.role === 'admin';
    setIsAdmin(adminRole);
    if (adminRole) {
      setActiveTab('admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('alhindwan_auth_user');
    localStorage.removeItem('alhindwan_auth_token');
    setCurrentUser(null);
    setIsAdmin(false);
    setActiveTab('home');
  };

  // Handler when user triggers booking wizard from package card or header
  const handleStartBooking = (pkg?: TravelPackage) => {
    setSelectedPackageForBooking(pkg || packages[0] || MOCK_PACKAGES[0]);
    setActiveTab('booking');
  };

  const handleBookingCompleted = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Handler for service grid selection
  const handleSelectService = (service: ServiceCategory) => {
    if (service === 'umrah') {
      setSelectedType('umrah');
      setActiveTab('packages');
    } else if (service === 'hajj') {
      setSelectedType('hajj');
      setActiveTab('packages');
    } else if (service === 'hotel') {
      setActiveTab('info');
    } else if (service === 'visa') {
      setActiveTab('info');
    } else if (service === 'ziyarat') {
      setActiveTab('info');
    } else if (service === 'rawdah') {
      setActiveTab('rawdah');
    } else if (service === 'flight') {
      setActiveTab('packages');
    } else if (service === 'catering') {
      setActiveTab('services');
    }
  };

  const handleNotifySOS = (pilgrimName: string, message: string) => {
    setSosAlerts((prev) => [message, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-200 selection:text-emerald-950">
      {/* Primary Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onBookNowClick={() => handleStartBooking()}
        onOpenApkModal={() => setShowApkModal(true)}
        liveSyncStatus={true}
      />

      {/* Admin Login Modal (Triggered from Top Bar or Actions) */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* APK Deployment & Download Modal */}
      <ApkDeploymentModal
        isOpen={showApkModal}
        onClose={() => setShowApkModal(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroBanner
              onExplorePackages={() => setActiveTab('packages')}
              onOpenTracking={() => setActiveTab('tracking')}
              onOpenSpiritual={() => setActiveTab('spiritual')}
              onOpenPhotos={() => setActiveTab('photos')}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={(t) => {
                setSelectedType(t);
                setActiveTab('packages');
              }}
            />
            <ServicesGrid onSelectService={handleSelectService} />
            <PackageList
              onSelectPackageForBooking={handleStartBooking}
              filterCategory={selectedType}
              packages={packages}
            />
            {/* Visual Photographic Showcase of Sacred Sites and Hospitality */}
            <PhotoGallery
              onBookNowClick={() => handleStartBooking()}
              onExplorePackages={() => setActiveTab('packages')}
            />
            {/* Official Head Office & Branch Office Cards from Screenshot */}
            <ContactOfficesSection />
          </>
        )}

        {activeTab === 'photos' && (
          <>
            <PhotoGallery
              onBookNowClick={() => handleStartBooking()}
              onExplorePackages={() => setActiveTab('packages')}
            />
            <ContactOfficesSection />
          </>
        )}

        {activeTab === 'services' && (
          <>
            <ServicesHub
              onSelectService={handleSelectService}
              onExplorePackages={() => setActiveTab('packages')}
              onBookNow={() => handleStartBooking()}
            />
            <ContactOfficesSection />
          </>
        )}

        {activeTab === 'packages' && (
          <PackageList
            onSelectPackageForBooking={handleStartBooking}
            filterCategory={selectedType}
            packages={packages}
          />
        )}

        {activeTab === 'booking' && (
          <BookingWizard
            initialPackage={selectedPackageForBooking}
            onBookingCompleted={handleBookingCompleted}
            onCancel={() => setActiveTab('packages')}
          />
        )}

        {activeTab === 'tracking' && (
          <LiveTracking onNotifyAdminSOS={handleNotifySOS} />
        )}

        {activeTab === 'rawdah' && (
          <RawdahPermitHub />
        )}

        {activeTab === 'spiritual' && (
          <SpiritualTools />
        )}

        {activeTab === 'info' && (
          <>
            <InfoHub />
            <ContactOfficesSection />
          </>
        )}

        {activeTab === 'admin' && (
          isAdmin ? (
            <AdminControlRoom
              bookings={bookings}
              packages={packages}
              onSavePackage={handleSavePackage}
              onDeletePackage={handleDeletePackage}
              sosAlerts={sosAlerts}
              currentUser={currentUser}
              onLogout={handleLogout}
              onViewAsEndUser={() => setActiveTab('packages')}
              dbVersion={dbVersion}
            />
          ) : (
            <AdminAuthGate
              currentUser={currentUser}
              onLogout={handleLogout}
              onLoginSuccess={handleLoginSuccess}
              onExploreAsGuest={() => setActiveTab('home')}
            />
          )
        )}

        {activeTab === 'android' && (
          <AndroidArchitectHub onOpenApkModal={() => setShowApkModal(true)} />
        )}
      </main>

      {/* Floating WhatsApp & Call Help Drawer */}
      <FloatingContactHelp onOpenApkModal={() => setShowApkModal(true)} />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenApkModal={() => setShowApkModal(true)}
      />
    </div>
  );
}
