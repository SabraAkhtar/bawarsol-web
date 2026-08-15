import React, { useState, useEffect } from 'react';
import { JobPosition } from '../types';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, UserCheck, Code } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerPageProps {
  onNavigate: (path: string) => void;
  onApplyJob: (jobSlug: string) => void;
}

export const CareerPage: React.FC<CareerPageProps> = ({ onNavigate, onApplyJob }) => {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load jobs', err);
        setLoading(false);
      });
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter(
    (j) => selectedDept === 'All' || j.department === selectedDept
  );

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
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Engineering Talent & Careers</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
            Build the Future <br />
            <span className="font-serif italic font-normal text-blue-600 accent-glow">
              With BawarSol
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Join an elite engineering team building autonomous agents, multi-modal LLMs, high-speed vision pipelines, and scalable AI infrastructure for global clients.
          </motion.p>

          {/* Department filter pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 pt-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-blue-600 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-105'
                    : 'bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-white/30'
                }`}
              >
                {dept}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-20 relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6"
          >
            <h2 className="text-3xl font-extrabold text-slate-900">Open Engineering Roles</h2>
            <span className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-sm text-blue-600 font-bold shadow-sm">
              {filteredJobs.length} active positions in database
            </span>
          </motion.div>

          {loading ? (
            <div className="text-center py-20 text-blue-600 font-bold animate-pulse text-lg">
              Loading open positions from BawarSol database...
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 p-8 rounded-[2rem] bg-white shadow-sm border border-slate-200 backdrop-blur-sm">
              <p className="text-slate-500 text-lg">No active positions found in this department.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <AnimatePresence>
                {filteredJobs.map((job) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    key={job.id}
                    className="p-8 sm:p-10 rounded-[2rem] bg-white shadow-sm backdrop-blur-2xl border border-slate-200 hover:border-blue-600/40 hover:bg-slate-50 border border-slate-200 transition-all shadow-xl flex flex-col justify-between group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
                        <div>
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                            {job.department}
                          </span>
                          <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                            {job.title}
                          </h3>
                        </div>
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600/10 text-blue-600 border border-blue-600/30 shrink-0 uppercase tracking-wide">
                          {job.employmentType}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                          {job.experience}
                        </span>
                      </div>

                      <p className="text-slate-600 text-base leading-relaxed">
                        {job.description}
                      </p>

                      <div className="space-y-3 pt-4">
                        <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Required Skills:</span>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs font-bold bg-white shadow-sm border border-slate-200 text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-600/50 hover:text-blue-600 transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                      <span className="text-sm font-bold text-slate-500">Competitive Salary + Equity</span>
                      <button
                        onClick={() => onApplyJob(job.slug)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-black bg-blue-600 hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
