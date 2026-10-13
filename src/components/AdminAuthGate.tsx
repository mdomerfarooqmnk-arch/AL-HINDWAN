import React, { useState } from 'react';
import { apiService, AuthUser } from '../services/apiService';
import {
  ShieldCheck, Lock, Mail, Key, UserCheck, Sparkles, CheckCircle2,
  AlertCircle, ArrowRight, ShieldAlert, Users, Database, RefreshCw,
  Building2, Utensils, Award
} from 'lucide-react';
import { AlHindwanLogo } from './AlHindwanLogo';

interface AdminAuthGateProps {
  onLoginSuccess: (user: AuthUser, token: string) => void;
  onExploreAsGuest?: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({
  onLoginSuccess,
  onExploreAsGuest,
  currentUser,
  onLogout
}) => {
  const [email, setEmail] = useState<string>('admin@alhindwan-travels.com');
  const [password, setPassword] = useState<string>('admin123');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'pilgrim'>('admin');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFillSuperAdmin = () => {
    setEmail('admin@alhindwan-travels.com');
    setPassword('admin123');
    setSelectedRole('admin');
    setErrorMessage(null);
  };

  const handleFillTourManager = () => {
    setEmail('tariq.admin@alhindwan-travels.com');
    setPassword('ALHINDWAN2026');
    setSelectedRole('admin');
    setErrorMessage(null);
  };

  const handleFillPilgrim = () => {
    setEmail('farooq.pilgrim@example.com');
    setPassword('pilgrim123');
    setSelectedRole('pilgrim');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await apiService.login(email, password, selectedRole);
      if (result.success && result.user && result.token) {
        localStorage.setItem('alhindwan_auth_token', result.token);
        localStorage.setItem('alhindwan_auth_user', JSON.stringify(result.user));
        onLoginSuccess(result.user, result.token);
      } else {
        setErrorMessage(result.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 min-h-[80vh] flex items-center justify-center bg-slate-100/70">
      <div className="max-w-2xl w-full space-y-6">
        {/* Active Session & Log Out Banner if logged in */}
        {currentUser && (
          <div className="bg-amber-950/90 text-amber-200 border-2 border-amber-500/80 rounded-xl px-4 py-3 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Signed in as: {currentUser.fullName}</span>
                <span className="text-amber-300 ml-1">({currentUser.role === 'admin' ? 'Super Admin' : 'Pilgrim'})</span>
              </div>
            </div>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold rounded-lg text-xs shadow transition-colors cursor-pointer"
              >
                Log Out / Switch Account
              </button>
            )}
          </div>
        )}

        {/* Dynamic Database Status Banner */}
        <div className="bg-emerald-950 text-emerald-200 border border-emerald-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Centralized Travel Database: Connected</span>
            <span className="text-emerald-400 hidden sm:inline">· Live REST & JSON Sync Engine</span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700">
            Zero App Update Sync Active
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#062e22] text-white p-6 sm:p-8 border-b border-[#c5a059]/40 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Control Desk
                  </span>
                  <span className="text-xs text-emerald-300 font-mono">
                    Ministry License #1447-UMR
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Admin Authentication & Authorization Panel
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-xl leading-relaxed">
                  Super Admin authorization is required to access the Live Ground Control Room, create and modify Umrah packages (costs, hotel photos, buffet menus), and approve pilgrim passports.
                </p>
              </div>
              <AlHindwanLogo size="sm" className="hidden sm:inline-block shrink-0 drop-shadow-md" />
            </div>

            {/* Role Toggle Selector */}
            <div className="mt-5 grid grid-cols-2 gap-2 p-1 bg-[#031d14] rounded-xl border border-emerald-800/80">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  handleFillSuperAdmin();
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-emerald-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Super Admin / Tour Director</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('pilgrim');
                  handleFillPilgrim();
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedRole === 'pilgrim'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-emerald-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Pilgrim Traveler Portal</span>
              </button>
            </div>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-slate-800 text-xs">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block font-semibold">Authentication Error</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Authorized Admin Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@alhindwan-travels.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Security Passcode / Master Key *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 1-Click Instant Demo Credentials Buttons */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Instant 1-Click Testing Credentials:
                </span>
                <span className="text-[10px] text-amber-800">Pre-configured roles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleFillSuperAdmin}
                  className="py-2 px-3 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-950 flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer text-left"
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fill Super Admin (admin@alhindwan / admin123)</span>
                </button>

                <button
                  type="button"
                  onClick={handleFillTourManager}
                  className="py-2 px-3 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-950 flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer text-left"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fill Tour Manager (tariq.admin / ALHINDWAN2026)</span>
                </button>
              </div>
            </div>

            {/* Authorization & Real-Time Sync Privileges Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Admin Authorization Capabilities Granted on Sign In:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Package Architect:</strong> Create & modify tariffs, hotel photos & food buffet menus</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero-Update Sync:</strong> Changes instantly propagate to end-users without app update</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Document Verification:</strong> Approve Passport & PAN card KYC submissions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Live Ground Telemetry:</strong> Monitor 300m Kaaba geofence & Tawaf status</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 py-3 px-6 bg-gradient-to-r from-[#062e22] via-[#094130] to-[#0c4b37] hover:brightness-110 text-amber-300 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all text-xs sm:text-sm"
              >
                {loading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Authorize & Enter Admin Control Room</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>

              {onExploreAsGuest && (
                <button
                  type="button"
                  onClick={onExploreAsGuest}
                  className="w-full sm:w-auto py-3 px-4 border border-slate-300 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold transition-colors cursor-pointer text-xs"
                >
                  Return to Home
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
