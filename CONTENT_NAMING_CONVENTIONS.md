# Content Naming Conventions
## Scalable Content Management System

### 🎯 **Purpose: Consistent, SEO-Friendly, and Association-Ready**

This naming convention system ensures all content is properly organized, easily discoverable, and automatically associated with related content.

---

## 📝 **Markdown File Naming Convention**

### **Article Files:**
```
src/content/articles/[area]-[property-type]-[buyer-segment]-[date]-[descriptive-identifier].md
```

### **Examples:**
```
boca-raton-condo-55-plus-2024-10-23-wycliffe-success-story.md
delray-beach-single-family-family-2024-10-24-vacation-home.md
lake-worth-villa-55-plus-2024-10-25-golf-retirement-story.md
wellington-townhouse-second-home-2024-10-26-investment-property.md
```

### **Pattern Breakdown:**
- **`[area]`** - Primary area (boca-raton, delray-beach, lake-worth, wellington)
- **`[property-type]`** - Property type (condo, single-family, villa, townhouse, penthouse)
- **`[buyer-segment]`** - Target audience (55-plus, family, investor, second-home)
- **`[date]`** - Publication date (YYYY-MM-DD format)
- **`[descriptive-identifier]`** - Descriptive identifier (wycliffe-success, vacation-home, golf-retirement)

### **Date-Based Benefits:**
- **No Overlaps:** Multiple articles per day with unique identifiers
- **Chronological Order:** Natural sorting by publication date
- **Batch Processing:** Easy to group articles by date
- **Version Control:** Clear history of content creation
- **SEO Friendly:** Dates in URLs help with freshness signals

---

## 🖼️ **Image Naming Convention**

### **Article Images:**
```
public/articles/[area]-[property-type]-[buyer-segment]-[date]-[descriptive-identifier].[ext]
```

### **Examples:**
```
public/articles/boca-raton-condo-55-plus-2024-10-23-wycliffe-success-story.jpg
public/articles/delray-beach-single-family-family-2024-10-24-vacation-home.jpg
public/articles/lake-worth-villa-55-plus-2024-10-25-golf-retirement-story.jpg
```

### **Area Images:**
```
public/areas/[area-name]-[image-type].[ext]
```

### **Examples:**
```
public/areas/boca-raton-hero.jpg
public/areas/boca-raton-downtown.jpg
public/areas/boca-raton-beach.jpg
public/areas/delray-beach-main-street.jpg
```

### **Development Images:**
```
public/developments/[development-name]-[image-type].[ext]
```

### **Examples:**
```
public/developments/boca-raton-country-club-golf-course.jpg
public/developments/boca-raton-country-club-clubhouse.jpg
public/developments/wycliffe-golf-country-club-villa.jpg
```

---

## 📁 **Directory Structure**

### **Content Organization:**
```
src/content/
├── articles/                    # Success stories and articles
│   ├── boca-raton-condo-55-plus-2024-10-23-wycliffe-success-story.md
│   ├── delray-beach-single-family-family-2024-10-24-vacation-home.md
│   ├── lake-worth-villa-55-plus-2024-10-25-golf-retirement-story.md
│   └── wellington-townhouse-second-home-2024-10-26-investment.md
├── areas/                       # City and area information
│   ├── boca-raton.md
│   ├── delray-beach.md
│   ├── lake-worth.md
│   └── wellington.md
├── developments/               # Community and development info
│   ├── boca-raton-country-club.md
│   ├── wycliffe-golf-country-club.md
│   ├── royal-palm-yacht-club.md
│   └── mizner-park.md
└── neighborhoods/              # Specific neighborhood details
    ├── mizner-park-boca-raton.md
    ├── royal-palm-place-boca-raton.md
    └── downtown-delray-beach.md
```

### **Image Organization:**
```
public/
├── articles/                   # Article hero images
│   ├── boca-raton-condo-55-plus-2024-10-23-wycliffe-success-story.jpg
│   ├── delray-beach-single-family-family-2024-10-24-vacation-home.jpg
│   └── lake-worth-villa-55-plus-2024-10-25-golf-retirement-story.jpg
├── areas/                      # Area images
│   ├── boca-raton-hero.jpg
│   ├── boca-raton-downtown.jpg
│   ├── delray-beach-main-street.jpg
│   └── lake-worth-beach.jpg
├── developments/               # Development images
│   ├── boca-raton-country-club-golf-course.jpg
│   ├── wycliffe-golf-country-club-villa.jpg
│   └── royal-palm-yacht-club-marina.jpg
└── neighborhoods/              # Neighborhood images
    ├── mizner-park-boca-raton-shopping.jpg
    ├── royal-palm-place-boca-raton-luxury.jpg
    └── downtown-delray-beach-restaurants.jpg
```

