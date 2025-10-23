/**
 * Article Helper Functions
 * 
 * Provides utilities for article management and image handling
 */

import { Article } from '../types';
import { ImageManager, getImagePath } from '@/lib/imageManager';

/**
 * Create an article with automatic image path generation
 */
export function createArticle(articleData: Omit<Article, 'imageSrc'>): Article {
  return {
    ...articleData,
    imageSrc: ImageManager.getArticleImage(articleData.slug),
  };
}

/**
 * Get image path for an article based on its slug
 */
export function getArticleImagePath(slug: string): string {
  return ImageManager.getArticleImage(slug);
}

/**
 * Get alt text for an article image
 */
export function getArticleAltText(article: Article): string {
  return ImageManager.getAltText(article.slug, 'article', article.title);
}

/**
 * Validate article image exists (for development)
 */
export function validateArticleImage(slug: string): boolean {
  // In a real app, you'd check if the file exists
  // For now, we'll assume it exists if the path is valid
  const imagePath = ImageManager.getArticleImage(slug);
  return imagePath.startsWith('/articles/');
}

/**
 * Get all possible image paths for an article
 */
export function getArticleImageVariants(slug: string): string[] {
  return ImageManager.getImageVariants(slug, 'article');
}

/**
 * Article image naming conventions
 */
export const IMAGE_CONVENTIONS = {
  // Success stories: wycliffe-success-story.jpg
  successStory: (slug: string) => `${slug}.jpg`,
  
  // Area guides: boca-raton-guide.jpg
  areaGuide: (slug: string) => `${slug}.jpg`,
  
  // Market updates: market-update-2024-10.jpg
  marketUpdate: (slug: string) => `${slug}.jpg`,
  
  // General articles: article-name.jpg
  general: (slug: string) => `${slug}.jpg`,
} as const;

/**
 * Generate image path based on article type
 */
export function getImagePathByType(article: Article): string {
  const { slug, storyType } = article;
  
  switch (storyType) {
    case 'success-story':
      return `/articles/${IMAGE_CONVENTIONS.successStory(slug)}`;
    case 'area-guide':
      return `/articles/${IMAGE_CONVENTIONS.areaGuide(slug)}`;
    case 'market-update':
      return `/articles/${IMAGE_CONVENTIONS.marketUpdate(slug)}`;
    default:
      return `/articles/${IMAGE_CONVENTIONS.general(slug)}`;
  }
}
