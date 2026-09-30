import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AtlasTripsSection } from '../components/AtlasTripsSection';
import { AtlasTrip } from '../types';
import { Compass, Sparkles, MessageSquare } from 'lucide-react';

interface TripsPageProps {
  onSelectTrip: (trip: AtlasTrip) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const TripsPage: React.FC<TripsPageProps> = ({
  onSelectTrip,
  onOpenInquiry,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title="Guided Trips & Expeditions"
        subtitle="Curated small-group journeys, scholar-led cultural expeditions, active trail treks, scenic rail voyages, and private day tours across Turkey."
        categoryBadge="Small Group & Private Expeditions"
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Guided Trips & Expeditions' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: 'Request Custom Expedition',
          onClick: () => onOpenInquiry({ tripType: 'Guided Trip / Expedition' }),
          icon: <Compass className="w-4 h-4" />
        }}
      />

      <div className="bg-neutral-900 py-6">
        <AtlasTripsSection
          onSelectTrip={onSelectTrip}
          onRequestProposal={(trip) => onOpenInquiry({ tripName: trip.title, destination: trip.destinations?.join(', ') })}
        />
      </div>
    </div>
  );
};
