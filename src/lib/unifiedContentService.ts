import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Base content interface with all optional fields
interface BaseContent {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  description?: string;
  excerpt?: string;
  imageSrc?: string;
  featured?: boolean;
  targetSegments?: string[];
  areas?: string[];
  area?: string;
  neighborhoods?: string[];
  neighborhood?: string;
  developments?: string[];
  development?: string;
  amenities?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  content?: string;
  bannerColor?: string;
  [key: string]: any; // Allow any additional fields
}

// Content types
export interface Area extends BaseContent {
  type: 'area';
}

export interface Neighborhood extends BaseContent {
  type: 'neighborhood';
  area: string; // Required: which area this neighborhood belongs to
}

export interface Development extends BaseContent {
  type: 'development';
  area: string; // Required: which area this development is in
  neighborhood?: string; // Optional: which neighborhood
}

export interface Article extends BaseContent {
  type: 'article';
  areas: string[]; // Required: which areas this article relates to
}

export type ContentItem = Area | Neighborhood | Development | Article;

// Content parsing errors
export interface ContentError {
  file: string;
  error: string;
  line?: number;
}

class UnifiedContentService {
  private contentDir = path.join(process.cwd(), 'src/content');
  private errors: ContentError[] = [];
  private cache: Map<string, ContentItem[]> = new Map();

  // Parse markdown file with error handling
  private parseMarkdownFile(filePath: string): ContentItem | null {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      // Determine content type from directory
      const relativePath = path.relative(this.contentDir, filePath);
      const type = relativePath.split('/')[0] as 'areas' | 'neighborhoods' | 'developments' | 'articles';
      
      // Parse content to HTML if it exists
      const htmlContent = content ? marked.parse(content) as string : '';
      
      // Create content item with all optional fields
      const contentItem: ContentItem = {
        ...frontmatter,
        content: htmlContent,
        type: type.slice(0, -1) as any, // Remove 's' from plural
      } as ContentItem;

      // Validate required fields based on type
      this.validateContentItem(contentItem, filePath);
      
      return contentItem;
    } catch (error) {
      this.errors.push({
        file: filePath,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
    }
  }

  // Validate content item
  private validateContentItem(item: ContentItem, filePath: string): void {
    const errors: string[] = [];

    // Check required fields based on type
    if (item.type === 'neighborhood' && !item.area) {
      errors.push('Neighborhood must have an area field');
    }
    if (item.type === 'development' && !item.area) {
      errors.push('Development must have an area field');
    }
    if (item.type === 'article' && (!item.areas || item.areas.length === 0)) {
      errors.push('Article must have areas field');
    }

    if (errors.length > 0) {
      this.errors.push({
        file: filePath,
        error: errors.join(', '),
      });
    }
  }

  // Get all content of a specific type
  private getContentByType(type: string): ContentItem[] {
    const cacheKey = `type_${type}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const typeDir = path.join(this.contentDir, `${type}s`);
    const items: ContentItem[] = [];

    if (!fs.existsSync(typeDir)) {
      this.cache.set(cacheKey, items);
      return items;
    }

    const files = fs.readdirSync(typeDir);
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(typeDir, file);
        const item = this.parseMarkdownFile(filePath);
        if (item) {
          // Ensure the type is set correctly
          item.type = type.slice(0, -1) as any; // Remove 's' from plural
          items.push(item);
        }
      }
    }

    this.cache.set(cacheKey, items);
    return items;
  }

  // Public methods
  public getAreas(): Area[] {
    return this.getContentByType('area') as Area[];
  }

  public getNeighborhoods(areaId?: string): Neighborhood[] {
    const neighborhoods = this.getContentByType('neighborhood') as Neighborhood[];
    return areaId 
      ? neighborhoods.filter(n => n.area === areaId)
      : neighborhoods;
  }

  public getDevelopments(areaId?: string, neighborhoodId?: string): Development[] {
    let developments = this.getContentByType('development') as Development[];
    
    if (areaId) {
      developments = developments.filter(d => d.area === areaId);
    }
    if (neighborhoodId) {
      developments = developments.filter(d => d.neighborhood === neighborhoodId);
    }
    
    return developments;
  }

  public getArticles(areaId?: string): Article[] {
    const articles = this.getContentByType('article') as Article[];
    return areaId 
      ? articles.filter(a => a.areas?.includes(areaId))
      : articles;
  }

  // Get content by ID
  public getContentById(id: string): ContentItem | null {
    const allContent = [
      ...this.getAreas(),
      ...this.getNeighborhoods(),
      ...this.getDevelopments(),
      ...this.getArticles(),
    ];
    
    return allContent.find(item => item.id === id) || null;
  }

  // Get content by slug
  public getContentBySlug(slug: string, type?: string): ContentItem | null {
    const allContent = type 
      ? this.getContentByType(type)
      : [
          ...this.getAreas(),
          ...this.getNeighborhoods(),
          ...this.getDevelopments(),
          ...this.getArticles(),
        ];
    
    return allContent.find(item => item.slug === slug) || null;
  }

  // Get errors
  public getErrors(): ContentError[] {
    return [...this.errors];
  }

  // Clear cache (for development)
  public clearCache(): void {
    this.cache.clear();
    this.errors = [];
  }

  // Health check
  public getHealthStatus(): {
    totalFiles: number;
    errors: number;
    successRate: number;
    errorList: ContentError[];
  } {
    const allContent = [
      ...this.getAreas(),
      ...this.getNeighborhoods(),
      ...this.getDevelopments(),
      ...this.getArticles(),
    ];

    return {
      totalFiles: allContent.length,
      errors: this.errors.length,
      successRate: this.errors.length === 0 ? 100 : Math.round(((allContent.length - this.errors.length) / allContent.length) * 100),
      errorList: this.errors,
    };
  }
}

// Export singleton instance
export const unifiedContentService = new UnifiedContentService();
