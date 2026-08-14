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
import { motion, AnimatePresence } from 'framer-motion';

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

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] pt-24 pb-16 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center space-y-4 mb-12"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <Sparkles className="w-4 h-4 text-[#00F0FF]" />
            <span>Interactive Scheduling Engine</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Let's Talk About Your Project
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Tell us what you're building and let's explore how BawarSol can help.
          </motion.p>

          {/* Step Indicator Bar */}
          {step < 5 && (
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 pt-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: step === s ? 1.1 : 1,
                      backgroundColor: step === s ? '#00F0FF' : step > s ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      borderColor: step === s ? '#00F0FF' : step > s ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                      color: step === s ? '#000' : step > s ? '#00F0FF' : '#64748b'
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors border shadow-sm ${
                      step === s ? 'shadow-[0_0_15px_rgba(0,240,255,0.4)]' : ''
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </motion.div>
                  {s < 4 && <div className={`w-8 sm:w-16 h-1 mx-2 rounded-full transition-colors duration-300 ${step > s ? 'bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'bg-white/10'}`} />}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* STEP 1: MEETING TYPE */}
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">Step 1 — Select Meeting Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {meetingTypes.map((type) => {
                  const isSelected = selectedMeetingType?.id === type.id;
                  return (
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      key={type.id}
                      onClick={() => setSelectedMeetingType(type)}
                      className={`p-8 rounded-[2rem] border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                        isSelected
                          ? 'bg-white/[0.05] border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.15)] ring-1 ring-[#00F0FF]/30'
                          : 'bg-white/[0.02] backdrop-blur-xl border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      {isSelected && <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/10 to-transparent opacity-50" />}
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className={`p-3 rounded-2xl border transition-colors ${isSelected ? 'bg-[#00F0FF]/20 border-[#00F0FF]/50 text-[#00F0FF]' : 'bg-black/60 border-white/10 text-slate-400 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/30'}`}>
                            <Video className="w-6 h-6" />
                          </span>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${isSelected ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/30' : 'bg-black/40 text-slate-400 border-white/10 group-hover:border-white/20 group-hover:text-slate-300'}`}>
                            {type.durationMinutes} min
                          </span>
                        </div>
                        <h3 className={`text-xl font-extrabold transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{type.name}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{type.description}</p>
                      </div>

                      <button
                        className={`w-full mt-8 py-3.5 rounded-2xl text-sm font-bold transition-all relative z-10 ${
                          isSelected
                            ? 'bg-[#00F0FF] text-black shadow-lg shadow-[#00F0FF]/20'
                            : 'bg-black/40 text-slate-400 group-hover:text-white group-hover:bg-white/5 border border-white/10'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Option'}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-8 text-right">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedMeetingType}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  <span>Continue to Date Selection</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATE SELECTION */}
          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="p-8 sm:p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.02] to-transparent pointer-events-none" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4 relative z-10">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors w-fit px-4 py-2 rounded-full hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Meeting Type</span>
                </button>
                <div className="text-sm font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/20 shadow-sm w-fit">
                  {selectedMeetingType?.name} ({selectedMeetingType?.durationMinutes} min)
                </div>
              </div>

              <div className="space-y-6 max-w-md relative z-10">
                <label className="text-lg font-bold text-white flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-[#00F0FF]" />
                  <span>Step 2 — Select Date</span>
                </label>

                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 pl-12 rounded-2xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner custom-date-input"
                  />
                  <CalendarIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                  Working Hours: Mon–Fri 09:00 AM – 05:00 PM ({timezone}). Past dates and company holidays are automatically blocked.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 flex justify-end relative z-10">
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  <span>Continue to Time Slot</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: TIME SLOT SELECTION */}
          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="p-8 sm:p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.02] to-transparent pointer-events-none" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4 relative z-10">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors w-fit px-4 py-2 rounded-full hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Date</span>
                </button>
                <div className="text-sm font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/20 shadow-sm w-fit">
                  {selectedMeetingType?.name} — {selectedDate}
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <label className="text-lg font-bold text-white flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#00F0FF]" />
                  <span>Step 3 — Select Time Slot ({timezone})</span>
                </label>

                {slotsLoading ? (
                  <div className="text-sm text-[#00F0FF] py-12 text-center animate-pulse font-bold bg-black/20 rounded-2xl border border-white/5">
                    Analyzing available time slots...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-rose-950/20 text-sm text-rose-400 border border-rose-900/40 backdrop-blur-sm flex items-center justify-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    No open slots on this date. Please pick another business day.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3.5 px-4 rounded-xl text-sm font-mono font-bold transition-all border ${
                            isSelected
                              ? 'bg-[#00F0FF] text-black border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)] ring-2 ring-[#00F0FF]/50 ring-offset-2 ring-offset-[#050505]'
                              : 'bg-black/40 text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/5'
                          }`}
                        >
                          {slot}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <span className="text-sm font-medium text-slate-400 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                  {selectedSlot ? `Selected: ${selectedDate} at ${selectedSlot} (${timezone})` : 'Select a time slot above'}
                </span>

                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedSlot}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CLIENT INFORMATION FORM */}
          {step === 4 && (
            <motion.form key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" onSubmit={handleBookingSubmit} className="p-8 sm:p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors w-fit px-4 py-2 rounded-full hover:bg-white/5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Date/Time</span>
                  </button>

                  <div className="text-sm font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/20 shadow-sm w-fit">
                    {selectedMeetingType?.name} • {selectedDate} @ {selectedSlot} ({timezone})
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-white">Step 4 — Client Information</h2>

                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm flex items-center gap-3 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                        Full Name <span className="text-[#00F0FF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                        Email Address <span className="text-[#00F0FF]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Company Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="NexusTech Global"
                        className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Job Title</label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="VP of Engineering / Founder"
                        className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Project Category</label>
                      <div className="relative">
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner appearance-none"
                        >
                          <option value="Agentic AI" className="bg-[#0f0f0f]">Agentic AI & Swarm Workflows</option>
                          <option value="Generative AI & LLMs" className="bg-[#0f0f0f]">Generative AI & LLMs</option>
                          <option value="RAG Systems" className="bg-[#0f0f0f]">RAG Knowledge Systems</option>
                          <option value="Computer Vision" className="bg-[#0f0f0f]">Computer Vision & OCR</option>
                          <option value="NLP" className="bg-[#0f0f0f]">NLP & Language AI</option>
                          <option value="AI Automation" className="bg-[#0f0f0f]">AI Workflow Automation</option>
                          <option value="Machine Learning" className="bg-[#0f0f0f]">Machine Learning Models</option>
                          <option value="SaaS Development" className="bg-[#0f0f0f]">SaaS & Full-Stack Platform</option>
                          <option value="Other" className="bg-[#0f0f0f]">Other AI Inquiry</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Project Vision & Scope Description <span className="text-[#00F0FF]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Briefly describe what you want to build, key objectives, and any technical constraints..."
                      className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Budget Range</label>
                      <div className="relative">
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner appearance-none"
                        >
                          <option value="Under $1,000" className="bg-[#0f0f0f]">Under $1,000</option>
                          <option value="$1,000–$5,000" className="bg-[#0f0f0f]">$1,000–$5,000</option>
                          <option value="$5,000–$10,000" className="bg-[#0f0f0f]">$5,000–$10,000</option>
                          <option value="$10,000+" className="bg-[#0f0f0f]">$10,000+</option>
                          <option value="Not Sure" className="bg-[#0f0f0f]">Not Sure</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Website / LinkedIn</label>
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://company.com"
                        className="w-full px-5 py-3.5 rounded-xl bg-black/40 border border-white/10 text-base text-white focus:outline-none focus:border-[#00F0FF]/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4.5 rounded-full font-bold text-base text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
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
                </div>
              </div>
            </motion.form>
          )}

          {/* STEP 5: BOOKING CONFIRMATION */}
          {step === 5 && confirmedBooking && (
            <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" className="p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-[#00F0FF]/40 text-center space-y-8 shadow-[0_0_50px_rgba(0,240,255,0.1)] max-w-2xl mx-auto relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.05] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mx-auto shadow-inner"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>

                <h2 className="text-4xl font-extrabold text-white">Your Call Is Booked 🎉</h2>

                <div className="p-8 rounded-[1.5rem] bg-black/40 border border-white/10 max-w-lg mx-auto text-left space-y-4 font-mono text-sm shadow-inner mt-8">
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400">Meeting Type:</span>
                    <span className="text-[#00F0FF] font-bold">{confirmedBooking.meetingTypeName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-white font-bold">{confirmedBooking.date} at {confirmedBooking.startTime} ({confirmedBooking.timezone})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400">Client Name:</span>
                    <span className="text-slate-200">{confirmedBooking.name} ({confirmedBooking.email})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-slate-400">Project Focus:</span>
                    <span className="text-[#00F0FF]">{confirmedBooking.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booking Reference:</span>
                    <span className="text-[#00F0FF]">{confirmedBooking.id}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mt-6">
                  A calendar invitation with a secure video conferencing link has been sent to <span className="text-[#00F0FF] font-bold">{confirmedBooking.email}</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <button
                    onClick={downloadIcs}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Calendar Invite (.ics)</span>
                  </button>

                  <button
                    onClick={() => onNavigate('/')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-black bg-[#00F0FF] hover:bg-[#33F3FF] transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                  >
                    <span>Return to Homepage</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
