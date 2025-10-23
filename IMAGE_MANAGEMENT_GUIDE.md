# Image Management System Guide

## 🎯 **Overview**

The image management system provides organized, scalable image handling for articles, developments, and areas with automatic path generation and fallback options.

## 📁 **Directory Structure**

```
public/
├── articles/           # Article images
│   ├── wycliffe-success-story.jpg
│   ├── grinkevich-story.jpg
│   └── boca-raton-guide.jpg
├── developments/       # Development images
│   ├── atlantic-gardens.jpg
│   ├── boca-west.jpg
│   └── wycliffe-golf-country-club.jpg
├── areas/             # Area images
│   ├── boca-raton.jpg
│   ├── delray-beach.jpg
│   └── lake-worth.jpg
└── neighborhoods/     # Existing neighborhood images
    ├── boca-raton-mizner.jpg.webp
    └── delray-beach-east-delray.jpg
```

## 🖼️ **Image Naming Conventions**

### **Articles**
- **Success Stories**: `wycliffe-success-story.jpg`
- **Area Guides**: `boca-raton-guide.jpg`
- **Market Updates**: `market-update-2024-10.jpg`
- **General Articles**: `article-name.jpg`

### **Developments**
- **Country Clubs**: `wycliffe-golf-country-club.jpg`
- **Active Adult**: `delray-beach-club.jpg`
- **Golf Communities**: `wellington-national.jpg`

### **Areas**
- **Cities**: `boca-raton.jpg`, `delray-beach.jpg`
- **Neighborhoods**: `mizner-park.jpg`, `atlantic-avenue.jpg`

## 🔧 **Usage Examples**

### **Automatic Image Path Generation**
```typescript
import { ImageManager } from '@/lib/imageManager';

// Get image path for an article
const imagePath = ImageManager.getArticleImage('wycliffe-success-story');
// Returns: '/articles/wycliffe-success-story.jpg'

// Get image path for a development
const devImage = ImageManager.getDevelopmentImage('atlantic-gardens');
// Returns: '/developments/atlantic-gardens.jpg'
```

### **Article Creation with Auto Images**
```typescript
import { createArticle } from '@/app/content/articles/helpers';

const article = createArticle({
  id: 'grinkevich-story',
  title: 'The Grinkevich Family Story',
  slug: 'grinkevich-story',
  // ... other fields
  // imageSrc is automatically generated: '/articles/grinkevich-story.jpg'
});
```

### **Image Path Constants**
```typescript
import { IMAGE_PATHS } from '@/lib/imageManager';

// Use predefined paths
const rachelImage = IMAGE_PATHS.RACHEL_PROFILE; // '/rachel.jpeg'
const heroImage = IMAGE_PATHS.HERO_IMAGE; // '/hero-home-exterior.jpg'
```

## 📋 **Image Requirements**

### **Technical Specifications**
- **Format**: JPG, JPEG, PNG, or WebP
- **Size**: 1200x630px (optimal for social sharing)
- **Quality**: High resolution, web-optimized
- **Alt Text**: Descriptive, SEO-friendly

### **Content Guidelines**
- **Articles**: Relevant to the story content
- **Developments**: Show the community/amenities
- **Areas**: Highlight the location's appeal
- **Success Stories**: Client photos (with permission) or community shots

## 🚀 **Benefits of This System**

### **Organization**
- ✅ **Clear structure** - Easy to find images
- ✅ **Consistent naming** - Predictable file paths
- ✅ **Scalable** - Handles hundreds of images
- ✅ **Maintainable** - Easy to update and manage

### **Development**
- ✅ **Auto-generation** - Images paths created automatically
- ✅ **Type safety** - TypeScript support
- ✅ **Fallbacks** - Default images when needed
- ✅ **Validation** - Check if images exist

### **Performance**
- ✅ **Optimized loading** - Right-sized images
- ✅ **CDN ready** - Easy to move to CDN
- ✅ **Caching** - Predictable paths for caching
- ✅ **Lazy loading** - Easy to implement

## 🔄 **Migration Guide**

### **Moving Existing Images**
```bash
# Move article images
mv public/wycliffe-success-story.jpeg public/articles/wycliffe-success-story.jpg

# Move development images
mv public/atlantic-gardens.jpg public/developments/atlantic-gardens.jpg

# Move area images
mv public/boca-raton.jpg public/areas/boca-raton.jpg
```

### **Updating Article References**
```typescript
// Old way
imageSrc: '/wycliffe-success-story.jpeg'

// New way (automatic)
imageSrc: ImageManager.getArticleImage('wycliffe-success-story')
// Returns: '/articles/wycliffe-success-story.jpg'
```

## 📊 **Image Optimization**

### **File Size Guidelines**
- **Article images**: 200-500KB
- **Development images**: 300-800KB
- **Area images**: 150-400KB
- **Hero images**: 500KB-1MB

### **Responsive Images**
```typescript
// Generate multiple sizes
const imageSizes = {
  small: '/articles/story-name-400.jpg',
  medium: '/articles/story-name-800.jpg',
  large: '/articles/story-name-1200.jpg',
};
```

## 🎨 **Design Guidelines**

### **Success Story Images**
- **Client photos** (with permission)
- **Community shots** showing amenities
- **Lifestyle images** (golf, pickleball, etc.)
- **Property exteriors** (if appropriate)

### **Development Images**
- **Community entrances** and gates
- **Amenity shots** (golf course, pool, clubhouse)
- **Property exteriors** (various home styles)
- **Lifestyle activities** (residents enjoying amenities)

### **Area Images**
- **Landmarks** and iconic locations
- **Lifestyle shots** (dining, shopping, beaches)
- **Aerial views** of the area
- **Community highlights** (parks, downtown, etc.)

## 🔍 **SEO Optimization**

### **Alt Text Guidelines**
- **Descriptive**: "Cheryl and Eddie at Wycliffe Golf & Country Club"
- **Keyword-rich**: "55+ retirement community in Lake Worth"
- **Contextual**: "Golf cart garage at Wycliffe villa"
- **Accessible**: Clear description for screen readers

### **File Naming for SEO**
- **Include keywords**: `wycliffe-golf-country-club-success-story.jpg`
- **Use hyphens**: `boca-raton-retirement-guide.jpg`
- **Be descriptive**: `delray-beach-atlantic-avenue-dining.jpg`
- **Keep it readable**: `lake-worth-wycliffe-community.jpg`

This system provides a scalable, organized approach to image management that grows with your content! 🎯
