'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Calendar,
  Ticket,
  QrCode,
  Award,
  Users,
  Building2,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useEvent } from '@/context/EventContext';

export default function LandingPage() {
  const { events, setRole, switchUser, users, stats } = useEvent();

  const featuredEvents = events.filter((e) => e.status === 'published').slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Institutional Top Navbar */}
      <nav className="border-b border-slate-800 bg-[#0d1527]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm">
              RC
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight">
                CampusFlow
              </span>
              <span className="text-[11px] text-slate-400 block hidden sm:block">
                Ramnarain Ruia Autonomous College • Matunga, Mumbai
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#events" className="hover:text-white transition-colors">Featured Events</a>
            <a href="#roles" className="hover:text-white transition-colors">Role Portals</a>
            <a href="#governance" className="hover:text-white transition-colors">Campus Governance</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              onClick={() => {
                setRole('student');
                const s = users.find((u) => u.role === 'student');
                if (s) switchUser(s.id);
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Launch Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="font-semibold text-white">Ramnarain Ruia Autonomous College</span>
          <span className="text-slate-600">•</span>
          <span>Matunga, Mumbai</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
          Discover, Register, and Coordinate <br className="hidden sm:inline" />
          Ruia College Events Seamlessly
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From the Aarohan cultural festival and inter-collegiate technical symposiums to hands-on workshops and academic conferences. Designed for Ruia students, faculty convenors, and college administration.
        </p>

        {/* Role Entry Action Cards (FR1 & FR2) */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {/* Student Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('student');
              const s = users.find((u) => u.role === 'student');
              if (s) switchUser(s.id);
            }}
            className="p-4 rounded-xl bg-[#131d31] hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 text-left transition-all shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
              Student Experience
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Browse catalogue, get scannable QR gate passes, claim certificates.
            </p>
          </Link>

          {/* Organizer Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('organizer');
              const o = users.find((u) => u.role === 'organizer');
              if (o) switchUser(o.id);
            }}
            className="p-4 rounded-xl bg-[#131d31] hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
              Organizer Operations
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Create drafts, coordinate volunteers, scan attendees, export CSV reports.
            </p>
          </Link>

          {/* Admin Entrance */}
          <Link
            href="/dashboard"
            onClick={() => {
              setRole('admin');
              const a = users.find((u) => u.role === 'admin');
              if (a) switchUser(a.id);
            }}
            className="p-4 rounded-xl bg-[#131d31] hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 text-left transition-all shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
              Principal & Admin
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Review & approve proposals, manage campus venues, audit action logs.
            </p>
          </Link>
        </div>

        {/* Live Operational Metrics Ticker (FR26) */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3.5 bg-[#131d31] border border-slate-800 rounded-xl text-center">
            <span className="text-xl font-bold font-mono text-white">{stats.totalEvents}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Events Hosted</span>
          </div>
          <div className="p-3.5 bg-[#131d31] border border-slate-800 rounded-xl text-center">
            <span className="text-xl font-bold font-mono text-blue-400">{stats.totalRegistrations}+</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Enrolled Registrations</span>
          </div>
          <div className="p-3.5 bg-[#131d31] border border-slate-800 rounded-xl text-center">
            <span className="text-xl font-bold font-mono text-emerald-400">{stats.checkInPercentage}%</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">QR Verified Attendance</span>
          </div>
          <div className="p-3.5 bg-[#131d31] border border-slate-800 rounded-xl text-center">
            <span className="text-xl font-bold font-mono text-amber-400">NAAC A+</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Autonomous Accredited</span>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events (FR7) */}
      <section id="events" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
              Official Ruia College Calendar
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Featured Upcoming Events
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>View All in Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#131d31] border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131d31] via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-0.5 rounded bg-blue-600 text-white">
                  {event.category}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold px-2 py-0.5 rounded bg-black/80 text-emerald-400 font-mono">
                  {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{event.venueName}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View & Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Architecture Breakdown (FR1 - FR26) */}
      <section id="roles" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Structured Role Workflows
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Role-Based Access Control Built for Ruia College Operations
          </h2>
          <p className="text-xs text-slate-400">
            Every campus actor has a dedicated suite tailored to their operational responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Student Pillar */}
          <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-white">Student Hub</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              <li>• Multi-criteria search and category filters (FR7)</li>
              <li>• Capacity-aware online registrations (FR8)</li>
              <li>• Personal "My Registrations" status tracker (FR9)</li>
              <li>• Scannable gate entrance QR passes (FR15)</li>
              <li>• Verifiable digital completion certificates (FR17)</li>
              <li>• Post-event 5-star rating & review feedback (FR18)</li>
            </ul>
          </div>

          {/* Organizer Pillar */}
          <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-white">Organizer Suite</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              <li>• Event draft creation & agenda timeline builder (FR3, FR11)</li>
              <li>• Schedule & venue modifications with notifications (FR5)</li>
              <li>• Barcode/QR gate check-in station (FR16)</li>
              <li>• Volunteer role assignment & crew management (FR20)</li>
              <li>• Emergency live announcements & broadcasts (FR14)</li>
              <li>• Attendance & participant CSV report exports (FR23)</li>
            </ul>
          </div>

          {/* Admin Pillar */}
          <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-white">Principal & Administration</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
              <li>• Event review & approval / rejection queue (FR4)</li>
              <li>• Campus venue facilities & capacity registry (FR21)</li>
              <li>• Event category taxonomy management (FR21)</li>
              <li>• User account directory & role administration (FR25)</li>
              <li>• Tamper-evident administrative audit logs (NFR9)</li>
              <li>• Campus-wide engagement metrics & KPIs (FR26)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-400">Ramnarain Ruia Autonomous College</p>
        <p className="text-[11px] text-slate-500">
          L. N. Road, Matunga (East), Mumbai 400 019 • Phone: 022-69186201 • principal@ruiacollege.edu
        </p>
        <p className="text-[10px] text-slate-600">
          Affiliated to University of Mumbai • Autonomous Status • NAAC Accredited 'A+' Grade
        </p>
      </footer>
    </div>
  );
}
