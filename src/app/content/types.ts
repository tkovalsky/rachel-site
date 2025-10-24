// Content Management System Types

export interface Area {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageSrc: string;
  featured: boolean;
  targetSegments: TargetSegment[];
  developments: string[]; // Development IDs
  articles: string[]; // Article IDs
}

export interface Development {
  id: string;
  name: string;
  slug: string;
  area: string; // Area ID
  description: string;
  imageSrc: string;
  amenities: Amenity[];
  priceRange: {
    min: number;
    max: number;
  };
  featured: boolean;
  targetSegments: TargetSegment[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  imageSrc: string;
  featured: boolean;
  areas: string[]; // Area IDs
  developments: string[]; // Development IDs
  targetSegments: TargetSegment[];
  tags: string[];
  // Success story fields
  storyType?: 'success-story' | 'guide' | 'market-update' | 'area-guide';
  clientProfile?: {
    ageRange?: string;
    origin?: string; // e.g., "Northeast"
    buyerType?: string; // e.g., "55+ cash buyer"
    familyStructure?: string; // e.g., "married couple"
  };
  propertyDetails?: {
    development?: string;
    propertyType?: string;
    priceRange?: string;
    specialFeatures?: string[];
  };
  relatedStories?: string[]; // IDs of related success stories
  adSource?: string; // For tracking which content generated leads
  bannerColor?: 'blue' | 'black' | 'gold' | 'deep' | 'champagne'; // Hero banner color
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  location?: string;
  targetSegment: TargetSegment;
  featured: boolean;
  rating?: number;
}

export interface MarketData {
  id: string;
  area: string; // Area ID
  metric: string;
  value: number | string;
  format: 'currency' | 'integer' | 'percent' | 'raw';
  period: string;
  source: string;
  featured: boolean;
}

// Enums for consistent categorization
export type TargetSegment = 
  | '55-plus-cash-buyer'
  | 'second-home-buyer'
  | 'upgrade-downgrade'
  | 'investor'
  | 'family'
  | 'professional'
  | 'relocating';

export type Amenity = 
  | 'golf'
  | 'pickleball'
  | 'tennis'
  | 'gym'
  | 'pool'
  | 'country-club'
  | 'beach-access'
  | 'marina'
  | 'spa'
  | 'restaurant'
  | 'social-club'
  | 'fitness-center'
  | 'tennis-courts'
  | 'walking-trails'
  | 'dog-park';

// Content filtering and display options
export interface ContentFilter {
  targetSegment?: TargetSegment;
  area?: string;
  development?: string;
  amenity?: Amenity;
  featured?: boolean;
  limit?: number;
  randomize?: boolean;
}

export interface ContentDisplayOptions {
  showImages?: boolean;
  showDescriptions?: boolean;
  showTargetSegments?: boolean;
  cardLayout?: 'grid' | 'list' | 'featured';
}
