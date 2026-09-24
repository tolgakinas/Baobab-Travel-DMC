import React from 'react';
import { PARTNERS_ACCREDITATIONS } from '../data/dmcData';
import { ShieldCheck, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

export const StatsBar: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const statsList = content?.stats || [];

  const getTranslatedStatLabel = (originalLabel: string) => {
    if (originalLabel.includes('Years')) return t('stat.years');
    if (originalLabel.includes('Partners')) return t('stat.partners');
    if (originalLabel.includes('TURSAB')) return t('stat.tursab');
    if (originalLabel.includes('Small Group')) return t('stat.groupSize');
    if (originalLabel.includes('Ground Dispatch')) return t('stat.dispatch');
    return originalLabel;
  };

  return (
    <section className="bg-white border-y border-neutral-200 py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Core Operational Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pb-10 border-b border-neutral-100">
          {statsList.map((stat, i) => (
            <div key={i} className="text-left space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] tracking-tight flex items-baseline gap-1">
                <span>{stat.value}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                {getTranslatedStatLabel(stat.label)}
              </div>
              <div className="text-[11px] text-neutral-500 font-sans">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Accreditations & Trust Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#F05A28]/10 flex items-center justify-center text-[#F05A28]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Official Institutional Accreditations
              </div>
              <div className="text-xs text-neutral-500">
                Licensed under Republic of Turkey Ministry of Culture and Tourism
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {PARTNERS_ACCREDITATIONS.map((partner) => (
              <div 
                key={partner.name}
                className="px-3 py-1.5 rounded bg-neutral-50 border border-neutral-200/80 flex items-center gap-2 hover:border-[#F05A28]/40 transition-colors"
                title={partner.desc}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F05A28]" />
                <span className="text-xs font-bold text-neutral-800">{partner.name}</span>
                <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">| {partner.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
