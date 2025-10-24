'use client';

import { Article } from '@/app/content/types';
import Image from 'next/image';
import Link from 'next/link';
import { ContentAssociationEngine, ContentAssociation } from '@/lib/contentAssociationEngine';
import { useState, useEffect } from 'react';

interface EnhancedArticlePageProps {
  article: Article;
}

export default function EnhancedArticlePage({ article }: EnhancedArticlePageProps) {
  const [associations, setAssociations] = useState<ContentAssociation[]>([]);
  const [userJourney, setUserJourney] = useState<'discovery' | 'research' | 'consideration' | 'decision'>('discovery');
  
  // Extract first paragraph for hero quote
  const contentHtml = article.content;
  const firstParagraph = contentHtml.match(/<p[^>]*>([^<]+)<\/p>/)?.[1] || article.excerpt;
  
  // Load content associations
  useEffect(() => {
    const loadAssociations = async () => {
      try {
        const relatedContent = ContentAssociationEngine.generateContentAssociations(article.id, 'article');
        setAssociations(relatedContent);
      } catch (error) {
        console.error('Error loading content associations:', error);
      }
    };
    
    loadAssociations();
  }, [article.id]);
  
  // Get personalized recommendations based on user journey
  const getPersonalizedRecommendations = () => {
    const userProfile = {
      areas: article.areas,
      segments: article.targetSegments,
      interests: article.tags
    };
    
    return ContentAssociationEngine.getContentRecommendations(userJourney, userProfile);
  };
  
  const personalizedRecommendations = getPersonalizedRecommendations();
  
  return (
    <>
      <main className="min-h-screen bg-white" role="main">
        {/* Magazine Hero Section */}
        <section className="relative min-h-[80vh] bg-gradient-to-br from-deep via-deep/95 to-champagne/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
                
                {/* Left Column - Content */}
                <div className="text-white space-y-8">
                  {/* Story Type Badge */}
                  <div className="inline-flex items-center gap-2">
                    <div className="w-2 h-2 bg-champagne rounded-full"></div>
                    <span className="text-sm font-medium tracking-wider uppercase">
                      {article.storyType?.replace('-', ' ') || 'Success Story'}
                    </span>
                  </div>
                  
                  {/* Main Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {article.title}
                  </h1>
                  
                  {/* Hero Quote */}
                  <blockquote className="text-xl md:text-2xl leading-relaxed font-light italic border-l-4 border-champagne pl-6">
                    "{firstParagraph}"
                  </blockquote>
                  
                  {/* Author & Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-base">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-champagne/20 rounded-full flex items-center justify-center">
                        <span className="text-champagne font-bold text-lg">RK</span>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">By {article.author}</div>
                        <div className="text-white/70 text-base">{new Date(article.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</div>
                      </div>
                    </div>
                    
                    {/* Reading Time */}
                    <div className="text-white/70 text-base">
                      {Math.ceil(article.content.split(' ').length / 200)} min read
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                        >
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Right Column - Hero Image */}
                <div className="relative">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={article.imageSrc || '/articles/wycliffe-success-story.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Image Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-deep">
                      Success Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beautiful Landing Page Content */}
        <article className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Story Overview Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {article.clientProfile && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-deep mb-3">Client Profile</h3>
                    <p className="text-lg text-gray-600 mb-2">{article.clientProfile.ageRange} • {article.clientProfile.origin}</p>
                    <p className="text-base text-gray-500">{article.clientProfile.buyerType}</p>
                  </div>
                )}
                
                {article.propertyDetails && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-deep mb-3">Property Details</h3>
                    <p className="text-lg text-gray-600 mb-2">{article.propertyDetails.propertyType}</p>
                    <p className="text-base text-gray-500">{article.propertyDetails.priceRange}</p>
                  </div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-deep mb-3">Success Outcome</h3>
                  <p className="text-lg text-gray-600 mb-2">Successful close</p>
                  <p className="text-base text-gray-500">Happy clients</p>
                </div>
              </div>
              
              {/* Main Story Content with Visual Sections */}
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="prose prose-xl max-w-none">
                    <div 
                      className="article-content space-y-8"
                      dangerouslySetInnerHTML={{ 
                        __html: contentHtml
                          .replace(/<h2>/g, '<h2 class="text-4xl font-bold text-deep mt-20 mb-10 leading-tight border-b border-gray-200 pb-6">')
                          .replace(/<h3>/g, '<h3 class="text-3xl font-semibold text-deep mt-16 mb-8 leading-tight">')
                          .replace(/<p>/g, '<p class="text-xl leading-relaxed text-gray-700 mb-8">')
                          .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-champagne pl-8 my-16 italic text-2xl text-gray-600 bg-gray-50 py-8 rounded-r-xl">')
                          .replace(/<ul>/g, '<ul class="space-y-6 my-12">')
                          .replace(/<li>/g, '<li class="flex items-start gap-4"><span class="w-4 h-4 bg-champagne rounded-full mt-3 flex-shrink-0"></span><span class="text-xl text-gray-700">')
                          .replace(/<\/li>/g, '</span></li>')
                      }}
                    />
                  </div>
                </div>
                
                {/* Enhanced Sidebar with Dynamic Content */}
                <div className="space-y-8">
                  
                  {/* User Journey Selector */}
                  <div className="bg-gradient-to-br from-champagne/10 to-deep/5 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-deep mb-4">Your Journey</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'discovery', label: 'Just Discovering', icon: '🔍' },
                        { key: 'research', label: 'Researching', icon: '📚' },
                        { key: 'consideration', label: 'Considering', icon: '🤔' },
                        { key: 'decision', label: 'Ready to Decide', icon: '✅' }
                      ].map(({ key, label, icon }) => (
                        <button
                          key={key}
                          onClick={() => setUserJourney(key as any)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            userJourney === key 
                              ? 'bg-champagne text-deep font-semibold' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        >
                          <span className="mr-2">{icon}</span>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dynamic Content Recommendations */}
                  {personalizedRecommendations.length > 0 && (
                    <div className="bg-gradient-to-br from-champagne/10 to-deep/5 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-deep mb-6">Recommended for You</h3>
                      <div className="space-y-4">
                        {personalizedRecommendations.slice(0, 3).map((rec) => (
                          <Link
                            key={rec.id}
                            href={`/${rec.type === 'area' ? 'areas' : rec.type === 'development' ? 'developments' : 'articles'}/${rec.slug}`}
                            className="block group"
                          >
                            <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                              <h4 className="font-semibold text-deep group-hover:text-champagne transition-colors">
                                {rec.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {rec.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 capitalize">
                                  {rec.type.replace('-', ' ')}
                                </span>
                                <span className="text-xs text-champagne font-medium">
                                  {Math.round(rec.strength * 100)}% match
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Related Content */}
                  {associations.length > 0 && (
                    <div className="bg-gradient-to-br from-champagne/10 to-deep/5 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-deep mb-6">Related Content</h3>
                      <div className="space-y-4">
                        {associations.slice(0, 4).map((assoc) => (
                          <Link
                            key={assoc.id}
                            href={`/${assoc.type === 'area' ? 'areas' : assoc.type === 'development' ? 'developments' : 'articles'}/${assoc.slug}`}
                            className="block group"
                          >
                            <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                {assoc.imageSrc && (
                                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={assoc.imageSrc}
                                      alt={assoc.title}
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h4 className="font-semibold text-deep group-hover:text-champagne transition-colors">
                                    {assoc.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {assoc.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500 capitalize">
                                      {assoc.type.replace('-', ' ')}
                                    </span>
                                    <span className="text-xs text-champagne font-medium">
                                      {Math.round(assoc.strength * 100)}% related
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-deep to-champagne rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-6">Ready to Start Your Story?</h3>
                    <p className="text-white/90 mb-8 text-lg">Let Rachel help you find your perfect home in South Florida.</p>
                    <div className="space-y-3">
                      <a
                        href="tel:+15612878966"
                        className="block w-full bg-white text-deep text-center py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors text-lg"
                      >
                        Call (561) 287-8966
                      </a>
                      <a
                        href="mailto:hi@racheldelray.com"
                        className="block w-full border-2 border-white text-white text-center py-4 rounded-lg font-semibold hover:bg-white hover:text-deep transition-colors text-lg"
                      >
                        Email Rachel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
