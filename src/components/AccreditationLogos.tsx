import React from 'react';
import { ShieldCheck, Award, ExternalLink, Leaf } from 'lucide-react';

export interface AccreditationItem {
  id: string;
  acronym: string;
  name: string;
  subtext: string;
  badge: string;
  link?: string;
  logoSrc: string;
  fallbackText?: string;
  bgLight?: boolean;
}

export const ACCREDITATIONS: AccreditationItem[] = [
  {
    id: 'tursab',
    acronym: 'TÜRSAB',
    name: 'Association of Turkish Travel Agencies',
    subtext: 'Türkiye Seyahat Acentaları Birliği',
    badge: 'License #A-15764 (A-Grade)',
    link: 'https://www.tursab.org.tr',
    logoSrc: '/logos/tursab.png'
  },
  {
    id: 'tureb',
    acronym: 'TUREB',
    name: "Tourist Guides' Union of Turkey",
    subtext: 'Türkiye Turist Rehberleri Birliği',
    badge: 'Ministry Certified Guides',
    link: 'https://www.tureb.org.tr',
    logoSrc: '/logos/tureb.png'
  },
  {
    id: 'asta',
    acronym: 'ASTA',
    name: 'American Society of Travel Advisors',
    subtext: 'Global Travel Advocate Network',
    badge: 'International Member',
    link: 'https://www.asta.org',
    logoSrc: '/logos/asta.png'
  },
  {
    id: 'atta',
    acronym: 'ATTA',
    name: 'Adventure Travel Trade Association',
    subtext: 'Global Adventure Tourism Leader',
    badge: 'Adventure Trade Member',
    link: 'https://www.adventuretravel.biz',
    logoSrc: '/logos/atta.png'
  },
  {
    id: 'travelife',
    acronym: 'Travelife',
    name: 'Travelife Sustainability System',
    subtext: 'Sustainability in Tourism Certification',
    badge: 'Engaged in Sustainability',
    link: 'https://www.travelife.info',
    logoSrc: '/logos/travelife.png'
  },
  {
    id: 'ito',
    acronym: 'İTO',
    name: 'Istanbul Chamber of Commerce',
    subtext: 'İstanbul Ticaret Odası (Est. 1882)',
    badge: 'Chamber Member #1882',
    link: 'https://www.ito.org.tr',
    logoSrc: '/logos/ito.png'
  }
];

export const AccreditationLogos: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header section with symbols */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#F05A28]" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
            Official Accreditations & Tourism Guild Memberships
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Licenses & Guilds</span>
          </span>
          <span className="hidden md:inline text-neutral-600">•</span>
          <span className="hidden md:flex items-center gap-1.5 text-emerald-400">
            <Leaf className="w-3.5 h-3.5" />
            <span>Travelife Sustainability Partner</span>
          </span>
        </div>
      </div>

      {/* 6-Column Grid of Official Badges & Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {ACCREDITATIONS.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-3.5 bg-neutral-900/90 hover:bg-neutral-850 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-black/30"
            title={`${item.acronym} - ${item.name} (${item.subtext})`}
          >
            {/* Real Logo Image Container */}
            <div className="h-12 w-full flex items-center justify-center p-1 rounded-lg bg-white/95 group-hover:bg-white transition-colors">
              <img
                src={item.logoSrc}
                alt={`${item.acronym} - ${item.name}`}
                className="max-h-full max-w-full object-contain filter transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Micro details */}
            <div className="pt-2 mt-2 border-t border-neutral-800/80 flex flex-col gap-0.5 text-left">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-white group-hover:text-[#F05A28] transition-colors truncate">
                  {item.acronym}
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-[#F05A28] opacity-60 group-hover:opacity-100 transition-all shrink-0" />
              </div>
              <span className="text-[10px] text-neutral-400 font-medium truncate">
                {item.badge}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
