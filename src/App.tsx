import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { DestinationsSection } from './components/DestinationsSection';
import { ServicesSection } from './components/ServicesSection';
import { ItinerariesSection } from './components/ItinerariesSection';
import { InteractiveRoutePlanner } from './components/InteractiveRoutePlanner';
import { VenuesSection } from './components/VenuesSection';
import { PartnerWithUsSection } from './components/PartnerWithUsSection';
import { AboutDmc } from './components/AboutDmc';
import { InquiryForm } from './components/InquiryForm';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { ItineraryModal } from './components/ItineraryModal';
import { VenueModal } from './components/VenueModal';
import { InquiryModal } from './components/InquiryModal';
import { CalendlyModal } from './components/CalendlyModal';
import { AtlasTripsSection } from './components/AtlasTripsSection';
import { TripDetailModal } from './components/TripDetailModal';
import { BlogSection } from './components/BlogSection';
import { BlogDetailModal } from './components/BlogDetailModal';
import { SitemapModal } from './components/SitemapModal';
import { ModernSlaveryModal } from './components/ModernSlaveryModal';
import { SustainableTourismModal } from './components/SustainableTourismModal';
import { ResponsibleTravelModal } from './components/ResponsibleTravelModal';
import { B2BPartnerPanel } from './components/B2BPartnerPanel';
import { Destination, SampleItinerary, VenueShowcase, InquiryFormData, AtlasTrip } from './types';
import { DESTINATIONS, EXCLUSIVE_VENUES, COMPANY_CONTACT } from './data/dmcData';
import { BlogPost } from './data/blogData';
import { MessageSquare, Phone, CalendarDays, Video } from 'lucide-react';

export default function App() {
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

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
      scrollToSection('destinations');
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
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased">
        {/* Fixed Navigation */}
        <Navbar
          onNavigate={scrollToSection}
          onOpenInquiry={handleOpenInquiry}
          onOpenCalendly={handleOpenCalendly}
          onOpenB2BPanel={() => setB2bPanelOpen(true)}
        />

      {/* Hero Section */}
      <Hero
        onOpenInquiry={handleOpenInquiry}
        onExploreDestinations={() => scrollToSection('destinations')}
        onSelectDestination={handleSelectDestinationById}
        onOpenCalendly={handleOpenCalendly}
      />

      {/* Credibility & Stats Bar */}
      <StatsBar />

      {/* Primary Destinations Section */}
      <DestinationsSection
        onSelectDestination={setSelectedDestination}
        onPlanTripToDestination={handlePlanTripToDestination}
      />

      {/* Operational Services Section */}
      <ServicesSection
        onOpenInquiry={handleOpenInquiry}
      />

      {/* All Turkey Guided Trips Portfolio (from Atlas Global Tours) */}
      <AtlasTripsSection
        onSelectTrip={setSelectedAtlasTrip}
        onRequestProposal={handleRequestProposalForAtlasTrip}
      />

      {/* Curated Sample Programs */}
      <ItinerariesSection
        onSelectItinerary={setSelectedItinerary}
        onCustomizeItinerary={handleCustomizeItinerary}
      />

      {/* Interactive Logistics Sequence Planner */}
      <InteractiveRoutePlanner
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Boutique Heritage Lodges & Accommodations */}
      <VenuesSection
        onSelectVenue={setSelectedVenue}
        onInquireVenue={handleInquireVenue}
      />

      {/* Partner With Us & Why Partner With Us (B2B Trade Benefits & Onboarding) */}
      <PartnerWithUsSection
        onOpenInquiry={handleOpenInquiry}
        onOpenCalendly={handleOpenCalendly}
        onOpenB2BPanel={() => setB2bPanelOpen(true)}
      />

      {/* Why Baobab, TURSAB License, Testimonials & FAQ */}
      <AboutDmc
        onOpenInquiry={handleOpenInquiry}
      />

      {/* SEO & GEO Friendly Turkey Travel & B2B Operations Blog */}
      <BlogSection
        onSelectPost={setSelectedBlogPost}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Embedded High-Conversion Proposal Form */}
      <section className="bg-white border-t border-neutral-200">
        <InquiryForm
          initialData={inquiryInitialData}
          onClose={() => scrollToSection('hero')}
          onOpenCalendly={handleOpenCalendly}
        />
      </section>

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectDestination={handleSelectDestinationById}
        onOpenInquiry={handleOpenInquiry}
        onOpenCalendly={handleOpenCalendly}
        onOpenB2BPanel={() => setB2bPanelOpen(true)}
        onOpenSitemap={() => setSitemapModalOpen(true)}
        onOpenModernSlavery={() => setModernSlaveryModalOpen(true)}
        onOpenSustainableTourism={() => setSustainableTourismModalOpen(true)}
        onOpenResponsibleTravel={() => setResponsibleTravelModalOpen(true)}
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
      </div>
    </LanguageProvider>
  </AuthProvider>
  );
}
