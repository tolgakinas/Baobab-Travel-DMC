import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AtlasTripsSection } from '../components/AtlasTripsSection';
import { AtlasTrip } from '../types';
import { Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title={t('pages.trips.title')}
        subtitle={t('pages.trips.subtitle')}
        categoryBadge={t('pages.trips.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.trips') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.trips.cta'),
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
