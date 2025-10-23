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

interface RawTestimonial {
  q: string;
  a: string;
  targetSegment?: TargetSegment;
  featured?: boolean;
}

import { AREAS } from '@/app/content/areas';
import { DEVELOPMENTS } from '@/app/content/developments';
import { ALL_ARTICLES as ARTICLES } from '@/app/content/articles';
import { TESTIMONIALS } from '@/app/content/testimonials';
import { MARKET_DATA } from '@/app/content/marketData';

// Content filtering and randomization utilities
export class ContentService {
  // Get filtered and randomized areas
  static getAreas(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Area[] {
    let areas = [...AREAS];

    // Apply filters
    if (filter.targetSegment) {
      areas = areas.filter(area => 
        area.targetSegments.includes(filter.targetSegment!)
      );
    }

    if (filter.area) {
      areas = areas.filter(area => area.id === filter.area);
    }

    if (filter.featured !== undefined) {
      areas = areas.filter(area => area.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      areas = this.shuffleArray(areas);
    }

    // Apply limit
    if (filter.limit) {
      areas = areas.slice(0, filter.limit);
    }

    return areas;
  }

  // Get filtered and randomized developments
  static getDevelopments(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Development[] {
    let developments = [...DEVELOPMENTS];

    // Apply filters
    if (filter.targetSegment) {
      developments = developments.filter(dev => 
        dev.targetSegments.includes(filter.targetSegment!)
      );
    }

    if (filter.area) {
      developments = developments.filter(dev => dev.area === filter.area);
    }

    if (filter.amenity) {
      developments = developments.filter(dev => 
        dev.amenities.includes(filter.amenity!)
      );
    }

    if (filter.featured !== undefined) {
      developments = developments.filter(dev => dev.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      developments = this.shuffleArray(developments);
    }

    // Apply limit
    if (filter.limit) {
      developments = developments.slice(0, filter.limit);
    }

    return developments;
  }

  // Get filtered and randomized articles
  static getArticles(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Article[] {
    let articles = [...ARTICLES];

    // Apply filters
    if (filter.targetSegment) {
      articles = articles.filter(article => 
        article.targetSegments.includes(filter.targetSegment!)
      );
    }

    if (filter.area) {
      articles = articles.filter(article => 
        article.areas.includes(filter.area!)
      );
    }

    if (filter.development) {
      articles = articles.filter(article => 
        article.developments.includes(filter.development!)
      );
    }

    if (filter.featured !== undefined) {
      articles = articles.filter(article => article.featured === filter.featured);
    }

    // Randomize if requested
    if (filter.randomize) {
      articles = this.shuffleArray(articles);
    }

    // Apply limit
    if (filter.limit) {
      articles = articles.slice(0, filter.limit);
    }

    return articles;
  }

  // Get filtered and randomized testimonials
  static getTestimonials(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): Testimonial[] {
    // Convert raw testimonials to proper Testimonial format
    const testimonials: Testimonial[] = TESTIMONIALS.map((testimonial: RawTestimonial, index) => ({
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

  // Get filtered market data
  static getMarketData(filter: ContentFilter = {}, _options: ContentDisplayOptions = {}): MarketData[] {
    let marketData = [...MARKET_DATA];

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
    return {
      totalAreas: AREAS.length,
      totalDevelopments: DEVELOPMENTS.length,
      totalArticles: ARTICLES.length,
      totalTestimonials: TESTIMONIALS.length,
      totalMarketData: MARKET_DATA.length,
      featuredAreas: AREAS.filter(area => area.featured).length,
      featuredDevelopments: DEVELOPMENTS.filter(dev => dev.featured).length,
      featuredArticles: ARTICLES.filter(article => article.featured).length,
    };
  }
}
