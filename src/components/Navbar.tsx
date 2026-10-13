import React from 'react';
import { Compass, MapPin, Package, ShieldCheck, UserCheck, Smartphone, PhoneCall, Moon, Radio, Lock, LogOut, CheckCircle2, MessageSquare, Sparkles, Layers, Camera } from 'lucide-react';
import { AuthUser } from '../services/apiService';
import { AlHindwanLogo } from './AlHindwanLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  currentUser: AuthUser | null;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  onBookNowClick: () => void;
  onOpenApkModal?: () => void;
  liveSyncStatus?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdmin,
  currentUser,
  onOpenLoginModal,
  onLogout,
  onBookNowClick,
  onOpenApkModal,
  liveSyncStatus = true
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#062e22] text-white border-b border-[#c5a059]/30 shadow-lg">
      {/* Top micro-bar with official contact details */}
      <div className="bg-[#042017] border-b border-emerald-900/40 text-xs px-3 sm:px-4 py-1.5 text-emerald-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              License #1447-UMR
            </span>
            <span className="hidden sm:inline text-emerald-300/40">·</span>
            <div className="hidden sm:flex items-center gap-2 text-[11px]">
              <span className="text-amber-200 font-semibold">Head Office (Hyd):</span>
              <a href="tel:+919700762916" className="text-white hover:text-amber-300 font-mono font-bold">
                +91 9700762916
              </a>
              <a
                href="https://wa.me/919700762916"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:brightness-125"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
              </a>
            </div>
            <span className="hidden md:inline text-emerald-300/40">·</span>
            <div className="hidden md:flex items-center gap-2 text-[11px]">
              <span className="text-amber-200 font-semibold">Branch (Manna Ekhelli):</span>
              <a href="tel:+919743481876" className="text-white hover:text-amber-300 font-mono font-bold">
                +91 9743481876
              </a>
              <a
                href="https://wa.me/919743481876"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:brightness-125"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Auth & Role Panel */}
            <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2 bg-[#0a3f2f] px-2.5 py-1 rounded-lg border border-emerald-700/60 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-white font-bold truncate max-w-[140px]">
                    {currentUser.role === 'admin' ? 'Super Admin' : currentUser.fullName.split(' ')[0]}
                  </span>
                  <button
                    onClick={onLogout}
                    className="ml-1 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-2 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    title="Log Out of Session"
                  >
                    <LogOut className="w-3 h-3 text-white" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="flex items-center gap-1 bg-[#0a3f2f] hover:bg-[#0e523e] px-2.5 py-1 rounded border border-[#c5a059]/50 text-[11px] font-bold text-amber-300 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Official Brand Identity Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group transition-transform focus:outline-none cursor-pointer"
        >
          <AlHindwanLogo size="sm" className="drop-shadow-md group-hover:scale-102 transition-transform" />
          <div>
            <span className="font-heading font-extrabold text-white text-sm sm:text-base tracking-wide block leading-tight">
              Al-Hindwan Tours & Travels
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block">
              Ministry Authorized Hajj & Umrah
            </span>
            <p className="text-[10px] text-emerald-200/90 font-arabic hidden xl:block">
              الحندوان للسياحة والسفر · Hyderabad & Manna Ekhelli
            </p>
          </div>
        </button>

        {/* Navigation tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Services</span>
            <span className="text-[9px] bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
              Hub
            </span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-400" />
            Packages
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Photos</span>
            <span className="text-[9px] bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
              24
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rawdah')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rawdah'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Rawdah Permit</span>
            <span className="text-[9px] bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
              Daily
            </span>
          </button>

          {/* Live Geofencing is restricted strictly to Admin users */}
          {(isAdmin || currentUser?.role === 'admin') && (
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tracking'
                  ? 'bg-emerald-800/80 text-amber-300 font-semibold shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
              }`}
              title="Admin Live Geofencing & Pilgrim Radar"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Live Geofencing</span>
              <span className="text-[9px] bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                Admin
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('spiritual')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'spiritual'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Spiritual Tools
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Hotels & Ziyarat
          </button>

          <button
            onClick={() => {
              if (isAdmin || currentUser?.role === 'admin') {
                setActiveTab('admin');
              } else {
                onOpenLoginModal();
              }
            }}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-emerald-800/80 text-amber-300 font-semibold'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Control Room
          </button>
        </nav>

        {/* Primary CTA and Prominent Admin / User Status Bar */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#0a3f2f] border border-amber-400/50 text-xs font-bold text-amber-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentUser.role === 'admin' ? 'Admin' : 'Pilgrim'}: {currentUser.fullName.split(' ')[0]}</span>
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-extrabold rounded-md shadow-md hover:shadow-rose-900/40 transition-all flex items-center gap-1.5 cursor-pointer border border-rose-300/40"
                title="Log Out of Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="px-2.5 py-2 bg-[#0a3f2f] hover:bg-[#0e523e] border border-[#c5a059]/60 text-amber-300 text-xs font-bold rounded-md shadow-sm transition-all flex items-center gap-1 cursor-pointer"
              title="Admin Login"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Admin</span> Login
            </button>
          )}

          <button
            onClick={onBookNowClick}
            className="px-4 py-2 bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] text-xs font-bold rounded-md shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Package</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center justify-around bg-[#05271d] px-2 py-2 border-t border-emerald-800/40 text-[11px] overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'home' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-2 py-1 whitespace-nowrap rounded flex items-center gap-1 ${activeTab === 'services' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          <Layers className="w-3 h-3 text-amber-400" /> Services
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'packages' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          Packages
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`px-2 py-1 whitespace-nowrap rounded flex items-center gap-1 ${activeTab === 'photos' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          <Camera className="w-3 h-3 text-amber-400" /> Photos
        </button>
        <button
          onClick={() => setActiveTab('rawdah')}
          className={`px-2 py-1 whitespace-nowrap rounded flex items-center gap-1 ${activeTab === 'rawdah' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          <Sparkles className="w-3 h-3 text-amber-400" /> Rawdah
        </button>
        {/* Live Geofencing in mobile only visible to Admin */}
        {(isAdmin || currentUser?.role === 'admin') && (
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-2 py-1 whitespace-nowrap rounded flex items-center gap-1 cursor-pointer ${
              activeTab === 'tracking' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'
            }`}
          >
            <Radio className="w-3 h-3 text-amber-400" /> Geofencing
          </button>
        )}
        <button
          onClick={() => setActiveTab('spiritual')}
          className={`px-2 py-1 whitespace-nowrap rounded flex items-center gap-1 ${activeTab === 'spiritual' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          <Compass className="w-3 h-3 text-amber-400" /> Spiritual
        </button>
        <button
          onClick={() => {
            if (isAdmin || currentUser?.role === 'admin') {
              setActiveTab('admin');
            } else {
              onOpenLoginModal();
            }
          }}
          className={`px-2 py-1 whitespace-nowrap rounded flex items-center gap-1 ${activeTab === 'admin' ? 'text-amber-300 font-bold bg-emerald-800' : 'text-emerald-200'}`}
        >
          <ShieldCheck className="w-3 h-3 text-amber-400" /> Control
        </button>

        {/* Prominent Mobile Logout Button when Logged In */}
        {currentUser ? (
          <button
            onClick={onLogout}
            className="px-2.5 py-1 whitespace-nowrap rounded font-extrabold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1 text-[11px] shadow border border-rose-300/40 cursor-pointer"
            title="Log Out of Session"
          >
            <LogOut className="w-3 h-3 text-white" />
            <span>Log Out</span>
          </button>
        ) : (
          <button
            onClick={onOpenLoginModal}
            className="px-2 py-1 whitespace-nowrap rounded font-bold text-amber-300 bg-[#0a3f2f] border border-amber-400/40 flex items-center gap-1 text-[11px] cursor-pointer"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
