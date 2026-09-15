import React, { useState } from 'react';
import { DMC_SERVICES } from '../data/dmcData';
import { DmcService } from '../types';
import { 
  Users, 
  Compass, 
  Utensils, 
  Anchor, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(DMC_SERVICES[0].id);

  const activeService = DMC_SERVICES.find(s => s.id === activeServiceId) || DMC_SERVICES[0];

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
          <div className="lg:col-span-5 space-y-2.5">
            {DMC_SERVICES.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`w-full text-left p-4 rounded-md transition-all duration-200 flex items-start justify-between group border ${
                    isActive 
                      ? 'bg-neutral-800/90 border-[#F05A28] shadow-lg shadow-[#F05A28]/10' 
                      : 'bg-neutral-900/40 border-neutral-800 hover:bg-neutral-800/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded transition-colors ${
                      isActive 
                        ? 'bg-[#F05A28] text-white' 
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
                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${
                    isActive ? 'text-[#F05A28] translate-x-1' : 'text-neutral-600 group-hover:text-neutral-400'
                  }`} />
                </button>
              );
            })}

            {/* B2B Assurance Box */}
            <div className="p-4 rounded-md bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>B2B Tour Operator Guarantee</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Wholesale net rates, white-label client documentation, transparent operational margins, and guaranteed partner protection for international agencies and group organizers.
              </p>
            </div>
          </div>

          {/* Active Service Deep Dive Card (Right) */}
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-md overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Image Header with Stat Badge */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
              
              {activeService.stats && (
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded border border-white/10 text-right">
                  <div className="text-xl font-serif font-bold text-[#F05A28]">
                    {activeService.stats.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {activeService.stats.label}
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
                  Core Specialization
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {activeService.title}
                </h3>
              </div>
            </div>

            {/* Description & Specific Features */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                {activeService.fullDesc}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-4 border-t border-neutral-800">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Included Capabilities & In-House Standards
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA for Active Service */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  Ready to construct a tour around this service?
                </div>
                <button
                  onClick={() => onOpenInquiry({ tripType: getTripTypeForService(activeService.id) })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md active:scale-95 group"
                >
                  <span>Plan Tour for {activeService.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
