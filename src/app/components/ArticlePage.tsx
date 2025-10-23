import { Article } from '@/app/content/types';
import Image from 'next/image';

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  // Extract first paragraph for hero quote
  const contentHtml = article.content;
  const firstParagraph = contentHtml.match(/<p[^>]*>([^<]+)<\/p>/)?.[1] || article.excerpt;
  
  return (
    <>
      <main className="min-h-screen bg-white" role="main">
        {/* Magazine Hero Section */}
        <section className="relative min-h-[80vh] bg-gradient-to-br from-deep via-deep/95 to-champagne/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
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
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-champagne/20 rounded-full flex items-center justify-center">
                        <span className="text-champagne font-bold">RK</span>
                      </div>
                      <div>
                        <div className="font-semibold">By {article.author}</div>
                        <div className="text-white/70">{new Date(article.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</div>
                      </div>
                    </div>
                    
                    {/* Reading Time */}
                    <div className="text-white/70">
                      {Math.ceil(article.content.split(' ').length / 200)} min read
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20"
                        >
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Right Column - Hero Image */}
                <div className="relative">
                  {article.imageSrc ? (
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-champagne/20 to-deep/20 flex items-center justify-center">
                      <div className="text-center text-white/60">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm">Hero Image</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content - Magazine Style */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Article Meta Bar */}
              <div className="flex flex-wrap items-center justify-between py-6 border-b border-gray-200 mb-12">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  {article.clientProfile && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Client Profile:</span>
                      <span>{article.clientProfile.ageRange} • {article.clientProfile.origin}</span>
                    </div>
                  )}
                  {article.propertyDetails && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Property:</span>
                      <span>{article.propertyDetails.propertyType} • {article.propertyDetails.priceRange}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-deep transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
              
              {/* Article Body with Enhanced Typography */}
              <div className="prose prose-xl max-w-none">
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ 
                    __html: contentHtml
                      .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-deep mt-12 mb-6 leading-tight">')
                      .replace(/<h3>/g, '<h3 class="text-2xl font-semibold text-deep mt-10 mb-4 leading-tight">')
                      .replace(/<p>/g, '<p class="text-lg leading-relaxed text-gray-700 mb-6">')
                      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-champagne pl-6 my-8 italic text-xl text-gray-600">')
                      .replace(/<ul>/g, '<ul class="space-y-3 my-6">')
                      .replace(/<li>/g, '<li class="flex items-start gap-3"><span class="w-2 h-2 bg-champagne rounded-full mt-3 flex-shrink-0"></span><span>')
                      .replace(/<\/li>/g, '</span></li>')
                  }}
                />
              </div>
              
              {/* Pull Quote Section */}
              {article.clientProfile && (
                <div className="my-16 p-8 bg-gradient-to-r from-champagne/10 to-deep/5 rounded-2xl border-l-4 border-champagne">
                  <blockquote className="text-2xl font-light italic text-gray-700 leading-relaxed">
                    "Rachel didn't just help us find a house—she helped us find our family's Florida home."
                  </blockquote>
                  <cite className="block mt-4 text-lg font-semibold text-deep">
                    — {article.clientProfile.buyerType}
                  </cite>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Related Areas - Enhanced */}
        {article.areas && article.areas.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-deep mb-8 text-center">Explore Related Areas</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {article.areas.map((area) => (
                    <div
                      key={area}
                      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                    >
                      <h3 className="text-xl font-semibold text-deep mb-2 group-hover:text-champagne transition-colors">
                        {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Discover properties and communities in this beautiful area
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-br from-deep to-champagne text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl mb-10 opacity-90 leading-relaxed">
                Let Rachel help you find your perfect home in South Florida. 
                {article.clientProfile && ` Whether you're a ${article.clientProfile.buyerType.toLowerCase()}, `}
                Rachel's expertise makes the difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="tel:+15612878966"
                  className="group px-8 py-4 bg-champagne text-deep rounded-xl font-semibold hover:bg-champagne/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (561) 287-8966
                  </div>
                </a>
                
                <a
                  href="mailto:hi@racheldelray.com"
                  className="group px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-deep transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Rachel
                  </div>
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Licensed Realtor®
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    South Florida Expert
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Compass Florida
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
