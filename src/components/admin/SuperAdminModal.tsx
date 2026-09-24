import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Key, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  X, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Eye,
  Minimize2,
  Maximize2,
  ExternalLink,
  Lock,
  Unlock,
  Cloud,
  Layers,
  Hash,
  Phone,
  Compass,
  MapPin,
  Building,
  Award,
  Inbox
} from 'lucide-react';
import { HeroBrandingTab } from './HeroBrandingTab';
import { MetricsNumbersTab } from './MetricsNumbersTab';
import { CompanyContactTab } from './CompanyContactTab';
import { TripsManagerTab } from './TripsManagerTab';
import { DestinationsManagerTab } from './DestinationsManagerTab';
import { VenuesManagerTab } from './VenuesManagerTab';
import { ServicesManagerTab } from './ServicesManagerTab';
import { AboutTestimonialsTab } from './AboutTestimonialsTab';
import { InquiriesCrmTab } from './InquiriesCrmTab';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuperAdminModal: React.FC<SuperAdminModalProps> = ({
  isOpen,
  onClose
}) => {
  const { 
    content, 
    isSuperAdmin, 
    toggleSuperAdmin, 
    isDirty, 
    lastSavedAt,
    saveChanges, 
    resetToDefaults, 
    exportConfigJson, 
    importConfigJson,
    syncToFirestore,
    activeAdminTab,
    setActiveAdminTab
  } = useSiteContent();

  const { currentUser, loginWithGoogle, logout } = useAuth();

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showImportDialog, setShowImportDialog] = useState<boolean>(false);
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');

  // Close on Escape if not minimized
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isMinimized && !showImportDialog) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, showImportDialog, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveChanges();
    setSaveSuccessMsg('Website content changes saved successfully to local storage!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleCloudSync = async () => {
    setIsCloudSyncing(true);
    const res = await syncToFirestore();
    setIsCloudSyncing(false);
    if (res.success) {
      setSaveSuccessMsg('Successfully synced website configuration with Firestore cloud database!');
    } else {
      setSaveSuccessMsg('Saved locally. Cloud notice: ' + (res.error || 'Check Firestore rules'));
    }
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baobab_dmc_website_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportSubmit = () => {
    const result = importConfigJson(importJsonText);
    if (result.success) {
      setShowImportDialog(false);
      setImportJsonText('');
      setSaveSuccessMsg('Imported website configuration applied successfully!');
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    } else {
      alert(result.error || 'Failed to import JSON configuration');
    }
  };

  const navTabs = [
    { id: 'hero', label: 'Hero & Branding', icon: Sparkles, count: content.hero.slides.length },
    { id: 'metrics', label: 'Metrics & Numbers', icon: Hash, count: content.stats.length },
    { id: 'contact', label: 'Contact & Ops', icon: Phone },
    { id: 'trips', label: 'Trips & Expeditions', icon: Compass, count: content.trips.length },
    { id: 'destinations', label: 'Destinations', icon: MapPin, count: content.destinations.length },
    { id: 'venues', label: 'Venues & Lodges', icon: Building, count: content.venues.length },
    { id: 'services', label: 'Services', icon: Layers, count: content.services.length },
    { id: 'about', label: 'About & FAQ', icon: Award },
    { id: 'inquiries', label: 'Inquiries & CRM', icon: Inbox, badge: 'Live' }
  ];

  // Minimized Docked Widget View (allows viewing website live while keeping control panel accessible)
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-[100] bg-neutral-900 text-white rounded-lg shadow-2xl p-4 border border-[#F05A28]/50 flex items-center gap-4 animate-bounce-short">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Super Admin: Live Preview Mode
          </span>
        </div>

        {isDirty && (
          <span className="text-[10px] bg-[#F05A28] px-2 py-0.5 rounded font-bold uppercase">
            Unsaved Changes
          </span>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-2.5 py-1 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold rounded flex items-center gap-1"
          >
            <Save className="w-3 h-3" />
            <span>Save</span>
          </button>

          <button
            onClick={() => setIsMinimized(false)}
            className="p-1 text-neutral-300 hover:text-white rounded"
            title="Expand Admin Panel"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex flex-col justify-between overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="super-admin-modal-title"
    >
      {/* Top Header Bar */}
      <div className="bg-neutral-900 text-white border-b border-neutral-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#F05A28] flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id="super-admin-modal-title" className="text-sm sm:text-base font-bold text-white tracking-wide">
                Baobab DMC Super Admin Backend Control Panel
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Control
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Direct master control over all website content: photos, texts, numbers, trips & inquiries.
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {isDirty && (
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#F05A28]/20 text-[#F05A28] border border-[#F05A28]/40 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>Unsaved Edits</span>
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            title="Save changes to website state"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>

          <button
            onClick={handleCloudSync}
            disabled={isCloudSyncing}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded border border-neutral-700 transition-colors"
            title="Sync with Firestore Cloud Database"
          >
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isCloudSyncing ? 'Syncing...' : 'Cloud Sync'}</span>
          </button>

          <button
            onClick={handleDownloadBackup}
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded border border-neutral-700 transition-colors"
            title="Download JSON Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>

          <button
            onClick={() => setShowImportDialog(true)}
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded border border-neutral-700 transition-colors"
            title="Import JSON Backup"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            title="Minimize to Dock (Live Preview Website)"
          >
            <Minimize2 className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* SUPER ADMIN LOGIN & AUTHORIZATION BANNER (Direct toggle as requested + OAuth ready) */}
      <div className="bg-neutral-800/90 border-b border-neutral-700 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-300 shrink-0">
        <div className="flex items-center gap-3">
          {/* Direct Super Admin Toggle Switch */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
              {isSuperAdmin ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
              )}
              <span>Super Admin Access:</span>
            </span>

            <button
              onClick={() => toggleSuperAdmin()}
              role="switch"
              aria-checked={isSuperAdmin}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isSuperAdmin ? 'bg-emerald-600' : 'bg-neutral-600'
              }`}
              title="Toggle Super Admin authorization mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isSuperAdmin ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>

            <span className={`font-semibold text-xs ${isSuperAdmin ? 'text-emerald-400 font-bold' : 'text-neutral-400'}`}>
              {isSuperAdmin ? 'ACTIVE (Unlocked)' : 'OFF'}
            </span>
          </div>

          <span className="hidden md:inline text-neutral-500">•</span>

          <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
            <span className="font-mono text-[11px]">
              {currentUser?.email || 'tolgakinas@gmail.com (Master)'}
            </span>
            <span className="text-[10px] text-neutral-500">
              (Direct Developer Super Admin Mode • OAuth Login Integration ready)
            </span>
          </div>
        </div>

        {/* Quick OAuth action or Reset action */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {!currentUser ? (
            <button
              onClick={() => loginWithGoogle()}
              className="px-2.5 py-1 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <Key className="w-3 h-3 text-[#F05A28]" />
              <span>Connect Google OAuth</span>
            </button>
          ) : (
            <button
              onClick={() => logout()}
              className="px-2 py-0.5 text-neutral-400 hover:text-white text-[11px]"
            >
              Sign Out
            </button>
          )}

          <button
            onClick={() => setShowResetConfirmDialog(true)}
            className="px-2 py-1 text-neutral-400 hover:text-amber-400 text-[11px] font-medium flex items-center gap-1 transition-colors"
            title="Restore original factory content"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-bold flex items-center justify-between shrink-0 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button onClick={() => setSaveSuccessMsg(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Main Body with Sidebar Navigation and Tab Content */}
      <div className="flex-1 flex overflow-hidden bg-neutral-100">
        {/* Left Navigation Sidebar */}
        <div className="w-56 sm:w-64 bg-white border-r border-neutral-200 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Content Domains
            </div>

            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md flex items-center justify-between text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#F05A28] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#F05A28]'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>

                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}

                  {tab.badge && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-3 border-t border-neutral-100 text-[11px] text-neutral-500 bg-neutral-50">
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <span className="font-semibold text-emerald-600">Online</span>
            </div>
            {lastSavedAt && (
              <div className="flex items-center justify-between mt-1 text-[10px] text-neutral-400">
                <span>Last Saved:</span>
                <span>{lastSavedAt}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {activeAdminTab === 'hero' && <HeroBrandingTab />}
            {activeAdminTab === 'metrics' && <MetricsNumbersTab />}
            {activeAdminTab === 'contact' && <CompanyContactTab />}
            {activeAdminTab === 'trips' && <TripsManagerTab />}
            {activeAdminTab === 'destinations' && <DestinationsManagerTab />}
            {activeAdminTab === 'venues' && <VenuesManagerTab />}
            {activeAdminTab === 'services' && <ServicesManagerTab />}
            {activeAdminTab === 'about' && <AboutTestimonialsTab />}
            {activeAdminTab === 'inquiries' && <InquiriesCrmTab />}
          </div>
        </div>
      </div>

      {/* JSON Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6 border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">
                Import Website Configuration (JSON)
              </h3>
              <button onClick={() => setShowImportDialog(false)} className="text-neutral-400 hover:text-neutral-900">
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              Paste a previously exported JSON backup to instantly restore photos, texts, and numbers across the entire website.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON content here..."
              className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded focus:border-[#F05A28] focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportDialog(false)}
                className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                disabled={!importJsonText.trim()}
                className="px-4 py-1.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase rounded disabled:opacity-50"
              >
                Apply Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Defaults Confirmation Dialog Modal */}
      {showResetConfirmDialog && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border border-neutral-200 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Reset Website to Defaults?
                </h3>
                <p className="text-xs text-neutral-500">
                  Restore all original factory texts, photos, and tours.
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 bg-amber-50 p-3 rounded border border-amber-200">
              This action will revert all custom edits across Hero slides, guided tours, destinations, venues, and contact information back to the original default state.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirmDialog(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setShowResetConfirmDialog(false);
                  setSaveSuccessMsg('Factory default content restored successfully.');
                  setTimeout(() => setSaveSuccessMsg(null), 3500);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded shadow-xs"
              >
                Yes, Reset Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
