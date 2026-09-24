import { AtlasTrip } from '../types';

export interface TravelAdvisorProfile {
  id: string;
  name: string;
  agencyName: string;
  consortium: 'Virtuoso' | 'Signature Travel Network' | 'Ensemble' | 'Travel Leaders' | 'Independent / Host Agency' | 'American Express Travel';
  email: string;
  phone: string;
  country: string;
  city: string;
  iataOrClia: string;
  verifiedStatus: boolean;
  tierDiscountRate: number; // 25% for all verified advisors
}

export interface ConsultantCatalogItem {
  id: string;
  title: string;
  slug: string;
  type: 'multi-day' | 'day-tour' | 'excursion' | 'luxury-experience';
  category: string;
  duration: string;
  daysCount: number;
  destinations: string[];
  image: string;
  highlights: string[];
  description: string;
  groupSize: string;
  retailPriceUSD: number;       // Standard RRP
  advisorNetPriceUSD: number;   // 25% Trade Reduction
  savingsUSD: number;           // 25% Commission/Discount
  includes: string[];
  excludes: string[];
}

export interface ConsultantBookingRecord {
  id: string;
  bookingReference: string;
  consultantId: string;
  consultantName: string;
  agencyName: string;
  consultantEmail: string;
  consultantPhone: string;
  iataOrClia: string;
  leadCustomerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry: string;
  guestCount: number;
  tripId: string;
  tripTitle: string;
  category: string;
  travelDate: string;
  duration: string;
  roomType: string;
  retailPricePerPax: number;
  discountPercentage: number;
  netPricePerPax: number;
  totalGrossRetail: number;
  totalNetPayable: number;
  advisorCommission: number;
  specialRequests: string;
  status: 'confirmed' | 'deposit_pending' | 'operating' | 'cancelled';
  createdAt: string;
}

export const PRESET_ADVISORS: TravelAdvisorProfile[] = [
  {
    id: 'adv-001',
    name: 'Eleanor Vance',
    agencyName: 'Vance Luxury Travel Group (Virtuoso Member)',
    consortium: 'Virtuoso',
    email: 'eleanor@vanceluxurytravel.com',
    phone: '+1 (415) 890-3412',
    country: 'United States',
    city: 'San Francisco, CA',
    iataOrClia: 'IATA #01294851',
    verifiedStatus: true,
    tierDiscountRate: 25,
  },
  {
    id: 'adv-002',
    name: 'Julian Montgomery',
    agencyName: 'Highland & Heritage Journeys (Signature)',
    consortium: 'Signature Travel Network',
    email: 'j.montgomery@highlandjourneys.co.uk',
    phone: '+44 20 7183 9920',
    country: 'United Kingdom',
    city: 'London',
    iataOrClia: 'ABTA #Y6192 / CLIA #8821',
    verifiedStatus: true,
    tierDiscountRate: 25,
  },
  {
    id: 'adv-003',
    name: 'Claire Beauchamp',
    agencyName: 'Odyssey Bespoke Travel (Ensemble)',
    consortium: 'Ensemble',
    email: 'claire@odysseybespoke.com.au',
    phone: '+61 2 9134 5500',
    country: 'Australia',
    city: 'Sydney, NSW',
    iataOrClia: 'AFTA #10948',
    verifiedStatus: true,
    tierDiscountRate: 25,
  }
];

// Price calculation helper: applies 25% discount
export function computeAdvisorRate(retailUSD: number): { net: number; savings: number } {
  const net = Math.round(retailUSD * 0.75);
  const savings = retailUSD - net;
  return { net, savings };
}

