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
    HeartPulse: <HeartPulse className="w-8 h-8 text-blue-600" />,
    Landmark: <Landmark className="w-8 h-8 text-blue-600" />,
    ShoppingBag: <ShoppingBag className="w-8 h-8 text-blue-600" />,
    GraduationCap: <GraduationCap className="w-8 h-8 text-blue-600" />,
    Truck: <Truck className="w-8 h-8 text-blue-600" />,
    Building2: <Building2 className="w-8 h-8 text-blue-600" />,
    Factory: <Factory className="w-8 h-8 text-blue-600" />,
    Cpu: <Cpu className="w-8 h-8 text-blue-600" />,
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-20 bg-slate-50 border-b border-slate-200 hero-radial-bg text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <span>Industry Specific AI Engineering</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            AI Solutions Across <br />
            <span className="font-serif italic font-normal text-blue-600 accent-glow">
              High-Impact Industries
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Every sector faces distinct operational bottlenecks, regulatory standards, and data topologies. BawarSol builds industry-compliant AI systems tuned for maximum ROI.
          </motion.p>
        </motion.div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
        
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
                className="p-8 sm:p-10 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 hover:border-blue-600/30 hover:bg-slate-50 border border-slate-200 transition-all shadow-2xl flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 group-hover:border-blue-600/40 group-hover:bg-blue-600/10 transition-colors shadow-inner">
                      {industryIconMap[ind.iconName]}
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-600/10 border border-blue-600/30 px-3 py-1.5 rounded-full shadow-md">
                      {ind.metrics}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ind.name}
                    </h2>
                    <p className="text-blue-600 text-sm font-semibold mt-2 tracking-wide">
                      {ind.tagline}
                    </p>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                      Key AI Applications:
                    </span>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {ind.useCases.map((uc, uIdx) => (
                        <li key={uIdx} className="flex items-start gap-3 group/item">
                          <CheckCircle2 className="w-4 h-4 text-blue-600/50 group-hover/item:text-blue-600 shrink-0 mt-0.5 transition-colors" />
                          <span className="leading-relaxed">{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {ind.relevantServices.map((srv) => (
                      <span key={srv} className="text-[10px] uppercase tracking-wider font-bold bg-white/90 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200 group-hover:border-slate-300 transition-colors">
                        {srv}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleConsult(ind.name)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-[#33F3FF] transition-colors shrink-0 bg-blue-600/10 px-4 py-2 rounded-full border border-blue-600/20 hover:border-blue-600/50"
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
