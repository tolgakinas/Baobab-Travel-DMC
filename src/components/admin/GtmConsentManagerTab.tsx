import React, { useState } from 'react';
import { useSiteContent, DEFAULT_GTM_CONSENT, GtmConsentSettings } from '../../context/SiteContentContext';
import { 
  ShieldCheck, 
  Tag, 
  Cookie, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Code, 
  RotateCcw, 
  Settings2, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Lock,
  Globe2,
  Sliders,
  Sparkles
} from 'lucide-react';

export const GtmConsentManagerTab: React.FC = () => {
  const { content, updateGtmConsent } = useSiteContent();
  const gtm: GtmConsentSettings = content.gtmConsent || DEFAULT_GTM_CONSENT;

  const [testSuccessNotice, setTestSuccessNotice] = useState<string | null>(null);

  const handleToggleGtm = (enabled: boolean) => {
    updateGtmConsent({ gtmEnabled: enabled });
  };

  const handleGtmIdChange = (id: string) => {
    updateGtmConsent({ gtmId: id.trim().toUpperCase() });
  };

  const handleProviderChange = (provider: GtmConsentSettings['cmpProvider']) => {
    updateGtmConsent({ cmpProvider: provider });
  };

  const handleSetStrictGdpr = () => {
    updateGtmConsent({
      consentModeV2Enabled: true,
      defaultAnalyticsStorage: 'denied',
      defaultAdStorage: 'denied',
      defaultAdUserData: 'denied',
      defaultAdPersonalization: 'denied',
    });
    setTestSuccessNotice('Google Consent Mode v2 set to Strict EU/GDPR & KVKK Compliance (All Denied by default).');
    setTimeout(() => setTestSuccessNotice(null), 3500);
  };

  const handleSetPermissive = () => {
    updateGtmConsent({
      consentModeV2Enabled: true,
      defaultAnalyticsStorage: 'granted',
      defaultAdStorage: 'granted',
      defaultAdUserData: 'granted',
      defaultAdPersonalization: 'granted',
    });
    setTestSuccessNotice('Google Consent Mode v2 set to Permissive Default.');
    setTimeout(() => setTestSuccessNotice(null), 3500);
  };

  const handleResetUserConsent = () => {
    try {
      localStorage.removeItem('baobab_cookie_consent_choice_v1');
      // Trigger event to reopen banner if closed
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
      setTestSuccessNotice('Browser consent cookie cleared! The banner is now active for live testing.');
      setTimeout(() => setTestSuccessNotice(null), 4000);
    } catch {
      setTestSuccessNotice('Notice: LocalStorage clear attempted.');
    }
  };

  const isGtmValid = gtm.gtmId?.startsWith('GTM-') && gtm.gtmId.length >= 7;

  return (
    <div className="space-y-8">
      {/* SECTION 1: Google Tag Manager (GTM) Container */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900">
                  Google Tag Manager (GTM)
                </h3>
                {gtm.gtmEnabled ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600">
                    Disabled
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500">
                Deploy tags, conversion tracking, Meta Pixel, and analytics events without touching source code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://tagmanager.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Open GTM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://tagassistant.google.com/?url=${encodeURIComponent(content.branding?.canonicalDomain || 'https://baobabdmc.com')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 transition-colors"
            >
              <span>Tag Assistant</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Master GTM Toggle & Container ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                GTM Master Status
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gtm.gtmEnabled}
                  onChange={(e) => handleToggleGtm(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F05A28]"></div>
              </label>
            </div>
            <p className="text-xs text-neutral-500">
              When enabled, the Google Tag Manager container snippet is injected directly into the document header.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              GTM Container ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={gtm.gtmId || ''}
                onChange={(e) => handleGtmIdChange(e.target.value)}
                placeholder="GTM-XXXXXXX"
                className={`w-full px-3.5 py-2 text-xs font-mono font-bold rounded-lg border focus:outline-none ${
                  gtm.gtmId && !isGtmValid
                    ? 'border-amber-400 bg-amber-50/50 text-amber-900 focus:border-amber-500'
                    : isGtmValid
                    ? 'border-emerald-400 bg-emerald-50/30 text-emerald-900 focus:border-emerald-500'
                    : 'border-neutral-300 focus:border-[#F05A28]'
                }`}
              />
              {isGtmValid && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-2.5" />
              )}
            </div>
            {gtm.gtmId && !isGtmValid ? (
              <p className="text-[11px] text-amber-600 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Container ID must start with "GTM-" (e.g., GTM-K893XZP)</span>
              </p>
            ) : (
              <p className="text-[11px] text-neutral-500">
                Found on your GTM workspace dashboard in the top right corner.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Consent Management Platform (CMP) & Cookie Accounts */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-6">
        <div className="pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#F05A28] flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Consent Management Platform (CMP) Provider
              </h3>
              <p className="text-xs text-neutral-500">
                Select your CMP service provider or use the built-in GDPR/KVKK consent system.
              </p>
            </div>
          </div>
        </div>

        {/* Provider Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              id: 'built_in',
              name: 'Built-in Banner',
              sub: 'Zero Config / Free',
              desc: 'Native GDPR & KVKK modal with Consent Mode v2 sync',
              badge: 'Recommended',
            },
            {
              id: 'cookiebot',
              name: 'Cookiebot',
              sub: 'Usercentrics',
              desc: 'Connect your Cookiebot Domain Group ID',
            },
            {
              id: 'onetrust',
              name: 'OneTrust',
              sub: 'Enterprise',
              desc: 'Integrate OneTrust domain script SDK stub',
            },
            {
              id: 'termly',
              name: 'Termly',
              sub: 'All-in-one',
              desc: 'Connect Termly Website UUID script',
            },
            {
              id: 'custom',
              name: 'Custom Script',
              sub: 'Raw Code',
              desc: 'Paste custom HTML/JS banner code directly',
            },
          ].map((provider) => {
            const isSelected = gtm.cmpProvider === provider.id;
            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => handleProviderChange(provider.id as any)}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#F05A28] bg-orange-50/50 shadow-xs ring-1 ring-[#F05A28]'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-neutral-900">{provider.name}</span>
                    {provider.badge && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#F05A28] text-white">
                        {provider.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-500 block mb-1.5">
                    {provider.sub}
                  </span>
                  <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">
                    {provider.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-end">
                  <span className={`text-[10px] font-bold flex items-center gap-1 ${isSelected ? 'text-[#F05A28]' : 'text-neutral-400'}`}>
                    {isSelected ? <Check className="w-3 h-3" /> : null}
                    <span>{isSelected ? 'Active' : 'Select'}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Provider Input Details */}
        {gtm.cmpProvider !== 'built_in' && (
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-4 animate-fadeIn">
            {gtm.cmpProvider === 'cookiebot' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Cookiebot Domain Group ID (data-cbid)
                </label>
                <input
                  type="text"
                  value={gtm.cmpAccountId || ''}
                  onChange={(e) => updateGtmConsent({ cmpAccountId: e.target.value.trim() })}
                  placeholder="e.g. 00000000-0000-0000-0000-000000000000"
                  className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none bg-white"
                />
                <p className="text-[11px] text-neutral-500">
                  Located in your Cookiebot dashboard under <strong>Settings &gt; Your domain group &gt; Domain group ID</strong>.
                </p>
              </div>
            )}

            {gtm.cmpProvider === 'onetrust' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  OneTrust Domain Script ID (data-domain-script)
                </label>
                <input
                  type="text"
                  value={gtm.cmpAccountId || ''}
                  onChange={(e) => updateGtmConsent({ cmpAccountId: e.target.value.trim() })}
                  placeholder="e.g. a1b2c3d4-e5f6-7890-abcd-ef1234567890"
                  className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none bg-white"
                />
                <p className="text-[11px] text-neutral-500">
                  From OneTrust Cookie Compliance under <strong>Scripts &gt; Production Script</strong>.
                </p>
              </div>
            )}

            {gtm.cmpProvider === 'termly' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Termly Website UUID (data-website-uuid)
                </label>
                <input
                  type="text"
                  value={gtm.cmpAccountId || ''}
                  onChange={(e) => updateGtmConsent({ cmpAccountId: e.target.value.trim() })}
                  placeholder="e.g. 12345678-1234-1234-1234-123456789012"
                  className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none bg-white"
                />
                <p className="text-[11px] text-neutral-500">
                  From your Termly dashboard under <strong>Consent Management &gt; Embed Code</strong>.
                </p>
              </div>
            )}

            {gtm.cmpProvider === 'custom' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Custom CMP Embed Script / HTML Code</span>
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    Supports &lt;script&gt; tags
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={gtm.customCmpScript || ''}
                  onChange={(e) => updateGtmConsent({ customCmpScript: e.target.value })}
                  placeholder={`<script type="text/javascript" src="https://my-cmp-provider.com/consent.js" async></script>`}
                  className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none bg-neutral-900 text-emerald-400 placeholder:text-neutral-600"
                />
                <p className="text-[11px] text-neutral-500">
                  Paste the snippet supplied by Iubenda, Axeptio, Usercentrics, Klaro, or your legal compliance partner. It will be dynamically evaluated on the website.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 3: Google Consent Mode v2 Settings */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900">
                  Google Consent Mode v2 Directives
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
                  Required in EU / UK / TR
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Pre-configures default tracking parameters before user choices are registered.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSetStrictGdpr}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors"
            >
              Strict GDPR Preset
            </button>
            <button
              type="button"
              onClick={handleSetPermissive}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Permissive Preset
            </button>
          </div>
        </div>

        {/* 4 Consent Mode v2 Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Parameter 1: analytics_storage */}
          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">analytics_storage</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                gtm.defaultAnalyticsStorage === 'denied' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {gtm.defaultAnalyticsStorage}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Controls cookies for Google Analytics visits & pageviews.
            </p>
            <select
              value={gtm.defaultAnalyticsStorage}
              onChange={(e) => updateGtmConsent({ defaultAnalyticsStorage: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
            >
              <option value="denied">denied (Recommended for EU)</option>
              <option value="granted">granted</option>
            </select>
          </div>

          {/* Parameter 2: ad_storage */}
          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">ad_storage</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                gtm.defaultAdStorage === 'denied' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {gtm.defaultAdStorage}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Controls advertising cookies and tracking beacons.
            </p>
            <select
              value={gtm.defaultAdStorage}
              onChange={(e) => updateGtmConsent({ defaultAdStorage: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
            >
              <option value="denied">denied (Recommended for EU)</option>
              <option value="granted">granted</option>
            </select>
          </div>

          {/* Parameter 3: ad_user_data */}
          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">ad_user_data</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                gtm.defaultAdUserData === 'denied' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {gtm.defaultAdUserData}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Controls sending user data to Google for advertising purposes.
            </p>
            <select
              value={gtm.defaultAdUserData}
              onChange={(e) => updateGtmConsent({ defaultAdUserData: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
            >
              <option value="denied">denied (Recommended for EU)</option>
              <option value="granted">granted</option>
            </select>
          </div>

          {/* Parameter 4: ad_personalization */}
          <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">ad_personalization</span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                gtm.defaultAdPersonalization === 'denied' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {gtm.defaultAdPersonalization}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Controls personalized remarketing and tailored ads.
            </p>
            <select
              value={gtm.defaultAdPersonalization}
              onChange={(e) => updateGtmConsent({ defaultAdPersonalization: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
            >
              <option value="denied">denied (Recommended for EU)</option>
              <option value="granted">granted</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 4: Built-in Cookie Consent Banner Customization & Live Preview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Consent Banner Copy & Customization
              </h3>
              <p className="text-xs text-neutral-500">
                Customize titles, explanation messages, button text, and test live banner appearance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetUserConsent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset & Test Live Banner</span>
            </button>
          </div>
        </div>

        {testSuccessNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center justify-between animate-fadeIn">
            <span>{testSuccessNotice}</span>
            <button onClick={() => setTestSuccessNotice(null)} className="text-emerald-700 hover:text-emerald-900">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Banner Heading Title
            </label>
            <input
              type="text"
              value={gtm.bannerTitle || ''}
              onChange={(e) => updateGtmConsent({ bannerTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Privacy Policy / KVKK URL Link
            </label>
            <input
              type="text"
              value={gtm.privacyPolicyUrl || ''}
              onChange={(e) => updateGtmConsent({ privacyPolicyUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Banner Explanation Message
            </label>
            <textarea
              rows={3}
              value={gtm.bannerMessage || ''}
              onChange={(e) => updateGtmConsent({ bannerMessage: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              "Accept All" Button Text
            </label>
            <input
              type="text"
              value={gtm.acceptButtonText || 'Accept All'}
              onChange={(e) => updateGtmConsent({ acceptButtonText: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              "Essential Only" Button Text
            </label>
            <input
              type="text"
              value={gtm.rejectButtonText || 'Essential Only'}
              onChange={(e) => updateGtmConsent({ rejectButtonText: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:border-[#F05A28] focus:outline-none"
            />
          </div>
        </div>

        {/* Live Banner Mockup Card */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#F05A28]" />
            <span>Interactive Live Preview (Visual Representation on Website)</span>
          </label>
          <div className="p-4 rounded-xl bg-neutral-900 text-white border border-neutral-800 shadow-xl max-w-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 text-[#F05A28]" />
                <span className="text-xs font-bold">{gtm.bannerTitle || 'Privacy & Cookie Preferences'}</span>
              </div>
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                GDPR & KVKK
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              {gtm.bannerMessage}
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#F05A28] text-white text-[11px] font-bold rounded">
                {gtm.acceptButtonText || 'Accept All'}
              </span>
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 text-[11px] font-medium rounded border border-neutral-700">
                {gtm.rejectButtonText || 'Essential Only'}
              </span>
              <span className="px-2 py-1 text-neutral-400 text-[11px]">
                {gtm.settingsButtonText || 'Preferences'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
