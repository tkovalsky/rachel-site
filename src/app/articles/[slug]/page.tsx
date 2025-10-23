import { ALL_ARTICLES } from '@/app/content/articles/index';
import ArticlePage from '@/app/components/ArticlePage';

// ✅ make the function async and await params
export default async function ArticlePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ unwrap the Promise

  const article = ALL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Article not found. Check your slug or create a new entry in articles.
      </div>
    );
  }

  return <ArticlePage article={article} />;
}

// Optional for static generation (recommended)
export function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ slug: a.slug }));
}
// Force rebuild Thu Oct 23 16:25:15 EDT 2025
