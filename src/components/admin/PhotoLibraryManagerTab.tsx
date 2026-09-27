import React, { useState, useRef } from 'react';
import { useSiteContent, LibraryPhotoItem, PHOTO_PRESET_LIBRARY } from '../../context/SiteContentContext';
import { optimizeImageForWeb, OptimizedImageResult } from '../../utils/imageOptimizer';
import { 
  Image as ImageIcon, 
  Upload, 
  Sparkles, 
  Check, 
  Search, 
  Trash2, 
  Copy, 
  Edit3, 
  Tag, 
  Info, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileCheck,
  Maximize2
} from 'lucide-react';

interface PhotoLibraryManagerTabProps {
  onSelectPhoto?: (url: string) => void;
  currentUrl?: string;
  isModalMode?: boolean;
}

interface UploadQueueItem {
  id: string;
  file: File;
  status: 'optimizing' | 'analyzing' | 'ready' | 'error';
  errorMessage?: string;
  optimizedResult?: OptimizedImageResult;
  seoData: {
    title: string;
    caption: string;
    description: string;
    altText: string;
    location: string;
    category: string;
    seoKeywords: string[];
  };
  savedToLibrary: boolean;
}

export const PhotoLibraryManagerTab: React.FC<PhotoLibraryManagerTabProps> = ({
  onSelectPhoto,
  currentUrl,
  isModalMode = false
}) => {
  const { content, addCustomPhoto, deleteCustomPhoto, updateCustomPhoto } = useSiteContent();

  const [activeSubView, setActiveSubView] = useState<'browse' | 'upload'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customDirectUrl, setCustomDirectUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Inspector Modal State
  const [inspectingPhoto, setInspectingPhoto] = useState<LibraryPhotoItem | null>(null);

  // Upload Queue State
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'all',
    'my_uploads',
    'Cappadocia & Balloons',
    'Istanbul & Bosphorus',
    'Turquoise Coast & Gulets',
    'Aegean & Classical Ruins',
    'Black Sea & Highlands',
    'Eastern Anatolia & Mesopotamia',
    'Gastronomy & Bazaars',
    'Luxury Boutique Venues'
  ];

  // Compile all photos (Preset + Custom Uploads)
  const customPhotos: LibraryPhotoItem[] = (content.customPhotos || []).map(p => ({
    ...p,
    category: p.category || 'Custom Uploads',
    isCustom: true
  }));

  const presetPhotos: LibraryPhotoItem[] = PHOTO_PRESET_LIBRARY.flatMap(cat =>
    cat.photos.map(p => ({
      ...p,
      category: cat.category,
      altText: p.altText || `${p.title} in ${p.location}, Turkey`,
      caption: p.caption || `Curated high-resolution photography of ${p.location}.`,
      seoKeywords: p.seoKeywords || ['Turkey DMC', p.location, cat.category, 'Turkey tours'],
      isCustom: false
    }))
  );

  const allPhotos: LibraryPhotoItem[] = [...customPhotos, ...presetPhotos];

  // Filtered Photo List
  const filteredPhotos = allPhotos.filter(photo => {
    if (selectedCategory === 'my_uploads') {
      if (!photo.isCustom) return false;
    } else if (selectedCategory !== 'all') {
      if (photo.category !== selectedCategory) return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesTitle = photo.title.toLowerCase().includes(q);
    const matchesLocation = photo.location.toLowerCase().includes(q);
    const matchesCategory = (photo.category || '').toLowerCase().includes(q);
    const matchesCaption = (photo.caption || '').toLowerCase().includes(q);
    const matchesAlt = (photo.altText || '').toLowerCase().includes(q);
    const matchesKeywords = (photo.seoKeywords || []).some(k => k.toLowerCase().includes(q));

    return matchesTitle || matchesLocation || matchesCategory || matchesCaption || matchesAlt || matchesKeywords;
  });

  // Handle Copy URL
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Upload and Optimization Pipeline
  const processUploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    setActiveSubView('upload');

    // Create Queue items
    const newItems: UploadQueueItem[] = fileArray.map(file => ({
      id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      status: 'optimizing',
      seoData: {
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        caption: 'Authentic Turkish travel scene for small group and bespoke itineraries.',
        description: 'Web-optimized high-resolution photography curated for Baobab DMC Turkey.',
        altText: `Scenic view in Turkey for tour itineraries`,
        location: 'Turkiye',
        category: 'Cappadocia & Balloons',
        seoKeywords: ['Turkey DMC', 'Turkey tours', 'Inbound Turkish ground operator']
      },
      savedToLibrary: false
    }));

    setUploadQueue(prev => [...newItems, ...prev]);

    // Process each item sequentially or in parallel
    for (const item of newItems) {
      try {
        // Step 1: Client-Side Web Optimization (Canvas WebP Compression & Resizing)
        const optimized = await optimizeImageForWeb(item.file, 2048, 0.85);

        setUploadQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: 'analyzing',
          optimizedResult: optimized
        } : q));

        // Step 2: AI Photo Examination & SEO Metadata Generation
        let aiSeo = item.seoData;
        try {
          const res = await fetch('/api/analyze-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Image: optimized.base64,
              mimeType: optimized.mimeType,
              originalName: item.file.name
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.analysis) {
              aiSeo = {
                title: data.analysis.title || item.seoData.title,
                caption: data.analysis.caption || item.seoData.caption,
                description: data.analysis.description || item.seoData.description,
                altText: data.analysis.altText || item.seoData.altText,
                location: data.analysis.location || item.seoData.location,
                category: data.analysis.category || item.seoData.category,
                seoKeywords: data.analysis.seoKeywords || item.seoData.seoKeywords
              };
            }
          }
        } catch (aiErr) {
          console.warn('AI analysis fallback triggered:', aiErr);
        }

        // Auto-save to Context Library
        const newPhotoItem: LibraryPhotoItem = {
          id: item.id,
          url: optimized.dataUrl,
          title: aiSeo.title,
          location: aiSeo.location,
          category: aiSeo.category,
          caption: aiSeo.caption,
          description: aiSeo.description,
          altText: aiSeo.altText,
          seoKeywords: aiSeo.seoKeywords,
          originalSizeFormatted: optimized.originalSizeFormatted,
          optimizedSizeFormatted: optimized.optimizedSizeFormatted,
          compressionRatio: optimized.compressionRatio,
          dimensions: `${optimized.width} × ${optimized.height} px`,
          format: optimized.format,
          uploadedAt: new Date().toISOString(),
          isCustom: true
        };

        addCustomPhoto(newPhotoItem);

        setUploadQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: 'ready',
          seoData: aiSeo,
          savedToLibrary: true
        } : q));

      } catch (err: any) {
        console.error('Photo optimization error:', err);
        setUploadQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: 'error',
          errorMessage: err.message || 'Failed to optimize image.'
        } : q));
      }
    }
  };

  // Update item in queue
  const updateQueueItemSeo = (id: string, updates: Partial<UploadQueueItem['seoData']>) => {
    setUploadQueue(prev => prev.map(q => {
      if (q.id !== id) return q;
      const updatedSeo = { ...q.seoData, ...updates };
      // Also update in customPhotos if saved
      if (q.optimizedResult) {
        updateCustomPhoto(q.optimizedResult.dataUrl, updatedSeo);
      }
      return { ...q, seoData: updatedSeo };
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header & View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#F05A28]/10 text-[#F05A28] flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Turkey Photo Library & AI SEO Optimizer
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Upload custom high-res photography, auto-compress into web-optimized WebP, and auto-generate AI SEO captions and alt tags.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubView('browse')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors ${
              activeSubView === 'browse'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Browse Library ({allPhotos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('upload')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors ${
              activeSubView === 'upload'
                ? 'bg-[#F05A28] text-white shadow-xs'
                : 'bg-orange-50 text-[#F05A28] border border-orange-200 hover:bg-orange-100'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload & AI Optimize</span>
            {uploadQueue.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-white/25 rounded-full text-[10px]">
                {uploadQueue.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: UPLOAD & OPTIMIZATION ZONE */}
      {/* ========================================================================= */}
      {activeSubView === 'upload' && (
        <div className="space-y-6">
          {/* Drag & Drop Upload Banner */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files) {
                processUploadFiles(e.dataTransfer.files);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-[#F05A28] bg-orange-50/50 scale-[1.01]'
                : 'border-neutral-300 bg-white hover:border-[#F05A28]/60 hover:bg-neutral-50/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  processUploadFiles(e.target.files);
                }
              }}
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F05A28]/10 text-[#F05A28] flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                <Upload className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-neutral-900">
                  Drag & Drop Photos Here or Click to Browse
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Upload raw camera files, phone photos, or high-res JPG/PNG/WebP. <br/>
                  <strong className="text-neutral-700">Automatic Client Optimization:</strong> Downscales to 2048px WebP (saving ~85-95% bandwidth) & examines photo with AI for SEO descriptions.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Client-Side Compression + Gemini AI SEO Analysis</span>
              </div>
            </div>
          </div>

          {/* Upload Queue List */}
          {uploadQueue.length > 0 && (
            <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Uploaded & Optimized Photos ({uploadQueue.length})</span>
                </h4>

                <button
                  type="button"
                  onClick={() => setUploadQueue([])}
                  className="text-xs text-neutral-500 hover:text-neutral-900"
                >
                  Clear Queue
                </button>
              </div>

              <div className="space-y-4">
                {uploadQueue.map((item) => (
                  <div 
                    key={item.id}
                    className="border border-neutral-200 rounded-lg p-4 bg-neutral-50/50 space-y-3"
                  >
                    {/* Header Row with status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div className="flex items-center gap-3">
                        {item.optimizedResult ? (
                          <img
                            src={item.optimizedResult.dataUrl}
                            alt={item.seoData.altText}
                            className="w-16 h-12 rounded object-cover border border-neutral-300 bg-neutral-900 shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded bg-neutral-200 flex items-center justify-center text-neutral-400 shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}

                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            {item.file.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
                            {item.optimizedResult ? (
                              <>
                                <span className="text-neutral-400 line-through">
                                  {item.optimizedResult.originalSizeFormatted}
                                </span>
                                <span>→</span>
                                <strong className="text-emerald-700">
                                  {item.optimizedResult.optimizedSizeFormatted} ({item.optimizedResult.format})
                                </strong>
                                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  {item.optimizedResult.compressionRatio}
                                </span>
                                <span>({item.optimizedResult.width}×{item.optimizedResult.height}px)</span>
                              </>
                            ) : (
                              <span>Processing...</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-2">
                        {item.status === 'optimizing' && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold px-2.5 py-1 bg-amber-50 rounded border border-amber-200">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                            <span>Optimizing WebP...</span>
                          </span>
                        )}

                        {item.status === 'analyzing' && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-indigo-700 font-semibold px-2.5 py-1 bg-indigo-50 rounded border border-indigo-200">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                            <span>AI SEO Examining...</span>
                          </span>
                        )}

                        {item.status === 'ready' && (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold px-2.5 py-1 bg-emerald-50 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Saved to Library</span>
                            </span>

                            {onSelectPhoto && item.optimizedResult && (
                              <button
                                type="button"
                                onClick={() => onSelectPhoto(item.optimizedResult!.dataUrl)}
                                className="px-3 py-1 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-xs"
                              >
                                <span>Apply to Target</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}

                        {item.status === 'error' && (
                          <span className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold px-2.5 py-1 bg-red-50 rounded border border-red-200">
                            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                            <span>{item.errorMessage || 'Optimization Error'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* SEO Metadata Form Editor */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                      <div className="md:col-span-6">
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          SEO Photo Title
                        </label>
                        <input
                          type="text"
                          value={item.seoData.title}
                          onChange={(e) => updateQueueItemSeo(item.id, { title: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white font-medium focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Location / Region
                        </label>
                        <input
                          type="text"
                          value={item.seoData.location}
                          onChange={(e) => updateQueueItemSeo(item.id, { location: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Category
                        </label>
                        <select
                          value={item.seoData.category}
                          onChange={(e) => updateQueueItemSeo(item.id, { category: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        >
                          {categories.filter(c => c !== 'all' && c !== 'my_uploads').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-6">
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Accessibility & SEO Alt Text (Image Alt)
                        </label>
                        <input
                          type="text"
                          value={item.seoData.altText}
                          onChange={(e) => updateQueueItemSeo(item.id, { altText: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="md:col-span-6">
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Itinerary & Catalog Caption
                        </label>
                        <input
                          type="text"
                          value={item.seoData.caption}
                          onChange={(e) => updateQueueItemSeo(item.id, { caption: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      {/* Keywords Chips */}
                      <div className="md:col-span-12">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase text-neutral-500 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-[#F05A28]" />
                            <span>SEO Keywords:</span>
                          </span>
                          {item.seoData.seoKeywords.map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white border border-neutral-200 text-neutral-700 text-[10px] font-medium rounded-sm">
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: BROWSE PHOTO LIBRARY */}
      {/* ========================================================================= */}
      {activeSubView === 'browse' && (
        <div className="space-y-4">
          {/* Direct URL Input Bar */}
          <div className="p-4 bg-white rounded-lg border border-neutral-200 flex flex-col sm:flex-row gap-2.5 items-center">
            <div className="w-full flex-1 relative">
              <input
                type="url"
                value={customDirectUrl}
                onChange={(e) => setCustomDirectUrl(e.target.value)}
                placeholder="Or paste any custom image URL (https://images.unsplash.com/...)"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-neutral-50 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#F05A28]"
              />
            </div>
            <button
              onClick={() => {
                if (customDirectUrl.trim()) {
                  if (onSelectPhoto) onSelectPhoto(customDirectUrl.trim());
                  // Also add to custom photo library
                  addCustomPhoto({
                    url: customDirectUrl.trim(),
                    title: 'Custom Web Image',
                    location: 'Turkiye',
                    category: 'Custom Uploads',
                    altText: 'Custom travel photography for Baobab DMC',
                    caption: 'Direct URL loaded photo.'
                  });
                  setCustomDirectUrl('');
                }
              }}
              disabled={!customDirectUrl.trim()}
              className="w-full sm:w-auto px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
            >
              {onSelectPhoto ? 'Apply URL' : 'Save to Library'}
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-lg border border-neutral-200 flex flex-col lg:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
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

              {customPhotos.length > 0 && (
                <button
                  onClick={() => setSelectedCategory('my_uploads')}
                  className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-colors ${
                    selectedCategory === 'my_uploads'
                      ? 'bg-[#F05A28] text-white'
                      : 'bg-orange-50 text-[#F05A28] border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>My Uploads ({customPhotos.length})</span>
                </button>
              )}

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

            <div className="relative w-full lg:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, tags, alt text..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo, idx) => {
              const isSelected = currentUrl === photo.url;
              const isCustom = photo.isCustom;

              return (
                <div
                  key={`${photo.url}-${idx}`}
                  className={`group rounded-lg border overflow-hidden bg-white transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                    isSelected 
                      ? 'border-[#F05A28] ring-2 ring-[#F05A28]/30 shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div>
                    {/* Thumbnail Box */}
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
                      <img
                        src={photo.url}
                        alt={photo.altText || photo.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        {isCustom ? (
                          <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold uppercase rounded shadow-xs flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>AI Optimized</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-black/70 backdrop-blur-xs text-neutral-200 text-[9px] font-semibold uppercase rounded">
                            Verified Curated
                          </span>
                        )}

                        {photo.compressionRatio && (
                          <span className="px-1.5 py-0.5 bg-neutral-900/80 text-emerald-400 text-[9px] font-mono font-bold rounded">
                            {photo.compressionRatio}
                          </span>
                        )}
                      </div>

                      {/* Select Checkmark if currently active */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#F05A28] text-white p-1 rounded-full shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}

                      {/* Hover Overlay with Action Buttons */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                        <div className="text-[11px] text-neutral-200 line-clamp-2 italic font-sans">
                          "{photo.caption || photo.description || photo.altText}"
                        </div>

                        <div className="flex items-center gap-1.5">
                          {onSelectPhoto && (
                            <button
                              type="button"
                              onClick={() => onSelectPhoto(photo.url)}
                              className="flex-1 px-2.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1"
                            >
                              <span>Apply Photo</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setInspectingPhoto(photo)}
                            className="px-2.5 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[11px] font-semibold rounded transition-colors flex items-center gap-1"
                            title="Inspect SEO Alt text, Keywords & Meta"
                          >
                            <Info className="w-3.5 h-3.5" />
                            <span>SEO Info</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(photo.url)}
                            className="p-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded transition-colors"
                            title="Copy Image URL"
                          >
                            {copiedUrl === photo.url ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {isCustom && (
                            <button
                              type="button"
                              onClick={() => deleteCustomPhoto(photo.url)}
                              className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded transition-colors"
                              title="Delete from Library"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Metadata Card Info */}
                    <div className="p-3 space-y-1">
                      <div className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {photo.title}
                      </div>
                      <div className="text-[11px] text-[#F05A28] font-medium flex items-center justify-between">
                        <span>{photo.location}</span>
                        <span className="text-neutral-400 text-[10px]">{photo.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* SEO Alt-Text Snippet at Bottom */}
                  <div className="px-3 py-2 border-t border-neutral-100 bg-neutral-50/70 text-[10px] text-neutral-500 line-clamp-1 flex items-center gap-1">
                    <span className="font-bold text-neutral-600 uppercase">Alt:</span>
                    <span className="truncate">{photo.altText || photo.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHOTO SEO METADATA INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {inspectingPhoto && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-neutral-200">
            {/* Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#F05A28]" />
                <h4 className="text-sm font-bold text-white">
                  Photo SEO & Accessibility Metadata Inspector
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setInspectingPhoto(null)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-4 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                <img
                  src={inspectingPhoto.url}
                  alt={inspectingPhoto.altText || inspectingPhoto.title}
                  className="w-24 h-16 rounded object-cover border border-neutral-300 bg-neutral-900 shrink-0"
                />
                <div className="min-w-0 space-y-1">
                  <h5 className="text-sm font-bold text-neutral-900 truncate">
                    {inspectingPhoto.title}
                  </h5>
                  <div className="text-xs text-[#F05A28] font-medium">
                    {inspectingPhoto.location} • {inspectingPhoto.category}
                  </div>
                  {inspectingPhoto.dimensions && (
                    <div className="text-[11px] text-neutral-500 font-mono">
                      Dimensions: {inspectingPhoto.dimensions} {inspectingPhoto.optimizedSizeFormatted ? `• Size: ${inspectingPhoto.optimizedSizeFormatted}` : ''}
                    </div>
                  )}
                </div>
              </div>

              {/* Alt Text Box */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Accessibility & Image Alt Text (SEO Tag)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(inspectingPhoto.altText || inspectingPhoto.title);
                      alert('Alt text copied to clipboard!');
                    }}
                    className="text-[11px] font-semibold text-[#F05A28] hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Alt Text</span>
                  </button>
                </div>
                <div className="p-2.5 bg-neutral-100 rounded text-xs text-neutral-800 font-sans border border-neutral-200">
                  {inspectingPhoto.altText || `${inspectingPhoto.title} in ${inspectingPhoto.location}, Turkey`}
                </div>
              </div>

              {/* Itinerary Caption */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Itinerary & Catalog Caption
                </label>
                <div className="p-2.5 bg-neutral-100 rounded text-xs text-neutral-800 font-sans border border-neutral-200">
                  {inspectingPhoto.caption || `Curated high-resolution photography of ${inspectingPhoto.location}.`}
                </div>
              </div>

              {/* Description */}
              {inspectingPhoto.description && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Search Engine Indexing Description
                  </label>
                  <div className="p-2.5 bg-neutral-100 rounded text-xs text-neutral-700 font-sans border border-neutral-200">
                    {inspectingPhoto.description}
                  </div>
                </div>
              )}

              {/* SEO Keywords */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Target SEO Search Keywords
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(inspectingPhoto.seoKeywords || ['Turkey DMC', inspectingPhoto.location, 'Turkey travel', 'Bespoke Turkey tour']).map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-orange-50 border border-orange-200 text-[#F05A28] text-xs font-medium rounded">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Direct Web URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={inspectingPhoto.url}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded text-neutral-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(inspectingPhoto.url)}
                    className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                SEO tags and captions automatically propagate to client itineraries and alt attributes.
              </span>
              <button
                type="button"
                onClick={() => setInspectingPhoto(null)}
                className="px-4 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
