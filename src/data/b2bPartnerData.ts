export interface B2BPartnerAccount {
  id: string;
  agencyName: string;
  contactPerson: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  partnerTier: 'Platinum Preferred' | 'Gold Trade' | 'Silver Verified' | 'Registered Member';
  tursabContractRef: string;
  accountManager: {
    name: string;
    title: string;
    email: string;
    phone: string;
    whatsapp: string;
    avatar: string;
  };
  commissionRate: number; // e.g., 18%
  activeBookingsCount: number;
  completedTripsCount: number;
  totalVolumeEur: number;
}

export interface B2BNetTariffItem {
  id: string;
  category: 'Transport & VIP Fleet' | 'Expert Guides' | 'Hot Air Balloons' | 'Private Gulets & Yachts' | 'Airport VIP Services' | 'Signature Activities';
  serviceName: string;
  location: string;
  specs: string;
  netRateEur: number;
  unit: string;
  rrpRecommendedEur: number;
  notes: string;
  badge?: string;
}

export interface B2BBookingRFP {
  id: string;
  referenceNumber: string;
  clientName: string;
  agencyRef?: string;
  tripTitle: string;
  dates: string;
  paxCount: number;
  durationDays: number;
  destinations: string[];
  tier: string;
  status: 'Costing in Progress' | 'Locked Proposal Ready' | 'Deposit Paid / Confirmed' | 'Operating on Ground' | 'Completed';
  totalNetEur: number;
  grossClientEur: number;
  commissionEarnedEur: number;
  assignedGuide?: string;
  assignedVehicle?: string;
  hotelSelection?: string[];
  createdDate: string;
  lastUpdated: string;
  notes: string;
  milestones: {
    title: string;
    completed: boolean;
    date?: string;
  }[];
}

export interface WhiteLabelAsset {
  id: string;
  title: string;
  category: 'Unbranded Itineraries (Word/PDF)' | 'High-Res Photo Library' | 'Destination Cheat Sheets' | 'Social Media Toolkits';
  format: 'DOCX / PDF' | 'ZIP (25 High-Res Photos)' | 'PDF Guide' | 'Canva Templates';
  fileSize: string;
  description: string;
  thumbnail: string;
  downloadUrl: string;
}

