export interface DestinationQuickFacts {
  idealDuration: string;
  bestFor: string;
  keyHubs: string;
  travelStyle: string;
  unescoSites: string;
  culinarySpecialty: string;
}

export interface Destination {
  id: string;
  name: string;
  regionTag: string;
  region: 'Marmara' | 'Central Anatolia' | 'Aegean' | 'Mediterranean' | 'Black Sea' | 'Eastern & Southeastern' | 'North Aegean & Marmara';
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  images?: string[];
  imageCaptions?: string[];
  highlights: string[];
  bestSeason: string;
  signatureExperiences: string[];
  exclusiveVenues: string[];
  airportCode: string;
  quickFacts: DestinationQuickFacts;
}

export interface TripItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

export interface AtlasTrip {
  id: string;
  atlasId: number;
  title: string;
  slug: string;
  category: string;
  duration: string;
  daysCount: number;
  groupSize: string;
  image: string;
  images?: string[];
  imageCaptions?: string[];
  destinations: string[];
  description: string;
  itinerary: TripItineraryDay[];
  includes: string[];
  excludes: string[];
  highlights: string[];
  originalUrl: string;
}

export interface DmcService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  features: string[];
  stats?: { value: string; label: string };
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface SampleItinerary {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: 'Small Group Tour' | 'Active Adventure' | 'Cultural Expedition' | 'Gulet & Coastal Trek';
  destinations: string[];
  coverImage: string;
  images?: string[];
  imageCaptions?: string[];
  overview: string;
  idealGroupSize: string;
  includedHighlights: string[];
  days: ItineraryDay[];
}

export interface VenueShowcase {
  id: string;
  name: string;
  location: string;
  type: 'Historic Palace' | 'Cave & Canyon' | 'Coastal & Yacht' | 'Ancient Ruin' | 'Contemporary';
  capacity: string;
  image: string;
  description: string;
  idealFor: string;
}

export interface InquiryFormData {
  formMode?: 'trip-inquiry' | 'b2b-partner' | 'general';
  tripType: string;
  selectedTripTitle?: string;
  selectedTripId?: string;
  selectedTripCategory?: string;
  selectedTripDuration?: string;
  destinations: string[];
  estimatedDate: string;
  durationDays: number | string;
  guestCount: number | string;
  budgetTier: string;
  preferredExperiences: string[];
  specialRequests: string;
  fullName: string;
  companyOrAgency: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  partnerType?: string;
  website?: string;
  primaryMarketsServed?: string;
}
