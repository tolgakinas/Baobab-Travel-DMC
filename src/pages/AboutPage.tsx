import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AboutDmc } from '../components/AboutDmc';
import { StatsBar } from '../components/StatsBar';
import { ShieldCheck, MessageSquare, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onOpenModernSlavery?: () => void;
  onOpenSustainableTourism?: () => void;
  onOpenResponsibleTravel?: () => void;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenInquiry,
  onOpenModernSlavery,
  onOpenSustainableTourism,
  onOpenResponsibleTravel,
  onNavigateHome
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={t('pages.about.title')}
        subtitle={t('pages.about.subtitle')}
        categoryBadge={t('pages.about.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.whyBaobab') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.about.cta'),
          onClick: () => onOpenInquiry({ source: 'About Us Page' }),
          icon: <ShieldCheck className="w-4 h-4" />
        }}
      />

      <StatsBar />

      <div className="py-6">
        <AboutDmc />
      </div>

      {/* Sustainability & Policies Banner */}
      <div className="bg-neutral-900 text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-[#F05A28] text-xs font-bold uppercase tracking-widest">
              Ethics & ESG Commitments
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Responsible Ground Operations
            </h2>
            <p className="text-sm text-neutral-400">
              We uphold the highest ethical standards across supply chains, local employment, and historical monument preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800/80 p-6 rounded-xl border border-neutral-700 space-y-3">
              <Award className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Sustainable Tourism Policy</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Zero single-use plastics on tours, renewable office practices, and carbon reduction across transportation.
              </p>
              {onOpenSustainableTourism && (
                <button
                  type="button"
                  onClick={onOpenSustainableTourism}
                  className="text-xs text-[#F05A28] hover:underline font-semibold"
                >
                  Read Policy →
                </button>
              )}
            </div>

            <div className="bg-neutral-800/80 p-6 rounded-xl border border-neutral-700 space-y-3">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold text-white text-base">Modern Slavery Statement</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Strict labor auditing, guaranteed fair living wages, and complete protection for guides and drivers.
              </p>
              {onOpenModernSlavery && (
                <button
                  type="button"
                  onClick={onOpenModernSlavery}
                  className="text-xs text-[#F05A28] hover:underline font-semibold"
                >
                  Read Statement →
                </button>
              )}
            </div>

            <div className="bg-neutral-800/80 p-6 rounded-xl border border-neutral-700 space-y-3">
              <MessageSquare className="w-6 h-6 text-purple-400" />
              <h3 className="font-bold text-white text-base">Responsible Travel Code</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Community-first revenue sharing, cultural heritage respect, and ethical wildlife guidelines.
              </p>
              {onOpenResponsibleTravel && (
                <button
                  type="button"
                  onClick={onOpenResponsibleTravel}
                  className="text-xs text-[#F05A28] hover:underline font-semibold"
                >
                  Read Code →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
