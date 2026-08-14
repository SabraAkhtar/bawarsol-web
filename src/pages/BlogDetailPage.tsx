import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, User, Share2, Sparkles, BookOpen, Check, ArrowRight } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion } from 'framer-motion';

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-32 text-center flex items-center justify-center">
        <div className="text-[#00F0FF] animate-pulse font-bold text-lg">Loading publication details...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-32 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Publication Not Found</h2>
        <button
          onClick={() => onNavigate('/blogs')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-[#00F0FF] rounded-full text-sm border border-white/10 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Publications</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Back Button & Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('/blogs')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-8 px-4 py-2 rounded-full hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </motion.button>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <BookOpen className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>{blog.category}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {blog.title}
          </motion.h1>

          {/* Author & Meta Line */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-b border-white/10 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center font-bold text-[#00F0FF] text-base shadow-inner">
                {blog.author.charAt(0)}
              </div>
              <div>
                <div className="font-extrabold text-white text-sm">{blog.author}</div>
                <div className="text-slate-400 text-xs mt-0.5">{blog.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {blog.readTime}
              </span>
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border text-sm font-bold transition-all ${
                  copied
                    ? 'bg-[#00F0FF]/20 border-[#00F0FF]/50 text-[#00F0FF]'
                    : 'bg-black/40 border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-10"
      >
        <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-[28rem] relative">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${blog.slug}/1200/500`; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Blog Article Body */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-200 text-base leading-relaxed space-y-8 relative z-10"
      >
        <div className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border-l-4 border-[#00F0FF] border border-white/10 text-slate-300 italic font-medium text-lg leading-relaxed shadow-inner">
          {blog.excerpt}
        </div>

        {/* Content Render */}
        <div className="prose prose-invert max-w-none space-y-6">
          {blog.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('# ')) {
              return (
                <h2 key={idx} className="text-3xl font-extrabold text-white pt-6 pb-2 border-b border-white/10">
                  {trimmed.replace(/^# /, '')}
                </h2>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h3 key={idx} className="text-2xl font-bold text-[#00F0FF] pt-5">
                  {trimmed.replace(/^## /, '')}
                </h3>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h4 key={idx} className="text-xl font-bold text-white pt-4">
                  {trimmed.replace(/^### /, '')}
                </h4>
              );
            }
            if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
              return (
                <ul key={idx} className="space-y-2 pl-6">
                  {trimmed.split('\n').filter(l => l.trim()).map((li, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-3 text-slate-300">
                      <span className="text-[#00F0FF] mt-1.5 shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(li.replace(/^- /, '')) }} />
                    </li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <ol key={idx} className="list-decimal pl-6 space-y-2 text-slate-300">
                  {trimmed.split('\n').filter(l => l.trim()).map((li, lIdx) => (
                    <li key={lIdx} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(li.replace(/^\d+\.\s/, '')) }} />
                  ))}
                </ol>
              );
            }
            return (
              <p
                key={idx}
                className="text-slate-300 leading-relaxed text-base"
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(trimmed) }}
              />
            );
          })}
        </div>
      </motion.article>

      {/* Related Publications */}
      {related.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 mt-12 relative z-10"
        >
          <h3 className="text-3xl font-extrabold text-white mb-10">Related Engineering Publications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={rel.id}
                onClick={() => onSelectBlog(rel.slug)}
                className="p-7 rounded-[1.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-[#00F0FF]/40 hover:bg-white/[0.04] transition-all cursor-pointer group shadow-xl overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">{rel.category}</div>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-[#00F0FF] line-clamp-2 leading-tight transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] pt-2 group-hover:gap-2.5 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
