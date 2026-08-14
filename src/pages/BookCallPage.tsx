import React, { useState, useEffect } from 'react';
import { MeetingType } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Building,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Video,
  Download,
  CalendarCheck,
} from 'lucide-react';

interface BookCallPageProps {
  onNavigate: (path: string) => void;
}

export const BookCallPage: React.FC<BookCallPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);

  // Step 1: Meeting Type
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(null);

  // Step 2: Date
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Step 3: Time Slot
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('EST');

  // Step 4: Client Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [projectType, setProjectType] = useState('Agentic AI');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('$10,000+');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Step 5: Submission & Confirmation
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Initial load meeting types
  useEffect(() => {
    fetch('/api/bookings/meeting-types')
      .then((res) => res.json())
      .then((data) => {
        if (data.meetingTypes && data.meetingTypes.length > 0) {
          setMeetingTypes(data.meetingTypes);
          setSelectedMeetingType(data.meetingTypes[0]);
        }
      })
      .catch((err) => console.error('Failed to load meeting types', err));

    // Default to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Fetch available slots when date or meeting type changes
  useEffect(() => {
    if (!selectedDate || !selectedMeetingType) return;
    setSlotsLoading(true);
    fetch(`/api/bookings/available-slots?date=${selectedDate}&meetingTypeId=${selectedMeetingType.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableSlots(data.availableSlots || []);
        if (data.timezone) setTimezone(data.timezone);
        setSlotsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load slots', err);
        setSlotsLoading(false);
      });
  }, [selectedDate, selectedMeetingType]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeetingType || !selectedDate || !selectedSlot || !fullName || !email || !projectDescription) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingTypeId: selectedMeetingType.id,
          name: fullName,
          email,
          phone,
          company,
          jobTitle,
          projectType,
          projectDescription,
          budget,
          websiteUrl,
          date: selectedDate,
          startTime: selectedSlot,
          timezone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete booking');
      }

      setConfirmedBooking(data.booking);
      setStep(5);
    } catch (err: any) {
      setErrorMsg(err.message || 'Booking conflict or error. Please try another slot.');
    } finally {
      setSubmitting(false);
    }
  };

  // Generate .ics calendar download file string
  const downloadIcs = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BawarSol//AI Engineering Booking//EN
BEGIN:VEVENT
SUMMARY:BawarSol AI ${confirmedBooking.meetingTypeName} with ${confirmedBooking.name}
DESCRIPTION:${confirmedBooking.projectDescription}
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.startTime.replace(':', '')}00Z
DTEND:${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.endTime.replace(':', '')}00Z
LOCATION:BawarSol Secure Video Conference (Link emailed)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BawarSol_Meeting_${confirmedBooking.date}.ics`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Interactive Scheduling Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let's Talk About Your Project
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Tell us what you're building and let's explore how BawarSol can help.
          </p>

          {/* Step Indicator Bar */}
          {step < 5 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s
                        ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/30 scale-110'
                        : step > s
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                        : 'bg-white/[0.04] text-slate-500 border border-white/10'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  {s < 4 && <div className={`w-8 sm:w-12 h-0.5 mx-1 ${step > s ? 'bg-[#00F0FF]' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STEP 1: MEETING TYPE */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white text-center">Step 1 — Select Meeting Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meetingTypes.map((type) => {
                const isSelected = selectedMeetingType?.id === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => setSelectedMeetingType(type)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white/[0.05] border-[#00F0FF] shadow-xl shadow-[#00F0FF]/10 ring-2 ring-[#00F0FF]/20'
                        : 'bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[#00F0FF]">
                          <Video className="w-5 h-5 text-[#00F0FF]" />
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                          {type.durationMinutes} min
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{type.name}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{type.description}</p>
                    </div>

                    <button
                      className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#00F0FF] text-black shadow-md'
                          : 'bg-black/60 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Option'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 text-right">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedMeetingType}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] shadow-lg shadow-[#00F0FF]/20"
              >
                <span>Continue to Date Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE SELECTION */}
        {step === 2 && (
          <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Meeting Type</span>
              </button>
              <div className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full border border-[#00F0FF]/20">
                {selectedMeetingType?.name} ({selectedMeetingType?.durationMinutes} min)
              </div>
            </div>

            <div className="space-y-4 max-w-sm">
              <label className="block text-sm font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#00F0FF]" />
                <span>Step 2 — Select Date</span>
              </label>

              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              />

              <p className="text-xs text-slate-400 leading-relaxed">
                Working Hours: Mon–Fri 09:00 AM – 05:00 PM ({timezone}). Past dates and company holidays are automatically blocked.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-right">
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-black bg-[#00F0FF] disabled:opacity-50 hover:bg-[#33F3FF] shadow-lg shadow-[#00F0FF]/20"
              >
                <span>Continue to Time Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TIME SLOT SELECTION */}
        {step === 3 && (
          <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Date</span>
              </button>
              <div className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full border border-[#00F0FF]/20">
                {selectedMeetingType?.name} — {selectedDate}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00F0FF]" />
                <span>Step 3 — Select Time Slot ({timezone})</span>
              </label>

              {slotsLoading ? (
                <div className="text-xs text-slate-400 py-6 text-center">Checking available time slots...</div>
              ) : availableSlots.length === 0 ? (
                <div className="p-4 rounded-xl bg-black/60 text-xs text-amber-400 border border-amber-900/40">
                  No open slots on this date. Please pick another business day.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#00F0FF] text-black border-[#00F0FF] shadow-md shadow-[#00F0FF]/20'
                            : 'bg-black/60 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {selectedSlot ? `Selected: ${selectedDate} at ${selectedSlot} (${timezone})` : 'Select a time slot'}
              </span>

              <button
                onClick={() => setStep(4)}
                disabled={!selectedSlot}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-black bg-[#00F0FF] disabled:opacity-50 hover:bg-[#33F3FF] shadow-lg shadow-[#00F0FF]/20"
              >
                <span>Continue to Client Information</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CLIENT INFORMATION FORM */}
        {step === 4 && (
          <form onSubmit={handleBookingSubmit} className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Date/Time</span>
              </button>

              <div className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full border border-[#00F0FF]/20">
                {selectedMeetingType?.name} • {selectedDate} @ {selectedSlot} ({timezone})
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">Step 4 — Client Information</h2>

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
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Email Address <span className="text-[#00F0FF]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="NexusTech Global"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="VP of Engineering / Founder"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Project Category</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="Agentic AI">Agentic AI & Swarm Workflows</option>
                  <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                  <option value="RAG Systems">RAG Knowledge Systems</option>
                  <option value="Computer Vision">Computer Vision & OCR</option>
                  <option value="NLP">NLP & Language AI</option>
                  <option value="AI Automation">AI Workflow Automation</option>
                  <option value="Machine Learning">Machine Learning Models</option>
                  <option value="SaaS Development">SaaS & Full-Stack Platform</option>
                  <option value="Other">Other AI Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Project Vision & Scope Description <span className="text-[#00F0FF]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Briefly describe what you want to build, key objectives, and any technical constraints..."
                className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Budget Range</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$5,000">$1,000–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not Sure">Not Sure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Website / LinkedIn</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl font-bold text-sm text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-xl shadow-[#00F0FF]/25 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Locking in Slot & Processing...</span>
              ) : (
                <>
                  <CalendarCheck className="w-5 h-5" />
                  <span>Confirm Booking →</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 5: BOOKING CONFIRMATION */}
        {step === 5 && confirmedBooking && (
          <div className="p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-[#00F0FF]/50 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-3xl font-extrabold text-white">Your Call Is Booked 🎉</h2>

            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 max-w-lg mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Meeting Type:</span>
                <span className="text-[#00F0FF] font-bold">{confirmedBooking.meetingTypeName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-white font-bold">{confirmedBooking.date} at {confirmedBooking.startTime} ({confirmedBooking.timezone})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Client Name:</span>
                <span className="text-slate-200">{confirmedBooking.name} ({confirmedBooking.email})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Project Focus:</span>
                <span className="text-[#00F0FF]">{confirmedBooking.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="text-[#00F0FF]">{confirmedBooking.id}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              A calendar invitation with secure video conferencing link has been sent to <span className="text-[#00F0FF] font-bold">{confirmedBooking.email}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={downloadIcs}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-white/[0.08] hover:bg-white/20 border border-white/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Calendar Invite (.ics)</span>
              </button>

              <button
                onClick={() => onNavigate('/')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-colors"
              >
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
