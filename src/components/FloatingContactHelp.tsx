import React, { useState } from 'react';
import { MessageSquare, Phone, X, MapPin, Smartphone, Download } from 'lucide-react';

interface FloatingContactHelpProps {
  onOpenApkModal?: () => void;
}

export const FloatingContactHelp: React.FC<FloatingContactHelpProps> = ({ onOpenApkModal }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanded Quick Contacts Drawer */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-[#c5a059]/40 p-4 w-80 text-slate-800 text-xs animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Al-Hindwan Support Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 py-2">
            Connect instantly with our offices for Umrah packages, visa updates, or direct guidance.
          </p>

          {onOpenApkModal && (
            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenApkModal();
                }}
                className="w-full py-2 px-3 bg-gradient-to-r from-[#062e22] to-emerald-900 hover:brightness-110 text-amber-300 font-extrabold text-xs rounded-xl shadow border border-[#c5a059]/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Install Android App</span>
              </button>
            </div>
          )}

          <div className="space-y-3">
            {/* Hyderabad Head Office */}
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[11px] text-amber-950 uppercase">
                  Head Office · Hyderabad
                </span>
                <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">HO</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <a
                  href="tel:+919700762916"
                  className="flex-1 py-1 px-2 bg-slate-900 text-amber-300 rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-slate-800"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>Call 9700762916</span>
                </a>
                <a
                  href="https://wa.me/919700762916?text=Assalamu%20Alaikum%20Al%20Hindwan%20Head%20Office"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1 px-2 bg-[#25D366] text-white rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-[#20ba5a]"
                >
                  <MessageSquare className="w-3 h-3 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Manna Ekhelli Branch */}
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[11px] text-emerald-950 uppercase">
                  Branch Office · Manna Ekhelli
                </span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Branch</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <a
                  href="tel:+919743481876"
                  className="flex-1 py-1 px-2 bg-slate-900 text-amber-300 rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-slate-800"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>Call 9743481876</span>
                </a>
                <a
                  href="https://wa.me/919743481876?text=Assalamu%20Alaikum%20Al%20Hindwan%20Branch%20Office"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1 px-2 bg-[#25D366] text-white rounded-lg text-center font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-[#20ba5a]"
                >
                  <MessageSquare className="w-3 h-3 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Floating Action Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs transition-transform hover:scale-105 active:scale-95 border-2 border-white cursor-pointer"
        title="Contact Al-Hindwan Support on WhatsApp / Call"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </button>
    </div>
  );
};
