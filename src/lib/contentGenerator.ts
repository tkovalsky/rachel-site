import { 
  DevelopmentDetails, 
  GeneratedContent, 
  ContentGenerationConfig,
  TargetSegment 
} from '@/app/content/enhancedTypes';
import { dataManager } from './dataManager';

export class ContentGenerator {
  private static instance: ContentGenerator;

  static getInstance(): ContentGenerator {
    if (!ContentGenerator.instance) {
      ContentGenerator.instance = new ContentGenerator();
    }
    return ContentGenerator.instance;
  }

  async generateArticle(config: ContentGenerationConfig): Promise<GeneratedContent> {
    const development = await dataManager.getDevelopment(config.development);
    if (!development) {
      throw new Error(`Development ${config.development} not found`);
    }

    const contentHooks = development.contentHooks.find(hook => hook.segment === config.targetSegment);
    if (!contentHooks) {
      throw new Error(`No content hooks found for segment ${config.targetSegment}`);
    }

    const title = this.generateArticleTitle(development, config, contentHooks);
    const content = this.generateArticleContent(development, config, contentHooks);
    const excerpt = this.generateExcerpt(content);
    const callToAction = contentHooks.callToAction;

    return {
      id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      development: development.id,
      targetSegment: config.targetSegment,
      contentType: 'article',
      title,
      content,
      excerpt,
      callToAction,
      keywords: development.seoKeywords,
      generatedAt: new Date().toISOString(),
      config
    };
  }

  async generateSocialPost(config: ContentGenerationConfig): Promise<GeneratedContent> {
    const development = await dataManager.getDevelopment(config.development);
    if (!development) {
      throw new Error(`Development ${config.development} not found`);
    }

    const contentHooks = development.contentHooks.find(hook => hook.segment === config.targetSegment);
    if (!contentHooks) {
      throw new Error(`No content hooks found for segment ${config.targetSegment}`);
    }

    const title = this.generateSocialTitle(development, config, contentHooks);
    const content = this.generateSocialContent(development, config, contentHooks);
    const excerpt = content; // Social posts are short
    const callToAction = contentHooks.callToAction;

    return {
      id: `social-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      development: development.id,
      targetSegment: config.targetSegment,
      contentType: 'social-post',
      title,
      content,
      excerpt,
      callToAction,
      keywords: development.seoKeywords,
      generatedAt: new Date().toISOString(),
      config
    };
  }

  async generateEmail(config: ContentGenerationConfig): Promise<GeneratedContent> {
    const development = await dataManager.getDevelopment(config.development);
    if (!development) {
      throw new Error(`Development ${config.development} not found`);
    }

    const contentHooks = development.contentHooks.find(hook => hook.segment === config.targetSegment);
    if (!contentHooks) {
      throw new Error(`No content hooks found for segment ${config.targetSegment}`);
    }

    const title = this.generateEmailSubject(development, config, contentHooks);
    const content = this.generateEmailContent(development, config, contentHooks);
    const excerpt = this.generateExcerpt(content);
    const callToAction = contentHooks.callToAction;

    return {
      id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      development: development.id,
      targetSegment: config.targetSegment,
      contentType: 'email',
      title,
      content,
      excerpt,
      callToAction,
      keywords: development.seoKeywords,
      generatedAt: new Date().toISOString(),
      config
    };
  }

  async generateLandingPage(config: ContentGenerationConfig): Promise<GeneratedContent> {
    const development = await dataManager.getDevelopment(config.development);
    if (!development) {
      throw new Error(`Development ${config.development} not found`);
    }

    const contentHooks = development.contentHooks.find(hook => hook.segment === config.targetSegment);
    if (!contentHooks) {
      throw new Error(`No content hooks found for segment ${config.targetSegment}`);
    }

    const title = this.generateLandingPageTitle(development, config, contentHooks);
    const content = this.generateLandingPageContent(development, config, contentHooks);
    const excerpt = this.generateExcerpt(content);
    const callToAction = contentHooks.callToAction;

    return {
      id: `landing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      development: development.id,
      targetSegment: config.targetSegment,
      contentType: 'landing-page',
      title,
      content,
      excerpt,
      callToAction,
      keywords: development.seoKeywords,
      generatedAt: new Date().toISOString(),
      config
    };
  }

