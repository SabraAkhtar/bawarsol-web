export interface SiteSettings {
  workingDays: string[]; // e.g. ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  workingHoursStart: string; // e.g. "09:00"
  workingHoursEnd: string; // e.g. "17:00"
  timezone: string; // e.g. "UTC"
  bufferMinutes: number; // e.g. 15
  maxBookingsPerDay: number; // e.g. 8
  noticePeriodHours: number; // e.g. 2
  blockedDates: string[]; // YYYY-MM-DD
}

export interface MeetingType {
  id: string;
  name: string;
  durationMinutes: number;
  description: string;
  iconName: string;
  active: boolean;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface Booking {
  id: string;
  meetingTypeId: string;
  meetingTypeName: string;
  durationMinutes: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle?: string;
  projectType: string;
  projectDescription: string;
  budget: string;
  websiteUrl?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  timezone: string;
  status: BookingStatus;
  calendarEventId?: string;
  notes?: string;
  createdAt: string;
}

export type InquiryStatus = 'UNREAD' | 'READ' | 'CONTACTED' | 'ARCHIVED';

export interface ContactInquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  coverImage: string;
  published: boolean;
  featured?: boolean;
}

export interface JobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  experience: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  published: boolean;
  createdAt: string;
}

export type ApplicationStatus = 'NEW' | 'REVIEWING' | 'SHORTLISTED' | 'INTERVIEW' | 'REJECTED' | 'HIRED';

export interface JobApplication {
  id: string;
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  coverLetter: string;
  resumeFileName: string;
  resumeUrl: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  technologies: string[];
  useCases: string[];
}

export interface IndustryDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  useCases: string[];
  relevantServices: string[];
  metrics: string;
}

export interface AdminStats {
  totalInquiries: number;
  unreadInquiries: number;
  upcomingCalls: number;
  totalBookings: number;
  totalApplications: number;
  newApplications: number;
  publishedBlogs: number;
  activeJobs: number;
}
