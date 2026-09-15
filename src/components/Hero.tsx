import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Compass,
  Video
} from 'lucide-react';
import { DESTINATIONS, COMPANY_CONTACT } from '../data/dmcData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onExploreDestinations: () => void;
  onSelectDestination: (destId: string) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=2400&q=90',
    location: 'Cappadocia, Central Anatolia',
    title: 'Surreal Lunar Valleys & Dawn Balloon Flights',
    subtitle: 'Small group valley trail hikes, sunrise balloons, and authentic boutique cave hotels.',
    destId: 'cappadocia'
  },
  {
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2000&q=90',
    location: 'Bosphorus Strait, Istanbul',
    title: 'Historic Quarters & Hidden Artisan Courtyards',
    subtitle: 'Small group cultural walks, Bosphorus sunset boats, and local culinary trails.',
    destId: 'istanbul'
  },
  {
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=90',
    location: 'Bodrum, Aegean Coast',
    title: 'Wooden Gulet Sailing & Secluded Coves',
    subtitle: 'Intimate handcrafted wooden gulets, swimming in aquamarine bays, and coastal walks.',
    destId: 'bodrum'
  },
  {
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=2000&q=90',
    location: 'Ancient Ephesus, Aegean',
    title: 'Classical Antiquity & Coastal Vineyards',
    subtitle: 'Scholar-guided Roman avenues, Urla artisan wineries, and charming stone villages.',
    destId: 'ephesus'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onOpenInquiry,
  onExploreDestinations,
  onSelectDestination,
  onOpenCalendly
}) => {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedType, setSelectedType] = useState<'Small Group Tour' | 'Active Adventure & Hiking' | 'Cultural & Historical Expedition' | 'Gulet & Coastal Adventure'>('Small Group Tour');
  const [guestCount, setGuestCount] = useState('6-10');

  const current = HERO_SLIDES[activeSlide];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenInquiry({
      tripType: selectedType,
      destinations: selectedDestination === 'all' ? ['Istanbul', 'Cappadocia'] : [selectedDestination],
      guestCount: guestCount === '2-5' ? 4 : guestCount === '6-10' ? 8 : guestCount === '11-14' ? 12 : 16
    });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden bg-[#121316] text-white">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.location}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 scale-105 transition-transform duration-[10000ms]' : 'opacity-0 scale-100 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.location}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
        {/* Gradients for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-[#121316]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316]/90 via-[#121316]/40 to-transparent" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-8 sm:pt-14 my-auto">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-neutral-200">
            <span className="w-2 h-2 rounded-full bg-[#F05A28] animate-pulse" />
            <span>{t('hero.badge')} • TURSAB #{COMPANY_CONTACT.tursabNumber}</span>
          </div>

          {/* Majestic Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.08]">
            {t('hero.titleLine1')} <br />
            <span className="italic font-light text-[#FAF9F6]">{t('hero.titleLine2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-300 font-sans font-normal leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-lg shadow-[#F05A28]/25 active:scale-95 group"
            >
              <span>{t('hero.ctaRequest')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {onOpenCalendly && (
              <button
                onClick={() => onOpenCalendly('b2b-discovery')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-[#111111]/85 hover:bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-sm backdrop-blur-md border border-white/20 hover:border-[#F05A28] transition-all duration-200 shadow-md active:scale-95 group"
              >
                <Video className="w-4 h-4 text-[#F05A28] group-hover:scale-110 transition-transform" />
                <span>{t('hero.ctaConsultation')}</span>
              </button>
            )}

            <button
              onClick={onExploreDestinations}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-sm backdrop-blur-md border border-white/20 transition-all duration-200"
            >
              <Compass className="w-4 h-4 text-[#F05A28]" />
              <span>{t('hero.ctaExplore')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Quick Planner & Slide Controller Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full mt-10">
        {/* Quick Inquiry Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-md p-3 sm:p-4 shadow-2xl border border-white/40 text-neutral-800">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            {/* Field 1: Destination */}
            <div className="p-2 sm:p-2.5 bg-[#FAF9F6] rounded border border-neutral-200/80">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#F05A28]">
                {t('hero.selectDestination')}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Turkey (Multi-Region Tour)</option>
                  <option value="Istanbul">Istanbul & Bosphorus</option>
                  <option value="Cappadocia">Cappadocia (Valleys & Balloons)</option>
                  <option value="Bodrum">Bodrum & Turquoise Coast</option>
                  <option value="Ephesus">Ephesus & Aegean Vineyards</option>
                  <option value="Antalya">Antalya & Lycian Way</option>
                  <option value="Gobeklitepe">Gobeklitepe & Mesopotamia</option>
                </select>
              </div>
            </div>

            {/* Field 2: Program Type */}
            <div className="p-2 sm:p-2.5 bg-[#FAF9F6] rounded border border-neutral-200/80">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#F05A28]">
                {t('hero.tourType')}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="w-4 h-4 text-neutral-500 shrink-0" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="Small Group Tour">Guided Small Group Tour</option>
                  <option value="Active Adventure & Hiking">Active Adventure & Hiking</option>
                  <option value="Cultural & Historical Expedition">Cultural & Historical Expedition</option>
                  <option value="Gulet & Coastal Adventure">Gulet & Coastal Sailing</option>
                </select>
              </div>
            </div>

            {/* Field 3: Group Scale */}
            <div className="p-2 sm:p-2.5 bg-[#FAF9F6] rounded border border-neutral-200/80">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#F05A28]">
                {t('hero.groupSize')}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-4 h-4 text-neutral-500 shrink-0" />
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="2-5">2 – 5 Guests (Private VIP Circle)</option>
                  <option value="6-10">6 – 10 Guests (Intimate Small Group)</option>
                  <option value="11-14">11 – 14 Guests (Standard Small Group)</option>
                  <option value="15+">15+ Guests (Custom Club or Family Group)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Search CTA */}
            <div className="h-full flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[46px] flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md active:scale-95"
              >
                <span>{t('hero.quickSearch')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Carousel Indicators & Active Landmark Tag */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{t('hero.currentViewing')}</span>
            <button
              onClick={() => onSelectDestination(current.destId)}
              className="text-white font-semibold hover:text-[#F05A28] underline underline-offset-4 decoration-[#F05A28]"
            >
              {current.location}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.location}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-8 bg-[#F05A28]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
