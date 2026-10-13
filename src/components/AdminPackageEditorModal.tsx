import React, { useState } from 'react';
import { TravelPackage, DayItinerary, PackageInclusion } from '../types';
import {
  X, Plus, Trash2, Check, Image as ImageIcon, Utensils, Building2,
  Calendar, Plane, ShieldCheck, Droplets, Train, ArrowRight, Sparkles, Upload
} from 'lucide-react';

interface AdminPackageEditorModalProps {
  packageToEdit: TravelPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onSavePackage: (pkg: TravelPackage) => void;
}

// Preset photo assets for quick 1-click addition
const PRESET_HOTEL_PHOTOS = [
  { name: 'Makkah Clock Tower Bedroom', url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80' },
  { name: 'Oberoi Madinah Luxury Suite', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pullman Zamzam Suite', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hotel Grand Courtyard View', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80' },
  { name: '5-Star Marble Bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' }
];

const PRESET_FOOD_PHOTOS = [
  { name: 'Grand Breakfast & Dinner Buffet', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Authentic Indian Desi Spread', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fresh Fruit & Gourmet Dining', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
  { name: 'Middle Eastern & Rice Special', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dessert & Arabic Sweets Counter', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' }
];

export const AdminPackageEditorModal: React.FC<AdminPackageEditorModalProps> = ({
  packageToEdit,
  isOpen,
  onClose,
  onSavePackage
}) => {
  const isEditing = Boolean(packageToEdit);

  // Form State
  const [title, setTitle] = useState<string>(packageToEdit?.title || '');
  const [category, setCategory] = useState<'umrah' | 'hajj'>(packageToEdit?.category || 'umrah');
  const [tier, setTier] = useState<TravelPackage['tier']>(packageToEdit?.tier || 'VIP Luxury');
  const [durationDays, setDurationDays] = useState<number>(packageToEdit?.durationDays || 15);
  const [departureCity, setDepartureCity] = useState<string>(packageToEdit?.departureCity || 'Mumbai / Delhi / Dubai');
  const [airline, setAirline] = useState<string>(packageToEdit?.airline || 'Saudia Direct Boeing 787');
  const [baggageAllowance, setBaggageAllowance] = useState<string>(packageToEdit?.baggageAllowance || '46kg (2x23kg) + 7kg cabin');
  const [coverImage, setCoverImage] = useState<string>(
    packageToEdit?.image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80'
  );

  // Pricing
  const [priceQuad, setPriceQuad] = useState<number>(packageToEdit?.priceQuad || 125000);
  const [priceTriple, setPriceTriple] = useState<number>(packageToEdit?.priceTriple || 138000);
  const [priceDouble, setPriceDouble] = useState<number>(packageToEdit?.priceDouble || 155000);
  const [priceSingle, setPriceSingle] = useState<number>(packageToEdit?.priceSingle || 210000);
  const [spotsLeft, setSpotsLeft] = useState<number>(packageToEdit?.spotsLeft || 12);

  // Accommodation
  const [makkahHotel, setMakkahHotel] = useState<string>(packageToEdit?.makkahHotel || 'Makkah Clock Royal Tower (Fairmont)');
  const [makkahDistanceMeters, setMakkahDistanceMeters] = useState<number>(packageToEdit?.makkahDistanceMeters || 50);
  const [makkahNights, setMakkahNights] = useState<number>(packageToEdit?.makkahNights || 8);
  const [madinahHotel, setMadinahHotel] = useState<string>(packageToEdit?.madinahHotel || 'The Oberoi Madinah');
  const [madinahDistanceMeters, setMadinahDistanceMeters] = useState<number>(packageToEdit?.madinahDistanceMeters || 80);
  const [madinahNights, setMadinahNights] = useState<number>(packageToEdit?.madinahNights || 7);

  // Photos
  const [hotelPhotos, setHotelPhotos] = useState<string[]>(
    packageToEdit?.hotelPhotos && packageToEdit.hotelPhotos.length > 0
      ? packageToEdit.hotelPhotos
      : [
          'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
        ]
  );
  const [newHotelPhotoUrl, setNewHotelPhotoUrl] = useState<string>('');

  const [foodPhotos, setFoodPhotos] = useState<string[]>(
    packageToEdit?.foodPhotos && packageToEdit.foodPhotos.length > 0
      ? packageToEdit.foodPhotos
      : [
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
        ]
  );
  const [newFoodPhotoUrl, setNewFoodPhotoUrl] = useState<string>('');

  // Dining
  const [mealPlan, setMealPlan] = useState<string>(
    packageToEdit?.mealPlan || 'Full Board Royal Buffet (3x Daily)'
  );
  const [mealDescription, setMealDescription] = useState<string>(
    packageToEdit?.mealDescription ||
      'Indian desi culinary spread with authentic Hyderabadi / Mumbai chefs. Unlimited breakfast, lunch, and dinner buffet with desserts, fresh cut fruits, and round-the-clock tea.'
  );

  // Departure Dates
  const [departureDates, setDepartureDates] = useState<string[]>(
    packageToEdit?.departureDates || ['15 Nov 2026', '01 Dec 2026', '15 Dec 2026', '10 Jan 2027']
  );
  const [newDateInput, setNewDateInput] = useState<string>('');

  // Transport & Inclusions
  const [trainTransfer, setTrainTransfer] = useState<boolean>(packageToEdit?.trainTransfer ?? true);
  const [zamzamIncluded, setZamzamIncluded] = useState<boolean>(packageToEdit?.zamzamIncluded ?? true);

  if (!isOpen) return null;

  const handleAddHotelPhoto = () => {
    if (newHotelPhotoUrl.trim()) {
      setHotelPhotos([...hotelPhotos, newHotelPhotoUrl.trim()]);
      setNewHotelPhotoUrl('');
    }
  };

  const handleRemoveHotelPhoto = (index: number) => {
    setHotelPhotos(hotelPhotos.filter((_, i) => i !== index));
  };

  const handleAddFoodPhoto = () => {
    if (newFoodPhotoUrl.trim()) {
      setFoodPhotos([...foodPhotos, newFoodPhotoUrl.trim()]);
      setNewFoodPhotoUrl('');
    }
  };

  const handleRemoveFoodPhoto = (index: number) => {
    setFoodPhotos(foodPhotos.filter((_, i) => i !== index));
  };

  const handleAddDate = () => {
    if (newDateInput.trim()) {
      setDepartureDates([...departureDates, newDateInput.trim()]);
      setNewDateInput('');
    }
  };

  const handleRemoveDate = (index: number) => {
    setDepartureDates(departureDates.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a package title.');
      return;
    }

    const defaultInclusions: PackageInclusion[] = [
      { icon: 'Plane', title: 'Direct Return Flights', description: `${airline} with ${baggageAllowance}` },
      { icon: 'Hotel', title: 'Haram Frontage Stay', description: `${makkahHotel} (${makkahDistanceMeters}m to Haram)` },
      { icon: 'ShieldCheck', title: 'Full Saudi Umrah Visa', description: 'With mandatory medical insurance coverage' },
      { icon: 'Utensils', title: mealPlan, description: mealDescription.slice(0, 75) + '...' },
      ...(trainTransfer
        ? [{ icon: 'Bus', title: 'Haramain Bullet Train', description: 'VIP High-Speed Rail transfer Makkah-Madinah' }]
        : []),
      ...(zamzamIncluded
        ? [{ icon: 'Droplets', title: '5L Blessed Zamzam Water', description: 'Official sealed King Abdullah project can' }]
        : []),
      { icon: 'MapPin', title: 'Sacred Holy Ziyarat', description: 'Private AC coach with experienced scholarly guide' }
    ];

    const updatedPackage: TravelPackage = {
      id: packageToEdit?.id || `pkg-${Date.now()}`,
      title,
      category,
      tier,
      durationDays: Number(durationDays),
      departureDates: departureDates.length > 0 ? departureDates : ['15 Nov 2026'],
      departureCity,
      airline,
      baggageAllowance,
      priceQuad: Number(priceQuad),
      priceTriple: Number(priceTriple),
      priceDouble: Number(priceDouble),
      priceSingle: Number(priceSingle),
      makkahHotel,
      makkahDistanceMeters: Number(makkahDistanceMeters),
      makkahNights: Number(makkahNights),
      madinahHotel,
      madinahDistanceMeters: Number(madinahDistanceMeters),
      madinahNights: Number(madinahNights),
      mealPlan,
      mealDescription,
      hotelPhotos,
      foodPhotos,
      trainTransfer,
      zamzamIncluded,
      image: coverImage,
      inclusions: defaultInclusions,
      itinerary: packageToEdit?.itinerary || [
        { day: 1, title: 'Arrival in Jeddah & Transfer to Makkah', description: 'Meet & greet at VIP lounge King Abdulaziz Airport. Perform 1st Umrah with guide.', city: 'Makkah' },
        { day: 3, title: 'Makkah Sacred Ziyarat Tour', description: 'Visit Cave of Hira, Cave of Thawr, Mina, and Jabal Al-Rahma in Arafat.', city: 'Makkah' },
        { day: 8, title: 'Transfer to Madinah Al-Munawwarah', description: 'Travel via luxury coach or Haramain train to Madinah hotel.', city: 'Madinah' },
        { day: 10, title: 'Madinah Holy Ziyarat', description: 'Visit Masjid Quba, Mount Uhud, and Masjid al-Qiblatayn.', city: 'Madinah' },
        { day: Number(durationDays), title: 'Departure with Blessed Memories', description: 'Transfer to Madinah Prince Mohammad Airport for return flight.', city: 'Madinah' }
      ],
      rating: packageToEdit?.rating || 4.95,
      reviewsCount: packageToEdit?.reviewsCount || 120,
      spotsLeft: Number(spotsLeft),
      featured: packageToEdit?.featured ?? true
    };

    onSavePackage(updatedPackage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#062e22] text-white p-5 border-b border-[#c5a059]/40 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60">
                Admin Control Room
              </span>
              <span className="text-xs text-emerald-200">Package Architect Desk</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {isEditing ? `Edit Package: ${packageToEdit?.title}` : 'Create New Umrah / Hajj Package'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scroll Area */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              1. Package Essentials & Cover Photo
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Package Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 15-Day Royal Clock Tower Umrah"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilgrimage Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                >
                  <option value="umrah">Umrah (Year-Round)</option>
                  <option value="hajj">Hajj 1447H / 2026</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Package Tier *</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                >
                  <option value="VIP Luxury">VIP Luxury (Clock Tower)</option>
                  <option value="Deluxe 5-Star">Deluxe 5-Star (Walking)</option>
                  <option value="Executive">Executive</option>
                  <option value="Economy Saver">Economy Saver (Shuttle)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration (Days) *</label>
                <input
                  type="number"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  min="5"
                  max="45"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Departure Gateway</label>
                <input
                  type="text"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  placeholder="Mumbai / Delhi / Dubai"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Available Seats</label>
                <input
                  type="number"
                  value={spotsLeft}
                  onChange={(e) => setSpotsLeft(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Airline & Flight Specs</label>
                <input
                  type="text"
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  placeholder="e.g. Saudia Direct Boeing 787 Dreamliner"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Baggage Quota</label>
                <input
                  type="text"
                  value={baggageAllowance}
                  onChange={(e) => setBaggageAllowance(e.target.value)}
                  placeholder="46kg (2x23kg) + 7kg cabin"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Cover Banner Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-white border border-slate-300 rounded-lg p-2 text-xs font-mono focus:outline-none focus:border-emerald-600"
                />
                <img
                  src={coverImage}
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded-lg border border-slate-300"
                  onError={(e) => {
                    (e.target as any).src = 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PRICING (SHARING TYPES) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
            <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <span className="text-amber-500 font-bold">₹</span>
              2. Room Sharing Pricing (Per Pilgrim in INR)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <label className="font-bold text-slate-600 block mb-1 text-[11px]">Quad Sharing (4 Pax)</label>
                <input
                  type="number"
                  value={priceQuad}
                  onChange={(e) => setPriceQuad(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded p-1.5 font-bold text-slate-900 text-sm focus:border-emerald-600"
                  required
                />
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <label className="font-bold text-slate-600 block mb-1 text-[11px]">Triple Sharing (3 Pax)</label>
                <input
                  type="number"
                  value={priceTriple}
                  onChange={(e) => setPriceTriple(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded p-1.5 font-bold text-slate-900 text-sm focus:border-emerald-600"
                  required
                />
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/60 border-2 border-emerald-600">
                <label className="font-bold text-emerald-900 block mb-1 text-[11px]">Double / Twin (2 Pax) *</label>
                <input
                  type="number"
                  value={priceDouble}
                  onChange={(e) => setPriceDouble(Number(e.target.value))}
                  className="w-full border border-emerald-400 rounded p-1.5 font-extrabold text-emerald-950 text-sm focus:border-emerald-700"
                  required
                />
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <label className="font-bold text-slate-600 block mb-1 text-[11px]">Single Private Room</label>
                <input
                  type="number"
                  value={priceSingle}
                  onChange={(e) => setPriceSingle(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded p-1.5 font-bold text-slate-900 text-sm focus:border-emerald-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: HOTEL DETAILS & HOTEL PHOTOS */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <Building2 className="w-4 h-4 text-emerald-700" />
              3. Makkah & Madinah Hotels and Hotel Photos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Makkah Hotel Name</label>
                <input
                  type="text"
                  value={makkahHotel}
                  onChange={(e) => setMakkahHotel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Haram Distance (Meters)</label>
                <input
                  type="number"
                  value={makkahDistanceMeters}
                  onChange={(e) => setMakkahDistanceMeters(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Makkah Nights</label>
                <input
                  type="number"
                  value={makkahNights}
                  onChange={(e) => setMakkahNights(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Madinah Hotel Name</label>
                <input
                  type="text"
                  value={madinahHotel}
                  onChange={(e) => setMadinahHotel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nabawi Distance (Meters)</label>
                <input
                  type="number"
                  value={madinahDistanceMeters}
                  onChange={(e) => setMadinahDistanceMeters(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Madinah Nights</label>
                <input
                  type="number"
                  value={madinahNights}
                  onChange={(e) => setMadinahNights(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Hotel Photos Gallery Manager */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                  Hotel Gallery Photos ({hotelPhotos.length} Photos)
                </span>
                <span className="text-[11px] text-slate-400">Add custom URLs or pick presets</span>
              </div>

              {/* Add Custom URL */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHotelPhotoUrl}
                  onChange={(e) => setNewHotelPhotoUrl(e.target.value)}
                  placeholder="Paste hotel photo image URL (https://...)"
                  className="flex-1 bg-white border border-slate-300 rounded-lg p-2 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddHotelPhoto}
                  className="px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Photo
                </button>
              </div>

              {/* Quick Presets Picker */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold self-center">Quick Presets:</span>
                {PRESET_HOTEL_PHOTOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!hotelPhotos.includes(preset.url)) {
                        setHotelPhotos([...hotelPhotos, preset.url]);
                      }
                    }}
                    className="text-[10px] bg-slate-200 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 px-2 py-0.5 rounded font-medium transition-colors"
                  >
                    + {preset.name}
                  </button>
                ))}
              </div>

              {/* Photos Grid Thumbnail Previews */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {hotelPhotos.map((url, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 h-24 bg-slate-100">
                    <img src={url} alt={`Hotel ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveHotelPhoto(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: FOOD, CATERING & FOOD PHOTOS */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <Utensils className="w-4 h-4 text-amber-600" />
              4. Food & Catering Options and Dining Photos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="font-bold text-slate-700 block mb-1">Meal Plan</label>
                <select
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                >
                  <option value="Full Board Royal Buffet (3x Daily)">Full Board Royal Buffet (3x Daily)</option>
                  <option value="Indian Desi Chef Homestyle Buffet">Indian Desi Chef Homestyle Buffet</option>
                  <option value="Half Board (Breakfast & Dinner Buffet)">Half Board (Breakfast & Dinner)</option>
                  <option value="Ramadan Suhoor & Iftar Buffet">Ramadan Suhoor & Iftar Buffet</option>
                  <option value="Continental Breakfast Only">Continental Breakfast Only</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Food & Cuisine Description</label>
                <textarea
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  rows={2}
                  placeholder="Describe meal varieties, chefs, tea/coffee, diabetic options..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Food Photos Gallery Manager */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  Food & Dining Photos ({foodPhotos.length} Photos)
                </span>
                <span className="text-[11px] text-slate-400">Buffet spreads & meal presentations</span>
              </div>

              {/* Add Custom Food URL */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFoodPhotoUrl}
                  onChange={(e) => setNewFoodPhotoUrl(e.target.value)}
                  placeholder="Paste food / dining photo image URL (https://...)"
                  className="flex-1 bg-white border border-slate-300 rounded-lg p-2 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddFoodPhoto}
                  className="px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Food Photo
                </button>
              </div>

              {/* Quick Food Presets Picker */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold self-center">Quick Presets:</span>
                {PRESET_FOOD_PHOTOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!foodPhotos.includes(preset.url)) {
                        setFoodPhotos([...foodPhotos, preset.url]);
                      }
                    }}
                    className="text-[10px] bg-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 px-2 py-0.5 rounded font-medium transition-colors"
                  >
                    + {preset.name}
                  </button>
                ))}
              </div>

              {/* Food Photos Grid Thumbnail Previews */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {foodPhotos.map((url, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 h-24 bg-slate-100">
                    <img src={url} alt={`Food ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveFoodPhoto(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5: DEPARTURE BATCHES & EXTRA INCLUSIONS */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-4">
            <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <Calendar className="w-4 h-4 text-emerald-700" />
              5. Departure Dates & Special Inclusions
            </h3>

            {/* Departure Dates Tag Manager */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Confirmed Departure Dates ({departureDates.length} Batches)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDateInput}
                  onChange={(e) => setNewDateInput(e.target.value)}
                  placeholder="e.g. 20 Jan 2027 or 1st Ramadan 2027"
                  className="flex-1 bg-white border border-slate-300 rounded-lg p-2 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddDate}
                  className="px-3 py-2 bg-slate-800 text-white font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Batch
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {departureDates.map((date, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{date}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDate(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Inclusions Checkboxes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-white border border-slate-200">
                <input
                  type="checkbox"
                  checked={trainTransfer}
                  onChange={(e) => setTrainTransfer(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Train className="w-3.5 h-3.5 text-emerald-700" /> Haramain Train Pass
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-white border border-slate-200">
                <input
                  type="checkbox"
                  checked={zamzamIncluded}
                  onChange={(e) => setZamzamIncluded(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-emerald-700" /> 5L Blessed Zamzam
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-white border border-slate-200">
                <input type="checkbox" defaultChecked disabled className="rounded text-emerald-600" />
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Saudi Umrah Visa
                </span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#062e22] to-[#0d4d3a] hover:brightness-110 text-amber-300 font-bold rounded-lg shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-amber-400" />
              <span>{isEditing ? 'Save Package Updates' : 'Publish New Package to Pilgrims'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
