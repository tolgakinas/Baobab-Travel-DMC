import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { SampleItinerary, ItineraryDay } from '../../types';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  MoveUp, 
  MoveDown, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon, 
  Layers, 
  ArrowRight, 
  RefreshCw, 
  Wand2, 
  Compass, 
  Check, 
  X,
  Search,
  ExternalLink,
  Tag,
  AlertCircle
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Small Group Tour',
  'Active Adventure',
  'Cultural Expedition',
  'Gulet & Coastal Trek'
] as const;

const TURKEY_DESTINATIONS_SUGGESTIONS = [
  'Istanbul',
  'Cappadocia',
  'Ephesus',
  'Bodrum',
  'Antalya',
  'Fethiye',
  'Kas',
  'Pamukkale',
  'Izmir & Urla',
  'Trabzon & Black Sea',
  'Mardin & Mesopotamia',
  'Sanliurfa & Gobeklitepe',
  'Mount Nemrut'
];

const PHOTO_PRESETS = [
  { label: 'Cappadocia Balloons', url: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Istanbul Historic Peninsula', url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Bosphorus Waterfront', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Ancient Ephesus Ruins', url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Bodrum Gulet & Bay', url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Butterfly Valley Fethiye', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Pamukkale Travertines', url: 'https://images.unsplash.com/photo-1599818818580-0a2c2069279d?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Mount Nemrut Statues', url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Gobeklitepe Monoliths', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1600&q=85' }
];

