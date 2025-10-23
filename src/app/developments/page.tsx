import { ContentService } from '@/lib/contentService';
import { DynamicDevelopments } from '@/app/components/DynamicContent';
import { TargetSegment } from '@/app/content/types';

interface DevelopmentsPageProps {
  searchParams: {
    segment?: string;
    amenity?: string;
  };
}

export default function DevelopmentsPage({ searchParams }: DevelopmentsPageProps) {
  const segment = searchParams.segment as TargetSegment | undefined;
  const amenity = searchParams.amenity;
  
  const developments = ContentService.getDevelopments({ 
    targetSegment: segment,
    amenity: amenity as any,
    featured: true,
    limit: 12 
  });

  const segmentInfo = segment ? {
    '55-plus-cash-buyer': 'Active Adult Communities',
    'second-home-buyer': 'Vacation & Second Home Developments',
    'family': 'Family-Friendly Communities',
    'professional': 'Urban Living Developments',
    'investor': 'Investment Properties',
    'relocating': 'Relocation Communities',
    'upgrade-downgrade': 'Home Transition Options'
  }[segment] : null;

  const amenityInfo = amenity ? {
    'golf': 'Golf Communities',
    'country-club': 'Country Club Living',
    'pickleball': 'Pickleball Communities',
    'tennis': 'Tennis Communities',
    'pool': 'Pool Communities',
    'gym': 'Fitness Communities'
  }[amenity] : null;

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-paper to-surface-subtle">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 text-deep mb-6">
              {amenityInfo || segmentInfo || 'South Florida Communities'}
            </h1>
            <p className="lead mb-8 text-ink-soft">
              {amenityInfo 
                ? `Discover communities with ${amenityInfo.toLowerCase()} in South Florida`
                : segmentInfo 
                ? `Explore the best ${segmentInfo.toLowerCase()} in South Florida`
                : 'Explore luxury communities and developments across South Florida'
              }
            </p>
            {!segment && !amenity && (
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/developments?amenity=golf" className="btn-ghost">Golf Communities</a>
                <a href="/developments?amenity=country-club" className="btn-ghost">Country Clubs</a>
                <a href="/developments?amenity=pickleball" className="btn-ghost">Active Adult</a>
                <a href="/developments?amenity=tennis" className="btn-ghost">Tennis Communities</a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Developments Grid */}
      <section className="py-20">
        <div className="section">
          <DynamicDevelopments 
            targetSegment={segment}
            limit={12}
            randomize={true}
            showImages={true}
          />
        </div>
      </section>

      {/* Amenities Filter */}
      {!amenity && (
        <section className="py-20 bg-surface-subtle">
          <div className="section">
            <div className="text-center mb-16">
              <h2 className="h2 text-deep mb-4">Browse by Amenities</h2>
              <p className="body-large text-ink-soft max-w-2xl mx-auto">
                Find communities with the amenities that matter most to you
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { key: 'golf', label: 'Golf Communities', description: 'Championship golf courses' },
                { key: 'country-club', label: 'Country Club Living', description: 'Exclusive club amenities' },
                { key: 'pickleball', label: 'Pickleball Communities', description: 'Active adult recreation' },
                { key: 'tennis', label: 'Tennis Communities', description: 'Tennis courts and programs' },
                { key: 'pool', label: 'Pool Communities', description: 'Resort-style pools' },
                { key: 'gym', label: 'Fitness Centers', description: 'State-of-the-art gyms' }
              ].map((amenity) => (
                <a
                  key={amenity.key}
                  href={`/developments?amenity=${amenity.key}`}
                  className="card p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <h3 className="h3 text-deep group-hover:text-champagne transition-colors">
                    {amenity.label}
                  </h3>
                  <p className="mt-3 body text-ink-soft">{amenity.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-deep">
        <div className="section text-center">
          <h2 className="h2 text-white mb-6">Ready to Explore Communities?</h2>
          <p className="body-large text-white/90 mb-10 max-w-2xl mx-auto">
            Let Rachel guide you through the best communities and help you find your perfect home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-gold">
              Schedule a Tour
            </a>
            <a href="tel:+15612878966" className="btn-ghost border-white text-white hover:bg-white hover:text-deep">
              Call (561) 287-8966
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
