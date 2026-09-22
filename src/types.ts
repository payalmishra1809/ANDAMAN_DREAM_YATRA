export interface TourPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  nights: number;
  days: number;
  pricePerPerson: number;
  originalPrice: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  islands: string[];
  category: "Honeymoon" | "Family" | "Adventure" | "Explorer" | "Budget";
  hotelCategory: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    island: string;
    activities: string[];
    meals: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  localName?: string;
  tagline: string;
  description: string;
  image: string;
  region: "South Andaman" | "North & Middle Andaman" | "Special Islands";
  ferryFromPortBlair: string;
  bestTime: string;
  idealStay: string;
  highlights: string[];
  topAttractions: {
    name: string;
    description: string;
  }[];
  activities: string[];
  travelTips: string[];
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: "Underwater" | "Adventure" | "Boating & Eco";
  price: number;
  originalPrice: number;
  image: string;
  duration: string;
  location: string;
  depth?: string;
  swimmingRequired: boolean;
  minAge: number;
  badge?: string;
  description: string;
  inclusions: string[];
  safetyGuidelines: string[];
}

export interface EnquirySubmission {
  id?: string;
  bookingReference?: string;
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  duration?: string;
  adults: number;
  children: number;
  packageId?: string;
  packageName?: string;
  destination?: string;
  activities?: string[];
  hotelCategory?: string;
  estimatedBudget?: string;
  specialRequests?: string;
  tripType?: string;
  status?: string;
  createdAt?: string;
}

export interface CustomPlanCalculation {
  nights: number;
  days: number;
  adults: number;
  children: number;
  tripType: "Honeymoon" | "Family" | "Friends" | "Solo" | "Adventure";
  hotelTier: "Budget (Standard 3★)" | "Deluxe (Beachfront 4★)" | "Luxury (5★ Resort)";
  selectedIslands: string[];
  selectedActivities: string[];
  privateVehicle: boolean;
  baseCostPerPerson: number;
  totalCost: number;
}
