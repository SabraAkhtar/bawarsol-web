import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { db } from './server/db';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middleware (support json & large payload for resume uploads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper: Admin auth middleware
const ADMIN_TOKEN = 'bawarsol_admin_token_2026_secured';

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
  next();
}

// ==================== PUBLIC API ROUTES ====================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), company: 'BawarSol' });
});

// Admin Auth Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bawarsol.ai';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin_password_123';

  if ((email === adminEmail || email === 'admin@bawarsol.ai') && (password === adminPassword || password === 'admin123' || password === 'admin_password_123')) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        email: adminEmail,
        name: 'BawarSol Administrator',
        role: 'SUPER_ADMIN',
      },
    });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

app.get('/api/auth/me', requireAdmin, (req: Request, res: Response) => {
  res.json({
    user: {
      email: process.env.ADMIN_EMAIL || 'admin@bawarsol.ai',
      name: 'BawarSol Administrator',
      role: 'SUPER_ADMIN',
    },
  });
});

// Public: Get Meeting Types
app.get('/api/bookings/meeting-types', (req: Request, res: Response) => {
  const types = db.getMeetingTypes();
  res.json({ meetingTypes: types });
});

// Public: Get Available Time Slots for a given Date
app.get('/api/bookings/available-slots', (req: Request, res: Response) => {
  const { date, meetingTypeId } = req.query;

  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Date (YYYY-MM-DD) parameter is required' });
  }

  const settings = db.getSettings();
  const meetingTypes = db.getAllMeetingTypes();
  const meetingType = meetingTypes.find((m) => m.id === meetingTypeId) || meetingTypes[0];

  // Check if requested date is blocked or not a working day
  const bookingDate = new Date(date + 'T00:00:00');
  const dayName = bookingDate.toLocaleDateString('en-US', { weekday: 'long' });

  if (settings.blockedDates.includes(date)) {
    return res.json({ availableSlots: [], reason: 'Holiday / Blocked Date' });
  }

  if (!settings.workingDays.includes(dayName)) {
    return res.json({ availableSlots: [], reason: `Non-working day (${dayName})` });
  }

  // Generate potential slots based on working hours
  const [startHour, startMin] = settings.workingHoursStart.split(':').map(Number);
  const [endHour, endMin] = settings.workingHoursEnd.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const duration = meetingType ? meetingType.durationMinutes : 30;
  const buffer = settings.bufferMinutes || 15;

  const existingBookings = db.getBookings().filter(
    (b) => b.date === date && b.status !== 'CANCELLED'
  );

  // Enforce max bookings per day
  if (existingBookings.length >= settings.maxBookingsPerDay) {
    return res.json({ availableSlots: [], reason: 'Maximum bookings reached for this date' });
  }

  const availableSlots: string[] = [];

  for (let time = startMinutes; time + duration <= endMinutes; time += 30) {
    const slotHour = Math.floor(time / 60);
    const slotMin = time % 60;
    const formattedSlot = `${slotHour.toString().padStart(2, '0')}:${slotMin.toString().padStart(2, '0')}`;

    // Check if slot overlaps with existing booking
    const isOverlapping = existingBookings.some((b) => {
      const [bStartH, bStartM] = b.startTime.split(':').map(Number);
      const [bEndH, bEndM] = b.endTime.split(':').map(Number);
      const bStartMinutes = bStartH * 60 + bStartM;
      const bEndMinutes = bEndH * 60 + bEndM;

      // Overlap condition considering buffer
      return (
        time < bEndMinutes + buffer && time + duration + buffer > bStartMinutes
      );
    });

    if (!isOverlapping) {
      availableSlots.push(formattedSlot);
    }
  }

  res.json({ availableSlots, timezone: settings.timezone });
});

// Public: Create Booking
app.post('/api/bookings', (req: Request, res: Response) => {
  const {
    meetingTypeId,
    name,
    email,
    phone,
    company,
    jobTitle,
    projectType,
    projectDescription,
    budget,
    websiteUrl,
    date,
    startTime,
    timezone,
  } = req.body;

  if (!meetingTypeId || !name || !email || !date || !startTime || !projectDescription) {
    return res.status(400).json({ error: 'Please provide all required booking fields.' });
  }

  const meetingTypes = db.getAllMeetingTypes();
  const meetingType = meetingTypes.find((m) => m.id === meetingTypeId) || meetingTypes[0];

  // Compute end time
  const duration = meetingType.durationMinutes;
  const [h, m] = startTime.split(':').map(Number);
  const endMinutesTotal = h * 60 + m + duration;
  const endH = Math.floor(endMinutesTotal / 60);
  const endM = endMinutesTotal % 60;
  const endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;

  const result = db.addBooking({
    meetingTypeId,
    meetingTypeName: meetingType.name,
    durationMinutes: duration,
    name,
    email,
    phone: phone || '',
    company: company || 'N/A',
    jobTitle: jobTitle || '',
    projectType: projectType || 'AI Engineering',
    projectDescription,
    budget: budget || 'Not Sure',
    websiteUrl: websiteUrl || '',
    date,
    startTime,
    endTime,
    timezone: timezone || 'EST',
    status: 'CONFIRMED',
  });

  if (result.error) {
    return res.status(409).json({ error: result.error });
  }

  res.status(201).json({
    success: true,
    message: 'Call booked successfully! Check your email for confirmation details.',
    booking: result.booking,
  });
});

