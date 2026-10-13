import React, { useState } from 'react';
import {
  Camera, Image as ImageIcon, MapPin, X, ChevronLeft, ChevronRight,
  Maximize2, Download, Sparkles, Building2, Utensils, Bus, Star,
  Compass, Heart, CheckCircle2, Share2, Layers
} from 'lucide-react';

export interface PhotoItem {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'makkah' | 'madinah' | 'ziyarat' | 'hotels' | 'catering' | 'transport';
  location: string;
  description: string;
  spiritualNote?: string;
  imageUrl: string;
  badge?: string;
}

export const PILGRIMAGE_PHOTOS: PhotoItem[] = [
  // Makkah & Kaaba
  {
    id: 'ph-makkah-01',
    title: 'The Holy Kaaba & Grand Mosque',
    arabicTitle: 'الكعبة المشرفة والمسجد الحرام',
    category: 'makkah',
    location: 'Masjid al-Haram, Makkah',
    description: 'Baitullah al-Haram during holy pilgrimage. Thousands of believers in peaceful circumambulation (Tawaf) around the sacred House of Allah.',
    spiritualNote: 'The first House of worship appointed for mankind (Surah Ali Imran 3:96). One prayer in Masjid al-Haram equals 100,000 prayers elsewhere.',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    badge: 'Holy Sanctuary'
  },
  {
    id: 'ph-makkah-02',
    title: 'Tawaf Around the Holy Kaaba',
    arabicTitle: 'طواف حجاج بيت الله الحرام',
    category: 'makkah',
    location: 'Mataf Piazza, Makkah',
    description: 'Heartwarming sight of pilgrims moving in serene devotion in the Mataf courtyard under the golden glow of the minarets.',
    spiritualNote: 'Whoever performs Tawaf around this House seven times, it is as if he freed a slave (Sunan an-Nasa\'i).',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Spiritual Center'
  },
  {
    id: 'ph-makkah-03',
    title: 'Night Prayers in the Grand Mosque Courtyard',
    arabicTitle: 'صلوات الليل في رحاب المسجد الحرام',
    category: 'makkah',
    location: 'Masjid al-Haram Courtyard, Makkah',
    description: 'Peaceful night ambiance with cooled Italian Thassos marble flooring and illuminating chandeliers as pilgrims offer Tahajjud.',
    spiritualNote: 'The marble of the Haram stays cool day and night by the grace of Allah.',
    imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Night Ambiance'
  },
  {
    id: 'ph-makkah-04',
    title: 'Supplication Before Baitullah',
    arabicTitle: 'الدعاء والتضرع أمام الكعبة',
    category: 'makkah',
    location: 'Bab King Abdulaziz View, Makkah',
    description: 'Pilgrim in white Ihram raising hands in sincere supplication between the Multazam and Hateem.',
    spiritualNote: 'The dua made at the Multazam is never turned down.',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Sacred Dua'
  },

  // Madinah & Rawdah
  {
    id: 'ph-madinah-01',
    title: 'The Blessed Green Dome of Prophet\'s Mosque',
    arabicTitle: 'القبة الخضراء بالمسجد النبوي الشريف',
    category: 'madinah',
    location: 'Al-Masjid an-Nabawi, Madinah',
    description: 'The iconic Green Dome (Gumbad-e-Khizra) over the blessed resting place of Prophet Muhammad ﷺ with majestic minarets.',
    spiritualNote: 'Whoever visits my grave, my intercession becomes obligatory for him (Sunan ad-Daraqutni).',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    badge: 'City of Peace'
  },
  {
    id: 'ph-madinah-02',
    title: 'Iconic Kinetic Umbrella Courtyards',
    arabicTitle: 'مظلات ساحات الحرم النبوي',
    category: 'madinah',
    location: 'Piazza Courtyard, Madinah',
    description: 'World-renowned architectural masterpiece of 250 automated umbrella canopies providing refreshing shade and mist to millions.',
    spiritualNote: 'Madinah is a sanctuary from Mount Ayr to Mount Thawr.',
    imageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=1200&q=80',
    badge: 'Courtyard Marvel'
  },
  {
    id: 'ph-madinah-03',
    title: 'The Sacred Rawdah Mubarak (Garden of Paradise)',
    arabicTitle: 'الروضة الشريفة رياض الجنة',
    category: 'madinah',
    location: 'Inside Al-Masjid an-Nabawi, Madinah',
    description: 'The green carpet area of Rawdah al-Sharifa. Al-Hindwan tours coordinates official Nusuk permits for every pilgrim.',
    spiritualNote: 'Between my house and my pulpit is a garden from the gardens of Paradise (Sahih al-Bukhari 1196).',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    badge: 'Rawdah Permit'
  },
  {
    id: 'ph-madinah-04',
    title: 'Evening Serenity at Prophet\'s Mosque',
    arabicTitle: 'هدوء وسكينة المسجد النبوي ليلاً',
    category: 'madinah',
    location: 'Northern Courtyard, Madinah',
    description: 'Dusk settling over the courtyard of the Prophet\'s Mosque as the call to Maghrib prayer echoes across the holy city.',
    spiritualNote: 'One prayer in my mosque is better than 1,000 prayers in any other mosque, except the Sacred Mosque (Bukhari).',
    imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
    badge: 'Golden Glow'
  },

  // Sacred Ziyarat
  {
    id: 'ph-ziyarat-01',
    title: 'Mount Uhud & Archers\' Hill (Jabal al-Rumaah)',
    arabicTitle: 'جبل أحد التاريخي ومقبرة الشهداء',
    category: 'ziyarat',
    location: 'Madinah Al-Munawwarah',
    description: 'Historic battlefield of Uhud and resting place of Sayyiduna Hamzah (RA) and 70 noble martyrs of Islam.',
    spiritualNote: 'Uhud is a mountain that loves us and we love it (Sahih al-Bukhari).',
    imageUrl: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=80',
    badge: 'Battlefield History'
  },
  {
    id: 'ph-ziyarat-02',
    title: 'Jabal al-Nour & The Path to Cave of Hira',
    arabicTitle: 'جبل النور وغار حراء المبارك',
    category: 'ziyarat',
    location: 'Mount of Light, Makkah',
    description: 'The mountain where the Holy Quran was first revealed through angel Jibreel with the divine command: "Iqra!" (Read!).',
    spiritualNote: 'The sanctuary where divine revelation descended onto humanity.',
    imageUrl: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Mountain of Revelation'
  },
  {
    id: 'ph-ziyarat-03',
    title: 'Masjid Quba - The First Mosque of Islam',
    arabicTitle: 'مسجد قباء أول مسجد في الإسلام',
    category: 'ziyarat',
    location: 'Quba Oasis, Madinah',
    description: 'Historic white-domed mosque established upon piety on the Prophet\'s arrival during Hijrah.',
    spiritualNote: 'Whoever purifies himself at home and comes to Masjid Quba and offers prayer therein has reward equal to an Umrah (Ibn Majah).',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
    badge: 'Umrah Reward'
  },
  {
    id: 'ph-ziyarat-04',
    title: 'Mount of Mercy (Jabal al-Rahmah) in Arafat',
    arabicTitle: 'جبل الرحمة في صعيد عرفات',
    category: 'ziyarat',
    location: 'Plains of Arafat, Makkah',
    description: 'The historic hill in Arafat where the Prophet delivered the Farewell Sermon (Khutbat al-Wada) to over 100,000 companions.',
    spiritualNote: 'Hajj is Arafat (Sunan al-Tirmidhi). The pinnacle of pilgrimage repentance.',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    badge: 'Pinnacle of Hajj'
  },
  {
    id: 'ph-ziyarat-05',
    title: 'Mina Tent City & Jamarat Pilgrimage Camps',
    arabicTitle: 'مخيمات منى ورمي الجمرات',
    category: 'ziyarat',
    location: 'Valley of Mina, Makkah',
    description: 'Panoramic view of fireproof air-conditioned tent camps nestled in the sacred valley of Mina during the days of Tashreeq.',
    spiritualNote: 'Al-Hindwan provides dedicated Category-A Mina tents with full catering.',
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hajj Camps'
  },

  // 5-Star Accommodations
  {
    id: 'ph-hotel-01',
    title: 'Makkah Clock Royal Tower (Fairmont) Suite',
    arabicTitle: 'فندق برج الساعة فيرمونت مكة',
    category: 'hotels',
    location: 'Abraj Al-Bait, Makkah (50m from Kaaba)',
    description: 'Exclusive 5-star suite with breathtaking direct panoramic floor-to-ceiling vistas of the Holy Kaaba and Haram Piazza.',
    spiritualNote: 'Zero-meter direct indoor elevator access straight into prayer halls.',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    badge: 'Kaaba Facing'
  },
  {
    id: 'ph-hotel-02',
    title: 'The Oberoi Madinah Luxury Executive Suite',
    arabicTitle: 'فندق أوبروي المدينة المنورة',
    category: 'hotels',
    location: 'Central Northern Courtyard, Madinah (80m)',
    description: 'Unequaled luxury situated directly opposite the Ladies and Gents entrances of Al-Masjid an-Nabawi.',
    spiritualNote: 'Listen to the live Adhan from the comfort of your private suite.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    badge: '5-Star Luxury'
  },
  {
    id: 'ph-hotel-03',
    title: 'Pullman Zamzam Makkah Deluxe Room',
    arabicTitle: 'فندق بولمان زمزم مكة المكرمة',
    category: 'hotels',
    location: 'Clock Tower Complex, Makkah',
    description: 'Spacious deluxe family and quad bedrooms equipped with premium bedding, international TV, and complimentary Zamzam water.',
    spiritualNote: 'Prime central location for elderly pilgrims and families.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    badge: 'Family Friendly'
  },
  {
    id: 'ph-hotel-04',
    title: '5-Star Hotel Courtyard View & Marble Finishes',
    arabicTitle: 'أجنحة فاخرة بإطلالة على الساحات',
    category: 'hotels',
    location: 'Makkah & Madinah Luxury Partners',
    description: 'Pristine architectural design featuring Arabic calligraphy accents, marble flooring, and 24-hour concierge service.',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    badge: 'VIP Hospitality'
  },

  // Hyderabadi Catering & Hospitality
  {
    id: 'ph-food-01',
    title: 'Authentic Hyderabadi Dum Biryani Spread',
    arabicTitle: 'برياني حيدر آبادي أصيل للحجاج',
    category: 'catering',
    location: 'Al-Hindwan Pilgrim Dining Halls',
    description: 'Cooked fresh on-site twice daily by seasoned master chefs from Hyderabad using fragrant Basmati, tender meat, saffron, and Mirchi ka Salan.',
    spiritualNote: 'Pure home-style Hyderabadi comfort for all our traveling pilgrims.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Hyderabadi Khana'
  },
  {
    id: 'ph-food-02',
    title: 'Full Board Royal Dining Buffet',
    arabicTitle: 'بوفيه طعام متكامل ثلاث وجبات يومياً',
    category: 'catering',
    location: 'Hotel Dining Halls, Makkah & Madinah',
    description: 'Lavish 3-time daily open buffet featuring hot gravies, rotis, rice varieties, soups, fresh cut fruits, and unlimited desi chai.',
    spiritualNote: 'Clean, hygienic, halal meals prepared with highest food safety protocols.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    badge: '3x Daily Buffet'
  },
  {
    id: 'ph-food-03',
    title: 'Desi Breakfast Spread & Irani Chai',
    arabicTitle: 'إفطار هندي تقليدي وشاي صباحي',
    category: 'catering',
    location: 'Morning Buffet Desk, Makkah',
    description: 'Fresh parathas, anda bhurji, poha, idli, haleem, butter, jam, fresh milk, and authentic boiling hot Irani Chai before morning prayers.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    badge: 'Morning Energy'
  },
  {
    id: 'ph-food-04',
    title: 'Fresh Fruits, Desserts & Zamzam Station',
    arabicTitle: 'محطة زمزم المباركة وفواكه طازجة',
    category: 'catering',
    location: 'Dining Hall Beverage Lounge',
    description: 'Fresh seasonal fruits, Arabic sweets (Umm Ali, Baklava, Halwa) and unlimited chilled Zamzam water dispensers.',
    spiritualNote: 'Zamzam water is for whatever purpose it is drunk for (Ibn Majah).',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    badge: 'Zamzam Included'
  },

  // Transport & Flights
  {
    id: 'ph-trans-01',
    title: 'High-Speed Haramain Electric Train',
    arabicTitle: 'قطار الحرمين السريع فائق التطور',
    category: 'transport',
    location: 'Makkah to Madinah (300 km/h)',
    description: 'First Class VIP high-speed bullet train transfer between the Two Holy Cities in just 2 hours and 15 minutes in supreme comfort.',
    spiritualNote: 'Saves 5 hours of highway travel so you can spend more time in devotion.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    badge: 'Haramain Express'
  },
  {
    id: 'ph-trans-02',
    title: 'Saudia Direct Flights (Boeing 787 Dreamliner)',
    arabicTitle: 'رحلات مباشرة على متن الخطوط السعودية',
    category: 'transport',
    location: 'Direct India / GCC to Jeddah & Madinah',
    description: 'Direct wide-body international flight with 46kg (2x23kg) baggage allowance + 7kg hand carry + 5L Zamzam complimentary.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    badge: 'Direct Flights'
  },
  {
    id: 'ph-trans-03',
    title: 'Private AC Luxury Coach Fleet for Ziyarat',
    arabicTitle: 'حافلات سياحية مكيفة لزيارة المعالم',
    category: 'transport',
    location: 'Makkah & Madinah Tours',
    description: 'Modern European AC Mercedes coaches with experienced Urdu and English speaking scholarly guides for all sacred site visits.',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    badge: 'VIP Coaches'
  }
];

