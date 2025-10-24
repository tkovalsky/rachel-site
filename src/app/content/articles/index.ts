import { Article } from '../types';

// Import existing articles from the main articles file
import { ARTICLES as existingArticles } from '../articles';

// Combine all articles
export const ALL_ARTICLES: Article[] = [
  ...existingArticles
];

// Export the combined array as the default
export default ALL_ARTICLES;
