import React from 'react';
import { Hero } from '../components/Hero';
import { StatsBar } from '../components/StatsBar';
import { DestinationsSection } from '../components/DestinationsSection';
import { AtlasTripsSection } from '../components/AtlasTripsSection';
import { ItinerariesSection } from '../components/ItinerariesSection';
import { ServicesSection } from '../components/ServicesSection';
import { VenuesSection } from '../components/VenuesSection';
import { AboutDmc } from '../components/AboutDmc';
import { BlogSection } from '../components/BlogSection';
import { PartnerWithUsSection } from '../components/PartnerWithUsSection';
import { InquiryForm } from '../components/InquiryForm';
import { Destination, SampleItinerary, VenueShowcase, AtlasTrip } from '../types';
import { BlogPost } from '../data/blogData';

interface HomePageProps {
  onSelectDestination: (dest: Destination) => void;
  onSelectItinerary: (itin: SampleItinerary) => void;
  onSelectVenue: (venue: VenueShowcase) => void;
  onSelectTrip: (trip: AtlasTrip) => void;
  onSelectBlogPost: (post: BlogPost) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenCalendly?: (eventTypeId?: string) => void;
  onNavigatePage: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectDestination,
  onSelectItinerary,
  onSelectVenue,
  onSelectTrip,
  onSelectBlogPost,
  onOpenInquiry,
  onOpenCalendly,
  onNavigatePage
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero 
        onOpenInquiry={() => onOpenInquiry()} 
        onOpenCalendly={() => onOpenCalendly?.('b2b-discovery')}
        onExploreClick={() => onNavigatePage('destinations')}
      />

      {/* Trust & Live Operational Stats */}
      <StatsBar />

      {/* Destinations Section */}
      <DestinationsSection onSelectDestination={onSelectDestination} />

      {/* Guided Trips & Expeditions Showcase */}
      <AtlasTripsSection 
        onSelectTrip={onSelectTrip} 
        onRequestProposal={(trip) => onOpenInquiry({ tripName: trip.title, destination: trip.destinations?.join(', ') })}
      />

      {/* Sample Multi-Day Frameworks */}
      <ItinerariesSection 
        onSelectItinerary={onSelectItinerary}
        onOpenInquiry={(itin) => onOpenInquiry({ tripName: itin.title, duration: itin.duration })}
      />

      {/* Inbound DMC Services */}
      <ServicesSection onOpenInquiry={onOpenInquiry} />

      {/* Exclusive Venues & Gala Spaces */}
      <VenuesSection 
        onSelectVenue={onSelectVenue}
        onOpenInquiry={(v) => onOpenInquiry({ venueInterest: v.name, eventType: 'Corporate / Gala Dinner' })}
      />

      {/* About Us & Accreditation */}
      <AboutDmc />

      {/* Travel Insights & Blog */}
      <BlogSection onSelectPost={onSelectBlogPost} />

      {/* B2B Partner With Us & Application */}
      <PartnerWithUsSection 
        onOpenInquiry={() => onOpenInquiry()} 
        onOpenCalendly={() => onOpenCalendly?.('b2b-discovery')}
      />

      {/* Direct RFP Inquiry Form */}
      <InquiryForm />
    </div>
  );
};
