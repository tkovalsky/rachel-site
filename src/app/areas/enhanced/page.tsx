"use client";
import { useState, useEffect } from 'react';
// import { contentService } from '@/lib/contentService';
import { MarkdownContentService } from '@/lib/markdownContentService';
// import { DynamicAreas, DynamicDevelopments, DynamicArticles } from '@/app/components/DynamicContent';
import { TargetSegment, Area, Development, Article } from '@/app/content/types';
import Link from 'next/link';

interface FilterState {
  targetSegment: TargetSegment | 'all';
  contentType: 'areas' | 'developments' | 'articles' | 'all';
  featured: boolean | 'all';
}

const TARGET_SEGMENTS = [
  { value: 'all', label: 'All Segments' },
  { value: '55-plus-cash-buyer', label: '55+ Cash Buyers' },
  { value: 'second-home-buyer', label: 'Second Home Buyers' },
  { value: 'family', label: 'Families' },
  { value: 'professional', label: 'Professionals' },
  { value: 'investor', label: 'Investors' },
  { value: 'relocating', label: 'Relocating' },
  { value: 'upgrade-downgrade', label: 'Upgrade/Downgrade' }
] as const;

const CONTENT_TYPES = [
  { value: 'all', label: 'All Content' },
  { value: 'areas', label: 'Areas' },
  { value: 'developments', label: 'Developments' },
  { value: 'articles', label: 'Articles' }
] as const;

const FEATURED_OPTIONS = [
  { value: 'all', label: 'All Items' },
  { value: true, label: 'Featured Only' },
  { value: false, label: 'All Items' }
] as const;

