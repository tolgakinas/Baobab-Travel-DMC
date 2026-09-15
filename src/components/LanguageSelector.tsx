import React from 'react';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const LANGUAGES: { code: SupportedLanguage; label: string; flag: string; country: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', country: 'UK / Global' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', country: 'Deutschland / DACH' },
  { code: 'es', label: 'Español', flag: '🇪🇸', country: 'España / LATAM' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'dark' 
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLight = variant === 'light';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all border ${
          isLight
            ? 'bg-white/90 text-neutral-800 border-neutral-300 hover:bg-neutral-50 shadow-xs'
            : 'bg-neutral-900/90 text-neutral-200 border-neutral-700 hover:bg-neutral-800 shadow-xs'
        }`}
        aria-label="Select Language"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="uppercase tracking-wider text-[11px] font-bold">{currentLang.code}</span>
        <svg 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className={`absolute right-0 mt-1.5 w-44 rounded-md shadow-xl py-1.5 border z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isLight
              ? 'bg-white text-neutral-900 border-neutral-200'
              : 'bg-[#18191C] text-neutral-100 border-neutral-800'
          }`}
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200/40 dark:border-neutral-800 mb-1">
            Language / Sprache / Idioma
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#F05A28]/10 text-[#F05A28] font-bold'
                    : isLight
                    ? 'hover:bg-neutral-100 text-neutral-700'
                    : 'hover:bg-neutral-800/80 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
