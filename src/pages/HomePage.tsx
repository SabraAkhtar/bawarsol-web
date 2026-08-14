import React from 'react';
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
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-white/10 hero-radial-bg">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Small Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                <span>AI • AUTOMATION • SOFTWARE ENGINEERING</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Engineering <br />
                <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
                  Intelligent Solutions
                </span>
              </h1>

              {/* Supporting Paragraph */}
              <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                We build AI-powered products, intelligent automation, and scalable software that transform ambitious ideas into real-world solutions.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => handleNav('/book-a-call')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all duration-300 shadow-xl shadow-[#00F0FF]/25 hover:shadow-[#00F0FF]/40 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-black animate-pulse" />
                  <span>Book a Call</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleNav('/services')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm text-slate-200 bg-white/[0.04] border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-all shadow-md"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Social Proof Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span>Production Agent Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span>Zero-Hallucination RAG</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span>Enterprise Security</span>
                </div>
              </div>
            </div>

            {/* Right Column Visual */}
            <div className="lg:col-span-5 relative">
              <AINodeVisual />
            </div>
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
