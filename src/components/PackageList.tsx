import React, { useState } from 'react';
import { TravelPackage } from '../types';
import { MOCK_PACKAGES } from '../data/mockData';
import { PackageDetailModal } from './PackageDetailModal';
import { Plane, Building2, Calendar, MapPin, CheckCircle, ArrowRight, Star, Clock } from 'lucide-react';

interface PackageListProps {
  onSelectPackageForBooking: (pkg: TravelPackage) => void;
  filterCategory?: string;
  packages?: TravelPackage[];
}

export const PackageList: React.FC<PackageListProps> = ({
  onSelectPackageForBooking,
  filterCategory = 'all',
  packages = MOCK_PACKAGES
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(filterCategory);
  const [activePkgForDetail, setActivePkgForDetail] = useState<TravelPackage | null>(null);

  const filteredPackages = packages.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'umrah') return p.category === 'umrah';
    if (selectedCategory === 'hajj') return p.category === 'hajj';
    if (selectedCategory === 'ramadan') return p.title.toLowerCase().includes('ramadan');
    return true;
  });

  return (
    <section className="py-12 bg-slate-50 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-[#8d6c29] uppercase tracking-wider mb-1">
              Confirmed Departures 2026 – 2027
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Curated Umrah & Hajj Packages
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              All packages include complete visa endorsement, direct flights, 5L Zamzam & scholarly guidance.
            </p>
          </div>

          {/* Interactive filter tabs (Buttons per Frontend Design Constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Packages ({MOCK_PACKAGES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('umrah')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === 'umrah'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Umrah
            </button>
            <button
              onClick={() => setSelectedCategory('hajj')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === 'hajj'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hajj 1447H
            </button>
            <button
              onClick={() => setSelectedCategory('ramadan')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === 'ramadan'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ramadan VIP
            </button>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Card Banner Image & Metadata Header */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-950/90 text-amber-300 border border-[#c5a059]/40">
                    {pkg.tier}
                  </span>
                  <span className="text-[11px] font-semibold text-white bg-slate-900/80 px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-xs text-amber-200 mb-1">
                    <span>{pkg.category.toUpperCase()}</span>
                    <span>·</span>
                    <span>Ex {pkg.departureCity}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      {pkg.rating} ({pkg.reviewsCount})
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white line-clamp-1">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 space-y-4">
                {/* Hotel Proximity Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Makkah Hotel</span>
                    <p className="font-semibold text-slate-800 truncate mt-0.5">{pkg.makkahHotel}</p>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {pkg.makkahDistanceMeters}m to Haram ({pkg.makkahNights}N)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-900 uppercase block">Madinah Hotel</span>
                    <p className="font-semibold text-slate-800 truncate mt-0.5">{pkg.madinahHotel}</p>
                    <span className="text-[11px] text-amber-800 font-medium">
                      {pkg.madinahDistanceMeters}m to Masjid ({pkg.madinahNights}N)
                    </span>
                  </div>
                </div>

                {/* Key Inclusions preview */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Inclusions
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate">{pkg.airline.split(' ')[0]} Flight</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Saudi Visa & Medical</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>5-Star / 4-Star Buffet</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Holy Ziyarat Guided</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking Trigger */}
                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Starting from (Quad)</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-900">
                        ₹{pkg.priceQuad.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">/ person</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Double: ₹{pkg.priceDouble.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePkgForDetail(pkg)}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      View Itinerary
                    </button>
                    <button
                      onClick={() => onSelectPackageForBooking(pkg)}
                      className="px-4 py-2 bg-gradient-to-r from-[#062e22] to-[#0c4b37] hover:from-[#093d2e] hover:to-[#105a43] text-amber-300 text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activePkgForDetail && (
        <PackageDetailModal
          pkg={activePkgForDetail}
          onClose={() => setActivePkgForDetail(null)}
          onBookNow={(p) => {
            setActivePkgForDetail(null);
            onSelectPackageForBooking(p);
          }}
        />
      )}
    </section>
  );
};
