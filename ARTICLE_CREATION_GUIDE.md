# Article Creation Guide

## 🎯 **Streamlined Process for 10+ Articles/Day**

This guide covers the complete workflow for creating new success stories and articles using our optimized system.

---

## 📋 **Quick Start Checklist**

### **Before You Begin:**
- [ ] Have your story content ready (800-1200 words)
- [ ] Choose a unique slug (e.g., `boca-raton-retirement-story`)
- [ ] Identify target segments (e.g., `55-plus-cash-buyer`)
- [ ] Select relevant areas (e.g., `boca-raton`, `delray-beach`)
- [ ] Prepare hero image (optional, system will use placeholder)

---

## 🚀 **Step-by-Step Article Creation**

### **Step 1: Create Article File**

**Location:** `src/app/content/articles/[your-article-name].ts`

**Template:**
```typescript
import { Article } from '../types';
import { createArticle } from './helpers';

export const YOUR_ARTICLE_NAME: Article = createArticle({
  id: 'your-article-slug',
  title: 'Your Compelling Article Title',
  slug: 'your-article-slug',
  excerpt: 'Brief 1-2 sentence description of the story.',
  content: `# Your Article Title

Your full article content here...

## Section Headers

Use proper markdown formatting:
- **Bold text** for emphasis
- *Italic text* for quotes
- Bullet points for lists
- ## for main sections
- ### for subsections

## Client Quote

"Rachel made the entire process so smooth and stress-free. We couldn't have done it without her!" - Client Name

## Key Takeaways

- Expert guidance makes all the difference
- Local knowledge is invaluable
- Professional service pays off`,
  author: 'Rachel Kovalsky',
  publishDate: '2024-10-23', // Use current date
  featured: true, // Set to true for important stories
  areas: ['boca-raton', 'delray-beach'], // Relevant areas
  developments: ['development-name'], // If applicable
  targetSegments: ['55-plus-cash-buyer'], // Target audience
  tags: ['success-story', 'retirement', 'boca-raton'], // SEO tags
  storyType: 'success-story', // success-story, area-guide, market-update
  clientProfile: {
    ageRange: '50+',
    origin: 'Northeast',
    buyerType: '55+ cash buyer',
    familyStructure: 'married couple'
  },
  propertyDetails: {
    development: 'Community Name',
    propertyType: 'villa',
    priceRange: '$800,000-$1,200,000',
    specialFeatures: ['golf-cart garage', 'pool', 'maintenance-free']
  },
  adSource: 'your-article-slug' // For tracking
});
```

### **Step 2: Add to Articles Index**

**File:** `src/app/content/articles/index.ts`

**Add import:**
```typescript
import { YOUR_ARTICLE_NAME } from './your-article-name';
```

**Add to ALL_ARTICLES array:**
```typescript
export const ALL_ARTICLES: Article[] = [
  ...existingArticles,
  wycliffeSuccessStory,
  TEST_SUCCESS_STORY,
  FAMILY_VACATION_HOME,
  YOUR_ARTICLE_NAME // Add your new article here
];
```

**Add to exports:**
```typescript
export { wycliffeSuccessStory, TEST_SUCCESS_STORY, FAMILY_VACATION_HOME, YOUR_ARTICLE_NAME };
```

### **Step 3: Commit and Deploy**

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add: [Article Title] - [Brief Description]"

