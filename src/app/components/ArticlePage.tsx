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
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={article.imageSrc || '/articles/wycliffe-success-story.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      onError={(e) => {
                        console.log('Image failed to load:', article.imageSrc);
                        e.currentTarget.src = '/articles/wycliffe-success-story.jpg';
                      }}
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
                    <h3 className="text-xl font-bold text-deep mb-2">Client Profile</h3>
                    <p className="text-gray-600">{article.clientProfile.ageRange} • {article.clientProfile.origin}</p>
                    <p className="text-sm text-gray-500 mt-1">{article.clientProfile.buyerType}</p>
                  </div>
                )}
                
                {article.propertyDetails && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-deep mb-2">Property Details</h3>
                    <p className="text-gray-600">{article.propertyDetails.propertyType}</p>
                    <p className="text-sm text-gray-500 mt-1">{article.propertyDetails.priceRange}</p>
                  </div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-deep mb-2">Success Outcome</h3>
                  <p className="text-gray-600">Successful close</p>
                  <p className="text-sm text-gray-500 mt-1">Happy clients</p>
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
                          .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-deep mt-16 mb-8 leading-tight border-b border-gray-200 pb-4">')
                          .replace(/<h3>/g, '<h3 class="text-2xl font-semibold text-deep mt-12 mb-6 leading-tight">')
                          .replace(/<p>/g, '<p class="text-lg leading-relaxed text-gray-700 mb-6">')
                          .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-champagne pl-8 my-12 italic text-xl text-gray-600 bg-gray-50 py-6 rounded-r-xl">')
                          .replace(/<ul>/g, '<ul class="space-y-4 my-8">')
                          .replace(/<li>/g, '<li class="flex items-start gap-4"><span class="w-3 h-3 bg-champagne rounded-full mt-2 flex-shrink-0"></span><span class="text-lg text-gray-700">')
                          .replace(/<\/li>/g, '</span></li>')
                      }}
                    />
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-8">
                  
                  {/* Key Highlights */}
                  <div className="bg-gradient-to-br from-champagne/10 to-deep/5 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-deep mb-6">Key Highlights</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-champagne rounded-full mt-3"></div>
                        <p className="text-gray-700">Expert guidance throughout the process</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-champagne rounded-full mt-3"></div>
                        <p className="text-gray-700">Smooth transition from Northeast</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-champagne rounded-full mt-3"></div>
                        <p className="text-gray-700">Perfect community match</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-champagne rounded-full mt-3"></div>
                        <p className="text-gray-700">Maintenance-free lifestyle</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Client Quote */}
                  {article.clientProfile && (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="text-4xl text-champagne mb-4">"</div>
                      <blockquote className="text-lg italic text-gray-700 leading-relaxed mb-4">
                        "Rachel didn't just help us find a house—she helped us find our family's Florida home."
                      </blockquote>
                      <cite className="block text-sm font-semibold text-deep">
                        — {article.clientProfile.buyerType}
                      </cite>
                    </div>
                  )}
                  
                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-deep to-champagne rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-4">Ready to Start Your Story?</h3>
                    <p className="text-white/90 mb-6">Let Rachel help you find your perfect home in South Florida.</p>
                    <div className="space-y-3">
                      <a
                        href="tel:+15612878966"
                        className="block w-full bg-white text-deep text-center py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                      >
                        Call (561) 287-8966
                      </a>
                      <a
                        href="mailto:hi@racheldelray.com"
                        className="block w-full border-2 border-white text-white text-center py-3 rounded-lg font-semibold hover:bg-white hover:text-deep transition-colors"
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
                {article.clientProfile?.buyerType && ` Whether you're a ${article.clientProfile.buyerType.toLowerCase()}, `}
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
