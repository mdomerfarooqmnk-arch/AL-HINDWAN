import React, { useState, useEffect } from 'react';
import { PrayerTimeData } from '../types';
import { fetchPrayerTimes, getNextPrayerInfo, calculateQiblaAngle } from '../services/prayerService';
import {
  Compass, Clock, Volume2, VolumeX, RotateCw, Check, Sparkles,
  MapPin, Flame, RefreshCw, Smartphone
} from 'lucide-react';

export const SpiritualTools: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'prayer' | 'qibla' | 'tasbih' | 'duas'>('prayer');

  // Prayer state
  const [selectedCity, setSelectedCity] = useState<'Makkah' | 'Madinah' | 'Current'>('Makkah');
  const [prayerData, setPrayerData] = useState<PrayerTimeData | null>(null);
  const [loadingPrayers, setLoadingPrayers] = useState<boolean>(true);
  const [nextPrayer, setNextPrayer] = useState<{ nextPrayer: string; timeString: string; minutesRemaining: number } | null>(null);

  // Qibla state
  const [userLat, setUserLat] = useState<number>(19.0760); // Mumbai default or user GPS
  const [userLng, setUserLng] = useState<number>(72.8777);
  const [qiblaHeading, setQiblaHeading] = useState<number>(278); // Calculated bearing
  const [deviceHeading, setDeviceHeading] = useState<number>(270);
  const [isAligned, setIsAligned] = useState<boolean>(false);

  // Tasbih state
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<number>(33);
  const [selectedDhikr, setSelectedDhikr] = useState<string>('SubhanAllah');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Load prayer times
  useEffect(() => {
    let isMounted = true;
    setLoadingPrayers(true);

    if (selectedCity === 'Current' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!isMounted) return;
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
          fetchPrayerTimes('Current', pos.coords.latitude, pos.coords.longitude).then((data) => {
            if (isMounted) {
              setPrayerData(data);
              setNextPrayer(getNextPrayerInfo(data));
              setLoadingPrayers(false);
            }
          });
        },
        () => {
          fetchPrayerTimes('Makkah').then((data) => {
            if (isMounted) {
              setPrayerData(data);
              setNextPrayer(getNextPrayerInfo(data));
              setLoadingPrayers(false);
            }
          });
        }
      );
    } else {
      fetchPrayerTimes(selectedCity).then((data) => {
        if (isMounted) {
          setPrayerData(data);
          setNextPrayer(getNextPrayerInfo(data));
          setLoadingPrayers(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Recalculate Qibla angle when lat/lng change
  useEffect(() => {
    const angle = calculateQiblaAngle(userLat, userLng);
    setQiblaHeading(Math.round(angle));
  }, [userLat, userLng]);

  // Check alignment
  useEffect(() => {
    const diff = Math.abs(deviceHeading - qiblaHeading);
    setIsAligned(diff < 5 || diff > 355);
  }, [deviceHeading, qiblaHeading]);

  // Tasbih clicker
  const handleTasbihClick = () => {
    const nextVal = tasbihCount + 1;
    setTasbihCount(nextVal);

    // Audio click effect using Web Audio API
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(nextVal % tasbihTarget === 0 ? 880 : 540, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
      } catch (e) {
        // audio context blocked or unsupported
      }
    }
  };

  const azkarList = [
    { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', meaning: 'Glory be to Allah' },
    { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', meaning: 'All praise is for Allah' },
    { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', meaning: 'Allah is the Greatest' },
    { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', meaning: 'I seek forgiveness from Allah' },
    { name: 'La ilaha illallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', meaning: 'There is no deity except Allah' },
    { name: 'Durood Ibrahim', arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', meaning: 'Blessings upon Prophet Muhammad (PBUH)' }
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Spiritual Header */}
        <div className="bg-[#062e22] text-white rounded-2xl p-6 border border-[#c5a059]/40 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Sacred Utilities
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Spiritual Tools Suite
              </h2>
              <p className="text-xs text-emerald-200/90 mt-1">
                Authentic prayer schedules, dynamic Qibla compass, and digital Tasbih for pilgrims on the move.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1 bg-[#042017] rounded-xl border border-emerald-800/80">
              <button
                onClick={() => setActiveSubTab('prayer')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeSubTab === 'prayer' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                Prayers
              </button>
              <button
                onClick={() => setActiveSubTab('qibla')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeSubTab === 'qibla' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                Qibla
              </button>
              <button
                onClick={() => setActiveSubTab('tasbih')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeSubTab === 'tasbih' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                Tasbih
              </button>
              <button
                onClick={() => setActiveSubTab('duas')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeSubTab === 'duas' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                Hajj Duas
              </button>
            </div>
          </div>
        </div>

        {/* SUBTAB 1: PRAYER TIMES */}
        {activeSubTab === 'prayer' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Daily Prayer Times (Salah Schedules)
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated using Umm Al-Qura University, Makkah Standards & Live Aladhan API.
                </p>
              </div>

              {/* Location Selector */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setSelectedCity('Makkah')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                    selectedCity === 'Makkah' ? 'bg-[#062e22] text-amber-300 shadow' : 'text-slate-600'
                  }`}
                >
                  Makkah Haram
                </button>
                <button
                  onClick={() => setSelectedCity('Madinah')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                    selectedCity === 'Madinah' ? 'bg-[#062e22] text-amber-300 shadow' : 'text-slate-600'
                  }`}
                >
                  Madinah Nabawi
                </button>
                <button
                  onClick={() => setSelectedCity('Current')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                    selectedCity === 'Current' ? 'bg-[#062e22] text-amber-300 shadow' : 'text-slate-600'
                  }`}
                >
                  My Current GPS
                </button>
              </div>
            </div>

            {/* Next Prayer Countdown Card */}
            {nextPrayer && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#062e22] to-[#0c4b37] text-white flex items-center justify-between shadow-md">
                <div>
                  <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
                    Upcoming Prayer
                  </span>
                  <h4 className="font-heading text-2xl font-bold text-white mt-0.5">
                    {nextPrayer.nextPrayer} Salah
                  </h4>
                  <span className="text-xs text-emerald-200 mt-1 block">
                    Scheduled at: <strong className="text-white font-mono">{nextPrayer.timeString}</strong>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-300 block">Time Remaining</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                    {Math.floor(nextPrayer.minutesRemaining / 60)}h {nextPrayer.minutesRemaining % 60}m
                  </div>
                  <span className="text-[10px] text-emerald-300/80 block mt-0.5">
                    {prayerData?.city || 'Holy Sanctuary'}
                  </span>
                </div>
              </div>
            )}

            {/* All Prayers Grid */}
            {loadingPrayers ? (
              <div className="p-8 text-center text-xs text-slate-500">
                Fetching authentic prayer timings from Aladhan API...
              </div>
            ) : prayerData ? (
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {[
                  { name: 'Fajr', time: prayerData.Fajr, arabic: 'الفجر' },
                  { name: 'Sunrise', time: prayerData.Sunrise, arabic: 'الشروق' },
                  { name: 'Dhuhr', time: prayerData.Dhuhr, arabic: 'الظهر' },
                  { name: 'Asr', time: prayerData.Asr, arabic: 'العصر' },
                  { name: 'Maghrib', time: prayerData.Maghrib, arabic: 'المغرب' },
                  { name: 'Isha', time: prayerData.Isha, arabic: 'العشاء' }
                ].map((p) => {
                  const isCurrent = nextPrayer?.nextPrayer.includes(p.name);
                  return (
                    <div
                      key={p.name}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-600 block">{p.name}</span>
                      <span className="font-arabic text-[11px] text-slate-400 block">{p.arabic}</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono block mt-1">
                        {p.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div className="text-[11px] text-slate-500 flex justify-between pt-2 border-t border-slate-100">
              <span>Hijri Date: {prayerData?.hijriDate || '15 Rabi al-Thani 1448 AH'}</span>
              <span>Gregorian: {prayerData?.dateReadable || new Date().toDateString()}</span>
            </div>
          </div>
        )}

        {/* SUBTAB 2: QIBLA FINDER & COMPASS */}
        {activeSubTab === 'qibla' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="pb-3 border-b border-slate-100 text-center">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Precision Qibla Compass
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculates direct spherical geodesic bearing to the Holy Kaaba (21.4225° N, 39.8262° E).
              </p>
            </div>

            {/* Compass Visual Dial */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-64 h-64 rounded-full border-4 border-slate-200 bg-[#062e22] shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Compass Dial markings */}
                <div
                  className="absolute inset-0 transition-transform duration-300 flex items-center justify-center pointer-events-none"
                  style={{ transform: `rotate(${-deviceHeading}deg)` }}
                >
                  <span className="absolute top-2 text-xs font-extrabold text-red-500">N</span>
                  <span className="absolute right-3 text-xs font-bold text-slate-400">E</span>
                  <span className="absolute bottom-2 text-xs font-bold text-slate-400">S</span>
                  <span className="absolute left-3 text-xs font-bold text-slate-400">W</span>

                  {/* Degree ticks */}
                  <div className="absolute inset-4 rounded-full border border-emerald-700/40 border-dashed" />
                </div>

                {/* Qibla Needle (Points towards Makkah relative to compass) */}
                <div
                  className="absolute w-full h-full flex items-center justify-center transition-transform duration-300"
                  style={{ transform: `rotate(${qiblaHeading - deviceHeading}deg)` }}
                >
                  {/* Kaaba indicator pointer */}
                  <div className="absolute -top-1 flex flex-col items-center">
                    <span className="text-2xl drop-shadow animate-bounce">🕋</span>
                    <div className="w-1 h-20 bg-gradient-to-b from-[#c5a059] to-transparent rounded-full shadow" />
                  </div>
                </div>

                {/* Center Hub */}
                <div className="z-10 w-16 h-16 rounded-full bg-[#042017] border-2 border-[#c5a059] flex flex-col items-center justify-center text-center shadow-lg">
                  <span className="text-xs font-mono font-bold text-amber-300">{qiblaHeading}°</span>
                  <span className="text-[9px] text-emerald-300 uppercase">Qibla</span>
                </div>
              </div>

              {/* Alignment Status */}
              <div className="mt-6 text-center">
                {isAligned ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold animate-pulse">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>ALIGNED! You are facing the Holy Kaaba directly.</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600">
                    Turn your device until the Kaaba icon points directly upwards ({qiblaHeading}°).
                  </div>
                )}
              </div>

              {/* Simulation dial slider to test alignment */}
              <div className="w-full max-w-sm mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Device Heading (Simulate rotation)</span>
                  <span className="font-mono font-bold text-slate-900">{deviceHeading}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={deviceHeading}
                  onChange={(e) => setDeviceHeading(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <button onClick={() => setDeviceHeading(qiblaHeading)} className="text-emerald-700 underline font-semibold">
                    Snap to Exact Qibla ({qiblaHeading}°)
                  </button>
                  <button onClick={() => setDeviceHeading(0)} className="hover:underline">
                    Reset North (0°)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: DIGITAL TASBIH & DHIKR */}
        {activeSubTab === 'tasbih' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Digital Tasbih & Dhikr Counter
                </h3>
                <p className="text-xs text-slate-500">
                  Tactile counter with audio feedback and traditional targets (33 / 99 / 100).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Toggle audio click"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>
                <button
                  onClick={() => setTasbihCount(0)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Dhikr Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {azkarList.map((z) => (
                <button
                  key={z.name}
                  onClick={() => {
                    setSelectedDhikr(z.name);
                    setTasbihCount(0);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedDhikr === z.name
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="font-arabic text-sm block leading-tight text-emerald-900">{z.arabic}</span>
                  <span className="text-xs block font-bold text-slate-900 mt-0.5">{z.name}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{z.meaning}</span>
                </button>
              ))}
            </div>

            {/* Interactive Clicker Dial */}
            <div className="flex flex-col items-center justify-center py-6">
              <button
                type="button"
                onClick={handleTasbihClick}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-[#062e22] via-[#0b4735] to-[#042017] border-4 border-[#c5a059] shadow-2xl flex flex-col items-center justify-center text-white active:scale-95 transition-transform cursor-pointer group"
              >
                <span className="text-[10px] text-amber-300 uppercase tracking-widest block">
                  Tap to Count
                </span>
                <span className="text-5xl font-black font-mono my-1 tracking-tight text-white group-hover:text-amber-200">
                  {tasbihCount}
                </span>
                <span className="text-xs text-emerald-300">
                  Target: {tasbihTarget} · {Math.floor(tasbihCount / tasbihTarget)} Rounds
                </span>
              </button>

              {/* Target presets */}
              <div className="flex items-center gap-2 mt-6">
                {[33, 99, 100, 1000].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTasbihTarget(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      tasbihTarget === t
                        ? 'bg-[#062e22] text-amber-300 shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Target {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: HAJJ & UMRAH DUAS */}
        {activeSubTab === 'duas' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Authentic Manasik & Sacred Supplications
              </h3>
              <p className="text-xs text-slate-500">
                Sunnah Duas for Talbiyah, Tawaf, Sa'i, and Day of Arafat.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                <span className="text-xs font-bold text-emerald-900 uppercase">1. Talbiyah of Hajj & Umrah</span>
                <p className="font-arabic text-base text-slate-900 leading-relaxed font-bold">
                  لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ
                </p>
                <p className="text-xs text-slate-700">
                  "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace, and sovereignty belong to You. You have no partner."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                <span className="text-xs font-bold text-amber-900 uppercase">2. At Black Stone (Hajar Al-Aswad)</span>
                <p className="font-arabic text-base text-slate-900 leading-relaxed font-bold">
                  بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ
                </p>
                <p className="text-xs text-slate-700">
                  "In the name of Allah, and Allah is the Greatest." (Recite when starting each circuit and pointing toward the Black Stone).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-800 uppercase">3. Standing at Mount Safa & Marwah</span>
                <p className="font-arabic text-base text-slate-900 leading-relaxed font-bold">
                  إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ
                </p>
                <p className="text-xs text-slate-700">
                  "Indeed, as-Safa and al-Marwah are among the symbols of Allah. I begin with that with which Allah began."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
