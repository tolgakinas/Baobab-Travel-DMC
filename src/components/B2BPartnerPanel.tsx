import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  Percent, 
  FileText, 
  Download, 
  Calculator, 
  Layers, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Search, 
  Filter, 
  TrendingUp, 
  Car, 
  Compass, 
  Users, 
  DollarSign, 
  Euro, 
  FileSpreadsheet, 
  Send, 
  Printer, 
  RefreshCw, 
  UserCheck, 
  Eye, 
  Image as ImageIcon,
  BookOpen,
  ArrowUpRight,
  PlusCircle,
  HelpCircle,
  Award,
  Lock,
  ChevronDown
} from 'lucide-react';
import { 
  DEMO_PARTNER_ACCOUNTS, 
  B2B_NET_TARIFF_2026, 
  INITIAL_B2B_BOOKINGS, 
  WHITE_LABEL_ASSETS, 
  LIVE_OPERATIONS_UPDATES,
  B2BPartnerAccount,
  B2BBookingRFP,
  B2BNetTariffItem,
  WhiteLabelAsset
} from '../data/b2bPartnerData';
import { COMPANY_CONTACT } from '../data/dmcData';

interface B2BPartnerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
}

type PanelTab = 'dashboard' | 'tariffs' | 'calculator' | 'bookings' | 'marketing';
type Currency = 'EUR' | 'USD' | 'GBP' | 'TRY';

