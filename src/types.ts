export type InteriorStyleCategory = 
  | 'modern_minimal'
  | 'industrial_oak'
  | 'botanical_green'
  | 'wabi_sabi'
  | 'vintage_cozy'
  | 'scandinavian_light';

export type TimeLimitType = 
  | 'unlimited' 
  | 'weekdays_unlimited' 
  | 'limited_2h' 
  | 'limited_3h';

export type SocketLevel = 'abundant' | 'moderate' | 'limited';

export type WifiStability = 'ultra_fast' | 'fast' | 'standard';

export type NoiseLevel = 'library_quiet' | 'soft_chatter' | 'moderate_cafe' | 'lively_cafe';

export interface DayHours {
  open: string;  // "09:00" (24h format)
  close: string; // "22:00"
  isClosed?: boolean;
}

export interface OperatingHours {
  [dayOfWeek: number]: DayHours; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export interface DrinkPriceItem {
  name: string;
  price: number;
  category: 'coffee' | 'tea' | 'specialty' | 'dessert';
}

export interface CafeItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  district: string;
  address: string;
  mrtStation: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  googleMapsUrl: string;
  
  // Work-specific dimensions requested by user
  socketLevel: SocketLevel;
  socketDescription: string;
  outletTypes: string[];
  
  wifiSpeedMbps: number;
  wifiStability: WifiStability;
  wifiDescription: string;
  pingMs: number;
  
  lightingLevel: 1 | 2 | 3 | 4 | 5;
  lightingLabel: string;
  lightingDescription: string;
  
  interiorStyle: {
    category: InteriorStyleCategory;
    name: string;
    description: string;
    atmosphereTags: string[];
  };
  
  timeLimit: {
    type: TimeLimitType;
    label: string;
    description: string;
  };
  
  drinkPricing: {
    minPrice: number;
    maxPrice: number;
    averagePrice: number;
    minConsumption: string;
    sampleMenu: DrinkPriceItem[];
  };
  
  operatingHours: OperatingHours;
  
  noiseLevel: NoiseLevel;
  noiseDescription: string;
  seatDescription: string;
  amenities: string[];
  bestSuitedFor: string[];
}

export interface UserVisitPlan {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (e.g. "14:00")
  durationHours: number; // e.g. 2, 3, 4, 6
  onlyOpen: boolean; // whether to filter out closed cafes
}

export interface FilterState {
  searchQuery: string;
  maxDistanceKm: number; // 0 = unlimited, otherwise 0.5, 1, 2, 5
  minRating: number; // 0, 4.0, 4.3, 4.5, 4.8
  minLightingLevel: number; // 0, 3, 4, 5
  socketFilter: 'all' | SocketLevel;
  wifiSpeedFilter: number; // 0 (all), 100, 200
  timeLimitFilter: 'all' | 'unlimited' | 'weekdays_unlimited';
  styleFilter: 'all' | InteriorStyleCategory;
  maxPrice: number; // 0 = unlimited, e.g. 150, 180, 220
  sortBy: 'recommendation' | 'distance' | 'rating' | 'price' | 'wifi' | 'sockets';
}

export interface UserLocation {
  name: string;
  lat: number;
  lng: number;
}
