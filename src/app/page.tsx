'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  QrCode,
  Users,
  Award,
  ShieldCheck,
  Send,
  Radio,
  BarChart3,
  Trophy,
  CheckCircle2,
  Cpu,
  Layers,
  MapPin,
  Calendar,
  Zap,
} from 'lucide-react';
import { useEvent } from '@/context/EventContext';

export default function LandingPage() {
  const { eventInfo, stats, setRole } = useEvent();
  const [previewRole, setPreviewRole] = useState<'participant' | 'judge' | 'organizer'>('participant');

  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                EventFlow
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#workflows" className="hover:text-slate-200 transition-colors">Role Workflows</a>
            <a href="#preview" className="hover:text-slate-200 transition-colors">Interactive Preview</a>
            <a href="#event" className="hover:text-slate-200 transition-colors">TechNova 2026</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <span>Enter Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">{eventInfo.name}</span>
            <span className="text-slate-500">•</span>
            <span>{eventInfo.location}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            The Unified Operating System for{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              Large-Scale Hackathons
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate fragmented tools. EventFlow seamlessly unifies participant registration, instant QR check-ins, intelligent team matchmaking, project submissions, structured rubric judging, and real-time live leaderboards in one cohesive platform.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/dashboard"
              onClick={() => setRole('participant')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Launch Participant Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setRole('judge')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Launch Judge Portal</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setRole('organizer')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 font-semibold text-xs transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Organizer Command HQ</span>
            </Link>
          </div>
        </div>

        {/* Live Event Stats Ticker */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl font-bold font-mono text-white">{stats.totalRegistered}+</span>
            <span className="text-xs text-slate-400 block mt-0.5">Active Hackers</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl font-bold font-mono text-emerald-400">{stats.checkInPercentage}%</span>
            <span className="text-xs text-slate-400 block mt-0.5">QR Verified Rate</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl font-bold font-mono text-purple-400">{stats.teamsCount}</span>
            <span className="text-xs text-slate-400 block mt-0.5">Formed Teams</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl font-bold font-mono text-amber-400">{eventInfo.prizePool}</span>
            <span className="text-xs text-slate-400 block mt-0.5">Total Prize Bounty</span>
          </div>
        </div>
      </section>

      {/* Interactive Product Preview Section */}
      <section id="preview" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
            LIVE INTERACTIVE PREVIEW
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Three Experiences. One Connected Engine.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Switch between roles below to preview how actions propagate across the platform in real time.
          </p>

          {/* Interactive Role Switcher Tabs */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-2xl mt-4">
            <button
              onClick={() => setPreviewRole('participant')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                previewRole === 'participant'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Participant Experience
            </button>
            <button
              onClick={() => setPreviewRole('judge')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                previewRole === 'judge'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Judge Experience
            </button>
            <button
              onClick={() => setPreviewRole('organizer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                previewRole === 'organizer'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Organizer Experience
            </button>
          </div>
        </div>

        {/* Dynamic Preview Mockup Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
          {previewRole === 'participant' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    P
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Aarav Sharma's Dashboard</h3>
                    <p className="text-xs text-indigo-300">AI / ML Engineer • NeuralCrafters</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ✓ Verified & Checked In
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Digital Pass</span>
                    <QrCode className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="font-mono text-sm text-white font-bold">TN26-P001-AARAV</div>
                  <p className="text-[11px] text-emerald-400">Scannable QR badge active</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Team Matchmaking</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-sm font-bold text-white">94% Compatibility</div>
                  <p className="text-[11px] text-slate-400">Targeting UI/UX & Backend</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Project Submissions</span>
                    <Send className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-sm font-bold text-white">SurgiVision AI</div>
                  <p className="text-[11px] text-emerald-400">Scored: 92.5 pts (Rank #1)</p>
                </div>
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setRole('participant')}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
                >
                  <span>Open Full Participant Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {previewRole === 'judge' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    J
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Dr. Priya Sundaram's Jury Suite</h3>
                    <p className="text-xs text-amber-300">Senior Principal AI Researcher • Google DeepMind</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  AI & Intelligent Systems Track
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-white">Structured Rubric (100 pts)</h4>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                    <div>• Innovation (/20)</div>
                    <div>• Tech Depth (/25)</div>
                    <div>• Problem Fit (/20)</div>
                    <div>• User Experience (/15)</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-white">Instant Leaderboard Synchronization</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Submitting an evaluation immediately recalculates the team's aggregate score and shifts ranks live without reloading.
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setRole('judge')}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30"
                >
                  <span>Open Full Judge Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {previewRole === 'organizer' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    HQ
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">TechNova 2026 Central Command HQ</h3>
                    <p className="text-xs text-emerald-300">Chief Event Coordinator & Operations Suite</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Operations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="text-xl font-bold font-mono text-emerald-400">{stats.checkedInCount} / {stats.totalRegistered}</span>
                  <span className="text-[11px] text-slate-400 block mt-1">QR Gate Check-ins</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="text-xl font-bold font-mono text-rose-400">{stats.submissionsCount} Projects</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Submissions Received</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="text-xl font-bold font-mono text-amber-400">{stats.judgingProgressPercentage}%</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Judging Completion</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setRole('organizer')}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  <span>Open Full Organizer Command Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Role Workflows Timeline Section */}
      <section id="workflows" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">
            THE EVENT LIFECYCLE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Register → Check In → Form Teams → Submit → Judge → Rank
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything flows through one single synchronized engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Workflow 1 */}
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-white">Participant Lifecycle</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate cryptographic QR passes, discover compatible teammates via skill-matching heuristics, submit GitHub repos, and track live standings.
            </p>
          </div>

          {/* Workflow 2 */}
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-white">Judge Scoring Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Review assigned project tracks, inspect code and live demos, and score across 5 normalized criteria with real-time aggregate recalculation.
            </p>
          </div>

          {/* Workflow 3 */}
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-white">Organizer Command</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulate gate QR check-ins, broadcast emergency priority announcements, observe score calibration, and finalize winners with confetti.
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="event" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              OFFICIAL DEMO EVENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{eventInfo.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {eventInfo.type} hosted at {eventInfo.venue}, featuring 4 tracks: AI & Intelligent Systems, Web3 & Fintech, Healthcare & Biotech, and Sustainable Tech.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                {eventInfo.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {eventInfo.location}
              </span>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <span>Enter Live EventFlow App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        <p>EventFlow • Smart Event Management Platform for TechNova 2026.</p>
      </footer>
    </div>
  );
}
