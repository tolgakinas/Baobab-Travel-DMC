import React from 'react';
import { Logo } from './Logo';
import { SocialMediaLinks } from './SocialMediaLinks';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Globe2, 
  ArrowUp,
  Clock,
  Video
} from 'lucide-react';
import { DESTINATIONS, COMPANY_CONTACT } from '../data/dmcData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectDestination: (destId: string) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectDestination,
  onOpenInquiry,
  onOpenCalendly,
}) => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111113] text-neutral-300 border-t border-neutral-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800/80">
          {/* Col 1: Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="dark" size="md" />
            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            {/* Social Media Links in Footer */}
            <div className="pt-1 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                {t('footer.social')}
              </div>
              <SocialMediaLinks variant="dark" size="md" showLabels={true} />
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>TURSAB Licensed Agency #{COMPANY_CONTACT.tursabNumber} (A-Grade)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4 shrink-0 text-[#F05A28]" />
                <span>24/7 Operations Desk for Travel Planners & Guests</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20inquire%20about%20a%20small%20group%20tour%20in%20Turkey`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
              </a>
              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>{COMPANY_CONTACT.phone}</span>
              </a>
              {onOpenCalendly && (
                <button
                  onClick={() => onOpenCalendly('b2b-discovery')}
                  className="px-4 py-2 bg-[#F05A28]/20 hover:bg-[#F05A28]/30 text-[#F05A28] border border-[#F05A28]/40 rounded text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Book Consultation (Calendly)</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Destinations (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              Major Turkiye Destinations
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              {DESTINATIONS.map(d => (
                <li key={d.id}>
                  <button
                    onClick={() => {
                      onSelectDestination(d.id);
                      onNavigate('destinations');
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="text-neutral-600">›</span>
                    <span className="line-clamp-1">{d.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              B2B Trade & DMC
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('partner')} className="hover:text-white text-[#F05A28] font-semibold transition-colors">
                  Partner With Us (B2B)
                </button>
              </li>
              {onOpenCalendly && (
                <li>
                  <button 
                    onClick={() => onOpenCalendly('b2b-discovery')} 
                    className="hover:text-white text-neutral-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    <Video className="w-3 h-3 text-[#F05A28]" />
                    <span>Book 1-on-1 Call (Calendly)</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('trips')} className="hover:text-white transition-colors">
                  Turkey Trips Portfolio (15)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Small Group Tours (6–14)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Active Treks & Hiking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Turquoise Coast Gulets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('venues')} className="hover:text-white transition-colors">
                  Boutique Cave Suites & Lodges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Why Baobab DMC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white text-[#F05A28] font-semibold transition-colors">
                  Turkey Travel Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations Offices (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              Head Office & Contact
            </div>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Istanbul Headquarters</span>
                </div>
                <p className="text-neutral-400 leading-relaxed pl-5">
                  {COMPANY_CONTACT.address}
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-neutral-800">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Registration</span>
                </div>
                <p className="text-neutral-400 leading-relaxed pl-5">
                  TURSAB Certificate #{COMPANY_CONTACT.tursabNumber}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F05A28]" />
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-white hover:underline">
                    {COMPANY_CONTACT.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F05A28]" />
                  <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="text-white hover:underline">
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Baobab DMC. TURSAB #{COMPANY_CONTACT.tursabNumber}. All rights reserved. Specialized in small group tours & adventures in Turkey.
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector variant="dark" />
            <button onClick={() => onNavigate('about')} className="hover:text-neutral-300">
              Privacy Policy & Terms
            </button>
            <button onClick={() => onOpenInquiry()} className="hover:text-[#F05A28] text-neutral-300 font-semibold">
              Tour Inquiry
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 bg-neutral-800 hover:bg-[#F05A28] text-white rounded transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
