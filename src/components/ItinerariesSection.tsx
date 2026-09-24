import React, { useState } from 'react';
import { SAMPLE_ITINERARIES } from '../data/dmcData';
import { SampleItinerary } from '../types';
import { 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Clock, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Printer
} from 'lucide-react';
import { exportSampleItineraryToPdf } from '../utils/pdfExport';

interface ItinerariesSectionProps {
  onSelectItinerary: (itinerary: SampleItinerary) => void;
  onCustomizeItinerary: (itinerary: SampleItinerary) => void;
}

export const ItinerariesSection: React.FC<ItinerariesSectionProps> = ({
  onSelectItinerary,
  onCustomizeItinerary,
}) => {
  const [activeItineraryId, setActiveItineraryId] = useState<string>(SAMPLE_ITINERARIES[0].id);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const currentItinerary = SAMPLE_ITINERARIES.find(i => i.id === activeItineraryId) || SAMPLE_ITINERARIES[0];

  return (
    <section id="itineraries" className="py-20 sm:py-28 bg-[#FAF9F6] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              <Sparkles className="w-4 h-4" />
              <span>Curated Sample Frameworks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-neutral-900 leading-tight">
              Bespoke Sample Programs <br />
              <span className="italic font-light">Customized to Every Delegation</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
              Every program we execute is 100% tailor-made. These sample blueprints demonstrate our 
              logistical flow, private access privileges, and balanced pacing across Turkey.
            </p>
          </div>

          {/* Program Selectors */}
          <div className="flex flex-wrap gap-2">
            {SAMPLE_ITINERARIES.map((itin) => (
              <button
                key={itin.id}
                onClick={() => {
                  setActiveItineraryId(itin.id);
                  setExpandedDay(1);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                  activeItineraryId === itin.id
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                {itin.duration.split('/')[0]} • {itin.category}
              </button>
            ))}
          </div>
        </div>

        {/* Active Itinerary Showcase Card */}
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Cover, Meta & Highlights */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200 bg-neutral-50/50">
            <div className="space-y-6">
              {/* Category & Duration Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-[#F05A28] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm">
                  {currentItinerary.category}
                </span>
                <span className="px-2.5 py-1 bg-neutral-200 text-neutral-800 text-[11px] font-bold rounded-sm flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span>{currentItinerary.duration}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                  {currentItinerary.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#F05A28] mt-1">
                  {currentItinerary.subtitle}
                </p>
              </div>

              {/* Overview */}
              <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                {currentItinerary.overview}
              </p>

              {/* Photo Preview - Clickable to open itinerary details */}
              <div 
                onClick={() => onSelectItinerary(currentItinerary)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectItinerary(currentItinerary);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${currentItinerary.title} details`}
                title={`Click to view ${currentItinerary.title} details`}
                className="relative aspect-[16/9] rounded overflow-hidden shadow-inner bg-neutral-900 cursor-pointer group/photo focus:outline-hidden focus:ring-2 focus:ring-[#F05A28]"
              >
                <img
                  src={currentItinerary.coverImage}
                  alt={currentItinerary.title}
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 pointer-events-none">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>{currentItinerary.destinations.join(' • ')}</span>
                </div>
              </div>

              {/* Ideal Group Size & Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <div className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                  <Users className="w-4 h-4 text-[#F05A28]" />
                  <span>Ideal Scale: <strong className="text-neutral-900">{currentItinerary.idealGroupSize}</strong></span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 pt-2">
                  Key Inclusions & Highlights
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {currentItinerary.includedHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => onCustomizeItinerary(currentItinerary)}
                className="w-full py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Customize This Itinerary for My Group</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectItinerary(currentItinerary)}
                  className="w-full py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-sm border border-neutral-300 transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => exportSampleItineraryToPdf(currentItinerary)}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Download / Print PDF version"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PDF Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Day-by-Day Accordion */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-3 bg-white overflow-y-auto max-h-[720px]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Day-by-Day Itinerary Outline ({currentItinerary.days.length} Days)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === null ? 1 : null)}
                  className="text-xs text-[#F05A28] hover:text-[#d9491b] font-semibold flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-[#F05A28]/10"
                  title={expandedDay === null ? "Expand day details" : "Collapse all days"}
                >
                  <span>{expandedDay === null ? "Expand First Day" : "Collapse All"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {currentItinerary.days.map((d) => {
                const isExpanded = expandedDay === d.day;
                return (
                  <div
                    key={d.day}
                    className={`rounded border transition-all ${
                      isExpanded 
                        ? 'border-[#F05A28]/40 bg-[#FAF9F6] shadow-sm' 
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : d.day)}
                      className="w-full text-left p-3.5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isExpanded ? 'bg-[#F05A28] text-white' : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {d.day}
                        </span>
                        <div>
                          <div className="text-xs text-neutral-500 font-mono font-medium">
                            {d.location}
                          </div>
                          <div className="text-sm font-bold text-neutral-900 tracking-tight">
                            {d.title}
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#F05A28] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-neutral-200/60 text-xs text-neutral-600 space-y-3 font-sans leading-relaxed">
                        <p>{d.description}</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {d.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-white text-neutral-800 rounded border border-neutral-200 text-[11px] font-medium"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
