export type VehicleType = 'car' | 'motorcycle' | 'heavy' | 'ev';

export type AgencyType = 'HDB' | 'URA' | 'LTA' | 'MALL' | 'COMMERCIAL';

export type CarparkStructureType = 
  | 'MSCP' 
  | 'Basement' 
  | 'Surface' 
  | 'Mechanized' 
  | 'Multi-Level & Basement' 
  | 'Multi-Level & Rooftop' 
  | 'Multi-Storey & Basement';

export type SingaporeRegion = 'All' | 'Central / CBD' | 'Orchard' | 'Marina Bay' | 'East' | 'West' | 'North' | 'North-East';

export interface LotAvailability {
  total: number;
  available: number;
}

export interface EVChargingDetails {
  totalLots: number;
  availableLots: number;
  providers: string[];
  powerKw: number;
  plugTypes: string[];
  chargingRatePerKwh: number;
}

export interface RateRule {
  description: string;
  baseMinutes: number;
  baseRate: number;
  subsequentMinutes: number;
  subsequentRate: number;
  eveningFlatCutoffHour?: number; // e.g. 17 or 18 (5pm or 6pm)
  eveningFlatRate?: number; // e.g. 3.50 per entry
  isFree?: boolean; // Sunday FPS
  nightCap?: number; // e.g. $5.00 for HDB 10:30pm to 7am
}

export interface CarparkRates {
  weekdayDay: RateRule;
  weekdayEvening: RateRule;
  saturday: RateRule;
  sundayPH: RateRule;
  motorcyclePerEntry: number; // typically $0.65 HDB day/night or mall flat
  heavyVehicleDayRate?: number;
}

export interface ERPNearby {
  gantryName: string;
  currentRate: number;
  distanceMeters: number;
  operationalWindow: string;
}

export interface Carpark {
  id: string;
  carparkNo: string; // e.g. "ACB", "BBM", "ION-01", "MBS-01"
  name: string;
  address: string;
  postalCode: string;
  agency: AgencyType;
  structure: CarparkStructureType;
  region: SingaporeRegion;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // percentage on custom SG map 0-100
    mapY: number; // percentage on custom SG map 0-100
  };
  lots: {
    car: LotAvailability;
    motorcycle: LotAvailability;
    heavy?: LotAvailability;
    ev?: EVChargingDetails;
  };
  rates: CarparkRates;
  gracePeriodMin: number;
  freeParkingScheme: boolean; // HDB Free Parking Scheme (Sunday 7:30am - 10:30pm)
  heightClearanceMeters: number; // e.g. 2.1, 1.9, 2.0
  paymentMethods: string[];
  nearestMrt: {
    name: string;
    line: string;
    walkingMinutes: number;
  };
  amenities: string[];
  erpHit?: ERPNearby;
  lastUpdated: string;
}

export interface FilterState {
  searchQuery: string;
  region: SingaporeRegion;
  agency: 'ALL' | AgencyType;
  vehicleType: VehicleType;
  minAvailableLots: number;
  maxRatePerHour: number;
  hasEVCharging: boolean;
  hasFreeParkingScheme: boolean;
  minClearanceHeight: number;
  gracePeriodOnly: boolean;
  sortBy: 'lots_desc' | 'rate_asc' | 'distance_asc' | 'name_asc';
}

export interface ParkedCarMemo {
  id: string;
  carparkName: string;
  carparkNo: string;
  deckLevel: string; // e.g. "Level 3B"
  lotNumber: string; // e.g. "Lot 142"
  parkedTime: string; // ISO string
  notes?: string;
  reminderMinutes?: number;
}

export interface CalculationResult {
  durationMinutes: number;
  gracePeriodApplied: boolean;
  baseCharge: number;
  eveningSurchargeOrFlat: number;
  totalEstimatedFee: number;
  rateBreakdown: string[];
  isFreePeriod: boolean;
}
