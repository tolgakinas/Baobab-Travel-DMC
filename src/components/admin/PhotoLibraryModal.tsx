import React from 'react';
import { X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PhotoLibraryManagerTab } from './PhotoLibraryManagerTab';

interface PhotoLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (url: string) => void;
  currentUrl?: string;
  title?: string;
  initialCategory?: string;
  zIndexClass?: string;
}

export const PhotoLibraryModal: React.FC<PhotoLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
  currentUrl,
  title = 'Turkey Photography Library & AI SEO Optimizer',
  initialCategory,
  zIndexClass = 'z-[160]'
}) => {
  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onSelectPhoto(url);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${zIndexClass} flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in`}>
      <div 
        className="bg-neutral-100 rounded-xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden border border-neutral-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-library-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-[#121316] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#F05A28]/20 flex items-center justify-center text-[#F05A28]">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="photo-library-title" className="text-base font-bold text-white tracking-wide">
                  {title}
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#F05A28]/20 text-[#F05A28] border border-[#F05A28]/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>AI SEO Enabled</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Unified Centralized Photo Library • Upload, auto-compress to WebP, inspect AI SEO & sync live across all components
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <PhotoLibraryManagerTab
            onSelectPhoto={handleSelect}
            currentUrl={currentUrl}
            initialCategory={initialCategory}
            isModalMode={true}
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-white flex items-center justify-between text-xs text-neutral-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Click any photo to instantly assign it to the selected component.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
