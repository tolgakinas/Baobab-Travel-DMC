import React from 'react';
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
  Compass
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

  if (!post) return null;

  const handleInquireFromBlog = () => {
    onOpenInquiry({
      specialRequests: `Referencing blog guide: "${post.title}" (${post.geoData.region})`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white text-neutral-900 rounded-lg max-w-4xl w-full my-8 overflow-hidden shadow-2xl border border-neutral-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          aria-label="Close article modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image & Header */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-neutral-900">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

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

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-tight text-white">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto">
          {/* Author & Geo Tag Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#F05A28]/30"
              />
              <div>
                <p className="text-sm font-bold text-neutral-900">{post.author.name}</p>
                <p className="text-xs text-neutral-500">{post.author.role}</p>
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

          {/* Conclusion */}
          <div className="p-5 bg-neutral-900 text-white rounded-md space-y-3">
            <p className="text-sm sm:text-base leading-relaxed text-neutral-200">
              {post.content.conclusion}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-neutral-400">
                Planning a group expedition or private itinerary in this region?
              </span>
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
  );
};
