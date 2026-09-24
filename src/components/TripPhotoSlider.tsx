import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Camera, 
  MapPin, 
  Image as ImageIcon 
} from 'lucide-react';

interface TripPhotoSliderProps {
  images: string[];
  captions?: string[];
  title: string;
  className?: string;
  aspectRatioClassName?: string;
  badges?: React.ReactNode;
  badgesOverlay?: React.ReactNode;
  topActions?: React.ReactNode;
  actionsOverlay?: React.ReactNode;
}

export const TripPhotoSlider: React.FC<TripPhotoSliderProps> = ({
  images,
  captions = [],
  title,
  className = '',
  aspectRatioClassName = 'h-72 sm:h-96',
  badges,
  badgesOverlay,
  topActions,
  actionsOverlay,
}) => {
  const effectiveBadges = badges || badgesOverlay;
  const effectiveActions = topActions || actionsOverlay;
  // Ensure we always have valid images
  const safeImages = images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80'];
  const totalSlides = safeImages.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({});

  // Reset index when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, isLightboxOpen]);

  // Touch swipe support for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  const currentCaption = captions[currentIndex] || `${title} - Perspective ${currentIndex + 1}`;

  return (
    <div className={`relative flex flex-col bg-neutral-950 select-none ${className}`}>
      {/* Main Slide Stage */}
      <div 
        className={`relative w-full ${aspectRatioClassName} overflow-hidden group cursor-grab active:cursor-grabbing touch-pan-y`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background Preload & Slide Images */}
        {safeImages.map((imgSrc, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={`${imgSrc}-${idx}`}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <img
                src={imgSrc}
                alt={`${title} - photo ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading={idx === 0 ? 'eager' : 'lazy'}
                onLoad={() => setLoadedMap(prev => ({ ...prev, [idx]: true }))}
              />
              {/* Subtle gradient vignette for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
            </div>
          );
        })}

        {/* Top Badges Overlay (Category, duration, etc.) - Constrained to prevent covering top actions */}
        {effectiveBadges && (
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-auto max-w-[calc(100%-120px)] sm:max-w-[calc(100%-180px)]">
            {effectiveBadges}
          </div>
        )}

        {/* Top Actions Overlay (PDF export, close, etc.) - High z-index to stay above tags and photos */}
        {effectiveActions && (
          <div className="absolute top-4 right-4 z-40 flex items-center gap-2 pointer-events-auto">
            {effectiveActions}
          </div>
        )}

        {/* Lightbox / Zoom Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-16 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#F05A28] text-white transition-all duration-200 backdrop-blur-md opacity-90 hover:opacity-100 shadow-md flex items-center gap-1 text-xs"
          title="View photo full-screen"
          aria-label="Expand photo to full-screen"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline font-medium pr-1">Expand</span>
        </button>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/55 hover:bg-[#F05A28] text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg opacity-85 group-hover:opacity-100 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/55 hover:bg-[#F05A28] text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg opacity-85 group-hover:opacity-100 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Counter & Location Caption Overlay */}
        <div className="absolute bottom-3 left-4 right-20 z-20 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white/95 border border-white/10 shadow-sm">
              <Camera className="w-3 h-3 text-[#F05A28]" />
              <span>{currentIndex + 1} / {totalSlides}</span>
            </span>
          </div>
          {currentCaption && (
            <p className="text-xs sm:text-sm font-medium text-white/95 drop-shadow-md line-clamp-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F05A28] shrink-0" />
              <span>{currentCaption}</span>
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail Bar (5 Photos) */}
      {totalSlides > 1 && (
        <div className="bg-neutral-950/95 px-4 py-2 border-t border-neutral-800/80 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider hidden sm:inline">
              Slides ({totalSlides})
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {safeImages.map((thumbSrc, index) => {
              const isSelected = index === currentIndex;
              return (
                <button
                  key={`thumb-${thumbSrc}-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`relative w-12 h-8 sm:w-16 sm:h-10 rounded overflow-hidden transition-all duration-200 shrink-0 border ${
                    isSelected 
                      ? 'border-[#F05A28] ring-2 ring-[#F05A28]/40 scale-105 opacity-100' 
                      : 'border-white/15 opacity-60 hover:opacity-90 hover:border-white/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img
                    src={thumbSrc}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#F05A28]/10" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Indicator Dots on mobile */}
          <div className="flex items-center gap-1">
            {safeImages.map((_, dotIdx) => (
              <button
                key={`dot-${dotIdx}`}
                onClick={() => goToSlide(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  dotIdx === currentIndex 
                    ? 'w-4 bg-[#F05A28]' 
                    : 'w-1.5 bg-neutral-600 hover:bg-neutral-400'
                }`}
                aria-label={`Slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div 
            className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-white">
              <span className="text-xs sm:text-sm font-semibold text-neutral-300">
                {title}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-[#F05A28] font-bold">
                {currentIndex + 1} of {totalSlides}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-neutral-800 hover:bg-[#F05A28] text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Image Center */}
          <div 
            className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={safeImages[currentIndex]}
              alt={`${title} full view`}
              className="max-h-[75vh] max-w-full object-contain rounded-md shadow-2xl transition-all duration-300"
              referrerPolicy="no-referrer"
            />

            {/* Lightbox Prev/Next */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-[#F05A28] text-white flex items-center justify-center transition-all shadow-xl"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-[#F05A28] text-white flex items-center justify-center transition-all shadow-xl"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer Caption & Thumbnails */}
          <div 
            className="w-full max-w-4xl mx-auto py-3 text-center z-10 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-neutral-200 font-medium">
              {currentCaption}
            </p>

            <div className="flex items-center gap-2">
              {safeImages.map((thumbSrc, idx) => (
                <button
                  key={`lb-thumb-${idx}`}
                  onClick={() => goToSlide(idx)}
                  className={`w-14 h-10 rounded overflow-hidden border transition-all ${
                    idx === currentIndex
                      ? 'border-[#F05A28] scale-110 opacity-100 ring-2 ring-[#F05A28]/50'
                      : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={thumbSrc}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
