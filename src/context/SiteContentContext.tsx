import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Destination, 
  DmcService, 
  SampleItinerary, 
  VenueShowcase, 
  AtlasTrip,
  BlogPost
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
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../data/blogData';
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
  googleSiteVerification?: string;
  googleAnalyticsId?: string;
  canonicalDomain?: string;
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

export interface LibraryPhotoItem {
  id?: string;
  url: string;
  title: string;
  location: string;
  category?: string;
  caption?: string;
  description?: string;
  altText?: string;
  seoKeywords?: string[];
  originalSizeFormatted?: string;
  optimizedSizeFormatted?: string;
  compressionRatio?: string;
  dimensions?: string;
  format?: string;
  uploadedAt?: string;
  isCustom?: boolean;
}

export interface PhotoPreset {
  category: string;
  photos: LibraryPhotoItem[];
}

export interface GtmConsentSettings {
  gtmEnabled: boolean;
  gtmId: string;
  cmpProvider: 'built_in' | 'cookiebot' | 'onetrust' | 'termly' | 'custom';
  cmpAccountId?: string;
  customCmpScript?: string;
  consentModeV2Enabled: boolean;
  defaultAnalyticsStorage: 'granted' | 'denied';
  defaultAdStorage: 'granted' | 'denied';
  defaultAdUserData: 'granted' | 'denied';
  defaultAdPersonalization: 'granted' | 'denied';
  bannerEnabled: boolean;
  bannerTitle: string;
  bannerMessage: string;
  acceptButtonText: string;
  rejectButtonText: string;
  settingsButtonText: string;
  privacyPolicyUrl: string;
}