---

## 🏷️ **Content Tagging System**

### **Standard Tags:**
```yaml
# Geographic Tags
areas: ["boca-raton", "delray-beach", "lake-worth", "wellington", "palm-beach-gardens"]

# Property Type Tags
property-types: ["condo", "single-family", "villa", "townhouse", "penthouse", "co-op"]

# Buyer Segment Tags
buyer-segments: ["55-plus-cash-buyer", "second-home-buyer", "family", "investor", "professional"]

# Lifestyle Tags
lifestyle: ["golf", "tennis", "beach", "downtown", "country-club", "waterfront", "gated"]

# Content Type Tags
content-types: ["success-story", "area-guide", "market-update", "development-spotlight"]

# Amenity Tags
amenities: ["golf-course", "tennis-courts", "pool", "spa", "fitness-center", "marina", "restaurant"]
```

### **Tag Combinations:**
```yaml
# Example tag combinations for different content types
success-story: ["success-story", "boca-raton", "condo", "55-plus-cash-buyer", "golf", "country-club"]
area-guide: ["area-guide", "delray-beach", "downtown", "restaurants", "shopping", "beach"]
market-update: ["market-update", "lake-worth", "single-family", "investment", "appreciation"]
development-spotlight: ["development-spotlight", "wellington", "villa", "golf", "tennis", "pool"]
```

---

## 📊 **Content Metadata Standards**

### **Article Frontmatter Template:**
```yaml
---
id: boca-raton-condo-55-plus-wycliffe-success-story
title: "From Golf Dreams to Real Life: Cheryl & Eddie's Wycliffe Story"
slug: boca-raton-condo-55-plus-wycliffe-success-story
excerpt: "How Cheryl and Eddie found their perfect retirement lifestyle at Wycliffe Golf & Country Club."
author: Rachel Kovalsky
publishDate: "2024-10-23"
featured: true
areas: ["boca-raton", "lake-worth"]
developments: ["wycliffe-golf-country-club"]
targetSegments: ["55-plus-cash-buyer"]
tags: ["success-story", "boca-raton", "condo", "55-plus-cash-buyer", "golf", "country-club", "retirement"]
storyType: "success-story"
clientProfile:
  ageRange: "55+"
  origin: "Northeast"
  buyerType: "55+ cash buyer"
  familyStructure: "married couple"
propertyDetails:
  development: "Wycliffe Golf & Country Club"
  propertyType: "condo"
  priceRange: "$800,000"
  specialFeatures: ["golf-cart garage", "sunlit patio", "maintenance-free living"]
adSource: "boca-raton-condo-55-plus-wycliffe-success-story"
relatedStories: []
imageSrc: "/articles/boca-raton-condo-55-plus-wycliffe-success-story.jpg"
---
```

### **Area Frontmatter Template:**
```yaml
---
id: boca-raton
name: "Boca Raton"
slug: "boca-raton"
description: "Upscale coastal city known for its beautiful beaches and luxury lifestyle."
imageSrc: "/areas/boca-raton-hero.jpg"
featured: true
targetSegments: ["55-plus-cash-buyer", "second-home-buyer", "professional"]
developments: ["boca-raton-country-club", "royal-palm-yacht-club", "mizner-park"]
articles: ["boca-raton-condo-55-plus-wycliffe-success-story"]
---
```

### **Development Frontmatter Template:**
```yaml
---
id: boca-raton-country-club
name: "Boca Raton Country Club"
slug: "boca-raton-country-club"
area: "boca-raton"
description: "Premier gated community with championship golf and resort amenities."
imageSrc: "/developments/boca-raton-country-club-golf-course.jpg"
amenities: ["golf", "tennis", "pool", "spa", "fitness-center", "restaurant"]
priceRange:
  min: 600000
  max: 2000000
featured: true
targetSegments: ["55-plus-cash-buyer", "second-home-buyer"]
---
```

---

## 🚀 **Batch Content Creation Workflow**

### **Daily Content Creation (10+ Articles):**

**1. Morning Batch (5 Articles) - 2024-10-23:**
```bash
# Create 5 articles with date-based naming
touch src/content/articles/boca-raton-condo-55-plus-2024-10-23-retirement-story-1.md
touch src/content/articles/delray-beach-single-family-family-2024-10-23-vacation-home-2.md
touch src/content/articles/lake-worth-villa-55-plus-2024-10-23-golf-community-3.md
touch src/content/articles/wellington-townhouse-second-home-2024-10-23-investment-4.md
touch src/content/articles/palm-beach-gardens-penthouse-luxury-2024-10-23-lifestyle-5.md
```

