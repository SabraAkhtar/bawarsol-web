import React from 'react';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Truck, Building2, Factory, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion } from 'framer-motion';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const industryIconMap: Record<string, React.ReactNode> = {
    HeartPulse: <HeartPulse className="w-8 h-8 text-[#00F0FF]" />,
    Landmark: <Landmark className="w-8 h-8 text-[#00F0FF]" />,
    ShoppingBag: <ShoppingBag className="w-8 h-8 text-[#00F0FF]" />,
    GraduationCap: <GraduationCap className="w-8 h-8 text-[#00F0FF]" />,
    Truck: <Truck className="w-8 h-8 text-[#00F0FF]" />,
    Building2: <Building2 className="w-8 h-8 text-[#00F0FF]" />,
    Factory: <Factory className="w-8 h-8 text-[#00F0FF]" />,
    Cpu: <Cpu className="w-8 h-8 text-[#00F0FF]" />,
  };

  const handleConsult = (_indName: string) => {
    onNavigate('/book-a-call');
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
      <section className="relative py-20 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Industry Specific AI Engineering</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
            AI Solutions Across <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              High-Impact Industries
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Every sector faces distinct operational bottlenecks, regulatory standards, and data topologies. BawarSol builds industry-compliant AI systems tuned for maximum ROI.
          </motion.p>
        </motion.div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES_DATA.map((ind) => (
              <motion.div
                variants={itemVariants}
                key={ind.id}
                className="p-8 sm:p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-[#00F0FF]/30 hover:bg-white/[0.04] transition-all shadow-2xl flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 group-hover:border-[#00F0FF]/40 group-hover:bg-[#00F0FF]/10 transition-colors shadow-inner">
                      {industryIconMap[ind.iconName]}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-1.5 rounded-full shadow-md">
                      {ind.metrics}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors">
                      {ind.name}
                    </h2>
                    <p className="text-[#00F0FF] text-sm font-semibold mt-2 tracking-wide">
                      {ind.tagline}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Key AI Applications:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {ind.useCases.map((uc, uIdx) => (
                        <li key={uIdx} className="flex items-start gap-3 group/item">
                          <CheckCircle2 className="w-4 h-4 text-[#00F0FF]/50 group-hover/item:text-[#00F0FF] shrink-0 mt-0.5 transition-colors" />
                          <span className="leading-relaxed">{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {ind.relevantServices.map((srv) => (
                      <span key={srv} className="text-[10px] uppercase tracking-wider font-bold bg-black/60 text-slate-400 px-2.5 py-1 rounded-md border border-white/10 group-hover:border-white/20 transition-colors">
                        {srv}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleConsult(ind.name)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#00F0FF] hover:text-[#33F3FF] transition-colors shrink-0 bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/20 hover:border-[#00F0FF]/50"
                  >
                    <span>Consult</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
