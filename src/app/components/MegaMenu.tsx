"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ContentService } from '@/lib/contentService';
import { TargetSegment } from '@/app/content/types';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<TargetSegment | 'areas' | 'developments'>('areas');

  if (!isOpen) return null;

  const targetSegments: { key: TargetSegment; label: string; description: string }[] = [
    { key: '55-plus-cash-buyer', label: '55+ Active Adults', description: 'Retirement communities & active adult living' },
    { key: 'second-home-buyer', label: 'Second Home Buyers', description: 'Vacation properties & waterfront living' },
    { key: 'family', label: 'Families', description: 'Great schools & family communities' },
    { key: 'professional', label: 'Professionals', description: 'Urban living & convenience' },
    { key: 'investor', label: 'Investors', description: 'Value opportunities & rental potential' },
    { key: 'relocating', label: 'Relocating', description: 'New to area? Start here' },
  ];

  const areas = ContentService.getAreas({ featured: true, limit: 5 });
  const developments = ContentService.getDevelopments({ featured: true, limit: 6 });

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div className="absolute top-0 left-0 right-0 bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="section py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="h2 text-deep">Find Your Perfect Home</h2>
            <button 
              onClick={onClose}
              className="text-ink-lighter hover:text-ink text-2xl"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab('areas')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'areas' 
                  ? 'bg-champagne text-deep' 
                  : 'bg-surface-subtle text-ink-soft hover:bg-champagne/10'
              }`}
            >
              Areas
            </button>
            <button
              onClick={() => setActiveTab('developments')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'developments' 
                  ? 'bg-champagne text-deep' 
                  : 'bg-surface-subtle text-ink-soft hover:bg-champagne/10'
              }`}
            >
              Communities
            </button>
            {targetSegments.map((segment) => (
              <button
                key={segment.key}
                onClick={() => setActiveTab(segment.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === segment.key 
                    ? 'bg-champagne text-deep' 
                    : 'bg-surface-subtle text-ink-soft hover:bg-champagne/10'
                }`}
              >
                {segment.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
            {activeTab === 'areas' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {areas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/areas/${area.slug}`}
                    className="group card p-6 hover:shadow-lg transition-all duration-300"
                    onClick={onClose}
                  >
                    <h3 className="h3 text-deep group-hover:text-champagne transition-colors">
                      {area.name}
                    </h3>
                    <p className="mt-3 body text-ink-soft">{area.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {area.targetSegments.slice(0, 2).map((segment) => (
                        <span
                          key={segment}
                          className="px-2 py-1 text-xs bg-champagne/10 text-champagne rounded-full"
                        >
                          {segment.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'developments' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {developments.map((development) => (
                  <Link
                    key={development.id}
                    href={`/developments/${development.slug}`}
                    className="group card p-6 hover:shadow-lg transition-all duration-300"
                    onClick={onClose}
                  >
                    <h3 className="h3 text-deep group-hover:text-champagne transition-colors">
                      {development.name}
                    </h3>
                    <p className="mt-3 body text-ink-soft">{development.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {development.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 text-xs bg-champagne/10 text-champagne rounded-full"
                        >
                          {amenity.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 body-small text-ink-lighter">
                      ${development.priceRange.min.toLocaleString()} - ${development.priceRange.max.toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {targetSegments.some(s => s.key === activeTab) && (
              <div className="grid gap-8 md:grid-cols-2">
                {/* Content for this segment */}
                <div>
                  <h3 className="h3 text-deep mb-4">
                    {targetSegments.find(s => s.key === activeTab)?.label} Content
                  </h3>
                  <p className="body text-ink-soft mb-6">
                    {targetSegments.find(s => s.key === activeTab)?.description}
                  </p>
                  
                  <div className="space-y-4">
                    <Link
                      href={`/buyers/${activeTab}`}
                      className="block btn-primary w-full text-center"
                      onClick={onClose}
                    >
                      View All Content for {targetSegments.find(s => s.key === activeTab)?.label}
                    </Link>
                    <Link
                      href="/contact"
                      className="block btn-ghost w-full text-center"
                      onClick={onClose}
                    >
                      Get Personalized Guidance
                    </Link>
                  </div>
                </div>

                {/* Quick links */}
                <div>
                  <h4 className="h3 text-deep mb-4">Quick Links</h4>
                  <div className="space-y-3">
                    <Link
                      href={`/areas?segment=${activeTab}`}
                      className="block p-4 border border-divider rounded-lg hover:border-champagne transition-colors"
                      onClick={onClose}
                    >
                      <div className="font-medium text-ink">Areas for {targetSegments.find(s => s.key === activeTab)?.label}</div>
                      <div className="text-sm text-ink-soft">Find the perfect neighborhood</div>
                    </Link>
                    <Link
                      href={`/developments?segment=${activeTab}`}
                      className="block p-4 border border-divider rounded-lg hover:border-champagne transition-colors"
                      onClick={onClose}
                    >
                      <div className="font-medium text-ink">Communities for {targetSegments.find(s => s.key === activeTab)?.label}</div>
                      <div className="text-sm text-ink-soft">Explore featured developments</div>
                    </Link>
                    <Link
                      href={`/articles?segment=${activeTab}`}
                      className="block p-4 border border-divider rounded-lg hover:border-champagne transition-colors"
                      onClick={onClose}
                    >
                      <div className="font-medium text-ink">Articles & Guides</div>
                      <div className="text-sm text-ink-soft">Expert insights and local knowledge</div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
