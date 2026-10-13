export type ServiceCategory = 'umrah' | 'hajj' | 'rawdah' | 'flight' | 'hotel' | 'visa' | 'ziyarat' | 'catering';

export interface RawdahPermitRequest {
  id: string;
  pilgrimName: string;
  gender: 'Gents' | 'Ladies';
  passportNumber: string;
  visaOrNusukId: string;
  preferredDate: string;
  timeSlot: string;
  contactPhone: string;
  status: 'Confirmed' | 'Pending Allocation' | 'Processed';
  bookedAt: string;
}

export interface PackageInclusion {
  icon: string;
  title: string;
  description: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  city: 'Makkah' | 'Madinah' | 'Jeddah';
}

export interface TravelPackage {
  id: string;
  title: string;
  category: 'umrah' | 'hajj';
  tier: 'VIP Luxury' | 'Deluxe 5-Star' | 'Executive' | 'Economy Saver';
  durationDays: number;
  departureDates: string[];
  departureCity: string;
  airline: string;
  priceQuad: number;
  priceTriple: number;
  priceDouble: number;
  priceSingle: number;
  makkahHotel: string;
  makkahDistanceMeters: number;
  makkahNights: number;
  madinahHotel: string;
  madinahDistanceMeters: number;
  madinahNights: number;
  inclusions: PackageInclusion[];
  itinerary: DayItinerary[];
  image: string;
  hotelPhotos?: string[];
  foodPhotos?: string[];
  mealPlan?: string;
  mealDescription?: string;
  trainTransfer?: boolean;
  zamzamIncluded?: boolean;
  baggageAllowance?: string;
  rating: number;
  reviewsCount: number;
  spotsLeft: number;
  featured?: boolean;
}

export interface Passenger {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female';
  age: number;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  panNumber: string;
  phone: string;
  email: string;
  relationship: 'Self' | 'Spouse' | 'Parent' | 'Child' | 'Other';
}

export interface DocumentItem {
  name: string;
  fileUrl: string;
  previewUrl: string;
  uploadDate: string;
  fileSize: string;
  status: 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
}

export interface DocumentUploads {
  passportFront: DocumentItem | null;
  passportBack: DocumentItem | null;
  panCard: DocumentItem | null;
  whiteBgPhoto: DocumentItem | null;
}

export interface BookingRecord {
  id: string;
  referenceNo: string;
  packageId: string;
  packageTitle: string;
  packageTier: string;
  sharingType: 'Quad' | 'Triple' | 'Double' | 'Single';
  departureDate: string;
  departureCity: string;
  passengers: Passenger[];
  documents: DocumentUploads;
  totalAmount: number;
  tcsAmount: number;
  finalPayable: number;
  paymentStatus: 'Paid' | 'Partial Deposit' | 'Pending';
  status: 'Confirmed' | 'Documents Under Review' | 'Visa Approved' | 'In Transit' | 'In Haram' | 'Completed';
  createdAt: string;
  specialRequests?: string;
}

export interface PilgrimLocation {
  id: string;
  name: string;
  groupTag: string;
  role: 'Pilgrim' | 'Group Leader' | 'Medical Escort';
  phone: string;
  avatar: string;
  lat: number;
  lng: number;
  activityStatus: 'Performing Tawaf' | 'In Haram' | 'Performing Sa\'i' | 'At Hotel' | 'At Ziyarat' | 'At Mina Camp' | 'At Plain of Arafat' | 'In Transit' | 'SOS Alert';
  distanceToKaabaMeters: number;
  batteryPercent: number;
  lastUpdated: string;
  hotelName: string;
  roomNumber: string;
  bloodGroup: string;
}

export interface HotelInfo {
  id: string;
  name: string;
  city: 'Makkah' | 'Madinah';
  stars: number;
  distanceToHaram: number;
  walkMinutes: number;
  haramView: boolean;
  shuttleAvailable: boolean;
  image: string;
  address: string;
  rating: number;
  description: string;
  amenities: string[];
}

export interface ZiyaratSite {
  id: string;
  name: string;
  arabicName: string;
  city: 'Makkah' | 'Madinah';
  image: string;
  tagline: string;
  description: string;
  historicalSignificance: string;
  visitingTips: string;
  coordinates: { lat: number; lng: number };
}

export interface PrayerTimeData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  dateReadable: string;
  hijriDate: string;
  city: string;
}

export interface BranchOffice {
  id: string;
  name: string;
  type: 'Head Office' | 'Regional Branch' | 'Sub-Branch' | 'International Liaison';
  city: string;
  state: string;
  address: string;
  pincode: string;
  phone1: string;
  phone2?: string;
  whatsapp: string;
  email: string;
  managerName: string;
  timings: string;
  status: 'Active' | 'Temporarily Closed' | 'Upcoming';
  isHeadOffice?: boolean;
}
