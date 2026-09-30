import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { DestinationsSection } from '../components/DestinationsSection';
import { Destination } from '../types';
import { MessageSquare, Calendar } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title="Explore Turkey's 7 Diverse Regions"
        subtitle="From the historic domes of Istanbul and fairy chimneys of Cappadocia to the turquoise coves of the Aegean, discover hand-curated regional experiences."
        categoryBadge="Destination Portfolios"
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Destinations' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: 'Request Regional Proposal',
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
