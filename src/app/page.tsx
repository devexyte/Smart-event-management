'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Calendar,
  Award,
  Users,
  Building2,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  ExternalLink,
  Code,
  FileCheck2,
  Bell,
  CheckCircle2,
  UserPlus,
  QrCode,
  Sparkles,
  Smartphone,
  Check,
  ChevronRight,
  Search,
  Radio,
  SlidersHorizontal,
  Flame,
  GraduationCap,
} from 'lucide-react';
import { useEvent } from '@/context/EventContext';
import { StudentRegistrationModal } from '@/components/common/StudentRegistrationModal';

export default function LandingPage() {
  const { events, setRole, switchUser, users, stats, announcements } = useEvent();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const publishedEvents = events.filter((e) => e.status === 'published');
  
  // Filter events by search query and category
  const filteredEvents = publishedEvents.filter((event) => {
    if (activeCategory !== 'all' && event.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.venueName.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const featuredEvents = filteredEvents.slice(0, 3);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'technical', label: 'Technical & Coding' },
    { id: 'cultural', label: 'Cultural (Aarohan)' },
    { id: 'academic', label: 'Academic Seminars' },
    { id: 'sports', label: 'Sports & Gymkhana' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Institutional Top Navbar */}
      <nav className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-sm">
              RC
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight block leading-tight">
                Ramnarain Ruia Autonomous College
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block">
                Smart Event Management System • Matunga, Mumbai
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-medium">
            <a href="#events" className="hover:text-blue-600 transition-colors">Upcoming Events</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#venues" className="hover:text-blue-600 transition-colors">Campus Venues</a>
            <a href="#portals" className="hover:text-blue-600 transition-colors">Role Portals</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About Ruia</a>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Register Student</span>
              <span className="sm:hidden">Register</span>
            </button>

            <Link
              href="/dashboard"
              onClick={() => {
                setRole('student');
                const s = users.find((u) => u.role === 'student');
                if (s) switchUser(s.id);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Access Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* College Notice Bar */}
      <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-b border-blue-100 py-2.5 px-4 text-center text-xs text-blue-900 font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider shadow-2xs">
          Notice
        </span>
        <span className="truncate">
          Registrations now live for Aarohan Cultural Festival & TechRuia National Hackathon 2026.
        </span>
        <span className="hidden md:inline text-blue-400">•</span>
        <span className="hidden md:inline text-blue-700 font-normal">
          Optical Camera Gate Pass verification active at Ruia Auditorium Desk.
        </span>
      </div>

      {/* Hero Section with Rich Visual Depth & Collegiate Imagery */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle architectural dot grid & ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-100/70 via-sky-100/40 to-indigo-100/30 blur-[100px] -z-10 pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs text-slate-700 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-900">Ramnarain Ruia Autonomous College</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-medium">Estd. 1937 • NAAC 'A+' Grade</span>
            </div>

            {/* Smart Event Management Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Smart Event Management
              </h1>
              <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
                Official Campus Events, Festivals & Academic Symposiums Portal
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The unified digital ecosystem for Ramnarain Ruia Autonomous College. Discover campus festivals, register with your roll number, download digital QR gate tickets, and receive real-time updates from organizing committees.
            </p>

            {/* Primary Calls to Action */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>New Student? Register Profile</span>
              </button>

              <a
                href="#events"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-200 shadow-2xs transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Explore Events</span>
              </a>

              <Link
                href="/dashboard"
                onClick={() => {
                  setRole('student');
                  const s = users.find((u) => u.role === 'student');
                  if (s) switchUser(s.id);
                }}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-200 transition-colors flex items-center gap-2"
              >
                <Code className="w-4 h-4 text-blue-600" />
                <span>Hackathon Hub</span>
              </Link>
            </div>

            {/* Live Search & Quick Filter Input right on hero */}
            <div className="pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search symposiums, hackathons, venues (e.g., TechNova, Quadrangle)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (High-Res Event Photo + Layered Pass & Scanner Badges) */}
          <div className="lg:col-span-6 relative">
            {/* Main Visual Media Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
              <div className="relative h-80 sm:h-[400px] w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=85"
                  alt="Ramnarain Ruia Autonomous College Campus Event Gathering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                />
                {/* Gradient scrim for clear readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90" />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Ruia Campus Live</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-blue-600/95 backdrop-blur-md text-xs font-semibold text-white shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Auditorium & Quadrangle</span>
                  </div>
                </div>

                {/* Bottom Information on the Photo */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      Flagship Summit
                    </span>
                    <span className="text-xs text-blue-200 font-medium">
                      Oct 15 - 16, 2026
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    TechNova 2026: National Innovation Summit
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    36-Hour Hackathon • Cash Pool ₹1,50,000 • Keynote by Industry Leaders • Ruia Auditorium & Quadrangle
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Live QR Entrance Pass Preview */}
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Student Digital Pass</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Active ✓
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block">
                      RUIA-2026-CS105 • Aarav Sharma • Auditorium Tier A
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => {
                    setRole('student');
                    const s = users.find((u) => u.role === 'student');
                    if (s) switchUser(s.id);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold transition-colors shrink-0"
                >
                  View Pass
                </Link>
              </div>
            </div>

            {/* Floating Live Gate Scanner Notification Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-xl items-center gap-3 max-w-xs animate-bounce-subtle z-10">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block leading-tight">
                  Gate A Check-In Verified
                </span>
                <span className="text-[11px] text-slate-500">
                  Optical camera scanned ticket in 0.3s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Statistics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">{stats.totalEvents}</span>
            <span className="text-xs text-slate-500 block mt-1">Active Campus Events</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-600">{stats.totalRegistrations}+</span>
            <span className="text-xs text-slate-500 block mt-1">Student Registrations</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600">{stats.checkInPercentage}%</span>
            <span className="text-xs text-slate-500 block mt-1">Gate Pass Verification</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">Estd. 1937</span>
            <span className="text-xs text-slate-500 block mt-1">85+ Years of Legacy</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Seamless Collegiate Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How Smart Event Management Operates
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Four simple steps bridging college students, faculty coordinators, and gate entry desks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">Browse & Register</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover symposiums, competitive hackathons, or workshops and secure your seat with your Ruia Roll Number in 1-click.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">Instant QR Pass</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A digital pass is automatically generated with a secure scannable code, seating tier, and venue directions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">Optical Camera Check-In</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Organizers scan tickets using mobile or webcam optical camera check-in at auditorium and quadrangle entrances.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900">Verified E-Certificates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon verified gate attendance, download official, tamper-proof participation certificates signed by college authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events Section */}
      <section id="events" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
              Official College Calendar
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Featured Upcoming Events & Festivals
            </h2>
          </div>
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('student');
              const s = users.find((u) => u.role === 'student');
              if (s) switchUser(s.id);
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Complete Catalogue ({publishedEvents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {featuredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl p-6">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No events matched your search.</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All Events".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => {
              const pct = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
              const eventDate = new Date(event.startDate);
              return (
                <div
                  key={event.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={event.bannerImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl px-2.5 py-1 text-center shadow-xs">
                      <span className="text-[10px] font-bold text-blue-700 block uppercase leading-tight">
                        {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-sm font-black text-slate-900 block leading-tight">
                        {eventDate.getDate()}
                      </span>
                    </div>

                    <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                      {event.category}
                    </span>

                    <span className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-emerald-700 font-mono shadow-xs">
                      {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Capacity Meter */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Capacity Enrolled</span>
                        <span className="font-semibold text-slate-700">{event.registeredCount} / {event.capacity} ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} onwards</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{event.venueName}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/dashboard"
                        onClick={() => {
                          setRole('student');
                          const s = users.find((u) => u.role === 'student');
                          if (s) switchUser(s.id);
                        }}
                        className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View Details & Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Campus Venues & Facilities (Photo Cards Gallery) */}
      <section id="venues" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Campus Infrastructure
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Iconic Ruia College Facilities
          </h2>
          <p className="text-xs text-slate-500">
            State-of-the-art heritage and modern venues equipped for academic, technical, and cultural activities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Venue 1: Auditorium */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-36 relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80"
                alt="Ruia College Auditorium"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                Main Building
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Ruia College Auditorium</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Air-conditioned auditorium with acoustic treatment, proscenium stage, and professional lighting.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100 flex items-center justify-between">
                <span>Capacity: 650 Seats</span>
                <span className="text-emerald-700">Central A/C</span>
              </div>
            </div>
          </div>

          {/* Venue 2: Quadrangle */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-36 relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80"
                alt="Historic Ruia Quadrangle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                Central Quad
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">The Ruia Quadrangle</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Iconic heritage open-air amphitheater hosting annual festivals, exhibitions, and college assemblies.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100 flex items-center justify-between">
                <span>Capacity: 1,200 Seats</span>
                <span className="text-blue-700">Open-Air</span>
              </div>
            </div>
          </div>

          {/* Venue 3: Seminar Hall */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-36 relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80"
                alt="Dr. S. Radhakrishnan Hall"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                1st Floor Wing
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Dr. S. Radhakrishnan Hall</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Tiered seminar hall equipped with high-resolution projection and dual wireless podium mics.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100 flex items-center justify-between">
                <span>Capacity: 180 Seats</span>
                <span className="text-indigo-700">Tiered Seating</span>
              </div>
            </div>
          </div>

          {/* Venue 4: CS & IT Lab */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-36 relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80"
                alt="CS & IT Lab Complex"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                Science Wing
              </span>
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">CS & IT Lab Complex</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Advanced computing labs with high-speed fiber internet and uninterrupted dual-UPS power backup.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100 flex items-center justify-between">
                <span>Capacity: 120 PCs</span>
                <span className="text-purple-700">Gigabit Fiber</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Portals Section */}
      <section id="portals" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Campus Role Portals
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Dedicated Workspaces for the Entire Ruia Community
          </h2>
          <p className="text-xs text-slate-500">
            Tailored interfaces designed for students, faculty coordinators, and college leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Student Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('student');
              const s = users.find((u) => u.role === 'student');
              if (s) switchUser(s.id);
            }}
            className="p-5 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Student Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Browse college event calendar, register with your roll number, download digital entry passes, and claim official e-certificates.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>Open Student Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Organizer Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('organizer');
              const o = users.find((u) => u.role === 'organizer');
              if (o) switchUser(o.id);
            }}
            className="p-5 rounded-2xl bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Organizer Operations
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Submit event proposals, manage schedules & venues, coordinate student volunteers, scan entry tickets, and export attendance registers.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <span>Open Operations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Admin Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('admin');
              const a = users.find((u) => u.role === 'admin');
              if (a) switchUser(a.id);
            }}
            className="p-5 rounded-2xl bg-white hover:bg-amber-50/40 border border-slate-200 hover:border-amber-300 text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Principal & Admin
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Approve or reject event proposals, configure campus venues, manage staff roles, and oversee college-wide compliance audit logs.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-amber-700">
              <span>Open Administration</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Participant / Hackathon Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('student');
              const s = users.find((u) => u.role === 'student');
              if (s) switchUser(s.id);
            }}
            className="p-5 rounded-2xl bg-white hover:bg-purple-50/40 border border-slate-200 hover:border-purple-300 text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Hackathons & Teams
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Form multi-disciplinary teams, search for teammates, submit GitHub code repositories, and track real-time tournament leaderboards.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-purple-700">
              <span>Enter Competition Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* About Ruia & Governance */}
      <section id="about" className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
              Shikshana Prasaraka Mandali, Pune
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Ramnarain Ruia Autonomous College
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Established in June 1937, Ramnarain Ruia Autonomous College stands as a premier institution in Mumbai, renowned for academic rigor, vibrant cultural traditions, and pioneering scientific research. Recognized by UGC as a 'College of Excellence'.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://www.ruiacollege.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-2"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <Link
              href="/dashboard"
              onClick={() => {
                setRole('student');
                const s = users.find((u) => u.role === 'student');
                if (s) switchUser(s.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Enter Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-xs text-slate-500">
          <div className="space-y-2 max-w-sm">
            <span className="font-bold text-slate-900 text-sm block">
              Ramnarain Ruia Autonomous College
            </span>
            <p className="text-[11px] leading-relaxed">
              L. N. Road, Matunga (East), Mumbai - 400 019, Maharashtra, India.
            </p>
            <p className="text-[11px]">
              Telephone: +91 (022) 2414 3098 / 2414 3119 • principal@ruiacollege.edu
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">Quick Portals</span>
              <ul className="space-y-1.5 text-slate-500">
                <li><Link href="/dashboard" className="hover:text-blue-600">Student Events</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Faculty Submissions</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Hackathon Hub</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">Accreditation</span>
              <ul className="space-y-1.5 text-slate-500">
                <li>NAAC Grade: 'A+' (CGPA 3.70)</li>
                <li>Autonomous Status: University of Mumbai</li>
                <li>UGC College of Excellence</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 Ramnarain Ruia Autonomous College. All rights reserved.</p>
          <p>Smart Event Management System</p>
        </div>
      </footer>

      {/* Student Registration Modal */}
      {showRegistrationModal && (
        <StudentRegistrationModal onClose={() => setShowRegistrationModal(false)} />
      )}
    </div>
  );
}
