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
  EyeOff,
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
  Inbox,
  LogIn,
  LogOut,
  UserCheck,
  AlertCircle
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
import { PhotoLibraryManagerTab } from './PhotoLibraryManagerTab';
import { BlogManagerTab } from './BlogManagerTab';
import { GtmConsentManagerTab } from './GtmConsentManagerTab';
import { ItinerariesManagerTab } from './ItinerariesManagerTab';
import { Image as ImageIcon, BookOpen, Tag, Route } from 'lucide-react';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AUTH_STORAGE_KEY = 'baobab_admin_authenticated';

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

  const { currentUser, loginWithGoogle, logout: oauthLogout } = useAuth();

  // Admin login authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem(AUTH_STORAGE_KEY) === 'true' ||
        sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
      );
    } catch {
      return false;
    }
  });

  // Login Form States
  const [adminEmail, setAdminEmail] = useState<string>('tolgakinas@gmail.com');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showImportDialog, setShowImportDialog] = useState<boolean>(false);
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0);
  const [totalInquiriesCount, setTotalInquiriesCount] = useState<number>(0);

  // Fetch inquiries count on modal open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/inquiries')
        .then(r => r.json())
        .then(data => {
          if (data && data.success) {
            setTotalInquiriesCount(data.total || 0);
            setNewInquiriesCount(data.newCount || 0);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

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

  // Handle Admin Login submission
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    const emailTrimmed = adminEmail.trim().toLowerCase();
    const passTrimmed = adminPassword;

    // Verify authorized administrator credentials
    if (emailTrimmed === 'tolgakinas@gmail.com' && passTrimmed === 'Atlas@2014') {
      try {
        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        } else {
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        }
      } catch (err) {
        console.warn('Storage notice:', err);
      }

      setIsAdminAuthenticated(true);
      toggleSuperAdmin(true);
      setIsLoggingIn(false);
      setSaveSuccessMsg('Welcome back, Tolga! Super Admin master session authenticated.');
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    } else {
      setIsLoggingIn(false);
      setLoginError('Invalid administrator credentials. Please check your username and password.');
    }
  };

  // Quick fill helper
  const handleAutoFillAdminCredentials = () => {
    setAdminEmail('tolgakinas@gmail.com');
    setAdminPassword('Atlas@2014');
    setLoginError(null);
  };

  // Admin Logout / Lock Console
  const handleAdminLogout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn('Storage notice:', err);
    }
    setIsAdminAuthenticated(false);
    toggleSuperAdmin(false);
    setAdminPassword('');
    if (oauthLogout) {
      oauthLogout();
    }
  };

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
    { id: 'gtm_consent', label: 'GTM & Cookie CMP', icon: Tag, badge: 'CMP' },
    { id: 'blogs', label: 'Blog & SEO/AEO/AIO', icon: BookOpen, count: content.blogs?.length || 10, badge: 'AI SEO' },
    { id: 'photos', label: 'Photo Library (AI SEO)', icon: ImageIcon, count: (content.customPhotos?.length || 0) + 20, badge: 'AI' },
    { id: 'metrics', label: 'Metrics & Numbers', icon: Hash, count: content.stats.length },
    { id: 'contact', label: 'Contact & Ops', icon: Phone },
    { id: 'trips', label: 'Trips & Expeditions', icon: Compass, count: content.trips.length },
    { id: 'itineraries', label: 'Sample Frameworks', icon: Route, count: content.itineraries?.length || 4, badge: 'AI Generator' },
    { id: 'destinations', label: 'Destinations', icon: MapPin, count: content.destinations.length },
    { id: 'venues', label: 'Venues & Lodges', icon: Building, count: content.venues.length },
    { id: 'services', label: 'Services', icon: Layers, count: content.services.length },
    { id: 'about', label: 'About & FAQ', icon: Award },
    { 
      id: 'inquiries', 
      label: 'Inquiries & CRM', 
      icon: Inbox, 
      count: totalInquiriesCount > 0 ? totalInquiriesCount : undefined, 
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : 'Live' 
    }
  ];

  // If Admin is NOT authenticated with username & password, render the Master Login Gate Screen
  if (!isAdminAuthenticated) {
    return (
      <div 
        className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <div className="bg-[#121316] text-white rounded-2xl max-w-md w-full my-auto overflow-hidden shadow-2xl border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
          {/* Login Header */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#1e1714] p-6 sm:p-7 border-b border-neutral-800 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
              title="Close Login Window"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F05A28] to-orange-700 flex items-center justify-center text-white shadow-lg ring-4 ring-[#F05A28]/20">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F05A28]/20 text-[#F05A28] border border-[#F05A28]/40">
                  TÜRSAB #15764 Master Access
                </span>
                <h2 id="admin-login-title" className="text-lg sm:text-xl font-bold text-white mt-1">
                  Super Admin Console
                </h2>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Enter your authorized master administrator credentials to access the Baobab DMC control center.
            </p>
          </div>

          {/* Login Form Body */}
          <form onSubmit={handleAdminLogin} className="p-6 sm:p-7 space-y-4">
            {loginError && (
              <div className="p-3.5 bg-red-950/70 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block">Authentication Failed</span>
                  <span>{loginError}</span>
                </div>
              </div>
            )}

            {/* Username / Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                Master Admin Email / Username
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="tolgakinas@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-[#F05A28] rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#F05A28] font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-[#F05A28] rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#F05A28] font-mono tracking-wider"
                />
              </div>
            </div>

            {/* Remember Me & Auto-fill Options */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 text-neutral-400 cursor-pointer hover:text-neutral-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-neutral-900 border-neutral-700 text-[#F05A28] focus:ring-[#F05A28]"
                />
                <span>Remember on this browser</span>
              </label>

              <button
                type="button"
                onClick={handleAutoFillAdminCredentials}
                className="text-[11px] text-[#F05A28] hover:text-orange-400 font-semibold transition-colors"
                title="Click to fill credentials (tolgakinas@gmail.com / Atlas@2014)"
              >
                Auto-Fill Credentials
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[#F05A28] hover:bg-[#D94526] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Super Admin Panel'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold rounded-lg transition-colors border border-neutral-800"
              >
                Cancel & Return to Website
              </button>
            </div>
          </form>

          {/* Footer Security Notice */}
          <div className="bg-neutral-950/80 px-6 py-3.5 border-t border-neutral-800/80 text-[11px] text-neutral-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit Encrypted Master Session</span>
            </span>
            <span>Baobab DMC Turkey</span>
          </div>
        </div>
      </div>
    );
  }

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
                Authenticated
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Master control session: <strong className="text-neutral-200">tolgakinas@gmail.com</strong>
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
            onClick={handleAdminLogout}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-red-950/80 text-neutral-300 hover:text-red-400 rounded text-xs font-semibold flex items-center gap-1 border border-neutral-700 transition-colors"
            title="Sign Out & Lock Super Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out / Lock</span>
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

      {/* SUPER ADMIN STATUS BANNER */}
      <div className="bg-neutral-800/90 border-b border-neutral-700 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-300 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Master Admin Access:</span>
            </span>

            <span className="font-bold text-xs text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Authenticated (tolgakinas@gmail.com)</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleAdminLogout}
            className="px-2.5 py-1 bg-neutral-700 hover:bg-red-900/60 text-neutral-200 hover:text-red-200 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Lock Admin Panel</span>
          </button>

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
            {activeAdminTab === 'gtm_consent' && <GtmConsentManagerTab />}
            {activeAdminTab === 'blogs' && <BlogManagerTab />}
            {activeAdminTab === 'photos' && <PhotoLibraryManagerTab />}
            {activeAdminTab === 'metrics' && <MetricsNumbersTab />}
            {activeAdminTab === 'contact' && <CompanyContactTab />}
            {activeAdminTab === 'trips' && <TripsManagerTab />}
            {activeAdminTab === 'itineraries' && <ItinerariesManagerTab />}
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