// Pricing base for multi-day trips (Atlas Trips)
export const TRIP_BASE_PRICES: Record<string, number> = {
  'trip-9509': 2850,   // Discover Turkey By Rail (10 Days / 9 Nights)
  'trip-9467': 95,     // Sunrise Walking Tour of Istanbul With Traditional Breakfast (6 Hours)
  'trip-9160': 1650,   // Cappadocia 7-Day Hiking Adventure (7 Days / 6 Nights)
  'trip-9137': 4650,   // Immersive All Turkey: Culinary & Cultural Tour (18 Days / 17 Nights)
  'trip-9134': 1850,   // Immersive Aegean Turkey: Culinary & Cultural tour (7 Days / 6 Nights)
  'trip-9078': 1350,   // Istanbul Adventure: Hike, Bike & Kayak (6 Days / 5 Nights)
  'trip-7717': 2450,   // Immersive Western Turkey: Culinary & Cultural Tour (10 Days / 9 Nights)
  'trip-7540': 1550,   // Kas: Hike, Bike, Kayak & Dive (7 Days / 6 Nights)
  'trip-7534': 580,    // Istanbul Short Break Tour (3 Days / 2 Nights)
  'trip-7531': 3450,   // Immersive Western & Eastern Turkey: Culinary & Cultural Tour (14 Days / 13 Nights)
  'trip-7530': 1750,   // 7 Churches of Revelation Tour (7 Days / 6 Nights)
  'trip-7525': 1480,   // Lycian Way Hike with Private Boat Trip (7 Days / 6 Nights)
  'trip-2956': 2650,   // Immersive Eastern Turkey: Culinary & Cultural tour (10 Days / 9 Nights)
  'trip-2954': 5900,   // The Premium Journey Across Turkey (10 Days / 9 Nights Ultra Luxury)
  'trip-2951': 1580,   // Immersive South Eastern Turkey: Culinary & Cultural tour (6 Days / 5 Nights)
};

// Pricing base for Day Tours & Regional Excursions
export const EXCURSION_BASE_PRICES: Record<string, number> = {
  'day-tour-kickstart': 65,                       // Istanbul Kick-Start Tour: First-Time Visitor Essentials
  'day-tour-byzantium-cistern': 85,               // Byzantium Hagia Sophia & Basilica Cistern Tour
  'day-tour-essentials-full-day': 320,            // Istanbul Essentials: 1-Day Private Guided Tour (Mercedes VIP)
  'day-tour-topkapi-harem': 95,                   // Istanbul Topkapı Palace & Imperial Harem Guided Tour
  'day-tour-best-of-cistern-mosque-bazaar': 90,   // Best of Istanbul: Basilica Cistern, Blue Mosque & Grand Bazaar
  'day-tour-topkapi-blue-mosque': 95,             // Topkapı Palace with Harem & Blue Mosque Guided Tour
  'day-tour-express-highlights': 250,             // Istanbul Express 1 or 2-Day City Highlights Private Tour
  'day-tour-taksim-galata-passages': 75,          // Taksim to Galata with Secret Passages Walking Tour
  'day-tour-galata-fener-balat-ferry': 95,        // Galata Tower, Fener & Balat with Golden Horn Ferry
  'day-tour-secret-streets': 80,                  // Istanbul Small-Group City and Secret Streets Tour with Guide
  'day-tour-10-tastings-food': 115,               // 10 Tastings of Istanbul Food Tour with a Local Host
  'day-tour-taste-two-continents': 135,           // Taste of Turkey in Two Continents: From Europe to Asian Kadıköy
  'day-tour-culinary-hotspots': 110,              // Culinary Istanbul: Local Hotspots & Gourmet Street Foods
  'day-tour-dinner-local-family': 125,            // Istanbul Food & Culture Tour: Dinner with a Local Family
  'day-tour-bosphorus-luxury-yacht': 550,         // Bosphorus Private Sunset Luxury Yacht Cruise (2 Hours)
  'exc-cappadocia-balloon': 280,                  // Cappadocia Sunrise Royal Hot Air Balloon Expedition
  'exc-cappadocia-valleys-jeep': 160,             // Cappadocia Off-Road 4x4 Sunset Safari
  'exc-ephesus-terrace-houses': 195,              // Ephesus Ancient Metropolis & Terrace Houses Scholar Tour
  'exc-pamukkale-hierapolis': 175,                // Pamukkale Travertines & Hierapolis Cleopatra Pool
  'exc-antalya-termessos': 185,                   // Antalya Termessos Eagle's Nest & Duden Waterfalls
  'exc-kekova-sea-kayaking': 145,                 // Kas to Kekova Sunken City Sea Kayaking & Private Gulet Swim
  'exc-sumela-monastery': 195,                    // Trabzon Sumela Monastery & Altindere Valley National Park
  'exc-gobeklitepe-karahantepe': 240,             // Sanliurfa Göbeklitepe & Karahantepe Dawn Expedition
  'exc-whirling-dervish': 65,                     // Mevlevi Sufi Whirling Dervishes Ceremony
  'exc-turkish-bath-hammam-vip': 140              // Historic Ottoman Hammam VIP Scrub & Massage
};

