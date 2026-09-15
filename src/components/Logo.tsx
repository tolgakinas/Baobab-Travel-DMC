import React, { useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const isLightMode = variant === 'light';
  const logoSrc = isLightMode ? '/baobab-logo.png' : '/baobab-logo-white.png';
  const primaryTextColor = isLightMode ? '#111111' : '#FFFFFF';
  const accentColor = '#F05A28';

  const sizeStyles = {
    sm: { height: '34px', maxWidth: '145px' },
    md: { height: '44px', maxWidth: '185px' },
    lg: { height: '58px', maxWidth: '250px' },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {!imgError ? (
        <img
          src={logoSrc}
          alt="Baobab Destination Management Company"
          className="w-auto object-contain transition-opacity duration-200"
          style={{
            height: sizeStyles.height,
            maxHeight: sizeStyles.height,
          }}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.indexOf('Copy%20of%20Baobab%20DMC1.png') === -1) {
              target.src = '/Copy of Baobab DMC1.png';
            } else {
              setImgError(true);
            }
          }}
        />
      ) : (
        <div className="inline-flex flex-col">
          <span
            style={{
              fontFamily: "'Montserrat', 'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              color: primaryTextColor,
              lineHeight: 0.95,
            }}
            className="text-2xl uppercase tracking-tighter"
          >
            BAOBAB
          </span>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              color: primaryTextColor,
            }}
            className="text-[9px] uppercase flex items-center font-bold tracking-[0.24em] mt-[-2px] whitespace-nowrap"
          >
            <span><span style={{ color: accentColor }}>D</span>ESTINATION</span>
            <span className="mx-1"><span style={{ color: accentColor }}>M</span>ANAGEMENT</span>
            <span><span style={{ color: accentColor }}>C</span>OMPANY</span>
          </div>
        </div>
      )}
    </div>
  );
};
