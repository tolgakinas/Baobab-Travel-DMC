import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Destination, 
  DmcService, 
  SampleItinerary, 
  VenueShowcase, 
  AtlasTrip 
} from '../types';
import { 
  DMC_STATS, 
  DESTINATIONS as DEFAULT_DESTINATIONS, 
  DMC_SERVICES as DEFAULT_SERVICES, 
  SAMPLE_ITINERARIES as DEFAULT_ITINERARIES, 
  EXCLUSIVE_VENUES as DEFAULT_VENUES, 
  COMPANY_CONTACT as DEFAULT_COMPANY_CONTACT,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQ_ITEMS as DEFAULT_FAQ_ITEMS
} from '../data/dmcData';
import { ATLAS_TURKEY_TRIPS as DEFAULT_TRIPS } from '../data/tripsData';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface HeroSlide {
  image: string;
  location: string;
  title: string;
  subtitle: string;
  destId: string;
}

export interface HeroSettings {
  badgeText: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaRequestText: string;
  ctaConsultationText: string;
  ctaExploreText: string;
  slides: HeroSlide[];
}

export interface BrandingSettings {
  companyName: string;
  operatorSubtitle: string;
  tursabNumber: string;
  tursabGrade: string;
  foundedYear: number;
  tagline: string;
}

export interface StatItem {
  value: string;
  label: string;
  sub: string;
}

export interface PillarItem {
  title: string;
  desc: string;
  icon: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  agency?: string;
  country?: string;
  company?: string;
  badge?: string;
  rating?: number;
}

export interface AboutSettings {
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  pillars: PillarItem[];
  testimonials: TestimonialItem[];
  faqItems: typeof DEFAULT_FAQ_ITEMS;
}

export interface SiteContentData {
  branding: BrandingSettings;
  hero: HeroSettings;
  stats: StatItem[];
  companyContact: typeof DEFAULT_COMPANY_CONTACT;
  trips: AtlasTrip[];
  destinations: Destination[];
  venues: VenueShowcase[];
  services: DmcService[];
  about: AboutSettings;
}

export interface PhotoPreset {
  category: string;
  photos: {
    url: string;
    title: string;
    location: string;
  }[];
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=2400&q=90',
    location: 'Cappadocia, Central Anatolia',
    title: 'Surreal Lunar Valleys & Dawn Balloon Flights',
    subtitle: 'Small group valley trail hikes, sunrise balloons, and authentic boutique cave hotels.',
    destId: 'cappadocia'
  },
  {
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2000&q=90',
    location: 'Bosphorus Strait, Istanbul',
    title: 'Historic Quarters & Hidden Artisan Courtyards',
    subtitle: 'Small group cultural walks, Bosphorus sunset boats, and local culinary trails.',
    destId: 'istanbul'
  },
  {
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=90',
    location: 'Bodrum, Aegean Coast',
    title: 'Wooden Gulet Sailing & Secluded Coves',
    subtitle: 'Intimate handcrafted wooden gulets, swimming in aquamarine bays, and coastal walks.',
    destId: 'bodrum'
  },
  {
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=2000&q=90',
    location: 'Ancient Ephesus, Aegean',
    title: 'Classical Antiquity & Coastal Vineyards',
    subtitle: 'Scholar-guided Roman avenues, Urla artisan wineries, and charming stone villages.',
    destId: 'ephesus'
  }
];

