import { 
  DevelopmentDetails, 
  OffMarketProperty, 
  AreaDetails, 
  GeneratedContent,
  ContentGenerationConfig,
  TargetSegment 
} from '@/app/content/enhancedTypes';

// Data storage strategy - can be JSON files, database, or API
export class DataManager {
  private static instance: DataManager;
  private developments: Map<string, DevelopmentDetails> = new Map();
  private offMarketProperties: Map<string, OffMarketProperty> = new Map();
  private areas: Map<string, AreaDetails> = new Map();
  private generatedContent: Map<string, GeneratedContent> = new Map();

  private constructor() {
    this.loadData();
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
      developmentsData.default.forEach(dev => {
        this.developments.set(dev.id, dev);
      });

      // Load areas
      const areasData = await import('@/app/content/areas.json');
      areasData.default.forEach(area => {
        this.areas.set(area.id, area);
      });

      // Load off-market properties
      const offMarketData = await import('@/app/content/offMarket.json');
      offMarketData.default.forEach(property => {
        this.offMarketProperties.set(property.id, property);
      });

    } catch (error) {
      console.warn('Could not load enhanced data files, using basic data');
    }
  }

  // Development Management
  async addDevelopment(development: DevelopmentDetails): Promise<void> {
    this.developments.set(development.id, development);
    await this.saveData();
  }

  async updateDevelopment(id: string, updates: Partial<DevelopmentDetails>): Promise<void> {
    const existing = this.developments.get(id);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.developments.set(id, updated);
      await this.saveData();
    }
  }

  async getDevelopment(id: string): Promise<DevelopmentDetails | null> {
    return this.developments.get(id) || null;
  }

  async getDevelopmentsBySegment(segment: TargetSegment): Promise<DevelopmentDetails[]> {
    return Array.from(this.developments.values())
      .filter(dev => dev.targetSegments.includes(segment));
  }

  async getAllDevelopments(): Promise<DevelopmentDetails[]> {
    return Array.from(this.developments.values());
  }

  // Off-Market Properties
  async addOffMarketProperty(property: OffMarketProperty): Promise<void> {
    this.offMarketProperties.set(property.id, property);
    await this.saveData();
  }

  async updateOffMarketProperty(id: string, updates: Partial<OffMarketProperty>): Promise<void> {
    const existing = this.offMarketProperties.get(id);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.offMarketProperties.set(id, updated);
      await this.saveData();
    }
  }

  async getOffMarketProperties(development?: string): Promise<OffMarketProperty[]> {
    let properties = Array.from(this.offMarketProperties.values());
    
    if (development) {
      properties = properties.filter(prop => prop.development === development);
    }
    
    return properties;
  }

  // Content Generation
  async generateContent(config: ContentGenerationConfig): Promise<GeneratedContent> {
    const development = await this.getDevelopment(config.development);
    if (!development) {
      throw new Error(`Development ${config.development} not found`);
    }

    // Generate content based on development and target segment
    const content = await this.generateContentForDevelopment(development, config);
    
    // Store generated content
    this.generatedContent.set(content.id, content);
    await this.saveData();
    
    return content;
  }

  private async generateContentForDevelopment(
    development: DevelopmentDetails, 
    config: ContentGenerationConfig
  ): Promise<GeneratedContent> {
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
    const templates = {
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
  async getContentByDevelopment(development: string): Promise<GeneratedContent[]> {
    return Array.from(this.generatedContent.values())
      .filter(content => content.development === development);
  }

  async getContentBySegment(segment: TargetSegment): Promise<GeneratedContent[]> {
    return Array.from(this.generatedContent.values())
      .filter(content => content.targetSegment === segment);
  }

  // Save data (in a real app, this would save to database)
  private async saveData(): Promise<void> {
    // In a real implementation, this would save to a database
    // For now, we'll just log that data was updated
    console.log('Data updated successfully');
  }

  // Export data for backup or migration
  async exportData(): Promise<{
    developments: DevelopmentDetails[];
    offMarketProperties: OffMarketProperty[];
    areas: AreaDetails[];
    generatedContent: GeneratedContent[];
  }> {
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
