import React from 'react';
import { EXCLUSIVE_VENUES } from '../data/dmcData';
import { VenueShowcase } from '../types';
import { useSiteContent } from '../context/SiteContentContext';
import { MapPin, Users, Sparkles, Building2, ArrowRight } from 'lucide-react';

interface VenuesSectionProps {
  onSelectVenue: (venue: VenueShowcase) => void;
  onInquireVenue: (venueName: string) => void;
}

export const VenuesSection: React.FC<VenuesSectionProps> = ({
  onSelectVenue,
  onInquireVenue,
}) => {
  const { content } = useSiteContent();
  const venuesList = content?.venues && content.venues.length > 0 ? content.venues : EXCLUSIVE_VENUES;

  return (
    <section id="venues" className="py-20 sm:py-28 bg-[#181A1E] text-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              <Building2 className="w-4 h-4" />
              <span>Heritage Sanctuaries & Lodges</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-white leading-tight">
              Boutique Cave Suites, Lodges <br />
              <span className="italic font-light text-neutral-300">& Ancient Sites Unlocked</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              We coordinate special permits for quiet, intimate visits inside Turkey’s most protected historic monuments, 
              and partner with authentic boutique cave hotels, restored stone mansions, and eco-lodges for small groups.
            </p>
          </div>

          <button
            onClick={() => onInquireVenue('Special Heritage Site & Lodge Sourcing')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-sm border border-white/20 transition-colors"
          >
            <span>Bespoke Lodge Sourcing</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F05A28]" />
          </button>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {venuesList.map((venue) => (
            <div
              key={venue.id}
              className="bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden group hover:border-[#F05A28]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div 
                onClick={() => onSelectVenue(venue)}
                className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
                title="Click to view details"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/10">
                  <Sparkles className="w-3 h-3 text-[#F05A28]" />
                  <span>{venue.type}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-1 text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded">
                    <Users className="w-3 h-3 text-neutral-400" />
                    <span>{venue.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 
                    onClick={() => onSelectVenue(venue)}
                    className="text-xl font-serif font-bold text-white tracking-tight group-hover:text-[#F05A28] transition-colors cursor-pointer"
                  >
                    {venue.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed mt-2">
                    {venue.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#F05A28]">
                    Ideal Experience
                  </div>
                  <div className="text-xs text-neutral-300 font-medium leading-normal">
                    {venue.idealFor}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectVenue(venue)}
                    className="flex-1 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded border border-neutral-700/60 transition-colors text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onInquireVenue(venue.name)}
                    className="flex-1 py-2.5 px-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