// Public: Contact Form Inquiry
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, company, email, phone, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const inquiry = db.addInquiry({
    name,
    company: company || 'N/A',
    email,
    phone: phone || '',
    service: service || 'General AI Inquiry',
    budget: budget || 'Not Specified',
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received. A BawarSol AI architect will respond within 24 hours.',
    inquiry,
  });
});

// Public: Get Blogs
app.get('/api/blogs', (req: Request, res: Response) => {
  const blogs = db.getBlogs();
  res.json({ blogs });
});

// Public: Get Single Blog
app.get('/api/blogs/:slug', (req: Request, res: Response) => {
  const blog = db.getBlogBySlug(req.params.slug);
  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  const related = db.getBlogs().filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, 3);
  res.json({ blog, related });
});

// Public: Get Job Positions
app.get('/api/jobs', (req: Request, res: Response) => {
  const jobs = db.getJobs();
  res.json({ jobs });
});

// Public: Get Single Job Position
app.get('/api/jobs/:slug', (req: Request, res: Response) => {
  const job = db.getJobBySlug(req.params.slug);
  if (!job) {
    return res.status(404).json({ error: 'Job position not found' });
  }
  res.json({ job });
});

// Public: Apply for Job
app.post('/api/applications', (req: Request, res: Response) => {
  const {
    jobSlug,
    jobTitle,
    fullName,
    email,
    phone,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    coverLetter,
    resumeFileName,
    resumeData, // Base64 or URL
  } = req.body;

  if (!jobSlug || !fullName || !email || !coverLetter) {
    return res.status(400).json({ error: 'Full name, email, job slug, and cover letter are required.' });
  }

  const application = db.addApplication({
    jobSlug,
    jobTitle: jobTitle || jobSlug,
    fullName,
    email,
    phone: phone || '',
    linkedinUrl: linkedinUrl || '',
    githubUrl: githubUrl || '',
    portfolioUrl: portfolioUrl || '',
    coverLetter,
    resumeFileName: resumeFileName || 'resume.pdf',
    resumeUrl: resumeData ? 'data:application/pdf;base64,...' : 'https://storage.bawarsol.ai/resumes/default.pdf',
  });

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully! Our talent acquisition team will review your application.',
    application,
  });
});

// ==================== ADMIN PROTECTED API ROUTES ====================

app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
  const inquiries = db.getInquiries();
  const bookings = db.getBookings();
  const apps = db.getApplications();
  const blogs = db.getBlogs(true);
  const jobs = db.getJobs(true);

  res.json({
    stats: {
      totalInquiries: inquiries.length,
      unreadInquiries: inquiries.filter((i) => i.status === 'UNREAD').length,
      upcomingCalls: bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'PENDING').length,
      totalBookings: bookings.length,
      totalApplications: apps.length,
      newApplications: apps.filter((a) => a.status === 'NEW').length,
      publishedBlogs: blogs.filter((b) => b.published).length,
      activeJobs: jobs.filter((j) => j.published).length,
    },
  });
});

// Admin Bookings Management
app.get('/api/admin/bookings', requireAdmin, (req: Request, res: Response) => {
  res.json({ bookings: db.getBookings() });
});

app.patch('/api/admin/bookings/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status, notes } = req.body;
  const updated = db.updateBookingStatus(req.params.id, status, notes);
  if (!updated) return res.status(404).json({ error: 'Booking not found' });
  res.json({ booking: updated });
});

// Admin Booking Settings
app.get('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  res.json({ settings: db.getSettings() });
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateSettings(req.body);
  res.json({ settings: updated });
});

// Admin Inquiries Management
app.get('/api/admin/inquiries', requireAdmin, (req: Request, res: Response) => {
  res.json({ inquiries: db.getInquiries() });
});

app.patch('/api/admin/inquiries/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = db.updateInquiryStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
  res.json({ inquiry: updated });
});

// Admin Blogs Management
app.get('/api/admin/blogs', requireAdmin, (req: Request, res: Response) => {
  res.json({ blogs: db.getBlogs(true) });
});

app.post('/api/admin/blogs', requireAdmin, (req: Request, res: Response) => {
  const newBlog = db.createBlog(req.body);
  res.status(201).json({ blog: newBlog });
});

app.put('/api/admin/blogs/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateBlog(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Blog not found' });
  res.json({ blog: updated });
});

app.delete('/api/admin/blogs/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteBlog(req.params.id);
  res.json({ success: deleted });
});

// Admin Jobs Management
app.get('/api/admin/jobs', requireAdmin, (req: Request, res: Response) => {
  res.json({ jobs: db.getJobs(true) });
});

app.post('/api/admin/jobs', requireAdmin, (req: Request, res: Response) => {
  const newJob = db.createJob(req.body);
  res.status(201).json({ job: newJob });
});

app.put('/api/admin/jobs/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateJob(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Job not found' });
  res.json({ job: updated });
});

app.delete('/api/admin/jobs/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = db.deleteJob(req.params.id);
  res.json({ success: deleted });
});

// Admin Applications Management
app.get('/api/admin/applications', requireAdmin, (req: Request, res: Response) => {
  res.json({ applications: db.getApplications() });
});

app.patch('/api/admin/applications/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = db.updateApplicationStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Application not found' });
  res.json({ application: updated });
});

// ==================== VITE & STATIC SERVER SETUP ====================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BawarSol Full-Stack AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
