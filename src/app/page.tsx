'use client';

import React from 'react';
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
} from 'lucide-react';
import { useEvent } from '@/context/EventContext';

export default function LandingPage() {
  const { events, setRole, switchUser, users, stats } = useEvent();

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
                Smart Campus Event & Symposium Portal • Matunga, Mumbai
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-medium">
            <a href="#events" className="hover:text-blue-600 transition-colors">Upcoming Events</a>
            <a href="#portals" className="hover:text-blue-600 transition-colors">Campus Portals</a>
            <a href="#venues" className="hover:text-blue-600 transition-colors">Venues & Facilities</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About Ruia</a>
          </div>

          <div className="flex items-center gap-2.5">
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
      <div className="bg-blue-50 border-b border-blue-100 py-2 px-4 text-center text-xs text-blue-900 font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
          Notice
        </span>
        <span>
          Registrations now live for Aarohan Cultural Festival & TechRuia National Hackathon 2026.
        </span>
      </div>

      {/* Hero Section */}
      <section className="pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-900">Affiliated to University of Mumbai</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-700 font-medium">NAAC 'A+' Grade (CGPA 3.70)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          Official Events, Festivals & <br className="hidden sm:inline" />
          Academic Symposiums Portal
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Welcome to Ramnarain Ruia Autonomous College's centralized event platform. Discover campus festivals, department seminars, technical hackathons, and guest lectures with instant pass generation and verified credentials.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#events"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Explore Campus Events</span>
          </a>

          <Link
            href="/dashboard"
            onClick={() => {
              setRole('student');
              const s = users.find((u) => u.role === 'student');
              if (s) switchUser(s.id);
            }}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-200 shadow-2xs transition-colors flex items-center gap-2"
          >
            <Code className="w-4 h-4 text-blue-600" />
            <span>Hackathon & Team Hub</span>
          </Link>
        </div>

        {/* Institutional Statistics Bar */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
            <span className="text-2xl font-bold font-mono text-slate-900">{stats.totalEvents}</span>
            <span className="text-xs text-slate-500 block mt-0.5">Active Campus Events</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
            <span className="text-2xl font-bold font-mono text-blue-600">{stats.totalRegistrations}+</span>
            <span className="text-xs text-slate-500 block mt-0.5">Student Registrations</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
            <span className="text-2xl font-bold font-mono text-emerald-600">{stats.checkInPercentage}%</span>
            <span className="text-xs text-slate-500 block mt-0.5">Gate Pass Verification Rate</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
            <span className="text-2xl font-bold font-mono text-slate-900">Estd. 1937</span>
            <span className="text-xs text-slate-500 block mt-0.5">85+ Years of Heritage</span>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events Section */}
      <section id="events" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
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
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                  {event.category}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold px-2 py-0.5 rounded bg-white text-emerald-700 font-mono shadow-xs">
                  {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
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
                    className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Details & Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Portals Section */}
      <section id="portals" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <section id="venues" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
            <span className="text-xs font-bold text-blue-600 block uppercase">Heritage Main Building</span>
            <h4 className="font-bold text-sm text-slate-900">Ruia College Auditorium</h4>
            <p className="text-xs text-slate-500">
              Air-conditioned auditorium with acoustic treatment, proscenium stage, and professional lighting.
            </p>
            <div className="pt-2 text-[11px] text-slate-600 font-medium">
              Capacity: 650 Attendees
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
            <span className="text-xs font-bold text-blue-600 block uppercase">Academic Quad</span>
            <h4 className="font-bold text-sm text-slate-900">The Ruia Quadrangle</h4>
            <p className="text-xs text-slate-500">
              Iconic heritage open-air amphitheater hosting annual festivals, exhibitions, and college assemblies.
            </p>
            <div className="pt-2 text-[11px] text-slate-600 font-medium">
              Capacity: 1,200 Attendees
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
            <span className="text-xs font-bold text-blue-600 block uppercase">Main Academic Wing</span>
            <h4 className="font-bold text-sm text-slate-900">Dr. S. Radhakrishnan Hall</h4>
            <p className="text-xs text-slate-500">
              Tiered seminar hall equipped with high-resolution projection and dual wireless podium mics.
            </p>
            <div className="pt-2 text-[11px] text-slate-600 font-medium">
              Capacity: 180 Attendees
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
            <span className="text-xs font-bold text-blue-600 block uppercase">Science & IT Wing</span>
            <h4 className="font-bold text-sm text-slate-900">CS & IT Lab Complex</h4>
            <p className="text-xs text-slate-500">
              Advanced computing labs with high-speed fiber internet and uninterrupted dual-UPS power backup.
            </p>
            <div className="pt-2 text-[11px] text-slate-600 font-medium">
              Capacity: 120 Workstations
            </div>
          </div>
        </div>
      </section>

      {/* About Ruia & Governance */}
      <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
              Shikshana Prasaraka Mandali, Pune
            </span>
            <h3 className="text-xl font-bold text-slate-900">
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
      <footer className="border-t border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8">
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
              <ul className="space-y-1 text-slate-500">
                <li><Link href="/dashboard" className="hover:text-blue-600">Student Events</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Faculty Submissions</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Hackathon Hub</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">Accreditation</span>
              <ul className="space-y-1 text-slate-500">
                <li>NAAC Grade: 'A+' (CGPA 3.70)</li>
                <li>Autonomous Status: University of Mumbai</li>
                <li>UGC College with Potential for Excellence</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 Ramnarain Ruia Autonomous College. All rights reserved.</p>
          <p>Smart Campus Event & Symposium Management System</p>
        </div>
      </footer>
    </div>
  );
}
