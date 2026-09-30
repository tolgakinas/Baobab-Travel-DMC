import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { VenuesSection } from '../components/VenuesSection';
import { VenueShowcase } from '../types';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VenuesPageProps {
  onSelectVenue: (venue: VenueShowcase) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const VenuesPage: React.FC<VenuesPageProps> = ({
  onSelectVenue,
  onOpenInquiry,
  onNavigateHome
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title={t('pages.venues.title')}
        subtitle={t('pages.venues.subtitle')}
        categoryBadge={t('pages.venues.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.lodges') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.venues.cta'),
          onClick: () => onOpenInquiry({ source: 'Venues Page', eventType: 'Corporate / Gala Dinner' }),
          icon: <Building2 className="w-4 h-4" />
        }}
      />

      <div className="bg-neutral-900 py-6">
        <VenuesSection
          onSelectVenue={onSelectVenue}
          onOpenInquiry={(v) => onOpenInquiry({ venueInterest: v.name, eventType: 'Corporate / Gala Dinner' })}
        />
      </div>
    </div>
  );
};
