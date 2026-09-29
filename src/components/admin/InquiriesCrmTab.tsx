import React, { useState, useEffect, useCallback } from 'react';
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
  Trash2,
  RefreshCw,
  MessageSquare,
  Tag,
  Copy,
  Check,
  FileText,
  Send,
  Building2,
  MapPin,
  Sparkles,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export interface InquiryItem {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  companyOrAgency?: string;
  country?: string;
  role?: string;
  tripType?: string;
  selectedTripTitle?: string;
  guestCount?: string;
  budgetTier?: string;
  estimatedDate?: string;
  destinations?: string[];
  preferredExperiences?: string[];
  specialRequests?: string;
  formMode?: 'b2b-partner' | 'tour-inquiry' | 'consultant-booking' | string;
  status: 'new' | 'in_review' | 'proposal_sent' | 'confirmed' | 'archived';
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export const InquiriesCrmTab: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [operatorNotes, setOperatorNotes] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());

  // Fetch inquiries from server CRM endpoint
  const fetchInquiries = useCallback(async (isManualRefresh: boolean = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.inquiries)) {
          setInquiries(data.inquiries);
        }
      }
    } catch (err) {
      console.warn('[Inquiries CRM fetch error]:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
      setLastRefreshedAt(new Date());
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // When selected inquiry changes, initialize operator notes state
  useEffect(() => {
    if (selectedInquiry) {
      setOperatorNotes(selectedInquiry.internalNotes || '');
    }
  }, [selectedInquiry]);

  // Update inquiry status
  const handleUpdateStatus = async (inquiryId: string, newStatus: InquiryItem['status']) => {
    setInquiries(prev => prev.map(inq => 
      inq.id === inquiryId || inq.referenceNumber === inquiryId 
        ? { ...inq, status: newStatus, updatedAt: new Date().toISOString() } 
        : inq
    ));
    if (selectedInquiry && (selectedInquiry.id === inquiryId || selectedInquiry.referenceNumber === inquiryId)) {
      setSelectedInquiry(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null);
    }

    try {
      await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('[Update status error]:', e);
    }
  };

  // Save internal operator notes
  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsSavingNotes(true);
    const inqId = selectedInquiry.id || selectedInquiry.referenceNumber;

    try {
      const res = await fetch(`/api/inquiries/${inqId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: operatorNotes }),
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => 
          inq.id === inqId || inq.referenceNumber === inqId 
            ? { ...inq, internalNotes: operatorNotes } 
            : inq
        ));
        setSelectedInquiry(prev => prev ? { ...prev, internalNotes: operatorNotes } : null);
      }
    } catch (e) {
      console.warn('[Save notes error]:', e);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (inquiryId: string) => {
    setInquiries(prev => prev.filter(i => i.id !== inquiryId && i.referenceNumber !== inquiryId));
    if (selectedInquiry?.id === inquiryId || selectedInquiry?.referenceNumber === inquiryId) {
      setSelectedInquiry(null);
    }
    setDeletingInquiryId(null);

    try {
      await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('[Delete inquiry error]:', e);
    }
  };

  // Copy reference number to clipboard
  const handleCopyRef = (refNum: string) => {
    navigator.clipboard.writeText(refNum);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // Filtered inquiries calculation
  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesType = typeFilter === 'all' || inq.formMode === typeFilter;
    
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus && matchesType;

    const matchesSearch = 
      (inq.fullName && inq.fullName.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.companyOrAgency && inq.companyOrAgency.toLowerCase().includes(q)) ||
      (inq.referenceNumber && inq.referenceNumber.toLowerCase().includes(q)) ||
      (inq.country && inq.country.toLowerCase().includes(q)) ||
      (inq.selectedTripTitle && inq.selectedTripTitle.toLowerCase().includes(q)) ||
      (inq.destinations && inq.destinations.some(d => d.toLowerCase().includes(q)));

    return matchesStatus && matchesType && matchesSearch;
  });

  // Metric counts
  const countNew = inquiries.filter(i => i.status === 'new').length;
  const countInReview = inquiries.filter(i => i.status === 'in_review').length;
  const countProposal = inquiries.filter(i => i.status === 'proposal_sent').length;
  const countConfirmed = inquiries.filter(i => i.status === 'confirmed').length;
  const countArchived = inquiries.filter(i => i.status === 'archived').length;

  // Export inquiries to CSV
  const exportCsv = () => {
    const headers = [
      'Reference Number',
      'Created Date',
      'Status',
      'Form Type',
      'Client Full Name',
      'Company or Agency',
      'Email',
      'Phone',
      'Country',
      'Role / Title',
      'Regarded Trip / Route',
      'Guests (Pax)',
      'Budget Tier',
      'Target Date',
      'Destinations',
      'Special Requests',
      'Internal Notes'
    ];
    const rows = filteredInquiries.map(i => [
      `"${i.referenceNumber || i.id}"`,
      `"${new Date(i.createdAt).toLocaleString()}"`,
      `"${i.status}"`,
      `"${i.formMode || 'tour-inquiry'}"`,
      `"${(i.fullName || '').replace(/"/g, '""')}"`,
      `"${(i.companyOrAgency || '').replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.country || ''}"`,
      `"${i.role || ''}"`,
      `"${(i.selectedTripTitle || i.tripType || '').replace(/"/g, '""')}"`,
      `"${i.guestCount || ''}"`,
      `"${i.budgetTier || ''}"`,
      `"${i.estimatedDate || ''}"`,
      `"${(i.destinations || []).join('; ')}"`,
      `"${(i.specialRequests || '').replace(/"/g, '""')}"`,
      `"${(i.internalNotes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `baobab_dmc_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: InquiryItem['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-orange-100 text-[#F05A28] border border-orange-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28] animate-pulse" />
            New Lead
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3 h-3 text-blue-600" />
            In Review
          </span>
        );
      case 'proposal_sent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-300">
            <Send className="w-3 h-3 text-purple-600" />
            Proposal Sent
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200">
            Archived
          </span>
        );
    }
  };

  const getTypeBadge = (formMode?: string) => {
    switch (formMode) {
      case 'b2b-partner':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <Building2 className="w-2.5 h-2.5" />
            B2B Partner
          </span>
        );
      case 'consultant-booking':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-2.5 h-2.5" />
            Trade Booking
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200">
            <Briefcase className="w-2.5 h-2.5" />
            Tour Proposal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Banner */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0 shadow-xs">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold text-neutral-900">
                  Tour Inquiries & B2B Leads CRM Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F05A28] text-white">
                  {inquiries.length} Total
                </span>
                {countNew > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white animate-pulse">
                    {countNew} New
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Real-time dashboard for inbound luxury tour requests, B2B agency registrations, and confirmed travel advisor bookings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchInquiries(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 text-xs font-semibold rounded-lg shadow-xs transition-colors disabled:opacity-50"
              title="Refresh Inquiries list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#F05A28]' : 'text-neutral-500'}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={exportCsv}
              disabled={filteredInquiries.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-3 rounded-lg border text-left transition-all ${
              statusFilter === 'all'
                ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-70">Total Leads</div>
            <div className="text-xl font-bold mt-1">{inquiries.length}</div>
          </button>

          <button
            onClick={() => setStatusFilter('new')}
            className={`p-3 rounded-lg border text-left transition-all ${
              statusFilter === 'new'
                ? 'border-[#F05A28] bg-[#F05A28] text-white shadow-xs'
                : 'border-orange-200 bg-orange-50/60 hover:bg-orange-100 text-orange-950'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
              <span>New / Unread</span>
              {countNew > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
            </div>
            <div className="text-xl font-bold mt-1 text-[#F05A28] group-hover:text-white">{countNew}</div>
          </button>

          <button
            onClick={() => setStatusFilter('in_review')}
            className={`p-3 rounded-lg border text-left transition-all ${
              statusFilter === 'in_review'
                ? 'border-blue-700 bg-blue-700 text-white shadow-xs'
                : 'border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-blue-950'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-70">In Review</div>
            <div className="text-xl font-bold mt-1 text-blue-700">{countInReview}</div>
          </button>

          <button
            onClick={() => setStatusFilter('proposal_sent')}
            className={`p-3 rounded-lg border text-left transition-all ${
              statusFilter === 'proposal_sent'
                ? 'border-purple-700 bg-purple-700 text-white shadow-xs'
                : 'border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-purple-950'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-70">Proposal Sent</div>
            <div className="text-xl font-bold mt-1 text-purple-700">{countProposal}</div>
          </button>

          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`p-3 rounded-lg border text-left transition-all ${
              statusFilter === 'confirmed'
                ? 'border-emerald-700 bg-emerald-700 text-white shadow-xs'
                : 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-950'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-70">Confirmed</div>
            <div className="text-xl font-bold mt-1 text-emerald-700">{countConfirmed}</div>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, agency, ref number (TR-BAOBAB-...), tour title, or email..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-[#F05A28] bg-neutral-50/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-[#F05A28] text-neutral-700 font-medium"
            >
              <option value="all">All Channels (Web & Trade)</option>
              <option value="tour-inquiry">Tour Proposal Requests</option>
              <option value="b2b-partner">B2B Trade Registrations</option>
              <option value="consultant-booking">Confirmed Advisor Bookings</option>
            </select>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-2 text-xs text-neutral-500 hover:text-neutral-800 bg-neutral-100 rounded-lg"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-xl bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/90 border-b border-neutral-200 text-neutral-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Ref & Date</th>
                <th className="px-4 py-3.5">Lead Contact & Agency</th>
                <th className="px-4 py-3.5">Requested Tour / Route</th>
                <th className="px-4 py-3.5">Pax & Budget</th>
                <th className="px-4 py-3.5">Channel</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-neutral-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#F05A28] mb-2" />
                    <span>Loading inquiries from database...</span>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-neutral-500 space-y-2">
                    <Inbox className="w-8 h-8 mx-auto text-neutral-300" />
                    <div className="font-semibold text-neutral-700">No inquiries found matching your filters</div>
                    <p className="text-xs text-neutral-400">
                      Try clearing your search query or selecting a different status tab above.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr 
                    key={inq.id || inq.referenceNumber} 
                    className={`hover:bg-neutral-50/80 transition-colors ${
                      inq.status === 'new' ? 'bg-orange-50/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3.5 font-mono">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="font-bold text-[#F05A28] hover:underline text-left block"
                      >
                        {inq.referenceNumber || inq.id.slice(0, 14)}
                      </button>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {new Date(inq.createdAt).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="font-bold text-neutral-900 truncate">{inq.fullName}</div>
                      <div className="text-neutral-500 text-[11px] truncate">
                        {inq.companyOrAgency ? inq.companyOrAgency : (inq.country ? `${inq.country} FIT` : 'Direct Traveler')}
                      </div>
                      <a 
                        href={`mailto:${inq.email}?subject=Baobab DMC Turkey - Ref ${inq.referenceNumber}`}
                        className="text-[10px] text-neutral-400 hover:text-[#F05A28] block truncate"
                      >
                        {inq.email}
                      </a>
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="font-semibold text-neutral-800 line-clamp-1">
                        {inq.selectedTripTitle || inq.tripType || 'Custom Turkey Itinerary'}
                      </div>
                      {inq.destinations && inq.destinations.length > 0 && (
                        <div className="text-[10.5px] text-[#F05A28] truncate mt-0.5 font-medium">
                          {inq.destinations.slice(0, 3).join(', ')}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-semibold text-neutral-900">{inq.guestCount || '1-4 Guests'}</div>
                      <div className="text-[10px] text-neutral-500 truncate max-w-[120px]">
                        {inq.budgetTier || 'Standard Luxury'}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getTypeBadge(inq.formMode)}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(inq.status)}
                    </td>

                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-md inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>

                        {deletingInquiryId === (inq.id || inq.referenceNumber) ? (
                          <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                            <span className="text-[10px] font-bold text-red-700 pl-1">Confirm?</span>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id || inq.referenceNumber)}
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
                            onClick={() => setDeletingInquiryId(inq.id || inq.referenceNumber)}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                            title="Delete Inquiry"
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

        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
          <div>
            Showing <strong>{filteredInquiries.length}</strong> of <strong>{inquiries.length}</strong> recorded inquiries
          </div>
          <div>
            Last refreshed at {lastRefreshedAt.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 border border-neutral-200 max-h-[92vh] overflow-y-auto space-y-5 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F05A28]">
                    Ref: {selectedInquiry.referenceNumber || selectedInquiry.id}
                  </span>
                  {getTypeBadge(selectedInquiry.formMode)}
                  {getStatusBadge(selectedInquiry.status)}
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {selectedInquiry.fullName}
                </h3>
                <p className="text-xs text-neutral-500">
                  Submitted on {new Date(selectedInquiry.createdAt).toLocaleString(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyRef(selectedInquiry.referenceNumber || selectedInquiry.id)}
                  className="px-2.5 py-1 text-xs border border-neutral-200 hover:border-neutral-300 rounded-lg text-neutral-600 flex items-center gap-1.5 transition-colors"
                  title="Copy Reference"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied!' : 'Copy Ref'}</span>
                </button>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50 p-3.5 rounded-lg border border-neutral-200">
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Workflow Status:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['new', 'in_review', 'proposal_sent', 'confirmed', 'archived'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedInquiry.id || selectedInquiry.referenceNumber, st)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                      selectedInquiry.status === st
                        ? 'bg-[#F05A28] text-white shadow-xs'
                        : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Bar: Direct Email & WhatsApp */}
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Baobab DMC Turkey - Proposal Ref ${selectedInquiry.referenceNumber || selectedInquiry.id}&body=Dear ${encodeURIComponent(selectedInquiry.fullName)},%0D%0A%0D%0AThank you for contacting Baobab DMC Turkey.%0D%0A%0D%0A`}
                className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply to Client via Email</span>
              </a>

              {selectedInquiry.phone && (
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedInquiry.fullName}, this is Baobab DMC Turkey following up regarding your travel proposal request (Ref: ${selectedInquiry.referenceNumber || selectedInquiry.id}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp ({selectedInquiry.phone})</span>
                </a>
              )}
            </div>

            {/* Client & Itinerary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Email Address
                </span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-[#F05A28] hover:underline text-sm break-all">
                  {selectedInquiry.email}
                </a>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Phone / WhatsApp
                </span>
                <span className="font-bold text-neutral-800 text-sm">
                  {selectedInquiry.phone || 'Not provided'}
                </span>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Company / Travel Agency
                </span>
                <span className="font-bold text-neutral-800">
                  {selectedInquiry.companyOrAgency || 'Independent Traveler (FIT)'}
                </span>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Country & Role
                </span>
                <span className="font-bold text-neutral-800">
                  {selectedInquiry.country || 'Not specified'} {selectedInquiry.role ? `• ${selectedInquiry.role}` : ''}
                </span>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Estimated Travel Season
                </span>
                <span className="font-bold text-neutral-800">
                  {selectedInquiry.estimatedDate || 'As requested'}
                </span>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Guest Count & Tier
                </span>
                <span className="font-bold text-neutral-800">
                  {selectedInquiry.guestCount || 'Flexible'} • {selectedInquiry.budgetTier || 'Standard Luxury'}
                </span>
              </div>

              <div className="sm:col-span-2 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                  Tour Program / Regarded Route
                </span>
                <span className="font-bold text-[#F05A28] text-sm">
                  {selectedInquiry.selectedTripTitle || selectedInquiry.tripType || 'Bespoke Turkey Tour Proposal'}
                </span>
              </div>

              {selectedInquiry.destinations && selectedInquiry.destinations.length > 0 && (
                <div className="sm:col-span-2 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                  <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                    Requested Destinations in Turkey
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInquiry.destinations.map((dest, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white border border-neutral-200 text-neutral-800 rounded font-semibold text-xs">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedInquiry.preferredExperiences && selectedInquiry.preferredExperiences.length > 0 && (
                <div className="sm:col-span-2 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                  <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                    Preferred Experiences & Activities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInquiry.preferredExperiences.map((exp, i) => (
                      <span key={i} className="px-2.5 py-1 bg-orange-50 border border-orange-200 text-[#F05A28] rounded font-semibold text-xs">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedInquiry.specialRequests && (
                <div className="sm:col-span-2 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1.5">
                  <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block">
                    Client Special Requests & Operational Notes
                  </span>
                  <p className="text-neutral-800 whitespace-pre-wrap leading-relaxed text-xs font-normal">
                    {selectedInquiry.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Internal Operator Private Notes */}
            <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Internal DMC Operator Notes (Private)</span>
                </span>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shadow-xs transition-colors disabled:opacity-50"
                >
                  {isSavingNotes ? 'Saving...' : 'Save Note'}
                </button>
              </div>
              <textarea
                rows={2}
                value={operatorNotes}
                onChange={(e) => setOperatorNotes(e.target.value)}
                placeholder="Add private staff notes here (e.g. Assigned to consultant Zeynep, wholesale quotation sent via trade desk...)"
                className="w-full px-3 py-2 text-xs border border-amber-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
              {deletingInquiryId === (selectedInquiry.id || selectedInquiry.referenceNumber) ? (
                <div className="flex items-center gap-2 bg-red-50 p-1.5 rounded-lg border border-red-300">
                  <span className="text-xs font-bold text-red-700">Permanently delete this inquiry?</span>
                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry.id || selectedInquiry.referenceNumber)}
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
                  onClick={() => setDeletingInquiryId(selectedInquiry.id || selectedInquiry.referenceNumber)}
                  className="px-3 py-1.5 border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Inquiry</span>
                </button>
              )}

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black transition-colors"
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
