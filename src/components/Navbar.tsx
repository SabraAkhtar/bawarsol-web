import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowRight, Sparkles, Shield } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('/')}
          className="text-left focus:outline-none focus:ring-2 focus:ring-[#00F0FF] rounded-xl"
        >
          <Logo size="md" showTagline={false} />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur border border-white/10 rounded-full px-4 py-1.5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#00F0FF] font-semibold bg-[#00F0FF]/10 border border-[#00F0FF]/30 shadow-sm shadow-[#00F0FF]/20'
                    : 'text-slate-300 hover:text-[#00F0FF] hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Prominent "Book a Call" CTA & Admin shortcut */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/admin')}
            className="p-2 text-slate-400 hover:text-[#00F0FF] hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10"
            title="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleLinkClick('/book-a-call')}
            className="relative group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all duration-300 shadow-lg shadow-[#00F0FF]/25 hover:shadow-[#00F0FF]/40 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-black animate-pulse" />
            <span>Book a Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => handleLinkClick('/book-a-call')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-black bg-[#00F0FF] shadow-md shadow-[#00F0FF]/20"
          >
            <span>Book Call</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl border border-white/10 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505]/98 border-b border-white/10 px-4 pt-4 pb-6 space-y-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#00F0FF]/10 text-[#00F0FF] font-semibold border border-[#00F0FF]/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('/book-a-call')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black bg-[#00F0FF] shadow-lg shadow-[#00F0FF]/25"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleLinkClick('/admin')}
              className="w-full text-center py-2 text-xs text-slate-400 hover:text-[#00F0FF]"
            >
              Admin Portal Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
