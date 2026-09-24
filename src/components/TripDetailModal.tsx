import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Printer,
  Download
} from 'lucide-react';
import { AtlasTrip } from '../types';
import { COMPANY_CONTACT } from '../data/dmcData';
import { parseItineraryDayDetails, ItinerarySymbolsBar } from '../utils/itineraryHelper';
import { exportItineraryToPdf } from '../utils/pdfExport';
import { TripPhotoSlider } from './TripPhotoSlider';
import { getTripGallery } from '../data/tripPhotosMap';

interface TripDetailModalProps {
  trip: AtlasTrip | null;
  onClose: () => void;
  onRequestProposal: (trip: AtlasTrip) => void;
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  trip,
  onClose,
  onRequestProposal,
}) => {
  // Track expanded day numbers; default to collapsed all as requested
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (trip) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // User request: itinerary default state as collapse all
      setExpandedDays({});
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [trip, onClose]);

  if (!trip) return null;

  const toggleDay = (dayNumber: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNumber]: !prev[dayNumber]
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    trip.itinerary?.forEach(d => {
      all[d.dayNumber] = true;
    });
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  const allExpanded = trip.itinerary && trip.itinerary.length > 0 && 
    trip.itinerary.every(d => expandedDays[d.dayNumber]);

  const handleExportPdf = () => {
    exportItineraryToPdf(trip);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Baobab DMC, I am an international tour operator/travel advisor inquiring about B2B wholesale partner pricing for: "${trip.title}" (${trip.duration}).`
  );

  const tripGallery = getTripGallery(trip.id, trip.image);
  const sliderImages = (trip.images && trip.images.length > 0) ? trip.images : tripGallery.images;
  const sliderCaptions = (trip.imageCaptions && trip.imageCaptions.length > 0) ? trip.imageCaptions : tripGallery.imageCaptions;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 flex justify-center items-start animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-neutral-200 my-2 sm:my-6 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header 5-Photo Slider with Real Photos & Lightbox */}
        <TripPhotoSlider
          images={sliderImages}
          captions={sliderCaptions}
          title={trip.title}
          aspectRatioClassName="h-64 sm:h-80 md:h-[360px]"
          badges={
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">
                {trip.category}
              </span>
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F05A28]" />
                {trip.duration}
              </span>
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-sm flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-neutral-300" />
                {trip.groupSize}
              </span>
            </div>
          }
          topActions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportPdf}
                className="px-3 py-2 rounded-full bg-black/75 hover:bg-[#F05A28] text-white flex items-center gap-1.5 transition-colors shadow-lg text-xs font-semibold backdrop-blur-xs cursor-pointer"
                title="Export Itinerary as PDF / Printable Version"
                aria-label="Export Itinerary PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/75 hover:bg-[#F05A28] text-white flex items-center justify-center transition-colors shadow-lg backdrop-blur-xs cursor-pointer"
                aria-label="Close modal"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          }
        />

        {/* Sticky Title & Quick Actions Bar */}
        <div className="sticky top-0 z-30 px-4 py-3 sm:px-6 sm:py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-neutral-900 leading-tight">
                {trip.title}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-neutral-600">
                <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
                <span className="font-semibold text-neutral-800">Destinations:</span>
                {trip.destinations.map((dest, i) => (
                  <span key={i} className="inline-flex items-center">
                    <span className="bg-neutral-100 border border-neutral-200 text-neutral-800 px-2 py-0.5 rounded text-[11px] font-medium">
                      {dest}
                    </span>
                    {i < trip.destinations.length - 1 && <span className="mx-1 text-neutral-300">•</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onRequestProposal(trip)}
                className="px-3.5 py-2 bg-[#F05A28] hover:bg-[#D94818] text-white text-xs font-semibold rounded shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request B2B Quote</span>
              </button>
              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-emerald-600/30 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors"
                title="Direct WhatsApp Inquiry"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-8 space-y-8 text-neutral-700">
          {/* Rate Notice Banner (Prices Removed) */}
          <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F05A28]/10 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#F05A28]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">
                  Custom & B2B Partner Pricing on Request
                </h4>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                  Prices are tailored based on your private departure dates, boutique lodge tier, and exact party size. Full wholesale net partner rates with zero hidden markups.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="inline-block px-3 py-1 bg-white border border-neutral-300 text-neutral-800 text-xs font-bold rounded">
                Net Quote in 24 Hours
              </span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#F05A28] uppercase mb-2">
              Program Overview
            </h3>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              {trip.description}
            </p>
          </div>

          {/* Key Highlights */}
          {trip.highlights && trip.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#F05A28] uppercase mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F05A28]" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {trip.highlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-neutral-50 rounded border border-neutral-100 flex items-start gap-2.5 text-xs sm:text-sm font-medium text-neutral-800"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#F05A28]/10 text-[#F05A28] font-bold flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day by Day Itinerary with Collapse/Expand Controls */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold tracking-widest text-[#F05A28] uppercase flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#F05A28]" />
                    Day-by-Day Detailed Itinerary
                  </h3>
                  <span className="text-[11px] text-neutral-500 font-mono bg-neutral-100 px-2 py-0.5 rounded">
                    {trip.itinerary.length} Days Total
                  </span>
                </div>

                {/* PDF Out & Collapse / Expand All Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    className="px-2.5 py-1 text-[11px] font-bold text-[#F05A28] hover:text-white bg-[#F05A28]/10 hover:bg-[#F05A28] border border-[#F05A28]/30 rounded transition-all flex items-center gap-1 shadow-2xs"
                    title="Export printable PDF itinerary"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PDF Out</span>
                  </button>

                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors flex items-center gap-1"
                  >
                    <span>Expand All</span>
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors flex items-center gap-1"
                  >
                    <span>Collapse All</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {trip.itinerary.map((day) => {
                  const isExpanded = !!expandedDays[day.dayNumber];
                  const parsed = parseItineraryDayDetails(day.title, day.description);

                  return (
                    <div 
                      key={day.dayNumber}
                      className={`border rounded-md transition-all overflow-hidden ${
                        isExpanded 
                          ? 'bg-white border-[#F05A28]/40 shadow-xs' 
                          : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {/* Clickable Header Accordion */}
                      <button
                        type="button"
                        onClick={() => toggleDay(day.dayNumber)}
                        className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded uppercase tracking-wider shrink-0 transition-colors ${
                            isExpanded ? 'bg-[#F05A28] text-white' : 'bg-neutral-900 text-white'
                          }`}>
                            Day {day.dayNumber}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm truncate">
                              {day.title}
                            </h4>
                            {/* Summary badge symbols preview when collapsed */}
                            {!isExpanded && (
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-neutral-500">
                                {parsed.meals.length > 0 && (
                                  <span className="inline-flex items-center gap-1 text-emerald-700">
                                    <span className="font-semibold">🍴</span> {parsed.meals.join(', ')}
                                  </span>
                                )}
                                {parsed.accommodation && (
                                  <span className="inline-flex items-center gap-1 text-amber-800">
                                    <span className="font-semibold">🏨</span> {parsed.accommodation}
                                  </span>
                                )}
                                {parsed.distance && (
                                  <span className="inline-flex items-center gap-1 text-stone-600">
                                    <span>🥾</span> {parsed.distance}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-medium text-neutral-400 hidden sm:inline">
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </span>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                            isExpanded ? 'bg-neutral-100 text-[#F05A28]' : 'text-neutral-500'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Expandable Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-neutral-100/80 animate-in fade-in duration-150 space-y-3">
                          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pl-3 border-l-2 border-[#F05A28]/40 mt-1">
                            {parsed.cleanDescription}
                          </p>

                          {/* Symbols Bar for Accommodations, Meals, Activities, Distance */}
                          <ItinerarySymbolsBar 
                            meals={parsed.meals}
                            accommodation={parsed.accommodation}
                            activityType={parsed.activityType}
                            distance={parsed.distance}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* What's Included */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200/60 rounded-md">
              <h4 className="font-semibold text-emerald-900 text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                What is Included
              </h4>
              {trip.includes && trip.includes.length > 0 ? (
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                  {trip.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold text-xs mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-600">
                  Includes licensed English-speaking scholar guide, boutique accommodations, private ground transportation, site admissions, and daily breakfast.
                </p>
              )}
            </div>

            {/* What's Excluded */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
              <h4 className="font-semibold text-neutral-900 text-sm mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-neutral-400 shrink-0" />
                What is Excluded
              </h4>
              {trip.excludes && trip.excludes.length > 0 ? (
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
                  {trip.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-400 font-bold text-xs mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-600">
                  Excludes international flights, personal travel insurance, and discretionary gratuities.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-600 hidden sm:block">
            <span>Official TURSAB Licensed #{COMPANY_CONTACT.tursabNumber} Ground Operations</span>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2.5 justify-end flex-wrap">
            <button
              onClick={handleExportPdf}
              className="px-3.5 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              title="Download / Print PDF Itinerary"
            >
              <Printer className="w-4 h-4 text-[#F05A28]" />
              <span>PDF Out</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onRequestProposal(trip);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#111111] hover:bg-[#F05A28] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Request Custom Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