export const ItinerariesManagerTab: React.FC = () => {
  const { 
    content, 
    updateItinerary, 
    addItinerary, 
    deleteItinerary, 
    duplicateItinerary, 
    reorderItineraries 
  } = useSiteContent();

  const itineraries = content.itineraries || [];

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Editing state
  const [editingItinerary, setEditingItinerary] = useState<SampleItinerary | null>(null);
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // New Highlight Input
  const [newHighlightText, setNewHighlightText] = useState('');
  const [newDestTag, setNewDestTag] = useState('');
  const [newDayHighlightText, setNewDayHighlightText] = useState('');

  // AI Generator Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiGeneratedResult, setAiGeneratedResult] = useState<SampleItinerary | null>(null);

  // AI Form inputs
  const [aiTheme, setAiTheme] = useState('');
  const [aiDuration, setAiDuration] = useState('10 Days / 9 Nights');
  const [aiCategory, setAiCategory] = useState<string>('Small Group Tour');
  const [aiDestinations, setAiDestinations] = useState<string[]>(['Istanbul', 'Cappadocia', 'Ephesus']);
  const [aiFocus, setAiFocus] = useState('Boutique cave hotels, scholar guided Roman ruins, sunset Bosphorus cruise');
  const [aiGroupSize, setAiGroupSize] = useState('Intimate Groups & Private Circles (4–14 Travelers)');

  // Filtered List
  const filteredItineraries = itineraries.filter(itin => {
    const matchesCategory = selectedCategory === 'all' || itin.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      itin.title.toLowerCase().includes(q) ||
      itin.subtitle.toLowerCase().includes(q) ||
      itin.overview.toLowerCase().includes(q) ||
      itin.destinations.some(d => d.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Start blank new framework
  const handleCreateBlank = () => {
    const newId = `itin-custom-${Date.now()}`;
    const newFramework: SampleItinerary = {
      id: newId,
      title: 'New Bespoke Turkey Framework',
      subtitle: 'Istanbul • Cappadocia • Aegean',
      duration: '8 Days / 7 Nights',
      category: 'Small Group Tour',
      destinations: ['Istanbul', 'Cappadocia'],
      coverImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85',
      images: [
        'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80'
      ],
      imageCaptions: [
        'Historical Sultanahmet peninsula in Istanbul',
        'Dawn hot air balloons rising over Goreme Valley'
      ],
      overview: 'Bespoke small group cultural journey featuring boutique accommodations, private historian guidance, and seamless ground operations.',
      idealGroupSize: 'Intimate Groups & Private Circles (4–14 Travelers)',
      includedHighlights: [
        'Boutique historical hotels & authentic cave suites',
        'Private Mercedes VIP Sprinter transport throughout',
        'Licensed scholar guide with priority access privileges'
      ],
      days: [
        {
          day: 1,
          title: 'Arrival in Istanbul & Sunset Welcome Boat',
          location: 'Istanbul',
          description: 'VIP airport meet-and-greet with dedicated transfer to your boutique hotel in Sultanahmet. Late afternoon private cruise along the Bosphorus Strait with welcome mezes.',
          highlights: ['Airport Meet & Greet', 'Boutique Hotel Check-in', 'Private Bosphorus Cruise']
        },
        {
          day: 2,
          title: 'Byzantine & Ottoman Imperial Antiquities',
          location: 'Istanbul',
          description: 'Full-day walking exploration with licensed scholar guide covering Hagia Sophia, Topkapi Palace Harem courtyards, and the subterranean Basilica Cistern.',
          highlights: ['Hagia Sophia', 'Topkapi Palace', 'Basilica Cistern']
        }
      ]
    };

    addItinerary(newFramework);
    setEditingItinerary(newFramework);
    setEditingDayIndex(0);
  };

  // Reorder helpers
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= itineraries.length) return;
    const reordered = [...itineraries];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    reorderItineraries(reordered);
  };

  // AI Generation Trigger
  const handleRunAiDesigner = async () => {
    setAiGenerating(true);
    setAiError(null);
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: aiTheme || 'Curated Turkey Expedition',
          duration: aiDuration,
          category: aiCategory,
          destinations: aiDestinations,
          focus: aiFocus,
          groupSize: aiGroupSize
        })
      });

      const data = await res.json();
      if (data.success && data.itinerary) {
        setAiGeneratedResult(data.itinerary);
      } else {
        setAiError(data.error || 'Could not generate itinerary. Please try again.');
      }
    } catch (err: any) {
      setAiError(err.message || 'Network error during itinerary generation.');
    } finally {
      setAiGenerating(false);
    }
  };

  // Save AI Result into Catalog
  const handleAdoptAiResult = () => {
    if (!aiGeneratedResult) return;
    addItinerary(aiGeneratedResult);
    setEditingItinerary(aiGeneratedResult);
    setIsAiModalOpen(false);
    setAiGeneratedResult(null);
  };

  // Add / Remove Highlights in Editor
  const handleAddHighlight = () => {
    if (!editingItinerary || !newHighlightText.trim()) return;
    setEditingItinerary({
      ...editingItinerary,
      includedHighlights: [...editingItinerary.includedHighlights, newHighlightText.trim()]
    });
    setNewHighlightText('');
  };

  const handleRemoveHighlight = (index: number) => {
    if (!editingItinerary) return;
    setEditingItinerary({
      ...editingItinerary,
      includedHighlights: editingItinerary.includedHighlights.filter((_, i) => i !== index)
    });
  };

  // Add / Remove Destination Tag
  const handleAddDestTag = (tag: string) => {
    if (!editingItinerary || !tag.trim()) return;
    if (editingItinerary.destinations.includes(tag.trim())) return;
    setEditingItinerary({
      ...editingItinerary,
      destinations: [...editingItinerary.destinations, tag.trim()]
    });
    setNewDestTag('');
  };

  const handleRemoveDestTag = (tag: string) => {
    if (!editingItinerary) return;
    setEditingItinerary({
      ...editingItinerary,
      destinations: editingItinerary.destinations.filter(d => d !== tag)
    });
  };

  // Day additions / removals
  const handleAddDay = () => {
    if (!editingItinerary) return;
    const nextDayNum = editingItinerary.days.length + 1;
    const newDay: ItineraryDay = {
      day: nextDayNum,
      title: `Day ${nextDayNum} Discovery`,
      location: editingItinerary.destinations[0] || 'Turkey',
      description: 'Full-day curated cultural exploration with private scholar guide, VIP Mercedes transit, and artisan culinary encounters.',
      highlights: ['Private Scholar Tour', 'Regional Gastronomy']
    };
    const updatedDays = [...editingItinerary.days, newDay];
    setEditingItinerary({
      ...editingItinerary,
      days: updatedDays
    });
    setEditingDayIndex(updatedDays.length - 1);
  };

  const handleRemoveDay = (dayIndex: number) => {
    if (!editingItinerary || editingItinerary.days.length <= 1) return;
    const updatedDays = editingItinerary.days
      .filter((_, idx) => idx !== dayIndex)
      .map((d, idx) => ({ ...d, day: idx + 1 }));
    setEditingItinerary({
      ...editingItinerary,
      days: updatedDays
    });
    setEditingDayIndex(0);
  };

  // Save current editing changes to context
  const handleSaveEditing = () => {
    if (!editingItinerary) return;
    updateItinerary(editingItinerary.id, editingItinerary);
    setEditingItinerary(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Controls */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0 shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold text-neutral-900">
                  Curated Sample Frameworks Manager
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F05A28] text-white">
                  {itineraries.length} Programs
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Design, customize, and edit the tour itineraries displayed in the "Curated Sample Frameworks" section of the website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setIsAiModalOpen(true);
                setAiGeneratedResult(null);
                setAiError(null);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-[#F05A28] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4 animate-spin text-amber-200" style={{ animationDuration: '4s' }} />
              <span>Design Itinerary with AI</span>
            </button>

            <button
              onClick={handleCreateBlank}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Framework</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frameworks by title, destinations, or keywords..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-[#F05A28] bg-neutral-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', ...CATEGORY_OPTIONS].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat === 'all' ? 'All Frameworks' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Itineraries List */}
      <div className="space-y-4">
        {filteredItineraries.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center text-neutral-500 space-y-3">
            <Compass className="w-10 h-10 mx-auto text-neutral-300" />
            <div className="font-semibold text-neutral-700">No frameworks found matching criteria</div>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Create a new sample framework or design one using our Gemini AI generator.
            </p>
            <button
              onClick={handleCreateBlank}
              className="px-4 py-2 bg-[#F05A28] text-white text-xs font-bold uppercase rounded-lg"
            >
              Create Sample Framework
            </button>
          </div>
        ) : (
          filteredItineraries.map((itin, index) => (
            <div
              key={itin.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col md:flex-row group"
            >
              {/* Photo Thumbnail */}
              <div className="relative md:w-64 h-48 md:h-auto shrink-0 bg-neutral-900 overflow-hidden">
                <img
                  src={itin.coverImage}
                  alt={itin.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F05A28] text-white">
                  {itin.category}
                </span>
                <span className="absolute bottom-3 left-3 text-white text-[11px] font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>{itin.duration}</span>
                </span>
              </div>

              {/* Framework Info & Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-neutral-900">
                        {itin.title}
                      </h4>
                      <p className="text-xs font-medium text-[#F05A28]">
                        {itin.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === itineraries.length - 1}
                        className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {itin.overview}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {itin.destinations.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10.5px] font-medium flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-[#F05A28]" />
                        <span>{d}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-neutral-500 font-medium">
                    <span><strong>{itin.days?.length || 0}</strong> Days Scheduled</span>
                    <span><strong>{itin.includedHighlights?.length || 0}</strong> Inclusions</span>
                    <span className="hidden sm:inline text-neutral-400">• {itin.idealGroupSize}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => duplicateItinerary(itin.id)}
                      className="px-2.5 py-1.5 border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      title="Duplicate Framework"
                    >
                      <Copy className="w-3 h-3 text-neutral-500" />
                      <span className="hidden sm:inline">Duplicate</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingItinerary(JSON.parse(JSON.stringify(itin)));
                        setEditingDayIndex(0);
                      }}
                      className="px-3 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Texts & Photos</span>
                    </button>

                    {deletingId === itin.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                        <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                        <button
                          onClick={() => {
                            deleteItinerary(itin.id);
                            setDeletingId(null);
                          }}
                          className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="px-1 py-0.5 bg-neutral-200 text-neutral-700 text-[10px] font-bold rounded"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(itin.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        title="Delete Framework"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULL FRAMEWORK EDITOR MODAL (Texts, Photos, Highlights, Day Schedule)     */}
      {/* ========================================================================= */}
      {editingItinerary && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-neutral-200 animate-scaleUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F05A28]">
                    Framework Editor
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-200 text-neutral-800">
                    ID: {editingItinerary.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {editingItinerary.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveEditing}
                  className="px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItinerary(null)}
                  className="w-8 h-8 rounded-lg border border-neutral-300 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Settings */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Section 1: Basic Texts & Categorization */}
              <div className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 space-y-4">
                <div className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#F05A28]" />
                  <span>1. Title, Categorization & Scale</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Itinerary Headline / Title
                    </label>
                    <input
                      type="text"
                      value={editingItinerary.title}
                      onChange={(e) => setEditingItinerary({ ...editingItinerary, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28] font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Route Subtitle (Cities)
                    </label>
                    <input
                      type="text"
                      value={editingItinerary.subtitle}
                      onChange={(e) => setEditingItinerary({ ...editingItinerary, subtitle: e.target.value })}
                      placeholder="e.g. Istanbul • Cappadocia • Ephesus • Bodrum"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Duration Standard
                    </label>
                    <input
                      type="text"
                      value={editingItinerary.duration}
                      onChange={(e) => setEditingItinerary({ ...editingItinerary, duration: e.target.value })}
                      placeholder="e.g. 10 Days / 9 Nights"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Catalog Category
                    </label>
                    <select
                      value={editingItinerary.category}
                      onChange={(e) => setEditingItinerary({ ...editingItinerary, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Ideal Delegation Scale / Group Size
                    </label>
                    <input
                      type="text"
                      value={editingItinerary.idealGroupSize}
                      onChange={(e) => setEditingItinerary({ ...editingItinerary, idealGroupSize: e.target.value })}
                      placeholder="e.g. Intimate Groups & Private Circles (4–14 Travelers)"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Executive Overview Summary
                    </label>
                    <textarea
                      rows={2}
                      value={editingItinerary.overview}
                      onChange={(e) => setEditingItinerary({ ...editingItinerary, overview: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28] leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Destinations Tags */}
              <div className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 space-y-3">
                <div className="font-bold text-sm text-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F05A28]" />
                    <span>2. Route Destinations Tags</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">Click a suggestion to add</span>
                </div>

                <div className="flex flex-wrap gap-1.5 items-center">
                  {editingItinerary.destinations.map((dest, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-neutral-800 rounded-md font-semibold text-xs shadow-2xs"
                    >
                      <MapPin className="w-3 h-3 text-[#F05A28]" />
                      <span>{dest}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDestTag(dest)}
                        className="text-neutral-400 hover:text-red-600 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                {/* Suggestions and custom adder */}
                <div className="pt-2 border-t border-neutral-200 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-neutral-500">Quick Add:</span>
                  {TURKEY_DESTINATIONS_SUGGESTIONS.filter(s => !editingItinerary.destinations.includes(s)).slice(0, 8).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleAddDestTag(s)}
                      className="px-2 py-0.5 rounded bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 text-[10.5px] font-medium transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                  
                  <div className="flex items-center gap-1 ml-auto">
                    <input
                      type="text"
                      value={newDestTag}
                      onChange={(e) => setNewDestTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddDestTag(newDestTag);
                        }
                      }}
                      placeholder="Custom city..."
                      className="px-2.5 py-1 text-xs border border-neutral-300 rounded bg-white w-28 focus:outline-none focus:border-[#F05A28]"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddDestTag(newDestTag)}
                      className="px-2 py-1 bg-neutral-900 text-white rounded text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Visual Assets & Imagery */}
              <div className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 space-y-4">
                <div className="font-bold text-sm text-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#F05A28]" />
                    <span>3. Imagery & Cover Photo</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">High-resolution WebP/JPG</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Image Preview */}
                  <div className="md:col-span-4">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-300 shadow-xs">
                      <img
                        src={editingItinerary.coverImage}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                        Cover Photo
                      </span>
                    </div>
                  </div>

                  {/* URL and Preset Picker */}
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                        Cover Image Direct URL
                      </label>
                      <input
                        type="text"
                        value={editingItinerary.coverImage}
                        onChange={(e) => setEditingItinerary({ ...editingItinerary, coverImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28] font-mono"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-neutral-500 block mb-1.5">
                        Select from Turkey Destination Presets:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {PHOTO_PRESETS.map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setEditingItinerary({ ...editingItinerary, coverImage: p.url })}
                            className={`p-1.5 rounded border text-left text-[10.5px] truncate font-medium transition-colors ${
                              editingItinerary.coverImage === p.url
                                ? 'bg-orange-100 border-[#F05A28] text-[#F05A28]'
                                : 'bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Key Inclusions & Highlights */}
              <div className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 space-y-3">
                <div className="font-bold text-sm text-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>4. Key Inclusions & Highlights ({editingItinerary.includedHighlights.length})</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">Bulleted brochure highlights</span>
                </div>

                <div className="space-y-2">
                  {editingItinerary.includedHighlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-neutral-200 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => {
                          const updated = [...editingItinerary.includedHighlights];
                          updated[i] = e.target.value;
                          setEditingItinerary({ ...editingItinerary, includedHighlights: updated });
                        }}
                        className="flex-1 text-xs border-none bg-transparent focus:outline-none text-neutral-800 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="p-1 text-neutral-400 hover:text-red-600 rounded"
                        title="Remove highlight"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newHighlightText}
                      onChange={(e) => setNewHighlightText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      placeholder="Add a new key inclusion highlight (e.g. Dedicated Mercedes VIP Sprinter throughout)..."
                      className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-3.5 py-2 bg-neutral-900 text-white rounded text-xs font-bold uppercase tracking-wider"
                    >
                      Add Highlight
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 5: Day-by-Day Schedule Builder */}
              <div className="bg-neutral-50/60 p-4 rounded-xl border border-neutral-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#F05A28]" />
                    <span className="font-bold text-sm text-neutral-900">
                      5. Day-by-Day Itinerary Schedule ({editingItinerary.days.length} Days)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddDay}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F05A28] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[#D94526] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Next Day</span>
                  </button>
                </div>

                {/* Day selector tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-neutral-200">
                  {editingItinerary.days.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingDayIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        editingDayIndex === idx
                          ? 'bg-neutral-900 text-white shadow-2xs'
                          : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      Day {d.day}: {d.location}
                    </button>
                  ))}
                </div>

                {/* Active day editor card */}
                {editingDayIndex !== null && editingItinerary.days[editingDayIndex] && (
                  <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#F05A28] text-white flex items-center justify-center font-bold text-xs">
                          {editingItinerary.days[editingDayIndex].day}
                        </span>
                        <span className="font-bold text-xs uppercase tracking-wider text-neutral-500">
                          Editing Schedule for Day {editingItinerary.days[editingDayIndex].day}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveDay(editingDayIndex)}
                        disabled={editingItinerary.days.length <= 1}
                        className="text-xs text-red-600 hover:text-red-800 disabled:opacity-30 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Day {editingItinerary.days[editingDayIndex].day}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-8">
                        <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                          Day Headline / Title
                        </label>
                        <input
                          type="text"
                          value={editingItinerary.days[editingDayIndex].title}
                          onChange={(e) => {
                            const updatedDays = [...editingItinerary.days];
                            updatedDays[editingDayIndex].title = e.target.value;
                            setEditingItinerary({ ...editingItinerary, days: updatedDays });
                          }}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28] font-bold"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                          Location / Region
                        </label>
                        <input
                          type="text"
                          value={editingItinerary.days[editingDayIndex].location}
                          onChange={(e) => {
                            const updatedDays = [...editingItinerary.days];
                            updatedDays[editingDayIndex].location = e.target.value;
                            setEditingItinerary({ ...editingItinerary, days: updatedDays });
                          }}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28]"
                        />
                      </div>

                      <div className="sm:col-span-12">
                        <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                          Detailed Day Description & Logistical Flow
                        </label>
                        <textarea
                          rows={3}
                          value={editingItinerary.days[editingDayIndex].description}
                          onChange={(e) => {
                            const updatedDays = [...editingItinerary.days];
                            updatedDays[editingDayIndex].description = e.target.value;
                            setEditingItinerary({ ...editingItinerary, days: updatedDays });
                          }}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#F05A28] leading-relaxed"
                        />
                      </div>

                      {/* Day Highlights tags */}
                      <div className="sm:col-span-12 space-y-2">
                        <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider">
                          Day Highlight Tags ({editingItinerary.days[editingDayIndex].highlights?.length || 0})
                        </label>
                        
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {(editingItinerary.days[editingDayIndex].highlights || []).map((tag, tIdx) => (
                            <span key={tIdx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-orange-50 border border-orange-200 text-[#F05A28] text-[11px] font-semibold">
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedDays = [...editingItinerary.days];
                                  updatedDays[editingDayIndex].highlights = updatedDays[editingDayIndex].highlights.filter((_, idx) => idx !== tIdx);
                                  setEditingItinerary({ ...editingItinerary, days: updatedDays });
                                }}
                                className="text-orange-400 hover:text-orange-700 ml-1 font-bold"
                              >
                                ✕
                              </button>
                            </span>
                          ))}

                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={newDayHighlightText}
                              onChange={(e) => setNewDayHighlightText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (newDayHighlightText.trim()) {
                                    const updatedDays = [...editingItinerary.days];
                                    const currentHls = updatedDays[editingDayIndex].highlights || [];
                                    updatedDays[editingDayIndex].highlights = [...currentHls, newDayHighlightText.trim()];
                                    setEditingItinerary({ ...editingItinerary, days: updatedDays });
                                    setNewDayHighlightText('');
                                  }
                                }
                              }}
                              placeholder="New tag (e.g. Hagia Sophia)..."
                              className="px-2 py-1 text-xs border border-neutral-300 rounded bg-white w-44 focus:outline-none focus:border-[#F05A28]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newDayHighlightText.trim()) {
                                  const updatedDays = [...editingItinerary.days];
                                  const currentHls = updatedDays[editingDayIndex].highlights || [];
                                  updatedDays[editingDayIndex].highlights = [...currentHls, newDayHighlightText.trim()];
                                  setEditingItinerary({ ...editingItinerary, days: updatedDays });
                                  setNewDayHighlightText('');
                                }
                              }}
                              className="px-2 py-1 bg-neutral-900 text-white rounded text-xs font-bold"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50/70 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditingItinerary(null)}
                className="px-4 py-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEditing}
                className="px-6 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                Save Framework to Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AI ITINERARY DESIGNER MODAL                                              */}
      {/* ========================================================================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-neutral-200 animate-scaleUp">
            {/* Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-orange-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-[#F05A28] text-white flex items-center justify-center shadow-xs">
                  <Wand2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    AI Bespoke Itinerary Designer
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Harness Gemini AI to architect comprehensive day-by-day Turkey frameworks in seconds.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:bg-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              {aiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{aiError}</span>
                </div>
              )}

              {/* Generator Configuration Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                    Itinerary Concept / Theme Headline
                  </label>
                  <input
                    type="text"
                    value={aiTheme}
                    onChange={(e) => setAiTheme(e.target.value)}
                    placeholder="e.g. 10-Day Classical Turkey & Cappadocia Overland, Aegean Wine & Gulet Trails..."
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-[#F05A28] font-medium"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] text-neutral-400">Quick ideas:</span>
                    {[
                      'Aegean Wine & Olive Trails with Private Gulet',
                      'Lycian Coastal Trek & Ancient Sunken Ruins',
                      'Eastern Anatolia Silk Road & Mount Nemrut',
                      'The Imperial Ottoman & Byzantine Heritage Odyssey'
                    ].map((idea, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAiTheme(idea)}
                        className="text-[10px] text-indigo-700 hover:underline bg-indigo-50 px-1.5 py-0.5 rounded"
                      >
                        {idea}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Duration Schedule
                    </label>
                    <select
                      value={aiDuration}
                      onChange={(e) => setAiDuration(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-[#F05A28]"
                    >
                      <option value="5 Days / 4 Nights">5 Days / 4 Nights (Express)</option>
                      <option value="7 Days / 6 Nights">7 Days / 6 Nights (One-Week)</option>
                      <option value="8 Days / 7 Nights">8 Days / 7 Nights (Classic)</option>
                      <option value="10 Days / 9 Nights">10 Days / 9 Nights (Signature)</option>
                      <option value="12 Days / 11 Nights">12 Days / 11 Nights (In-Depth)</option>
                      <option value="14 Days / 13 Nights">14 Days / 13 Nights (Grand Tour)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                      Target Catalog Category
                    </label>
                    <select
                      value={aiCategory}
                      onChange={(e) => setAiCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-[#F05A28]"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Destinations Multiselect */}
                <div>
                  <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1.5">
                    Include Turkish Destinations & Regions ({aiDestinations.length} Selected)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {TURKEY_DESTINATIONS_SUGGESTIONS.map((dest) => {
                      const isSelected = aiDestinations.includes(dest);
                      return (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setAiDestinations(aiDestinations.filter(d => d !== dest));
                            } else {
                              setAiDestinations([...aiDestinations, dest]);
                            }
                          }}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-[#F05A28] text-white shadow-2xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{dest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold uppercase text-[10px] tracking-wider mb-1">
                    Special Focus, Privileges & Experience Style
                  </label>
                  <textarea
                    rows={2}
                    value={aiFocus}
                    onChange={(e) => setAiFocus(e.target.value)}
                    placeholder="e.g. Private scholar guide in Ephesus, boutique cave hotel terrace dinner, sunrise hot air ballooning in Cappadocia..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-[#F05A28] leading-relaxed"
                  />
                </div>
              </div>

              {/* Generate Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRunAiDesigner}
                  disabled={aiGenerating}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-[#F05A28] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${aiGenerating ? 'animate-spin' : ''}`} />
                  <span>{aiGenerating ? 'Architecting Framework with Gemini AI...' : 'Generate Complete Framework with AI'}</span>
                </button>
              </div>

              {/* Generated Result Preview */}
              {aiGeneratedResult && (
                <div className="bg-emerald-50/60 rounded-xl border border-emerald-200 p-4 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Generated Framework Ready for Review
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdoptAiResult}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-xs transition-colors"
                    >
                      Save to Catalog & Open Editor
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-bold text-neutral-900">
                      {aiGeneratedResult.title}
                    </div>
                    <div className="text-xs font-semibold text-[#F05A28]">
                      {aiGeneratedResult.subtitle} • {aiGeneratedResult.duration}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {aiGeneratedResult.overview}
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        Day-by-Day Outline ({aiGeneratedResult.days.length} Days):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {aiGeneratedResult.days.map((d) => (
                          <div key={d.day} className="p-2 bg-white rounded border border-emerald-100 text-[11px]">
                            <strong className="text-emerald-900">Day {d.day}:</strong> {d.title} ({d.location})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50/70 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