export const DEMO_PARTNER_ACCOUNTS: B2BPartnerAccount[] = [
  {
    id: 'partner-001',
    agencyName: 'Atlas Travel Horizons',
    contactPerson: 'Sarah Jenkins',
    role: 'Head of Product & Contracting',
    email: 'sarah.jenkins@atlastravel.co.uk',
    phone: '+44 20 7946 0192',
    country: 'United Kingdom',
    city: 'London',
    partnerTier: 'Platinum Preferred',
    tursabContractRef: 'B2B-UK-2026-089',
    accountManager: {
      name: 'Burak Yılmaz',
      title: 'Senior Destination Operations Director',
      email: 'burak.yilmaz@baobabdmc.com',
      phone: '+90 850 309 31 63',
      whatsapp: '+90 544 836 28 45',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    commissionRate: 18,
    activeBookingsCount: 3,
    completedTripsCount: 28,
    totalVolumeEur: 142800
  },
  {
    id: 'partner-002',
    agencyName: 'Silk Road Luxury Journeys',
    contactPerson: 'David Miller',
    role: 'Private Travel Advisor',
    email: 'david@silkroadlux.com',
    phone: '+1 (212) 555-0144',
    country: 'United States',
    city: 'New York, NY',
    partnerTier: 'Gold Trade',
    tursabContractRef: 'B2B-US-2026-114',
    accountManager: {
      name: 'Eleni Kalkan',
      title: 'Head of FIT & Bespoke Ground Design',
      email: 'eleni@baobabdmc.com',
      phone: '+90 850 309 31 63',
      whatsapp: '+90 544 836 28 45',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    commissionRate: 15,
    activeBookingsCount: 2,
    completedTripsCount: 14,
    totalVolumeEur: 86400
  },
  {
    id: 'partner-003',
    agencyName: 'Bavaria Orient Reisen',
    contactPerson: 'Klaus Weber',
    role: 'Managing Director',
    email: 'k.weber@bavaria-orient.de',
    phone: '+49 89 2441 870',
    country: 'Germany',
    city: 'Munich',
    partnerTier: 'Platinum Preferred',
    tursabContractRef: 'B2B-DE-2026-042',
    accountManager: {
      name: 'Burak Yılmaz',
      title: 'Senior Destination Operations Director',
      email: 'burak.yilmaz@baobabdmc.com',
      phone: '+90 850 309 31 63',
      whatsapp: '+90 544 836 28 45',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    commissionRate: 20,
    activeBookingsCount: 4,
    completedTripsCount: 42,
    totalVolumeEur: 238000
  }
];

export const B2B_NET_TARIFF_2026: B2BNetTariffItem[] = [
  {
    id: 'tr-01',
    category: 'Transport & VIP Fleet',
    serviceName: 'VIP Mercedes-Benz Sprinter (Extra Long Wheelbase, 8-12 Seats)',
    location: 'Istanbul / Western Anatolia / Riviera',
    specs: 'Leather Captain seats, 220V power & USB-C, chilled water, Wi-Fi, professional licensed driver, fuel, highway tolls',
    netRateEur: 320,
    unit: 'Per Day (10 Hours / 180 km included)',
    rrpRecommendedEur: 450,
    notes: 'Overnight driver allowance outside base city: €60/night. Extra hour: €35/hr.',
    badge: 'Best Seller'
  },
  {
    id: 'tr-02',
    category: 'Transport & VIP Fleet',
    serviceName: 'Executive Mercedes-Benz Vito VIP (4-6 Seats)',
    location: 'All Turkey Hubs',
    specs: 'Face-to-face conference seating, tinted panoramic windows, mineral water, Wi-Fi, English-speaking driver on request',
    netRateEur: 230,
    unit: 'Per Day (10 Hours / 150 km included)',
    rrpRecommendedEur: 330,
    notes: 'Ideal for luxury couples or families of 3-4.'
  },
  {
    id: 'gd-01',
    category: 'Expert Guides',
    serviceName: 'Certified TUREB Professional Guide (English / Spanish / German / French)',
    location: 'Nationwide (Istanbul, Cappadocia, Aegean, Mediterranean, East)',
    specs: 'Ministry of Culture & Tourism licensed, specialized in archaeology, Byzantine/Ottoman history & culinary culture',
    netRateEur: 180,
    unit: 'Per Day (Full Day up to 8 Hours)',
    rrpRecommendedEur: 260,
    notes: 'Official skip-the-line guide badge included. Out-of-city accommodation provided or €55/night meal/board allowance.',
    badge: 'TUREB Official'
  },
  {
    id: 'gd-02',
    category: 'Expert Guides',
    serviceName: 'Specialist Historian / Archeologist Guide (Italian / Portuguese / Japanese)',
    location: 'Istanbul / Ephesus / Gobeklitepe',
    specs: 'Senior academic or veteran guide with deep excavation background',
    netRateEur: 230,
    unit: 'Per Day',
    rrpRecommendedEur: 340,
    notes: 'Highly recommended for private museum tours and private archaeological permit groups.'
  },
  {
    id: 'bl-01',
    category: 'Hot Air Balloons',
    serviceName: 'Cappadocia Sunrise Hot Air Balloon Flight (Standard Basket 20-24 Pax)',
    location: 'Göreme / Cappadocia Valleys',
    specs: '60-min flight time, hotel roundtrip transfers, light breakfast snacks, champagne toast & flight certificate, full Lloyd’s insurance',
    netRateEur: 185,
    unit: 'Per Person',
    rrpRecommendedEur: 260,
    notes: 'Guaranteed wholesale allocation with Royal Balloon & Butterfly Balloons partners. 100% refund if cancelled due to weather.',
    badge: 'Guaranteed Slots'
  },
  {
    id: 'bl-02',
    category: 'Hot Air Balloons',
    serviceName: 'Deluxe Small-Basket Balloon Flight (12-16 Pax)',
    location: 'Göreme / Love Valley',
    specs: '75-min extended flight, spacious compartments, premium flight pilot, private celebration toast',
    netRateEur: 245,
    unit: 'Per Person',
    rrpRecommendedEur: 360,
    notes: 'Preferred for luxury clients seeking panoramic uncrowded views.'
  },
  {
    id: 'gt-01',
    category: 'Private Gulets & Yachts',
    serviceName: 'Private Bosphorus 2-Hour Sunset Motor Yacht Charter',
    location: 'Istanbul Bosphorus Strait',
    specs: '18-meter luxury Flybridge yacht, Captain, crew, fuel, Turkish mezze platter, seasonal fruits, non-alcoholic beverages',
    netRateEur: 420,
    unit: 'Per Charter (up to 10 guests)',
    rrpRecommendedEur: 650,
    notes: 'Embarkation from Bebek, Kabatas or private hotel pier (Ciragan Palace / Four Seasons Bosphorus).',
    badge: 'VIP Favorite'
  },
  {
    id: 'gt-02',
    category: 'Private Gulets & Yachts',
    serviceName: 'Deluxe 28m Wooden Gulet 7-Night Private Charter (Gocek - Kekova)',
    location: 'Turquoise Coast / Gocek Bays',
    specs: '6 air-conditioned en-suite cabins (up to 12 guests), Captain, chef, 2 deckhands, fuel for 4h cruising/day, tenders & water sports',
    netRateEur: 13500,
    unit: 'Per Week (Charter Net)',
    rrpRecommendedEur: 18500,
    notes: 'Full board gourmet menu supplement: €65/person/day.'
  },
  {
    id: 'ap-01',
    category: 'Airport VIP Services',
    serviceName: 'Istanbul Airport (IST) VIP Fast Track & Buggy Meet-at-Gate',
    location: 'Istanbul International Airport (IST)',
    specs: 'Dedicated greeting at flight gate with golf cart buggy, private passport control line, luggage porter assistance, escort to driver',
    netRateEur: 110,
    unit: 'Per Passenger',
    rrpRecommendedEur: 175,
    notes: 'Cuts airport transit time by 45-60 minutes on international arrivals.'
  },
  {
    id: 'ex-01',
    category: 'Signature Activities',
    serviceName: 'After-Hours Private Access: Basilica Cistern & Hagia Sophia Interior',
    location: 'Istanbul Historic Peninsula',
    specs: 'Private opening permits outside public opening hours, private lighting, zero general crowds, private guide',
    netRateEur: 750,
    unit: 'Per Group Permit (up to 12 pax)',
    rrpRecommendedEur: 1150,
    notes: 'Subject to Ministry of Culture 7-day advance permit clearance.',
    badge: 'Exclusive DMC Permit'
  }
];

export const INITIAL_B2B_BOOKINGS: B2BBookingRFP[] = [
  {
    id: 'rfp-901',
    referenceNumber: 'TR-B2B-2026-901',
    clientName: 'Lord & Lady Harrington Family',
    agencyRef: 'ATL-7721',
    tripTitle: 'Grand Treasures of Byzantium & Cappadocia Valleys',
    dates: '12 – 20 October 2026',
    paxCount: 6,
    durationDays: 9,
    destinations: ['Istanbul', 'Cappadocia', 'Ephesus'],
    tier: '5-Star Luxury & Historic Heritage',
    status: 'Operating on Ground',
    totalNetEur: 14850,
    grossClientEur: 18200,
    commissionEarnedEur: 3350,
    assignedGuide: 'Ahmet Demir (TUREB #34-8891, English)',
    assignedVehicle: 'Mercedes Sprinter Extra Long VIP 34 BBA 891',
    hotelSelection: ['Four Seasons at the Bosphorus', 'Museum Hotel Cappadocia (Imperial Cave Suite)'],
    createdDate: '2026-07-14',
    lastUpdated: '2026-09-14',
    notes: 'VIP fast track arranged. Lord Harrington has gluten allergy; chef notified across all private dinner stops.',
    milestones: [
      { title: 'B2B Wholesale Costing Approved', completed: true, date: '15 Jul 2026' },
      { title: 'Hotel Direct Allocations Locked', completed: true, date: '20 Jul 2026' },
      { title: 'VIP Transport & Guide Assigned', completed: true, date: '01 Sep 2026' },
      { title: 'White-Label Roadbook Generated', completed: true, date: '10 Sep 2026' },
      { title: 'On-Ground Welcome & 24/7 Dispatch Active', completed: true, date: '12 Oct 2026' }
    ]
  },
  {
    id: 'rfp-902',
    referenceNumber: 'TR-B2B-2026-902',
    clientName: 'Vanguard Incentive High-Performers',
    agencyRef: 'VAN-INC-88',
    tripTitle: 'Bosphorus Yacht Gala & Turquoise Coast Private Gulet Charter',
    dates: '04 – 11 November 2026',
    paxCount: 14,
    durationDays: 8,
    destinations: ['Istanbul', 'Bodrum', 'Gocek Bays'],
    tier: 'Ultra Luxury & Private Charter',
    status: 'Deposit Paid / Confirmed',
    totalNetEur: 32600,
    grossClientEur: 39800,
    commissionEarnedEur: 7200,
    assignedGuide: 'Selin Karaca (TUREB Senior, English & German)',
    assignedVehicle: '2x VIP Mercedes Sprinters + 32m Gulet',
    hotelSelection: ['Mandarin Oriental Bosphorus', 'Private 32m Gulet Charter (Gocek)'],
    createdDate: '2026-08-02',
    lastUpdated: '2026-09-12',
    notes: 'Includes private fireworks permit on Bosphorus yacht sunset cruise. Final guest rooming list received.',
    milestones: [
      { title: 'Proposal & Custom Itinerary Costed', completed: true, date: '03 Aug 2026' },
      { title: '25% B2B Deposit Received & Locked', completed: true, date: '15 Aug 2026' },
      { title: 'Private Gulet Charter Contracted', completed: true, date: '20 Aug 2026' },
      { title: 'Flight Manifest & VIP Airport Transfer Scheduled', completed: false },
      { title: 'Final Balance Settlement (Due 30 Days Prior)', completed: false }
    ]
  },
  {
    id: 'rfp-903',
    referenceNumber: 'TR-B2B-2026-903',
    clientName: 'Dr. Robert Chen Family',
    agencyRef: 'SILK-904',
    tripTitle: 'Classical Anatolia, Lycian Way & Cappadocia Balloons',
    dates: '18 – 27 May 2027',
    paxCount: 4,
    durationDays: 10,
    destinations: ['Istanbul', 'Cappadocia', 'Antalya', 'Kas / Lycian Coast'],
    tier: '5-Star Luxury & Boutique Cave',
    status: 'Locked Proposal Ready',
    totalNetEur: 9800,
    grossClientEur: 12200,
    commissionEarnedEur: 2400,
    hotelSelection: ['Pera Palace Hotel', 'Argos in Cappadocia', 'Akra Hotel Antalya'],
    createdDate: '2026-09-08',
    lastUpdated: '2026-09-15',
    notes: 'Client requested 1 day of hiking on the Lycian Way with sea kayaking at Kekova sunken city.',
    milestones: [
      { title: 'B2B Custom Proposal Costed', completed: true, date: '09 Sep 2026' },
      { title: '24-Hour Price Lock Active until 25 Sep', completed: true, date: '09 Sep 2026' },
      { title: 'Client Review & Agency Deposit', completed: false },
      { title: 'Voucher Issuance & Guide Dispatch', completed: false }
    ]
  },
  {
    id: 'rfp-904',
    referenceNumber: 'TR-B2B-2026-904',
    clientName: 'Munich Alumni Society Group',
    agencyRef: 'BAV-ALM-2027',
    tripTitle: 'Archeological Wonders: Troy, Ephesus, Pergamon & Gobeklitepe',
    dates: '10 – 22 September 2027',
    paxCount: 16,
    durationDays: 13,
    destinations: ['Istanbul', 'Troy', 'Pergamon', 'Ephesus', 'Pamukkale', 'Sanliurfa / Gobeklitepe'],
    tier: '4-Star Premium & Boutique Heritage',
    status: 'Costing in Progress',
    totalNetEur: 28400,
    grossClientEur: 34500,
    commissionEarnedEur: 6100,
    hotelSelection: ['Colossae Thermal', 'Nisanyan Hotel Sirince', 'Manici Kasri Assos'],
    createdDate: '2026-09-15',
    lastUpdated: '2026-09-15',
    notes: 'Requires German-speaking senior archaeological guide throughout the 13-day itinerary.',
    milestones: [
      { title: 'RFP Received by Istanbul Ops Desk', completed: true, date: '15 Sep 2026' },
      { title: 'Detailed Tariff Costing Underway', completed: true, date: '15 Sep 2026' },
      { title: 'Proposal Delivery within 24 Hours', completed: false }
    ]
  }
];

export const WHITE_LABEL_ASSETS: WhiteLabelAsset[] = [
  {
    id: 'wl-01',
    title: 'Treasures of Turkey & Cappadocia (8-Day Classic Itinerary)',
    category: 'Unbranded Itineraries (Word/PDF)',
    format: 'DOCX / PDF',
    fileSize: '4.8 MB',
    description: 'Complete unbranded day-by-day itinerary with hotel descriptions, timing breakdown, inclusions/exclusions, and empty header for your agency logo.',
    thumbnail: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '#'
  },
  {
    id: 'wl-02',
    title: 'Lycian Way Coastal Trek & Sunken Ruins (7-Day Active Itinerary)',
    category: 'Unbranded Itineraries (Word/PDF)',
    format: 'DOCX / PDF',
    fileSize: '3.9 MB',
    description: 'Trail difficulty grading, route maps, sea kayaking details, and boutique guesthouse profiles ready for client presentation.',
    thumbnail: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '#'
  },
  {
    id: 'wl-03',
    title: 'High-Resolution Visual Media Pack: Cappadocia Sunrises & Fairy Chimneys',
    category: 'High-Res Photo Library',
    format: 'ZIP (25 High-Res Photos)',
    fileSize: '84 MB',
    description: 'Commercial-rights cleared 4K photography featuring hot air balloon takeoffs, cave suite interiors, and red valley panoramic sunset views.',
    thumbnail: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '#'
  },
  {
    id: 'wl-04',
    title: 'High-Resolution Visual Media Pack: Bosphorus Yachts & Ottoman Palaces',
    category: 'High-Res Photo Library',
    format: 'ZIP (25 High-Res Photos)',
    fileSize: '92 MB',
    description: 'Sunset yacht charter photography, Hagia Sophia interior details, Grand Bazaar artisans, and luxury dining settings.',
    thumbnail: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '#'
  },
  {
    id: 'wl-05',
    title: 'Turkey Travel Trade Selling Manual & Seasonality Cheat Sheet (2026/2027)',
    category: 'Destination Cheat Sheets',
    format: 'PDF Guide',
    fileSize: '6.2 MB',
    description: 'Regional weather charts, domestic flight connections, Ramadan & museum holiday calendars, dress codes, and visa policies for international travelers.',
    thumbnail: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '#'
  },
  {
    id: 'wl-06',
    title: 'Turkish Gastronomy & Wine Regions Guide (For Foodie Travelers)',
    category: 'Destination Cheat Sheets',
    format: 'PDF Guide',
    fileSize: '5.1 MB',
    description: 'Overview of Urla vineyards, Thrace wine route, Aegean olive oil culture, and Gaziantep UNESCO culinary traditions for luxury gastronomy clients.',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    downloadUrl: '#'
  }
];

export const LIVE_OPERATIONS_UPDATES = [
  {
    id: 'op-01',
    date: '15 Sep 2026',
    tag: 'Cappadocia Balloon Advisory',
    severity: 'info',
    title: 'Autumn 2026 Cappadocia Balloon Allocation Capacity',
    message: 'High demand anticipated for October/November departures. Baobab DMC has secured locked block allocations with Royal & Butterfly Balloons for all partner departures.'
  },
  {
    id: 'op-02',
    date: '12 Sep 2026',
    tag: 'Heritage Sites Access',
    severity: 'success',
    title: 'Ephesus Night Museum Illumination Extended',
    message: 'Ministry of Culture has confirmed that evening illumination walks through the Celsus Library at Ephesus will remain open through November 2026.'
  },
  {
    id: 'op-03',
    date: '05 Sep 2026',
    tag: 'Fleet Upgrade',
    severity: 'success',
    title: 'New 2026 Mercedes-Benz VIP Sprinter Fleet Operational',
    message: 'Eight brand-new Euro-6 VIP Mercedes Sprinter units have been added to our Istanbul and Antalya ground fleets, equipped with 5G Wi-Fi, Apple CarPlay, and leather reclining armchairs.'
  }
];
