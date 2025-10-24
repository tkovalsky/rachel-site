"use client";
import { useState, useEffect } from 'react';
import { MarkdownContentService } from '@/lib/markdownContentService';
import { Area, Development, Article, TargetSegment } from '@/app/content/types';
import Link from 'next/link';
import Image from 'next/image';

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
  const [selectedSegment, setSelectedSegment] = useState<TargetSegment | 'all'>('all');

  useEffect(() => {
    const loadAreaContent = async () => {
      setLoading(true);
      
      try {
        // Get the specific area
        const allAreas = MarkdownContentService.getAreas();
        const foundArea = allAreas.find(a => a.slug === params.slug);
        
        if (!foundArea) {
          console.error('Area not found:', params.slug);
          setLoading(false);
          return;
        }
        
        setArea(foundArea);

        // Get developments in this area
        const allDevelopments = MarkdownContentService.getDevelopments();
        const areaDevelopments = allDevelopments.filter(dev => 
          dev.area === foundArea.id
        );
        setDevelopments(areaDevelopments);

        // Get articles related to this area
        const allArticles = MarkdownContentService.getAllArticles();
        const areaArticles = allArticles.filter(article => 
          article.areas.includes(foundArea.id)
        );
        setArticles(areaArticles);

      } catch (error) {
        console.error('Error loading area content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAreaContent();
  }, [params.slug]);

  const handleSegmentChange = (segment: TargetSegment | 'all') => {
    setSelectedSegment(segment);
  };

  const getFilteredContent = () => {
    if (selectedSegment === 'all') {
      return { developments, articles };
    }

    const filteredDevelopments = developments.filter(dev => 
      dev.targetSegments.includes(selectedSegment)
    );
    
    const filteredArticles = articles.filter(article => 
      article.targetSegments.includes(selectedSegment)
    );

    return { 
      developments: filteredDevelopments, 
      articles: filteredArticles 
    };
  };

  const { developments: filteredDevelopments, articles: filteredArticles } = getFilteredContent();

  if (loading) {
    return (
      <main className="min-h-screen bg-paper">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-champagne border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-ink-soft">Loading {params.slug}...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!area) {
    return (
      <main className="min-h-screen bg-paper">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-deep mb-4">Area Not Found</h1>
            <p className="text-xl text-ink-soft mb-8">The area you're looking for doesn't exist.</p>
            <Link href="/areas" className="btn-primary">
              Browse All Areas
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-paper to-surface-subtle">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-deep mb-6">
                  {area.name}
                </h1>
                <p className="text-2xl md:text-3xl text-ink-soft leading-relaxed mb-8">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {area.targetSegments.map((segment) => (
                    <span
                      key={segment}
                      className="px-4 py-2 text-lg bg-champagne/10 text-champagne rounded-full font-semibold"
                    >
                      {segment.replace('-', ' ')}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#developments" className="btn-primary text-xl px-8 py-4">
                    View Developments
                  </a>
                  <a href="#articles" className="btn-ghost text-xl px-8 py-4">
                    Read Local Insights
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={area.imageSrc}
                  alt={`${area.name} neighborhood`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-deep mb-2">Filter by Target Segment</h2>
                <p className="text-xl text-ink-soft">Find content tailored to your needs</p>
              </div>
              
              {selectedSegment !== 'all' && (
                <button
                  onClick={() => setSelectedSegment('all')}
                  className="px-6 py-3 text-xl font-semibold text-champagne border-2 border-champagne rounded-xl hover:bg-champagne hover:text-white transition-colors"
                >
                  Show All Content
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleSegmentChange('all')}
                className={`px-6 py-3 text-xl font-semibold rounded-xl transition-colors ${
                  selectedSegment === 'all'
                    ? 'bg-champagne text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Segments
              </button>
              {area.targetSegments.map((segment) => (
                <button
                  key={segment}
                  onClick={() => handleSegmentChange(segment)}
                  className={`px-6 py-3 text-xl font-semibold rounded-xl transition-colors ${
                    selectedSegment === segment
                      ? 'bg-champagne text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {segment.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developments Section */}
      <section id="developments" className="py-20">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-deep mb-8">
              Developments in {area.name}
            </h2>
            
            {filteredDevelopments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDevelopments.map((development) => (
                  <Link
                    key={development.id}
                    href={`/developments/${development.slug}`}
                    className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={development.imageSrc}
                        alt={`${development.name} development`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-3xl md:text-4xl font-bold text-deep group-hover:text-champagne transition-colors mb-4">
                        {development.name}
                      </h3>
                      <p className="text-xl md:text-2xl text-ink-soft leading-relaxed mb-4">
                        {development.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {development.amenities.slice(0, 3).map((amenity) => (
                          <span
                            key={amenity}
                            className="px-3 py-1 text-sm bg-champagne/10 text-champagne rounded-full font-medium"
                          >
                            {amenity.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                      <div className="text-2xl font-bold text-deep">
                        ${development.priceRange.min.toLocaleString()} - ${development.priceRange.max.toLocaleString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-deep mb-4">No Developments Found</h3>
                <p className="text-xl text-ink-soft mb-8">
                  {selectedSegment === 'all' 
                    ? `No developments found in ${area.name} yet.`
                    : `No developments found in ${area.name} for ${selectedSegment.replace('-', ' ')} buyers.`
                  }
                </p>
                <button
                  onClick={() => setSelectedSegment('all')}
                  className="px-8 py-4 text-xl font-semibold text-white bg-champagne rounded-xl hover:bg-champagne/90 transition-colors"
                >
                  Show All Content
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 bg-surface-subtle">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-deep mb-8">
              Local Insights About {area.name}
            </h2>
            
            {filteredArticles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-3xl md:text-4xl font-bold text-deep group-hover:text-champagne transition-colors mb-4">
                        {article.title}
                      </h3>
                      <p className="text-xl md:text-2xl text-ink-soft leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-ink-lighter">
                          {new Date(article.publishDate).toLocaleDateString()}
                        </span>
                        <span className="text-lg font-semibold text-champagne">Read More →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-deep mb-4">No Articles Found</h3>
                <p className="text-xl text-ink-soft mb-8">
                  {selectedSegment === 'all' 
                    ? `No articles found about ${area.name} yet.`
                    : `No articles found about ${area.name} for ${selectedSegment.replace('-', ' ')} buyers.`
                  }
                </p>
                <button
                  onClick={() => setSelectedSegment('all')}
                  className="px-8 py-4 text-xl font-semibold text-white bg-champagne rounded-xl hover:bg-champagne/90 transition-colors"
                >
                  Show All Content
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep">
        <div className="section text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Interested in {area.name}?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Rachel's local expertise can help you find the perfect home in {area.name}. Get personalized guidance on neighborhoods, developments, and market conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary text-xl px-8 py-4">
              Get Personalized Guidance
            </a>
            <a href="tel:+15612878966" className="btn-ghost text-xl px-8 py-4">
              Call (561) 287-8966
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
