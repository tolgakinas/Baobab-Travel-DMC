import React from 'react';
import { 
  Utensils, 
  Bed, 
  Compass, 
  MapPin, 
  Footprints, 
  Coffee, 
  Sparkles,
  Luggage,
  Plane,
  Car
} from 'lucide-react';

export interface ParsedItineraryDay {
  cleanDescription: string;
  meals: string[];
  accommodation: string | null;
  activityType: string | null;
  distance: string | null;
  highlights: string[];
}

/**
 * Parses raw itinerary day text to clean up awkward formatting like:
 * "Meal : Dinner optional Accommodation : Ciner hotel or similar"
 * and extracts structured metadata: meals, accommodation, hike distance, etc.
 */
export function parseItineraryDayDetails(title: string, description: string): ParsedItineraryDay {
  let text = description || '';
  let accommodation: string | null = null;
  const meals: string[] = [];
  let distance: string | null = null;
  let activityType: string | null = null;
  const highlights: string[] = [];

  // 1. Extract Distance if present (e.g. "Hiking Distance : Approx. 10–12 km")
  const distMatch = text.match(/(?:Hiking\s*Distance|Distance)\s*:\s*([^.\n]+(?:\.\s*\d+)?(?:\s*(?:km|miles))?)/i);
  if (distMatch) {
    distance = distMatch[1].trim().replace(/\.$/, '');
  }

  // 2. Extract Accommodation (e.g. "Accommodation : Tas Konak Cave Hotel or Similar", "Accomodatio n : ...", "Overnight: Kars")
  const hotelMatch = text.match(/(?:Accommodatio\s*n|Accomodation|Accommodation|Overnight)\s*:\s*([^.\n]+?(?:hotel|resort|konagi|palace|boutique|similar|inn|n\/a|stay|or\s+similar|Istanbul|Kars|Ani|Trabzon|Ankara|Cappadocia|Antalya|Bodrum|Izmir|Kusadasi|Canakkale|Pamukkale|Kas|Fethiye|Erzurum|Divrigi|Sirince|train)?(?=\s*(?:Meal|Dinner|Breakfast|Hiking|Highlights|Included|\.|$)))/i);
  if (hotelMatch) {
    let rawHotel = hotelMatch[1].trim();
    rawHotel = rawHotel.replace(/\s*(?:Meals?|Dinner|Breakfast|Hiking Distance|Highlights|Included).*$/i, '').trim();
    if (rawHotel && !rawHotel.toLowerCase().includes('n/a')) {
      accommodation = rawHotel;
    }
  }

  // 3. Extract Meals (e.g. "Meal : ...", "Meals: Welcome Dinner", "Meals : Breakfast, Dinner")
  const mealMatch = text.match(/Meals?\s*:\s*([^.\n]+?(?=\s*(?:Accommodatio|Overnight|Included|Hiking|\.|$)))/i);
  if (mealMatch) {
    const rawMeal = mealMatch[1].trim().replace(/\s*(?:Included|Overnight|Accommodation).*$/i, '');
    meals.push(rawMeal);
  } else {
    // Check for mentions in description
    if (/welcome\s+dinner/i.test(text) || /sunset\s+dinner/i.test(text) || /dinner\s+included/i.test(text) || /local\s+family\s+dinner/i.test(text)) {
      if (!meals.some(m => /dinner/i.test(m))) {
        meals.push('Dinner');
      }
    }
    if (/traditional\s+turkish\s+breakfast|delicious\s+breakfast|daily\s+breakfast|included\s+breakfast/i.test(text)) {
      if (!meals.some(m => /breakfast/i.test(m))) {
        meals.push('Breakfast');
      }
    }
    if (/local\s+family\s+lunch|lunch\s+by\s+the\s+sea|lunch\s+included|ezine\s+cheese.*lunch/i.test(text)) {
      if (!meals.some(m => /lunch/i.test(m))) {
        meals.push('Lunch');
      }
    }
    if (/cooking\s+class/i.test(text)) {
      if (!meals.some(m => /cooking/i.test(m))) {
        meals.push('Dinner (Cooking Class)');
      }
    }
  }

  // 4. Activity detection
  const combined = (title + ' ' + text).toLowerCase();
  if (combined.includes('hike') || combined.includes('trek')) {
    activityType = 'Guided Nature Trek';
  } else if (combined.includes('kayak')) {
    activityType = 'Sea Kayaking';
  } else if (combined.includes('bik')) {
    activityType = 'Scenic Biking';
  } else if (combined.includes('balloon')) {
    activityType = 'Hot Air Balloon';
  } else if (combined.includes('diving') || combined.includes('dive')) {
    activityType = 'Scuba Diving';
  } else if (combined.includes('boat') || combined.includes('cruise') || combined.includes('ferry') || combined.includes('gulet')) {
    activityType = 'Boat / Yacht Cruise';
  } else if (combined.includes('cooking')) {
    activityType = 'Culinary Masterclass';
  } else if (combined.includes('walking tour') || combined.includes('old town') || combined.includes('city tour') || combined.includes('heritage')) {
    activityType = 'Cultural Heritage Walk';
  }

  // 5. Clean description text by stripping out raw "Accommodation : ...", "Meal : ...", "Overnight: ...", "Included: ..." trailers
  let cleaned = text
    .replace(/(?:Accommodatio\s*n|Accomodation|Accommodation)\s*:\s*[^.\n]+(?:hotel|resort|konagi|palace|boutique|similar|inn|n\/a|stay|or\s+similar)?/gi, '')
    .replace(/Overnight\s*:\s*[^.\n]+/gi, '')
    .replace(/Meals?\s*:\s*[^.\n]+/gi, '')
    .replace(/Included\s*:\s*[^.\n]+/gi, '')
    .replace(/(?:Hiking\s*Distance|Distance)\s*:\s*Approx\.?\s*[\d–-]+\s*km\.?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Remove dangling punctuation at the end
  cleaned = cleaned.replace(/[ ,:;-]+$/, '').trim();

  return {
    cleanDescription: cleaned || text,
    meals,
    accommodation,
    activityType,
    distance,
    highlights
  };
}

/**
 * Symbol badge component rendering structured icons for meals, accommodation, activity, distance.
 */
export const ItinerarySymbolsBar: React.FC<{
  meals: string[];
  accommodation: string | null;
  activityType: string | null;
  distance: string | null;
}> = ({ meals, accommodation, activityType, distance }) => {
  const hasAny = meals.length > 0 || accommodation || activityType || distance;
  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs border-t border-neutral-100 mt-2.5">
      {/* Accommodation Badge */}
      {accommodation && (
        <span 
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200/80 font-medium text-[11px]"
          title={`Overnight accommodation: ${accommodation}`}
        >
          <Bed className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span className="font-semibold text-amber-950">Stay:</span>
          <span className="truncate max-w-[200px]">{accommodation}</span>
        </span>
      )}

      {/* Meals Badges */}
      {meals.length > 0 && (
        <span 
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-medium text-[11px]"
          title={`Included / Planned Meals: ${meals.join(', ')}`}
        >
          <Utensils className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="font-semibold text-emerald-950">Meals:</span>
          <span>{meals.join(' • ')}</span>
        </span>
      )}

      {/* Activity Badge */}
      {activityType && (
        <span 
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-50 text-sky-900 border border-sky-200/80 font-medium text-[11px]"
          title={`Primary Activity: ${activityType}`}
        >
          <Compass className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          <span>{activityType}</span>
        </span>
      )}

      {/* Distance Badge */}
      {distance && (
        <span 
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 text-stone-800 border border-stone-200 font-medium text-[11px]"
          title={`Trail Distance: ${distance}`}
        >
          <Footprints className="w-3.5 h-3.5 text-stone-600 shrink-0" />
          <span>{distance}</span>
        </span>
      )}
    </div>
  );
};
