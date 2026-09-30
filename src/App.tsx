import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { ItineraryModal } from './components/ItineraryModal';
import { VenueModal } from './components/VenueModal';
import { InquiryModal } from './components/InquiryModal';
import { CalendlyModal } from './components/CalendlyModal';
import { TripDetailModal } from './components/TripDetailModal';
import { BlogDetailModal } from './components/BlogDetailModal';
import { SitemapModal } from './components/SitemapModal';
import { ModernSlaveryModal } from './components/ModernSlaveryModal';
import { SustainableTourismModal } from './components/SustainableTourismModal';
import { ResponsibleTravelModal } from './components/ResponsibleTravelModal';
import { B2BPartnerPanel } from './components/B2BPartnerPanel';
import { TravelConsultantPortal } from './components/TravelConsultantPortal';
import { SuperAdminModal } from './components/admin/SuperAdminModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { QuickScrollButtons } from './components/QuickScrollButtons';

// Dedicated Page Views
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { TripsPage } from './pages/TripsPage';
import { ItinerariesPage } from './pages/ItinerariesPage';
import { ServicesPage } from './pages/ServicesPage';
import { VenuesPage } from './pages/VenuesPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { PartnerPage } from './pages/PartnerPage';

import { Destination, SampleItinerary, VenueShowcase, InquiryFormData, AtlasTrip } from './types';
import { DESTINATIONS, EXCLUSIVE_VENUES, COMPANY_CONTACT } from './data/dmcData';
import { BlogPost } from './data/blogData';
import { MessageSquare, Phone, CalendarDays, Video } from 'lucide-react';

