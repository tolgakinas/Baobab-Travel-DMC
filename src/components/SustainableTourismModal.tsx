import React, { useEffect } from 'react';
import { 
  X, 
  Leaf, 
  Globe2, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  Building2, 
  CheckCircle2, 
  HeartHandshake, 
  Droplets, 
  Wind, 
  Compass, 
  Anchor, 
  Scale, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/dmcData';

interface SustainableTourismModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToResponsibleTravel?: () => void;
  onOpenInquiry?: (initialData?: Record<string, any>) => void;
}

export const SustainableTourismModal: React.FC<SustainableTourismModalProps> = ({
  isOpen,
  onClose,
  onSwitchToResponsibleTravel,
  onOpenInquiry
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sustainability-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white text-neutral-900 w-full max-w-4xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col z-10 overflow-hidden border border-neutral-200">
        
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Environmental & Social Governance
                </span>
                <span className="text-neutral-500 text-xs">•</span>
                <span className="text-[10px] font-semibold text-neutral-400">
                  Official DMC Policy
                </span>
              </div>
              <h2 id="sustainability-title" className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                Sustainable Tourism Policy & Commitments
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Print sustainability policy document"
              aria-label="Print policy"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-neutral-800 font-sans text-sm leading-relaxed">
          
          {/* Executive Summary Banner */}
          <div className="p-5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Small-Group Low-Impact Philosophy</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              As an incoming Destination Management Company (DMC) operating exclusively for boutique small groups (6–14 guests), private departures, and experiential journeys in Turkey, Baobab DMC recognizes that tourism has a direct impact on fragile ecosystems, cultural heritage, and local host communities. We are committed to minimizing our environmental footprint, safeguarding Anatolia’s natural and historical treasures, and ensuring equitable economic prosperity for local Turkish partners.
            </p>
          </div>

          {/* Official Benchmark Sources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              International & National Benchmark Frameworks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Travelife Card */}
              <a
                href="https://www.travelife.info"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#FAF9F6] border border-neutral-200 hover:border-emerald-500/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-emerald-600">
                    <span className="text-[11px] font-bold uppercase tracking-wider">International Standard</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div className="font-serif font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                    Travelife for Tour Operators
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Global sustainability management certification dedicated to tour operators and travel agents, evaluating environmental management, internal practices, and supply chain ethics.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <span>www.travelife.info</span>
                </div>
              </a>

              {/* Türkiye Sustainable Tourism Program Card */}
              <a
                href="https://goturkiye.com/sustainable"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#FAF9F6] border border-neutral-200 hover:border-[#F05A28]/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[#F05A28]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">National Program</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#F05A28] transition-colors" />
                  </div>
                  <div className="font-serif font-bold text-neutral-900 group-hover:text-[#F05A28] transition-colors">
                    Türkiye Sustainable Tourism
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Developed by the Turkish Ministry of Culture and Tourism (TGA) in formal collaboration with the Global Sustainable Tourism Council (GSTC) to verify accommodations and operators across Turkey.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-[#F05A28]">
                  <span>goturkiye.com/sustainable</span>
                </div>
              </a>

              {/* UN Tourism Card */}
              <a
                href="https://www.untourism.int/sustainable-development"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#FAF9F6] border border-neutral-200 hover:border-cyan-600/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-cyan-700">
                    <span className="text-[11px] font-bold uppercase tracking-wider">United Nations</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-700 transition-colors" />
                  </div>
                  <div className="font-serif font-bold text-neutral-900 group-hover:text-cyan-800 transition-colors">
                    UN Tourism (UNWTO) SDGs
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    The 2030 Agenda for Sustainable Development advancing tourism's role in poverty eradication, environmental preservation, climate action, and community resilience.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-cyan-700">
                  <span>untourism.int/sustainable</span>
                </div>
              </a>
            </div>
          </div>

          {/* Core Policy Pillars */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              Our Five Operational Pillars of Sustainable Tourism
            </h3>

            {/* Pillar 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </div>
                <h4 className="text-base font-serif font-bold text-neutral-900">
                  Carbon Minimization & Resource Conservation
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 pl-8 leading-relaxed">
                We continuously audit transportation and logistics to optimize route efficiency and reduce greenhouse gas emissions:
              </p>
              <ul className="space-y-2 pl-8 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Small-Group Transport:</strong> Deploying modern, fuel-efficient Mercedes-Benz Sprinters and executive vans adhering to strict Euro-6 emissions standards, preventing engine idling during waiting periods.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Eliminating Single-Use Plastics:</strong> We prohibit single-use plastic water bottles on our vehicles and private gulets, equipping travelers with refillable water flasks and supplying large-capacity purified dispensers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Active & Human-Powered Itineraries:</strong> Prioritizing walking, hiking along the Lycian Way and St. Paul Trail, and sea kayaking in Kekova to replace vehicular transit whenever feasible.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </div>
                <h4 className="text-base font-serif font-bold text-neutral-900">
                  Supplier Verification & Türkiye Sustainable Tourism Alignment
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 pl-8 leading-relaxed">
                In compliance with the <a href="https://goturkiye.com/sustainable" target="_blank" rel="noopener noreferrer" className="text-[#F05A28] underline font-semibold">Türkiye Sustainable Tourism Program</a> recognized by GSTC:
              </p>
              <ul className="space-y-2 pl-8 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Eco-Certified Accommodations:</strong> We prioritize boutique cave hotels in Cappadocia, restored heritage mansions in Istanbul, and coastal lodges in Datça that have attained Stage 1, 2, or 3 Türkiye Sustainable Tourism Certification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Traditional Wooden Gulets:</strong> Our Blue Voyage gulet operators follow strict greywater containment, proper blackwater holding tank pump-out at certified marina stations, and energy-conserving anchor protocols that protect delicate seagrass beds.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <h4 className="text-base font-serif font-bold text-neutral-900">
                  Local Community Empowerment & Fair Living Wages
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 pl-8 leading-relaxed">
                In alignment with UN SDG 8 (Decent Work and Economic Growth):
              </p>
              <ul className="space-y-2 pl-8 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Local Scholar-Historians:</strong> We exclusively hire certified Turkish national guides and regional drivers, providing above-industry remuneration and year-round operational stability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Decentralized Economic Distribution:</strong> We avoid corporate souvenir complexes with aggressive commissions, routing group spending directly to village cooperatives, family-owned lokantas, and independent craftspeople across Anatolia.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                  4
                </div>
                <h4 className="text-base font-serif font-bold text-neutral-900">
                  Biodiversity, Natural Sanctuaries & Animal Welfare
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 pl-8 leading-relaxed">
                Guided by Travelife’s strict animal welfare and environmental standards:
              </p>
              <ul className="space-y-2 pl-8 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Wildlife Exploitation:</strong> We strictly prohibit visits to commercial dolphinariums, captive wild animal photo operations, and unregulated camel rides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Protected Habitat Protocols:</strong> In fragile geological zones such as Göreme National Park, Pamukkale travertines, and Kekova Sunken City, our guides enforce strict "Leave No Trace" conduct to preserve ancient stone and endemic vegetation.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                  5
                </div>
                <h4 className="text-base font-serif font-bold text-neutral-900">
                  Continuous Auditing & Travelife Partner Roadmap
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 pl-8 leading-relaxed">
                Baobab DMC is actively implementing the Travelife sustainability management system. We conduct regular internal audits of our supply chain, hotel partners, transport fleets, and office operations in Sisli, Istanbul, documenting measurable improvements each calendar year.
              </p>
            </div>
          </div>

          {/* Quick Cross-Link Banner */}
          {onSwitchToResponsibleTravel && (
            <div className="p-4 rounded-lg bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-6 h-6 text-[#F05A28] shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                    Complementary Code
                  </div>
                  <div className="text-sm font-serif font-bold text-white">
                    Looking for Traveler Guidelines & Cultural Etiquette?
                  </div>
                </div>
              </div>
              <button
                onClick={onSwitchToResponsibleTravel}
                className="px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Responsible Travel Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Operational Contact */}
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1.5">
            <div className="font-bold text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Baobab DMC Sustainability & Compliance Desk</span>
            </div>
            <p>
              For our complete carbon audit reports, B2B partner sustainability questionnaires, or customized eco-tour specifications:
            </p>
            <p className="text-neutral-800 font-semibold">
              Email: {COMPANY_CONTACT.email} • Telephone: {COMPANY_CONTACT.phone}
            </p>
          </div>
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Aligned with Travelife, GoTürkiye & UN Tourism Frameworks</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInquiry && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry({ formMode: 'b2b-contracting', specialRequests: 'Inquiring about sustainable small-group touring specifications.' });
                }}
                className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white rounded font-bold uppercase tracking-wider text-[11px] transition-colors"
              >
                Inquire Eco-Friendly Tour
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded font-semibold text-[11px] transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
