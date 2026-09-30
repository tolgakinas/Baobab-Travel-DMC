import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ItinerariesSection } from '../components/ItinerariesSection';
import { InteractiveRoutePlanner } from '../components/InteractiveRoutePlanner';
import { SampleItinerary } from '../types';
import { Map, Sparkles, MessageSquare } from 'lucide-react';

interface ItinerariesPageProps {
  onSelectItinerary: (itin: SampleItinerary) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const ItinerariesPage: React.FC<ItinerariesPageProps> = ({
  onSelectItinerary,
  onOpenInquiry,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Sample Itinerary Frameworks"
        subtitle="Fully adaptable multi-day route frameworks designed for B2B tour operators and travel advisors. White-label ready with complete day-by-day logistics."
        categoryBadge="Bespoke Route Frameworks"
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Sample Frameworks' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: 'Request Custom Itinerary',
          onClick: () => onOpenInquiry({ source: 'Itineraries Page' }),
          icon: <Map className="w-4 h-4" />
        }}
      />

      <div className="py-6">
        <ItinerariesSection
          onSelectItinerary={onSelectItinerary}
          onOpenInquiry={(itin) => onOpenInquiry({ tripName: itin.title, duration: itin.duration })}
        />

        {/* Interactive Route Planner Tool */}
        <div className="mt-12">
          <InteractiveRoutePlanner onOpenInquiry={onOpenInquiry} />
        </div>
      </div>
    </div>
  );
};
