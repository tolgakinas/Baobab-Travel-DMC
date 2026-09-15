import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Plane, 
  Car, 
  Anchor, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  Send
} from 'lucide-react';

interface RoutePlannerProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
}

interface PredefinedRoute {
  id: string;
  name: string;
  recommendedDays: number;
  stops: { name: string; nights: number; mode: string }[];
  description: string;
  highlights: string[];
}

const PREDEFINED_ROUTES: PredefinedRoute[] = [
  {
    id: 'classic-triangle',
    name: 'The Golden Triangle (Istanbul • Cappadocia • Ephesus)',
    recommendedDays: 8,
    stops: [
      { name: 'Istanbul', nights: 3, mode: 'Domestic Air (1h 15m)' },
      { name: 'Cappadocia', nights: 2, mode: 'Domestic Air via ADB (1h 20m)' },
      { name: 'Ephesus & Izmir', nights: 2, mode: 'Private VIP Mercedes Sprinter' },
      { name: 'Istanbul (Transit)', nights: 1, mode: 'International Departure' }
    ],
    description: 'The definitive first-time luxury itinerary combining imperial Byzantine/Ottoman heritage, sunrise hot air ballooning, and ancient Greco-Roman wonders.',
    highlights: ['Bosphorus Superyacht Sunset', 'Sunrise Private Balloon Flight', 'Ephesus Library of Celsus Night Gala']
  },
  {
    id: 'riviera-gulet',
    name: 'Ottoman Splendor & Turquoise Coast Yacht Charter',
    recommendedDays: 10,
    stops: [
      { name: 'Istanbul', nights: 3, mode: 'Domestic Air to BJV (1h 10m)' },
      { name: 'Bodrum Marina', nights: 1, mode: 'Gulet Boarding' },
      { name: 'Turquoise Coast (Gulf of Gokova)', nights: 4, mode: 'Private Luxury Gulet Cruise' },
      { name: 'Gocek / Dalaman', nights: 2, mode: 'Flight to Istanbul & Departure' }
    ],
    description: 'The ultimate pairing of high culture and private nautical seclusion along Turkey’s crystalline Aegean bays.',
    highlights: ['Ciragan Palace Dinner', 'Private Chef Onboard Wooden Gulet', 'Secluded Lycian Cove Swimming']
  },
  {
    id: 'deep-heritage',
    name: 'Dawn of Civilization: Gobeklitepe, Cappadocia & Istanbul',
    recommendedDays: 9,
    stops: [
      { name: 'Istanbul', nights: 3, mode: 'Domestic Air to GNY (1h 45m)' },
      { name: 'Sanliurfa & Gobeklitepe', nights: 2, mode: 'Chauffeur to Cappadocia via Mount Nemrut' },
      { name: 'Cappadocia Valleys', nights: 3, mode: 'Flight to Istanbul' },
      { name: 'Istanbul', nights: 1, mode: 'International Departure' }
    ],
    description: 'A mind-expanding exploration for archaeology and anthropology enthusiasts, exploring 12,000-year-old temples and biblical landscapes.',
    highlights: ['Private Archaeologist Walkthrough', 'Mount Nemrut Colossal Statues', 'Cappadocia Cave Sanctuary']
  }
];

export const InteractiveRoutePlanner: React.FC<RoutePlannerProps> = ({ onOpenInquiry }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(PREDEFINED_ROUTES[0].id);

  const activeRoute = PREDEFINED_ROUTES.find(r => r.id === selectedRouteId) || PREDEFINED_ROUTES[0];

  const handleApplyRoute = () => {
    onOpenInquiry({
      tripType: 'Small Group Tour',
      destinations: activeRoute.stops.map(s => s.name),
      durationDays: activeRoute.recommendedDays,
      specialRequests: `Interested in program framework based on: ${activeRoute.name}`
    });
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-200 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F05A28]">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Logistics Architect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Optimized Travel Sequences Across Turkey
          </h2>
          <p className="text-sm text-neutral-600 font-sans leading-relaxed">
            Turkey spans two continents and 783,000 square kilometers. Avoid logistical backtracking 
            with our audited route blueprints designed for seamless air, land, and sea transitions.
          </p>
        </div>

        {/* Route Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {PREDEFINED_ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-4 text-left rounded border transition-all ${
                  isSelected 
                    ? 'bg-[#121316] text-white border-[#121316] shadow-md' 
                    : 'bg-[#FAF9F6] text-neutral-800 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#F05A28]' : 'text-neutral-500'}`}>
                  {route.recommendedDays} Days Recommended
                </div>
                <div className="text-sm font-bold font-serif tracking-tight mt-1 line-clamp-1">
                  {route.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Route Detail Visualizer */}
        <div className="p-6 sm:p-8 bg-[#FAF9F6] rounded-md border border-neutral-200 space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-neutral-900">
              {activeRoute.name}
            </h3>
            <p className="text-sm text-neutral-600 max-w-3xl">
              {activeRoute.description}
            </p>
          </div>

          {/* Stepped Timeline */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Optimized Sequence & Inter-City Transit
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeRoute.stops.map((stop, idx) => (
                <div key={idx} className="p-4 bg-white rounded border border-neutral-200 relative space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="w-5 h-5 rounded-full bg-[#F05A28] text-white flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-neutral-500 font-semibold text-[11px]">
                      {stop.nights} Nights
                    </span>
                  </div>

                  <div className="font-bold text-sm text-neutral-900 font-serif">
                    {stop.name}
                  </div>

                  <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 pt-1 border-t border-neutral-100">
                    <Plane className="w-3 h-3 text-[#F05A28] shrink-0" />
                    <span className="truncate">{stop.mode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Convert Button */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-neutral-500">
                Key Inclusions:
              </span>
              {activeRoute.highlights.map((h, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-white border border-neutral-200 font-medium text-neutral-800 text-[11px]">
                  ✓ {h}
                </span>
              ))}
            </div>

            <button
              onClick={handleApplyRoute}
              className="w-full sm:w-auto px-6 py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-95"
            >
              <span>Build Custom Tour Proposal from This Route</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