export const B2BPartnerPanel: React.FC<B2BPartnerPanelProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  onOpenCalendly
}) => {
  // Current active partner profile
  const [currentAccount, setCurrentAccount] = useState<B2BPartnerAccount>(DEMO_PARTNER_ACCOUNTS[0]);
  const [activeTab, setActiveTab] = useState<PanelTab>('dashboard');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // Bookings list state (allowing adding new RFP)
  const [bookings, setBookings] = useState<B2BBookingRFP[]>(INITIAL_B2B_BOOKINGS);
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<B2BBookingRFP | null>(null);

  // Tariffs filtering state
  const [tariffSearch, setTariffSearch] = useState('');
  const [tariffCategory, setTariffCategory] = useState<string>('all');

  // Calculator State
  const [calcPax, setCalcPax] = useState<number>(4);
  const [calcDays, setCalcDays] = useState<number>(8);
  const [calcVehicleType, setCalcVehicleType] = useState<string>('sprinter');
  const [calcGuideDays, setCalcGuideDays] = useState<number>(8);
  const [calcGuideLang, setCalcGuideLang] = useState<string>('standard');
  const [calcHotelTier, setCalcHotelTier] = useState<string>('5star');
  const [calcBalloons, setCalcBalloons] = useState<number>(4);
  const [calcYachtCharter, setCalcYachtCharter] = useState<boolean>(true);
  const [calcAirportVip, setCalcAirportVip] = useState<boolean>(true);
  const [calcMarginPercent, setCalcMarginPercent] = useState<number>(20);
  const [calcSubmittedSuccess, setCalcSubmittedSuccess] = useState<boolean>(false);
  const [calcClientName, setCalcClientName] = useState<string>('');
  const [calcAgencyRef, setCalcAgencyRef] = useState<string>('');

  // Marketing asset search
  const [assetCategory, setAssetCategory] = useState<string>('all');
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedBookingDetail) {
          setSelectedBookingDetail(null);
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
  }, [isOpen, onClose, selectedBookingDetail]);

  if (!isOpen) return null;

  // Currency Conversion Multipliers (Reference Base: EUR)
  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    EUR: { symbol: '€', rate: 1.0 },
    USD: { symbol: '$', rate: 1.08 },
    GBP: { symbol: '£', rate: 0.86 },
    TRY: { symbol: '₺', rate: 37.5 }
  };

  const formatPrice = (eurAmount: number) => {
    const { symbol, rate } = currencyRates[currency];
    const converted = Math.round(eurAmount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  // Calculator Calculation Engine
  const calculateEstimate = () => {
    // 1. Vehicle Daily Rate * days
    const dailyVehicleRate = calcVehicleType === 'sprinter' ? 320 : 230;
    const transportTotal = dailyVehicleRate * calcDays;

    // 2. Guide Daily Rate * guide days
    const dailyGuideRate = calcGuideLang === 'specialist' ? 230 : 180;
    const guideTotal = dailyGuideRate * calcGuideDays;

    // 3. Hotel Estimates per room per night (assuming 2 pax per room)
    const roomsCount = Math.ceil(calcPax / 2);
    let nightlyRoomRate = 260; // 5star
    if (calcHotelTier === 'boutique-cave') nightlyRoomRate = 220;
    if (calcHotelTier === 'ultra-luxury') nightlyRoomRate = 580;
    if (calcHotelTier === '4star') nightlyRoomRate = 150;
    const hotelTotal = roomsCount * nightlyRoomRate * (calcDays - 1);

    // 4. Activity extras
    const balloonTotal = calcBalloons * 185;
    const yachtTotal = calcYachtCharter ? 420 : 0;
    const airportVipTotal = calcAirportVip ? (calcPax * 110 * 2) : 0; // arrival + departure

    // Miscellaneous admission & logistics allowance per person
    const admissionsAndLogistics = calcPax * 240;

    const totalNetDmcEur = transportTotal + guideTotal + hotelTotal + balloonTotal + yachtTotal + airportVipTotal + admissionsAndLogistics;
    const grossClientEur = Math.round(totalNetDmcEur / (1 - (calcMarginPercent / 100)));
    const agentProfitEur = grossClientEur - totalNetDmcEur;
    const netPerPersonEur = Math.round(totalNetDmcEur / calcPax);
    const grossPerPersonEur = Math.round(grossClientEur / calcPax);

    return {
      totalNetDmcEur,
      grossClientEur,
      agentProfitEur,
      netPerPersonEur,
      grossPerPersonEur,
      transportTotal,
      guideTotal,
      hotelTotal,
      balloonTotal,
      yachtTotal,
      airportVipTotal,
      admissionsAndLogistics
    };
  };

  const calcResults = calculateEstimate();

  const handleSaveAndSubmitCalcToOps = () => {
    const newRefId = `TR-B2B-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRfp: B2BBookingRFP = {
      id: `rfp-${Date.now()}`,
      referenceNumber: newRefId,
      clientName: calcClientName || 'Private FIT Travel Client',
      agencyRef: calcAgencyRef || `${currentAccount.agencyName.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      tripTitle: `Custom ${calcDays}-Day Turkey Tailored Program (${calcHotelTier})`,
      dates: 'Flexible 2026/2027 Season',
      paxCount: calcPax,
      durationDays: calcDays,
      destinations: ['Istanbul', 'Cappadocia', 'Aegean Coast'],
      tier: calcHotelTier === 'ultra-luxury' ? 'Ultra Luxury & Private Palace' : calcHotelTier === '5star' ? '5-Star Luxury & Historic Heritage' : 'Boutique Cave & Heritage Suites',
      status: 'Costing in Progress',
      totalNetEur: calcResults.totalNetDmcEur,
      grossClientEur: calcResults.grossClientEur,
      commissionEarnedEur: calcResults.agentProfitEur,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: `Generated via B2B Live Calculator: ${calcVehicleType.toUpperCase()} vehicle, ${calcGuideLang} guide, ${calcBalloons} balloons, VIP Airport: ${calcAirportVip ? 'Yes' : 'No'}.`,
      milestones: [
        { title: 'B2B Calculator Estimate Generated', completed: true, date: 'Just now' },
        { title: 'Assigned to Senior Istanbul Operations Desk', completed: true, date: 'Pending Ops review' },
        { title: 'Formal Locked Proposal Delivery within 24h', completed: false }
      ]
    };

    setBookings([newRfp, ...bookings]);
    setCalcSubmittedSuccess(true);
    setTimeout(() => {
      setActiveTab('bookings');
      setCalcSubmittedSuccess(false);
    }, 1200);
  };

  const handleDownloadAsset = (asset: WhiteLabelAsset) => {
    setDownloadNotification(`Preparing download: "${asset.title}" (${asset.format})...`);
    setTimeout(() => {
      setDownloadNotification(`Downloaded "${asset.title}" successfully.`);
      setTimeout(() => setDownloadNotification(null), 3000);
    }, 1000);
  };

  const filteredTariffs = B2B_NET_TARIFF_2026.filter(item => {
    const matchesSearch = item.serviceName.toLowerCase().includes(tariffSearch.toLowerCase()) ||
                          item.location.toLowerCase().includes(tariffSearch.toLowerCase()) ||
                          item.specs.toLowerCase().includes(tariffSearch.toLowerCase());
    const matchesCategory = tariffCategory === 'all' || item.category === tariffCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'all') return true;
    if (bookingFilter === 'active') return b.status === 'Operating on Ground' || b.status === 'Deposit Paid / Confirmed' || b.status === 'Costing in Progress';
    if (bookingFilter === 'completed') return b.status === 'Completed';
    return b.status.toLowerCase().includes(bookingFilter.toLowerCase());
  });

  const filteredAssets = WHITE_LABEL_ASSETS.filter(a => {
    return assetCategory === 'all' || a.category === assetCategory;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="b2b-panel-title"
    >
      {/* Dark Dim Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Main Full-Scale B2B Portal Card */}
      <div className="relative bg-[#FAF9F6] text-neutral-900 w-full h-full sm:max-w-6xl sm:max-h-[94vh] sm:rounded-xl shadow-2xl flex flex-col z-10 overflow-hidden border border-neutral-300">
        
        {/* Top Dark Header Bar */}
        <div className="px-5 sm:px-8 py-3.5 bg-[#121316] text-white flex items-center justify-between gap-4 shrink-0 border-b border-neutral-800">
          
          {/* Brand & Partner Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#F05A28]/20 border border-[#F05A28]/40 flex items-center justify-center text-[#F05A28] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F05A28] bg-[#F05A28]/10 px-2 py-0.5 rounded border border-[#F05A28]/30">
                  B2B Trade Portal
                </span>
                <span className="text-neutral-500 text-xs hidden sm:inline">•</span>
                <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TURSAB Licensed #A-15764</span>
                </span>
              </div>
              <h2 id="b2b-panel-title" className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                Baobab DMC Partner User Hub
              </h2>
            </div>
          </div>

          {/* Account Selector & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="hidden md:flex items-center bg-neutral-800 rounded p-0.5 border border-neutral-700 text-xs">
              {(['EUR', 'USD', 'GBP', 'TRY'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded font-semibold transition-all ${
                    currency === curr 
                      ? 'bg-[#F05A28] text-white shadow-xs' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Switch Demo Partner Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded border border-neutral-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                title="Switch Registered Partner Profile"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="max-w-[130px] sm:max-w-[180px] truncate">{currentAccount.agencyName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white text-neutral-900 rounded-lg shadow-2xl border border-neutral-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1">
                    Select Partner Account Profile
                  </div>
                  {DEMO_PARTNER_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setCurrentAccount(acc);
                        setAccountDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center justify-between ${
                        currentAccount.id === acc.id ? 'bg-orange-50 text-[#F05A28] font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{acc.agencyName}</div>
                        <div className="text-[11px] text-neutral-500">{acc.city}, {acc.country} • {acc.partnerTier}</div>
                      </div>
                      {currentAccount.id === acc.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#F05A28]" />
                      )}
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-neutral-100 text-[11px] text-neutral-500 px-2 flex items-center justify-between">
                    <span>Agreement: {currentAccount.tursabContractRef}</span>
                    <span className="font-bold text-emerald-600">{currentAccount.commissionRate}% Net Margin</span>
                  </div>
                </div>
              )}
            </div>

            {/* Print Portal Overview */}
            <button
              onClick={() => window.print()}
              className="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors hidden sm:block"
              title="Print B2B Report"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
              aria-label="Close Partner Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dedicated Operations Desk Account Manager Header Banner */}
        <div className="bg-neutral-900 text-white px-5 sm:px-8 py-3 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            <img 
              src={currentAccount.accountManager.avatar} 
              alt={currentAccount.accountManager.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-[#F05A28]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{currentAccount.accountManager.name}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[10px] border border-emerald-500/30">
                  Online in Istanbul Desk
                </span>
              </div>
              <div className="text-neutral-400 text-[11px]">
                {currentAccount.accountManager.title} • Assigned Account Director
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href={`https://wa.me/${currentAccount.accountManager.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(currentAccount.accountManager.name)}%2C%20this%20is%20${encodeURIComponent(currentAccount.contactPerson)}%20from%20${encodeURIComponent(currentAccount.agencyName)}.%20I%20am%20in%20the%20B2B%20portal%20and%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href={`mailto:${currentAccount.accountManager.email}?subject=[B2B%20Portal%20Inquiry]%20${encodeURIComponent(currentAccount.agencyName)}`}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded font-semibold text-xs flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Mail className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>{currentAccount.accountManager.email}</span>
            </a>

            {onOpenCalendly && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCalendly('b2b-discovery');
                }}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded font-semibold text-xs flex items-center gap-1.5 transition-colors border border-neutral-700"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Schedule Video Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="bg-white border-b border-neutral-200 px-5 sm:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto shrink-0 scrollbar-none text-xs sm:text-sm font-semibold text-neutral-600">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3.5 px-2 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-[#F05A28] text-[#F05A28] font-bold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Partner Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('tariffs')}
            className={`py-3.5 px-2 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'tariffs'
                ? 'border-[#F05A28] text-[#F05A28] font-bold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Confidential Net Tariffs 2026/2027</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3.5 px-2 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-[#F05A28] text-[#F05A28] font-bold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Instant Tour Cost Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 px-2 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#F05A28] text-[#F05A28] font-bold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>RFPs & Bookings Manager ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`py-3.5 px-2 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'marketing'
                ? 'border-[#F05A28] text-[#F05A28] font-bold'
                : 'border-transparent hover:text-neutral-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>White-Label Agent Toolkit</span>
          </button>
        </div>

        {/* Global Download Toast */}
        {downloadNotification && (
          <div className="bg-neutral-900 text-white px-6 py-2.5 flex items-center justify-between text-xs animate-in fade-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{downloadNotification}</span>
            </div>
            <button onClick={() => setDownloadNotification(null)} className="text-neutral-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 text-neutral-800">

          {/* ========================================================= */}
          {/* TAB 1: PARTNER DASHBOARD OVERVIEW                         */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              
              {/* Partner Status Banner */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-md border border-neutral-700">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F05A28] text-white text-[10px] font-bold uppercase tracking-wider">
                      {currentAccount.partnerTier}
                    </span>
                    <span className="text-neutral-400 text-xs">Agreement: {currentAccount.tursabContractRef}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Welcome back, {currentAccount.contactPerson}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                    You are accessing confidential wholesale DMC tariffs and dedicated on-the-ground execution for <strong>{currentAccount.agencyName}</strong> across Turkey.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="px-4 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Price New Tour</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenInquiry) {
                        onClose();
                        onOpenInquiry({
                          formMode: 'b2b-partner',
                          companyOrAgency: currentAccount.agencyName,
                          fullName: currentAccount.contactPerson,
                          email: currentAccount.email,
                          phone: currentAccount.phone,
                          specialRequests: 'Submitting priority RFP directly from B2B Partner Portal.'
                        });
                      }
                    }}
                    className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border border-neutral-600 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-[#F05A28]" />
                    <span>Submit Custom RFP</span>
                  </button>
                </div>
              </div>

              {/* KPI Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white border border-neutral-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Active Proposals / RFPs</div>
                  <div className="text-2xl font-serif font-bold text-neutral-900">{bookings.length}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>2 Under Direct Ops Review</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-neutral-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Protected Agency Margin</div>
                  <div className="text-2xl font-serif font-bold text-[#F05A28]">{currentAccount.commissionRate}%</div>
                  <div className="text-[11px] text-neutral-500">Tier-1 Guaranteed Net Rates</div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-neutral-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Turnaround Guarantee</div>
                  <div className="text-2xl font-serif font-bold text-neutral-900">&lt; 24h</div>
                  <div className="text-[11px] text-neutral-500">Day-by-day costed proposals</div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-neutral-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">On-Ground Ground Fleet</div>
                  <div className="text-2xl font-serif font-bold text-neutral-900">100%</div>
                  <div className="text-[11px] text-neutral-500">VIP Sprinters & TUREB Guides</div>
                </div>
              </div>

              {/* Active Bookings Quick Preview & Live Advisories */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Active Bookings Column */}
                <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#F05A28]" />
                      <h4 className="font-serif font-bold text-neutral-900 text-base">
                        Recent Group & FIT Proposals
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-[#F05A28] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>View All Bookings</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((b) => (
                      <div 
                        key={b.id}
                        onClick={() => {
                          setSelectedBookingDetail(b);
                          setActiveTab('bookings');
                        }}
                        className="p-3.5 rounded-lg bg-neutral-50 hover:bg-orange-50/50 border border-neutral-200/80 hover:border-[#F05A28]/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-neutral-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                              {b.referenceNumber}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              b.status === 'Operating on Ground' ? 'bg-emerald-100 text-emerald-800' :
                              b.status === 'Deposit Paid / Confirmed' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {b.status}
                            </span>
                          </div>
                          <div className="font-semibold text-neutral-900 text-sm">
                            {b.tripTitle}
                          </div>
                          <div className="text-xs text-neutral-500 flex items-center gap-3">
                            <span>Client: <strong>{b.clientName}</strong></span>
                            <span>•</span>
                            <span>{b.paxCount} Guests</span>
                            <span>•</span>
                            <span>{b.dates}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs text-neutral-500 font-semibold">Net DMC Rate</div>
                          <div className="text-base font-serif font-bold text-[#F05A28]">{formatPrice(b.totalNetEur)}</div>
                          <div className="text-[11px] text-emerald-700 font-medium">Margin: +{formatPrice(b.commissionEarnedEur)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operations Updates Column */}
                <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                    <AlertCircle className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-serif font-bold text-neutral-900 text-base">
                      Live Operations Advisories
                    </h4>
                  </div>

                  <div className="space-y-3.5">
                    {LIVE_OPERATIONS_UPDATES.map((op) => (
                      <div key={op.id} className="p-3 rounded bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F05A28]">{op.tag}</span>
                          <span className="text-[10px] text-neutral-400">{op.date}</span>
                        </div>
                        <div className="font-bold text-neutral-900">{op.title}</div>
                        <p className="text-neutral-600 leading-relaxed text-[11px]">{op.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Quick Action Hub */}
              <div className="p-6 rounded-lg bg-[#FAF9F6] border border-neutral-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  onClick={() => setActiveTab('tariffs')}
                  className="p-4 rounded-lg bg-white border border-neutral-200 hover:border-[#F05A28] hover:shadow-md transition-all cursor-pointer group"
                >
                  <FileSpreadsheet className="w-6 h-6 text-[#F05A28] mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-neutral-900 text-sm">Download 2026/27 Tariff Sheet</div>
                  <p className="text-xs text-neutral-500 mt-1">Export wholesale rates for VIP transport, guides, balloons and private gulets.</p>
                </div>

                <div 
                  onClick={() => setActiveTab('marketing')}
                  className="p-4 rounded-lg bg-white border border-neutral-200 hover:border-[#F05A28] hover:shadow-md transition-all cursor-pointer group"
                >
                  <Download className="w-6 h-6 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-neutral-900 text-sm">White-Label Itinerary Roadbooks</div>
                  <p className="text-xs text-neutral-500 mt-1">Download unbranded Word & PDF itineraries ready to attach your agency logo.</p>
                </div>

                <div 
                  onClick={() => setActiveTab('calculator')}
                  className="p-4 rounded-lg bg-white border border-neutral-200 hover:border-[#F05A28] hover:shadow-md transition-all cursor-pointer group"
                >
                  <Calculator className="w-6 h-6 text-cyan-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-neutral-900 text-sm">Instant Custom Price Modeler</div>
                  <p className="text-xs text-neutral-500 mt-1">Model client budgets, margins, and inclusions in seconds.</p>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CONFIDENTIAL WHOLESALE NET TARIFFS 2026/2027       */}
          {/* ========================================================= */}
          {activeTab === 'tariffs' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Tariff Header Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-neutral-200">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Confidential Trade Access Only</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-900">
                    2026 / 2027 Confidential Wholesale Ground Tariff Sheet
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Net rates in <strong>{currency}</strong> excluding agency markup. All rates guaranteed through December 2027.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setDownloadNotification('Downloading Confidential B2B Wholesale Tariff Sheet (PDF/Excel)...');
                      setTimeout(() => setDownloadNotification('Downloaded 2026/2027 Tariff Sheet.'), 1500);
                    }}
                    className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Export Rate Sheet (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search services (e.g., Sprinter, Balloon, Guide, Gulet, Cistern)..."
                    value={tariffSearch}
                    onChange={(e) => setTariffSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white rounded border border-neutral-300 text-xs focus:ring-1 focus:ring-[#F05A28] focus:border-[#F05A28]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['all', 'Transport & VIP Fleet', 'Expert Guides', 'Hot Air Balloons', 'Private Gulets & Yachts', 'Airport VIP Services', 'Signature Activities'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setTariffCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        tariffCategory === cat
                          ? 'bg-[#F05A28] text-white'
                          : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {cat === 'all' ? 'All Services' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tariffs Table View */}
              <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-900 text-white font-semibold">
                        <th className="p-3.5">Category & Service Description</th>
                        <th className="p-3.5">Coverage / Hub</th>
                        <th className="p-3.5">Unit Basis</th>
                        <th className="p-3.5 text-right text-emerald-400">Net Wholesale Rate</th>
                        <th className="p-3.5 text-right text-neutral-400">Rec. Retail (RRP)</th>
                        <th className="p-3.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {filteredTariffs.map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="p-3.5 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-neutral-900">{item.serviceName}</span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-[#F05A28] font-bold text-[10px]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-neutral-500 text-[11px] leading-relaxed max-w-md">
                              {item.specs}
                            </div>
                            <div className="text-[10px] text-neutral-400 italic">
                              {item.notes}
                            </div>
                          </td>
                          <td className="p-3.5 text-neutral-700 font-medium whitespace-nowrap">
                            {item.location}
                          </td>
                          <td className="p-3.5 text-neutral-600 whitespace-nowrap">
                            {item.unit}
                          </td>
                          <td className="p-3.5 text-right font-serif font-bold text-base text-emerald-700 whitespace-nowrap">
                            {formatPrice(item.netRateEur)}
                          </td>
                          <td className="p-3.5 text-right text-neutral-500 line-through whitespace-nowrap">
                            {formatPrice(item.rrpRecommendedEur)}
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <button
                              onClick={() => {
                                setActiveTab('calculator');
                              }}
                              className="px-2.5 py-1 bg-neutral-100 hover:bg-[#F05A28] hover:text-white text-neutral-700 rounded text-[11px] font-semibold transition-colors"
                            >
                              Add to Quote
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: INSTANT TOUR COST CALCULATOR & PROPOSAL MODELER    */}
          {/* ========================================================= */}
          {activeTab === 'calculator' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              <div className="bg-white p-5 rounded-lg border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                    <Calculator className="w-4 h-4" />
                    <span>Real-Time Net Price & Profit Estimator</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-900">
                    B2B Custom Tour Cost Modeler
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Configure guest counts, private vehicles, guide languages, and accommodation tiers to model exact net costs and your agency gross profit.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">Currency:</span>
                  <span className="px-2.5 py-1 bg-neutral-100 rounded font-bold text-neutral-800 text-xs border border-neutral-200">
                    {currency} ({currencyRates[currency].symbol})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs Left Column */}
                <div className="lg:col-span-7 bg-white p-6 rounded-lg border border-neutral-200 shadow-xs space-y-6">
                  <h4 className="font-serif font-bold text-neutral-900 text-base border-b border-neutral-100 pb-2">
                    1. Tour Parameters & Configuration
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Client / Group Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Harrington Family Vacation"
                        value={calcClientName}
                        onChange={(e) => setCalcClientName(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs focus:ring-1 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Agency Booking Reference</label>
                      <input
                        type="text"
                        placeholder="e.g. ATL-2026-FIT-09"
                        value={calcAgencyRef}
                        onChange={(e) => setCalcAgencyRef(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs focus:ring-1 focus:ring-[#F05A28]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Number of Guests (Pax)</label>
                      <select
                        value={calcPax}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setCalcPax(val);
                          setCalcBalloons(val);
                        }}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs font-semibold focus:ring-1 focus:ring-[#F05A28]"
                      >
                        {[2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20].map((num) => (
                          <option key={num} value={num}>{num} Guests ({Math.ceil(num/2)} Double/Twin Rooms)</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Itinerary Duration (Days)</label>
                      <select
                        value={calcDays}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setCalcDays(val);
                          setCalcGuideDays(val);
                        }}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs font-semibold focus:ring-1 focus:ring-[#F05A28]"
                      >
                        {[4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16].map((d) => (
                          <option key={d} value={d}>{d} Days / {d - 1} Nights</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Accommodation & Ground Fleet */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Accommodation Standard</label>
                      <select
                        value={calcHotelTier}
                        onChange={(e) => setCalcHotelTier(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs font-semibold focus:ring-1 focus:ring-[#F05A28]"
                      >
                        <option value="5star">5-Star Luxury & Historic Heritage (avg €260/rm)</option>
                        <option value="boutique-cave">Boutique Cave & Heritage Suites (avg €220/rm)</option>
                        <option value="ultra-luxury">Ultra Luxury & Waterfront Palaces (avg €580/rm)</option>
                        <option value="4star">4-Star Premium Boutique (avg €150/rm)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Private Vehicle Fleet Type</label>
                      <select
                        value={calcVehicleType}
                        onChange={(e) => setCalcVehicleType(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs font-semibold focus:ring-1 focus:ring-[#F05A28]"
                      >
                        <option value="sprinter">Mercedes VIP Sprinter (Extra Long, 8-12 Seats) - €320/day</option>
                        <option value="vito">Mercedes Vito VIP Executive (4-6 Seats) - €230/day</option>
                      </select>
                    </div>
                  </div>

                  {/* Guide & Activities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Licensed TUREB Guide Language</label>
                      <select
                        value={calcGuideLang}
                        onChange={(e) => setCalcGuideLang(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs font-semibold focus:ring-1 focus:ring-[#F05A28]"
                      >
                        <option value="standard">English / Spanish / German / French (€180/day)</option>
                        <option value="specialist">Specialist Historian (Italian / Japanese / Portuguese) (€230/day)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700">Hot Air Balloon Flight Slots</label>
                      <select
                        value={calcBalloons}
                        onChange={(e) => setCalcBalloons(parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-neutral-50 rounded border border-neutral-300 text-xs font-semibold focus:ring-1 focus:ring-[#F05A28]"
                      >
                        <option value={0}>No Hot Air Ballooning</option>
                        <option value={calcPax}>{calcPax} Pax Standard Guaranteed Slot (€185/pax)</option>
                        <option value={calcPax * 2}>{calcPax} Pax Deluxe Small-Basket Slot (€245/pax)</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkbox Options */}
                  <div className="pt-2 border-t border-neutral-100 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                      <input
                        type="checkbox"
                        checked={calcYachtCharter}
                        onChange={(e) => setCalcYachtCharter(e.target.checked)}
                        className="rounded text-[#F05A28] focus:ring-[#F05A28]"
                      />
                      <span>Include Private 2-Hour Bosphorus Sunset Yacht Charter (+€420 total)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                      <input
                        type="checkbox"
                        checked={calcAirportVip}
                        onChange={(e) => setCalcAirportVip(e.target.checked)}
                        className="rounded text-[#F05A28] focus:ring-[#F05A28]"
                      />
                      <span>Include VIP Airport Fast-Track & Meet-at-Gate Buggy Service (Arrival & Departure)</span>
                    </label>
                  </div>

                  {/* Margin Slider */}
                  <div className="p-4 rounded-lg bg-orange-50/70 border border-orange-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-neutral-800">Your Target Agency Profit Margin (% Markup):</span>
                      <span className="text-[#F05A28] text-base">{calcMarginPercent}% Margin</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={35}
                      step={1}
                      value={calcMarginPercent}
                      onChange={(e) => setCalcMarginPercent(parseInt(e.target.value))}
                      className="w-full accent-[#F05A28] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-semibold">
                      <span>10% (Competitive Wholesale)</span>
                      <span>18% (Standard Protected Tier)</span>
                      <span>35% (Ultra-Luxury FIT)</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Right Column */}
                <div className="lg:col-span-5 bg-neutral-900 text-white p-6 rounded-lg shadow-xl flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F05A28]">
                        Quote Financial Breakdown
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {calcPax} Guests • {calcDays} Days
                      </span>
                    </div>

                    {/* Breakdown Line Items */}
                    <div className="space-y-2.5 my-4 text-xs font-sans">
                      <div className="flex justify-between text-neutral-300">
                        <span>VIP Vehicle & Driver ({calcDays} Days)</span>
                        <span className="font-semibold text-white">{formatPrice(calcResults.transportTotal)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-300">
                        <span>Licensed TUREB Guide ({calcGuideDays} Days)</span>
                        <span className="font-semibold text-white">{formatPrice(calcResults.guideTotal)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-300">
                        <span>Hotel Allocations ({calcDays - 1} Nights, {Math.ceil(calcPax/2)} Rooms)</span>
                        <span className="font-semibold text-white">{formatPrice(calcResults.hotelTotal)}</span>
                      </div>
                      {calcResults.balloonTotal > 0 && (
                        <div className="flex justify-between text-neutral-300">
                          <span>Cappadocia Balloons ({calcBalloons} slots)</span>
                          <span className="font-semibold text-white">{formatPrice(calcResults.balloonTotal)}</span>
                        </div>
                      )}
                      {calcResults.yachtTotal > 0 && (
                        <div className="flex justify-between text-neutral-300">
                          <span>Private Bosphorus Sunset Yacht</span>
                          <span className="font-semibold text-white">{formatPrice(calcResults.yachtTotal)}</span>
                        </div>
                      )}
                      {calcResults.airportVipTotal > 0 && (
                        <div className="flex justify-between text-neutral-300">
                          <span>VIP Fast-Track & Meet & Assist</span>
                          <span className="font-semibold text-white">{formatPrice(calcResults.airportVipTotal)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-neutral-300">
                        <span>Museum Entry Permits & Logistics</span>
                        <span className="font-semibold text-white">{formatPrice(calcResults.admissionsAndLogistics)}</span>
                      </div>
                    </div>

                    {/* Totals Box */}
                    <div className="p-4 rounded-lg bg-neutral-800/80 border border-neutral-700 space-y-3">
                      <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                        <span className="text-xs text-neutral-400 font-semibold">Net Baobab DMC Rate</span>
                        <span className="text-lg font-serif font-bold text-white">{formatPrice(calcResults.totalNetDmcEur)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                        <span>Your Agency Profit ({calcMarginPercent}%)</span>
                        <span>+{formatPrice(calcResults.agentProfitEur)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#F05A28] font-bold">Client Retail Total (RRP)</div>
                          <div className="text-2xl font-serif font-bold text-white">{formatPrice(calcResults.grossClientEur)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-neutral-400">Per Person (Net / Retail)</div>
                          <div className="text-sm font-semibold text-neutral-200">
                            {formatPrice(calcResults.netPerPersonEur)} / <span className="text-[#F05A28] font-bold">{formatPrice(calcResults.grossPerPersonEur)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Action */}
                  <div className="space-y-3 pt-2">
                    {calcSubmittedSuccess ? (
                      <div className="p-3 bg-emerald-600 text-white rounded text-center text-xs font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submitted to Istanbul Operations Desk! Locking proposal...</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleSaveAndSubmitCalcToOps}
                        className="w-full py-3 bg-[#F05A28] hover:bg-[#D94526] text-white rounded font-bold uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Lock 24h Proposal & Send to Desk</span>
                      </button>
                    )}
                    <p className="text-[11px] text-neutral-400 text-center">
                      Submitting triggers formal review by your account director in Istanbul. Guaranteed locked quote delivered within 24 hours.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: MY RFPS & GROUP BOOKINGS MANAGER                   */}
          {/* ========================================================= */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Header & Controls */}
              <div className="bg-white p-5 rounded-lg border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                    <Layers className="w-4 h-4" />
                    <span>Real-Time Ground Operations Tracking</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-900">
                    Proposals, RFPs & Active Group Departures ({filteredBookings.length})
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Track live proposal status, assigned guides, VIP vehicles, and confirmed milestones across Turkey.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'active', 'completed'].map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setBookingFilter(filterKey)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold capitalize transition-colors ${
                        bookingFilter === filterKey
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {filterKey} Bookings
                    </button>
                  ))}

                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create RFP</span>
                  </button>
                </div>
              </div>

              {/* Bookings List Cards */}
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div 
                    key={b.id}
                    className="bg-white rounded-lg border border-neutral-200 hover:border-[#F05A28]/50 shadow-xs transition-all overflow-hidden"
                  >
                    {/* Top Row */}
                    <div className="p-4 sm:p-5 border-b border-neutral-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-neutral-50/50">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-neutral-800 bg-white px-2.5 py-0.5 rounded border border-neutral-300">
                            {b.referenceNumber}
                          </span>
                          {b.agencyRef && (
                            <span className="text-xs text-neutral-500">
                              Agency Ref: <strong>{b.agencyRef}</strong>
                            </span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'Operating on Ground' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            b.status === 'Deposit Paid / Confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                            b.status === 'Locked Proposal Ready' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                            'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif font-bold text-neutral-900">
                          {b.tripTitle}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                          <span>Lead Traveler: <strong>{b.clientName}</strong></span>
                          <span>•</span>
                          <span>{b.paxCount} Guests</span>
                          <span>•</span>
                          <span>{b.dates} ({b.durationDays} Days)</span>
                          <span>•</span>
                          <span>Standard: {b.tier}</span>
                        </div>
                      </div>

                      {/* Pricing Box */}
                      <div className="flex items-center gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <div className="text-right">
                          <div className="text-xs text-neutral-500 font-medium">Net Wholesale</div>
                          <div className="text-lg font-serif font-bold text-neutral-900">{formatPrice(b.totalNetEur)}</div>
                          <div className="text-xs text-emerald-600 font-bold">Margin: +{formatPrice(b.commissionEarnedEur)}</div>
                        </div>

                        <button
                          onClick={() => setSelectedBookingDetail(selectedBookingDetail?.id === b.id ? null : b)}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>{selectedBookingDetail?.id === b.id ? 'Hide Details' : 'View Operations'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${selectedBookingDetail?.id === b.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Operational Milestones */}
                    {selectedBookingDetail?.id === b.id && (
                      <div className="p-5 bg-[#FAF9F6] border-t border-neutral-200 space-y-4 animate-in fade-in duration-150">
                        
                        {/* Operations Milestones Progress */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Ground Operations Checklist & Milestones
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {b.milestones.map((m, idx) => (
                              <div 
                                key={idx} 
                                className={`p-2.5 rounded border text-xs flex items-center gap-2 ${
                                  m.completed ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-white border-neutral-200 text-neutral-500'
                                }`}
                              >
                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${m.completed ? 'text-emerald-600' : 'text-neutral-300'}`} />
                                <div>
                                  <div className="font-semibold">{m.title}</div>
                                  {m.date && <div className="text-[10px] text-neutral-500">{m.date}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Assigned Guide & Fleet Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          {b.assignedGuide && (
                            <div className="p-3 bg-white rounded border border-neutral-200 space-y-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Assigned Senior TUREB Guide</span>
                              <div className="font-semibold text-neutral-800">{b.assignedGuide}</div>
                            </div>
                          )}
                          {b.assignedVehicle && (
                            <div className="p-3 bg-white rounded border border-neutral-200 space-y-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Assigned VIP Vehicle</span>
                              <div className="font-semibold text-neutral-800">{b.assignedVehicle}</div>
                            </div>
                          )}
                        </div>

                        {/* Notes */}
                        {b.notes && (
                          <div className="p-3 bg-white rounded border border-neutral-200 text-xs space-y-1">
                            <span className="font-bold text-neutral-700">Special Requests & Dietary / Logistical Notes:</span>
                            <p className="text-neutral-600 leading-relaxed">{b.notes}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setDownloadNotification(`Generated White-Label Agency Voucher for ${b.referenceNumber}...`);
                                setTimeout(() => setDownloadNotification(`Voucher for ${b.referenceNumber} downloaded.`), 1200);
                              }}
                              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-300"
                            >
                              <Download className="w-3.5 h-3.5 text-[#F05A28]" />
                              <span>Download Agency Voucher (PDF)</span>
                            </button>
                          </div>

                          <a
                            href={`https://wa.me/${currentAccount.accountManager.whatsapp.replace(/\D/g, '')}?text=Hello%20Burak%2C%20inquiring%20about%20booking%20${encodeURIComponent(b.referenceNumber)}%20(${encodeURIComponent(b.clientName)})`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                            <span>Message Assigned Ops Desk</span>
                          </a>
                        </div>

                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: WHITE-LABEL MARKETING TOOLKIT & ASSET HUB          */}
          {/* ========================================================= */}
          {activeTab === 'marketing' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Header */}
              <div className="bg-white p-5 rounded-lg border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Agency Growth & Sales Acceleration</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-900">
                    White-Label Marketing & Client Presentation Toolkit
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Everything you need to sell Turkey effortlessly: unbranded itineraries (Word/PDF), 4K commercial-rights photo packs, and destination sell-sheets.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-semibold text-xs border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Commercial Rights Cleared</span>
                  </span>
                </div>
              </div>

              {/* Asset Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['all', 'Unbranded Itineraries (Word/PDF)', 'High-Res Photo Library', 'Destination Cheat Sheets'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAssetCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      assetCategory === cat
                        ? 'bg-[#F05A28] text-white'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {cat === 'all' ? 'All Assets' : cat}
                  </button>
                ))}
              </div>

              {/* Asset Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div 
                    key={asset.id}
                    className="bg-white rounded-lg border border-neutral-200 hover:border-[#F05A28]/50 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-40 bg-neutral-100 overflow-hidden">
                        <img 
                          src={asset.thumbnail} 
                          alt={asset.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-white font-bold text-[10px] backdrop-blur-xs">
                          {asset.format}
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#F05A28] text-white font-bold text-[10px]">
                          {asset.fileSize}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#F05A28]">
                          {asset.category}
                        </div>
                        <h4 className="font-serif font-bold text-neutral-900 text-sm line-clamp-2">
                          {asset.title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-3">
                          {asset.description}
                        </p>
                      </div>
                    </div>

                    {/* Download Footer */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => handleDownloadAsset(asset)}
                        className="w-full py-2 bg-neutral-900 hover:bg-[#F05A28] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Asset ({asset.format.split(' ')[0]})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Footer */}
        <div className="px-6 py-3 bg-neutral-100 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Baobab DMC Turkey B2B Travel Trade Hub • 24/7 Ground Ops Support</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-500 hidden sm:inline">
              Emergency Dispatch: <strong>+90 544 836 28 45</strong>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded font-semibold text-[11px] transition-colors"
            >
              Exit B2B Hub
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
