import fs from 'fs';
import path from 'path';
import {
  Booking,
  BlogPost,
  ContactInquiry,
  JobApplication,
  JobPosition,
  MeetingType,
  SiteSettings,
} from '../src/types/index';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface Schema {
  settings: SiteSettings;
  meetingTypes: MeetingType[];
  bookings: Booking[];
  inquiries: ContactInquiry[];
  blogs: BlogPost[];
  jobs: JobPosition[];
  applications: JobApplication[];
}

const DEFAULT_SETTINGS: SiteSettings = {
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  workingHoursStart: '09:00',
  workingHoursEnd: '17:00',
  timezone: 'EST',
  bufferMinutes: 15,
  maxBookingsPerDay: 8,
  noticePeriodHours: 2,
  blockedDates: ['2026-12-25', '2026-01-01'],
};

const DEFAULT_MEETING_TYPES: MeetingType[] = [
  {
    id: 'discovery-call',
    name: 'Discovery Call',
    durationMinutes: 30,
    description: '30-minute introductory call to explore your business vision, AI potential, and high-level requirements.',
    iconName: 'Compass',
    active: true,
  },
  {
    id: 'technical-consultation',
    name: 'Technical Consultation',
    durationMinutes: 45,
    description: '45-minute deep-dive session with an AI Architect covering system architecture, RAG design, and LLM selection.',
    iconName: 'Cpu',
    active: true,
  },
  {
    id: 'project-consultation',
    name: 'Project Consultation',
    durationMinutes: 60,
    description: '60-minute strategic workshop for complete project scoping, timeline estimation, and deployment planning.',
    iconName: 'Boxes',
    active: true,
  },
];

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'building-production-ready-agentic-ai-workflows',
    title: 'Building Production-Ready Agentic AI Workflows with Multi-Agent Orchestration',
    excerpt: 'Explore how BawarSol designs fault-tolerant agentic workflows with dynamic tool calling, memory layers, and human-in-the-loop guardrails.',
    content: `
# Building Production-Ready Agentic AI Workflows with Multi-Agent Orchestration

Agentic AI represents a fundamental shift from simple prompt-response interactions to autonomous problem-solving engines. At BawarSol, our engineering team builds enterprise-grade agent systems capable of planning, executing complex multi-step workflows, calling external tools, and recovering from runtime exceptions.

## Key Architectures for Agentic Reliability

1. **Stateful Graph Orchestration**: Utilizing directed graph execution patterns to enforce clear transitions, boundary validations, and loop-back retries.
2. **Contextual Memory Retention**: Separating short-term working memory from long-term vector store memory to ensure relevant past interactions guide current decisions.
3. **Guardrails & Verification**: Implementing deterministic evaluation checks before external tool execution to guarantee safety and compliance.

## Real-World Impact

By deploying autonomous agentic pipelines in financial document verification and supply chain log auditing, BawarSol clients have achieved up to **78% reduction in human verification time** while maintaining 99.4% precision.
    `,
    category: 'Agentic AI',
    author: 'Dr. Zeeshan Bawar',
    authorRole: 'Founder & Principal AI Architect',
    date: '2026-08-01',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: true,
  },
  {
    id: 'blog-2',
    slug: 'optimizing-rag-systems-for-enterprise-knowledge',
    title: 'Optimizing Enterprise RAG: Hybrid Search, Reranking, and Graph RAG Systems',
    excerpt: 'How we overcome context window limitations and semantic hallucinations by combining sparse BM25 retrieval, dense embeddings, and Cohere reranking.',
    content: `
# Optimizing Enterprise RAG: Hybrid Search, Reranking, and Graph RAG Systems

Standard Retrieval Augmented Generation (RAG) often fails in enterprise settings due to complex document structures, domain terminology, and chunking boundary losses.

## The BawarSol RAG Architecture

- **Hybrid Dense & Sparse Search**: Combining HNSW vector indices with BM25 keyword matching for optimal recall across rare technical jargon.
- **Cross-Encoder Reranking**: Re-evaluating top-50 retrieved chunks using specialized cross-encoders to ensure highest semantic alignment before context insertion.
- **GraphRAG Topology**: Linking entities and relationships in a knowledge graph to allow multi-hop reasoning over complex enterprise data.

Through these optimizations, BawarSol knowledge systems consistently score >94% on domain accuracy metrics.
    `,
    category: 'RAG Systems',
    author: 'Aamir Khan',
    authorRole: 'Lead Machine Learning Engineer',
    date: '2026-07-22',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: false,
  },
  {
    id: 'blog-3',
    slug: 'computer-vision-for-automated-quality-inspection',
    title: 'Computer Vision in Manufacturing: Real-Time Quality Control at scale',
    excerpt: 'High-speed edge inference techniques for optical defect detection using custom YOLO micro-models and TensorRT acceleration.',
    content: `
# Computer Vision in Manufacturing: Real-Time Quality Control at Scale

Industrial manufacturing demands sub-millisecond anomaly detection on fast-moving assembly lines.

## Edge Deployment & TensorRT Optimization

BawarSol engineers train custom micro-YOLO and Vision Transformer models tailored specifically for industrial camera feeds. By quantizing models to INT8 precision and deploying via NVIDIA TensorRT on edge hardware, we achieve **120 FPS processing** on high-resolution camera feeds without sacrificing defect recall.
    `,
    category: 'Computer Vision',
    author: 'Elena Vance',
    authorRole: 'Computer Vision Lead',
    date: '2026-07-10',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: false,
  },
  {
    id: 'blog-4',
    slug: 'fine-tuning-open-source-llms-vs-proprietary-apis',
    title: 'Fine-Tuning Open Source LLMs vs. Proprietary API Pipelines: A Cost & Privacy Analysis',
    excerpt: 'When to fine-tune Llama-3 or Mistral models vs leveraging Gemini 1.5 Pro and Claude 3.5 Sonnet for enterprise workflows.',
    content: `
# Fine-Tuning Open Source LLMs vs. Proprietary API Pipelines

Choosing between hosted frontier models and self-hosted open weights is one of the most critical decisions in modern software architecture.

## Decision Matrix
- **Data Privacy & On-Prem**: Open-source models (Llama-3, Qwen-2.5) with LoRA fine-tuning offer complete data sovereignty.
- **Complex Reasoning & Multimodal**: Frontier APIs excel in zero-shot multi-modal understanding and long-context analysis.
- **Latency & Cost**: Domain-specific fine-tuned 8B parameter models can deliver up to **5x lower inference latency** and **10x lower token costs** at scale.
    `,
    category: 'Generative AI',
    author: 'Dr. Zeeshan Bawar',
    authorRole: 'Founder & Principal AI Architect',
    date: '2026-06-28',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: false,
  },
];

