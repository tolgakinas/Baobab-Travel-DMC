import React from 'react';
import { SampleItinerary } from '../types';
import { 
  X, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  Sparkles,
  Printer
} from 'lucide-react';
import { exportSampleItineraryToPdf } from '../utils/pdfExport';

interface ItineraryModalProps {
  itinerary: SampleItinerary | null;
  onClose: () => void;
  onCustomize: (itinerary: SampleItinerary) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  itinerary,
  onClose,
  onCustomize,
}) => {
  if (!itinerary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-4xl rounded-md shadow-2xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Top Banner with Image */}
        <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full bg-neutral-900 shrink-0">
          <img
            src={itinerary.coverImage}
            alt={itinerary.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Top Actions: Print / PDF & Close */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => exportSampleItineraryToPdf(itinerary)}
              className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-[#F05A28] text-white flex items-center gap-1.5 transition-colors text-xs font-semibold backdrop-blur-xs"
              title="Export itinerary as printable PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-[#F05A28] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm">
                {itinerary.category}
              </span>
              <span className="text-xs text-neutral-300 font-mono">
                {itinerary.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {itinerary.title}
            </h2>
            <div className="text-xs sm:text-sm text-neutral-200 mt-0.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>{itinerary.destinations.join(' • ')}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-800">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Program Executive Summary
            </h3>
            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              {itinerary.overview}
            </p>
          </div>

          {/* Scale & Inclusions Box */}
          <div className="p-4 bg-[#FAF9F6] rounded border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Recommended Group Scale</span>
              </div>
              <div className="text-neutral-600 font-medium">
                {itinerary.idealGroupSize}
              </div>
            </div>

            <div>
              <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>B2B Wholesaler Inclusions</span>
              </div>
              <div className="text-neutral-600 font-medium">
                VIP tarmac greeting, 24/7 dedicated dispatch, white-label documentation.
              </div>
            </div>
          </div>

          {/* Full Day-by-Day Timeline */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F05A28]">
                Complete Day-by-Day Itinerary Flow
              </h3>
              <span className="text-xs text-neutral-500 font-medium font-mono">
                {itinerary.days.length} Total Days
              </span>
            </div>

            <div className="space-y-4">
              {itinerary.days.map((d) => (
                <div 
                  key={d.day}
                  className="p-4 rounded border border-neutral-200 bg-white space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[11px]">
                        {d.day}
                      </span>
                      <span className="font-bold text-sm text-neutral-900">{d.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#F05A28] bg-[#F05A28]/10 px-2 py-0.5 rounded font-semibold">
                      {d.location}
                    </span>
                  </div>

                  <p className="text-neutral-600 leading-relaxed pl-8">
                    {d.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pl-8 pt-1">
                    {d.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10.5px] rounded border border-neutral-200 font-medium"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => exportSampleItineraryToPdf(itinerary)}
              className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Print / Save Itinerary as PDF"
            >
              <Printer className="w-4 h-4 text-[#F05A28]" />
              <span>PDF Out</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onCustomize(itinerary);
            }}
            className="px-6 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-md active:scale-95"
          >
            <span>Customize This Program</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
