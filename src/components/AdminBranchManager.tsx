import React, { useState, useEffect } from 'react';
import { BranchOffice } from '../types';
import { INITIAL_BRANCHES } from '../data/mockData';
import {
  Building2, Plus, Edit3, Trash2, MapPin, Phone, MessageSquare,
  Clock, UserCheck, ShieldCheck, CheckCircle2, AlertCircle, X, Search,
  ExternalLink, Mail
} from 'lucide-react';

interface AdminBranchManagerProps {
  onBranchesChange?: (branches: BranchOffice[]) => void;
}

export const AdminBranchManager: React.FC<AdminBranchManagerProps> = ({
  onBranchesChange
}) => {
  const [branches, setBranches] = useState<BranchOffice[]>(() => {
    try {
      const stored = localStorage.getItem('alhindwan_branches');
      return stored ? JSON.parse(stored) : INITIAL_BRANCHES;
    } catch {
      return INITIAL_BRANCHES;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<BranchOffice, 'id'>>({
    name: '',
    type: 'Regional Branch',
    city: '',
    state: '',
    address: '',
    pincode: '',
    phone1: '',
    phone2: '',
    whatsapp: '',
    email: '',
    managerName: '',
    timings: '09:30 AM – 08:30 PM',
    status: 'Active',
    isHeadOffice: false
  });

  const saveBranchesToStorage = (updatedList: BranchOffice[]) => {
    setBranches(updatedList);
    try {
      localStorage.setItem('alhindwan_branches', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('alhindwan_branches_updated'));
    } catch {}
    if (onBranchesChange) onBranchesChange(updatedList);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingBranchId(null);
    setFormData({
      name: '',
      type: 'Regional Branch',
      city: '',
      state: '',
      address: '',
      pincode: '',
      phone1: '',
      phone2: '',
      whatsapp: '',
      email: '',
      managerName: '',
      timings: '09:30 AM – 08:30 PM (Daily)',
      status: 'Active',
      isHeadOffice: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (branch: BranchOffice) => {
    setEditingBranchId(branch.id);
    setFormData({
      name: branch.name,
      type: branch.type,
      city: branch.city,
      state: branch.state,
      address: branch.address,
      pincode: branch.pincode,
      phone1: branch.phone1,
      phone2: branch.phone2 || '',
      whatsapp: branch.whatsapp,
      email: branch.email,
      managerName: branch.managerName,
      timings: branch.timings,
      status: branch.status,
      isHeadOffice: !!branch.isHeadOffice
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim() || !formData.phone1.trim()) {
      alert('Please fill in the branch name, city, and primary contact number.');
      return;
    }

    if (editingBranchId) {
      const updated = branches.map((b) =>
        b.id === editingBranchId ? { ...formData, id: editingBranchId } : b
      );
      saveBranchesToStorage(updated);
      showToast(`Branch "${formData.name}" updated successfully.`);
    } else {
      const newBranch: BranchOffice = {
        ...formData,
        id: `br-${Date.now()}`
      };
      const updated = [newBranch, ...branches];
      saveBranchesToStorage(updated);
      showToast(`New Branch "${formData.name}" registered successfully.`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteBranch = (id: string, name: string) => {
    if (branches.length <= 1) {
      alert('Cannot delete all branches. At least one operational office must remain.');
      return;
    }
    if (confirm(`Are you sure you want to remove "${name}" from registered branches?`)) {
      const updated = branches.filter((b) => b.id !== id);
      saveBranchesToStorage(updated);
      showToast(`Branch "${name}" was removed.`);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset branches directory back to official default offices (Hyderabad, Manna Ekhelli, Makkah Desk)?')) {
      saveBranchesToStorage(INITIAL_BRANCHES);
      showToast('Branches reset to official defaults.');
    }
  };

  const filteredBranches = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.managerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-4 h-4 text-emerald-700" />
              Al-Hindwan Tours & Travels Branch Network
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
              {branches.length} Active Offices
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Branch Offices & Ground Support Desks
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Configure official Al-Hindwan booking branches, regional helpline numbers, branch managers, and operational working hours.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetToDefaults}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Restore original official offices"
          >
            Reset Defaults
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#dfb86c] text-[#062e22] text-xs font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#b38e45]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Branch</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search branches by city, name, address, or manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          {(['all', 'Active', 'Temporarily Closed', 'Upcoming'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-900 text-amber-300 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? 'All Branches' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBranches.map((br) => {
          const isHead = br.isHeadOffice || br.type === 'Head Office';
          return (
            <div
              key={br.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between relative overflow-hidden bg-white shadow-sm hover:shadow-md ${
                isHead ? 'border-[#c5a059] ring-2 ring-[#c5a059]/20' : 'border-slate-200'
              }`}
            >
              {/* Top Card Badge Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isHead
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {br.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          br.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {br.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                        {br.status}
                      </span>
                    </div>
                    <h4 className="font-heading text-base font-extrabold text-slate-900 mt-1.5">
                      {br.name}
                    </h4>
                    <span className="text-xs font-semibold text-emerald-800">
                      {br.city}, {br.state}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditModal(br)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                      title="Edit Branch"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {!isHead && (
                      <button
                        onClick={() => handleDeleteBranch(br.id, br.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Branch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {br.address} {br.pincode ? `– PIN: ${br.pincode}` : ''}
                    </p>
                  </div>

                  {/* Phone Contacts */}
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <div className="font-mono font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                      <a href={`tel:${br.phone1}`} className="hover:text-emerald-700">
                        {br.phone1}
                      </a>
                      {br.phone2 && (
                        <>
                          <span className="text-slate-300">/</span>
                          <a href={`tel:${br.phone2}`} className="hover:text-emerald-700">
                            {br.phone2}
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  {br.whatsapp && (
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                      <a
                        href={`https://wa.me/${br.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-800 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>WhatsApp: {br.whatsapp}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </div>
                  )}

                  {/* Manager */}
                  {br.managerName && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <UserCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Manager: <strong className="text-slate-800">{br.managerName}</strong></span>
                    </div>
                  )}

                  {/* Timings */}
                  {br.timings && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Hours: {br.timings}</span>
                    </div>
                  )}

                  {/* Email */}
                  {br.email && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <a href={`mailto:${br.email}`} className="text-blue-600 hover:underline">
                        {br.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${br.phone1}`}
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-[11px] rounded-lg shadow-sm flex items-center justify-center gap-1 transition-colors text-center"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>Call Branch</span>
                </a>
                {br.whatsapp && (
                  <a
                    href={`https://wa.me/${br.whatsapp.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%2C%20inquiry%20regarding%20Al-Hindwan%20Tours`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[11px] rounded-lg shadow-sm flex items-center justify-center gap-1 transition-colors text-center"
                  >
                    <MessageSquare className="w-3 h-3 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredBranches.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-800">No branches match your search</h4>
          <p className="text-xs text-slate-500 mt-1">Try another keyword or click &quot;Add New Branch&quot; above.</p>
        </div>
      )}

      {/* Add / Edit Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-800" />
                <h4 className="font-heading text-lg font-bold text-slate-900">
                  {editingBranchId ? 'Edit Branch Office' : 'Add New Branch Office'}
                </h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Branch Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Branch Office – Mumbai (Bhendi Bazaar)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Branch Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Head Office">Head Office</option>
                    <option value="Regional Branch">Regional Branch</option>
                    <option value="Sub-Branch">Sub-Branch</option>
                    <option value="International Liaison">International Liaison</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Operational Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Active">Active & Operating</option>
                    <option value="Upcoming">Upcoming / Launching Soon</option>
                    <option value="Temporarily Closed">Temporarily Closed</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Bengaluru, Bidar"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra, Karnataka, Telangana"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Full Office Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Shop #12, Ground Floor, Medina Arcade, Ibrahim Rahimtullah Road..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    PIN / Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 400003"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Primary Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98200 12345"
                    value={formData.phone1}
                    onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Secondary Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98200 67890"
                    value={formData.phone2}
                    onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    WhatsApp Helpline Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98200 12345"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Branch Manager / In-Charge Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mohammed Altaf (Branch Lead)"
                    value={formData.managerName}
                    onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Official Branch Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. mumbai@alhindwan.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Working Timings
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM – 09:00 PM (Mon – Sat)"
                    value={formData.timings}
                    onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold rounded-lg shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{editingBranchId ? 'Update Branch' : 'Save Branch'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
