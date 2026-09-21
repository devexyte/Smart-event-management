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
} from 'lucide-react';
import { useEvent } from '@/context/EventContext';
import { StudentRegistrationModal } from '@/components/common/StudentRegistrationModal';

export default function LandingPage() {
  const { events, setRole, switchUser, users, stats, announcements } = useEvent();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<'pass' | 'broadcast' | 'scanner'>('pass');

  const publishedEvents = events.filter((e) => e.status === 'published');
  const featuredEvents = publishedEvents.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Institutional Top Navbar */}
      <nav className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-xs">
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
            <a href="#portals" className="hover:text-blue-600 transition-colors">Campus Portals</a>
            <a href="#venues" className="hover:text-blue-600 transition-colors">Venues & Facilities</a>
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
              <span>Access Student Portal</span>
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
          Optical Camera Gate Pass verification active at Auditorium Gate.
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-100/60 blur-[100px] -z-10 pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Copy & Calls to Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-900">Ramnarain Ruia Autonomous College</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-medium">Estd. 1937 • NAAC 'A+' Grade</span>
            </div>

            {/* Prominent Smart Event Management Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Smart Event Management
              </h1>
              <p className="text-lg sm:text-xl font-bold text-blue-700 mt-2 tracking-tight">
                Official Campus Events, Festivals & Academic Symposiums Portal
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to Ramnarain Ruia Autonomous College’s unified digital ecosystem. Browse department symposiums, register for inter-collegiate hackathons, obtain instant QR entrance passes, and receive live organizer broadcasts.
            </p>

            {/* Primary Calls to Action */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
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

            {/* Key Value Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant QR Entry Pass</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live Camera Verification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified E-Certificates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Showcase Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-lg relative">
              {/* Tab Selector Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-2xl mb-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveHeroTab('pass')}
                  className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeHeroTab === 'pass'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Student Pass</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('broadcast')}
                  className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeHeroTab === 'broadcast'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Live Alerts</span>
                </button>
                <button
                  onClick={() => setActiveHeroTab('scanner')}
                  className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeHeroTab === 'scanner'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Gate Scanner</span>
                </button>
              </div>

              {/* Tab 1: Student Digital QR Pass Showcase */}
              {activeHeroTab === 'pass' && (
                <div className="space-y-4">
                  <div className="border border-blue-200 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-blue-800 uppercase block">
                          Ramnarain Ruia Autonomous College
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                          TechNova 2026: National Hackathon
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Confirmed Entry ✓
                      </span>
                    </div>

                    <div className="py-4 flex items-center justify-between gap-4">
                      <div className="space-y-1 text-xs">
                        <span className="text-slate-400 block text-[11px]">Attendee</span>
                        <span className="font-bold text-slate-900 block text-sm">Aarav Sharma</span>
                        <span className="font-mono text-slate-600 block text-xs">RUIA-2026-CS105</span>
                        <div className="pt-2 text-[11px] text-slate-500">
                          <span className="block font-medium text-slate-700">Ruia College Auditorium</span>
                          <span>Oct 15, 2026 • 09:00 AM</span>
                        </div>
                      </div>

                      {/* Real QR Code Visual */}
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center shrink-0">
                        <div className="w-24 h-24 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center">
                          {/* SVG QR Code Simulation */}
                          <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 mt-1">PASS-RUIA-9482</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Seat: Tier A • Row 4</span>
                      <span className="font-medium text-blue-600">Scan at Gate Desk</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Every student receives an instant digital entry pass with optical scanner compatibility.
                  </p>
                </div>
              )}

              {/* Tab 2: Live Organizer Alerts */}
              {activeHeroTab === 'broadcast' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-amber-600" />
                        Keynote Venue Confirmation
                      </span>
                      <span className="text-[10px] text-amber-700">10m ago</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      TechNova 2026 opening ceremony will take place in the Ruia College Auditorium. Please be seated by 09:15 AM.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        Team Matchmaking Desk Open
                      </span>
                      <span className="text-[10px] text-blue-700">1h ago</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Solo registrants can find teammates at CS & IT Lab 4 or directly in the online Hackathon Hub.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        Aarohan Cultural Fest Auditions
                      </span>
                      <span className="text-[10px] text-slate-500">Yesterday</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Drama and Indian folk dance auditions continue in the Historic Ruia Quadrangle.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Gate Scanner Simulator */}
              {activeHeroTab === 'scanner' && (
                <div className="space-y-3 text-center">
                  <div className="relative bg-slate-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col items-center justify-center min-h-[190px]">
                    {/* Viewfinder reticle */}
                    <div className="w-32 h-32 border-2 border-dashed border-emerald-400 rounded-xl relative flex items-center justify-center animate-pulse">
                      <QrCode className="w-16 h-16 text-emerald-400/80" />
                      <div className="absolute inset-x-0 h-0.5 bg-emerald-400 top-1/2 -translate-y-1/2 shadow-[0_0_8px_#34d399]" />
                    </div>
                    <span className="text-[11px] text-emerald-300 font-mono mt-3">
                      OPTICAL WEBCAM SCANNER ACTIVE (30 FPS)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">
                        Scan Verified: Aarav Sharma
                      </span>
                      <span className="text-[11px] text-emerald-700">
                        RUIA-2026-CS105 • Entry Permitted (Gate A)
                      </span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              )}

              {/* Quick Jump to Dashboard */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Experience it in real time</span>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    setRole('student');
                    const s = users.find((u) => u.role === 'student');
                    if (s) switchUser(s.id);
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Launch Live Platform</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Statistics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">Browse & Register</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover symposiums, competitive hackathons, or workshops and secure your seat with your Ruia Roll Number in 1-click.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">Instant QR Pass</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A digital pass is automatically generated with a secure scannable code, seating tier, and venue directions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group hover:bg-blue-50/40 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">Optical Camera Check-In</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Organizers scan tickets using mobile or webcam optical camera check-in at auditorium and quadrangle entrances.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group hover:bg-blue-50/40 hover:border-blue-300 transition-all">
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
            <span>View Complete Catalogue ({events.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => {
            const pct = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
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
                  <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
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
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{new Date(event.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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

      {/* Campus Venues & Facilities Section */}
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
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 hover:border-blue-300 transition-colors">
            <span className="text-[11px] font-bold text-blue-600 block uppercase tracking-wider">Heritage Main Building</span>
            <h4 className="font-bold text-sm text-slate-900">Ruia College Auditorium</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Air-conditioned auditorium with acoustic treatment, proscenium stage, and professional lighting.
            </p>
            <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100">
              Capacity: 650 Attendees
            </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 hover:border-blue-300 transition-colors">
            <span className="text-[11px] font-bold text-blue-600 block uppercase tracking-wider">Academic Quad</span>
            <h4 className="font-bold text-sm text-slate-900">The Ruia Quadrangle</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Iconic heritage open-air amphitheater hosting annual festivals, exhibitions, and college assemblies.
            </p>
            <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100">
              Capacity: 1,200 Attendees
            </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 hover:border-blue-300 transition-colors">
            <span className="text-[11px] font-bold text-blue-600 block uppercase tracking-wider">Main Academic Wing</span>
            <h4 className="font-bold text-sm text-slate-900">Dr. S. Radhakrishnan Hall</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tiered seminar hall equipped with high-resolution projection and dual wireless podium mics.
            </p>
            <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100">
              Capacity: 180 Attendees
            </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 hover:border-blue-300 transition-colors">
            <span className="text-[11px] font-bold text-blue-600 block uppercase tracking-wider">Science & IT Wing</span>
            <h4 className="font-bold text-sm text-slate-900">CS & IT Lab Complex</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Advanced computing labs with high-speed fiber internet and uninterrupted dual-UPS power backup.
            </p>
            <div className="pt-2 text-[11px] text-slate-700 font-semibold border-t border-slate-100">
              Capacity: 120 Workstations
            </div>
          </div>
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