export const PHOTO_PRESET_LIBRARY: PhotoPreset[] = [
  {
    category: 'Cappadocia & Balloons',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1600&q=85',
        title: 'Dawn Hot Air Balloons over Goreme Valleys',
        location: 'Cappadocia'
      },
      {
        url: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1600&q=85',
        title: 'Fairy Chimneys and Cave Dwellings Sunset',
        location: 'Uchisar & Goreme'
      },
      {
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',
        title: 'Deep Rose Valley Canyon Trail',
        location: 'Cavusin Valley'
      },
      {
        url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=85',
        title: 'Boutique Cave Terrace with Panoramic View',
        location: 'Urgup'
      }
    ]
  },
  {
    category: 'Istanbul & Bosphorus',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85',
        title: 'Blue Mosque & Sultanahmet Square',
        location: 'Historic Peninsula'
      },
      {
        url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85',
        title: 'Galata Tower & Golden Horn at Dusk',
        location: 'Galata'
      },
      {
        url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1600&q=85',
        title: 'Hagia Sophia Grand Byzantine Dome',
        location: 'Sultanahmet'
      },
      {
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85',
        title: 'Bosphorus Yacht Sunset & Waterfront Mansions',
        location: 'Bosphorus Strait'
      }
    ]
  },
  {
    category: 'Turquoise Coast & Gulets',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
        title: 'Handcrafted Wooden Gulet in Turquoise Bay',
        location: 'Bodrum & Gokova'
      },
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85',
        title: 'Butterfly Valley & Oludeniz Lagoon Coast',
        location: 'Fethiye'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
        title: 'Lycian Way Pine Ridges & Ancient Coastline',
        location: 'Kas & Kalkan'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        title: 'Secluded Aegean Cove with Crystal Waters',
        location: 'Datca Peninsula'
      }
    ]
  },
  {
    category: 'Antiquity & Heritage',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=85',
        title: 'Celsus Library in Ancient Roman Ephesus',
        location: 'Selcuk / Ephesus'
      },
      {
        url: 'https://images.unsplash.com/photo-1599818818580-0a2c2069279d?auto=format&fit=crop&w=1600&q=85',
        title: 'Travertine Thermal Terraces of Pamukkale & Hierapolis',
        location: 'Denizli'
      },
      {
        url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1600&q=85',
        title: '12,000-Year Monolith Pillars at Gobeklitepe',
        location: 'Sanliurfa'
      },
      {
        url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=85',
        title: 'Colossal Stone Heads of Mount Nemrut Summit',
        location: 'Adiyaman'
      }
    ]
  }
];

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  branding: {
    companyName: 'Baobab DMC',
    operatorSubtitle: 'Turkey Ground Operator & DMC',
    tursabNumber: '15764',
    tursabGrade: 'A-Grade Licensed Operator',
    foundedYear: 2000,
    tagline: 'Curated Small Group Journeys, Active Adventures & B2B Ground Operations Across Turkiye'
  },
  hero: {
    badgeText: 'TÜRSAB Licensed A-Grade Operator • Dedicated Ground Operations',
    titleLine1: 'Crafting Immersive Turkey Expeditions &',
    titleLine2: 'B2B Ground Operations',
    subtitle: 'Specialized incoming destination management for tour operators, travel advisors, and bespoke small groups. Direct contracts, local expertise, 24/7 flight & field support across all 7 regions of Turkiye.',
    ctaRequestText: 'Request B2B Tariff & Proposal',
    ctaConsultationText: 'Schedule Video Call',
    ctaExploreText: 'Explore Expeditions',
    slides: DEFAULT_HERO_SLIDES
  },
  stats: DMC_STATS,
  companyContact: DEFAULT_COMPANY_CONTACT,
  trips: DEFAULT_TRIPS,
  destinations: DEFAULT_DESTINATIONS,
  venues: DEFAULT_VENUES,
  services: DEFAULT_SERVICES,
  about: {
    whyChooseTitle: 'Why Tour Operators Partner With Baobab DMC',
    whyChooseSubtitle: 'Two decades of flawless ground dispatch, rigorous risk management, and wholesale integrity across the Republic of Turkiye.',
    pillars: [
      {
        title: '100% B2B Wholesale Focus',
        desc: 'We protect your brand integrity with white-labeled vehicles, dedicated tour leaders, and strictly guarded net rates.',
        icon: 'ShieldCheck'
      },
      {
        title: 'A-Grade TÜRSAB Licensed Direct Operator',
        desc: 'No sub-brokers. We own and control our contracted fleet, licensed guides, and vetted boutique accommodation partners.',
        icon: 'Award'
      },
      {
        title: '24/7 Field & Airport Operations',
        desc: 'Dedicated flight tracking, live multi-lingual dispatch, and real-time contingency management across all Turkish airports.',
        icon: 'Headphones'
      },
      {
        title: 'Guaranteed Net wholesale Pricing',
        desc: 'Competitive tiered B2B pricing, transparent inclusions, zero hidden supplements, and rapid < 2-hour proposal turnaround.',
        icon: 'TrendingUp'
      }
    ],
    testimonials: DEFAULT_TESTIMONIALS.map(t => ({
      quote: t.quote,
      author: t.author,
      role: t.role,
      company: t.company,
      agency: t.company,
      country: 'Partner Agency',
      rating: t.rating || 5
    })),
    faqItems: DEFAULT_FAQ_ITEMS
  }
};

