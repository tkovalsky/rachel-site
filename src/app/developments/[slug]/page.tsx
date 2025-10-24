"use client";

import { useState, useEffect } from 'react';
import { contentService } from '@/lib/contentService';
import { Development, Article } from '@/app/content/types';
import Link from 'next/link';
import Image from 'next/image';

interface DevelopmentPageProps {
  params: {
    slug: string;
  };
}

export default function DevelopmentPage({ params }: DevelopmentPageProps) {
  const [development, setDevelopment] = useState<Development | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevelopmentContent = async () => {
      try {
        const foundContent = await contentService.getContentBySlug(params.slug, 'development');
        const foundDevelopment = foundContent && foundContent.type === 'development' ? foundContent as Development : null;
        
        if (!foundDevelopment) {
          setLoading(false);
          return;
        }

        setDevelopment(foundDevelopment);

        // Load articles for this development
        const developmentArticles = await contentService.getArticles(foundDevelopment.area);
        setArticles(developmentArticles);

        setLoading(false);
      } catch (error) {
        console.error('Error loading development content:', error);
        setLoading(false);
      }
    };

    loadDevelopmentContent();
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

  if (!development) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="h1 text-deep mb-4">Development Not Found</h1>
          <p className="lead text-ink-soft mb-8">The development you're looking for doesn't exist.</p>
          <Link href="/developments" className="btn-primary">
            Back to Developments
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
                <h1 className="h1 text-white mb-8">{development.name}</h1>
                <p className="lead text-white/90 mb-8">{development.description}</p>
                
                {/* Price Range */}
                {development.priceRange && (
                  <div className="text-3xl font-bold text-white mb-8">
                    ${development.priceRange.min.toLocaleString()} - ${development.priceRange.max.toLocaleString()}
                  </div>
                )}
                
                {/* Target Segments */}
                {development.targetSegments && development.targetSegments.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {development.targetSegments.map((segment) => (
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
                    src={development.imageSrc || '/developments/default.jpg'}
                    alt={development.name || 'Development'}
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

      {/* Amenities Section */}
      {development.amenities && development.amenities.length > 0 && (
        <section className="py-20 bg-white">
          <div className="section">
            <div className="max-w-6xl mx-auto">
              <h2 className="h2 text-deep mb-12 text-center">Amenities & Features</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {development.amenities.map((amenity) => (
                  <div key={amenity} className="card p-6 text-center">
                    <div className="w-12 h-12 bg-champagne/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏊</span>
                    </div>
                    <h3 className="h3 text-deep mb-2">{amenity.replace('-', ' ')}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Related Articles Section */}
      {articles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="section">
            <div className="max-w-6xl mx-auto">
              <h2 className="h2 text-deep mb-12 text-center">Local Insights & Success Stories</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(0, 3).map((article) => (
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
            <h2 className="h1 text-white mb-8">Ready to Explore {development.name}?</h2>
            <p className="lead text-white/90 mb-12">
              Let Rachel help you find the perfect home in {development.name} and guide you through the buying process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="btn-primary px-8 py-4 text-xl"
              >
                Schedule a Tour
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