// Additional Curated Signature Excursions across Turkey
export const SIGNATURE_REGIONAL_EXCURSIONS: ConsultantCatalogItem[] = [
  {
    id: 'exc-cappadocia-balloon',
    title: 'Cappadocia Sunrise Royal Hot Air Balloon Expedition',
    slug: 'cappadocia-sunrise-royal-hot-air-balloon',
    type: 'luxury-experience',
    category: 'Cappadocia Signature Excursion',
    duration: '3.5 Hours (1 Hour Flight)',
    daysCount: 1,
    destinations: ['Cappadocia', 'Goreme'],
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Pre-dawn boutique hotel transfer to private launch site',
      'Champagne celebration upon landing and personalized flight certificate',
      'Panoramic 360-degree aerial views over Love Valley, Fairy Chimneys and Mount Erciyes',
      'Piloted by top-tier TÜRSAB and Civil Aviation master captains'
    ],
    description: 'Drift serenely above Cappadocia’s surreal volcanic lunar landscape as dawn breaks across Pigeon Valley and the fairy chimneys of Goreme. Complete with light breakfast, pilot briefing, luxury transfer, and celebratory toast upon touchdown.',
    groupSize: 'Small Basket (Max 12–16 Pax)',
    retailPriceUSD: 280,
    advisorNetPriceUSD: 210,
    savingsUSD: 70,
    includes: [
      'Hotel pick-up and drop-off in luxury Sprinter vehicle',
      'Light breakfast pastry & espresso buffet',
      '60-minute scenic flight with Master Aviation Pilot',
      'Landing toast & commemorative certificate',
      'Comprehensive passenger aviation insurance'
    ],
    excludes: [
      'Personal video/drone footage package (optional on-site)',
      'Gratuities for ground crew and pilot'
    ]
  },
  {
    id: 'day-tour-bosphorus-luxury-yacht',
    title: 'Bosphorus Private Sunset Luxury Yacht Cruise (2 Hours)',
    slug: 'bosphorus-private-sunset-luxury-yacht',
    type: 'luxury-experience',
    category: 'Istanbul Private Yachting',
    duration: '2 Hours Private Charter',
    daysCount: 1,
    destinations: ['Istanbul', 'Bosphorus Strait'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Private 42–55ft luxury motoryacht with captain and private steward',
      'Gliding between Europe and Asia along the Ottoman waterfront palaces',
      'Artisanal meze platters, fresh seasonal fruits, and Turkish boutique wine/soft drinks',
      'Front-row views of Dolmabahce Palace, Ciragan, Maiden’s Tower, and Rumeli Fortress'
    ],
    description: 'A sublime private escape on the legendary Bosphorus. Cruise past Ottoman summer palaces, wooden seaside yalis, and Byzantine fortresses while enjoying sunset champagne and gourmet appetizers under the silhouettes of Istanbul’s skyline.',
    groupSize: 'Private Charter (1–8 Pax)',
    retailPriceUSD: 550,
    advisorNetPriceUSD: 413,
    savingsUSD: 137,
    includes: [
      '2-hour private yacht charter with licensed captain and crew',
      'Selection of Turkish organic wine, sparkling water, tea and coffee',
      'Gourmet mezze platter and fresh fruit selection',
      'Fuel and private marina docking fees'
    ],
    excludes: [
      'Pier transfers (available upon request)',
      'Hard spirits and premium vintage champagnes',
      'Crew gratuity'
    ]
  },
  {
    id: 'exc-ephesus-terrace-houses',
    title: 'Ephesus Ancient Metropolis & Terrace Houses Scholar Tour',
    slug: 'ephesus-ancient-metropolis-terrace-houses-scholar-tour',
    type: 'excursion',
    category: 'Aegean Classical Antiquity',
    duration: 'Full Day (7 Hours)',
    daysCount: 1,
    destinations: ['Kusadasi', 'Izmir', 'Ephesus', 'Selcuk'],
    image: 'https://images.unsplash.com/photo-1548625361-195f1906a211?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Library of Celsus, Great Theater, and the Sacred Curetes Street',
      'VIP access to the newly restored Roman Terrace Houses (ancient luxury villas with frescoes)',
      'House of the Virgin Mary on Mount Koressos',
      'Private organic farm-to-table lunch in the historic Aegean village of Sirince'
    ],
    description: 'Walk in the footsteps of Roman emperors, Greek philosophers, and early apostles. Led by a university-affiliated archaeologist guide, explore one of the best-preserved classical cities in the Mediterranean, including the lavish Roman Roman Terrace Houses.',
    groupSize: 'Private or Small Group (Max 8)',
    retailPriceUSD: 195,
    advisorNetPriceUSD: 146,
    savingsUSD: 49,
    includes: [
      'Private air-conditioned Mercedes vehicle & driver',
      'Licensed archaeologist scholar guide',
      'Fast-track admissions to Ephesus & Roman Terrace Houses',
      'Admission to House of the Virgin Mary',
      'Farm-to-table lunch in Sirince'
    ],
    excludes: [
      'Personal purchases and alcoholic beverages at lunch',
      'Guide and driver gratuities'
    ]
  },
  {
    id: 'exc-kekova-sea-kayaking',
    title: 'Kas to Kekova Sunken City Sea Kayaking & Private Gulet Swim',
    slug: 'kas-kekova-sunken-city-sea-kayaking',
    type: 'excursion',
    category: 'Mediterranean Active & Coastal',
    duration: 'Full Day (6.5 Hours)',
    daysCount: 1,
    destinations: ['Kas', 'Kekova', 'Simena', 'Mediterranean'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Paddling directly above 2nd-century submerged Lycian ruins in crystal-clear waters',
      'Climbing to the Byzantine Castle at Simena with panoramic bay views',
      'Freshly cooked Mediterranean seafood lunch served on board a traditional wooden gulet',
      'Snorkeling in secluded turquoise coves inaccessible by road'
    ],
    description: 'An unforgettable adventure along the Turquoise Coast. Paddle tandem sea kayaks silently across the protected marine park of Kekova, hovering directly over ancient submerged staircases, amphorae, and walls destroyed by earthquakes 1,800 years ago.',
    groupSize: 'Small Group (Max 10 Pax)',
    retailPriceUSD: 145,
    advisorNetPriceUSD: 109,
    savingsUSD: 36,
    includes: [
      'High-performance sea kayaks, life vests, dry bags and safety equipment',
      'Certified BCU kayak instructor and local guide',
      'Support boat escort throughout',
      'Fresh Mediterranean lunch at seaside tavern in Simena',
      'Transfer from Kas hotels to Ucagiz harbor'
    ],
    excludes: [
      'Simena Castle entrance ticket',
      'Drinks and personal expenses'
    ]
  },
  {
    id: 'exc-gobeklitepe-karahantepe',
    title: 'Sanliurfa Göbeklitepe & Karahantepe Dawn Expedition (12,000 BC)',
    slug: 'sanliurfa-gobeklitepe-karahantepe-dawn-expedition',
    type: 'excursion',
    category: 'Eastern Anatolia Archaeology',
    duration: 'Full Day (8 Hours)',
    daysCount: 1,
    destinations: ['Sanliurfa', 'Gobeklitepe', 'Karahantepe', 'Mesopotamia'],
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Sunrise exploration of Göbeklitepe—the world’s oldest known megalithic temple complex',
      'Exclusive archaeological briefing at Karahantepe (Taş Tepeler excavation site)',
      'Sanliurfa Archaeology Museum (housing the Urfa Man statue, 9000 BC)',
      'Traditional Urfa kebab and isot pepper tasting lunch'
    ],
    description: 'Journey back 12,000 years to the dawn of human civilization in Upper Mesopotamia. Examine the monumental T-shaped limestone pillars carved with predatory beasts, 7,000 years older than Stonehenge and the Pyramids of Giza.',
    groupSize: 'Private or Small Group (Max 8)',
    retailPriceUSD: 240,
    advisorNetPriceUSD: 180,
    savingsUSD: 60,
    includes: [
      'Private VIP transportation in Sanliurfa',
      'Senior archaeologist guide specializing in Neolithic Anatolia',
      'Fast-track entries to Göbeklitepe, Karahantepe, and Sanliurfa Museum',
      'Traditional Mesopotamian feast lunch'
    ],
    excludes: [
      'Flights into Sanliurfa GAP Airport (can be arranged)',
      'Personal souvenirs'
    ]
  },
  {
    id: 'exc-whirling-dervish',
    title: 'Mevlevi Sufi Whirling Dervishes Ceremony at 600-Year-Old Caravanserai',
    slug: 'mevlevi-sufi-whirling-dervishes-ceremony',
    type: 'day-tour',
    category: 'Cultural & Spiritual Heritage',
    duration: '1.5 Hours',
    daysCount: 1,
    destinations: ['Istanbul', 'Sirkeci'],
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Authentic Sema ritual recognized by UNESCO as an Intangible Cultural Masterpiece',
      'Live classical Turkish Sufi ensemble with ney (reed flute) and kudum drums',
      'Setting in the 15th-century historic Hodjapasha cultural hammam or ancient Han',
      'Program booklet with spiritual explanation of Mevlana Rumi’s philosophy'
    ],
    description: 'Witness the mystical journey of spiritual ascent through love, truth, and devotion. The Sema ceremony features dervishes dressed in symbolic white robes and tall camel-hair hats, spinning in synchronized meditative perfection.',
    groupSize: 'Reserved VIP Seating',
    retailPriceUSD: 65,
    advisorNetPriceUSD: 49,
    savingsUSD: 16,
    includes: [
      'Reserved Category-A central seating',
      'Live 60-minute Sema ceremony & musical performance',
      'Complimentary Turkish tea & sherbet before the recital',
      'Explanatory guidebook'
    ],
    excludes: [
      'Hotel transfers',
      'Personal photo/video recording (not permitted during active prayer)'
    ]
  }
];

