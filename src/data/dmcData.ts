import { Destination, DmcService, SampleItinerary, VenueShowcase } from '../types';

export const DMC_STATS = [
  { value: '15+', label: 'Years in Turkey', sub: 'Established 2011' },
  { value: '180+', label: 'B2B Global Partners', sub: 'Tour Operators & Agencies' },
  { value: 'A-15764', label: 'TURSAB Licensed', sub: 'A-Grade Turkish Operator' },
  { value: '2–14', label: 'Small Group & FIT', sub: 'Customizable Pacing' },
  { value: '24/7', label: 'Ground Dispatch', sub: 'Wholesale Ops Desk' },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'istanbul',
    name: 'Istanbul & Bosphorus',
    regionTag: 'Historic Bosphorus & Old City',
    region: 'Marmara',
    tagline: 'The Imperial Crossroads of Continents, Byzantine Wonders & Vibrant Quarters',
    description: 'Where East meets West across the glittering Bosphorus strait. Istanbul fuses millennia of Roman, Byzantine, and Ottoman heritage with lively artisan markets, vibrant culinary trails, and authentic boutique neighborhood walks.',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Sultanahmet Square and Blue Mosque in golden morning light',
      'Sixth-century Hagia Sophia grand dome and historic courtyard',
      'Galata Tower rising above the historic skyline and Golden Horn',
      'Historic cobblestone alleys and Ottoman wooden architectural heritage',
      'Bosphorus sunset cruise between European and Asian continents'
    ],
    highlights: [
      'Private sunset cruise on the Bosphorus strait between Europe and Asia',
      'Curated after-hours visits to the Basilica Cistern & Hagia Sophia',
      'Hidden courtyards, artisan silversmiths & rooftop views in the Grand Bazaar',
      'Small-group culinary walking tour through Kadikoy spice & fish markets',
      'Historical walking explorations of Fener, Balat, and Galata heritage quarters'
    ],
    bestSeason: 'Year-round (Optimal: April–June & September–November)',
    signatureExperiences: [
      'Private Bosphorus Wooden Boat Sunset Gathering',
      'Culinary Masterclass with Local Home Cooks',
      'VIP Airport Meet & Assist (IST & SAW)'
    ],
    exclusiveVenues: ['Pera Palace Hotel Heritage Salon', 'Binbirdirek Cistern', 'Sait Halim Pasha Courtyard', 'Galata Mevlevihanesi'],
    airportCode: 'IST / SAW',
    quickFacts: {
      idealDuration: '3 – 5 Days',
      bestFor: 'Culture, Architecture, Culinary Trails & Shopping',
      keyHubs: 'Sultanahmet, Galata, Bosphorus Shores, Kadikoy',
      travelStyle: 'Boutique Hotel & Walking Explorations',
      unescoSites: 'Historic Areas of Istanbul (Hagia Sophia, Topkapi, Blue Mosque)',
      culinarySpecialty: 'Meze culture, Bosphorus fresh seafood, Ottoman palace stews & street simit'
    }
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia & Central Anatolia',
    regionTag: 'Volcanic Valleys & Fairy Chimneys',
    region: 'Central Anatolia',
    tagline: 'Surreal Lunar Valleys, Valley Hikes & Sunrise Hot Air Balloons',
    description: 'A wonderland sculpted by volcanic eruptions, erosion, and early Christian cave dwellers. Hike hidden fairy chimney valleys, float above lunar formations at sunrise, stay in authentic boutique cave suites, and explore multi-level underground cities.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/6e/8b/0e/6d/4b/v1_E10/E108WXLE.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=4b9d533d63cb4bb08c118d5b610bf41abe7ad0ee2807d8fa5e0ee0c12cd27d14',
    galleryImages: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Sunrise hot air balloons drifting over Cappadocia\'s volcanic canyons',
      'Trekking scenic ridgelines through Pigeon and Rose Valleys',
      'Ancient fairy chimneys and rock hermitage carvings in Pasabag',
      'Panoramic vistas from Uchisar rock citadel overlooking Pigeon Valley',
      'Historic cave suite terraces and atmospheric volcanic dwellings'
    ],
    highlights: [
      'Sunrise hot-air balloon flight gliding over fairy chimneys with champagne landing',
      'Guided trail hike through Rose, Red, and Pigeon Valleys away from tour crowds',
      'Small-group exploration of Kaymakli and Derinkuyu multi-level underground cities',
      'Sunset horseback or open-top safari through Love Valley',
      'Boutique wine tastings in historic volcanic rock cellars with local winemakers'
    ],
    bestSeason: 'April through November (Winter snow ballooning also magical)',
    signatureExperiences: [
      'Private Valley Sunset Picnic with Local Delicacies',
      'Avanos Master Potter Wheel Hands-on Workshop',
      'Restored Boutique Cave Hotel Stays'
    ],
    exclusiveVenues: ['Museum Hotel Valley Terraces', 'Argos in Cappadocia Rock Cellars', 'Devrent Valley Scenic Lookouts'],
    airportCode: 'NAV / ASR',
    quickFacts: {
      idealDuration: '3 – 4 Days',
      bestFor: 'Hot Air Balloons, Valley Trekking, Cave Hotels & Geology',
      keyHubs: 'Goreme, Uchisar, Urgup, Ortahisar, Avanos',
      travelStyle: 'Boutique Cave Suites & Scenic Soft Adventure',
      unescoSites: 'Goreme National Park and the Rock Sites of Cappadocia',
      culinarySpecialty: 'Testi pottery kebab slow-cooked in clay pots, volcanic rock-aged wines'
    }
  },
  {
    id: 'turkish-riviera',
    name: 'Turkish Riviera & Lycian Coast',
    regionTag: 'Mediterranean Coast & Turquoise Bays',
    region: 'Mediterranean',
    tagline: 'Lycian Trail Hikes, Sunken Ruins, Gulet Cruising & Mountain Canyons',
    description: 'Where the pine-clad Taurus Mountains drop into turquoise Mediterranean waters. Antalya, Kas, Fethiye, and Kalkan form the Turkish Riviera—offering coastal hiking along the Lycian Way, sea kayaking over sunken ruins, and secluded bay yachting.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/58/47/14/1d/06/v1_E10/E10H1JC9.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=cd2e0bef67cfb525b0f922a9b36164f463e8d3df5980166e85db28c459919ee0',
    galleryImages: [
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Picturesque harbor and turquoise Mediterranean waters of Kas',
      'Sea kayaking directly over the submerged ancient ruins of Kekova',
      'Trekking cliff-edge coastal footpaths along the scenic Lycian Way',
      'Kaputas beach canyon and vibrant Mediterranean turquoise surf',
      'Secluded pine-fringed bays and crystal-clear marine waters'
    ],
    highlights: [
      'Guided trekking on scenic segments of the world-renowned Lycian Way',
      'Sea kayaking over the sunken Lycian ruins of Simena and Kekova island',
      'Ancient Roman theater exploration at Aspendos, Perge, and Termessos mountain ruins',
      'Guided walking tours through the historic Ottoman cobblestone quarter of Kaleici',
      'Private gulet day charters to secluded Oludeniz, Butterfly Valley, and Gocek coves'
    ],
    bestSeason: 'April through June & September through November (Mild trekking & warm waters)',
    signatureExperiences: [
      'Kekova Sunken Ruins Sea Kayaking Expedition',
      'Mount Tahtali Cable Car & Alpine Trail Descent',
      'Private Gocek Bay Wooden Gulet Secluded Swimming'
    ],
    exclusiveVenues: ['Kaleici Historic Courtyards', 'Termessos Mountain Amphitheater', 'Simena Castle Lookout'],
    airportCode: 'AYT / DLM',
    quickFacts: {
      idealDuration: '4 – 7 Days',
      bestFor: 'Coastal Hiking, Sea Kayaking, Ancient Lycian Tombs & Beach Lodges',
      keyHubs: 'Antalya Kaleici, Kas, Kalkan, Fethiye, Gocek',
      travelStyle: 'Active Coastal Exploration & Boutique Beachfront Stays',
      unescoSites: 'Xanthos-Letoon, Termessos (Tentative), Aspendos Theatre',
      culinarySpecialty: 'Wild Mediterranean mountain greens, grilled seabass, Antalya tahini piyaz'
    }
  },
  {
    id: 'aegean-turkiye',
    name: 'Aegean Turkiye & Ephesus',
    regionTag: 'Ancient Ionian Coast, Olive Groves & Wine Routes',
    region: 'Aegean',
    tagline: 'Classical Antiquity, Vineyards, Whitewashed Villages & Blue Cruises',
    description: 'The storied Aegean coast blends world-wonder classical antiquity with olive groves, artisanal vineyards, and whitewashed seaside villages. Spanning Ephesus, Izmir, Bodrum, Urla, Sirince, and Pamukkale terraces.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Ephesus_-_Celsus_Library.jpg/1280px-Ephesus_-_Celsus_Library.jpg',
    galleryImages: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Ephesus_Celsus_Library_Fa%C3%A7ade.jpg/1280px-Ephesus_Celsus_Library_Fa%C3%A7ade.jpg',
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Library_of_Celsus_6242.jpg/1280px-Library_of_Celsus_6242.jpg'
    ],
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Magnificent Library of Celsus in ancient Roman Ephesus',
      'Bodrum Castle and the sparkling turquoise marina',
      'Urla wine trail estates and vineyard dining overlooking the Aegean',
      'Centuries-old Aegean olive orchards and peaceful stone villages',
      'Fresh wild Aegean herbs and Mediterranean cold-pressed olive oil mezze'
    ],
    highlights: [
      'Scholar-guided walkthrough of Ephesus marble avenues and Roman Terrace Houses',
      'Boutique wine tastings and olive oil estates along the Urla Wine Route',
      'Handcrafted Turkish wooden gulet sailing and private swimming bays in Bodrum',
      'Cobblestone Greek-heritage stone alleys of Alacati and hillside Sirince village',
      'Mineral-rich thermal water pools and white travertine cascades at Pamukkale-Hierapolis'
    ],
    bestSeason: 'April through November (Spring wildflowers & Autumn harvest)',
    signatureExperiences: [
      'Private Archaeologist Commentary at Ephesus',
      'Organic Olive Harvest & Cold-Press Tasting in Sirince',
      'Private Bodrum Wooden Gulet Blue Cruise Expedition'
    ],
    exclusiveVenues: ['Library of Celsus Forecourt', 'Urla Vineyard Estates', 'Bodrum Castle Grounds'],
    airportCode: 'ADB / BJV / DNZ',
    quickFacts: {
      idealDuration: '4 – 6 Days',
      bestFor: 'Greco-Roman Archaeology, Wine Roads, Gulet Sailing & Olive Groves',
      keyHubs: 'Izmir, Kusadasi, Selcuk, Bodrum, Urla, Alacati',
      travelStyle: 'Cultural Heritage, Boutique Wine Resorts & Gulet Charters',
      unescoSites: 'Ephesus, Hierapolis-Pamukkale, Pergamon, Aphrodisias',
      culinarySpecialty: 'Cold-pressed extra virgin olive oil dishes (Zeytinyagli), Urla artichokes, Aegean herbs'
    }
  },
  {
    id: 'black-sea',
    name: 'Black Sea & Pontic Alps',
    regionTag: 'Emerald Tea Plantations & Mountain Monasteries',
    region: 'Black Sea',
    tagline: 'Lush Alpine Plateaus, Cloud Forests, Sumela Monastery & Tea Hills',
    description: 'A misty realm of emerald-green valleys, rushing glacial rivers, and dramatic Pontic mountain peaks. Discover cliff-hanging Byzantine monasteries, centuries-old Ottoman stone bridges, tea plantations, and timber alpine lodges.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/a4/18/80/17/a7/v1_E10/E10FHDQY.JPG?w=1600&cf_fit=scale-down&q=85&format=auto&s=c50e41554c4cf5175999e6602992efb4837a026f84409cf85a382b2883e9b6d7',
    galleryImages: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Sumela Monastery clinging to sheer rock cliffs in Altindere Valley, Trabzon',
      'Misty cloud-sea panorama above high alpine pasture plateaus in Rize',
      'High alpine pine forests and trekking trails of the Kackar Mountains',
      'Historic Ottoman timber architecture of traditional Black Sea mansions',
      'Glacial rivers and stone arch bridges in the lush Firtina Valley'
    ],
    highlights: [
      'Sumela Monastery clinging impossibly to a 300-meter sheer cliff in Altindere Valley',
      'Scenic hikes across high alpine pasture plateaus (Ayder, Pokut, and Sal Yaylasi)',
      'Tea plantation walks and tastings in Rize overlooking the misty Black Sea coast',
      'Traditional wooden Ottoman timber mansions in Safranbolu and Amasya',
      'Whitewater rafting and suspension bridge crossings along the Firtina River'
    ],
    bestSeason: 'June through September (Pleasant mountain weather and lush blooming flora)',
    signatureExperiences: [
      'Exclusive Sunrise Cloud-Sea Viewing at Pokut Plateau',
      'Artisanal Black Sea Tea Plucking & Master Workshop in Camlihemsin',
      'Private Scholar Tour of Sumela Rock Frescoes'
    ],
    exclusiveVenues: ['Sumela Valley Lookout Pavilion', 'Historic Safranbolu Konak Mansions', 'Firtina Valley Riverside Lodges'],
    airportCode: 'TZX / RZV',
    quickFacts: {
      idealDuration: '3 – 5 Days',
      bestFor: 'Mountain Trekking, Cloud Plateaus, Tea Culture & Monastery Architecture',
      keyHubs: 'Trabzon, Rize, Camlihemsin, Artvin, Safranbolu',
      travelStyle: 'Eco-Lodge Mountain Retreat & High Plateau Trekking',
      unescoSites: 'City of Safranbolu, Historic Sumela Monastery (Tentative)',
      culinarySpecialty: 'Muhlama (fondue-style cornmeal & melted cheese), fresh Black Sea trout, Laz pastry'
    }
  },
  {
    id: 'troy-and-around',
    name: 'Troy, Gallipoli & North Aegean',
    regionTag: 'Homeric Legends & Dardanelles Maritime Straits',
    region: 'North Aegean & Marmara',
    tagline: 'Homeric Legends, Dardanelles Straits, Gallipoli & Ancient Assos',
    description: 'Where myth, classical philosophy, and modern history converge. Explore the legendary archaeological layers of Troy and its award-winning museum, Aristotle’s academy at hilltop Assos overlooking Lesbos island, and the historic Gallipoli battlefields.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/7d/b4/c0/89/51/v1_E10/E1077UM2.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=78f0a75c3f548500c4176077c966cb0087d849950fdd003f5e0707e53193c048',
    galleryImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599818818580-0a2c2069279d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Classical stone ruins and multi-layered archaeological excavations of Troy',
      'Doric columns of Temple of Athena at hilltop Assos overlooking the Aegean',
      'Dardanelles maritime shipping straits connecting the Aegean and Marmara',
      'Gallipoli peninsula historical park, ANZAC Cove and commemorative headlands',
      'Peaceful stone mountain hamlets and centuries-old olive orchards on Mount Ida'
    ],
    highlights: [
      'Scholar-guided walkthrough of the 9 archaeological strata of ancient Troy (Iliad epic)',
      'Curated private visit to the world-renowned, award-winning Museum of Troy',
      'Sunset at the Temple of Athena in Assos with panoramic views over the Aegean Sea',
      'Respectful commemorative private tour of ANZAC Cove and Gallipoli peninsula memorials',
      'Boutique stone village strolls and seaside olive oil tasting in Adatepe and Mount Ida'
    ],
    bestSeason: 'March through June & September through November (Cool Aegean breezes)',
    signatureExperiences: [
      'Private Classical Archaeologist Tour of Troy Excavations',
      'Sunset Classical Poetry Reading at the Temple of Athena, Assos',
      'Mount Ida (Kaz Dagi) Mythological Herbal Walk & Olive Tasting'
    ],
    exclusiveVenues: ['Museum of Troy Courtyard', 'Assos Acropolis Amphitheatre', 'Mount Ida Stone Sanctuary Retreats'],
    airportCode: 'CKZ / EDO / IST',
    quickFacts: {
      idealDuration: '2 – 4 Days',
      bestFor: 'Mythology, Homeric History, Military Memorials & Stone Villages',
      keyHubs: 'Canakkale, Troy, Assos (Behramkale), Gallipoli, Bozcaada Island',
      travelStyle: 'Historical Expedition & Intimate Coastal Heritage Lodges',
      unescoSites: 'Archaeological Site of Troy, Gallipoli Historical National Park (Tentative)',
      culinarySpecialty: 'Mount Ida wild mountain thyme, North Aegean olive oils, Ezine goat cheese'
    }
  },
  {
    id: 'eastern-southeastern-anatolia',
    name: 'Eastern & Southeastern Anatolia',
    regionTag: 'Cradle of Civilization, Mesopotamia & Silk Road Fortresses',
    region: 'Eastern & Southeastern',
    tagline: '12,000-Year-Old Gobeklitepe, Mount Nemrut Colossi & Silk Road Citadels',
    description: 'An awe-inspiring journey through the earliest chapters of human civilization. Spanning the monumental 12,000-year-old megaliths of Gobeklitepe and Karahantepe, the giant stone heads of Mount Nemrut, honey-colored limestone mansions of Mardin, and the legendary Silk Road outpost of Kars and Ani.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/aa/52/d4/7f/9f/v1_E10/E104D6EW.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=899e5586be4dcd13d370b1c9c56a8e773ab854815324c7c39a64db4bbe4eeb6b',
    galleryImages: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599818818580-0a2c2069279d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Colossal 2,000-year-old stone heads atop Mount Nemrut sanctuary',
      '11,500-year-old monumental T-shaped stone pillars of Gobeklitepe',
      'Tiered honey-colored limestone architecture and minarets of ancient Mardin',
      'World-famous culinary feasts of sizzling kebabs and pistachio baklava in Gaziantep',
      'Medieval ruins and stone ramparts of Ani on the Silk Road frontier gorge'
    ],
    highlights: [
      'Scholar-led discovery of 12,000-year-old T-shaped obelisks at Gobeklitepe and Karahantepe',
      'Sunrise or sunset over the colossal stone god statues atop Mount Nemrut sanctuary',
      'Walking through the labyrinthine stone alleys and Syriac monasteries of Mardin',
      'UNESCO gastronomy food tour in Gaziantep (world-famous pistachio baklava & spice bazaars)',
      'Exploration of the ancient Armenian medieval ghost city of Ani on the Silk Road frontier'
    ],
    bestSeason: 'April through June & September through November (Pleasant climate avoiding summer heat)',
    signatureExperiences: [
      'Private Briefing with Resident Field Archaeologists at Upper Mesopotamia digs',
      'Dawn Ascendancy to Mount Nemrut Royal Tumulus',
      'Traditional Anatolian Sira Night Musical Feast in a Restored Stone Caravanserai'
    ],
    exclusiveVenues: ['Historic Mardin Stone Mansions', 'Sanliurfa Caravanserai Courtyards', 'Zeugma Roman Mosaic Museum'],
    airportCode: 'GZT / GNY / MQM',
    quickFacts: {
      idealDuration: '5 – 8 Days',
      bestFor: 'Prehistoric Archaeology, Biblical Heritage, Silk Road Citadels & World Gastronomy',
      keyHubs: 'Sanliurfa, Gaziantep, Mardin, Mount Nemrut, Kars & Ani, Van',
      travelStyle: 'Deep Archaeology Expedition & Restored Silk Road Caravanserais',
      unescoSites: 'Gobeklitepe, Nemrut Dag, Archaeological Site of Ani, Diyarbakir Fortress',
      culinarySpecialty: 'Gaziantep wood-fired kebabs, copper-tray pistachio baklava, Mardin spiced lamb rice'
    }
  },
  {
    id: 'pamukkale-hierapolis-aphrodisias',
    name: 'Pamukkale, Hierapolis & Aphrodisias',
    regionTag: 'Thermal Travertines & Classical Sculptors',
    region: 'Aegean',
    tagline: 'Snow-White Mineral Cascades, Sacred Thermal Pools & Marble Masterpieces',
    description: 'A dazzling natural spectacle and classical sanctuary. Walk the glowing snow-white calcite travertines of Pamukkale, swim among fallen Roman columns in Cleopatra’s thermal pool, and wander through Aphrodisias—the ancient world’s legendary school of marble sculpture.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/37/09/9a/fb/53/v1_E10/E10880A9.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=2b84144fa737f73ebb8b9b1de8bb4c62921d0ab157f902b56161800e075dcbe2',
    galleryImages: [
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Dazzling snow-white mineral travertine terraces and thermal pools of Pamukkale',
      'Cleopatra\'s Antique Pool with submerged ancient Roman marble fluted columns',
      'Steep Roman hillside theater of Hierapolis overlooking the Lycus Valley',
      'Monumental Tetrapylon marble gateway and stadium of ancient Aphrodisias',
      'Thermal mineral springs and historic healing waters of Denizli-Pamukkale'
    ],
    highlights: [
      'Walking barefoot across the mineral-rich thermal white travertine terraces of Pamukkale',
      'Swimming over submerged 2nd-century Roman marble columns in Cleopatra’s Antique Pool',
      'Scholar-led tour of the monumental Roman Theatre and Necropolis of Hierapolis',
      'Private discovery of UNESCO-listed Aphrodisias, its monumental Tetrapylon and Stadium',
      'Thermal wellness treatments and mineral mud baths at historic Karahayit springs'
    ],
    bestSeason: 'March through June & September through November (Pleasant warm thermal weather)',
    signatureExperiences: [
      'Sunrise Hot Air Balloon Flight over Pamukkale White Terraces',
      'Exclusive Archaeological Access to Aphrodisias Sculptors Museum',
      'Thermal Spa & Mineral Spring Wellness Session'
    ],
    exclusiveVenues: ['Hierapolis Roman Theatre Forecourt', 'Aphrodisias Tetrapylon Grounds', 'Thermal Boutique Spa Retreats'],
    airportCode: 'DNZ / ADB',
    quickFacts: {
      idealDuration: '2 – 3 Days',
      bestFor: 'Thermal Wellness, Travertine Formations, Roman Archaeology & Marble Art',
      keyHubs: 'Pamukkale, Denizli, Karahayit, Geyre (Aphrodisias)',
      travelStyle: 'Thermal Spa & Classical Archaeology Walk',
      unescoSites: 'Hierapolis-Pamukkale, Aphrodisias',
      culinarySpecialty: 'Denizli tandoori roasted lamb, local Aegean thyme honeys, sun-dried figs'
    }
  },
  {
    id: 'lake-van-ararat',
    name: 'Lake Van & Mount Ararat',
    regionTag: 'Dogubayazit Citadel, Biblical Peaks & Lake Van',
    region: 'Eastern & Southeastern',
    tagline: 'Turquoise Soda Lake, Akdamar Church, Ishak Pasha Palace & Biblical Ararat',
    description: 'A dramatic wilderness frontier where snow-draped Mount Ararat towers over vast volcanic plateaus and saline Lake Van. Explore the 10th-century stone carvings of Akdamar Holy Cross Church, Urartian citadels, and the fairytale clifftop Ishak Pasha Palace.',
    heroImage: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/62/c6/9c/a0/87/v1_E10/E10AQQ1B.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=db397501b14c75ff5cecdb5677a2b5a4403b6e304e6928dc64ea04b50df018e9',
    galleryImages: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'
    ],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599818818580-0a2c2069279d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Turquoise waters of Lake Van with Akdamar Island and snow-capped peaks',
      'Snow-draped Mount Ararat soaring 5,137m over high Eastern Anatolian plateau',
      'Clifftop Silk Road palace fortress of Ishak Pasha in Dogubayazit',
      'Urartian Iron Age fortress rock inscriptions and walls overlooking Lake Van',
      'World-famous Van breakfast ritual with wild herbal cheeses and Anatolian honeys'
    ],
    highlights: [
      'Boat cruise to Akdamar Island to admire 10th-century biblical stone bas-reliefs',
      'Sunrise over the legendary clifftop Ishak Pasha Palace on the Silk Road in Dogubayazit',
      'Panoramic viewpoints of snow-capped Mount Ararat (5,137m, legendary resting site of Noah’s Ark)',
      'Exploring the Urartian Iron Age cuneiform rock inscriptions at the Rock of Van Fortress',
      'Savoring the world-famous Van Breakfast ritual featuring over 20 artisanal local cheeses & honey'
    ],
    bestSeason: 'May through October (Clear high-altitude mountain skies and mild plateau days)',
    signatureExperiences: [
      'Private Boat Excursion to Akdamar Island with Art Historian',
      'Sunset Viewing from the Outer Terraces of Ishak Pasha Palace',
      'Authentic Van Multi-Course Herbal Cheese & Honey Breakfast'
    ],
    exclusiveVenues: ['Ishak Pasha Palace Grand Courtyard', 'Akdamar Island Lakeside Promontory', 'Lake Van Shoreline Retreats'],
    airportCode: 'VAN / IGD / AJI',
    quickFacts: {
      idealDuration: '3 – 4 Days',
      bestFor: 'Volcanic Landscapes, Medieval Armenian Art, Urartian History & High Plateaus',
      keyHubs: 'Van, Tatvan, Dogubayazit, Ahlat',
      travelStyle: 'High Plateau Expedition & Cultural Wilderness Discovery',
      unescoSites: 'Seljuk Tombs of Ahlat (Tentative), Ishak Pasha Palace (Tentative)',
      culinarySpecialty: 'Famous Van breakfast feast, otlu peynir (wild herb sheep cheese), Lake Van pearl mullet'
    }
  }
];

