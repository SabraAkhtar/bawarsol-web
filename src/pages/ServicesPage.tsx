import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { Bot, Sparkles, Database, Eye, MessageSquareText, Workflow, BrainCircuit, Code2, ArrowRight, CheckCircle, Cpu, Search } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

interface ServicesPageProps {
  onNavigate: (path: string, serviceSlug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const serviceIconMap: Record<string, React.ReactNode> = {
    Bot: <Bot className="w-8 h-8 text-[#00F0FF]" />,
    Sparkles: <Sparkles className="w-8 h-8 text-[#00F0FF]" />,
    Database: <Database className="w-8 h-8 text-[#00F0FF]" />,
    Eye: <Eye className="w-8 h-8 text-[#00F0FF]" />,
    MessageSquareText: <MessageSquareText className="w-8 h-8 text-[#00F0FF]" />,
    Workflow: <Workflow className="w-8 h-8 text-[#00F0FF]" />,
    BrainCircuit: <BrainCircuit className="w-8 h-8 text-[#00F0FF]" />,
    Code2: <Code2 className="w-8 h-8 text-[#00F0FF]" />,
  };

  const filteredServices = SERVICES_DATA.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDiscussProject = (_serviceName: string) => {
    onNavigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-[#050505] border-b border-white/10 hero-radial-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            AI Solutions Built for <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Real-World Impact
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            We architect and deploy production-grade AI systems, autonomous agent swarms, zero-hallucination RAG engines, high-speed vision pipelines, and scalable cloud platforms.
          </p>

          {/* Search Filter Bar */}
          <div className="pt-6 max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services or technologies (e.g., RAG, PyTorch, Agent)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={service.slug}
              className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/40 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview Column */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 shadow-md group-hover:border-[#00F0FF]/40 transition-colors">
                      {serviceIconMap[service.iconName]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#00F0FF] uppercase tracking-widest block">
                        Service 0{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-300 font-medium text-base">
                    {service.tagline}
                  </p>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Tech stack pill tags */}
                  <div className="pt-2">
                    <span className="text-xs text-slate-400 font-semibold block mb-2">Technologies Used:</span>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-black/60 text-[#00F0FF] text-xs font-mono border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleDiscussProject(service.title)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-lg shadow-[#00F0FF]/20"
                    >
                      <span>Discuss Your Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Details Column (Features & Use Cases) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/10">
                  {/* Features List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>Key Features</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Cases List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Use Cases</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {service.useCases.map((uc, uIdx) => (
                        <li key={uIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0 mt-1.5" />
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
