import React from 'react';
import { Phone, MapPin, MessageSquare, ExternalLink } from 'lucide-react';

interface ContactOfficesSectionProps {
  className?: string;
  showTitle?: boolean;
}

export const ContactOfficesSection: React.FC<ContactOfficesSectionProps> = ({
  className = '',
  showTitle = true
}) => {
  return (
    <section className={`w-full py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Core Value Ribbon Banner from Screenshot */}
        <div className="bg-[#042017] border border-[#c5a059]/40 rounded-xl px-4 py-2.5 text-center shadow-md overflow-x-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider whitespace-nowrap uppercase">
            <span>JOURNEY</span>
            <span className="text-emerald-500 font-normal">|</span>
            <span>RELIABLE</span>
            <span className="text-emerald-500 font-normal">|</span>
            <span>ACCOMMODATION</span>
            <span className="text-emerald-500 font-normal">|</span>
            <span className="text-white bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">HYDERABADI KHANA</span>
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

        {showTitle && (
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">
              OFFICIAL CONTACT CHANNELS
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Visit Our Offices & 24/7 Pilgrim Support
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Connect directly with our dedicated directors and ground staff for customized Umrah packages, visa clearance, and flight bookings.
            </p>
          </div>
        )}

        {/* The Two Official Office Cards Matching the Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 1: HEAD OFFICE – HYDERABAD */}
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#fbe39d] via-[#d4a34b] to-[#8d6722] shadow-xl overflow-hidden group">
            <div className="bg-white rounded-[22px] p-5 sm:p-6 h-full flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Subtle Charminar Silhouette Background / Watermark */}
              <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-48 h-48 select-none">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-900">
                  <path d="M40 180 L40 80 L55 80 L55 30 L65 20 L75 30 L75 80 L125 80 L125 30 L135 20 L145 30 L145 80 L160 80 L160 180 Z M60 140 C60 110, 140 110, 140 140 Z" />
                </svg>
              </div>

              <div>
                {/* Red & Gold Ribbon Header */}
                <div className="mx-auto -mt-2 mb-5 w-fit">
                  <div className="bg-gradient-to-r from-[#7a0d0d] via-[#a31515] to-[#7a0d0d] text-white px-6 py-2 rounded-xl border border-amber-300 shadow-md flex items-center justify-center gap-2">
                    <span className="font-heading font-extrabold text-xs sm:text-sm tracking-wider uppercase text-amber-200">
                      HEAD OFFICE – HYDERABAD
                    </span>
                  </div>
                </div>

                {/* Phone & WhatsApp Contacts */}
                <div className="space-y-3 relative z-10 mb-6">
                  {/* Phone 1: +91 9700762916 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="tel:+919700762916"
                        className="w-8 h-8 rounded-full bg-[#084d37] hover:bg-[#0b6448] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Call Head Office"
                      >
                        <Phone className="w-4 h-4 text-emerald-200" />
                      </a>
                      <a
                        href="https://wa.me/919700762916?text=Assalamu%20Alaikum%2C%20I%20am%20inquiring%20about%20Al%20Hindwan%20Umrah%20Packages"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                      </a>
                    </div>
                    <a
                      href="tel:+919700762916"
                      className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight hover:text-emerald-800 transition-colors"
                    >
                      +91 9700762916
                    </a>
                  </div>

                  {/* Phone 2: +91 8555943416 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="tel:+918555943416"
                        className="w-8 h-8 rounded-full bg-[#084d37] hover:bg-[#0b6448] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Call Head Office"
                      >
                        <Phone className="w-4 h-4 text-emerald-200" />
                      </a>
                      <a
                        href="https://wa.me/918555943416?text=Assalamu%20Alaikum%2C%20I%20am%20inquiring%20about%20Al%20Hindwan%20Umrah%20Packages"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                      </a>
                    </div>
                    <a
                      href="tel:+918555943416"
                      className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight hover:text-emerald-800 transition-colors"
                    >
                      +91 8555943416
                    </a>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3 relative z-10 pt-4 border-t border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-600 fill-red-600" />
                  </div>
                  <div>
                    <span className="font-extrabold text-red-700 text-xs uppercase tracking-wider block">
                      Office Address:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mt-0.5">
                      #18-13-6/74/3 to 8, Hashamabad, Chandrayangutta, Hyderabad, Telangana – 500053
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 flex flex-wrap items-center gap-2 relative z-10">
                <a
                  href="https://wa.me/919700762916?text=Assalamu%20Alaikum%20Al%20Hindwan%20Tours%2C%20I%20want%20to%20book%20an%20Umrah%20Package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Hyderabad</span>
                </a>
                <a
                  href="tel:+919700762916"
                  className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Office</span>
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2: BRANCH OFFICE – MANNA EKHELLI */}
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#fbe39d] via-[#d4a34b] to-[#8d6722] shadow-xl overflow-hidden group">
            <div className="bg-white rounded-[22px] p-5 sm:p-6 h-full flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Subtle Heritage Landmark Silhouette Background */}
              <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-48 h-48 select-none">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-900">
                  <path d="M20 180 L20 100 L40 100 L40 60 L60 40 L80 60 L80 100 L120 100 L120 60 L140 40 L160 60 L160 100 L180 100 L180 180 Z" />
                </svg>
              </div>

              <div>
                {/* Red & Gold Ribbon Header */}
                <div className="mx-auto -mt-2 mb-5 w-fit">
                  <div className="bg-gradient-to-r from-[#7a0d0d] via-[#a31515] to-[#7a0d0d] text-white px-6 py-2 rounded-xl border border-amber-300 shadow-md flex items-center justify-center gap-2">
                    <span className="font-heading font-extrabold text-xs sm:text-sm tracking-wider uppercase text-amber-200">
                      BRANCH OFFICE – MANNA EKHELLI
                    </span>
                  </div>
                </div>

                {/* Phone & WhatsApp Contacts */}
                <div className="space-y-3 relative z-10 mb-6">
                  {/* Phone 1: +91 9743481876 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="tel:+919743481876"
                        className="w-8 h-8 rounded-full bg-[#084d37] hover:bg-[#0b6448] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Call Branch Office"
                      >
                        <Phone className="w-4 h-4 text-emerald-200" />
                      </a>
                      <a
                        href="https://wa.me/919743481876?text=Assalamu%20Alaikum%2C%20I%20am%20inquiring%20about%20Al%20Hindwan%20Branch%20Packages"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                      </a>
                    </div>
                    <a
                      href="tel:+919743481876"
                      className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight hover:text-emerald-800 transition-colors"
                    >
                      +91 9743481876
                    </a>
                  </div>

                  {/* Phone 2: +91 9739481876 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="tel:+919739481876"
                        className="w-8 h-8 rounded-full bg-[#084d37] hover:bg-[#0b6448] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Call Branch Office"
                      >
                        <Phone className="w-4 h-4 text-emerald-200" />
                      </a>
                      <a
                        href="https://wa.me/919739481876?text=Assalamu%20Alaikum%2C%20I%20am%20inquiring%20about%20Al%20Hindwan%20Branch%20Packages"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                      </a>
                    </div>
                    <a
                      href="tel:+919739481876"
                      className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight hover:text-emerald-800 transition-colors"
                    >
                      +91 9739481876
                    </a>
                  </div>
                </div>

                {/* Branch Address */}
                <div className="flex items-start gap-3 relative z-10 pt-4 border-t border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-600 fill-red-600" />
                  </div>
                  <div>
                    <span className="font-extrabold text-red-700 text-xs uppercase tracking-wider block">
                      Branch Address:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mt-0.5">
                      1st Floor, Gram Panchayat Complex, Near Ambedkar Circle, Manna Ekhelli, Karnataka – 585227
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 flex flex-wrap items-center gap-2 relative z-10">
                <a
                  href="https://wa.me/919743481876?text=Assalamu%20Alaikum%20Al%20Hindwan%20Tours%20Branch%2C%20I%20want%20to%20inquire%20about%20booking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Branch</span>
                </a>
                <a
                  href="tel:+919743481876"
                  className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Branch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
