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
  GraduationCap,
} from 'lucide-react';
import { useEvent } from '@/context/EventContext';
import { StudentRegistrationModal } from '@/components/common/StudentRegistrationModal';

export default function LandingPage() {
  const { events, setRole, switchUser, users, stats } = useEvent();
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

      {/* Hero Section in Clean Collegiate Sky Blue with Subtle Campus Watermark */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf2ff] via-[#f3f7fd] to-[#f8fafc] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-blue-100">
        {/* Subtle, authentic campus architectural watermark (clean, natural, no AI blend modes) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1600&auto=format&fit=crop&q=80"
            alt="Ramnarain Ruia Autonomous College Campus"
            className="w-full h-full object-cover object-center opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f3f7fd]/40 to-[#f8fafc]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-xs text-blue-900 font-medium shadow-xs">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Ramnarain Ruia Autonomous College • NAAC 'A+' Grade • Matunga, Mumbai</span>
          </div>

          {/* Smart Event Management Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Smart College Event Management
            </h1>
            <p className="text-base sm:text-xl font-semibold text-blue-700">
              Official Campus Events, Festivals & Competitions Management
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The official centralized platform for Ramnarain Ruia Autonomous College, Matunga. Discover department fests, competitive hackathons, and guest lectures with instant digital QR passes, live organizer announcements, and verified credentials.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>New Student? Register Profile</span>
            </button>

            <a
              href="#events"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 transition-colors flex items-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Explore Campus Events</span>
            </a>

            <Link
              href="/dashboard"
              onClick={() => {
                setRole('student');
                const s = users.find((u) => u.role === 'student');
                if (s) switchUser(s.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold border border-blue-200 transition-colors flex items-center gap-2"
            >
              <Code className="w-4 h-4 text-blue-600" />
              <span>Hackathon Hub</span>
            </Link>
          </div>

          {/* Interactive Search & Live Discovery Box */}
          <div className="pt-3 max-w-2xl mx-auto text-left">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events by title, topic, or venue (e.g. TechNova, Quadrangle)..."
                    className="w-full pl-10 pr-14 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <a
                  href="#events"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Browse Results ({filteredEvents.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-slate-100 mt-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                  Filter:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Instant Live Event Preview (Active on search or category filter) */}
              {(searchQuery.trim() !== '' || activeCategory !== 'all') && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-700">
                      Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                      {activeCategory !== 'all' ? ` in ${categories.find(c => c.id === activeCategory)?.label}` : ''}
                      {searchQuery ? ` matching "${searchQuery}"` : ''}:
                    </span>
                    <a href="#events" className="text-blue-600 hover:text-blue-800 font-semibold text-xs flex items-center gap-1">
                      <span>View full calendar</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {filteredEvents.length === 0 ? (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">
                        No events matched your search.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('all');
                        }}
                        className="text-xs text-blue-600 font-semibold mt-1 hover:underline cursor-pointer"
                      >
                        Reset search & filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {filteredEvents.slice(0, 3).map((evt) => (
                        <a
                          key={evt.id}
                          href="#events"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 transition-colors group"
                        >
                          <div className="truncate mr-3">
                            <span className="font-semibold text-xs text-slate-900 block truncate group-hover:text-blue-600">
                              {evt.title}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate">
                              {evt.venueName} • {new Date(evt.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 shrink-0">
                            {evt.price === 0 ? 'Free Entry' : `₹${evt.price}`}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Institutional Statistics Cards */}
          <div className="pt-3 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono text-slate-900">{stats.totalEvents}</span>
              <span className="text-xs text-slate-500 block mt-0.5">Active Campus Events</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono text-blue-600">{stats.totalRegistrations}+</span>
              <span className="text-xs text-slate-500 block mt-0.5">Student Registrations</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono text-emerald-600">{stats.checkInPercentage}%</span>
              <span className="text-xs text-slate-500 block mt-0.5">Gate Verification Rate</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono text-slate-900">Estd. 1937</span>
              <span className="text-xs text-slate-500 block mt-0.5">85+ Years of Heritage</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-14 bg-white border-b border-slate-200">
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
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold cursor-pointer"
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
