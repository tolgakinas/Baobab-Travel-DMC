export interface MapPOI {
  id: string;
  name: string;
  turkishName: string;
  destinationId: string;
  destinationName: string;
  region: string;
  category: 'UNESCO World Heritage' | 'Ancient Wonder' | 'Natural Phenomenon' | 'Nautical & Coast' | 'Active Adventure' | 'Sacred Heritage' | 'Cultural Heritage';
  x: number; // Percentage 0-100 across Turkey SVG viewBox (0 to 1000)
  y: number; // Percentage 0-100 across Turkey SVG viewBox (0 to 500)
  thumbnail: string;
  overview: string;
  insiderTip: string;
  bestTime: string;
  recommendedDuration: string;
}

export interface MapDestination {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  description: string;
  airport: string;
  poiCount: number;
}

export const MAP_DESTINATIONS: MapDestination[] = [
  {
    id: 'istanbul',
    name: 'Istanbul',
    region: 'Marmara',
    x: 215,
    y: 135,
    labelPosition: 'top',
    description: 'Imperial capital bridging Europe and Asia across the Bosphorus strait.',
    airport: 'IST / SAW',
    poiCount: 4
  },
  {
    id: 'troy-gallipoli',
    name: 'Troy & Gallipoli',
    region: 'Marmara / North Aegean',
    x: 105,
    y: 180,
    labelPosition: 'left',
    description: 'Homeric bronze-age citadel and WW1 historic battlefields at the Dardanelles.',
    airport: 'CKZ',
    poiCount: 2
  },
  {
    id: 'ephesus',
    name: 'Ephesus & Izmir',
    region: 'Aegean',
    x: 145,
    y: 295,
    labelPosition: 'left',
    description: 'Greco-Roman metropolis, Library of Celsus, and Urla wine valley.',
    airport: 'ADB',
    poiCount: 3
  },
  {
    id: 'pamukkale',
    name: 'Pamukkale',
    region: 'Aegean / Interior',
    x: 235,
    y: 295,
    labelPosition: 'top',
    description: 'Cascading white travertine mineral terraces and Hierapolis spa necropolis.',
    airport: 'DNZ',
    poiCount: 2
  },
  {
    id: 'bodrum',
    name: 'Bodrum & Datca',
    region: 'Aegean Coast',
    x: 145,
    y: 360,
    labelPosition: 'bottom',
    description: 'Sailing capital of Turkey, Knights Hospitaller castle, and wooden gulet harbors.',
    airport: 'BJV',
    poiCount: 2
  },
  {
    id: 'turquoise-coast',
    name: 'Fethiye & Lycia',
    region: 'Mediterranean',
    x: 220,
    y: 380,
    labelPosition: 'bottom',
    description: 'The Turquoise Coast, Oludeniz Blue Lagoon, Lycian Way trails, and Kekova sunken city.',
    airport: 'DLM',
    poiCount: 3
  },
  {
    id: 'antalya',
    name: 'Antalya & Pamphylia',
    region: 'Mediterranean',
    x: 310,
    y: 365,
    labelPosition: 'bottom',
    description: 'Ottoman harbor of Kaleici, colossal Aspendos amphitheater, and Taurus mountains.',
    airport: 'AYT',
    poiCount: 2
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    region: 'Central Anatolia',
    x: 485,
    y: 260,
    labelPosition: 'top',
    description: 'Lunar volcanic valleys, fairy chimneys, cave suites, and sunrise balloon flights.',
    airport: 'NAV / ASR',
    poiCount: 4
  },
  {
    id: 'ankara',
    name: 'Ankara',
    region: 'Central Anatolia',
    x: 395,
    y: 190,
    labelPosition: 'top',
    description: 'Modern capital housing the Museum of Anatolian Civilizations and Ataturk Mausoleum.',
    airport: 'ESB',
    poiCount: 1
  },
  {
    id: 'trabzon',
    name: 'Trabzon & Black Sea',
    region: 'Black Sea',
    x: 710,
    y: 135,
    labelPosition: 'top',
    description: 'Misty Pontic mountain plateaus, cliffside Sumela monastery, and lush tea valleys.',
    airport: 'TZX',
    poiCount: 2
  },
  {
    id: 'sanliurfa',
    name: 'Gobeklitepe & Urfa',
    region: 'Southeastern Anatolia',
    x: 670,
    y: 340,
    labelPosition: 'bottom',
    description: 'The cradle of human architecture at 9600 BC and historic biblical Upper Mesopotamia.',
    airport: 'GNY',
    poiCount: 3
  },
  {
    id: 'nemrut',
    name: 'Mount Nemrut',
    region: 'Eastern Anatolia',
    x: 660,
    y: 295,
    labelPosition: 'top',
    description: 'Commagene royal sanctuary atop a 2,134m summit with colossal stone deity heads.',
    airport: 'ADF',
    poiCount: 1
  },
  {
    id: 'lake-van',
    name: 'Lake Van & Ararat',
    region: 'Eastern Anatolia',
    x: 855,
    y: 230,
    labelPosition: 'top',
    description: 'Turkey’s largest alpine soda lake, medieval Akdamar Armenian cathedral, and Mt. Ararat.',
    airport: 'VAN',
    poiCount: 2
  }
];

