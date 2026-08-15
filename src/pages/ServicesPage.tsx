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
    Bot: <Bot className="w-8 h-8 text-blue-600" />,
    Sparkles: <Sparkles className="w-8 h-8 text-blue-600" />,
    Database: <Database className="w-8 h-8 text-blue-600" />,
    Eye: <Eye className="w-8 h-8 text-blue-600" />,
    MessageSquareText: <MessageSquareText className="w-8 h-8 text-blue-600" />,
    Workflow: <Workflow className="w-8 h-8 text-blue-600" />,
    BrainCircuit: <BrainCircuit className="w-8 h-8 text-blue-600" />,
    Code2: <Code2 className="w-8 h-8 text-blue-600" />,
    Palette: <Palette className="w-8 h-8 text-blue-600" />,
    Image: <Image className="w-8 h-8 text-blue-600" />,
    Layout: <Layout className="w-8 h-8 text-blue-600" />,
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-20 bg-slate-50 border-b border-slate-200 hero-radial-bg">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Capabilities</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#0A1628] tracking-tight">
            Solutions Built for <br />
            <span className="font-serif italic font-normal text-blue-600">
              Real-World Impact
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            We architect and deploy production-grade AI systems, zero-hallucination RAG engines, high-speed vision pipelines, and scalable cloud platforms.
          </motion.p>

          {/* Search Filter Bar */}
          <motion.div variants={itemVariants} className="pt-8 max-w-xl mx-auto relative group">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services or technologies..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 text-base text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600/50 focus:bg-slate-100 transition-all shadow-lg"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {filteredServices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 text-slate-500"
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
                className="p-8 sm:p-12 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 hover:border-blue-600/30 hover:bg-slate-50 border border-slate-200 transition-all shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                  {/* Left Overview Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-200 border border-slate-200 shadow-inner group-hover:border-blue-600/40 group-hover:bg-blue-600/5 transition-all">
                        {serviceIconMap[service.iconName]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                          Service 0{index + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1628] group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-600 font-medium text-lg">
                      {service.tagline}
                    </p>

                    <p className="text-slate-500 text-sm leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Tech stack pill tags */}
                    <div className="pt-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-3">Technologies:</span>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-blue-600 text-xs font-mono border border-slate-200 group-hover:border-slate-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleDiscussProject(service.title)}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                      >
                        <span>Discuss Your Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Details Column (Features & Use Cases) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-50/50 backdrop-blur-md p-8 rounded-3xl border border-slate-200 shadow-inner">
                    {/* Features List */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-[#0A1628] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-3">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span>Key Features</span>
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 group/item">
                            <CheckCircle className="w-4 h-4 text-blue-600/50 group-hover/item:text-blue-600 shrink-0 mt-0.5 transition-colors" />
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases List */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-[#0A1628] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-3">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Use Cases</span>
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        {service.useCases.map((uc, uIdx) => (
                          <li key={uIdx} className="flex items-start gap-3 group/item">
                            <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600/50 group-hover/item:bg-blue-600 group-hover/item:scale-150 transition-all" />
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
