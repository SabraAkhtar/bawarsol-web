import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Zap, HelpCircle } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion } from 'framer-motion';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

const plans = [
  {
    name: 'Starter',
    price: '$2,500',
    period: '/project',
    desc: 'Perfect for startups needing a professional digital presence.',
    popular: false,
    features: [
      'Custom Landing Page',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Contact Form Integration',
      '1 Month Support',
    ],
  },
  {
    name: 'Professional',
    price: '$8,500',
    period: '/project',
    desc: 'Comprehensive solution for growing businesses.',
    popular: true,
    features: [
      'Up to 10 Pages',
      'Custom UI/UX Design',
      'Advanced Animations',
      'CMS Integration',
      'Advanced SEO',
      '3 Months Support',
    ],
  },
  {
    name: 'Business',
    price: '$15,000',
    period: '/project',
    desc: 'Full-scale digital platform with advanced integrations.',
    popular: false,
    features: [
      'Unlimited Pages',
      'E-commerce Capability',
      'Custom Web Application',
      'Third-party API Integrations',
      'Performance Optimization',
      '6 Months Support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Tailored AI solutions and massive scale architecture.',
    popular: false,
    features: [
      'Custom AI Agents',
      'LLM Integration',
      'Microservices Architecture',
      'Dedicated Development Team',
      '24/7 SLA Support',
      'Continuous Delivery',
    ],
  },
];

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12 overflow-hidden">

      {/* Hero */}
      <section className="relative py-20 border-b border-slate-200 hero-radial-bg text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Transparent Pricing</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            Invest in <br />
            <span className="font-serif italic font-normal text-blue-600 accent-glow">
              Excellence
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            We don't build templates. We engineer bespoke digital assets that generate revenue and command authority.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <motion.div
                variants={itemVariants}
                key={plan.name}
                className={`relative p-8 rounded-[2rem] flex flex-col justify-between transition-all duration-300 shadow-2xl group overflow-hidden ${
                  plan.popular
                    ? 'bg-slate-50 border border-slate-200 backdrop-blur-2xl border-2 border-blue-600 shadow-[0_0_40px_rgba(0,240,255,0.15)] md:-mt-4 md:mb-4 relative z-20'
                    : 'bg-white shadow-sm backdrop-blur-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
                )}

                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-black shadow-lg shadow-blue-600/40 uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6 relative z-10">
                  <div>
                    <h3 className={`text-2xl font-extrabold ${plan.popular ? 'text-slate-900' : 'text-slate-200 group-hover:text-slate-900 transition-colors'}`}>{plan.name}</h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="flex items-end gap-1.5 border-b border-slate-200 pb-6">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${plan.popular ? 'text-blue-600 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-slate-900'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-500 text-sm mb-2 font-medium">{plan.period}</span>
                    )}
                  </div>

                  <ul className="space-y-3 pt-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600/50 transition-colors'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 relative z-10">
                  <button
                    onClick={() => { onNavigate('/book-a-call'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-blue-600 text-black hover:bg-[#33F3FF] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]'
                        : 'bg-slate-100 text-slate-900 border border-slate-200 hover:border-white/30 hover:bg-slate-200'
                    }`}
                  >
                    <span>{plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ / Note */}
          <motion.div variants={itemVariants} className="mt-24 p-8 sm:p-12 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] to-transparent pointer-events-none" />
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-600/10 text-blue-600 mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {[
                {
                  q: 'What is your typical project timeline?',
                  a: 'For standard corporate websites, we typically deliver within 4–6 weeks. Complex web applications and enterprise AI solutions can range from 3 to 6 months depending on scope.',
                },
                {
                  q: 'Do you offer ongoing support?',
                  a: 'Yes. Every plan includes dedicated support. Enterprise clients get a 24/7 SLA with a dedicated Slack channel and priority response times.',
                },
                {
                  q: 'How do you handle project communication?',
                  a: 'We use dedicated Slack channels for every project, with weekly progress updates, milestone reviews, and direct access to your assigned engineer.',
                },
                {
                  q: 'Do you work with international clients?',
                  a: 'Absolutely. We have delivered projects for clients across North America, Europe, the Middle East, and Asia. Our async workflows are built for global collaboration.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="space-y-3 p-6 rounded-2xl bg-slate-100 border border-slate-200 hover:border-slate-200 transition-colors shadow-inner">
                  <h4 className="text-base font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    {q}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed pl-4">{a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social proof */}
      <section className="py-20 border-t border-slate-200 relative">
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-slate-900">What Our Clients Say</h3>
            <p className="text-slate-500 text-base mt-4 max-w-2xl mx-auto">Don't just take our word for it. Hear from the leaders who have transformed their digital presence with BawarSol.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "BawarSol didn't just build a website; they transformed our entire digital identity. Our conversion rate increased by 200% within the first month.",
                name: 'Sarah Jenkins',
                role: 'CEO, TechNova',
              },
              {
                quote: "Their understanding of Artificial Intelligence and how to present it seamlessly in UI/UX is unmatched. A truly premium agency.",
                name: 'Michael Chen',
                role: 'Founder, Elevate AI',
              },
              {
                quote: 'The level of detail, the animations, the luxury feel — working with BawarSol was the best investment our brand has made this year.',
                name: 'David Thompson',
                role: 'Marketing Director, Nexus',
              },
            ].map(({ quote, name, role }) => (
              <motion.div variants={itemVariants} key={name} className="p-8 rounded-[2rem] bg-white shadow-sm backdrop-blur-xl border border-slate-200 hover:border-slate-200 hover:bg-slate-50 border border-slate-200 transition-all space-y-6 flex flex-col justify-between group shadow-xl">
                <div className="text-blue-600 opacity-50 mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium italic relative z-10 flex-grow">
                  {quote}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-600/20 group-hover:bg-blue-600/20 transition-colors">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</div>
                    <div className="text-xs text-slate-500">{role}</div>
                  </div>
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
