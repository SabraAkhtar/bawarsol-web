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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12">

      {/* Hero Header */}
      <section className="relative py-16 bg-slate-50 border-b border-slate-200 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <span>Portfolio — Real Work, Real Results</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A1628] tracking-tight">
            Our Work & <br />
            <span className="font-serif italic font-normal text-blue-600">
              Deployed Projects
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            From live web applications to enterprise AI systems — every project is crafted with precision, modern tech, and measurable impact.
          </p>

          {/* Stats */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 border border-slate-200">
              <span className="text-blue-600 font-bold text-sm">{WEB_PROJECTS.length}+</span>
              <span>Live Web Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 border border-slate-200">
              <span className="text-blue-600 font-bold text-sm">{AI_PROJECTS.length}+</span>
              <span>AI Case Studies</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 border border-slate-200">
              <span className="text-blue-600 font-bold text-sm">{DESIGN_PROJECTS.length}+</span>
              <span>Design Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 border border-slate-200">
              <span className="text-blue-600 font-bold text-sm">$50M+</span>
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
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-slate-50 border border-slate-200 text-slate-500 border border-slate-200 hover:border-blue-600/40 hover:text-blue-600'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Web Projects ({WEB_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'ai'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-slate-50 border border-slate-200 text-slate-500 border border-slate-200 hover:border-blue-600/40 hover:text-blue-600'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>AI Systems ({AI_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'design'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-slate-50 border border-slate-200 text-slate-500 border border-slate-200 hover:border-blue-600/40 hover:text-blue-600'
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
                className="rounded-3xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:border-blue-600/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white backdrop-blur shadow-md">
                      {project.category}
                    </span>
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/90 text-slate-600 border border-slate-200">
                      {project.clientIndustry}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#0A1628] group-hover:text-blue-600 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-600 text-xs font-medium flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{project.impactMetric}</span>
                    </div>

                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] bg-white/90 text-blue-600 px-2 py-0.5 rounded border border-slate-200 font-mono"
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
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
                    >
                      <span>Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-slate-500 bg-slate-50 border border-slate-200 border border-slate-200">
                      <span>Confidential — Under NDA</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 text-center space-y-4">
            <h3 className="text-2xl font-bold text-[#0A1628]">Have a Project in Mind?</h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Whether it's a stunning website, an AI automation system, or a full SaaS platform — BawarSol engineers it to perfection.
            </p>
            <button
              onClick={() => {
                onNavigate('/book-a-call');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
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
