import React, { useState, useEffect } from 'react';
import { AlHindwanLogo } from './AlHindwanLogo';
import { Sparkles, ShieldCheck, Moon, MapPin, Compass } from 'lucide-react';

interface AppStartupLoaderProps {
  onLoaded: () => void;
  durationMs?: number;
}

export const AppStartupLoader: React.FC<AppStartupLoaderProps> = ({
  onLoaded,
  durationMs = 2000
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [loadingPhase, setLoadingPhase] = useState<string>('Initializing Sacred Pilgrimage Portal...');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    const startTime = Date.now();
    const intervalMs = 25;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (pct < 30) {
        setLoadingPhase('Connecting to Al-Hindwan Sacred Pilgrimage Systems...');
      } else if (pct < 65) {
        setLoadingPhase('Syncing Makkah & Madinah Sanctuary Telemetry & Prayer Times...');
      } else if (pct < 90) {
        setLoadingPhase('Loading Certified Packages, Rawdah Permits & Hyderabadi Catering...');
      } else {
        setLoadingPhase('Ahlan wa Sahlan · Welcome to Al-Hindwan Tours & Travels');
      }

      if (elapsed >= durationMs) {
        clearInterval(timer);
        setIsFadingOut(true);
        setTimeout(() => {
          onLoaded();
        }, 300);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [durationMs, onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 select-none bg-gradient-to-b from-[#031d14] via-[#062e22] to-[#02130d] text-white transition-opacity duration-300 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Starting Al-Hindwan Tours & Travels"
    >
      {/* Decorative Gold Radial Glow in Center */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-[#c5a059]/10 blur-[100px] animate-pulse"></div>
        <div className="w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px]"></div>
      </div>

      {/* Top Banner: Arabic Calligraphy & License */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center space-y-2 pt-2">
        <div className="text-amber-300/90 font-arabic text-lg sm:text-2xl tracking-wider drop-shadow">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a3f2f]/80 border border-[#c5a059]/50 text-[11px] text-amber-300 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Ministry of Hajj & Umrah Authorized · License #1447-UMR</span>
        </div>
      </div>

      {/* Center Branding & Logo */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-md my-auto">
        {/* Animated Brand Emblem */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#ecd494] opacity-30 blur-md animate-pulse"></div>
          <div className="relative p-2 bg-[#042017] rounded-2xl border-2 border-[#c5a059] shadow-2xl">
            <AlHindwanLogo size="lg" className="drop-shadow-lg" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
            Al-Hindwan Tours & Travels
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-amber-300 tracking-wider uppercase">
            Premier Hajj & Umrah Pilgrimage Platform
          </p>
          <p className="text-[11px] text-emerald-200/80 font-arabic">
            الحندوان للسياحة والسفر · خدمة ضيوف الرحمن
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full max-w-xs space-y-2 pt-2">
          <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden border border-[#c5a059]/40 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#c5a059] via-[#ecd494] to-[#c5a059] rounded-full transition-all duration-75 shadow-lg shadow-amber-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-emerald-200/90 font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              <span>Loading App</span>
            </span>
            <span className="font-bold text-amber-300">{progress}%</span>
          </div>
          <p className="text-[11px] text-emerald-300/90 font-medium min-h-[1.25rem] transition-all">
            {loadingPhase}
          </p>
        </div>
      </div>

      {/* Bottom Branch Offices & Official Attribution */}
      <div className="relative z-10 w-full max-w-lg text-center border-t border-emerald-900/60 pt-4 space-y-1 text-[11px] text-emerald-300/80">
        <div className="flex items-center justify-center gap-2 flex-wrap text-emerald-200">
          <span className="flex items-center gap-1 font-semibold text-amber-300">
            <MapPin className="w-3 h-3 text-red-400" />
            Head Office: Hyderabad
          </span>
          <span className="text-emerald-500">·</span>
          <span className="flex items-center gap-1 font-semibold text-amber-300">
            <MapPin className="w-3 h-3 text-red-400" />
            Branch: Manna Ekhelli (Karnataka)
          </span>
          <span className="text-emerald-500">·</span>
          <span className="font-semibold text-amber-300">Makkah Desk</span>
        </div>
        <p className="text-[10px] text-emerald-400/60">
          © 2026 Al-Hindwan Tours & Travels. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
