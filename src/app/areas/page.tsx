import { ContentService } from '@/lib/contentService';
import { DynamicAreas } from '@/app/components/DynamicContent';
import { TargetSegment } from '@/app/content/types';

interface AreasPageProps {
  searchParams: {
    segment?: string;
  };
}

export default function AreasPage({ searchParams }: AreasPageProps) {
  const segment = searchParams.segment as TargetSegment | undefined;
  
  const areas = ContentService.getAreas({ 
    targetSegment: segment,
    featured: true,
    limit: 12 
  });

  const segmentInfo = segment ? {
    '55-plus-cash-buyer': 'Active Adult Communities',
    'second-home-buyer': 'Vacation & Second Home Areas',
    'family': 'Family-Friendly Neighborhoods',
    'professional': 'Urban Living Areas',
    'investor': 'Investment Opportunities',
    'relocating': 'Relocation Destinations',
    'upgrade-downgrade': 'Home Transition Areas'
  }[segment] : null;

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-paper to-surface-subtle">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 text-deep mb-6">
              {segmentInfo ? segmentInfo : 'South Florida Areas'}
            </h1>
            <p className="lead mb-8 text-ink-soft">
              {segmentInfo 
                ? `Discover the best areas for ${segmentInfo.toLowerCase()} in South Florida`
                : 'Explore the diverse neighborhoods and communities across South Florida'
              }
            </p>
            {!segment && (
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/buyers/55-plus-cash-buyer" className="btn-ghost">Active Adults</a>
                <a href="/buyers/family" className="btn-ghost">Families</a>
                <a href="/buyers/investor" className="btn-ghost">Investors</a>
                <a href="/buyers/relocating" className="btn-ghost">Relocating</a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20">
        <div className="section">
          <DynamicAreas 
            targetSegment={segment}
            limit={12}
            randomize={true}
            showImages={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-subtle">
        <div className="section text-center">
          <h2 className="h2 text-deep mb-6">Need Help Choosing the Right Area?</h2>
          <p className="body-large text-ink-soft mb-10 max-w-2xl mx-auto">
            Rachel's local expertise can help you find the perfect neighborhood for your lifestyle and needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary">
              Get Personalized Guidance
            </a>
            <a href="tel:+15612878966" className="btn-ghost">
              Call (561) 287-8966
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
