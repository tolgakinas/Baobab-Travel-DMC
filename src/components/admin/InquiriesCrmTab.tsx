import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Inbox, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Users, 
  DollarSign, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  Trash2
} from 'lucide-react';

interface InquiryItem {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  companyOrAgency?: string;
  country?: string;
  tripType?: string;
  selectedTripTitle?: string;
  guestCount?: string;
  budgetTier?: string;
  estimatedDate?: string;
  destinations?: string[];
  specialRequests?: string;
  status: 'new' | 'in_review' | 'proposal_sent' | 'confirmed' | 'archived';
  createdAt: string;
}

// Sample offline fallback inquiries so super admin has instant data to inspect even before new live leads arrive
const FALLBACK_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-sample-1',
    referenceNumber: 'BBD-2025-7821',
    fullName: 'David Sterling',
    email: 'd.sterling@horizonjourneys.co.uk',
    phone: '+44 20 7946 0912',
    companyOrAgency: 'Horizon Journeys UK',
    country: 'United Kingdom',
    tripType: 'Cultural & Historical Expedition',
    selectedTripTitle: '10-Day Classical Turkey & Cappadocia Overland',
    guestCount: '12 Pax',
    budgetTier: 'Luxury Boutique ($350 - $550/day/pax)',
    estimatedDate: 'October 2025',
    destinations: ['Istanbul', 'Cappadocia', 'Ephesus'],
    specialRequests: 'Requires private scholar guide for Ephesus and exclusive cave wine cellar dinner in Urgup.',
    status: 'new',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
  },
  {
    id: 'inq-sample-2',
    referenceNumber: 'BBD-2025-7819',
    fullName: 'Elena Rostova',
    email: 'elena@nordicadventures.se',
    phone: '+46 8 123 4567',
    companyOrAgency: 'Nordic Expeditions Stockholm',
    country: 'Sweden',
    tripType: 'Active Adventure & Hiking',
    selectedTripTitle: 'Lycian Way Coastal Trek & Private Gulet',
    guestCount: '8 Pax',
    budgetTier: 'Premium ($250 - $350/day/pax)',
    estimatedDate: 'May 2026',
    destinations: ['Antalya', 'Lycian Way', 'Kas', 'Fethiye'],
    specialRequests: 'All luggage transfers between trekking stages required. Need gulet charter with private chef.',
    status: 'in_review',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
  },
  {
    id: 'inq-sample-3',
    referenceNumber: 'BBD-2025-7804',
    fullName: 'Marcus Vance',
    email: 'm.vance@vancetravel.com',
    phone: '+1 415 889 0123',
    companyOrAgency: 'Vance Luxury Travel (Virtuoso)',
    country: 'United States',
    tripType: 'Small Group Tour',
    selectedTripTitle: 'Culinary Crossroads of Istanbul & Aegean',
    guestCount: '6 Pax',
    budgetTier: 'Ultra-Luxury ($600+/day/pax)',
    estimatedDate: 'September 2025',
    destinations: ['Istanbul', 'Bodrum', 'Ephesus'],
    specialRequests: 'Requires Ciragan Palace Kempinski suites and private helicopter transfers between IST and Bodrum.',
    status: 'proposal_sent',
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString()
  }
];

