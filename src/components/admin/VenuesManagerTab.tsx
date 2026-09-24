import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { VenueShowcase } from '../../types';
import { Building, Plus, Trash2, Edit, ArrowLeft, Image as ImageIcon, Users } from 'lucide-react';
import { PhotoLibraryModal } from './PhotoLibraryModal';

export const VenuesManagerTab: React.FC = () => {
  const { content, updateVenue, addVenue, deleteVenue } = useSiteContent();
  const [editingVenueId, setEditingVenueId] = useState<string | null>(null);
  const [deletingVenueId, setDeletingVenueId] = useState<string | null>(null);
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);

  const editingVenue = content.venues.find(v => v.id === editingVenueId);

  const handleCreateNew = () => {
    const id = `venue-${Date.now()}`;
    const newVenue: VenueShowcase = {
      id,
      name: 'New Heritage Ottoman Palace or Lodge',
      location: 'Bosphorus Waterfront, Istanbul',
      type: 'Historic Palace',
      capacity: '150 - 300 Pax',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
      description: 'Stately waterfront heritage venue with panoramic terrace views.',
      idealFor: 'Gala Dinners, Product Launches & Exclusive VIP Receptions'
    };
    addVenue(newVenue);
    setEditingVenueId(id);
  };

  if (editingVenue) {
    return (
      <div className="space-y-6">
        <PhotoLibraryModal
          isOpen={photoPickerOpen}
          onClose={() => setPhotoPickerOpen(false)}
          onSelectPhoto={(url) => updateVenue(editingVenue.id, { image: url })}
          currentUrl={editingVenue.image}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-neutral-200">
          <button
            onClick={() => setEditingVenueId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-[#F05A28]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Venues List</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-neutral-500">ID: {editingVenue.id}</span>
            {deletingVenueId === editingVenue.id ? (
              <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded border border-red-300">
                <span className="text-xs font-bold text-red-700">Confirm delete?</span>
                <button
                  onClick={() => {
                    deleteVenue(editingVenue.id);
                    setEditingVenueId(null);
                    setDeletingVenueId(null);
                  }}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeletingVenueId(null)}
                  className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setDeletingVenueId(editingVenue.id)}
                className="px-2.5 py-1 border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Venue</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            Edit Venue: {editingVenue.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Venue Name
              </label>
              <input
                type="text"
                value={editingVenue.name}
                onChange={(e) => updateVenue(editingVenue.id, { name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Location (City / Area)
              </label>
              <input
                type="text"
                value={editingVenue.location}
                onChange={(e) => updateVenue(editingVenue.id, { location: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Venue Type
              </label>
              <select
                value={editingVenue.type}
                onChange={(e) => updateVenue(editingVenue.id, { type: e.target.value as any })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded bg-white"
              >
                <option value="Historic Palace">Historic Palace</option>
                <option value="Cave & Canyon">Cave & Canyon</option>
                <option value="Coastal & Yacht">Coastal & Yacht</option>
                <option value="Ancient Ruin">Ancient Ruin</option>
                <option value="Contemporary">Contemporary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Capacity (Numbers / Pax)
              </label>
              <input
                type="text"
                value={editingVenue.capacity}
                onChange={(e) => updateVenue(editingVenue.id, { capacity: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded font-semibold text-[#F05A28]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Ideal Event / Use Case
              </label>
              <input
                type="text"
                value={editingVenue.idealFor}
                onChange={(e) => updateVenue(editingVenue.id, { idealFor: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingVenue.description}
                onChange={(e) => updateVenue(editingVenue.id, { description: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded"
              />
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-4">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Venue Photo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 aspect-[16/10] rounded overflow-hidden border border-neutral-300 bg-neutral-900">
                <img
                  src={editingVenue.image}
                  alt={editingVenue.name}
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
                  value={editingVenue.image}
                  onChange={(e) => updateVenue(editingVenue.id, { image: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded font-mono"
                  placeholder="Direct image URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <Building className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Exclusive Venues, Palaces & Gulets ({content.venues.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Manage venue photos, capacities, locations, and descriptions.
            </p>
          </div>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-3 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Venue</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.venues.map((venue) => (
          <div
            key={venue.id}
            className="rounded-lg border border-neutral-200 overflow-hidden bg-white hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-neutral-900 relative overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                  {venue.capacity}
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#F05A28]">
                  {venue.type} • {venue.location}
                </span>
                <h4 className="text-sm font-bold text-neutral-900">
                  {venue.name}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-2">
                  {venue.description}
                </p>
              </div>
            </div>

            <div className="p-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-neutral-600 truncate max-w-[140px]">
                {venue.idealFor}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingVenueId(venue.id)}
                  className="px-2.5 py-1 bg-neutral-900 text-white text-xs font-semibold rounded flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                {deletingVenueId === venue.id ? (
                  <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                    <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                    <button
                      onClick={() => {
                        deleteVenue(venue.id);
                        setDeletingVenueId(null);
                      }}
                      className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeletingVenueId(null)}
                      className="px-1 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingVenueId(venue.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    title="Delete Venue"
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
