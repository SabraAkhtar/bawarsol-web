import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface GlobalCTAProps {
  onNavigate: (path: string) => void;
}

export const GlobalCTA: React.FC<GlobalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-10 md:p-16 bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden group hover:border-[#00F0FF]/30 transition-all duration-500">
          {/* Animated glow effects */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#00F0FF]/15 rounded-full blur-3xl group-hover:bg-[#00F0FF]/25 transition-all duration-700 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-3xl group-hover:bg-[#0066FF]/25 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen AI Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Have an AI idea? <br />
                <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
                  Let's turn it into reality.
                </span>
              </h2>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Whether you need autonomous AI agents, enterprise RAG search, high-speed vision models, or production-grade SaaS, BawarSol brings your architecture to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => {
                  onNavigate('/book-a-call');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all duration-300 shadow-xl shadow-[#00F0FF]/25 hover:shadow-[#00F0FF]/40 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>Book a Call</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  onNavigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-slate-300 hover:text-[#00F0FF] bg-white/[0.04] border border-white/10 hover:border-[#00F0FF]/40 transition-all"
              >
                <span>Send Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
