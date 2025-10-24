import { Article, Area, Development } from '@/app/content/types';
import { MarkdownContentService } from './markdownContentService';

// Enhanced content association system
export interface SmartContentAssociation {
  id: string;
  type: 'article' | 'area' | 'development' | 'image' | 'testimonial' | 'market-data';
  title: string;
  slug: string;
  description?: string;
  imageSrc?: string;
  relationshipType: 'related' | 'similar' | 'complementary' | 'cross-reference' | 'visual' | 'geographic';
  strength: number; // 0-1
  metadata: {
    commonTags?: string[];
    commonAreas?: string[];
    commonSegments?: string[];
    imageSimilarity?: number;
    textSimilarity?: number;
    geographicProximity?: number;
    userJourney?: string;
    contentType?: string;
  };
}

export interface ContentCluster {
  id: string;
  name: string;
  description: string;
  content: SmartContentAssociation[];
  theme: string;
  targetAudience: string[];
}

// Smart content manager for comprehensive associations
export class SmartContentManager {
  
  // Generate comprehensive content associations
  static generateSmartAssociations(contentId: string, contentType: string): SmartContentAssociation[] {
    const associations: SmartContentAssociation[] = [];
    
    // Get all content
    const articles = MarkdownContentService.getAllArticles();
    const areas = MarkdownContentService.getAreas();
    const developments = MarkdownContentService.getDevelopments();
    
    // Find source content
    const sourceContent = this.findSourceContent(contentId, contentType, { articles, areas, developments });
    if (!sourceContent) return associations;
    
    // Generate different types of associations
    associations.push(...this.generateTagBasedAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateGeographicAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateVisualAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateSemanticAssociations(sourceContent, { articles, areas, developments }));
    associations.push(...this.generateUserJourneyAssociations(sourceContent, { articles, areas, developments }));
    
    // Remove duplicates and sort by strength
    const uniqueAssociations = this.removeDuplicates(associations);
    return uniqueAssociations
      .filter(assoc => assoc.id !== contentId)
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 12);
  }
  
  // Generate tag-based associations
  private static generateTagBasedAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): SmartContentAssociation[] {
    const associations: SmartContentAssociation[] = [];
    const sourceTags = sourceContent.tags || [];
    
    if (sourceTags.length === 0) return associations;
    
    // Find content with similar tags
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      const articleTags = article.tags || [];
      const commonTags = sourceTags.filter((tag: string) => articleTags.includes(tag));
      
      if (commonTags.length > 0) {
        const strength = commonTags.length / Math.max(sourceTags.length, articleTags.length);
        
        associations.push({
          id: article.id,
          type: 'article',
          title: article.title,
          slug: article.slug,
          description: article.excerpt,
          imageSrc: article.imageSrc,
          relationshipType: 'similar',
          strength: strength,
          metadata: {
            commonTags,
            contentType: 'success-story',
            userJourney: this.determineUserJourney(article)
          }
        });
      }
    });
    
    return associations;
  }
  
  // Generate geographic associations
  private static generateGeographicAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): SmartContentAssociation[] {
    const associations: SmartContentAssociation[] = [];
    const sourceAreas = sourceContent.areas || [];
    
    if (sourceAreas.length === 0) return associations;
    
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
          relationshipType: 'geographic',
          strength: 0.9,
          metadata: {
            commonAreas: [area.id],
            geographicProximity: 1.0,
            contentType: 'area-guide'
          }
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
          relationshipType: 'geographic',
          strength: 0.8,
          metadata: {
            commonAreas: [development.area],
            geographicProximity: 0.8,
            contentType: 'development-spotlight'
          }
        });
      }
    });
    
    return associations;
  }
  
  // Generate visual associations based on images
  private static generateVisualAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): SmartContentAssociation[] {
    const associations: SmartContentAssociation[] = [];
    const sourceImage = sourceContent.imageSrc;
    
    if (!sourceImage) return associations;
    
    // Find content with similar image characteristics
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id || !article.imageSrc) return;
      
      // Check for similar image paths (same area, development, etc.)
      const sourceAreas = sourceContent.areas || [];
      const articleAreas = article.areas || [];
      const commonAreas = sourceAreas.filter((area: string) => articleAreas.includes(area));
      
      if (commonAreas.length > 0) {
        const imageSimilarity = this.calculateImageSimilarity(sourceImage, article.imageSrc);
        
        if (imageSimilarity > 0.3) {
          associations.push({
            id: `visual-${article.id}`,
            type: 'image',
            title: `${article.title} - Visual`,
            slug: article.slug,
            description: `Related visual content from ${article.title}`,
            imageSrc: article.imageSrc,
            relationshipType: 'visual',
            strength: imageSimilarity,
            metadata: {
              imageSimilarity,
              commonAreas,
              contentType: 'visual-content'
            }
          });
        }
      }
    });
    
    return associations;
  }
  
  // Generate semantic associations based on content similarity
  private static generateSemanticAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): SmartContentAssociation[] {
    const associations: SmartContentAssociation[] = [];
    const sourceText = sourceContent.content || '';
    const sourceTitle = sourceContent.title || '';
    
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      const articleText = article.content || '';
      const articleTitle = article.title || '';
      
      // Calculate text similarity
      const textSimilarity = this.calculateTextSimilarity(sourceText, articleText);
      const titleSimilarity = this.calculateTextSimilarity(sourceTitle, articleTitle);
      const combinedSimilarity = (textSimilarity + titleSimilarity) / 2;
      
      if (combinedSimilarity > 0.2) {
        associations.push({
          id: article.id,
          type: 'article',
          title: article.title,
          slug: article.slug,
          description: article.excerpt,
          imageSrc: article.imageSrc,
          relationshipType: 'cross-reference',
          strength: combinedSimilarity,
          metadata: {
            textSimilarity,
            // titleSimilarity, // Removed - not part of metadata type
            contentType: 'semantic-match'
          }
        });
      }
    });
    
    return associations;
  }
  
  // Generate user journey associations
  private static generateUserJourneyAssociations(
    sourceContent: any,
    allContent: { articles: Article[], areas: Area[], developments: Development[] }
  ): SmartContentAssociation[] {
    const associations: SmartContentAssociation[] = [];
    const sourceSegments = sourceContent.targetSegments || [];
    const sourceJourney = this.determineUserJourney(sourceContent);
    
    // Find content for similar user journeys
    allContent.articles.forEach(article => {
      if (article.id === sourceContent.id) return;
      
      const articleSegments = article.targetSegments || [];
      const commonSegments = sourceSegments.filter((seg: string) => articleSegments.includes(seg));
      const articleJourney = this.determineUserJourney(article);
      
      if (commonSegments.length > 0 || articleJourney === sourceJourney) {
        const strength = commonSegments.length > 0 ? 0.8 : 0.6;
        
        associations.push({
          id: article.id,
          type: 'article',
          title: article.title,
          slug: article.slug,
          description: article.excerpt,
          imageSrc: article.imageSrc,
          relationshipType: 'complementary',
          strength: strength,
          metadata: {
            commonSegments,
            userJourney: articleJourney,
            contentType: 'journey-match'
          }
        });
      }
    });
    
    return associations;
  }
  
  // Calculate image similarity (simplified)
  private static calculateImageSimilarity(image1: string, image2: string): number {
    // Extract area/development from image path
    const getImageContext = (imagePath: string) => {
      const pathParts = imagePath.split('/');
      const filename = pathParts[pathParts.length - 1];
      return filename.split('-')[0]; // Extract first part of filename
    };
    
    const context1 = getImageContext(image1);
    const context2 = getImageContext(image2);
    
    return context1 === context2 ? 0.8 : 0.2;
  }
  
  // Calculate text similarity
  private static calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = new Set([...words1, ...words2]).size;
    
    return totalWords > 0 ? commonWords.length / totalWords : 0;
  }
  
  // Determine user journey from content
  private static determineUserJourney(content: any): string {
    if (content.storyType === 'success-story') return 'consideration';
    if (content.storyType === 'area-guide') return 'research';
    if (content.storyType === 'market-update') return 'research';
    if (content.featured) return 'discovery';
    return 'discovery';
  }
  
  // Remove duplicate associations
  private static removeDuplicates(associations: SmartContentAssociation[]): SmartContentAssociation[] {
    const seen = new Set();
    return associations.filter(assoc => {
      const key = `${assoc.id}-${assoc.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
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
  
  // Generate content clusters
  static generateContentClusters(): ContentCluster[] {
    const articles = MarkdownContentService.getAllArticles();
    const areas = MarkdownContentService.getAreas();
    const developments = MarkdownContentService.getDevelopments();
    
    const clusters: ContentCluster[] = [];
    
    // Create clusters based on areas
    areas.forEach(area => {
      const areaArticles = articles.filter(article => 
        article.areas.includes(area.id)
      );
      const areaDevelopments = developments.filter(dev => 
        dev.area === area.id
      );
      
      if (areaArticles.length > 0 || areaDevelopments.length > 0) {
        clusters.push({
          id: `area-${area.id}`,
          name: `${area.name} Content`,
          description: `All content related to ${area.name}`,
          content: [
            ...areaArticles.map(article => ({
              id: article.id,
              type: 'article' as const,
              title: article.title,
              slug: article.slug,
              description: article.excerpt,
              imageSrc: article.imageSrc,
              relationshipType: 'geographic' as const,
              strength: 0.9,
              metadata: { commonAreas: [area.id] }
            })),
            ...areaDevelopments.map(dev => ({
              id: dev.id,
              type: 'development' as const,
              title: dev.name,
              slug: dev.slug,
              description: dev.description,
              imageSrc: dev.imageSrc,
              relationshipType: 'geographic' as const,
              strength: 0.8,
              metadata: { commonAreas: [area.id] }
            }))
          ],
          theme: 'geographic',
          targetAudience: area.targetSegments || []
        });
      }
    });
    
    // Create clusters based on target segments
    const segments = ['55-plus-cash-buyer', 'second-home-buyer', 'family', 'investor'];
    segments.forEach(segment => {
      const segmentArticles = articles.filter(article => 
        article.targetSegments.includes(segment as any)
      );
      
      if (segmentArticles.length > 0) {
        clusters.push({
          id: `segment-${segment}`,
          name: `${segment.replace('-', ' ')} Content`,
          description: `Content targeted at ${segment.replace('-', ' ')}`,
          content: segmentArticles.map(article => ({
            id: article.id,
            type: 'article' as const,
            title: article.title,
            slug: article.slug,
            description: article.excerpt,
            imageSrc: article.imageSrc,
            relationshipType: 'similar' as const,
            strength: 0.8,
            metadata: { commonSegments: [segment] }
          })),
          theme: 'audience',
          targetAudience: [segment]
        });
      }
    });
    
    return clusters;
  }
  
  // Get personalized content recommendations
  static getPersonalizedRecommendations(
    userProfile: {
      areas?: string[];
      segments?: string[];
      interests?: string[];
      journey?: string;
    }
  ): SmartContentAssociation[] {
    const articles = MarkdownContentService.getAllArticles();
    const areas = MarkdownContentService.getAreas();
    const developments = MarkdownContentService.getDevelopments();
    
    let recommendations: SmartContentAssociation[] = [];
    
    // Filter by user profile
    if (userProfile.areas && userProfile.areas.length > 0) {
      const areaContent = articles.filter(article => 
        article.areas.some(area => userProfile.areas!.includes(area))
      );
      recommendations.push(...areaContent.map(article => ({
        id: article.id,
        type: 'article' as const,
        title: article.title,
        slug: article.slug,
        description: article.excerpt,
        imageSrc: article.imageSrc,
        relationshipType: 'geographic' as const,
        strength: 0.9,
        metadata: { commonAreas: userProfile.areas }
      })));
    }
    
    if (userProfile.segments && userProfile.segments.length > 0) {
      const segmentContent = articles.filter(article => 
        article.targetSegments.some(seg => userProfile.segments!.includes(seg))
      );
      recommendations.push(...segmentContent.map(article => ({
        id: article.id,
        type: 'article' as const,
        title: article.title,
        slug: article.slug,
        description: article.excerpt,
        imageSrc: article.imageSrc,
        relationshipType: 'similar' as const,
        strength: 0.8,
        metadata: { commonSegments: userProfile.segments }
      })));
    }
    
    // Remove duplicates and sort by strength
    const uniqueRecommendations = this.removeDuplicates(recommendations);
    return uniqueRecommendations
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 8);
  }
}
