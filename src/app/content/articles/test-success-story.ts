import { Article } from '../types';
import { createArticle } from './helpers';

export const TEST_SUCCESS_STORY: Article = createArticle({
  id: 'test-success-story',
  title: 'Test Success Story: How Rachel Helped a Family Find Their Dream Home',
  slug: 'test-success-story',
  excerpt: 'A test success story to verify our content workflow is working properly.',
  content: `# Test Success Story

This is a test article to verify our content creation workflow is working properly.

## The Challenge

The Johnson family was looking for their perfect home in South Florida but felt overwhelmed by the process.

## The Solution

Rachel provided expert guidance and found them exactly what they needed.

## The Result

The Johnsons are now happily settled in their new home and couldn't be more pleased with Rachel's service.

*"Rachel made the entire process so smooth and stress-free. We couldn't have done it without her!"* - The Johnson Family

## Key Takeaways

- Expert guidance makes all the difference
- Local knowledge is invaluable
- Professional service pays off

This test article demonstrates our content workflow is functioning correctly.`,
  author: 'Rachel Kovalsky',
  publishDate: '2024-10-23',
  imageSrc: '/articles/test-success-story.jpg',
  featured: false,
  areas: ['boca-raton'],
  developments: [],
  targetSegments: ['professional'],
  tags: ['test', 'success-story', 'workflow-test'],
  storyType: 'success-story',
  clientProfile: {
    ageRange: '35-45',
    origin: 'Test Location',
    buyerType: 'first-time buyer',
    familyStructure: 'young family'
  },
  propertyDetails: {
    development: 'Test Community',
    propertyType: 'single-family',
    priceRange: '$500,000-$600,000'
  },
  adSource: 'test-workflow'
});
