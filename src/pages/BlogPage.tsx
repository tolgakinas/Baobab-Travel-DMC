import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { BlogSection } from '../components/BlogSection';
import { BlogPost } from '../data/blogData';
import { BookOpen, Sparkles } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-neutral-900">
      <PageHeader
        title="Turkey Travel Insights & DMC Journal"
        subtitle="Expert regional guides, logistical advice, culinary spotlights, and insider tips curated by our local destination specialists for travel advisors and tour operators."
        categoryBadge="Destination Intelligence"
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Travel Insights & Blog' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=2000&q=85"
        actionButton={{
          label: 'Plan a Story-Driven Tour',
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
