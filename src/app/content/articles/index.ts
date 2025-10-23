import { Article } from '../types';

// Import all articles
import { wycliffeSuccessStory } from './wycliffe-success-story';

// Import existing articles from the main articles file
import { ARTICLES as existingArticles } from '../articles';

// Combine all articles
export const ALL_ARTICLES: Article[] = [
  ...existingArticles,
  wycliffeSuccessStory
];

// Export individual articles for easy access
export { wycliffeSuccessStory };

// Export the combined array as the default
export default ALL_ARTICLES;
