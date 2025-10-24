import { Article, Area, Development } from '@/app/content/types';
import { MarkdownContentService } from './markdownContentService';

// Content association types
export interface ContentAssociation {
  id: string;
  type: 'article' | 'area' | 'development' | 'image' | 'testimonial';
  title: string;
  slug: string;
  description?: string;
  imageSrc?: string;
  relationshipType: 'related' | 'similar' | 'complementary' | 'cross-reference';
  strength: number; // 0-1, how strong the association is
  metadata?: Record<string, any>;
}

export interface ContentGraph {
  nodes: ContentAssociation[];
  edges: Array<{
    from: string;
    to: string;
    relationship: string;
    strength: number;
  }>;
}

// Smart content association engine
export class ContentAssociationEngine {
  
  // Generate comprehensive content associations
  static generateContentAssociations(contentId: string, contentType: string): ContentAssociation[] {
    const associations: ContentAssociation[] = [];
    
    // Get all content
    const articles = MarkdownContentService.getAllArticles();
    const areas = MarkdownContentService.getAreas();
    const developments = MarkdownContentService.getDevelopments();
    
    // Find the source content
    const sourceContent = this.findSourceContent(contentId, contentType, { articles, areas, developments });
    if (!sourceContent) return associations;
    
    // Generate associations based on different criteria
    associations.push(...this.generateTagBasedAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateAreaBasedAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateSegmentBasedAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateImageAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateCrossReferences(sourceContent, { articles, areas, developments }));
    
    // Sort by strength and return top associations
    return associations
      .filter(assoc => assoc.id !== contentId)
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 10);
  }
  
  // Generate tag-based associations
  private static generateTagBasedAssociations(
    sourceContent: any, 
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): ContentAssociation[] {
    const associations: ContentAssociation[] = [];
    const sourceTags = sourceContent.tags || [];
    
    // Find articles with similar tags
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      const commonTags = article.tags?.filter(tag => sourceTags.includes(tag)) || [];
      if (commonTags.length > 0) {
        const strength = commonTags.length / Math.max(sourceTags.length, article.tags?.length || 1);
        
        associations.push({
          id: article.id,
          type: 'article',
          title: article.title,
          slug: article.slug,
          description: article.excerpt,
          imageSrc: article.imageSrc,
          relationshipType: 'similar',
          strength: strength,
          metadata: { commonTags, sourceTags: sourceTags, targetTags: article.tags }
        });
      }
    });
    
    return associations;
  }
  
  // Generate area-based associations
  private static generateAreaBasedAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): ContentAssociation[] {
    const associations: ContentAssociation[] = [];
    const sourceAreas = sourceContent.areas || [];
    
    // Find related areas
    allContent.areas.forEach(area => {
      if (sourceAreas.includes(area.id)) {
        associations.push({
          id: area.id,
          type: 'area',
          title: area.name,
          slug: area.slug,
          description: area.description,
          imageSrc: area.imageSrc,
          relationshipType: 'related',
          strength: 0.9,
          metadata: { sourceAreas, targetArea: area.id }
        });
      }
    });
    
    // Find developments in the same areas
    allContent.developments.forEach(development => {
      if (sourceAreas.includes(development.area)) {
        associations.push({
          id: development.id,
          type: 'development',
          title: development.name,
          slug: development.slug,
          description: development.description,
          imageSrc: development.imageSrc,
          relationshipType: 'complementary',
          strength: 0.8,
          metadata: { sourceAreas, targetArea: development.area }
        });
      }
    });
    
    return associations;
  }
  
  // Generate segment-based associations
  private static generateSegmentBasedAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): ContentAssociation[] {
    const associations: ContentAssociation[] = [];
    const sourceSegments = sourceContent.targetSegments || [];
    
    // Find content targeting similar segments
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      const commonSegments = article.targetSegments?.filter(seg => sourceSegments.includes(seg)) || [];
      if (commonSegments.length > 0) {
        const strength = commonSegments.length / Math.max(sourceSegments.length, article.targetSegments?.length || 1);
        
        associations.push({
          id: article.id,
          type: 'article',
          title: article.title,
          slug: article.slug,
          description: article.excerpt,
          imageSrc: article.imageSrc,
          relationshipType: 'similar',
          strength: strength * 0.8, // Slightly lower than tag-based
          metadata: { commonSegments, sourceSegments, targetSegments: article.targetSegments }
        });
      }
    });
    
    return associations;
  }
  
  // Generate image associations
  private static generateImageAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): ContentAssociation[] {
    const associations: ContentAssociation[] = [];
    const sourceImage = sourceContent.imageSrc;
    
    if (!sourceImage) return associations;
    
    // Find content with similar images (same area, development, etc.)
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      // Check if images are from same area or development
      const sourceAreas = sourceContent.areas || [];
      const articleAreas = article.areas || [];
      const commonAreas = sourceAreas.filter(area => articleAreas.includes(area));
      
      if (commonAreas.length > 0) {
        associations.push({
          id: `image-${article.id}`,
          type: 'image',
          title: `${article.title} - Image`,
          slug: article.slug,
          description: `Related image from ${article.title}`,
          imageSrc: article.imageSrc,
          relationshipType: 'complementary',
          strength: 0.6,
          metadata: { sourceImage, targetImage: article.imageSrc, commonAreas }
        });
      }
    });
    
    return associations;
  }
  
  // Generate cross-references
  private static generateCrossReferences(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): ContentAssociation[] {
    const associations: ContentAssociation[] = [];
    
    // Find content that mentions the same locations, people, or concepts
    const sourceText = sourceContent.content || '';
    const sourceTitle = sourceContent.title || '';
    
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      const articleText = article.content || '';
      const articleTitle = article.title || '';
      
      // Simple text similarity check
      const similarity = this.calculateTextSimilarity(sourceText, articleText);
      const titleSimilarity = this.calculateTextSimilarity(sourceTitle, articleTitle);
      
      if (similarity > 0.3 || titleSimilarity > 0.5) {
        associations.push({
          id: article.id,
          type: 'article',
          title: article.title,
          slug: article.slug,
          description: article.excerpt,
          imageSrc: article.imageSrc,
          relationshipType: 'cross-reference',
          strength: Math.max(similarity, titleSimilarity) * 0.7,
          metadata: { textSimilarity: similarity, titleSimilarity }
        });
      }
    });
    
    return associations;
  }
  
  // Calculate text similarity (simple implementation)
  private static calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = new Set([...words1, ...words2]).size;
    
    return commonWords.length / totalWords;
  }
  
  // Find source content
  private static findSourceContent(
    contentId: string, 
    contentType: string,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): any {
    if (contentType === 'article') {
      return allContent.articles.find(article => article.id === contentId);
    } else if (contentType === 'area') {
      return allContent.areas.find(area => area.id === contentId);
    } else if (contentType === 'development') {
      return allContent.developments.find(dev => dev.id === contentId);
    }
    return null;
  }
  
  // Generate content graph for visualization
  static generateContentGraph(): ContentGraph {
    const articles = MarkdownContentService.getAllArticles();
    const areas = MarkdownContentService.getAreas();
    const developments = MarkdownContentService.getDevelopments();
    
    const nodes: ContentAssociation[] = [];
    const edges: Array<{ from: string; to: string; relationship: string; strength: number }> = [];
    
    // Add all content as nodes
    articles.forEach(article => {
      nodes.push({
        id: article.id,
        type: 'article',
        title: article.title,
        slug: article.slug,
        description: article.excerpt,
        imageSrc: article.imageSrc,
        relationshipType: 'related',
        strength: 1
      });
    });
    
    areas.forEach(area => {
      nodes.push({
        id: area.id,
        type: 'area',
        title: area.name,
        slug: area.slug,
        description: area.description,
        imageSrc: area.imageSrc,
        relationshipType: 'related',
        strength: 1
      });
    });
    
    developments.forEach(development => {
      nodes.push({
        id: development.id,
        type: 'development',
        title: development.name,
        slug: development.slug,
        description: development.description,
        imageSrc: development.imageSrc,
        relationshipType: 'related',
        strength: 1
      });
    });
    
    // Generate edges between related content
    articles.forEach(article => {
      const associations = this.generateContentAssociations(article.id, 'article');
      
      associations.forEach(assoc => {
        edges.push({
          from: article.id,
          to: assoc.id,
          relationship: assoc.relationshipType,
          strength: assoc.strength
        });
      });
    });
    
    return { nodes, edges };
  }
  
  // Get content recommendations for a specific user journey
  static getContentRecommendations(
    userJourney: 'discovery' | 'research' | 'consideration' | 'decision',
    userProfile: { areas?: string[], segments?: string[], interests?: string[] }
  ): ContentAssociation[] {
    const articles = MarkdownContentService.getAllArticles();
    const areas = MarkdownContentService.getAreas();
    const developments = MarkdownContentService.getDevelopments();
    
    let recommendations: ContentAssociation[] = [];
    
    switch (userJourney) {
      case 'discovery':
        // Show featured content and area guides
        recommendations = [
          ...articles.filter(a => a.featured).map(a => ({
            id: a.id,
            type: 'article' as const,
            title: a.title,
            slug: a.slug,
            description: a.excerpt,
            imageSrc: a.imageSrc,
            relationshipType: 'related' as const,
            strength: 0.9
          })),
          ...areas.filter(a => a.featured).map(a => ({
            id: a.id,
            type: 'area' as const,
            title: a.name,
            slug: a.slug,
            description: a.description,
            imageSrc: a.imageSrc,
            relationshipType: 'related' as const,
            strength: 0.8
          }))
        ];
        break;
        
      case 'research':
        // Show detailed content and comparisons
        recommendations = articles
          .filter(a => userProfile.areas?.some(area => a.areas.includes(area)))
          .map(a => ({
            id: a.id,
            type: 'article' as const,
            title: a.title,
            slug: a.slug,
            description: a.excerpt,
            imageSrc: a.imageSrc,
            relationshipType: 'similar' as const,
            strength: 0.8
          }));
        break;
        
      case 'consideration':
        // Show success stories and testimonials
        recommendations = articles
          .filter(a => a.storyType === 'success-story')
          .filter(a => userProfile.segments?.some(seg => a.targetSegments.includes(seg)))
          .map(a => ({
            id: a.id,
            type: 'article' as const,
            title: a.title,
            slug: a.slug,
            description: a.excerpt,
            imageSrc: a.imageSrc,
            relationshipType: 'similar' as const,
            strength: 0.9
          }));
        break;
        
      case 'decision':
        // Show CTAs and contact information
        recommendations = [
          {
            id: 'contact-rachel',
            type: 'article' as const,
            title: 'Contact Rachel',
            slug: 'contact',
            description: 'Ready to start your real estate journey?',
            relationshipType: 'complementary' as const,
            strength: 1.0
          }
        ];
        break;
    }
    
    return recommendations.slice(0, 6);
  }
}
