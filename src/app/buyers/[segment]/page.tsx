import { ContentService } from '@/lib/contentService';
import { DynamicAreas, DynamicDevelopments, DynamicArticles, DynamicTestimonials } from '@/app/components/DynamicContent';
import { TargetSegment } from '@/app/content/types';
import { notFound } from 'next/navigation';

interface BuyerPageProps {
  params: {
    segment: string;
  };
}

const segmentLabels: Record<TargetSegment, { title: string; description: string; cta: string }> = {
  '55-plus-cash-buyer': {
    title: 'Active Adult Living',
    description: 'Discover luxury retirement communities and active adult developments designed for your next chapter.',
    cta: 'Find Your Perfect Retirement Community'
  },
  'second-home-buyer': {
    title: 'Second Home & Vacation Properties',
    description: 'Explore waterfront communities and vacation homes in South Florida\'s most desirable locations.',
    cta: 'Discover Your Dream Vacation Home'
  },
  'family': {
    title: 'Family Communities',
    description: 'Find the perfect neighborhood with excellent schools, family amenities, and safe communities.',
    cta: 'Find Your Family\'s Perfect Home'
  },
  'professional': {
    title: 'Professional Living',
    description: 'Urban living with convenience, modern amenities, and easy access to business districts.',
    cta: 'Explore Urban Living Options'
  },
  'investor': {
    title: 'Investment Opportunities',
    description: 'Discover high-value real estate investments with strong rental potential and appreciation.',
    cta: 'View Investment Properties'
  },
  'relocating': {
    title: 'Relocating to South Florida',
    description: 'Comprehensive guidance for your move to South Florida with local expertise and insights.',
    cta: 'Start Your Relocation Journey'
  },
  'upgrade-downgrade': {
    title: 'Upgrading or Downsizing',
    description: 'Navigate your home transition with expert guidance on upgrading or downsizing your property.',
    cta: 'Plan Your Home Transition'
  }
};

export default function BuyerPage({ params }: BuyerPageProps) {
  const segment = params.segment as TargetSegment;
  
  if (!segmentLabels[segment]) {
    notFound();
  }

  const segmentInfo = segmentLabels[segment];
  const _content = ContentService.getContentBySegment(segment, 3);

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-paper to-surface-subtle">
        <div className="section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 text-deep mb-6">{segmentInfo.title}</h1>
            <p className="lead mb-8 text-ink-soft">{segmentInfo.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                {segmentInfo.cta}
              </a>
              <a href="tel:+15612878966" className="btn-ghost">
                Call (561) 287-8966
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Areas */}
      <section className="py-20">
        <div className="section">
          <div className="text-center mb-16">
            <h2 className="h2 text-deep mb-4">Perfect Areas for You</h2>
            <p className="body-large text-ink-soft max-w-2xl mx-auto">
              Discover neighborhoods that match your lifestyle and preferences
            </p>
          </div>
          <DynamicAreas 
            targetSegment={segment}
            limit={3}
            randomize={true}
          />
        </div>
      </section>

      {/* Featured Communities */}
      <section className="py-20 bg-surface-subtle">
        <div className="section">
          <div className="text-center mb-16">
            <h2 className="h2 text-deep mb-4">Featured Communities</h2>
            <p className="body-large text-ink-soft max-w-2xl mx-auto">
              Explore developments with amenities and features perfect for your needs
            </p>
          </div>
          <DynamicDevelopments 
            targetSegment={segment}
            limit={3}
            randomize={true}
          />
        </div>
      </section>

      {/* Expert Articles */}
      <section className="py-20">
        <div className="section">
          <div className="text-center mb-16">
            <h2 className="h2 text-deep mb-4">Expert Insights</h2>
            <p className="body-large text-ink-soft max-w-2xl mx-auto">
              Local knowledge and expert guidance to help you make informed decisions
            </p>
          </div>
          <DynamicArticles 
            targetSegment={segment}
            limit={3}
            randomize={true}
          />
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-surface-subtle">
        <div className="section">
          <div className="text-center mb-16">
            <h2 className="h2 text-deep mb-4">What Clients Say</h2>
            <p className="body-large text-ink-soft max-w-2xl mx-auto">
              Hear from clients who found their perfect home with Rachel's guidance
            </p>
          </div>
          <DynamicTestimonials 
            targetSegment={segment}
            limit={2}
            randomize={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep">
        <div className="section text-center">
          <h2 className="h2 text-white mb-6">Ready to Find Your Perfect Home?</h2>
          <p className="body-large text-white/90 mb-10 max-w-2xl mx-auto">
            Let Rachel's expertise guide you to the perfect property in South Florida
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-gold">
              Get Started Today
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

export function generateStaticParams() {
  const segments: TargetSegment[] = [
    '55-plus-cash-buyer',
    'second-home-buyer', 
    'family',
    'professional',
    'investor',
    'relocating',
    'upgrade-downgrade'
  ];

  return segments.map((segment) => ({
    segment,
  }));
}
