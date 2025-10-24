import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Article, Area, Development } from '@/app/content/types';

// Content directory structure
const CONTENT_DIR = path.join(process.cwd(), 'src/content');

// Interface for markdown frontmatter
interface MarkdownFrontmatter {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string;
  publishDate: string;
  featured?: boolean;
  areas?: string[];
  developments?: string[];
  targetSegments?: string[];
  tags?: string[];
  storyType?: 'success-story' | 'area-guide' | 'market-update' | 'guide';
  clientProfile?: {
    ageRange?: string;
    origin?: string;
    buyerType?: string;
    familyStructure?: string;
  };
  propertyDetails?: {
    development?: string;
    propertyType?: string;
    priceRange?: string;
    specialFeatures?: string[];
  };
  adSource?: string;
  relatedStories?: string[];
  imageSrc?: string;
}

// Process markdown files and convert to TypeScript objects
export class MarkdownProcessor {
  // Get all markdown files from a directory
  static getMarkdownFiles(dir: string): string[] {
    try {
      return fs.readdirSync(dir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(dir, file));
    } catch (error) {
      console.warn(`Directory ${dir} not found`);
      return [];
    }
  }

  // Process a single markdown file
  static processMarkdownFile(filePath: string): Article | Area | Development | null {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      // Determine content type from file path
      const contentType = this.getContentTypeFromPath(filePath);
      
      if (contentType === 'article') {
        return this.processArticle(frontmatter as MarkdownFrontmatter, content, filePath);
      } else if (contentType === 'area') {
        return this.processArea(frontmatter as any, content, filePath);
      } else if (contentType === 'development') {
        return this.processDevelopment(frontmatter as any, content, filePath);
      }
      
      return null;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
      return null;
    }
  }

  // Determine content type from file path
  private static getContentTypeFromPath(filePath: string): string {
    if (filePath.includes('/articles/')) return 'article';
    if (filePath.includes('/areas/')) return 'area';
    if (filePath.includes('/developments/')) return 'development';
    if (filePath.includes('/neighborhoods/')) return 'area';
    return 'article'; // default
  }

  // Process article markdown
  private static processArticle(frontmatter: MarkdownFrontmatter, content: string, filePath: string): Article {
    // Convert markdown to HTML synchronously
    const htmlContent = marked.parse(content) as string;
    
    return {
      id: frontmatter.id,
      title: frontmatter.title,
      slug: frontmatter.slug,
      excerpt: frontmatter.excerpt,
      content: htmlContent,
      author: frontmatter.author || 'Rachel Kovalsky',
      publishDate: frontmatter.publishDate,
      featured: frontmatter.featured || false,
      areas: frontmatter.areas || [],
      developments: frontmatter.developments || [],
      targetSegments: (frontmatter.targetSegments || []) as any[],
      tags: frontmatter.tags || [],
      storyType: frontmatter.storyType || 'success-story',
      clientProfile: frontmatter.clientProfile,
      propertyDetails: frontmatter.propertyDetails,
      relatedStories: frontmatter.relatedStories || [],
      adSource: frontmatter.adSource || frontmatter.slug,
      imageSrc: frontmatter.imageSrc || `/articles/${frontmatter.slug}.jpg`
    };
  }

  // Process area markdown
  private static processArea(frontmatter: any, content: string, filePath: string): Area {
    return {
      id: frontmatter.id,
      name: frontmatter.name,
      slug: frontmatter.slug,
      description: frontmatter.description,
      imageSrc: frontmatter.imageSrc || `/areas/${frontmatter.slug}.jpg`,
      featured: frontmatter.featured || false,
      targetSegments: (frontmatter.targetSegments || []) as any[],
      developments: frontmatter.developments || [],
      articles: frontmatter.articles || [],
      // content: content // Removed - not part of Area type
    };
  }

  // Process development markdown
  private static processDevelopment(frontmatter: any, content: string, filePath: string): Development {
    return {
      id: frontmatter.id,
      name: frontmatter.name,
      slug: frontmatter.slug,
      area: frontmatter.area,
      description: frontmatter.description,
      imageSrc: frontmatter.imageSrc || `/developments/${frontmatter.slug}.jpg`,
      amenities: frontmatter.amenities || [],
      priceRange: frontmatter.priceRange || { min: 0, max: 0 },
      featured: frontmatter.featured || false,
      targetSegments: (frontmatter.targetSegments || []) as any[],
      // content: content // Removed - not part of Area type
    };
  }

  // Auto-generate all content from markdown files
  static generateAllContent() {
    const articles: Article[] = [];
    const areas: Area[] = [];
    const developments: Development[] = [];

    // Process articles
    const articleFiles = this.getMarkdownFiles(path.join(CONTENT_DIR, 'articles'));
    articleFiles.forEach(file => {
      const article = this.processMarkdownFile(file);
      if (article && 'storyType' in article) {
        articles.push(article);
      }
    });

    // Process areas
    const areaFiles = this.getMarkdownFiles(path.join(CONTENT_DIR, 'areas'));
    areaFiles.forEach(file => {
      const area = this.processMarkdownFile(file);
      if (area && 'name' in area && !('storyType' in area)) {
        areas.push(area as Area);
      }
    });

    // Process developments
    const developmentFiles = this.getMarkdownFiles(path.join(CONTENT_DIR, 'developments'));
    developmentFiles.forEach(file => {
      const development = this.processMarkdownFile(file);
      if (development && 'amenities' in development) {
        developments.push(development);
      }
    });

    return { articles, areas, developments };
  }

  // Auto-generate content relationships
  static generateContentRelationships(content: { articles: Article[], areas: Area[], developments: Development[] }) {
    // Auto-link articles to areas based on tags
    content.articles.forEach(article => {
      if (article.tags) {
        article.areas = article.tags
          .filter(tag => content.areas.some(area => area.slug === tag))
          .map(tag => tag);
      }
    });

    // Auto-link articles to developments
    content.articles.forEach(article => {
      if (article.tags) {
        article.developments = article.tags
          .filter(tag => content.developments.some(dev => dev.slug === tag))
          .map(tag => tag);
      }
    });

    // Auto-generate related stories based on tags
    content.articles.forEach(article => {
      article.relatedStories = content.articles
        .filter(other => other.id !== article.id)
        .filter(other => other.tags.some(tag => article.tags.includes(tag)))
        .slice(0, 3)
        .map(other => other.slug);
    });

    return content;
  }
}

// Auto-generate content on build
export function getProcessedContent() {
  const content = MarkdownProcessor.generateAllContent();
  return MarkdownProcessor.generateContentRelationships(content);
}
