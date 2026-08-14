import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { CareerPage } from './pages/CareerPage';
import { JobApplyPage } from './pages/JobApplyPage';
import { ContactPage } from './pages/ContactPage';
import { BookCallPage } from './pages/BookCallPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (slug: string) => {
    navigate(`/blogs/${slug}`);
  };

  const handleApplyJob = (jobSlug: string) => {
    navigate(`/career/${jobSlug}/apply`);
  };

  // Render Page Content based on route
  const renderContent = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }
    if (currentPath === '/industries') {
      return <IndustriesPage onNavigate={navigate} />;
    }
    if (currentPath === '/portfolio') {
      return <PortfolioPage onNavigate={navigate} />;
    }
    if (currentPath === '/blogs') {
      return <BlogsPage onNavigate={navigate} onSelectBlog={handleSelectBlog} />;
    }
    if (currentPath.startsWith('/blogs/')) {
      const slug = currentPath.replace('/blogs/', '');
      return <BlogDetailPage slug={slug} onNavigate={navigate} onSelectBlog={handleSelectBlog} />;
    }
    if (currentPath === '/career') {
      return <CareerPage onNavigate={navigate} onApplyJob={handleApplyJob} />;
    }
    if (currentPath.startsWith('/career/') && currentPath.endsWith('/apply')) {
      const parts = currentPath.split('/');
      const jobSlug = parts[2];
      return <JobApplyPage jobSlug={jobSlug} onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (currentPath === '/book-a-call') {
      return <BookCallPage onNavigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/pricing') {
      return <PricingPage onNavigate={navigate} />;
    }

    // Default fallback
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col selection:bg-[#00F0FF]/30 selection:text-white">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
