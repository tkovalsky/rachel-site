import { 
  DevelopmentDetails, 
  OffMarketProperty, 
  AreaDetails, 
  GeneratedContent, 
  ContentGenerationConfig,
  TargetSegment
} from '@/app/content/enhancedTypes';

interface RawDevelopment {
  id: string;
  name: string;
  slug: string;
  area: string;
  description: string;
  shortDescription: string;
  imageSrc: string;
  featured: boolean;
  targetSegments: string[];
  demographics: {
    ageRange: number[];
    incomeRange: number[];
    lifestyle: string[];
    interests: string[];
    painPoints: string[];
    motivations: string[];
  };
  [key: string]: any;
}

interface RawArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageSrc: string;
  featured: boolean;
  targetSegments: string[];
  developments: string[];
  articles: string[];
}

interface RawOffMarketProperty {
  id: string;
  development: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  price: number;
  description: string;
  images: string[];
  specialFeatures: string[];
  availability: string;
  exclusivity: string;
  targetSegments: string[];
  notes: string;
  contactRequired: boolean;
}

// Data storage strategy - can be JSON files, database, or API
export class DataManager {
  private static instance: DataManager;
  private developments: Map<string, DevelopmentDetails> = new Map();
  private offMarketProperties: Map<string, OffMarketProperty> = new Map();
  private areas: Map<string, AreaDetails> = new Map();
  private generatedContent: Map<string, GeneratedContent> = new Map();

  private constructor() {
    void this.loadData();
  }

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  // Load data from JSON files (current approach)
  private async loadData() {
    try {
      // Load developments
      const developmentsData = await import('@/app/content/developments.json');
      developmentsData.default.forEach((dev: RawDevelopment) => {
        // Ensure ageRange is properly typed as tuple
        if (dev.demographics?.ageRange && Array.isArray(dev.demographics.ageRange)) {
          dev.demographics.ageRange = [dev.demographics.ageRange[0], dev.demographics.ageRange[1]] as [number, number];
        }
        this.developments.set(dev.id, dev as DevelopmentDetails);
      });

      // Load areas
      const { AREAS } = await import('@/app/content/areas');
      AREAS.forEach((area: RawArea) => {
        // Convert Area to AreaDetails format
        const areaDetails: AreaDetails = {
          ...area,
          shortDescription: area.description,
          demographics: {
            population: 0,
            medianAge: 0,
            medianIncome: 0,
            educationLevel: 'college',
            lifestyle: []
          },
          marketProfile: {
            priceRange: [0, 0] as [number, number],
            marketType: 'luxury' as const,
            growthRate: 0,
            stability: 'stable' as const
          },
          lifestyle: {
            walkability: 0,
            nightlife: 'quiet' as const,
            dining: 'good' as const,
            shopping: 'good' as const,
            culture: 'moderate' as const
          },
          contentHooks: [],
          seoKeywords: [],
          marketingTags: [],
          seasonalAppeal: []
        };
        this.areas.set(area.id, areaDetails);
      });

      // Load off-market properties
      const offMarketData = await import('@/app/content/offMarket.json');
      offMarketData.default.forEach((property: RawOffMarketProperty) => {
        // Ensure type is properly typed
        if (property.type && typeof property.type === 'string') {
          property.type = property.type as 'condo' | 'single-family' | 'townhouse' | 'villa';
        }
        this.offMarketProperties.set(property.id, property as OffMarketProperty);
      });

    } catch (_error) {
      console.warn('Could not load enhanced data files, using basic data');
    }
  }

  // Development Management
  addDevelopment(development: DevelopmentDetails): void {
    this.developments.set(development.id, development);
    this.saveData();
  }