const DEFAULT_JOBS: JobPosition[] = [
  {
    id: 'job-1',
    slug: 'senior-ai-engineer',
    title: 'Senior AI Engineer',
    department: 'AI Engineering',
    location: 'Remote / Hybrid',
    employmentType: 'Full-time',
    experience: '4+ Years',
    description: 'We are seeking an experienced AI Engineer to design and deploy autonomous agentic systems, fine-tune LLMs, and architect resilient RAG pipelines for global clients.',
    responsibilities: [
      'Architect and deploy production-grade multi-agent agentic workflows using LangGraph and AutoGen framework concepts.',
      'Optimize vector retrieval pipelines with hybrid search, reranking models, and graph embeddings.',
      'Integrate LLMs with external tools, REST APIs, and enterprise database systems.',
      'Collaborate directly with client CTOs to define technical specifications and AI system benchmarks.',
    ],
    skills: ['Python', 'TypeScript', 'LangChain/LangGraph', 'PyTorch', 'Vector DBs (Pinecone/Qdrant)', 'Docker', 'FastAPI'],
    published: true,
    createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'job-2',
    slug: 'machine-learning-engineer',
    title: 'Machine Learning Engineer (Computer Vision & NLP)',
    department: 'Core ML',
    location: 'Remote',
    employmentType: 'Full-time',
    experience: '3+ Years',
    description: 'Join BawarSol to train, fine-tune, and deploy custom computer vision models and Transformer NLP pipelines for industrial automation and document intelligence.',
    responsibilities: [
      'Train custom vision transformers and object detection models (YOLO, DETR) for high-speed edge inference.',
      'Develop quantized INT8/FP16 models optimized with TensorRT and ONNX Runtime.',
      'Build end-to-end MLOps tracking pipelines using MLflow and DVC.',
    ],
    skills: ['PyTorch', 'TensorFlow', 'OpenCV', 'TensorRT', 'ONNX', 'Python', 'MLOps'],
    published: true,
    createdAt: '2026-07-05T10:00:00Z',
  },
  {
    id: 'job-3',
    slug: 'ai-automation-engineer',
    title: 'AI Automation Engineer',
    department: 'Automation & Integration',
    location: 'Remote',
    employmentType: 'Full-time',
    experience: '2+ Years',
    description: 'Build automated end-to-end workflows connecting LLM reasoning engines with CRM, ERP, and communication platforms.',
    responsibilities: [
      'Design complex workflow automation bridges with custom Python microservices and webhook orchestration.',
      'Build self-healing RPA and browser agent drivers for legacy enterprise systems.',
      'Ensure high throughput and error handling across thousands of daily automated tasks.',
    ],
    skills: ['Node.js/TypeScript', 'Python', 'Playwright/Puppeteer', 'REST APIs', 'PostgreSQL', 'Redis'],
    published: true,
    createdAt: '2026-07-12T10:00:00Z',
  },
  {
    id: 'job-4',
    slug: 'full-stack-developer-ai-apps',
    title: 'Full Stack Developer (AI Products)',
    department: 'Software Engineering',
    location: 'Remote / Hybrid',
    employmentType: 'Full-time',
    experience: '3+ Years',
    description: 'Develop high-performance, responsive React/Next.js web applications powered by streaming AI backends and real-time WebSocket communication.',
    responsibilities: [
      'Build scalable web applications using Next.js, React, Node.js, and Tailwind CSS.',
      'Implement real-time AI response streaming, markdown renderers, and interactive canvas visualizations.',
      'Architect relational database schemas with Prisma and PostgreSQL.',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js/Express', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    published: true,
    createdAt: '2026-07-15T10:00:00Z',
  },
  {
    id: 'job-5',
    slug: 'ai-research-intern',
    title: 'AI & Generative AI Intern',
    department: 'Research & Innovation',
    location: 'Remote',
    employmentType: 'Internship',
    experience: 'Students / Recent Grads',
    description: 'A 6-month hands-on internship opportunity for passionate students looking to build real-world AI applications under senior AI mentors.',
    responsibilities: [
      'Conduct evaluations on emerging open-source LLMs and multimodal models.',
      'Assist senior engineers in prototyping RAG applications and synthetic data generators.',
      'Author technical documentation and engineering blog summaries.',
    ],
    skills: ['Python', 'Basic PyTorch', 'Git', 'Prompt Engineering', 'API Integration'],
    published: true,
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'job-6',
    slug: 'business-development-executive',
    title: 'Business Development Executive (AI Solutions)',
    department: 'Growth & Enterprise',
    location: 'Remote',
    employmentType: 'Full-time',
    experience: '3+ Years',
    description: 'Drive growth and client partnerships for BawarSol by identifying high-impact AI opportunities with enterprise decision makers across North America and Europe.',
    responsibilities: [
      'Lead discovery calls with CTOs, VP of Engineering, and business leaders.',
      'Develop customized technical AI project proposals and scope estimations.',
      'Manage client relationships through consultation to delivery phase.',
    ],
    skills: ['B2B Tech Sales', 'AI Solutions Understanding', 'Enterprise Pitching', 'CRM Management'],
    published: true,
    createdAt: '2026-07-25T10:00:00Z',
  },
];

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'booking-demo-1',
    meetingTypeId: 'discovery-call',
    meetingTypeName: 'Discovery Call',
    durationMinutes: 30,
    name: 'Sarah Jenkins',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 234-5678',
    company: 'NexusTech Global',
    jobTitle: 'VP of Product',
    projectType: 'Agentic AI',
    projectDescription: 'Building an automated customer intelligence agent that synthesizes support tickets with knowledge base docs.',
    budget: '$10,000+',
    websiteUrl: 'https://techcorp.com',
    date: '2026-08-18',
    startTime: '10:00',
    endTime: '10:30',
    timezone: 'EST',
    status: 'CONFIRMED',
    notes: 'Client interested in dynamic tool calling and vector retrieval.',
    createdAt: '2026-08-10T14:30:00Z',
  },
  {
    id: 'booking-demo-2',
    meetingTypeId: 'technical-consultation',
    meetingTypeName: 'Technical Consultation',
    durationMinutes: 45,
    name: 'David Vance',
    email: 'david@healthai.io',
    phone: '+1 (555) 876-5432',
    company: 'HealthAI Systems',
    jobTitle: 'Chief Medical Information Officer',
    projectType: 'Computer Vision & RAG',
    projectDescription: 'Medical imaging classification with LLM narrative generation for radiology reports.',
    budget: '$10,000+',
    date: '2026-08-20',
    startTime: '14:00',
    endTime: '14:45',
    timezone: 'EST',
    status: 'CONFIRMED',
    createdAt: '2026-08-11T09:15:00Z',
  },
];

