import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { AtlasTrip, TripItineraryDay } from '../../types';
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
  Eye,
  ListPlus,
  AlertTriangle,
  X
} from 'lucide-react';
import { PhotoLibraryModal } from './PhotoLibraryModal';

export const TripsManagerTab: React.FC = () => {
  const { content, updateTrip, addTrip, deleteTrip, duplicateTrip } = useSiteContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);
  const [photoPickerTarget, setPhotoPickerTarget] = useState<'cover' | number>('cover');

  const editingTrip = content.trips.find(t => t.id === editingTripId);

  const categories = ['all', 'Day Tours', 'Active Adventure & Hiking', 'Culinary & Cultural Expedition', 'Iconic Rail Journey', 'Historical & Heritage Tour', 'City Break & Walking Tour'];

  const filteredTrips = content.trips.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateNewTrip = () => {
    const newId = `trip-custom-${Date.now()}`;
    const newTrip: AtlasTrip = {
      id: newId,
      atlasId: Date.now(),
      title: 'New Turkey Expedition Program',
      slug: `new-turkey-expedition-${Date.now()}`,
      category: 'Culinary & Cultural Expedition',
      duration: '8 Days / 7 Nights',
      daysCount: 8,
      groupSize: 'Max 12-16 Pax',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
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

  const handleSelectPhoto = (url: string) => {
    if (!editingTrip) return;
    if (photoPickerTarget === 'cover') {
      updateTrip(editingTrip.id, { image: url });
    } else if (typeof photoPickerTarget === 'number') {
      const images = [...(editingTrip.images || [editingTrip.image])];
      images[photoPickerTarget] = url;
      updateTrip(editingTrip.id, { images });
    }
  };

  // If in edit mode for a specific trip:
  if (editingTrip) {
    return (
      <div className="space-y-6">
        <PhotoLibraryModal
          isOpen={photoPickerOpen}
          onClose={() => setPhotoPickerOpen(false)}
          onSelectPhoto={handleSelectPhoto}
          currentUrl={
            photoPickerTarget === 'cover' 
              ? editingTrip.image 
              : editingTrip.images?.[photoPickerTarget]
          }
        />

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

        {/* Primary Details Form */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h3 className="text-lg font-bold text-neutral-900">
              Editing Trip: {editingTrip.title}
            </h3>
            <p className="text-xs text-neutral-500">
              Update photos, texts, duration numbers, and day-by-day itineraries.
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

          {/* Cover Photo Control */}
          <div className="border-t border-neutral-100 pt-5">
            <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#F05A28]" />
              <span>Trip Primary Cover Photo</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 aspect-[16/10] rounded-lg overflow-hidden border border-neutral-300 bg-neutral-900">
                <img
                  src={editingTrip.image}
                  alt={editingTrip.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-8 space-y-2.5">
                <button
                  onClick={() => {
                    setPhotoPickerTarget('cover');
                    setPhotoPickerOpen(true);
                  }}
                  className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-[#F05A28]" />
                  <span>Choose High-Res Photo from Library</span>
                </button>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Or Direct Photo URL:
                  </label>
                  <input
                    type="url"
                    value={editingTrip.image}
                    onChange={(e) => updateTrip(editingTrip.id, { image: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded font-mono text-neutral-800"
                  />
                </div>
              </div>
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
                Manage itineraries, durations, photos, and group sizes for all catalog tours.
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
          {filteredTrips.map((trip) => (
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
                    <span>Edit</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