export const DMC_SERVICES: DmcService[] = [
  {
    id: 'small-group-tours',
    title: 'Small Group Cultural Tours',
    shortDesc: 'Curated intimate journeys (6 to 14 guests) with licensed scholar guides and boutique accommodations.',
    fullDesc: 'We believe travel is profoundly enriched when groups remain small. Our small group cultural tours ensure effortless mobility, access to places large buses can never reach, and deep personal conversations with local historians, artisans, and chefs.',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Strictly limited group sizes (typically 6–14 travelers) for personalized attention',
      'Accommodations in character-rich boutique hotels, restored mansions & cave suites',
      'Licensed expert guides holding degrees in archaeology, history, and art',
      'No rigid commercial shopping stops—only genuine artisan workshops',
      'Smooth inter-city transit in luxury Mercedes VIP Sprinters with Wi-Fi'
    ],
    stats: { value: '6–14', label: 'Ideal Group Cap' }
  },
  {
    id: 'active-adventures',
    title: 'Active Adventures & Trekking',
    shortDesc: 'Guided hiking along the Lycian Way, Cappadocia valley trekking, hot air ballooning, and sea kayaking.',
    fullDesc: 'For travelers who want to experience Turkey on foot and outdoors. From traversing the ancient coastal paths of the Lycian Way to canyoning in the Taurus Mountains, sunrise ballooning over volcanic gorges, and sea kayaking across submerged ruins.',
    icon: 'Compass',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/a4/94/f8/63/2a/v1_E10/E102FGD9.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=617860541f26f75c5f19847ad9ddb4783c5a7c153a4c6aacbfde8d6d0e3dc91c',
    features: [
      'Certified outdoor & trekking guides with wilderness first-aid certifications',
      'Carefully paced daily hikes with luggage transfers and support vehicles',
      'Multi-sport options: valley trail running, sea kayaking, canyoning & e-biking',
      'Authentic mountain village stays, local farm lunches, and campfire teas',
      'Full route briefing, trail GPS maps, and 24/7 on-ground emergency support'
    ],
    stats: { value: '400+ km', label: 'Curated Trail Routes' }
  },
  {
    id: 'culinary-expeditions',
    title: 'Culinary & Local Food Trails',
    shortDesc: 'Small-group food tours from Istanbul spice alleys to Gaziantep UNESCO kitchens and Aegean olive groves.',
    fullDesc: 'Immerse your guests in one of the world’s great culinary traditions. Cook with village grandmothers, taste regional cheeses in hidden Grand Bazaar courtyards, visit olive oil pressers in Urla, and sample street food with local food journalists.',
    icon: 'Utensils',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/ca/d0/c6/ce/eb/v1_E10/E108QNNK.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=cf588ca1c2aa13601e3dbf75c7c6629a84bba2df5b15e9c46a183eb1146d3897',
    features: [
      'Led by passionate food guides, cookbook authors, and certified sommelier partners',
      'Behind-the-scenes visits to historic bakeries, wood-fired ovens, and spice masters',
      'Hands-on cooking workshops featuring regional Anatolian and Ottoman recipes',
      'Boutique Turkish wine tastings showcasing indigenous grapes (Okuzgozu, Bogazkere)',
      'Vegetarian and dietary-friendly adaptations seamlessly integrated'
    ],
    stats: { value: '100%', label: 'Authentic Local Dishes' }
  },
  {
    id: 'yachting',
    title: 'Gulet Charters & Coastal Cruises',
    shortDesc: 'Handcrafted Turkish wooden gulets for small groups sailing the crystal Turquoise Coast.',
    fullDesc: 'Experience the legendary Turkish Blue Voyage on an intimate wooden sailing vessel. Ideal for small friend circles, family adventures, or hiking-and-sailing combinations. Anchor in quiet pine-fringed bays, swim at sunrise, and dine on fresh fish caught daily.',
    icon: 'Anchor',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/71/a2/62/b4/24/v1_E10/E10QYY0.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=45bf8f07da2658a5531ee455b9d3006ed97d6e77be71ad4ed1555951d01cb259',
    features: [
      'Traditional wooden gulets selected specifically for small groups (4–8 cabins)',
      'Dedicated onboard crew: experienced captain, deckhand, and private chef',
      'Water sports onboard: paddleboards, snorkeling gear, and kayaks',
      'Hike-and-sail itineraries combining coastal trekking with boat overnights',
      'Direct coordination with local harbors in Bodrum, Gocek, Fethiye, and Marmaris'
    ],
    stats: { value: '25+', label: 'Vetted Small Gulets' }
  },
  {
    id: 'bespoke-private',
    title: 'Custom Tailor-Made Itineraries',
    shortDesc: 'Custom small group journeys designed from scratch for families, clubs, and international tour operators.',
    fullDesc: 'Whether you are a specialized tour operator looking for an agile ground DMC partner in Turkey or a private group organizer planning an anniversary journey, our team designs custom itineraries with transparent wholesale net pricing and full B2B support.',
    icon: 'ShieldCheck',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/69/1f/d7/0c/fd/v1_E10/E10VKB6.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=5bd033aded3038171be1d291b60a464e3df64b4d945fda140340f980dfef8ad9',
    features: [
      'White-label B2B documentation customized with your agency branding',
      'Rapid proposal turnaround within 24 business hours with detailed day-by-day notes',
      'Pristine modern Mercedes VIP Sprinters with certified professional drivers',
      'Airport tarmac meet-and-assist and seamless luggage handling',
      'Direct operational desk reachable 24 hours a day on WhatsApp and phone'
    ],
    stats: { value: '24h', label: 'Proposal Turnaround' }
  }
];