const DEFAULT_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Marcus Brody',
    company: 'LogiFlow Solutions',
    email: 'm.brody@logiflow.com',
    phone: '+1 (555) 432-1098',
    service: 'AI Automation',
    budget: '$5,000–$10,000',
    message: 'Looking to automate our invoice processing and warehouse route tracking using computer vision and document AI.',
    status: 'UNREAD',
    createdAt: '2026-08-12T18:20:00Z',
  },
  {
    id: 'inq-2',
    name: 'Sophia Liang',
    company: 'EduLearn Digital',
    email: 's.liang@edulearn.org',
    phone: '+1 (555) 345-6789',
    service: 'Generative AI',
    budget: '$10,000+',
    message: 'We want to develop an interactive Socratic AI tutor for high school STEM students.',
    status: 'CONTACTED',
    createdAt: '2026-08-11T11:05:00Z',
  },
];

class JsonDatabase {
  private data: Schema;

  constructor() {
    this.data = this.load();
  }

  private ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private load(): Schema {
    this.ensureDir();
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      } catch (e) {
        console.error('Error reading db.json, re-initializing', e);
      }
    }
    const initialSchema: Schema = {
      settings: DEFAULT_SETTINGS,
      meetingTypes: DEFAULT_MEETING_TYPES,
      bookings: DEFAULT_BOOKINGS,
      inquiries: DEFAULT_INQUIRIES,
      blogs: DEFAULT_BLOGS,
      jobs: DEFAULT_JOBS,
      applications: [],
    };
    this.save(initialSchema);
    return initialSchema;
  }

  private save(schema?: Schema) {
    this.ensureDir();
    const toSave = schema || this.data;
    fs.writeFileSync(DB_FILE, JSON.stringify(toSave, null, 2), 'utf-8');
  }

  // Settings
  getSettings(): SiteSettings {
    return this.data.settings;
  }

  updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
    return this.data.settings;
  }

  // Meeting Types
  getMeetingTypes(): MeetingType[] {
    return this.data.meetingTypes.filter((m) => m.active);
  }

  getAllMeetingTypes(): MeetingType[] {
    return this.data.meetingTypes;
  }

  // Bookings
  getBookings(): Booking[] {
    return this.data.bookings;
  }

  getBookingById(id: string): Booking | undefined {
    return this.data.bookings.find((b) => b.id === id);
  }

  addBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): { booking?: Booking; error?: string } {
    // Check for double booking conflict
    const conflict = this.data.bookings.find(
      (b) =>
        b.date === bookingData.date &&
        b.startTime === bookingData.startTime &&
        b.status !== 'CANCELLED'
    );

    if (conflict) {
      return { error: 'This time slot was just booked. Please select another time.' };
    }

    const newBooking: Booking = {
      ...bookingData,
      id: 'booking_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
    };

    this.data.bookings.unshift(newBooking);
    this.save();
    return { booking: newBooking };
  }

  updateBookingStatus(id: string, status: Booking['status'], notes?: string): Booking | null {
    const booking = this.data.bookings.find((b) => b.id === id);
    if (!booking) return null;
    booking.status = status;
    if (notes !== undefined) booking.notes = notes;
    this.save();
    return booking;
  }

  // Contact Inquiries
  getInquiries(): ContactInquiry[] {
    return this.data.inquiries;
  }

  addInquiry(inquiryData: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>): ContactInquiry {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      status: 'UNREAD',
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.unshift(newInquiry);
    this.save();
    return newInquiry;
  }

  updateInquiryStatus(id: string, status: ContactInquiry['status']): ContactInquiry | null {
    const inquiry = this.data.inquiries.find((i) => i.id === id);
    if (!inquiry) return null;
    inquiry.status = status;
    this.save();
    return inquiry;
  }

  // Blogs
  getBlogs(includeUnpublished = false): BlogPost[] {
    if (includeUnpublished) return this.data.blogs;
    return this.data.blogs.filter((b) => b.published);
  }

  getBlogBySlug(slug: string): BlogPost | undefined {
    return this.data.blogs.find((b) => b.slug === slug);
  }

  createBlog(blogData: Omit<BlogPost, 'id'>): BlogPost {
    const newBlog: BlogPost = {
      ...blogData,
      id: 'blog_' + Date.now(),
    };
    this.data.blogs.unshift(newBlog);
    this.save();
    return newBlog;
  }

  updateBlog(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const index = this.data.blogs.findIndex((b) => b.id === id);
    if (index === -1) return null;
    this.data.blogs[index] = { ...this.data.blogs[index], ...updates };
    this.save();
    return this.data.blogs[index];
  }

  deleteBlog(id: string): boolean {
    const len = this.data.blogs.length;
    this.data.blogs = this.data.blogs.filter((b) => b.id !== id);
    if (this.data.blogs.length !== len) {
      this.save();
      return true;
    }
    return false;
  }

  // Jobs
  getJobs(includeUnpublished = false): JobPosition[] {
    if (includeUnpublished) return this.data.jobs;
    return this.data.jobs.filter((j) => j.published);
  }

  getJobBySlug(slug: string): JobPosition | undefined {
    return this.data.jobs.find((j) => j.slug === slug);
  }

  createJob(jobData: Omit<JobPosition, 'id' | 'createdAt'>): JobPosition {
    const newJob: JobPosition = {
      ...jobData,
      id: 'job_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    this.data.jobs.unshift(newJob);
    this.save();
    return newJob;
  }

  updateJob(id: string, updates: Partial<JobPosition>): JobPosition | null {
    const index = this.data.jobs.findIndex((j) => j.id === id);
    if (index === -1) return null;
    this.data.jobs[index] = { ...this.data.jobs[index], ...updates };
    this.save();
    return this.data.jobs[index];
  }

  deleteJob(id: string): boolean {
    const len = this.data.jobs.length;
    this.data.jobs = this.data.jobs.filter((j) => j.id !== id);
    if (this.data.jobs.length !== len) {
      this.save();
      return true;
    }
    return false;
  }

  // Applications
  getApplications(): JobApplication[] {
    return this.data.applications;
  }

  addApplication(appData: Omit<JobApplication, 'id' | 'status' | 'createdAt'>): JobApplication {
    const newApp: JobApplication = {
      ...appData,
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.data.applications.unshift(newApp);
    this.save();
    return newApp;
  }

  updateApplicationStatus(id: string, status: JobApplication['status']): JobApplication | null {
    const app = this.data.applications.find((a) => a.id === id);
    if (!app) return null;
    app.status = status;
    this.save();
    return app;
  }
}

export const db = new JsonDatabase();
