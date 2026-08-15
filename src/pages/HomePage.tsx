import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Bot, Database, Eye, BrainCircuit, Code2, Shield, CheckCircle2, TrendingUp, Cpu, Workflow, MessageSquareText, Palette, Image, Layout } from 'lucide-react';
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
    Bot: <Bot className="w-5 h-5 text-blue-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-blue-600" />,
    Database: <Database className="w-5 h-5 text-blue-600" />,
    Eye: <Eye className="w-5 h-5 text-blue-600" />,
    MessageSquareText: <MessageSquareText className="w-5 h-5 text-blue-600" />,
    Workflow: <Workflow className="w-5 h-5 text-blue-600" />,
    BrainCircuit: <BrainCircuit className="w-5 h-5 text-blue-600" />,
    Code2: <Code2 className="w-5 h-5 text-blue-600" />,
    Palette: <Palette className="w-5 h-5 text-blue-600" />,
    Image: <Image className="w-5 h-5 text-blue-600" />,
    Layout: <Layout className="w-5 h-5 text-blue-600" />,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-28 overflow-hidden border-b border-white/[0.05] bg-slate-50">
        {/* Subtle, refined ambient backdrops */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
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
                className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-gradient-to-r from-blue-600/50 to-transparent" />
                Enterprise AI Systems
              </motion.div>

              {/* Huge, Tight Headline */}
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.05]"
              >
                Engineering <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-white to-slate-500">
                  Intelligent Solutions.
                </span>
              </motion.h1>

              {/* Elegant Paragraph */}
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-slate-500 text-lg sm:text-xl font-normal leading-[1.6] max-w-2xl"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => handleNav('/services')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-sm text-slate-600 bg-white shadow-sm border border-slate-200 hover:bg-slate-50 border border-slate-200 hover:text-slate-900 transition-all"
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
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40" />
                  Production Agent Systems
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40" />
                  Zero-Hallucination RAG
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40" />
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
      <section className="py-28 bg-slate-50 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-20"
          >
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-4 mb-5">
              <span className="w-8 h-[1px] bg-gradient-to-r from-blue-600/50 to-transparent" />
              Core Engineering Capabilities
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1] mb-5">
              Built for Enterprise Scale.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              From autonomous decision engines to quantized vision models, BawarSol designs custom architectures tailored for high throughput and precision.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_DATA.slice(0, 8).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                onClick={() => handleNav('/services')}
                className="group relative p-6 rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-white/[0.07] hover:border-slate-300 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-blue-600/30 transition-all duration-300">
                    {serviceIconMap[service.iconName] || <Bot className="w-5 h-5 text-blue-600" />}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2.5 group-hover:text-slate-900/90 transition-colors leading-snug">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="relative z-10 pt-5 mt-5 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase">Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 flex justify-start"
          >
            <button
              onClick={() => handleNav('/services')}
              className="group inline-flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <span>View all capabilities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRY SOLUTIONS PREVIEW */}
      <section className="py-28 bg-slate-50 border-y border-white/[0.05] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-4 mb-5">
                <span className="w-8 h-[1px] bg-gradient-to-r from-blue-600/50 to-transparent" />
                Industry Impact
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1]">
                AI for Specialized Sectors.
              </h2>
            </div>
            <button
              onClick={() => handleNav('/industries')}
              className="group inline-flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors shrink-0"
            >
              <span>View all 8 industries</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Industry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES_DATA.slice(0, 4).map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                onClick={() => handleNav('/industries')}
                className="group relative p-6 rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-white/[0.07] hover:border-slate-300 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <p className="text-[10px] font-bold text-blue-600/70 uppercase tracking-[0.2em] mb-3">
                    {ind.name}
                  </p>
                  <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug group-hover:text-slate-900/90 transition-colors">
                    {ind.tagline}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-3">
                    {ind.description}
                  </p>
                  <div className="text-[10px] text-blue-600/60 bg-white shadow-sm border border-slate-200 px-3 py-2 rounded-lg border border-white/[0.05] font-mono tracking-wide">
                    {ind.metrics}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS GATEWAY */}
      <section className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-600/[0.02] rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-20"
          >
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.25em] flex items-center gap-4 mb-5">
              <span className="w-8 h-[1px] bg-gradient-to-r from-blue-600/50 to-transparent" />
              Case Studies & Systems
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1] mb-5">
              Featured Engineering Work.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Real-world systems deployed by BawarSol across healthcare, financial audit, edge vision, and freight automation.
            </p>
          </motion.div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                onClick={() => handleNav('/portfolio')}
                className="group relative rounded-2xl bg-white shadow-sm border border-white/[0.07] overflow-hidden cursor-pointer hover:border-slate-300 transition-all duration-500"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
                  {/* Category pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 border border-slate-200 backdrop-blur-sm tracking-wide uppercase">
                    {proj.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-slate-900/90 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
                    <span className="text-[11px] text-blue-600/70 font-medium tracking-wide">{proj.impactMetric}</span>
                  </div>
                </div>

                {/* Hover bottom border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex justify-start"
          >
            <button
              onClick={() => handleNav('/portfolio')}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                View Full Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* REUSABLE GLOBAL CTA */}
      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
