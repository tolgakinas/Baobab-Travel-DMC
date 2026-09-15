import React, { useState, useEffect } from 'react';
import { InquiryFormData } from '../types';
import { COMPANY_CONTACT } from '../data/dmcData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Users, 
  MapPin, 
  Sparkles, 
  Phone, 
  MessageSquare,
  Calendar,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Mail,
  Video
} from 'lucide-react';

interface InquiryFormProps {
  initialData?: Partial<InquiryFormData>;
  onClose?: () => void;
  isModal?: boolean;
  onOpenCalendly?: (eventTypeId?: string) => void;
}

const DESTINATION_OPTIONS = [
  'Istanbul & Bosphorus',
  'Cappadocia (Valleys & Balloons)',
  'Bodrum & Turquoise Coast',
  'Ephesus, Izmir & Aegean Villages',
  'Antalya & Lycian Way Trails',
  'Gobeklitepe & Upper Mesopotamia',
  'Pamukkale & Hierapolis',
  'Kekova & Kas Coastal Region'
];

const EXPERIENCE_OPTIONS = [
  'Sunrise Hot Air Ballooning in Cappadocia',
  'Guided Lycian Way Coastal Trekking Section',
  'Private Handcrafted Gulet Charter & Secluded Bays',
  'Historic Mosque, Palace & Underground City Scholar Tours',
  'Local Cooking Class & Organic Village Breakfast',
  'Kekova Sunken City Sea Kayaking',
  'Authentic Turkish Bath & Thermal Spa & Thermal Bath Experience',
  'Private Mercedes Mini-Coach with Dedicated Chauffeur'
];

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialData,
  onClose,
  isModal = false,
  onOpenCalendly,
}) => {
  const isB2BPartner = initialData?.formMode === 'b2b-partner';
  const hasRegardedTrip = Boolean(initialData?.selectedTripTitle || initialData?.formMode === 'trip-inquiry');

  const [formData, setFormData] = useState<InquiryFormData>({
    formMode: initialData?.formMode || (initialData?.selectedTripTitle ? 'trip-inquiry' : 'general'),
    tripType: initialData?.tripType || 'Small Group Tour',
    selectedTripTitle: initialData?.selectedTripTitle || '',
    selectedTripCategory: initialData?.selectedTripCategory || '',
    selectedTripDuration: initialData?.selectedTripDuration || '',
    destinations: initialData?.destinations || ['Istanbul & Bosphorus', 'Cappadocia (Valleys & Balloons)'],
    estimatedDate: initialData?.estimatedDate || '',
    durationDays: initialData?.durationDays || 8,
    guestCount: initialData?.guestCount || 8,
    budgetTier: initialData?.budgetTier || 'Boutique Heritage / Cave Suites',
    preferredExperiences: initialData?.preferredExperiences || [
      'Sunrise Hot Air Ballooning in Cappadocia',
      'Historic Mosque, Palace & Underground City Scholar Tours'
    ],
    specialRequests: initialData?.specialRequests || '',
    fullName: initialData?.fullName || '',
    companyOrAgency: initialData?.companyOrAgency || '',
    role: initialData?.role || (isB2BPartner ? 'Tour Operator' : 'Travel Advisor / Agency'),
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    country: initialData?.country || '',
    website: initialData?.website || '',
    partnerType: initialData?.partnerType || 'Tour Operator',
    primaryMarketsServed: initialData?.primaryMarketsServed || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize when initialData updates
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        destinations: initialData.destinations || prev.destinations,
      }));
    }
  }, [initialData]);

  const toggleDestination = (dest: string) => {
    setFormData(prev => {
      const exists = prev.destinations.includes(dest);
      if (exists) {
        return { ...prev, destinations: prev.destinations.filter(d => d !== dest) };
      } else {
        return { ...prev, destinations: [...prev.destinations, dest] };
      }
    });
  };

  const toggleExperience = (exp: string) => {
    setFormData(prev => {
      const exists = prev.preferredExperiences.includes(exp);
      if (exists) {
        return { ...prev, preferredExperiences: prev.preferredExperiences.filter(e => e !== exp) };
      } else {
        return { ...prev, preferredExperiences: [...prev.preferredExperiences, exp] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable inquiry processing and assign reference ID
    setTimeout(() => {
      const randomRef = 'TR-BAOBAB-' + Math.floor(1000 + Math.random() * 9000);
      setReferenceNumber(randomRef);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const copyReference = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="inquiry" className={`w-full ${isModal ? 'p-4 sm:p-6' : 'py-20 sm:py-28 bg-[#FAF9F6]'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header (if not modal) */}
        {!isModal && (
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F05A28]/10 text-[#F05A28] rounded-full text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>
                {isB2BPartner 
                  ? 'B2B Trade Partner Registration & Agency Agreement' 
                  : hasRegardedTrip 
                  ? 'Direct Tour Program Proposal & Net Tariff Inquiry'
                  : 'B2B Direct Ground Operator & Tour Planning Service'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
              {isB2BPartner
                ? 'Partner With Us — Trade Onboarding'
                : hasRegardedTrip
                ? `Inquire Regarding ${formData.selectedTripTitle}`
                : 'Request Your Custom Tour Proposal'}
            </h2>
            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              {isB2BPartner
                ? 'Register your travel agency, tour company, or consultancy with Baobab DMC to access wholesale net tariffs, white-label services, and direct local coordination across Turkiye.'
                : hasRegardedTrip
                ? 'Request net wholesale pricing, customized pacing, private departures, or lodge upgrades for this specific tour program.'
                : 'Tailored for international tour operators, travel agencies, and independent travel consultants. Connect directly with our Istanbul destination operations desk for wholesale net confidential pricing, custom day-by-day itineraries, and guaranteed ground support.'}
            </p>
          </div>
        )}

        {/* Notice when requesting proposal for a specific trip */}
        {hasRegardedTrip && formData.selectedTripTitle && (
          <div className="mb-6 p-4 sm:p-5 bg-[#121316] text-white rounded-md border border-[#F05A28]/60 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F05A28]/20 text-[#F05A28] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F05A28]">
                    Selected Tour Program
                  </span>
                  {formData.selectedTripDuration && (
                    <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                      {formData.selectedTripDuration}
                    </span>
                  )}
                </div>
                <div className="font-serif font-bold text-lg sm:text-xl text-white">
                  {formData.selectedTripTitle}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Route includes: <span className="text-neutral-200">{formData.destinations.join(' → ')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded">
                Direct Program Inquiry
              </span>
            </div>
          </div>
        )}

        {/* Notice for B2B Partner Onboarding */}
        {isB2BPartner && (
          <div className="mb-6 p-4 bg-amber-50 text-amber-900 rounded-md border border-amber-200 shadow-xs flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-amber-700 shrink-0" />
              <div className="text-xs">
                <strong>B2B Trade Onboarding Form:</strong> This inquiry establishes an official agency profile with Baobab DMC. You will receive confidential net wholesale tariff sheets, sample white-label proposals, and our destination manual.
              </div>
            </div>
            {onOpenCalendly && (
              <button
                type="button"
                onClick={() => onOpenCalendly('b2b-discovery')}
                className="shrink-0 px-3 py-1.5 bg-amber-900 text-white rounded text-xs font-semibold hover:bg-amber-800 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Video className="w-3.5 h-3.5 text-amber-300" />
                <span>Or Book Video Call</span>
              </button>
            )}
          </div>
        )}

        {/* Live consultation helper banner */}
        {!isB2BPartner && onOpenCalendly && (
          <div className="mb-6 p-3 sm:p-4 bg-neutral-900 text-white rounded-md border border-neutral-800 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F05A28]/20 flex items-center justify-center shrink-0">
                <Video className="w-4 h-4 text-[#F05A28]" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">Prefer to talk live with an Istanbul Destination Specialist?</span>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  Schedule a 1-on-1 virtual itinerary planning and net wholesale rate discussion via Zoom or Google Meet.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenCalendly('custom-itinerary')}
              className="shrink-0 px-3.5 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Schedule on Calendly</span>
              <Video className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Success Confirmation State */}
        {submitted ? (
          <div className="bg-white rounded-md border border-emerald-200 shadow-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Tour Inquiry Successfully Received
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
                Thank You, {formData.fullName || 'Travel Partner'}
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Your tour proposal request for <strong>{formData.tripType}</strong> in Turkey has been assigned to our Senior Destination Director.
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between gap-4 text-left">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Proposal Reference Number
                </div>
                <div className="font-mono text-base sm:text-lg font-bold text-neutral-900">
                  {referenceNumber}
                </div>
              </div>
              <button
                onClick={copyReference}
                className="px-3 py-1.5 bg-white hover:bg-neutral-100 border border-neutral-300 rounded text-xs font-semibold text-neutral-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Timeline Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs">
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Proposal Response Window</span>
                </div>
                <div className="text-neutral-600">
                  Detailed day-by-day itinerary and net proposal delivered within <strong>24 hours</strong>.
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct WhatsApp Desk</span>
                </div>
                <div className="text-neutral-600">
                  Need immediate planning support? Connect via WhatsApp with your proposal reference number.
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {onOpenCalendly && (
                <button
                  type="button"
                  onClick={() => onOpenCalendly('custom-itinerary')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#F05A28] text-white font-semibold text-xs rounded transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4 text-[#F05A28]" />
                  <span>Book Review Call (Calendly)</span>
                </button>
              )}

              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20have%20submitted%20Proposal%20Inquiry%20${referenceNumber}%20for%20${encodeURIComponent(formData.fullName)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  if (onClose) onClose();
                }}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs rounded transition-colors"
              >
                {isModal ? 'Close Window' : 'Submit Another Inquiry'}
              </button>
            </div>
          </div>
        ) : (
          /* Main Inquiry Form Grid */
          <div className="bg-white rounded-md border border-neutral-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Form Fields */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 p-6 sm:p-10 space-y-8">
              {/* If B2B Partner Mode: Display B2B Trade Agency Profile Fields */}
              {isB2BPartner ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                      <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">1</span>
                      <span>Agency & Partnership Profile</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                          Business Type / Organization Model *
                        </label>
                        <select
                          value={formData.partnerType || 'Tour Operator'}
                          onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none cursor-pointer"
                        >
                          <option value="Tour Operator">Outbound Tour Operator (Group & FIT)</option>
                          <option value="Retail Travel Agency">Retail Travel Agency / Consortia Member</option>
                          <option value="Luxury Travel Designer">Luxury Travel Designer / Concierge</option>
                          <option value="Educational / Alumni">University Alumni & Educational Planner</option>
                          <option value="MICE / Corporate">Corporate Incentive & MICE Specialist</option>
                          <option value="Special Interest Club">Hiking / Adventure / Photography Club</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                          Agency Website / Online Presence
                        </label>
                        <input
                          type="url"
                          placeholder="https://www.youragency.com"
                          value={formData.website || ''}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Primary Client Markets / Source Countries
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. North America, UK, Western Europe, Australia, Latin America"
                        value={formData.primaryMarketsServed || ''}
                        onChange={(e) => setFormData({ ...formData, primaryMarketsServed: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Partnership Interests */}
                  <div className="space-y-3 pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                      <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">2</span>
                      <span>Operational Services You Require in Turkey</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'White-Label Operations (Your Company Branding)',
                        'Wholesale Confidential Net Tariff Access',
                        'Active Adventure, Lycian Way & Gulet Charters',
                        'Custom FIT & Luxury VIP Cultural Itineraries',
                        'Scheduled Group Series Allotments',
                        'English/Multilingual Licensed Guide Network'
                      ].map((service) => {
                        const isSelected = formData.preferredExperiences.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleExperience(service)}
                            className={`p-2 rounded text-left text-xs font-medium border flex items-center gap-2 transition-all ${
                              isSelected
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[10px] ${
                              isSelected ? 'bg-[#F05A28] text-white' : 'border border-neutral-300'
                            }`}>
                              {isSelected && '✓'}
                            </span>
                            <span className="truncate">{service}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : hasRegardedTrip ? (
                /* REGARDED TRIP INQUIRY: No need to choose trip or select destination! Locked and focused on the selected trip */
                <div className="space-y-6">
                  <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                        Inquiry Regarding Tour Program
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-500">
                        {formData.selectedTripDuration || `${formData.durationDays} Days`}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-lg text-neutral-900">
                      {formData.selectedTripTitle}
                    </div>
                    <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-neutral-700">Covered Route:</span>
                      <span className="text-neutral-600">{formData.destinations.join(' • ')}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200">
                      Program details & day-by-day routing are already linked to this proposal request. Specify your group details below.
                    </div>
                  </div>

                  {/* Group & Pacing Details for the Regarded Trip */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                      <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">1</span>
                      <span>Target Travel Dates & Group Size</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Estimated Travel Month / Season
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. October 2026 or May 2027"
                          value={formData.estimatedDate}
                          onChange={(e) => setFormData({ ...formData, estimatedDate: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Group Size (Number of Guests)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 (Private FIT), 8, 12, 16 guests"
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Accommodation preference for this trip */}
                    <div className="pt-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Preferred Accommodation Level
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          'Boutique Heritage / Cave Suites',
                          'Luxury 5-Star',
                          'Charming Stone Inns',
                          'Original Tour Standard'
                        ].map(tier => (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setFormData({ ...formData, budgetTier: tier as any })}
                            className={`py-2 px-2.5 rounded text-xs font-semibold border transition-all text-center ${
                              formData.budgetTier === tier
                                ? 'bg-[#F05A28] text-white border-[#F05A28]'
                                : 'bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* GENERAL CUSTOM PROPOSAL MODE: Full customization */
                <>
                  {/* Step 1: Program Type */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                      <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">1</span>
                      <span>Select Tour / Adventure Type</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'Small Group Tour', label: 'Guided Small Group Tour', desc: 'Intimate 6–14 guest discovery with scholar guide' },
                        { id: 'Active Adventure & Hiking', label: 'Active Adventure & Hiking', desc: 'Lycian Way trekking, Cappadocia valleys & sea kayaking' },
                        { id: 'Cultural & Historical Expedition', label: 'Cultural & Historical Expedition', desc: 'Deep archaeology, ancient civilisations & food trails' },
                        { id: 'Gulet & Coastal Adventure', label: 'Gulet & Coastal Sailing', desc: 'Handcrafted wooden gulets & turquoise bay swimming' },
                      ].map(type => (
                        <label
                          key={type.id}
                          className={`p-3 rounded border cursor-pointer transition-all flex flex-col justify-between ${
                            formData.tripType === type.id
                              ? 'bg-[#F05A28]/5 border-[#F05A28] shadow-sm'
                              : 'bg-[#FAF9F6] border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-900">{type.label}</span>
                            <input
                              type="radio"
                              name="tripType"
                              value={type.id}
                              checked={formData.tripType === type.id}
                              onChange={() => setFormData({ ...formData, tripType: type.id as any })}
                              className="text-[#F05A28] focus:ring-[#F05A28]"
                            />
                          </div>
                          <span className="text-[11px] text-neutral-500 mt-1">{type.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Target Regions in Turkey */}
                  <div className="space-y-3 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                        <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">2</span>
                        <span>Destinations to Include in Turkey</span>
                      </div>
                      <span className="text-[11px] text-neutral-400">Select multiple</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {DESTINATION_OPTIONS.map((dest) => {
                        const isSelected = formData.destinations.includes(dest);
                        return (
                          <button
                            type="button"
                            key={dest}
                            onClick={() => toggleDestination(dest)}
                            className={`p-2.5 text-left rounded text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                                : 'bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <div className="line-clamp-2">{dest}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Dates, Scale & Budget */}
                  <div className="space-y-3 pt-2 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                      <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">3</span>
                      <span>Scale, Duration & Lodging Standard</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Travel Window / Season
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. October 2026 or Spring 2027"
                          value={formData.estimatedDate}
                          onChange={(e) => setFormData({ ...formData, estimatedDate: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Group Size (Guests)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 6, 8, 12 guests"
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Approx. Duration (Days)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 7, 10, 14 days"
                          value={formData.durationDays}
                          onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Accommodation Style
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          'Boutique Heritage / Cave Suites',
                          'Luxury 5-Star',
                          'Charming Stone Inns',
                          'Private Gulet Cabin'
                        ].map(tier => (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setFormData({ ...formData, budgetTier: tier as any })}
                            className={`py-2 px-2.5 rounded text-xs font-semibold border transition-all text-center ${
                              formData.budgetTier === tier
                                ? 'bg-[#F05A28] text-white border-[#F05A28]'
                                : 'bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Signature Elements */}
                  <div className="space-y-3 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                        <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">4</span>
                        <span>Signature Experiences & Activities</span>
                      </div>
                      <span className="text-[11px] text-neutral-400">Optional</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {EXPERIENCE_OPTIONS.map((exp) => {
                        const isSelected = formData.preferredExperiences.includes(exp);
                        return (
                          <button
                            type="button"
                            key={exp}
                            onClick={() => toggleExperience(exp)}
                            className={`p-2 rounded text-left text-xs font-medium border flex items-center gap-2 transition-all ${
                              isSelected
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[10px] ${
                              isSelected ? 'bg-[#F05A28] text-white' : 'border border-neutral-300'
                            }`}>
                              {isSelected && '✓'}
                            </span>
                            <span className="truncate">{exp}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Special Notes & Requests */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  {isB2BPartner 
                    ? 'Tell Us About Your Agency, Preferred Destinations or Inquiry Volume' 
                    : hasRegardedTrip 
                    ? 'Custom Adaptations, Pacing, or Requests for this Tour' 
                    : 'Special Program Notes, Activity Level or Specific Requests'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    isB2BPartner
                      ? 'e.g. We are an outbound tour operator based in the UK looking for an incoming partner for cultural and hiking tours in Turkey...'
                      : hasRegardedTrip
                      ? 'e.g. We would like to add an extra day in Istanbul, upgrade to 5-star cave suites, or request private departure dates for a closed family group...'
                      : 'Tell us about the group fitness level, preferred pace, dietary preferences, or specific places you want to visit...'
                  }
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                />
              </div>

              {/* Contact & Agency Information */}
              <div className="space-y-4 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                  <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center text-[10px]">
                    {isB2BPartner ? '3' : hasRegardedTrip ? '2' : '5'}
                  </span>
                  <span>{isB2BPartner ? 'Agency Contact Person' : 'Contact Information'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Company / Travel Agency Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Artisan Journeys Worldwide"
                      value={formData.companyOrAgency}
                      onChange={(e) => setFormData({ ...formData, companyOrAgency: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="planner@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Phone / WhatsApp (with country code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 555 123 4567 or +44 20 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Country of Operation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United States, United Kingdom, Australia"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Professional Role / Partner Type *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-neutral-200 rounded focus:border-[#F05A28] focus:outline-none cursor-pointer"
                    >
                      <option value="Tour Operator">Tour Operator (Outbound / Wholesaler)</option>
                      <option value="Travel Agency">Retail Travel Agency</option>
                      <option value="Travel Consultant">Independent Travel Consultant / Advisor</option>
                      <option value="Group Organizer">Special Interest / Affinity Group Organizer</option>
                      <option value="Direct Traveler">Private VIP Family / Traveler</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licensed TURSAB #{COMPANY_CONTACT.tursabNumber} • B2B Trade Protection Guaranteed</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>
                        {isB2BPartner 
                          ? 'Submit Partner Registration' 
                          : hasRegardedTrip 
                          ? 'Request Proposal for This Trip' 
                          : 'Submit Tour Proposal Request'}
                      </span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Right Column: Live Proposal Summary & Direct Office Contacts */}
            <div className="lg:col-span-4 bg-[#121316] text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-800">
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#F05A28]">
                    {isB2BPartner ? 'Trade Partnership Desk' : hasRegardedTrip ? 'Tour Program Inquiry' : 'Tour Outline Summary'}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white tracking-tight mt-1">
                    {isB2BPartner ? 'B2B Trade Agreement' : hasRegardedTrip ? formData.selectedTripTitle || 'Selected Program' : 'Your Turkish Tour Blueprint'}
                  </h3>
                </div>

                {/* Summary Card */}
                <div className="p-4 bg-neutral-900/90 rounded border border-neutral-800 space-y-3 text-xs">
                  {isB2BPartner ? (
                    <>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Partner Type:</span>
                        <span className="font-semibold text-white">{formData.partnerType || 'Tour Operator / Travel Agency'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Contract Level:</span>
                        <span className="font-semibold text-emerald-400">Confidential Wholesale Net Tariffs</span>
                      </div>
                      <div className="pt-2 border-t border-neutral-800">
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Included Capabilities:</span>
                        <div className="text-neutral-300 text-[11px] mt-1 space-y-1">
                          <div>• White-label guest documentation</div>
                          <div>• Net confidential B2B rate matrix</div>
                          <div>• 24/7 Istanbul operations support</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {formData.selectedTripTitle && (
                        <div className="pb-2 border-b border-neutral-800">
                          <span className="text-[#F05A28] block text-[10px] uppercase font-bold tracking-wider">Requested Tour Program:</span>
                          <span className="font-semibold text-white text-xs leading-snug">{formData.selectedTripTitle}</span>
                        </div>
                      )}

                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Category:</span>
                        <span className="font-semibold text-white">{formData.tripType}</span>
                      </div>

                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Destinations:</span>
                        <div className="font-medium text-neutral-200 mt-0.5">
                          {formData.destinations.length > 0 ? formData.destinations.join(', ') : 'Custom Route'}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                        <div>
                          <span className="text-neutral-400 block text-[10px] uppercase font-bold">Group Size:</span>
                          <span className="font-semibold text-white">{formData.guestCount} Guests</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[10px] uppercase font-bold">Duration:</span>
                          <span className="font-semibold text-white">
                            {formData.selectedTripDuration || `${formData.durationDays} Days`}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-800">
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Accommodations:</span>
                        <span className="font-semibold text-[#F05A28]">{formData.budgetTier}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Local Office Contacts */}
                <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
                  <div className="font-bold uppercase tracking-wider text-neutral-400 text-[11px]">
                    Baobab DMC Headquarters
                  </div>
                  
                  <div className="space-y-2 text-neutral-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                      <span>{COMPANY_CONTACT.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
                      <span>{COMPANY_CONTACT.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TURSAB Verification */}
              <div className="pt-6 mt-6 border-t border-neutral-800">
                <div className="p-3 bg-neutral-900 rounded border border-neutral-800 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div className="text-[11px] text-neutral-300">
                    <strong>TURSAB Licensed Agency #{COMPANY_CONTACT.tursabNumber}</strong>
                    <div className="text-neutral-500">Ministry of Culture and Tourism Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
