import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { SocialMediaLinks } from './SocialMediaLinks';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe2,
  CalendarDays,
  Sparkles,
  Building2
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/dmcData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
  onOpenB2BPanel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onOpenInquiry, 
  onOpenCalendly: _onOpenCalendly, 
  onOpenB2BPanel
}) => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setDestinationsDropdownOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      {/* Top Utility Bar - Trust & Direct Contact */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div 
          className={`hidden md:flex justify-between items-center px-6 lg:px-12 py-1.5 text-xs transition-colors duration-300 border-b ${
            scrolled 
              ? 'bg-[#121316] text-[#A09A92] border-[#2E2E2E]' 
              : 'bg-[#121316]/90 text-neutral-300 border-white/10 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('topbar.tursab')}</span>
            </div>
            <span className="hidden lg:inline text-neutral-500">•</span>
            <div className="hidden lg:flex items-center gap-1 text-neutral-300">
              <Globe2 className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>{t('topbar.b2bTag')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6 text-neutral-300">
            {/* Social Icons */}
            <div className="hidden xl:flex items-center border-r border-neutral-700/80 pr-4">
              <SocialMediaLinks variant="dark" size="sm" />
            </div>

            <a 
              href={`tel:${COMPANY_CONTACT.phoneRaw}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Turkiye Office (HQ) Phone"
            >
              <Phone className="w-3 h-3 text-[#F05A28]" />
              <span className="font-medium">TR: {COMPANY_CONTACT.phone}</span>
            </a>

            <span className="hidden xl:inline text-neutral-600">•</span>

            <a 
              href={`tel:${COMPANY_CONTACT.phoneUsRaw}`} 
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors text-neutral-300"
              title="USA Office (Branch) Phone"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span className="font-medium">US: {COMPANY_CONTACT.phoneUs}</span>
            </a>

            <span className="hidden sm:inline text-neutral-600">•</span>

            <a 
              href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20inquire%20about%20a%20small%20group%20tour%20or%20adventure%20in%20Turkey`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`w-full transition-all duration-300 px-5 sm:px-8 lg:px-12 py-3 flex items-center justify-between border-b ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-sm border-neutral-200/80'
              : 'bg-white/90 backdrop-blur-md border-neutral-200/50'
          }`}
        >
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="text-left group transition-transform active:scale-95"
            aria-label="Baobab DMC Home"
          >
            <Logo variant="light" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7 text-[13px] xl:text-[13.5px] font-medium tracking-normal text-neutral-700">
            {/* Destinations Dropdown */}
            <div className="relative group" onMouseLeave={() => setDestinationsDropdownOpen(false)}>
              <button
                onClick={() => handleNavClick('destinations')}
                onMouseEnter={() => setDestinationsDropdownOpen(true)}
                className="flex items-center gap-1 py-2 hover:text-[#F05A28] transition-colors"
              >
                <span>{t('nav.destinations')}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-neutral-400" />
              </button>

              {/* Mega Dropdown */}
              {destinationsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-80 bg-white rounded-md shadow-xl border border-neutral-200/80 p-3.5 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => setDestinationsDropdownOpen(true)}
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#F05A28] px-2.5 py-1 mb-1">
                    Featured Regions
                  </div>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Istanbul</div>
                      <div className="text-xs text-neutral-500">Bosphorus, Historic Quarters & Hidden Hans</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Cappadocia</div>
                      <div className="text-xs text-neutral-500">Valley Treks, Cave Hotels & Hot Air Balloons</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Turkish Riviera & Lycian Coast</div>
                      <div className="text-xs text-neutral-500">Antalya, Kas, Sunken Ruins & Gulets</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Aegean Turkiye & Ephesus</div>
                      <div className="text-xs text-neutral-500">Greco-Roman Antiquity, Vineyards & Olive Groves</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Black Sea & Pontic Alps</div>
                      <div className="text-xs text-neutral-500">Cloud Forests, Tea Hills & Sumela Monastery</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Troy, Gallipoli & North Aegean</div>
                      <div className="text-xs text-neutral-500">Homeric Legends, Dardanelles & Assos</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-neutral-50 flex items-center justify-between group/item transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">Eastern & Southeastern Anatolia</div>
                      <div className="text-xs text-neutral-500">12,000-Year Gobeklitepe & Mount Nemrut</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#F05A28]" />
                  </button>
                  <div className="mt-2 pt-2 border-t border-neutral-100 px-2.5 flex items-center justify-between text-xs text-[#F05A28] font-semibold">
                    <button onClick={() => handleNavClick('destinations')} className="hover:underline flex items-center gap-1">
                      <span>Explore all major destinations of Turkiye</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Turkey Trips Catalog Link */}
            <button
              onClick={() => handleNavClick('trips')}
              className="py-2 hover:text-[#F05A28] transition-colors"
            >
              {t('nav.trips')}
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className="py-2 hover:text-[#F05A28] transition-colors"
            >
              {t('nav.services')}
            </button>

            <button
              onClick={() => handleNavClick('itineraries')}
              className="py-2 hover:text-[#F05A28] transition-colors"
            >
              {t('nav.itineraries')}
            </button>

            <button
              onClick={() => handleNavClick('venues')}
              className="py-2 hover:text-[#F05A28] transition-colors"
            >
              {t('nav.lodges')}
            </button>

            <button
              onClick={() => handleNavClick('partner')}
              className="py-2 hover:text-[#F05A28] transition-colors text-[#F05A28] font-semibold"
            >
              {t('nav.partner')}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="py-2 hover:text-[#F05A28] transition-colors"
            >
              {t('nav.whyBaobab')}
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className="py-2 hover:text-[#F05A28] transition-colors font-semibold"
            >
              {t('nav.blog')}
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className="py-2 hover:text-[#F05A28] transition-colors"
            >
              Partner FAQ
            </button>
          </div>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onOpenInquiry()}
              className="relative inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-sm active:scale-95 group"
            >
              <CalendarDays className="w-3.5 h-3.5 text-white" />
              <span>{t('nav.requestProposal')}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenInquiry()}
              className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-xs transition-colors"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-sm focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Content */}
          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 pt-20 z-50 overflow-y-auto animate-in slide-in-from-right duration-250">
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200 flex items-center justify-between">
                <Logo variant="light" size="sm" />
                <LanguageSelector variant="light" />
              </div>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Specialized Destination Management Company in Turkey for small group tours, guided trekking, and bespoke cultural adventures.
              </p>

              <div className="py-2 border-y border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Social Channels</span>
                <SocialMediaLinks variant="light" size="sm" />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-3 font-medium text-base text-neutral-800">
                <button
                  onClick={() => handleNavClick('destinations')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Destinations in Turkey</span>
                  <span className="text-xs bg-[#F05A28]/10 text-[#F05A28] px-2 py-0.5 rounded font-semibold">Explore</span>
                </button>
                <button
                  onClick={() => handleNavClick('trips')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Guided Trips & Expeditions</span>
                  <span className="text-xs text-[#F05A28]">View →</span>
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Small Group Tours & Adventures</span>
                  <span className="text-xs text-neutral-400">→</span>
                </button>
                <button
                  onClick={() => handleNavClick('itineraries')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Curated Tour Programs</span>
                  <span className="text-xs text-neutral-400">→</span>
                </button>
                <button
                  onClick={() => handleNavClick('venues')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Boutique Lodges & Sanctuaries</span>
                  <span className="text-xs text-neutral-400">→</span>
                </button>
                <button
                  onClick={() => handleNavClick('partner')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 text-[#F05A28] font-semibold"
                >
                  <span>Partner With Us (B2B Trade)</span>
                  <span className="text-xs text-[#F05A28]">→</span>
                </button>
                {onOpenB2BPanel && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenB2BPanel();
                    }}
                    className="flex items-center justify-between py-2.5 px-3 bg-neutral-900 text-white rounded text-left font-bold text-xs shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#F05A28]" />
                      <span>B2B Partner Portal & Tariffs</span>
                    </div>
                    <span className="text-[10px] bg-[#F05A28] text-white px-2 py-0.5 rounded uppercase tracking-wider">Hub</span>
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('about')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Why Baobab DMC</span>
                  <span className="text-xs text-neutral-400">→</span>
                </button>
                <button
                  onClick={() => handleNavClick('blog')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28] font-semibold text-[#F05A28]"
                >
                  <span>{t('nav.blog')}</span>
                  <span className="text-xs text-[#F05A28]">→</span>
                </button>
                <button
                  onClick={() => handleNavClick('faq')}
                  className="flex items-center justify-between py-2 text-left border-b border-neutral-100 hover:text-[#F05A28]"
                >
                  <span>Partner FAQ</span>
                  <span className="text-xs text-neutral-400">→</span>
                </button>
              </div>

              {/* Inquiry Action Callout */}
              <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Small Group Tour Inquiries</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Planning an intimate group tour, hiking adventure, or cultural expedition in Turkey? Receive detailed proposals within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full py-2.5 bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#D94526] transition-colors"
                >
                  Plan Your Tour / Proposal
                </button>
              </div>
            </div>

            {/* Direct Contact in Mobile Drawer */}
            <div className="pt-6 border-t border-neutral-200 space-y-3 text-xs">
              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20inquire%20about%20a%20small%20group%20tour%20in%20Turkey`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
              </a>
              <div className="space-y-2 text-neutral-500 pt-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span>TURSAB #{COMPANY_CONTACT.tursabNumber}</span>
                  <span className="text-neutral-600 font-medium">{COMPANY_CONTACT.businessHours}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-800 font-semibold text-xs">
                  <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="hover:text-[#F05A28]">
                    TR: {COMPANY_CONTACT.phone}
                  </a>
                  <a href={`tel:${COMPANY_CONTACT.phoneUsRaw}`} className="hover:text-[#F05A28]">
                    US: {COMPANY_CONTACT.phoneUs}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
