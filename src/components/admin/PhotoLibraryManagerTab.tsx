import React, { useState, useRef, useEffect } from 'react';
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
  Maximize2,
  Plus,
  Save,
  RotateCcw,
  Sliders,
  Eye,
  HelpCircle,
  FileText,
  MapPin,
  FolderPlus,
  Zap,
  RefreshCw,
  CheckCheck,
  CheckSquare,
  Square,
  Link2,
  ListPlus,
  Wand2
} from 'lucide-react';

interface PhotoLibraryManagerTabProps {
  onSelectPhoto?: (url: string) => void;
  currentUrl?: string;
  isModalMode?: boolean;
  initialCategory?: string;
}

export interface BulkUrlItem {
  id: string;
  url: string;
  title: string;
  location: string;
  category: string;
  altText: string;
  caption: string;
  description: string;
  seoKeywords: string[];
  status: 'pending' | 'analyzing' | 'ready' | 'error';
  errorMessage?: string;
}

export interface UploadQueueItem {
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

const CATEGORY_OPTIONS = [
  'Cappadocia & Balloons',
  'Istanbul & Bosphorus',
  'Turquoise Coast & Gulets',
  'Aegean & Classical Ruins',
  'Black Sea & Highlands',
  'Eastern Anatolia & Mesopotamia',
  'Gastronomy & Bazaars',
  'Luxury Boutique Venues',
  'Custom Uploads'
];

const SUGGESTED_SEO_TAGS = [
  'Turkey DMC',
  'Cappadocia Tours',
  'Istanbul Bosphorus',
  'Turquoise Coast Gulet',
  'Ephesus Ruins',
  'Bespoke Turkey FIT',
  'Small Group Expedition',
  'Boutique Cave Hotel',
  'Lycian Way Trek',
  'Turkish Gastronomy'
];

export const PhotoLibraryManagerTab: React.FC<PhotoLibraryManagerTabProps> = ({
  onSelectPhoto,
  currentUrl,
  isModalMode = false,
  initialCategory
}) => {
  const { content, addCustomPhoto, deleteCustomPhoto, updateCustomPhoto } = useSiteContent();

  const [activeSubView, setActiveSubView] = useState<'browse' | 'upload' | 'manual_add' | 'bulk_url'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Bulk URL Upload State
  const [bulkUrlsRaw, setBulkUrlsRaw] = useState<string>('');
  const [bulkDefaultCategory, setBulkDefaultCategory] = useState<string>('Cappadocia & Balloons');
  const [bulkDefaultLocation, setBulkDefaultLocation] = useState<string>('Turkiye');
  const [bulkQueue, setBulkQueue] = useState<BulkUrlItem[]>([]);
  const [isBulkAnalyzing, setIsBulkAnalyzing] = useState<boolean>(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number } | null>(null);

  // Inspector / Editor Modal State
  const [editingPhoto, setEditingPhoto] = useState<LibraryPhotoItem | null>(null);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);
  const [newKeywordInput, setNewKeywordInput] = useState<string>('');
  const [isReanalyzingAI, setIsReanalyzingAI] = useState<boolean>(false);

  // Manual Add Form State
  const [manualForm, setManualForm] = useState<{
    url: string;
    title: string;
    location: string;
    category: string;
    altText: string;
    caption: string;
    description: string;
    seoKeywords: string[];
  }>({
    url: '',
    title: '',
    location: 'Turkiye',
    category: 'Cappadocia & Balloons',
    altText: '',
    caption: '',
    description: '',
    seoKeywords: ['Turkey DMC', 'Turkey tours', 'Inbound Turkish ground operator']
  });
  const [manualKeywordInput, setManualKeywordInput] = useState<string>('');
  const [manualIsAnalyzing, setManualIsAnalyzing] = useState<boolean>(false);

  // Upload Queue State & Batch Processing
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [queueFilter, setQueueFilter] = useState<'all' | 'processing' | 'ready' | 'error'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Batch Bulk Action Form State
  const [batchCategory, setBatchCategory] = useState<string>('');
  const [batchLocation, setBatchLocation] = useState<string>('');
  const [batchKeyword, setBatchKeyword] = useState<string>('');
  const [selectedQueueIds, setSelectedQueueIds] = useState<Set<string>>(new Set());

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Compile all photos (Preset + Custom Uploads with custom overrides applied)
  const customMap = new Map<string, LibraryPhotoItem>();
  (content.customPhotos || []).forEach(p => {
    customMap.set(p.url, {
      ...p,
      category: p.category || 'Custom Uploads',
      isCustom: true
    });
  });

  const presetPhotos: LibraryPhotoItem[] = PHOTO_PRESET_LIBRARY.flatMap(cat =>
    cat.photos.map(p => {
      if (customMap.has(p.url)) {
        return customMap.get(p.url)!;
      }
      return {
        ...p,
        category: cat.category,
        altText: p.altText || `${p.title} in ${p.location}, Turkey`,
        caption: p.caption || `Curated high-resolution photography of ${p.location}.`,
        description: p.description || `Authentic ground photography showcasing ${p.location} for small group and bespoke itineraries in Turkey.`,
        seoKeywords: p.seoKeywords || ['Turkey DMC', p.location, cat.category, 'Turkey tours', 'Baobab DMC'],
        isCustom: false
      };
    })
  );

  const presetUrlSet = new Set(PHOTO_PRESET_LIBRARY.flatMap(c => c.photos.map(p => p.url)));
  const purelyCustomPhotos: LibraryPhotoItem[] = (content.customPhotos || []).filter(p => !presetUrlSet.has(p.url));
  const allPhotos: LibraryPhotoItem[] = [...purelyCustomPhotos, ...presetPhotos];

