import React, { useState } from 'react';
import { DMC_SERVICES } from '../data/dmcData';
import { InteractiveTurkiyeMap } from './InteractiveTurkiyeMap';
import { useSiteContent } from '../context/SiteContentContext';
import { 
  Users, 
  Compass, 
  Utensils, 
  Anchor, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Car,
  Bed,
  MapPin,
  Clock,
  Award,
  Activity,
  PhoneCall,
  FileText,
  Layers,
  Globe2,
  Check
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
}

interface ServiceSpecs {
  groupSize: string;
  guiding: string;
  transit: string;
  stays: string;
  activityLevel: string;
  popularRoutes: string[];
  fieldHighlight: {
    title: string;
    description: string;
  };
  b2bNote: string;
  inclusions: string[];
}

const SERVICE_SPECS: Record<string, ServiceSpecs> = {
  'small-group-tours': {
    groupSize: '6 to 14 Travelers (Strict Cap)',
    guiding: 'Official TUREB Scholar Guides (Archaeology & History degrees)',
    transit: 'Private Mercedes VIP Sprinter (Leather captains chairs & Wi-Fi)',
    stays: 'Boutique Cave Suites, Restored Ottoman Mansions & Seaside Inns',
    activityLevel: 'Moderate walking & cultural exploration (5–9 km daily)',
    popularRoutes: [
      'Istanbul Imperial & Bosphorus Exclusive',
      'Cappadocia Troglodyte Valleys & Underground Cities',
      'Classical Aegean: Ephesus, Priene & Didyma',
      'Pamukkale Hierapolis Thermal Terraces'
    ],
    fieldHighlight: {
      title: 'Private Curator Access & Artisan Encounters',
      description: 'Guests bypass commercial tourist shops to engage directly with master ceramicists in Avanos, carpet weavers in village cooperatives, and architectural restoration experts in Istanbul.'
    },
    b2bNote: 'Fully white-label execution with unbranded or co-branded tour documentation, custom group name board upon airport meet-and-assist, and 24/7 dedicated dispatch manager.',
    inclusions: [
      'Private air-conditioned Mercedes VIP transport throughout with Wi-Fi',
      'All entrance fees to state museums & archaeological parks',
      'Breakfasts & handpicked regional gourmet lunches',
      'Dedicated luggage transfer with zero guest handling required',
      'Whisper audio headset systems for effortless guide listening'
    ]
  },
  'active-adventures': {
    groupSize: '4 to 12 Active Hikers',
    guiding: 'Wilderness First Aid (WFR) Certified Mountain & Trekking Guides',
    transit: '4x4 Support Vehicles & Dedicated Luggage Transport Vans',
    stays: 'Authentic Village Stone Houses, Eco-Lodges & Heritage Guesthouses',
    activityLevel: 'Active to Challenging (8–18 km / 400–900m ascent daily)',
    popularRoutes: [
      'Lycian Way: Kayaköy to Faralya & Butterfly Valley',
      'Cappadocia Valley Traverses: Pigeon, Rose & Ihlara Gorges',
      'Kaçkar Mountains & Black Sea Alpine High-Plateaus',
      'St. Paul Trail & Pisidian Anti-Taurus Ridges'
    ],
    fieldHighlight: {
      title: 'Hike Light, Daypack Only with Full Van Support',
      description: 'Our mobile logistics van handles heavy duffels between lodges, sets up cold hydration stations at trail intersections, and provides quick vehicle transfer options if anyone needs rest.'
    },
    b2bNote: 'Turnkey active packaging: route GPX files, customized packing checklists, daily safety briefings, and emergency satellite coordination for remote trail segments.',
    inclusions: [
      'Daily luggage transit between mountain villages & lodges',
      'Fresh trailside farm picnics, herbal teas & local snacks',
      'Wilderness first-aid kit & emergency communication protocols',
      'Sea kayak and safety equipment for coastal traverses',
      'Pre-tour fitness grading and gear consultation for agents'
    ]
  },
  'culinary-expeditions': {
    groupSize: '6 to 12 Gastronomes',
    guiding: 'Culinary Historians, Sommelier Partners & Food Journalists',
    transit: 'Climate-Controlled Executive Vans with Chilled Refreshments',
    stays: 'Vineyard Boutiques, Historic Silk Road Inns & Gastronomy Hotels',
    activityLevel: 'Leisurely walking food trails & hands-on cooking sessions',
    popularRoutes: [
      'Istanbul Street Food, Spice Alleys & Meyhane Crawl',
      'Aegean Olive Coast: Urla Wine Route & Alaçatı Farmers Markets',
      'Gaziantep & Antakya: UNESCO Creative Cities of Gastronomy',
      'Black Sea Tea Plantations & Highland Dairy Traditions'
    ],
    fieldHighlight: {
      title: 'Behind-the-Scenes with Master Chefs & Village Grandmothers',
      description: 'From 5:00 AM wholesale fish market tours along the Golden Horn to rolling handmade baklava sheets with fifth-generation masters in Gaziantep.'
    },
    b2bNote: 'Seamless handling of dietary requirements (vegetarian, vegan, celiac/gluten-free, kosher-style). Complete recipe booklets customized with your agency branding.',
    inclusions: [
      'All multi-course regional degustation dinners & street tastings',
      'Private hands-on cooking masterclasses with local cooks',
      'Exclusive boutique vineyard visits with indigenous grape tastings',
      'Curated Turkish spices & artisan olive oil departure gift pack',
      'Curated restaurant reservations at acclaimed culinary establishments'
    ]
  },
  'yachting': {
    groupSize: '8 to 18 Guests (Full Private Charter)',
    guiding: 'Licensed Maritime Captain, Deck Officer & Private Onboard Chef',
    transit: 'Handcrafted Turkish Wooden Sailing Gulet (20–35 meters)',
    stays: 'Air-Conditioned Deluxe & High-Deluxe En-suite Staterooms',
    activityLevel: 'Relaxed swimming, optional coastal hikes & water sports',
    popularRoutes: [
      'Göcek 12 Islands & Yassıca Secluded Anchorages',
      'Fethiye to Kekova Sunken City & Simena Byzantine Castle',
      'Bodrum to Datça Peninsula & Ancient Knidos Ruin Anchorage',
      'Hike-and-Sail combinations along Lycian Coastal Trails'
    ],
    fieldHighlight: {
      title: 'Secluded Turquoise Bays Inaccessible by Land',
      description: 'Drop anchor in untouched Mediterranean coves where pine forests touch crystal waters. Swim into sea caves at dawn and enjoy candlelit seafood dinners on the aft deck under Aegean stars.'
    },
    b2bNote: 'Wholesale B2B charter tariffs with transparent APA (Advance Provisioning Allowance) or full-board catering tiers. Custom boarding welcomes and personalized ship flags available.',
    inclusions: [
      'Exclusive private yacht charter with dedicated crew of 3 to 5',
      'Full-board Mediterranean gourmet meals prepared fresh daily',
      'Fuel for up to 4 hours of cruising daily plus harbor dues in Turkey',
      'Water toys: Stand-up paddleboards, snorkeling gear & sea kayak',
      'Tender boat transfers for coastal hiking excursions & shore dining'
    ]
  },
  'bespoke-private': {
    groupSize: '2 to 14 VIPs, Families & Private Affinity Circles',
    guiding: 'Top-Tier Private Scholar Guide Dedicated Exclusively to Party',
    transit: 'Mercedes Maybach Minivan or VIP Sprinter with Private Chauffeur',
    stays: 'Ultra-Luxury Cave Villas, Historic Bosphorus Palaces & Resorts',
    activityLevel: '100% Customized to client pacing, preferences & mobility',
    popularRoutes: [
      'Bespoke Multi-Generational Family Adventures across Anatolia',
      'University Alumni & Museum Patron Curated Art Expeditions',
      'Architectural & Archaeological Deep-Dives (Göbeklitepe to Troy)',
      'Romantic Anniversaries & Private Milestone Celebrations'
    ],
    fieldHighlight: {
      title: 'Total Autonomy, Flexibility & Unmatched Access',
      description: 'Wake up when you wish, stay longer at sites that inspire you, and enjoy exclusive after-hours access to historical landmarks or private Bosphorus yacht cruises at sunset.'
    },
    b2bNote: 'Guaranteed 24-hour proposal turnaround with day-by-day itemized options. Direct WhatsApp coordination channel between your agency operations desk and our lead dispatcher.',
    inclusions: [
      'Dedicated executive vehicle and private chauffeur at guest disposal',
      'VIP fast-track airport meet, luggage assistance & tarmac transfers',
      'Private museum appointments and curator introductions',
      'Complete flexibility to adjust daily timing and dining en-route',
      '24/7 dedicated in-country emergency and concierge coverage'
    ]
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const { content } = useSiteContent();
  const servicesList = content?.services && content.services.length > 0 ? content.services : DMC_SERVICES;
  const [activeServiceId, setActiveServiceId] = useState<string>(servicesList[0]?.id || DMC_SERVICES[0].id);
  const [viewMode, setViewMode] = useState<'map' | 'blueprint'>('map');

  const activeService = servicesList.find(s => s.id === activeServiceId) || servicesList[0] || DMC_SERVICES[0];
  const activeSpecs = SERVICE_SPECS[activeService.id] || SERVICE_SPECS['small-group-tours'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Anchor': return <Anchor className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getTripTypeForService = (id: string) => {
    switch (id) {
      case 'active-adventures': return 'Active Adventure & Hiking';
      case 'culinary-expeditions': return 'Cultural & Historical Expedition';
      case 'yachting': return 'Gulet & Coastal Adventure';
      case 'bespoke-private': return 'Custom Private Tour';
      default: return 'Small Group Tour';
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#121316] text-white relative overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F05A28]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
            <Users className="w-4 h-4" />
            <span>B2B Inbound Operations & DMC Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-white leading-tight">
            Comprehensive Ground Services <br />
            <span className="italic font-light text-neutral-300">For Global Tour Operators & Travel Agencies</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            We act as your dedicated Turkish ground operations engine. From small-group scheduled departures (2–14 guests) to tailor-made private VIP journeys, we deliver turnkey white-label operations, net confidential agent pricing, licensed scholar guides, and 24/7 client dispatch.
          </p>
        </div>

        {/* Tabbed Interactive Service Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Column (Left) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Service selector list */}
            <div className="space-y-2.5">
              {servicesList.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-start justify-between group border ${
                      isActive 
                        ? 'bg-neutral-850 border-[#F05A28] shadow-lg shadow-[#F05A28]/15 ring-1 ring-[#F05A28]/40' 
                        : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-[#F05A28] text-white shadow-sm' 
                          : 'bg-neutral-800 text-neutral-400 group-hover:text-white'
                      }`}>
                        {getIcon(service.icon)}
                      </div>
                      <div>
                        <div className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : 'text-neutral-200 group-hover:text-white'}`}>
                          {service.title}
                        </div>
                        <div className="text-xs text-neutral-400 mt-1 line-clamp-1">
                          {service.shortDesc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 mt-1 shrink-0 transition-transform ${
                      isActive ? 'text-[#F05A28] translate-x-1' : 'text-neutral-600 group-hover:text-neutral-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* B2B Assurance Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>B2B Tour Operator Guarantee</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Wholesale net confidential rates, white-label guest documentation, zero forced commercial shopping, and guaranteed client non-solicitation for international travel advisors.
              </p>
              <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TÜRSAB A-Grade #A-15764</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>&lt;24h Quote Turnaround</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TUREB Scholar Guides</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mercedes VIP Fleet</span>
                </div>
              </div>
            </div>

            {/* Operational Hubs & Field Coverage */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>In-Country Regional Hubs</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  24/7 Active Dispatch
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-neutral-850/80 border border-neutral-800/60 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-[11px]">Istanbul HQ</div>
                    <div className="text-[10px] text-neutral-400">Sisli Operations & Port</div>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-neutral-850/80 border border-neutral-800/60 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-[11px]">Cappadocia</div>
                    <div className="text-[10px] text-neutral-400">Goreme & Valley Station</div>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-neutral-850/80 border border-neutral-800/60 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-[11px]">Turquoise Coast</div>
                    <div className="text-[10px] text-neutral-400">Fethiye, Gocek & Kas</div>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-neutral-850/80 border border-neutral-800/60 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white text-[11px]">Aegean Office</div>
                    <div className="text-[10px] text-neutral-400">Izmir, Ephesus & Bodrum</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Partner Contact Callout */}
            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Trade Partner Direct Line</span>
              </div>
              <a 
                href="https://wa.me/905448362845?text=Hello%20Baobab%20DMC%20Team%2C%20I%20would%20like%20to%20discuss%20partnering%20for%20inbound%20Turkey%20groups"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F05A28] hover:text-[#D94526] font-semibold text-[11px] underline"
              >
                +90 544 836 28 45
              </a>
            </div>
          </div>

          {/* Active Showcase Area (Right) - Interactive Turkiye Map & Program Blueprint */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* View Switcher Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 bg-neutral-900/90 border border-neutral-800 rounded-xl shadow-lg">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'map'
                      ? 'bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/25 ring-1 ring-[#F05A28]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Interactive Turkiye POI Map</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/30 text-[10px] font-bold text-amber-300">
                    24 POIs
                  </span>
                </button>

                <button
                  onClick={() => setViewMode('blueprint')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'blueprint'
                      ? 'bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/25 ring-1 ring-[#F05A28]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Program Specs ({activeService.title})</span>
                </button>
              </div>

              <div className="flex items-center gap-2 px-2 text-[11px] text-neutral-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Click POI pins for photo overview & DMC tips</span>
              </div>
            </div>

            {viewMode === 'map' ? (
              <InteractiveTurkiyeMap onOpenInquiry={onOpenInquiry} />
            ) : (
              <div className="bg-neutral-900/85 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between">
                {/* Image Header with Stat Badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                  
                  {activeService.stats && (
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-right shadow-lg">
                      <div className="text-xl font-serif font-bold text-[#F05A28]">
                        {activeService.stats.value}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                        {activeService.stats.label}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#F05A28] text-white">
                        Core Specialization
                      </span>
                      <span className="text-xs text-neutral-300 font-medium">
                        {activeSpecs.groupSize}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Description & Specific Features */}
                <div className="p-6 sm:p-7 space-y-6">
                  <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed">
                    {activeService.fullDesc}
                  </p>

                  {/* Service Specifications Grid (Filled Information) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-neutral-850/90 border border-neutral-800">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#F05A28]" />
                        <span>Group Cap</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        {activeSpecs.groupSize.split('(')[0]}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-400" />
                        <span>Guiding Standard</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate" title={activeSpecs.guiding}>
                        TUREB Scholar
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                        <Car className="w-3 h-3 text-cyan-400" />
                        <span>Transportation</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate" title={activeSpecs.transit}>
                        VIP Mercedes Fleet
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                        <Bed className="w-3 h-3 text-amber-400" />
                        <span>Stays</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate" title={activeSpecs.stays}>
                        Boutique & Caves
                      </div>
                    </div>
                  </div>

                  {/* Popular Signature Routes for this Service */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28] flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Popular Signature Routes & Programs</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeSpecs.popularRoutes.map((route, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800/80 text-neutral-300 border border-neutral-700/60"
                        >
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Field Highlight Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-850 to-neutral-900 border border-neutral-700/60 space-y-1.5">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F05A28] shrink-0" />
                      <span>{activeSpecs.fieldHighlight.title}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {activeSpecs.fieldHighlight.description}
                    </p>
                  </div>

                  {/* Feature Checklist & Inclusions */}
                  <div className="space-y-3 pt-2 border-t border-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                        Included Capabilities & In-House Standards
                      </div>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        100% In-House Executed
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeSpecs.inclusions.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* B2B Partner White-Label Advantage */}
                  <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80 text-xs text-neutral-300 flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">White-Label & Trade Protection: </span>
                      <span>{activeSpecs.b2bNote}</span>
                    </div>
                  </div>

                  {/* Bottom CTA for Active Service */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800/80">
                    <div className="text-xs text-neutral-400 text-center sm:text-left">
                      Ready to construct a program around this service? <br />
                      <span className="text-neutral-300 font-medium">Quotes with confidential net tariffs delivered within 24h.</span>
                    </div>
                    <button
                      onClick={() => onOpenInquiry({ tripType: getTripTypeForService(activeService.id) })}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 group shrink-0"
                    >
                      <span>Inquire for {activeService.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Full-width 3-Step B2B Ground Handling Process Band */}
        <div className="mt-14 pt-10 border-t border-neutral-800/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              Turnkey Partner Workflow
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white">
              How We Execute Ground Handling For Your Agency
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F05A28] tracking-widest">STEP 01</span>
                <Clock className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="text-sm font-bold text-white">
                Bespoke Route Blueprint & Confidential Net Tariff
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Submit your group dates, passenger profile, and preferred pace. We deliver a meticulously timed day-by-day routing blueprint with transparent net wholesale pricing within 24 hours.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 tracking-widest">STEP 02</span>
                <Layers className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="text-sm font-bold text-white">
                White-Label Guest Packs & Co-Branded Collateral
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All client vouchers, day-by-day packing lists, rooming manifests, and digital app itineraries are prepared in your agency's name. Zero Baobab branding touches your traveler.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 tracking-widest">STEP 03</span>
                <ShieldCheck className="w-4 h-4 text-neutral-500" />
              </div>
              <h4 className="text-sm font-bold text-white">
                24/7 Operations Room & Executive Ground Chaperone
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                A dedicated duty manager monitors your group's live progress. From airport meet-and-greet to private Mercedes chauffeurs and licensed scholar guides, your travelers receive elite service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

