import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  categoryBadge?: string;
  breadcrumbs: { label: string; href?: string; onClick?: () => void }[];
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  categoryBadge,
  breadcrumbs,
  actionButton,
  secondaryButton,
  backgroundImage = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85'
}) => {
  return (
    <div className="relative bg-[#121316] text-white pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-neutral-800">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover opacity-25 scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/80 to-[#121316]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center flex-wrap gap-2 text-xs text-neutral-400 font-medium">
            <li>
              <button
                type="button"
                onClick={breadcrumbs[0]?.onClick}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Home</span>
              </button>
            </li>
            {breadcrumbs.slice(1).map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-neutral-600" />
                {crumb.onClick ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-neutral-200 font-semibold">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Title & Actions Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            {categoryBadge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F05A28]/15 border border-[#F05A28]/30 text-[#F05A28] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{categoryBadge}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-white leading-tight">
              {title}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              {subtitle}
            </p>
          </div>

          {(actionButton || secondaryButton) && (
            <div className="flex items-center gap-3 flex-wrap shrink-0">
              {secondaryButton && (
                <button
                  type="button"
                  onClick={secondaryButton.onClick}
                  className="px-5 py-3 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold tracking-wide transition-colors"
                >
                  {secondaryButton.label}
                </button>
              )}
              {actionButton && (
                <button
                  type="button"
                  onClick={actionButton.onClick}
                  className="px-6 py-3 rounded-lg bg-[#F05A28] hover:bg-[#D94526] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-orange-950/40 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  {actionButton.icon}
                  <span>{actionButton.label}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
