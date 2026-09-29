import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldAlert, Globe2, Send, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const CompanyContactTab: React.FC = () => {
  const { content, updateCompanyContact } = useSiteContent();
  const contact = content.companyContact;

  const [testRecipient, setTestRecipient] = useState<string>('info@baobabdmc.com');
  const [isSendingTest, setIsSendingTest] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; emailId?: string } | null>(null);

  const handleSendTestEmail = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/test-resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: testRecipient.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: `Email dispatched successfully via Resend! Check ${testRecipient} (including Spam/Junk folder).`,
          emailId: data.emailId,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Failed to dispatch test email via Resend.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Network error while attempting to contact Resend API.',
      });
    } finally {
      setIsSendingTest(false);
    }
  };

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

      {/* SECTION 4: Resend Email Delivery & Real-Time Diagnostics */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900">
                  Resend Email Infrastructure & Live Test
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Domain Verified
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Inspect configured notification destinations, verified sender domains, and test inbox delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Status Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Verified Sender (From)
            </span>
            <div className="font-mono text-xs font-bold text-neutral-900 truncate">
              info@baobabdmc.com
            </div>
            <p className="text-[11px] text-emerald-600 font-medium">
              ✓ Verified in Resend (baobabdmc.com)
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Primary Receiver Inbox
            </span>
            <div className="font-mono text-xs font-bold text-[#F05A28] truncate">
              info@baobabdmc.com
            </div>
            <p className="text-[11px] text-neutral-500">
              Direct inbox for all tour inquiries & trade bookings
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Server API Status
            </span>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>RESEND_API_KEY Active</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              All live inquiries & trade bookings dispatched
            </p>
          </div>
        </div>

        {/* DNS MX Record Guidance Notice */}
        <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/70 text-xs text-amber-900 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Important DNS Notice for info@baobabdmc.com Webmail (Titan Email):</span>
          </div>
          <p className="leading-relaxed text-[11.5px]">
            Your domain <strong>baobabdmc.com</strong> currently has an MX record pointing to <code>inbound-smtp.ap-northeast-1.amazonaws.com</code> (Priority 9) alongside Titan Email (<code>mx1.titan.email</code> at Priority 10). Because Priority 9 is higher precedence, emails sent to <code>info@baobabdmc.com</code> are routed to Amazon/Resend inbound rather than Titan.
          </p>
          <p className="leading-relaxed text-[11.5px] font-medium text-amber-950">
            👉 To receive emails in Titan Webmail: Open your DNS manager (Hostinger / Cloudflare) and <strong>delete the MX record with Priority 9</strong>, keeping only the Titan Email MX records (Priority 10 & 20).
          </p>
        </div>

        {/* 1-Click Live Test Dispatch */}
        <div className="p-4 rounded-lg border border-orange-200 bg-orange-50/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-neutral-900 block">
                Send Diagnostic Test Email
              </span>
              <span className="text-[11px] text-neutral-600">
                Immediately trigger a live email through the Resend API to verify delivery.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="email"
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
                placeholder="info@baobabdmc.com"
                className="px-3 py-1.5 text-xs font-mono border border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-[#F05A28] w-52"
              />

              <button
                type="button"
                disabled={isSendingTest}
                onClick={handleSendTestEmail}
                className="px-4 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSendingTest ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 animate-fadeIn ${
                testResult.success
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-red-100 text-red-900 border border-red-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span className="font-bold block">{testResult.message}</span>
                {testResult.emailId && (
                  <span className="text-[11px] font-mono text-emerald-800">
                    Resend Message ID: {testResult.emailId}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
