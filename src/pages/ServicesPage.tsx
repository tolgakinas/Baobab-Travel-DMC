import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesPageProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenInquiry,
  onNavigateHome
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={t('pages.services.title')}
        subtitle={t('pages.services.subtitle')}
        categoryBadge={t('pages.services.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.services') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.services.cta'),
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