// Helper to convert any AtlasTrip or Day Tour into a standardized ConsultantCatalogItem with 25% discount
export function formatTripForConsultant(trip: AtlasTrip): ConsultantCatalogItem {
  const basePrice = TRIP_BASE_PRICES[trip.id] || EXCURSION_BASE_PRICES[trip.id] || (trip.daysCount > 1 ? trip.daysCount * 250 : 85);
  const { net, savings } = computeAdvisorRate(basePrice);

  return {
    id: trip.id,
    title: trip.title,
    slug: trip.slug,
    type: trip.daysCount > 1 ? 'multi-day' : 'day-tour',
    category: trip.category || (trip.daysCount > 1 ? 'Multi-Day Guided Journey' : 'Day Tour'),
    duration: trip.duration || `${trip.daysCount} Days`,
    daysCount: trip.daysCount || 1,
    destinations: trip.destinations || ['Turkey'],
    image: trip.image || (trip.images && trip.images[0]) || 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    highlights: trip.highlights || [],
    description: trip.description,
    groupSize: trip.groupSize || 'Private or Small Group',
    retailPriceUSD: basePrice,
    advisorNetPriceUSD: net,
    savingsUSD: savings,
    includes: trip.includes || ['Licensed English Guide', 'VIP Ground Transportation', 'Admissions'],
    excludes: trip.excludes || ['International flights', 'Personal insurance', 'Gratuities']
  };
}
