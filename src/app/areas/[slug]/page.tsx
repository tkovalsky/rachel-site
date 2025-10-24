"use client";

import { useState, useEffect } from 'react';
import { MarkdownContentService } from '@/lib/markdownContentService';
import { Area, Development, Article } from '@/app/content/types';
import Link from 'next/link';
import Image from 'next/image';
import DevelopmentsSection from '@/app/components/DevelopmentsSection';

interface AreaPageProps {
  params: {
    slug: string;
  };
}

export default function AreaPage({ params }: AreaPageProps) {
  const [area, setArea] = useState<Area | null>(null);
  const [developments, setDevelopments] = useState<Development[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAreaContent = async () => {
      try {
        const allAreas = MarkdownContentService.getAreas();
        const foundArea = allAreas.find(a => a.slug === params.slug);
        
        if (!foundArea) {
          setLoading(false);
          return;
        }

        setArea(foundArea);

        // Load developments for this area
        const allDevelopments = MarkdownContentService.getDevelopments();
        const areaDevelopments = allDevelopments.filter(dev => dev.area === foundArea.id);
        setDevelopments(areaDevelopments);

        // Load articles for this area
        const allArticles = MarkdownContentService.getAllArticles();
        const areaArticles = allArticles.filter(article => 
          article.areas.includes(foundArea.id)
        );
        setArticles(areaArticles);

        setLoading(false);
      } catch (error) {
        console.error('Error loading area content:', error);
        setLoading(false);
      }
    };

    loadAreaContent();
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

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="h1 text-deep mb-4">Area Not Found</h1>
          <p className="lead text-ink-soft mb-8">The area you're looking for doesn't exist.</p>
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
                <h1 className="h1 text-white mb-8">{area.name}</h1>
                <p className="lead text-white/90 mb-8">{area.description}</p>
                
                {/* Target Segments */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {area.targetSegments.map((segment) => (
                    <span
                      key={segment}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                    >
                      {segment.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={area.imageSrc || '/areas/default.jpg'}
                    alt={area.name}
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

      {/* Neighborhoods Section */}
      <section className="py-20 bg-white">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <h2 className="h2 text-deep mb-12 text-center">Neighborhoods in {area.name}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example neighborhoods - you can make this dynamic later */}
              <div className="card p-6">
                <h3 className="h3 text-deep mb-4">East {area.name}</h3>
                <p className="body text-ink-soft mb-4">
                  Coastal living with easy beach access and waterfront properties.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full">waterfront</span>
                  <span className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full">beach access</span>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="h3 text-deep mb-4">West {area.name}</h3>
                <p className="body text-ink-soft mb-4">
                  Family-friendly neighborhoods with excellent schools and parks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full">family-friendly</span>
                  <span className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full">schools</span>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="h3 text-deep mb-4">Downtown {area.name}</h3>
                <p className="body text-ink-soft mb-4">
                  Urban living with restaurants, shopping, and cultural attractions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full">urban</span>
                  <span className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full">dining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developments Section */}
      {developments.length > 0 && (
        <DevelopmentsSection areaId={area.id} />
      )}

      {/* Articles Section */}
      {articles.length > 0 && (
        <section className="py-20 bg-surface-subtle">
          <div className="section">
            <div className="max-w-6xl mx-auto">
              <h2 className="h2 text-deep mb-12 text-center">Success Stories in {area.name}</h2>
              
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
                        alt={article.title}
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
            <h2 className="h1 text-white mb-8">Ready to Explore {area.name}?</h2>
            <p className="lead text-white/90 mb-12">
              Let Rachel help you find the perfect property in {area.name} that matches your lifestyle and needs.
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