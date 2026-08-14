import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Bot, Database, Eye, BrainCircuit, Code2, Shield, CheckCircle2, TrendingUp, Cpu, Workflow, MessageSquareText } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { AINodeVisual } from '../components/AINodeVisual';
import { GlobalCTA } from '../components/GlobalCTA';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceIconMap: Record<string, React.ReactNode> = {
    Bot: <Bot className="w-6 h-6 text-[#00F0FF]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#00F0FF]" />,
    Database: <Database className="w-6 h-6 text-[#00F0FF]" />,
    Eye: <Eye className="w-6 h-6 text-[#00F0FF]" />,
    MessageSquareText: <MessageSquareText className="w-6 h-6 text-[#00F0FF]" />,
    Workflow: <Workflow className="w-6 h-6 text-[#00F0FF]" />,
    BrainCircuit: <BrainCircuit className="w-6 h-6 text-[#00F0FF]" />,
    Code2: <Code2 className="w-6 h-6 text-[#00F0FF]" />,
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-20">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-28 overflow-hidden border-b border-white/[0.05] bg-[#050505]">
        {/* Subtle, refined ambient backdrops */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#00F0FF]/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#0066FF]/[0.04] to-transparent rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              {/* Refined Eyebrow Label */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
                Enterprise AI Systems
              </motion.div>

              {/* Huge, Tight Headline */}
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.03em] text-white leading-[1.05]"
              >
                Engineering <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-500">
                  Intelligent Solutions.
                </span>
              </motion.h1>

              {/* Elegant Paragraph */}
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-slate-400 text-lg sm:text-xl font-normal leading-[1.6] max-w-2xl"
              >
                We architect AI-powered products, intelligent automation, and scalable software that transform ambitious concepts into robust, real-world systems.
              </motion.p>

              {/* Premium CTA Buttons */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
              >
                <button
                  onClick={() => handleNav('/book-a-call')}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => handleNav('/services')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-sm text-slate-300 bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:text-white transition-all"
                >
                  Explore Capabilities
                </button>
              </motion.div>

              {/* Refined Social Proof */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 1, delay: 0.6 } }
                }}
                className="pt-8 border-t border-white/[0.05] flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-medium text-slate-500 tracking-wide uppercase"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40" />
                  Production Agent Systems
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40" />
                  Zero-Hallucination RAG
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/40" />
                  Enterprise Security
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <AINodeVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE EXPERTISE / SERVICES SHOWCASE */}
      <section className="py-20 bg-[#050505] bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest">
              Core Engineering Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pioneering AI Systems Built for <span className="font-serif italic font-normal text-[#00F0FF]">Enterprise Scale</span>
            </h3>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              From autonomous decision engines to quantized vision models, BawarSol designs custom architectures tailored for high throughput and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.slice(0, 8).map((service) => (
              <div
                key={service.id}
                onClick={() => handleNav('/services')}
                className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-[#00F0FF]/10 hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#00F0FF]/40 transition-all">
                    {serviceIconMap[service.iconName] || <Bot className="w-6 h-6 text-[#00F0FF]" />}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#00F0FF]">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => handleNav('/services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 hover:bg-[#00F0FF]/20 transition-all"
            >
              <span>View All Detailed Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* INDUSTRY SOLUTIONS PREVIEW */}
      <section className="py-20 bg-[#050505] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block mb-2">
                Industry Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI Built for Specialized Sectors
              </h2>
            </div>
            <button
              onClick={() => handleNav('/industries')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00F0FF] hover:underline"
            >
              <span>Explore All 8 Industry Modules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES_DATA.slice(0, 4).map((ind) => (
              <div
                key={ind.id}
                onClick={() => handleNav('/industries')}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 transition-all cursor-pointer group"
              >
                <div className="text-xs font-semibold text-[#00F0FF] mb-2 uppercase tracking-wider">
                  {ind.name}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                  {ind.tagline}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                  {ind.description}
                </p>
                <div className="text-[11px] text-slate-300 bg-black/50 p-2.5 rounded-lg border border-white/10 font-mono text-[#00F0FF]">
                  {ind.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS GATEWAY */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block">
              Case Studies & Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Work
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Real-world systems deployed by BawarSol across healthcare, financial audit, edge vision, and freight automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleNav('/portfolio')}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden group cursor-pointer hover:border-[#00F0FF]/50 transition-all shadow-xl"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#00F0FF] text-black backdrop-blur">
                    {proj.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="text-xs text-[#00F0FF] font-medium">
                    ⚡ {proj.impactMetric}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => handleNav('/portfolio')}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-lg shadow-[#00F0FF]/20"
            >
              <span>Explore Portfolio Gateway</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* REUSABLE GLOBAL CTA */}
      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
