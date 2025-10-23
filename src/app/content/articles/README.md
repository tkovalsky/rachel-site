# Articles Directory Structure

## Overview
This directory contains all article content organized by type and topic. Each article is its own file for better maintainability and scalability.

## Directory Structure
```
src/app/content/articles/
├── index.ts                    # Main export file that combines all articles
├── template.ts                # Template for creating new success stories
├── wycliffe-success-story.ts  # Individual success story
├── grinkevich-story.ts        # Future success story
└── README.md                  # This file
```

## Adding New Articles

### 1. Success Stories
1. Copy `template.ts` to `your-story-name.ts`
2. Fill in all the details following the template
3. Add the import to `index.ts`
4. Update any related areas/developments

### 2. Regular Articles
1. Create new file: `article-name.ts`
2. Follow the Article interface from `types.ts`
3. Add to `index.ts` imports
4. Update related content

## File Naming Convention
- Use kebab-case: `wycliffe-success-story.ts`
- Be descriptive: `grinkevich-family-vacation-home.ts`
- Include story type: `success-story`, `area-guide`, etc.

## Content Guidelines

### Success Stories
- Follow the structure in `STORY_TEMPLATE_SOP.md`
- Include client quotes and specific details
- Focus on Rachel's expertise and support
- End with call to action for similar clients
- 800-1200 words total

### SEO Requirements
- Title includes location and buyer type
- Meta description under 160 characters
- Proper heading structure (H1, H2, H3)
- Include target keywords naturally
- Internal links to related content

### Content Interconnections
- Link to relevant areas and developments
- Use tags for categorization
- Add relatedStories for cross-references
- Include adSource for lead tracking

## Benefits of This Structure

### Scalability
- Easy to add new articles without cluttering one file
- Individual files are easier to manage
- Better version control and collaboration
- Clear separation of concerns

### Maintainability
- Each article is self-contained
- Easy to find and edit specific content
- Template ensures consistency
- Clear documentation and guidelines

### Performance
- Only load articles that are needed
- Better tree-shaking in production
- Easier to implement lazy loading
- Reduced bundle size

## Future Enhancements
- Automated article generation from Google Sheets
- Content validation and testing
- SEO optimization tools
- Performance monitoring
- A/B testing for different versions

This structure supports the growth from a few articles to hundreds while maintaining organization and performance! 🚀