export const SAMPLE_ITINERARIES: SampleItinerary[] = [
  {
    id: 'grand-odyssey',
    title: 'The Imperial & Anatolian Cultural Odyssey',
    subtitle: 'Istanbul • Cappadocia • Ephesus • Bodrum',
    duration: '10 Days / 9 Nights',
    category: 'Small Group Tour',
    destinations: ['Istanbul', 'Cappadocia', 'Ephesus', 'Bodrum'],
    coverImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Imperial Hagia Sophia and Sultanahmet historical peninsula, Istanbul',
      'Dawn hot air balloon ascension over Cappadocia\'s sculpted rock valleys',
      'Classical marble architecture of the Library of Celsus in ancient Ephesus',
      'Aegean vineyards, olive groves, and gastronomy trail in Urla',
      'Historic Bodrum Castle overlooking the turquoise Mediterranean harbor'
    ],
    overview: 'Our quintessential small group cultural journey connecting the imperial sights of Istanbul, the fairy chimney trails of Cappadocia, the classical monuments of Ephesus, and the Aegean coast of Bodrum.',
    idealGroupSize: 'Intimate Groups & Private Circles (4–14 Travelers)',
    includedHighlights: [
      'Boutique historical hotels & authentic cave suites',
      'Sunrise hot-air balloon flight over the valleys of Cappadocia',
      'Scholar-guided walkthrough of Ephesus and the Roman Terrace Houses',
      'Private day sailing aboard a wooden Turkish gulet in Bodrum',
      'Dedicated Mercedes VIP Sprinter transit and domestic flight tickets included'
    ],
    days: [
      {
        day: 1,
        title: 'Arrival in Istanbul & Sunset Bosphorus Boat',
        location: 'Istanbul',
        description: 'Airport greeting and private transfer to your boutique hotel. In the late afternoon, embark on an intimate 2-hour sunset cruise along the Bosphorus strait between Europe and Asia with welcome mezes.',
        highlights: ['Airport Meet & Greet', 'Boutique Hotel Check-in', 'Sunset Bosphorus Cruise']
      },
      {
        day: 2,
        title: 'Byzantine & Ottoman Heritage Walk',
        location: 'Istanbul',
        description: 'Full-day walking exploration with our licensed historian guide. Visit Hagia Sophia, the Blue Mosque, the subterranean Basilica Cistern, and the palace courtyards of Topkapi.',
        highlights: ['Hagia Sophia', 'Topkapi Palace Harem', 'Basilica Cistern Walk']
      },
      {
        day: 3,
        title: 'Grand Bazaar Artisans & Neighborhood Food Trail',
        location: 'Istanbul',
        description: 'Morning private walk into the historic craftsman courtyards of the Grand Bazaar. In the afternoon, cross by public ferry to Kadikoy for an authentic food trail tasting regional street delicacies.',
        highlights: ['Artisan Hans & Silversmiths', 'Kadikoy Ferry Ride', 'Local Food Market Tasting']
      },
      {
        day: 4,
        title: 'Flight to Cappadocia & Sunset Valley Walk',
        location: 'Cappadocia',
        description: 'Morning flight to Cappadocia. Check in to your hand-carved boutique cave hotel. In the late afternoon, enjoy a gentle guided walk through Rose Valley as the volcanic rock turns pink at sunset.',
        highlights: ['Boutique Cave Hotel', 'Rose Valley Sunset Walk', 'Local Anatolian Dinner']
      },
      {
        day: 5,
        title: 'Sunrise Ballooning & Underground City',
        location: 'Cappadocia',
        description: 'At dawn, drift over the fairy chimneys in a hot-air balloon basket. After a celebratory breakfast, explore the multi-level subterranean settlement of Kaymakli and the cave frescoes of Goreme.',
        highlights: ['Sunrise Hot-Air Balloon', 'Kaymakli Underground City', 'Goreme Cave Churches']
      },
      {
        day: 6,
        title: 'Flight to Izmir & The Olive Hills of Urla',
        location: 'Izmir & Urla',
        description: 'Domestic air connection to the Aegean coast. Journey through the coastal vineyards and olive groves of Urla for an artisanal lunch and olive oil tasting before resting in Alacati.',
        highlights: ['Urla Olive Oil Estate', 'Vineyard Tasting Walk', 'Alacati Stone Streets']
      },
      {
        day: 7,
        title: 'The Ancient Wonders of Ephesus',
        location: 'Ephesus',
        description: 'Walk the ancient marble avenue of Ephesus with your archaeologist guide. Inspect the exquisite mosaics of the Roman Terrace Houses and the iconic facade of the Library of Celsus.',
        highlights: ['Library of Celsus', 'Roman Terrace Houses', 'House of Virgin Mary']
      },
      {
        day: 8,
        title: 'Scenic Aegean Drive to Bodrum Peninsula',
        location: 'Bodrum',
        description: 'Private Mercedes Sprinter drive down the scenic Aegean coastline to Bodrum. Check in to your seaside boutique hotel and take an afternoon stroll along the vibrant marina and castle.',
        highlights: ['Aegean Coastal Drive', 'Bodrum Castle Visit', 'Seaside Village Dinner']
      },
      {
        day: 9,
        title: 'Private Wooden Gulet Sail & Secluded Bay Swim',
        location: 'Bodrum Coast',
        description: 'Board a traditional handcrafted wooden gulet for a relaxing day exploring tranquil turquoise coves. Enjoy freshly prepared Mediterranean lunch onboard, snorkeling, and swimming.',
        highlights: ['Wooden Gulet Day Charter', 'Turquoise Bay Swimming', 'Fresh Onboard Lunch']
      },
      {
        day: 10,
        title: 'Homeward Journey',
        location: 'Bodrum / Istanbul',
        description: 'Transfer to Bodrum Airport (BJV) for domestic connection to Istanbul International Airport and your onward flight home.',
        highlights: ['Airport Transfer', 'Seamless Luggage Connection', 'Safe Journey']
      }
    ]
  },
  {
    id: 'cappadocia-lycian-adventure',
    title: 'Cappadocia Valleys & Lycian Trail Active Expedition',
    subtitle: 'Cappadocia • Taurus Mountains • Lycian Way • Turquoise Coast',
    duration: '8 Days / 7 Nights',
    category: 'Active Adventure',
    destinations: ['Cappadocia', 'Antalya', 'Lycian Coast'],
    coverImage: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Hot air balloons drifting across Cappadocia\'s volcanic canyons',
      'Trekking panoramic ridgelines through Pigeon and Rose Valleys',
      'Coastal footpath trekking on high cliff sections of the Lycian Way',
      'Sea kayaking directly over the submerged ancient Lycian ruins of Kekova',
      'Picturesque harbor and turquoise waters of the Mediterranean coast'
    ],
    overview: 'Designed for active small groups who want to combine Turkey’s two most dramatic landscapes: hiking through Cappadocia’s volcanic canyons and trekking cliffside trails along the turquoise Mediterranean on the Lycian Way.',
    idealGroupSize: 'Small Adventure Groups (6–12 Hikers)',
    includedHighlights: [
      'Sunrise hot-air balloon flight above Cappadocia’s volcanic valleys',
      'Daily guided valley hikes in Love, Rose, and Pigeon Valleys',
      'Scenic coastal trail trekking on premier sections of the Lycian Way',
      'Sea kayaking over the sunken Lycian ruins of Kekova and Simena',
      'Authentic village meals and character-filled boutique guesthouses'
    ],
    days: [
      {
        day: 1,
        title: 'Arrival in Cappadocia & Pigeon Valley Warm-up Hike',
        location: 'Cappadocia',
        description: 'Arrive at Nevsehir/Kayseri airport and transfer to your cave hotel. Afternoon 5-km scenic warm-up hike down Pigeon Valley to the foot of Uchisar Castle rock citadel.',
        highlights: ['Cave Suite Check-in', 'Pigeon Valley Trail', 'Uchisar Rock Citadel']
      },
      {
        day: 2,
        title: 'Dawn Balloon Flight & Ihlara Canyon Trek',
        location: 'Cappadocia',
        description: 'Sunrise hot air balloon flight. Later, descend into the lush, sheer-walled Ihlara Canyon for an 8-km riverside hike past rock-cut Byzantine churches, ending with lunch over the Melendiz River.',
        highlights: ['Sunrise Balloon Flight', 'Ihlara Canyon 8km Hike', 'Riverside Village Lunch']
      },
      {
        day: 3,
        title: 'Love Valley Trail & Secret Underground Cities',
        location: 'Cappadocia',
        description: 'Trek through the towering volcanic monoliths of Love Valley to Goreme. In the afternoon, descend into the labyrinthine subterranean chambers of Kaymakli Underground City.',
        highlights: ['Love Valley Monoliths', 'Kaymakli Subterranean City', 'Anatolian Clay-Pot Kebab Dinner']
      },
      {
        day: 4,
        title: 'Flight South to the Mediterranean Coast',
        location: 'Antalya / Cirali',
        description: 'Short flight to Antalya and scenic transfer through the Taurus Mountains to the quiet coastal village of Cirali. Evening walk to the eternal flames of the Chimaera (Yanartas).',
        highlights: ['Mediterranean Transit', 'Seaside Village Arrival', 'Chimaera Eternal Flames Night Walk']
      },
      {
        day: 5,
        title: 'Lycian Way: Ancient Olympos to Gelidonya Lighthouse',
        location: 'Lycian Way',
        description: 'Hike through the pine-scented coastal paths of the Lycian Way. Pass through the overgrown ruins of Hellenistic Olympos and climb toward the dramatic panoramic cliffs of Cape Gelidonya.',
        highlights: ['Ancient Olympos Ruins', 'Lycian Way 12km Trek', 'Panoramic Sea Vistas']
      },
      {
        day: 6,
        title: 'Sea Kayaking over Sunken City of Kekova',
        location: 'Kekova & Simena',
        description: 'Launch double sea kayaks from Ucagiz harbor and paddle over the submerged stone foundations, amphorae, and staircases of the ancient Lycian city of Simena. Climb to Simena Castle for breathtaking views.',
        highlights: ['Sea Kayaking over Ruins', 'Lycian Sarcophagi in Water', 'Simena Castle Lookout']
      },
      {
        day: 7,
        title: 'Coastal Hike to Phaselis & Antalya Old Town',
        location: 'Kemer & Antalya',
        description: 'Morning short trek through the pine woods into the triple-harbor Roman city of Phaselis. Afternoon transfer to Antalya for a guided walk through the historic Ottoman quarter of Kaleici.',
        highlights: ['Phaselis Ancient Aqueduct & Bay', 'Kaleici Cobblestone Walk', 'Farewell Mediterranean Dinner']
      },
      {
        day: 8,
        title: 'Departure from Antalya Airport',
        location: 'Antalya Airport',
        description: 'Transfer to Antalya Airport (AYT) for flights to Istanbul and international connection.',
        highlights: ['Airport Transfer', 'Expedition Complete']
      }
    ]
  },
  {
    id: 'blue-cruise',
    title: 'The Turquoise Coast Gulet Adventure & Hike-and-Sail',
    subtitle: 'Bodrum • Gulf of Gokova • Datca Peninsula • Gocek',
    duration: '7 Days / 6 Nights',
    category: 'Gulet & Coastal Trek',
    destinations: ['Bodrum', 'Turquoise Coast'],
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Turquoise waters and pine-fringed secluded coves of the Turquoise Coast',
      'Traditional handcrafted wooden Turkish gulet anchored in serene bays',
      'Bodrum Castle and harbor departure gateway for blue cruises',
      'Dramatic coastline with ancient ruins meeting crystal-clear waters',
      'Swimming and snorkeling in pristine Mediterranean marine coves'
    ],
    overview: 'A classic Turkish wooden gulet voyage tailored for small groups, pairing secluded bay sailing with optional daily shoreline hikes on the Carian and Lycian trails.',
    idealGroupSize: 'Small Groups & Friend Circles (6 to 14 Guests)',
    includedHighlights: [
      'Private handcrafted wooden gulet reserved exclusively for your small group',
      'Onboard captain, experienced deck crew, and private Turkish cook',
      'Daily morning swims in crystal aquamarine bays and sea kayaking',
      'Optional coastal trail walks exploring hidden ancient ruins',
      'Fresh Mediterranean meals prepared with local village produce'
    ],
    days: [
      {
        day: 1,
        title: 'Boarding in Bodrum Marina',
        location: 'Bodrum',
        description: 'Meet at Bodrum Marina. Welcome drinks aboard your wooden gulet, safety briefing with the captain, and sunset cruise to a peaceful nearby bay for your first night anchored under the stars.',
        highlights: ['Gulet Boarding', 'Captain Welcome', 'Starlight Deck Dinner']
      },
      {
        day: 2,
        title: 'Ancient Knidos & The Converging Seas',
        location: 'Gulf of Gokova',
        description: 'Sail along the rugged Datca peninsula to the ancient ruins of Knidos, where the Aegean meets the Mediterranean. Explore the cliffside theater and lighthouse before anchoring in a sheltered cove.',
        highlights: ['Ancient Harbor of Knidos', 'Coastal Trail Walk', 'Fresh Fish Dinner']
      },
      {
        day: 3,
        title: 'Seven Islands & Sea Kayaking',
        location: 'Yedi Adalar (Seven Islands)',
        description: 'Morning paddleboarding and sea kayaking across the mirror-calm lagoons of Seven Islands. Afternoon shore excursion to an old pine-shaded olive mill.',
        highlights: ['Paddleboarding', 'Lagoon Kayaking', 'Secluded Cove Anchorage']
      },
      {
        day: 4,
        title: 'Dalyan Delta & Lycian Cliff Tombs',
        location: 'Dalyan & Gocek',
        description: 'Tender boat exploration up the winding Dalyan river delta past lush reeds to view the 4th-century BC Lycian rock tombs cut into sheer rock cliffs.',
        highlights: ['River Boat Safari', 'Lycian Cliff Tombs', 'Turtle Beach Visit']
      },
      {
        day: 5,
        title: 'Gocek 12 Islands & Sunken Baths',
        location: 'Gocek Archipelago',
        description: 'Sail through the serene Gocek archipelago. Swim into the sea caves of Cleopatra’s Sunken Baths and anchor at Bedri Rahmi Bay.',
        highlights: ['Cleopatra Sunken Baths', 'Bedri Rahmi Bay', 'Sunset Swimming']
      },
      {
        day: 6,
        title: 'Tomb Bay & Abandoned Village of Kayakoy',
        location: 'Fethiye Gulf',
        description: 'Shore landing for an atmospheric 3-hour hike through pine woods to the historic stone ruins of Kayakoy ghost village. Farewell captain dinner onboard with Aegean wines.',
        highlights: ['Kayakoy Ghost Village Hike', 'Captain Farewell Feast', 'Midnight Swimming']
      },
      {
        day: 7,
        title: 'Disembarkation at Gocek & Departure',
        location: 'Gocek / Dalaman Airport',
        description: 'Breakfast on deck. Disembark at Gocek marina and transfer to Dalaman Airport (DLM) for flight connections.',
        highlights: ['Breakfast on Deck', 'Airport Transfer']
      }
    ]
  }
];

