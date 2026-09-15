import React from 'react';

interface SocialMediaLinksProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showLabels = false,
}) => {
  const isLight = variant === 'light';

  const socialLinks = [
    {
      name: 'LinkedIn',
      handle: 'Baobab DMC Turkey',
      url: 'https://www.linkedin.com/company/baobab-dmc-turkey',
      ariaLabel: 'Follow Baobab DMC on LinkedIn',
      icon: (
        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: '@baobabdmcturkey',
      url: 'https://www.instagram.com/baobabdmcturkey',
      ariaLabel: 'Follow Baobab DMC on Instagram',
      icon: (
        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      handle: 'Baobab Travel Turkey',
      url: 'https://www.facebook.com/baobabdmcturkey',
      ariaLabel: 'Follow Baobab DMC on Facebook',
      icon: (
        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      handle: 'Baobab DMC Media',
      url: 'https://www.youtube.com/@baobabdmcturkey',
      ariaLabel: 'Watch Baobab DMC on YouTube',
      icon: (
        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ];

  const sizeClass = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2',
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={s.ariaLabel}
          title={`${s.name} - ${s.handle}`}
          className={`${sizeClass} rounded-md transition-all duration-200 flex items-center justify-center ${
            isLight
              ? 'bg-neutral-100 text-neutral-700 hover:bg-[#F05A28] hover:text-white shadow-xs'
              : 'bg-neutral-900/90 text-neutral-300 hover:bg-[#F05A28] hover:text-white border border-neutral-800'
          }`}
        >
          {s.icon}
        </a>
      ))}
      {showLabels && (
        <span className="text-xs text-neutral-400 ml-1 font-medium hidden sm:inline">
          @baobabdmcturkey
        </span>
      )}
    </div>
  );
};
