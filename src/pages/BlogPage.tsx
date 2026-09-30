import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { BlogSection } from '../components/BlogSection';
import { BlogPost } from '../data/blogData';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogPageProps {
  onSelectBlogPost: (post: BlogPost) => void;
  onOpenInquiry: (initialData?: Record<string, any>) => void;
  onNavigateHome: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onSelectBlogPost,
  onOpenInquiry,
  onNavigateHome
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title={t('pages.blog.title')}
        subtitle={t('pages.blog.subtitle')}
        categoryBadge={t('pages.blog.badge')}
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: t('nav.blog') }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: t('pages.blog.cta'),
          onClick: () => onOpenInquiry({ source: 'Blog Page' }),
          icon: <BookOpen className="w-4 h-4" />
        }}
      />

      <div className="bg-neutral-900 py-6">
        <BlogSection onSelectPost={onSelectBlogPost} />
      </div>
    </div>
  );
};
