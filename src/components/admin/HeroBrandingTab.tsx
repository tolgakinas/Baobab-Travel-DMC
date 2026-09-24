import React, { useState } from 'react';
import { useSiteContent, HeroSlide } from '../../context/SiteContentContext';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Eye, 
  Layers, 
  Type, 
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { PhotoLibraryModal } from './PhotoLibraryModal';

export const HeroBrandingTab: React.FC = () => {
  const { 
    content, 
    updateBranding, 
    updateHero, 
    updateHeroSlide, 
    addHeroSlide, 
    deleteHeroSlide 
  } = useSiteContent();

  const [photoPickerOpen, setPhotoPickerOpen] = useState<boolean>(false);
  const [activeSlideIndexForPhoto, setActiveSlideIndexForPhoto] = useState<number | null>(null);
  const [deletingSlideIndex, setDeletingSlideIndex] = useState<number | null>(null);

  const openPhotoPickerForSlide = (index: number) => {
    setActiveSlideIndexForPhoto(index);
    setPhotoPickerOpen(true);
  };

  const handleSelectPhoto = (url: string) => {
    if (activeSlideIndexForPhoto !== null) {
      updateHeroSlide(activeSlideIndexForPhoto, { image: url });
    }
  };

  const handleAddNewSlide = () => {
    const newSlide: HeroSlide = {
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85',
      location: 'New Destination, Turkey',
      title: 'Majestic Horizons & Curated Journeys',
      subtitle: 'Bespoke small group expeditions and authentic cultural encounters.',
      destId: 'istanbul'
    };
    addHeroSlide(newSlide);
  };

  return (
    <div className="space-y-8">
      {/* Photo Library Picker Modal */}
      <PhotoLibraryModal
        isOpen={photoPickerOpen}
        onClose={() => setPhotoPickerOpen(false)}
        onSelectPhoto={handleSelectPhoto}
        currentUrl={activeSlideIndexForPhoto !== null ? content.hero.slides[activeSlideIndexForPhoto]?.image : undefined}
      />

      {/* SECTION 1: Brand Identity & Legal Entity Texts & Numbers */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
          <Building2 className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Brand Identity & Legal Accreditation
            </h3>
            <p className="text-xs text-neutral-500">
              Control website brand name, operational tagline, and official TÜRSAB license numbers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Company Brand Name
            </label>
            <input
              type="text"
              value={content.branding.companyName}
              onChange={(e) => updateBranding({ companyName: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Operator Subtitle / Category
            </label>
            <input
              type="text"
              value={content.branding.operatorSubtitle}
              onChange={(e) => updateBranding({ operatorSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              TÜRSAB License Number (Official)
            </label>
            <input
              type="text"
              value={content.branding.tursabNumber}
              onChange={(e) => {
                updateBranding({ tursabNumber: e.target.value });
              }}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded font-mono font-bold text-[#F05A28] focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              License Grade Label
            </label>
            <input
              type="text"
              value={content.branding.tursabGrade}
              onChange={(e) => updateBranding({ tursabGrade: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Founded Year (Number)
            </label>
            <input
              type="number"
              value={content.branding.foundedYear}
              onChange={(e) => updateBranding({ foundedYear: parseInt(e.target.value) || 2000 })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Company Mission Statement & Meta Tagline
            </label>
            <input
              type="text"
              value={content.branding.tagline}
              onChange={(e) => updateBranding({ tagline: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Hero Main Texts & Call-to-Actions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
          <Type className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Hero Section Headline & Copywriting
            </h3>
            <p className="text-xs text-neutral-500">
              Edit the majestic headings, sub-headings, and call-to-action button labels in real time.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Top Trust Badge Text
            </label>
            <input
              type="text"
              value={content.hero.badgeText}
              onChange={(e) => updateHero({ badgeText: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Main Headline (Line 1)
              </label>
              <input
                type="text"
                value={content.hero.titleLine1}
                onChange={(e) => updateHero({ titleLine1: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Main Headline Italic (Line 2)
              </label>
              <input
                type="text"
                value={content.hero.titleLine2}
                onChange={(e) => updateHero({ titleLine2: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Hero Subtitle Paragraph
            </label>
            <textarea
              rows={3}
              value={content.hero.subtitle}
              onChange={(e) => updateHero({ subtitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Primary Button Label
              </label>
              <input
                type="text"
                value={content.hero.ctaRequestText}
                onChange={(e) => updateHero({ ctaRequestText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none font-semibold text-[#F05A28]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Video Call Button Label
              </label>
              <input
                type="text"
                value={content.hero.ctaConsultationText}
                onChange={(e) => updateHero({ ctaConsultationText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Explore Button Label
              </label>
              <input
                type="text"
                value={content.hero.ctaExploreText}
                onChange={(e) => updateHero({ ctaExploreText: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Hero Carousel Slides & High-Res Photos */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-[#F05A28]" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Hero Visual Slides & Photo Gallery ({content.hero.slides.length})
              </h3>
              <p className="text-xs text-neutral-500">
                Replace backdrop photos, change slide captions, or add new destination slides.
              </p>
            </div>
          </div>
          <button
            onClick={handleAddNewSlide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="space-y-6">
          {content.hero.slides.map((slide, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F05A28] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F05A28]" />
                  Slide #{index + 1}: {slide.location}
                </span>
                {content.hero.slides.length > 1 && (
                  <div>
                    {deletingSlideIndex === index ? (
                      <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                        <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                        <button
                          onClick={() => {
                            deleteHeroSlide(index);
                            setDeletingSlideIndex(null);
                          }}
                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeletingSlideIndex(null)}
                          className="px-1 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingSlideIndex(index)}
                        className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors hover:bg-red-50"
                        title="Remove Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Visual Thumbnail & Picker Trigger */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="aspect-[16/10] rounded overflow-hidden border border-neutral-300 relative group bg-neutral-900">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      <button
                        onClick={() => openPhotoPickerForSlide(index)}
                        className="px-3 py-1.5 bg-[#F05A28] text-white text-xs font-bold rounded shadow-sm hover:bg-[#D94526] transition-colors flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => openPhotoPickerForSlide(index)}
                    className="w-full py-1.5 px-3 bg-white border border-neutral-300 hover:border-[#F05A28] text-neutral-700 hover:text-[#F05A28] text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Choose from Photo Library</span>
                  </button>

                  <div className="relative">
                    <input
                      type="url"
                      value={slide.image}
                      onChange={(e) => updateHeroSlide(index, { image: e.target.value })}
                      placeholder="Or paste direct image URL..."
                      className="w-full px-2.5 py-1.5 text-[11px] border border-neutral-200 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                    />
                  </div>
                </div>

                {/* Slide Text Content Fields */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                        Location Tag
                      </label>
                      <input
                        type="text"
                        value={slide.location}
                        onChange={(e) => updateHeroSlide(index, { location: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                        Destination Anchor Link ID
                      </label>
                      <input
                        type="text"
                        value={slide.destId}
                        onChange={(e) => updateHeroSlide(index, { destId: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                      Slide Heading Title
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => updateHeroSlide(index, { title: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28] font-medium text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                      Slide Description Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={slide.subtitle}
                      onChange={(e) => updateHeroSlide(index, { subtitle: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
