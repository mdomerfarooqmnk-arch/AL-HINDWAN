import React from 'react';
import { TravelPackage } from '../types';
import { X, Check, Plane, Building2, Calendar, MapPin, ShieldCheck, Droplets, Users, ArrowRight } from 'lucide-react';

interface PackageDetailModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TravelPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose, onBookNow }) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="relative bg-[#062e22] text-white p-6 border-b border-[#c5a059]/40">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22]">
              {pkg.tier}
            </span>
            <span className="text-xs text-emerald-200">
              {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {pkg.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-100">
            <span className="flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-amber-400" />
              {pkg.airline}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Ex: {pkg.departureCity}
            </span>
            <span>·</span>
            <span className="text-amber-300 font-semibold">
              ★ {pkg.rating} ({pkg.reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* Key Hotel Proximity highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
              <Building2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Makkah Al-Mukarramah ({pkg.makkahNights} Nights)
                </span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">{pkg.makkahHotel}</p>
                <p className="text-xs text-emerald-700 mt-1 font-medium">
                  Approx. {pkg.makkahDistanceMeters}m from Holy Haram piazza
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <Building2 className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                  Madinah Al-Munawwarah ({pkg.madinahNights} Nights)
                </span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">{pkg.madinahHotel}</p>
                <p className="text-xs text-amber-800 mt-1 font-medium">
                  Approx. {pkg.madinahDistanceMeters}m from Prophet’s Mosque Gates
                </p>
              </div>
            </div>
          </div>

          {/* Hotel Gallery Photos */}
          {pkg.hotelPhotos && pkg.hotelPhotos.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                Hotel Rooms & Property Gallery ({pkg.hotelPhotos.length} Photos)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {pkg.hotelPhotos.map((hUrl, i) => (
                  <div key={i} className="h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                    <img
                      src={hUrl}
                      alt="Hotel interior"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food & Dining Gallery */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <span>🍽️</span>
                <span>Dining, Buffet Spread & Meal Plans</span>
              </h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                {pkg.mealPlan || 'Full Board Buffet'}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {pkg.mealDescription || 'Delicious multi-cuisine buffet prepared three times daily by dedicated Indian & Arabic chefs.'}
            </p>

            {pkg.foodPhotos && pkg.foodPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {pkg.foodPhotos.map((fUrl, i) => (
                  <div key={i} className="h-24 rounded-lg overflow-hidden border border-amber-200 bg-white group">
                    <img
                      src={fUrl}
                      alt="Food spread"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing by Room Sharing */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Pricing Breakdown (Per Pilgrim)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
                <span className="text-xs text-slate-500 block">Quad Sharing</span>
                <span className="text-base font-bold text-slate-900">₹{pkg.priceQuad.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">4 in room</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
                <span className="text-xs text-slate-500 block">Triple Sharing</span>
                <span className="text-base font-bold text-slate-900">₹{pkg.priceTriple.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">3 in room</span>
              </div>
              <div className="p-3 rounded-lg border-2 border-emerald-600 bg-emerald-50/40 text-center relative">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                  Popular
                </span>
                <span className="text-xs text-emerald-800 font-medium block">Double / Twin</span>
                <span className="text-base font-bold text-emerald-900">₹{pkg.priceDouble.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">2 in room</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-center">
                <span className="text-xs text-slate-500 block">Single Private</span>
                <span className="text-base font-bold text-slate-900">₹{pkg.priceSingle.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">1 in room</span>
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Everything Included in This Package
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{inc.title}</span>
                    <span className="text-[11px] text-slate-600">{inc.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Day-by-Day Itinerary */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Day-by-Day Sacred Itinerary
              </h4>
              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="flex gap-3 text-xs">
                    <div className="w-12 h-7 rounded bg-[#062e22] text-amber-300 font-bold flex items-center justify-center shrink-0">
                      Day {day.day}
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-slate-900">{day.title}</span>
                        <span className="text-[10px] text-emerald-800 font-semibold px-2 py-0.2 bg-emerald-100/60 rounded">
                          {day.city}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Departure Batches */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Confirmed Group Departure Batches
            </h4>
            <div className="flex flex-wrap gap-2">
              {pkg.departureDates.map((date, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  {date}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-emerald-800">{pkg.spotsLeft} seats remaining</span> in current batch.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#062e22] to-[#0d4d3a] hover:from-[#0a3f2f] hover:to-[#125d47] text-amber-300 text-xs font-bold rounded-lg shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Proceed to Booking Wizard</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
