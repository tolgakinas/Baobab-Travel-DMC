import React, { useState } from 'react';
import { COMPANY_CONTACT } from '../data/dmcData';
import { 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Logo } from './Logo';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventTypeId?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  initialEventTypeId = 'b2b-discovery',
}) => {
  const eventTypes = COMPANY_CONTACT.calendlyEventTypes || [];
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string>(initialEventTypeId);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Sync initialEventTypeId if changed
  React.useEffect(() => {
    if (initialEventTypeId) {
      setSelectedEventTypeId(initialEventTypeId);
    }
  }, [initialEventTypeId]);

  if (!isOpen) return null;

  const activeEvent = eventTypes.find(e => e.id === selectedEventTypeId) || eventTypes[0] || {
    id: 'b2b-discovery',
    name: '30-Min Partner Discovery Call',
    duration: '30 min',
    description: 'Introduction for new tour operators and travel agencies.',
    slug: 'b2b-consultation',
    url: COMPANY_CONTACT.calendlyUrl,
    type: 'Video Call (Zoom / Google Meet)'
  };

  // Embed parameters to optimize Calendly look & feel inside iframe
  const embedUrl = `${activeEvent.url}?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f05a28&background_color=ffffff&text_color=1a1a1a`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh] text-neutral-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendly-modal-title"
      >
        {/* Top Header */}
        <div className="bg-[#121316] text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <Logo variant="dark" size="sm" />
            <div className="hidden sm:block h-5 w-[1px] bg-neutral-700" />
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TURSAB Licensed #10848 Ground Operator</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
            aria-label="Close scheduling modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subheader / Title */}
        <div className="bg-[#FAF9F6] border-b border-neutral-200/80 px-5 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F05A28] flex items-center gap-1">
                <Video className="w-3 h-3" />
                Live 1-on-1 Virtual Consultation
              </span>
              <h2 id="calendly-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-0.5">
                Schedule a B2B Consultation with Destination Specialists
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                Choose a time that suits your schedule. You will connect directly with our Istanbul operations leadership to discuss custom itineraries, guaranteed departures, and confidential net wholesale tariffs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
              <a
                href={activeEvent.url || 'https://calendly.com/baobabdmc-info/30min'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded shadow-sm transition-colors text-center justify-center"
              >
                <span>Open in Calendly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-neutral-500 font-mono hidden xl:inline">
                calendly.com/baobabdmc-info/30min
              </span>
            </div>
          </div>

          {/* Meeting Type Selector Tabs */}
          <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-neutral-200/60">
            {eventTypes.map((evt) => {
              const isSelected = evt.id === selectedEventTypeId;
              return (
                <button
                  key={evt.id}
                  onClick={() => {
                    setSelectedEventTypeId(evt.id);
                    setIframeLoaded(false);
                  }}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-md transition-all flex items-center gap-2 border text-left ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
                  }`}
                >
                  <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F05A28]' : 'text-neutral-500'}`} />
                  <div>
                    <span className="block font-bold leading-tight">{evt.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {evt.duration} • {evt.type}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Body Area */}
        <div className="flex-1 bg-white relative min-h-[500px] overflow-hidden">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 space-y-3 p-6 text-center">
              <div className="w-8 h-8 border-3 border-[#F05A28] border-t-transparent rounded-full animate-spin" />
              <div className="text-xs font-semibold text-neutral-600">
                Loading live Calendly availability for <span className="text-neutral-900 font-bold">{activeEvent.name}</span>...
              </div>
              <p className="text-[11px] text-neutral-400 max-w-sm">
                If the calendar takes a moment to load, you can also launch it directly in a new window via the button above.
              </p>
            </div>
          )}

          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Calendly Scheduling Interface"
            className="w-full h-full min-h-[560px] border-none"
            allow="camera; microphone; fullscreen; display-capture"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Footer info bar */}
        <div className="bg-[#FAF9F6] border-t border-neutral-200 px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Automatic timezone conversion to your local clock
            </span>
            <span className="hidden md:inline text-neutral-300">•</span>
            <span className="text-neutral-500">
              English, German, and Spanish speaking planners available
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-500">Need immediate answers?</span>
            <a
              href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20schedule%20a%20B2B%20consultation`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline text-[11px]"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href={`tel:${COMPANY_CONTACT.phoneRaw}`}
              className="inline-flex items-center gap-1 text-neutral-700 font-semibold hover:underline text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#F05A28]" />
              <span>TR: {COMPANY_CONTACT.phone}</span>
            </a>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <a
              href={`tel:${COMPANY_CONTACT.phoneUsRaw}`}
              className="hidden sm:inline-flex items-center gap-1 text-neutral-700 font-semibold hover:underline text-[11px]"
            >
              <Phone className="w-3 h-3 text-cyan-600" />
              <span>US: {COMPANY_CONTACT.phoneUs}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
