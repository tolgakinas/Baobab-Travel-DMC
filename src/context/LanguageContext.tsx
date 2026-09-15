import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'de' | 'es';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Top Bar
    'topbar.tursab': 'TURSAB Licensed A-Grade Operator #A-15764',
    'topbar.b2bTag': 'B2B Turkey Incoming DMC for Tour Operators & Travel Consultants Worldwide',
    'topbar.dispatch': 'Istanbul Ops Desk • 24/7 Ground Dispatch',

    // Navigation
    'nav.destinations': 'Destinations',
    'nav.services': 'DMC Services',
    'nav.trips': 'Guided Trips',
    'nav.itineraries': 'Sample Programs',
    'nav.routePlanner': 'Route Planner',
    'nav.lodges': 'Heritage Lodges',
    'nav.partner': 'Partner With Us',
    'nav.whyBaobab': 'Why Baobab',
    'nav.blog': 'Turkey Blog & Guides',
    'nav.requestProposal': 'Request Proposal',
    'nav.bookConsultation': 'Book Consultation',
    'nav.partnerB2b': 'B2B Partner Access',
    'nav.exploreRoutes': 'Explore Routes & Hubs',

    // Hero
    'hero.badge': 'Premier Incoming Destination Management Company • Turkiye',
    'hero.titleLine1': 'Bespoke Small Group Journeys',
    'hero.titleLine2': 'Engineered for Global Travel Planners',
    'hero.subtitle': 'We craft tailor-made cultural expeditions, active hiking trails, and private gulet charters across Turkey. Confidential net wholesale rates, white-label roadbooks, luxury Mercedes transport, and licensed scholar guides for international tour operators and travel agencies.',
    'hero.ctaRequest': 'Request Custom Proposal',
    'hero.ctaConsultation': 'Book Consultation (Calendly)',
    'hero.ctaPartner': 'Partner With Us (B2B)',
    'hero.ctaExplore': 'Explore Signature Destinations',
    'hero.selectDestination': 'Select Destination',
    'hero.tourType': 'Tour Type',
    'hero.groupSize': 'Group Size',
    'hero.quickSearch': 'Request B2B Proposal',
    'hero.currentViewing': 'Currently viewing:',

    // Blog
    'blog.tag': 'Turkiye Destination & Ground Operations Journal • SEO & GEO Guides',
    'blog.title': 'Turkiye Travel Guides, Logistics & Trade Insights',
    'blog.subtitle': 'Authoritative field intel, AIO-optimized destination blueprints, and essential operational tips for international travel planners.',
    'blog.readMore': 'Read Complete Guide',
    'blog.all': 'All Articles',
    'blog.destGuides': 'Destination Guides',
    'blog.logistics': 'Trip Logistics',
    'blog.travelTips': 'Travel Tips',
    'blog.b2bInsights': 'B2B Trade Insights',

    // Stats
    'stat.years': 'Years in Turkey',
    'stat.partners': 'B2B Global Partners',
    'stat.tursab': 'TURSAB Licensed',
    'stat.groupSize': 'Small Group & FIT',
    'stat.dispatch': 'Ground Dispatch',

    // Destinations Section
    'dest.tag': 'Major Destinations of Turkiye • Operational Hubs',
    'dest.title': 'A Tapestry of Continents,',
    'dest.titleSub': 'Empires & Diverse Terrains',
    'dest.desc': 'Explore Turkiye’s 8 premier travel regions. From the imperial shores of Istanbul and volcanic fairy chimneys of Cappadocia to the Lycian Turquoise Coast, Ephesus, Pamukkale thermal travertines, misty Pontic Black Sea plateaus, ancient Troy, and Lake Van & Mount Ararat in Upper Mesopotamia.',
    'dest.viewFacts': 'View Facts',
    'dest.planTour': 'Plan Tour',
    'dest.all': 'All Regions',

    // Trips Section
    'trips.tag': 'Atlas Global Tours Portfolio • Turnkey Ground Operations',
    'trips.title': 'Guided Tour Programs Across Turkiye',
    'trips.subtitle': 'B2B Small Group Journeys, Active Treks & Cultural Circuits',
    'trips.desc': 'Explore our complete operational portfolio of guided small-group and private tour programs across Turkey. All programs are fully customizable for your agency with white-label delivery, private executive transit, and licensed historian guides.',
    'trips.searchPlaceholder': 'Search by title, destination, or highlight...',
    'trips.filterAll': 'All Programs',
    'trips.cultural': 'Cultural Expeditions',
    'trips.hiking': 'Hiking & Active',
    'trips.coastal': 'Coastal & Gulet',
    'trips.viewItinerary': 'View Program Details',
    'trips.requestProposal': 'Request Net Tariff',

    // Services
    'services.tag': 'DMC Core Competencies & Ground Infrastructure',
    'services.title': 'Full-Service Inbound Operations',
    'services.subtitle': 'Delivered Under Your Agency Brand',

    // Partner
    'partner.tag': 'B2B Incoming Agency Network • Net Confidential Tariffs',
    'partner.title': 'Why Partner With Baobab DMC?',
    'partner.subtitle': 'Direct Ground Reliability for Global Tour Operators & Advisors',
    'partner.cta': 'Apply for B2B Partnership',

    // Inquiry Form
    'inquiry.tag': 'Tour Program Inquiry & Net Wholesale Proposal',
    'inquiry.title': 'Request Your Custom Tour Proposal',
    'inquiry.desc': 'Tailored for international tour operators, travel agencies, and independent travel consultants. Connect directly with our Istanbul destination operations desk for wholesale net confidential pricing, custom day-by-day itineraries, and guaranteed ground support.',
    'inquiry.step1': 'Trip Style / Category',
    'inquiry.step2': 'Destinations to Include in Turkey',
    'inquiry.step3': 'Scale, Duration & Lodging Standard',
    'inquiry.step4': 'Signature Experiences & Activities',
    'inquiry.step5': 'Contact Information & Agency Profile',
    'inquiry.fullName': 'Full Name *',
    'inquiry.company': 'Company / Travel Agency Name *',
    'inquiry.email': 'Business Email Address *',
    'inquiry.phone': 'Phone / WhatsApp *',
    'inquiry.country': 'Country of Operation *',
    'inquiry.role': 'Professional Role / Partner Type *',
    'inquiry.submit': 'Submit Tour Proposal Request',
    'inquiry.submitting': 'Sending to Operations Desk...',
    'inquiry.successTitle': 'Inquiry Received & Emailed to Operations',
    'inquiry.successDesc': 'Your proposal request has been logged and transmitted to tolgakinas@gmail.com and ops@baobabdmc.com. Our Senior Destination Director will reply within 24 business hours.',
    'inquiry.emailSentNotice': 'Notification dispatched to: tolgakinas@gmail.com & ops@baobabdmc.com',

    // Footer
    'footer.desc': 'Baobab Destination Management Company is an incoming B2B ground operator in Turkey, serving international tour operators, travel agencies, and independent travel consultants worldwide with confidential wholesale net rates, tailor-made itineraries, and 24/7 ground operations.',
    'footer.rights': 'All rights reserved. Specialized in small group tours & adventures in Turkey.',
    'footer.social': 'Connect With Us On Social Media',
    'footer.quickContact': 'Direct B2B Desk',

    // Social Media
    'social.linkedin': 'LinkedIn (B2B Trade Network)',
    'social.instagram': 'Instagram (@baobabdmcturkey)',
    'social.facebook': 'Facebook',
    'social.youtube': 'YouTube Channels',
  },
  de: {
    // Top Bar
    'topbar.tursab': 'TURSAB-Lizenzierte A-Agentur #A-15764',
    'topbar.b2bTag': 'B2B Türkei Incoming DMC für Reiseveranstalter & Reiseberater Weltweit',
    'topbar.dispatch': 'Istanbul Leitstelle • 24/7 Vor-Ort-Einsatzleitung',

    // Navigation
    'nav.destinations': 'Reiseziele',
    'nav.services': 'DMC Leistungen',
    'nav.trips': 'Geführte Reisen',
    'nav.itineraries': 'Musterprogramme',
    'nav.routePlanner': 'Routenplaner',
    'nav.lodges': 'Boutique-Lodges',
    'nav.partner': 'B2B Partnerschaft',
    'nav.whyBaobab': 'Über Baobab',
    'nav.blog': 'Türkei Reise-Blog & Guides',
    'nav.requestProposal': 'Angebot Anfordern',
    'nav.bookConsultation': 'Beratung Buchen',
    'nav.partnerB2b': 'B2B Partnerzugang',
    'nav.exploreRoutes': 'Routen & Knotenpunkte',

    // Hero
    'hero.badge': 'Führende Incoming-Agentur (DMC) • Türkei',
    'hero.titleLine1': 'Maßgeschneiderte Kleingruppenreisen',
    'hero.titleLine2': 'Für Professionelle Reiseplaner & Veranstalter',
    'hero.subtitle': 'Wir entwickeln maßgeschneiderte Kulturreisen, Wanderabenteuer und private Gulet-Kreuzfahrten in der gesamten Türkei. Vertrauliche Netto-Einkaufspreise, White-Label-Reiseunterlagen, VIP-Mercedes-Flotte und lizenzierte Akademiker-Reiseleiter für Reiseveranstalter und Reisebüros weltweit.',
    'hero.ctaRequest': 'Individuelles Angebot Anfordern',
    'hero.ctaConsultation': 'Videocall Buchen (Calendly)',
    'hero.ctaPartner': 'Partner Werden (B2B)',
    'hero.ctaExplore': 'Reiseziele Entdecken',
    'hero.selectDestination': 'Zielgebiet wählen',
    'hero.tourType': 'Reiseart',
    'hero.groupSize': 'Gruppengröße',
    'hero.quickSearch': 'B2B-Angebot anfordern',
    'hero.currentViewing': 'Aktuell angezeigt:',

    // Blog
    'blog.tag': 'Türkei-Reiseführer & Fachmagazin • SEO & GEO Guides',
    'blog.title': 'Türkei-Reiseführer, Logistik & Fachwissen',
    'blog.subtitle': 'Fundiertes Zielgebietswissen, KI-optimierte Reiserouten und unverzichtbare Tipps für internationale Reiseplaner.',
    'blog.readMore': 'Vollständigen Leitfaden lesen',
    'blog.all': 'Alle Artikel',
    'blog.destGuides': 'Reiseziel-Guides',
    'blog.logistics': 'Reiselogistik',
    'blog.travelTips': 'Reisetipps',
    'blog.b2bInsights': 'B2B-Branchenwissen',

    // Stats
    'stat.years': 'Jahre Erfahrung in der Türkei',
    'stat.partners': 'Weltweite B2B-Partner',
    'stat.tursab': 'TURSAB-Zertifiziert',
    'stat.groupSize': 'Kleingruppen & Privatreisen',
    'stat.dispatch': '24/7 Leitstelle',

    // Destinations Section
    'dest.tag': 'Hauptreiseziele der Türkei • Operative Stützpunkte',
    'dest.title': 'Ein Mosaik der Kontinente,',
    'dest.titleSub': 'Reiche & Faszinierende Landschaften',
    'dest.desc': 'Entdecken Sie die 8 führenden Reiseregionen der Türkei: vom historischen Istanbul und den Tuffstein-Tälern Kappadokiens über die lykische Türkisküste, Ephesos, Pamukkale, die Pontischen Alpen am Schwarzen Meer bis nach Troja und zum Vansee in Mesopotamien.',
    'dest.viewFacts': 'Fakten Ansehen',
    'dest.planTour': 'Reise Planen',
    'dest.all': 'Alle Regionen',

    // Trips Section
    'trips.tag': 'Atlas Global Tours Portfolio • Schlüsselfertige Durchführung',
    'trips.title': 'Geführte Reiseprogramme in der Türkei',
    'trips.subtitle': 'B2B-Kleingruppen, Aktive Treks & Rundreisen',
    'trips.desc': 'Unser vollständiges Portfolio an geführten Kultur- und Wanderreisen durch die Türkei. Sämtliche Reisen sind für Ihre Agentur frei anpassbar – mit White-Label-Unterlagen, privatem Transport und zertifizierten Historikern.',
    'trips.searchPlaceholder': 'Nach Titel, Region oder Highlight suchen...',
    'trips.filterAll': 'Alle Programme',
    'trips.cultural': 'Kulturelle Expeditionen',
    'trips.hiking': 'Wandern & Aktiv',
    'trips.coastal': 'Küste & Gulet',
    'trips.viewItinerary': 'Programm Einsehen',
    'trips.requestProposal': 'Netto-Tarif Anfragen',

    // Services
    'services.tag': 'DMC Kernkompetenzen & Infrastruktur',
    'services.title': 'Umfassende Incoming-Services',
    'services.subtitle': 'Durchgeführt unter Ihrer eigenen Agenturmarke',

    // Partner
    'partner.tag': 'B2B Agenturnetzwerk • Vertrauliche Netto-Einkaufspreise',
    'partner.title': 'Warum Partner von Baobab DMC werden?',
    'partner.subtitle': 'Direkte Zuverlässigkeit vor Ort für globale Reiseveranstalter',
    'partner.cta': 'B2B-Partnerschaft Beantragen',

    // Inquiry Form
    'inquiry.tag': 'Reiseanfrage & Vertrauliches Netto-Angebot',
    'inquiry.title': 'Fordern Sie Ihr Individuelles Reiseangebot An',
    'inquiry.desc': 'Maßgeschneidert für Reiseveranstalter und Reiseberater. Kontaktieren Sie unser Istanbuler Operations-Team für Netto-Einkaufspreise, Tagesprogramme und garantierte 24/7-Betreuung vor Ort.',
    'inquiry.step1': 'Reisestil & Kategorie',
    'inquiry.step2': 'Wunschziele in der Türkei',
    'inquiry.step3': 'Umfang, Reisedauer & Hotelstandard',
    'inquiry.step4': 'Besondere Erlebnisse & Aktivitäten',
    'inquiry.step5': 'Kontaktdaten & Agenturprofil',
    'inquiry.fullName': 'Vollständiger Name *',
    'inquiry.company': 'Unternehmen / Agenturname *',
    'inquiry.email': 'Geschäftliche E-Mail-Adresse *',
    'inquiry.phone': 'Telefon / WhatsApp *',
    'inquiry.country': 'Land der Agentur *',
    'inquiry.role': 'Funktion / Partnertyp *',
    'inquiry.submit': 'Reiseangebot Kostenfrei Anfragen',
    'inquiry.submitting': 'Wird an Leitstelle übermittelt...',
    'inquiry.successTitle': 'Anfrage Erfolgreich Erhalten & Weitergeleitet',
    'inquiry.successDesc': 'Ihre Anfrage wurde erfasst und direkt an tolgakinas@gmail.com sowie ops@baobabdmc.com übermittelt. Unser Zielgebietsleiter antwortet Ihnen innerhalb von 24 Stunden.',
    'inquiry.emailSentNotice': 'Benachrichtigung gesendet an: tolgakinas@gmail.com & ops@baobabdmc.com',

    // Footer
    'footer.desc': 'Baobab Destination Management Company ist Ihr spezialisierter B2B Incoming Ground Operator in der Türkei für maßgeschneiderte Rundreisen, vertrauliche Nettopreise und 24/7 Betreuung.',
    'footer.rights': 'Alle Rechte vorbehalten. Spezialist für Kleingruppen- und Erlebnisreisen in der Türkei.',
    'footer.social': 'Folgen Sie uns in den Sozialen Medien',
    'footer.quickContact': 'Direkter B2B-Kontakt',

    // Social Media
    'social.linkedin': 'LinkedIn (B2B Netzwerk)',
    'social.instagram': 'Instagram (@baobabdmcturkey)',
    'social.facebook': 'Facebook',
    'social.youtube': 'YouTube Kanäle',
  },
  es: {
    // Top Bar
    'topbar.tursab': 'Operador Grado A con Licencia TURSAB #A-15764',
    'topbar.b2bTag': 'DMC Receptivo B2B en Turquía para Touroperadores y Agencias del Mundo',
    'topbar.dispatch': 'Central de Estambul • Operaciones y Despacho 24/7',

    // Navigation
    'nav.destinations': 'Destinos',
    'nav.services': 'Servicios DMC',
    'nav.trips': 'Circuitos Guiados',
    'nav.itineraries': 'Programas Modelo',
    'nav.routePlanner': 'Planificador',
    'nav.lodges': 'Hoteles con Encanto',
    'nav.partner': 'Colabora con Nosotros',
    'nav.whyBaobab': 'Por qué Baobab',
    'nav.blog': 'Blog de Viajes y Guías',
    'nav.requestProposal': 'Solicitar Propuesta',
    'nav.bookConsultation': 'Reservar Consulta',
    'nav.partnerB2b': 'Acceso B2B',
    'nav.exploreRoutes': 'Rutas y Conexiones',

    // Hero
    'hero.badge': 'DMC Receptivo de Referencia en Turquía',
    'hero.titleLine1': 'Viajes a Medida para Grupos Reducidos',
    'hero.titleLine2': 'Diseñados para Diseñadores de Viajes y Agencias',
    'hero.subtitle': 'Diseñamos expediciones culturales a medida, rutas de senderismo y navegación privada en goletas por Turquía. Tarifas netas confidenciales, documentación marca blanca, flota Mercedes VIP y guías historiadores oficiales para touroperadores y agencias de viajes.',
    'hero.ctaRequest': 'Solicitar Propuesta a Medida',
    'hero.ctaConsultation': 'Agendar Reunión (Calendly)',
    'hero.ctaPartner': 'Colaborar (B2B)',
    'hero.ctaExplore': 'Explorar Destinos Exclusivos',
    'hero.selectDestination': 'Seleccionar Destino',
    'hero.tourType': 'Tipo de Viaje',
    'hero.groupSize': 'Tamaño de Grupo',
    'hero.quickSearch': 'Solicitar Propuesta B2B',
    'hero.currentViewing': 'Visualizando actualmente:',

    // Blog
    'blog.tag': 'Diario de Destinos y Operaciones de Turquía • Guías SEO y GEO',
    'blog.title': 'Guías de Viaje, Logística e Información para Profesionales',
    'blog.subtitle': 'Información experta de destino, rutas optimizadas para IA y consejos prácticos indispensables para planificadores de viajes.',
    'blog.readMore': 'Leer Guía Completa',
    'blog.all': 'Todos los Artículos',
    'blog.destGuides': 'Guías de Destino',
    'blog.logistics': 'Logística de Viaje',
    'blog.travelTips': 'Consejos de Viaje',
    'blog.b2bInsights': 'Estrategia B2B',

    // Stats
    'stat.years': 'Años de Experiencia en Turquía',
    'stat.partners': 'Socios Globales B2B',
    'stat.tursab': 'Licencia Oficial TURSAB',
    'stat.groupSize': 'Grupos Reducidos y Privados',
    'stat.dispatch': 'Despacho en Destino 24/7',

    // Destinations Section
    'dest.tag': 'Principales Destinos de Turquía • Centros Operativos',
    'dest.title': 'Un Tapiz de Continentes,',
    'dest.titleSub': 'Imperios y Paisajes Extraordinarios',
    'dest.desc': 'Explore las 8 regiones insignia de Turquía: desde el Bósforo en Estambul y los valles de Capadocia hasta la Costa Licia, Éfeso, las terrazas de Pamukkale, los Alpes Pónticos del Mar Negro, Troya y el Lago Van en Mesopotamia.',
    'dest.viewFacts': 'Ver Detalles',
    'dest.planTour': 'Diseñar Viaje',
    'dest.all': 'Todas las Regiones',

    // Trips Section
    'trips.tag': 'Portafolio Atlas Global Tours • Operaciones Receptivas Integrales',
    'trips.title': 'Programas de Viaje Guiados en Turquía',
    'trips.subtitle': 'Grupos Reducidos B2B, Senderismo Activo y Rutas Culturales',
    'trips.desc': 'Descubra nuestro portafolio de circuitos guiados en grupos reducidos y viajes privados por Turquía. Todos los programas son 100% personalizables con entrega en marca blanca, transporte ejecutivo privado y guías oficiales.',
    'trips.searchPlaceholder': 'Buscar por título, destino o experiencia...',
    'trips.filterAll': 'Todos los Programas',
    'trips.cultural': 'Expediciones Culturales',
    'trips.hiking': 'Senderismo y Activo',
    'trips.coastal': 'Costa y Goletas',
    'trips.viewItinerary': 'Ver Itinerario',
    'trips.requestProposal': 'Solicitar Tarifa Neta',

    // Services
    'services.tag': 'Capacidades Operativas e Infraestructura DMC',
    'services.title': 'Operaciones Receptivas Completas',
    'services.subtitle': 'Realizadas bajo la propia marca de su agencia',

    // Partner
    'partner.tag': 'Red de Agencias Asociadas B2B • Tarifas Netas Mayoristas',
    'partner.title': '¿Por qué Colaborar con Baobab DMC?',
    'partner.subtitle': 'Fiabilidad y coordinación directa en destino para agencias de todo el mundo',
    'partner.cta': 'Solicitar Registro B2B',

    // Inquiry Form
    'inquiry.tag': 'Solicitud de Viaje y Tarifa Neta Mayorista',
    'inquiry.title': 'Solicite su Propuesta de Viaje Personalizada',
    'inquiry.desc': 'Especialmente diseñado para touroperadores, agencias de viajes y consultores independientes. Conecte con nuestro equipo de operaciones en Estambul para tarifas confidenciales y soporte 24/7.',
    'inquiry.step1': 'Estilo de Viaje / Categoría',
    'inquiry.step2': 'Destinos a Incluir en Turquía',
    'inquiry.step3': 'Escala, Duración y Categoría de Alojamiento',
    'inquiry.step4': 'Experiencias Insignia y Actividades',
    'inquiry.step5': 'Datos de Contacto y Perfil de Agencia',
    'inquiry.fullName': 'Nombre y Apellidos *',
    'inquiry.company': 'Nombre de Empresa / Agencia *',
    'inquiry.email': 'Correo Electrónico Corporativo *',
    'inquiry.phone': 'Teléfono / WhatsApp *',
    'inquiry.country': 'País de Operación *',
    'inquiry.role': 'Cargo / Tipo de Socio *',
    'inquiry.submit': 'Enviar Solicitud de Propuesta',
    'inquiry.submitting': 'Transmitiendo a Operaciones...',
    'inquiry.successTitle': 'Solicitud Recibida y Enviada a Operaciones',
    'inquiry.successDesc': 'Su solicitud ha sido registrada y enviada a tolgakinas@gmail.com y ops@baobabdmc.com. Nuestro Director de Destino le responderá en un plazo máximo de 24 horas laborables.',
    'inquiry.emailSentNotice': 'Notificación transmitida a: tolgakinas@gmail.com y ops@baobabdmc.com',

    // Footer
    'footer.desc': 'Baobab Destination Management Company es un DMC receptivo B2B en Turquía, especializado en viajes para grupos reducidos, tarifas netas mayoristas y asistencia operativa 24/7.',
    'footer.rights': 'Todos los derechos reservados. Especialistas en grupos pequeños y aventura en Turquía.',
    'footer.social': 'Conecte con Nosotros en Redes Sociales',
    'footer.quickContact': 'Mesa Directa B2B',

    // Social Media
    'social.linkedin': 'LinkedIn (Red Profesional B2B)',
    'social.instagram': 'Instagram (@baobabdmcturkey)',
    'social.facebook': 'Facebook',
    'social.youtube': 'Canales de YouTube',
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('baobab_lang') as SupportedLanguage;
    if (saved && ['en', 'de', 'es'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('baobab_lang', lang);
  };

  const t = (key: string): string => {
    const langDict = translations[language] || translations.en;
    if (langDict[key]) return langDict[key];
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
