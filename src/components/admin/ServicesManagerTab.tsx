import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Layers, Edit, Check } from 'lucide-react';

export const ServicesManagerTab: React.FC = () => {
  const { content, updateService } = useSiteContent();
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingService = content.services.find(s => s.id === editingId);

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Core DMC Operational Services ({content.services.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Edit service titles, operational descriptions, and bullet-point capabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.services.map((service) => {
          const isEditing = editingId === service.id;

          if (isEditing) {
            return (
              <div key={service.id} className="p-4 rounded-lg border-2 border-[#F05A28] bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F05A28]">Editing Service</span>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Done</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(service.id, { title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={service.shortDesc}
                    onChange={(e) => updateService(service.id, { shortDesc: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">
                    Features (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={service.features.join('\n')}
                    onChange={(e) => updateService(service.id, { 
                      features: e.target.value.split('\n').filter(Boolean)
                    })}
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded font-mono"
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={service.id} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-900">{service.title}</h4>
                  <button
                    onClick={() => setEditingId(service.id)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-200"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-neutral-600">{service.shortDesc}</p>
                <div className="space-y-1 pt-1">
                  {service.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#F05A28]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
