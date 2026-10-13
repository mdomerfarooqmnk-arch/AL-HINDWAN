import React, { useState } from 'react';
import {
  Layers, Package, Sparkles, Plane, Building2, FileCheck2,
  Compass, Utensils, Droplets, Shirt, CheckCircle2, Phone,
  ArrowRight, ShieldCheck, MapPin, Calendar, Clock, Award, Star
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServicesHubProps {
  onSelectService?: (service: ServiceCategory) => void;
  onExplorePackages?: () => void;
  onBookNow?: () => void;
}

export const ServicesHub: React.FC<ServicesHubProps> = ({
  onSelectService,
  onExplorePackages,
  onBookNow
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const servicesList = [
    {
      id: 'umrah',
      title: 'Umrah Packages & Custom Groups',
      arabic: 'باقات العمرة المتميزة',
      category: 'packages',
      tag: 'Year-Round Departures',
      icon: '🕋',
      description: 'Comprehensive 15 & 21-day programs with 5-star Clock Tower or budget shuttle hotels, direct return flights, and experienced scholarly guidance.',
      details: [
        'Haram Frontage Hotels (Fairmont Clock Tower, Swissotel, Oberoi)',
        'Direct Flights from Hyderabad, Mumbai, Delhi, and Bangalore',
        '3x Daily Full-Board Authentic Indian Buffet Catering',
        'High-Speed Haramain Train transfers between Makkah & Madinah',
        'Complete Ground Handling with Al-Hindwan representative escort'
      ],
      highlights: 'Starting ₹78,000 / person (Quad Sharing)',
      actionText: 'Explore Umrah Packages'
    },
    {
      id: 'hajj',
      title: 'Royal Hajj 1447H / 2026 Programs',
      arabic: 'رحلات الحج المبارك',
      category: 'packages',
      tag: 'Official Ministry Quota',
      icon: '🕌',
      description: 'VIP non-shifting and shifting Hajj programs with air-conditioned European tents in Mina, Mashair train pass, and complete spiritual mentorship.',
      details: [
        'VIP European AC Tents in Mina with sofa-cum-beds & 24/7 catering',
        'Mashair Metro Train Pass for seamless Mina-Arafat-Muzdalifah transit',
        'Experienced Muallim & Islamic Scholars for step-by-step guidance',
        'Adahi (Qurbani) arranged through official Islamic Development Bank',
        'Dedicated 24/7 Medical Doctor & Female Assistant in camp'
      ],
      highlights: 'Limited Quota · Early Registration Open',
      actionText: 'View Hajj Details'
    },
    {
      id: 'catering',
      title: 'Hyderabadi Khana, Zamzam & Pilgrim Amenities',
      arabic: 'الإعاشة الحيدرآبادية ومياه زمزم والغسيل',
      category: 'hospitality',
      tag: 'Authentic Hyderabadi Zaika',
      icon: '🍲',
      description: 'Freshly prepared authentic Hyderabadi meals cooked by native chefs in our central Makkah & Madinah kitchens, 5L King Abdullah Zamzam quota, and express laundry.',
      details: [
        'Breakfast: Hot Chai, Idli/Wada, Poori-Bhaji, Paratha & Anda Bhurji',
        'Lunch & Dinner: Hyderabadi Dum Biryani, Bagara Khana, Dalcha, Khatti Dal, Tala Hua Gosht, Shahi Tukda',
        '5-Litre Sealed Blessed Zamzam Container packed directly at Kudai/King Abdullah Project for every pilgrim',
        'Complimentary Express Laundry (wash & fold) twice a week in both holy cities',
        '24/7 Hot Water Kettle, Chai station & bottled mineral water in rooms'
      ],
      highlights: 'Included with all Al-Hindwan Group Packages',
      actionText: 'Learn About Catering'
    },
    {
      id: 'rawdah',
      title: 'Rawdah Permit (Riyaz Ul Jannah) Nusuk Assistance',
      arabic: 'تصاريح الروضة الشريفة - رياض الجنة',
      category: 'permits',
      tag: 'Daily Booking Available',
      icon: '🟢',
      description: 'Daily permit reservation and timing coordination to pray in the blessed Riyaz ul Jannah between the Prophet’s house and pulpit (Sahih Bukhari).',
      details: [
        'Gents Entry via Gate 38 (Al-Salam Courtyard)',
        'Ladies Dedicated Gate 24 / 37 with morning and evening prayer windows',
        'Active Nusuk slot monitoring by our Madinah ground staff',
        'Escorted group entry for senior citizens needing assistance'
      ],
      highlights: '100% Confirmation Assistance Guarantee',
      actionText: 'Request Rawdah Permit'
    },
    {
      id: 'flight',
      title: 'Group Airlines & Direct Saudi Flights',
      arabic: 'حجوزات الطيران المباشر',
      category: 'transport',
      tag: 'Direct Flights to JED / MED',
      icon: '✈️',
      description: 'Direct return group flights via Saudia Boeing 787, Emirates, and Air India with 46kg check-in baggage allowance plus 5L Zamzam complimentary box.',
      details: [
        'Direct Hyderabad (HYD) to Jeddah / Madinah return flights',
        'Mumbai (BOM) & Delhi (DEL) group departures',
        'Generous Baggage: 46kg (2 x 23kg pieces) + 7kg cabin baggage',
        'Airport Meet & Greet at VIP Terminal with Ihram assistance'
      ],
      highlights: 'Baggage 46kg + 5L Zamzam included',
      actionText: 'Check Flight Schedules'
    },
    {
      id: 'hotel',
      title: 'Haram Frontage Hotels & Suites Directory',
      arabic: 'فنادق مكة المكرمة والمدينة المنورة',
      category: 'hospitality',
      tag: 'Zero-Meter to Courtyard',
      icon: '🏨',
      description: 'Direct contracted inventory in Makkah (Clock Tower Fairmont, Swissotel, Pullman) and Madinah (The Oberoi, Anwar Al Madinah Mövenpick, Dar Al Taqwa).',
      details: [
        'Direct elevator access to Haram courtyards in Makkah',
        'Facing Ladies and Gents gates in Madinah An-Nabawi',
        'Full Wi-Fi, 24/7 room service, and English/Urdu speaking reception',
        'Shuttle service option: 24/7 private AC coaster buses every 5 minutes'
      ],
      highlights: 'Fairmont · Oberoi · Pullman · Swissotel',
      actionText: 'View Hotels Directory'
    },
    {
      id: 'visa',
      title: 'Saudi Umrah Visa & Biometrics (KSA Visa / Nusuk)',
      arabic: 'تأشيرات العمرة ومنصة نسك',
      category: 'permits',
      tag: 'Fast-Track 24-48h Approval',
      icon: '📜',
      description: 'Ministry of Hajj & Umrah authorized visa processing with mandatory medical health insurance coverage valid across all Saudi hospitals.',
      details: [
        'Multiple Entry 1-Year Tourist eVisa or 90-Day Umrah eVisa',
        'Official Saudi Tawakkalna & Nusuk platform integration',
        'Mandatory KSA Ministry medical insurance included',
        'Document verification desk with instant error checks'
      ],
      highlights: 'Authorized by Ministry of Hajj & Umrah',
      actionText: 'Check Visa Requirements'
    },
    {
      id: 'ziyarat',
      title: 'Sacred Historical Ziyarat Tours',
      arabic: 'المزارات التاريخية الشريفة',
      category: 'transport',
      tag: 'Scholar-Guided Luxury AC Buses',
      icon: '⛰️',
      description: 'Spiritual educational excursions in Makkah and Madinah with knowledgeable scholars narrating the history of Seerah and the Companions.',
      details: [
        'Makkah: Cave of Hira (Jabal Al Nour), Cave of Thawr, Mount Arafat (Jabal Al Rahma), Mina, Muzdalifah',
        'Madinah: Masjid Quba (prayer reward equal to Umrah), Mount Uhud & Shuhada Cemetery, Masjid Qiblatayn, Seven Mosques',
        'Historic Date Farm visits in Madinah with Ajwa dates tasting',
        'Luxury air-conditioned Mercedes / Volvo touring coaches'
      ],
      highlights: 'Led by Qualified Islamic Scholars',
      actionText: 'Explore Ziyarat Itinerary'
    }
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>Al-Hindwan Comprehensive Service Portfolio</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            End-to-End Pilgrimage Services & Amenities
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            From visa processing and 5-star Clock Tower accommodation to authentic Hyderabadi culinary catering, 5L Zamzam quota, and daily Rawdah permits — everything is organized under one trusted Ministry-authorized roof.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            {[
              { id: 'all', label: 'All Services (8)' },
              { id: 'packages', label: 'Umrah & Hajj Packages' },
              { id: 'hospitality', label: 'Catering, Hotels & Zamzam' },
              { id: 'permits', label: 'Visas & Rawdah Permits' },
              { id: 'transport', label: 'Flights & Ziyarat Transport' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-emerald-900 text-amber-300 shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#c5a059]/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
                      {svc.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8d6c29] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {svc.tag}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-emerald-800 font-arabic">
                        {svc.arabic}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {svc.description}
                </p>

                {/* Bulleted Details */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {svc.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {svc.highlights}
                </span>

                <button
                  onClick={() => {
                    if (onSelectService) onSelectService(svc.id as ServiceCategory);
                    if (onExplorePackages) onExplorePackages();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-900 to-[#062e22] text-amber-300 text-xs font-bold rounded-lg hover:brightness-110 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>{svc.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Highlight Box for Hyderabadi Khana & Head Office Contact */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#062e22] to-[#042017] rounded-2xl p-6 sm:p-8 text-white border border-[#c5a059]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍲</span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Specialty Dining & Care Guarantee
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Authentic Hyderabadi Khana & 5L Zamzam Water for Every Pilgrim
            </h3>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              We understand the comfort of familiar food during rigorous spiritual days. Our dedicated Hyderabadi chefs prepare fresh hot meals with native spices daily, paired with laundry facilities and sealed Zamzam containers direct from the King Abdullah project.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (onBookNow) onBookNow();
              }}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] font-bold text-xs rounded-xl shadow-md hover:brightness-105 transition-all cursor-pointer text-center"
            >
              Book a Package Today
            </button>
            <a
              href="https://wa.me/919989868786?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20inquire%20about%20Al-Hindwan%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-3 bg-emerald-900 border border-[#c5a059]/50 text-amber-300 font-semibold text-xs rounded-xl hover:bg-emerald-850 transition-all flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>WhatsApp Us Direct</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
