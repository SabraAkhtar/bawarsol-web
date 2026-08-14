import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Building, DollarSign, Sparkles } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

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

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Direct Client Engagement</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Let's Build Something <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              Intelligent
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Have a project scope, system requirement, or custom AI architectural query? Send us a message and a BawarSol AI engineer will reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Contact Form & Info Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
                <h2 className="text-2xl font-bold text-white">Engineering Support & Inquiries</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We collaborate with CTOs, VP of Engineering, founders, and innovation teams to deploy robust AI software.
                </p>

                <div className="space-y-4 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[#00F0FF]">
                      <Mail className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <div className="text-slate-400">Email Inquiries:</div>
                      <div className="font-bold text-white text-sm">infobawarsol@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[#00F0FF]">
                      <Phone className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <div className="text-slate-400">Direct Consultation:</div>
                      <div className="font-bold text-white text-sm">+1 (800) 555-BAWAR</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[#00F0FF]">
                      <MapPin className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <div className="text-slate-400">HQ & Engineering Hubs:</div>
                      <div className="font-bold text-white text-sm">San Francisco, CA & Global Labs</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onNavigate('/book-a-call')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs text-black bg-[#00F0FF] hover:bg-[#33F3FF] shadow-md shadow-[#00F0FF]/20"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Or Book a Direct Video Call Immediately</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-[#00F0FF]/40 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Inquiry Received!</h2>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for contacting BawarSol. An AI architect has been assigned to your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#00F0FF] text-black font-bold text-sm hover:bg-[#33F3FF] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl">
                  <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                    Project Contact Form
                  </h2>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Your Name <span className="text-[#00F0FF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Company / Organization</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Email Address <span className="text-[#00F0FF]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Service Interest</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        {servicesList.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Estimated Budget Range</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        {budgetList.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Project Description & Technical Requirements <span className="text-[#00F0FF]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you are building, your timeline, existing tech stack, and goals..."
                      className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-lg shadow-[#00F0FF]/25 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message →</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