export const EXCLUSIVE_VENUES: VenueShowcase[] = [
  {
    id: 'pera-palace',
    name: 'Pera Palace Historic Grand Hotel',
    location: 'Beyoglu, Istanbul',
    type: 'Historic Palace',
    capacity: 'Boutique Small Groups (10–60 Guests)',
    image: 'https://xx.bstatic.com/xdata/images/hotel/max1024/270287497.jpg?k=1473605be17f24f891c760294c921306e0bd35716e92c80108b205a29e31b6ce&o=',
    description: 'The legendary hotel built in 1892 to host Orient Express travelers. Agatha Christie and Ernest Hemingway stayed here. Perfect base for small group cultural travelers in Istanbul.',
    idealFor: 'Literary Salons, Afternoon Tea & Intimate Private Gatherings'
  },
  {
    id: 'binbirdirek-cistern',
    name: 'The 6th-Century Binbirdirek Cistern',
    location: 'Sultanahmet, Istanbul',
    type: 'Historic Palace',
    capacity: 'Private Group Access (10–150 Guests)',
    image: 'https://theothertour.com/wp-content/uploads/2024/12/binbirdirek-cistern.jpg',
    description: 'A subterranean marvel supported by 224 marble columns built by the Roman Emperor Justinian. We arrange private acoustic walk-throughs and small-group classical music recitals.',
    idealFor: 'Acoustic Recitals, Private Cultural Soirees & Historical Lectures'
  },
  {
    id: 'cappadocia-cave-canyon',
    name: 'Zemi Valley Monastic Cave Sanctuary',
    location: 'Goreme, Cappadocia',
    type: 'Cave & Canyon',
    capacity: 'Small Groups (10–50 Guests)',
    image: 'https://cdn.getyourguide.com/image/format=auto%2Cfit=contain%2Cgravity=auto%2Cquality=60%2Cwidth=1440%2Cheight=650%2Cdpr=1/tour_img/762a342ada515476cb73d10c28aecb252829213c30c4db5ad89eff1f2b2d2055.jpg',
    description: 'A private natural amphitheater and hollowed volcanic rock monastery illuminated by candle lanterns, torchlit pathways, and local Anatolian musicians.',
    idealFor: 'Sunset Wine Tastings, Intimate Group Dinners & Whirling Dervish Performances'
  },
  {
    id: 'celsus-library-ephesus',
    name: 'The Ancient Library of Celsus',
    location: 'Ephesus, Selcuk',
    type: 'Ancient Ruin',
    capacity: 'Curated Heritage Groups',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Ephesus_Celsus_Library_Fa%C3%A7ade.jpg/1280px-Ephesus_Celsus_Library_Fa%C3%A7ade.jpg',
    description: 'One of the most breathtaking monuments of the classical Greco-Roman world. We coordinate special permissions for quiet, scholar-guided visits beneath its towering Corinthian colonnade.',
    idealFor: 'Scholar Lectures, Sunset Archaeological Walks & Chamber Music'
  },
  {
    id: 'karakaya-village',
    name: 'Private Handcrafted Wooden Gulet Charter',
    location: 'Bodrum & Gocek, Aegean Coast',
    type: 'Coastal & Yacht',
    capacity: 'Small Groups (8–18 Guests)',
    image: 'https://www.cekiste.com/images/blogs/74335gulet1.jpg',
    description: 'Handcrafted Turkish wooden sailing gulets chartered exclusively for small groups. Anchor in quiet turquoise coves, swim at sunrise, and host candlelit deck dinners under Aegean stars.',
    idealFor: 'Blue Voyage Charters, Sunset Dinners & Intimate Private Gatherings'
  },
  {
    id: 'sait-halim-pasha-yali',
    name: 'Sait Halim Pasha Historic Bosphorus Yalı',
    location: 'Yenikoy, Bosphorus, Istanbul',
    type: 'Historic Palace',
    capacity: 'Boutique Small Groups (12–70 Guests)',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=85',
    description: 'A 19th-century Ottoman grand waterfront mansion situated directly on the European shoreline of the Bosphorus. Featuring direct boat-pier arrival, gilded baroque salons, and secluded waterside dining terraces overlooking the strait.',
    idealFor: 'Bosphorus Welcome Receptions, Sunset Dinners & Chamber Music Recitals'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Baobab DMC handled our 12-person cultural and hiking expedition through Cappadocia and the Lycian Way with extraordinary precision. The boutique cave hotels were stunning, our archaeologist guide was brilliant, and the route had zero tourist cliches.",
    author: "Claire Henderson",
    role: "Director of Small Group Expeditions",
    company: "Wilderness & Heritage Journeys (Bristol, UK)",
    rating: 5
  },
  {
    quote: "As an independent luxury travel advisor specializing in boutique group tours, Baobab DMC is my go-to Turkish ground partner. Their responses on WhatsApp and email are prompt, their fleet is immaculate, and my clients consistently report it was their favorite journey.",
    author: "Marcus Sterling",
    role: "Managing Director",
    company: "Sterling Bespoke Journeys (London & New York)",
    rating: 5
  },
  {
    quote: "The 7-day private wooden gulet and hike-and-sail voyage for our small group along the Turquoise Coast was pure magic. Secluded coves, incredible food prepared by the cook, and sunset trail walks. Everything was run to perfection.",
    author: "Sofia Lindström",
    role: "Founder & Tour Leader",
    company: "Nordic Explorer Tours (Stockholm, Sweden)",
    rating: 5
  }
];

