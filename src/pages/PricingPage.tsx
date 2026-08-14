import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

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
  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">

      {/* Hero */}
      <section className="relative py-16 border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Invest in <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Excellence
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We don't build templates. We engineer bespoke digital assets that generate revenue and command authority.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  plan.popular
                    ? 'bg-[#00F0FF]/5 border-2 border-[#00F0FF] shadow-[#00F0FF]/10 scale-[1.02]'
                    : 'bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/30">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-extrabold ${plan.popular ? 'text-[#00F0FF]' : 'text-white'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-400 text-sm mb-1">{plan.period}</span>
                    )}
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => { onNavigate('/book-a-call'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`mt-8 w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                    plan.popular
                      ? 'bg-[#00F0FF] text-black hover:bg-[#33F3FF] shadow-lg shadow-[#00F0FF]/25'
                      : 'bg-white/[0.05] text-slate-200 border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ / Note */}
          <div className="mt-16 p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white text-center">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div key={q} className="space-y-2 p-5 rounded-2xl bg-black/40 border border-white/10">
                  <h4 className="text-sm font-bold text-white">{q}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-xl font-bold text-white mb-8">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div key={name} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed italic">"{quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] font-bold text-sm">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{name}</div>
                    <div className="text-xs text-slate-400">{role}</div>
                  </div>
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
