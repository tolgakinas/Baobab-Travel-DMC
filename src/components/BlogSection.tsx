import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { 
  BookOpen, 
  Search, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Calendar,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectPost,
  onOpenInquiry
}) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t('blog.all') },
    { id: 'Destination Guide', label: t('blog.destGuides') },
    { id: 'Trip Logistics', label: t('blog.logistics') },
    { id: 'Travel Tips', label: t('blog.travelTips') },
    { id: 'B2B Trade Insights', label: t('blog.b2bInsights') }
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesQuery = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.geoData.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="blog" className="py-20 bg-[#FAF9F6] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F05A28]/10 text-[#F05A28] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('blog.tag')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-neutral-900 tracking-tight">
              {t('blog.title')}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Direct action button */}
          <div className="shrink-0">
            <button
              onClick={() => onOpenInquiry({ specialRequests: 'Inquiring regarding destination guides & customized Turkey itineraries.' })}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#111111] hover:bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md"
            >
              <span>Consult Our Ops Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#F05A28] text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, tips, keywords..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#F05A28] focus:border-[#F05A28]"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Image thumbnail */}
              <div className="relative h-60 w-full overflow-hidden bg-neutral-100">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#111111]/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/10">
                    {post.category}
                  </span>
                </div>

                {/* Region Tag */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/95 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>{post.geoData.region}</span>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {post.publishedDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-neutral-900 group-hover:text-[#F05A28] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author footer and CTA */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="text-xs font-semibold text-neutral-800">{post.author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F05A28] group-hover:translate-x-1 transition-transform">
                    <span>{t('blog.readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
