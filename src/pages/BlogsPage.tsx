import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, User, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion, AnimatePresence } from 'framer-motion';
import { STATIC_BLOGS } from '../data/blogsData';

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
    'Web & Graphics',
    'NLP',
    'Automation',
    'Software Engineering',
  ];

  useEffect(() => {
    // Use static data — no API call needed (works on Vercel)
    setBlogs(STATIC_BLOGS.filter((b) => b.published));
    setLoading(false);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-20 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <Sparkles className="w-4 h-4 text-[#00F0FF]" />
            <span>Engineering Publications &amp; Insights</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
            AI Engineering <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Technical Insights &amp; Research
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            In-depth engineering breakdowns on agentic workflows, enterprise RAG optimization, vision model quantization, and scalable AI infrastructure.
          </motion.p>

          {/* Search & Category Bar */}
          <motion.div variants={itemVariants} className="pt-4 max-w-2xl mx-auto space-y-5">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, categories, topics..."
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white/[0.04] border border-white/10 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/50 focus:ring-1 focus:ring-[#00F0FF]/30 shadow-inner transition-all backdrop-blur-xl"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-105'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 relative">
        <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          {/* Featured Article Hero Card */}
          <AnimatePresence>
            {featuredBlog && selectedCategory === 'All' && !searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectBlog(featuredBlog.slug)}
                className="p-8 md:p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 hover:border-[#00F0FF]/50 transition-all shadow-2xl cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="lg:col-span-6 space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Featured Publication</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-slate-300 text-base leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2 font-bold text-slate-200">
                      {featuredBlog.authorAvatar ? (
                        <img src={featuredBlog.authorAvatar} alt={featuredBlog.author} className="w-5 h-5 rounded-full object-cover border border-[#00F0FF]/30" />
                      ) : (
                        <User className="w-4 h-4 text-[#00F0FF]" />
                      )}
                      {featuredBlog.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      {featuredBlog.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      {featuredBlog.readTime}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-[#00F0FF] group-hover:gap-3 transition-all">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="lg:col-span-6 h-72 lg:h-80 rounded-[1.5rem] overflow-hidden relative border border-white/10 shadow-xl">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/portfolio/blog_agentic_ai_1786722488737.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Muhammad Idrees Bio Card */}
          {(selectedCategory === 'All' || selectedCategory !== 'Web & Graphics') && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl group mb-12"
            >
              <div className="absolute inset-0 bg-[#050505] rounded-[2.5rem] -z-10" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-bl from-[#00F0FF]/[0.03] to-transparent overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
                
                {/* Text Section (Left Side for Idrees) */}
                <div className="flex-1 space-y-6 text-center md:text-left relative z-10 order-2 md:order-1">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#00F0FF]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Visionary Leader
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Muhammad Idrees</span>
                    </h3>
                    <p className="text-[#00F0FF]/80 font-medium tracking-wide">Founder & CEO of BawarSol</p>
                  </div>
                  
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#00F0FF] to-transparent mx-auto md:mx-0" />
                  
                  <div className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto md:mx-0 space-y-3">
                    <p>
                      <strong className="text-white">Muhammad Idrees</strong> is the Founder & CEO of <strong className="text-white">BawarSol</strong>, a technology company dedicated to building intelligent solutions that help businesses innovate, automate, and grow. With expertise in <em>Artificial Intelligence, Machine Learning, Computer Vision, Generative AI, AI Agents, RAG systems, and automation</em>, he leads BawarSol’s technical vision and product development.
                    </p>
                    <p>
                      His mission is to bridge the gap between <em>cutting-edge AI and real-world business needs</em>, transforming complex ideas into reliable, scalable, and impactful technology solutions.
                    </p>
                    <p className="italic text-slate-300 font-medium">
                      “Engineering Intelligent Solutions that create real-world impact.”
                    </p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
                    <button onClick={() => window.location.href='/contact'} className="px-6 py-2.5 rounded-full bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-[#00F0FF] text-sm font-bold transition-all flex items-center gap-2 group/btn cursor-pointer shadow-lg">
                      Let's Discuss AI
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Image Section (Right Side for Idrees) */}
                <div className="relative shrink-0 mx-auto md:mx-0 order-1 md:order-2">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tl from-[#00F0FF]/40 via-white/10 to-transparent">
                    <img
                      src="/images/team/muhammad_idrees_ceo.jpg"
                      alt="Muhammad Idrees"
                      className="w-full h-full object-cover rounded-full filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 object-top"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#00F0FF]/20 rounded-full blur-2xl" />
                  <div className="absolute top-1/2 -right-4 w-1 h-12 bg-gradient-to-b from-[#00F0FF] to-transparent rounded-full opacity-50" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Professional Author Bio Card (Sabra) */}
          {(selectedCategory === 'All' || selectedCategory === 'Web & Graphics') && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl group"
            >
              {/* Inner Card */}
              <div className="absolute inset-0 bg-[#050505] rounded-[2.5rem] -z-10" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#00F0FF]/[0.03] to-transparent overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
                
                {/* Image Section */}
                <div className="relative shrink-0 mx-auto md:mx-0">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-[#00F0FF]/40 via-white/10 to-transparent">
                    <img
                      src="/images/team/sabra_akhtar.jpg"
                      alt="Sabra Akhtar"
                      className="w-full h-full object-cover rounded-full filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#00F0FF]/20 rounded-full blur-2xl" />
                  <div className="absolute top-1/2 -left-4 w-1 h-12 bg-gradient-to-b from-[#00F0FF] to-transparent rounded-full opacity-50" />
                </div>
                
                {/* Text Section */}
                <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#00F0FF]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Operational Excellence
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Sabra Akhtar</span>
                    </h3>
                    <p className="text-[#00F0FF]/80 font-medium tracking-wide">Co-Founder & Admin Manager</p>
                  </div>
                  
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#00F0FF] to-transparent mx-auto md:mx-0" />
                  
                  <div className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto md:mx-0 space-y-3">
                    <p>
                      <strong className="text-white">Sabra Akhtar</strong> is the Co-Founder and <strong className="text-white">Admin Manager at BawarSol</strong>. She is passionate about combining creativity, organization, and technology to help build and grow a strong and professional company.
                    </p>
                    <p>
                      At BawarSol, she oversees administrative operations, coordinates internal activities, and contributes to creating an efficient and productive work environment. She is committed to supporting the team, managing day-to-day operations, and helping turn ideas into meaningful results.
                    </p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
                    <button onClick={() => window.location.href='/portfolio'} className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all flex items-center gap-2 group/btn cursor-pointer shadow-lg hover:shadow-[#00F0FF]/20">
                      View My Work
                      <ArrowRight className="w-4 h-4 text-[#00F0FF] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-20 text-[#00F0FF] font-bold animate-pulse text-lg">
              Loading BawarSol research publications...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBlogs.map((blog) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  key={blog.id}
                  onClick={() => onSelectBlog(blog.slug)}
                  className="rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-[#00F0FF]/40 hover:bg-white/[0.04] transition-all cursor-pointer shadow-xl"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/portfolio/blog_agentic_ai_1786722488737.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold bg-black/70 text-[#00F0FF] border border-[#00F0FF]/30 backdrop-blur-sm">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-7 space-y-4">
                      <h3 className="text-lg font-extrabold text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-7 border-t border-white/5 pt-4 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-300 text-xs flex items-center gap-2">
                      {blog.authorAvatar ? (
                        <img src={blog.authorAvatar} alt={blog.author} className="w-5 h-5 rounded-full object-cover border border-[#00F0FF]/30" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-[#00F0FF]" />
                      )}
                      {blog.author}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-[#00F0FF] group-hover:gap-2.5 transition-all text-xs">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