interface PhotoGalleryProps {
  onBookNowClick?: () => void;
  onExplorePackages?: () => void;
  className?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  onBookNowClick,
  onExplorePackages,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos', count: PILGRIMAGE_PHOTOS.length, icon: Layers },
    { id: 'makkah', label: 'Holy Makkah & Kaaba', count: PILGRIMAGE_PHOTOS.filter(p => p.category === 'makkah').length, icon: Compass },
    { id: 'madinah', label: 'Blessed Madinah & Rawdah', count: PILGRIMAGE_PHOTOS.filter(p => p.category === 'madinah').length, icon: Sparkles },
    { id: 'ziyarat', label: 'Sacred Ziyarat Sites', count: PILGRIMAGE_PHOTOS.filter(p => p.category === 'ziyarat').length, icon: MapPin },
    { id: 'hotels', label: '5-Star Luxury Hotels', count: PILGRIMAGE_PHOTOS.filter(p => p.category === 'hotels').length, icon: Building2 },
    { id: 'catering', label: 'Hyderabadi Khana', count: PILGRIMAGE_PHOTOS.filter(p => p.category === 'catering').length, icon: Utensils },
    { id: 'transport', label: 'Haramain Train & Flights', count: PILGRIMAGE_PHOTOS.filter(p => p.category === 'transport').length, icon: Bus }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? PILGRIMAGE_PHOTOS
    : PILGRIMAGE_PHOTOS.filter(p => p.category === selectedCategory);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section className={`w-full py-10 bg-slate-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header Title with Official Branding */}
        <div className="bg-[#062e22] text-white rounded-2xl p-6 sm:p-8 border border-[#c5a059]/40 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none w-96 h-96 -mr-16 -mt-16">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-300">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-[#c5a059]/60 text-xs text-amber-300 mb-2">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold uppercase tracking-wider">Official Pilgrimage Gallery</span>
                <span className="text-emerald-400">·</span>
                <span>Al-Hindwan Tours & Travels</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Visual Journey: Sacred Harams, Ziyarat & Hospitality
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-2xl leading-relaxed">
                Authentic photographic moments from our blessed journeys in Makkah Al-Mukarramah, Madinah Al-Munawwarah, luxury 5-star suites, and authentic Hyderabadi culinary catering.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-2 bg-emerald-950/80 p-3 rounded-xl border border-emerald-800/80 text-center shrink-0">
              <div className="px-3 border-r border-emerald-800/80">
                <span className="block text-lg font-extrabold text-amber-300">20+</span>
                <span className="text-[10px] text-emerald-300 uppercase">Years Legacy</span>
              </div>
              <div className="px-3 border-r border-emerald-800/80">
                <span className="block text-lg font-extrabold text-white">15,000+</span>
                <span className="text-[10px] text-emerald-300 uppercase">Happy Pilgrims</span>
              </div>
              <div className="px-3">
                <span className="block text-lg font-extrabold text-amber-300">100%</span>
                <span className="text-[10px] text-emerald-300 uppercase">Verified Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#062e22] text-amber-300 ring-2 ring-[#c5a059]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Badge Overlay */}
                {photo.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#062e22]/90 backdrop-blur border border-amber-400/50 text-[10px] font-extrabold text-amber-300 shadow">
                    {photo.badge}
                  </span>
                )}

                {/* Enlarge Icon on Hover */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Overlay Title inside Photo */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="font-arabic text-xs text-amber-200/95 block truncate">
                    {photo.arabicTitle}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-white leading-tight drop-shadow-sm line-clamp-1">
                    {photo.title}
                  </h4>
                </div>
              </div>

              {/* Photo Card Body */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold mb-1">
                    <MapPin className="w-3 h-3 shrink-0 text-emerald-700" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                {photo.spiritualNote && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] text-amber-800 italic line-clamp-1 bg-amber-50/80 px-2 py-1 rounded border border-amber-200/60">
                      ★ {photo.spiritualNote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Modal for Full-Screen View */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="bg-[#062e22] text-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-[#c5a059]/60 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-emerald-800/80 bg-[#041d15]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-900 border border-amber-400/50 text-[10px] font-bold text-amber-300">
                    {activePhoto.badge || 'Pilgrimage Photo'}
                  </span>
                  <span className="text-xs text-emerald-200">
                    Al-Hindwan Tours & Travels Archival Collection
                  </span>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-8 h-8 rounded-full bg-emerald-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Image Container with Nav Chevrons */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] overflow-hidden select-none">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-[60vh] max-w-full object-contain mx-auto"
                />

                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-[#062e22] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-[#062e22] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Description Footer */}
              <div className="p-5 sm:p-6 bg-[#042017] border-t border-emerald-800/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-arabic text-amber-300 text-base sm:text-lg block">
                      {activePhoto.arabicTitle}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                      {activePhoto.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activePhoto.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {onBookNowClick && (
                      <button
                        onClick={() => {
                          setActivePhoto(null);
                          onBookNowClick();
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] text-xs font-extrabold rounded-lg hover:brightness-105 transition-all shadow cursor-pointer"
                      >
                        Book This Journey →
                      </button>
                    )}
                    <a
                      href={activePhoto.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-lg text-xs font-bold border border-emerald-700/60 flex items-center gap-1.5 transition-colors"
                      title="Open full resolution in new tab"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Full Res</span>
                    </a>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  {activePhoto.description}
                </p>

                {activePhoto.spiritualNote && (
                  <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-700/60 text-xs text-amber-200">
                    <span className="font-bold text-amber-400">Spiritual Significance: </span>
                    {activePhoto.spiritualNote}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
