import React from 'react';
import { Logo } from './Logo';
import { SocialMediaLinks } from './SocialMediaLinks';
import { LanguageSelector } from './LanguageSelector';
import { AccreditationLogos } from './AccreditationLogos';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Shield,
  Globe2, 
  ArrowUp,
  Clock,
  Video,
  Layers,
  FileCode,
  Scale,
  Compass,
  Briefcase,
  Users,
  Mountain,
  Anchor,
  Building2,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
  Leaf,
  HeartHandshake,
  ExternalLink
} from 'lucide-react';
import { DESTINATIONS, COMPANY_CONTACT } from '../data/dmcData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectDestination: (destId: string) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
  onOpenSitemap?: () => void;
  onOpenModernSlavery?: () => void;
  onOpenSustainableTourism?: () => void;
  onOpenResponsibleTravel?: () => void;
  onOpenB2BPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectDestination,
  onOpenInquiry,
  onOpenCalendly,
  onOpenSitemap,
  onOpenModernSlavery,
  onOpenSustainableTourism,
  onOpenResponsibleTravel,
  onOpenB2BPanel,
}) => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101012] text-neutral-300 border-t border-neutral-800 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-neutral-800/80">
          {/* Col 1: Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="dark" size="md" />
            
            <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            {/* Trust Highlights with Symbols */}
            <div className="space-y-2.5 pt-1 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900/80 border border-neutral-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-neutral-200">
                  TÜRSAB Licensed A-Grade Operator #{COMPANY_CONTACT.tursabNumber}
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-2 py-1 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
                <span>24/7 Operations Desk for Travel Advisors & Groups</span>
              </div>
              <div className="flex items-center gap-2.5 px-2 py-1 text-neutral-400">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Istanbul • Cappadocia • Aegean • Turquoise Coast</span>
              </div>
            </div>

            {/* Quick Action Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {onOpenB2BPanel && (
                <button
                  onClick={onOpenB2BPanel}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-emerald-400 hover:text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2 transition-all border border-emerald-500/40 hover:border-emerald-500/70 shadow-sm hover:scale-[1.02]"
                  title="Open B2B Partner Portal & Confidential Net Tariffs"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>B2B Partner Hub</span>
                </button>
              )}

              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20inquire%20about%20a%20small%20group%20tour%20in%20Turkey`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:scale-[1.02]"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all border border-neutral-700/60"
                title="Turkiye Office (HQ) Phone"
              >
                <Phone className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>TR: {COMPANY_CONTACT.phone}</span>
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phoneUsRaw}`}
                className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all border border-neutral-700/60"
                title="USA Office (Branch) Phone"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>US: {COMPANY_CONTACT.phoneUs}</span>
              </a>

              {onOpenCalendly && (
                <button
                  onClick={() => onOpenCalendly('b2b-discovery')}
                  className="px-3.5 py-2 bg-[#F05A28]/15 hover:bg-[#F05A28]/25 text-[#F05A28] border border-[#F05A28]/35 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              )}
            </div>

            {/* Social Media Links */}
            <div className="pt-3 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                <Globe2 className="w-3 h-3 text-[#F05A28]" />
                <span>{t('footer.social')}</span>
              </div>
              <SocialMediaLinks variant="dark" size="md" showLabels={true} />
            </div>
          </div>

          {/* Col 2: Destinations (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#F05A28]" />
              <span>Major Turkiye Destinations</span>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-300">
              {DESTINATIONS.map(d => (
                <li key={d.id}>
                  <button
                    onClick={() => {
                      onSelectDestination(d.id);
                      onNavigate('destinations');
                    }}
                    className="group hover:text-white transition-colors flex items-center gap-2 text-left w-full"
                  >
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                    <span className="truncate group-hover:translate-x-0.5 transition-transform">{d.name}</span>
                    <ChevronRight className="w-3 h-3 text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-[#F05A28] ml-auto shrink-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#F05A28]" />
              <span>B2B Trade & DMC</span>
            </div>

            <ul className="space-y-2.5 text-xs text-neutral-300">
              {onOpenB2BPanel && (
                <li>
                  <button 
                    onClick={onOpenB2BPanel} 
                    className="group hover:text-white text-emerald-400 font-bold transition-colors flex items-center gap-2"
                  >
                    <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>B2B Partner Portal (Hub)</span>
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={() => onNavigate('partner')} 
                  className="group hover:text-white text-[#F05A28] font-semibold transition-colors flex items-center gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
                  <span>Partner With Us (B2B)</span>
                </button>
              </li>
              {onOpenCalendly && (
                <li>
                  <button 
                    onClick={() => onOpenCalendly('b2b-discovery')} 
                    className="group hover:text-white text-neutral-200 font-semibold transition-colors flex items-center gap-2"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Book 1-on-1 Call</span>
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={() => onNavigate('trips')} 
                  className="group hover:text-white transition-colors flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
                >
                  <Compass className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                  <span>Turkey Trips Portfolio (15)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="group hover:text-white transition-colors flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
                >
                  <Users className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                  <span>Small Group Tours (6–14)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="group hover:text-white transition-colors flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
                >
                  <Mountain className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                  <span>Active Treks & Hiking</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="group hover:text-white transition-colors flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
                >
                  <Anchor className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                  <span>Turquoise Coast Gulets</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('venues')} 
                  className="group hover:text-white transition-colors flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
                >
                  <Building2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                  <span>Boutique Cave Suites</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="group hover:text-white transition-colors flex items-center gap-2 text-neutral-400 hover:text-neutral-200"
                >
                  <Award className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F05A28] shrink-0 transition-colors" />
                  <span>Why Baobab DMC</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')} 
                  className="group hover:text-white text-[#F05A28] font-semibold transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
                  <span>Travel Blog & Guides</span>
                </button>
              </li>
              {onOpenSustainableTourism && (
                <li>
                  <button 
                    onClick={onOpenSustainableTourism} 
                    className="group hover:text-white text-emerald-400 font-medium transition-colors flex items-center gap-2"
                    title="Sustainable Tourism Policy, ESG & Carbon Minimization (Travelife, GoTürkiye & UN Tourism)"
                  >
                    <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sustainable Tourism</span>
                  </button>
                </li>
              )}
              {onOpenResponsibleTravel && (
                <li>
                  <button 
                    onClick={onOpenResponsibleTravel} 
                    className="group hover:text-white text-orange-300 font-medium transition-colors flex items-center gap-2"
                    title="Responsible Travel Code & Cultural Etiquette in Turkey"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
                    <span>Responsible Travel</span>
                  </button>
                </li>
              )}
              {onOpenModernSlavery && (
                <li>
                  <button 
                    onClick={onOpenModernSlavery} 
                    className="group hover:text-white text-neutral-300 font-medium transition-colors flex items-center gap-2"
                    title="Modern Slavery Act 2015 Statement & Human Rights Policy"
                  >
                    <Scale className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 shrink-0" />
                    <span>Modern Slavery Act</span>
                  </button>
                </li>
              )}
              {onOpenSitemap && (
                <li className="pt-1">
                  <button 
                    onClick={onOpenSitemap} 
                    className="group hover:text-white text-neutral-300 font-semibold transition-colors flex items-center gap-2"
                    title="View complete website directory & architecture"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#F05A28] group-hover:scale-110 transition-transform shrink-0" />
                    <span>Site Map (Directory)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Operations Offices (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F05A28] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#F05A28]" />
              <span>Global Offices & Contact</span>
            </div>

            <div className="space-y-3 text-xs text-neutral-400">
              {/* Turkiye HQ */}
              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                <div className="font-bold text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F05A28] shrink-0" />
                    <span>Turkiye Office (HQ)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    TÜRSAB #{COMPANY_CONTACT.tursabNumber}
                  </span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-[11px] pl-6">
                  {COMPANY_CONTACT.turkiyeOffice.address}
                </p>
                <div className="pl-6 pt-1 space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Phone className="w-3 h-3 text-[#F05A28] shrink-0" />
                    <span>Phone (TR): <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="text-white hover:underline">{COMPANY_CONTACT.phone}</a></span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MessageSquare className="w-3 h-3 fill-current shrink-0" />
                    <span>Mobile/WhatsApp: <a href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}`} target="_blank" rel="noreferrer" className="hover:underline">{COMPANY_CONTACT.whatsapp}</a></span>
                  </div>
                </div>
              </div>

              {/* USA Branch */}
              <div className="space-y-1.5 p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                <div className="font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>USA Office (Branch)</span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-[11px] pl-6">
                  {COMPANY_CONTACT.usaOffice.address}
                </p>
                <div className="pl-6 pt-1 text-[11px]">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Phone (US): <a href={`tel:${COMPANY_CONTACT.phoneUsRaw}`} className="text-white hover:underline">{COMPANY_CONTACT.phoneUs}</a></span>
                  </div>
                </div>
              </div>

              {/* Email & Business Hours */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 text-neutral-300">
                  <Mail className="w-4 h-4 text-[#F05A28] shrink-0" />
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-white hover:underline truncate">
                    {COMPANY_CONTACT.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-neutral-300 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Business Hours: <strong className="text-white font-medium">{COMPANY_CONTACT.businessHours}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability & Responsible Travel Benchmark Frameworks */}
        <div className="py-6 border-b border-neutral-800/80 bg-neutral-900/40 -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 my-2">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Sustainability & Responsible Travel Commitments
                </div>
                <div className="text-xs text-neutral-300">
                  Small-group low-impact operations aligned with leading international and national sustainable tourism frameworks:
                </div>
              </div>
            </div>

            {/* External Benchmark Source Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <a 
                href="https://www.travelife.info" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-neutral-800/90 hover:bg-neutral-800 text-emerald-300 hover:text-white border border-emerald-500/30 flex items-center gap-1.5 transition-all group"
                title="Travelife Sustainability System for Tour Operators"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">Travelife.info</span>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              <a 
                href="https://goturkiye.com/sustainable" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-neutral-800/90 hover:bg-neutral-800 text-[#F05A28] hover:text-white border border-[#F05A28]/35 flex items-center gap-1.5 transition-all group"
                title="GoTürkiye Sustainable Tourism Program (Ministry of Culture & Tourism + GSTC)"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#F05A28]" />
                <span className="font-semibold">GoTürkiye Sustainable</span>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-[#F05A28] transition-colors" />
              </a>

              <a 
                href="https://www.untourism.int/sustainable-development" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-neutral-800/90 hover:bg-neutral-800 text-cyan-300 hover:text-white border border-cyan-500/30 flex items-center gap-1.5 transition-all group"
                title="United Nations Tourism Sustainable Development Goals (SDGs)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold">UN Tourism (SDGs)</span>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Industry Accreditations & Tourism Guild Memberships: TUREB, TURSAB, ASTA, ATTA, ITO */}
        <div className="py-10 border-b border-neutral-800/80">
          <AccreditationLogos />
        </div>

        {/* Bottom Legal & Utility Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-neutral-400 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              © {new Date().getFullYear()} Baobab DMC. TÜRSAB #{COMPANY_CONTACT.tursabNumber}. Specialized incoming small group tours & adventures in Turkey.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <LanguageSelector variant="dark" />

            {onOpenB2BPanel && (
              <button 
                onClick={onOpenB2BPanel} 
                className="hover:text-emerald-300 text-emerald-400 font-semibold flex items-center gap-1.5 transition-colors"
                title="B2B Partner Portal & Confidential Net Tariffs"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>B2B Portal</span>
              </button>
            )}

            {onOpenSustainableTourism && (
              <button 
                onClick={onOpenSustainableTourism} 
                className="hover:text-emerald-400 text-neutral-300 flex items-center gap-1.5 transition-colors"
                title="Sustainable Tourism Policy & Commitments"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sustainable Tourism</span>
              </button>
            )}

            {onOpenResponsibleTravel && (
              <button 
                onClick={onOpenResponsibleTravel} 
                className="hover:text-orange-300 text-neutral-300 flex items-center gap-1.5 transition-colors"
                title="Responsible Travel Code & Guidelines"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Responsible Travel</span>
              </button>
            )}

            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-white text-neutral-400 flex items-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-neutral-500" />
              <span>Privacy & Terms</span>
            </button>

            {onOpenModernSlavery && (
              <button 
                onClick={onOpenModernSlavery} 
                className="hover:text-white text-neutral-300 flex items-center gap-1.5 transition-colors"
                title="Modern Slavery Act 2015 Transparency Statement"
              >
                <Scale className="w-3.5 h-3.5 text-neutral-400 hover:text-emerald-400" />
                <span>Modern Slavery Act</span>
              </button>
            )}

            {onOpenSitemap && (
              <button 
                onClick={onOpenSitemap} 
                className="hover:text-[#F05A28] text-neutral-300 font-medium flex items-center gap-1.5 transition-colors"
                title="View full website sitemap directory"
              >
                <Layers className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Site Map</span>
              </button>
            )}

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-neutral-400 flex items-center gap-1.5 transition-colors"
              title="View machine-readable XML sitemap"
            >
              <FileCode className="w-3.5 h-3.5 text-neutral-500" />
              <span>XML Sitemap</span>
            </a>

            <button 
              onClick={() => onOpenInquiry()} 
              className="px-3 py-1.5 rounded-md bg-[#F05A28]/20 hover:bg-[#F05A28] text-[#F05A28] hover:text-white font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tour Inquiry</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 bg-neutral-800/90 hover:bg-[#F05A28] text-white rounded-lg transition-colors border border-neutral-700/60 shadow-sm"
              aria-label="Scroll back to top"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
