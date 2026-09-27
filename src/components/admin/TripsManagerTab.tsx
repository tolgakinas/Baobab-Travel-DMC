import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { AtlasTrip } from '../../types';
import { 
  Compass, 
  Search, 
  Plus, 
  Trash2, 
  Copy, 
  Edit, 
  Image as ImageIcon, 
  Calendar, 
  Users, 
  MapPin, 
  Check, 
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  Star,
  Link2,
  ExternalLink
} from 'lucide-react';
import { PhotoLibraryModal } from './PhotoLibraryModal';
import { TripPhotoSlider } from '../TripPhotoSlider';
import { getTripGallery, TRIP_PHOTOS_REGISTRY } from '../../data/tripPhotosMap';

export const TripsManagerTab: React.FC = () => {
  const { content, updateTrip, addTrip, deleteTrip, duplicateTrip } = useSiteContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  
  // Photo Picker State
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);
  const [photoPickerTarget, setPhotoPickerTarget] = useState<'cover' | number | 'add_gallery'>('cover');
  
  // Gallery Management States
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [showAddUrlInput, setShowAddUrlInput] = useState(false);
  const [customNewUrl, setCustomNewUrl] = useState('');
  const [customNewCaption, setCustomNewCaption] = useState('');
  const [gallerySuccessNotice, setGallerySuccessNotice] = useState<string | null>(null);

  const editingTrip = content.trips.find(t => t.id === editingTripId);

  const categories = [
    'all', 
    'Day Tours', 
    'Active Adventure & Hiking', 
    'Culinary & Cultural Expedition', 
    'Iconic Rail Journey', 
    'Historical & Heritage Tour', 
    'City Break & Walking Tour'
  ];

  const filteredTrips = content.trips.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Helper to trigger temporary feedback message
  const showNotice = (msg: string) => {
    setGallerySuccessNotice(msg);
    setTimeout(() => setGallerySuccessNotice(null), 3000);
  };

  const handleCreateNewTrip = () => {
    const newId = `trip-custom-${Date.now()}`;
    const defaultCover = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80';
    const newTrip: AtlasTrip = {
      id: newId,
      atlasId: Date.now(),
      title: 'New Turkey Expedition Program',
      slug: `new-turkey-expedition-${Date.now()}`,
      category: 'Culinary & Cultural Expedition',
      duration: '8 Days / 7 Nights',
      daysCount: 8,
      groupSize: 'Max 12-16 Pax',
      image: defaultCover,
      images: [
        defaultCover,
        'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80'
      ],
      imageCaptions: [
        'Scenic highlights of Turkish cultural heritage',
        'Historic quarters and architectural landmarks',
        'Dawn light over iconic landscapes',
        'Secluded coastal harbors and azure waters',
        'Traditional hospitality and culinary delights'
      ],
      destinations: ['Istanbul', 'Cappadocia'],
      description: 'Comprehensive guided small group journey through historic landmarks and cultural wonders.',
      itinerary: [
        {
          dayNumber: 1,
          title: 'Arrival in Istanbul & Welcome Gathering',
          description: 'Airport meet & assist followed by evening rooftop sunset briefing.'
        },
        {
          dayNumber: 2,
          title: 'Imperial Monuments & Byzantine Wonders',
          description: 'Explore Hagia Sophia, Basilica Cistern, and ancient hippodrome.'
        }
      ],
      includes: ['All boutique heritage hotel accommodations', 'Licensed expert English-speaking guide', 'Private AC vehicle transfers', 'Daily breakfast and select local culinary dinners'],
      excludes: ['International airfare', 'Personal travel insurance', 'Discretionary tips'],
      highlights: ['Small group size guarantee', 'Direct B2B wholesale net rates', 'Authentic culinary immersions'],
      originalUrl: 'https://baobabdmcturkey.com'
    };
    addTrip(newTrip);
    setEditingTripId(newId);
  };

  // Safe getter for current trip gallery images & captions
  const getEditingGallery = (trip: AtlasTrip) => {
    const fallback = getTripGallery(trip.id, trip.image);
    const images = (trip.images && trip.images.length > 0) ? [...trip.images] : [...fallback.images];
    const captions = (trip.imageCaptions && trip.imageCaptions.length > 0) ? [...trip.imageCaptions] : [...fallback.imageCaptions];
    
    // Ensure captions array matches images length
    while (captions.length < images.length) {
      captions.push(`${trip.title} - Scene ${captions.length + 1}`);
    }
    return { images, captions };
  };

  // Select Photo from Photo Library Modal
  const handleSelectPhoto = (url: string) => {
    if (!editingTrip) return;
    const { images, captions } = getEditingGallery(editingTrip);

    if (photoPickerTarget === 'cover') {
      const updatedImages = [...images];
      if (updatedImages.length > 0) {
        updatedImages[0] = url;
      } else {
        updatedImages.push(url);
      }
      updateTrip(editingTrip.id, { 
        image: url,
        images: updatedImages
      });
      showNotice('Trip cover photo updated.');
    } else if (typeof photoPickerTarget === 'number') {
      const updatedImages = [...images];
      updatedImages[photoPickerTarget] = url;
      const updates: Partial<AtlasTrip> = { images: updatedImages };
      if (photoPickerTarget === 0) {
        updates.image = url;
      }
      updateTrip(editingTrip.id, updates);
      showNotice(`Gallery photo #${photoPickerTarget + 1} updated.`);
    } else if (photoPickerTarget === 'add_gallery') {
      const updatedImages = [...images, url];
      const updatedCaptions = [...captions, `${editingTrip.title} - Scene ${updatedImages.length}`];
      updateTrip(editingTrip.id, {
        images: updatedImages,
        imageCaptions: updatedCaptions,
        image: updatedImages[0]
      });
      showNotice(`New photo added to gallery (Total: ${updatedImages.length}).`);
    }
  };

  // Add Direct URL to Gallery
  const handleAddDirectUrl = () => {
    if (!editingTrip || !customNewUrl.trim()) return;
    const { images, captions } = getEditingGallery(editingTrip);
    const updatedImages = [...images, customNewUrl.trim()];
    const updatedCaptions = [
      ...captions, 
      customNewCaption.trim() || `${editingTrip.title} - Scene ${updatedImages.length}`
    ];
    updateTrip(editingTrip.id, {
      images: updatedImages,
      imageCaptions: updatedCaptions,
      image: updatedImages[0]
    });
    setCustomNewUrl('');
    setCustomNewCaption('');
    setShowAddUrlInput(false);
    showNotice(`Added photo to gallery (Total: ${updatedImages.length}).`);
  };

  // Update Individual Gallery Photo URL
  const handleUpdatePhotoUrl = (index: number, newUrl: string) => {
    if (!editingTrip) return;
    const { images } = getEditingGallery(editingTrip);
    const updatedImages = [...images];
    updatedImages[index] = newUrl;
    const updates: Partial<AtlasTrip> = { images: updatedImages };
    if (index === 0) {
      updates.image = newUrl;
    }
    updateTrip(editingTrip.id, updates);
  };

  // Update Individual Gallery Caption
  const handleUpdateCaption = (index: number, newCaption: string) => {
    if (!editingTrip) return;
    const { captions } = getEditingGallery(editingTrip);
    const updatedCaptions = [...captions];
    updatedCaptions[index] = newCaption;
    updateTrip(editingTrip.id, { imageCaptions: updatedCaptions });
  };

  // Set selected photo as primary cover & slide #1
  const handleSetAsCover = (index: number) => {
    if (!editingTrip || index === 0) return;
    const { images, captions } = getEditingGallery(editingTrip);
    
    // Move item to index 0
    const targetImage = images[index];
    const targetCaption = captions[index];

    const newImages = [targetImage, ...images.filter((_, i) => i !== index)];
    const newCaptions = [targetCaption, ...captions.filter((_, i) => i !== index)];

    updateTrip(editingTrip.id, {
      image: targetImage,
      images: newImages,
      imageCaptions: newCaptions
    });
    showNotice(`Photo set as primary cover and moved to Slide #1.`);
  };

  // Move photo position (earlier / later)
  const handleMovePhoto = (index: number, direction: 'left' | 'right') => {
    if (!editingTrip) return;
    const { images, captions } = getEditingGallery(editingTrip);
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newImages = [...images];
    const newCaptions = [...captions];

    const tempImg = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = tempImg;

    const tempCap = newCaptions[index];
    newCaptions[index] = newCaptions[targetIndex];
    newCaptions[targetIndex] = tempCap;

    updateTrip(editingTrip.id, {
      image: newImages[0],
      images: newImages,
      imageCaptions: newCaptions
    });
    showNotice(`Gallery order adjusted.`);
  };

  // Remove photo from gallery
  const handleRemovePhoto = (index: number) => {
    if (!editingTrip) return;
    const { images, captions } = getEditingGallery(editingTrip);
    if (images.length <= 1) {
      alert('The gallery must contain at least one photo. If you wish to replace it, click "Change Photo".');
      return;
    }

    const newImages = images.filter((_, i) => i !== index);
    const newCaptions = captions.filter((_, i) => i !== index);

    updateTrip(editingTrip.id, {
      image: newImages[0],
      images: newImages,
      imageCaptions: newCaptions
    });
    showNotice(`Photo removed from gallery (Remaining: ${newImages.length}).`);
  };

  // Reset Gallery to default curated registry photos
  const handleResetToDefaultGallery = () => {
    if (!editingTrip) return;
    const defaultData = getTripGallery(editingTrip.id, editingTrip.image);
    updateTrip(editingTrip.id, {
      image: defaultData.image || defaultData.images[0],
      images: [...defaultData.images],
      imageCaptions: [...defaultData.imageCaptions]
    });
    showNotice('Restored original curated 5-photo gallery.');
  };

  // If in edit mode for a specific trip:
  if (editingTrip) {
    const { images: currentGalleryImages, captions: currentGalleryCaptions } = getEditingGallery(editingTrip);

    return (
      <div className="space-y-6">
        <PhotoLibraryModal
          isOpen={photoPickerOpen}
          onClose={() => setPhotoPickerOpen(false)}
          onSelectPhoto={handleSelectPhoto}
          currentUrl={
            photoPickerTarget === 'cover'
              ? editingTrip.image
              : typeof photoPickerTarget === 'number'
                ? currentGalleryImages[photoPickerTarget]
                : undefined
          }
          title={
            photoPickerTarget === 'cover'
              ? 'Select Primary Cover Photo'
              : typeof photoPickerTarget === 'number'
                ? `Select Photo for Slide #${photoPickerTarget + 1}`
                : 'Select Photo to Add to Trip Gallery'
          }
        />

        {/* Feedback notice toast */}
        {gallerySuccessNotice && (
          <div className="fixed top-5 right-5 z-[120] bg-neutral-900 text-white border border-emerald-500/50 shadow-2xl px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{gallerySuccessNotice}</span>
          </div>
        )}

        {/* Back and Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-neutral-200">
          <button
            onClick={() => setEditingTripId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-[#F05A28] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Trips List</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-neutral-500 font-mono">ID: {editingTrip.id}</span>
            <button
              onClick={() => duplicateTrip(editingTrip.id)}
              className="px-2.5 py-1 text-xs border border-neutral-300 hover:bg-neutral-50 rounded font-semibold text-neutral-700 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Duplicate</span>
            </button>

            {deletingTripId === editingTrip.id ? (
              <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded border border-red-300">
                <span className="text-xs font-bold text-red-700">Confirm delete?</span>
                <button
                  onClick={() => {
                    deleteTrip(editingTrip.id);
                    setEditingTripId(null);
                    setDeletingTripId(null);
                  }}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeletingTripId(null)}
                  className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setDeletingTripId(editingTrip.id)}
                className="px-2.5 py-1 border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Tour</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TRIP PHOTO GALLERY & SLIDER MANAGER (Core Feature) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#F05A28]/10 text-[#F05A28] flex items-center justify-center font-bold">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  Trip Photo Gallery & Slider ({currentGalleryImages.length} Photos)
                </h3>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Manage the high-resolution photo carousel and captions shown in the itinerary modal and public catalog.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors flex items-center gap-1.5 ${
                  showLivePreview 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {showLivePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#F05A28]" />}
                <span>{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetToDefaultGallery}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded border border-neutral-200 flex items-center gap-1.5 transition-colors"
                title="Restore default verified authentic photography for this tour"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                <span>Reset to Curated Photos</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Slider Preview */}
          {showLivePreview && (
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 px-1 pb-1">
                <span className="font-bold uppercase tracking-wider text-[#F05A28] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Client View Preview</span>
                </span>
                <span className="text-[11px] text-neutral-500">
                  Slide navigation & lightbox interactive
                </span>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-neutral-800">
                <TripPhotoSlider
                  images={currentGalleryImages}
                  captions={currentGalleryCaptions}
                  title={editingTrip.title}
                  aspectRatioClassName="h-64 sm:h-72"
                  badges={
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 bg-[#F05A28] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm">
                        {editingTrip.category}
                      </span>
                      <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#F05A28]" />
                        {editingTrip.duration}
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
          )}

          {/* Add Photos Toolbar */}
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-neutral-700">
              <span className="font-bold">Add images:</span> Select high-res Turkish destination photos from the curated library or enter custom direct URLs.
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setPhotoPickerTarget('add_gallery');
                  setPhotoPickerOpen(true);
                }}
                className="px-3.5 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add from Photo Library</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddUrlInput(!showAddUrlInput)}
                className="px-3.5 py-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors"
              >
                <Link2 className="w-3.5 h-3.5 text-neutral-500" />
                <span>{showAddUrlInput ? 'Cancel Direct URL' : 'Add Direct URL'}</span>
              </button>
            </div>
          </div>

          {/* Direct URL Input Tray */}
          {showAddUrlInput && (
            <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-lg space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Add Custom Image by Direct URL
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-7">
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Image URL (HTTPS)
                  </label>
                  <input
                    type="url"
                    value={customNewUrl}
                    onChange={(e) => setCustomNewUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or CDN link"
                    className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-900 focus:outline-none focus:border-[#F05A28]"
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Photo Caption / Subtitle
                  </label>
                  <input
                    type="text"
                    value={customNewCaption}
                    onChange={(e) => setCustomNewCaption(e.target.value)}
                    placeholder="e.g. Panoramic view of Göreme fairy chimneys"
                    className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white text-neutral-900 focus:outline-none focus:border-[#F05A28]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddUrlInput(false)}
                  className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!customNewUrl.trim()}
                  onClick={handleAddDirectUrl}
                  className="px-4 py-1.5 bg-[#F05A28] hover:bg-[#D94526] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Add Photo to Gallery
                </button>
              </div>
            </div>
          )}

          {/* Gallery Items Grid */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Gallery Slides & Sequence ({currentGalleryImages.length} Slides)
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {currentGalleryImages.map((imageUrl, idx) => {
                const isCover = idx === 0;
                const caption = currentGalleryCaptions[idx] || '';

                return (
                  <div
                    key={`${idx}-${imageUrl}`}
                    className={`rounded-lg border p-4 transition-all duration-200 flex flex-col justify-between space-y-3 ${
                      isCover 
                        ? 'border-[#F05A28] bg-orange-50/20 shadow-xs' 
                        : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Top Row: Thumbnail + Position Badge + Move / Delete Controls */}
                    <div className="flex items-start gap-3">
                      {/* Photo Thumbnail */}
                      <div className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-md overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200 group">
                        <img
                          src={imageUrl}
                          alt={caption || `Slide ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPickerTarget(idx);
                            setPhotoPickerOpen(true);
                          }}
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-opacity gap-1"
                          title="Change Photo"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Replace</span>
                        </button>
                      </div>

                      {/* Photo Info & Positioning Controls */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          {isCover ? (
                            <span className="px-2 py-0.5 bg-[#F05A28] text-white text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-xs">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Cover & Slide 1</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 text-[10px] font-bold uppercase tracking-wider rounded">
                              Slide #{idx + 1}
                            </span>
                          )}

                          {/* Reorder and Delete Actions */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMovePhoto(idx, 'left')}
                              className="p-1 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 rounded hover:bg-neutral-100 transition-colors"
                              title="Move Earlier in Slider"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === currentGalleryImages.length - 1}
                              onClick={() => handleMovePhoto(idx, 'right')}
                              className="p-1 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 rounded hover:bg-neutral-100 transition-colors"
                              title="Move Later in Slider"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors ml-1"
                              title="Remove Photo from Gallery"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Quick Action: Set as Cover if not already */}
                        {!isCover && (
                          <button
                            type="button"
                            onClick={() => handleSetAsCover(idx)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F05A28] hover:text-[#D94526] transition-colors"
                          >
                            <Star className="w-3 h-3" />
                            <span>Set as Primary Cover Photo</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inputs Row: Direct URL and Caption */}
                    <div className="space-y-2 pt-1 border-t border-neutral-100">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
                            Slide Caption / Description
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoPickerTarget(idx);
                              setPhotoPickerOpen(true);
                            }}
                            className="text-[10px] font-semibold text-[#F05A28] hover:underline"
                          >
                            Browse Library
                          </button>
                        </div>
                        <input
                          type="text"
                          value={caption}
                          onChange={(e) => handleUpdateCaption(idx, e.target.value)}
                          placeholder={`Caption describing slide #${idx + 1}`}
                          className="w-full px-2.5 py-1 text-xs border border-neutral-200 rounded bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-[#F05A28] text-neutral-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                          Direct Photo URL
                        </label>
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => handleUpdatePhotoUrl(idx, e.target.value)}
                          className="w-full px-2.5 py-1 text-[11px] border border-neutral-200 rounded font-mono text-neutral-700 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Primary Details Form */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h3 className="text-lg font-bold text-neutral-900">
              Trip Details & Itinerary: {editingTrip.title}
            </h3>
            <p className="text-xs text-neutral-500">
              Update titles, category classification, durations, group sizes, and day-by-day programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Trip Title (Headline)
              </label>
              <input
                type="text"
                value={editingTrip.title}
                onChange={(e) => updateTrip(editingTrip.id, { title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded font-bold text-neutral-900 focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={editingTrip.category}
                onChange={(e) => updateTrip(editingTrip.id, { category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
              >
                <option value="Day Tours">Day Tours</option>
                <option value="Active Adventure & Hiking">Active Adventure & Hiking</option>
                <option value="Culinary & Cultural Expedition">Culinary & Cultural Expedition</option>
                <option value="Iconic Rail Journey">Iconic Rail Journey</option>
                <option value="Historical & Heritage Tour">Historical & Heritage Tour</option>
                <option value="City Break & Walking Tour">City Break & Walking Tour</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Duration String (Text)
              </label>
              <input
                type="text"
                value={editingTrip.duration}
                onChange={(e) => updateTrip(editingTrip.id, { duration: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Days Count (Number)
              </label>
              <input
                type="number"
                value={editingTrip.daysCount}
                onChange={(e) => updateTrip(editingTrip.id, { daysCount: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Group Size Specification
              </label>
              <input
                type="text"
                value={editingTrip.groupSize}
                onChange={(e) => updateTrip(editingTrip.id, { groupSize: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Destinations (Comma Separated)
              </label>
              <input
                type="text"
                value={editingTrip.destinations.join(', ')}
                onChange={(e) => updateTrip(editingTrip.id, { 
                  destinations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Trip Overview Description
              </label>
              <textarea
                rows={4}
                value={editingTrip.description}
                onChange={(e) => updateTrip(editingTrip.id, { description: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="border-t border-neutral-100 pt-5">
            <h4 className="text-sm font-bold text-neutral-900 mb-2">
              Key Highlights (One per line)
            </h4>
            <textarea
              rows={4}
              value={editingTrip.highlights.join('\n')}
              onChange={(e) => updateTrip(editingTrip.id, { 
                highlights: e.target.value.split('\n').filter(s => s.trim())
              })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
            />
          </div>

          {/* Day-by-Day Itinerary Editor */}
          <div className="border-t border-neutral-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F05A28]" />
                <span>Day-by-Day Itinerary Sequence ({editingTrip.itinerary.length} Days)</span>
              </h4>

              <button
                onClick={() => {
                  const nextDayNum = editingTrip.itinerary.length + 1;
                  const newItinerary = [
                    ...editingTrip.itinerary,
                    {
                      dayNumber: nextDayNum,
                      title: `Day ${nextDayNum}: Scheduled Exploration`,
                      description: 'Full day guided activities with local regional focus.'
                    }
                  ];
                  updateTrip(editingTrip.id, { itinerary: newItinerary });
                }}
                className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Day</span>
              </button>
            </div>

            <div className="space-y-3">
              {editingTrip.itinerary.map((day, idx) => (
                <div key={idx} className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center">
                        {day.dayNumber}
                      </span>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const updated = [...editingTrip.itinerary];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateTrip(editingTrip.id, { itinerary: updated });
                        }}
                        className="px-2 py-1 text-xs font-bold text-neutral-900 border border-neutral-300 rounded bg-white w-72 sm:w-96"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const updated = editingTrip.itinerary.filter((_, i) => i !== idx);
                        updateTrip(editingTrip.id, { itinerary: updated });
                      }}
                      className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors"
                      title="Remove Day"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={day.description}
                    onChange={(e) => {
                      const updated = [...editingTrip.itinerary];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      updateTrip(editingTrip.id, { itinerary: updated });
                    }}
                    className="w-full px-2 py-1 text-xs border border-neutral-300 rounded bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, list view of all trips:
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#F05A28]" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Turkey Guided Expeditions Portfolio ({content.trips.length} Tours)
              </h3>
              <p className="text-xs text-neutral-500">
                Manage itineraries, durations, multi-photo galleries, and group sizes for all catalog tours.
              </p>
            </div>
          </div>

          <button
            onClick={handleCreateNewTrip}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Trip</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tour title, duration, destination..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#F05A28]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Trips Table / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrips.map((trip) => {
            const galleryCount = trip.images && trip.images.length > 0 
              ? trip.images.length 
              : getTripGallery(trip.id, trip.image).images.length;

            return (
              <div
                key={trip.id}
                className="rounded-lg border border-neutral-200 overflow-hidden bg-white hover:border-[#F05A28]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] relative bg-neutral-900 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      {trip.duration}
                    </div>
                    <div className="absolute top-2 right-2 bg-[#F05A28]/90 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>{galleryCount} Photos</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F05A28]">
                      {trip.category}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-2">
                      {trip.title}
                    </h4>
                    <div className="text-xs text-neutral-500 line-clamp-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{trip.destinations.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
                  <div className="text-[11px] font-medium text-neutral-500">
                    {trip.daysCount} Days • {trip.groupSize}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => duplicateTrip(trip.id)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-200 transition-colors"
                      title="Duplicate Tour"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setEditingTripId(trip.id)}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit & Gallery</span>
                    </button>

                    {deletingTripId === trip.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                        <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                        <button
                          onClick={() => {
                            deleteTrip(trip.id);
                            setDeletingTripId(null);
                          }}
                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeletingTripId(null)}
                          className="px-1 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingTripId(trip.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        title="Delete Tour"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