export const InquiriesCrmTab: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(FALLBACK_INQUIRIES);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);

  const handleDeleteInquiry = async (inquiryId: string) => {
    setInquiries(prev => prev.filter(i => i.id !== inquiryId));
    if (selectedInquiry?.id === inquiryId) {
      setSelectedInquiry(null);
    }
    setDeletingInquiryId(null);
    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
    } catch (e) {
      // Local state already updated
    }
  };

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(50));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const liveList: InquiryItem[] = snap.docs.map(d => ({
            id: d.id,
            ...(d.data() as any)
          }));
          setInquiries([...liveList, ...FALLBACK_INQUIRIES]);
        }
      } catch (err) {
        console.warn('Could not read from Firestore inquiries, using local store:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (inquiryId: string, newStatus: InquiryItem['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === inquiryId ? { ...inq, status: newStatus } : inq));
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
    }
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), { status: newStatus });
    } catch (e) {
      // Local state already updated
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch = 
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.companyOrAgency && inq.companyOrAgency.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.referenceNumber && inq.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const exportCsv = () => {
    const headers = ['Ref Number', 'Date', 'Status', 'Full Name', 'Company', 'Email', 'Phone', 'Trip Type', 'Pax', 'Budget', 'Destinations'];
    const rows = filteredInquiries.map(i => [
      `"${i.referenceNumber || ''}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
      `"${i.status}"`,
      `"${i.fullName}"`,
      `"${i.companyOrAgency || ''}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.tripType || ''}"`,
      `"${i.guestCount || ''}"`,
      `"${i.budgetTier || ''}"`,
      `"${(i.destinations || []).join(';')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `baobab_dmc_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: InquiryItem['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">New Lead</span>;
      case 'in_review':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800 border border-blue-300">In Review</span>;
      case 'proposal_sent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-800 border border-purple-300">Proposal Sent</span>;
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">Confirmed Booking</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-100 text-neutral-600 border border-neutral-200">Archived</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-[#F05A28]" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Tour Inquiries & B2B Leads CRM Hub ({inquiries.length})
              </h3>
              <p className="text-xs text-neutral-500">
                Real-time incoming proposal requests, B2B partner applications, and traveler itineraries.
              </p>
            </div>
          </div>

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, agency, ref number, or email..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'new', 'in_review', 'proposal_sent', 'confirmed', 'archived'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap transition-colors ${
                  statusFilter === s
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {s === 'all' ? 'All Inquiries' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Ref & Date</th>
                <th className="px-4 py-3">Client / Agency</th>
                <th className="px-4 py-3">Tour Details</th>
                <th className="px-4 py-3">Pax & Budget</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono">
                      <div className="font-bold text-neutral-900">{inq.referenceNumber || inq.id.slice(0, 12)}</div>
                      <div className="text-[10px] text-neutral-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-bold text-neutral-900">{inq.fullName}</div>
                      <div className="text-neutral-500 text-[11px]">{inq.companyOrAgency || inq.country || 'FIT Traveler'}</div>
                      <div className="text-[10px] text-neutral-400">{inq.email}</div>
                    </td>

                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-semibold text-neutral-800 line-clamp-1">
                        {inq.selectedTripTitle || inq.tripType || 'Custom Turkey Expedition'}
                      </div>
                      <div className="text-[10px] text-[#F05A28]">
                        {(inq.destinations || []).slice(0, 3).join(', ')}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-neutral-900">{inq.guestCount || '4-8 Pax'}</div>
                      <div className="text-[10px] text-neutral-500 truncate max-w-[120px]">{inq.budgetTier || 'Standard B2B'}</div>
                    </td>

                    <td className="px-4 py-3">
                      {getStatusBadge(inq.status)}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>

                        {deletingInquiryId === inq.id ? (
                          <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                            <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeletingInquiryId(null)}
                              className="px-1 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeletingInquiryId(inq.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 border border-neutral-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#F05A28]">
                  Ref: {selectedInquiry.referenceNumber || selectedInquiry.id}
                </span>
                <h3 className="text-lg font-bold text-neutral-900">
                  {selectedInquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-neutral-400 hover:text-neutral-900 font-bold p-1 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="flex items-center justify-between bg-neutral-50 p-3 rounded border border-neutral-200">
              <span className="text-xs font-bold text-neutral-700">Change Status:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['new', 'in_review', 'proposal_sent', 'confirmed', 'archived'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                    className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded transition-colors ${
                      selectedInquiry.status === st
                        ? 'bg-[#F05A28] text-white shadow-xs'
                        : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Email</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-[#F05A28] hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Phone</span>
                <span className="font-bold text-neutral-800">{selectedInquiry.phone || 'N/A'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Company / Agency</span>
                <span className="font-bold text-neutral-800">{selectedInquiry.companyOrAgency || 'N/A'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Country</span>
                <span className="font-bold text-neutral-800">{selectedInquiry.country || 'N/A'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Guest Count / Pax</span>
                <span className="font-bold text-neutral-800">{selectedInquiry.guestCount || 'N/A'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Budget Tier</span>
                <span className="font-bold text-neutral-800">{selectedInquiry.budgetTier || 'N/A'}</span>
              </div>
              <div className="col-span-2 p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="text-neutral-400 block font-semibold">Selected Trip or Route</span>
                <span className="font-bold text-neutral-900">{selectedInquiry.selectedTripTitle || selectedInquiry.tripType || 'Custom Expedition'}</span>
              </div>
              {selectedInquiry.specialRequests && (
                <div className="col-span-2 p-3 bg-neutral-50 rounded border border-neutral-200">
                  <span className="text-neutral-400 block font-semibold mb-1">Special Client Requirements</span>
                  <p className="text-neutral-700 whitespace-pre-wrap">{selectedInquiry.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
              {deletingInquiryId === selectedInquiry.id ? (
                <div className="flex items-center gap-2 bg-red-50 p-1.5 rounded border border-red-300">
                  <span className="text-xs font-bold text-red-700">Permanently delete this inquiry?</span>
                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setDeletingInquiryId(null)}
                    className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs font-semibold rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeletingInquiryId(selectedInquiry.id)}
                  className="px-3 py-1.5 border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Inquiry</span>
                </button>
              )}

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
