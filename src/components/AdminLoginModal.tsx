import React, { useState } from 'react';
import { apiService, AuthUser } from '../services/apiService';
import {
  ShieldCheck, Lock, Mail, Key, UserCheck, X, Sparkles, CheckCircle2,
  AlertCircle, ArrowRight, ShieldAlert, Users
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser, token: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState<string>('admin@alhindwan-travels.com');
  const [password, setPassword] = useState<string>('admin123');
  const [loginRole, setLoginRole] = useState<'admin' | 'pilgrim'>('admin');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFillAdminDemo = () => {
    setEmail('admin@alhindwan-travels.com');
    setPassword('admin123');
    setLoginRole('admin');
    setErrorMessage(null);
  };

  const handleFillPilgrimDemo = () => {
    setEmail('farooq.pilgrim@example.com');
    setPassword('pilgrim123');
    setLoginRole('pilgrim');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await apiService.login(email, password, loginRole);
      if (result.success && result.user && result.token) {
        localStorage.setItem('alhindwan_auth_token', result.token);
        localStorage.setItem('alhindwan_auth_user', JSON.stringify(result.user));
        onLoginSuccess(result.user, result.token);
        onClose();
      } else {
        setErrorMessage(result.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="bg-[#062e22] text-white p-6 border-b border-[#c5a059]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Agency Portal Access
            </span>
            <span className="text-xs text-emerald-200">
              License #1447-UMR
            </span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
            {loginRole === 'admin' ? 'Admin Control Room Sign In' : 'Pilgrim Account Login'}
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            {loginRole === 'admin'
              ? 'Super Admin authorization is required to modify packages, approve passports, and dispatch emergency alerts.'
              : 'Sign in to access your travel documents, visa approval updates, and live Tawaf tracking.'}
          </p>

          {/* Role Segmented Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2 p-1 bg-[#042017] rounded-xl border border-emerald-800">
            <button
              type="button"
              onClick={() => {
                setLoginRole('admin');
                setEmail('admin@alhindwan-travels.com');
                setPassword('admin123');
              }}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                loginRole === 'admin'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Tour Admin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginRole('pilgrim');
                setEmail('farooq.pilgrim@example.com');
                setPassword('pilgrim123');
              }}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                loginRole === 'pilgrim'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Pilgrim Traveler</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-slate-800 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Authorized Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@alhindwan-travels.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Security Password / Passcode *
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-2">
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
              Instant 1-Click Credentials Test:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleFillAdminDemo}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-[11px] font-bold text-amber-950 flex items-center justify-center gap-1 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Fill Super Admin</span>
              </button>
              <button
                type="button"
                onClick={handleFillPilgrimDemo}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-colors"
              >
                <span>Fill Pilgrim User</span>
              </button>
            </div>
          </div>

          {/* Authorization privileges note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-600">
            <strong className="text-slate-900 text-[11px] block">
              {loginRole === 'admin' ? 'Admin Authorization Privileges:' : 'Pilgrim Privileges:'}
            </strong>
            {loginRole === 'admin' ? (
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Package Creator & Editor (Prices, Hotel Photos, Food Buffets)</li>
                <li>Instant dynamic live update to all pilgrims in real time</li>
                <li>Document Compliance & Passports Approval Desk</li>
                <li>Live GPS Pilgrim Radar & Emergency Broadcaster</li>
              </ul>
            ) : (
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>View confirmed booking vouchers & documents status</li>
                <li>Live Kaaba 300m Tawaf tracking simulation</li>
                <li>Prayer times, Qibla compass & Digital Tasbih</li>
              </ul>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-[#062e22] to-[#0c4b37] hover:brightness-110 text-amber-300 font-bold rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>
                  {loginRole === 'admin' ? 'Sign In as Super Admin' : 'Sign In as Pilgrim'}
                </span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
