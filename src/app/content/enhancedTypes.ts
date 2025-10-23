// Enhanced content types for AI generation and lead nurturing

export interface DevelopmentDetails {
  id: string;
  name: string;
  slug: string;
  area: string;
  
  // Basic Info
  description: string;
  shortDescription: string;
  imageSrc: string;
  featured: boolean;
  
  // Demographics & Targeting
  targetSegments: TargetSegment[];
  demographics: {
    ageRange: [number, number];
    incomeRange: [number, number];
    lifestyle: string[];
    interests: string[];
    painPoints: string[];
    motivations: string[];
  };
  
  // Amenities & Features
  amenities: Amenity[];
  amenitiesDetailed: {
    name: string;
    description: string;
    category: 'recreation' | 'wellness' | 'social' | 'luxury' | 'convenience';
    importance: 'essential' | 'important' | 'nice-to-have';
  }[];
  
  // Pricing & Value
  priceRange: {
    min: number;
    max: number;
    median: number;
    pricePerSqFt: number;
  };
  valueProposition: string;
  investmentPotential: {
    rentalYield: number;
    appreciationRate: number;
    marketTrend: 'rising' | 'stable' | 'declining';
  };
  
  // Market Data
  marketData: {
    daysOnMarket: number;
    inventoryLevel: 'low' | 'medium' | 'high';
    competitionLevel: 'low' | 'medium' | 'high';
    uniqueSellingPoints: string[];
  };
  
  // Content Generation
  contentHooks: {
    segment: TargetSegment;
    hook: string;
    painPoint: string;
    solution: string;
    callToAction: string;
  }[];
  
  // Off-Market Properties
  offMarketProperties: OffMarketProperty[];
  
  // SEO & Marketing
  seoKeywords: string[];
  marketingTags: string[];
  seasonalAppeal: string[];
}

export interface OffMarketProperty {
  id: string;
  development: string;
  type: 'condo' | 'single-family' | 'townhouse' | 'villa';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  price: number;
  description: string;
  images: string[];
  specialFeatures: string[];
  availability: 'available' | 'coming-soon' | 'under-contract';
  exclusivity: 'exclusive' | 'pre-market' | 'pocket-listing';
  targetSegments: TargetSegment[];
  notes: string;
  contactRequired: boolean;
}

export interface ContentGenerationConfig {
  development: string;
  targetSegment: TargetSegment;
  contentType: 'article' | 'social-post' | 'email' | 'landing-page';
  tone: 'professional' | 'friendly' | 'luxury' | 'casual';
  length: 'short' | 'medium' | 'long';
  focus: 'amenities' | 'lifestyle' | 'investment' | 'location' | 'value';
  includeStats: boolean;
  includeTestimonials: boolean;
  includeMarketData: boolean;
}

export interface GeneratedContent {
  id: string;
  development: string;
  targetSegment: TargetSegment;
  contentType: string;
  title: string;
  content: string;
  excerpt: string;
  callToAction: string;
  keywords: string[];
  generatedAt: string;
  config: ContentGenerationConfig;
}

// Enhanced area types
export interface AreaDetails {
  id: string;
  name: string;
  slug: string;
  
  // Basic Info
  description: string;
  shortDescription: string;
  imageSrc: string;
  featured: boolean;
  
  // Demographics
  demographics: {
    population: number;
    medianAge: number;
    medianIncome: number;
    educationLevel: string;
    lifestyle: string[];
  };
  
  // Market Characteristics
  marketProfile: {
    priceRange: [number, number];
    marketType: 'luxury' | 'mid-market' | 'value' | 'emerging';
    growthRate: number;
    stability: 'stable' | 'growing' | 'volatile';
  };
  
  // Lifestyle & Amenities
  lifestyle: {
    walkability: number;
    nightlife: 'quiet' | 'moderate' | 'vibrant';
    dining: 'limited' | 'good' | 'excellent';
    shopping: 'limited' | 'good' | 'excellent';
    culture: 'limited' | 'moderate' | 'rich';
  };
  
  // Content Generation
  contentHooks: {
    segment: TargetSegment;
    hook: string;
    uniqueAppeal: string;
    lifestyleMatch: string;
  }[];
  
  // SEO & Marketing
  seoKeywords: string[];
  marketingTags: string[];
  seasonalAppeal: string[];
}

// AI Content Generation Service
export interface ContentGenerationService {
  generateArticle(config: ContentGenerationConfig): Promise<GeneratedContent>;
  generateSocialPost(config: ContentGenerationConfig): Promise<GeneratedContent>;
  generateEmail(config: ContentGenerationConfig): Promise<GeneratedContent>;
  generateLandingPage(config: ContentGenerationConfig): Promise<GeneratedContent>;
}

// Data Management
export interface ContentManager {
  // Development Management
  addDevelopment(development: DevelopmentDetails): Promise<void>;
  updateDevelopment(id: string, updates: Partial<DevelopmentDetails>): Promise<void>;
  getDevelopment(id: string): Promise<DevelopmentDetails | null>;
  getDevelopmentsBySegment(segment: TargetSegment): Promise<DevelopmentDetails[]>;
  
  // Off-Market Properties
  addOffMarketProperty(property: OffMarketProperty): Promise<void>;
  updateOffMarketProperty(id: string, updates: Partial<OffMarketProperty>): Promise<void>;
  getOffMarketProperties(development?: string): Promise<OffMarketProperty[]>;
  
  // Content Generation
  generateContent(config: ContentGenerationConfig): Promise<GeneratedContent>;
  getContentByDevelopment(development: string): Promise<GeneratedContent[]>;
  getContentBySegment(segment: TargetSegment): Promise<GeneratedContent[]>;
  
  // Analytics
  getContentPerformance(contentId: string): Promise<ContentPerformance>;
  getLeadAttribution(development: string, segment: TargetSegment): Promise<LeadAttribution>;
}

export interface ContentPerformance {
  views: number;
  engagement: number;
  leads: number;
  conversions: number;
  topPerformingContent: string[];
}

export interface LeadAttribution {
  development: string;
  segment: TargetSegment;
  leads: number;
  conversions: number;
  avgTimeToConversion: number;
  topContent: string[];
}
