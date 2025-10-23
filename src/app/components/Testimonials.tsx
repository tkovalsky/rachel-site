// src/app/components/Testimonials.tsx
"use client";
import { DynamicTestimonials } from './DynamicContent';
import { TargetSegment } from '@/app/content/types';

export interface Review {
  id: string;
  quote: string;
  author: string;
  role?: string;
  location?: string;
  targetSegment: TargetSegment;
  featured: boolean;
  rating?: number;
}

export interface RawReview {
  q: string;
  a: string;
  targetSegment?: TargetSegment;
  featured?: boolean;
}

interface TestimonialsProps {
  items?: Review[];
  targetSegment?: TargetSegment;
  limit?: number;
  randomize?: boolean;
}

export default function Testimonials({ 
  targetSegment, 
  limit = 2, 
  randomize = true 
}: TestimonialsProps) {

  return (
    <section id="testimonials" aria-label="Testimonials" className="border-t bg-white">
      <div className="section py-12">
        <h2 className="h2 text-center">What clients say</h2>
        <div className="mt-8">
          <DynamicTestimonials 
            targetSegment={targetSegment}
            limit={limit}
            randomize={randomize}
          />
        </div>
      </div>
    </section>
  );
}