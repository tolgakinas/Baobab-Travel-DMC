import React, { useState } from 'react';
import { X, Image as ImageIcon, Check, Search, ExternalLink } from 'lucide-react';
import { PHOTO_PRESET_LIBRARY } from '../../context/SiteContentContext';

interface PhotoLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (url: string) => void;
  currentUrl?: string;
  title?: string;
}

export const PhotoLibraryModal: React.FC<PhotoLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
  currentUrl,
  title = 'Select High-Resolution Turkey Photography'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>(currentUrl || '');

  if (!isOpen) return null;

  const allPhotos = PHOTO_PRESET_LIBRARY.flatMap(cat => 
    cat.photos.map(p => ({ ...p, category: cat.category }))
  );

  const filteredPhotos = allPhotos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyCustomUrl = () => {
    if (customUrl.trim()) {
      onSelectPhoto(customUrl.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-neutral-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-library-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F05A28]/20 flex items-center justify-center text-[#F05A28]">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 id="photo-library-title" className="text-base font-bold text-white tracking-wide">
                {title}
              </h3>
              <p className="text-xs text-neutral-400">
                Curated high-resolution Turkey travel imagery & custom URL loader
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close photo library"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom URL Input Bar */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row gap-2.5 items-center">
          <div className="w-full flex-1 relative">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Or paste any custom web image URL (https://...)"
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#F05A28]"
            />
          </div>
          <button
            onClick={handleApplyCustomUrl}
            disabled={!customUrl.trim()}
            className="w-full sm:w-auto px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            Apply URL
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Regions ({allPhotos.length})
            </button>
            {PHOTO_PRESET_LIBRARY.map(cat => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                  selectedCategory === cat.category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photo by tag..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#F05A28]"
            />
          </div>
        </div>

        {/* Photo Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo) => {
            const isSelected = currentUrl === photo.url;
            return (
              <div
                key={photo.url}
                onClick={() => {
                  onSelectPhoto(photo.url);
                  onClose();
                }}
                className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected 
                    ? 'border-[#F05A28] ring-2 ring-[#F05A28]/30' 
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#F05A28] text-white p-1 rounded-full shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>Click to Apply</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
                <div className="p-2.5 bg-white">
                  <div className="text-xs font-bold text-neutral-900 line-clamp-1">
                    {photo.title}
                  </div>
                  <div className="text-[11px] text-[#F05A28] font-medium mt-0.5 flex items-center justify-between">
                    <span>{photo.location}</span>
                    <span className="text-neutral-400 text-[10px]">{photo.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>Click any curated photo thumbnail to instantly apply to your website.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
