import React, { useState } from 'react';
import { HotelInfo, ZiyaratSite } from '../types';
import { MOCK_HOTELS, MOCK_ZIYARAT_SITES } from '../data/mockData';
import {
  Building2, MapPin, FileText, CheckCircle2, Star, ShieldCheck,
  AlertCircle, Compass, Bus, Clock, Calendar, ExternalLink
} from 'lucide-react';

export const InfoHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'hotels' | 'ziyarat' | 'visa'>('hotels');
  const [hotelCity, setHotelCity] = useState<'Makkah' | 'Madinah'>('Makkah');
  const [selectedZiyarat, setSelectedZiyarat] = useState<ZiyaratSite | null>(null);

  const filteredHotels = MOCK_HOTELS.filter((h) => h.city === hotelCity);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Hub Header */}
        <div className="bg-[#062e22] text-white rounded-2xl p-6 border border-[#c5a059]/40 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Traveler Guides & Resources
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Hotels, Sacred Ziyarat & Visa Center
              </h2>
              <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl">
                Comprehensive directory of Haram-adjacent hospitality, verified historical sites in Makkah & Madinah, and official Saudi visa guidelines.
              </p>
            </div>

            {/* Nav switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#042017] rounded-xl border border-emerald-800/80">
              <button
                onClick={() => setActiveSection('hotels')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeSection === 'hotels' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Hotels Directory</span>
              </button>

              <button
                onClick={() => setActiveSection('ziyarat')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeSection === 'ziyarat' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Ziyarat Holy Places</span>
              </button>

              <button
                onClick={() => setActiveSection('visa')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeSection === 'visa' ? 'bg-emerald-800 text-amber-300' : 'text-emerald-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Visa & Nusuk Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: HOTELS DIRECTORY WITH MAKKAH & MADINAH TABS */}
        {activeSection === 'hotels' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Curated Pilgrim Accommodations
                </h3>
                <p className="text-xs text-slate-500">
                  Verified walking distances to the prayer courtyards of the Two Holy Mosques.
                </p>
              </div>

              {/* City Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setHotelCity('Makkah')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    hotelCity === 'Makkah' ? 'bg-[#062e22] text-amber-300 shadow' : 'text-slate-600'
                  }`}
                >
                  Makkah Al-Mukarramah
                </button>
                <button
                  onClick={() => setHotelCity('Madinah')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    hotelCity === 'Madinah' ? 'bg-[#062e22] text-amber-300 shadow' : 'text-slate-600'
                  }`}
                >
                  Madinah Al-Munawwarah
                </button>
              </div>
            </div>

            {/* Hotel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((h) => (
                <div
                  key={h.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[11px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {h.stars}-Star Luxury
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <span className="text-[11px] bg-emerald-900/90 text-amber-300 px-2 py-0.5 rounded font-bold">
                          {h.distanceToHaram}m from Courtyard ({h.walkMinutes} min walk)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-heading text-base font-bold text-slate-900">{h.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{h.description}</p>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Key Amenities:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {h.amenities.map((am, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                            >
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="text-[11px] text-slate-500 truncate mb-2">
                      <MapPin className="w-3 h-3 inline text-emerald-700 mr-1" />
                      {h.address}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: ZIYARAT SACRED PLACES GRID */}
        {activeSection === 'ziyarat' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Historic Ziyarat Sites (Makkah & Madinah)
              </h3>
              <p className="text-xs text-slate-500">
                Explore sacred landmarks, mountains of revelation, and historical battlefields with scholarly context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_ZIYARAT_SITES.map((site) => (
                <div
                  key={site.id}
                  onClick={() => setSelectedZiyarat(site)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={site.image}
                        alt={site.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute top-2.5 right-2.5 bg-[#062e22] text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        {site.city}
                      </span>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <span className="font-arabic text-sm text-amber-200 block">{site.arabicName}</span>
                        <h4 className="font-heading text-base font-bold text-white">{site.name}</h4>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="text-xs text-emerald-800 font-semibold">{site.tagline}</p>
                      <p className="text-xs text-slate-600 line-clamp-3">{site.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      className="w-full py-1.5 bg-slate-50 hover:bg-[#062e22] text-slate-700 hover:text-amber-300 text-xs font-semibold rounded-lg transition-colors text-center"
                    >
                      View Spiritual Details & Advice →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: SAUDI VISA & NUSUK REQUIREMENTS */}
        {activeSection === 'visa' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Saudi Visa Regulations & Nusuk Guide (1448H)
              </h3>
              <p className="text-xs text-slate-500">
                Official checklist for Indian & international pilgrims travelling under Ministry guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Checklist */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                <h4 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Mandatory Documents for E-Visa Endorsement
                </h4>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Original Passport:</strong> Minimum 6 months validity from departure date, with at least 2 consecutive blank pages.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>White Background Photograph:</strong> 2 x 2 inches (51 x 51 mm), glossy finish, 80% face coverage, no shadows or spectacles.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>PAN Card & TCS Declaration:</strong> Mandatory for Reserve Bank of India LRS (Liberalised Remittance Scheme) currency remittance.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Meningitis & Polio Vaccine Certificate:</strong> Issued minimum 10 days prior to travel.
                    </div>
                  </div>
                </div>
              </div>

              {/* Nusuk Application Protocol */}
              <div className="p-5 rounded-xl border border-slate-200 bg-emerald-50/40 space-y-4">
                <h4 className="font-heading text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-emerald-700" />
                  Nusuk Platform & Rawdah Slotting
                </h4>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <p>
                    The Ministry of Hajj & Umrah requires every pilgrim to hold a verified Rawdah permit slot via the official <strong>Nusuk App</strong>.
                  </p>

                  <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1.5">
                    <strong className="text-emerald-900 block">How Al-Hindwan Tours & Travels Assists You:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>We generate your Visa Border Number upon flight issuance.</li>
                      <li>Our team books guaranteed Rawdah prayer slots for male and female groups.</li>
                      <li>Dedicated coordinator escorts the group to the Rawdah gate (Bab As-Salam).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ziyarat Detail Modal */}
      {selectedZiyarat && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-2 border-b">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {selectedZiyarat.city} Sacred Site
                </span>
                <h4 className="font-heading text-xl font-bold text-slate-900 mt-1">
                  {selectedZiyarat.name}
                </h4>
                <span className="font-arabic text-sm text-slate-500">{selectedZiyarat.arabicName}</span>
              </div>
              <button
                onClick={() => setSelectedZiyarat(null)}
                className="text-slate-400 hover:text-black font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="h-56 rounded-xl overflow-hidden">
              <img
                src={selectedZiyarat.image}
                alt={selectedZiyarat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 block mb-0.5">Historical Significance:</strong>
                <p className="leading-relaxed">{selectedZiyarat.historicalSignificance}</p>
              </div>

              <div>
                <strong className="text-slate-900 block mb-0.5">Pilgrim Advice & Etiquette:</strong>
                <p className="leading-relaxed bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-900">
                  {selectedZiyarat.visitingTips}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedZiyarat(null)}
                className="px-5 py-2 bg-[#062e22] text-amber-300 text-xs font-bold rounded-lg hover:bg-[#0a3f2f]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
