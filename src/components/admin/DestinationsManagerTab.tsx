import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Destination } from '../../types';
import { MapPin, Plus, Trash2, Edit, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { PhotoLibraryModal } from './PhotoLibraryModal';

export const DestinationsManagerTab: React.FC = () => {
  const { content, updateDestination, addDestination, deleteDestination } = useSiteContent();
  const [editingDestId, setEditingDestId] = useState<string | null>(null);
  const [deletingDestId, setDeletingDestId] = useState<string | null>(null);
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);

  const editingDest = content.destinations.find(d => d.id === editingDestId);

  const handleCreateNew = () => {
    const id = `dest-${Date.now()}`;
    const newDest: Destination = {
      id,
      name: 'New Turkey Destination',
      regionTag: 'Coastal & Ancient Trails',
      region: 'Mediterranean',
      tagline: 'Scenic vistas and cultural heritage',
      description: 'Authentic local encounters, historic ruins, and secluded bays.',
      heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      ],
      highlights: ['Local guided trails', 'Historic village architecture', 'Boutique accommodations'],
      bestSeason: 'April to October',
      signatureExperiences: ['Sunset gathering', 'Artisan workshop'],
      exclusiveVenues: ['Heritage Boutique Lodge'],
      airportCode: 'AYT / DLM',
      quickFacts: {
        idealDuration: '3 - 4 Days',
        bestFor: 'Nature, Culture & Gastronomy',
        keyHubs: 'Coastal Ports',
        travelStyle: 'Boutique lodge & guided walks',
        unescoSites: 'Ancient monuments',
        culinarySpecialty: 'Fresh Mediterranean mezes & olive oils'
      }
    };
    addDestination(newDest);
    setEditingDestId(id);
  };

  if (editingDest) {
    return (
      <div className="space-y-6">
        <PhotoLibraryModal
          isOpen={photoPickerOpen}
          onClose={() => setPhotoPickerOpen(false)}
          onSelectPhoto={(url) => updateDestination(editingDest.id, { heroImage: url })}
          currentUrl={editingDest.heroImage}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-neutral-200">
          <button
            onClick={() => setEditingDestId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-[#F05A28]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Destinations List</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-neutral-500">ID: {editingDest.id}</span>
            {deletingDestId === editingDest.id ? (
              <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded border border-red-300">
                <span className="text-xs font-bold text-red-700">Confirm delete?</span>
                <button
                  onClick={() => {
                    deleteDestination(editingDest.id);
                    setEditingDestId(null);
                    setDeletingDestId(null);
                  }}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeletingDestId(null)}
                  className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setDeletingDestId(editingDest.id)}
                className="px-2.5 py-1 border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Destination</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="text-lg font-bold text-neutral-900">
              Edit Destination: {editingDest.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Destination Name
              </label>
              <input
                type="text"
                value={editingDest.name}
                onChange={(e) => updateDestination(editingDest.id, { name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Region Tagline Label
              </label>
              <input
                type="text"
                value={editingDest.regionTag}
                onChange={(e) => updateDestination(editingDest.id, { regionTag: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Poetic Tagline (Subtitle)
              </label>
              <input
                type="text"
                value={editingDest.tagline}
                onChange={(e) => updateDestination(editingDest.id, { tagline: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingDest.description}
                onChange={(e) => updateDestination(editingDest.id, { description: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Best Season String
              </label>
              <input
                type="text"
                value={editingDest.bestSeason}
                onChange={(e) => updateDestination(editingDest.id, { bestSeason: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Gateway Airport Code (e.g. IST / SAW, NAV / ASR)
              </label>
              <input
                type="text"
                value={editingDest.airportCode}
                onChange={(e) => updateDestination(editingDest.id, { airportCode: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none font-mono font-bold"
              />
            </div>
          </div>

          {/* Hero Photo */}
          <div className="border-t border-neutral-100 pt-4">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Destination Hero Banner Photo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 aspect-[16/10] rounded overflow-hidden border border-neutral-300 bg-neutral-900">
                <img
                  src={editingDest.heroImage}
                  alt={editingDest.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-8 space-y-2">
                <button
                  onClick={() => setPhotoPickerOpen(true)}
                  className="px-3.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase rounded flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Choose Photo from Library</span>
                </button>
                <input
                  type="url"
                  value={editingDest.heroImage}
                  onChange={(e) => updateDestination(editingDest.id, { heroImage: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded font-mono"
                  placeholder="Direct image URL"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="border-t border-neutral-100 pt-4">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Highlights (One per line)
            </label>
            <textarea
              rows={3}
              value={editingDest.highlights.join('\n')}
              onChange={(e) => updateDestination(editingDest.id, {
                highlights: e.target.value.split('\n').filter(Boolean)
              })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Turkey Destinations & Regions ({content.destinations.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Manage regions, airport codes, descriptions, and regional imagery.
            </p>
          </div>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-3 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Destination</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.destinations.map((dest) => (
          <div
            key={dest.id}
            className="rounded-lg border border-neutral-200 overflow-hidden bg-white hover:border-[#F05A28]/50 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-neutral-900 overflow-hidden relative">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/75 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                  {dest.airportCode}
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <div className="text-[10px] font-bold uppercase text-[#F05A28]">
                  {dest.regionTag}
                </div>
                <h4 className="text-sm font-bold text-neutral-900">
                  {dest.name}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-2">
                  {dest.description}
                </p>
              </div>
            </div>

            <div className="p-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">{dest.bestSeason}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingDestId(dest.id)}
                  className="px-2.5 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                {deletingDestId === dest.id ? (
                  <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                    <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                    <button
                      onClick={() => {
                        deleteDestination(dest.id);
                        setDeletingDestId(null);
                      }}
                      className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeletingDestId(null)}
                      className="px-1 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingDestId(dest.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    title="Delete Destination"
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
  );
};
