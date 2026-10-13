import React from 'react';
import { Plane, Building, FileCheck2, Compass, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServicesGridProps {
  onSelectService: (service: ServiceCategory) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'umrah' as ServiceCategory,
      title: 'Umrah Packages',
      arabic: 'باقات العمرة',
      tag: 'Year-Round Departures',
      description: 'Comprehensive 15 & 21-day packages with 5-star Clock Tower or budget shuttle hotels, direct flights, and full guidance.',
      features: ['Haram Front Hotels', 'Direct Airlines', 'Full Board Buffet', 'Scholarly Mentorship'],
      icon: '🕋',
      color: 'from-emerald-900 to-[#062e22]'
    },
    {
      id: 'hajj' as ServiceCategory,
      title: 'Hajj Packages',
      arabic: 'رحلات الحج المبارك',
      tag: 'Hajj 1447H / 2026',
      description: 'VIP non-shifting and shifting Hajj programs with air-conditioned European tents in Mina, Mashair train pass, and Adahi.',
      features: ['VIP Mina Camp', 'Mashair Metro Pass', 'Experienced Muallim', '24/7 Medical Care'],
      icon: '🕌',
      color: 'from-amber-950 to-[#062e22]'
    },
    {
      id: 'rawdah' as ServiceCategory,
      title: 'Rawdah Permit (Riyaz Ul Jannah)',
      arabic: 'تصاريح الروضة الشريفة - رياض الجنة',
      tag: 'Daily Available · Gents & Ladies',
      description: 'Daily permit booking and timing assistance to pray in the blessed Riyaz ul Jannah between the Prophet’s house and pulpit (Sahih Bukhari).',
      features: ['Gents Gate 38 (Al-Salam)', 'Ladies Dedicated Gate 24/37', 'Live Nusuk Slot Tracking', 'Daily Morning & Night Windows'],
      icon: '🟢',
      color: 'from-emerald-900 to-[#042017]'
    },
    {
      id: 'flight' as ServiceCategory,
      title: 'Flights & Transit',
      arabic: 'حجوزات الطيران المباشر',
      tag: 'Direct to JED / MED',
      description: 'Direct return group flights via Saudia Boeing 787 and Emirates with 46kg baggage allowance + Zamzam complimentary quota.',
      features: ['BOM/DEL to Jeddah', 'Madinah Departure', '46kg Baggage + 5L Zamzam', 'VIP Transit Lounge'],
      icon: '✈️',
      color: 'from-teal-950 to-[#062e22]'
    },
    {
      id: 'hotel' as ServiceCategory,
      title: 'Hotels Directory',
      arabic: 'فنادق مكة والمدينة',
      tag: 'Zero-Meter to Courtyard',
      description: 'Curated 5-star, 4-star, and economy hotels in Makkah (Clock Tower, Pullman) & Madinah (Oberoi, Anwar Mövenpick).',
      features: ['Haram-view Suites', 'Direct Elevator Access', '24/7 Free Shuttles', 'Gourmet Indian Food'],
      icon: '🏨',
      color: 'from-emerald-950 to-[#062e22]'
    },
    {
      id: 'visa' as ServiceCategory,
      title: 'Saudi Visa & Nusuk',
      arabic: 'تأشيرات العمرة ومنصة نسك',
      tag: 'Fast-Track Processing',
      description: 'Official Ministry approved Umrah visa, Saudi Tourist eVisa, biometric appointment support, and Nusuk Rawdah booking.',
      features: ['Tourist & Umrah e-Visa', 'Mandatory Insurance', 'Nusuk Rawdah Slotting', 'Biometric Guidance'],
      icon: '📜',
      color: 'from-stone-900 to-[#062e22]'
    },
    {
      id: 'ziyarat' as ServiceCategory,
      title: 'Sacred Ziyarat Tours',
      arabic: 'المزارات التاريخية الشريفة',
      tag: 'Historical Scholar Guided',
      description: 'Educational visits to Cave of Hira, Mount Arafat, Mina, Muzdalifah, Masjid Quba, Mount Uhud, and historic date farms.',
      features: ['Luxury AC Coaches', 'Historical Scholar Commentary', 'Cave of Hira & Thawr', 'Quba & Uhud in Madinah'],
      icon: '⛰️',
      color: 'from-green-950 to-[#062e22]'
    },
    {
      id: 'catering' as ServiceCategory,
      title: 'Hyderabadi Khana, Zamzam & Care',
      arabic: 'الإعاشة الحيدرآبادية وسقيا زمزم',
      tag: 'Hyderabadi Zaika · Zamzam · Laundry',
      description: 'Authentic Hyderabadi culinary catering (Bagara Khana, Dalcha, Dum Biryani), sealed 5L King Abdullah Zamzam water quota, and complimentary laundry in Makkah & Madinah.',
      features: ['Authentic Hyderabadi Chefs', '5L Sealed Zamzam Can', 'Complimentary Laundry', 'Morning Chai & Snacks'],
      icon: '🍲',
      color: 'from-amber-950 to-[#062e22]'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8d6c29] tracking-wider uppercase mb-1">
            <Award className="w-4 h-4 text-[#c5a059]" />
            <span>Comprehensive Pilgrimage Solutions</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Our Core Pilgrimage Services
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Everything you need for an accepted and serene pilgrimage under one trusted roof, with personalized attention at every step.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv.id)}
              className="group bg-white rounded-xl border border-slate-200 hover:border-[#c5a059] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    {srv.tag}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {srv.title}
                  </h3>
                  <span className="font-arabic text-xs text-slate-400">{srv.arabic}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>

                {/* Bullet Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 mb-4">
                  {srv.features.map((ft, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-50 group-hover:bg-[#062e22] text-slate-700 group-hover:text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Explore {srv.title}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
