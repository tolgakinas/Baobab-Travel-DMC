import React, { useState } from 'react';
import { TESTIMONIALS, FAQ_ITEMS, PARTNERS_ACCREDITATIONS, COMPANY_CONTACT } from '../data/dmcData';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Building2,
  Lock,
  Headphones
} from 'lucide-react';

interface AboutDmcProps {
  onOpenInquiry: () => void;
}

export const AboutDmc: React.FC<AboutDmcProps> = ({ onOpenInquiry }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section 1: Brand Story & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-16">
          {/* Left Column: Brand Story & 4 Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
                <ShieldCheck className="w-4 h-4" />
                <span>Dedicated Incoming Ground Specialist</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight leading-tight">
                Why Tour Operators & Travel Consultants <br />
                <span className="italic font-light">Choose Baobab DMC Turkey</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
                Baobab DMC is an incoming Destination Management Company built exclusively for global tour operators, travel agencies, and independent travel advisors. We engineer turnkey and customized small-group journeys (2–14 guests), active adventure trails, and high-touch cultural expeditions throughout Turkey with unyielding operational precision.
              </p>

              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Headquartered in Sisli, Istanbul, with direct regional support hubs in Cappadocia and along the Turquoise Coast, we eliminate costly broker intermediaries. We guarantee confidential net wholesale rates, white-label client roadbooks, private Mercedes executive transportation, and licensed scholar-historian guides.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Building2 className="w-4 h-4 text-[#F05A28]" />
                  <span>Boutique Lodgings</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Hand-selected boutique cave suites, restored Ottoman stone mansions, and secluded coastal retreats.
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Lock className="w-4 h-4 text-[#F05A28]" />
                  <span>White-Label Reliability</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Seamless white-label delivery for international travel agencies, clubs, and group travel leaders.
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Headphones className="w-4 h-4 text-[#F05A28]" />
                  <span>24/7 Dedicated Ops</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every tour has an assigned operations manager and active on-ground support for seamless execution.
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Award className="w-4 h-4 text-[#F05A28]" />
                  <span>Scholar Guides</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Certified historians, expert naturalists, and wilderness guides with profound storytelling depth.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Matched Visual Showcase & Structured Info */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5">
            <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] rounded-md overflow-hidden shadow-md border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=85"
                alt="Istanbul Heritage & Blue Mosque"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Structured Info Cards Under Photo - Perfectly matching bottom row of pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200/80 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#F05A28] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TURSAB #{COMPANY_CONTACT.tursabNumber}</span>
                </div>
                <div className="text-xs font-bold text-neutral-900">
                  A-Grade Licensed Operator
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Registered under Law No. 1618 with comprehensive guest liability and commercial carrier bonding.
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200/80 space-y-1">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-neutral-900 ml-1">4.9 / 5</span>
                </div>
                <div className="text-xs font-bold text-neutral-900">
                  Partner Satisfaction Rating
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Direct operational dispatch, confidential net wholesale B2B tariffs, and guaranteed local coordination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Partner Endorsements / Testimonials */}
        <div className="mb-24 pt-12 border-t border-neutral-200">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              Verified Partner Testimonials
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
              Trusted by Travel Planners Worldwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] p-6 sm:p-7 rounded-md border border-neutral-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 italic font-serif leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <div className="font-bold text-xs text-neutral-900">{t.author}</div>
                  <div className="text-[11px] text-[#F05A28] font-semibold">{t.role}</div>
                  <div className="text-[11px] text-neutral-500">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: B2B FAQ Accordion */}
        <div id="faq" className="max-w-4xl mx-auto pt-12 border-t border-neutral-200">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
              Partnership & Small Group Insights
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded border transition-all ${
                    isOpen ? 'border-[#F05A28]/40 bg-[#FAF9F6]' : 'border-neutral-200 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 font-serif">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#F05A28] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 sm:px-5 border-t border-neutral-200/60 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ Bottom Action */}
          <div className="text-center pt-10">
            <p className="text-xs text-neutral-500 mb-3">
              Have a bespoke small group tour request or adventure inquiry?
            </p>
            <button
              onClick={onOpenInquiry}
              className="px-6 py-2.5 bg-[#111111] hover:bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              Direct Specialist Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