**2. Afternoon Batch (5 Articles) - 2024-10-23:**
```bash
# Create 5 more articles same day
touch src/content/articles/boca-raton-condo-55-plus-2024-10-23-country-club-6.md
touch src/content/articles/delray-beach-single-family-family-2024-10-23-beach-house-7.md
touch src/content/articles/lake-worth-villa-55-plus-2024-10-23-maintenance-free-8.md
touch src/content/articles/wellington-townhouse-second-home-2024-10-23-golf-9.md
touch src/content/articles/palm-beach-gardens-penthouse-luxury-2024-10-23-waterfront-10.md
```

**3. Next Day Batch (5 Articles) - 2024-10-24:**
```bash
# New day, new articles
touch src/content/articles/boca-raton-condo-55-plus-2024-10-24-new-retirement-story.md
touch src/content/articles/delray-beach-single-family-family-2024-10-24-new-vacation-home.md
touch src/content/articles/lake-worth-villa-55-plus-2024-10-24-new-golf-community.md
touch src/content/articles/wellington-townhouse-second-home-2024-10-24-new-investment.md
touch src/content/articles/palm-beach-gardens-penthouse-luxury-2024-10-24-new-lifestyle.md
```

### **Image Creation Workflow:**
```bash
# Create corresponding images with date-based naming
touch public/articles/boca-raton-condo-55-plus-2024-10-23-retirement-story-1.jpg
touch public/articles/delray-beach-single-family-family-2024-10-23-vacation-home-2.jpg
touch public/articles/lake-worth-villa-55-plus-2024-10-23-golf-community-3.jpg
touch public/articles/wellington-townhouse-second-home-2024-10-23-investment-4.jpg
touch public/articles/palm-beach-gardens-penthouse-luxury-2024-10-23-lifestyle-5.jpg
```

---

## 📈 **SEO Optimization**

### **URL Structure:**
```
/articles/boca-raton-condo-55-plus-wycliffe-success-story
/areas/boca-raton
/developments/boca-raton-country-club
```

### **Image Alt Text:**
```html
<!-- Auto-generated from naming convention -->
<img alt="Boca Raton condo success story for 55+ buyers at Wycliffe Golf & Country Club" />
<img alt="Delray Beach single family vacation home for families" />
<img alt="Lake Worth villa golf retirement story for 55+ buyers" />
```

### **Meta Descriptions:**
```html
<!-- Auto-generated from frontmatter -->
<meta name="description" content="How Cheryl and Eddie found their perfect retirement lifestyle at Wycliffe Golf & Country Club." />
```

---

## 🔧 **Content Association Benefits**

### **Automatic Relationships:**
- **Same area** → All Boca Raton content linked
- **Same property type** → All condo content linked
- **Same buyer segment** → All 55+ buyer content linked
- **Same tags** → Related content automatically discovered
- **Same developments** → Community-specific content linked

### **Smart Recommendations:**
- **"Readers who viewed this also liked..."**
- **"Similar success stories in your area..."**
- **"Other properties in this community..."**
- **"Related market insights..."**

---

## 📋 **Content Creation Checklist**

### **Before Creating Content:**
- [ ] **Choose primary area** (boca-raton, delray-beach, etc.)
- [ ] **Select property type** (condo, single-family, villa, etc.)
- [ ] **Identify buyer segment** (55-plus, family, investor, etc.)
- [ ] **Create unique identifier** (descriptive, memorable)
- [ ] **Plan image requirements** (hero, property, lifestyle)

### **During Content Creation:**
- [ ] **Follow naming convention** exactly
- [ ] **Use standard tags** from the list
- [ ] **Include all required metadata**
- [ ] **Create corresponding images**
- [ ] **Test content associations**

### **After Content Creation:**
- [ ] **Verify automatic associations** work
- [ ] **Check image loading** and optimization
- [ ] **Test user journey** targeting
- [ ] **Validate SEO** optimization
- [ ] **Monitor performance** metrics

---

## 🎯 **Ready for Scale**

This naming convention system supports:
- ✅ **10+ articles per day** with consistent structure
- ✅ **Automatic content associations** based on naming patterns
- ✅ **SEO optimization** through descriptive URLs
- ✅ **Image management** with clear organization
- ✅ **Content discovery** through smart relationships
- ✅ **Scalable workflow** for high-volume publishing

**This system will make your content creation process as efficient as a professional newsroom!** 🚀