const STORAGE_KEY = 'baobab_dmc_super_admin_content_v2';
const ADMIN_STATE_KEY = 'baobab_dmc_super_admin_active';

interface SiteContentContextType {
  content: SiteContentData;
  isSuperAdmin: boolean;
  toggleSuperAdmin: (enabled?: boolean) => void;
  adminPanelOpen: boolean;
  setAdminPanelOpen: (open: boolean) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  isDirty: boolean;
  lastSavedAt: string | null;
  saveChanges: () => void;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => { success: boolean; error?: string };
  syncToFirestore: () => Promise<{ success: boolean; error?: string }>;
  fetchFromFirestore: () => Promise<{ success: boolean; error?: string }>;
  
  // Quick Section Setters
  updateBranding: (updates: Partial<BrandingSettings>) => void;
  updateHero: (updates: Partial<HeroSettings>) => void;
  updateHeroSlide: (index: number, updates: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (index: number) => void;
  updateStats: (stats: StatItem[]) => void;
  updateCompanyContact: (updates: Partial<typeof DEFAULT_COMPANY_CONTACT>) => void;
  updateTrip: (tripId: string, updates: Partial<AtlasTrip>) => void;
  addTrip: (trip: AtlasTrip) => void;
  deleteTrip: (tripId: string) => void;
  duplicateTrip: (tripId: string) => void;
  updateDestination: (destId: string, updates: Partial<Destination>) => void;
  addDestination: (dest: Destination) => void;
  deleteDestination: (destId: string) => void;
  updateVenue: (venueId: string, updates: Partial<VenueShowcase>) => void;
  addVenue: (venue: VenueShowcase) => void;
  deleteVenue: (venueId: string) => void;
  updateService: (serviceId: string, updates: Partial<DmcService>) => void;
  updateAbout: (updates: Partial<AboutSettings>) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial content from LocalStorage or Defaults
  const [content, setContent] = useState<SiteContentData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          companyContact: { ...DEFAULT_SITE_CONTENT.companyContact, ...(parsed.companyContact || {}) },
          about: { ...DEFAULT_SITE_CONTENT.about, ...(parsed.about || {}) },
        };
      }
    } catch (e) {
      console.warn('Could not read saved site content from localStorage:', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  // Super Admin login toggle state
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_STATE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);
  const [activeAdminTab, setActiveAdminTab] = useState<string>('hero');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem('baobab_dmc_last_saved');
    } catch {
      return null;
    }
  });

  // Toggle Super Admin Mode
  const toggleSuperAdmin = useCallback((enabled?: boolean) => {
    setIsSuperAdmin(prev => {
      const next = typeof enabled === 'boolean' ? enabled : !prev;
      try {
        localStorage.setItem(ADMIN_STATE_KEY, String(next));
      } catch (err) {
        console.warn('Failed to persist admin state:', err);
      }
      if (next) {
        setAdminPanelOpen(true);
      }
      return next;
    });
  }, []);

  // Save changes to localStorage
  const saveChanges = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('baobab_dmc_last_saved', now);
      setLastSavedAt(now);
      setIsDirty(false);
    } catch (e) {
      console.error('Error saving site content:', e);
    }
  }, [content]);

  // Reset all content to original defaults
  const resetToDefaults = useCallback(() => {
    setContent(DEFAULT_SITE_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('baobab_dmc_last_saved');
      setLastSavedAt(null);
      setIsDirty(false);
    } catch (e) {
      console.error('Error clearing local storage:', e);
    }
  }, []);

  // Export full configuration as JSON
  const exportConfigJson = useCallback(() => {
    return JSON.stringify(content, null, 2);
  }, [content]);

  // Import configuration from JSON string
  const importConfigJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON file structure.' };
      }
      setContent({
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
        hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
        companyContact: { ...DEFAULT_SITE_CONTENT.companyContact, ...(parsed.companyContact || {}) },
        about: { ...DEFAULT_SITE_CONTENT.about, ...(parsed.about || {}) },
      });
      setIsDirty(true);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to parse JSON configuration' };
    }
  }, []);

  // Optional: Sync to Firestore
  const syncToFirestore = useCallback(async () => {
    try {
      const settingDocRef = doc(db, 'site_settings', 'global_content');
      await setDoc(settingDocRef, {
        id: 'global_content',
        branding: content.branding,
        hero: content.hero,
        stats: content.stats,
        companyContact: content.companyContact,
        updatedAt: new Date().toISOString(),
        updatedBy: 'tolgakinas@gmail.com'
      });
      saveChanges();
      return { success: true };
    } catch (error: any) {
      console.warn('Firestore cloud sync notice:', error);
      // Still ensure local save succeeds
      saveChanges();
      return { success: true, error: error.message };
    }
  }, [content, saveChanges]);

  // Fetch overrides from Firestore if present
  const fetchFromFirestore = useCallback(async () => {
    try {
      const settingDocRef = doc(db, 'site_settings', 'global_content');
      const snap = await getDoc(settingDocRef);
      if (snap.exists()) {
        const cloudData = snap.data();
        setContent(prev => ({
          ...prev,
          branding: { ...prev.branding, ...(cloudData.branding || {}) },
          hero: { ...prev.hero, ...(cloudData.hero || {}) },
          stats: cloudData.stats || prev.stats,
          companyContact: { ...prev.companyContact, ...(cloudData.companyContact || {}) },
        }));
        setIsDirty(false);
        return { success: true };
      }
      return { success: false, error: 'No remote configuration document found.' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }, []);

  // Keyboard shortcut listener (Ctrl+Shift+A or Cmd+Shift+A) to toggle Super Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        toggleSuperAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSuperAdmin]);

  // 1. Branding Updates
  const updateBranding = useCallback((updates: Partial<BrandingSettings>) => {
    setContent(prev => ({
      ...prev,
      branding: { ...prev.branding, ...updates }
    }));
    setIsDirty(true);
  }, []);

  // 2. Hero Updates
  const updateHero = useCallback((updates: Partial<HeroSettings>) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updates }
    }));
    setIsDirty(true);
  }, []);

  const updateHeroSlide = useCallback((index: number, updates: Partial<HeroSlide>) => {
    setContent(prev => {
      const newSlides = [...prev.hero.slides];
      if (newSlides[index]) {
        newSlides[index] = { ...newSlides[index], ...updates };
      }
      return {
        ...prev,
        hero: { ...prev.hero, slides: newSlides }
      };
    });
    setIsDirty(true);
  }, []);

  const addHeroSlide = useCallback((slide: HeroSlide) => {
    setContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: [...prev.hero.slides, slide]
      }
    }));
    setIsDirty(true);
  }, []);

  const deleteHeroSlide = useCallback((index: number) => {
    setContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: prev.hero.slides.filter((_, i) => i !== index)
      }
    }));
    setIsDirty(true);
  }, []);

  // 3. Stats Updates
  const updateStats = useCallback((stats: StatItem[]) => {
    setContent(prev => ({ ...prev, stats }));
    setIsDirty(true);
  }, []);

  // 4. Contact Updates
  const updateCompanyContact = useCallback((updates: Partial<typeof DEFAULT_COMPANY_CONTACT>) => {
    setContent(prev => ({
      ...prev,
      companyContact: { ...prev.companyContact, ...updates }
    }));
    setIsDirty(true);
  }, []);

  // 5. Trips Updates
  const updateTrip = useCallback((tripId: string, updates: Partial<AtlasTrip>) => {
    setContent(prev => ({
      ...prev,
      trips: prev.trips.map(t => t.id === tripId ? { ...t, ...updates } : t)
    }));
    setIsDirty(true);
  }, []);

  const addTrip = useCallback((trip: AtlasTrip) => {
    setContent(prev => ({
      ...prev,
      trips: [trip, ...prev.trips]
    }));
    setIsDirty(true);
  }, []);

  const deleteTrip = useCallback((tripId: string) => {
    setContent(prev => ({
      ...prev,
      trips: prev.trips.filter(t => t.id !== tripId)
    }));
    setIsDirty(true);
  }, []);

  const duplicateTrip = useCallback((tripId: string) => {
    setContent(prev => {
      const target = prev.trips.find(t => t.id === tripId);
      if (!target) return prev;
      const copy: AtlasTrip = {
        ...target,
        id: `trip-copy-${Date.now()}`,
        atlasId: Date.now(),
        title: `${target.title} (Copy)`,
        slug: `${target.slug}-copy`
      };
      return {
        ...prev,
        trips: [copy, ...prev.trips]
      };
    });
    setIsDirty(true);
  }, []);

  // 6. Destinations Updates
  const updateDestination = useCallback((destId: string, updates: Partial<Destination>) => {
    setContent(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => d.id === destId ? { ...d, ...updates } : d)
    }));
    setIsDirty(true);
  }, []);

  const addDestination = useCallback((dest: Destination) => {
    setContent(prev => ({
      ...prev,
      destinations: [...prev.destinations, dest]
    }));
    setIsDirty(true);
  }, []);

  const deleteDestination = useCallback((destId: string) => {
    setContent(prev => ({
      ...prev,
      destinations: prev.destinations.filter(d => d.id !== destId)
    }));
    setIsDirty(true);
  }, []);

  // 7. Venues Updates
  const updateVenue = useCallback((venueId: string, updates: Partial<VenueShowcase>) => {
    setContent(prev => ({
      ...prev,
      venues: prev.venues.map(v => v.id === venueId ? { ...v, ...updates } : v)
    }));
    setIsDirty(true);
  }, []);

  const addVenue = useCallback((venue: VenueShowcase) => {
    setContent(prev => ({
      ...prev,
      venues: [...prev.venues, venue]
    }));
    setIsDirty(true);
  }, []);

  const deleteVenue = useCallback((venueId: string) => {
    setContent(prev => ({
      ...prev,
      venues: prev.venues.filter(v => v.id !== venueId)
    }));
    setIsDirty(true);
  }, []);

  // 8. Services Updates
  const updateService = useCallback((serviceId: string, updates: Partial<DmcService>) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === serviceId ? { ...s, ...updates } : s)
    }));
    setIsDirty(true);
  }, []);

  // 9. About Updates
  const updateAbout = useCallback((updates: Partial<AboutSettings>) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, ...updates }
    }));
    setIsDirty(true);
  }, []);

  const value = useMemo(() => ({
    content,
    isSuperAdmin,
    toggleSuperAdmin,
    adminPanelOpen,
    setAdminPanelOpen,
    activeAdminTab,
    setActiveAdminTab,
    isDirty,
    lastSavedAt,
    saveChanges,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    syncToFirestore,
    fetchFromFirestore,
    updateBranding,
    updateHero,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    updateStats,
    updateCompanyContact,
    updateTrip,
    addTrip,
    deleteTrip,
    duplicateTrip,
    updateDestination,
    addDestination,
    deleteDestination,
    updateVenue,
    addVenue,
    deleteVenue,
    updateService,
    updateAbout
  }), [
    content,
    isSuperAdmin,
    toggleSuperAdmin,
    adminPanelOpen,
    activeAdminTab,
    isDirty,
    lastSavedAt,
    saveChanges,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    syncToFirestore,
    fetchFromFirestore,
    updateBranding,
    updateHero,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    updateStats,
    updateCompanyContact,
    updateTrip,
    addTrip,
    deleteTrip,
    duplicateTrip,
    updateDestination,
    addDestination,
    deleteDestination,
    updateVenue,
    addVenue,
    deleteVenue,
    updateService,
    updateAbout
  ]);

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
