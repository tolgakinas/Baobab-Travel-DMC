import { AtlasTrip } from '../types';

export const ISTANBUL_DAY_TOURS: AtlasTrip[] = [
  {
    id: 'day-tour-kickstart',
    atlasId: 30076,
    title: 'Istanbul Kick-Start Tour: First-Time Visitor Essentials',
    slug: 'istanbul-kick-start-tour-first-time-visitor-essentials',
    category: 'Day Tours',
    duration: '2 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 8) or Private',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Designed specifically for first-time arrivals, this high-yield 2-hour walking orientation introduces you to the rhythm of Istanbul. Explore the heart of the historic Sultanahmet peninsula, receive an Istanbulkart transit card briefing, understand local cultural etiquette, avoid common tourist pitfalls, and obtain tailored recommendations for dining, shopping, and independent exploration.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Sultanahmet Square & Historic Peninsula Orientation',
        description: 'Meet your licensed local host in central Sultanahmet. Walk through the historic Hippodrome, view the German Fountain, Hagia Sophia, and Blue Mosque from key vantage points, learn how to navigate the tramway network, and receive curated tips on neighborhood dining and museum scheduling.'
      }
    ],
    includes: [
      'Licensed professional English-speaking local guide',
      '2-hour guided walking orientation',
      'Local transit orientation and Istanbulkart briefing',
      'Customized neighborhood guide and restaurant recommendations'
    ],
    excludes: [
      'Interior museum admissions',
      'Personal food, drinks, and incidentals',
      'Transportation to/from the meeting point',
      'Gratuities for your guide'
    ],
    highlights: [
      'Sultanahmet Square & German Fountain',
      'Hippodrome of Constantinople & Egyptian Obelisk',
      'Exterior perspectives of Hagia Sophia & Blue Mosque',
      'Public transit (tram & ferry) navigation masterclass'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-byzantium-cistern',
    atlasId: 24523,
    title: 'Byzantium Hagia Sophia & Basilica Cistern Tour',
    slug: 'byzantium-hagia-sophia-and-basilica-cistern-shared-tour',
    category: 'Day Tours',
    duration: '2.5 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 10) or Private',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Step deep into the Byzantine golden age with an intimate, scholar-guided journey through two of antiquity’s most extraordinary architectural achievements: the sixth-century Hagia Sophia and the subterranean Basilica Cistern. Discover towering marble columns, shimmering golden mosaics, and mysterious upside-down Medusa heads with seamless ticketing assistance.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Hagia Sophia Grand Nave & Subterranean Cistern',
        description: 'Explore Hagia Sophia with an art historian, observing the 55-meter dome, Byzantine mosaics, and imperial graffiti. Continue underground to the Basilica Cistern (Yerebatan Sarnici) to walk the raised wooden pathways above the reflective waters beneath 336 marble columns.'
      }
    ],
    includes: [
      'Licensed art-historian tour guide',
      'Skip-the-ticket-line logistics and reservation coordination',
      'Headsets when required for clear audio',
      'In-depth architectural commentary'
    ],
    excludes: [
      'Monument admission tickets (coordinated directly on-site)',
      'Hotel pick-up and drop-off',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Hagia Sophia 6th-century Byzantine architecture',
      'Golden mosaic portraits of Christ Pantocrator and Byzantine empresses',
      'Subterranean Basilica Cistern & inverted Medusa column pedestals',
      'Weeping column and atmospheric underground acoustic system'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-essentials-full-day',
    atlasId: 22959,
    title: 'Istanbul Essentials: 1-Day Private Guided Tour (Hotel Pick-Up & Drop-Off)',
    slug: 'istanbul-essentials-1-day-private-guided-tour-pick-up-drop-off',
    category: 'Day Tours',
    duration: 'Full Day (7–8 Hours)',
    daysCount: 1,
    groupSize: 'Private Group (VIP Mercedes Vehicle)',
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'The definitive private introduction to Istanbul’s historic highlights. Enjoy private door-to-door Mercedes transportation, skip-the-line coordination, and a dedicated licensed expert guide throughout. Visit Hagia Sophia, the Blue Mosque, the historic Hippodrome, Topkapi Palace, and the lively labyrinth of the Grand Bazaar with personalized pacing.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Complete Historic Peninsula Circuit',
        description: 'Morning hotel pick-up in a private vehicle. Tour the Byzantine marvel Hagia Sophia and the Ottoman masterpiece Sultan Ahmed (Blue) Mosque. Walk through the Roman Hippodrome, visit the courtyards and state rooms of Topkapi Palace, enjoy lunch at an authentic Ottoman restaurant, and spend the afternoon navigating the Grand Bazaar.'
      }
    ],
    includes: [
      'Private luxury Mercedes vehicle with dedicated chauffeur for 8 hours',
      'Door-to-door hotel pick-up and drop-off in central Istanbul',
      'Licensed private guide dedicated exclusively to your party',
      'Full-day customized itinerary pacing',
      'Bottled cold water in vehicle'
    ],
    excludes: [
      'Museum admission fees (paid on arrival or pre-issued on request)',
      'Lunch and beverages',
      'Personal purchases in the Grand Bazaar',
      'Driver and guide gratuities'
    ],
    highlights: [
      'Hagia Sophia UNESCO World Heritage monument',
      'Blue Mosque courtyard and iconic 20,000 blue Iznik tiles',
      'Topkapi Palace imperial pavilions and Bosphorus lookouts',
      'Grand Bazaar artisan quarters, silversmiths, and spice hans'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-topkapi-harem',
    atlasId: 22729,
    title: 'Istanbul Topkapı Palace & Imperial Harem Guided Tour',
    slug: 'istanbul-topkapi-palace-and-harem-guided-tour',
    category: 'Day Tours',
    duration: '3.5 – 4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 8) or Private',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'A comprehensive, scholar-led exploration of the seat of Ottoman power for over 400 years. Delve into the palace courtyards, the Imperial Council (Divan), the Privy Chamber of Sacred Relics, and the labyrinthine Imperial Harem—home to the Sultans, Valide Sultans (Queen Mothers), and concubines.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Imperial Courtyards & The Secret World of the Harem',
        description: 'Begin at the Gate of Salutation into the Second Courtyard. Explore the Divan, the imperial kitchens, the Chamber of Sacred Relics in the Third Courtyard, and the Fourth Courtyard gardens overlooking the Bosphorus and Golden Horn. Complete the visit inside the tiled chambers and courtyards of the Imperial Harem.'
      }
    ],
    includes: [
      'Licensed Ottoman history specialist guide',
      'Guided access to Topkapi Palace and the Imperial Harem',
      'Audio headset equipment for crystal clear commentary',
      'Insider historical narratives and court life context'
    ],
    excludes: [
      'Palace entry tickets',
      'Hotel transfers',
      'Food and beverages',
      'Tips for guide'
    ],
    highlights: [
      'Imperial Council Hall (Kubbealti / Divan)',
      'Chamber of the Sacred Relics with continuous Quranic recitation',
      'Imperial Harem apartments, Valide Sultan baths & courtyards',
      'Baghdad and Revan kiosks with sweeping Bosphorus panoramas'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-best-of-cistern-mosque-bazaar',
    atlasId: 22176,
    title: 'Best of Istanbul: Basilica Cistern, Blue Mosque & Grand Bazaar',
    slug: 'best-of-istanbul-basilica-cistern-blue-mosque-grand-bazaar',
    category: 'Day Tours',
    duration: '4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 10) or Private',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Capture the magic of Istanbul’s legendary Old Town in a focused half-day walking tour. Descend beneath the city streets into the eerie Basilica Cistern, admire the towering domes and turquoise Iznik tiles of the Blue Mosque, stroll the Roman Hippodrome, and conclude amidst the vibrant stalls and ancient hans of the Grand Bazaar.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Underground Wonders to Bustling Bazaar Passages',
        description: 'Meet in Sultanahmet for a morning exploration of the subterranean Basilica Cistern. Walk across the Hippodrome to the Sultan Ahmed (Blue) Mosque, learning Islamic art and Ottoman architectural history. Conclude with a guided walking discovery through the Grand Bazaar’s most authentic artisan quarters.'
      }
    ],
    includes: [
      'Professional licensed English-speaking guide',
      'Guided entry to the Blue Mosque and Hippodrome',
      'Basilica Cistern skip-the-line ticket service',
      'Curated Grand Bazaar heritage walk with artisan stops'
    ],
    excludes: [
      'Basilica Cistern admission fee',
      'Hotel transfers',
      'Personal purchases and snacks',
      'Gratuities'
    ],
    highlights: [
      'Basilica Cistern and illuminated Medusa pillars',
      'Blue Mosque six minarets and 20,000 handmade Iznik tiles',
      'Hippodrome: Serpentine Column & Walled Obelisk',
      'Grand Bazaar centuries-old carpet, spice, and jewelry lanes'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-topkapi-blue-mosque',
    atlasId: 13694,
    title: 'Topkapı Palace with Harem & Blue Mosque Guided Tour',
    slug: 'topkapi-palace-with-harem-and-blue-mosque-guided-tour',
    category: 'Day Tours',
    duration: '4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 10) or Private',
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Immerse yourself in Ottoman imperial grandeur by pairing two adjacent architectural marvels. Begin inside the Blue Mosque with its cascading domes and intricate stained glass, then enter the expansive grounds of Topkapi Palace and its secluded Imperial Harem for an evocative look at royal dynasties, politics, and opulence.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Imperial Ottoman Masters Tour',
        description: 'Meet in Sultanahmet Square. Visit the Blue Mosque courtyard and prayer hall with full dress-code guidance. Continue to the Imperial Gate of Topkapi Palace, wandering its four royal courtyards, treasury displays, weapon collections, and private Harem chambers.'
      }
    ],
    includes: [
      'Licensed professional tour guide',
      'Small group format for an intimate experience',
      'Comprehensive Topkapi Palace and Harem visit',
      'Blue Mosque guided walkthrough'
    ],
    excludes: [
      'Topkapi Palace and Harem admission tickets',
      'Transportation to meeting point',
      'Personal food & drink',
      'Guide tips'
    ],
    highlights: [
      'Blue Mosque imperial prayer hall and cascading domes',
      'Topkapi Palace Gate of Salutation & Imperial Council',
      'Private apartments of the Sultan and Valide Sultan in the Harem',
      'Terrace kiosks overlooking the confluence of the Bosphorus and Golden Horn'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-express-highlights',
    atlasId: 21726,
    title: 'Istanbul Express 1 or 2-Day City Highlights Private Tour',
    slug: 'istanbul-express-1-or-2-day-citys-highlights-private-guided-tour',
    category: 'Day Tours',
    duration: '1 or 2 Full Days',
    daysCount: 1,
    groupSize: 'Private Group Only',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'A completely customizable private tour covering Istanbul’s crown jewels at your chosen tempo. Option for 1 Day (Sultanahmet focus: Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar) or 2 Days (expanding to the Spice Bazaar, scenic Bosphorus yacht cruise, Galata Tower, and the bohemian Fener-Balat neighborhood).',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Historic Peninsula or Extended Bosphorus & Heritage Quarter',
        description: 'Day 1 covers the core UNESCO historic monuments of Sultanahmet and the Grand Bazaar. On a 2-day selection, continue with the Spice Market, private or public Bosphorus boat ride, Galata Tower district, and the historic multi-cultural lanes of Fener and Balat.'
      }
    ],
    includes: [
      'Private licensed guide for 7-8 hours per day',
      'Customized daily itinerary adapted to your interests',
      'Hotel pick-up in central Istanbul',
      'Insider culinary and shopping advice'
    ],
    excludes: [
      'Museum admission tickets',
      'Private boat charter or ferry fares',
      'Lunches and beverages',
      'Vehicle transport (available as an upgrade upon request)'
    ],
    highlights: [
      'Hagia Sophia & Blue Mosque',
      'Topkapi Palace & Grand Bazaar',
      'Bosphorus waterway and waterfront palaces',
      'Galata Tower, Istiklal Avenue & Fener-Balat'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-taksim-galata-passages',
    atlasId: 16611,
    title: 'Taksim to Galata with Secret Passages Walking Tour',
    slug: 'istanbul-modern-city-walking-taksim-to-galata-with-secret-passages',
    category: 'Day Tours',
    duration: '3.5 – 4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 10) or Private',
    image: 'https://images.unsplash.com/photo-1567527259232-3a7fcd490c53?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Venture beyond Sultanahmet into Istanbul’s 19th-century cosmopolitan heart: Beyoğlu (ancient Pera). Walk Istiklal Avenue to discover hidden neoclassical passages (pasajlar), historic embassies, neo-Gothic churches, bohemian art studios, antique arcades, and secret rooftop terraces leading down to the medieval Galata Tower.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Istiklal Avenue Arcades & Galata Medieval Quarter',
        description: 'Meet at Taksim Square. Walk down Istiklal Avenue with stops at Çiçek Pasajı (Flower Passage), Avrupa Pasajı, Atlas Arcade, and St. Anthony of Padua Church. Traverse historic French Street (Cezayir Sokağı), discover vintage vinyl and musical instrument shops, and finish at Galata Tower plaza.'
      }
    ],
    includes: [
      'Licensed local guide passionate about Beyoğlu architecture and lore',
      'Access to hidden historical passages and antique courtyards',
      'Traditional Turkish coffee or tea stop in a historic arcade',
      'Insider recommendations for contemporary art galleries and bistros'
    ],
    excludes: [
      'Galata Tower entrance ticket',
      'Hotel transfers',
      'Personal shopping and heavy meals',
      'Tips for guide'
    ],
    highlights: [
      'Historic red Nostalgic Tram on Istiklal Avenue',
      'Çiçek Pasajı, Avrupa Pasajı, and hidden 19th-century arcades',
      'St. Anthony of Padua Basilica & Pera Palace exterior',
      'Medieval Galata Tower and Genoese neighborhood quarters'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-galata-fener-balat-ferry',
    atlasId: 9794,
    title: 'Galata Tower, Fener & Balat with Golden Horn Ferry',
    slug: 'multi-cultural-istanbul-galata-tower-fener-balat-golden-horn-by-ferry',
    category: 'Day Tours',
    duration: '6 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 10) or Private',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'An off-the-beaten-path heritage walk revealing the multi-cultural soul of Istanbul. Begin at the 14th-century Galata Tower, hop aboard a traditional public ferry across the Golden Horn, and explore the bohemian, rainbow-colored Ottoman streets of Fener, Balat, and Ayvansaray where Greek Orthodox, Jewish, and Armenian communities flourished for centuries.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Genoese Galata, Golden Horn Ferry & Colorful Balat',
        description: 'Meet near Galata Tower. Walk down the historic Kamondo Stairs to the Karaköy docks. Board a Golden Horn ferry to Fener. Tour the Ecumenical Patriarchate of Constantinople, the red-brick Phanar Greek Orthodox College, the Bulgarian Cast-Iron Church of St. Stephen, and Balat’s pastel wooden houses and vintage cafes.'
      }
    ],
    includes: [
      'Licensed professional cultural heritage guide',
      'Scenic Golden Horn ferry fare',
      'Visits to the Greek Orthodox Patriarchate & Bulgarian Iron Church',
      'Local Turkish tea or coffee stop in Balat'
    ],
    excludes: [
      'Galata Tower entry ticket',
      'Lunch and snacks',
      'Hotel transfers',
      'Gratuities'
    ],
    highlights: [
      'Genoese Galata quarter & Art Nouveau Kamondo Stairs',
      'Scenic commuter ferry cruise on the historic Golden Horn',
      'Colorful wooden heritage houses of Balat',
      'Phanar Greek Orthodox College & Ecumenical Patriarchate',
      'St. Stephen Bulgarian Iron Church on the water’s edge'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-secret-streets',
    atlasId: 7300,
    title: 'Istanbul Small-Group City and Secret Streets Tour with Guide',
    slug: 'istanbul-small-group-city-and-secret-streets-tour-with-guide',
    category: 'Day Tours',
    duration: '4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 8)',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Break away from the tourist crowds and step into the living history of Istanbul’s hidden backstreets. Guided by an insider, uncover ancient caravanserais (hans) hidden behind modern storefronts, meet master copper and leather artisans working as they did in Ottoman times, and marvel at exquisite hidden mosques rarely seen on standard tours.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Hidden Caravanserais, Master Guilds & Hidden Domes',
        description: 'Walk through the narrow sloping lanes between the Grand Bazaar and Eminönü. Explore Büyük Yeni Han and Zincirli Han, visit artisan workshops, admire the dazzling tiles of the secluded Rüstem Pasha Mosque, and enjoy freshly brewed tea inside a centuries-old courtyard.'
      }
    ],
    includes: [
      'Expert local guide focused on authentic neighborhood culture',
      'Small group size (capped at 8 guests) for alleyway access',
      'Visit to historic hans, copper workshops, and tile ateliers',
      'Traditional Turkish tea stop'
    ],
    excludes: [
      'Hotel pick-up and drop-off',
      'Personal shopping and heavy meals',
      'Guide tips'
    ],
    highlights: [
      'Hidden courtyards of Büyük Yeni Han and Zincirli Han',
      'Rüstem Pasha Mosque with its supreme 16th-century Iznik tilework',
      'Traditional copper smiths and leather guilds of Tahtakale',
      'Local bazaar spice blenders and traditional tea gardens'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-10-tastings-food',
    atlasId: 23375,
    title: '10 Tastings of Istanbul Food Tour with a Local Host',
    slug: '10-tastings-of-istanbul-food-tour-with-a-local-host',
    category: 'Day Tours',
    duration: '4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 8) or Private',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Taste your way through the authentic food culture of Istanbul with a passionate foodie host. Experience 10 hand-picked tastings covering sweet, savory, street food, and historic tavern dishes across historic market districts. Discover how Turkish, Ottoman, and regional Anatolian traditions blend together in every bite.',
    itinerary: [
      {
        dayNumber: 1,
        title: '10 Hand-Picked Culinary Stops',
        description: 'Wander through historic market streets tasting warm sesame simit, artisanal tulum cheeses, pastirma (cured beef), crispy borek, spicy cig kofte, wood-roasted doner, freshly made pide, midye dolma (stuffed mussels), pistachio baklava, and authentic charcoal-brewed Turkish coffee.'
      }
    ],
    includes: [
      '10 generous food tastings (equivalent to a complete lunch/dinner)',
      'Passionate local culinary host',
      'Traditional drinks: Turkish tea, ayran, and sand-brewed Turkish coffee',
      'Dietary accommodation where requested in advance'
    ],
    excludes: [
      'Alcoholic beverages (unless specifically requested)',
      'Hotel transfers',
      'Personal food purchases to take home',
      'Gratuities for your host'
    ],
    highlights: [
      '10 distinct sweet & savory tastings across historic food markets',
      'Artisanal bakeries, cheese merchants & spice masters',
      'Traditional doner, stuffed mussels, and thin-crust pide',
      'Master sweet shops for hot pistachio baklava & Turkish delight'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-taste-two-continents',
    atlasId: 15180,
    title: 'Taste of Turkey in Two Continents: From Europe to Asian Kadıköy',
    slug: 'taste-of-turkey-in-two-continents-from-european-istanbul-to-asian-kadikoy',
    category: 'Day Tours',
    duration: '5.5 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 8) or Private',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'The ultimate culinary adventure spanning two continents in a single day. Begin in European Eminönü sampling breakfast specialties, then board a scenic public ferry across the Bosphorus to the lively Asian neighborhood of Kadıköy. Explore its renowned pedestrian food market, meze bistros, regional kebab houses, and seaside tea gardens in Moda.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'European Street Flavors to Asian Kadıköy Market',
        description: 'Start in the Spice Bazaar quarter for artisan cheeses, olives, and tea. Cross the Bosphorus by commuter ferry to Kadıköy on the Asian shore. Taste crispy thin-crust lahmacun, regional Aegean mezes, southeastern lamb kebabs, pickle juices, Maras hand-pulled ice cream, and finish with Turkish coffee in Moda.'
      }
    ],
    includes: [
      'All food tastings (more than enough for a substantial lunch)',
      'Licensed culinary guide',
      'Round-trip scenic Bosphorus public ferry fares',
      'Bottled water and traditional hot beverages'
    ],
    excludes: [
      'Hotel transfers',
      'Alcoholic drinks',
      'Souvenir purchases',
      'Host gratuities'
    ],
    highlights: [
      'Scenic Bosphorus ferry ride linking Europe and Asia',
      'Kadıköy open-air fish, pickle, and produce market',
      'Wood-fired lahmacun from an authentic southeastern oven',
      'Traditional meze tasting and regional Anatolian specialties',
      'Historic Moda neighborhood walking and seaside tea stop'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-culinary-hotspots',
    atlasId: 9800,
    title: 'Culinary Istanbul: Local Hotspots & Gourmet Street Foods',
    slug: 'istanbul-culinary-tour-local-tavern-and-gourmet-street-foods',
    category: 'Day Tours',
    duration: '4 Hours',
    daysCount: 1,
    groupSize: 'Small Group (Max 8) or Private',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Dive straight into Istanbul’s bustling street food hotspots and historical tavern culture across Karaköy and Beyoğlu. From crispy su böreği and charred kokoreç to savory meze plates in a century-old meyhane, this tour delivers an authentic taste of where Istanbulites really eat and socialize after hours.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Karaköy Waterfront, Street Vendors & Historic Meyhane',
        description: 'Begin near Karaköy port with savory pastry and tea. Walk through back alleys to discover specialist pickle purveyors, taste chargrilled street delicacies, visit a traditional meyhane for meze plates, and conclude with warm halva or fresh baklava.'
      }
    ],
    includes: [
      'All food tastings across 6-8 distinct culinary locations',
      'Local food enthusiast guide',
      'Water and traditional beverages (tea, turnip juice / salgam)',
      'Introduction to Istanbul’s culinary history and tavern customs'
    ],
    excludes: [
      'Hotel pick-up and drop-off',
      'Extra alcoholic beverages beyond included meze tastings',
      'Tips for guide'
    ],
    highlights: [
      'Karaköy waterfront and street food backstreets',
      'Traditional historic meyhane (tavern) meze dishes',
      'Master pickle makers and artisan pastry bakers',
      'Authentic local neighborhood atmosphere without commercial setups'
    ],
    originalUrl: ''
  },
  {
    id: 'day-tour-dinner-local-family',
    atlasId: 22544,
    title: 'Istanbul Food & Culture Tour: Dinner with a Local Family',
    slug: 'istanbul-food-and-culture-tour-dinner-at-local-family',
    category: 'Day Tours',
    duration: '3.5 Hours (Evening)',
    daysCount: 1,
    groupSize: 'Small Group (Max 6) or Private',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    destinations: ['Istanbul'],
    description: 'Experience genuine Turkish hospitality that cannot be found in restaurants. Join a welcoming Turkish family in their home for an intimate evening of shared food, culinary demonstrations, and authentic conversation. Enjoy a lavish multi-course home-cooked meal featuring heritage recipes passed down through generations.',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Authentic Turkish Home Dining & Cultural Exchange',
        description: 'Arrive at the host family’s home in an authentic Istanbul residential neighborhood. Sip welcome tea while observing how stuffed grape leaves (sarma) or börek are folded. Sit down together for a traditional multi-course family dinner followed by Turkish coffee and fortune telling.'
      }
    ],
    includes: [
      'Full home-cooked multi-course Turkish dinner',
      'Warm hospitality in an authentic family home',
      'Culinary host/translator throughout the evening',
      'Endless Turkish tea, homemade desserts, and Turkish coffee'
    ],
    excludes: [
      'Transportation to and from the residential meeting point',
      'Alcoholic beverages',
      'Personal gratuities'
    ],
    highlights: [
      'Authentic residential neighborhood setting away from tourists',
      'Hands-on culinary demonstration with the family cook',
      'Traditional home dishes: lentil soup, stuffed grape leaves, slow-braised meat, pilaf, homemade dessert',
      'Traditional Turkish coffee culture and relaxed conversation'
    ],
    originalUrl: ''
  }
];