  updateDevelopment(id: string, updates: Partial<DevelopmentDetails>): void {
    const existing = this.developments.get(id);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.developments.set(id, updated);
      this.saveData();
    }
  }

  getDevelopment(id: string): DevelopmentDetails | null {
    return this.developments.get(id) || null;
  }

  getDevelopmentsBySegment(segment: TargetSegment): DevelopmentDetails[] {
    return Array.from(this.developments.values())
      .filter(dev => dev.targetSegments.includes(segment));
  }

  getAllDevelopments(): DevelopmentDetails[] {
    return Array.from(this.developments.values());
  }

  // Off-Market Properties
  addOffMarketProperty(property: OffMarketProperty): void {
    this.offMarketProperties.set(property.id, property);
    this.saveData();
  }

  updateOffMarketProperty(id: string, updates: Partial<OffMarketProperty>): void {
    const existing = this.offMarketProperties.get(id);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.offMarketProperties.set(id, updated);
      this.saveData();
    }
  }

  getOffMarketProperties(development?: string): OffMarketProperty[] {
    let properties = Array.from(this.offMarketProperties.values());
    
    if (development) {
      properties = properties.filter(prop => prop.development === development);
    }
    
    return properties;
  }

  // Content Generation
  generateContent(config: ContentGenerationConfig): GeneratedContent {
    const development = this.getDevelopment(config.development);
    if (!development) {
      throw new Error(`Development ${config.development} not found`);
    }

    // Generate content based on development and target segment
    const content = this.generateContentForDevelopment(development, config);
    
    // Store generated content
    this.generatedContent.set(content.id, content);
    this.saveData();
    
    return content;
  }

  private generateContentForDevelopment(
    development: DevelopmentDetails, 
    config: ContentGenerationConfig
  ): GeneratedContent {
    const contentHooks = development.contentHooks.find(hook => hook.segment === config.targetSegment);
    
    if (!contentHooks) {
      throw new Error(`No content hooks found for segment ${config.targetSegment}`);
    }

    // Generate content based on configuration
    const title = this.generateTitle(development, config, contentHooks);
    const content = this.generateContentBody(development, config, contentHooks);
    const excerpt = this.generateExcerpt(content);
    const callToAction = contentHooks.callToAction;

    return {
      id: `content-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      development: development.id,
      targetSegment: config.targetSegment,
      contentType: config.contentType,
      title,
      content,
      excerpt,
      callToAction,
      keywords: development.seoKeywords,
      generatedAt: new Date().toISOString(),
      config
    };
  }

  private generateTitle(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const templates: Record<string, string[]> = {
      'article': [
        `Why ${development.name} is Perfect for ${this.getSegmentLabel(config.targetSegment)}`,
        `${development.name}: The Ultimate ${this.getSegmentLabel(config.targetSegment)} Community`,
        `Discover ${development.name} - Your Dream ${this.getSegmentLabel(config.targetSegment)} Home`
      ],
      'social-post': [
        `🏡 ${development.name} - ${hooks.hook}`,
        `✨ ${development.name} has everything you need!`,
        `🌟 ${development.name} - Where luxury meets lifestyle`
      ],
      'email': [
        `Exclusive: ${development.name} Opportunity`,
        `Why ${development.name} is Perfect for You`,
        `Don't Miss: ${development.name} Insider Access`
      ],
      'landing-page': [
        `Welcome to ${development.name}`,
        `${development.name} - Your Perfect Home`,
        `Discover ${development.name}`
      ]
    };

    const templateList = templates[config.contentType] || templates['article'];
    return templateList[Math.floor(Math.random() * templateList.length)];
  }

  private generateContentBody(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const segments = {
      '55-plus-cash-buyer': 'active adults',
      'second-home-buyer': 'second home buyers',
      'family': 'families',
      'professional': 'professionals',
      'investor': 'investors',
      'relocating': 'relocating buyers',
      'upgrade-downgrade': 'home buyers'
    };

    const segmentLabel = segments[config.targetSegment] || 'buyers';
    
    return `
      <h2>${hooks.hook}</h2>
      
      <p>${development.description}</p>
      
      <p>For ${segmentLabel}, ${development.name} offers the perfect solution to ${hooks.painPoint}. 
      ${hooks.solution}</p>
      
      <h3>Why ${development.name} is Perfect for You</h3>
      <ul>
        ${development.amenitiesDetailed.map(amenity => 
          `<li><strong>${amenity.name}</strong>: ${amenity.description}</li>`
        ).join('')}
      </ul>
      
      <h3>Investment Potential</h3>
      <p>With a rental yield of ${development.investmentPotential.rentalYield}% and 
      ${development.investmentPotential.appreciationRate}% annual appreciation, 
      ${development.name} offers strong investment potential.</p>
      
      <h3>Market Position</h3>
      <p>${development.marketData.uniqueSellingPoints.join('. ')}</p>
      
      <p><strong>${hooks.callToAction}</strong></p>
    `;
  }

  private generateExcerpt(content: string): string {
    // Extract first paragraph and limit to 150 characters
    const firstParagraph = content.match(/<p>(.*?)<\/p>/)?.[1] || '';
    return firstParagraph.substring(0, 150) + (firstParagraph.length > 150 ? '...' : '');
  }

  private getSegmentLabel(segment: TargetSegment): string {
    const labels = {
      '55-plus-cash-buyer': 'Active Adults',
      'second-home-buyer': 'Second Home Buyers',
      'family': 'Families',
      'professional': 'Professionals',
      'investor': 'Investors',
      'relocating': 'Relocating Buyers',
      'upgrade-downgrade': 'Home Buyers'
    };
    return labels[segment] || 'Buyers';
  }

  // Analytics and Performance
  getContentByDevelopment(development: string): GeneratedContent[] {
    return Array.from(this.generatedContent.values())
      .filter(content => content.development === development);
  }

  getContentBySegment(segment: TargetSegment): GeneratedContent[] {
    return Array.from(this.generatedContent.values())
      .filter(content => content.targetSegment === segment);
  }

  // Save data (in a real app, this would save to database)
  private saveData(): void {
    // In a real implementation, this would save to a database
    // For now, we'll just log that data was updated
    console.log('Data updated successfully');
  }

  // Export data for backup or migration
  exportData(): {
    developments: DevelopmentDetails[];
    offMarketProperties: OffMarketProperty[];
    areas: AreaDetails[];
    generatedContent: GeneratedContent[];
  } {
    return {
      developments: Array.from(this.developments.values()),
      offMarketProperties: Array.from(this.offMarketProperties.values()),
      areas: Array.from(this.areas.values()),
      generatedContent: Array.from(this.generatedContent.values())
    };
  }
}

// Singleton instance
export const dataManager = DataManager.getInstance();