export const PARTNERS_ACCREDITATIONS = [
  { name: 'TURSAB', desc: 'Association of Turkish Travel Agencies (License A-15764)', badge: 'Official A-Grade Member' },
  { name: 'ATTA', desc: 'Adventure Travel Trade Association Standards', badge: 'Active Adventure Specialist' },
  { name: 'Local Guides', desc: 'Licensed by Republic of Turkey Ministry of Culture', badge: 'Degreed Historians' },
  { name: 'B2B Partner Network', desc: 'Trusted Ground Operator for Global Advisors & Tour Operators', badge: 'White-Label Dedicated' },
  { name: 'IATA', desc: 'International Air Transport Association Certified', badge: 'Flight Ticketing Desk' }
];

export interface FaqItem {
  id: string;
  category: 'Visa & Entry' | 'Airports & Transfers' | 'Currency & Payments' | 'Electricity & Tech' | 'Health & Safety' | 'Culture & Etiquette' | 'B2B & Operations';
  q: string;
  a: string;
  keywords: string[];
}

export const FAQ_CATEGORIES = [
  'All',
  'Visa & Entry',
  'Airports & Transfers',
  'Currency & Payments',
  'Electricity & Tech',
  'Health & Safety',
  'Culture & Etiquette',
  'B2B & Operations'
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  // --- VISA & ENTRY REQUIREMENTS ---
  {
    id: 'visa-exemptions-us-uk-eu',
    category: 'Visa & Entry',
    q: 'Do US, UK, EU, and Canadian citizens need a visa to travel to Turkiye?',
    a: 'Citizens of the United States, United Kingdom, Canada, European Union member states, Australia, and New Zealand do not require a tourist visa for visits up to 90 days within any 180-day period. For other nationalities, official electronic visas (e-Visa) can be secured rapidly online prior to departure through the official Republic of Türkiye portal (evisa.gov.tr).',
    keywords: ['Turkey visa requirements 2026', 'US citizen visa Turkey', 'UK tourist visa Turkiye', 'e-Visa official Turkey', '90 day tourist rule']
  },
  {
    id: 'passport-validity-turkiye',
    category: 'Visa & Entry',
    q: 'What are the passport validity requirements for entering Turkiye?',
    a: 'Your passport must be valid for at least 60 days beyond the "duration of stay" of your visa, e-Visa, or visa exemption period. As a golden rule for international travelers, we recommend having at least 6 months (180 days) of remaining validity from your scheduled arrival date, along with at least one blank page for entry and exit stamps.',
    keywords: ['passport validity Turkey', '6 months passport rule Turkiye', 'entry requirements Istanbul airport', 'customs entry rules Turkey']
  },
  {
    id: 'official-evisa-application',
    category: 'Visa & Entry',
    q: 'How and where should eligible travelers apply for an official Turkish e-Visa?',
    a: 'Eligible nationalities should apply strictly through the official Ministry of Foreign Affairs portal at evisa.gov.tr. The digital application takes under 5 minutes to complete, requires passport details and an email address, and is issued almost instantly upon fee payment. Avoid unauthorized third-party broker websites that charge inflated processing fees.',
    keywords: ['official e-visa Turkey website', 'evisa.gov.tr', 'apply online visa Turkey', 'Turkish visa fees']
  },
  {
    id: 'transit-visa-istanbul-airport',
    category: 'Visa & Entry',
    q: 'Do I need a transit visa for connecting international flights at Istanbul Airport (IST)?',
    a: 'No transit visa is required if you remain in the international transit area of Istanbul Airport (IST) and your baggage is checked through to your final destination. However, if you plan to exit the airport into Istanbul during a long layover, collect luggage, or transfer from Istanbul Airport (IST) to Sabiha Gökçen (SAW), standard entry and visa requirements apply according to your nationality.',
    keywords: ['transit visa Turkey', 'Istanbul airport layover visa', 'do I need visa for layover Istanbul', 'IST international transit']
  },
  {
    id: 'turkey-to-greek-islands-ferries',
    category: 'Visa & Entry',
    q: 'Can travelers combine Turkiye with the Greek Islands via ferry, and what are the visa rules?',
    a: 'Yes, daily international passenger catamarans connect Turkish coastal ports with Greek Aegean islands (e.g., Bodrum to Kos, Marmaris to Rhodes, Fethiye to Rhodes, Kaş to Meis/Kastellorizo, and Çeşme to Chios). Non-EU/Schengen passport holders must have a valid multiple-entry Schengen visa to visit Greece, and a multiple-entry Turkish visa or exemption to re-enter Turkiye. A streamlined Greek "express island visa" is also available at designated island ports during summer seasons.',
    keywords: ['ferry Turkey to Greece', 'Bodrum to Kos ferry visa', 'Marmaris to Rhodes ferry', 'Kas to Meis boat', 'Greek island day trip from Turkey']
  },

  // --- AIRPORTS & TRANSFERS ---
  {
    id: 'istanbul-airports-difference',
    category: 'Airports & Transfers',
    q: 'Which airport in Istanbul should travelers fly into: Istanbul Airport (IST) or Sabiha Gökçen (SAW)?',
    a: 'Istanbul Airport (IST) is the primary mega-hub on the European side, hosting Turkish Airlines, United/Lufthansa alliances, British Airways, Delta partners, and major long-haul carriers. Sabiha Gökçen Airport (SAW) is located on the Asian side, primarily serving Pegasus Airlines, AJet, and regional European/Middle Eastern carriers. Both airports feature modern highway connections, private VIP chauffeur transfers, and metro lines.',
    keywords: ['Istanbul airport IST vs SAW', 'which airport in Istanbul', 'Istanbul airport transfer', 'Sabiha Gokcen distance to Sultanahmet']
  },
  {
    id: 'domestic-flights-transit',
    category: 'Airports & Transfers',
    q: 'How do domestic flight connections work between Istanbul, Cappadocia, and coastal regions?',
    a: 'Turkiye has an exceptionally dense domestic aviation network operated by Turkish Airlines and AJet. Flight durations between Istanbul (IST/SAW) and Cappadocia (Nevşehir NAV or Kayseri ASR), Izmir (ADB for Ephesus), Antalya (AYT), Bodrum (BJV), and Dalaman (DLM for Lycian Coast) are all between 60 and 80 minutes with multiple daily departures. As an inbound DMC, we arrange seamless VIP airport meet-and-greets and synchronized chauffeured ground transfers.',
    keywords: ['domestic flights in Turkey', 'Istanbul to Cappadocia flight', 'Turkish Airlines domestic hubs', 'Nevsehir vs Kayseri airport']
  },
  {
    id: 'airport-arrival-departure-timing',
    category: 'Airports & Transfers',
    q: 'How early should passengers arrive at Istanbul Airport (IST) for international departures?',
    a: 'We strongly advise arriving at Istanbul Airport (IST) at least 3 hours prior to scheduled international departures (and 2 hours for domestic flights). IST is one of the largest passenger terminals in the world with dual security screening (at building entrance and airside passport control), extensive duty-free concourses, and walking distances to departure gates.',
    keywords: ['Istanbul airport arrival time', 'how early to arrive at IST', 'Istanbul airport security checks', 'VIP meet and greet Istanbul']
  },
  {
    id: 'istanbul-airport-layover-amenities',
    category: 'Airports & Transfers',
    q: 'What amenities and hotels exist for long layovers inside Istanbul Airport (IST)?',
    a: 'Istanbul Airport features world-class layover infrastructure, including YOTEL Istanbul (offering both airside transit cabins and landside rooms bookable in 4-hour blocks), IGA Sleepods, private lounge suites, complimentary luggage storage, prayer rooms, children’s playzones, and luxury showers. For layovers over 8–10 hours, private chauffeured half-day city tours to Sultanahmet and the Bosphorus can be seamlessly coordinated.',
    keywords: ['Istanbul airport hotel YOTEL', 'IGA Sleepod Istanbul airport', 'Istanbul airport luggage storage', 'Istanbul airport layover tour']
  },
  {
    id: 'domestic-baggage-allowance',
    category: 'Airports & Transfers',
    q: 'What are domestic checked and cabin baggage allowances on Turkish Airlines and AJet?',
    a: 'For domestic flights within Turkiye, Turkish Airlines standard Economy tickets typically include 15kg to 20kg (33–44 lbs) of checked baggage plus an 8kg (17.6 lbs) carry-on bag and one personal item. Business Class includes 30kg. For low-cost carriers like AJet or Pegasus, standard allowances range from 15kg to 20kg. As an inbound DMC, Baobab DMC pre-books appropriate checked baggage allowances for all private and group domestic sectors.',
    keywords: ['Turkish Airlines domestic baggage allowance', 'luggage limit flights Turkey', 'AJet baggage rules', 'domestic flights baggage weight']
  },
  {
    id: 'vip-airport-meet-and-assist',
    category: 'Airports & Transfers',
    q: 'How does VIP Airport Meet & Assist work at Istanbul Airport (IST)?',
    a: 'Our VIP Meet & Assist service provides a personal airport concierge who greets guests immediately as they step off the jetbridge. Concierges escort travelers via electric buggy through dedicated fast-track immigration and customs lanes, assist with luggage carousel retrieval, and escort guests directly to their awaiting Mercedes-Benz VIP private chauffeur outside the arrivals terminal.',
    keywords: ['VIP airport meet and greet Istanbul', 'fast track Istanbul airport', 'Istanbul airport buggy transfer', 'private arrival transfer IST']
  },

  // --- CURRENCY, CARDS & MONEY ---
  {
    id: 'currency-payments-cards',
    category: 'Currency & Payments',
    q: 'What is the local currency in Turkiye, and are US Dollars, Euros, and credit cards accepted?',
    a: 'The official currency is the Turkish Lira (TRY / ₺). Contactless credit and debit cards (Visa and Mastercard) are universally accepted across hotels, restaurants, supermarkets, and boutique shops. US Dollars and Euros are widely accepted in major tourist hubs (such as the Grand Bazaar, Cappadocia balloon operators, and luxury coastal marinas). For small purchases, street food, and tipping, having a modest amount of Turkish Lira cash is recommended.',
    keywords: ['Turkish Lira currency', 'using credit cards in Turkey', 'are US dollars accepted in Istanbul', 'Apple Pay in Turkey', 'currency exchange Istanbul']
  },
  {
    id: 'atms-and-currency-exchange',
    category: 'Currency & Payments',
    q: 'Where is the best place to exchange currency or withdraw cash in Turkiye?',
    a: 'Official exchange offices ("Döviz Bürosu") located in city centers (such as Sultanahmet, Sirkeci, Grand Bazaar, and Taksim) offer transparent rates with minimal or zero commission compared to airport kiosks. Bank-operated ATMs (such as Garanti BBVA, İş Bankası, Yapı Kredi, and Akbank) are ubiquitous and support international debit cards with multi-language prompts.',
    keywords: ['best currency exchange Istanbul', 'ATM withdrawal fees Turkey', 'Doviz Burosu rates', 'cash vs card in Turkey']
  },
  {
    id: 'avoid-dcc-atm-trap',
    category: 'Currency & Payments',
    q: 'What is Dynamic Currency Conversion (DCC) and why should travelers always choose "Charge in TRY"?',
    a: 'When paying with a foreign card or withdrawing cash from an ATM in Turkiye, the terminal will often ask whether you wish to be billed in your home currency (USD, EUR, GBP) or local currency (Turkish Lira / TRY). ALWAYS choose "Continue in Turkish Lira (Without Conversion)". Choosing your home currency triggers Dynamic Currency Conversion (DCC), where the local terminal operator applies an inflated exchange markup of 5% to 10%. Letting your own home bank do the conversion saves substantial money on every transaction.',
    keywords: ['Dynamic currency conversion Turkey', 'ATM exchange rate trick Istanbul', 'charge in TRY or USD', 'avoid ATM fees Turkey']
  },
  {
    id: 'apple-pay-google-pay-turkey',
    category: 'Currency & Payments',
    q: 'Can international travelers use Apple Pay and Google Pay in Turkiye?',
    a: 'Yes. While Apple Pay is not officially registered for Turkish bank-issued cards, international credit and debit cards loaded onto Apple Pay, Google Wallet, and smartwatches work seamlessly on almost all contactless ("Temassız") POS payment terminals across Turkiye. Nonetheless, we recommend always carrying at least one physical chip-and-PIN credit card as a reliable backup.',
    keywords: ['Apple Pay in Turkey', 'Google Wallet Istanbul', 'contactless payment Turkey', 'contactless POS Istanbul shops']
  },
  {
    id: 'daily-cash-budget-recommendation',
    category: 'Currency & Payments',
    q: 'How much cash does a traveler realistically need per day in Turkiye?',
    a: 'Because credit cards are accepted virtually everywhere (even in small bakeries, taxis, and museums), travelers typically only need 500 to 1,000 TRY (approx. $15–$30 USD) in cash per person per day for street snacks, tipping, public restroom fees (5–10 TRY), and small souvenir stalls. Luxury purchases, dining, and hotel bills are almost universally settled by card.',
    keywords: ['how much cash to take to Turkey', 'daily spending budget Turkey', 'cash vs card Istanbul', 'cost of food and transport Turkey']
  },
  {
    id: 'amex-acceptance-turkey',
    category: 'Currency & Payments',
    q: 'Are American Express (Amex) and Discover cards widely accepted in Turkiye?',
    a: 'American Express is accepted primarily in international 5-star hotel chains, upscale fine-dining restaurants, luxury boutiques in Nişantaşı and İstinye Park, and major airline booking portals. In ordinary cafes, traditional bazaars, and provincial towns, Amex acceptance is limited due to higher merchant processing fees. Visa and Mastercard are accepted universally. We advise carrying a Visa or Mastercard as your primary travel card.',
    keywords: ['Amex in Turkey', 'American Express Istanbul acceptance', 'Discover card Turkey', 'best credit card for Turkey travel']
  },
  {
    id: 'vat-tax-free-refunds',
    category: 'Currency & Payments',
    q: 'Can international tourists claim Tax-Free / VAT refunds on shopping in Turkiye?',
    a: 'Yes. Non-resident visitors can claim a Value Added Tax (KDV) refund on eligible purchases (carpets, leather, ceramics, jewelry, clothing) made at registered "Tax Free" stores. Request a Tax Free form and invoice at the time of purchase, and present unused items along with receipts at the Tax Refund Customs Office at Istanbul Airport (IST), Sabiha Gökçen (SAW), or Izmir/Antalya airports prior to checking baggage.',
    keywords: ['Tax Free shopping Turkey', 'VAT refund Istanbul airport', 'Global Blue Turkey', 'KDV refund rules tourists']
  },

  // --- ELECTRICITY, PLUGS & CONNECTIVITY ---
  {
    id: 'electricity-plug-voltage',
    category: 'Electricity & Tech',
    q: 'What electrical plug types and voltage are used in Turkiye?',
    a: 'Turkiye operates on a 220–240V supply voltage and 50Hz frequency, utilizing standard European Type C (two round pins) and Type F (Schuko with side grounding clips) electrical sockets. Travelers from the US/Canada will need a standard European plug adapter. Most modern smartphones, laptops, and camera chargers are dual-voltage (100–240V auto-switching) and only require a plug adapter; 110V-only appliances (like standard US hair dryers) require a voltage converter.',
    keywords: ['plug type Turkey', 'electricity voltage Turkey 220V', 'European adapter Istanbul', 'Type C Type F socket Turkiye']
  },
  {
    id: 'power-converter-vs-adapter',
    category: 'Electricity & Tech',
    q: 'Do I need a voltage converter or just a plug adapter for US appliances in Turkiye?',
    a: 'Check the input label on your device: if it states "INPUT: 100-240V, 50/60Hz" (as 95% of smartphones, laptops, iPads, CPAP machines, and electric shavers do), you DO NOT need a voltage converter—only an inexpensive two-pin European plug adapter (Type C/F). However, high-wattage 110V-only heating appliances from North America (like standard hair curlers or clothing irons) WILL overheat or short-circuit unless connected to a heavy-duty step-down voltage converter. High-grade hotels and boutique lodges in Turkiye furnish quality 220V hair dryers in every room.',
    keywords: ['voltage converter Turkey', 'do I need voltage converter for Istanbul', 'using American curling iron in Turkey', '220V adapter Turkey']
  },
  {
    id: 'esim-mobile-internet',
    category: 'Electricity & Tech',
    q: 'How can international travelers get high-speed mobile internet, 5G data, and eSIMs in Turkiye?',
    a: 'Travelers can easily activate digital travel eSIMs (such as Airalo, Holafly, or Maya Mobile) prior to arrival for immediate 4G/5G data upon landing. Alternatively, physical prepaid tourist SIM cards can be purchased upon arrival at airport arrival halls from national telecom providers: Turkcell, Vodafone Turkey, and Türk Telekom. All Baobab DMC private Mercedes touring vehicles and partner boutique hotels provide complimentary high-speed Wi-Fi.',
    keywords: ['eSIM Turkey', 'best SIM card for tourists Turkey', 'Turkcell tourist SIM', 'mobile data Istanbul Cappadocia', '5G internet Turkey']
  },
  {
    id: 'drone-regulations-turkey',
    category: 'Electricity & Tech',
    q: 'Can tourists bring and fly recreational drones (DJI) in Turkiye?',
    a: 'Turkiye enforces strict civil aviation laws regarding drones (UAV / İHA) under the Directorate General of Civil Aviation (SHGM). Drones weighing over 500 grams brought by foreigners are subject to customs impoundment unless granted formal pre-authorization permits. In addition, flying drones over archaeological sites, historical monuments (Hagia Sophia, Topkapi, Ephesus), military facilities, and hot air balloon airspace in Cappadocia is strictly prohibited by law without special ministerial permits.',
    keywords: ['flying drone in Turkey', 'drone laws Turkey SHGM', 'can I bring DJI drone to Istanbul', 'Cappadocia drone rules']
  },

  // --- HEALTH & SAFETY ---
  {
    id: 'turkiye-travel-safety-overview',
    category: 'Health & Safety',
    q: 'Is Turkiye safe for international tourists, solo female travelers, and families?',
    a: 'Turkiye is one of the world’s top 5 most-visited countries, welcoming over 55 million visitors annually. Tourist corridors (Istanbul, Cappadocia, Antalya, Bodrum, Izmir, Ephesus) experience safety levels on par with or safer than major Western European capitals. Violent crime against tourists is extremely rare. Dedicated Tourism Police ("Turizm Polisi") patrol historic districts, and the local hospitality culture ("Misafirperverlik") places tremendous value on protecting and welcoming guests.',
    keywords: ['is Turkey safe to visit 2026', 'solo female travel Turkey', 'Istanbul safety for tourists', 'travel advisory Turkey safety']
  },
  {
    id: 'tap-water-safety',
    category: 'Health & Safety',
    q: 'Is tap water safe to drink in Turkiye?',
    a: 'Tap water in Turkish cities is chlorinated and treated to municipal health standards, making it safe for brushing teeth, showering, and cooking. However, due to mineral hardness and taste preferences, bottled spring water and filtered mineral water are universally preferred and consumed by locals and visitors alike. Bottled water is readily available and provided complimentary on all our private transfers and tours.',
    keywords: ['can you drink tap water in Turkey', 'is tap water safe in Istanbul', 'drinking water Cappadocia', 'bottled water Turkey']
  },
  {
    id: 'emergency-hotline-medical',
    category: 'Health & Safety',
    q: 'What is the national emergency number and what healthcare infrastructure exists in Turkiye?',
    a: 'The unified nationwide emergency hotline in Turkiye is 112 (covering Police, Gendarmerie, Ambulance, and Fire departments with multi-lingual dispatchers). Turkiye has world-class JCI-accredited (Joint Commission International) private hospitals staffed with English-speaking specialists (such as Acıbadem, Memorial, American Hospital, and Florence Nightingale). We recommend international travel medical insurance for all overseas journeys.',
    keywords: ['emergency number Turkey 112', 'hospitals in Istanbul for tourists', 'medical care Turkey travel', 'pharmacies in Turkey Eczane']
  },
  {
    id: 'prescription-medications-rules',
    category: 'Health & Safety',
    q: 'What are the rules for bringing personal prescription medication into Turkiye?',
    a: 'Travelers may bring personal medications for personal use in quantities corresponding to the planned duration of stay. Keep all medications in their original pharmacy packaging with clearly labeled prescription stickers matching your passport name. For controlled substances, strong painkillers, stimulants (such as ADHD medications like Adderall/Ritalin), or psychotropic drugs, carry an official doctor’s letter in English detailing the diagnosis, required dosage, and generic active ingredients.',
    keywords: ['bringing prescription drugs to Turkey', 'Adderall in Turkey customs', 'medication rules Istanbul airport', 'pharmacy Turkey Eczane']
  },

  // --- CULTURE, DRESS CODE & ETIQUETTE ---
  {
    id: 'mosque-dress-code-etiquette',
    category: 'Culture & Etiquette',
    q: 'What is the dress code and proper etiquette for visiting mosques in Turkiye?',
    a: 'When visiting active imperial mosques (such as Hagia Sophia, Blue Mosque, or Süleymaniye): both men and women should wear modest clothing covering shoulders and knees (no tank tops or short shorts). Women are required to cover their hair with a scarf (lightweight scarves are often available at entrances). Shoes must be removed before stepping onto prayer carpets and placed in provided shoe bags. Photography is allowed without flash; maintain quiet respect during prayer times.',
    keywords: ['mosque dress code Turkey', 'what to wear in Blue Mosque', 'Hagia Sophia etiquette', 'headscarf rules Turkey mosques']
  },
  {
    id: 'tipping-gratuity-standards',
    category: 'Culture & Etiquette',
    q: 'What are the tipping and gratuity customs in Turkiye?',
    a: 'Tipping is customary and appreciated in the Turkish hospitality industry. In sit-down restaurants, 10% to 15% is standard for good service. For private licensed tour guides, €25–€50 / $30–$55 per day for a group is standard; for private professional chauffeurs, €15–€30 / $20–$35 per day. Hotel bellhops typically receive 50–100 TRY per bag, and traditional Turkish hammam attendants receive a 15–20% gratuity.',
    keywords: ['tipping in Turkey guide', 'how much to tip tour guide Turkey', 'gratuity customs Istanbul', 'restaurant tipping Turkey']
  },
  {
    id: 'traveling-during-ramadan',
    category: 'Culture & Etiquette',
    q: 'Can non-Muslim travelers visit Turkiye during Ramadan (Ramazan)?',
    a: 'Yes, absolutely. Turkiye is a secular republic, and all historic sites, museums, restaurants, cafes, bars, and public transit operate entirely as normal during Ramadan. In tourist corridors and cosmopolitan areas, eating and drinking are common throughout the day. Visiting during Ramadan provides a magical cultural experience with illuminated minarets ("Mahya"), festive communal sunset fast-breaking banquets ("Iftar"), and vibrant evening street fairs.',
    keywords: ['traveling to Turkey during Ramadan', 'is Istanbul open during Ramazan', 'visiting Turkey holiday seasons']
  },
  {
    id: 'bargaining-grand-bazaar-etiquette',
    category: 'Culture & Etiquette',
    q: 'How does bargaining work in the Grand Bazaar and Turkish markets?',
    a: 'Bargaining is an age-old cultural tradition in historical bazaars for carpets, handmade ceramics, leather, antique jewelry, and textiles. It is practiced with warm humor and hospitality, usually over a small tulip glass of apple or black tea. Start with a polite counteroffer roughly 20% to 30% below the asking price. In modern supermarkets, pharmacies, shopping malls, restaurants, and museum ticket booths, prices are strictly fixed.',
    keywords: ['Grand Bazaar bargaining etiquette', 'how to negotiate prices Istanbul', 'shopping Grand Bazaar tips', 'is bargaining rude in Turkey']
  },
  {
    id: 'street-cats-and-dogs-culture',
    category: 'Culture & Etiquette',
    q: 'Why are there so many cats and dogs on the streets of Istanbul, and are they safe?',
    a: 'Istanbul is lovingly celebrated worldwide as the "City of Cats". Street animals in Turkiye are regarded not as strays, but as communal neighborhood companions. Under Turkish animal protection laws, municipal veterinarians vaccinate, sterilize, microchip, and tag street dogs (notice the plastic tags in their ears). Locals place communal food, clean water dishes, and cozy cat houses on every block. The animals are friendly, calm, and accustomed to humans.',
    keywords: ['Istanbul street cats', 'stray dogs in Turkey', 'are Istanbul cats friendly', 'animal care in Istanbul']
  },
  {
    id: 'alcohol-meyhane-dining-culture',
    category: 'Culture & Etiquette',
    q: 'Is alcohol available in Turkiye and what is the traditional Meyhane culture?',
    a: 'Yes. Turkiye is a secular country with a thriving wine industry and ancient culinary traditions centered on dining and spirits. Beer, international spirits, and indigenous wines (from Thrace, Urla, and Cappadocia) are widely available in restaurants, bars, and bistros. A cherished Turkish tradition is the "Meyhane" (tavern)—a slow, convivial evening where friends gather over countless cold and warm mezze, grilled fresh fish, and glasses of aniseed-flavored Turkish rakı ("Lion’s Milk") mixed with chilled water.',
    keywords: ['alcohol in Turkey', 'drinking raki in Istanbul', 'Meyhane dinner Istanbul', 'Turkish wine regions Urla']
  },

  // --- B2B & PARTNER GROUND OPERATIONS ---
  {
    id: 'tursab-licensing-importance',
    category: 'B2B & Operations',
    q: 'What is TÜRSAB and why must tour operators use a licensed Turkish DMC?',
    a: 'TÜRSAB (Association of Turkish Travel Agencies) is the legal governing body established under Turkish Law No. 1618. Baobab DMC operates under official Ministry of Culture and Tourism A-Grade License A-15764. Booking through a fully licensed A-Grade DMC ensures full legal compliance, commercial passenger liability insurance, verified Ministry-licensed historian guides, and protection against unauthorized fly-by-night operators.',
    keywords: ['TURSAB license Turkey DMC', 'TURSAB A-15764', 'licensed inbound ground operator Turkey', 'legal requirements travel agency Turkey']
  },
  {
    id: 'small-group-bespoke-dmc-specialty',
    category: 'B2B & Operations',
    q: 'What makes Baobab DMC specialized in small group tours & bespoke adventures?',
    a: 'Unlike mass-market tour operators with 50-passenger coaches or commercial commission stops, Baobab DMC specializes strictly in intimate small groups (typically 6–14 guests) and private FIT travelers. We deploy custom VIP Mercedes Sprinters, handpick authentic boutique cave hotels and restored Ottoman stone mansions, partner with university-degreed archaeologist guides, and curate active hiking and culinary trails away from congested tourist traps.',
    keywords: ['small group tours Turkey DMC', 'best boutique DMC Istanbul', 'private Turkey tour operator', 'Lycian Way hiking DMC']
  },
  {
    id: 'b2b-white-label-collaboration',
    category: 'B2B & Operations',
    q: 'Do you collaborate with international travel agencies, clubs, and group leaders on a white-label basis?',
    a: 'Yes. Over 80% of our operations involve serving international travel advisors, boutique tour brands, private walking clubs, and luxury travel networks. We provide 100% white-label documentation with your agency branding, net B2B wholesale pricing, guaranteed 24-hour turnaround on custom quotes, and 24/7 on-ground concierge dispatch throughout your guests’ journeys.',
    keywords: ['white label DMC Turkey', 'B2B travel partner Turkey', 'net rates Turkey tour operator', 'inbound ground handler Istanbul']
  },
  {
    id: 'custom-adventure-pacing',
    category: 'B2B & Operations',
    q: 'Can itineraries be customized for specific trekking abilities, private gulets, or culinary themes?',
    a: 'Every single program is fully customizable. We tailor daily hiking mileage on the Lycian Way or Cappadocia trails to your group’s fitness level, secure exclusive private hot air balloon baskets, arrange private handcrafted wooden gulet charters along the Turquoise Coast, and coordinate private masterclasses with master chefs and archaeologists.',
    keywords: ['custom Turkey itinerary builder', 'private gulet charter Gocek', 'hiking Lycian Way small group', 'exclusive Cappadocia balloon basket']
  }
];


