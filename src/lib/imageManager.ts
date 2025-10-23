/**
 * Image Management System
 * 
 * Provides organized image handling with automatic path generation
 * and fallback options for articles, developments, and areas.
 */

export interface ImageConfig {
  slug: string;
  type: 'article' | 'development' | 'area' | 'testimonial';
  fallback?: string;
  alt?: string;
}

export class ImageManager {
  /**
   * Get image path for an article based on its slug
   */
  static getArticleImage(slug: string, fallback?: string): string {
    const possiblePaths = [
      `/articles/${slug}.jpg`,
      `/articles/${slug}.jpeg`,
      `/articles/${slug}.png`,
      `/articles/${slug}.webp`,
    ];
    
    // In a real app, you'd check if the file exists
    // For now, we'll use the first path and let Next.js handle 404s
    return possiblePaths[0];
  }

  /**
   * Get image path for a development
   */
  static getDevelopmentImage(slug: string, fallback?: string): string {
    const possiblePaths = [
      `/developments/${slug}.jpg`,
      `/developments/${slug}.jpeg`,
      `/developments/${slug}.png`,
      `/developments/${slug}.webp`,
    ];
    
    return possiblePaths[0];
  }

  /**
   * Get image path for an area
   */
  static getAreaImage(slug: string, fallback?: string): string {
    const possiblePaths = [
      `/areas/${slug}.jpg`,
      `/areas/${slug}.jpeg`,
      `/areas/${slug}.png`,
      `/areas/${slug}.webp`,
    ];
    
    return possiblePaths[0];
  }

  /**
   * Get image with fallback
   */
  static getImage(config: ImageConfig): string {
    const { slug, type, fallback } = config;
    
    switch (type) {
      case 'article':
        return this.getArticleImage(slug, fallback);
      case 'development':
        return this.getDevelopmentImage(slug, fallback);
      case 'area':
        return this.getAreaImage(slug, fallback);
      default:
        return fallback || '/default-image.jpg';
    }
  }

  /**
   * Generate alt text for images
   */
  static getAltText(slug: string, type: string, title?: string): string {
    if (title) {
      return `${title} - ${type} image`;
    }
    
    const formattedSlug = slug.replace(/-/g, ' ');
    return `${formattedSlug} ${type} image`;
  }

  /**
   * Get all possible image paths for a given slug and type
   */
  static getImageVariants(slug: string, type: 'article' | 'development' | 'area'): string[] {
    const basePath = `/${type}s/${slug}`;
    return [
      `${basePath}.jpg`,
      `${basePath}.jpeg`,
      `${basePath}.png`,
      `${basePath}.webp`,
    ];
  }
}

/**
 * Image path constants for easy reference
 */
export const IMAGE_PATHS = {
  // Default images
  DEFAULT_ARTICLE: '/articles/default-article.jpg',
  DEFAULT_DEVELOPMENT: '/developments/default-development.jpg',
  DEFAULT_AREA: '/areas/default-area.jpg',
  
  // Common images
  RACHEL_PROFILE: '/rachel.jpeg',
  HERO_IMAGE: '/hero-home-exterior.jpg',
  
  // Success story images
  WYCLIFFE_STORY: '/articles/wycliffe-success-story.jpg',
  
  // Development images
  ATLANTIC_GARDENS: '/developments/atlantic-gardens.jpg',
  BOCA_WEST: '/developments/boca-west.jpg',
  
  // Area images
  BOCA_RATON: '/areas/boca-raton.jpg',
  DELRAY_BEACH: '/areas/delray-beach.jpg',
} as const;

/**
 * Helper function to get image path with automatic fallback
 */
export function getImagePath(
  slug: string, 
  type: 'article' | 'development' | 'area',
  fallback?: keyof typeof IMAGE_PATHS
): string {
  const imagePath = ImageManager.getImage({ slug, type });
  return fallback ? IMAGE_PATHS[fallback] : imagePath;
}
