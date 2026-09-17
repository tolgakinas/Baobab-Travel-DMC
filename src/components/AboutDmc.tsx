import React, { useState, useMemo } from 'react';
import { TESTIMONIALS, FAQ_ITEMS, FAQ_CATEGORIES, PARTNERS_ACCREDITATIONS, COMPANY_CONTACT } from '../data/dmcData';
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
  Headphones,
  Search,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AboutDmcProps {
  onOpenInquiry: () => void;
}

export const AboutDmc: React.FC<AboutDmcProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('visa-exemptions-us-uk-eu');

  // Filtered FAQ items based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery = 
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

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

        {/* Section 3: B2B & Ground Intelligence FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto pt-14 border-t border-neutral-200">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F05A28]/10 rounded-full text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Turkiye Travel & Ground Operations FAQ</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
              Essential Turkiye Travel & Logistics Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
              Authoritative answers covering visa requirements, airport transit, currency & payments, electrical plugs, safety protocols, mosque etiquette, and B2B ground operations.
            </p>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="space-y-4 mb-8">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs (e.g. visa, Istanbul airport, credit cards, 220V plug, safety, tipping)..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#F05A28] focus:border-[#F05A28] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-bold px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = cat === 'All' 
                  ? FAQ_ITEMS.length 
                  : FAQ_ITEMS.filter((i) => i.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#F05A28] text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-neutral-50 rounded border border-neutral-200 space-y-2">
                <HelpCircle className="w-8 h-8 text-neutral-400 mx-auto" />
                <p className="text-sm font-semibold text-neutral-700">No questions found matching "{searchQuery}"</p>
                <p className="text-xs text-neutral-500">Try searching for terms like "visa", "IST airport", "lira", or "safety".</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-2 text-xs font-bold text-[#F05A28] hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded border transition-all ${
                      isOpen ? 'border-[#F05A28]/50 bg-[#FAF9F6] shadow-sm' : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-neutral-900 font-serif leading-snug">
                          {item.q}
                        </h4>
                      </div>
                      <div className="pt-1">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#F05A28] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 sm:px-5 border-t border-neutral-200/60 space-y-3">
                        <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                          {item.a}
                        </p>

                        {/* Keyword Highlights for GEO / AIO discovery */}
                        <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-neutral-200/40">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-[#F05A28]" />
                            Topic tags:
                          </span>
                          {item.keywords.map((kw, kwIdx) => (
                            <span
                              key={kwIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200/60"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Quick FAQ Bottom Action */}
          <div className="text-center pt-10">
            <p className="text-xs text-neutral-500 mb-3">
              Need specific flight logistics, custom B2B net pricing, or private gulet availability?
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                <span>Direct Specialist Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
