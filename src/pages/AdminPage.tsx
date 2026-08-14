import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Briefcase,
  Users,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Edit3,
  Eye,
  AlertCircle,
  Save,
} from 'lucide-react';
import { Booking, ContactInquiry, BlogPost, JobPosition, JobApplication, SiteSettings, AdminStats } from '../types';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Auth state
  const [token, setToken] = useState<string>(() => localStorage.getItem('bawarsol_admin_token') || '');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'settings' | 'inquiries' | 'blogs' | 'jobs' | 'applications'
  >('overview');

  // Data State
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Modal / Form States
  const [newBlogModal, setNewBlogModal] = useState(false);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Agentic AI',
    author: 'Dr. Zeeshan Bawar',
    authorRole: 'Founder & Principal AI Architect',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    published: true,
  });

  const [newJobModal, setNewJobModal] = useState(false);
  const [jobForm, setJobForm] = useState<Partial<JobPosition>>({
    title: '',
    slug: '',
    department: 'AI Engineering',
    location: 'Remote',
    employmentType: 'Full-time',
    experience: '3+ Years',
    description: '',
    skills: ['Python', 'TypeScript'],
    published: true,
  });

  // Verify auth or fetch stats when token is set
  useEffect(() => {
    if (!token) return;
    fetchAdminData();
  }, [token]);

  const fetchAdminData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [resStats, resBookings, resInquiries, resBlogs, resJobs, resApps, resSettings] =
        await Promise.all([
          fetch('/api/admin/stats', { headers }),
          fetch('/api/admin/bookings', { headers }),
          fetch('/api/admin/inquiries', { headers }),
          fetch('/api/admin/blogs', { headers }),
          fetch('/api/admin/jobs', { headers }),
          fetch('/api/admin/applications', { headers }),
          fetch('/api/admin/settings', { headers }),
        ]);

      if (resStats.status === 401) {
        setToken('');
        localStorage.removeItem('bawarsol_admin_token');
        return;
      }

      const dataStats = await resStats.json();
      const dataBookings = await resBookings.json();
      const dataInquiries = await resInquiries.json();
      const dataBlogs = await resBlogs.json();
      const dataJobs = await resJobs.json();
      const dataApps = await resApps.json();
      const dataSettings = await resSettings.json();

      if (dataStats.stats) setStats(dataStats.stats);
      if (dataBookings.bookings) setBookings(dataBookings.bookings);
      if (dataInquiries.inquiries) setInquiries(dataInquiries.inquiries);
      if (dataBlogs.blogs) setBlogs(dataBlogs.blogs);
      if (dataJobs.jobs) setJobs(dataJobs.jobs);
      if (dataApps.applications) setApplications(dataApps.applications);
      if (dataSettings.settings) setSettings(dataSettings.settings);
    } catch (e) {
      console.error('Failed to load admin data', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setToken(data.token);
      localStorage.setItem('bawarsol_admin_token', data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Invalid credentials');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('bawarsol_admin_token');
  };

  // Status Handlers
  const handleBookingStatus = async (id: string, status: Booking['status']) => {
    await fetch(`/api/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchAdminData();
  };

  const handleInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    await fetch(`/api/admin/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchAdminData();
  };

  const handleApplicationStatus = async (id: string, status: JobApplication['status']) => {
    await fetch(`/api/admin/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchAdminData();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
    alert('Booking settings updated successfully!');
    fetchAdminData();
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogForm),
    });
    setNewBlogModal(false);
    fetchAdminData();
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    await fetch(`/api/admin/blogs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAdminData();
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobForm),
    });
    setNewJobModal(false);
    fetchAdminData();
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job position?')) return;
    await fetch(`/api/admin/jobs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAdminData();
  };

  // If unauthenticated, show sleek login view
  if (!token) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">BawarSol Admin Portal</h1>
            <p className="text-xs text-slate-400">Enter secure admin credentials to access system dashboard</p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-lg shadow-[#00F0FF]/20"
            >
              {authenticating ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-400">
            Contact system administrator for access credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-20 pb-12">
      {/* Top Bar */}
      <div className="bg-white/[0.03] backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#00F0FF]" />
            <div>
              <h1 className="text-lg font-bold text-white leading-none">BawarSol Management Console</h1>
              <span className="text-[11px] text-[#00F0FF] font-mono">Authenticated Admin Session</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-black/60 border border-white/10"
            >
              View Main Site
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-900/50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
            { id: 'settings', label: 'Booking Settings', icon: <Settings className="w-4 h-4" /> },
            { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'blogs', label: 'Blogs CRUD', icon: <FileText className="w-4 h-4" /> },
            { id: 'jobs', label: 'Careers CRUD', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'applications', label: 'Job Applications', icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/20 font-bold'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW STATS */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-2">
                <span className="text-xs text-slate-400">Total Bookings</span>
                <div className="text-3xl font-extrabold text-white">{stats.totalBookings}</div>
                <span className="text-xs text-[#00F0FF] font-mono">{stats.upcomingCalls} upcoming</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-2">
                <span className="text-xs text-slate-400">Contact Inquiries</span>
                <div className="text-3xl font-extrabold text-white">{stats.totalInquiries}</div>
                <span className="text-xs text-[#00F0FF] font-mono">{stats.unreadInquiries} unread</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-2">
                <span className="text-xs text-slate-400">Job Applications</span>
                <div className="text-3xl font-extrabold text-white">{stats.totalApplications}</div>
                <span className="text-xs text-amber-400 font-mono">{stats.newApplications} new candidates</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-2">
                <span className="text-xs text-slate-400">Published Content</span>
                <div className="text-3xl font-extrabold text-white">{stats.publishedBlogs}</div>
                <span className="text-xs text-[#00F0FF] font-mono">{stats.activeJobs} active job posts</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upcoming Bookings */}
              <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>Recent Call Bookings</span>
                  <button onClick={() => setActiveTab('bookings')} className="text-xs text-[#00F0FF]">View All</button>
                </h3>
                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div key={b.id} className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{b.name} ({b.company})</div>
                        <div className="text-slate-400">{b.meetingTypeName} • {b.date} @ {b.startTime}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>Recent Inquiries</span>
                  <button onClick={() => setActiveTab('inquiries')} className="text-xs text-[#00F0FF]">View All</button>
                </h3>
                <div className="space-y-3">
                  {inquiries.slice(0, 4).map((i) => (
                    <div key={i.id} className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{i.name} ({i.service})</div>
                        <div className="text-slate-400">{i.email} • Budget: {i.budget}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-black/80 text-slate-300 font-mono">
                        {i.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Call Bookings Management</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 text-slate-400 font-mono border-b border-white/10">
                  <tr>
                    <th className="p-4">Client</th>
                    <th className="p-4">Meeting Type</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Project & Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="font-bold text-white">{b.name}</div>
                        <div className="text-slate-400">{b.email}</div>
                        <div className="text-slate-500">{b.company}</div>
                      </td>
                      <td className="p-4 font-mono text-[#00F0FF]">{b.meetingTypeName}</td>
                      <td className="p-4 font-mono text-slate-300">{b.date} @ {b.startTime} ({b.timezone})</td>
                      <td className="p-4">
                        <div className="text-slate-200 font-medium">{b.projectType}</div>
                        <div className="text-slate-400">{b.budget}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-black/60 text-[#00F0FF] border border-white/10">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 space-x-1">
                        <button
                          onClick={() => handleBookingStatus(b.id, 'CONFIRMED')}
                          className="px-2 py-1 bg-[#00F0FF]/20 text-[#00F0FF] rounded text-[10px] hover:bg-[#00F0FF]/30"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleBookingStatus(b.id, 'COMPLETED')}
                          className="px-2 py-1 bg-white/10 text-white rounded text-[10px] hover:bg-white/20"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleBookingStatus(b.id, 'CANCELLED')}
                          className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[10px] hover:bg-rose-900"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKING SETTINGS */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Booking Engine Configuration</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Working Hours Start</label>
                <input
                  type="time"
                  value={settings.workingHoursStart}
                  onChange={(e) => setSettings({ ...settings, workingHoursStart: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Working Hours End</label>
                <input
                  type="time"
                  value={settings.workingHoursEnd}
                  onChange={(e) => setSettings({ ...settings, workingHoursEnd: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Default Timezone</label>
              <input
                type="text"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Buffer Minutes Between Calls</label>
                <input
                  type="number"
                  value={settings.bufferMinutes}
                  onChange={(e) => setSettings({ ...settings, bufferMinutes: parseInt(e.target.value) || 15 })}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Max Bookings Per Day</label>
                <input
                  type="number"
                  value={settings.maxBookingsPerDay}
                  onChange={(e) => setSettings({ ...settings, maxBookingsPerDay: parseInt(e.target.value) || 8 })}
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00F0FF] text-black font-bold text-xs hover:bg-[#33F3FF] transition-colors shadow-md shadow-[#00F0FF]/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </form>
        )}

        {/* TAB 4: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Contact Form Inquiries</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 text-slate-400 font-mono border-b border-white/10">
                  <tr>
                    <th className="p-4">Sender</th>
                    <th className="p-4">Service & Budget</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {inquiries.map((i) => (
                    <tr key={i.id} className="hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="font-bold text-white">{i.name}</div>
                        <div className="text-slate-400">{i.email}</div>
                        <div className="text-slate-500">{i.company}</div>
                      </td>
                      <td className="p-4 font-mono text-[#00F0FF]">{i.service} ({i.budget})</td>
                      <td className="p-4 max-w-xs text-slate-300 truncate">{i.message}</td>
                      <td className="p-4 font-mono text-amber-400">{i.status}</td>
                      <td className="p-4 space-x-1">
                        <button
                          onClick={() => handleInquiryStatus(i.id, 'CONTACTED')}
                          className="px-2 py-1 bg-[#00F0FF]/20 text-[#00F0FF] rounded text-[10px]"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={() => handleInquiryStatus(i.id, 'ARCHIVED')}
                          className="px-2 py-1 bg-white/10 text-slate-400 rounded text-[10px]"
                        >
                          Archive
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: BLOGS CRUD */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Blogs Management</h2>
              <button
                onClick={() => setNewBlogModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#00F0FF] text-black hover:bg-[#33F3FF]"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Blog Post</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div key={b.id} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#00F0FF] font-mono">{b.category}</span>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-white text-base">{b.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>
                </div>
              ))}
            </div>

            {/* Create Blog Modal */}
            {newBlogModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form onSubmit={handleCreateBlog} className="bg-[#050505] border border-white/10 p-8 rounded-3xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-white">Create New Blog Post</h3>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Title</label>
                    <input
                      required
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Category</label>
                    <input
                      type="text"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Excerpt</label>
                    <textarea
                      rows={2}
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Full Content (Markdown supported)</label>
                    <textarea
                      rows={6}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setNewBlogModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                    <button type="submit" className="px-5 py-2 text-xs font-bold bg-[#00F0FF] text-black rounded-xl">Publish Post</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: CAREERS CRUD */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Careers & Job Openings Management</h2>
              <button
                onClick={() => setNewJobModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#00F0FF] text-black hover:bg-[#33F3FF]"
              >
                <Plus className="w-4 h-4" />
                <span>Create Job Position</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((j) => (
                <div key={j.id} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#00F0FF] font-mono">{j.department}</span>
                    <button onClick={() => handleDeleteJob(j.id)} className="text-rose-400 hover:text-rose-300 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-white text-base">{j.title}</h3>
                  <p className="text-xs text-slate-400">{j.location} • {j.employmentType}</p>
                </div>
              ))}
            </div>

            {/* Create Job Modal */}
            {newJobModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <form onSubmit={handleCreateJob} className="bg-[#050505] border border-white/10 p-8 rounded-3xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-white">Create Open Position</h3>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Job Title</label>
                    <input
                      required
                      type="text"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Department</label>
                    <input
                      type="text"
                      value={jobForm.department}
                      onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setNewJobModal(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                    <button type="submit" className="px-5 py-2 text-xs font-bold bg-[#00F0FF] text-black rounded-xl">Create Position</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: JOB APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Job Applications Review</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 text-slate-400 font-mono border-b border-white/10">
                  <tr>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Position</th>
                    <th className="p-4">Links</th>
                    <th className="p-4">Cover Letter</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">No applications submitted yet.</td>
                    </tr>
                  ) : (
                    applications.map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02]">
                        <td className="p-4">
                          <div className="font-bold text-white">{a.fullName}</div>
                          <div className="text-slate-400">{a.email}</div>
                          <div className="text-slate-500">{a.phone}</div>
                        </td>
                        <td className="p-4 font-mono text-[#00F0FF]">{a.jobTitle}</td>
                        <td className="p-4 space-y-1">
                          {a.linkedinUrl && <a href={a.linkedinUrl} target="_blank" rel="noreferrer" className="block text-[#00F0FF] underline">LinkedIn</a>}
                          {a.githubUrl && <a href={a.githubUrl} target="_blank" rel="noreferrer" className="block text-[#00F0FF] underline">GitHub</a>}
                        </td>
                        <td className="p-4 max-w-xs text-slate-300 truncate">{a.coverLetter}</td>
                        <td className="p-4 font-mono text-amber-400">{a.status}</td>
                        <td className="p-4 space-x-1">
                          <button
                            onClick={() => handleApplicationStatus(a.id, 'SHORTLISTED')}
                            className="px-2 py-1 bg-[#00F0FF]/20 text-[#00F0FF] rounded text-[10px]"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleApplicationStatus(a.id, 'REJECTED')}
                            className="px-2 py-1 bg-rose-950 text-rose-400 rounded text-[10px]"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