export const MAP_POIS: MapPOI[] = [
  // Istanbul
  {
    id: 'hagia-sophia',
    name: 'Hagia Sophia & Sultanahmet',
    turkishName: 'Ayasofya-i Kebir Cami-i Serifi',
    destinationId: 'istanbul',
    destinationName: 'Istanbul',
    region: 'Marmara',
    category: 'UNESCO World Heritage',
    x: 215,
    y: 140,
    thumbnail: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80',
    overview: 'Built in 537 AD by Emperor Justinian, Hagia Sophia reigned as the world’s greatest cathedral for nearly a millennium before conversion to an imperial mosque.',
    insiderTip: 'Our scholar guides coordinate quiet upper gallery visits to view intact 11th-century Byzantine gold mosaics before tour crowds enter.',
    bestTime: 'Early morning (08:30) or late afternoon sunset prayer',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'topkapi-palace',
    name: 'Topkapi Palace & Imperial Harem',
    turkishName: 'Topkapi Sarayi Muzesi',
    destinationId: 'istanbul',
    destinationName: 'Istanbul',
    region: 'Marmara',
    category: 'UNESCO World Heritage',
    x: 225,
    y: 130,
    thumbnail: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=600&q=80',
    overview: 'The sprawling administrative headquarters and private residence of Ottoman sultans for over four centuries, commanding prime views of the Golden Horn and Bosphorus.',
    insiderTip: 'Book private early entry into the Courtyard of the Eunuchs and Sultan Valide chambers to experience the Iznik tiled apartments in total silence.',
    bestTime: 'Wednesday or Friday mornings',
    recommendedDuration: '3 Hours'
  },
  {
    id: 'bosphorus-strait',
    name: 'Bosphorus Exclusive Yacht Cruise',
    turkishName: 'Bogazici Ozel Tekne Turu',
    destinationId: 'istanbul',
    destinationName: 'Istanbul',
    region: 'Marmara',
    category: 'Nautical & Coast',
    x: 220,
    y: 120,
    thumbnail: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
    overview: 'A legendary waterway separating the European and Asian continents, lined with wooden Ottoman yali summer mansions, imperial marble palaces, and medieval fortresses.',
    insiderTip: 'Embark on a private sunset yacht cruise from Bebek to Rumeli Hisari fortress with champagne and mezes as minarets illuminate at dusk.',
    bestTime: 'Golden hour sunset (18:00 - 20:00)',
    recommendedDuration: '2 – 3 Hours'
  },
  {
    id: 'grand-bazaar',
    name: 'Grand Bazaar & Silversmith Hans',
    turkishName: 'Kapalicarsi & Tarihi Hanlar',
    destinationId: 'istanbul',
    destinationName: 'Istanbul',
    region: 'Marmara',
    category: 'Cultural Heritage',
    x: 208,
    y: 145,
    thumbnail: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
    overview: 'One of the world’s oldest covered markets featuring 4,000 artisan shops, 61 covered streets, and 18th-century caravanserais (hans) where masters work gold and copper.',
    insiderTip: 'Climb with our guide into the rooftop courtyard of Buyuk Valide Han for panoramic views where James Bond Skyfall was filmed.',
    bestTime: 'Weekday mornings (10:00 - 12:00)',
    recommendedDuration: '2 – 3 Hours'
  },

  // Troy & Gallipoli
  {
    id: 'ancient-troy',
    name: 'Ancient Troy (Hisarlik Archeological Site)',
    turkishName: 'Truva Antik Kenti & Muzesi',
    destinationId: 'troy-gallipoli',
    destinationName: 'Troy & Gallipoli',
    region: 'Marmara / North Aegean',
    category: 'UNESCO World Heritage',
    x: 105,
    y: 185,
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    overview: 'The legendary setting of Homer’s Iliad spanning 9 chronological archaeological strata from 3000 BC to the Roman era, complemented by the acclaimed contemporary Troy Museum.',
    insiderTip: 'Pair the site with the European Museum of the Year-winning Troy Museum to view recovered gold artifacts in contextual architectural models.',
    bestTime: 'Spring (April-May) or Autumn',
    recommendedDuration: '2.5 Hours'
  },
  {
    id: 'anzac-cove',
    name: 'Gallipoli Battlefields & Anzac Cove',
    turkishName: 'Canakkale Sehitlikleri & Ariburnu',
    destinationId: 'troy-gallipoli',
    destinationName: 'Troy & Gallipoli',
    region: 'Marmara / North Aegean',
    category: 'Sacred Heritage',
    x: 95,
    y: 165,
    thumbnail: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
    overview: 'Solemn WW1 historic battleground along the Dardanelles where the 1915 Gallipoli campaign unfolded, featuring preserved trenches, Lone Pine, and Chunuk Bair memorials.',
    insiderTip: 'Our historical specialist guide reads authentic soldiers’ diary passages on the beach at Anzac Cove at dawn for an unforgettable emotional resonance.',
    bestTime: 'April to October',
    recommendedDuration: 'Half Day'
  },

  // Ephesus & Aegean
  {
    id: 'library-of-celsus',
    name: 'Ephesus & Library of Celsus',
    turkishName: 'Efes Antik Kenti & Celsus Kutuphanesi',
    destinationId: 'ephesus',
    destinationName: 'Ephesus & Izmir',
    region: 'Aegean',
    category: 'UNESCO World Heritage',
    x: 145,
    y: 290,
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
    overview: 'One of the best-preserved Classical Greco-Roman cities in the Mediterranean, boasting the marble Curetes Way, the Grand Theater of 25,000 seats, and the monumental Library of Celsus.',
    insiderTip: 'Include the Terrace Houses (Yamach Evler) - opulent Roman villas featuring intact underfloor radiant heating, vibrant frescoes, and intricate mosaic floorings.',
    bestTime: 'Morning opening (08:30) or late afternoon golden hour',
    recommendedDuration: '3 Hours'
  },
  {
    id: 'house-virgin-mary',
    name: 'House of the Virgin Mary & Sirince',
    turkishName: 'Meryem Ana Evi & Sirince Koyu',
    destinationId: 'ephesus',
    destinationName: 'Ephesus & Izmir',
    region: 'Aegean',
    category: 'Sacred Heritage',
    x: 155,
    y: 298,
    thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    overview: 'A serene Christian shrine perched atop Mount Koressos where the Virgin Mary is believed to have spent her final days, alongside the Greek heritage hilltop village of Sirince.',
    insiderTip: 'After morning prayers at Mary’s house, head to Sirince for an organic olive oil tasting and boutique fruit vineyard tasting on a historic stone terrace.',
    bestTime: 'Morning before 10:30',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'urla-wine-valley',
    name: 'Urla Boutique Vineyard Route',
    turkishName: 'Urla Bag Yolu & Zeytinlikler',
    destinationId: 'ephesus',
    destinationName: 'Ephesus & Izmir',
    region: 'Aegean',
    category: 'Cultural Heritage',
    x: 135,
    y: 280,
    thumbnail: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    overview: 'An emerging gastronomic paradise along the Izmir peninsula reviving ancient Anatolian grape varietals such as Urla Karasi and Foca Karasi alongside olive oil mills dating to 600 BC.',
    insiderTip: 'Arrange a private sommelier lunch paired with estate vintages inside an olive grove with views over Chios and the Aegean.',
    bestTime: 'September harvest season or May bloom',
    recommendedDuration: 'Half Day'
  },

  // Pamukkale
  {
    id: 'pamukkale-travertines',
    name: 'Pamukkale Cotton Castle Travertines',
    turkishName: 'Pamukkale Travertenleri',
    destinationId: 'pamukkale',
    destinationName: 'Pamukkale',
    region: 'Aegean / Interior',
    category: 'Natural Phenomenon',
    x: 235,
    y: 295,
    thumbnail: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=600&q=80',
    overview: 'A dazzling geological natural wonder of terraced thermal pools formed by calcium carbonate-rich hot spring waters cascading down a 200-meter cliff face.',
    insiderTip: 'Walk barefoot across the lower warm water channels at sunset when the white mineral terraces reflect vivid pink, orange, and purple skies.',
    bestTime: 'Sunset (17:30 - 19:30)',
    recommendedDuration: '2.5 Hours'
  },
  {
    id: 'hierapolis-antique-pool',
    name: 'Hierapolis Spa City & Cleopatra’s Pool',
    turkishName: 'Hierapolis Antik Havuz & Tiyatro',
    destinationId: 'pamukkale',
    destinationName: 'Pamukkale',
    region: 'Aegean / Interior',
    category: 'Ancient Wonder',
    x: 245,
    y: 288,
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    overview: 'Ancient Greco-Roman thermal health resort founded in the 2nd century BC featuring the Martyrion of St. Philip, the massive Northern Necropolis, and the warm submerged Antique Pool.',
    insiderTip: 'Swim directly above submerged fluted 2,000-year-old Roman marble columns in 36°C bubbling carbonated thermal mineral spring water.',
    bestTime: 'Early morning swim (08:00 - 09:30)',
    recommendedDuration: '2 Hours'
  },

  // Bodrum
  {
    id: 'bodrum-castle',
    name: 'Bodrum Castle & Underwater Archeology',
    turkishName: 'Bodrum Kalesi & Sualti Arkeoloji Muzesi',
    destinationId: 'bodrum',
    destinationName: 'Bodrum & Datca',
    region: 'Aegean Coast',
    category: 'Cultural Heritage',
    x: 145,
    y: 360,
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    overview: 'Built by the Knights Hospitaller of St. John in 1402 using green stones from the Mausoleum at Halicarnassus, housing Bronze Age shipwrecks like the famous Uluburun.',
    insiderTip: 'Step inside the English Tower for medieval heraldic crests and glass exhibitions detailing trade routes from 1300 BC.',
    bestTime: 'Late afternoon before harbor cocktails',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'knidos-ruins',
    name: 'Ancient Knidos Harbor Sanctuary',
    turkishName: 'Knidos Antik Kenti (Datca)',
    destinationId: 'bodrum',
    destinationName: 'Bodrum & Datca',
    region: 'Aegean Coast',
    category: 'Ancient Wonder',
    x: 130,
    y: 375,
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
    overview: 'Perched at the dramatic tip of the Datca Peninsula where the Aegean meets the Mediterranean, famed for Praxiteles’ statue of Aphrodite and dual military/merchant harbors.',
    insiderTip: 'Arrive by private gulet boat at the southern harbor quay and climb to the lighthouse at sunset for panoramic 360° ocean views.',
    bestTime: 'Sunset from private boat',
    recommendedDuration: '2.5 Hours'
  },

  // Turquoise Coast & Lycia
  {
    id: 'kekova-sunken-city',
    name: 'Kekova Sunken City & Simena Castle',
    turkishName: 'Kekova Batik Sehir & Kalekoy',
    destinationId: 'turquoise-coast',
    destinationName: 'Fethiye & Lycia',
    region: 'Mediterranean',
    category: 'Nautical & Coast',
    x: 235,
    y: 395,
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    overview: 'An ancient Lycian settlement submerged by 2nd-century earthquakes. Swim near ruins of stone staircases, submerged amphorae, and climb to the crusader castle in roadless Kalekoy.',
    insiderTip: 'Glide directly above the submerged ruins in sea kayaks with a private maritime guide before larger day boats arrive.',
    bestTime: 'Morning (09:00 - 12:00)',
    recommendedDuration: 'Half Day'
  },
  {
    id: 'oludeniz-lagoon',
    name: 'Oludeniz Blue Lagoon & Babadag',
    turkishName: 'Oludeniz Tabiat Parki & Babadag',
    destinationId: 'turquoise-coast',
    destinationName: 'Fethiye & Lycia',
    region: 'Mediterranean',
    category: 'Active Adventure',
    x: 215,
    y: 380,
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    overview: 'One of the most photographed beaches on earth with serene turquoise waters enclosed by forested national parkland and the 1,969-meter Babadag peak.',
    insiderTip: 'Tandem paraglide from Babadag peak with certified professional pilots for an awe-inspiring 30-minute aerial descent over the entire lagoon.',
    bestTime: 'Morning calm or late afternoon',
    recommendedDuration: '3 Hours'
  },
  {
    id: 'lycian-way-trail',
    name: 'Lycian Way Coastal Trek (Faralya / Butterfly Valley)',
    turkishName: 'Likya Yolu & Kelebekler Vadisi',
    destinationId: 'turquoise-coast',
    destinationName: 'Fethiye & Lycia',
    region: 'Mediterranean',
    category: 'Active Adventure',
    x: 205,
    y: 388,
    thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    overview: 'A world-famous 540-km marked trail winding along dramatic Mediterranean limestone cliffs, pine forests, and ancient Lycian cliff-carved rock tombs.',
    insiderTip: 'We coordinate daypack-only hikes with our support vehicle transporting luggage ahead to boutique village stone lodges in Kabak or Faralya.',
    bestTime: 'April-May & September-October',
    recommendedDuration: 'Full Day'
  },

  // Antalya
  {
    id: 'aspendos-theater',
    name: 'Aspendos Roman Theater',
    turkishName: 'Aspendos Antik Tiyatrosu',
    destinationId: 'antalya',
    destinationName: 'Antalya & Pamphylia',
    region: 'Mediterranean',
    category: 'Ancient Wonder',
    x: 325,
    y: 360,
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
    overview: 'Commissioned by Emperor Marcus Aurelius in 155 AD, Aspendos is celebrated by classical archaeologists as the most complete and acoustically perfect ancient theater in the Roman world.',
    insiderTip: 'Drop a coin in the center of the orchestra circle to test the acoustic perfection from the top tier of 41 rows.',
    bestTime: 'Morning before noon heat',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'kaleici-old-town',
    name: 'Kaleici Historic Quarter & Hadrian’s Gate',
    turkishName: 'Antalya Tarihi Kaleici & Uckapilar',
    destinationId: 'antalya',
    destinationName: 'Antalya & Pamphylia',
    region: 'Mediterranean',
    category: 'Cultural Heritage',
    x: 305,
    y: 368,
    thumbnail: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
    overview: 'Antalya’s fortified historical heart with narrow cobblestone alleys, restored Ottoman-Greek konaks, Roman city walls, and a picturesque Roman harbor basin.',
    insiderTip: 'Stay in a restored 19th-century boutique konak and enjoy an evening cocktail overlooking the old Roman yacht port.',
    bestTime: 'Evening stroll (18:00 - 21:00)',
    recommendedDuration: 'Half Day'
  },

  // Ankara
  {
    id: 'museum-anatolian-civilizations',
    name: 'Museum of Anatolian Civilizations',
    turkishName: 'Anadolu Medeniyetleri Muzesi',
    destinationId: 'ankara',
    destinationName: 'Ankara',
    region: 'Central Anatolia',
    category: 'UNESCO World Heritage',
    x: 395,
    y: 190,
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    overview: 'Housed in a restored 15th-century Ottoman bedesten, this world-renowned museum showcases Neolithic artifacts from Catalhoyuk, Hittite bronze sun disks, and Phrygian relics.',
    insiderTip: 'Essential context before traveling to Cappadocia and Gobeklitepe; spend dedicated time at the 9,000-year-old Catalhoyuk mother goddess statuettes.',
    bestTime: 'Morning (09:00 - 11:30)',
    recommendedDuration: '2.5 Hours'
  },

  // Cappadocia
  {
    id: 'hot-air-ballooning',
    name: 'Sunrise Hot Air Balloon Flight',
    turkishName: 'Kapadokya Sicak Hava Balonu',
    destinationId: 'cappadocia',
    destinationName: 'Cappadocia',
    region: 'Central Anatolia',
    category: 'Natural Phenomenon',
    x: 485,
    y: 250,
    thumbnail: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/6e/8b/0e/6d/4b/v1_E10/E108WXLE.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=4b9d533d63cb4bb08c118d5b610bf41abe7ad0ee2807d8fa5e0ee0c12cd27d14',
    overview: 'Drift silently over volcanic valleys, fairy chimney pinnacles, and vineyard slopes at sunrise alongside up to 150 multicolored hot air balloons.',
    insiderTip: 'We book exclusively with ISO-certified senior chief pilots utilizing smaller 12-to-16 passenger baskets for superior flight comfort and personalized views.',
    bestTime: 'Dawn / Sunrise (05:00 - 07:30)',
    recommendedDuration: '3 Hours (Total experience)'
  },
  {
    id: 'goreme-open-air',
    name: 'Goreme Open Air Museum & Dark Church',
    turkishName: 'Goreme Acikhava Muzesi & Karanlik Kilise',
    destinationId: 'cappadocia',
    destinationName: 'Cappadocia',
    region: 'Central Anatolia',
    category: 'UNESCO World Heritage',
    x: 495,
    y: 260,
    thumbnail: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=600&q=80',
    overview: 'A monastic complex carved directly into soft volcanic tuff rock by 10th to 12th-century Byzantine monks, featuring vibrant preserved fresco cycles in the Dark Church.',
    insiderTip: 'The Karanlik Kilise (Dark Church) requires a special ticket that our agency includes automatically; its vibrant lapis lazuli frescoes look freshly painted.',
    bestTime: 'Opening hour (08:30) or late afternoon',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'derinkuyu-underground',
    name: 'Derinkuyu Multi-Level Underground City',
    turkishName: 'Derinkuyu Yeralti Sehri',
    destinationId: 'cappadocia',
    destinationName: 'Cappadocia',
    region: 'Central Anatolia',
    category: 'UNESCO World Heritage',
    x: 475,
    y: 275,
    thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
    overview: 'An 85-meter-deep engineering marvel excavated 8 levels into the earth, capable of shielding 20,000 citizens with massive rolling stone doors, ventilation shafts, stables, and a church.',
    insiderTip: 'Visit with our scholar guide who carries high-powered lights to explain the ventilation engineering and hidden escape tunnels.',
    bestTime: 'Mid-afternoon when temperature is pleasant',
    recommendedDuration: '1.5 Hours'
  },
  {
    id: 'rose-valley-trek',
    name: 'Rose & Red Valley Sunset Hike',
    turkishName: 'Gulludere & Kizilcukur Vadisi Yuruyusu',
    destinationId: 'cappadocia',
    destinationName: 'Cappadocia',
    region: 'Central Anatolia',
    category: 'Active Adventure',
    x: 492,
    y: 252,
    thumbnail: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
    overview: 'A stunning canyon hike through mineral-stained ridges that shift from pastel yellow to deep crimson pink as the sun descends over the Anatolian plateau.',
    insiderTip: 'Conclude the hike at a private viewpoint where our ground team prepares chilled Anatolian white wine and local dried figs as the sunset peaks.',
    bestTime: '2 hours before sunset',
    recommendedDuration: '2.5 Hours'
  },

  // Black Sea
  {
    id: 'sumela-monastery',
    name: 'Sumela Cliffside Monastery',
    turkishName: 'Sumela Manastiri (Altindere Vadisi)',
    destinationId: 'trabzon',
    destinationName: 'Trabzon & Black Sea',
    region: 'Black Sea',
    category: 'UNESCO World Heritage',
    x: 710,
    y: 145,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    overview: 'A 4th-century Greek Orthodox monastery dramatically clinging to a sheer 300-meter vertical cliff in the Altindere Valley national park amid misty spruce forests.',
    insiderTip: 'Walk the scenic pine path in the morning fog to witness the monastery emerging from cloud cover like a mythical citadel.',
    bestTime: 'May to October mornings',
    recommendedDuration: '3 Hours'
  },
  {
    id: 'kackar-highlands',
    name: 'Kackar Alpine Highlands & Tea Plantations',
    turkishName: 'Kackar Yaylalari & Rize Cay Bahceleri',
    destinationId: 'trabzon',
    destinationName: 'Trabzon & Black Sea',
    region: 'Black Sea',
    category: 'Natural Phenomenon',
    x: 745,
    y: 130,
    thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    overview: 'The emerald alpine crest of Turkey featuring glacier lakes, traditional wooden yayla chalets in Pokut and Ayder, and world-renowned terraced black tea valleys.',
    insiderTip: 'Stay in a family-run mountain lodge in Pokut above the cloud sea and taste fresh highland honey, corn bread, and muhlama (cheese fondue).',
    bestTime: 'June through September',
    recommendedDuration: 'Full Day'
  },

  // Southeastern Anatolia & Mesopotamia
  {
    id: 'gobeklitepe',
    name: 'Gobeklitepe: The Dawn of Civilization',
    turkishName: 'Gobeklitepe Tarihi Sit Alani',
    destinationId: 'sanliurfa',
    destinationName: 'Gobeklitepe & Urfa',
    region: 'Southeastern Anatolia',
    category: 'UNESCO World Heritage',
    x: 675,
    y: 345,
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    overview: 'Predating Stonehenge by 6,000 years and the Egyptian pyramids by 7,000 years (9600 BC), this monumental circular sanctuary revolutionized human history and religion.',
    insiderTip: 'Our archaeologist guides point out subtle high-relief carvings of wild boars, vultures, and foxes on the 10-ton monolithic T-pillars.',
    bestTime: 'Morning before noon heat (09:00 - 11:30)',
    recommendedDuration: '2.5 Hours'
  },
  {
    id: 'balikligol-urfa',
    name: 'Pool of Sacred Fish & Sanliurfa Bazaar',
    turkishName: 'Balikligol & Tarihi Urfa Carsisi',
    destinationId: 'sanliurfa',
    destinationName: 'Gobeklitepe & Urfa',
    region: 'Southeastern Anatolia',
    category: 'Sacred Heritage',
    x: 665,
    y: 355,
    thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    overview: 'The legendary birthplace of Prophet Abraham (Ibrahim), centered around the sacred carp pool Balikligol, Ottoman madrassas, and vibrant spice and leather bazaars.',
    insiderTip: 'Sample authentic Urfa kebab and sip bitter mirra coffee in the historic Gumruk Hani caravanserai courtyard surrounded by local poets and elders.',
    bestTime: 'Late afternoon through evening',
    recommendedDuration: '2 Hours'
  },
  {
    id: 'mardin-old-city',
    name: 'Mardin Stone Architecture & Deyrulzafaran',
    turkishName: 'Eski Mardin & Deyrulzafaran Manastiri',
    destinationId: 'sanliurfa',
    destinationName: 'Gobeklitepe & Urfa',
    region: 'Southeastern Anatolia',
    category: 'Cultural Heritage',
    x: 720,
    y: 350,
    thumbnail: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
    overview: 'Terraced golden limestone mansions cascading down a mountain ridge overlooking the endless Mesopotamian plain, home to 5th-century Syriac Orthodox Christian monasteries.',
    insiderTip: 'Listen to the Syriac liturgy recited in Aramaic (the language spoken by Jesus) at the Mor Gabriel or Deyrulzafaran monastery.',
    bestTime: 'Spring (April-May) or Autumn (September-November)',
    recommendedDuration: 'Full Day'
  },

  // Mount Nemrut
  {
    id: 'mount-nemrut',
    name: 'Mount Nemrut Colossal Statues',
    turkishName: 'Nemrut Dagi Heykelleri',
    destinationId: 'nemrut',
    destinationName: 'Mount Nemrut',
    region: 'Eastern Anatolia',
    category: 'UNESCO World Heritage',
    x: 660,
    y: 295,
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
    overview: 'The 2,134-meter tumulus tomb of King Antiochus I Theos of Commagene (1st century BC), guarded by massive 8-meter seated statues of Greek and Persian gods.',
    insiderTip: 'Experience both sunset on the Western Terrace and sunrise on the Eastern Terrace; bring warm layers as mountain peak temperatures drop rapidly.',
    bestTime: 'Sunrise or Sunset (May to October)',
    recommendedDuration: '3 Hours (Summit visit)'
  },

  // Eastern Anatolia (Van & Ararat)
  {
    id: 'akdamar-island',
    name: 'Akdamar Island & Church of the Holy Cross',
    turkishName: 'Akdamar Adasi & Surp Hac Kilisesi',
    destinationId: 'lake-van',
    destinationName: 'Lake Van & Ararat',
    region: 'Eastern Anatolia',
    category: 'UNESCO World Heritage',
    x: 845,
    y: 245,
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    overview: 'An idyllic island in turquoise Lake Van crowned by a 10th-century Armenian palatine church with masterwork stone bas-reliefs illustrating biblical scenes of David and Goliath.',
    insiderTip: 'Visit in late April or early May when wild almond trees across the island burst into pink blossom against the snow-capped Artos Mountain backdrop.',
    bestTime: 'Spring almond blossom season or early Autumn',
    recommendedDuration: 'Half Day'
  },
  {
    id: 'mount-ararat',
    name: 'Mount Ararat (Agri Dagi) & Ishak Pasha Palace',
    turkishName: 'Agri Dagi & Ishak Pasa Sarayi',
    destinationId: 'lake-van',
    destinationName: 'Lake Van & Ararat',
    region: 'Eastern Anatolia',
    category: 'Natural Phenomenon',
    x: 890,
    y: 190,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    overview: 'Turkey’s highest summit at 5,137 meters, celebrated in biblical tradition as the resting place of Noah’s Ark, paired with the fairytale 18th-century cliffside Ishak Pasha Palace in Dogubayazit.',
    insiderTip: 'View the sunset casting golden light across the palace courtyards with the snow-capped peak of Mount Ararat looming on the horizon.',
    bestTime: 'June through September',
    recommendedDuration: 'Full Day'
  }
];
