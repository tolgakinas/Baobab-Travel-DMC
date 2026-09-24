import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  Percent, 
  Calendar, 
  Phone, 
  Mail, 
  Search, 
  Filter, 
  Users, 
  DollarSign, 
  Send, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  MapPin, 
  FileText, 
  Download, 
  HelpCircle, 
  Award, 
  Lock, 
  ArrowRight, 
  UserCheck, 
  Briefcase, 
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Info,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { 
  TravelAdvisorProfile, 
  PRESET_ADVISORS, 
  ConsultantCatalogItem, 
  ConsultantBookingRecord,
  formatTripForConsultant,
  SIGNATURE_REGIONAL_EXCURSIONS,
  computeAdvisorRate
} from '../data/consultantData';
import { ISTANBUL_DAY_TOURS } from '../data/dayToursData';
import { useSiteContent } from '../context/SiteContentContext';
import { COMPANY_CONTACT } from '../data/dmcData';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

interface TravelConsultantPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
}

type PortalTab = 'catalog' | 'my-bookings' | 'tariff-sheet';

const LOCAL_STORAGE_KEY = 'baobab_advisor_profile';
const LOCAL_BOOKINGS_KEY = 'baobab_advisor_bookings';

export const TravelConsultantPortal: React.FC<TravelConsultantPortalProps> = ({
  isOpen,
  onClose,
  onOpenCalendly
}) => {
  const { content } = useSiteContent();

  // Active Advisor Session
  const [currentAdvisor, setCurrentAdvisor] = useState<TravelAdvisorProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved advisor:', e);
    }
    return PRESET_ADVISORS[0]; // Default to Eleanor Vance for immediate preview
  });

  const [isCustomAdvisorModalOpen, setIsCustomAdvisorModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PortalTab>('catalog');
  
  // Catalog Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<ConsultantCatalogItem | null>(null);

  // Booking Flow State
  const [bookingModalItem, setBookingModalItem] = useState<ConsultantCatalogItem | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccessResult, setBookingSuccessResult] = useState<ConsultantBookingRecord | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Booking Form Inputs
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCountry, setCustomerCountry] = useState('United States');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('Double / Twin (5-Star Heritage)');
  const [specialRequests, setSpecialRequests] = useState('');
  const [agencyFileRef, setAgencyFileRef] = useState('');

  // Bookings List (Firestore + Local)
  const [bookingsList, setBookingsList] = useState<ConsultantBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_BOOKINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load local bookings:', e);
    }
    return [];
  });

  // Custom Advisor Form Inputs
  const [customName, setCustomName] = useState('');
  const [customAgency, setCustomAgency] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customIata, setCustomIata] = useState('');
  const [customConsortium, setCustomConsortium] = useState<any>('Virtuoso');
  const [customCity, setCustomCity] = useState('');
  const [customCountry, setCustomCountry] = useState('United States');

  // Sync current advisor to local storage
  const handleSelectAdvisor = (advisor: TravelAdvisorProfile) => {
    setCurrentAdvisor(advisor);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(advisor));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCreateCustomAdvisor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customEmail || !customAgency) return;
    const newProfile: TravelAdvisorProfile = {
      id: `adv-${Date.now()}`,
      name: customName,
      agencyName: customAgency,
      consortium: customConsortium,
      email: customEmail,
      phone: customPhone || '+1 (555) 000-0000',
      city: customCity || 'New York',
      country: customCountry || 'United States',
      iataOrClia: customIata || 'CLIA #994821',
      verifiedStatus: true,
      tierDiscountRate: 25,
    };
    handleSelectAdvisor(newProfile);
    setIsCustomAdvisorModalOpen(false);
  };

  // Compile Unified Catalog of All Trips, Day Tours & Signature Excursions
  const catalogItems: ConsultantCatalogItem[] = useMemo(() => {
    const items: ConsultantCatalogItem[] = [];

    // 1. Multi-Day Trips from Site Content
    const sourceTrips = content.trips && content.trips.length > 0 ? content.trips : [];
    sourceTrips.forEach(trip => {
      items.push(formatTripForConsultant(trip));
    });

    // 2. Istanbul Day Tours
    ISTANBUL_DAY_TOURS.forEach(tour => {
      // avoid duplicates if already present
      if (!items.some(i => i.id === tour.id)) {
        items.push(formatTripForConsultant(tour));
      }
    });

    // 3. Signature Regional Excursions across Turkey
    SIGNATURE_REGIONAL_EXCURSIONS.forEach(exc => {
      if (!items.some(i => i.id === exc.id)) {
        items.push(exc);
      }
    });

    return items;
  }, [content.trips]);

  // Filter Catalog
  const filteredCatalog = useMemo(() => {
    return catalogItems.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'all' || 
        (selectedCategory === 'multi-day' && item.type === 'multi-day') ||
        (selectedCategory === 'day-tour' && item.type === 'day-tour') ||
        (selectedCategory === 'excursion' && (item.type === 'excursion' || item.type === 'luxury-experience')) ||
        (selectedCategory === 'luxury' && item.type === 'luxury-experience');

      const matchesDestination = 
        selectedDestination === 'all' || 
        item.destinations.some(d => d.toLowerCase().includes(selectedDestination.toLowerCase()));

      return matchesSearch && matchesCategory && matchesDestination;
    });
  }, [catalogItems, searchQuery, selectedCategory, selectedDestination]);

  // Load bookings from Firestore on open
  useEffect(() => {
    if (!isOpen || !currentAdvisor) return;

    const fetchFirestoreBookings = async () => {
      try {
        const q = query(
          collection(db, 'consultant_bookings'),
          where('consultantEmail', '==', currentAdvisor.email)
        );
        const snapshot = await getDocs(q);
        const remoteBookings: ConsultantBookingRecord[] = [];
        snapshot.forEach(docSnap => {
          remoteBookings.push(docSnap.data() as ConsultantBookingRecord);
        });
        
        if (remoteBookings.length > 0) {
          setBookingsList(prev => {
            const merged = [...remoteBookings];
            prev.forEach(p => {
              if (!merged.some(m => m.id === p.id || m.bookingReference === p.bookingReference)) {
                merged.push(p);
              }
            });
            return merged;
          });
        }
      } catch (err) {
        console.log('Using local bookings cache (Firestore query note):', err);
      }
    };

    fetchFirestoreBookings();
  }, [isOpen, currentAdvisor]);

  // Open booking modal for a specific catalog item
  const handleStartBooking = (item: ConsultantCatalogItem) => {
    setBookingModalItem(item);
    setBookingSuccessResult(null);
    setBookingError(null);
    setGuestCount(2);
    setTravelDate('');
    setSpecialRequests('');
    setAgencyFileRef(currentAdvisor ? `${currentAdvisor.consortium.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` : '');
  };

  // Submit Booking for Customer
  const handleSubmitCustomerBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalItem || !currentAdvisor) return;

    if (!customerName || !travelDate) {
      setBookingError('Please provide the lead passenger name and preferred travel departure date.');
      return;
    }

    setIsSubmittingBooking(true);
    setBookingError(null);

    const bookingRef = `BAOBAB-ADV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const retailPricePerPax = bookingModalItem.retailPriceUSD;
    const netPricePerPax = bookingModalItem.advisorNetPriceUSD;
    const totalGrossRetail = retailPricePerPax * guestCount;
    const totalNetPayable = netPricePerPax * guestCount;
    const advisorCommission = totalGrossRetail - totalNetPayable;

    const bookingPayload: ConsultantBookingRecord = {
      id: `booking-${Date.now()}`,
      bookingReference: bookingRef,
      consultantId: currentAdvisor.id,
      consultantName: currentAdvisor.name,
      agencyName: currentAdvisor.agencyName,
      consultantEmail: currentAdvisor.email,
      consultantPhone: currentAdvisor.phone,
      iataOrClia: currentAdvisor.iataOrClia,
      leadCustomerName: customerName,
      customerEmail: customerEmail || `client-${Date.now()}@advisorclient.com`,
      customerPhone: customerPhone || currentAdvisor.phone,
      customerCountry: customerCountry,
      guestCount: Number(guestCount),
      tripId: bookingModalItem.id,
      tripTitle: bookingModalItem.title,
      category: bookingModalItem.category,
      travelDate: travelDate,
      duration: bookingModalItem.duration,
      roomType: roomType,
      retailPricePerPax: retailPricePerPax,
      discountPercentage: 25,
      netPricePerPax: netPricePerPax,
      totalGrossRetail: totalGrossRetail,
      totalNetPayable: totalNetPayable,
      advisorCommission: advisorCommission,
      specialRequests: specialRequests ? `${specialRequests} | Agency File: ${agencyFileRef}` : `Agency File: ${agencyFileRef}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Dispatch booking confirmation email to tolgakinas@gmail.com and advisor
      const emailResponse = await fetch('/api/consultant-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const emailData = await emailResponse.json();
      console.log('Advisor Booking Email API Response:', emailData);

      // 2. Persist to Firestore
      try {
        await setDoc(doc(db, 'consultant_bookings', bookingPayload.id), bookingPayload);
      } catch (dbErr) {
        console.warn('Firestore write notice (saved to local list):', dbErr);
      }

      // 3. Update local state & cache
      const updatedList = [bookingPayload, ...bookingsList];
      setBookingsList(updatedList);
      try {
        localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updatedList));
      } catch (e) {
        console.warn(e);
      }

      setBookingSuccessResult(bookingPayload);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setBookingError(err?.message || 'Failed to dispatch booking confirmation. Please retry or contact Baobab DMC operations.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (bookingModalItem) {
          setBookingModalItem(null);
        } else if (selectedItemForDetail) {
          setSelectedItemForDetail(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, bookingModalItem, selectedItemForDetail, onClose]);

  if (!isOpen) return null;

  return (
    <div id="travel-consultant-portal-modal" className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      
      {/* Main Container */}
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl w-full max-w-7xl h-[92vh] max-h-[920px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Advisor Header Bar */}
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          
          {/* Brand & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F05A28] to-orange-600 flex items-center justify-center shadow-lg shadow-[#F05A28]/20 shrink-0">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">Baobab DMC Turkey</span>
                <span className="bg-[#F05A28]/20 text-[#F05A28] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#F05A28]/30 flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  25% Net Trade Tariff
                </span>
              </div>
              <p className="text-xs text-neutral-400">Travel Consultants & Luxury Advisors Booking Desk</p>
            </div>
          </div>

          {/* Active Advisor Profile Display & Switcher */}
          <div className="flex items-center gap-3">
            {currentAdvisor && (
              <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-xl px-3.5 py-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {currentAdvisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {currentAdvisor.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate max-w-[200px]">
                    {currentAdvisor.agencyName}
                  </div>
                </div>

                {/* Profile dropdown selector */}
                <div className="flex items-center gap-1 border-l border-neutral-800 pl-2">
                  <select 
                    value={currentAdvisor.id}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomAdvisorModalOpen(true);
                      } else {
                        const adv = PRESET_ADVISORS.find(a => a.id === e.target.value);
                        if (adv) handleSelectAdvisor(adv);
                      }
                    }}
                    className="bg-neutral-800 text-xs text-neutral-300 border border-neutral-700 rounded-lg px-2 py-1 focus:outline-none focus:border-[#F05A28]"
                  >
                    {PRESET_ADVISORS.map(adv => (
                      <option key={adv.id} value={adv.id}>
                        {adv.name} ({adv.consortium})
                      </option>
                    ))}
                    <option value="custom">+ Register Custom Profile...</option>
                  </select>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
              title="Close Advisor Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Wholesale Status Strip */}
        <div className="bg-neutral-950/60 px-6 py-2.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'catalog' 
                  ? 'bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/20 font-semibold' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Catalog & Excursions</span>
              <span className="bg-black/30 text-[10px] px-1.5 py-0.2 rounded-full">
                {catalogItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'my-bookings' 
                  ? 'bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/20 font-semibold' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>My Client Bookings</span>
              {bookingsList.length > 0 && (
                <span className="bg-emerald-500 text-black font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {bookingsList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('tariff-sheet')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'tariff-sheet' 
                  ? 'bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/20 font-semibold' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Net Tariff Cheat Sheet</span>
            </button>
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              25% Net Commission Built-In
            </span>
            <span>•</span>
            <span>TÜRSAB Licensed DMC #15764</span>
            <span>•</span>
            <a 
              href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}`} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#F05A28] hover:underline flex items-center gap-1 font-semibold"
            >
              Advisor 24/7 Desk
            </a>
          </div>
        </div>

        {/* Tab 1: Catalog View */}
        {activeTab === 'catalog' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tours, rail, balloon, yacht, Ephesus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F05A28]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-neutral-200 text-neutral-900 font-semibold' 
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  All ({catalogItems.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('multi-day')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'multi-day' 
                      ? 'bg-neutral-200 text-neutral-900 font-semibold' 
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Multi-Day Guided Trips
                </button>
                <button
                  onClick={() => setSelectedCategory('day-tour')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'day-tour' 
                      ? 'bg-neutral-200 text-neutral-900 font-semibold' 
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Day Tours
                </button>
                <button
                  onClick={() => setSelectedCategory('excursion')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'excursion' 
                      ? 'bg-neutral-200 text-neutral-900 font-semibold' 
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Excursions & Yachting
                </button>
              </div>

              {/* Destination Filter */}
              <div className="w-full md:w-auto flex items-center gap-2">
                <span className="text-xs text-neutral-400 shrink-0">Region:</span>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="bg-neutral-900 text-xs text-neutral-200 border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F05A28]"
                >
                  <option value="all">All Regions in Turkey</option>
                  <option value="Istanbul">Istanbul & Marmara</option>
                  <option value="Cappadocia">Cappadocia</option>
                  <option value="Ephesus">Ephesus & Aegean</option>
                  <option value="Kas">Turquoise Coast & Lycia</option>
                  <option value="Trabzon">Black Sea & Sumela</option>
                  <option value="Gobeklitepe">Eastern Anatolia & Mesopotamia</option>
                </select>
              </div>
            </div>

            {/* Results Counter & Wholesale Notice */}
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <div>
                Showing <strong className="text-white">{filteredCatalog.length}</strong> available travel products with <strong>25% Advisor Net Tariff</strong> applied.
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Confirmation & Real-Time Email Booking Vouchers</span>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCatalog.map(item => (
                <div 
                  key={item.id}
                  className="bg-neutral-950/90 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-xl hover:shadow-black/40"
                >
                  {/* Image & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    
                    {/* 25% Discount Badge */}
                    <div className="absolute top-3 left-3 bg-[#F05A28] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      25% Advisor Net
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {item.duration}
                    </div>

                    {/* Destinations Tag Bar */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap gap-1">
                      {item.destinations.slice(0, 3).map((dest, i) => (
                        <span key={i} className="text-[10px] bg-neutral-900/90 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700/60 flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-[#F05A28]" />
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[11px] uppercase font-bold text-[#F05A28] tracking-wider mb-1">
                        {item.category}
                      </div>
                      <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug group-hover:text-neutral-100">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlights bullet previews */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="pt-2 border-t border-neutral-800/80 space-y-1 text-[11px] text-neutral-300">
                        <div className="flex items-start gap-1.5 truncate">
                          <span className="text-[#F05A28] font-bold">✓</span>
                          <span className="truncate">{item.highlights[0]}</span>
                        </div>
                        {item.highlights[1] && (
                          <div className="flex items-start gap-1.5 truncate text-neutral-400">
                            <span className="text-[#F05A28] font-bold">✓</span>
                            <span className="truncate">{item.highlights[1]}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price Comparison Box (-25%) */}
                    <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Retail Public Rate (RRP):</span>
                        <span className="text-neutral-400 line-through font-mono">
                          ${item.retailPriceUSD.toLocaleString()} USD
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between pt-1 border-t border-neutral-800">
                        <div>
                          <span className="text-[11px] uppercase font-bold text-emerald-400 block">
                            Advisor Net Rate:
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            You retain ${item.savingsUSD.toLocaleString()} / pax
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-emerald-400 font-mono">
                            ${item.advisorNetPriceUSD.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-neutral-400 block">
                            USD / pax net
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setSelectedItemForDetail(item)}
                        className="w-full py-2 px-3 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 transition-colors text-center"
                      >
                        View Itinerary
                      </button>
                      <button
                        onClick={() => handleStartBooking(item)}
                        className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#F05A28] hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#F05A28]/20"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Book Client
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCatalog.length === 0 && (
              <div className="text-center py-16 bg-neutral-950/40 rounded-xl border border-neutral-800">
                <Compass className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">No tours match your filter</h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                  Try clearing your search keyword or switching back to "All Regions".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDestination('all'); }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#F05A28] text-xs font-semibold text-white"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Client Bookings */}
        {activeTab === 'my-bookings' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F05A28]" />
                  Consultant Customer Reservations ({bookingsList.length})
                </h3>
                <p className="text-xs text-neutral-400">
                  Real-time client bookings created under {currentAdvisor?.agencyName} with 25% trade margin
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-3.5 py-2 rounded-lg bg-[#F05A28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#F05A28]/20"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  + Create New Booking
                </button>
              </div>
            </div>

            {bookingsList.length === 0 ? (
              <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">No Client Bookings Created Yet</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Select any trip, day tour, or excursion from the catalog tab and click <strong>"Book Client"</strong> to generate an instant confirmation with 25% discount.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-lg bg-[#F05A28] text-xs font-semibold text-white inline-flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Browse Wholesale Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookingsList.map((booking) => (
                  <div 
                    key={booking.id}
                    className="bg-neutral-950/90 border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#F05A28] bg-[#F05A28]/10 px-2 py-0.5 rounded border border-[#F05A28]/20">
                            {booking.bookingReference}
                          </span>
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Confirmed Booking
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">
                          {booking.tripTitle}
                        </h4>
                        <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-3 mt-1">
                          <span>Lead Passenger: <strong className="text-neutral-200">{booking.leadCustomerName}</strong> ({booking.guestCount} Pax)</span>
                          <span>•</span>
                          <span>Departure: <strong className="text-neutral-200">{booking.travelDate}</strong></span>
                          <span>•</span>
                          <span>Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Financial breakdown */}
                      <div className="text-right">
                        <div className="text-[11px] text-neutral-400">Total Net Payable (DMC):</div>
                        <div className="text-lg font-bold text-white font-mono">
                          ${booking.totalNetPayable.toLocaleString()} USD
                        </div>
                        <div className="text-xs text-emerald-400 font-medium">
                          Advisor Profit: +${booking.advisorCommission.toLocaleString()} USD (25%)
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
                      <div>
                        <span className="block text-neutral-500 text-[10px] uppercase font-bold">Consultant Details</span>
                        <div className="text-neutral-200 font-medium">{booking.consultantName}</div>
                        <div>{booking.agencyName} ({booking.consultantEmail})</div>
                      </div>
                      <div>
                        <span className="block text-neutral-500 text-[10px] uppercase font-bold">Client Contact</span>
                        <div className="text-neutral-200 font-medium">{booking.customerEmail}</div>
                        <div>{booking.customerPhone} ({booking.customerCountry})</div>
                      </div>
                      <div>
                        <span className="block text-neutral-500 text-[10px] uppercase font-bold">Voucher & Operational Desk</span>
                        <div className="text-emerald-400 font-medium">Email Dispatched to Operations</div>
                        <div>TÜRSAB DMC Reference Active</div>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="bg-neutral-900/80 rounded-lg p-2.5 text-xs text-neutral-300 border border-neutral-800">
                        <span className="text-neutral-500 font-bold mr-1">Special Notes / Agency Ref:</span>
                        {booking.specialRequests}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wholesale Tariff Cheat Sheet */}
        {activeTab === 'tariff-sheet' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F05A28]" />
                  2026/2027 Confidential Travel Advisor Wholesale Tariff Sheet
                </h3>
                <p className="text-xs text-neutral-400">
                  Fixed 25% trade reductions on all signature itineraries, day tours, and private yachting.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-700"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>

            <div className="bg-neutral-950/90 border border-neutral-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-900/90 text-neutral-400 border-b border-neutral-800 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Tour / Excursion Name</th>
                    <th className="py-3 px-3">Type / Category</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Public RRP</th>
                    <th className="py-3 px-3 text-emerald-400 font-bold">25% Advisor Net Rate</th>
                    <th className="py-3 px-3 text-[#F05A28]">Your Margin</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  {catalogItems.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white max-w-xs">
                        {item.title}
                        <div className="text-[10px] text-neutral-500 font-normal">
                          {item.destinations.join(' • ')}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-neutral-400">
                        {item.category}
                      </td>
                      <td className="py-3 px-3">
                        {item.duration}
                      </td>
                      <td className="py-3 px-3 line-through text-neutral-500 font-mono">
                        ${item.retailPriceUSD.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-400 font-mono">
                        ${item.advisorNetPriceUSD.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#F05A28] font-mono">
                        +${item.savingsUSD.toLocaleString()} (25%)
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleStartBooking(item)}
                          className="px-2.5 py-1 rounded bg-[#F05A28] hover:bg-orange-600 text-white font-bold text-[11px] transition-colors"
                        >
                          Book Client
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Booking Form Modal / Drawer */}
      {bookingModalItem && (
        <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-700 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F05A28] bg-[#F05A28]/10 px-2 py-0.5 rounded border border-[#F05A28]/20">
                  Advisor Customer Booking
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {bookingModalItem.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  Booking under: <strong className="text-neutral-200">{currentAdvisor?.name}</strong> • {currentAdvisor?.agencyName}
                </p>
              </div>
              <button
                onClick={() => setBookingModalItem(null)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If successfully booked: Confirmation Card */}
            {bookingSuccessResult ? (
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Booking Confirmed & Dispatched!</h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    An official booking confirmation email with complete customer & consultant details has been dispatched to <strong>tolgakinas@gmail.com</strong> and <strong>{currentAdvisor?.email}</strong>.
                  </p>
                </div>

                {/* Booking summary box */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Confirmation Reference:</span>
                    <span className="font-mono font-bold text-[#F05A28] text-sm">
                      {bookingSuccessResult.bookingReference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Lead Passenger:</span>
                    <span className="font-semibold text-white">{bookingSuccessResult.leadCustomerName} ({bookingSuccessResult.guestCount} Guests)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tour / Experience:</span>
                    <span className="font-semibold text-white">{bookingSuccessResult.tripTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Travel Departure Date:</span>
                    <span className="font-semibold text-white">{bookingSuccessResult.travelDate}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-2">
                    <span className="text-neutral-400">Total Net Amount Payable (DMC):</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">${bookingSuccessResult.totalNetPayable.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Advisor Retained Commission:</span>
                    <span className="font-bold text-[#F05A28] font-mono">+${bookingSuccessResult.advisorCommission.toLocaleString()} USD (25%)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <button
                    onClick={() => {
                      setBookingModalItem(null);
                      setActiveTab('my-bookings');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#F05A28] hover:bg-orange-600 text-white text-xs font-bold transition-colors"
                  >
                    View in My Client Bookings
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Voucher
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Input Form */
              <form onSubmit={handleSubmitCustomerBooking} className="space-y-4 text-xs">
                {bookingError && (
                  <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                    {bookingError}
                  </div>
                )}

                {/* Section 1: Customer Details */}
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-neutral-200 text-xs flex items-center gap-2 border-b border-neutral-800 pb-2">
                    <Users className="w-3.5 h-3.5 text-[#F05A28]" />
                    1. Customer Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Lead Passenger Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord Charles Harrington"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Customer Country of Origin</label>
                      <input
                        type="text"
                        placeholder="e.g. United States, UK, Canada..."
                        value={customerCountry}
                        onChange={(e) => setCustomerCountry(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Customer Email (or C/O Advisor)</label>
                      <input
                        type="email"
                        placeholder="client@email.com or advisor email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Customer Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Itinerary & Dates */}
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-neutral-200 text-xs flex items-center gap-2 border-b border-neutral-800 pb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F05A28]" />
                    2. Travel Dates & Group Setup
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Departure Date *</label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Total Guests (Pax)</label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Room Type</label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      >
                        <option value="Double / Twin (5-Star Heritage)">Double / Twin (5-Star Heritage)</option>
                        <option value="King Suite / Cave Suite">King Suite / Cave Suite</option>
                        <option value="Single Supplement">Single Supplement</option>
                        <option value="Family Connecting Rooms">Family Connecting Rooms</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Internal Agency File Reference</label>
                      <input
                        type="text"
                        placeholder="e.g. VIR-2026-8942"
                        value={agencyFileRef}
                        onChange={(e) => setAgencyFileRef(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1 font-medium">Special Requests & Dietary Requirements</label>
                      <input
                        type="text"
                        placeholder="e.g. Gluten-free, anniversary champagne, VIP airport"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Live 25% Trade Pricing Summary */}
                <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Retail Public Rate:</span>
                    <span className="font-mono line-through">
                      ${(bookingModalItem.retailPriceUSD * guestCount).toLocaleString()} USD ({guestCount} Pax)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span className="font-bold">25% Travel Advisor Trade Discount:</span>
                    <span className="font-mono font-bold">
                      -${(bookingModalItem.savingsUSD * guestCount).toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-2 text-sm">
                    <div>
                      <span className="font-bold text-white block">Total Net Amount Payable to Baobab DMC:</span>
                      <span className="text-[10px] text-neutral-400">Invoice issued net of your 25% commission</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-emerald-400 font-mono">
                        ${(bookingModalItem.advisorNetPriceUSD * guestCount).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-neutral-400 block font-mono">USD Net</span>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalItem(null)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="px-6 py-2.5 rounded-xl bg-[#F05A28] hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-[#F05A28]/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmittingBooking ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Confirming & Dispatching Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm Booking & Send Emails</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Itinerary Detail Modal */}
      {selectedItemForDetail && (
        <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-700 text-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative space-y-4">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#F05A28]">{selectedItemForDetail.category}</span>
                <h3 className="text-lg font-bold text-white">{selectedItemForDetail.title}</h3>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Duration: {selectedItemForDetail.duration} • Group: {selectedItemForDetail.groupSize}
                </div>
              </div>
              <button
                onClick={() => setSelectedItemForDetail(null)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 rounded-xl overflow-hidden relative">
              <img src={selectedItemForDetail.image} alt={selectedItemForDetail.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="bg-black/80 px-2.5 py-1 rounded text-white font-medium">
                  {selectedItemForDetail.destinations.join(' • ')}
                </span>
                <span className="bg-[#F05A28] px-2.5 py-1 rounded text-white font-bold">
                  25% Net: ${selectedItemForDetail.advisorNetPriceUSD} USD
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-[#F05A28]">Overview</h4>
              <p>{selectedItemForDetail.description}</p>
            </div>

            {selectedItemForDetail.highlights && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-[#F05A28]">Key Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-neutral-300">
                  {selectedItemForDetail.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#F05A28] font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                <span className="font-bold text-emerald-400 block mb-1">What's Included:</span>
                <ul className="space-y-1 text-neutral-400 text-[11px]">
                  {selectedItemForDetail.includes.map((inc, i) => (
                    <li key={i}>• {inc}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                <span className="font-bold text-neutral-400 block mb-1">What's Excluded:</span>
                <ul className="space-y-1 text-neutral-500 text-[11px]">
                  {selectedItemForDetail.excludes.map((exc, i) => (
                    <li key={i}>• {exc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
              <div>
                <span className="text-xs text-neutral-400 block">Advisor 25% Net Rate:</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  ${selectedItemForDetail.advisorNetPriceUSD} USD / pax
                </span>
              </div>
              <button
                onClick={() => {
                  const item = selectedItemForDetail;
                  setSelectedItemForDetail(null);
                  handleStartBooking(item);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#F05A28] hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#F05A28]/20"
              >
                <UserCheck className="w-4 h-4" />
                Book This Tour for Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Advisor Profile Register Modal */}
      {isCustomAdvisorModalOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-700 text-white rounded-2xl w-full max-w-lg shadow-2xl p-6 relative space-y-4">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Travel Advisor Profile Registration</h3>
                <p className="text-xs text-neutral-400">Unlock instant 25% wholesale trade booking access</p>
              </div>
              <button
                onClick={() => setIsCustomAdvisorModalOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomAdvisor} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Sterling"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Agency / Host Agency Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sterling Luxury Escapes"
                  value={customAgency}
                  onChange={(e) => setCustomAgency(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Advisor Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="advisor@agency.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Advisor Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Consortium / Affiliation</label>
                  <select
                    value={customConsortium}
                    onChange={(e) => setCustomConsortium(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                  >
                    <option value="Virtuoso">Virtuoso</option>
                    <option value="Signature Travel Network">Signature Travel Network</option>
                    <option value="Ensemble">Ensemble</option>
                    <option value="Travel Leaders">Travel Leaders</option>
                    <option value="Independent / Host Agency">Independent / Host Agency</option>
                    <option value="American Express Travel">American Express Travel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">IATA / CLIA / TRUE #</label>
                  <input
                    type="text"
                    placeholder="e.g. IATA #0129384"
                    value={customIata}
                    onChange={(e) => setCustomIata(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F05A28]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCustomAdvisorModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#F05A28] text-white font-bold"
                >
                  Save & Enter Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
