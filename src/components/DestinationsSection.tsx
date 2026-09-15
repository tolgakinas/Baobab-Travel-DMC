import React, { useState } from 'react';
import { DESTINATIONS } from '../data/dmcData';
import { Destination } from '../types';
import { 
  MapPin, 
  Sparkles, 
  ArrowUpRight, 
  Plane, 
  Sun, 
  Compass, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface DestinationsSectionProps {
  onSelectDestination: (dest: Destination) => void;
  onPlanTripToDestination: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  onPlanTripToDestination,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = [
    'All',
    'Marmara',
    'Central Anatolia',
    'Mediterranean',
    'Aegean',
    'Black Sea',
    'North Aegean & Marmara',
    'Eastern & Southeastern'
  ];

  const filteredDestinations = selectedRegion === 'All' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.region === selectedRegion);

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#FAF9F6] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
              <Compass className="w-4 h-4" />
              <span>Major Destinations of Turkiye • Operational Hubs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-neutral-900 leading-tight">
              A Tapestry of Continents, <br />
              <span className="italic font-light">Empires & Diverse Terrains</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
              Explore Turkiye’s 8 premier travel regions. From the imperial shores of Istanbul and volcanic fairy chimneys of Cappadocia to the Lycian Turquoise Coast, Ephesus, Pamukkale thermal travertines, misty Pontic Black Sea plateaus, ancient Troy, and Lake Van & Mount Ararat in Upper Mesopotamia.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/70 rounded-md">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-150 ${
                  selectedRegion === region
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/40'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-lg overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Clean Text Header: crystal clear readability, no text over image */}
              <div className="p-5 pb-3 border-b border-neutral-100 bg-white">
                <div className="flex items-center justify-between gap-2 mb-1.5 min-w-0">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F05A28] truncate min-w-0">
                    {dest.region}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-bold rounded shrink-0 whitespace-nowrap">
                    <Plane className="w-3 h-3 text-[#F05A28] shrink-0" />
                    <span>{dest.airportCode}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 tracking-tight leading-snug group-hover:text-[#F05A28] transition-colors line-clamp-2 min-h-[3.25rem] flex items-center">
                  {dest.name}
                </h3>
                <div className="text-[11px] text-neutral-500 font-sans mt-0.5 truncate">
                  {dest.regionTag}
                </div>
              </div>

              {/* Narrower Photo Banner (Compact 16/7 aspect ratio instead of large 16/11) */}
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-neutral-100">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Body Content - crisp, spacious & highly readable */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-[13px] text-neutral-700 font-sans leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                {/* Useful Facts at a Glance */}
                {dest.quickFacts && (
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#FAF9F6] rounded border border-neutral-200/80 text-[11px]">
                    <div>
                      <span className="text-neutral-500 uppercase font-bold block text-[10px]">Duration:</span>
                      <span className="font-semibold text-neutral-900">{dest.quickFacts.idealDuration}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 uppercase font-bold block text-[10px]">Travel Style:</span>
                      <span className="font-semibold text-neutral-900 truncate block">{dest.quickFacts.travelStyle}</span>
                    </div>
                  </div>
                )}

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    DMC Signature Privileges
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {dest.highlights.slice(0, 2).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#F05A28] font-bold leading-none mt-0.5">•</span>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Season */}
                <div className="flex items-center gap-2 text-[11px] text-neutral-600 bg-neutral-50 px-2.5 py-1.5 rounded border border-neutral-200/60">
                  <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{dest.bestSeason}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="w-full py-2 px-3 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors flex items-center justify-center gap-1 group/btn"
                  >
                    <span>View Facts</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-[#F05A28]" />
                  </button>

                  <button
                    onClick={() => onPlanTripToDestination(dest.name)}
                    className="w-full py-2 px-3 text-xs font-bold text-white bg-[#111111] hover:bg-[#F05A28] rounded transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Plan Tour</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