# Push to main (auto-deploys to production)
git push origin main
```

---

## 📝 **Content Guidelines**

### **Article Structure:**
1. **Hero Section** - Compelling title and excerpt
2. **The Challenge** - What the client was facing
3. **The Solution** - How Rachel helped
4. **The Result** - Successful outcome
5. **Client Quote** - Testimonial
6. **Key Takeaways** - Lessons learned

### **SEO Requirements:**
- **Title**: Include location and buyer type
- **Meta description**: Under 160 characters
- **Headings**: Use H2, H3 for structure
- **Keywords**: Include naturally in content
- **Internal links**: Link to related areas/developments

### **Content Length:**
- **Minimum**: 800 words
- **Optimal**: 1000-1200 words
- **Maximum**: 1500 words

---

## 🎨 **Visual Elements**

### **Hero Images:**
- **Size**: 1200x800px minimum
- **Format**: JPG or WebP
- **Location**: `public/articles/[slug].jpg`
- **Alt text**: Descriptive of the image

### **Image Naming Convention:**
```
public/articles/
├── wycliffe-success-story.jpeg
├── family-vacation-home.jpg
├── boca-raton-retirement-story.jpg
└── [your-article-slug].jpg
```

---

## 🏷️ **Content Taxonomy**

### **Target Segments:**
- `55-plus-cash-buyer` - Retirees with cash
- `second-home-buyer` - Vacation home seekers
- `family` - Families with children
- `investor` - Investment property buyers
- `professional` - Working professionals

### **Areas (Palm Beach County):**
- `boca-raton` - Boca Raton
- `delray-beach` - Delray Beach
- `lake-worth` - Lake Worth
- `wellington` - Wellington
- `palm-beach-gardens` - Palm Beach Gardens
- `boynton-beach` - Boynton Beach
- `deerfield-beach` - Deerfield Beach
- `greenacres` - Greenacres
- `parkland` - Parkland
- `pompano-beach` - Pompano Beach
- `west-palm-beach` - West Palm Beach

### **Story Types:**
- `success-story` - Client success stories
- `area-guide` - Area-specific guides
- `market-update` - Market analysis
- `guide` - General guides

---

## 📊 **Batch Processing Workflow**

### **For 10+ Articles Per Day:**

**Morning Batch (5 articles):**
```bash
# Create 5 article files
# Update articles index
git add .
git commit -m "Add: 5 success stories for 55+ buyers"
git push origin main
```

**Afternoon Batch (5 articles):**
```bash
# Create 5 more article files
# Update articles index
git add .
git commit -m "Add: 5 vacation home stories"
git push origin main
```

### **Efficient Workflow:**
1. **Create all article files** in one session
2. **Update index once** with all imports
3. **Commit as batch** with descriptive message
4. **Push to main** for automatic deployment

---

## 🔧 **Troubleshooting**

### **Common Issues:**

**1. TypeScript Errors:**
- ✅ **Don't include `imageSrc`** - `createArticle` helper generates it
- ✅ **Use proper types** for all fields
- ✅ **Check spelling** of target segments and areas

**2. Build Failures:**
- ✅ **Check imports** in articles index
- ✅ **Verify export names** match
- ✅ **Run `npm run typecheck`** locally

**3. Image Loading:**
- ✅ **Use correct file extension** (.jpg, .jpeg, .png)
- ✅ **Place in `public/articles/`** directory
- ✅ **Name file** `[slug].jpg`

### **Testing Locally:**
```bash
# Check TypeScript
npm run typecheck

# Check build
npm run build

# Test locally
npm run dev
```

---

## 📈 **Content Strategy**

### **Article Mix (Weekly):**
- **5 Success Stories** - Client testimonials
- **3 Area Guides** - Location-specific content
- **2 Market Updates** - Market analysis
- **2 General Guides** - Educational content

### **Target Distribution:**
- **40%** - 55+ cash buyers
- **30%** - Second home buyers
- **20%** - Families
- **10%** - Investors

### **SEO Optimization:**
- **Location + Buyer Type** in titles
- **Long-tail keywords** naturally included
- **Internal linking** to related content
- **Meta descriptions** under 160 characters

---

## 🚀 **Automation Roadmap**

### **Phase 1: Manual (Current)**
- ✅ **Streamlined workflow** - 5-10 articles/day
- ✅ **Template system** - Consistent structure
- ✅ **Batch processing** - Efficient commits

### **Phase 2: Semi-Automated (Future)**
- 🔄 **Google Sheets integration** - Content pipeline
- 🔄 **AI content generation** - Draft creation
- 🔄 **Automated deployment** - From sheets to site

### **Phase 3: Fully Automated (Future)**
- 🔄 **AI story generation** - From client data
- 🔄 **Automatic SEO optimization** - AI-powered
- 🔄 **Content scheduling** - Automated publishing

---

## 📚 **Resources**

### **File Locations:**
- **Articles**: `src/app/content/articles/`
- **Images**: `public/articles/`
- **Index**: `src/app/content/articles/index.ts`
- **Types**: `src/app/content/types.ts`
- **Helpers**: `src/app/content/articles/helpers.ts`

### **Templates:**
- **Article Template**: `src/app/content/articles/template.ts`
- **Story Template**: `STORY_TEMPLATE_SOP.md`
- **Image Guide**: `IMAGE_MANAGEMENT_GUIDE.md`

### **Documentation:**
- **Content Strategy**: `CONTENT_STRATEGY_GUIDE.md`
- **Workflow Guide**: `CONTENT_WORKFLOW_GUIDE.md`
- **Google Sheets**: `GOOGLE_SHEETS_STORY_TRACKER_SETUP.md`

---

## ✅ **Success Metrics**

### **Daily Goals:**
- ✅ **10+ articles published**
- ✅ **Zero deployment conflicts**
- ✅ **All content indexed**
- ✅ **SEO optimization complete**

### **Weekly Goals:**
- ✅ **50+ articles published**
- ✅ **All target segments covered**
- ✅ **Content interconnections built**
- ✅ **Performance monitoring**

---

## 🎯 **Next Steps**

1. **Start with 5 articles** using this guide
2. **Test the workflow** end-to-end
3. **Scale to 10+ articles/day**
4. **Implement automation** as needed
5. **Monitor performance** and optimize

**You're now ready to create high-volume, high-quality content efficiently!**
