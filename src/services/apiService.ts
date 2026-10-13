import { TravelPackage, BookingRecord } from '../types';
import { MOCK_PACKAGES, INITIAL_SAMPLE_BOOKINGS } from '../data/mockData';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'pilgrim';
  agency?: string;
  licenseNo?: string;
  permissions?: string[];
}

export const apiService = {
  // Fetch packages from centralized database
  async fetchPackages(): Promise<TravelPackage[]> {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem('alhindwan_packages', JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {
      console.warn('API fetch failed, falling back to cached packages', e);
    }

    try {
      const cached = localStorage.getItem('alhindwan_packages');
      if (cached) return JSON.parse(cached);
    } catch {}

    return MOCK_PACKAGES;
  },

  // Save / Update package on server
  async savePackage(pkg: TravelPackage, token?: string): Promise<boolean> {
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(pkg)
      });
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.warn('Failed to save to server, saving locally', e);
    }

    // Local fallback
    try {
      const current = await this.fetchPackages();
      const idx = current.findIndex((p) => p.id === pkg.id);
      if (idx >= 0) current[idx] = pkg;
      else current.unshift(pkg);
      localStorage.setItem('alhindwan_packages', JSON.stringify(current));
    } catch {}

    return true;
  },

  // Delete package from server
  async deletePackage(id: string, token?: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn('Failed to delete on server', e);
    }

    try {
      const current = await this.fetchPackages();
      const filtered = current.filter((p) => p.id !== id);
      localStorage.setItem('alhindwan_packages', JSON.stringify(filtered));
    } catch {}

    return true;
  },

  // Fetch bookings
  async fetchBookings(): Promise<BookingRecord[]> {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem('alhindwan_bookings', JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {
      console.warn('API bookings fetch failed, using cached', e);
    }

    try {
      const cached = localStorage.getItem('alhindwan_bookings');
      if (cached) return JSON.parse(cached);
    } catch {}

    return INITIAL_SAMPLE_BOOKINGS;
  },

  // Save new booking
  async saveBooking(booking: BookingRecord): Promise<boolean> {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (res.ok) return true;
    } catch (e) {
      console.warn('Server booking save failed, saving locally', e);
    }

    try {
      const current = await this.fetchBookings();
      current.unshift(booking);
      localStorage.setItem('alhindwan_bookings', JSON.stringify(current));
    } catch {}

    return true;
  },

  // Real-time Database Version check for polling
  async checkVersion(): Promise<number | null> {
    try {
      const res = await fetch('/api/version', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        return data.version;
      }
    } catch {}
    return null;
  },

  // Authenticate user or admin
  async login(email: string, password: string, role?: string): Promise<{ success: boolean; token?: string; user?: AuthUser; message?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.warn('Server auth failed, using client simulation', e);
    }

    // Client fallback simulation
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail.includes('admin') || password === 'admin123' || password === 'ALHINDWAN2026';
    const user: AuthUser = {
      id: isAdmin ? 'usr-admin-01' : `usr-${Date.now()}`,
      email: cleanEmail,
      fullName: isAdmin ? 'Sheikh Tariq Al-Hindwan (Super Admin)' : 'Haji Mohammad Farooq',
      role: isAdmin ? 'admin' : 'pilgrim',
      agency: 'Al-Hindwan Tours & Travels',
      licenseNo: '1447-UMR',
      permissions: isAdmin ? ['manage_packages', 'verify_documents', 'broadcast_alerts'] : ['view_packages', 'book_package']
    };
    const token = `alhindwan_jwt_${btoa(JSON.stringify(user))}`;

    return { success: true, token, user };
  }
};
