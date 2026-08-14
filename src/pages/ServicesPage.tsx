import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { Bot, Sparkles, Database, Eye, MessageSquareText, Workflow, BrainCircuit, Code2, ArrowRight, CheckCircle, Cpu, Search, Palette, Image, Layout } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion } from 'framer-motion';

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
    Palette: <Palette className="w-8 h-8 text-[#00F0FF]" />,
    Image: <Image className="w-8 h-8 text-[#00F0FF]" />,
    Layout: <Layout className="w-8 h-8 text-[#00F0FF]" />,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-20 bg-[#050505] border-b border-white/10 hero-radial-bg">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Capabilities</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
            Solutions Built for <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Real-World Impact
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            We architect and deploy production-grade AI systems, zero-hallucination RAG engines, high-speed vision pipelines, and scalable cloud platforms.
          </motion.p>

          {/* Search Filter Bar */}
          <motion.div variants={itemVariants} className="pt-8 max-w-xl mx-auto relative group">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00F0FF] transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services or technologies..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.05] transition-all shadow-lg"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {filteredServices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 text-slate-400"
            >
              No services found matching your search.
            </motion.div>
          ) : (
            filteredServices.map((service, index) => (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                key={service.id}
                id={service.slug}
                className="p-8 sm:p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-[#00F0FF]/30 hover:bg-white/[0.04] transition-all shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                  {/* Left Overview Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner group-hover:border-[#00F0FF]/40 group-hover:bg-[#00F0FF]/5 transition-all">
                        {serviceIconMap[service.iconName]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block mb-1">
                          Service 0{index + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-300 font-medium text-lg">
                      {service.tagline}
                    </p>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Tech stack pill tags */}
                    <div className="pt-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-3">Technologies:</span>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg bg-black/40 text-[#00F0FF] text-xs font-mono border border-white/5 group-hover:border-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleDiscussProject(service.title)}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                      >
                        <span>Discuss Your Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Details Column (Features & Use Cases) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-[#050505]/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-inner">
                    {/* Features List */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-3">
                        <Cpu className="w-4 h-4 text-[#00F0FF]" />
                        <span>Key Features</span>
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 group/item">
                            <CheckCircle className="w-4 h-4 text-[#00F0FF]/50 group-hover/item:text-[#00F0FF] shrink-0 mt-0.5 transition-colors" />
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases List */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-3">
                        <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                        <span>Use Cases</span>
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-300">
                        {service.useCases.map((uc, uIdx) => (
                          <li key={uIdx} className="flex items-start gap-3 group/item">
                            <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/50 group-hover/item:bg-[#00F0FF] group-hover/item:scale-150 transition-all" />
                            </div>
                            <span className="leading-relaxed">{uc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
