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
    heroImage: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80'
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
    heroImage: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
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
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
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
    heroImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80'
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
    heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80'
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
    heroImage: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'
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
    airportCode: 'GNY / GZT / MQM / KSY / DIY',
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
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80'
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
    name: 'Lake Van, Mount Ararat & Dogubayazit',
    regionTag: 'High Armenian Highlands & Biblical Peaks',
    region: 'Eastern & Southeastern',
    tagline: 'Turquoise Soda Lake, Akdamar Church, Ishak Pasha Palace & Biblical Ararat',
    description: 'A dramatic wilderness frontier where snow-draped Mount Ararat towers over vast volcanic plateaus and saline Lake Van. Explore the 10th-century stone carvings of Akdamar Holy Cross Church, Urartian citadels, and the fairytale clifftop Ishak Pasha Palace.',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'
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
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=85',
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
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85',
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
    coverImage: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1200&q=85',
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
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'The legendary hotel built in 1892 to host Orient Express travelers. Agatha Christie and Ernest Hemingway stayed here. Perfect base for small group cultural travelers in Istanbul.',
    idealFor: 'Literary Salons, Afternoon Tea & Intimate Private Gatherings'
  },
  {
    id: 'binbirdirek-cistern',
    name: 'The 6th-Century Binbirdirek Cistern',
    location: 'Sultanahmet, Istanbul',
    type: 'Historic Palace',
    capacity: 'Private Group Access (10–150 Guests)',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    description: 'A subterranean marvel supported by 224 marble columns built by the Roman Emperor Justinian. We arrange private acoustic walk-throughs and small-group classical music recitals.',
    idealFor: 'Acoustic Recitals, Private Cultural Soirees & Historical Lectures'
  },
  {
    id: 'cappadocia-cave-canyon',
    name: 'Zemi Valley Monastic Cave Sanctuary',
    location: 'Goreme, Cappadocia',
    type: 'Cave & Canyon',
    capacity: 'Small Groups (10–50 Guests)',
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
    description: 'A private natural amphitheater and hollowed volcanic rock monastery illuminated by candle lanterns, torchlit pathways, and local Anatolian musicians.',
    idealFor: 'Sunset Wine Tastings, Intimate Group Dinners & Whirling Dervish Performances'
  },
  {
    id: 'celsus-library-ephesus',
    name: 'The Ancient Library of Celsus',
    location: 'Ephesus, Selcuk',
    type: 'Ancient Ruin',
    capacity: 'Curated Heritage Groups',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
    description: 'One of the most breathtaking monuments of the classical Greco-Roman world. We coordinate special permissions for quiet, scholar-guided visits beneath its towering Corinthian colonnade.',
    idealFor: 'Scholar Lectures, Sunset Archaeological Walks & Chamber Music'
  },
  {
    id: 'karakaya-village',
    name: 'Historic Karakaya Stone Village Retreat',
    location: 'Gumusluk, Bodrum Peninsula',
    type: 'Coastal & Yacht',
    capacity: 'Small Groups (10–40 Guests)',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description: 'A 300-year-old stone village perched high above the Aegean Sea overlooking the Greek islands. An inspiring mountain sanctuary for small retreat groups, sunset meals, and hiking halts.',
    idealFor: 'Sunset Dinners, Meditation & Yoga Retreats, Walking Group Halts'
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

export const FAQ_ITEMS = [
  {
    q: 'What makes Baobab DMC specialized in small group tours & adventures?',
    a: 'Unlike mass-market tour operators with 50-passenger coaches or commercial commission stops, Baobab DMC specializes strictly in intimate small groups (typically 6–14 guests). We use luxury Mercedes VIP Sprinters, stay in authentic boutique cave hotels and restored Ottoman stone mansions, work with university-degreed archaeologist guides, and construct active hiking and cultural itineraries off the beaten path.'
  },
  {
    q: 'Do you collaborate with international travel agencies and group leaders?',
    a: 'Yes, the majority of our work is partnering with boutique travel advisors, group tour operators, walking and hiking clubs, and private group organizers worldwide. We provide full white-label itineraries, net B2B wholesale pricing, flexible payment terms, and 24/7 on-ground dispatch.'
  },
  {
    q: 'Can itineraries be customized for specific hiking abilities or cultural interests?',
    a: 'Every single program can be customized. We can adjust daily trail distances on the Lycian Way or in Cappadocia valleys, integrate private cooking workshops, arrange private hot air balloon baskets, or coordinate private wooden gulet charters to suit your travelers’ exact pace and interests.'
  },
  {
    q: 'How quickly do you prepare custom tour proposals and quotes?',
    a: 'For small group tours and bespoke adventure inquiries, our operations team delivers a detailed day-by-day itinerary proposal with transparent net pricing within 24 business hours.'
  },
  {
    q: 'What are your safety standards for adventure activities and transportation?',
    a: 'All our Mercedes Sprinter vehicles are fully insured under comprehensive passenger liability policies with professional, background-checked chauffeurs. Our adventure and trekking guides are certified in wilderness first aid, and we maintain a 24/7 dedicated dispatch team with real-time support.'
  }
];

export const COMPANY_CONTACT = {
  tursabNumber: 'A-15764',
  address: 'Merkez Neighborhood, Abide-i Hurriyet Avenue, Blackout 211/67, Sisli, Istanbul, Turkey',
  phone: '+90 850 309 31 63',
  phoneRaw: '+908503093163',
  whatsapp: '+90 544 836 28 45',
  whatsappRaw: '905448362845',
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
