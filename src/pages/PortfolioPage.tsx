import React, { useState } from 'react';
import { WEB_PROJECTS, AI_PROJECTS, DESIGN_PROJECTS } from '../data/portfolioData';
import { ExternalLink, Sparkles, Globe, BrainCircuit, Palette } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'web' | 'ai' | 'design'>('web');

  const projects = activeTab === 'web' ? WEB_PROJECTS : activeTab === 'ai' ? AI_PROJECTS : DESIGN_PROJECTS;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">

      {/* Hero Header */}
      <section className="relative py-16 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Portfolio — Real Work, Real Results</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our Work & <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Deployed Projects
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            From live web applications to enterprise AI systems — every project is crafted with precision, modern tech, and measurable impact.
          </p>

          {/* Stats */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10">
              <span className="text-[#00F0FF] font-bold text-sm">{WEB_PROJECTS.length}+</span>
              <span>Live Web Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10">
              <span className="text-[#00F0FF] font-bold text-sm">{AI_PROJECTS.length}+</span>
              <span>AI Case Studies</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10">
              <span className="text-[#00F0FF] font-bold text-sm">{DESIGN_PROJECTS.length}+</span>
              <span>Design Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10">
              <span className="text-[#00F0FF] font-bold text-sm">$50M+</span>
              <span>Revenue Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={() => setActiveTab('web')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'web'
                  ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/25'
                  : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Web Projects ({WEB_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'ai'
                  ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/25'
                  : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>AI Systems ({AI_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'design'
                  ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/25'
                  : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Graphic Design ({DESIGN_PROJECTS.length})</span>
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#00F0FF]/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#00F0FF] text-black backdrop-blur shadow-md">
                      {project.category}
                    </span>
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/80 text-slate-300 border border-white/10">
                      {project.clientIndustry}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-xs font-medium flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{project.impactMetric}</span>
                    </div>

                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] bg-black/60 text-[#00F0FF] px-2 py-0.5 rounded border border-white/10 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-6 pt-0">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-md shadow-[#00F0FF]/20"
                    >
                      <span>Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-slate-400 bg-white/[0.04] border border-white/10">
                      <span>Confidential — Under NDA</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Have a Project in Mind?</h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Whether it's a stunning website, an AI automation system, or a full SaaS platform — BawarSol engineers it to perfection.
            </p>
            <button
              onClick={() => {
                onNavigate('/book-a-call');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-colors shadow-lg shadow-[#00F0FF]/20"
            >
              <span>Start Your Project →</span>
            </button>
          </div>
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
