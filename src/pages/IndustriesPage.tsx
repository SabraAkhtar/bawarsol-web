import React from 'react';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Truck, Building2, Factory, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

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

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Industry Specific AI Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            AI Solutions Across <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              High-Impact Industries
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Every sector faces distinct operational bottlenecks, regulatory standards, and data topologies. BawarSol builds industry-compliant AI systems tuned for maximum ROI.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES_DATA.map((ind) => (
              <div
                key={ind.id}
                className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 group-hover:border-[#00F0FF]/40 transition-colors">
                      {industryIconMap[ind.iconName]}
                    </div>
                    <span className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-1 rounded-full">
                      {ind.metrics}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {ind.name}
                    </h2>
                    <p className="text-[#00F0FF] text-sm font-semibold mt-1">
                      {ind.tagline}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Key AI Applications:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {ind.useCases.map((uc, uIdx) => (
                        <li key={uIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {ind.relevantServices.map((srv) => (
                      <span key={srv} className="text-[10px] bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-white/10 font-mono">
                        {srv}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleConsult(ind.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] hover:underline shrink-0"
                  >
                    <span>Consult Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
