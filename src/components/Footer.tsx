import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, MessageSquare, Smartphone } from 'lucide-react';
import { AlHindwanLogo } from './AlHindwanLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenApkModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenApkModal }) => {
  return (
    <footer className="bg-[#042017] text-white border-t border-[#c5a059]/30 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Core Value Ribbon Banner */}
        <div className="mb-10 pb-6 border-b border-emerald-900/60 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase">
            <span>JOURNEY</span>
            <span className="text-emerald-500">|</span>
            <span>RELIABLE</span>
            <span className="text-emerald-500">|</span>
            <span>ACCOMMODATION</span>
            <span className="text-emerald-500">|</span>
            <span className="text-white bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">HYDERABADI KHANA</span>
            <span className="text-emerald-500">|</span>
            <span>MADINAH ZIYARAT</span>
            <span className="text-emerald-500">|</span>
            <span>ZAM ZAM WATER</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-900/60">
          {/* Brand & Accreditation */}
          <div className="space-y-4">
            <AlHindwanLogo size="md" className="drop-shadow-lg" />
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Serving the Guests of Ar-Rahman with excellence, integrity, and warmth for over two decades. Licensed Hajj & Umrah Tour Operator.
            </p>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#062e22] border border-emerald-800 text-[10px] text-amber-300 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Ministry License #1447-UMR</span>
              </div>
              {onOpenApkModal && (
                <button
                  type="button"
                  onClick={onOpenApkModal}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-emerald-950 text-xs font-extrabold shadow-md cursor-pointer transition-all w-fit mt-1"
                >
                  <Smartphone className="w-4 h-4 text-emerald-950" />
                  <span>Install Android App</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <span className="text-amber-300 font-bold uppercase tracking-wider block mb-2 font-heading">
              Services & Packages
            </span>
            <ul className="space-y-1.5 text-emerald-200/80">
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Royal Clock Tower Umrah
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  VIP Non-Shifting Hajj 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Ramadan Last 10 Days in Haram
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Classic Budget Economy Umrah
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('info')} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Makkah & Madinah Hotels Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Head Office - Hyderabad */}
          <div className="space-y-2 text-xs text-emerald-200/80">
            <div className="p-1 px-2.5 rounded bg-gradient-to-r from-[#7a0d0d] to-[#a31515] border border-amber-300 text-white font-extrabold text-[11px] uppercase tracking-wider inline-block">
              HEAD OFFICE – HYDERABAD
            </div>

            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                #18-13-6/74/3 to 8, Hashamabad, Chandrayangutta, Hyderabad, Telangana – 500053
              </p>
            </div>

            <div className="pt-1 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+919700762916" className="text-white hover:text-amber-300 font-mono font-bold">
                  +91 9700762916
                </a>
                <a
                  href="https://wa.me/919700762916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:brightness-125"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+918555943416" className="text-white hover:text-amber-300 font-mono font-bold">
                  +91 8555943416
                </a>
                <a
                  href="https://wa.me/918555943416"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:brightness-125"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                </a>
              </div>
            </div>
          </div>

          {/* Branch Office - Manna Ekhelli */}
          <div className="space-y-2 text-xs text-emerald-200/80">
            <div className="p-1 px-2.5 rounded bg-gradient-to-r from-[#7a0d0d] to-[#a31515] border border-amber-300 text-white font-extrabold text-[11px] uppercase tracking-wider inline-block">
              BRANCH OFFICE – MANNA EKHELLI
            </div>

            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                1st Floor, Gram Panchayat Complex, Near Ambedkar Circle, Manna Ekhelli, Karnataka – 585227
              </p>
            </div>

            <div className="pt-1 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+919743481876" className="text-white hover:text-amber-300 font-mono font-bold">
                  +91 9743481876
                </a>
                <a
                  href="https://wa.me/919743481876"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:brightness-125"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+919739481876" className="text-white hover:text-amber-300 font-mono font-bold">
                  +91 9739481876
                </a>
                <a
                  href="https://wa.me/919739481876"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:brightness-125"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/70 gap-2">
          <div>
            © 2026 Al-Hindwan Tours & Travels. Head Office: Hyderabad | Branch: Manna Ekhelli, Karnataka. Registered with Ministry of Hajj & Umrah.
          </div>
          <div className="flex items-center gap-1">
            <span>Serving the pilgrims of Baitullah with Hyderabadi hospitality</span>
            <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
