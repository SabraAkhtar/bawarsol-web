import React from 'react';
import { ArrowRight, Target, Eye, Heart, Lightbulb, Users, Zap } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion } from 'framer-motion';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const coreValues = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Precision',
      desc: 'Every pixel and line of code is crafted with intention and perfection.',
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: 'Vision',
      desc: 'We look beyond trends to build future-proof digital assets.',
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: 'Partnership',
      desc: 'We work as an extension of your team, dedicated to your success.',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12">

      {/* Hero */}
      <section className="relative py-16 border-b border-slate-200 hero-radial-bg text-center overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <span>About BawarSol</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Redefining <br />
            <span className="font-serif italic font-normal text-blue-600 accent-glow">
              Digital Excellence
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            BawarSol was founded with a singular mission — to bridge the gap between stunning aesthetic design and highly functional, AI-driven technology. We don't just build websites; we engineer comprehensive digital ecosystems.
          </motion.p>

          {/* Mission & Vision */}
          <motion.div variants={itemVariants} className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 hover:border-blue-600/30 transition-all text-left space-y-2 group">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Our Mission</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                To empower global brands with unparalleled digital solutions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 hover:border-blue-600/30 transition-all text-left space-y-2 group">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Our Vision</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                To be the world's most trusted premium digital agency by 2030.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-slate-200">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <motion.div variants={itemVariants} key={s.label} className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 hover:border-blue-600/20 transition-all text-center space-y-2">
                <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10"
        >
          <div className="text-center space-y-3">
            <motion.span variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-widest block">What Drives Us</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Core Values</motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v) => (
              <motion.div variants={itemVariants} key={v.title} className="p-8 rounded-3xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 hover:border-blue-600/40 transition-all shadow-xl hover:-translate-y-1 group space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-600/40 transition-all">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Journey */}
      <section className="py-20 border-y border-slate-200 bg-white/[0.01]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <motion.span variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Our Story</motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">The Journey</motion.h2>
              <motion.p variants={itemVariants} className="text-slate-600 text-base leading-relaxed">
                What started as a boutique design studio has evolved into an international powerhouse. We continuously adapt to the shifting technological landscape, mastering React, Next.js, and advanced Artificial Intelligence to ensure our clients always receive best-in-class solutions.
              </motion.p>
              <motion.p variants={itemVariants} className="text-slate-500 text-sm leading-relaxed">
                From crafting pixel-perfect landing pages to deploying autonomous AI agents for Fortune-500 enterprises — BawarSol has consistently delivered measurable results that turn digital presence into revenue engines.
              </motion.p>
              <motion.div variants={itemVariants} className="pt-2">
                <button
                  onClick={() => { onNavigate('/portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-black bg-blue-600 hover:bg-[#33F3FF] transition-all shadow-lg shadow-blue-600/20"
                >
                  <span>See Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            {/* Grid of project images */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              {[
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/naya%20sol%20agency.webp',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/scholarmate.avif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/netflix%20clone.jfif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/beacon%20light%20accadmey.jfif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/construction-%20website.avif',
                'https://bawarsol1.vercel.app/Assets/website%20card%20imges/youtube%20clone.png',
              ].map((src, i) => (
                <div key={i} className={`aspect-square rounded-2xl overflow-hidden border border-slate-200 ${i % 2 === 0 ? 'translate-y-4' : '-translate-y-4'}`}>
                  <img
                    src={src}
                    alt={`Project ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Process */}
      <section className="py-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >
          <div className="text-center space-y-3">
            <motion.span variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-widest block">How We Work</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Proven Process</motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 text-base max-w-xl mx-auto">
              A systematic approach to delivering premium results every time.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <motion.div variants={itemVariants} key={p.step} className="p-6 rounded-3xl bg-white shadow-sm border border-slate-200 backdrop-blur-xl border border-slate-200 hover:border-blue-600/40 transition-all group space-y-4 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 font-extrabold text-base group-hover:bg-blue-600 group-hover:text-black transition-colors">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 border-t border-slate-200">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >
          <div className="text-center space-y-3">
            <motion.span variants={itemVariants} className="text-xs font-bold text-blue-600 uppercase tracking-widest block">The Difference</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why Choose BawarSol?</motion.h2>
          </div>

          <motion.div variants={itemVariants} className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm backdrop-blur-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border border-slate-200 border-b border-slate-200">
                  <th className="p-6 text-left text-slate-600 font-bold uppercase tracking-wider text-xs">Feature</th>
                  <th className="p-6 text-center text-slate-500 font-bold uppercase tracking-wider text-xs">Typical Agencies</th>
                  <th className="p-6 text-center text-blue-600 font-bold uppercase tracking-wider text-xs">BawarSol.ai</th>
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
                  <tr key={feature} className="hover:bg-slate-50 border border-slate-200 transition-colors">
                    <td className="p-6 font-semibold text-slate-900 whitespace-nowrap">{feature}</td>
                    <td className="p-6 text-center text-slate-500">{typical}</td>
                    <td className="p-6 text-center text-blue-600 font-semibold bg-blue-600/[0.02]">{bawarsol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
