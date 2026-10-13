import React, { useState } from 'react';
import { PilgrimLocation, BookingRecord, TravelPackage } from '../types';
import { MOCK_PILGRIMS, INITIAL_SAMPLE_BOOKINGS, MOCK_PACKAGES } from '../data/mockData';
import { AdminPackageEditorModal } from './AdminPackageEditorModal';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';
import { AdminBranchManager } from './AdminBranchManager';
import { AlHindwanLogo } from './AlHindwanLogo';
import {
  ShieldCheck, Users, FileCheck, Radio, AlertTriangle, Check, X,
  Search, Eye, Phone, MapPin, Send, Battery, Download, CheckCircle2,
  Package, Plus, Edit3, Trash2, Utensils, Building2, Calendar, Star, DollarSign,
  BarChart3, TrendingUp, LogOut
} from 'lucide-react';

import { AuthUser } from '../services/apiService';

interface AdminControlRoomProps {
  bookings: BookingRecord[];
  packages?: TravelPackage[];
  onSavePackage?: (pkg: TravelPackage) => void;
  onDeletePackage?: (pkgId: string) => void;
  onApproveDocument?: (bookingId: string, docKey: string) => void;
  sosAlerts?: string[];
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onViewAsEndUser?: () => void;
  dbVersion?: number;
}

