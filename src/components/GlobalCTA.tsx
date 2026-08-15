import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface GlobalCTAProps {
  onNavigate: (path: string) => void;
}

export const GlobalCTA: React.FC<GlobalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-10 md:p-16 bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 shadow-2xl overflow-hidden group hover:border-blue-600/30 transition-all duration-500">
          {/* Animated glow effects */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl group-hover:bg-blue-600/25 transition-all duration-700 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-3xl group-hover:bg-[#0066FF]/25 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen AI Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1628] tracking-tight leading-tight">
                Have an AI idea? <br />
                <span className="font-serif italic font-normal text-blue-600">
                  Let's turn it into reality.
                </span>
              </h2>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Whether you need autonomous AI agents, enterprise RAG search, high-speed vision models, or production-grade SaaS, BawarSol brings your architecture to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => {
                  onNavigate('/book-a-call');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>Book a Call</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  onNavigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-slate-600 hover:text-blue-600 bg-slate-50 border border-slate-200 border border-slate-200 hover:border-blue-600/40 transition-all"
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
