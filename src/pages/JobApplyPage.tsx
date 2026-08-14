import React, { useState, useEffect } from 'react';
import { JobPosition } from '../types';
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, Send, FileText, User, Mail, Phone, Link2 } from 'lucide-react';

interface JobApplyPageProps {
  jobSlug: string;
  onNavigate: (path: string) => void;
}

export const JobApplyPage: React.FC<JobApplyPageProps> = ({ jobSlug, onNavigate }) => {
  const [job, setJob] = useState<JobPosition | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${jobSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.job) setJob(data.job);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch job details', err);
        setLoading(false);
      });
  }, [jobSlug]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('Resume file size must be less than 10MB.');
        return;
      }
      setResumeFile(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !coverLetter) {
      setErrorMsg('Please fill out all required fields (Full Name, Email, Cover Letter).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      // Convert resume to base64 if present
      let resumeData = '';
      if (resumeFile) {
        const reader = new FileReader();
        resumeData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(resumeFile);
        });
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobSlug,
          jobTitle: job?.title || jobSlug,
          fullName,
          email,
          phone,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          coverLetter,
          resumeFileName: resumeFile?.name || 'resume.pdf',
          resumeData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-32 text-center">
        <p className="text-slate-400">Loading position details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => onNavigate('/career')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#00F0FF] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Positions</span>
        </button>

        {/* Position Header Banner */}
        <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 mb-8 space-y-3">
          <span className="text-xs font-semibold text-[#00F0FF] uppercase tracking-wider block">
            Application for:
          </span>
          <h1 className="text-3xl font-extrabold text-white">{job?.title || jobSlug}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono pt-1">
            <span>Department: {job?.department}</span>
            <span>•</span>
            <span>Location: {job?.location}</span>
            <span>•</span>
            <span>Type: {job?.employmentType}</span>
          </div>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-[#00F0FF]/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Application Received 🎉</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for applying for the <span className="text-[#00F0FF] font-semibold">{job?.title}</span> position at BawarSol. Our engineering talent team will review your application and respond shortly.
            </p>
            <button
              onClick={() => onNavigate('/career')}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#00F0FF] text-black font-bold text-sm hover:bg-[#33F3FF] transition-colors"
            >
              Return to Careers
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Applicant Profile & Details
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
                  Full Name <span className="text-[#00F0FF]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Email Address <span className="text-[#00F0FF]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">LinkedIn Profile URL</label>
                <div className="relative">
                  <Link2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">GitHub Profile URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Portfolio / Personal Website</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Cover Letter & Engineering Experience <span className="text-[#00F0FF]">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Briefly describe your background in AI, machine learning frameworks, key projects, and why you want to join BawarSol..."
                className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Resume / Curriculum Vitae (PDF, DOCX max 10MB)
              </label>
              <div className="border-2 border-dashed border-white/10 hover:border-[#00F0FF]/50 rounded-2xl p-6 text-center cursor-pointer bg-black/40 relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-[#00F0FF] mx-auto mb-2" />
                {resumeFile ? (
                  <p className="text-xs text-[#00F0FF] font-semibold">{resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)</p>
                ) : (
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Click to upload or drag & drop resume file</p>
                    <p className="text-[10px] text-slate-500 mt-1">Accepted: .pdf, .docx</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-lg shadow-[#00F0FF]/20 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
