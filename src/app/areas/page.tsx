"use client";

import { useState, useEffect } from 'react';
import { contentService } from '@/lib/contentService';
import { Area, Development, Article, TargetSegment } from '@/app/content/types';
import Link from 'next/link';
import Image from 'next/image';
import DynamicTagsFilter from '@/app/components/DynamicTagsFilter';
// import DevelopmentsSection from '@/app/components/DevelopmentsSection';

interface FilterState {
  targetSegment: string;
  contentType: string;
  featuredStatus: string;
}

export default function AreasPage() {
  const [filters, setFilters] = useState<FilterState>({
    targetSegment: 'all',
    contentType: 'all',
    featuredStatus: 'all'
  });

  const [areas, setAreas] = useState<Area[]>([]);
  const [developments, setDevelopments] = useState<Development[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Load content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const allAreas = await contentService.getAreas();
        const allDevelopments = await contentService.getDevelopments();
        const allArticles = await contentService.getArticles();

        // Alphabetize areas
        const sortedAreas = allAreas.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        
        setAreas(sortedAreas);
        setDevelopments(allDevelopments);
        setArticles(allArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error loading content:', error);
        setLoading(false);
      }
    };

    void loadContent();
  }, []);

  // Filter content based on current filters
  const filteredAreas = areas.filter(area => {
    if (filters.targetSegment !== 'all' && !area.targetSegments?.includes(filters.targetSegment as TargetSegment)) {
      return false;
    }
    if (filters.featuredStatus === 'featured' && !area.featured) {
      return false;
    }
    return true;
  });

  const filteredDevelopments = developments.filter(dev => {
    if (filters.targetSegment !== 'all' && !dev.targetSegments?.includes(filters.targetSegment as TargetSegment)) {
      return false;
    }
    if (filters.featuredStatus === 'featured' && !dev.featured) {
      return false;
    }
    return true;
  });

  const _filteredArticles = articles.filter(article => {
    if (filters.targetSegment !== 'all' && !article.targetSegments?.includes(filters.targetSegment as TargetSegment)) {
      return false;
    }
    if (filters.featuredStatus === 'featured' && !article.featured) {
      return false;
    }
    return true;
  });

  // Generate tag data for filter
  const targetSegments = [
    { id: '55-plus-cash-buyer', label: '55+ Cash Buyers', count: areas.filter(a => a.targetSegments?.includes('55-plus-cash-buyer')).length },
    { id: 'second-home-buyer', label: 'Second Home Buyers', count: areas.filter(a => a.targetSegments?.includes('second-home-buyer')).length },
    { id: 'family', label: 'Families', count: areas.filter(a => a.targetSegments?.includes('family')).length },
    { id: 'professional', label: 'Professionals', count: areas.filter(a => a.targetSegments?.includes('professional')).length },
    { id: 'investor', label: 'Investors', count: areas.filter(a => a.targetSegments?.includes('investor')).length },
    { id: 'relocating', label: 'Relocating', count: areas.filter(a => a.targetSegments?.includes('relocating')).length },
    { id: 'upgrade-downgrade', label: 'Upgrade/Downgrade', count: areas.filter(a => a.targetSegments?.includes('upgrade-downgrade')).length }
  ];

  const contentTypes = [
    { id: 'areas', label: 'Areas', count: areas.length },
    { id: 'developments', label: 'Developments', count: developments.length }
  ];

  const featuredStatus = [
    { id: 'featured', label: 'Featured Only', count: areas.filter(a => a.featured).length },
    { id: 'all', label: 'All Items', count: areas.length }
  ];

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-champagne mx-auto mb-4"></div>
          <p className="text-lg text-ink-soft">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-deep via-deep/95 to-champagne/20">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 text-white mb-8">South Florida Areas & Communities</h1>
            <p className="lead text-white/90 mb-12">
              Discover the perfect neighborhood for your lifestyle. Filter by your needs and explore areas, developments, and local insights.
            </p>
          </div>
        </div>
      </section>

      {/* Combined Filter & Content Section */}
      <section className="py-20 bg-surface-subtle">
        <div className="section">
          <div className="max-w-6xl mx-auto">
            {/* Filter Section */}
            <DynamicTagsFilter
              targetSegments={targetSegments}
              contentTypes={contentTypes}
              featuredStatus={featuredStatus}
              onFilterChange={handleFilterChange}
            />

            {/* Areas Section */}
            {filters.contentType === 'all' || filters.contentType === 'areas' ? (
              <div className="mb-20">
                <h2 className="h2 text-deep mb-12 text-center">Areas & Neighborhoods</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAreas.map((area) => (
                    <Link
                      key={area.id}
                      href={`/areas/${area.slug}`}
                      className="card p-6 group hover:shadow-lg transition-all duration-300 block"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={area.imageSrc || '/areas/default.jpg'}
                          alt={area.name || 'Area'}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <h3 className="h3 text-deep mb-4 group-hover:text-champagne transition-colors">
                        {area.name}
                      </h3>
                      
                      <p className="body text-ink-soft mb-6">{area.description}</p>
                      
                      {/* Target Segments */}
                      {area.targetSegments && area.targetSegments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {area.targetSegments.slice(0, 3).map((segment) => (
                          <span
                            key={segment}
                            className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full"
                          >
                            {segment.replace('-', ' ')}
                          </span>
                        ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Developments Section */}
            {filters.contentType === 'all' || filters.contentType === 'developments' ? (
              <div>
                <h2 className="h2 text-deep mb-12 text-center">Developments & Communities</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDevelopments.slice(0, 6).map((development) => (
                    <Link
                      key={development.id}
                      href={`/developments/${development.slug}`}
                      className="card p-6 group hover:shadow-lg transition-all duration-300 block"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={development.imageSrc || '/developments/default.jpg'}
                          alt={development.name || 'Development'}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <h3 className="h3 text-deep mb-4 group-hover:text-champagne transition-colors">
                        {development.name}
                      </h3>
                      
                      <p className="body text-ink-soft mb-4">{development.description}</p>
                      
                      {/* Amenities */}
                      {development.amenities && development.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {development.amenities.slice(0, 3).map((amenity) => (
                            <span
                              key={amenity}
                              className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full"
                            >
                              {amenity.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Price Range */}
                      <div className="text-2xl font-bold text-deep mb-4">
                        {development.priceRange ? 
                          `$${development.priceRange.min.toLocaleString()} - $${development.priceRange.max.toLocaleString()}` :
                          'Price on request'
                        }
                      </div>
                      
                      <div className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body">
                        View Development
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-deep text-white">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="h1 text-white mb-8">Need Help Choosing the Right Area?</h2>
            <p className="lead text-white/90 mb-12">
              Rachel's local expertise can help you find the perfect neighborhood for your lifestyle and needs
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