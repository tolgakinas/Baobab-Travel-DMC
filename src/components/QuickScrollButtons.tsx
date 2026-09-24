import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const QuickScrollButtons: React.FC = () => {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Able to scroll up if scrolled down at least 80px
      setCanScrollUp(scrollY > 80);
      // Able to scroll down if not near the bottom (within 80px)
      setCanScrollDown(scrollY + windowHeight < fullHeight - 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed right-3.5 sm:right-6 bottom-20 sm:bottom-8 z-30 flex flex-col gap-2 pointer-events-auto select-none"
      aria-label="Quick page navigation"
    >
      {/* Quick Scroll Up Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border shadow-md group ${
          canScrollUp
            ? 'bg-neutral-900/30 hover:bg-neutral-900/60 active:bg-neutral-900/80 text-white border-white/30 hover:border-white/60 active:scale-95 opacity-85 hover:opacity-100 hover:shadow-lg cursor-pointer'
            : 'bg-neutral-900/15 hover:bg-neutral-900/30 text-white/50 hover:text-white border-white/15 opacity-40 hover:opacity-75 cursor-pointer'
        }`}
      >
        <ChevronUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>

      {/* Quick Scroll Down Button */}
      <button
        type="button"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border shadow-md group ${
          canScrollDown
            ? 'bg-neutral-900/30 hover:bg-neutral-900/60 active:bg-neutral-900/80 text-white border-white/30 hover:border-white/60 active:scale-95 opacity-85 hover:opacity-100 hover:shadow-lg cursor-pointer'
            : 'bg-neutral-900/15 hover:bg-neutral-900/30 text-white/50 hover:text-white border-white/15 opacity-40 hover:opacity-75 cursor-pointer'
        }`}
      >
        <ChevronDown className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-y-0.5" />
      </button>
    </div>
  );
};
