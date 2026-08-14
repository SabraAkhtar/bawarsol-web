import React from 'react';
import { ArrowRight, Target, Eye, Heart, Lightbulb, Users, Zap } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const coreValues = [
    {
      icon: <Zap className="w-6 h-6 text-[#00F0FF]" />,
      title: 'Precision',
      desc: 'Every pixel and line of code is crafted with intention and perfection.',
    },
    {
      icon: <Eye className="w-6 h-6 text-[#00F0FF]" />,
      title: 'Vision',
      desc: 'We look beyond trends to build future-proof digital assets.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#00F0FF]" />,
      title: 'Partnership',
      desc: 'We work as an extension of your team, dedicated to your success.',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-[#00F0FF]" />,
      title: 'Innovation',
      desc: 'Pioneering AI integrations to keep you ahead of the competition.',
    },
  ];

  const process = [
    { step: 1, title: 'Discovery', desc: 'Understanding your goals, audience, and market position.' },
    { step: 2, title: 'Planning', desc: 'Crafting the blueprint, architecture, and tech stack.' },
    { step: 3, title: 'Design', desc: 'Creating premium visual identities and UI/UX prototypes.' },
    { step: 4, title: 'Development', desc: 'Writing clean, scalable code with modern frameworks.' },
    { step: 5, title: 'Testing', desc: 'Rigorous QA and performance optimization.' },
    { step: 6, title: 'Launch', desc: 'Deploying the final product securely to the world.' },
    { step: 7, title: 'Support', desc: 'Ongoing maintenance, analytics, and scaling.' },
  ];

  const stats = [
    { value: '50+', label: 'Completed Projects' },
    { value: '100%', label: 'Happy Clients' },
    { value: '10+', label: 'Countries Served' },
    { value: '20+', label: 'AI Solutions Deployed' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">

      {/* Hero */}
      <section className="relative py-16 border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>About BawarSol</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Redefining <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Digital Excellence
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            BawarSol was founded with a singular mission — to bridge the gap between stunning aesthetic design and highly functional, AI-driven technology. We don't just build websites; we engineer comprehensive digital ecosystems.
          </p>

          {/* Mission & Vision */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00F0FF]" />
                <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">Our Mission</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                To empower global brands with unparalleled digital solutions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#00F0FF]" />
                <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">Our Vision</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                To be the world's most trusted premium digital agency by 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2">
                <div className="text-3xl font-extrabold text-[#00F0FF]">{s.value}</div>
                <div className="text-xs text-slate-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40 transition-all group space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-[#00F0FF]/40 transition-all">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">The Journey</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                What started as a boutique design studio has evolved into an international powerhouse. We continuously adapt to the shifting technological landscape, mastering React, Next.js, and advanced Artificial Intelligence to ensure our clients always receive best-in-class solutions.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                From crafting pixel-perfect landing pages to deploying autonomous AI agents for Fortune-500 enterprises — BawarSol has consistently delivered measurable results that turn digital presence into revenue engines.
              </p>
              <button
                onClick={() => { onNavigate('/portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-lg shadow-[#00F0FF]/20"
              >
                <span>See Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of project images */}
            <div className="grid grid-cols-3 gap-3">
              {[
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/naya%20sol%20agency.webp',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/scholarmate.avif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/netflix%20clone.jfif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/beacon%20light%20accadmey.jfif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/construction-%20website.avif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/youtube%20clone.png',
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={src}
                    alt={`Project ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Proven Process</h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              A systematic approach to delivering premium results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p) => (
              <div key={p.step} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40 transition-all group space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] font-extrabold text-sm">
                  {p.step}
                </div>
                <h3 className="font-bold text-white group-hover:text-[#00F0FF] transition-colors">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest block">The Difference</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose BawarSol?</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/10">
                  <th className="p-4 text-left text-slate-400 font-semibold">Feature</th>
                  <th className="p-4 text-center text-slate-400 font-semibold">Typical Agencies</th>
                  <th className="p-4 text-center text-[#00F0FF] font-bold">BawarSol.ai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ['Design Quality', 'Template-based, generic layouts', '100% custom, premium 2026 aesthetics'],
                  ['Technology Stack', 'Outdated builders (WordPress, Wix)', 'Modern React/Next.js architectures'],
                  ['AI Integration', 'Basic or non-existent', 'Advanced custom LLMs and Automation'],
                  ['Performance', 'Slow loading, poor SEO scores', 'Lightning fast, 99+ Lighthouse scores'],
                  ['Client Support', 'Slow email responses', 'Dedicated Slack channels, 24/7 priority'],
                  ['End Result', 'An expense that sits there', 'An asset that generates revenue'],
                ].map(([feature, typical, bawarsol]) => (
                  <tr key={feature} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold text-white">{feature}</td>
                    <td className="p-4 text-center text-slate-400 text-xs">{typical}</td>
                    <td className="p-4 text-center text-[#00F0FF] text-xs font-medium">{bawarsol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
