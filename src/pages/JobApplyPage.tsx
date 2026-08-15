import React, { useState, useEffect } from 'react';
import { JobPosition } from '../types';
import { ArrowLeft, Upload, CheckCircle2, AlertCircle, Send, FileText, User, Mail, Phone, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [dragActive, setDragActive] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, isDragEvent = false) => {
    if (isDragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    }
    
    let file: File | null = null;
    
    if (isDragEvent) {
        const dragEvent = e as React.DragEvent<HTMLDivElement>;
        if (dragEvent.dataTransfer.files && dragEvent.dataTransfer.files[0]) {
             file = dragEvent.dataTransfer.files[0];
        }
    } else {
         const inputEvent = e as React.ChangeEvent<HTMLInputElement>;
         if (inputEvent.target.files && inputEvent.target.files[0]) {
             file = inputEvent.target.files[0];
         }
    }
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('Resume file size must be less than 10MB.');
        return;
      }
      setResumeFile(file);
      setErrorMsg('');
    }
  };
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 text-center flex items-center justify-center">
        <div className="text-blue-600 animate-pulse font-bold">Loading position details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('/career')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 px-4 py-2 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Positions</span>
        </motion.button>

        {/* Position Header Banner */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-10 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 mb-8 space-y-4 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] to-transparent pointer-events-none" />
          <div className="relative z-10">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                Application for:
              </span>
              <h1 className="text-4xl font-extrabold text-[#0A1628] tracking-tight">{job?.title || jobSlug}</h1>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium pt-3">
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Department: {job?.department}</span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Location: {job?.location}</span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Type: {job?.employmentType}</span>
              </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-blue-600/40 text-center space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-20 h-20 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto border border-blue-600/20 shadow-inner"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <h2 className="text-3xl font-extrabold text-[#0A1628]">Application Received 🎉</h2>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for applying for the <span className="text-blue-600 font-bold">{job?.title}</span> position at BawarSol. Our engineering talent team will review your application and respond shortly.
                    </p>
                    <div className="pt-4">
                        <button
                          onClick={() => onNavigate('/career')}
                          className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                        >
                          Return to Careers
                        </button>
                    </div>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit} 
                className="p-8 sm:p-12 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 space-y-8 shadow-2xl relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-900/[0.01] to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-8">
                    <motion.h2 variants={itemVariants} className="text-2xl font-extrabold text-[#0A1628] border-b border-slate-200 pb-4">
                      Applicant Profile & Details
                    </motion.h2>
        
                    {errorMsg && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm flex items-center gap-3 backdrop-blur-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
        
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Full Name <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>
                      </div>
        
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                          Email Address <span className="text-blue-600">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alex@example.com"
                            className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </motion.div>
        
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>
                      </div>
        
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">LinkedIn Profile</label>
                        <div className="relative">
                          <Link2 className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="url"
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </motion.div>
        
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">GitHub Profile</label>
                        <input
                          type="url"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          placeholder="https://github.com/username"
                          className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                        />
                      </div>
        
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Portfolio / Website</label>
                        <input
                          type="url"
                          value={portfolioUrl}
                          onChange={(e) => setPortfolioUrl(e.target.value)}
                          placeholder="https://yourportfolio.com"
                          className="w-full px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner"
                        />
                      </div>
                    </motion.div>
        
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Cover Letter & Experience <span className="text-blue-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Briefly describe your background in AI, machine learning frameworks, key projects, and why you want to join BawarSol..."
                        className="w-full p-5 rounded-2xl bg-slate-100 border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-blue-600/50 focus:bg-white/90 transition-all shadow-inner resize-y"
                      />
                    </motion.div>
        
                    {/* Resume Upload */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Resume / CV (PDF, DOCX max 10MB)
                      </label>
                      <div 
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => handleFileChange(e, true)}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer relative transition-colors duration-200 ${
                            dragActive ? 'border-blue-600 bg-blue-600/5' : 'border-slate-200 hover:border-blue-600/30 bg-slate-100 hover:bg-white/90'
                        }`}
                       >
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, false)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        />
                        <div className="pointer-events-none space-y-3 relative z-0">
                            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-colors ${resumeFile ? 'bg-blue-600/20 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                {resumeFile ? <FileText className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                            </div>
                            
                            {resumeFile ? (
                              <div>
                                  <p className="text-sm text-blue-600 font-bold">{resumeFile.name}</p>
                                  <p className="text-xs text-blue-600/70 mt-1">{(resumeFile.size / 1024).toFixed(0)} KB • Click or drag to replace</p>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-slate-600 font-bold">Click to upload or drag & drop</p>
                                <p className="text-xs text-slate-500 mt-1 font-mono">Accepted: .pdf, .docx</p>
                              </div>
                            )}
                        </div>
                      </div>
                    </motion.div>
        
                    <motion.div variants={itemVariants} className="pt-4">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-4.5 rounded-full font-bold text-base text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <span>Submitting Application...</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Submit Application →</span>
                            </>
                          )}
                        </button>
                    </motion.div>
                </div>
              </motion.form>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};
