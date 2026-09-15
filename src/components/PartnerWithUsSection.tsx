import React from 'react';
import { 
  Handshake, 
  ShieldCheck, 
  Percent, 
  FileText, 
  Headphones, 
  Car, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  ArrowRight,
  Clock,
  Send,
  Building2,
  Users,
  BadgePercent,
  Video
} from 'lucide-react';

interface PartnerWithUsSectionProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
  onOpenB2BPanel?: () => void;
}

export const PartnerWithUsSection: React.FC<PartnerWithUsSectionProps> = ({ onOpenInquiry, onOpenCalendly, onOpenB2BPanel }) => {
  const partnerBenefits = [
    {
      icon: <Percent className="w-6 h-6 text-[#F05A28]" />,
      title: 'Net Wholesale B2B Tariffs',
      description: 'Transparent, confidential ground rates with volume-tiered margins. No hidden markups or retail surcharges, protecting your commercial profitability.',
      badge: 'Protected Margins'
    },
    {
      icon: <FileText className="w-6 h-6 text-[#F05A28]" />,
      title: '100% White-Label Execution',
      description: 'Your brand stays front and center. Customized welcome letters, vehicle placards, daily client roadbooks, and unbranded executive transport carrying your agency name.',
      badge: 'Brand Integrity'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#F05A28]" />,
      title: '24-Hour Custom Proposal Turnaround',
      description: 'Receive meticulously costed, comprehensive day-by-day proposals, hotel alternatives, and logistical breakdowns within 24 hours of inquiry submission.',
      badge: 'Rapid Response'
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#F05A28]" />,
      title: 'Dedicated Ground Operations & 24/7 Dispatch',
      description: 'Every departure has an assigned operations supervisor, direct WhatsApp coordination group for agency team members, and around-the-clock emergency support.',
      badge: '24/7 Peace of Mind'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#F05A28]" />,
      title: 'TURSAB A-Grade Licensed & Bonded',
      description: 'Officially certified under TURSAB License #13127 with full financial bonding, comprehensive passenger liability insurance, and stringent safety standards.',
      badge: 'Fully Insured'
    },
    {
      icon: <Car className="w-6 h-6 text-[#F05A28]" />,
      title: 'Direct Supplier Fleet & Guaranteed Allocations',
      description: 'Direct contracts with premier boutique cave hotels in Cappadocia, Bosphorus luxury suites, private wooden gulets, and modern Mercedes-Benz VIP Sprinter vans.',
      badge: 'Direct Contracting'
    }
  ];

  const partnershipSteps = [
    {
      step: '01',
      title: 'Submit Brief or Client Request',
      description: 'Send us your group size, travel dates, preferred destinations, or select one of our curated programs as a starting point.'
    },
    {
      step: '02',
      title: 'Receive Tailored Proposal in 24h',
      description: 'We deliver a private-branded B2B quotation complete with net tariffs, hotel options, timing sequences, and marketing-ready copy.'
    },
    {
      step: '03',
      title: 'Refine & Confirm Reservation',
      description: 'Collaborate directly with our Turkiye destination manager to tailor excursions, dietary requests, or flight connections.'
    },
    {
      step: '04',
      title: 'Flawless White-Label Delivery',
      description: 'Our operations team and licensed guides greet your travelers at the airport gate under your company banner, ensuring seamless execution.'
    }
  ];

  const eligiblePartners = [
    'International Tour Operators (Group & FIT)',
    'Independent Travel Agencies & Virtuoso / Signature Advisors',
    'Luxury Travel Designers & Lifestyle Concierges',
    'Educational Institutions & University Alumni Groups',
    'Corporate Incentive & Meeting Planners (MICE)',
    'Hiking, Trekking & Photography Clubs'
  ];

  return (
    <section id="partner" className="py-20 sm:py-28 bg-[#121316] text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F05A28]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-800 pb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              <Handshake className="w-4 h-4" />
              <span>B2B Travel Trade Partnership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Why Partner With Baobab DMC <br />
              <span className="italic font-light text-neutral-300">As Your Incoming Turkiye Specialist</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              We operate exclusively as a trusted B2B incoming ground partner for international tour operators, retail agencies, and travel consultants. We provide the regional knowledge, operational muscle, and net pricing you need to deliver memorable journeys under your brand name.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onOpenB2BPanel && (
              <button
                onClick={onOpenB2BPanel}
                className="px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Building2 className="w-4 h-4 text-[#F05A28]" />
                <span>Access B2B Partner Hub</span>
              </button>
            )}

            <button
              onClick={() => onOpenInquiry({ 
                formMode: 'b2b-partner',
                partnerType: 'Tour Operator', 
                specialRequests: 'Registering as a new B2B trade partner / requesting agency agreement and net wholesale tariff sheet.' 
              })}
              className="px-6 py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Register as Partner</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenCalendly && (
              <button
                onClick={() => onOpenCalendly('b2b-discovery')}
                className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 border border-neutral-700 flex items-center justify-center gap-2 active:scale-95"
              >
                <Video className="w-4 h-4 text-[#F05A28]" />
                <span>Schedule Discovery Call</span>
              </button>
            )}
          </div>
        </div>

        {/* 6 Core B2B Value Pillars */}
        <div className="mb-20">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
            The Baobab DMC B2B Commitment
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerBenefits.map((b, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/80 border border-neutral-800 rounded-md p-6 hover:border-[#F05A28]/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-neutral-800/90 rounded-md border border-neutral-700/60 group-hover:bg-[#F05A28]/10 transition-colors">
                      {b.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/5">
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F05A28] transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-sans">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works - 4 Steps to Onboard */}
        <div className="mb-20 bg-neutral-900/60 rounded-lg p-8 sm:p-10 border border-neutral-800">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              Simple & Streamlined Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              How We Work With You
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              From the initial inquiry to on-the-ground guest departure, our process is designed for agency speed and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipSteps.map((s, idx) => (
              <div key={idx} className="relative space-y-3">
                <div className="text-3xl font-serif font-bold text-[#F05A28]/40">
                  {s.step}
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  {s.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Partner With Banner + Direct Inquiry CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-800/80 p-8 sm:p-10 rounded-lg border border-neutral-700">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28] flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Who We Partner With Worldwide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Built Specifically for the Global Travel Trade
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Whether you represent a boutique agency crafting bespoke FIT honeymoons, an adventure tour company organizing Lycian Way treks, or a full-scale operator with seasonal group departures, we serve as your direct, on-the-ground execution arm in Turkiye.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {eligiblePartners.map((ep, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{ep}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#17181c] p-6 rounded-md border border-neutral-700 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F05A28]/20 flex items-center justify-center mx-auto text-[#F05A28]">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-white">
                Request B2B Trade Agreement
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Receive confidential wholesale tariffs, agent sample itineraries, and our complete Turkiye destination manual.
              </p>
            </div>
            <button
              onClick={() => onOpenInquiry({ 
                formMode: 'b2b-partner',
                partnerType: 'Tour Operator',
                specialRequests: 'Requesting B2B Trade Agreement, confidential wholesale tariffs, and destination catalog.' 
              })}
              className="w-full py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Open Trade Partnership Dialog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenB2BPanel && (
              <button
                onClick={onOpenB2BPanel}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors border border-neutral-600 flex items-center justify-center gap-2"
              >
                <Building2 className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Existing Partners: Login to B2B Hub</span>
              </button>
            )}

            {onOpenCalendly && (
              <button
                onClick={() => onOpenCalendly('b2b-discovery')}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors border border-neutral-600 flex items-center justify-center gap-2"
              >
                <Video className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Book Discovery Call (Calendly)</span>
              </button>
            )}

            <p className="text-[11px] text-neutral-500">
              No long-term minimums required. Valid for licensed travel professionals worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
