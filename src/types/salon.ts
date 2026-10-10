export type ServiceCategory = 
  | 'all'
  | 'haircut'
  | 'beard'
  | 'spa'
  | 'facial'
  | 'package'
  | 'academy';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMin: number;
  description: string;
  popular?: boolean;
  masterStylistOnly?: boolean;
  image: string;
  includedItems?: string[];
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalValue: number;
  durationMin: number;
  popular?: boolean;
  services: string[];
  features: string[];
}

export interface CompetitorSalon {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  distanceKm: number;
  lat: number;
  lng: number;
  prices: {
    haircut: number;
    beardTrim: number;
    dTanFacial: number;
    hairSpa: number;
    groomPackage: number;
  };
  amenities: {
    hygieneGrade: 'A+' | 'A' | 'B';
    acLounge: boolean;
    freeHairWash: boolean;
    masterStylistAvailable: boolean;
    beverageComplimentary: boolean;
  };
  phone?: string;
  highlights: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  reviewCount: string;
  timeAgo: string;
  rating: number;
  comment: string;
  tags: string[];
  ownerReply?: {
    timeAgo: string;
    text: string;
  };
}

export interface AcademyCourse {
  id: string;
  title: string;
  duration: string;
  level: string;
  fee: number;
  description: string;
  syllabus: string[];
  mentor: string;
  certification: string;
  seatsPerBatch: number;
  image: string;
}

export interface BookingState {
  services: ServiceItem[];
  selectedDate: string;
  selectedTime: string;
  stylist: 'Piyush Bhai (Master Stylist)' | 'Senior Hair Stylist' | 'Any Available Stylist';
  clientName: string;
  clientPhone: string;
  notes: string;
}
