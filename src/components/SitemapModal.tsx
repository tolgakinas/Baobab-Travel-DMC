import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  Compass, 
  Calendar, 
  FileCode, 
  ExternalLink, 
  Building2, 
  BookOpen, 
  Ship, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Video, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Route,
  Scale,
  Leaf,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import { ATLAS_TURKEY_TRIPS } from '../data/tripsData';
import { ISTANBUL_DAY_TOURS } from '../data/dayToursData';
import { DESTINATIONS, EXCLUSIVE_VENUES, SAMPLE_ITINERARIES, COMPANY_CONTACT } from '../data/dmcData';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { AtlasTrip } from '../types';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectDestination: (destId: string) => void;
  onSelectTrip: (trip: AtlasTrip) => void;
  onSelectBlogPost?: (post: BlogPost) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
  onOpenModernSlavery?: () => void;
  onOpenSustainableTourism?: () => void;
  onOpenResponsibleTravel?: () => void;
  onOpenB2BPanel?: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectDestination,
  onSelectTrip,
  onSelectBlogPost,
  onOpenInquiry,
  onOpenCalendly,
  onOpenModernSlavery,
  onOpenSustainableTourism,
  onOpenResponsibleTravel,
  onOpenB2BPanel
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Close on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = searchQuery.toLowerCase().trim();

  // Filtered trips
  const filteredTrips = ATLAS_TURKEY_TRIPS.filter(trip => 
    !q || trip.title.toLowerCase().includes(q) || 
    trip.category.toLowerCase().includes(q) ||
    trip.destinations.some(d => d.toLowerCase().includes(q))
  );

  // Filtered day tours
  const filteredDayTours = ISTANBUL_DAY_TOURS.filter(tour =>
    !q || tour.title.toLowerCase().includes(q) ||
    tour.category.toLowerCase().includes(q) ||
    tour.destinations.some(d => d.toLowerCase().includes(q))
  );

  // Filtered destinations
  const filteredDestinations = DESTINATIONS.filter(dest =>
    !q || dest.name.toLowerCase().includes(q) ||
    dest.region.toLowerCase().includes(q) ||
    dest.description.toLowerCase().includes(q)
  );

  // Filtered sample frameworks
  const filteredFrameworks = SAMPLE_ITINERARIES.filter(it =>
    !q || it.title.toLowerCase().includes(q) ||
    it.category.toLowerCase().includes(q) ||
    it.destinations.some(d => d.toLowerCase().includes(q))
  );

  // Filtered venues
  const filteredVenues = EXCLUSIVE_VENUES.filter(v =>
    !q || v.name.toLowerCase().includes(q) ||
    v.location.toLowerCase().includes(q) ||
    v.type.toLowerCase().includes(q)
  );

  // Filtered blogs
  const filteredBlogs = BLOG_POSTS.filter(b =>
    !q || b.title.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q) ||
    b.geoData.region.toLowerCase().includes(q)
  );

  // Navigation helper
  const handleJump = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      onNavigate(sectionId);
    }, 100);
  };

  const handleTripClick = (trip: AtlasTrip) => {
    onClose();
    setTimeout(() => {
      onSelectTrip(trip);
    }, 100);
  };

  const handleDestClick = (destId: string) => {
    onClose();
    setTimeout(() => {
      onSelectDestination(destId);
      onNavigate('destinations');
    }, 100);
  };

  const handleBlogClick = (post: BlogPost) => {
    onClose();
    if (onSelectBlogPost) {
      setTimeout(() => {
        onSelectBlogPost(post);
      }, 100);
    } else {
      setTimeout(() => {
        onNavigate('blog');
      }, 100);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-modal-title"
    >
      {/* Clickable Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative bg-[#FAF9F6] text-neutral-900 rounded-xl max-w-5xl w-full my-auto overflow-hidden shadow-2xl border border-neutral-200 z-10 flex flex-col max-h-[92vh]">
        {/* Pinned Header Bar */}
        <div className="sticky top-0 z-30 px-5 sm:px-8 py-4 bg-white border-b border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#F05A28]/10 text-[#F05A28] rounded">
                <Layers className="w-5 h-5" />
              </span>
              <h2 id="sitemap-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                Baobab DMC Site Map
              </h2>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                HTML & XML Directory
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Complete index of destinations, 15 multi-day Turkey expeditions, 14 Istanbul day tours, sample blueprints, venues, and B2B portals.
            </p>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold border border-neutral-300 transition-colors shadow-2xs"
              title="Open raw XML sitemap for SEO spiders & search engines"
            >
              <FileCode className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>View sitemap.xml</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-[#F05A28] text-white text-xs font-bold transition-all shadow-sm"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="px-5 sm:px-8 py-3 bg-neutral-50/90 border-b border-neutral-200 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sitemap for tours, destinations, venues, or guides..."
              className="w-full pl-9 pr-8 py-1.5 bg-white border border-neutral-300 rounded text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-[11px] text-neutral-500 whitespace-nowrap hidden sm:inline-block">
            {filteredTrips.length + filteredDayTours.length + filteredDestinations.length + filteredFrameworks.length + filteredVenues.length + filteredBlogs.length} items mapped
          </span>
        </div>

        {/* Scrollable Sitemap Tree Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-10 flex-1">
          {/* Section 1: Main Website Sections & Functional Links */}
          <div>
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-neutral-300">
              <Compass className="w-4 h-4 text-[#F05A28]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Core Website Sections & Portals
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {[
                { name: 'Home & Hero', section: 'hero', desc: 'Welcome banner & intro' },
                { name: 'Trips Portfolio (15)', section: 'trips', desc: 'Active & cultural tours' },
                { name: 'Destinations Hub', section: 'destinations', desc: '9 Turkey regions' },
                { name: 'B2B DMC Services', section: 'services', desc: 'Incoming operations' },
                { name: 'Sample Frameworks', section: 'itineraries', desc: 'Tested blueprints' },
                { name: 'Route Planner (Interactive)', section: 'planner', desc: 'Custom trip builder' },
                { name: 'Boutique Venues & Gulets', section: 'venues', desc: 'Heritage properties' },
                { name: 'Partner With Us (B2B)', section: 'partner', desc: 'Wholesale net tariffs' },
                { name: 'Why Baobab DMC', section: 'about', desc: 'Credentials & TURSAB' },
                { name: 'Travel & Field Blog', section: 'blog', desc: 'SEO guides & logistics' },
                { name: 'B2B Tariff Inquiry', section: 'inquiry', desc: 'Confidential quotes' },
              ].map(item => (
                <button
                  key={item.section}
                  onClick={() => handleJump(item.section)}
                  className="p-3 bg-white hover:bg-orange-50 border border-neutral-200 hover:border-[#F05A28]/40 rounded-lg text-left transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-xs text-neutral-800 group-hover:text-[#F05A28] transition-colors">
                      {item.name}
                    </span>
                    <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-[#F05A28] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Turkey Trips & Experiences Portfolio */}
          {filteredTrips.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-300">
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-[#F05A28]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Multi-Day Turkey Trips & Expeditions ({filteredTrips.length})
                  </h3>
                </div>
                <span className="text-xs text-neutral-500">Click any trip to inspect full day-by-day itinerary</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredTrips.map(trip => (
                  <button
                    key={trip.id}
                    onClick={() => handleTripClick(trip)}
                    className="p-3.5 bg-white hover:bg-orange-50/60 border border-neutral-200 hover:border-[#F05A28]/50 rounded-lg text-left transition-all group flex flex-col justify-between space-y-2 shadow-2xs hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-[#F05A28] transition-colors line-clamp-2 leading-snug">
                        {trip.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 whitespace-nowrap shrink-0 border border-neutral-200">
                        {trip.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                      <span className="truncate max-w-[170px]">{trip.category}</span>
                      <span className="text-[#F05A28] font-semibold text-[10px] uppercase group-hover:underline">
                        View Trip ›
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Istanbul Day Tours & Private Excursions */}
          {filteredDayTours.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F05A28]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Istanbul Day Tours & Private Scholar Excursions ({filteredDayTours.length})
                  </h3>
                </div>
                <span className="text-xs text-neutral-500">Click any day tour to inspect schedule & photo slides</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDayTours.map(tour => (
                  <button
                    key={tour.id}
                    onClick={() => handleTripClick(tour)}
                    className="p-3.5 bg-white hover:bg-orange-50/60 border border-neutral-200 hover:border-[#F05A28]/50 rounded-lg text-left transition-all group flex flex-col justify-between space-y-2 shadow-2xs hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-[#F05A28] transition-colors line-clamp-2 leading-snug">
                        {tour.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 whitespace-nowrap shrink-0 border border-neutral-200">
                        {tour.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                      <span className="truncate max-w-[170px]">{tour.groupSize || 'Private / Small Group'}</span>
                      <span className="text-[#F05A28] font-semibold text-[10px] uppercase group-hover:underline">
                        View Tour ›
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Geographic Destinations & Operational Hubs */}
          {filteredDestinations.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F05A28]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Major Geographic Operational Hubs ({filteredDestinations.length})
                  </h3>
                </div>
                <span className="text-xs text-neutral-500">Regional hubs with local logistics & fleet</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredDestinations.map(dest => (
                  <button
                    key={dest.id}
                    onClick={() => handleDestClick(dest.id)}
                    className="p-3 bg-white hover:bg-orange-50/60 border border-neutral-200 hover:border-[#F05A28]/50 rounded-lg text-left transition-all group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-neutral-900 group-hover:text-[#F05A28] transition-colors">
                        {dest.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-[#F05A28] bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60">
                        {dest.region}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Tested Sample Blueprints & Boutique Venues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sample Frameworks */}
            {filteredFrameworks.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-300">
                  <Calendar className="w-4 h-4 text-[#F05A28]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Sample Frameworks ({filteredFrameworks.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {filteredFrameworks.map(fw => (
                    <button
                      key={fw.id}
                      onClick={() => handleJump('itineraries')}
                      className="w-full p-3 bg-white hover:bg-orange-50/60 border border-neutral-200 rounded-lg text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-[#F05A28]">
                          {fw.title}
                        </h4>
                        <span className="text-[11px] text-neutral-500">{fw.duration} • {fw.category}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#F05A28]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Exclusive Venues & Gulets */}
            {filteredVenues.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-300">
                  <Building2 className="w-4 h-4 text-[#F05A28]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Boutique Venues & Gulets ({filteredVenues.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {filteredVenues.map(venue => (
                    <button
                      key={venue.id}
                      onClick={() => handleJump('venues')}
                      className="w-full p-3 bg-white hover:bg-orange-50/60 border border-neutral-200 rounded-lg text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-[#F05A28]">
                          {venue.name}
                        </h4>
                        <span className="text-[11px] text-neutral-500">{venue.location} • {venue.type}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#F05A28]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Travel Blog & Field Operations Guides */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#F05A28]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Travel Blog & Field Operations Guides ({filteredBlogs.length})
                  </h3>
                </div>
                <span className="text-xs text-neutral-500">Practical intelligence for travel trade & guests</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredBlogs.map(post => (
                  <button
                    key={post.id}
                    onClick={() => handleBlogClick(post)}
                    className="p-3.5 bg-white hover:bg-orange-50/60 border border-neutral-200 hover:border-[#F05A28]/50 rounded-lg text-left transition-all group flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#F05A28]/10 text-[#F05A28] text-[10px] font-bold uppercase rounded">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-neutral-400">{post.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-[#F05A28] transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#F05A28] shrink-0 mt-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: B2B Contact, Credentials & Direct Channels */}
          <div className="p-5 bg-neutral-900 text-white rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold">
                  Baobab DMC Operational Credentials & Direct Inquiries
                </span>
              </div>
              <span className="text-xs text-neutral-400">
                TURSAB License #{COMPANY_CONTACT.tursabNumber} (A-Grade)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {onOpenB2BPanel && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenB2BPanel();
                  }}
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 hover:text-white rounded border border-emerald-500/40 transition-colors text-left font-bold flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>B2B Partner Portal (Hub & Tariffs)</span>
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry({ formMode: 'b2b-contracting' });
                }}
                className="p-3 bg-neutral-800 hover:bg-[#F05A28] rounded border border-neutral-700 transition-colors text-left font-semibold"
              >
                Request Confidential B2B Tariff
              </button>

              {onOpenCalendly && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCalendly('b2b-discovery');
                  }}
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors text-left font-semibold flex items-center gap-2"
                >
                  <Video className="w-4 h-4 text-[#F05A28]" />
                  <span>Schedule 1-on-1 Call (Calendly)</span>
                </button>
              )}

              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-emerald-700 hover:bg-emerald-600 rounded text-left font-semibold flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp: {COMPANY_CONTACT.whatsapp}</span>
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors text-left font-semibold flex items-center gap-2"
                title="Turkiye Office (HQ) Phone"
              >
                <Phone className="w-4 h-4 text-[#F05A28] shrink-0" />
                <span>TR Phone: {COMPANY_CONTACT.phone}</span>
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phoneUsRaw}`}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors text-left font-semibold flex items-center gap-2"
                title="USA Office (Branch) Phone"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>US Phone: {COMPANY_CONTACT.phoneUs}</span>
              </a>

              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors text-left font-semibold flex items-center gap-2"
              >
                <FileCode className="w-4 h-4 text-[#F05A28]" />
                <span>Download /sitemap.xml</span>
              </a>

              {onOpenSustainableTourism && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSustainableTourism();
                  }}
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-emerald-500/40 text-emerald-400 hover:text-white transition-colors text-left font-semibold flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Sustainable Tourism Policy (Travelife, GoTürkiye & UN Tourism)</span>
                </button>
              )}

              {onOpenResponsibleTravel && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenResponsibleTravel();
                  }}
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-[#F05A28]/40 text-orange-300 hover:text-white transition-colors text-left font-semibold flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-[#F05A28]" />
                  <span>Responsible Travel Code & Cultural Etiquette</span>
                </button>
              )}

              {onOpenModernSlavery && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenModernSlavery();
                  }}
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 transition-colors text-left font-semibold flex items-center gap-2"
                >
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>Modern Slavery Act 2015</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 sm:px-8 py-3 bg-white border-t border-neutral-200 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <span>
            © {new Date().getFullYear()} Baobab DMC Turkey. All URLs, trips, and operational hubs indexed.
          </span>
          <div className="flex items-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="text-[#F05A28] hover:underline font-semibold flex items-center gap-1"
            >
              <span>sitemap.xml</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <button
              onClick={onClose}
              className="hover:text-neutral-900 font-medium"
            >
              Close Site Map (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
