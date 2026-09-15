import React from 'react';
import { VenueShowcase } from '../types';
import { X, MapPin, Users, Sparkles, Building2, ArrowRight } from 'lucide-react';

interface VenueModalProps {
  venue: VenueShowcase | null;
  onClose: () => void;
  onInquire: (venueName: string) => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({
  venue,
  onClose,
  onInquire,
}) => {
  if (!venue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-3xl rounded-md shadow-2xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="relative aspect-[16/9] w-full bg-black">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-1 rounded bg-[#F05A28] text-white text-[10px] font-bold uppercase tracking-wider">
              {venue.type}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
              {venue.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-neutral-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                {venue.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                {venue.capacity}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5 text-neutral-800">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Architectural & Event Profile
            </div>
            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              {venue.description}
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F6] rounded border border-neutral-200 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
              Recommended Formats
            </div>
            <p className="text-xs text-neutral-800 font-semibold">
              {venue.idealFor}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-800"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onInquire(venue.name);
              }}
              className="px-6 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Request Venue Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
