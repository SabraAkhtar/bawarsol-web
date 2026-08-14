import React, { useState, useEffect } from 'react';
import { JobPosition } from '../types';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, UserCheck, Code } from 'lucide-react';
import { GlobalCTA } from '../components/GlobalCTA';

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

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-[#050505] border-b border-white/10 hero-radial-bg text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <span>Engineering Talent & Careers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Build the Future <br />
            <span className="font-serif italic font-normal text-[#00F0FF] accent-glow">
              With BawarSol
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Join an elite engineering team building autonomous agents, multi-modal LLMs, high-speed vision pipelines, and scalable AI infrastructure for global clients.
          </p>

          {/* Department filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedDept === dept
                    ? 'bg-[#00F0FF] text-black font-bold shadow-md shadow-[#00F0FF]/20'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Open Engineering Roles</h2>
            <span className="text-xs text-slate-400 font-mono">
              {filteredJobs.length} active positions in database
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading open positions from BawarSol database...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No active positions found in this department.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00F0FF]/40 transition-all shadow-xl flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-semibold text-[#00F0FF] uppercase tracking-wider block">
                          {job.department}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors mt-1">
                          {job.title}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/80 text-slate-300 border border-white/10 shrink-0">
                        {job.employmentType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#00F0FF]" />
                        {job.experience}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {job.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-400 block">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-black/60 text-[#00F0FF] px-2.5 py-1 rounded-md border border-white/10 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Competitive Salary + Equity</span>
                    <button
                      onClick={() => onApplyJob(job.slug)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-md shadow-[#00F0FF]/20"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <GlobalCTA onNavigate={onNavigate} />
    </div>
  );
};