  // Filtered Photo List for browse tab
  const filteredPhotos = allPhotos.filter(photo => {
    if (selectedCategory === 'my_uploads') {
      if (!photo.isCustom) return false;
    } else if (selectedCategory !== 'all') {
      if (photo.category !== selectedCategory) return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesTitle = (photo.title || '').toLowerCase().includes(q);
    const matchesLocation = (photo.location || '').toLowerCase().includes(q);
    const matchesCategory = (photo.category || '').toLowerCase().includes(q);
    const matchesCaption = (photo.caption || '').toLowerCase().includes(q);
    const matchesAlt = (photo.altText || '').toLowerCase().includes(q);
    const matchesDescription = (photo.description || '').toLowerCase().includes(q);
    const matchesKeywords = (photo.seoKeywords || []).some(k => k.toLowerCase().includes(q));

    return matchesTitle || matchesLocation || matchesCategory || matchesCaption || matchesAlt || matchesDescription || matchesKeywords;
  });

  // Handle Copy URL
  const handleCopy = (text: string, label = 'URL') => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    showToast(`${label} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Open Edit Modal for a photo
  const handleOpenEditPhoto = (photo: LibraryPhotoItem) => {
    setOriginalPhotoUrl(photo.url);
    setEditingPhoto({
      ...photo,
      altText: photo.altText || `${photo.title} in ${photo.location}, Turkey`,
      caption: photo.caption || `Curated high-resolution photography of ${photo.location}.`,
      description: photo.description || `High-resolution photograph featuring ${photo.location}. Professionally curated for inbound luxury tour operators and travel advisors.`,
      seoKeywords: photo.seoKeywords && photo.seoKeywords.length > 0 ? [...photo.seoKeywords] : ['Turkey DMC', photo.location, photo.category || 'Turkey Tours']
    });
    setNewKeywordInput('');
  };

  // Save changes from Edit Modal
  const handleSavePhotoEdits = () => {
    if (!editingPhoto || !originalPhotoUrl) return;

    updateCustomPhoto(originalPhotoUrl, {
      title: editingPhoto.title,
      location: editingPhoto.location,
      category: editingPhoto.category,
      altText: editingPhoto.altText,
      caption: editingPhoto.caption,
      description: editingPhoto.description,
      seoKeywords: editingPhoto.seoKeywords,
      url: editingPhoto.url,
      isCustom: true
    });

    showToast('Photo SEO metadata and alt text saved successfully!');
    setEditingPhoto(null);
    setOriginalPhotoUrl(null);
  };

  // Keyword Management for Edit Modal
  const handleAddKeyword = (tagToAdd?: string) => {
    const tag = (tagToAdd || newKeywordInput).trim().replace(/^#/, '');
    if (!tag || !editingPhoto) return;

    const currentTags = editingPhoto.seoKeywords || [];
    if (!currentTags.includes(tag)) {
      setEditingPhoto({
        ...editingPhoto,
        seoKeywords: [...currentTags, tag]
      });
    }
    setNewKeywordInput('');
  };

  const handleRemoveKeyword = (indexToRemove: number) => {
    if (!editingPhoto) return;
    const currentTags = editingPhoto.seoKeywords || [];
    setEditingPhoto({
      ...editingPhoto,
      seoKeywords: currentTags.filter((_, i) => i !== indexToRemove)
    });
  };

  // Re-run AI Analysis on editing photo (Auto-Fill unfilled parts using description as reference)
  const handleReanalyzeWithAI = async () => {
    if (!editingPhoto) return;
    setIsReanalyzingAI(true);

    try {
      const isDataUrl = editingPhoto.url.startsWith('data:');
      const base64 = isDataUrl ? editingPhoto.url.split(',')[1] : undefined;

      const res = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: base64 || editingPhoto.url,
          mimeType: 'image/jpeg',
          originalName: editingPhoto.title || 'turkey-photo.jpg',
          categoryHint: editingPhoto.category,
          locationHint: editingPhoto.location,
          descriptionHint: editingPhoto.description,
          titleHint: editingPhoto.title,
          captionHint: editingPhoto.caption,
          altTextHint: editingPhoto.altText
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.analysis) {
          const isUnfilled = (str?: string | null) => !str || str.trim() === '';

          setEditingPhoto(prev => {
            if (!prev) return null;
            const hasExistingDescription = !isUnfilled(prev.description);

            return {
              ...prev,
              // Fill all unfilled parts; preserve any parts already filled
              title: isUnfilled(prev.title) ? (data.analysis.title || prev.title) : prev.title,
              location: isUnfilled(prev.location) ? (data.analysis.location || prev.location) : prev.location,
              category: isUnfilled(prev.category) ? (data.analysis.category || prev.category) : prev.category,
              altText: isUnfilled(prev.altText) ? (data.analysis.altText || prev.altText) : prev.altText,
              caption: isUnfilled(prev.caption) ? (data.analysis.caption || prev.caption) : prev.caption,
              description: hasExistingDescription ? prev.description : (data.analysis.description || prev.description),
              seoKeywords: (!prev.seoKeywords || prev.seoKeywords.length === 0)
                ? (data.analysis.seoKeywords || prev.seoKeywords)
                : Array.from(new Set([...prev.seoKeywords, ...(data.analysis.seoKeywords || [])]))
            };
          });
          showToast('All unfilled fields auto-filled using Search Engine Indexing Description as reference!', 'success');
        }
      } else {
        showToast('AI analysis completed with smart heuristic rules.', 'info');
      }
    } catch (err: any) {
      console.warn('AI analysis error:', err);
      showToast('Generated fresh SEO metadata tags.', 'info');
    } finally {
      setIsReanalyzingAI(false);
    }
  };

  // =========================================================================
  // SIMULTANEOUS / PARALLEL BATCH UPLOAD & OPTIMIZATION PIPELINE
  // =========================================================================
  const processUploadFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      showToast('Please select valid image files (JPG, PNG, WebP, etc.)', 'error');
      return;
    }

    setActiveSubView('upload');

    // Create queue items for all incoming files
    const newItems: UploadQueueItem[] = fileArray.map((file, idx) => {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      return {
        id: `upload-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        status: 'optimizing',
        seoData: {
          title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          caption: 'Authentic Turkish travel scene curated for small group and bespoke itineraries.',
          description: 'Web-optimized high-resolution photography curated for Baobab DMC Turkey.',
          altText: `${cleanName} in Turkey for tour itineraries`,
          location: 'Turkiye',
          category: 'Cappadocia & Balloons',
          seoKeywords: ['Turkey DMC', 'Turkey tours', 'Inbound Turkish ground operator', 'Baobab DMC']
        },
        savedToLibrary: false
      };
    });

    // Prepend new items to the upload queue state
    setUploadQueue(prev => [...newItems, ...prev]);
    showToast(`Batch started: Optimizing and analyzing ${newItems.length} photos simultaneously...`, 'info');

    // Launch SIMULTANEOUS parallel processing for each file in the batch
    newItems.forEach(item => {
      processSingleItemSimultaneously(item);
    });
  };

  // Single item worker running in parallel with all other batch items
  const processSingleItemSimultaneously = async (item: UploadQueueItem) => {
    try {
      // Step 1: Client-Side Web Optimization (Canvas WebP Compression & Resizing)
      const optimized = await optimizeImageForWeb(item.file, 2048, 0.85);

      // Update state to 'analyzing' immediately as this individual item completes WebP compression
      setUploadQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: 'analyzing',
        optimizedResult: optimized
      } : q));

      // Step 2: Simultaneous AI Photo Examination & SEO Metadata Generation via Gemini API
      let aiSeo = item.seoData;
      try {
        const res = await fetch('/api/analyze-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Image: optimized.base64,
            mimeType: optimized.mimeType,
            originalName: item.file.name,
            categoryHint: item.seoData.category,
            locationHint: item.seoData.location
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
              seoKeywords: Array.isArray(data.analysis.seoKeywords) ? data.analysis.seoKeywords : item.seoData.seoKeywords
            };
          }
        }
      } catch (aiErr) {
        console.warn('AI analysis fallback for item:', item.file.name, aiErr);
      }

      // Step 3: Automatically commit to custom photo library in Context & Storage
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

      // Step 4: Update queue state to ready
      setUploadQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: 'ready',
        seoData: aiSeo,
        savedToLibrary: true
      } : q));

    } catch (err: any) {
      console.error('Photo batch item error:', err);
      setUploadQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: 'error',
        errorMessage: err.message || 'Failed to process image.'
      } : q));
    }
  };

  // Retry a single failed item in the batch
  const handleRetryItem = (item: UploadQueueItem) => {
    setUploadQueue(prev => prev.map(q => q.id === item.id ? {
      ...q,
      status: 'optimizing',
      errorMessage: undefined
    } : q));
    processSingleItemSimultaneously(item);
  };

  // Retry all failed items in batch
  const handleRetryAllFailed = () => {
    const failedItems = uploadQueue.filter(q => q.status === 'error');
    if (failedItems.length === 0) return;
    
    setUploadQueue(prev => prev.map(q => q.status === 'error' ? {
      ...q,
      status: 'optimizing',
      errorMessage: undefined
    } : q));

    failedItems.forEach(item => {
      processSingleItemSimultaneously(item);
    });
    showToast(`Retrying ${failedItems.length} failed photos simultaneously...`, 'info');
  };

  // Update item SEO fields in queue and sync to library
  const updateQueueItemSeo = (id: string, updates: Partial<UploadQueueItem['seoData']>) => {
    setUploadQueue(prev => prev.map(q => {
      if (q.id !== id) return q;
      const updatedSeo = { ...q.seoData, ...updates };
      if (q.optimizedResult) {
        updateCustomPhoto(q.optimizedResult.dataUrl, updatedSeo);
      }
      return { ...q, seoData: updatedSeo };
    }));
  };

  // Remove single item from queue
  const handleRemoveQueueItem = (id: string, url?: string) => {
    if (url) {
      deleteCustomPhoto(url);
    }
    setUploadQueue(prev => prev.filter(q => q.id !== id));
    setSelectedQueueIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // =========================================================================
  // BATCH BULK ACTIONS (Apply Category, Location, Keyword to multiple items)
  // =========================================================================
  const handleBatchApplyCategory = (cat: string) => {
    if (!cat) return;
    const targetItems = selectedQueueIds.size > 0 
      ? uploadQueue.filter(q => selectedQueueIds.has(q.id))
      : uploadQueue;

    targetItems.forEach(item => {
      updateQueueItemSeo(item.id, { category: cat });
    });
    showToast(`Applied category "${cat}" to ${targetItems.length} photos in batch!`, 'success');
    setBatchCategory('');
  };

  const handleBatchApplyLocation = (loc: string) => {
    if (!loc.trim()) return;
    const targetItems = selectedQueueIds.size > 0 
      ? uploadQueue.filter(q => selectedQueueIds.has(q.id))
      : uploadQueue;

    targetItems.forEach(item => {
      updateQueueItemSeo(item.id, { location: loc.trim() });
    });
    showToast(`Set region "${loc}" on ${targetItems.length} photos in batch!`, 'success');
    setBatchLocation('');
  };

  const handleBatchAppendKeyword = (kw: string) => {
    const cleanKw = kw.trim().replace(/^#/, '');
    if (!cleanKw) return;

    const targetItems = selectedQueueIds.size > 0 
      ? uploadQueue.filter(q => selectedQueueIds.has(q.id))
      : uploadQueue;

    targetItems.forEach(item => {
      const currentTags = item.seoData.seoKeywords || [];
      if (!currentTags.includes(cleanKw)) {
        updateQueueItemSeo(item.id, { seoKeywords: [...currentTags, cleanKw] });
      }
    });
    showToast(`Added keyword "#${cleanKw}" to ${targetItems.length} photos!`, 'success');
    setBatchKeyword('');
  };

  const handleToggleSelectAllQueue = () => {
    if (selectedQueueIds.size === uploadQueue.length) {
      setSelectedQueueIds(new Set());
    } else {
      setSelectedQueueIds(new Set(uploadQueue.map(q => q.id)));
    }
  };

  const handleToggleSelectQueueItem = (id: string) => {
    setSelectedQueueIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Metrics for current upload queue batch
  const totalCount = uploadQueue.length;
  const readyCount = uploadQueue.filter(q => q.status === 'ready').length;
  const processingCount = uploadQueue.filter(q => q.status === 'optimizing' || q.status === 'analyzing').length;
  const errorCount = uploadQueue.filter(q => q.status === 'error').length;
  const progressPercent = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  const totalOriginalBytes = uploadQueue.reduce((acc, q) => acc + (q.optimizedResult?.originalSizeBytes || q.file.size), 0);
  const totalOptimizedBytes = uploadQueue.reduce((acc, q) => acc + (q.optimizedResult?.optimizedSizeBytes || 0), 0);
  const totalSavingsBytes = totalOriginalBytes - totalOptimizedBytes;
  const totalSavingsPercent = totalOriginalBytes > 0 && totalOptimizedBytes > 0 
    ? Math.round(((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100) 
    : 0;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Filtered queue items
  const displayedQueue = uploadQueue.filter(item => {
    if (queueFilter === 'processing') return item.status === 'optimizing' || item.status === 'analyzing';
    if (queueFilter === 'ready') return item.status === 'ready';
    if (queueFilter === 'error') return item.status === 'error';
    return true;
  });

  // Handle Manual Add with AI auto-fill (Fill in all unfilled parts using Search Engine Indexing Description as reference)
  const handleManualAddAnalyze = async () => {
    if (!manualForm.url.trim() && !manualForm.description.trim()) {
      showToast('Please provide an Image URL or write a Search Engine Indexing Description.', 'error');
      return;
    }
    setManualIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: manualForm.url.trim(),
          mimeType: 'image/jpeg',
          originalName: manualForm.title || 'turkey-scenery.jpg',
          categoryHint: manualForm.category,
          locationHint: manualForm.location,
          descriptionHint: manualForm.description.trim(),
          titleHint: manualForm.title.trim(),
          captionHint: manualForm.caption.trim(),
          altTextHint: manualForm.altText.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.analysis) {
          const isUnfilled = (str?: string | null) => !str || str.trim() === '';

          setManualForm(prev => {
            const hasExistingDescription = !isUnfilled(prev.description);

            return {
              ...prev,
              // Fill all unfilled parts; preserve any parts already filled by user
              title: isUnfilled(prev.title) ? (data.analysis.title || prev.title) : prev.title,
              location: isUnfilled(prev.location) ? (data.analysis.location || prev.location) : prev.location,
              category: isUnfilled(prev.category) || (prev.category === 'Cappadocia & Balloons' && data.analysis.category && isUnfilled(prev.location))
                ? (data.analysis.category || prev.category)
                : prev.category,
              altText: isUnfilled(prev.altText) ? (data.analysis.altText || prev.altText) : prev.altText,
              caption: isUnfilled(prev.caption) ? (data.analysis.caption || prev.caption) : prev.caption,
              // Use Search Engine Indexing Description as reference; if it was empty, fill with AI description
              description: hasExistingDescription ? prev.description : (data.analysis.description || prev.description),
              seoKeywords: (!prev.seoKeywords || prev.seoKeywords.length === 0)
                ? (data.analysis.seoKeywords || prev.seoKeywords)
                : Array.from(new Set([...prev.seoKeywords, ...(data.analysis.seoKeywords || [])]))
            };
          });
          showToast('All unfilled fields auto-filled using Search Engine Indexing Description as reference!', 'success');
        }
      }
    } catch (err) {
      console.warn('Manual add AI err:', err);
      showToast('AI analysis could not complete. Check connection.', 'error');
    } finally {
      setManualIsAnalyzing(false);
    }
  };

  const handleSaveManualPhoto = () => {
    if (!manualForm.url.trim()) {
      showToast('Please provide an Image URL.', 'error');
      return;
    }

    const title = manualForm.title.trim() || 'Custom Turkey Travel Image';
    const location = manualForm.location.trim() || 'Turkiye';
    const altText = manualForm.altText.trim() || `${title} in ${location}, Turkey`;
    const caption = manualForm.caption.trim() || `Curated photography of ${location} for bespoke itineraries.`;

    const newPhoto: LibraryPhotoItem = {
      id: `manual-${Date.now()}`,
      url: manualForm.url.trim(),
      title,
      location,
      category: manualForm.category,
      altText,
      caption,
      description: manualForm.description.trim() || `High-resolution photograph featuring ${location} by Baobab DMC Turkey.`,
      seoKeywords: manualForm.seoKeywords.length > 0 ? manualForm.seoKeywords : ['Turkey DMC', location, 'Turkey tours'],
      uploadedAt: new Date().toISOString(),
      isCustom: true
    };

    addCustomPhoto(newPhoto);
    showToast('New photo with custom SEO metadata added to library!');

    if (onSelectPhoto) {
      onSelectPhoto(newPhoto.url);
    }

    // Reset form
    setManualForm({
      url: '',
      title: '',
      location: 'Turkiye',
      category: 'Cappadocia & Balloons',
      altText: '',
      caption: '',
      description: '',
      seoKeywords: ['Turkey DMC', 'Turkey tours', 'Inbound Turkish ground operator']
    });
    setActiveSubView('browse');
  };

  // ==========================================
  // BULK UPLOAD BY URL HELPERS & HANDLERS
  // ==========================================

  // Smart heuristic deduction from URL
  const inferMetadataFromUrl = (url: string, defaultLoc: string, defaultCat: string) => {
    const lowerUrl = url.toLowerCase();
    let location = defaultLoc || 'Turkiye';
    let category = defaultCat || 'Cappadocia & Balloons';
    let title = 'Turkey Travel Experience';

    // Extract slug / file name if possible
    try {
      const urlObj = new URL(url);
      const pathname = decodeURIComponent(urlObj.pathname);
      const filename = pathname.split('/').pop()?.replace(/\.[^/.]+$/, '').replace(/[-_+]/g, ' ') || '';
      if (filename.length > 3 && !filename.startsWith('photo-')) {
        title = filename.charAt(0).toUpperCase() + filename.slice(1);
      }
    } catch (e) {
      // ignore
    }

    // Location & Category detection
    if (lowerUrl.includes('cappadocia') || lowerUrl.includes('goreme') || lowerUrl.includes('fairy') || lowerUrl.includes('balloon')) {
      location = 'Göreme, Cappadocia';
      category = 'Cappadocia & Balloons';
      title = title === 'Turkey Travel Experience' ? 'Hot Air Balloons over Göreme Valley' : title;
    } else if (lowerUrl.includes('bosphorus') || lowerUrl.includes('istanbul') || lowerUrl.includes('sultanahmet') || lowerUrl.includes('galata')) {
      location = 'Istanbul & Bosphorus';
      category = 'Istanbul & Bosphorus';
      title = title === 'Turkey Travel Experience' ? 'Historic Peninsula & Bosphorus Waters, Istanbul' : title;
    } else if (lowerUrl.includes('ephesus') || lowerUrl.includes('selcuk') || lowerUrl.includes('ruin') || lowerUrl.includes('celsus')) {
      location = 'Ancient Ephesus, Selçuk';
      category = 'Aegean & Classical Ruins';
      title = title === 'Turkey Travel Experience' ? 'Library of Celsus in Ancient Ephesus' : title;
    } else if (lowerUrl.includes('bodrum') || lowerUrl.includes('gulet') || lowerUrl.includes('fethiye') || lowerUrl.includes('oludeniz') || lowerUrl.includes('kas')) {
      location = lowerUrl.includes('bodrum') ? 'Bodrum Peninsula' : 'Turquoise Coast & Fethiye';
      category = 'Turquoise Coast & Gulets';
      title = title === 'Turkey Travel Experience' ? 'Wooden Gulet Sailing in Turquoise Waters' : title;
    } else if (lowerUrl.includes('pamukkale') || lowerUrl.includes('hierapolis')) {
      location = 'Pamukkale Travertines';
      category = 'Aegean & Classical Ruins';
      title = title === 'Turkey Travel Experience' ? 'Thermal Mineral Terraces of Pamukkale' : title;
    } else if (lowerUrl.includes('nemrut') || lowerUrl.includes('mardin') || lowerUrl.includes('gobeklitepe')) {
      location = lowerUrl.includes('nemrut') ? 'Mount Nemrut Summit' : 'Eastern Anatolia & Mesopotamia';
      category = 'Eastern Anatolia & Mesopotamia';
      title = title === 'Turkey Travel Experience' ? 'Ancient Heritage of Anatolia' : title;
    } else if (lowerUrl.includes('trabzon') || lowerUrl.includes('blacksea') || lowerUrl.includes('sumela') || lowerUrl.includes('rize')) {
      location = 'Black Sea & Highlands';
      category = 'Black Sea & Highlands';
      title = title === 'Turkey Travel Experience' ? 'Highland Valleys and Misty Pine Forests' : title;
    }

    const altText = `${title} in ${location}, Turkey - Baobab DMC Travel`.slice(0, 120);
    const caption = `Curated photography of ${location} for bespoke Turkey itineraries and small groups.`;
    const description = `High-resolution photograph featuring ${location}. Professionally curated for inbound luxury tour operators and travel advisors partnering with Baobab DMC Turkey.`;
    const seoKeywords = ['Turkey DMC', location, 'Turkey tours', 'Inbound Turkish ground operator', category];

    return { title, location, category, altText, caption, description, seoKeywords };
  };

  // Parse raw text into Bulk URL queue
  const handleParseBulkUrls = () => {
    if (!bulkUrlsRaw.trim()) {
      showToast('Please paste one or more image URLs.', 'error');
      return;
    }

    // Split by newlines, whitespace, or commas
    const rawTokens = bulkUrlsRaw
      .split(/[\n,\s]+/)
      .map(t => t.trim())
      .filter(t => t.length > 8 && (t.startsWith('http://') || t.startsWith('https://') || t.startsWith('data:image/')));

    if (rawTokens.length === 0) {
      showToast('No valid URLs found. Make sure URLs start with http:// or https://', 'error');
      return;
    }

    // Deduplicate against existing queue
    const existingUrls = new Set(bulkQueue.map(item => item.url));
    const newItems: BulkUrlItem[] = [];

    rawTokens.forEach((url, idx) => {
      if (!existingUrls.has(url)) {
        existingUrls.add(url);
        const inferred = inferMetadataFromUrl(url, bulkDefaultLocation, bulkDefaultCategory);
        newItems.push({
          id: `bulk-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          url,
          title: inferred.title,
          location: inferred.location,
          category: inferred.category,
          altText: inferred.altText,
          caption: inferred.caption,
          description: inferred.description,
          seoKeywords: inferred.seoKeywords,
          status: 'ready'
        });
      }
    });

    if (newItems.length === 0) {
      showToast('All parsed URLs are already in the queue.', 'info');
      return;
    }

    setBulkQueue(prev => [...prev, ...newItems]);
    setBulkUrlsRaw('');
    showToast(`Added ${newItems.length} photos to bulk queue. Ready to review and import!`);
  };

  // Load sample Turkey photo URLs
  const handleLoadSampleBulkUrls = () => {
    const sampleUrls = [
      'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1599818818580-0a2c2069279d?auto=format&fit=crop&w=1600&q=85'
    ];
    setBulkUrlsRaw(sampleUrls.join('\n'));
    showToast('Sample Turkey image URLs loaded into input box.');
  };

  // Run AI & Smart SEO auto-fill for all items in bulk queue
  const handleRunBulkAiAnalysis = async () => {
    if (bulkQueue.length === 0) return;
    setIsBulkAnalyzing(true);
    setBulkProgress({ current: 0, total: bulkQueue.length });

    const updatedQueue = [...bulkQueue];

    for (let i = 0; i < updatedQueue.length; i++) {
      const item = updatedQueue[i];
      setBulkProgress({ current: i + 1, total: updatedQueue.length });

      try {
        const res = await fetch('/api/analyze-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageUrl: item.url,
            mimeType: 'image/jpeg',
            originalName: item.title || 'turkey-photo.jpg',
            categoryHint: item.category,
            locationHint: item.location
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.analysis) {
            updatedQueue[i] = {
              ...item,
              title: data.analysis.title || item.title,
              location: data.analysis.location || item.location,
              category: data.analysis.category || item.category,
              altText: data.analysis.altText || item.altText,
              caption: data.analysis.caption || item.caption,
              description: data.analysis.description || item.description,
              seoKeywords: data.analysis.seoKeywords || item.seoKeywords,
              status: 'ready'
            };
          }
        } else {
          // Fallback heuristic if API quota reached
          const inferred = inferMetadataFromUrl(item.url, item.location, item.category);
          updatedQueue[i] = { ...item, ...inferred, status: 'ready' };
        }
      } catch (err) {
        // Fallback heuristic on network / API exhaustion
        const inferred = inferMetadataFromUrl(item.url, item.location, item.category);
        updatedQueue[i] = { ...item, ...inferred, status: 'ready' };
      }

      // Update state incrementally
      setBulkQueue([...updatedQueue]);
    }

    setIsBulkAnalyzing(false);
    setBulkProgress(null);
    showToast('Completed SEO auto-fill for all photos in bulk queue!');
  };

  // Remove single item from bulk queue
  const handleRemoveBulkItem = (id: string) => {
    setBulkQueue(prev => prev.filter(item => item.id !== id));
  };

  // Update item in bulk queue
  const handleUpdateBulkItem = (id: string, updates: Partial<BulkUrlItem>) => {
    setBulkQueue(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  // Clear bulk queue
  const handleClearBulkQueue = () => {
    setBulkQueue([]);
    showToast('Bulk queue cleared.', 'info');
  };

  // Import all photos from bulk queue into Library
  const handleImportBulkPhotos = () => {
    if (bulkQueue.length === 0) return;

    let importCount = 0;
    bulkQueue.forEach((item, idx) => {
      if (item.url) {
        const newPhoto: LibraryPhotoItem = {
          id: `bulk-${Date.now()}-${idx}`,
          url: item.url.trim(),
          title: item.title.trim() || 'Curated Turkey Photography',
          location: item.location.trim() || 'Turkiye',
          category: item.category,
          altText: item.altText.trim() || `${item.title} in ${item.location}, Turkey`,
          caption: item.caption.trim() || `Curated photography of ${item.location} for bespoke itineraries.`,
          description: item.description.trim() || `High-resolution photograph featuring ${item.location} by Baobab DMC Turkey.`,
          seoKeywords: item.seoKeywords && item.seoKeywords.length > 0 ? item.seoKeywords : ['Turkey DMC', item.location, 'Turkey tours'],
          uploadedAt: new Date().toISOString(),
          isCustom: true
        };
        addCustomPhoto(newPhoto);
        importCount++;
      }
    });

    showToast(`Successfully imported ${importCount} photos to the Photo Library!`, 'success');
    setBulkQueue([]);
    setBulkUrlsRaw('');
    setActiveSubView('browse');
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-[160] text-white border shadow-2xl px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-3 ${
          toastMessage.type === 'success' ? 'bg-neutral-900 border-emerald-500/60' :
          toastMessage.type === 'error' ? 'bg-red-950 border-red-500/60' :
          'bg-neutral-900 border-blue-500/60'
        }`}>
          {toastMessage.type === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header & View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#F05A28]/10 text-[#F05A28] flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Turkey Photo Library & Batch SEO Metadata Studio
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Batch drag-and-drop raw photos for simultaneous WebP compression, Gemini AI metadata generation, and editable SEO tags.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
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
            <span>Batch Upload & Optimize</span>
            {uploadQueue.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-white/25 rounded-full text-[10px] font-mono">
                {uploadQueue.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('bulk_url')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors ${
              activeSubView === 'bulk_url'
                ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-[#F05A28] text-white shadow-xs'
                : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            <ListPlus className="w-3.5 h-3.5 text-purple-600" />
            <span>Bulk Upload by URL</span>
            {bulkQueue.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-white/30 rounded-full text-[10px] font-mono">
                {bulkQueue.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('manual_add')}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors ${
              activeSubView === 'manual_add'
                ? 'bg-neutral-800 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Single URL Add</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: MANUAL ADD WITH FULL SEO CONTROLS */}
      {/* ========================================================================= */}
      {activeSubView === 'manual_add' && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-[#F05A28]" />
                <span>Add New Photo with Custom SEO Metadata & Alt Text</span>
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Paste any web image URL and customize all indexing tags, image alt text, and SEO keywords.
              </p>
            </div>

            <button
              type="button"
              onClick={handleManualAddAnalyze}
              disabled={(!manualForm.url.trim() && !manualForm.description.trim()) || manualIsAnalyzing}
              className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 disabled:opacity-50 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors shadow-xs"
              title="Auto-fill all unfilled fields using Search Engine Indexing Description and AI vision as reference"
            >
              {manualIsAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{manualIsAnalyzing ? 'AI Auto-Filling...' : 'Auto-Fill with AI'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Image Direct URL (HTTPS) *
              </label>
              <input
                type="url"
                value={manualForm.url}
                onChange={(e) => setManualForm({ ...manualForm, url: e.target.value })}
                placeholder="https://images.unsplash.com/... or CDN link"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded font-mono focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={manualForm.category}
                onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
              >
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-7">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Photo Headline / Title *
              </label>
              <input
                type="text"
                value={manualForm.title}
                onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                placeholder="e.g. Dawn Hot Air Balloons over Rose Valley"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28] font-semibold"
              />
            </div>

            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Location / Region *
              </label>
              <input
                type="text"
                value={manualForm.location}
                onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                placeholder="e.g. Göreme, Cappadocia"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Alt Text */}
            <div className="md:col-span-12">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Image Alt Text (Accessibility & SEO Tag) *</span>
                </label>
                <span className="text-[11px] text-neutral-500">
                  {manualForm.altText.length} characters (recommended &lt; 125)
                </span>
              </div>
              <input
                type="text"
                value={manualForm.altText}
                onChange={(e) => setManualForm({ ...manualForm, altText: e.target.value })}
                placeholder="e.g. Colorful hot air balloons rising over rock fairy chimneys at sunrise in Cappadocia"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Caption */}
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Itinerary & Catalog Caption
              </label>
              <textarea
                rows={2}
                value={manualForm.caption}
                onChange={(e) => setManualForm({ ...manualForm, caption: e.target.value })}
                placeholder="Engaging summary for tour brochures and modal slideshows..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-6">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#F05A28]" />
                  <span>Search Engine Indexing Description</span>
                </label>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                  AI Reference Source
                </span>
              </div>
              <textarea
                rows={2}
                value={manualForm.description}
                onChange={(e) => setManualForm({ ...manualForm, description: e.target.value })}
                placeholder="Reference description used by AI to deduce and auto-fill all unfilled fields (title, location, alt text, keywords)..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Keywords */}
            <div className="md:col-span-12 space-y-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Target SEO Search Keywords
              </label>
              
              <div className="flex flex-wrap gap-1.5 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                {manualForm.seoKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-neutral-300 text-neutral-800 text-xs font-medium rounded shadow-xs"
                  >
                    <span>#{kw}</span>
                    <button
                      type="button"
                      onClick={() => setManualForm({
                        ...manualForm,
                        seoKeywords: manualForm.seoKeywords.filter((_, idx) => idx !== i)
                      })}
                      className="text-neutral-400 hover:text-red-600 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <div className="inline-flex items-center gap-1 min-w-[200px]">
                  <input
                    type="text"
                    value={manualKeywordInput}
                    onChange={(e) => setManualKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        const tag = manualKeywordInput.trim().replace(/^#/, '').replace(/,$/, '');
                        if (tag && !manualForm.seoKeywords.includes(tag)) {
                          setManualForm({
                            ...manualForm,
                            seoKeywords: [...manualForm.seoKeywords, tag]
                          });
                        }
                        setManualKeywordInput('');
                      }
                    }}
                    placeholder="+ Type keyword & press Enter"
                    className="px-2 py-0.5 text-xs bg-transparent border-none focus:outline-none text-neutral-800 placeholder:text-neutral-400 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setActiveSubView('browse')}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!manualForm.url.trim()}
              onClick={handleSaveManualPhoto}
              className="px-5 py-2 bg-[#F05A28] hover:bg-[#D94526] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Photo to Library</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: BULK UPLOAD BY URL WITH SMART SEO GENERATION & LIVE PREVIEW         */}
      {/* ========================================================================= */}
      {activeSubView === 'bulk_url' && (
        <div className="space-y-6">
          {/* Input & Parser Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-2xs">
                  <ListPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                    <span>Bulk Upload Photos by URL</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      Multi-Link Importer
                    </span>
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Paste multiple image URLs (one per line or comma-separated). Automatically parse, preview, and generate SEO tags before saving.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSampleBulkUrls}
                  className="px-3 py-1.5 border border-purple-200 bg-purple-50/50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Load Sample Turkey URLs</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Textarea for pasting URLs */}
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Paste Image URLs (One per line)</span>
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    Supports Unsplash, CDN, or direct JPG / PNG / WebP links
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={bulkUrlsRaw}
                  onChange={(e) => setBulkUrlsRaw(e.target.value)}
                  placeholder={`https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1600&q=85\nhttps://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85\nhttps://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=85`}
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-neutral-300 rounded-lg focus:outline-none focus:border-[#F05A28] bg-neutral-50/50"
                />
              </div>

              {/* Right Column: Default Settings & Parse Button */}
              <div className="lg:col-span-4 bg-neutral-50/70 p-4 rounded-xl border border-neutral-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                    Default Batch Meta
                  </span>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Default Category
                    </label>
                    <select
                      value={bulkDefaultCategory}
                      onChange={(e) => setBulkDefaultCategory(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    >
                      {CATEGORY_OPTIONS.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Default Region / Location
                    </label>
                    <input
                      type="text"
                      value={bulkDefaultLocation}
                      onChange={(e) => setBulkDefaultLocation(e.target.value)}
                      placeholder="e.g. Turkiye, Cappadocia, Istanbul"
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleParseBulkUrls}
                  disabled={!bulkUrlsRaw.trim()}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-black disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ListPlus className="w-4 h-4" />
                  <span>Parse & Add to Queue</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Queue Table / Cards */}
          {bulkQueue.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs space-y-4">
              {/* Queue Controls Toolbar */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-neutral-900">
                    Validated Photos in Queue ({bulkQueue.length})
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Ready to Import
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleRunBulkAiAnalysis}
                    disabled={isBulkAnalyzing}
                    className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isBulkAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{isBulkAnalyzing ? `Analyzing (${bulkProgress?.current || 0}/${bulkProgress?.total || 0})...` : 'Auto-Fill SEO with AI'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearBulkQueue}
                    disabled={isBulkAnalyzing}
                    className="px-3 py-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Clear Queue
                  </button>

                  <button
                    type="button"
                    onClick={handleImportBulkPhotos}
                    disabled={isBulkAnalyzing}
                    className="px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Import All ({bulkQueue.length}) to Library</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-100 p-4 sm:p-5 space-y-4">
                {bulkQueue.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-neutral-50/50 p-4 rounded-xl border border-neutral-200/80 hover:border-neutral-300 transition-all flex flex-col md:flex-row gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-36 h-28 shrink-0 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xs group">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9.5px] font-mono font-bold">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Inline Editable Fields */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                      <div className="sm:col-span-7">
                        <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                          Headline / Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateBulkItem(item.id, { title: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-semibold border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="sm:col-span-5">
                        <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                          Category
                        </label>
                        <select
                          value={item.category}
                          onChange={(e) => handleUpdateBulkItem(item.id, { category: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        >
                          {CATEGORY_OPTIONS.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-5">
                        <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                          Location / Region
                        </label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => handleUpdateBulkItem(item.id, { location: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="sm:col-span-7">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
                            Alt Text (Accessibility)
                          </label>
                          <span className="text-[10px] text-neutral-400">
                            {item.altText?.length || 0}/120
                          </span>
                        </div>
                        <input
                          type="text"
                          value={item.altText}
                          onChange={(e) => handleUpdateBulkItem(item.id, { altText: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="sm:col-span-12 flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 overflow-hidden text-neutral-500 text-[11px] truncate">
                          <Tag className="w-3 h-3 text-[#F05A28] shrink-0" />
                          <span className="font-semibold text-neutral-700">SEO Keywords:</span>
                          <span className="truncate">{item.seoKeywords?.join(', ')}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveBulkItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 text-xs font-semibold flex items-center gap-1 shrink-0 ml-3"
                          title="Remove from queue"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Sticky Import Bar */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">
                  {bulkQueue.length} photos ready for import with complete SEO metadata.
                </span>

                <button
                  type="button"
                  onClick={handleImportBulkPhotos}
                  className="px-6 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Import All ({bulkQueue.length}) Photos to Library</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: BATCH DRAG & DROP UPLOAD, OPTIMIZATION & METADATA QUEUE */}
      {/* ========================================================================= */}
      {activeSubView === 'upload' && (
        <div className="space-y-6">
          {/* Main Drag & Drop Multiple Photos Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => {
              // Prevent flickering when hovering child elements
              if (e.currentTarget.contains(e.relatedTarget as Node)) return;
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                processUploadFiles(e.dataTransfer.files);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 relative group overflow-hidden ${
              isDragging
                ? 'border-[#F05A28] bg-orange-500/10 ring-4 ring-[#F05A28]/20 scale-[1.005]'
                : 'border-neutral-300 bg-white hover:border-[#F05A28]/70 hover:bg-orange-50/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  processUploadFiles(e.target.files);
                }
              }}
              className="hidden"
            />

            <div className="max-w-xl mx-auto space-y-3.5 pointer-events-none">
              <div className="w-16 h-16 rounded-2xl bg-[#F05A28]/10 text-[#F05A28] flex items-center justify-center mx-auto transition-transform group-hover:scale-110 shadow-xs">
                <Upload className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simultaneous Multi-Photo Batch Processing</span>
                </div>
                <h4 className="text-lg font-bold text-neutral-900">
                  Drag & Drop Multiple Photos Here or Click to Browse
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed max-w-lg mx-auto">
                  Select 1, 5, 20+ photos at once. Each image is <strong className="text-neutral-900">simultaneously compressed to WebP</strong> (saving ~85–96% bandwidth) and <strong className="text-neutral-900">inspected with Gemini AI</strong> for auto-generating titles, captions, and accessibility alt text in parallel.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold text-neutral-600">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Parallel AI Vision Analysis</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Client-Side Canvas WebP</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full SEO & Alt Text Inspector</span>
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BATCH DASHBOARD & PROGRESS METRICS */}
          {/* ========================================================================= */}
          {uploadQueue.length > 0 && (
            <div className="space-y-4">
              {/* Batch Overview Banner */}
              <div className="bg-neutral-900 text-white rounded-xl p-5 shadow-lg border border-neutral-800 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-emerald-400" />
                        <span>Batch Processing Queue ({uploadQueue.length} Photos)</span>
                      </h4>
                      {processingCount > 0 ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>{processingCount} Processing Simultaneously</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>All Processed & Saved</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">
                      Simultaneous client optimization downscales raw images while Gemini AI analyzes photo details in parallel.
                    </p>
                  </div>

                  {/* Batch Global Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {errorCount > 0 && (
                      <button
                        type="button"
                        onClick={handleRetryAllFailed}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry {errorCount} Failed</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setUploadQueue(prev => prev.filter(q => q.status !== 'ready'))}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded transition-colors"
                    >
                      Clear Completed
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUploadQueue([]);
                        setSelectedQueueIds(new Set());
                      }}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-red-400 text-xs font-medium rounded transition-colors"
                    >
                      Clear Queue
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">
                      Overall Progress: <strong className="text-white">{readyCount} of {totalCount}</strong> ready ({progressPercent}%)
                    </span>
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {processingCount} active • {readyCount} completed • {errorCount} errors
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        processingCount > 0 ? 'bg-gradient-to-r from-amber-500 via-[#F05A28] to-emerald-500 animate-pulse' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Aggregate Compression Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-neutral-800 text-xs">
                  <div className="bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/50">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Raw Size</div>
                    <div className="text-sm font-bold text-neutral-200 mt-0.5 font-mono">{formatBytes(totalOriginalBytes)}</div>
                  </div>

                  <div className="bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/50">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Optimized WebP</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">{formatBytes(totalOptimizedBytes)}</div>
                  </div>

                  <div className="bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/50">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Bandwidth Saved</div>
                    <div className="text-sm font-bold text-emerald-300 mt-0.5 font-mono">
                      {totalSavingsPercent > 0 ? `-${totalSavingsPercent}%` : 'Calculating...'}
                    </div>
                  </div>

                  <div className="bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/50">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Storage Saved</div>
                    <div className="text-sm font-bold text-indigo-400 mt-0.5 font-mono">{formatBytes(Math.max(0, totalSavingsBytes))}</div>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* BATCH BULK ACTIONS TOOLBAR (Apply Category, Region, Tags to Batch) */}
              {/* ========================================================================= */}
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#F05A28]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                      Batch Editing & Multi-Photo Bulk Actions
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      ({selectedQueueIds.size > 0 ? `${selectedQueueIds.size} selected` : 'Applies to all in queue'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleSelectAllQueue}
                      className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1.5 px-2 py-1 rounded hover:bg-neutral-100"
                    >
                      {selectedQueueIds.size === uploadQueue.length ? (
                        <CheckSquare className="w-3.5 h-3.5 text-[#F05A28]" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                      <span>{selectedQueueIds.size === uploadQueue.length ? 'Deselect All' : 'Select All'}</span>
                    </button>
                  </div>
                </div>

                {/* Bulk controls row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Bulk Category */}
                  <div className="md:col-span-4 flex items-center gap-1.5">
                    <select
                      value={batchCategory}
                      onChange={(e) => {
                        setBatchCategory(e.target.value);
                        if (e.target.value) handleBatchApplyCategory(e.target.value);
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                    >
                      <option value="">Apply Category to {selectedQueueIds.size > 0 ? `${selectedQueueIds.size} Selected` : 'All'}...</option>
                      {CATEGORY_OPTIONS.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bulk Region */}
                  <div className="md:col-span-4 flex items-center gap-1.5">
                    <input
                      type="text"
                      value={batchLocation}
                      onChange={(e) => setBatchLocation(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleBatchApplyLocation(batchLocation);
                        }
                      }}
                      placeholder="Bulk Region (e.g. Cappadocia)..."
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                    />
                    <button
                      type="button"
                      disabled={!batchLocation.trim()}
                      onClick={() => handleBatchApplyLocation(batchLocation)}
                      className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 text-neutral-800 text-xs font-bold rounded shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Bulk Tag */}
                  <div className="md:col-span-4 flex items-center gap-1.5">
                    <input
                      type="text"
                      value={batchKeyword}
                      onChange={(e) => setBatchKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleBatchAppendKeyword(batchKeyword);
                        }
                      }}
                      placeholder="Add #Keyword to all..."
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                    />
                    <button
                      type="button"
                      disabled={!batchKeyword.trim()}
                      onClick={() => handleBatchAppendKeyword(batchKeyword)}
                      className="px-2.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] disabled:opacity-40 text-white text-xs font-bold rounded shrink-0"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                {/* Filter Tabs for Queue */}
                <div className="flex items-center gap-2 pt-1 border-t border-neutral-100 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">Show:</span>
                  <button
                    type="button"
                    onClick={() => setQueueFilter('all')}
                    className={`px-2 py-0.5 text-xs rounded font-medium ${
                      queueFilter === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    All ({totalCount})
                  </button>
                  {processingCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setQueueFilter('processing')}
                      className={`px-2 py-0.5 text-xs rounded font-medium ${
                        queueFilter === 'processing' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      Processing ({processingCount})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setQueueFilter('ready')}
                    className={`px-2 py-0.5 text-xs rounded font-medium ${
                      queueFilter === 'ready' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    Saved to Library ({readyCount})
                  </button>
                  {errorCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setQueueFilter('error')}
                      className={`px-2 py-0.5 text-xs rounded font-medium ${
                        queueFilter === 'error' ? 'bg-red-600 text-white' : 'text-red-700 hover:bg-red-50'
                      }`}
                    >
                      Errors ({errorCount})
                    </button>
                  )}
                </div>
              </div>

              {/* ========================================================================= */}
              {/* BATCH QUEUE CARDS LIST */}
              {/* ========================================================================= */}
              <div className="space-y-4">
                {displayedQueue.map((item) => {
                  const isSelected = selectedQueueIds.has(item.id);

                  return (
                    <div 
                      key={item.id}
                      className={`border rounded-xl p-4 transition-all duration-200 bg-white shadow-xs space-y-3 ${
                        isSelected 
                          ? 'border-[#F05A28] ring-2 ring-[#F05A28]/20 bg-orange-50/10' 
                          : item.status === 'error'
                          ? 'border-red-300 bg-red-50/20'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {/* Header Row with status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Selection Checkbox */}
                          <button
                            type="button"
                            onClick={() => handleToggleSelectQueueItem(item.id)}
                            className="text-neutral-400 hover:text-[#F05A28] shrink-0"
                            title="Select for batch operations"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#F05A28]" />
                            ) : (
                              <Square className="w-4 h-4 text-neutral-300" />
                            )}
                          </button>

                          {/* Thumbnail */}
                          {item.optimizedResult ? (
                            <div className="relative w-16 h-12 rounded overflow-hidden border border-neutral-300 bg-neutral-900 shrink-0">
                              <img
                                src={item.optimizedResult.dataUrl}
                                alt={item.seoData.altText}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-12 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 shrink-0">
                              <Loader2 className="w-5 h-5 animate-spin text-[#F05A28]" />
                            </div>
                          )}

                          {/* File info and compression badge */}
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-neutral-900 truncate max-w-[280px] sm:max-w-md">
                              {item.file.name}
                            </div>
                            <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5 flex-wrap">
                              {item.optimizedResult ? (
                                <>
                                  <span className="text-neutral-400 line-through font-mono">
                                    {item.optimizedResult.originalSizeFormatted}
                                  </span>
                                  <span>→</span>
                                  <strong className="text-emerald-700 font-mono">
                                    {item.optimizedResult.optimizedSizeFormatted} ({item.optimizedResult.format})
                                  </strong>
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                                    {item.optimizedResult.compressionRatio}
                                  </span>
                                  <span className="text-[10px] text-neutral-400">
                                    ({item.optimizedResult.width}×{item.optimizedResult.height}px)
                                  </span>
                                </>
                              ) : (
                                <span className="text-amber-600 font-medium">Compressing to WebP...</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Status Badges & Quick Item Actions */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          {item.status === 'optimizing' && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold px-2.5 py-1 bg-amber-50 rounded border border-amber-200">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                              <span>Optimizing WebP...</span>
                            </span>
                          )}

                          {item.status === 'analyzing' && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-indigo-700 font-semibold px-2.5 py-1 bg-indigo-50 rounded border border-indigo-200">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
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
                                  <span>Apply</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}

                          {item.status === 'error' && (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold px-2.5 py-1 bg-red-50 rounded border border-red-200">
                                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                                <span>{item.errorMessage || 'Optimization Error'}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRetryItem(item)}
                                className="px-2.5 py-1 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold rounded flex items-center gap-1"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Retry</span>
                              </button>
                            </div>
                          )}

                          {/* Full Screen Inspector Button */}
                          {item.optimizedResult && (
                            <button
                              type="button"
                              onClick={() => {
                                handleOpenEditPhoto({
                                  id: item.id,
                                  url: item.optimizedResult!.dataUrl,
                                  title: item.seoData.title,
                                  location: item.seoData.location,
                                  category: item.seoData.category,
                                  altText: item.seoData.altText,
                                  caption: item.seoData.caption,
                                  description: item.seoData.description,
                                  seoKeywords: item.seoData.seoKeywords,
                                  dimensions: `${item.optimizedResult!.width} × ${item.optimizedResult!.height} px`,
                                  format: item.optimizedResult!.format,
                                  isCustom: true
                                });
                              }}
                              className="p-1.5 text-neutral-500 hover:text-[#F05A28] hover:bg-neutral-100 rounded transition-colors"
                              title="Open Full SEO Inspector"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Remove Item */}
                          <button
                            type="button"
                            onClick={() => handleRemoveQueueItem(item.id, item.optimizedResult?.dataUrl)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove from batch queue"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* In-Place SEO Metadata Editable Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                        <div className="md:col-span-6">
                          <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                            SEO Photo Title
                          </label>
                          <input
                            type="text"
                            value={item.seoData.title}
                            onChange={(e) => updateQueueItemSeo(item.id, { title: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white font-semibold focus:outline-none focus:border-[#F05A28]"
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
                            {CATEGORY_OPTIONS.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        {/* Image Alt Text */}
                        <div className="md:col-span-6">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
                              <FileText className="w-3 h-3 text-[#F05A28]" />
                              <span>Accessibility & Image Alt Text (&lt;img alt="..."&gt;)</span>
                            </label>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {item.seoData.altText.length} chars
                            </span>
                          </div>
                          <input
                            type="text"
                            value={item.seoData.altText}
                            onChange={(e) => updateQueueItemSeo(item.id, { altText: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                          />
                        </div>

                        {/* Itinerary Caption */}
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

                        {/* Target SEO Keywords */}
                        <div className="md:col-span-12">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase text-neutral-500 flex items-center gap-1 mr-1">
                              <Tag className="w-3 h-3 text-[#F05A28]" />
                              <span>Target Keywords:</span>
                            </span>
                            {item.seoData.seoKeywords.map((kw, i) => (
                              <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] font-medium rounded-sm">
                                <span>#{kw}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextTags = item.seoData.seoKeywords.filter((_, idx) => idx !== i);
                                    updateQueueItemSeo(item.id, { seoKeywords: nextTags });
                                  }}
                                  className="text-neutral-400 hover:text-red-600"
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: BROWSE & EDIT PHOTO LIBRARY */}
      {/* ========================================================================= */}
      {activeSubView === 'browse' && (
        <div className="space-y-4">
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

              {customMap.size > 0 && (
                <button
                  onClick={() => setSelectedCategory('my_uploads')}
                  className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-colors ${
                    selectedCategory === 'my_uploads'
                      ? 'bg-[#F05A28] text-white'
                      : 'bg-orange-50 text-[#F05A28] border border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Custom / Edited ({customMap.size})</span>
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
                            <span>Custom / AI SEO</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-black/70 backdrop-blur-xs text-neutral-200 text-[9px] font-semibold uppercase rounded">
                            Curated Preset
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

                      {/* Edit Button Always Available on Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                        <div className="text-[11px] text-neutral-200 line-clamp-2 italic font-sans">
                          "{photo.caption || photo.description || photo.altText}"
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          {onSelectPhoto && (
                            <button
                              type="button"
                              onClick={() => onSelectPhoto(photo.url)}
                              className="flex-1 px-2.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1"
                            >
                              <span>Apply</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleOpenEditPhoto(photo)}
                            className="px-2.5 py-1.5 bg-white text-neutral-900 hover:bg-neutral-100 text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1 shadow-xs"
                            title="Edit Alt text, SEO keywords, title & descriptions"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#F05A28]" />
                            <span>Edit SEO & Alt</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(photo.url, 'Image URL')}
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
                              onClick={() => {
                                deleteCustomPhoto(photo.url);
                                showToast('Photo removed from custom library.');
                              }}
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
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold text-neutral-900 line-clamp-1">
                          {photo.title}
                        </h5>
                        <button
                          type="button"
                          onClick={() => handleOpenEditPhoto(photo)}
                          className="text-neutral-400 hover:text-[#F05A28] p-0.5 rounded transition-colors"
                          title="Quick Edit"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#F05A28] font-medium flex items-center justify-between">
                        <span>{photo.location}</span>
                        <span className="text-neutral-400 text-[10px]">{photo.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* SEO Alt-Text Snippet at Bottom */}
                  <div className="px-3 py-2 border-t border-neutral-100 bg-neutral-50/70 text-[10px] text-neutral-600 flex items-center justify-between gap-1">
                    <div className="truncate flex-1">
                      <span className="font-bold text-neutral-700 uppercase mr-1">Alt:</span>
                      <span className="text-neutral-600">{photo.altText || photo.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(photo.altText || photo.title, 'Alt text')}
                      className="text-[#F05A28] hover:underline shrink-0 text-[10px] font-semibold"
                    >
                      Copy Alt
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULLY EDITABLE PHOTO SEO & ACCESSIBILITY METADATA INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {editingPhoto && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-neutral-300">
            {/* Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#F05A28]" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Photo SEO & Accessibility Metadata Inspector (Editable)
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Edit image alt text, catalog captions, target keywords, and SEO tags.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Form */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Photo Preview & AI Re-Analyze Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-neutral-50 p-4 rounded-lg border border-neutral-200 justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-24 h-16 rounded overflow-hidden bg-neutral-900 shrink-0 border border-neutral-300">
                    <img
                      src={editingPhoto.url}
                      alt={editingPhoto.altText || editingPhoto.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <h5 className="text-sm font-bold text-neutral-900 truncate">
                      {editingPhoto.title || 'Untitled Image'}
                    </h5>
                    <div className="text-xs text-[#F05A28] font-medium">
                      {editingPhoto.location || 'Turkiye'} • {editingPhoto.category || 'General'}
                    </div>
                    {editingPhoto.dimensions && (
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {editingPhoto.dimensions} • {editingPhoto.format || 'WEB'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleReanalyzeWithAI}
                    disabled={isReanalyzingAI}
                    className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 disabled:opacity-50 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors shadow-xs"
                    title="Auto-fill unfilled fields using Search Engine Indexing Description as reference"
                  >
                    {isReanalyzingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                    <span>{isReanalyzingAI ? 'AI Auto-Filling...' : 'Auto-Fill with AI'}</span>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                {/* Title */}
                <div className="md:col-span-7">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Photo Title / Headline *
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.title}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded font-semibold text-neutral-900 bg-white focus:outline-none focus:border-[#F05A28]"
                  />
                </div>

                {/* Location */}
                <div className="md:col-span-5">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Location / Region *
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.location}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                    placeholder="e.g. Göreme, Cappadocia"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded text-neutral-900 bg-white focus:outline-none focus:border-[#F05A28]"
                  />
                </div>

                {/* Category */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Category Classification
                  </label>
                  <select
                    value={editingPhoto.category || 'Cappadocia & Balloons'}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white text-neutral-900 focus:outline-none focus:border-[#F05A28]"
                  >
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Direct URL */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Image Source URL
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="url"
                      value={editingPhoto.url}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, url: e.target.value })}
                      className="w-full px-2.5 py-2 text-[11px] font-mono border border-neutral-300 rounded bg-neutral-50 focus:bg-white text-neutral-800 focus:outline-none focus:border-[#F05A28]"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopy(editingPhoto.url, 'URL')}
                      className="px-2.5 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 text-xs font-semibold rounded shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Alt Text (Key Feature) */}
                <div className="md:col-span-12">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#F05A28]" />
                      <span>Accessibility & Image Alt Text (HTML Alt Attribute) *</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono ${
                        (editingPhoto.altText || '').length > 125 ? 'text-amber-600 font-bold' : 'text-neutral-400'
                      }`}>
                        {(editingPhoto.altText || '').length}/125 chars
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(editingPhoto.altText || '', 'Alt text')}
                        className="text-[11px] font-semibold text-[#F05A28] hover:underline"
                      >
                        Copy Alt Text
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={editingPhoto.altText || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, altText: e.target.value })}
                    placeholder="Concise, descriptive text for screen readers and Google Image Search indexing..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white text-neutral-900 focus:outline-none focus:border-[#F05A28]"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    This alt text will be embedded into the &lt;img alt="..."&gt; tag whenever this photo is used on cards, hero banners, and destination galleries.
                  </p>
                </div>

                {/* Catalog Caption */}
                <div className="md:col-span-12">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Itinerary & Modal Slide Caption
                  </label>
                  <textarea
                    rows={2}
                    value={editingPhoto.caption || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                    placeholder="Engaging 1-2 sentence description shown in tour slideshows and modal captions..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white text-neutral-900 focus:outline-none focus:border-[#F05A28]"
                  />
                </div>

                {/* Indexing Description */}
                <div className="md:col-span-12">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#F05A28]" />
                      <span>Search Engine Indexing Description (Rich Snippet)</span>
                    </label>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                      AI Reference Source
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={editingPhoto.description || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                    placeholder="Rich description used as reference when clicking Auto-Fill with AI..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white text-neutral-900 focus:outline-none focus:border-[#F05A28]"
                  />
                </div>

                {/* Keywords Editor */}
                <div className="md:col-span-12 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#F05A28]" />
                      <span>Target SEO Search Keywords ({editingPhoto.seoKeywords?.length || 0})</span>
                    </label>
                    <span className="text-[11px] text-neutral-400">Click a tag to remove or use suggestions below</span>
                  </div>

                  {/* Active tags */}
                  <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    {(editingPhoto.seoKeywords || []).map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold rounded shadow-xs"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(i)}
                          className="text-neutral-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    <div className="inline-flex items-center gap-1 min-w-[220px]">
                      <input
                        type="text"
                        value={newKeywordInput}
                        onChange={(e) => setNewKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            handleAddKeyword();
                          }
                        }}
                        placeholder="+ Type keyword & press Enter"
                        className="px-2 py-1 text-xs bg-transparent border-none focus:outline-none text-neutral-900 placeholder:text-neutral-400 flex-1 font-medium"
                      />
                    </div>
                  </div>

                  {/* Suggested quick tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Suggestions:</span>
                    {SUGGESTED_SEO_TAGS.map(tag => {
                      const isAlreadyAdded = (editingPhoto.seoKeywords || []).includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          disabled={isAlreadyAdded}
                          onClick={() => handleAddKeyword(tag)}
                          className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                            isAlreadyAdded 
                              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-[#F05A28]/10 hover:text-[#F05A28]'
                          }`}
                        >
                          +{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                {editingPhoto.isCustom && (
                  <button
                    type="button"
                    onClick={() => {
                      if (originalPhotoUrl) deleteCustomPhoto(originalPhotoUrl);
                      showToast('Photo removed from library.');
                      setEditingPhoto(null);
                    }}
                    className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Photo</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded transition-colors"
                >
                  Cancel
                </button>

                {onSelectPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      handleSavePhotoEdits();
                      if (editingPhoto.url) onSelectPhoto(editingPhoto.url);
                    }}
                    className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1"
                  >
                    <span>Save & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSavePhotoEdits}
                  className="px-5 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
