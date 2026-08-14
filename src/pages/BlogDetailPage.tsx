import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, User, Share2, Sparkles, BookOpen, Check } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

interface BlogDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectBlog: (slug: string) => void;
}

// Converts **bold**, *italic*, and `code` inline markdown to HTML
function renderInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-slate-200">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-black/60 text-[#00F0FF] px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">$1</code>');
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onNavigate, onSelectBlog }) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          setBlog(data.blog);
          setRelated(data.related || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blog detail', err);
        setLoading(false);
      });
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-32 text-center">
        <p className="text-slate-400">Loading publication details...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-32 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Publication Not Found</h2>
        <button
          onClick={() => onNavigate('/blogs')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] text-[#00F0FF] rounded-lg text-sm border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Publications</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">
      {/* Back Button & Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <button
          onClick={() => onNavigate('/blogs')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#00F0FF] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </button>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
            <BookOpen className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>{blog.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Author & Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-white/10 py-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center font-bold text-[#00F0FF] text-sm">
                {blog.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{blog.author}</div>
                <div className="text-slate-400">{blog.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTime}
              </span>
              <span>•</span>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 hover:text-white text-slate-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00F0FF]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-96 relative">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${blog.slug}/1200/500`; }}
          />
        </div>
      </div>

      {/* Blog Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-200 text-base leading-relaxed space-y-6">
        <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border-l-4 border-[#00F0FF] border border-white/10 text-slate-300 italic font-medium">
          {blog.excerpt}
        </div>

        {/* Content Render */}
        <div className="prose prose-invert max-w-none space-y-6">
          {blog.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('# ')) {
              return <h2 key={idx} className="text-2xl font-bold text-white pt-4">{trimmed.replace(/^# /, '')}</h2>;
            }
            if (trimmed.startsWith('## ')) {
              return <h3 key={idx} className="text-xl font-bold text-[#00F0FF] pt-3">{trimmed.replace(/^## /, '')}</h3>;
            }
            if (trimmed.startsWith('### ')) {
              return <h4 key={idx} className="text-lg font-bold text-white pt-2">{trimmed.replace(/^### /, '')}</h4>;
            }
            if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-300">
                  {trimmed.split('\n').filter(l => l.trim()).map((li, lIdx) => (
                    <li key={lIdx} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(li.replace(/^- /, '')) }} />
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-1 text-slate-300">
                  {trimmed.split('\n').filter(l => l.trim()).map((li, lIdx) => (
                    <li key={lIdx} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(li.replace(/^\d+\.\s/, '')) }} />
                  ))}
                </ol>
              );
            }
            return <p key={idx} className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(trimmed) }} />;
          })}
        </div>
      </article>

      {/* Related Publications */}
      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10 mt-12">
          <h3 className="text-xl font-bold text-white mb-6">Related Engineering Publications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectBlog(rel.slug)}
                className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/40 transition-all cursor-pointer group"
              >
                <div className="text-xs text-[#00F0FF] font-semibold mb-2">{rel.category}</div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#00F0FF] line-clamp-2 mb-2">
                  {rel.title}
                </h4>
                <p className="text-slate-400 text-xs line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
