import React from 'react';
import { ShieldCheck, MapPin, Radio, Calendar, Users, ArrowRight, Phone, MessageSquare, Camera } from 'lucide-react';
import { AlHindwanLogo } from './AlHindwanLogo';

interface HeroBannerProps {
  onExplorePackages: () => void;
  onOpenTracking: () => void;
  onOpenSpiritual: () => void;
  onOpenPhotos?: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  isAdmin?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExplorePackages,
  onOpenTracking,
  onOpenSpiritual,
  onOpenPhotos,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  isAdmin = false
}) => {
  return (
    <div className="relative overflow-hidden bg-islamic-pattern text-white border-b border-[#c5a059]/30">
      {/* Decorative ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062e22] via-[#083b2c]/95 to-[#062e22]/90 pointer-events-none" />

      {/* Core Values Ribbon from User Screenshot */}
      <div className="relative z-10 bg-[#031b13]/90 border-b border-[#c5a059]/30 py-2 px-4 overflow-x-auto shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider whitespace-nowrap uppercase">
          <span>JOURNEY</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span>RELIABLE</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span>ACCOMMODATION</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span className="text-white bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-600">HYDERABADI KHANA</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span>MADINAH ZIYARAT</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span>ZAM ZAM WATER</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span>SERVICE</span>
          <span className="text-emerald-500 font-normal">|</span>
          <span>BOOKING</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <AlHindwanLogo size="md" className="drop-shadow-xl" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#c5a059]/40 text-xs text-amber-300">
                <span className="font-arabic text-sm">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</span>
                <span className="text-emerald-400">·</span>
                <span>2026 – 2027 Bookings Open</span>
              </div>
            </div>

            <div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Sacred Journeys of Faith,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#c5a059] to-amber-100">
                  Flawless Hospitality.
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
                Welcome to <strong>Al-Hindwan Tours & Travels</strong>. Head Office: Hyderabad & Branch: Manna Ekhelli, Karnataka. We curate spiritually enriching, fully managed Hajj & Umrah journeys with premier Haram-facing hotels, authentic Hyderabadi culinary spreads, and real-time pilgrim geofencing.
              </p>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="border border-emerald-800/60 bg-emerald-950/40 p-3 rounded-lg">
                <div className="text-amber-400 font-bold text-lg">0m – 80m</div>
                <div className="text-xs text-emerald-200/80 mt-0.5">Walking Distance to Haram Piazza</div>
              </div>
              <div className="border border-emerald-800/60 bg-emerald-950/40 p-3 rounded-lg">
                <div className="text-amber-400 font-bold text-lg">24/7 Live</div>
                <div className="text-xs text-emerald-200/80 mt-0.5">GPS & Kaaba 300m Tawaf Tracking</div>
              </div>
              <div className="border border-emerald-800/60 bg-emerald-950/40 p-3 rounded-lg">
                <div className="text-amber-400 font-bold text-lg">100% Verified</div>
                <div className="text-xs text-emerald-200/80 mt-0.5">Ministry Visa & Nusuk Authorised</div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplorePackages}
                className="px-5 py-3 bg-gradient-to-r from-[#c5a059] to-[#d6ad5f] text-[#062e22] text-sm font-bold rounded-lg shadow-lg hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Live Pilgrim Radar button is strictly for Admin users */}
              {isAdmin && (
                <button
                  onClick={onOpenTracking}
                  className="px-5 py-3 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  title="Admin Real-Time Pilgrim Radar"
                >
                  <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Live Pilgrim Radar</span>
                  <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-1.5 py-0.2 rounded-full">
                    Admin
                  </span>
                </button>
              )}

              {onOpenPhotos && (
                <button
                  onClick={onOpenPhotos}
                  className="px-4 py-3 bg-emerald-950/90 hover:bg-emerald-900 border border-[#c5a059]/60 text-amber-300 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Photo Gallery</span>
                  <span className="text-[10px] bg-amber-400 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded-full">
                    24 Photos
                  </span>
                </button>
              )}

              <button
                onClick={onOpenSpiritual}
                className="px-4 py-3 text-xs text-emerald-200 hover:text-amber-300 underline underline-offset-4 transition-colors"
              >
                Prayer Times & Qibla Compass
              </button>
            </div>
          </div>

          {/* Quick Search & Package Filter Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#093d2e]/90 backdrop-blur border border-[#c5a059]/40 rounded-xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
                <span className="text-sm font-heading font-bold text-amber-300 tracking-wide">
                  Find Your Ideal Pilgrimage
                </span>
                <span className="text-[11px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded">
                  Direct Departures
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-emerald-200 block mb-1">
                    Pilgrimage Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedType('umrah')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
                        selectedType === 'umrah'
                          ? 'bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] shadow'
                          : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/50'
                      }`}
                    >
                      Umrah (All Year)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('hajj')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
                        selectedType === 'hajj'
                          ? 'bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] shadow'
                          : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/50'
                      }`}
                    >
                      Hajj 1447H / 2026
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-emerald-200 block mb-1">
                    Departure Airport
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-[#05271d] border border-emerald-700/60 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="all">All Gateways (India & GCC)</option>
                      <option value="Mumbai">Mumbai (BOM - Direct Saudia)</option>
                      <option value="Delhi">Delhi (DEL - Direct Saudia/Air India)</option>
                      <option value="Hyderabad">Hyderabad (HYD)</option>
                      <option value="Bangalore">Bangalore (BLR)</option>
                      <option value="Dubai">Dubai / GCC Regional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-emerald-200 block mb-1">
                      Target Month
                    </label>
                    <div className="flex items-center gap-1.5 bg-[#05271d] border border-emerald-700/60 rounded-lg px-3 py-2 text-xs text-white">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Nov 2026 – Ramadan</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-emerald-200 block mb-1">
                      Sharing Preference
                    </label>
                    <div className="flex items-center gap-1.5 bg-[#05271d] border border-emerald-700/60 rounded-lg px-3 py-2 text-xs text-white">
                      <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Quad / Double</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onExplorePackages}
                  className="w-full mt-2 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#d6ad5f] text-[#062e22] text-xs font-bold rounded-lg shadow hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Filter & View Available Slots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] text-emerald-300/80 text-center pt-2 border-t border-emerald-800/40">
                Direct Inquiry: <span className="text-amber-300 font-semibold font-mono">Head Office +91 9700762916</span> · <span className="text-amber-300 font-semibold font-mono">Branch +91 9743481876</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