  // Title generation methods
  private generateArticleTitle(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const templates = [
      `Why ${development.name} is Perfect for ${this.getSegmentLabel(config.targetSegment)}`,
      `${development.name}: The Ultimate ${this.getSegmentLabel(config.targetSegment)} Community`,
      `Discover ${development.name} - Your Dream ${this.getSegmentLabel(config.targetSegment)} Home`,
      `${development.name}: Luxury Living for ${this.getSegmentLabel(config.targetSegment)}`,
      `The ${this.getSegmentLabel(config.targetSegment)} Guide to ${development.name}`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateSocialTitle(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const templates = [
      `🏡 ${development.name} - ${hooks.hook}`,
      `✨ ${development.name} has everything you need!`,
      `🌟 ${development.name} - Where luxury meets lifestyle`,
      `💎 ${development.name} - The ultimate ${this.getSegmentLabel(config.targetSegment)} community`,
      `🏌️ ${development.name} - Championship golf and luxury living`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateEmailSubject(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const templates = [
      `Exclusive: ${development.name} Opportunity`,
      `Why ${development.name} is Perfect for You`,
      `Don't Miss: ${development.name} Insider Access`,
      `${development.name} - Your Dream Home Awaits`,
      `Limited Time: ${development.name} Special Access`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateLandingPageTitle(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const templates = [
      `${development.name} - ${this.getSegmentLabel(config.targetSegment)} Living`,
      `Welcome to ${development.name}`,
      `${development.name} - Luxury Living Redefined`,
      `Your Dream Home at ${development.name}`,
      `${development.name} - Where Dreams Come True`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // Content generation methods
  private generateArticleContent(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const segmentLabel = this.getSegmentLabel(config.targetSegment);
    
    return `
      <h1>${hooks.hook}</h1>
      
      <p>${development.description}</p>
      
      <h2>Why ${development.name} is Perfect for ${segmentLabel}</h2>
      <p>For ${segmentLabel.toLowerCase()}, ${development.name} offers the perfect solution to ${hooks.painPoint}. 
      ${hooks.solution}</p>
      
      <h3>Luxury Amenities</h3>
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
      
      <h3>Ready to Learn More?</h3>
      <p><strong>${hooks.callToAction}</strong></p>
      
      <p>Contact Rachel Kovalsky at (561) 287-8966 or email hi@racheldelray.com for your private tour.</p>
    `;
  }

  private generateSocialContent(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const segmentLabel = this.getSegmentLabel(config.targetSegment);
    
    return `
      🏡 ${hooks.hook}
      
      ${development.shortDescription}
      
      ✨ Perfect for ${segmentLabel.toLowerCase()}
      🏌️ Championship golf
      🏊 Resort-style amenities
      🍽️ Fine dining
      
      ${hooks.callToAction}
      
      #${development.name.replace(/\s+/g, '')} #SouthFlorida #LuxuryLiving #RealEstate
    `;
  }

  private generateEmailContent(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const segmentLabel = this.getSegmentLabel(config.targetSegment);
    
    return `
      <h2>${hooks.hook}</h2>
      
      <p>Dear ${segmentLabel},</p>
      
      <p>${development.description}</p>
      
      <p>For ${segmentLabel.toLowerCase()}, ${development.name} offers the perfect solution to ${hooks.painPoint}. 
      ${hooks.solution}</p>
      
      <h3>Key Features:</h3>
      <ul>
        ${development.amenitiesDetailed.slice(0, 5).map(amenity => 
          `<li>${amenity.name}: ${amenity.description}</li>`
        ).join('')}
      </ul>
      
      <h3>Investment Highlights:</h3>
      <ul>
        <li>Rental Yield: ${development.investmentPotential.rentalYield}%</li>
        <li>Appreciation: ${development.investmentPotential.appreciationRate}% annually</li>
        <li>Market Trend: ${development.investmentPotential.marketTrend}</li>
      </ul>
      
      <p><strong>${hooks.callToAction}</strong></p>
      
      <p>Best regards,<br>
      Rachel Kovalsky<br>
      (561) 287-8966<br>
      hi@racheldelray.com</p>
    `;
  }

  private generateLandingPageContent(development: DevelopmentDetails, config: ContentGenerationConfig, hooks: any): string {
    const segmentLabel = this.getSegmentLabel(config.targetSegment);
    
    return `
      <h1>${hooks.hook}</h1>
      
      <p>${development.description}</p>
      
      <h2>Perfect for ${segmentLabel}</h2>
      <p>${hooks.solution}</p>
      
      <h3>Luxury Amenities</h3>
      <div class="amenities-grid">
        ${development.amenitiesDetailed.map(amenity => 
          `<div class="amenity-card">
            <h4>${amenity.name}</h4>
            <p>${amenity.description}</p>
          </div>`
        ).join('')}
      </div>
      
      <h3>Investment Potential</h3>
      <div class="investment-stats">
        <div class="stat">
          <h4>Rental Yield</h4>
          <p>${development.investmentPotential.rentalYield}%</p>
        </div>
        <div class="stat">
          <h4>Appreciation</h4>
          <p>${development.investmentPotential.appreciationRate}% annually</p>
        </div>
        <div class="stat">
          <h4>Market Trend</h4>
          <p>${development.investmentPotential.marketTrend}</p>
        </div>
      </div>
      
      <h3>Ready to Learn More?</h3>
      <p><strong>${hooks.callToAction}</strong></p>
      
      <div class="cta-section">
        <a href="tel:+15612878966" class="btn-primary">Call (561) 287-8966</a>
        <a href="mailto:hi@racheldelray.com" class="btn-ghost">Email Rachel</a>
      </div>
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
}

export const contentGenerator = ContentGenerator.getInstance();