export const DEFAULT_GTM_CONSENT: GtmConsentSettings = {
  gtmEnabled: false,
  gtmId: '',
  cmpProvider: 'built_in',
  cmpAccountId: '',
  customCmpScript: '',
  consentModeV2Enabled: true,
  defaultAnalyticsStorage: 'denied',
  defaultAdStorage: 'denied',
  defaultAdUserData: 'denied',
  defaultAdPersonalization: 'denied',
  bannerEnabled: true,
  bannerTitle: 'Privacy & Cookie Preferences',
  bannerMessage: 'We use cookies, analytics, and consent-managed services to evaluate performance and provide seamless B2B partner dispatch in compliance with GDPR and Turkish KVKK regulations.',
  acceptButtonText: 'Accept All',
  rejectButtonText: 'Essential Only',
  settingsButtonText: 'Preferences',
  privacyPolicyUrl: '#about'
};

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
  customPhotos?: LibraryPhotoItem[];
  blogs?: BlogPost[];
  gtmConsent?: GtmConsentSettings;
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
    tagline: 'Curated Small Group Journeys, Active Adventures & B2B Ground Operations Across Turkiye',
    googleSiteVerification: 'BAOBAB_DMC_TURKEY_GSC_VERIFICATION',
    googleAnalyticsId: '',
    canonicalDomain: 'https://baobabdmc.com'
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
  },
  customPhotos: [],
  blogs: DEFAULT_BLOG_POSTS,
  gtmConsent: DEFAULT_GTM_CONSENT
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
  updateGtmConsent: (updates: Partial<GtmConsentSettings>) => void;
  
  // Blog Management (SEO / AEO / AIO)
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blogId: string, updates: Partial<BlogPost>) => void;
  deleteBlog: (blogId: string) => void;
  duplicateBlog: (blogId: string) => void;
  optimizeBlogWithAI: (blog: Partial<BlogPost>) => Promise<{ success: boolean; optimization?: any; error?: string }>;

  // Photo Library Management
  addCustomPhoto: (photo: LibraryPhotoItem) => void;
  deleteCustomPhoto: (urlOrId: string) => void;
  updateCustomPhoto: (urlOrId: string, updates: Partial<LibraryPhotoItem>) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial content from LocalStorage or Defaults
  const [content, setContent] = useState<SiteContentData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure trip-9467 is synced to the single-day tour definition
        const correctedTrips = Array.isArray(parsed.trips) && parsed.trips.length > 0 
          ? parsed.trips.map((t: AtlasTrip) => {
              if (t.id === 'trip-9467') {
                const fresh = DEFAULT_TRIPS.find(dt => dt.id === 'trip-9467');
                return fresh || t;
              }
              return t;
            })
          : DEFAULT_TRIPS;

        return {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          trips: correctedTrips,
          branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          companyContact: { ...DEFAULT_SITE_CONTENT.companyContact, ...(parsed.companyContact || {}) },
          about: { ...DEFAULT_SITE_CONTENT.about, ...(parsed.about || {}) },
          blogs: Array.isArray(parsed.blogs) && parsed.blogs.length > 0 ? parsed.blogs : DEFAULT_BLOG_POSTS,
          gtmConsent: { ...DEFAULT_GTM_CONSENT, ...(parsed.gtmConsent || {}) }
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

  // Real-time Automatic Persistence: Every update immediately reflects on live site and persists
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('baobab_dmc_last_saved', now);
      setLastSavedAt(now);
    } catch (e) {
      console.error('Error auto-saving content:', e);
    }
  }, [content]);

  // Synchronize Google Search Console Verification Meta Tag in Head
  useEffect(() => {
    const code = content.branding?.googleSiteVerification;
    if (code) {
      const meta = document.getElementById('google-site-verification-meta');
      if (meta) {
        meta.setAttribute('content', code);
      }
    }
  }, [content.branding?.googleSiteVerification]);

  // Synchronize Google Analytics (GA4) tag dynamically if configured
  useEffect(() => {
    const gaId = content.branding?.googleAnalyticsId?.trim();
    if (gaId && gaId.startsWith('G-')) {
      const existingScript = document.getElementById('ga4-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.id = 'ga4-inline';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(inlineScript);
      }
    }
  }, [content.branding?.googleAnalyticsId]);

  // Synchronize Google Tag Manager (GTM), Google Consent Mode v2 & CMP Scripts
  useEffect(() => {
    const gtm = content.gtmConsent || DEFAULT_GTM_CONSENT;

    // 1. Google Consent Mode v2: Configure default consent before tags fire
    if (gtm.consentModeV2Enabled) {
      if (!(window as any).dataLayer) {
        (window as any).dataLayer = [];
      }
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      (window as any).gtag = (window as any).gtag || gtag;

      const consentDefaults: Record<string, string> = {
        analytics_storage: gtm.defaultAnalyticsStorage || 'denied',
        ad_storage: gtm.defaultAdStorage || 'denied',
        ad_user_data: gtm.defaultAdUserData || 'denied',
        ad_personalization: gtm.defaultAdPersonalization || 'denied',
        wait_for_update: '500'
      };
      (window as any).gtag('consent', 'default', consentDefaults);
    }

    // 2. Google Tag Manager Container Script
    const existingGtm = document.getElementById('gtm-container-script');
    if (gtm.gtmEnabled && gtm.gtmId?.trim()?.toUpperCase().startsWith('GTM-')) {
      const gtmId = gtm.gtmId.trim().toUpperCase();
      if (!existingGtm) {
        const script = document.createElement('script');
        script.id = 'gtm-container-script';
        script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
        document.head.appendChild(script);
      }
    } else if (existingGtm && (!gtm.gtmEnabled || !gtm.gtmId?.trim())) {
      existingGtm.remove();
    }

    // 3. CMP Provider Script Injection (Cookiebot, OneTrust, Termly, Custom)
    const existingCmp = document.getElementById('cmp-provider-script');
    if (existingCmp) {
      existingCmp.remove();
    }

    if (gtm.cmpProvider === 'cookiebot' && gtm.cmpAccountId?.trim()) {
      const script = document.createElement('script');
      script.id = 'cmp-provider-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://consent.cookiebot.com/uc.js';
      script.setAttribute('data-cbid', gtm.cmpAccountId.trim());
      document.head.appendChild(script);
    } else if (gtm.cmpProvider === 'onetrust' && gtm.cmpAccountId?.trim()) {
      const script = document.createElement('script');
      script.id = 'cmp-provider-script';
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
      script.setAttribute('data-domain-script', gtm.cmpAccountId.trim());
      document.head.appendChild(script);
    } else if (gtm.cmpProvider === 'termly' && gtm.cmpAccountId?.trim()) {
      const script = document.createElement('script');
      script.id = 'cmp-provider-script';
      script.type = 'text/javascript';
      script.src = 'https://app.termly.io/embed.min.js';
      script.setAttribute('data-auto-block', 'on');
      script.setAttribute('data-website-uuid', gtm.cmpAccountId.trim());
      document.head.appendChild(script);
    } else if (gtm.cmpProvider === 'custom' && gtm.customCmpScript?.trim()) {
      const div = document.createElement('div');
      div.id = 'cmp-provider-script';
      div.innerHTML = gtm.customCmpScript.trim();
      const scripts = div.querySelectorAll('script');
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        if (s.src) newScript.src = s.src;
        if (s.type) newScript.type = s.type;
        if (s.async) newScript.async = true;
        if (s.innerHTML) newScript.innerHTML = s.innerHTML;
        Array.from(s.attributes).forEach(attr => {
          if (!['src', 'type'].includes(attr.name)) {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
        document.head.appendChild(newScript);
      });
      document.body.appendChild(div);
    }
  }, [content.gtmConsent]);

  // Update GTM & CMP Consent Settings
  const updateGtmConsent = useCallback((settings: Partial<GtmConsentSettings>) => {
    setContent(prev => ({
      ...prev,
      gtmConsent: {
        ...(prev.gtmConsent || DEFAULT_GTM_CONSENT),
        ...settings
      }
    }));
    setIsDirty(true);
  }, []);

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
        gtmConsent: { ...DEFAULT_GTM_CONSENT, ...(parsed.gtmConsent || {}) },
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

  // 10. Photo Library Custom Photos
  const addCustomPhoto = useCallback((photo: LibraryPhotoItem) => {
    setContent(prev => {
      const existing = prev.customPhotos || [];
      // Prevent duplicates by URL
      const filtered = existing.filter(p => p.url !== photo.url);
      return {
        ...prev,
        customPhotos: [
          {
            ...photo,
            isCustom: true,
            uploadedAt: photo.uploadedAt || new Date().toISOString()
          },
          ...filtered
        ]
      };
    });
    setIsDirty(true);
  }, []);

  const deleteCustomPhoto = useCallback((urlOrId: string) => {
    setContent(prev => ({
      ...prev,
      customPhotos: (prev.customPhotos || []).filter(p => p.url !== urlOrId && p.id !== urlOrId)
    }));
    setIsDirty(true);
  }, []);

  const updateCustomPhoto = useCallback((urlOrId: string, updates: Partial<LibraryPhotoItem>) => {
    setContent(prev => {
      const existing = prev.customPhotos || [];
      const foundIndex = existing.findIndex(p => p.url === urlOrId || p.id === urlOrId);
      if (foundIndex >= 0) {
        const updated = [...existing];
        updated[foundIndex] = { ...updated[foundIndex], ...updates };
        return { ...prev, customPhotos: updated };
      } else {
        // Find in preset library if it was a preset photo
        let basePhoto: LibraryPhotoItem | undefined;
        for (const cat of PHOTO_PRESET_LIBRARY) {
          const match = cat.photos.find(p => p.url === urlOrId);
          if (match) {
            basePhoto = {
              ...match,
              category: match.category || cat.category,
              altText: match.altText || `${match.title} in ${match.location}, Turkey`,
              caption: match.caption || `Curated high-resolution photography of ${match.location}.`,
              seoKeywords: match.seoKeywords || ['Turkey DMC', match.location, cat.category, 'Turkey tours'],
              isCustom: true
            };
            break;
          }
        }
        if (basePhoto) {
          return {
            ...prev,
            customPhotos: [{ ...basePhoto, ...updates, isCustom: true }, ...existing]
          };
        }
        return {
          ...prev,
          customPhotos: [{ url: urlOrId, title: 'Custom Photo', location: 'Turkiye', ...updates, isCustom: true }, ...existing]
        };
      }
    });
    setIsDirty(true);
  }, []);

  // 11. Blog Post Management (SEO / AEO / AIO)
  const addBlog = useCallback((blog: BlogPost) => {
    setContent(prev => ({
      ...prev,
      blogs: [
        {
          ...blog,
          id: blog.id || `blog-${Date.now()}`,
          isCustom: true,
          createdAt: blog.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        ...(prev.blogs || DEFAULT_BLOG_POSTS)
      ]
    }));
    setIsDirty(true);
  }, []);

  const updateBlog = useCallback((blogId: string, updates: Partial<BlogPost>) => {
    setContent(prev => {
      const currentBlogs = prev.blogs || DEFAULT_BLOG_POSTS;
      return {
        ...prev,
        blogs: currentBlogs.map(b => b.id === blogId ? {
          ...b,
          ...updates,
          updatedAt: new Date().toISOString()
        } : b)
      };
    });
    setIsDirty(true);
  }, []);

  const deleteBlog = useCallback((blogId: string) => {
    setContent(prev => {
      const currentBlogs = prev.blogs || DEFAULT_BLOG_POSTS;
      return {
        ...prev,
        blogs: currentBlogs.filter(b => b.id !== blogId)
      };
    });
    setIsDirty(true);
  }, []);

  const duplicateBlog = useCallback((blogId: string) => {
    setContent(prev => {
      const currentBlogs = prev.blogs || DEFAULT_BLOG_POSTS;
      const target = currentBlogs.find(b => b.id === blogId);
      if (!target) return prev;
      const copy: BlogPost = {
        ...target,
        id: `blog-copy-${Date.now()}`,
        title: `${target.title} (Draft Copy)`,
        slug: `${target.slug}-copy`,
        status: 'draft',
        isCustom: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return {
        ...prev,
        blogs: [copy, ...currentBlogs]
      };
    });
    setIsDirty(true);
  }, []);

  const optimizeBlogWithAI = useCallback(async (blog: Partial<BlogPost>): Promise<{ success: boolean; optimization?: any; error?: string }> => {
    try {
      const response = await fetch('/api/optimize-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          category: blog.category || 'Destination Guide',
          content: blog.content || { intro: '', sections: [], conclusion: '', faqs: [] },
          geoData: blog.geoData || { region: 'Turkiye', keyCities: [] },
          seoKeywords: blog.seoKeywords || [],
          currentSlug: blog.slug || ''
        })
      });

      if (!response.ok) {
        throw new Error(`Optimization API responded with status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.optimization) {
        return { success: true, optimization: data.optimization };
      }
      return { success: false, error: data.error || 'Failed to optimize blog content.' };
    } catch (err: any) {
      console.error('AI Blog Optimization Error:', err);
      return { success: false, error: err?.message || 'Network error during blog optimization.' };
    }
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
    updateAbout,
    addBlog,
    updateBlog,
    deleteBlog,
    duplicateBlog,
    optimizeBlogWithAI,
    addCustomPhoto,
    deleteCustomPhoto,
    updateCustomPhoto,
    updateGtmConsent
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
    updateAbout,
    updateGtmConsent,
    addBlog,
    updateBlog,
    deleteBlog,
    duplicateBlog,
    optimizeBlogWithAI,
    addCustomPhoto,
    deleteCustomPhoto,
    updateCustomPhoto
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
