import React, { useState } from 'react';
import { TravelPackage, Passenger, DocumentUploads, BookingRecord, DocumentItem } from '../types';
import { MOCK_PACKAGES } from '../data/mockData';
import {
  Check, ChevronRight, ChevronLeft, Upload, Camera, FileCheck2, ShieldCheck,
  AlertCircle, User, Phone, Mail, CreditCard, Sparkles, Printer, ArrowRight, Eye, RefreshCw
} from 'lucide-react';

interface BookingWizardProps {
  initialPackage?: TravelPackage | null;
  onBookingCompleted: (booking: BookingRecord) => void;
  onCancel: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialPackage,
  onBookingCompleted,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackage ? initialPackage.id : MOCK_PACKAGES[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    initialPackage ? initialPackage.departureDates[0] : MOCK_PACKAGES[0].departureDates[0]
  );
  const [departureCity, setDepartureCity] = useState<string>('Mumbai');
  const [sharingType, setSharingType] = useState<'Quad' | 'Triple' | 'Double' | 'Single'>('Double');
  const [travelerCount, setTravelerCount] = useState<number>(2);

  // Step 2: Passenger details
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: 'p-1',
      fullName: 'Mohammad Farooq',
      gender: 'Male',
      age: 52,
      nationality: 'Indian',
      passportNumber: 'Z5849201',
      passportExpiry: '2031-08-14',
      panNumber: 'ABCDE1234F',
      phone: '+91 98201 44829',
      email: 'farooq.travel@example.com',
      relationship: 'Self'
    },
    {
      id: 'p-2',
      fullName: 'Aisha Siddiqua',
      gender: 'Female',
      age: 48,
      nationality: 'Indian',
      passportNumber: 'Z5849202',
      passportExpiry: '2031-08-14',
      panNumber: 'ABCDE1234G',
      phone: '+91 98201 44830',
      email: 'aisha.siddiqua@example.com',
      relationship: 'Spouse'
    }
  ]);

  // Step 3: Document uploads
  const [documents, setDocuments] = useState<DocumentUploads>({
    passportFront: null,
    passportBack: null,
    panCard: null,
    whiteBgPhoto: null
  });

  const [docPreviewModal, setDocPreviewModal] = useState<{ title: string; url: string } | null>(null);
  const [specialRequests, setSpecialRequests] = useState<string>('Wheelchair assistance required for elderly traveler at Jeddah Airport.');
  const [completedBooking, setCompletedBooking] = useState<BookingRecord | null>(null);

  const currentPackage = MOCK_PACKAGES.find((p) => p.id === selectedPackageId) || MOCK_PACKAGES[0];

  // Pricing math
  const getPricePerPerson = () => {
    switch (sharingType) {
      case 'Quad': return currentPackage.priceQuad;
      case 'Triple': return currentPackage.priceTriple;
      case 'Double': return currentPackage.priceDouble;
      case 'Single': return currentPackage.priceSingle;
      default: return currentPackage.priceDouble;
    }
  };

  const basePricePerPerson = getPricePerPerson();
  const subtotal = basePricePerPerson * travelerCount;
  const tcsTax = Math.round(subtotal * 0.05); // 5% TCS Indian remittance standard
  const totalPayable = subtotal + tcsTax;

  // Handle passenger input changes
  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handlePassengerCountChange = (count: number) => {
    setTravelerCount(count);
    if (count > passengers.length) {
      const extra: Passenger[] = [];
      for (let i = passengers.length; i < count; i++) {
        extra.push({
          id: `p-${i + 1}`,
          fullName: `Traveler ${i + 1}`,
          gender: 'Male',
          age: 35,
          nationality: 'Indian',
          passportNumber: '',
          passportExpiry: '2032-01-01',
          panNumber: '',
          phone: passengers[0]?.phone || '',
          email: passengers[0]?.email || '',
          relationship: 'Other'
        });
      }
      setPassengers([...passengers, ...extra]);
    } else if (count < passengers.length) {
      setPassengers(passengers.slice(0, count));
    }
  };

  // Demo Documents Quick Loader
  const loadDemoDocuments = () => {
    setDocuments({
      passportFront: {
        name: 'Passport_Farooq_Front_Page.jpg',
        fileUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        uploadDate: new Date().toLocaleDateString(),
        fileSize: '1.8 MB',
        status: 'verified'
      },
      passportBack: {
        name: 'Passport_Farooq_Back_Address.jpg',
        fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
        uploadDate: new Date().toLocaleDateString(),
        fileSize: '1.4 MB',
        status: 'verified'
      },
      panCard: {
        name: 'PAN_Card_Mohammad_Farooq.pdf',
        fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        uploadDate: new Date().toLocaleDateString(),
        fileSize: '950 KB',
        status: 'verified'
      },
      whiteBgPhoto: {
        name: 'Saudi_Spec_Photo_WhiteBackground.jpg',
        fileUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        uploadDate: new Date().toLocaleDateString(),
        fileSize: '420 KB',
        status: 'verified'
      }
    });
  };

  // Upload simulator for individual doc
  const simulateFileUpload = (type: keyof DocumentUploads, sampleName: string, sampleUrl: string) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: {
        name: sampleName,
        fileUrl: sampleUrl,
        previewUrl: sampleUrl,
        uploadDate: new Date().toLocaleDateString(),
        fileSize: '1.2 MB',
        status: 'verified'
      }
    }));
  };

  // Final booking submission
  const handleFinalizeBooking = () => {
    const refNo = `ALH-2026-UMR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: BookingRecord = {
      id: `bk-${Date.now()}`,
      referenceNo: refNo,
      packageId: currentPackage.id,
      packageTitle: currentPackage.title,
      packageTier: currentPackage.tier,
      sharingType,
      departureDate: selectedDate,
      departureCity,
      passengers,
      documents,
      totalAmount: subtotal,
      tcsAmount: tcsTax,
      finalPayable: totalPayable,
      paymentStatus: 'Paid',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      specialRequests
    };

    setCompletedBooking(newRecord);
    onBookingCompleted(newRecord);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Wizard Header & Stepper */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#8d6c29] uppercase tracking-wider block">
                Official Booking & Visa Portal
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                Al-Hindwan Tours & Travels - Pilgrimage Reservation
              </h2>
            </div>
            <button
              onClick={onCancel}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Cancel & Return
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className={`p-2.5 rounded-xl border transition-all ${currentStep >= 1 ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 text-slate-400'}`}>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${currentStep > 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-200 text-emerald-900'}`}>
                  {currentStep > 1 ? '✓' : '1'}
                </span>
                <span className="hidden sm:inline">Step 1</span>
              </div>
              <span className="truncate block">Package & Room</span>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${currentStep >= 2 ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 text-slate-400'}`}>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${currentStep > 2 ? 'bg-emerald-600 text-white' : 'bg-emerald-200 text-emerald-900'}`}>
                  {currentStep > 2 ? '✓' : '2'}
                </span>
                <span className="hidden sm:inline">Step 2</span>
              </div>
              <span className="truncate block">Passenger Info</span>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${currentStep >= 3 ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 text-slate-400'}`}>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${currentStep > 3 ? 'bg-emerald-600 text-white' : 'bg-emerald-200 text-emerald-900'}`}>
                  {currentStep > 3 ? '✓' : '3'}
                </span>
                <span className="hidden sm:inline">Step 3</span>
              </div>
              <span className="truncate block">Document Upload</span>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${currentStep >= 4 ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 text-slate-400'}`}>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 text-xs flex items-center justify-center">
                  4
                </span>
                <span className="hidden sm:inline">Step 4</span>
              </div>
              <span className="truncate block">Summary & Voucher</span>
            </div>
          </div>
        </div>

        {/* STEP 1: Package Selection & Room Sharing */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="font-heading text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
              1. Select Package & Accommodation
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Chosen Travel Deal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPackageId(pkg.id);
                      setSelectedDate(pkg.departureDates[0]);
                    }}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackageId === pkg.id
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase px-2 py-0.5 bg-emerald-100 rounded">
                        {pkg.tier}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        ₹{pkg.priceDouble.toLocaleString()} (Double)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{pkg.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {pkg.makkahHotel} ({pkg.makkahDistanceMeters}m to Haram)
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Departure Dates & Gateway */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Confirmed Departure Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  {currentPackage.departureDates.map((date, idx) => (
                    <option key={idx} value={date}>
                      {date} (Direct Group Flight)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Departure Gateway
                </label>
                <select
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Mumbai">Mumbai (BOM) - Direct Saudia Boeing 787</option>
                  <option value="Delhi">Delhi (DEL) - Direct Air India / Saudia</option>
                  <option value="Hyderabad">Hyderabad (HYD)</option>
                  <option value="Bangalore">Bangalore (BLR)</option>
                  <option value="Dubai">Dubai (DXB)</option>
                </select>
              </div>
            </div>

            {/* Room Sharing Type */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Room Sharing Type in Makkah & Madinah
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { type: 'Quad' as const, label: 'Quad Sharing', beds: '4 Single Beds', price: currentPackage.priceQuad },
                  { type: 'Triple' as const, label: 'Triple Sharing', beds: '3 Beds', price: currentPackage.priceTriple },
                  { type: 'Double' as const, label: 'Double / Twin', beds: '2 Beds (Couple/Pair)', price: currentPackage.priceDouble },
                  { type: 'Single' as const, label: 'Single Room', beds: 'Private King Bed', price: currentPackage.priceSingle }
                ].map((s) => (
                  <div
                    key={s.type}
                    onClick={() => setSharingType(s.type)}
                    className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                      sharingType === s.type
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="text-xs block">{s.label}</span>
                    <span className="text-sm font-extrabold block mt-0.5">₹{s.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{s.beds}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Number of Pilgrims */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Number of Pilgrims Travelling
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePassengerCountChange(num)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      travelerCount === num
                        ? 'bg-[#062e22] text-amber-300 shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="text-xs text-slate-500">
                  Total Fare: <strong className="text-slate-900">₹{subtotal.toLocaleString()}</strong> + TCS
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-[#062e22] hover:bg-[#0a3f2f] text-amber-300 text-xs font-bold rounded-lg shadow flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Passenger Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Passenger Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                2. Passenger & Passport Details ({passengers.length} Pilgrims)
              </h3>
              <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                Saudi Visa Regulation Compliant
              </span>
            </div>

            <div className="space-y-6">
              {passengers.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-700" />
                      Pilgrim #{idx + 1} {idx === 0 ? '(Lead Traveler)' : ''}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Relationship: {idx === 0 ? 'Self' : p.relationship}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Full Name (As in Passport) *
                      </label>
                      <input
                        type="text"
                        value={p.fullName}
                        onChange={(e) => updatePassenger(idx, 'fullName', e.target.value)}
                        placeholder="Given Name + Surname"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Gender & Age *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={p.gender}
                          onChange={(e) => updatePassenger(idx, 'gender', e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <input
                          type="number"
                          value={p.age}
                          onChange={(e) => updatePassenger(idx, 'age', Number(e.target.value))}
                          placeholder="Age"
                          className="bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        value={p.nationality}
                        onChange={(e) => updatePassenger(idx, 'nationality', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        value={p.passportNumber}
                        onChange={(e) => updatePassenger(idx, 'passportNumber', e.target.value.toUpperCase())}
                        placeholder="e.g. Z5849201"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs uppercase focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Passport Expiry Date * (6+ Mo)
                      </label>
                      <input
                        type="date"
                        value={p.passportExpiry}
                        onChange={(e) => updatePassenger(idx, 'passportExpiry', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        PAN Card Number (For Remittance) *
                      </label>
                      <input
                        type="text"
                        value={p.panNumber}
                        onChange={(e) => updatePassenger(idx, 'panNumber', e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs uppercase focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  {idx === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Primary Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          value={p.phone}
                          onChange={(e) => updatePassenger(idx, 'phone', e.target.value)}
                          placeholder="+91 98201 44829"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Email Address for E-Visa & Itinerary
                        </label>
                        <input
                          type="email"
                          value={p.email}
                          onChange={(e) => updatePassenger(idx, 'email', e.target.value)}
                          placeholder="traveler@example.com"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-[#062e22] hover:bg-[#0a3f2f] text-amber-300 text-xs font-bold rounded-lg shadow flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Document Upload</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Document Upload (Passports, PAN, White BG Photo) */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  3. Upload KYC & Visa Documents
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Required by Saudi Ministry of Hajj & Umrah for Visa Issuance & Indian LRS Remittance.
                </p>
              </div>

              {/* Fast Demo Preloader Button */}
              <button
                type="button"
                onClick={loadDemoDocuments}
                className="px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Automatically loads high-res sample documents for quick testing"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Load Demo Documents (1-Click)</span>
              </button>
            </div>

            {/* Document upload cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Document 1: Passport Front */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-emerald-600 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-700" />
                      1. Passport Front Page (Bio-Data) *
                    </span>
                    {documents.passportFront ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Uploaded
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Clear scan/photo showing photo, name, date of birth, passport no. and validity (6+ months).
                  </p>
                </div>

                {documents.passportFront ? (
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs">
                    <span className="truncate max-w-[180px] font-medium text-slate-700">
                      {documents.passportFront.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDocPreviewModal({
                          title: 'Passport Front Page',
                          url: documents.passportFront!.previewUrl
                        })
                      }
                      className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'passportFront',
                          'Passport_Farooq_Front.jpg',
                          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-medium flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> Select File
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'passportFront',
                          'Camera_Scan_Passport_Front.jpg',
                          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
                      title="Simulate Camera capture"
                    >
                      <Camera className="w-4 h-4 text-emerald-700" />
                    </button>
                  </div>
                )}
              </div>

              {/* Document 2: Passport Back */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-emerald-600 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-700" />
                      2. Passport Back Page (Address) *
                    </span>
                    {documents.passportBack ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Uploaded
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Page with father’s name, mother’s name, spouse name, and permanent residential address.
                  </p>
                </div>

                {documents.passportBack ? (
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs">
                    <span className="truncate max-w-[180px] font-medium text-slate-700">
                      {documents.passportBack.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDocPreviewModal({
                          title: 'Passport Back Page',
                          url: documents.passportBack!.previewUrl
                        })
                      }
                      className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'passportBack',
                          'Passport_Farooq_Back.jpg',
                          'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-medium flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> Select File
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'passportBack',
                          'Camera_Scan_Passport_Back.jpg',
                          'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
                    >
                      <Camera className="w-4 h-4 text-emerald-700" />
                    </button>
                  </div>
                )}
              </div>

              {/* Document 3: PAN Card */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-emerald-600 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                      3. PAN Card (Remittance / LRS) *
                    </span>
                    {documents.panCard ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Uploaded
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Permanent Account Number card for international travel remittance & 5% TCS declaration.
                  </p>
                </div>

                {documents.panCard ? (
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs">
                    <span className="truncate max-w-[180px] font-medium text-slate-700">
                      {documents.panCard.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDocPreviewModal({
                          title: 'PAN Card Verification',
                          url: documents.panCard!.previewUrl
                        })
                      }
                      className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'panCard',
                          'PAN_Card_Farooq.jpg',
                          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-medium flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> Select File
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'panCard',
                          'Camera_Scan_PAN.jpg',
                          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
                    >
                      <Camera className="w-4 h-4 text-emerald-700" />
                    </button>
                  </div>
                )}
              </div>

              {/* Document 4: White Background Photo */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-emerald-600 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-700" />
                      4. White Background Photo (Saudi Spec) *
                    </span>
                    {documents.whiteBgPhoto ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Uploaded
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Recent passport-sized photo (2x2 inch, 80% face focus, no glare, pure white background).
                  </p>
                </div>

                {documents.whiteBgPhoto ? (
                  <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs">
                    <span className="truncate max-w-[180px] font-medium text-slate-700">
                      {documents.whiteBgPhoto.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDocPreviewModal({
                          title: 'White Background Photo',
                          url: documents.whiteBgPhoto!.previewUrl
                        })
                      }
                      className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'whiteBgPhoto',
                          'Photo_White_Background.jpg',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 font-medium flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> Select Photo
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        simulateFileUpload(
                          'whiteBgPhoto',
                          'Selfie_White_Wall.jpg',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
                    >
                      <Camera className="w-4 h-4 text-emerald-700" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Special Ground Assistance / Medical Requests
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                placeholder="Wheelchair assistance, diabetic meal, ground floor room request, etc."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  // Ensure at least demo docs are populated if none were uploaded
                  if (!documents.passportFront) loadDemoDocuments();
                  setCurrentStep(4);
                }}
                className="px-6 py-2.5 bg-[#062e22] hover:bg-[#0a3f2f] text-amber-300 text-xs font-bold rounded-lg shadow flex items-center gap-2 cursor-pointer"
              >
                <span>Review Payment & Voucher</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Payment Summary & Official Voucher Confirmation */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            {!completedBooking ? (
              <>
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#8d6c29] uppercase tracking-wider block">
                    Step 4 of 4
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    Payment Summary & Booking Confirmation
                  </h3>
                </div>

                {/* Booking summary breakdown */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading text-base font-bold text-slate-900">
                        {currentPackage.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedDate} · Ex {departureCity} · {sharingType} Sharing · {travelerCount} Pilgrims
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                      {currentPackage.tier}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Base Package Fare (₹{basePricePerPerson.toLocaleString()} × {travelerCount})</span>
                      <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Indian LRS TCS (5% adjustable tax credit)</span>
                      <span className="font-semibold text-slate-900">₹{tcsTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Saudi Visa & Mandatory Medical Insurance</span>
                      <span className="font-semibold text-emerald-700">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>5L Zamzam Water & Holy Ziyarat Transport</span>
                      <span className="font-semibold text-emerald-700">INCLUDED</span>
                    </div>
                    <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-bold text-slate-900">
                      <span>Total Amount Payable</span>
                      <span className="text-emerald-900 text-lg">₹{totalPayable.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Passenger recap */}
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Pilgrim Manifest
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {passengers.map((p, idx) => (
                      <div key={p.id} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                        <span className="font-bold text-slate-900 block">{p.fullName}</span>
                        <span className="text-slate-500">
                          Passport: {p.passportNumber || 'Provided in doc'} · Age: {p.age} · PAN: {p.panNumber || 'KYC OK'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Payment Gateway Mode */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-950">
                      Select Payment Mode (Simulated Gateway)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      className="p-2.5 rounded-lg border-2 border-emerald-700 bg-white font-bold text-emerald-900 text-center"
                    >
                      Instant Net Banking / UPI
                    </button>
                    <button
                      type="button"
                      className="p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 text-center hover:bg-slate-50"
                    >
                      International Debit/Credit
                    </button>
                    <button
                      type="button"
                      className="p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 text-center hover:bg-slate-50"
                    >
                      RTGS / NEFT Direct Bank Transfer
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalizeBooking}
                    className="px-8 py-3 bg-gradient-to-r from-[#062e22] to-[#0c4b37] hover:brightness-110 text-amber-300 text-sm font-bold rounded-lg shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-300" />
                    <span>Confirm Booking & Issue Voucher</span>
                  </button>
                </div>
              </>
            ) : (
              /* Confirmation & Official Printable Voucher */
              <div className="space-y-6">
                <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-emerald-950">
                    Alhamdulillah, Your Booking is Confirmed!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1 max-w-lg mx-auto">
                    Your reservation has been recorded in the Al-Hindwan Tours & Travels database. Ground coordinators in Makkah & Madinah have been notified.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-emerald-300 text-xs font-mono font-bold text-emerald-950">
                    Booking Reference: {completedBooking.referenceNo}
                  </div>
                </div>

                {/* Printable Certificate / Voucher Frame */}
                <div className="p-6 rounded-2xl border-2 border-[#c5a059] bg-white shadow-md relative overflow-hidden print:p-0 print:border-none">
                  {/* Decorative corner embellishments */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#062e22] text-[#c5a059] flex items-center justify-center rounded-bl-3xl font-heading text-xs font-bold">
                    ALH
                  </div>

                  <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#062e22] text-amber-400 flex items-center justify-center text-2xl font-bold">
                      🕋
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold text-slate-900">
                        Al-Hindwan Tours & Travels
                      </h4>
                      <p className="text-xs text-slate-500">
                        Official Pilgrimage Confirmation Voucher & Travel Pass
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                    <div className="p-2 rounded bg-slate-50">
                      <span className="text-slate-400 block text-[10px]">Reference</span>
                      <strong className="text-slate-900 font-mono">{completedBooking.referenceNo}</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-50">
                      <span className="text-slate-400 block text-[10px]">Departure Date</span>
                      <strong className="text-slate-900">{completedBooking.departureDate}</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-50">
                      <span className="text-slate-400 block text-[10px]">Room Sharing</span>
                      <strong className="text-slate-900">{completedBooking.sharingType} Room</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-50">
                      <span className="text-slate-400 block text-[10px]">Status</span>
                      <strong className="text-emerald-700">Confirmed (Paid)</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs mb-4">
                    <div className="font-bold text-slate-800 mb-1">{completedBooking.packageTitle}</div>
                    <div className="text-slate-600">
                      Makkah: {currentPackage.makkahHotel} · Madinah: {currentPackage.madinahHotel} · 5L Zamzam Included
                    </div>
                  </div>

                  <div className="text-xs space-y-1 mb-4">
                    <span className="font-bold text-slate-700 block">Lead Pilgrim:</span>
                    <p className="text-slate-900">
                      {completedBooking.passengers[0].fullName} ({completedBooking.passengers[0].phone})
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
                    <span>Emergency Hotline: +966 50 123 4567</span>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print Voucher
                    </button>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setCompletedBooking(null);
                      setCurrentStep(1);
                      onCancel();
                    }}
                    className="px-6 py-2.5 bg-[#062e22] text-amber-300 font-bold text-xs rounded-lg hover:bg-[#0a3f2f] transition-colors"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Document Quick Preview Modal */}
      {docPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-4 overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center pb-2 mb-2 border-b">
              <h4 className="text-xs font-bold text-slate-900">{docPreviewModal.title}</h4>
              <button
                onClick={() => setDocPreviewModal(null)}
                className="text-xs text-slate-500 hover:text-black font-bold"
              >
                Close
              </button>
            </div>
            <img
              src={docPreviewModal.url}
              alt="Document preview"
              className="w-full h-72 object-contain bg-slate-100 rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};
