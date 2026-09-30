import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en';

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
    'hero.ctaConsultation': 'Book Consultation',
    'hero.ctaPartner': 'Partner With Us (B2B)',
    'hero.ctaExplore': 'Explore Destinations',
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
    'trips.tag': 'Curated Signature Journeys • Turnkey Ground Operations',
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

    // Page Headers & Direct Routes
    'pages.destinations.title': "Explore Turkey's 7 Diverse Regions",
    'pages.destinations.subtitle': 'From the historic domes of Istanbul and fairy chimneys of Cappadocia to the turquoise coves of the Aegean, discover hand-curated regional experiences.',
    'pages.destinations.badge': 'Destination Portfolios',
    'pages.destinations.cta': 'Request Regional Proposal',

    'pages.trips.title': 'Guided Trips & Expeditions',
    'pages.trips.subtitle': 'Curated small-group journeys, scholar-led cultural expeditions, active trail treks, scenic rail voyages, and private day tours across Turkey.',
    'pages.trips.badge': 'Small Group & Private Expeditions',
    'pages.trips.cta': 'Request Custom Expedition',

    'pages.itineraries.title': 'Sample Itinerary Frameworks',
    'pages.itineraries.subtitle': 'Fully adaptable multi-day route frameworks designed for B2B tour operators and travel advisors. White-label ready with complete day-by-day logistics.',
    'pages.itineraries.badge': 'Bespoke Route Frameworks',
    'pages.itineraries.cta': 'Request Custom Itinerary',

    'pages.services.title': 'Inbound DMC Ground Services',
    'pages.services.subtitle': 'End-to-end B2B ground handling in Turkey: VIP Chauffeur Fleet, Scholar-Led Cultural Guides, Private Gulet Charters, Luxury Hotel Contracting & 24/7 Operational Concierge.',
    'pages.services.badge': 'B2B Ground Operations',
    'pages.services.cta': 'Book Ground Services',

    'pages.venues.title': 'Exclusive Venues & Gala Spaces',
    'pages.venues.subtitle': 'Unforgettable backdrops for gala dinners, executive retreats, and private celebrations: Subterranean Byzantine Cisterns, Ottoman Waterfront Mansions, and Ancient Amphitheaters.',
    'pages.venues.badge': 'MICE & Gala Venues',
    'pages.venues.cta': 'Inquire for Gala Event',

    'pages.about.title': 'About Baobab DMC Turkey',
    'pages.about.subtitle': 'Licensed TURSAB Group A Inbound Operator (#12458). Dedicated to delivering authentic, sustainable, and scholar-grade travel experiences across Turkey for international partners.',
    'pages.about.badge': 'TURSAB Group A Certified',
    'pages.about.cta': 'Contact Our Leadership',

    'pages.blog.title': 'Turkey Travel Insights & DMC Journal',
    'pages.blog.subtitle': 'Expert regional guides, logistical advice, culinary spotlights, and insider tips curated by our local destination specialists for travel advisors and tour operators.',
    'pages.blog.badge': 'Destination Intelligence',
    'pages.blog.cta': 'Plan a Story-Driven Tour',

    'pages.partner.title': 'Partner With Baobab DMC Turkey',
    'pages.partner.subtitle': 'Exclusive B2B inbound partnerships for international tour operators, travel advisors, and wholesale agencies. Guaranteed net rates, white-label proposals, and 24/7 on-the-ground support.',
    'pages.partner.badge': 'B2B Travel Trade Partnership',
    'pages.partner.cta': 'Submit B2B RFP',
    'pages.partner.bookCall': 'Schedule Discovery Call',

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
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: SupportedLanguage = 'en';

  useEffect(() => {
    // Clear any previously saved language preference to ensure strictly English
    try {
      localStorage.removeItem('baobab_lang');
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (_lang: SupportedLanguage) => {
    // strictly English
  };

  const t = (key: string): string => {
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
