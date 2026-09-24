import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldAlert, Globe2 } from 'lucide-react';

export const CompanyContactTab: React.FC = () => {
  const { content, updateCompanyContact } = useSiteContent();
  const contact = content.companyContact;

  return (
    <div className="space-y-6">
      {/* SECTION 1: Phone Numbers & Direct Messenger Channels */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
          <Phone className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Direct Phone Numbers & WhatsApp Hotlines
            </h3>
            <p className="text-xs text-neutral-500">
              Manage international calling numbers, direct click-to-call links, and WhatsApp dispatch lines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Turkey HQ Phone */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Turkiye HQ Display Phone
            </label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => updateCompanyContact({ 
                phone: e.target.value,
                turkiyeOffice: { ...contact.turkiyeOffice, phone: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Turkiye HQ Raw Tel Link
            </label>
            <input
              type="text"
              value={contact.phoneRaw}
              onChange={(e) => updateCompanyContact({ 
                phoneRaw: e.target.value,
                turkiyeOffice: { ...contact.turkiyeOffice, phoneRaw: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded font-mono focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          {/* WhatsApp Direct */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              WhatsApp Display Number
            </label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => updateCompanyContact({ 
                whatsapp: e.target.value,
                turkiyeOffice: { ...contact.turkiyeOffice, whatsapp: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded text-emerald-700 font-medium focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              WhatsApp Raw digits (No '+' or spaces)
            </label>
            <input
              type="text"
              value={contact.whatsappRaw}
              onChange={(e) => updateCompanyContact({ 
                whatsappRaw: e.target.value,
                turkiyeOffice: { ...contact.turkiyeOffice, whatsappRaw: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded font-mono focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          {/* USA Office Phone */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              USA Branch Display Phone
            </label>
            <input
              type="text"
              value={contact.phoneUs}
              onChange={(e) => updateCompanyContact({ 
                phoneUs: e.target.value,
                usaOffice: { ...contact.usaOffice, phone: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              USA Branch Raw Tel Link
            </label>
            <input
              type="text"
              value={contact.phoneUsRaw}
              onChange={(e) => updateCompanyContact({ 
                phoneUsRaw: e.target.value,
                usaOffice: { ...contact.usaOffice, phoneRaw: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded font-mono focus:border-[#F05A28] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Email Inboxes & Operating Hours */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
          <Mail className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Official Email Inboxes & Ground Desk Schedule
            </h3>
            <p className="text-xs text-neutral-500">
              Configure operations email routing and published support business hours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Operations & Inquiries Primary Email
            </label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateCompanyContact({ email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none font-semibold text-neutral-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              B2B Partner Dedicated Inbox
            </label>
            <input
              type="email"
              value={contact.b2bEmail || 'b2b@baobabdmc.com'}
              onChange={(e) => updateCompanyContact({ b2bEmail: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Published Business Operating Hours
            </label>
            <input
              type="text"
              value={contact.businessHours}
              onChange={(e) => updateCompanyContact({ businessHours: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              24/7 Priority Emergency Flight & Medical Dispatch Line
            </label>
            <input
              type="text"
              value={contact.emergencyDesk || '24/7 Priority Emergency Flight & Medical Dispatch: +90 544 836 28 45'}
              onChange={(e) => updateCompanyContact({ emergencyDesk: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Office Addresses */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
          <MapPin className="w-5 h-5 text-[#F05A28]" />
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              HQ and Representative Branch Office Addresses
            </h3>
            <p className="text-xs text-neutral-500">
              Official physical headquarters in Istanbul and branch representative office in Wyoming, USA.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F05A28]" />
              <span>Turkiye Headquarters (HQ)</span>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Office Label
              </label>
              <input
                type="text"
                value={contact.turkiyeOffice.title}
                onChange={(e) => updateCompanyContact({ 
                  turkiyeOffice: { ...contact.turkiyeOffice, title: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                value={contact.turkiyeOffice.address}
                onChange={(e) => updateCompanyContact({ 
                  turkiyeOffice: { ...contact.turkiyeOffice, address: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-600" />
              <span>United States Branch (USA)</span>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Office Label
              </label>
              <input
                type="text"
                value={contact.usaOffice.title}
                onChange={(e) => updateCompanyContact({ 
                  usaOffice: { ...contact.usaOffice, title: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                value={contact.usaOffice.address}
                onChange={(e) => updateCompanyContact({ 
                  usaOffice: { ...contact.usaOffice, address: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
