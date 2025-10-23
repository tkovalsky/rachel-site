import { Article } from '../types';

// Import all articles
import { wycliffeSuccessStory } from './wycliffe-success-story';
import { TEST_SUCCESS_STORY } from './test-success-story';

// Import existing articles from the main articles file
import { ARTICLES as existingArticles } from '../articles';

// Combine all articles
export const ALL_ARTICLES: Article[] = [
  ...existingArticles,
  wycliffeSuccessStory,
  TEST_SUCCESS_STORY
];

// Export individual articles for easy access
export { wycliffeSuccessStory, TEST_SUCCESS_STORY };

// Export the combined array as the default
export default ALL_ARTICLES;
