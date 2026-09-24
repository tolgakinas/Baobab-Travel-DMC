import React, { useState } from 'react';
import { useSiteContent, PillarItem, TestimonialItem } from '../../context/SiteContentContext';
import { Award, MessageSquare, Plus, Trash2, HelpCircle } from 'lucide-react';

export const AboutTestimonialsTab: React.FC = () => {
  const { content, updateAbout } = useSiteContent();
  const [deletingTestimonialIdx, setDeletingTestimonialIdx] = useState<number | null>(null);
  const about = content.about;

  const handlePillarChange = (idx: number, field: keyof PillarItem, value: string) => {
    const newPillars = [...about.pillars];
    if (newPillars[idx]) {
      newPillars[idx] = { ...newPillars[idx], [field]: value };
      updateAbout({ pillars: newPillars });
    }
  };

  const handleTestimonialChange = (idx: number, field: keyof TestimonialItem, value: any) => {
    const newTestimonials = [...about.testimonials];
    if (newTestimonials[idx]) {
      newTestimonials[idx] = { ...newTestimonials[idx], [field]: value };
      updateAbout({ testimonials: newTestimonials });
    }
  };

  const handleAddTestimonial = () => {
    const newItem: TestimonialItem = {
      quote: 'Exceptional ground dispatch and punctual airport handling for all our VIP groups.',
      author: 'Partner Operations Director',
      role: 'Head of Contracting',
      agency: 'Global Travel Collective',
      country: 'United Kingdom',
      rating: 5
    };
    updateAbout({ testimonials: [...about.testimonials, newItem] });
  };

  const handleDeleteTestimonial = (idx: number) => {
    if (about.testimonials.length <= 1) return;
    updateAbout({ testimonials: about.testimonials.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: Why Choose Us (4 Operational Pillars) */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
          <Award className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Why Choose Baobab DMC (4 Core Operational Pillars)
            </h3>
            <p className="text-xs text-neutral-500">
              Edit the value proposition pillars shown in the About & Accreditations section.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={about.whyChooseTitle}
              onChange={(e) => updateAbout({ whyChooseTitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Section Subtitle
            </label>
            <input
              type="text"
              value={about.whyChooseSubtitle}
              onChange={(e) => updateAbout({ whyChooseSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {about.pillars.map((pillar, i) => (
            <div key={i} className="p-3.5 bg-neutral-50 rounded border border-neutral-200 space-y-2">
              <div className="text-xs font-bold text-[#F05A28] uppercase">
                Pillar #{i + 1}
              </div>
              <input
                type="text"
                value={pillar.title}
                onChange={(e) => handlePillarChange(i, 'title', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-bold text-neutral-900 border border-neutral-300 rounded bg-white"
              />
              <textarea
                rows={2}
                value={pillar.desc}
                onChange={(e) => handlePillarChange(i, 'desc', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs text-neutral-600 border border-neutral-300 rounded bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: B2B Partner Testimonials */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-[#F05A28]" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Partner Testimonials & Endorsements ({about.testimonials.length})
              </h3>
              <p className="text-xs text-neutral-500">
                Manage reviews, star ratings, and partner credentials.
              </p>
            </div>
          </div>

          <button
            onClick={handleAddTestimonial}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase rounded flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Testimonial</span>
          </button>
        </div>

        <div className="space-y-4">
          {about.testimonials.map((test, idx) => (
            <div key={idx} className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">Review #{idx + 1}</span>
                  <span className="text-xs text-amber-500">{'★'.repeat(test.rating || 5)}</span>
                </div>
                {about.testimonials.length > 1 && (
                  <div>
                    {deletingTestimonialIdx === idx ? (
                      <div className="flex items-center gap-1 bg-red-50 p-0.5 rounded border border-red-300">
                        <span className="text-[10px] font-bold text-red-700 pl-1">Delete?</span>
                        <button
                          onClick={() => {
                            handleDeleteTestimonial(idx);
                            setDeletingTestimonialIdx(null);
                          }}
                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeletingTestimonialIdx(null)}
                          className="px-1 py-0.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-bold rounded"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingTestimonialIdx(idx)}
                        className="text-neutral-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <textarea
                rows={2}
                value={test.quote}
                onChange={(e) => handleTestimonialChange(idx, 'quote', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white"
                placeholder="Quote text..."
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <input
                  type="text"
                  value={test.author}
                  onChange={(e) => handleTestimonialChange(idx, 'author', e.target.value)}
                  placeholder="Author Name"
                  className="px-2.5 py-1 text-xs border border-neutral-300 rounded bg-white"
                />
                <input
                  type="text"
                  value={test.role}
                  onChange={(e) => handleTestimonialChange(idx, 'role', e.target.value)}
                  placeholder="Role"
                  className="px-2.5 py-1 text-xs border border-neutral-300 rounded bg-white"
                />
                <input
                  type="text"
                  value={test.agency}
                  onChange={(e) => handleTestimonialChange(idx, 'agency', e.target.value)}
                  placeholder="Agency / Brand"
                  className="px-2.5 py-1 text-xs border border-neutral-300 rounded bg-white"
                />
                <input
                  type="text"
                  value={test.country}
                  onChange={(e) => handleTestimonialChange(idx, 'country', e.target.value)}
                  placeholder="Country"
                  className="px-2.5 py-1 text-xs border border-neutral-300 rounded bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