export default function EnhancedAreasPage() {
  const [filters, setFilters] = useState<FilterState>({
    targetSegment: 'all',
    contentType: 'all',
    featured: 'all'
  });

  const [areas, setAreas] = useState<Area[]>([]);
  const [developments, setDevelopments] = useState<Development[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Load content based on filters
  useEffect(() => {
    const loadContent = () => {
      setLoading(true);
      
      try {
        // Load areas
        const areaFilter = {
          targetSegment: filters.targetSegment !== 'all' ? filters.targetSegment : undefined,
          featured: filters.featured !== 'all' ? filters.featured : undefined,
          limit: 12,
          randomize: true
        };
        const loadedAreas = MarkdownContentService.getAreas(areaFilter);

        // Load developments
        const developmentFilter = {
          targetSegment: filters.targetSegment !== 'all' ? filters.targetSegment : undefined,
          featured: filters.featured !== 'all' ? filters.featured : undefined,
          limit: 12,
          randomize: true
        };
        const loadedDevelopments = MarkdownContentService.getDevelopments(developmentFilter);

        // Load articles
        const _articleFilter = {
          targetSegment: filters.targetSegment !== 'all' ? filters.targetSegment : undefined,
          featured: filters.featured !== 'all' ? filters.featured : undefined,
          limit: 12,
          randomize: true
        };
        const loadedArticles = MarkdownContentService.getAllArticles().filter(article => {
          let matches = true;
          
          if (filters.targetSegment !== 'all') {
            matches = matches && (article.targetSegments?.includes(filters.targetSegment) || false);
          }
          
          if (filters.featured !== 'all') {
            matches = matches && article.featured === filters.featured;
          }
          
          return matches;
        }).slice(0, 12);

        setAreas(loadedAreas);
        setDevelopments(loadedDevelopments);
        setArticles(loadedArticles);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadContent();
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters(prev => ({
      ...prev,
      [key]: value as FilterState[keyof FilterState]
    }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.targetSegment !== 'all') count++;
    if (filters.contentType !== 'all') count++;
    if (filters.featured !== 'all') count++;
    return count;
  };

  const clearAllFilters = () => {
    setFilters({
      targetSegment: 'all',
      contentType: 'all',
      featured: 'all'
    });
  };

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-paper to-surface-subtle">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-deep mb-6">
              South Florida Areas & Communities
            </h1>
            <p className="text-2xl md:text-3xl text-ink-soft leading-relaxed mb-8">
              Discover the perfect neighborhood for your lifestyle. Filter by your needs and explore areas, developments, and local insights.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-deep mb-2">Filter Content</h2>
                <p className="text-lg text-ink-soft">Find exactly what you're looking for</p>
              </div>
              
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 text-lg font-semibold text-champagne border-2 border-champagne rounded-xl hover:bg-champagne hover:text-white transition-colors"
                >
                  Clear All Filters ({getActiveFilterCount()})
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Target Segment Filter */}
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-4">
                  Target Segment
                </label>
                <select
                  value={filters.targetSegment}
                  onChange={(e) => handleFilterChange('targetSegment', e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-champagne focus:outline-none transition-colors bg-white"
                >
                  {TARGET_SEGMENTS.map(segment => (
                    <option key={segment.value} value={segment.value}>
                      {segment.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Type Filter */}
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-4">
                  Content Type
                </label>
                <select
                  value={filters.contentType}
                  onChange={(e) => handleFilterChange('contentType', e.target.value)}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-champagne focus:outline-none transition-colors bg-white"
                >
                  {CONTENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-4">
                  Featured Status
                </label>
                <select
                  value={String(filters.featured)}
                  onChange={(e) => handleFilterChange('featured', e.target.value === 'true' ? true : e.target.value === 'false' ? false : 'all')}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-champagne focus:outline-none transition-colors bg-white"
                >
                  {FEATURED_OPTIONS.map(option => (
                    <option key={String(option.value)} value={String(option.value)}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-champagne border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-xl text-ink-soft">Loading content...</p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Areas Section */}
                {(filters.contentType === 'all' || filters.contentType === 'areas') && areas.length > 0 && (
                  <div>
                    <h2 className="text-4xl font-bold text-deep mb-8">Areas & Neighborhoods</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                      {areas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/areas/${area.slug}`}
                          className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                              src={area.imageSrc}
                              alt={`${area.name} neighborhood`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-8">
                            <h3 className="text-3xl md:text-4xl font-bold text-deep group-hover:text-champagne transition-colors mb-4">
                              {area.name}
                            </h3>
                            <p className="text-xl md:text-2xl text-ink-soft leading-relaxed mb-4">
                              {area.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {area.targetSegments?.map((segment) => (
                                <span
                                  key={segment}
                                  className="px-3 py-1 text-sm bg-champagne/10 text-champagne rounded-full font-medium"
                                >
                                  {segment.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Developments Section */}
                {(filters.contentType === 'all' || filters.contentType === 'developments') && developments.length > 0 && (
                  <div>
                    <h2 className="text-4xl font-bold text-deep mb-8">Developments & Communities</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                      {developments.map((development) => (
                        <Link
                          key={development.id}
                          href={`/developments/${development.slug}`}
                          className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                              src={development.imageSrc}
                              alt={`${development.name} development`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                              {development.amenities?.slice(0, 3).map((amenity) => (
                                <span
                                  key={amenity}
                                  className="px-3 py-1 text-sm bg-champagne/10 text-champagne rounded-full font-medium"
                                >
                                  {amenity.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                            <div className="text-2xl font-bold text-deep">
                              {development.priceRange ? 
                                `$${development.priceRange.min.toLocaleString()} - $${development.priceRange.max.toLocaleString()}` :
                                'Price on request'
                              }
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles Section */}
                {(filters.contentType === 'all' || filters.contentType === 'articles') && articles.length > 0 && (
                  <div>
                    <h2 className="text-4xl font-bold text-deep mb-8">Local Insights & Articles</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                      {articles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/articles/${article.slug}`}
                          className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                              src={article.imageSrc}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                                {article.publishDate ? new Date(article.publishDate).toLocaleDateString() : 'Recent'}
                              </span>
                              <span className="text-lg font-semibold text-champagne">Read More →</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {!loading && areas.length === 0 && developments.length === 0 && articles.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-deep mb-4">No Content Found</h3>
                    <p className="text-xl text-ink-soft mb-8">
                      Try adjusting your filters to see more results.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-8 py-4 text-lg font-semibold text-white bg-champagne rounded-xl hover:bg-champagne/90 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-subtle">
        <div className="section text-center">
          <h2 className="text-4xl font-bold text-deep mb-6">Need Help Finding the Perfect Area?</h2>
          <p className="text-xl text-ink-soft mb-10 max-w-3xl mx-auto">
            Rachel's local expertise can help you find the perfect neighborhood for your lifestyle and needs
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
