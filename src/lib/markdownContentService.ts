import { 
  Area, 
  Development, 
  Article, 
  Testimonial, 
  MarketData, 
  ContentFilter, 
  ContentDisplayOptions,
  TargetSegment 
} from '@/app/content/types';
// Import markdown processor only on server side
let getProcessedContent: any = null;
if (typeof window === 'undefined') {
  // Server side - safe to import fs
  const { getProcessedContent: serverGetProcessedContent } = require('./markdownProcessor');
  getProcessedContent = serverGetProcessedContent;
}

interface RawTestimonial {
  q: string;
  a: string;
  targetSegment?: TargetSegment;
  featured?: boolean;
}

// Import existing content as fallback
import { AREAS as FALLBACK_AREAS } from '@/app/content/areas';
import { DEVELOPMENTS as FALLBACK_DEVELOPMENTS } from '@/app/content/developments';
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from '@/app/content/testimonials';
import { MARKET_DATA as FALLBACK_MARKET_DATA } from '@/app/content/marketData';

// Content filtering and randomization utilities
export class MarkdownContentService {
  // Get processed content from markdown files
  private static getProcessedContent() {
    // If we're on client side, return fallback content
    if (typeof window !== 'undefined' || !getProcessedContent) {
      return {
        articles: [],
        areas: FALLBACK_AREAS,
        developments: FALLBACK_DEVELOPMENTS
      };
    }
    
    try {
      return getProcessedContent();
    } catch (error) {
      console.warn('Markdown processing failed, using fallback content:', error);
      return {
        articles: [],
        areas: FALLBACK_AREAS,
        developments: FALLBACK_DEVELOPMENTS
      };
    }
  }

