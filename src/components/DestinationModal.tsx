import React from 'react';
import { Destination } from '../types';
import { TripPhotoSlider } from './TripPhotoSlider';
import { 
  X, 
  MapPin, 
  Plane, 
  Sun, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Clock,
  Landmark,
  Utensils,
  Navigation,
  Globe2
} from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (destName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTrip,
}) => {
  if (!destination) return null;

  const destinationImages = destination.images && destination.images.length > 0
    ? destination.images
    : [destination.heroImage, ...(destination.galleryImages || [])];
  const destinationCaptions = destination.imageCaptions || [];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 flex justify-center items-start animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden z-10 my-2 sm:my-6 border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Sticky Clean Header Bar */}
        <div className="sticky top-0 z-30 px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#F05A28]">
              <span>{destination.region} Region</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500 font-normal">{destination.regionTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight mt-0.5">
              {destination.name}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>{destination.airportCode}</span>
            </span>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer border border-neutral-200"
              aria-label="Close modal"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Photo Interactive Slider */}
        <TripPhotoSlider
          images={destinationImages}
          captions={destinationCaptions}
          title={destination.name}
          aspectRatioClassName="h-56 sm:h-72"
        />

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 space-y-6 text-neutral-800">
          {/* Tagline */}
          <div className="text-sm sm:text-base font-serif italic text-neutral-800 bg-[#FAF9F6] p-3.5 rounded-md border-l-4 border-[#F05A28] border-r border-t border-b border-neutral-200">
            "{destination.tagline}"
          </div>

          <p className="text-sm sm:text-[15px] text-neutral-700 font-sans leading-relaxed">
            {destination.description}
          </p>

          {/* Useful Facts at a Glance */}
          {destination.quickFacts && (
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-neutral-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200/70 pb-2">
                <Globe2 className="w-4 h-4 text-[#F05A28]" />
                <span>Information at a Glance & Key Trade Facts</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Ideal Stay Duration</span>
                  </div>
                  <p className="font-bold text-neutral-900 pl-5">{destination.quickFacts.idealDuration}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold">
                    <Navigation className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Key Hubs & Towns</span>
                  </div>
                  <p className="font-bold text-neutral-900 pl-5">{destination.quickFacts.keyHubs}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Best For</span>
                  </div>
                  <p className="font-bold text-neutral-900 pl-5">{destination.quickFacts.bestFor}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Travel & Lodge Style</span>
                  </div>
                  <p className="font-bold text-neutral-900 pl-5">{destination.quickFacts.travelStyle}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold">
                    <Landmark className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Key UNESCO World Heritage</span>
                  </div>
                  <p className="font-bold text-neutral-900 pl-5">{destination.quickFacts.unescoSites}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold">
                    <Utensils className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Gastronomy Specialty</span>
                  </div>
                  <p className="font-bold text-neutral-900 pl-5">{destination.quickFacts.culinarySpecialty}</p>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Preview Images - Slim and Compact */}
          {destination.galleryImages.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Visual Field Notes
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {destination.galleryImages.map((img, i) => (
                  <div key={i} className="aspect-[16/9] rounded overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img
                      src={img}
                      alt={`${destination.name} preview ${i + 1}`}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2 Column Highlights and Signature Experiences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
            {/* Highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                <Compass className="w-4 h-4 text-[#F05A28]" />
                <span>Curated Highlights & Access</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-600">
                {destination.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusive Venues & Experiences */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Sparkles className="w-4 h-4 text-[#F05A28]" />
                  <span>Signature Baobab Experiences</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {destination.signatureExperiences.map((exp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F05A28] font-bold">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Building2 className="w-4 h-4 text-[#F05A28]" />
                  <span>Exclusive Partner Venues</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {destination.exclusiveVenues.map((v, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-100 text-neutral-800 text-[11px] font-semibold rounded border border-neutral-200"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Best Season Box */}
          <div className="p-3.5 bg-[#FAF9F6] rounded border border-neutral-200 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-neutral-700">
              <Sun className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Recommended Season: <strong>{destination.bestSeason}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Back to Overview
          </button>

          <button
            onClick={() => {
              onClose();
              onPlanTrip(destination.name);
            }}
            className="px-6 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-md active:scale-95"
          >
            <span>Request Proposal for {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
