import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight, 
  Search, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  FileText,
  Printer
} from 'lucide-react';
import { AtlasTrip } from '../types';
import { ATLAS_TURKEY_TRIPS } from '../data/tripsData';
import { exportItineraryToPdf } from '../utils/pdfExport';

interface AtlasTripsSectionProps {
  onSelectTrip: (trip: AtlasTrip) => void;
  onRequestProposal: (trip: AtlasTrip) => void;
}

export const AtlasTripsSection: React.FC<AtlasTripsSectionProps> = ({
  onSelectTrip,
  onRequestProposal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Tours' },
    { id: 'Day Tours', label: 'Day Tours (Istanbul)' },
    { id: 'Active Adventure & Hiking', label: 'Active & Hiking' },
    { id: 'Culinary & Cultural Expedition', label: 'Culinary & Cultural' },
    { id: 'Iconic Rail Journey', label: 'Scenic Rail' },
    { id: 'Historical & Heritage Tour', label: 'Heritage & Biblical' },
    { id: 'City Break & Walking Tour', label: 'City Breaks' },
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'day', label: 'Day Tours' },
    { id: 'short', label: '2–4 Days' },
    { id: 'week', label: '5–8 Days' },
    { id: 'grand', label: '9–18 Days' },
  ];

  const filteredTrips = useMemo(() => {
    return ATLAS_TURKEY_TRIPS.filter((trip) => {
      // Category match
      if (selectedCategory !== 'all' && trip.category !== selectedCategory) {
        return false;
      }

      // Duration match
      if (selectedDuration === 'day' && trip.daysCount !== 1) {
        return false;
      }
      if (selectedDuration === 'short' && (trip.daysCount < 2 || trip.daysCount > 4)) {
        return false;
      }
      if (selectedDuration === 'week' && (trip.daysCount < 5 || trip.daysCount > 8)) {
        return false;
      }
      if (selectedDuration === 'grand' && trip.daysCount < 9) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = trip.title.toLowerCase().includes(query);
        const matchesDesc = trip.description.toLowerCase().includes(query);
        const matchesDest = trip.destinations.some((d) => d.toLowerCase().includes(query));
        const matchesCat = trip.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesDest && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedDuration, searchQuery]);

  return (
    <section id="trips" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#F05A28] text-xs font-bold uppercase tracking-widest rounded-full mb-3 backdrop-blur-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>B2B Tour Portfolio for International Agencies & Operators</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white mb-4">
            Turkey Guided Trips & Small Group Adventures
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Curated turnkey itineraries (2–12 guests) designed for tour operators, travel agencies, and travel consultants worldwide. Available as private departures or small group series with guaranteed B2B net wholesale pricing, white-label client roadbooks, and licensed scholar guide execution.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-800/80 border border-neutral-700/70 rounded-lg p-4 mb-10 shadow-lg backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination (e.g. Cappadocia, Rail, Kas, Istanbul)..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-900/90 border border-neutral-700 rounded text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F05A28] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Duration Filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-neutral-400 font-medium mr-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Duration:
              </span>
              {durations.map((dur) => (
                <button
                  key={dur.id}
                  onClick={() => setSelectedDuration(dur.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    selectedDuration === dur.id
                      ? 'bg-[#F05A28] text-white shadow-xs'
                      : 'bg-neutral-900/70 text-neutral-300 hover:bg-neutral-700/60'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-700/60 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-neutral-400 font-medium shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Style:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter & Result Info */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 px-1">
          <div>
            Showing <span className="text-white font-bold">{filteredTrips.length}</span> of {ATLAS_TURKEY_TRIPS.length} Turkey trips
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Net Wholesale & Private Custom Rates on Request</span>
          </div>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16 bg-neutral-800/40 rounded-lg border border-neutral-700/50">
            <Compass className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">No matching Turkey trips found</h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-4">
              Try adjusting your search query or selecting &quot;All 15 Trips&quot; to see our full Turkey catalog.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#F05A28] hover:bg-[#d9491b] text-white text-xs font-bold rounded transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="group bg-neutral-800/70 rounded-lg border border-neutral-700/70 overflow-hidden flex flex-col hover:border-neutral-500 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Card Image */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900 shrink-0">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 bg-[#F05A28] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-xs">
                      {trip.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold rounded-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#F05A28]" />
                      {trip.duration}
                    </span>
                  </div>

                  {/* Pax on image bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                    <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-[11px]">
                      <Users className="w-3 h-3 text-neutral-400" />
                      {trip.groupSize}
                    </span>
                    <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Guaranteed Departure
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Destinations Tags */}
                    <div className="flex flex-wrap items-center gap-1 mb-2.5 text-[11px] text-neutral-400">
                      <MapPin className="w-3 h-3 text-[#F05A28] shrink-0" />
                      {trip.destinations.slice(0, 4).map((d, idx) => (
                        <span key={idx} className="bg-neutral-700/60 text-neutral-300 px-1.5 py-0.5 rounded text-[10px] font-medium">
                          {d}
                        </span>
                      ))}
                      {trip.destinations.length > 4 && (
                        <span className="text-neutral-500 text-[10px]">
                          +{trip.destinations.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectTrip(trip)}
                      className="font-serif text-lg sm:text-xl font-semibold text-white group-hover:text-[#F05A28] transition-colors cursor-pointer line-clamp-2"
                    >
                      {trip.title}
                    </h3>

                    {/* Brief description */}
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                      {trip.description}
                    </p>

                    {/* Key Highlights bullet list */}
                    {trip.highlights && trip.highlights.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-neutral-700/50 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#F05A28]" />
                          Signature Highlights:
                        </div>
                        {trip.highlights.slice(0, 2).map((hl, i) => (
                          <div key={i} className="text-xs text-neutral-300 flex items-start gap-1.5 line-clamp-1">
                            <span className="text-[#F05A28] font-bold text-xs shrink-0">•</span>
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom / Actions */}
                  <div className="pt-3 border-t border-neutral-700/60">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-3">
                      <span className="text-neutral-400">B2B Wholesale:</span>
                      <span className="font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px]">
                        Net Confidential Tariff
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      <button
                        onClick={() => onSelectTrip(trip)}
                        className="w-full py-2.5 px-2 bg-neutral-700/80 hover:bg-neutral-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        title="View detailed day-by-day itinerary schedule"
                      >
                        <span>Daily Itinerary</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onRequestProposal(trip)}
                        className="w-full py-2.5 px-2 bg-[#F05A28] hover:bg-[#d9491b] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        title={`Request Custom Proposal regarding ${trip.title}`}
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Request Proposal</span>
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        exportItineraryToPdf(trip);
                      }}
                      className="w-full py-1.5 px-2 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-700/70 hover:border-neutral-500 text-neutral-300 hover:text-white rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all"
                      title="Download or print complete itinerary as PDF"
                    >
                      <Printer className="w-3 h-3 text-[#F05A28]" />
                      <span>PDF Out (Printable Itinerary)</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 bg-neutral-800/50 border border-neutral-700/70 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">
                B2B Custom Itinerary Tailoring & White-Label Operating
              </div>
              <div className="text-xs text-neutral-400">
                All 15 programs can be customized for your agency's brand, closed private departures, affinity groups, or fixed-date catalog series with bespoke pacing and lodge upgrades.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const firstTrip = ATLAS_TURKEY_TRIPS[0];
              onRequestProposal(firstTrip);
            }}
            className="shrink-0 px-5 py-2.5 bg-white text-neutral-900 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
          >
            <span>Request Custom Tour Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
