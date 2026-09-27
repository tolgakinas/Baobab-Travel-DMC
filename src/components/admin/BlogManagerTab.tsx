import React, { useState, useMemo } from 'react';
import { useSiteContent, LibraryPhotoItem, PHOTO_PRESET_LIBRARY } from '../../context/SiteContentContext';
import { BlogPost, BlogSectionItem, BlogFaqItem } from '../../data/blogData';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  MapPin, 
  Layers, 
  HelpCircle, 
  Image as ImageIcon, 
  Upload, 
  Eye, 
  Save, 
  X, 
  ExternalLink, 
  Code, 
  Check, 
  Tag, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  RefreshCw,
  Globe,
  Sliders,
  Maximize2,
  FileText,
  Lightbulb,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { PhotoLibraryModal } from './PhotoLibraryModal';

export const BlogManagerTab: React.FC = () => {
  const { 
    content, 
    addBlog, 
    updateBlog, 
    deleteBlog, 
    duplicateBlog, 
    optimizeBlogWithAI,
    saveChanges 
  } = useSiteContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Active Editor Modal State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [editorActiveTab, setEditorActiveTab] = useState<'content' | 'seo_aeo' | 'photos'>('content');

  // Photo Selector Modal State
  const [photoPickerOpen, setPhotoPickerOpen] = useState<boolean>(false);
  const [photoPickerTarget, setPhotoPickerTarget] = useState<{ type: 'hero' | 'section'; sectionIndex?: number } | null>(null);

  // AI Optimization State
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationSuccessMsg, setOptimizationSuccessMsg] = useState<string | null>(null);
  const [lastOptimizationResult, setLastOptimizationResult] = useState<any | null>(null);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  // Preview Modal
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  const blogs = content.blogs || [];

  const categories = [
    'Destination Guide',
    'Trip Logistics',
    'Travel Tips',
    'B2B Trade Insights'
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.geoData?.region || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.seoKeywords || []).some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || (post.status || 'published') === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchQuery, selectedCategory, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter(b => b.status !== 'draft').length;
    const drafts = total - published;
    const optimizedCount = blogs.filter(b => b.aiOptimization?.scores?.overallScore && b.aiOptimization.scores.overallScore >= 90).length;
    const avgScore = total > 0 
      ? Math.round(blogs.reduce((acc, b) => acc + (b.aiOptimization?.scores?.overallScore || 85), 0) / total)
      : 90;
    return { total, published, drafts, optimizedCount, avgScore };
  }, [blogs]);

  // Initialize new blank post
  const handleOpenCreateNew = () => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: 'new-turkiye-travel-guide',
      title: 'New Curated Turkey Guide & Operational Briefing',
      excerpt: 'Comprehensive logistics, destination highlights, and expert recommendations for small group travel across Turkey.',
      category: 'Destination Guide',
      readTime: '6 min read',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      heroImage: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1600&q=85',
      heroImageAlt: 'Scenic view of Cappadocia Turkey for guided expeditions',
      heroImageCaption: 'Curated travel photography by Baobab DMC Turkey.',
      geoData: {
        region: 'Cappadocia & Central Anatolia',
        coordinates: '38.6431° N, 34.8289° E',
        keyCities: ['Goreme', 'Uchisar', 'Urgup', 'Nevsehir']
      },
      seoKeywords: [
        'Turkey DMC',
        'Cappadocia tour logistics',
        'B2B Turkey travel operator',
        'Turkiye luxury itineraries'
      ],
      content: {
        intro: 'Turkey offers an unmatched synthesis of ancient civilizations, dramatic geological wonders, and world-class hospitality.',
        sections: [
          {
            heading: '1. Regional Highlights & Landscape Overview',
            body: [
              'Discover pristine valleys, subterranean cities, and authentic boutique cave lodges designed for discerning travelers.'
            ],
            tipBox: 'Operational Tip: Ensure private Mercedes Sprinter transfers are pre-booked for seamless regional transit.'
          },
          {
            heading: '2. Logistics, Pacing & Best Travel Seasons',
            body: [
              'Spring (April to June) and Autumn (September to November) provide ideal temperatures for hiking and balloon flights.'
            ],
            geoHighlight: 'Hub Insight: Direct 75-minute flights connect Istanbul (IST) with Nevsehir (NAV) and Kayseri (ASR).'
          }
        ],
        faqs: [
          {
            q: 'What is the best way to coordinate ground travel in this region?',
            a: 'Private chauffeured VIP vehicles arranged by a licensed TÜRSAB DMC ensure maximum safety, reliability, and local insight.'
          },
          {
            q: 'How many days are recommended for this itinerary?',
            a: 'We recommend 3 to 4 days to comfortably explore both subterranean sites and sunrise balloon experiences.'
          }
        ],
        conclusion: 'Partner with Baobab DMC Turkey for verified boutique hotel contracts, scholar guides, and 24/7 localized dispatch.'
      },
      status: 'published',
      isCustom: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingPost(newPost);
    setIsCreatingNew(true);
    setEditorActiveTab('content');
    setLastOptimizationResult(null);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(JSON.parse(JSON.stringify(post)));
    setIsCreatingNew(false);
    setEditorActiveTab('content');
    if (post.aiOptimization) {
      setLastOptimizationResult(post.aiOptimization);
    } else {
      setLastOptimizationResult(null);
    }
  };

  const handleSaveEditingPost = () => {
    if (!editingPost) return;
    if (isCreatingNew) {
      addBlog(editingPost);
    } else {
      updateBlog(editingPost.id, editingPost);
    }
    saveChanges();
    setEditingPost(null);
  };

  // Run AI SEO / AEO / AIO Optimization
  const handleRunAiOptimization = async (postToOptimize?: BlogPost) => {
    const target = postToOptimize || editingPost;
    if (!target) return;

    setIsOptimizing(true);
    setOptimizationSuccessMsg(null);

    const result = await optimizeBlogWithAI(target);
    setIsOptimizing(false);

    if (result.success && result.optimization) {
      const opt = result.optimization;
      setLastOptimizationResult(opt);

      // Create updated post object with AI Optimization embedded
      const updatedPost: BlogPost = {
        ...target,
        aiOptimization: {
          metaTitle: opt.metaTitle,
          metaDescription: opt.metaDescription,
          primaryKeywords: opt.primaryKeywords,
          secondaryKeywords: opt.secondaryKeywords,
          aeoDirectAnswer: opt.aeoDirectAnswer,
          aioKeyTakeaways: opt.aioKeyTakeaways,
          semanticEntities: opt.semanticEntities,
          searchIntent: opt.searchIntent,
          readingTimeMinutes: opt.readingTimeMinutes,
          scores: opt.scores,
          auditChecklist: opt.auditChecklist,
          recommendations: opt.recommendations,
          schemaJsonLd: opt.schemaJsonLd,
          lastOptimizedAt: new Date().toISOString()
        }
      };

      if (editingPost && editingPost.id === target.id) {
        setEditingPost(updatedPost);
      } else {
        updateBlog(target.id, updatedPost);
        saveChanges();
      }

      setOptimizationSuccessMsg('AI Optimization complete! SEO, AEO & AIO metadata generated.');
      setTimeout(() => setOptimizationSuccessMsg(null), 4000);
    } else {
      alert(result.error || 'Failed to optimize blog post with AI');
    }
  };

  // 1-Click Apply AI Recommendations to Core Content
  const handleApplyAiSuggestionsToContent = () => {
    if (!editingPost || !lastOptimizationResult) return;
    const opt = lastOptimizationResult;

    const updated: BlogPost = {
      ...editingPost,
      title: opt.metaTitle ? opt.metaTitle.replace(/\s*\|\s*Baobab DMC.*$/, '') : editingPost.title,
      slug: opt.slug || editingPost.slug,
      excerpt: opt.metaDescription || editingPost.excerpt,
      seoKeywords: Array.from(new Set([...(opt.primaryKeywords || []), ...(opt.secondaryKeywords || [])])),
      readTime: opt.readingTimeMinutes ? `${opt.readingTimeMinutes} min read` : editingPost.readTime,
      content: {
        ...editingPost.content,
        intro: opt.enhancedIntro || editingPost.content.intro,
        conclusion: opt.enhancedConclusion || editingPost.content.conclusion,
        faqs: opt.suggestedFaqs && opt.suggestedFaqs.length > 0
          ? [...(editingPost.content.faqs || []), ...opt.suggestedFaqs.filter((sf: any) => !(editingPost.content.faqs || []).some(ef => ef.q === sf.q))]
          : editingPost.content.faqs
      },
      aiOptimization: {
        ...(editingPost.aiOptimization || {}),
        ...opt,
        lastOptimizedAt: new Date().toISOString()
      }
    };

    setEditingPost(updated);
    setOptimizationSuccessMsg('Applied AI titles, slug, excerpt, keywords & FAQs to article!');
    setTimeout(() => setOptimizationSuccessMsg(null), 3500);
  };

  // Helper to open Photo Library Modal for Hero or Section
  const handleSelectPhoto = (photoOrUrl: string | LibraryPhotoItem) => {
    if (!editingPost) return;

    const url = typeof photoOrUrl === 'string' ? photoOrUrl : photoOrUrl.url;
    if (!url) return;

    // Find photo metadata from custom library or presets
    let matchedItem: LibraryPhotoItem | undefined = typeof photoOrUrl === 'object' ? photoOrUrl : undefined;
    if (!matchedItem) {
      matchedItem = (content.customPhotos || []).find(p => p.url === url);
      if (!matchedItem) {
        for (const cat of PHOTO_PRESET_LIBRARY) {
          const found = cat.photos.find(p => p.url === url);
          if (found) {
            matchedItem = { ...found, category: cat.category };
            break;
          }
        }
      }
    }

    const defaultAlt = matchedItem?.altText || `${editingPost.title} in ${matchedItem?.location || editingPost.geoData?.region || 'Turkey'}`;
    const defaultCaption = matchedItem?.caption || matchedItem?.description || editingPost.heroImageCaption || 'Curated travel photography by Baobab DMC Turkey.';

    const targetType = photoPickerTarget?.type || 'hero';

    if (targetType === 'hero') {
      setEditingPost({
        ...editingPost,
        heroImage: url,
        heroImageAlt: defaultAlt,
        heroImageCaption: defaultCaption
      });
      setOptimizationSuccessMsg('Hero photo updated from library!');
      setTimeout(() => setOptimizationSuccessMsg(null), 3000);
    } else if (targetType === 'section' && typeof photoPickerTarget?.sectionIndex === 'number') {
      const idx = photoPickerTarget.sectionIndex;
      const sections = [...editingPost.content.sections];
      if (sections[idx]) {
        sections[idx] = {
          ...sections[idx],
          image: url,
          imageAlt: matchedItem?.altText || sections[idx].heading,
          imageCaption: matchedItem?.caption || matchedItem?.description || sections[idx].heading
        };
        setEditingPost({
          ...editingPost,
          content: { ...editingPost.content, sections }
        });
        setOptimizationSuccessMsg(`Section #${idx + 1} photo updated!`);
        setTimeout(() => setOptimizationSuccessMsg(null), 3000);
      }
    }

    setPhotoPickerOpen(false);
    setPhotoPickerTarget(null);
  };

  // Section builders
  const handleAddSection = () => {
    if (!editingPost) return;
    const newSection: BlogSectionItem = {
      heading: `${editingPost.content.sections.length + 1}. New Exploration Chapter`,
      body: ['Write clear, authoritative travel details for this section.'],
      tipBox: 'Expert Field Advice: Pre-arrange entrance tickets to avoid peak queue times.'
    };
    setEditingPost({
      ...editingPost,
      content: {
        ...editingPost.content,
        sections: [...editingPost.content.sections, newSection]
      }
    });
  };

  const handleUpdateSection = (index: number, updates: Partial<BlogSectionItem>) => {
    if (!editingPost) return;
    const sections = [...editingPost.content.sections];
    sections[index] = { ...sections[index], ...updates };
    setEditingPost({
      ...editingPost,
      content: { ...editingPost.content, sections }
    });
  };

  const handleDeleteSection = (index: number) => {
    if (!editingPost) return;
    const sections = editingPost.content.sections.filter((_, i) => i !== index);
    setEditingPost({
      ...editingPost,
      content: { ...editingPost.content, sections }
    });
  };

  // FAQ builders
  const handleAddFaq = () => {
    if (!editingPost) return;
    const newFaq: BlogFaqItem = {
      q: 'Is private transport recommended for this region?',
      a: 'Yes, private chauffeured VIP vehicles offer the highest standard of safety, comfort, and flexibility for small group itineraries.'
    };
    setEditingPost({
      ...editingPost,
      content: {
        ...editingPost.content,
        faqs: [...(editingPost.content.faqs || []), newFaq]
      }
    });
  };

  const handleUpdateFaq = (index: number, updates: Partial<BlogFaqItem>) => {
    if (!editingPost) return;
    const faqs = [...(editingPost.content.faqs || [])];
    faqs[index] = { ...faqs[index], ...updates };
    setEditingPost({
      ...editingPost,
      content: { ...editingPost.content, faqs }
    });
  };

  const handleDeleteFaq = (index: number) => {
    if (!editingPost) return;
    const faqs = (editingPost.content.faqs || []).filter((_, i) => i !== index);
    setEditingPost({
      ...editingPost,
      content: { ...editingPost.content, faqs }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner & Title Bar */}
      <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F05A28] to-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-neutral-900">
                Blog & Destination Intelligence Studio
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#F05A28] border border-orange-200">
                SEO • AEO • AIO Engine
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Create, curate, edit travel guides and optimize for Google SERP (#1 Ranking), Perplexity/Voice Answers (AEO), and AI Overviews (AIO).
            </p>
          </div>
        </div>

        {/* Top Action Button */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleOpenCreateNew}
            className="w-full md:w-auto px-4 py-2.5 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
            <span>Total Articles</span>
            <FileText className="w-4 h-4 text-[#F05A28]" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{stats.total}</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">{stats.published} published • {stats.drafts} drafts</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
            <span>Average SEO Index</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{stats.avgScore}%</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">High SERP & Crawlability</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
            <span>AEO & AIO Ready</span>
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{stats.optimizedCount}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Rich answer snippets active</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
            <span>Schema.org JSON-LD</span>
            <Code className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">100%</div>
          <div className="text-[11px] text-cyan-600 mt-0.5">BlogPosting & FAQPage</div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, cities, keywords..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="space-y-3.5">
        {filteredBlogs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-dashed border-neutral-300">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-neutral-700">No blog guides match your search criteria</p>
            <p className="text-xs text-neutral-400 mt-1">Try clearing your filters or create a new blog post</p>
            <button
              onClick={handleOpenCreateNew}
              className="mt-4 px-4 py-2 bg-[#F05A28] text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Article</span>
            </button>
          </div>
        ) : (
          filteredBlogs.map((post) => {
            const overallScore = post.aiOptimization?.scores?.overallScore || 88;
            const isDraft = post.status === 'draft';
            const hasFaqs = post.content.faqs && post.content.faqs.length > 0;

            return (
              <div
                key={post.id}
                className="bg-white rounded-lg border border-neutral-200 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left: Thumbnail & Core Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 sm:w-28 sm:h-24 rounded-md overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt || post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white ${
                        isDraft ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}>
                        {isDraft ? 'Draft' : 'Live'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-neutral-500">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-semibold text-[10px] uppercase">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-[#F05A28]" />
                        <span>{post.geoData?.region || 'Turkiye'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{post.readTime}</span>
                      </span>
                      <span>•</span>
                      <span className="text-[11px] text-neutral-400">{post.publishedDate}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 truncate leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-1">
                      {post.excerpt}
                    </p>

                    {/* SEO & AEO Indicator Bar */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        overallScore >= 90
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>SEO/AEO Index: {overallScore}/100</span>
                      </div>

                      {post.aiOptimization?.aeoDirectAnswer && (
                        <span className="text-[10px] text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">
                          Direct Answer Ready
                        </span>
                      )}

                      {hasFaqs && (
                        <span className="text-[10px] text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">
                          {post.content.faqs?.length} FAQs
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {/* Quick AI Optimize Button */}
                  <button
                    onClick={() => handleRunAiOptimization(post)}
                    disabled={isOptimizing}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-[#F05A28] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Run quick AI SEO & AEO Optimization"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span className="hidden sm:inline">AI Optimize</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
                    title="Edit Full Article & Content"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => duplicateBlog(post.id)}
                    className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
                    title="Duplicate Post"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setPreviewPost(post)}
                    className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
                    title="Preview Live Guide"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                        deleteBlog(post.id);
                        saveChanges();
                      }
                    }}
                    className="p-2 bg-neutral-100 hover:bg-red-100 text-neutral-700 hover:text-red-600 rounded transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULL ARTICLE EDITOR & AI OPTIMIZATION STUDIO MODAL                        */}
      {/* ========================================================================= */}
      {editingPost && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full my-auto max-h-[94vh] flex flex-col overflow-hidden border border-neutral-200">
            {/* Modal Header */}
            <div className="bg-neutral-900 text-white px-5 py-3.5 flex items-center justify-between gap-3 border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-[#F05A28] flex items-center justify-center text-white shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {isCreatingNew ? 'Create New Destination Guide' : `Editing: ${editingPost.title}`}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Full Content Management, Media Selection & Expert SEO/AEO/AIO Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRunAiOptimization()}
                  disabled={isOptimizing}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#F05A28] to-amber-600 hover:from-[#D94526] hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  title="Run Full AI SEO, AEO & AIO Analysis"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{isOptimizing ? 'Optimizing with AI...' : '⚡ AI SEO/AEO Optimize'}</span>
                </button>

                <button
                  onClick={handleSaveEditingPost}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Article</span>
                </button>

                <button
                  onClick={() => setEditingPost(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification alert */}
            {optimizationSuccessMsg && (
              <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-bold flex items-center justify-between shrink-0 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{optimizationSuccessMsg}</span>
                </div>
                <button onClick={() => setOptimizationSuccessMsg(null)} className="text-white/80 hover:text-white">✕</button>
              </div>
            )}

            {/* Editor Sub-Tabs */}
            <div className="bg-neutral-100 border-b border-neutral-200 px-5 flex items-center gap-2 text-xs font-semibold shrink-0">
              <button
                onClick={() => setEditorActiveTab('content')}
                className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                  editorActiveTab === 'content'
                    ? 'border-[#F05A28] text-[#F05A28] font-bold bg-white'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Article Content & Logistics</span>
              </button>

              <button
                onClick={() => setEditorActiveTab('seo_aeo')}
                className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                  editorActiveTab === 'seo_aeo'
                    ? 'border-[#F05A28] text-[#F05A28] font-bold bg-white'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>2. AI SEO, AEO & AIO Optimization Suite</span>
                {editingPost.aiOptimization?.scores?.overallScore && (
                  <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-mono">
                    {editingPost.aiOptimization.scores.overallScore}%
                  </span>
                )}
              </button>

              <button
                onClick={() => setEditorActiveTab('photos')}
                className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                  editorActiveTab === 'photos'
                    ? 'border-[#F05A28] text-[#F05A28] font-bold bg-white'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>3. Photos & Media Library</span>
              </button>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* ================================================================= */}
              {/* TAB 1: ARTICLE CONTENT & LOGISTICS                                */}
              {/* ================================================================= */}
              {editorActiveTab === 'content' && (
                <div className="space-y-6">
                  {/* Basic Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center justify-between">
                        <span>Article Title</span>
                        <span className="text-[10px] text-neutral-400 font-normal">{editingPost.title.length} chars (Optimal: 50-60)</span>
                      </label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        placeholder="e.g. How Safe is It to Travel to Turkiye? A Complete Ground Security Guide"
                        className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Category</label>
                      <select
                        value={editingPost.category}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                      >
                        {categories.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slug, Read Time & Published Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Canonical Slug</label>
                      <input
                        type="text"
                        value={editingPost.slug}
                        onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                        placeholder="turkiye-travel-guide-2026"
                        className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 font-mono focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Read Time</label>
                      <input
                        type="text"
                        value={editingPost.readTime}
                        onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                        placeholder="7 min read"
                        className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Published Date / Season</label>
                      <input
                        type="text"
                        value={editingPost.publishedDate}
                        onChange={(e) => setEditingPost({ ...editingPost, publishedDate: e.target.value })}
                        placeholder="September 2026"
                        className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                      />
                    </div>
                  </div>

                  {/* Excerpt / Summary */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Article Excerpt & Search Meta Description</span>
                      <span className="text-[10px] text-neutral-400 font-normal">{editingPost.excerpt.length} chars (Optimal: 145-160)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      placeholder="An objective, field-tested safety and destination breakdown covering Istanbul, Cappadocia, transport security, and solo travel..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                    />
                  </div>

                  {/* Hero Photo Section */}
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#F05A28]" />
                        <span>Hero Cover Photo (WebP & High Resolution)</span>
                      </span>
                      <button
                        onClick={() => {
                          setPhotoPickerTarget({ type: 'hero' });
                          setPhotoPickerOpen(true);
                        }}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-medium flex items-center gap-1"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Select from Library</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-full sm:w-48 h-28 rounded-md overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300">
                        <img
                          src={editingPost.heroImage}
                          alt={editingPost.heroImageAlt || editingPost.title}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-600 block">Image URL</label>
                          <input
                            type="text"
                            value={editingPost.heroImage}
                            onChange={(e) => setEditingPost({ ...editingPost, heroImage: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900 font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-neutral-600 block">Hero Alt Text (SEO/Accessibility)</label>
                            <input
                              type="text"
                              value={editingPost.heroImageAlt || ''}
                              onChange={(e) => setEditingPost({ ...editingPost, heroImageAlt: e.target.value })}
                              placeholder="Descriptive image content..."
                              className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-neutral-600 block">Hero Caption</label>
                            <input
                              type="text"
                              value={editingPost.heroImageCaption || ''}
                              onChange={(e) => setEditingPost({ ...editingPost, heroImageCaption: e.target.value })}
                              placeholder="Travel photography by Baobab DMC..."
                              className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Geographic Entities & Operational Hubs */}
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#F05A28]" />
                      <span>Geographic Entities & Ground Operations Hubs</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-600">Primary Region</label>
                        <input
                          type="text"
                          value={editingPost.geoData?.region || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            geoData: { ...(editingPost.geoData || { keyCities: [] }), region: e.target.value }
                          })}
                          placeholder="e.g. Cappadocia, Istanbul, Aegean Coast"
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-600">Geo Coordinates</label>
                        <input
                          type="text"
                          value={editingPost.geoData?.coordinates || ''}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            geoData: { ...(editingPost.geoData || { region: '', keyCities: [] }), coordinates: e.target.value }
                          })}
                          placeholder="38.6431° N, 34.8289° E"
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900 font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-600">Key Cities / Hubs (Comma separated)</label>
                        <input
                          type="text"
                          value={(editingPost.geoData?.keyCities || []).join(', ')}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            geoData: {
                              ...(editingPost.geoData || { region: '' }),
                              keyCities: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                            }
                          })}
                          placeholder="Istanbul, Goreme, Antalya"
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Intro Paragraph */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Article Introduction (E-E-A-T Hook)
                    </label>
                    <textarea
                      rows={3}
                      value={editingPost.content.intro}
                      onChange={(e) => setEditingPost({
                        ...editingPost,
                        content: { ...editingPost.content, intro: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                    />
                  </div>

                  {/* Content Sections Builder */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#F05A28]" />
                        <span>Content Sections ({editingPost.content.sections.length})</span>
                      </h4>
                      <button
                        onClick={handleAddSection}
                        className="px-2.5 py-1 bg-neutral-900 hover:bg-[#F05A28] text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Section</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editingPost.content.sections.map((sec, idx) => (
                        <div key={idx} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 relative group/sec">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-neutral-500 font-mono">#{idx + 1}</span>
                            <button
                              onClick={() => handleDeleteSection(idx)}
                              className="text-neutral-400 hover:text-red-600 p-1 rounded"
                              title="Delete section"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-neutral-700">Section Heading</label>
                            <input
                              type="text"
                              value={sec.heading}
                              onChange={(e) => handleUpdateSection(idx, { heading: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs font-bold text-neutral-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-neutral-700">Section Body Paragraphs (One paragraph per line)</label>
                            <textarea
                              rows={3}
                              value={Array.isArray(sec.body) ? sec.body.join('\n\n') : sec.body}
                              onChange={(e) => handleUpdateSection(idx, { body: e.target.value.split('\n\n').filter(Boolean) })}
                              className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900"
                            />
                          </div>

                          {/* Section Image Option */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[10px] font-semibold text-neutral-600">Section Photo (Optional)</label>
                                <button
                                  onClick={() => {
                                    setPhotoPickerTarget({ type: 'section', sectionIndex: idx });
                                    setPhotoPickerOpen(true);
                                  }}
                                  className="text-[10px] text-[#F05A28] hover:underline"
                                >
                                  Pick Photo
                                </button>
                              </div>
                              <input
                                type="text"
                                value={sec.image || ''}
                                onChange={(e) => handleUpdateSection(idx, { image: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-2 py-1 border border-neutral-300 rounded text-xs font-mono"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-semibold text-neutral-600 block mb-1">Pro Tip Box (Optional)</label>
                              <input
                                type="text"
                                value={sec.tipBox || ''}
                                onChange={(e) => handleUpdateSection(idx, { tipBox: e.target.value })}
                                placeholder="e.g. Tip: Book cave terrace rooms 6 months in advance..."
                                className="w-full px-2 py-1 border border-neutral-300 rounded text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frequently Asked Questions (FAQ) Builder */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#F05A28]" />
                          <span>Frequently Asked Questions (FAQ) for Voice & AEO ({editingPost.content.faqs?.length || 0})</span>
                        </h4>
                        <p className="text-[11px] text-neutral-500">Google FAQPage Schema and voice search answers.</p>
                      </div>

                      <button
                        onClick={handleAddFaq}
                        className="px-2.5 py-1 bg-neutral-900 hover:bg-[#F05A28] text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add FAQ</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(editingPost.content.faqs || []).map((faq, fIdx) => (
                        <div key={fIdx} className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-neutral-400 font-mono">Q&A #{fIdx + 1}</span>
                            <button
                              onClick={() => handleDeleteFaq(fIdx)}
                              className="text-neutral-400 hover:text-red-600 p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={faq.q}
                            onChange={(e) => handleUpdateFaq(fIdx, { q: e.target.value })}
                            placeholder="Question matching search query..."
                            className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-900"
                          />
                          <textarea
                            rows={2}
                            value={faq.a}
                            onChange={(e) => handleUpdateFaq(fIdx, { a: e.target.value })}
                            placeholder="Direct, authoritative answer..."
                            className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Article Conclusion & B2B Inquiry CTA
                    </label>
                    <textarea
                      rows={2}
                      value={editingPost.content.conclusion}
                      onChange={(e) => setEditingPost({
                        ...editingPost,
                        content: { ...editingPost.content, conclusion: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                    />
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 2: AI SEO, AEO & AIO OPTIMIZATION SUITE                      */}
              {/* ================================================================= */}
              {editorActiveTab === 'seo_aeo' && (
                <div className="space-y-6">
                  {/* Optimizer Launch Hero Card */}
                  <div className="p-5 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-xl shadow-lg border border-neutral-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F05A28] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                          Autonomous SEO, AEO & AIO Expert Engine
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Full-Spectrum Search, Answer Engine & AI Overview Optimizer
                      </h3>
                      <p className="text-xs text-neutral-300">
                        Analyzes semantic entities, keyword density, featured snippet triggers, voice queries, and generates complete Schema.org JSON-LD structured data.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => handleRunAiOptimization()}
                        disabled={isOptimizing}
                        className="px-5 py-3 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                      >
                        <Zap className="w-4 h-4 fill-current" />
                        <span>{isOptimizing ? 'Analyzing & Optimizing...' : 'Run Full AI Optimization'}</span>
                      </button>

                      {lastOptimizationResult && (
                        <button
                          onClick={handleApplyAiSuggestionsToContent}
                          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                          title="Apply suggested titles, slug, excerpt, keywords and FAQs into the article"
                        >
                          <Check className="w-4 h-4" />
                          <span>Apply AI to Article</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Score Breakdown Bar */}
                  {editingPost.aiOptimization?.scores ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Overall AI Score</div>
                        <div className="text-3xl font-extrabold text-emerald-600">
                          {editingPost.aiOptimization.scores.overallScore}%
                        </div>
                        <div className="text-[10px] text-emerald-700 mt-0.5">Top-tier search readiness</div>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="text-[11px] font-bold text-orange-800 uppercase tracking-wider">Google SERP SEO</div>
                        <div className="text-3xl font-extrabold text-[#F05A28]">
                          {editingPost.aiOptimization.scores.seoScore}%
                        </div>
                        <div className="text-[10px] text-orange-700 mt-0.5">Meta titles & CTR hooks</div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">AEO Direct Answers</div>
                        <div className="text-3xl font-extrabold text-amber-600">
                          {editingPost.aiOptimization.scores.aeoScore}%
                        </div>
                        <div className="text-[10px] text-amber-700 mt-0.5">Perplexity / Voice snippets</div>
                      </div>

                      <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                        <div className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider">AIO Overview Graph</div>
                        <div className="text-3xl font-extrabold text-cyan-600">
                          {editingPost.aiOptimization.scores.aioScore}%
                        </div>
                        <div className="text-[10px] text-cyan-700 mt-0.5">Entity density & grounding</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#F05A28]" />
                        <span>Click <strong>"Run Full AI Optimization"</strong> above to generate comprehensive scores, answer snippets, and schema markup.</span>
                      </div>
                    </div>
                  )}

                  {/* AEO (Answer Engine Optimization) Direct Answer Section */}
                  <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#F05A28]" />
                        <span>AEO Direct Answer Snippet (Voice Search & Perplexity Ready)</span>
                      </span>
                      <span className="text-[10px] text-neutral-400">45-60 words conciseness</span>
                    </div>

                    <textarea
                      rows={3}
                      value={editingPost.aiOptimization?.aeoDirectAnswer || ''}
                      onChange={(e) => setEditingPost({
                        ...editingPost,
                        aiOptimization: {
                          ...(editingPost.aiOptimization || {}),
                          aeoDirectAnswer: e.target.value
                        }
                      })}
                      placeholder="Concise, direct answer addressing the core traveler question directly for zero-click Google featured snippets and conversational LLMs..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded text-xs text-neutral-900 leading-relaxed font-medium bg-orange-50/30"
                    />
                  </div>

                  {/* AIO Key Takeaway Bullets */}
                  <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#F05A28]" />
                        <span>AIO Key Takeaway Bullets (Google AI Overviews & Citations)</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      {(editingPost.aiOptimization?.aioKeyTakeaways || [
                        `Strategic overview of ${editingPost.geoData?.region || 'Turkey'} travel logistics.`,
                        'Licensed A-Grade TÜRSAB ground dispatch ensures verified VIP transport.',
                        'Curated cultural access and private pacing for tour operators.'
                      ]).map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const newBullets = [...(editingPost.aiOptimization?.aioKeyTakeaways || [])];
                              newBullets[idx] = e.target.value;
                              setEditingPost({
                                ...editingPost,
                                aiOptimization: {
                                  ...(editingPost.aiOptimization || {}),
                                  aioKeyTakeaways: newBullets
                                }
                              });
                            }}
                            className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-xs text-neutral-900"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Google SERP Live Snippet Preview */}
                  <div className="p-5 bg-white rounded-lg border border-neutral-200 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Live Google Search Snippet Preview</span>
                    </span>

                    <div className="p-4 bg-white rounded border border-neutral-200 font-sans space-y-1 max-w-2xl">
                      <div className="text-[11px] text-[#202124] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#F05A28] flex items-center justify-center text-[8px] text-white font-bold">B</span>
                        <span className="text-neutral-700">https://baobabdmcturkey.com</span>
                        <span className="text-neutral-400">› blog › {editingPost.slug}</span>
                      </div>
                      <h4 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1">
                        {editingPost.aiOptimization?.metaTitle || `${editingPost.title} | Baobab DMC Turkey`}
                      </h4>
                      <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                        {editingPost.aiOptimization?.metaDescription || editingPost.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Schema.org JSON-LD Generator */}
                  <div className="p-5 bg-neutral-900 text-white rounded-lg border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Code className="w-4 h-4" />
                        <span>Schema.org JSON-LD (BlogPosting, FAQPage & TouristDestination)</span>
                      </span>

                      <button
                        onClick={() => {
                          const schema = editingPost.aiOptimization?.schemaJsonLd || '{}';
                          navigator.clipboard.writeText(schema).then(() => {
                            setCopiedSchema(true);
                            setTimeout(() => setCopiedSchema(false), 2500);
                          });
                        }}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded text-[11px] flex items-center gap-1 font-sans"
                      >
                        {copiedSchema ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                        <span>{copiedSchema ? 'Copied' : 'Copy Schema JSON'}</span>
                      </button>
                    </div>

                    <pre className="text-[11px] text-emerald-400 font-mono max-h-48 overflow-y-auto whitespace-pre-wrap p-3 bg-black/40 rounded border border-neutral-800">
                      {editingPost.aiOptimization?.schemaJsonLd || '// Schema JSON will generate when running AI Optimizer'}
                    </pre>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 3: PHOTOS & MEDIA LIBRARY                                     */}
              {/* ================================================================= */}
              {editorActiveTab === 'photos' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#F05A28]" />
                        <span>Curated Photo Library & Direct Image Selection</span>
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Click any photo below to instantly assign it to the Article Hero or launch the full AI WebP Photo Studio.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPickerTarget({ type: 'hero' });
                          setPhotoPickerOpen(true);
                        }}
                        className="px-4 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Open Photo Studio Pop-up</span>
                      </button>
                    </div>
                  </div>

                  {/* Selected Hero Photo Card */}
                  <div className="p-4 bg-white rounded-lg border border-neutral-200 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                      Current Article Hero Photo:
                    </span>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div 
                        onClick={() => {
                          setPhotoPickerTarget({ type: 'hero' });
                          setPhotoPickerOpen(true);
                        }}
                        className="w-full sm:w-60 h-36 rounded-md overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300 relative group cursor-pointer"
                        title="Click to change Hero photo from library"
                      >
                        <img
                          src={editingPost.heroImage}
                          alt={editingPost.heroImageAlt || editingPost.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>Change Photo</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 text-xs">
                        <div>
                          <span className="font-bold text-neutral-800 uppercase tracking-wider text-[10px] block">Hero Photo Alt Text:</span>
                          <p className="text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200 mt-1">
                            {editingPost.heroImageAlt || 'Scenic travel photography by Baobab DMC'}
                          </p>
                        </div>

                        <div>
                          <span className="font-bold text-neutral-800 uppercase tracking-wider text-[10px] block">Caption:</span>
                          <p className="text-neutral-700 bg-neutral-50 p-2 rounded border border-neutral-200 mt-1">
                            {editingPost.heroImageCaption || 'Curated high-resolution travel photography'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Select Grid from Presets & Custom Uploads */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                        <span>One-Click Photo Selection Grid</span>
                      </h5>
                      <span className="text-[11px] text-neutral-500">
                        {PHOTO_PRESET_LIBRARY.flatMap(c => c.photos).length + (content.customPhotos?.length || 0)} photos available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-1">
                      {[...(content.customPhotos || []), ...PHOTO_PRESET_LIBRARY.flatMap(c => c.photos.map(p => ({ ...p, category: c.category })))].map((p, pIdx) => {
                        const isCurrentHero = editingPost.heroImage === p.url;
                        return (
                          <div 
                            key={`${p.url}-${pIdx}`}
                            className={`rounded-lg border overflow-hidden bg-white shadow-2xs group flex flex-col justify-between ${
                              isCurrentHero ? 'border-[#F05A28] ring-2 ring-[#F05A28]/30' : 'border-neutral-200 hover:border-neutral-300'
                            }`}
                          >
                            <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                              <img
                                src={p.url}
                                alt={p.altText || p.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              {isCurrentHero && (
                                <div className="absolute top-1.5 right-1.5 bg-[#F05A28] text-white p-1 rounded-full shadow-md">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                              <div className="absolute bottom-1.5 left-1.5">
                                <span className="text-[9px] bg-black/70 backdrop-blur-xs text-white px-1.5 py-0.5 rounded font-medium">
                                  {p.location}
                                </span>
                              </div>
                            </div>

                            <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between">
                              <p className="text-[11px] font-bold text-neutral-900 line-clamp-1">
                                {p.title}
                              </p>
                              <div className="flex items-center gap-1 pt-1 border-t border-neutral-100">
                                <button
                                  type="button"
                                  onClick={() => handleSelectPhoto({ ...p, url: p.url })}
                                  className="flex-1 px-2 py-1 bg-neutral-900 hover:bg-[#F05A28] text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors"
                                >
                                  Set as Hero
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="bg-neutral-100 px-5 py-3 border-t border-neutral-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Status:</span>
                <button
                  onClick={() => setEditingPost({
                    ...editingPost,
                    status: editingPost.status === 'draft' ? 'published' : 'draft'
                  })}
                  className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    editingPost.status === 'draft'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {editingPost.status === 'draft' ? 'Draft Mode' : 'Live / Published'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-3.5 py-2 text-neutral-600 hover:text-neutral-900 text-xs font-semibold rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveEditingPost}
                  className="px-5 py-2 bg-[#F05A28] hover:bg-[#D94526] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Picker Modal with guaranteed highest z-index z-[160] */}
      {photoPickerOpen && (
        <PhotoLibraryModal
          isOpen={photoPickerOpen}
          onClose={() => {
            setPhotoPickerOpen(false);
            setPhotoPickerTarget(null);
          }}
          onSelectPhoto={handleSelectPhoto}
          currentUrl={
            photoPickerTarget?.type === 'hero'
              ? editingPost?.heroImage
              : (photoPickerTarget?.type === 'section' && typeof photoPickerTarget.sectionIndex === 'number'
                  ? editingPost?.content.sections[photoPickerTarget.sectionIndex]?.image
                  : undefined)
          }
          title={
            photoPickerTarget?.type === 'hero'
              ? `Select Hero Photo: ${editingPost?.title || 'Article'}`
              : `Select Chapter Photo for Section #${(photoPickerTarget?.sectionIndex ?? 0) + 1}`
          }
          zIndexClass="z-[160]"
        />
      )}
    </div>
  );
};
