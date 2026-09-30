import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ItinerariesSection } from '../components/ItinerariesSection';
import { InteractiveRoutePlanner } from '../components/InteractiveRoutePlanner';
import { SampleItinerary } from '../types';
import { Map } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={t('pages.itineraries.title')}
        subtitle={t('pages.itineraries.subtitle')}
        categoryBadge={t('pages.itineraries.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.itineraries') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.itineraries.cta'),
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