export default function App() {
  // Page Router State
  const getInitialPage = (): string => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/destination')) return 'destinations';
    if (path.startsWith('/trip') || path.startsWith('/expedition') || path.startsWith('/guided')) return 'trips';
    if (path.startsWith('/itinerar') || path.startsWith('/framework')) return 'itineraries';
    if (path.startsWith('/service')) return 'services';
    if (path.startsWith('/venue') || path.startsWith('/gala') || path.startsWith('/lodge')) return 'venues';
    if (path.startsWith('/about') || path.startsWith('/why-baobab')) return 'about';
    if (path.startsWith('/blog') || path.startsWith('/insight') || path.startsWith('/journal')) return 'blog';
    if (path.startsWith('/partner') || path.startsWith('/contact') || path.startsWith('/inquir') || path.startsWith('/faq')) return 'partner';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);

  // Modal states
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedItinerary, setSelectedItinerary] = useState<SampleItinerary | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueShowcase | null>(null);
  const [selectedAtlasTrip, setSelectedAtlasTrip] = useState<AtlasTrip | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [inquiryInitialData, setInquiryInitialData] = useState<Partial<InquiryFormData>>({});
  const [calendlyModalOpen, setCalendlyModalOpen] = useState<boolean>(false);
  const [calendlyInitialEventType, setCalendlyInitialEventType] = useState<string>('b2b-discovery');
  const [sitemapModalOpen, setSitemapModalOpen] = useState<boolean>(false);
  const [modernSlaveryModalOpen, setModernSlaveryModalOpen] = useState<boolean>(false);
  const [sustainableTourismModalOpen, setSustainableTourismModalOpen] = useState<boolean>(false);
  const [responsibleTravelModalOpen, setResponsibleTravelModalOpen] = useState<boolean>(false);
  const [b2bPanelOpen, setB2bPanelOpen] = useState<boolean>(false);
  const [consultantPortalOpen, setConsultantPortalOpen] = useState<boolean>(false);
  const [superAdminModalOpen, setSuperAdminModalOpen] = useState<boolean>(false);

  // Update document title per page
  const updatePageTitle = (pageId: string) => {
    const titles: Record<string, string> = {
      home: 'Baobab DMC Turkey | Official B2B Inbound Tour Operator & DMC Specialist',
      destinations: 'Destinations in Turkey | Istanbul, Cappadocia, Turquoise Coast | Baobab DMC',
      trips: 'Guided Trips & Expeditions in Turkey | Small Group & Scholar Tours | Baobab DMC',
      itineraries: 'Sample Itinerary Frameworks & Multi-Day Programs | Baobab DMC Turkey',
      services: 'Inbound DMC Services & VIP Ground Operations | Baobab DMC Turkey',
      venues: 'Exclusive Venues, Gala Spaces & Historic Cisterns | Baobab DMC Turkey',
      about: 'About Us & TURSAB Licensing #12458 | Baobab DMC Turkey',
      blog: 'Turkey Travel Insights & DMC Journal | Baobab DMC Turkey',
      partner: 'Partner With Us | B2B Travel Trade Partnership | Baobab DMC Turkey'
    };
    if (titles[pageId]) {
      document.title = titles[pageId];
    }
  };

  // Browser History & Popstate Sync
  useEffect(() => {
    const handlePopState = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      updatePageTitle(page);
    };
    window.addEventListener('popstate', handlePopState);
    updatePageTitle(currentPage);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global keyboard shortcut to open Super Admin panel (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setSuperAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation Handler
  const handleNavigatePage = (pageId: string, params?: Record<string, any>) => {
    let targetPath = '/';
    let targetPage = pageId;

    if (pageId === 'destinations') targetPath = '/destinations';
    else if (pageId === 'trips') targetPath = '/trips';
    else if (pageId === 'itineraries') targetPath = '/itineraries';
    else if (pageId === 'services') targetPath = '/services';
    else if (pageId === 'venues') targetPath = '/venues';
    else if (pageId === 'about') targetPath = '/about';
    else if (pageId === 'blog') targetPath = '/blog';
    else if (pageId === 'partner' || pageId === 'contact' || pageId === 'inquiry') {
      targetPath = '/partner';
      targetPage = 'partner';
    } else if (pageId === 'faq') {
      targetPath = '/about';
      targetPage = 'about';
    } else if (pageId === 'hero' || pageId === 'home') {
      targetPath = '/';
      targetPage = 'home';
    }

    setCurrentPage(targetPage);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updatePageTitle(targetPage);
  };

  // Smooth scroll helper (fallback for section anchors)
  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers
  const handleOpenInquiry = (initialData?: Partial<InquiryFormData>) => {
    if (initialData) {
      setInquiryInitialData(initialData);
    }
    setInquiryModalOpen(true);
  };

  const handleOpenCalendly = (eventTypeId: string = 'b2b-discovery') => {
    setCalendlyInitialEventType(eventTypeId);
    setCalendlyModalOpen(true);
  };

  const handleSelectDestinationById = (destId: string) => {
    const found = DESTINATIONS.find(d => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    } else {
      handleNavigatePage('destinations');
    }
  };

  const handlePlanTripToDestination = (destName: string) => {
    handleOpenInquiry({
      destinations: [destName],
    });
  };

  const handleCustomizeItinerary = (itinerary: SampleItinerary) => {
    const matchedTripType = itinerary.category === 'Active Adventure' 
      ? 'Active Adventure & Hiking' 
      : itinerary.category === 'Gulet & Coastal Trek'
      ? 'Gulet & Coastal Adventure'
      : itinerary.category === 'Cultural Expedition'
      ? 'Cultural & Historical Expedition'
      : 'Small Group Tour';

    handleOpenInquiry({
      formMode: 'trip-inquiry',
      tripType: matchedTripType,
      selectedTripTitle: itinerary.title,
      destinations: itinerary.destinations,
      durationDays: parseInt(itinerary.duration) || 8,
      specialRequests: `Interested in adapting the itinerary: "${itinerary.title}"`,
    });
  };

  const handleInquireVenue = (venueName: string) => {
    const found = EXCLUSIVE_VENUES.find(v => v.name === venueName);
    if (found) {
      setSelectedVenue(found);
    } else {
      handleOpenInquiry({
        specialRequests: `Inquiring for venue availability & pricing: ${venueName}`,
      });
    }
  };

  const handleRequestProposalForAtlasTrip = (trip: AtlasTrip) => {
    handleOpenInquiry({
      formMode: 'trip-inquiry',
      tripType: trip.category,
      selectedTripTitle: trip.title,
      selectedTripId: trip.id,
      selectedTripCategory: trip.category,
      selectedTripDuration: trip.duration,
      destinations: trip.destinations,
      durationDays: trip.daysCount || 8,
      specialRequests: `Requesting B2B net wholesale tariff and proposal for "${trip.title}" (${trip.duration}).`,
    });
  };

  return (
    <AuthProvider>
      <SiteContentProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased">
            {/* Fixed Navigation Bar with Active Page Highlight */}
            <Navbar
              onNavigate={scrollToSection}
              currentPage={currentPage}
              onNavigatePage={handleNavigatePage}
              onOpenInquiry={handleOpenInquiry}
              onOpenCalendly={handleOpenCalendly}
              onOpenB2BPanel={() => setB2bPanelOpen(true)}
            />

            {/* Page Router View Rendering */}
            <main className="flex-1">
              {currentPage === 'home' && (
                <HomePage
                  onSelectDestination={setSelectedDestination}
                  onSelectItinerary={setSelectedItinerary}
                  onSelectVenue={setSelectedVenue}
                  onSelectTrip={setSelectedAtlasTrip}
                  onSelectBlogPost={setSelectedBlogPost}
                  onOpenInquiry={handleOpenInquiry}
                  onOpenCalendly={handleOpenCalendly}
                  onNavigatePage={handleNavigatePage}
                />
              )}

              {currentPage === 'destinations' && (
                <DestinationsPage
                  onSelectDestination={setSelectedDestination}
                  onOpenInquiry={handleOpenInquiry}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'trips' && (
                <TripsPage
                  onSelectTrip={setSelectedAtlasTrip}
                  onOpenInquiry={handleOpenInquiry}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'itineraries' && (
                <ItinerariesPage
                  onSelectItinerary={setSelectedItinerary}
                  onOpenInquiry={handleOpenInquiry}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'services' && (
                <ServicesPage
                  onOpenInquiry={handleOpenInquiry}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'venues' && (
                <VenuesPage
                  onSelectVenue={setSelectedVenue}
                  onOpenInquiry={handleOpenInquiry}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage
                  onOpenInquiry={handleOpenInquiry}
                  onOpenModernSlavery={() => setModernSlaveryModalOpen(true)}
                  onOpenSustainableTourism={() => setSustainableTourismModalOpen(true)}
                  onOpenResponsibleTravel={() => setResponsibleTravelModalOpen(true)}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'blog' && (
                <BlogPage
                  onSelectBlogPost={setSelectedBlogPost}
                  onOpenInquiry={handleOpenInquiry}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}

              {currentPage === 'partner' && (
                <PartnerPage
                  onOpenInquiry={handleOpenInquiry}
                  onOpenCalendly={handleOpenCalendly}
                  onNavigateHome={() => handleNavigatePage('home')}
                />
              )}
            </main>

            {/* Comprehensive Footer */}
            <Footer
              onNavigate={scrollToSection}
              onNavigatePage={handleNavigatePage}
              onSelectDestination={handleSelectDestinationById}
              onOpenInquiry={handleOpenInquiry}
              onOpenCalendly={handleOpenCalendly}
              onOpenB2BPanel={() => setB2bPanelOpen(true)}
              onOpenSitemap={() => setSitemapModalOpen(true)}
              onOpenModernSlavery={() => setModernSlaveryModalOpen(true)}
              onOpenSustainableTourism={() => setSustainableTourismModalOpen(true)}
              onOpenResponsibleTravel={() => setResponsibleTravelModalOpen(true)}
              onOpenConsultantPortal={() => setConsultantPortalOpen(true)}
              onOpenSuperAdmin={() => setSuperAdminModalOpen(true)}
            />

            {/* Mobile Quick Action Sticky Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2.5 px-3 sm:hidden flex items-center justify-between gap-1.5 shadow-2xl">
              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsappRaw}?text=Hello%20Baobab%20DMC%2C%20I%20would%20like%20to%20inquire%20about%20a%20tour%20in%20Turkey`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-emerald-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => handleOpenCalendly('b2b-discovery')}
                className="flex-1 py-2 bg-neutral-900 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm border border-neutral-800"
                title="Schedule Video Call"
              >
                <Video className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Call</span>
              </button>

              <a
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="p-2 bg-neutral-100 text-neutral-800 rounded border border-neutral-200 flex items-center justify-center"
                aria-label="Call direct"
              >
                <Phone className="w-4 h-4 text-[#F05A28]" />
              </a>

              <button
                onClick={() => handleOpenInquiry()}
                className="flex-1 py-2 bg-[#F05A28] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Inquire</span>
              </button>
            </div>

            {/* Quick Scroll Down & Up Navigation */}
            <QuickScrollButtons />

            {/* Modals */}
            <TripDetailModal
              trip={selectedAtlasTrip}
              onClose={() => setSelectedAtlasTrip(null)}
              onRequestProposal={handleRequestProposalForAtlasTrip}
            />

            <DestinationModal
              destination={selectedDestination}
              onClose={() => setSelectedDestination(null)}
              onPlanTrip={handlePlanTripToDestination}
            />

            <ItineraryModal
              itinerary={selectedItinerary}
              onClose={() => setSelectedItinerary(null)}
              onCustomize={handleCustomizeItinerary}
            />

            <VenueModal
              venue={selectedVenue}
              onClose={() => setSelectedVenue(null)}
              onInquire={handleInquireVenue}
            />

            <BlogDetailModal
              post={selectedBlogPost}
              onClose={() => setSelectedBlogPost(null)}
              onOpenInquiry={handleOpenInquiry}
            />

            <InquiryModal
              isOpen={inquiryModalOpen}
              onClose={() => setInquiryModalOpen(false)}
              initialData={inquiryInitialData}
              onOpenCalendly={handleOpenCalendly}
            />

            <CalendlyModal
              isOpen={calendlyModalOpen}
              onClose={() => setCalendlyModalOpen(false)}
              initialEventTypeId={calendlyInitialEventType}
            />

            <SitemapModal
              isOpen={sitemapModalOpen}
              onClose={() => setSitemapModalOpen(false)}
              onNavigate={scrollToSection}
              onNavigatePage={handleNavigatePage}
              onSelectDestination={handleSelectDestinationById}
              onSelectTrip={(trip) => setSelectedAtlasTrip(trip)}
              onSelectBlogPost={(post) => setSelectedBlogPost(post)}
              onOpenInquiry={handleOpenInquiry}
              onOpenCalendly={handleOpenCalendly}
              onOpenB2BPanel={() => setB2bPanelOpen(true)}
              onOpenModernSlavery={() => setModernSlaveryModalOpen(true)}
              onOpenSustainableTourism={() => setSustainableTourismModalOpen(true)}
              onOpenResponsibleTravel={() => setResponsibleTravelModalOpen(true)}
            />

            <ModernSlaveryModal
              isOpen={modernSlaveryModalOpen}
              onClose={() => setModernSlaveryModalOpen(false)}
              onOpenInquiry={handleOpenInquiry}
            />

            <SustainableTourismModal
              isOpen={sustainableTourismModalOpen}
              onClose={() => setSustainableTourismModalOpen(false)}
              onSwitchToResponsibleTravel={() => {
                setSustainableTourismModalOpen(false);
                setResponsibleTravelModalOpen(true);
              }}
              onOpenInquiry={handleOpenInquiry}
            />

            <ResponsibleTravelModal
              isOpen={responsibleTravelModalOpen}
              onClose={() => setResponsibleTravelModalOpen(false)}
              onSwitchToSustainableTourism={() => {
                setResponsibleTravelModalOpen(false);
                setSustainableTourismModalOpen(true);
              }}
              onOpenInquiry={handleOpenInquiry}
            />

            <B2BPartnerPanel
              isOpen={b2bPanelOpen}
              onClose={() => setB2bPanelOpen(false)}
              onOpenInquiry={handleOpenInquiry}
              onOpenCalendly={handleOpenCalendly}
            />

            {/* Travel Consultants & Luxury Advisors Portal (-25% Net Tariff) */}
            <TravelConsultantPortal
              isOpen={consultantPortalOpen}
              onClose={() => setConsultantPortalOpen(false)}
              onOpenCalendly={handleOpenCalendly}
            />

            {/* Super Admin Control Panel Modal */}
            <SuperAdminModal
              isOpen={superAdminModalOpen}
              onClose={() => setSuperAdminModalOpen(false)}
            />

            {/* Global GDPR / KVKK Cookie Consent Banner & Modal */}
            <CookieConsentBanner />
          </div>
        </LanguageProvider>
      </SiteContentProvider>
    </AuthProvider>
  );
}
