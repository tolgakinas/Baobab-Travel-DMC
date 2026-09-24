import React, { useState, useEffect, useMemo } from 'react';
import { COMPANY_CONTACT } from '../data/dmcData';
import { 
  Clock, 
  Video, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  CheckCircle2,
  Calendar as CalendarIcon,
  RefreshCw
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
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  // Sync initialEventTypeId if changed
  useEffect(() => {
    if (initialEventTypeId) {
      setSelectedEventTypeId(initialEventTypeId);
    }
  }, [initialEventTypeId]);

  // Lock background scroll when modal is open to prevent background scrolling,
  // but DO NOT block touch-action so mobile gestures continue working cleanly
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Watch for Calendly postMessage events to acknowledge iframe rendering
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data?.event?.startsWith('calendly')) {
        setIframeLoaded(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Timer fallback in case mobile browser or content blocker blocks iframe load event
  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false);
      setLoadTimedOut(false);
      return;
    }
    const timer = setTimeout(() => {
      setLoadTimedOut(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, [isOpen, selectedEventTypeId]);

  const activeEvent = useMemo(() => {
    return eventTypes.find(e => e.id === selectedEventTypeId) || eventTypes[0] || {
      id: 'b2b-discovery',
      name: '30-Min Partner Discovery Call',
      duration: '30 min',
      description: 'Introduction for new tour operators and travel agencies.',
      slug: 'b2b-consultation',
      url: COMPANY_CONTACT.calendlyUrl,
      type: 'Video Call (Zoom / Google Meet)'
    };
  }, [eventTypes, selectedEventTypeId]);

  // Build clean, responsive embed parameters for Calendly
  const embedUrl = useMemo(() => {
    const rawUrl = activeEvent.url || COMPANY_CONTACT.calendlyUrl || 'https://calendly.com/baobabdmc-info/30min';
    try {
      const url = new URL(rawUrl);
      url.searchParams.set('embed_type', 'Inline');
      url.searchParams.set('hide_landing_page_details', '1');
      url.searchParams.set('hide_gdpr_banner', '1');
      url.searchParams.set('primary_color', 'f05a28');
      url.searchParams.set('background_color', 'ffffff');
      url.searchParams.set('text_color', '1a1a1a');
      return url.toString();
    } catch {
      const sep = rawUrl.includes('?') ? '&' : '?';
      return `${rawUrl}${sep}embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f05a28&background_color=ffffff&text_color=1a1a1a`;
    }
  }, [activeEvent.url]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4 md:p-6 flex flex-col items-center justify-start sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full min-h-full sm:min-h-0 sm:h-auto sm:max-h-[94vh] max-w-4xl bg-white sm:rounded-2xl shadow-2xl border-0 sm:border sm:border-neutral-200/80 flex flex-col text-neutral-900 my-0 sm:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 shrink-0 bg-[#111215] text-white px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between border-b border-neutral-800 z-40 shadow-md">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Logo variant="dark" size="sm" />
            <div className="hidden xs:block h-4 w-[1px] bg-neutral-700" />
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 font-medium bg-emerald-950/70 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-800/60">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">TÜRSAB #{COMPANY_CONTACT.tursabNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeEvent.url || 'https://calendly.com/baobabdmc-info/30min'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
              title="Open full page in new tab"
            >
              <span>Open in App</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="p-2 -mr-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors flex items-center justify-center min-w-[36px] min-h-[36px] cursor-pointer"
              aria-label="Close scheduling modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body Container: guarantees full vertical scrolling on mobile touch devices */}
        <div 
          className="flex-1 overflow-y-auto overscroll-contain flex flex-col bg-[#FAF9F6] focus:outline-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Subheader / Consultation Briefing */}
          <div className="shrink-0 bg-[#FAF9F6] border-b border-neutral-200/80 px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#F05A28] flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" />
                  Live 1-on-1 Destination Specialist Consultation
                </span>
              </div>
              <h2 id="calendly-modal-title" className="text-lg sm:text-2xl font-serif font-bold text-neutral-900 leading-tight">
                Schedule a B2B Consultation with Destination Specialists
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                Choose a time that fits your schedule to meet directly with our Istanbul & Cappadocia operations leadership for custom itineraries, guaranteed departures, and confidential net tariffs.
              </p>
            </div>

            {/* Meeting Type Selector Buttons */}
            <div className="mt-4 pt-3 border-t border-neutral-200/60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Select Meeting Objective:</span>
              </div>
              <div className="flex sm:grid sm:grid-cols-3 gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {eventTypes.map((evt) => {
                  const isSelected = evt.id === selectedEventTypeId;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => {
                        setSelectedEventTypeId(evt.id);
                        setIframeLoaded(false);
                        setLoadTimedOut(false);
                      }}
                      className={`text-left p-2.5 sm:p-3 rounded-lg transition-all border shrink-0 sm:shrink min-w-[220px] sm:min-w-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111] shadow-sm ring-1 ring-[#F05A28]'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {evt.duration}
                        </span>
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F05A28]' : 'text-neutral-400'}`} />
                      </div>
                      <span className="block font-bold text-xs leading-tight line-clamp-1">{evt.name}</span>
                      <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {evt.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile-Optimized Direct Action Banner */}
            <div className="mt-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-xs">
              <div className="flex items-start sm:items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="font-bold block sm:inline text-neutral-900">
                    Live Calendar & Slot Selector:
                  </span>{' '}
                  <span className="text-neutral-700 text-[11px] sm:text-xs">
                    Select a date below or open in fullscreen on mobile.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeEvent.url || 'https://calendly.com/baobabdmc-info/30min'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white font-bold rounded text-[11px] inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Calendar Body / Iframe Area with Side Touch Margins for Mobile Scrolling */}
          <div className="w-full bg-white relative flex-1 min-h-[750px] sm:min-h-[680px] p-1 sm:p-0">
            {/* Loading Indicator */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 z-10 space-y-3 p-6 text-center">
                <div className="w-8 h-8 border-3 border-[#F05A28] border-t-transparent rounded-full animate-spin" />
                <div className="text-xs sm:text-sm font-semibold text-neutral-700">
                  Loading live Calendly availability for <span className="text-neutral-900 font-bold">{activeEvent.name}</span>...
                </div>
                {loadTimedOut ? (
                  <div className="max-w-md pt-2 space-y-2">
                    <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
                      If your mobile browser blocks embedded calendars, tap below to open our live scheduler directly:
                    </p>
                    <a
                      href={activeEvent.url || 'https://calendly.com/baobabdmc-info/30min'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#F05A28] text-white text-xs font-bold rounded shadow transition-colors"
                    >
                      <span>Open Live Calendar on Calendly.com</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-400 max-w-sm">
                    Connecting to Istanbul operations calendar with automatic timezone detection...
                  </p>
                )}
              </div>
            )}

            {/* Embedded Calendly iframe: Styled with 100% width and dynamic mobile viewport heights */}
            <div className="w-full h-full min-h-[750px] sm:min-h-[680px] overflow-hidden">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduling Interface"
                className="w-full h-full min-h-[750px] sm:min-h-[680px] border-none block"
                style={{ minHeight: '750px', height: '100%', width: '100%' }}
                scrolling="yes"
                allow="camera; microphone; fullscreen; display-capture"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </div>

          {/* Sticky Mobile Quick Action Bar at bottom */}
          <div className="sm:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-2.5 flex items-center justify-between gap-2 shadow-lg">
            <a
              href={activeEvent.url || 'https://calendly.com/baobabdmc-info/30min'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 bg-[#F05A28] text-white text-xs font-bold rounded text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Instant Booking Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20schedule%20a%20B2B%20consultation`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 bg-emerald-600 text-white text-xs font-semibold rounded flex items-center justify-center gap-1 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Footer Info & Quick Channels Bar */}
          <div className="shrink-0 bg-[#FAF9F6] border-t border-neutral-200 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left">
              <span className="flex items-center gap-1.5 text-neutral-700 font-medium text-[11px] sm:text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Automatic timezone conversion</span>
              </span>
              <span className="hidden sm:inline text-neutral-300">•</span>
              <span className="text-neutral-500 text-[11px] sm:text-xs">
                English, German & Spanish speaking specialists
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs">
              <span className="text-neutral-500">Urgent inquiry?</span>
              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20schedule%20a%20B2B%20consultation`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline bg-emerald-50 px-2 py-1 rounded border border-emerald-200"
              >
                <MessageSquare className="w-3 h-3 fill-current" />
                <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
              </a>
              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="inline-flex items-center gap-1 text-neutral-700 font-semibold hover:underline bg-neutral-100 px-2 py-1 rounded border border-neutral-200"
              >
                <Phone className="w-3 h-3 text-[#F05A28]" />
                <span>Call: {COMPANY_CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

