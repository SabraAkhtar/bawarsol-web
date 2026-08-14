import React from 'react';
import { Logo } from './Logo';
import { ArrowRight, Mail, Phone, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-slate-400 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('/')} className="text-left focus:outline-none">
              <Logo size="lg" showTagline={true} />
            </button>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              BawarSol is a premium digital agency specializing in Web Development, Graphic Design, AI Solutions, Automation, and Branding — building intelligent, scalable platforms for ambitious enterprises worldwide.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00F0FF]" />
                <span>Global Engineering Hubs: USA & Remote AI Labs</span>
              </div>
              <a href="mailto:infobawarsol@gmail.com" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors">
                <Mail className="w-4 h-4 text-[#00F0FF]" />
                <span>infobawarsol@gmail.com</span>
              </a>
              <a href="https://wa.me/923374667730" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors">
                <Phone className="w-4 h-4 text-[#00F0FF]" />
                <span>+92 337 4667730</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-3 flex-wrap">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/bawarsol/', icon: '📸' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@bawarsol', icon: '🎵' },
                { label: 'Facebook', href: 'https://www.facebook.com/BawarSol', icon: '📘' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/bawarsol/?viewAsMember=true', icon: '💼' },
                { label: 'Fiverr', href: 'https://www.fiverr.com/cogninest?public_mode=true', icon: '🟢' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-slate-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all"
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Agentic AI', path: '/services' },
                { name: 'Generative AI', path: '/services' },
                { name: 'RAG Systems', path: '/services' },
                { name: 'Computer Vision', path: '/services' },
                { name: 'NLP & Language AI', path: '/services' },
                { name: 'AI Automation', path: '/services' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNav(item.path)}
                    className="hover:text-[#00F0FF] transition-colors text-slate-400 text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Industries', path: '/industries' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Blogs & Insights', path: '/blogs' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Career Opportunities', path: '/career' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNav(item.path)}
                    className="hover:text-[#00F0FF] transition-colors text-slate-400 text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Get Started
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Ready to transform your business with custom AI software?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleNav('/book-a-call')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-md shadow-[#00F0FF]/20"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleNav('/contact')}
                className="w-full text-center px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-colors"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 <span className="text-white font-semibold">BawarSol.ai</span>. All rights reserved. Building the future of digital experiences.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/admin')} className="hover:text-[#00F0FF] transition-colors">
              Admin Portal
            </button>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">SOC2 & ISO 27001 Compliant AI Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