  // Get filtered and randomized areas
  static getAreas(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Area[] {
    const { areas } = this.getProcessedContent();
    let filteredAreas = [...areas];

    // Apply filters
    if (filter.targetSegment) {
      filteredAreas = filteredAreas.filter(area => 
        area.targetSegments.includes(filter.targetSegment!)
      );
    }

    if (filter.area) {
      filteredAreas = filteredAreas.filter(area => area.id === filter.area);
    }

    if (filter.featured !== undefined) {
      filteredAreas = filteredAreas.filter(area => area.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      filteredAreas = this.shuffleArray(filteredAreas);
    }

    // Apply limit
    if (filter.limit) {
      filteredAreas = filteredAreas.slice(0, filter.limit);
    }

    return filteredAreas;
  }

  // Get filtered and randomized developments
  static getDevelopments(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Development[] {
    const { developments } = this.getProcessedContent();
    let filteredDevelopments = [...developments];

    // Apply filters
    if (filter.targetSegment) {
      filteredDevelopments = filteredDevelopments.filter(dev => 
        dev.targetSegments.includes(filter.targetSegment!)
      );
    }

    if (filter.area) {
      filteredDevelopments = filteredDevelopments.filter(dev => dev.area === filter.area);
    }

    if (filter.amenity) {
      filteredDevelopments = filteredDevelopments.filter(dev => 
        dev.amenities.includes(filter.amenity!)
      );
    }

    if (filter.featured !== undefined) {
      filteredDevelopments = filteredDevelopments.filter(dev => dev.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      filteredDevelopments = this.shuffleArray(filteredDevelopments);
    }

    // Apply limit
    if (filter.limit) {
      filteredDevelopments = filteredDevelopments.slice(0, filter.limit);
    }

    return filteredDevelopments;
  }

  // Get filtered and randomized articles
  static getArticles(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Article[] {
    const { articles } = this.getProcessedContent();
    let filteredArticles = [...articles];

    // Apply filters
    if (filter.targetSegment) {
      filteredArticles = filteredArticles.filter(article => 
        article.targetSegments.includes(filter.targetSegment!)
      );
    }

    if (filter.area) {
      filteredArticles = filteredArticles.filter(article => 
        article.areas.includes(filter.area!)
      );
    }

    if (filter.development) {
      filteredArticles = filteredArticles.filter(article => 
        article.developments.includes(filter.development!)
      );
    }

    if (filter.featured !== undefined) {
      filteredArticles = filteredArticles.filter(article => article.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      filteredArticles = this.shuffleArray(filteredArticles);
    }

    // Apply limit
    if (filter.limit) {
      filteredArticles = filteredArticles.slice(0, filter.limit);
    }

    return filteredArticles;
  }

  // Get filtered and randomized testimonials (still using fallback)
  static getTestimonials(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Testimonial[] {
    // Convert raw testimonials to proper Testimonial format
    const testimonials: Testimonial[] = FALLBACK_TESTIMONIALS.map((testimonial: RawTestimonial, index) => ({
      id: `testimonial-${index}`,
      quote: testimonial.q,
      author: testimonial.a,
      targetSegment: testimonial.targetSegment || 'professional' as TargetSegment,
      featured: testimonial.featured || false,
    }));

    let filteredTestimonials = [...testimonials];

    // Apply filters
    if (filter.targetSegment) {
      filteredTestimonials = filteredTestimonials.filter(testimonial => 
        testimonial.targetSegment === filter.targetSegment
      );
    }

    if (filter.featured !== undefined) {
      filteredTestimonials = filteredTestimonials.filter(testimonial => 
        testimonial.featured === filter.featured
      );
    }

    // Randomize if requested
    if (filter.randomize) {
      filteredTestimonials = this.shuffleArray(filteredTestimonials);
    }

    // Apply limit
    if (filter.limit) {
      filteredTestimonials = filteredTestimonials.slice(0, filter.limit);
    }

    return filteredTestimonials;
  }

  // Get filtered market data (still using fallback)
  static getMarketData(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): MarketData[] {
    let marketData = [...FALLBACK_MARKET_DATA];

    // Apply filters
    if (filter.area) {
      marketData = marketData.filter(data => data.area === filter.area);
    }

    if (filter.featured !== undefined) {
      marketData = marketData.filter(data => data.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      marketData = this.shuffleArray(marketData);
    }

    // Apply limit
    if (filter.limit) {
      marketData = marketData.slice(0, filter.limit);
    }

    return marketData;
  }

  // Get content by target segment
  static getContentBySegment(segment: TargetSegment, limit: number = 3) {
    return {
      areas: this.getAreas({ targetSegment: segment, limit }),
      developments: this.getDevelopments({ targetSegment: segment, limit }),
      articles: this.getArticles({ targetSegment: segment, limit }),
      testimonials: this.getTestimonials({ targetSegment: segment, limit }),
    };
  }

  // Get featured content
  static getFeaturedContent(limit: number = 3) {
    return {
      areas: this.getAreas({ featured: true, limit }),
      developments: this.getDevelopments({ featured: true, limit }),
      articles: this.getArticles({ featured: true, limit }),
      testimonials: this.getTestimonials({ featured: true, limit }),
    };
  }

  // Get random content
  static getRandomContent(limit: number = 3) {
    return {
      areas: this.getAreas({ randomize: true, limit }),
      developments: this.getDevelopments({ randomize: true, limit }),
      articles: this.getArticles({ randomize: true, limit }),
      testimonials: this.getTestimonials({ randomize: true, limit }),
    };
  }

  // Utility function to shuffle array
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get content statistics
  static getContentStats() {
    const { articles, areas, developments } = this.getProcessedContent();
    
    return {
      totalAreas: areas.length,
      totalDevelopments: developments.length,
      totalArticles: articles.length,
      totalTestimonials: FALLBACK_TESTIMONIALS.length,
      totalMarketData: FALLBACK_MARKET_DATA.length,
      featuredAreas: areas.filter((area: any) => area.featured).length,
      featuredDevelopments: developments.filter((dev: any) => dev.featured).length,
      featuredArticles: articles.filter((article: any) => article.featured).length,
    };
  }

  // Get all articles for the articles route
  static getAllArticles(): Article[] {
    const { articles } = this.getProcessedContent();
    return articles;
  }

  // Get article by slug
  static getArticleBySlug(slug: string): Article | undefined {
    const { articles } = this.getProcessedContent();
    return articles.find(article => article.slug === slug);
  }
}
