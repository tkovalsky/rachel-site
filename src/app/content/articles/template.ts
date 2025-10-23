import { Article } from '../types';

/**
 * Success Story Template
 * 
 * Use this template to create new success stories:
 * 1. Copy this file and rename it to match your story
 * 2. Fill in all the details below
 * 3. Add the story to the articles/index.ts file
 * 4. Update any related areas/developments
 */

export const storyTemplate: Article = {
  id: 'story-template', // Change this to unique ID
  title: 'Story Title Here', // SEO-optimized title with location and buyer type
  slug: 'story-slug-here', // URL-friendly slug
  excerpt: 'Brief description of the story for previews and SEO...', // 150-160 characters
  content: `Full story content here...

Use the STORY_TEMPLATE_SOP.md guidelines for structure:
1. Introduction (150-200 words)
2. Client Background (100-150 words)  
3. The Challenge (100-150 words)
4. Rachel's Solution (200-250 words)
5. The Outcome (150-200 words)

Include:
- Client quotes
- Specific details about the community
- Rachel's expertise and support
- Lifestyle transformation
- Call to action for similar clients`,
  author: 'Rachel Kovalsky',
  publishDate: '2024-10-23', // Update to actual publish date
  imageSrc: '/story-image.jpg', // Update to actual image path
  featured: true, // Set to true for important stories
  areas: ['area-id-1', 'area-id-2'], // Link to relevant areas
  developments: ['development-id'], // Link to relevant developments
  targetSegments: ['55-plus-cash-buyer'], // Primary target audience
  tags: ['success-story', 'tag1', 'tag2'], // SEO and categorization tags
  storyType: 'success-story',
  clientProfile: {
    ageRange: '50+', // e.g., '50+', '55-65', '60+'
    origin: 'Northeast', // e.g., 'Northeast', 'New Jersey', 'California'
    buyerType: '55+ cash buyer', // e.g., '55+ cash buyer', 'second home buyer'
    familyStructure: 'married couple' // e.g., 'married couple', 'single', 'family with adult children'
  },
  propertyDetails: {
    development: 'Development Name', // e.g., 'Wycliffe Golf & Country Club'
    propertyType: 'villa', // e.g., 'villa', 'condo', 'single-family'
    priceRange: '$800,000', // e.g., '$800,000', '$1.2M-$1.5M'
    specialFeatures: ['feature1', 'feature2'] // e.g., ['golf-cart garage', 'waterfront']
  },
  relatedStories: [], // Array of related story IDs
  adSource: 'story-slug-here' // For tracking which content generated leads
};
