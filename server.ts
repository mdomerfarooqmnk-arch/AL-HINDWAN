import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const PACKAGES_FILE = path.join(DATA_DIR, 'packages.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let databaseVersion = Date.now();

// Helper to read packages
function readPackages() {
  try {
    if (fs.existsSync(PACKAGES_FILE)) {
      const data = fs.readFileSync(PACKAGES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading packages.json', e);
  }
  return [];
}

// Helper to write packages
function writePackages(packages: any[]) {
  try {
    fs.writeFileSync(PACKAGES_FILE, JSON.stringify(packages, null, 2), 'utf-8');
    databaseVersion = Date.now();
  } catch (e) {
    console.error('Error writing packages.json', e);
  }
}

// Helper to read bookings
function readBookings() {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading bookings.json', e);
  }
  return [];
}

// Helper to write bookings
function writeBookings(bookings: any[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
    databaseVersion = Date.now();
  } catch (e) {
    console.error('Error writing bookings.json', e);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- AUTHENTICATION & AUTHORIZATION APIS ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if admin credentials
    // Admin access allowed with standard admin email or admin password 'admin123' / 'ALHINDWAN2026'
    const isAdmin =
      cleanEmail.includes('admin') ||
      cleanEmail === 'admin@alhindwan-travels.com' ||
      password === 'admin123' ||
      password === 'ALHINDWAN2026' ||
      role === 'admin';

    const user = {
      id: isAdmin ? 'usr-admin-01' : `usr-${Date.now()}`,
      email: cleanEmail,
      fullName: isAdmin ? 'Sheikh Tariq Al-Hindwan (Super Admin)' : (req.body.fullName || 'Haji Mohammad Farooq'),
      role: isAdmin ? 'admin' : 'pilgrim',
      agency: 'Al Hindwan Tours & Travels',
      licenseNo: '1447-UMR',
      permissions: isAdmin
        ? ['manage_packages', 'verify_documents', 'view_all_pilgrims', 'broadcast_alerts', 'view_bookings']
        : ['view_packages', 'book_package', 'upload_documents', 'view_my_status']
    };

    const token = `alhindwan_jwt_${Buffer.from(JSON.stringify(user)).toString('base64')}`;

    return res.json({
      success: true,
      token,
      user
    });
  });

  // Verify auth token
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ authenticated: false });
    }

    try {
      const raw = authHeader.split(' ')[1].replace('alhindwan_jwt_', '');
      const user = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
      return res.json({ authenticated: true, user });
    } catch {
      return res.status(401).json({ authenticated: false });
    }
  });

  // --- DYNAMIC PACKAGES API (DATABASE SYNC) ---
  app.get('/api/packages', (req: Request, res: Response) => {
    const pkgs = readPackages();
    res.setHeader('X-Database-Version', databaseVersion.toString());
    res.json(pkgs);
  });

  app.post('/api/packages', (req: Request, res: Response) => {
    const newPkg = req.body;
    if (!newPkg || !newPkg.title) {
      return res.status(400).json({ error: 'Package title is required' });
    }

    const currentPkgs = readPackages();
    const index = currentPkgs.findIndex((p: any) => p.id === newPkg.id);

    if (index >= 0) {
      // Update existing
      currentPkgs[index] = { ...currentPkgs[index], ...newPkg };
    } else {
      // Insert new at top
      currentPkgs.unshift({
        ...newPkg,
        id: newPkg.id || `pkg-${Date.now()}`
      });
    }

    writePackages(currentPkgs);
    console.log(`[DB] Package "${newPkg.title}" saved. Dynamic database version: ${databaseVersion}`);
    res.json({ success: true, package: newPkg, version: databaseVersion });
  });

  app.delete('/api/packages/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let currentPkgs = readPackages();
    currentPkgs = currentPkgs.filter((p: any) => p.id !== id);
    writePackages(currentPkgs);
    console.log(`[DB] Package "${id}" deleted.`);
    res.json({ success: true, version: databaseVersion });
  });

  // --- DYNAMIC BOOKINGS API ---
  app.get('/api/bookings', (req: Request, res: Response) => {
    const bookings = readBookings();
    res.setHeader('X-Database-Version', databaseVersion.toString());
    res.json(bookings);
  });

  app.post('/api/bookings', (req: Request, res: Response) => {
    const newBooking = req.body;
    const currentBookings = readBookings();
    currentBookings.unshift(newBooking);
    writeBookings(currentBookings);
    res.json({ success: true, booking: newBooking, version: databaseVersion });
  });

  // Version check for instant real-time sync across all clients without reloading
  app.get('/api/version', (req: Request, res: Response) => {
    res.json({
      version: databaseVersion,
      timestamp: new Date().toISOString()
    });
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Al Hindwan Travel Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
