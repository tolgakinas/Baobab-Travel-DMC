import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { ShieldCheck, MessageSquare } from 'lucide-react';

interface ServicesPageProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenInquiry,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Inbound DMC Ground Services"
        subtitle="End-to-end B2B ground handling in Turkey: VIP Chauffeur Fleet, Scholar-Led Cultural Guides, Private Gulet Charters, Luxury Hotel Contracting & 24/7 Operational Concierge."
        categoryBadge="B2B Ground Operations"
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'DMC Services' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: 'Book Ground Services',
          onClick: () => onOpenInquiry({ source: 'Services Page' }),
          icon: <ShieldCheck className="w-4 h-4" />
        }}
      />

      <div className="py-6">
        <ServicesSection onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
};
