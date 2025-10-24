"use client";

import { useState, useEffect } from 'react';
import { contentService } from '@/lib/contentService';
import { Neighborhood, Development, Article } from '@/app/content/types';
import Link from 'next/link';
import Image from 'next/image';
import DevelopmentsSection from '@/app/components/DevelopmentsSection';

interface NeighborhoodPageProps {
  params: {
    slug: string;
  };
}

export default function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
  const [developments, setDevelopments] = useState<Development[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNeighborhoodContent = async () => {
      try {
        const foundContent = await contentService.getContentBySlug(params.slug, 'neighborhood');
        const foundNeighborhood = foundContent && foundContent.type === 'neighborhood' ? foundContent as Neighborhood : null;
        
        if (!foundNeighborhood) {
          setLoading(false);
          return;
        }

        setNeighborhood(foundNeighborhood);

        // Load developments for this neighborhood
        const neighborhoodDevelopments = await contentService.getDevelopments(foundNeighborhood.area, foundNeighborhood.id);
        setDevelopments(neighborhoodDevelopments);

        // Load articles for this area
        const areaArticles = await contentService.getArticles(foundNeighborhood.area);
        setArticles(areaArticles);

        setLoading(false);
      } catch (error) {
        console.error('Error loading neighborhood content:', error);
        setLoading(false);
      }
    };

    loadNeighborhoodContent();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-champagne mx-auto mb-4"></div>
          <p className="text-lg text-ink-soft">Loading {params.slug}...</p>
        </div>
      </div>
    );
  }

  if (!neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="h1 text-deep mb-4">Neighborhood Not Found</h1>
          <p className="lead text-ink-soft mb-8">The neighborhood you're looking for doesn't exist.</p>
          <Link href="/areas" className="btn-primary">
            Back to Areas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-deep via-deep/95 to-champagne/20">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="h1 text-white mb-8">{neighborhood.name}</h1>
                <p className="lead text-white/90 mb-8">{neighborhood.description}</p>
                
                {/* Target Segments */}
                {neighborhood.targetSegments && neighborhood.targetSegments.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {neighborhood.targetSegments.map((segment) => (
                      <span
                        key={segment}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                      >
                        {segment.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={neighborhood.imageSrc || '/neighborhoods/default.jpg'}
                    alt={neighborhood.name || 'Neighborhood'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developments Section */}
      {developments.length > 0 && (
        <DevelopmentsSection areaId={neighborhood.area} />
      )}

      {/* Articles Section */}
      {articles.length > 0 && (
        <section className="py-20 bg-surface-subtle">
          <div className="section">
            <div className="max-w-6xl mx-auto">
              <h2 className="h2 text-deep mb-12 text-center">Local Insights in {neighborhood.name}</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="card p-6 group hover:shadow-lg transition-all duration-300 block"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                      <Image
                        src={article.imageSrc || '/articles/default.jpg'}
                        alt={article.title || 'Article'}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <h3 className="h3 text-deep mb-4 group-hover:text-champagne transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="body text-ink-soft mb-6">{article.excerpt}</p>
                    
                    <div className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body">
                      Read Story
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-deep text-white">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="h1 text-white mb-8">Ready to Explore {neighborhood.name}?</h2>
            <p className="lead text-white/90 mb-12">
              Let Rachel help you find the perfect property in {neighborhood.name} that matches your lifestyle and needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="btn-primary px-8 py-4 text-xl"
              >
                Get Personalized Guidance
              </Link>
              <a
                href="tel:+15612878966"
                className="btn-secondary px-8 py-4 text-xl"
              >
                Call (561) 287-8966
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
