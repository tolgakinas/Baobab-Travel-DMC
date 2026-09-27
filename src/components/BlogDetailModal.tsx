import React, { useEffect, useState } from 'react';
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
  BookOpen,
  Zap,
  Layers,
  Code,
  Check,
  Tag
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
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [showSchemaInspector, setShowSchemaInspector] = useState(false);

  // Close on Escape key & inject JSON-LD schema into head while viewing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Dynamically add schema.org script tag for AEO/SEO crawler inspection
      const scriptId = 'blog-detail-schema-ld';
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();

      const schemaContent = post.aiOptimization?.schemaJsonLd || JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.heroImage,
        "author": {
          "@type": "Organization",
          "name": "Baobab DMC Turkey",
          "url": "https://baobabdmcturkey.com",
          "award": "TÜRSAB Licensed A-Grade Operator #15764"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Baobab DMC Turkey"
        },
        "datePublished": post.publishedDate
      });

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = schemaContent;
      document.head.appendChild(script);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        const scr = document.getElementById(scriptId);
        if (scr) scr.remove();
      };
    }
  }, [post, onClose]);

  if (!post) return null;

  const handleInquireFromBlog = () => {
    onOpenInquiry({
      specialRequests: `Referencing blog guide: "${post.title}" (${post.geoData?.region || 'Turkiye'})`
    });
    onClose();
  };

  const handleCopySchema = () => {
    const text = post.aiOptimization?.schemaJsonLd || JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Organization",
        "name": "Baobab DMC Turkey"
      }
    }, null, 2);

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Clickable Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div 
        className="relative bg-white text-neutral-900 rounded-xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-neutral-200 z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        {/* Sticky Top Header Bar with Close X and Schema Inspector */}
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
              onClick={() => setShowSchemaInspector(!showSchemaInspector)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
              title="View Schema.org JSON-LD"
            >
              <Code className="w-3.5 h-3.5 text-neutral-500" />
              <span>{showSchemaInspector ? 'Hide Schema' : 'Schema JSON-LD'}</span>
            </button>

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

        {/* Optional Schema Inspector Drawer */}
        {showSchemaInspector && (
          <div className="bg-neutral-900 text-neutral-200 p-4 border-b border-neutral-800 text-xs shrink-0 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-2">
              <span className="font-mono text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>Schema.org JSON-LD (SEO, AEO & Google Rich Results)</span>
              </span>
              <button
                onClick={handleCopySchema}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded text-[11px] flex items-center gap-1"
              >
                {copiedSchema ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                <span>{copiedSchema ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="font-mono text-[11px] text-emerald-400 whitespace-pre-wrap">
              {post.aiOptimization?.schemaJsonLd || '// Standard BlogPosting schema auto-generated'}
            </pre>
          </div>
        )}

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image & Header */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-neutral-900">
            <img
              src={post.heroImage}
              alt={post.heroImageAlt || post.title}
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
                {post.aiOptimization?.scores?.overallScore && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/80 backdrop-blur-md rounded text-xs text-white font-bold">
                    <Zap className="w-3 h-3 text-amber-300" />
                    <span>SEO/AEO Index: {post.aiOptimization.scores.overallScore}/100</span>
                  </span>
                )}
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
                  <p className="text-xs text-neutral-500">TÜRSAB A-Grade Licensed Ground Operations (#15764)</p>
                </div>
              </div>

              {/* GEO Tag Box */}
              <div className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F6] rounded-md border border-neutral-200/80 text-xs text-neutral-700">
                <MapPin className="w-4 h-4 text-[#F05A28] shrink-0" />
                <div>
                  <span className="font-semibold text-neutral-900">{post.geoData?.region || 'Turkiye'}</span>
                  {post.geoData?.coordinates && (
                    <span className="text-neutral-500 ml-1.5">({post.geoData.coordinates})</span>
                  )}
                </div>
              </div>
            </div>

            {/* AEO (Answer Engine Optimization) Direct Answer Box */}
            {post.aiOptimization?.aeoDirectAnswer && (
              <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-[#F05A28]/30 rounded-lg shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F05A28] uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-[#F05A28]" />
                  <span>AEO Quick Answer & Executive Summary</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
                  {post.aiOptimization.aeoDirectAnswer}
                </p>
              </div>
            )}

            {/* AIO (AI Overview) Key Takeaways */}
            {post.aiOptimization?.aioKeyTakeaways && post.aiOptimization.aioKeyTakeaways.length > 0 && (
              <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F05A28]" />
                  <span>AI Overview Key Takeaways & Field Rules</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                  {post.aiOptimization.aioKeyTakeaways.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Geographic Cities */}
            {post.geoData?.keyCities && post.geoData.keyCities.length > 0 && (
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

                  {/* Section Image if present */}
                  {section.image && (
                    <div className="my-4 rounded-lg overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
                      <img
                        src={section.image}
                        alt={section.imageAlt || section.heading}
                        className="w-full h-64 sm:h-80 object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      {section.imageCaption && (
                        <p className="p-2.5 text-xs text-neutral-500 bg-white italic border-t border-neutral-100">
                          {section.imageCaption}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {(Array.isArray(section.body) ? section.body : [section.body]).map((para, pIdx) => (
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
                  <h3 className="text-lg font-bold text-neutral-900">Frequently Asked Questions (FAQ)</h3>
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

            {/* SEO Keywords & Tags */}
            {post.seoKeywords && post.seoKeywords.length > 0 && (
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Indexed Search Topics:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {post.seoKeywords.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-xs">
                      #{tag}
                    </span>
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
