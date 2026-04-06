export interface TravelSearchQuery {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  transportMode: 'all' | 'train' | 'bus' | 'flight';
}

export interface TravelOption {
  id: string;
  provider: string;
  mode: 'train' | 'bus' | 'flight';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  crowdLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  rating: number;
  amenities: string[];
}

export interface DemandForecast {
  date: Date;
  demandScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  expectedPrice: number;
  alternativeRoutes: number;
}

export interface CorridorRisk {
  origin: string;
  destination: string;
  riskScore: number;
  transportMode: 'train' | 'bus' | 'flight';
  currentDemand: number;
  capacity: number;
  incidents: number;
}

export interface FareAlert {
  route: string;
  currentFare: number;
  baseFare: number;
  fairPriceCeiling: number;
  priceHistory: Array<{
    date: Date;
    price: number;
  }>;
  prediction: 'stable' | 'increasing' | 'decreasing';
}

export interface FestivalInfo {
  name: string;
  dates: string;
  affectedCorridors: string[];
  historicalCrowdLevel: number;
  travelTips: string;
  region: string;
  expectedTravelers: number;
}
