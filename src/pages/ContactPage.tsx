import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Building, DollarSign, Sparkles } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion } from 'framer-motion';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('AI Agent');
  const [budget, setBudget] = useState('$10,000+');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    'AI Agent',
    'Generative AI',
    'RAG Systems',
    'Computer Vision',
    'NLP',
    'AI Automation',
    'Machine Learning',
    'SaaS Development',
    'Custom Software',
    'Graphic Design',
    'Other / Advisory',
  ];

  const budgetList = [
    'Under $1,000',
    '$1,000–$5,000',
    '$5,000–$10,000',
    '$10,000+',
    'Not Sure',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please fill out all required fields (Name, Email, Message).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, service, budget, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
      {/* Hero Header */}
      <section className="relative py-20 bg-slate-50 border-b border-slate-200 hero-radial-bg text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <span>Direct Client Engagement</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#0A1628] tracking-tight">
            Let's Build Something <br />
            <span className="font-serif italic font-normal text-blue-600">
              Extraordinary
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Have a project scope, system requirement, or custom architectural query? Send us a message and a BawarSol expert will reply within 24 hours.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Contact Form & Info Grid */}
      <section className="py-20 relative">
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Info Column */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
              <div className="p-8 sm:p-10 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 shadow-2xl space-y-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#0A1628] mb-4">Engineering Support & Inquiries</h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    We collaborate with CTOs, founders, and innovation teams to deploy robust digital solutions.
                  </p>
                </div>

                <div className="space-y-6 text-sm text-slate-600 pt-4 border-t border-slate-200">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-2xl bg-white/90 border border-slate-200 text-blue-600 group-hover:bg-blue-600/10 group-hover:border-blue-600/40 transition-colors mt-1 shadow-inner">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-500 font-medium mb-1">Email Inquiries:</div>
                      <a href="mailto:infobawarsol@gmail.com" className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors">infobawarsol@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-2xl bg-white/90 border border-slate-200 text-blue-600 group-hover:bg-blue-600/10 group-hover:border-blue-600/40 transition-colors mt-1 shadow-inner">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-500 font-medium mb-1">Direct Consultation:</div>
                      <a href="tel:+1800555BAWAR" className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors">+1 (800) 555-BAWAR</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 rounded-2xl bg-white/90 border border-slate-200 text-blue-600 group-hover:bg-blue-600/10 group-hover:border-blue-600/40 transition-colors mt-1 shadow-inner">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-500 font-medium mb-1">HQ & Engineering Hubs:</div>
                      <div className="font-bold text-slate-900 text-base">San Francisco, CA & Global Labs</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <button
                    onClick={() => { onNavigate('/book-a-call'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Book a Direct Video Call</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Form Column */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              {submitted ? (
                <div className="p-12 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-blue-600/40 shadow-[0_0_40px_rgba(0,240,255,0.1)] text-center space-y-6 h-full flex flex-col justify-center items-center min-h-[500px]">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 flex items-center justify-center mx-auto shadow-inner"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h2 className="text-3xl font-extrabold text-[#0A1628]">Inquiry Received!</h2>
                  <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
                    Thank you for contacting BawarSol. An expert has been assigned to your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-8 py-3.5 rounded-full border border-slate-300 text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 space-y-8 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] to-transparent rounded-[2rem] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-extrabold text-[#0A1628] border-b border-slate-200 pb-6 mb-8">
                      Project Contact Form
                    </h2>

                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-4 mb-6 rounded-2xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm flex items-center gap-3 backdrop-blur-md"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Your Name <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Company / Organization</label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Email Address <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Primary Service Interest</label>
                          <div className="relative">
                            <select
                              value={service}
                              onChange={(e) => setService(e.target.value)}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner appearance-none"
                            >
                              {servicesList.map((s) => (
                                <option key={s} value={s} className="bg-[#0f0f0f] text-slate-900">{s}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Budget Range</label>
                          <div className="relative">
                            <select
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner appearance-none"
                            >
                              {budgetList.map((b) => (
                                <option key={b} value={b} className="bg-[#0f0f0f] text-slate-900">{b}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Project Description & Technical Requirements <span className="text-blue-600">*</span>
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us what you are building, your timeline, existing tech stack, and goals..."
                          className="w-full p-5 rounded-2xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner resize-y"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4.5 rounded-full font-bold text-base text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Message →</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
