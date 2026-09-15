import React, { useEffect } from 'react';
import { 
  X, 
  HeartHandshake, 
  Compass, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  CheckCircle2, 
  Leaf, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Smile,
  AlertCircle
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/dmcData';

interface ResponsibleTravelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSustainableTourism?: () => void;
  onOpenInquiry?: (initialData?: Record<string, any>) => void;
}

export const ResponsibleTravelModal: React.FC<ResponsibleTravelModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSustainableTourism,
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
      aria-labelledby="responsible-travel-title"
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
            <div className="w-10 h-10 rounded-lg bg-[#F05A28]/20 border border-[#F05A28]/40 flex items-center justify-center text-[#F05A28]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F05A28]">
                  Traveler Ethics & Cultural Etiquette
                </span>
                <span className="text-neutral-500 text-xs">•</span>
                <span className="text-[10px] font-semibold text-neutral-400">
                  Baobab DMC Code of Conduct
                </span>
              </div>
              <h2 id="responsible-travel-title" className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                Responsible Travel Code & Cultural Respect
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Print Responsible Travel Code"
              aria-label="Print code"
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
          
          {/* Welcome Banner */}
          <div className="p-5 rounded-lg bg-orange-50/70 border border-orange-200 text-neutral-800 space-y-2.5">
            <div className="flex items-center gap-2 text-[#F05A28] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Traveling with Respect, Mindfulness & Empathy in Turkey</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              At Baobab DMC, we believe travel should enrich both the explorer and the host. When discovering Turkey’s millennia-old civilizations, majestic landscapes, and hospitable communities, small choices make a lasting positive difference. This guide outlines our core traveler recommendations to ensure mindful, culturally respectful, and environmentally regenerative journeys.
            </p>
          </div>

          {/* Benchmark Sources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              International & National Benchmark Frameworks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Travelife */}
              <a
                href="https://www.travelife.info"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#FAF9F6] border border-neutral-200 hover:border-emerald-500/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-emerald-600">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Traveler Guidelines</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div className="font-serif font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                    Travelife Sustainability
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Industry-leading criteria promoting ethical tourist conduct, animal welfare, and respectful local community engagement worldwide.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <span>www.travelife.info</span>
                </div>
              </a>

              {/* Türkiye Sustainable Tourism */}
              <a
                href="https://goturkiye.com/sustainable"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#FAF9F6] border border-neutral-200 hover:border-[#F05A28]/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[#F05A28]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">National Platform</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#F05A28] transition-colors" />
                  </div>
                  <div className="font-serif font-bold text-neutral-900 group-hover:text-[#F05A28] transition-colors">
                    GoTürkiye Sustainable
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Official sustainable tourism standards established under the collaboration between Turkish Ministry of Culture & Tourism and GSTC.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-[#F05A28]">
                  <span>goturkiye.com/sustainable</span>
                </div>
              </a>

              {/* UN Tourism SDGs */}
              <a
                href="https://www.untourism.int/sustainable-development"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#FAF9F6] border border-neutral-200 hover:border-cyan-600/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-cyan-700">
                    <span className="text-[11px] font-bold uppercase tracking-wider">UN Tourism (UNWTO)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-700 transition-colors" />
                  </div>
                  <div className="font-serif font-bold text-neutral-900 group-hover:text-cyan-800 transition-colors">
                    UN Sustainable Goals
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Promoting responsible, sustainable, and universally accessible tourism that champions cultural heritage and local dignity.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-cyan-700">
                  <span>untourism.int/sustainable</span>
                </div>
              </a>
            </div>
          </div>

          {/* Key Guidelines */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-neutral-900 border-b border-neutral-200 pb-2">
              Responsible Traveler Guidelines for Turkey
            </h3>

            {/* Guideline 1 */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <MapPin className="w-4 h-4 text-[#F05A28]" />
                <h4>1. Respecting Sacred Spaces & Religious Heritage</h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                When entering active mosques such as the Blue Mosque, Süleymaniye, or rural Anatolian shrines:
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 pl-4">
                <li>• Dress modestly: shoulders and knees should be covered for all guests; women are requested to cover hair with a lightweight scarf (scarves are provided by Baobab guides).</li>
                <li>• Remove shoes at the entrance or place them in the provided shoe bags before stepping onto prayer carpets.</li>
                <li>• Maintain a quiet, contemplative tone, avoid walking in front of worshippers during prayer, and refrain from flash photography.</li>
              </ul>
            </div>

            {/* Guideline 2 */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <HeartHandshake className="w-4 h-4 text-[#F05A28]" />
                <h4>2. Supporting Local Artisans & Fair Trade</h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Empower Turkish master craftspeople, potters in Avanos, silk weavers in Bursa, and copper smiths in Gaziantep:
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 pl-4">
                <li>• Practice friendly, respectful bargaining. Bargaining in traditional bazaars is a social tradition, not a battle—aim for a win-win price that honors the artisan’s skill and livelihood.</li>
                <li>• Purchase authentic local handcrafts and regional delicacies (olive oils, spices, handwoven kilims) directly from independent cooperatives rather than mass-produced imports.</li>
              </ul>
            </div>

            {/* Guideline 3 */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <h4>3. Leave No Trace along Ancient Trails & Coastlines</h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Preserve Turkey’s pristine biodiversity across the Lycian Way, Cappadocia valleys, and Mediterranean bays:
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 pl-4">
                <li>• Stay on designated marked trails to prevent soil erosion and avoid trampling endemic alpine flora.</li>
                <li>• Never remove fossils, stones, or archaeological fragments from ancient Roman, Greek, or Byzantine ruins (removing artifacts is also strictly illegal under Turkish antiquities law).</li>
                <li>• Pack out all waste, use reef-friendly sunscreen during swimming stops in Kekova and Göcek, and utilize refillable water bottles provided by your guide.</li>
              </ul>
            </div>

            {/* Guideline 4 */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Smile className="w-4 h-4 text-[#F05A28]" />
                <h4>4. Photography & Community Interaction</h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Connect genuinely with local Turkish communities with warmth and dignity:
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 pl-4">
                <li>• Always ask for polite permission before taking portraits of local residents, especially in rural villages or market stalls.</li>
                <li>• Learn a few polite Turkish phrases—such as <em>"Merhaba"</em> (Hello), <em>"Lütfen"</em> (Please), and <em>"Teşekkür ederim"</em> (Thank you). Hospitality (<em>misafirperverlik</em>) is central to Turkish culture.</li>
              </ul>
            </div>
          </div>

          {/* Quick Cross-Link Banner */}
          {onSwitchToSustainableTourism && (
            <div className="p-4 rounded-lg bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Corporate & Operational Policy
                  </div>
                  <div className="text-sm font-serif font-bold text-white">
                    Read Our Sustainable Tourism DMC Policy & ESG Roadmap
                  </div>
                </div>
              </div>
              <button
                onClick={onSwitchToSustainableTourism}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Sustainable Tourism Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Contact Box */}
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1.5">
            <div className="font-bold text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Baobab DMC Guest Support & Operations</span>
            </div>
            <p>
              Have specific accessibility requirements, dietary guidelines, or cultural etiquette questions for your upcoming departure? Contact our Istanbul operations team:
            </p>
            <p className="text-neutral-800 font-semibold">
              Email: {COMPANY_CONTACT.email} • Phone: {COMPANY_CONTACT.phone}
            </p>
          </div>

        </div>

        {/* Sticky Footer Bar */}
        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F05A28] inline-block"></span>
            <span>Promoting Mindful & Respectful Travel Across Turkey</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInquiry && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry({ specialRequests: 'Inquiring about responsible small-group travel itinerary options.' });
                }}
                className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white rounded font-bold uppercase tracking-wider text-[11px] transition-colors"
              >
                Plan a Journey
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
