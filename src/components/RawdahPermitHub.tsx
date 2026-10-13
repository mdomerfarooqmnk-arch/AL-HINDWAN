import React, { useState } from 'react';
import {
  Calendar, Clock, CheckCircle2, ShieldCheck, User, Users,
  Phone, MessageSquare, Download, Sparkles, MapPin, AlertCircle,
  FileCheck2, Check, ArrowRight, Share2, HelpCircle
} from 'lucide-react';
import { RawdahPermitRequest } from '../types';

export const RawdahPermitHub: React.FC = () => {
  // State for form
  const [pilgrimName, setPilgrimName] = useState<string>('Haji Mohammed Farooq');
  const [gender, setGender] = useState<'Gents' | 'Ladies'>('Gents');
  const [passportNumber, setPassportNumber] = useState<string>('N12847592');
  const [visaOrNusukId, setVisaOrNusukId] = useState<string>('NSK-948201');
  const [preferredDate, setPreferredDate] = useState<string>('2026-11-20');
  const [timeSlot, setTimeSlot] = useState<string>('06:00 AM - 07:30 AM (Post-Fajr)');
  const [contactPhone, setContactPhone] = useState<string>('+91 9700762916');

  // Active submitted permits list
  const [confirmedPermit, setConfirmedPermit] = useState<RawdahPermitRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Time slot options based on gender
  const gentsSlots = [
    '01:00 AM - 02:30 AM (Late Night Quiet Window)',
    '06:00 AM - 07:30 AM (Post-Fajr Sunrise Window)',
    '01:30 PM - 03:00 PM (Post-Dhuhr Window)',
    '09:00 PM - 10:30 PM (Post-Isha Window)'
  ];

  const ladiesSlots = [
    '06:00 AM - 11:00 AM (Morning Dedicated Window - Gate 24/37)',
    '09:30 PM - 12:00 AM (Night Dedicated Window - Gate 24/37)'
  ];

  const availableSlots = gender === 'Gents' ? gentsSlots : ladiesSlots;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newPermit: RawdahPermitRequest = {
        id: `RAW-${Math.floor(100000 + Math.random() * 900000)}`,
        pilgrimName,
        gender,
        passportNumber,
        visaOrNusukId,
        preferredDate,
        timeSlot,
        contactPhone,
        status: 'Confirmed',
        bookedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      setConfirmedPermit(newPermit);
      setIsSubmitting(false);
      setShowSuccessToast(true);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* BANNER 1: PROPHETIC HADITH & GREEN DOME HEADER (From User's Poster) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#05291e] via-[#093c2c] to-[#041d15] text-white p-6 sm:p-10 border-2 border-[#c5a059]/50 shadow-2xl">
          {/* Subtle Islamic Arch / Dome Background Artwork */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <svg viewBox="0 0 300 300" className="w-full h-full fill-emerald-200">
              <path d="M150 20 C90 20, 40 80, 40 180 L260 180 C260 80, 210 20, 150 20 Z" />
              <rect x="135" y="5" width="30" height="25" />
            </svg>
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            {/* Hadith Callout */}
            <div className="inline-block p-1 px-3 rounded-full bg-emerald-950/90 border border-amber-400/50 text-amber-300 text-xs font-semibold">
              <span className="font-arabic text-sm mr-1.5 font-bold">ﷺ</span>
              <span>Prophetic Tradition · Hadith Sharif</span>
            </div>

            {/* Sacred Hadith Quote in Arabic & English */}
            <div className="space-y-1">
              <p className="font-arabic text-xl sm:text-2xl text-amber-200 leading-relaxed font-bold">
                «مَا بَيْنَ بَيْتِي وَمِنْبَرِي رَوْضَةٌ مِنْ رِيَاضِ الجَنَّةِ»
              </p>
              <p className="text-sm sm:text-base text-emerald-100 font-medium italic">
                “Between my house and my pulpit is a garden from the gardens of Paradise.”
              </p>
              <span className="text-[11px] text-amber-300/80 font-mono block">
                — Sahih Bukhari (Book 21, Hadith 287)
              </span>
            </div>

            {/* Big Catchy Title from User Screenshot */}
            <div className="pt-2">
              <div className="inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-emerald-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1 rounded-md shadow-md mb-2">
                DAILY SLOTS GUARANTEE
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                RAWDAH PERMIT AVAILABLE
              </h1>
              <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-amber-300 mt-1">
                GET DAILY RIYAZ UL JANNAH PERMIT FOR YOUR HAJIS
              </p>
              <p className="text-xs sm:text-sm text-emerald-200 mt-2 max-w-xl">
                Al-Hindwan Tours & Travels assists every pilgrim in securing their sacred Nusuk Ministry permit for prayers in the blessed Rawdah Mubarak in Madinah Al-Munawwarah.
              </p>
            </div>

            {/* 3 Value Pillars from Poster */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 max-w-lg">
              {/* Pillar 1: GENTS */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-emerald-900/90 to-emerald-950 border border-amber-400/40 text-center shadow-lg">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center font-bold mb-1">
                  <User className="w-4 h-4 text-amber-400" />
                </div>
                <strong className="text-xs sm:text-sm font-bold text-white block uppercase tracking-wide">
                  GENTS
                </strong>
                <span className="text-[10px] text-emerald-300 block">Gate 38 / Al-Salam</span>
              </div>

              {/* Pillar 2: DAILY AVAILABILITY */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-emerald-900/90 to-emerald-950 border border-amber-400/40 text-center shadow-lg">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center font-bold mb-1">
                  <Calendar className="w-4 h-4 text-amber-400" />
                </div>
                <strong className="text-xs sm:text-sm font-bold text-white block uppercase tracking-wide">
                  DAILY
                </strong>
                <span className="text-[10px] text-amber-300 block">Live Slot Sync</span>
              </div>

              {/* Pillar 3: LADIES */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-emerald-900/90 to-emerald-950 border border-amber-400/40 text-center shadow-lg">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center font-bold mb-1">
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <strong className="text-xs sm:text-sm font-bold text-white block uppercase tracking-wide">
                  LADIES
                </strong>
                <span className="text-[10px] text-emerald-300 block">Gate 24 / Gate 37</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOAST / CONFIRMATION IF PERMIT WAS SUBMITTED */}
        {showSuccessToast && confirmedPermit && (
          <div className="p-5 rounded-2xl bg-emerald-900 text-white border-2 border-amber-400 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-extrabold">
                  ✓
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-amber-300">
                    Rawdah Permit Request Endorsed Successfully!
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Your permit has been generated and logged with the Al-Hindwan Tours & Travels Operations Desk.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono bg-emerald-950 px-2.5 py-1 rounded border border-emerald-700 text-amber-300 font-bold">
                {confirmedPermit.id}
              </span>
            </div>

            {/* Generated Official Permit Card */}
            <div className="p-5 rounded-xl bg-white text-slate-800 border border-amber-300 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Pilgrim Name</span>
                <p className="font-bold text-base text-slate-900">{confirmedPermit.pilgrimName}</p>
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-extrabold text-[10px]">
                  {confirmedPermit.gender.toUpperCase()} SECTION
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Sacred Slot Window</span>
                <p className="font-bold text-xs text-emerald-950">{confirmedPermit.preferredDate}</p>
                <p className="text-xs text-slate-700 font-medium">{confirmedPermit.timeSlot}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Designated Entry Gate</span>
                <p className="font-bold text-sm text-amber-900">
                  {confirmedPermit.gender === 'Gents' ? 'Gate 38 (Bab Al-Salam)' : 'Gate 24 / Gate 37 (Ladies Courtyard)'}
                </p>
                <p className="text-[11px] text-slate-500">Al-Masjid an-Nabawi, Madinah</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="text-xs text-emerald-200">
                Show this pass to your Al-Hindwan Tour Guide at Madinah hotel 45 mins prior to slot time.
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/919700762916?text=Assalamu%20Alaikum%20Al%20Hindwan%20Tours%2C%20here%20is%20my%20Rawdah%20Permit%20Pass%20Booking%3A%20${confirmedPermit.id}%20for%20${encodeURIComponent(confirmedPermit.pilgrimName)}%20on%20${confirmedPermit.preferredDate}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Send Pass to WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowSuccessToast(false)}
                  className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold rounded-xl"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TWO-COLUMN WORKFLOW: 1. BOOKING FORM & 2. GENTS/LADIES SCHEDULE & GUIDELINES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMN 1: PERMIT BOOKING / REQUEST FORM (7 COLS) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Apply for Riyaz Ul Jannah Permit
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter Haji details to register permit on the official Nusuk Ministry channel.
                </p>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Permit Fee: Included in Package
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-800">
              {/* Gender Selector: GENTS vs LADIES */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Pilgrim Category *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setGender('Gents');
                      setTimeSlot(gentsSlots[0]);
                    }}
                    className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gender === 'Gents'
                        ? 'bg-gradient-to-r from-[#062e22] to-[#0c4b37] text-amber-300 border-[#c5a059] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-4 h-4 text-amber-400" />
                    <span>GENTS PERMIT (Men)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGender('Ladies');
                      setTimeSlot(ladiesSlots[0]);
                    }}
                    className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gender === 'Ladies'
                        ? 'bg-gradient-to-r from-[#062e22] to-[#0c4b37] text-amber-300 border-[#c5a059] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>LADIES PERMIT (Women)</span>
                  </button>
                </div>
              </div>

              {/* Pilgrim Full Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Pilgrim Full Name (As in Passport) *
                  </label>
                  <input
                    type="text"
                    value={pilgrimName}
                    onChange={(e) => setPilgrimName(e.target.value)}
                    placeholder="e.g. Haji Mohammed Farooq"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="e.g. N12847592"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono font-semibold focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              {/* Visa ID & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Saudi Visa / Nusuk Border Number
                  </label>
                  <input
                    type="text"
                    value={visaOrNusukId}
                    onChange={(e) => setVisaOrNusukId(e.target.value)}
                    placeholder="e.g. NSK-948201 or Visa Entry No"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    WhatsApp Mobile Number for Ticket *
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 9700762916"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              {/* Date & Time Slot Window Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Preferred Visit Date in Madinah *
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Select Available {gender} Prayer Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    required
                  >
                    {availableSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Trust & Ministry SLA notice */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1">
                <span className="font-bold text-[11px] flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Al-Hindwan Dedicated Nusuk Slot Allocation
                </span>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  Our ground team in Madinah monitors Ministry slot releases 24/7. Permits are synchronized directly to your Nusuk account barcode. Group bookings for whole families are scheduled in adjacent time slots.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-[#062e22] via-[#094130] to-[#0c4b37] hover:brightness-110 text-amber-300 font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <span>Securing Ministry Permit...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Secure Daily Riyaz Ul Jannah Permit</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* COLUMN 2: TIMETABLES, GATE DIRECTORY & SPIRITUAL ADAB (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Gents & Ladies Timetables Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Clock className="w-4 h-4 text-emerald-700" />
                <h3 className="font-heading text-base font-bold text-slate-900">
                  Official Madinah Daily Timetable
                </h3>
              </div>

              {/* Gents Schedule */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-950 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    GENTS (Men) Slots
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    Gate 38 (Bab Al-Salam)
                  </span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  <li className="flex items-center justify-between">
                    <span>• Late Night Window:</span>
                    <strong className="text-slate-900 font-mono">01:00 AM – 02:30 AM</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Morning Sunrise Window:</span>
                    <strong className="text-slate-900 font-mono">06:00 AM – 07:30 AM</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Afternoon Window:</span>
                    <strong className="text-slate-900 font-mono">01:30 PM – 03:00 PM</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Evening Window:</span>
                    <strong className="text-slate-900 font-mono">09:00 PM – 10:30 PM</strong>
                  </li>
                </ul>
              </div>

              {/* Ladies Schedule */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-950 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    LADIES (Women) Dedicated Slots
                  </span>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    Gate 24 / Gate 37
                  </span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  <li className="flex items-center justify-between">
                    <span>• Morning Window:</span>
                    <strong className="text-slate-900 font-mono">06:00 AM – 11:00 AM</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Night Window:</span>
                    <strong className="text-slate-900 font-mono">09:30 PM – 12:00 AM</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sacred Etiquette (Adab) in Riyaz Ul Jannah */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs text-slate-700">
              <span className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Spiritual Etiquette Inside Riyaz Ul Jannah:
              </span>

              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-800">1.</span>
                  <p>
                    <strong>2 Rakat Nafl Prayer:</strong> Pray 2 units of prayer on the blessed green carpet (symbolizing the garden of Jannah).
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-800">2.</span>
                  <p>
                    <strong>Send Salam Upon Rasulullah ﷺ:</strong> Stand with reverence facing the sacred Chamber (Hujrah) and say: <em>«Assalamu ‘alayka ya Rasool Allah»</em>.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-800">3.</span>
                  <p>
                    <strong>Salam to Sahaba:</strong> Take one step to the right and send Salam upon Sayyidina Abu Bakr As-Siddiq, and another step right for Sayyidina Umar ibn al-Khattab.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-800">4.</span>
                  <p>
                    <strong>Maintain Dignity & Silence:</strong> Keep voices low, avoid photography in the inner precinct, and make abundant heartfelt Duas.
                  </p>
                </div>
              </div>
            </div>

            {/* Need Instant Phone Guidance? */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#07382a] text-white space-y-2 border border-[#c5a059]/40 shadow-md">
              <span className="font-bold text-amber-300 text-xs block">
                Direct Madinah Permit Desk:
              </span>
              <p className="text-[11px] text-emerald-100">
                Facing issues on Nusuk app? Call our Madinah ground coordinator or offices directly:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="tel:+919700762916"
                  className="py-1 px-2.5 bg-amber-400 text-emerald-950 font-bold rounded-lg text-xs flex items-center gap-1 hover:brightness-110"
                >
                  <Phone className="w-3 h-3 text-emerald-950" />
                  <span>Hyd Head Office: +91 9700762916</span>
                </a>
                <a
                  href="https://wa.me/919743481876"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 px-2.5 bg-[#25D366] text-white font-bold rounded-lg text-xs flex items-center gap-1 hover:brightness-110"
                >
                  <MessageSquare className="w-3 h-3 fill-white" />
                  <span>Branch: +91 9743481876</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
