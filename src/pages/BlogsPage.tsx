import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, User, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

interface BlogsPageProps {
  onNavigate: (path: string) => void;
  onSelectBlog: (slug: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onNavigate, onSelectBlog }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Agentic AI',
    'Generative AI',
    'RAG Systems',
    'Computer Vision',
    'NLP',
    'Automation',
    'Software Engineering',
  ];

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load blogs', err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Publications & Insights</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            AI Engineering <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Technical Insights & Research
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            In-depth engineering breakdowns on agentic workflows, enterprise RAG optimization, vision model quantization, and scalable AI infrastructure.
          </p>

          {/* Search & Category Bar */}
          <div className="pt-6 max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search research papers, articles, categories..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] shadow-inner"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#00F0FF] text-black font-bold shadow-md shadow-[#00F0FF]/20'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Featured Article Hero Card */}
          {featuredBlog && selectedCategory === 'All' && !searchTerm && (
            <div
              onClick={() => onSelectBlog(featuredBlog.slug)}
              className="p-8 md:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/50 transition-all shadow-2xl cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Featured Publication</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
                  {featuredBlog.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5 font-medium text-slate-200">
                    <User className="w-3.5 h-3.5 text-[#00F0FF]" />
                    {featuredBlog.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {featuredBlog.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredBlog.readTime}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 h-72 rounded-2xl overflow-hidden relative border border-white/10">
                <img
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/blog-featured/1200/600'; }}
                />
              </div>
            </div>
          )}

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading BawarSol research publications...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No articles found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => onSelectBlog(blog.slug)}
                  className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#00F0FF]/50 transition-all cursor-pointer shadow-xl"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${blog.id}/800/400`; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/80 text-[#00F0FF] border border-white/10 backdrop-blur">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">{blog.author}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#00F0FF]">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
