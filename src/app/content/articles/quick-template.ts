import { Article } from '../types';
import { createArticle } from './helpers';

// 🚀 QUICK ARTICLE TEMPLATE
// Copy this file and customize for your new article

export const YOUR_ARTICLE_NAME: Article = createArticle({
  // 🔧 REQUIRED FIELDS
  id: 'your-article-slug',                    // URL slug (kebab-case)
  title: 'Your Compelling Article Title',      // SEO-optimized title
  slug: 'your-article-slug',                  // Same as ID
  excerpt: 'Brief 1-2 sentence description.', // Meta description
  content: `# Your Article Title

Your full article content here...

## The Challenge
What the client was facing...

## The Solution  
How Rachel helped...

## The Result
Successful outcome...

## Client Quote
"Rachel made the entire process so smooth and stress-free!" - Client

## Key Takeaways
- Expert guidance makes all the difference
- Local knowledge is invaluable
- Professional service pays off`,

  // 📝 METADATA
  author: 'Rachel Kovalsky',
  publishDate: '2024-10-23', // Use current date
  featured: true,             // Set to true for important stories
  
  // 🎯 TARGETING
  areas: ['boca-raton', 'delray-beach'],           // Choose 1-3 relevant areas
  developments: ['development-name'],               // If applicable
  targetSegments: ['55-plus-cash-buyer'],         // Choose 1-2 segments
  tags: ['success-story', 'retirement', 'boca-raton'], // SEO tags
  
  // 📊 STORY CLASSIFICATION
  storyType: 'success-story', // success-story, area-guide, market-update, guide
  
  // 👥 CLIENT PROFILE (Optional but recommended)
  clientProfile: {
    ageRange: '50+',                    // 35-45, 50+, 60+, etc.
    origin: 'Northeast',                // Northeast, Midwest, etc.
    buyerType: '55+ cash buyer',        // 55+ cash buyer, second-home-buyer, etc.
    familyStructure: 'married couple'  // married couple, family with kids, etc.
  },
  
  // 🏠 PROPERTY DETAILS (Optional but recommended)
  propertyDetails: {
    development: 'Community Name',           // If applicable
    propertyType: 'villa',                   // villa, single-family, condo, etc.
    priceRange: '$800,000-$1,200,000',      // Price range
    specialFeatures: ['golf-cart garage', 'pool', 'maintenance-free'] // Key features
  },
  
  // 📈 TRACKING
  adSource: 'your-article-slug' // For lead tracking
});

// 📋 CHECKLIST AFTER CREATING:
// [ ] Update src/app/content/articles/index.ts
// [ ] Add import: import { YOUR_ARTICLE_NAME } from './your-article-name';
// [ ] Add to ALL_ARTICLES array
// [ ] Add to exports
// [ ] Commit and push: git add . && git commit -m "Add: [Title]" && git push origin main
// [ ] Test URL: https://rachel-site.vercel.app/articles/your-article-slug
