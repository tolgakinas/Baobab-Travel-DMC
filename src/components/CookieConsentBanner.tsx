import React, { useState, useEffect } from 'react';
import { useSiteContent, DEFAULT_GTM_CONSENT } from '../context/SiteContentContext';
import { ShieldCheck, Cookie, Settings, Check, X, ChevronRight, Lock, ExternalLink } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_STORAGE_KEY = 'baobab_cookie_consent_choice_v1';

export const CookieConsentBanner: React.FC = () => {
  const { content } = useSiteContent();
  const gtm = content.gtmConsent || DEFAULT_GTM_CONSENT;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Check consent status on mount
  useEffect(() => {
    // Only show if banner is enabled and provider is built_in or custom without external blocker
    if (!gtm.bannerEnabled) {
      setIsVisible(false);
      return;
    }

    if (gtm.cmpProvider !== 'built_in' && gtm.cmpProvider !== 'custom') {
      // Third party CMP like Cookiebot or OneTrust handles its own UI
      setIsVisible(false);
      return;
    }

    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Slight delay for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 900);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        if (parsed?.preferences) {
          setPreferences(parsed.preferences);
        }
      }
    } catch {
      setIsVisible(true);
    }
  }, [gtm.bannerEnabled, gtm.cmpProvider]);

  // Listen to open-cookie-settings custom window event (e.g. from footer link)
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowPreferencesModal(true);
      setIsVisible(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  // Dispatch consent updates to Google Consent Mode v2 and GTM dataLayer
  const applyConsentMode = (analytics: boolean, marketing: boolean) => {
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
      });
    }

    // Push standard GTM event
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: 'consent_updated',
        consent_analytics: analytics,
        consent_marketing: marketing,
      });
    }
  };

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const newPrefs: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
    };
    setPreferences(newPrefs);
    applyConsentMode(analytics, marketing);

    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          choice: analytics && marketing ? 'all' : !analytics && !marketing ? 'essential' : 'custom',
          preferences: newPrefs,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn('Could not write consent to localStorage:', e);
    }

    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectNonEssential = () => {
    saveConsent(false, false);
  };

  const handleSaveCustomPreferences = () => {
    saveConsent(preferences.analytics, preferences.marketing);
  };

  if (!isVisible && !showPreferencesModal) return null;

  return (
    <>
      {/* Floating Bottom Cookie Consent Banner */}
      {isVisible && !showPreferencesModal && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-[90] bg-neutral-900/95 text-white backdrop-blur-md rounded-xl p-5 border border-neutral-700/80 shadow-2xl animate-slideUp"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#F05A28]/20 border border-[#F05A28]/30 flex items-center justify-center shrink-0 text-[#F05A28]">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {gtm.bannerTitle || 'Privacy & Cookie Preferences'}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  GDPR & KVKK
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {gtm.bannerMessage ||
                  'We use cookies and Google services to evaluate performance and provide seamless B2B partner dispatch in compliance with international privacy regulations.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{gtm.acceptButtonText || 'Accept All'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 transition-colors"
                >
                  <span>{gtm.rejectButtonText || 'Essential Only'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreferencesModal(true)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>{gtm.settingsButtonText || 'Preferences'}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Customization Modal */}
      {showPreferencesModal && (
        <div 
          className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
        >
          <div className="bg-white text-neutral-900 rounded-xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A28] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="cookie-preferences-title" className="text-base font-bold text-neutral-900">
                    Cookie & Consent Settings
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Customize your privacy preferences for this browser
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {/* Category 1: Strictly Necessary */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">Strictly Necessary Cookies</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Essential for website security, session persistence, language routing, and core navigation. Cannot be deactivated.
                  </p>
                </div>
                <div className="pt-0.5 shrink-0">
                  <Lock className="w-4 h-4 text-neutral-400" />
                </div>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-white flex items-start justify-between gap-3 hover:border-neutral-300 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">Analytics & Performance</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      Google Analytics
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Collects anonymized traffic statistics and pageview journeys to evaluate B2B tour inquiries and improve response times.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F05A28]"></div>
                </label>
              </div>

              {/* Category 3: Marketing & Targeted Personalization */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-white flex items-start justify-between gap-3 hover:border-neutral-300 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">Marketing & Partner Personalization</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      Google Ads / GTM
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Used to measure advertising campaign efficacy and display relevant wholesale Turkey travel programs to travel advisors.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F05A28]"></div>
                </label>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
              <a
                href={gtm.privacyPolicyUrl || '#about'}
                onClick={() => setShowPreferencesModal(false)}
                className="text-xs text-[#F05A28] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Privacy & KVKK Policy</span>
                <ChevronRight className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded-lg font-medium"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  className="px-4 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
