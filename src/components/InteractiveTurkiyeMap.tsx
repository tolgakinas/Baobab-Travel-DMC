import React, { useState, useRef, useEffect } from 'react';
import { 
  MAP_DESTINATIONS, 
  MAP_POIS, 
  MapPOI, 
  MapDestination 
} from '../data/turkiyeMapData';
import { 
  MapPin, 
  Sparkles, 
  X, 
  Compass, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Layers, 
  Send,
  Navigation,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Plane,
  Anchor,
  Eye,
  Info
} from 'lucide-react';

interface InteractiveTurkiyeMapProps {
  onOpenInquiry?: (initialData?: Record<string, any>) => void;
  className?: string;
  defaultDestinationId?: string;
}

export const InteractiveTurkiyeMap: React.FC<InteractiveTurkiyeMapProps> = ({
  onOpenInquiry,
  className = '',
  defaultDestinationId
}) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(defaultDestinationId || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePoi, setActivePoi] = useState<MapPOI | null>(null);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mapContainerRef.current && !mapContainerRef.current.contains(e.target as Node)) {
        // keep activePoi or close if outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter POIs
  const filteredPois = MAP_POIS.filter(poi => {
    const matchesDest = selectedDestinationId === 'all' || poi.destinationId === selectedDestinationId;
    const matchesCat = selectedCategory === 'all' || poi.category === selectedCategory;
    return matchesDest && matchesCat;
  });

  const activeDestination = MAP_DESTINATIONS.find(d => d.id === selectedDestinationId);

  const categories = [
    'all',
    'UNESCO World Heritage',
    'Ancient Wonder',
    'Natural Phenomenon',
    'Nautical & Coast',
    'Active Adventure',
    'Cultural Heritage',
    'Sacred Heritage'
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UNESCO World Heritage':
        return '#F05A28'; // Primary Brand Orange
      case 'Ancient Wonder':
        return '#EAB308'; // Gold / Yellow
      case 'Natural Phenomenon':
        return '#10B981'; // Emerald Green
      case 'Nautical & Coast':
        return '#06B6D4'; // Cyan
      case 'Active Adventure':
        return '#EC4899'; // Pink / Magenta
      case 'Cultural Heritage':
        return '#8B5CF6'; // Purple
      case 'Sacred Heritage':
        return '#3B82F6'; // Blue
      default:
        return '#F05A28';
    }
  };

  const handleInquirePoi = (poi: MapPOI) => {
    if (onOpenInquiry) {
      onOpenInquiry({
        destination: poi.destinationName,
        destinations: [poi.destinationName],
        specialRequests: `Interested in private VIP program including landmark: ${poi.name} (${poi.turkishName}). Category: ${poi.category}.`
      });
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(0.9, prev + delta), 1.6));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedDestinationId('all');
    setSelectedCategory('all');
    setActivePoi(null);
  };

  return (
    <div className={`flex flex-col bg-neutral-950 text-white rounded-xl overflow-hidden border border-neutral-800 ${className}`} ref={mapContainerRef}>
      {/* Top Controls Bar */}
      <div className="p-4 sm:p-5 bg-neutral-900/90 border-b border-neutral-800 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-[#F05A28]/20 border border-[#F05A28]/40 text-[#F05A28]">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-2">
                <span>Interactive Turkiye POI & Logistics Map</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Dispatch
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Select a destination or click any landmark pin to inspect real-time specs, photos & DMC insider tips
              </p>
            </div>
          </div>

          {/* Quick Map Settings Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-2.5 py-1 text-xs rounded-md border flex items-center gap-1.5 transition-colors ${
                showRoutes 
                  ? 'bg-neutral-800 text-white border-[#F05A28]/60 shadow-sm' 
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-neutral-200'
              }`}
              title="Toggle domestic flight and transit corridors"
            >
              <Plane className="w-3.5 h-3.5 text-[#F05A28]" />
              <span className="text-[11px] font-medium hidden xs:inline">Corridors</span>
            </button>

            <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-900 p-0.5">
              <button
                onClick={() => handleZoom(0.15)}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom(-0.15)}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleReset}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors ml-0.5 border-l border-neutral-800 pl-1.5"
                title="Reset Map View"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Selectable Destination Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-neutral-700">
          <button
            onClick={() => setSelectedDestinationId('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition-all ${
              selectedDestinationId === 'all'
                ? 'bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/20'
                : 'bg-neutral-850 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-750'
            }`}
          >
            All Turkiye ({MAP_POIS.length} POIs)
          </button>

          {MAP_DESTINATIONS.map((dest) => {
            const isSelected = selectedDestinationId === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => {
                  setSelectedDestinationId(dest.id);
                  // Find first POI in destination if exists
                  const firstPoi = MAP_POIS.find(p => p.destinationId === dest.id);
                  if (firstPoi) {
                    setActivePoi(firstPoi);
                  }
                }}
                className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#F05A28] text-white border-[#F05A28] shadow-md shadow-[#F05A28]/20'
                    : 'bg-neutral-850 text-neutral-300 hover:bg-neutral-800 hover:text-white border-neutral-750'
                }`}
              >
                <span>{dest.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-neutral-750 text-neutral-400'}`}>
                  {dest.poiCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
          <span className="text-neutral-500 font-medium mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-neutral-400" />
            <span>Filter POIs:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded text-[11px] transition-colors ${
                selectedCategory === cat
                  ? 'bg-neutral-700 text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              {cat === 'all' ? 'Show All Types' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="relative w-full bg-[#0a0f18] overflow-hidden min-h-[360px] sm:min-h-[420px] select-none">
        {/* Subtle Map Atmosphere Grids */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#F05A28 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />

        {/* Dynamic Zoom Wrapper */}
        <div 
          className="w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full block"
            style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))' }}
          >
            <defs>
              {/* Radial glow for POI pins */}
              <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F05A28" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F05A28" stopOpacity="0" />
              </radialGradient>

              {/* Linear gradient for flight routes */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F05A28" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F05A28" stopOpacity="0.7" />
              </linearGradient>

              {/* Landmass Shading Pattern */}
              <linearGradient id="landmassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#172233" />
                <stop offset="50%" stopColor="#111A29" />
                <stop offset="100%" stopColor="#0D1420" />
              </linearGradient>

              {/* Active Region Highlight */}
              <radialGradient id="activeRegionGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F05A28" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F05A28" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Surrounding Seas & Water Bodies Labels */}
            <g className="font-serif text-[11px] font-medium tracking-widest fill-sky-500/30 uppercase select-none pointer-events-none">
              <text x="490" y="45" textAnchor="middle">Black Sea (Karadeniz)</text>
              <text x="60" y="320" textAnchor="middle">Aegean Sea</text>
              <text x="330" y="465" textAnchor="middle">Mediterranean Sea (Akdeniz)</text>
              <text x="175" y="105" textAnchor="middle">Marmara</text>
            </g>

            {/* Turkey Master Landmass Path */}
            {/* Precise Anatolian polygon incorporating Thrace, Bosphorus, Dardanelles, Aegean coast, Turquoise coast, Mediterranean, and eastern borders */}
            <g>
              {/* Main Anatolia & Thrace */}
              <path
                d="
                  M 120 120 
                  C 140 100, 180 90, 215 110
                  C 225 115, 230 125, 230 135
                  C 240 130, 260 115, 300 110
                  C 370 100, 430 95, 490 85
                  C 530 80, 560 90, 580 95
                  C 620 100, 680 110, 750 115
                  C 790 120, 830 125, 870 145
                  C 890 155, 930 180, 940 210
                  C 945 230, 920 250, 910 270
                  C 900 290, 880 320, 850 340
                  C 820 360, 780 375, 740 370
                  C 680 365, 630 380, 580 385
                  C 530 390, 480 380, 440 380
                  C 400 380, 360 395, 320 380
                  C 280 370, 250 405, 220 400
                  C 190 395, 170 375, 150 370
                  C 140 360, 130 340, 140 320
                  C 130 300, 120 270, 140 240
                  C 130 220, 110 200, 95 180
                  C 85 160, 95 140, 120 120 
                  Z
                "
                fill="url(#landmassGrad)"
                stroke="#2a3b53"
                strokeWidth="1.8"
                className="transition-all duration-300"
              />

              {/* Thrace / European Istanbul Segment */}
              <path
                d="
                  M 120 120
                  C 135 105, 160 95, 195 95
                  C 215 95, 225 110, 215 125
                  C 195 135, 160 145, 135 150
                  C 120 150, 110 135, 120 120
                  Z
                "
                fill="url(#landmassGrad)"
                stroke="#334766"
                strokeWidth="1.5"
              />

              {/* Major Inland Lakes: Lake Van & Lake Tuz */}
              {/* Lake Van */}
              <path
                d="
                  M 830 235
                  C 845 220, 875 225, 870 245
                  C 865 260, 840 265, 830 250
                  Z
                "
                fill="#0a0f18"
                stroke="#0284c7"
                strokeWidth="1.2"
              />
              <text x="850" y="245" className="text-[9px] fill-sky-400/60 font-sans" textAnchor="middle">L. Van</text>

              {/* Lake Tuz */}
              <ellipse
                cx="420"
                cy="235"
                rx="22"
                ry="14"
                fill="#0a0f18"
                stroke="#0284c7"
                strokeWidth="1"
              />
              <text x="420" y="238" className="text-[8px] fill-sky-400/50 font-sans" textAnchor="middle">L. Tuz</text>
            </g>

            {/* Selected Destination Area Halo */}
            {activeDestination && activeDestination.id !== 'all' && (
              <g>
                <circle
                  cx={activeDestination.x}
                  cy={activeDestination.y}
                  r="55"
                  fill="url(#activeRegionGlow)"
                  className="animate-pulse"
                />
                <circle
                  cx={activeDestination.x}
                  cy={activeDestination.y}
                  r="45"
                  fill="none"
                  stroke="#F05A28"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
              </g>
            )}

            {/* Operational Flight / Transit Corridors */}
            {showRoutes && (
              <g className="transition-opacity duration-300">
                {/* Istanbul <-> Cappadocia */}
                <path
                  d="M 215 135 Q 350 160 485 260"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                  opacity="0.75"
                />
                {/* Istanbul <-> Izmir/Ephesus */}
                <path
                  d="M 215 135 Q 160 200 145 295"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                  opacity="0.75"
                />
                {/* Istanbul <-> Turquoise Coast (Dalaman) */}
                <path
                  d="M 215 135 Q 180 260 220 380"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="1.4"
                  strokeDasharray="5 4"
                  opacity="0.6"
                />
                {/* Cappadocia <-> Antalya */}
                <path
                  d="M 485 260 Q 400 320 310 365"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                  opacity="0.65"
                />
                {/* Istanbul <-> Gobeklitepe / Urfa */}
                <path
                  d="M 215 135 Q 450 200 670 340"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="1.4"
                  strokeDasharray="5 4"
                  opacity="0.5"
                />
                {/* Istanbul <-> Trabzon Black Sea */}
                <path
                  d="M 215 135 Q 460 100 710 135"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="1.4"
                  strokeDasharray="5 4"
                  opacity="0.5"
                />
              </g>
            )}

            {/* Destination Hub Labels & Anchors */}
            <g className="select-none">
              {MAP_DESTINATIONS.map((dest) => {
                const isSelected = selectedDestinationId === dest.id;
                return (
                  <g 
                    key={dest.id} 
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedDestinationId(dest.id);
                      const destPoi = MAP_POIS.find(p => p.destinationId === dest.id);
                      if (destPoi) setActivePoi(destPoi);
                    }}
                  >
                    <circle
                      cx={dest.x}
                      cy={dest.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#F05A28' : '#38bdf8'}
                      className="transition-all duration-200"
                    />
                    <text
                      x={dest.x}
                      y={dest.labelPosition === 'top' ? dest.y - 12 : dest.y + 18}
                      textAnchor="middle"
                      className={`text-[11px] font-bold tracking-tight transition-all ${
                        isSelected 
                          ? 'fill-[#F05A28] text-xs font-serif' 
                          : 'fill-neutral-300 group-hover:fill-white'
                      }`}
                    >
                      {dest.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* POI Markers & Pins */}
            <g>
              {filteredPois.map((poi) => {
                const isActive = activePoi?.id === poi.id;
                const pinColor = getCategoryColor(poi.category);

                return (
                  <g
                    key={poi.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePoi(poi);
                    }}
                  >
                    {/* Pulsing ring if active */}
                    {isActive && (
                      <circle
                        cx={poi.x}
                        cy={poi.y}
                        r="18"
                        fill="none"
                        stroke={pinColor}
                        strokeWidth="2"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Glow Halo */}
                    <circle
                      cx={poi.x}
                      cy={poi.y}
                      r={isActive ? 11 : 7}
                      fill={pinColor}
                      opacity={isActive ? 0.35 : 0.2}
                    />

                    {/* Inner Pin Head */}
                    <circle
                      cx={poi.x}
                      cy={poi.y}
                      r={isActive ? 6.5 : 4.5}
                      fill={pinColor}
                      stroke="#FFFFFF"
                      strokeWidth={isActive ? 2 : 1.2}
                      className="transition-all duration-150"
                    />

                    {/* Floating Label for Active POI */}
                    {isActive && (
                      <g className="pointer-events-none">
                        <rect
                          x={poi.x - 70}
                          y={poi.y - 28}
                          width="140"
                          height="18"
                          rx="4"
                          fill="#000000"
                          opacity="0.85"
                          stroke={pinColor}
                          strokeWidth="0.8"
                        />
                        <text
                          x={poi.x}
                          y={poi.y - 16}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          className="text-[9px] font-bold"
                        >
                          {poi.name.length > 22 ? poi.name.slice(0, 20) + '...' : poi.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Map Watermark & Category Legend Pill */}
        <div className="absolute bottom-3 left-3 bg-neutral-950/85 backdrop-blur-md p-2.5 rounded-lg border border-neutral-800 text-[10px] space-y-1.5 shadow-lg hidden sm:block">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            POI Categories
          </div>
          <div className="flex flex-col gap-1 text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F05A28]" />
              <span>UNESCO World Heritage</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
              <span>Ancient Wonders</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Nature & Travertines</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
              <span>Nautical & Coast</span>
            </span>
          </div>
        </div>

        {/* POI Interactive Small Pop-Up Overlay (On-Map Card) */}
        {activePoi && (
          <div 
            className="absolute z-30 top-4 right-4 sm:top-5 sm:right-5 w-[290px] sm:w-[320px] bg-neutral-900/95 backdrop-blur-md border border-neutral-750 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pop-Up Header Thumbnail Image */}
            <div className="relative h-32 w-full overflow-hidden bg-neutral-800">
              <img
                src={activePoi.thumbnail}
                alt={activePoi.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
              
              {/* Category Badge */}
              <span 
                className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: getCategoryColor(activePoi.category) }}
              >
                {activePoi.category}
              </span>

              {/* Close Button */}
              <button
                onClick={() => setActivePoi(null)}
                className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Destination Tag */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-200">
                <span className="font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F05A28]" />
                  <span>{activePoi.destinationName}</span>
                </span>
                <span className="text-[10px] text-neutral-400">
                  {activePoi.recommendedDuration}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-3.5 space-y-2.5 text-left">
              <div>
                <h4 className="font-serif font-bold text-white text-sm leading-snug">
                  {activePoi.name}
                </h4>
                <div className="text-[10px] text-neutral-400 italic">
                  {activePoi.turkishName}
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                {activePoi.overview}
              </p>

              {/* Insider DMC Tip */}
              <div className="p-2 rounded bg-neutral-800/90 border border-neutral-700/60 text-[11px] space-y-1">
                <div className="font-bold text-[#F05A28] flex items-center gap-1 text-[10px] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>DMC Insider Recommendation</span>
                </div>
                <p className="text-neutral-300 text-[10px] leading-relaxed">
                  {activePoi.insiderTip}
                </p>
              </div>

              {/* Meta Timing info */}
              <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-neutral-800">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{activePoi.bestTime}</span>
                </span>
              </div>

              {/* Quick Inquiry / Add to Tour Button */}
              <button
                onClick={() => handleInquirePoi(activePoi)}
                className="w-full mt-1 py-2 px-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Include In Tour Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Destination Quick Summary Footer */}
      {activeDestination && activeDestination.id !== 'all' && (
        <div className="p-3.5 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="p-1 rounded bg-[#F05A28]/20 text-[#F05A28] mt-0.5 sm:mt-0 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="font-bold text-white text-xs mr-2">{activeDestination.name}</span>
              <span className="text-neutral-400 text-[11px]">{activeDestination.description}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-neutral-400 shrink-0">
            <span>Gateway: <strong className="text-white">{activeDestination.airport}</strong></span>
            <span className="text-neutral-600">•</span>
            <span>Key POIs: <strong className="text-[#F05A28]">{activeDestination.poiCount}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
