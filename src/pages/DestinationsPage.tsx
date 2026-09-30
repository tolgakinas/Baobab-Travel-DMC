import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { DestinationsSection } from '../components/DestinationsSection';
import { Destination } from '../types';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DestinationsPageProps {
  onSelectDestination: (dest: Destination) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  onSelectDestination,
  onOpenInquiry,
  onNavigateHome
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title={t('pages.destinations.title')}
        subtitle={t('pages.destinations.subtitle')}
        categoryBadge={t('pages.destinations.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.destinations') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.destinations.cta'),
          onClick: () => onOpenInquiry({ source: 'Destinations Page' }),
          icon: <MessageSquare className="w-4 h-4" />
        }}
      />

      <div className="bg-neutral-900 py-6">
        <DestinationsSection onSelectDestination={onSelectDestination} />
      </div>
    </div>
  );
};
