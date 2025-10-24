// Client-side content service that fetches from API
import { TargetSegment, Amenity } from '@/app/content/types';

export interface ContentError {
  file: string;
  error: string;
  line?: number;
}

export interface HealthStatus {
  totalFiles: number;
  errors: number;
  successRate: number;
  errorList: ContentError[];
}

export interface BaseContent {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  description?: string;
  excerpt?: string;
  imageSrc?: string;
  featured?: boolean;
  targetSegments?: TargetSegment[];
  areas?: string[];
  area?: string;
  neighborhoods?: string[];
  neighborhood?: string;
  developments?: string[];
  development?: string;
  amenities?: Amenity[];
  priceRange?: {
    min: number;
    max: number;
  };
  content?: string;
  bannerColor?: 'blue' | 'black' | 'gold' | 'deep' | 'champagne';
  [key: string]: any;
}

export interface Area extends BaseContent {
  type: 'area';
  developments: string[];
  articles: string[];
}

export interface Neighborhood extends BaseContent {
  type: 'neighborhood';
  area: string;
}

export interface Development extends BaseContent {
  type: 'development';
  area: string;
  neighborhood?: string;
}

export interface Article extends BaseContent {
  type: 'article';
  areas: string[];
}

export type ContentItem = Area | Neighborhood | Development | Article;

class ContentService {
  private baseUrl = '/api/content';

  async getAreas(): Promise<Area[]> {
    try {
      const response = await fetch(`${this.baseUrl}/areas`);
      if (!response.ok) throw new Error('Failed to fetch areas');
      return await response.json();
    } catch (error) {
      console.error('Error fetching areas:', error);
      return [];
    }
  }

  async getNeighborhoods(areaId?: string): Promise<Neighborhood[]> {
    try {
      const url = areaId ? `${this.baseUrl}/neighborhoods?area=${areaId}` : `${this.baseUrl}/neighborhoods`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch neighborhoods');
      return await response.json();
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
      return [];
    }
  }

  async getDevelopments(areaId?: string, neighborhoodId?: string): Promise<Development[]> {
    try {
      const params = new URLSearchParams();
      if (areaId) params.append('area', areaId);
      if (neighborhoodId) params.append('neighborhood', neighborhoodId);
      
      const queryString = params.toString();
      const url = queryString ? `${this.baseUrl}/developments?${queryString}` : `${this.baseUrl}/developments`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch developments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching developments:', error);
      return [];
    }
  }

  async getArticles(areaId?: string): Promise<Article[]> {
    try {
      const url = areaId ? `${this.baseUrl}/articles?area=${areaId}` : `${this.baseUrl}/articles`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch articles');
      return await response.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  async getContentById(id: string): Promise<ContentItem | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching content by ID:', error);
      return null;
    }
  }

  async getContentBySlug(slug: string, type?: string): Promise<ContentItem | null> {
    try {
      const url = type ? `${this.baseUrl}/slug/${slug}?type=${type}` : `${this.baseUrl}/slug/${slug}`;
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching content by slug:', error);
      return null;
    }
  }

  async getHealthStatus(): Promise<HealthStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) throw new Error('Failed to fetch health status');
      return await response.json();
    } catch (error) {
      console.error('Error fetching health status:', error);
    return {
        totalFiles: 0,
        errors: 0,
        successRate: 0,
        errorList: []
      };
    }
  }
}

export const contentService = new ContentService();