export const COMPANY_CONTACT = {
  tursabNumber: 'A-15764',
  address: 'Abide-i Hurriyet Cd. Blackout 211/67 Sisli Istanbul Turkiye',
  phone: '+90 850 309 31 63',
  phoneRaw: '+908503093163',
  whatsapp: '+90 544 836 28 45',
  whatsappRaw: '905448362845',
  phoneUs: '+1 (505) 581 67 07',
  phoneUsRaw: '+15055816707',
  usaAddress: '30 N Gould St STE 7000 Sheridan Wyoming 82801 USA',
  businessHours: 'Mon- Sat: 09:00 AM - 7:00 PM',
  turkiyeOffice: {
    title: 'Turkiye Office (HQ)',
    address: 'Abide-i Hurriyet Cd. Blackout 211/67 Sisli Istanbul Turkiye',
    phone: '+90 850 309 31 63',
    phoneRaw: '+908503093163',
    whatsapp: '+90 544 836 28 45',
    whatsappRaw: '905448362845',
  },
  usaOffice: {
    title: 'USA Office (Branch)',
    address: '30 N Gould St STE 7000 Sheridan Wyoming 82801 USA',
    phone: '+1 (505) 581 67 07',
    phoneRaw: '+15055816707',
  },
  email: 'ops@baobabdmc.com',
  calendlyUrl: 'https://calendly.com/baobabdmc-info/30min',
  calendlyUsername: 'baobabdmc-info',
  calendlyEventTypes: [
    {
      id: 'b2b-discovery',
      name: '30-Min Partner Discovery Call',
      duration: '30 min',
      description: 'Introduction for new tour operators and travel agencies. Review of our B2B services, net tariff structures, and ground handling capabilities across Turkey.',
      slug: '30min',
      url: 'https://calendly.com/baobabdmc-info/30min',
      type: 'Video Call (Zoom / Google Meet)'
    },
    {
      id: 'custom-itinerary',
      name: 'Custom Itinerary & Net Tariff Session',
      duration: '30 min',
      description: 'Detailed routing and quotation workshop for high-value FIT clients or small group bookings (Istanbul, Cappadocia, Aegean, Lycian Way).',
      slug: '30min',
      url: 'https://calendly.com/baobabdmc-info/30min',
      type: 'Video Call (Zoom / Google Meet)'
    },
    {
      id: 'gulet-adventure',
      name: 'Private Gulet & Trekking Logistics',
      duration: '30 min',
      description: 'Deep dive into private handcrafted gulet charters, Lycian Way hiking stages, Mount Ararat expeditions, or specialty adventure programs.',
      slug: '30min',
      url: 'https://calendly.com/baobabdmc-info/30min',
      type: 'Video Call (Zoom / Google Meet)'
    }
  ]
};
