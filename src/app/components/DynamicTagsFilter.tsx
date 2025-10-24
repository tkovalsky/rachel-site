"use client";

import { useState } from 'react';

interface Tag {
  id: string;
  label: string;
  count: number;
}

interface DynamicTagsFilterProps {
  targetSegments: Tag[];
  contentTypes: Tag[];
  featuredStatus: Tag[];
  onFilterChange: (filters: {
    targetSegment: string;
    contentType: string;
    featuredStatus: string;
  }) => void;
}

export default function DynamicTagsFilter({ 
  targetSegments, 
  contentTypes, 
  featuredStatus, 
  onFilterChange 
}: DynamicTagsFilterProps) {
  const [selectedTargetSegment, setSelectedTargetSegment] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [selectedFeaturedStatus, setSelectedFeaturedStatus] = useState('all');

  const handleTagClick = (type: 'targetSegment' | 'contentType' | 'featuredStatus', value: string) => {
    if (type === 'targetSegment') {
      const newValue = selectedTargetSegment === value ? 'all' : value;
      setSelectedTargetSegment(newValue);
      onFilterChange({
        targetSegment: newValue,
        contentType: selectedContentType,
        featuredStatus: selectedFeaturedStatus
      });
    } else if (type === 'contentType') {
      const newValue = selectedContentType === value ? 'all' : value;
      setSelectedContentType(newValue);
      onFilterChange({
        targetSegment: selectedTargetSegment,
        contentType: newValue,
        featuredStatus: selectedFeaturedStatus
      });
    } else if (type === 'featuredStatus') {
      const newValue = selectedFeaturedStatus === value ? 'all' : value;
      setSelectedFeaturedStatus(newValue);
      onFilterChange({
        targetSegment: selectedTargetSegment,
        contentType: selectedContentType,
        featuredStatus: newValue
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <h2 className="h2 text-deep mb-6">Filter Content</h2>
      <p className="body-large text-ink-soft mb-8">Find exactly what you're looking for</p>
      
      <div className="space-y-8">
        {/* Target Segments */}
        <div>
          <h3 className="h3 text-deep mb-4">Target Segment</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTagClick('targetSegment', 'all')}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                selectedTargetSegment === 'all'
                  ? 'bg-champagne text-deep border-champagne shadow-md'
                  : 'bg-white text-ink border-gray-300 hover:border-champagne hover:text-champagne'
              }`}
            >
              All Segments
            </button>
            {targetSegments.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick('targetSegment', tag.id)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                  selectedTargetSegment === tag.id
                    ? 'bg-champagne text-deep border-champagne shadow-md'
                    : 'bg-white text-ink border-gray-300 hover:border-champagne hover:text-champagne'
                }`}
              >
                {tag.label} ({tag.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content Types */}
        <div>
          <h3 className="h3 text-deep mb-4">Content Type</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTagClick('contentType', 'all')}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                selectedContentType === 'all'
                  ? 'bg-champagne text-deep border-champagne shadow-md'
                  : 'bg-white text-ink border-gray-300 hover:border-champagne hover:text-champagne'
              }`}
            >
              All Content
            </button>
            {contentTypes.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick('contentType', tag.id)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                  selectedContentType === tag.id
                    ? 'bg-champagne text-deep border-champagne shadow-md'
                    : 'bg-white text-ink border-gray-300 hover:border-champagne hover:text-champagne'
                }`}
              >
                {tag.label} ({tag.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Status */}
        <div>
          <h3 className="h3 text-deep mb-4">Featured Status</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTagClick('featuredStatus', 'all')}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                selectedFeaturedStatus === 'all'
                  ? 'bg-champagne text-deep border-champagne shadow-md'
                  : 'bg-white text-ink border-gray-300 hover:border-champagne hover:text-champagne'
              }`}
            >
              All Items
            </button>
            {featuredStatus.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagClick('featuredStatus', tag.id)}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                  selectedFeaturedStatus === tag.id
                    ? 'bg-champagne text-deep border-champagne shadow-md'
                    : 'bg-white text-ink border-gray-300 hover:border-champagne hover:text-champagne'
                }`}
              >
                {tag.label} ({tag.count})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
