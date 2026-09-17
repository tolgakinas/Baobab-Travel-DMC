import React, { useEffect } from 'react';
import { BlogPost } from '../data/blogData';
import { 
  X, 
  Clock, 
  Calendar, 
  MapPin, 
  Share2, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  CheckCircle2,
  Compass,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  onClose,
  onOpenInquiry
}) => {
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleInquireFromBlog = () => {
    onOpenInquiry({
      specialRequests: `Referencing blog guide: "${post.title}" (${post.geoData.region})`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Clickable Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Viewport Close Button (always visible on top-right of screen) */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-60 w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-[#F05A28] text-white flex items-center justify-center shadow-xl border border-white/20 transition-all duration-200 hover:scale-105"
        aria-label="Close article (Esc)"
        title="Close article (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Dialog Container */}
      <div 
        className="relative bg-white text-neutral-900 rounded-xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-neutral-200 z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        {/* Sticky Top Header Bar with Close X */}
        <div className="sticky top-0 z-30 px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2 py-0.5 bg-[#F05A28] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm shrink-0">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-neutral-800 truncate max-w-[200px] sm:max-w-md">
              {post.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-[#F05A28] text-neutral-700 hover:text-white text-xs font-bold transition-all border border-neutral-200 shadow-2xs"
              aria-label="Close article"
              title="Close article (Esc)"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image & Header */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-neutral-900">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Close Button on Hero */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#F05A28] text-white backdrop-blur-md transition-all shadow-lg border border-white/20"
              aria-label="Close article"
              title="Close article (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#F05A28] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded text-xs text-neutral-200">
                  <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded text-xs text-neutral-200">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {post.publishedDate}
                </span>
              </div>

              <h1 id="blog-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-tight text-white">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto">
            {/* Intelligence & Geo Tag Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F05A28]/10 border border-[#F05A28]/20 flex items-center justify-center text-[#F05A28] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Baobab DMC Turkey Ground Intelligence</p>
                  <p className="text-xs text-neutral-500">Official Destination & Logistics Briefing</p>
                </div>
              </div>

              {/* GEO Tag Box */}
              <div className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F6] rounded-md border border-neutral-200/80 text-xs text-neutral-700">
                <MapPin className="w-4 h-4 text-[#F05A28] shrink-0" />
                <div>
                  <span className="font-semibold text-neutral-900">{post.geoData.region}</span>
                  {post.geoData.coordinates && (
                    <span className="text-neutral-500 ml-1.5">({post.geoData.coordinates})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Key Geographic Cities */}
            {post.geoData.keyCities && (
              <div className="bg-neutral-50 p-4 rounded border border-neutral-200 text-xs">
                <span className="font-bold text-[#F05A28] uppercase tracking-wider block mb-1.5">
                  Key Geographic Operational Hubs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {post.geoData.keyCities.map((city) => (
                    <span key={city} className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-neutral-800 font-medium">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Intro Paragraph */}
            <p className="text-base sm:text-lg text-neutral-700 font-serif leading-relaxed italic border-l-2 border-[#F05A28] pl-4">
              {post.content.intro}
            </p>

            {/* Core Sections */}
            <div className="space-y-8 pt-2">
              {post.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3.5">
                  <h2 className="text-xl sm:text-2xl font-serif font-medium text-neutral-900">
                    {section.heading}
                  </h2>
                  
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                      {para}
                    </p>
                  ))}

                  {section.tipBox && (
                    <div className="p-4 bg-orange-50 border border-orange-200/70 rounded-md text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
                      <span>{section.tipBox}</span>
                    </div>
                  )}

                  {section.geoHighlight && (
                    <div className="p-3.5 bg-neutral-100/80 border border-neutral-200 rounded-md text-xs sm:text-sm text-neutral-700 flex items-start gap-2.5">
                      <Compass className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <span>{section.geoHighlight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Post FAQs (Structured for GEO & AIO discovery) */}
            {post.content.faqs && post.content.faqs.length > 0 && (
              <div className="pt-6 border-t border-neutral-200 space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#F05A28]" />
                  <h3 className="text-lg font-bold text-neutral-900">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-3">
                  {post.content.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-md space-y-1.5">
                      <h4 className="text-sm font-semibold text-neutral-900">{faq.q}</h4>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conclusion & Action Box */}
            <div className="p-5 bg-neutral-900 text-white rounded-md space-y-3">
              <p className="text-sm sm:text-base leading-relaxed text-neutral-200">
                {post.content.conclusion}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-neutral-400">
                  Planning a group expedition or private itinerary in this region?
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded transition-colors border border-neutral-700"
                    aria-label="Close article"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close Guide</span>
                  </button>
                  <button
                    onClick={handleInquireFromBlog}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md"
                  >
                    <span>Request B2B Tariff</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
