import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Users, 
  HeartHandshake, 
  AlertCircle,
  Clock,
  Printer,
  Compass,
  Phone,
  Mail
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/dmcData';

interface ModernSlaveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (initialData?: Record<string, any>) => void;
}

export const ModernSlaveryModal: React.FC<ModernSlaveryModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry
}) => {
  // Close on Escape key and prevent background scroll
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
      aria-labelledby="modern-slavery-title"
    >
      {/* Clickable Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Viewport Close Button */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-60 w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-[#F05A28] text-white flex items-center justify-center shadow-xl border border-white/20 transition-all duration-200 hover:scale-105 print:hidden"
        aria-label="Close Modern Slavery Act Statement (Esc)"
        title="Close (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Dialog Container */}
      <div className="relative bg-white text-neutral-900 rounded-xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-neutral-200 z-10 flex flex-col max-h-[92vh]">
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 px-5 sm:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between gap-3 shrink-0 print:border-b-2 print:border-neutral-900">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 shrink-0">
              <Scale className="w-4 h-4" />
            </span>
            <div className="truncate">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F05A28] block">
                Ethical Conduct & ESG Governance
              </span>
              <h2 id="modern-slavery-title" className="text-sm sm:text-base font-serif font-bold text-neutral-900 truncate">
                Modern Slavery & Human Rights Transparency Statement
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 print:hidden">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors border border-neutral-200"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-[#F05A28] text-white text-xs font-bold transition-all shadow-sm"
              aria-label="Close statement"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 flex-1 font-sans text-neutral-700 text-sm leading-relaxed">
          {/* Executive Header Banner */}
          <div className="bg-[#FAF9F6] border border-neutral-200 rounded-lg p-5 sm:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-900">Entity:</span>
                <span>Baobab DMC Turkey (A-Grade Incoming DMC)</span>
              </div>
              <div className="flex items-center gap-3">
                <span>TURSAB License #{COMPANY_CONTACT.tursabNumber}</span>
                <span>•</span>
                <span>Reporting Year: 2025 / 2026</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 leading-tight">
              Modern Slavery, Human Trafficking & Fair Labor Statement
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-normal">
              Pursuant to the principles of the <strong>UK Modern Slavery Act 2015 (Section 54)</strong>, the <strong>UN Guiding Principles on Business and Human Rights</strong>, and the <strong>International Labour Organization (ILO) Core Conventions</strong>, this statement sets out the actions taken by Baobab DMC Turkey to prevent modern slavery, debt bondage, forced labour, human trafficking, and child exploitation across our incoming tourism operations and regional Turkish supply chains.
            </p>
          </div>

          {/* 1. Organizational Structure & Supply Chain Footprint */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base font-serif">
              <Building2 className="w-4 h-4 text-[#F05A28]" />
              <h3>1. Organizational Scope & Turkish Supply Chains</h3>
            </div>
            <p>
              Baobab DMC Turkey operates as an incoming Destination Management Company (DMC) headquartered in Istanbul, Turkey, delivering ground handling, active adventures, private cultural journeys, yacht charters, and tailor-made expeditions for international tour operators, B2B wholesalers, and educational groups worldwide.
            </p>
            <p>
              Our operations span direct team members and an extensive ecosystem of localized third-party suppliers across all 7 geographic regions of Turkiye, including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <li className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Licensed Tour Guides:</strong> Official Ministry of Culture & Tourism (TUREB) certified guides.</span>
              </li>
              <li className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Transport Operators:</strong> Chauffeurs, D2-licensed coaches, and private Mercedes-Benz sprinter fleets.</span>
              </li>
              <li className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Hospitality & Accommodations:</strong> Independently owned cave hotels, alpine lodges, and boutique properties.</span>
              </li>
              <li className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Maritime & Expedition Crews:</strong> Wooden gulet crews, captains, kayak guides, and trekking pack-porters.</span>
              </li>
            </ul>
          </section>

          {/* 2. Zero-Tolerance Policy Commitments */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base font-serif">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3>2. Zero-Tolerance Policy on Modern Slavery</h3>
            </div>
            <p>
              Baobab DMC maintains an unequivocal, zero-tolerance approach to modern slavery, servitude, forced or compulsory labour, and human trafficking in all operational spheres. We are committed to acting ethically, transparently, and with integrity in all commercial partnerships, implementing robust risk mitigation controls to ensure modern slavery is not occurring anywhere in our business or extended service supply chains.
            </p>
            <div className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-lg text-xs space-y-2 text-amber-950">
              <div className="font-bold flex items-center gap-1.5 text-[#F05A28]">
                <AlertCircle className="w-4 h-4" />
                <span>Non-Negotiable Operating Standards</span>
              </div>
              <ul className="space-y-1.5 list-disc pl-4">
                <li><strong>No Forced or Involuntary Labour:</strong> All employment is voluntary. Workers retain full possession of their passports, travel documents, and personal IDs; withholding identity papers as leverage is strictly prohibited.</li>
                <li><strong>No Child Exploitation:</strong> Strict compliance with Turkish Labor Law No. 4857 and ILO Convention 138/182. No individual under the legal working age is engaged, and the commercial sexual exploitation of children and adolescents in tourism is actively combatted.</li>
                <li><strong>No Debt Bondage or Recruitment Fees:</strong> No worker or contracted personnel shall pay recruitment fees or work to pay off inflated lodging, transit, or training fees.</li>
                <li><strong>Living Wage & Legal Social Security:</strong> All staff, drivers, porters, and seasonal personnel receive fair wages meeting or exceeding statutory minimums, with mandatory Turkish social security (SGK) registrations.</li>
              </ul>
            </div>
          </section>

          {/* 3. Due Diligence & Supply Chain Risk Management */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base font-serif">
              <Compass className="w-4 h-4 text-[#F05A28]" />
              <h3>3. Due Diligence, Procurement & Supplier Vetting</h3>
            </div>
            <p>
              Given the decentralized nature of travel services across Anatolia, the Aegean, and Black Sea regions, Baobab DMC conducts ongoing supplier risk profiling:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 space-y-1.5">
                <span className="font-bold text-neutral-900 block">Pre-Contract Auditing</span>
                <p className="text-neutral-600 leading-relaxed">
                  Before onboarding transport contractors, boutique hoteliers, or boat owners, our operations team verifies valid operational licensing, working hours compliance, and vehicle safety logs.
                </p>
              </div>
              <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 space-y-1.5">
                <span className="font-bold text-neutral-900 block">Trekking & Crew Welfare</span>
                <p className="text-neutral-600 leading-relaxed">
                  On remote trekking routes (such as Mount Ararat and the Lycian Way) and yachting charters, we enforce strict load weight limits for luggage porters, provide proper gear, and guarantee humane crew quarters.
                </p>
              </div>
              <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200 space-y-1.5">
                <span className="font-bold text-neutral-900 block">Contractual ESG Clauses</span>
                <p className="text-neutral-600 leading-relaxed">
                  B2B service agreements mandate adherence to our Supplier Code of Conduct, granting Baobab DMC the immediate right to terminate contracts upon any human rights infraction.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Whistleblowing & Grievance Reporting */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base font-serif">
              <HeartHandshake className="w-4 h-4 text-[#F05A28]" />
              <h3>4. Whistleblowing Channel & Grievance Procedures</h3>
            </div>
            <p>
              We maintain open, secure, and confidential reporting channels for employees, clients, overseas tour operators, guides, and subcontracted workers to report suspected unethical practices or labor abuses without fear of retaliation or commercial reprisal:
            </p>
            <div className="p-4 bg-neutral-900 text-white rounded-lg text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-bold text-neutral-200 block text-sm">
                  Confidential Ethics & Compliance Desk
                </span>
                <p className="text-neutral-400">
                  Direct oversight by Executive Management & Legal Counsel
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${COMPANY_CONTACT.email}?subject=Modern%20Slavery%20%26%20Human%20Rights%20Compliance`}
                  className="px-3.5 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white rounded font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{COMPANY_CONTACT.email}</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello Baobab DMC Compliance Officer, I would like to inquire about your ESG / Modern Slavery reporting.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Compliance Hotline</span>
                </a>
              </div>
            </div>
          </section>

          {/* 5. Board Approval & Sign-Off */}
          <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-500 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-neutral-800">Approved by:</span>
                <span className="ml-1 text-neutral-700">Board of Directors & Managing Director, Baobab DMC Turkey</span>
              </div>
              <div>
                <span className="font-bold text-neutral-800">Last Reviewed:</span>
                <span className="ml-1 text-neutral-700">January 2026 (Annual Review Cycle)</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400">
              This statement is reviewed annually to reflect changes in legislation, operating scale, and ongoing human rights diligence across the Republic of Turkiye.
            </p>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 sm:px-8 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Committed to Ethical, Sustainable & Dignified Incoming Tourism in Turkiye</span>
          </div>
          <div className="flex items-center gap-3">
            {onOpenInquiry && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry({ formMode: 'b2b-contracting', specialRequests: 'Requesting ESG & Modern Slavery Policy compliance packet' });
                }}
                className="text-[#F05A28] hover:underline font-semibold"
              >
                Request Full ESG Packet
              </button>
            )}
            <span>•</span>
            <button
              onClick={onClose}
              className="hover:text-neutral-900 font-medium"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