export const AdminControlRoom: React.FC<AdminControlRoomProps> = ({
  bookings = INITIAL_SAMPLE_BOOKINGS,
  packages = MOCK_PACKAGES,
  onSavePackage,
  onDeletePackage,
  sosAlerts = [],
  currentUser,
  onLogout,
  onViewAsEndUser,
  dbVersion
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'packages' | 'pilgrims' | 'documents' | 'bookings' | 'branches' | 'broadcast'>('analytics');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [packageToEdit, setPackageToEdit] = useState<TravelPackage | null>(null);
  const [pilgrims, setPilgrims] = useState<PilgrimLocation[]>(MOCK_PILGRIMS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [packageFilter, setPackageFilter] = useState<string>('all');
  const [selectedDocPreview, setSelectedDocPreview] = useState<{
    pilgrimName: string;
    docName: string;
    url: string;
    docType: string;
    status: string;
  } | null>(null);

  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [broadcastTarget, setBroadcastTarget] = useState<string>('all');
  const [broadcastHistory, setBroadcastHistory] = useState<string[]>([
    'Bus #4 for Madinah Ziyarat departs from Clock Tower Piazza at 07:00 AM sharp.',
    'Jumu’ah prayer gathering point: King Fahd Gate #79 courtyard at 11:15 AM.'
  ]);

  // Filtered pilgrims
  const filteredPilgrims = pilgrims.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.groupTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.hotelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.activityStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastHistory([broadcastMessage, ...broadcastHistory]);
    setBroadcastMessage('');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Admin Header */}
        <div className="bg-[#062e22] text-white rounded-2xl p-6 border border-[#c5a059]/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Ground Control Desk · Makkah & Madinah
                </span>
                <span className="text-xs text-emerald-200">
                  {currentUser ? `Authorized as: ${currentUser.fullName}` : 'Role: Super Admin / Tour Operator'}
                </span>
                {currentUser?.email && (
                  <span className="text-[11px] text-emerald-300/80 font-mono hidden sm:inline">
                    ({currentUser.email})
                  </span>
                )}
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <AlHindwanLogo size="sm" className="drop-shadow-md hidden sm:block shrink-0" />
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex flex-wrap items-center gap-2">
                    <span className="text-white">Al-Hindwan Tours & Travels</span>
                    <span className="text-amber-400 font-normal hidden sm:inline">|</span>
                    <span className="text-amber-300 font-bold text-xl sm:text-2xl">Admin Control Room</span>
                  </h2>
                  <p className="text-xs text-emerald-200/90 mt-1 max-w-2xl">
                    Unified operations console for package management, live telemetry, branch directory, and KYC document desk · Head Office: Hyderabad & Branch: Manna Ekhelli, Karnataka.
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent Admin Session Controls: View as Guest & Log Out Admin */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {onViewAsEndUser && (
                <button
                  onClick={onViewAsEndUser}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-amber-400/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  title="View travel portal as regular pilgrim"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>View as Guest</span>
                </button>
              )}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white border border-rose-400/50 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-rose-950/40 cursor-pointer transition-all hover:scale-102"
                  title="Sign out of Admin Session"
                >
                  <LogOut className="w-4 h-4 text-white" />
                  <span>Log Out Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-emerald-800/60">
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-center">
              <span className="text-[10px] text-emerald-300 uppercase block">Active Group</span>
              <span className="text-xl font-bold text-white">{pilgrims.length}</span>
              <span className="text-[9px] text-emerald-400 block">Pilgrims</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-center">
              <span className="text-[10px] text-amber-300 uppercase block">In Tawaf</span>
              <span className="text-xl font-bold text-amber-300">
                {pilgrims.filter((p) => p.activityStatus === 'Performing Tawaf').length}
              </span>
              <span className="text-[9px] text-amber-200 block">&lt;300m Kaaba</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-center">
              <span className="text-[10px] text-emerald-300 uppercase block">KYC Verified</span>
              <span className="text-xl font-bold text-emerald-400">100%</span>
              <span className="text-[9px] text-emerald-300 block">Passports OK</span>
            </div>
          </div>
        </div>

        {/* SOS Alert notices if any */}
        {sosAlerts.length > 0 && (
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-500 text-red-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-red-700">
              <AlertTriangle className="w-5 h-5 text-red-600 animate-bounce" />
              <span>ACTIVE EMERGENCY DISTRESS BEACONS ({sosAlerts.length})</span>
            </div>
            {sosAlerts.map((msg, idx) => (
              <div key={idx} className="text-xs p-2 rounded bg-white border border-red-200">
                {msg}
              </div>
            ))}
          </div>
        )}

        {/* Control Room Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-200 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-emerald-950 shadow-sm border-b-2 border-[#c5a059]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <span>Executive Analytics & Insights</span>
            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400 text-emerald-950 uppercase">
              Recharts
            </span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-700" />
            <span>Package Architect ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pilgrims')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pilgrims'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-700" />
            <span>Live Pilgrim Tracking ({pilgrims.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>Document Verification Desk</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Bookings & Manifest ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'branches'
                ? 'bg-white text-emerald-950 shadow-sm border-b-2 border-[#c5a059]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Manage Branches</span>
            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400 text-emerald-950 uppercase">
              Offices
            </span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'branches'
                ? 'bg-white text-emerald-950 shadow-sm border-b-2 border-[#c5a059]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Manage Branches</span>
            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400 text-emerald-950 uppercase">
              Offices
            </span>
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'broadcast'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4 text-emerald-700" />
            <span>Urgent Group Broadcast</span>
          </button>
        </div>

        {/* TAB: Executive Analytics Dashboard (Recharts) */}
        {activeTab === 'analytics' && (
          <AdminAnalyticsDashboard
            bookings={bookings}
            packages={packages}
          />
        )}

        {/* TAB: Package Architect & Deals Manager */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Umrah & Hajj Package Architect Desk
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Design packages with comprehensive tariffs, room sharing costs, hotel photos, catering/food photos, and flight specifications.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPackageToEdit(null);
                  setIsEditorOpen(true);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#062e22] to-[#0c4b37] hover:brightness-110 text-amber-300 text-xs font-bold rounded-lg shadow-md flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Create New Package</span>
              </button>
            </div>

            {/* Dynamic Database Sync Guarantee Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 via-[#073628] to-[#042017] text-white border border-[#c5a059]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 border border-emerald-700/80 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Dynamic Centralized Database: Connected
                    </span>
                    <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/80 font-mono">
                      v{dbVersion || 'LIVE-SYNC'}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-0.5 max-w-2xl">
                    <strong>Zero-App-Update Real-Time Sync:</strong> All changes made here (cost adjustments, hotel photos, catering/food photos, and flight specifications) are immediately saved to the database. End-users and pilgrims receive the updates instantly without needing to update or reinstall the app.
                  </p>
                </div>
              </div>

              {onViewAsEndUser && (
                <button
                  type="button"
                  onClick={onViewAsEndUser}
                  className="px-4 py-2 bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] text-xs font-bold rounded-lg shadow hover:brightness-105 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer self-start md:self-auto"
                >
                  <Eye className="w-3.5 h-3.5 text-[#062e22]" />
                  <span>Test End-User Live View</span>
                </button>
              )}
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
              <span className="text-slate-500 text-[11px] font-semibold mr-1">Filter:</span>
              {['all', 'umrah', 'hajj', 'VIP Luxury', 'Economy Saver'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPackageFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    packageFilter === cat
                      ? 'bg-[#062e22] text-amber-300 font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Deals' : cat}
                </button>
              ))}
            </div>

            {/* Package Cards List */}
            <div className="space-y-6">
              {packages
                .filter((p) => {
                  if (packageFilter === 'all') return true;
                  if (packageFilter === 'umrah') return p.category === 'umrah';
                  if (packageFilter === 'hajj') return p.category === 'hajj';
                  if (packageFilter === 'VIP Luxury') return p.tier === 'VIP Luxury';
                  if (packageFilter === 'Economy Saver') return p.tier === 'Economy Saver';
                  return true;
                })
                .map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 transition-all space-y-4"
                  >
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-200/80">
                      <div className="flex items-start gap-3">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-300 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {pkg.tier}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold">
                              {pkg.category.toUpperCase()} · {pkg.durationDays} Days / {pkg.durationDays - 1} Nights
                            </span>
                            <span className="text-[10px] text-amber-700 bg-amber-100 font-bold px-1.5 py-0.2 rounded">
                              {pkg.spotsLeft} Seats Left
                            </span>
                          </div>
                          <h4 className="font-heading text-base font-bold text-slate-900 leading-tight">
                            {pkg.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Ex: {pkg.departureCity} · Flight: {pkg.airline}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setPackageToEdit(pkg);
                            setIsEditorOpen(true);
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Edit Package</span>
                        </button>
                        {onDeletePackage && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
                                onDeletePackage(pkg.id);
                              }
                            }}
                            className="p-1.5 bg-white border border-slate-300 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                            title="Delete Package"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Cost Tariffs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 block">Quad Sharing</span>
                        <strong className="text-sm font-bold text-slate-900 block mt-0.5">₹{pkg.priceQuad.toLocaleString()}</strong>
                        <span className="text-[9px] text-slate-400">4 in room</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 block">Triple Sharing</span>
                        <strong className="text-sm font-bold text-slate-900 block mt-0.5">₹{pkg.priceTriple.toLocaleString()}</strong>
                        <span className="text-[9px] text-slate-400">3 in room</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-50/70 border-2 border-emerald-500 text-center">
                        <span className="text-[10px] text-emerald-800 font-bold block">Double / Twin</span>
                        <strong className="text-sm font-extrabold text-emerald-950 block mt-0.5">₹{pkg.priceDouble.toLocaleString()}</strong>
                        <span className="text-[9px] text-emerald-700">Couple / 2 pax</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-500 block">Single Room</span>
                        <strong className="text-sm font-bold text-slate-900 block mt-0.5">₹{pkg.priceSingle.toLocaleString()}</strong>
                        <span className="text-[9px] text-slate-400">Private</span>
                      </div>
                    </div>

                    {/* Hotels and Hotel Photos */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-emerald-700" />
                          Accommodation & Hotel Photos ({pkg.hotelPhotos?.length || 0} Photos)
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          Makkah: <strong>{pkg.makkahDistanceMeters}m</strong> to Haram · Madinah: <strong>{pkg.madinahDistanceMeters}m</strong> to Masjid
                        </span>
                      </div>

                      <div className="text-xs text-slate-600">
                        <span><strong>Makkah:</strong> {pkg.makkahHotel} ({pkg.makkahNights}N)</span>
                        <span className="mx-2">·</span>
                        <span><strong>Madinah:</strong> {pkg.madinahHotel} ({pkg.madinahNights}N)</span>
                      </div>

                      {pkg.hotelPhotos && pkg.hotelPhotos.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pt-1">
                          {pkg.hotelPhotos.map((hUrl, i) => (
                            <img
                              key={i}
                              src={hUrl}
                              alt="Hotel photo"
                              className="w-20 h-14 object-cover rounded-lg border border-slate-200 shrink-0 hover:scale-105 transition-transform"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Food, Catering & Food Photos */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Utensils className="w-4 h-4 text-amber-600" />
                          Dining & Catering Photos ({pkg.foodPhotos?.length || 0} Photos)
                        </span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[10px]">
                          {pkg.mealPlan || 'Full Board Buffet'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        {pkg.mealDescription || 'Three times daily fresh buffet prepared by expert chefs.'}
                      </p>

                      {pkg.foodPhotos && pkg.foodPhotos.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pt-1">
                          {pkg.foodPhotos.map((fUrl, i) => (
                            <img
                              key={i}
                              src={fUrl}
                              alt="Food photo"
                              className="w-20 h-14 object-cover rounded-lg border border-slate-200 shrink-0 hover:scale-105 transition-transform"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Departure Dates & Special Inclusions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 font-bold">Batches:</span>
                        {pkg.departureDates.map((date, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-700">
                            {date}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-emerald-800 font-semibold">
                        {pkg.trainTransfer && <span>✓ High Speed Haramain Train</span>}
                        {pkg.zamzamIncluded && <span>✓ 5L Zamzam Water</span>}
                        <span>✓ Saudi Umrah Visa Included</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 1: Live Pilgrim Radar & Monitoring List */}
        {activeTab === 'pilgrims' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by pilgrim name, group tag, or hotel..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-slate-500 text-[11px] font-semibold">Filter:</span>
                {['all', 'Performing Tawaf', 'In Haram', 'At Hotel', 'At Ziyarat'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      statusFilter === st
                        ? 'bg-[#062e22] text-amber-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Status' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilgrim Table / Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPilgrims.map((p) => {
                const isTawaf = p.activityStatus === 'Performing Tawaf';
                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isTawaf
                        ? 'border-amber-400 bg-amber-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">{p.name}</h4>
                          <span className="text-[10px] text-slate-500 block">{p.groupTag}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isTawaf
                            ? 'bg-amber-500 text-white animate-pulse'
                            : p.activityStatus === 'In Haram'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p.activityStatus}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                      <div className="flex justify-between">
                        <span>Distance to Kaaba:</span>
                        <strong className="text-slate-900 font-mono">{p.distanceToKaabaMeters}m</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Hotel & Room:</span>
                        <span className="font-semibold text-slate-800">{p.hotelName} #{p.roomNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Battery & Ping:</span>
                        <span className="text-emerald-700 flex items-center gap-1 font-mono">
                          <Battery className="w-3 h-3" /> {p.batteryPercent}% ({p.lastUpdated})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blood Group:</span>
                        <span className="font-bold text-slate-700">{p.bloodGroup}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                      <a
                        href={`tel:${p.phone}`}
                        className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call Pilgrim
                      </a>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Document Verification Desk (Passports & PAN) */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                KYC & Visa Document Compliance Queue
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect applicant uploads for Passport (Front & Back), PAN Card, and Saudi Spec White Background Photo.
              </p>
            </div>

            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900">
                        {b.passengers[0].fullName} ({b.referenceNo})
                      </span>
                      <span className="text-[11px] text-slate-500 ml-2">
                        {b.packageTitle} · Departure: {b.departureDate}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Status: {b.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Passport Front */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Passport Front</span>
                        <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">
                          {b.documents.passportFront?.name || 'Uploaded'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                          ✓ Verified
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedDocPreview({
                            pilgrimName: b.passengers[0].fullName,
                            docName: 'Passport Front Page (Bio)',
                            url: b.documents.passportFront?.previewUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
                            docType: 'Passport Front',
                            status: 'Verified'
                          })
                        }
                        className="mt-2 text-xs text-emerald-800 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Document
                      </button>
                    </div>

                    {/* Passport Back */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Passport Back</span>
                        <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">
                          {b.documents.passportBack?.name || 'Uploaded'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                          ✓ Verified
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedDocPreview({
                            pilgrimName: b.passengers[0].fullName,
                            docName: 'Passport Back Page (Address)',
                            url: b.documents.passportBack?.previewUrl || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
                            docType: 'Passport Back',
                            status: 'Verified'
                          })
                        }
                        className="mt-2 text-xs text-emerald-800 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Document
                      </button>
                    </div>

                    {/* PAN Card */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">PAN Card (LRS)</span>
                        <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">
                          {b.documents.panCard?.name || 'Uploaded'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                          ✓ Verified (TCS 5%)
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedDocPreview({
                            pilgrimName: b.passengers[0].fullName,
                            docName: 'Indian PAN Card (Remittance)',
                            url: b.documents.panCard?.previewUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
                            docType: 'PAN Card',
                            status: 'Verified'
                          })
                        }
                        className="mt-2 text-xs text-emerald-800 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Document
                      </button>
                    </div>

                    {/* White BG Photo */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">White BG Photo</span>
                        <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">
                          {b.documents.whiteBgPhoto?.name || 'Uploaded'}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                          ✓ Saudi Spec Approved
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedDocPreview({
                            pilgrimName: b.passengers[0].fullName,
                            docName: 'Saudi Spec White BG Photo',
                            url: b.documents.whiteBgPhoto?.previewUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
                            docType: 'Visa Photo',
                            status: 'Verified'
                          })
                        }
                        className="mt-2 text-xs text-emerald-800 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Document
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Bookings Manifest */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Confirmed Pilgrim Reservations & Rooming List
              </h3>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Manifest (PDF)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Booking Ref</th>
                    <th className="p-3">Lead Pilgrim</th>
                    <th className="p-3">Package & Tier</th>
                    <th className="p-3">Sharing</th>
                    <th className="p-3">Departure Date</th>
                    <th className="p-3">Total Paid</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-emerald-900">{b.referenceNo}</td>
                      <td className="p-3">
                        <strong className="text-slate-900 block">{b.passengers[0].fullName}</strong>
                        <span className="text-slate-400 text-[10px]">{b.passengers[0].phone}</span>
                      </td>
                      <td className="p-3">{b.packageTitle}</td>
                      <td className="p-3 font-semibold">{b.sharingType} ({b.passengers.length} pax)</td>
                      <td className="p-3">{b.departureDate}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">₹{b.finalPayable.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Urgent Broadcast Dispatcher */}
        {activeTab === 'broadcast' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Ground Dispatch & Urgent Push Messenger
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Send urgent push messages, gathering reminders, and bus departures directly to pilgrims' mobile app.
              </p>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Recipient Audience
                </label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-600"
                >
                  <option value="all">All Group Alpha & Beta Pilgrims (All 18 Active)</option>
                  <option value="makkah">Pilgrims Currently in Makkah</option>
                  <option value="madinah">Pilgrims Currently in Madinah</option>
                  <option value="tawaf">Pilgrims in Mataf / Performing Tawaf</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Broadcast Message Text
                </label>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  rows={3}
                  placeholder="e.g. Please assemble at Gate 79 King Fahd courtyard for Tahajjud prayers at 03:00 AM..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#062e22] hover:bg-[#0a3f2f] text-amber-300 font-bold text-xs rounded-lg shadow flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Send Ground Notification</span>
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Recent Broadcast Dispatches
              </h4>
              <div className="space-y-2">
                {broadcastHistory.map((msg, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Inspector Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h4 className="font-heading text-base font-bold text-slate-900">
                  {selectedDocPreview.docName}
                </h4>
                <span className="text-xs text-slate-500">
                  Pilgrim: {selectedDocPreview.pilgrimName} · Status: {selectedDocPreview.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 rounded text-slate-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border">
              <img
                src={selectedDocPreview.url}
                alt={selectedDocPreview.docName}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                <Check className="w-4 h-4" />
                <span>Doc meets Saudi Ministry e-Visa Specs</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDocPreview(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Document "${selectedDocPreview.docName}" approved for ${selectedDocPreview.pilgrimName}`);
                    setSelectedDocPreview(null);
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-900 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Approve Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Package Editor & Creator Modal */}
      <AdminPackageEditorModal
        isOpen={isEditorOpen}
        packageToEdit={packageToEdit}
        onClose={() => {
          setIsEditorOpen(false);
          setPackageToEdit(null);
        }}
        onSavePackage={(pkg) => {
          if (onSavePackage) onSavePackage(pkg);
          setIsEditorOpen(false);
          setPackageToEdit(null);
        }}
      />
    </div>
  );
};
