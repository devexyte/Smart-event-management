'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  ShieldCheck,
  Users,
  UserCheck,
  QrCode,
  Send,
  Award,
  Radio,
  BarChart3,
  Sparkles,
  TrendingUp,
  Activity,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { LiveActivityFeed } from '../common/LiveActivityFeed';

interface OrganizerOverviewProps {
  setActiveTab: (tab: string) => void;
}

export const OrganizerOverview: React.FC<OrganizerOverviewProps> = ({ setActiveTab }) => {
  const { eventInfo, stats, participants, teams, submissions, evaluations, announcements } = useEvent();

  return (
    <div className="space-y-6">
      {/* Event Command Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                COMMAND HQ ACTIVE
              </span>
              <span className="text-xs text-slate-400">{eventInfo.currentDay}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {eventInfo.name} Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {eventInfo.venue} • {eventInfo.dates} • Total Prize: <strong className="text-emerald-400">{eventInfo.prizePool}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('check-in')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Launch QR Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-rose-400" />
              <span>Broadcast Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8-Metric Command Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Registrations */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Registrations</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{stats.totalRegistered}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">100% capacity filled</p>
        </div>

        {/* Checked In */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Checked In</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {stats.checkedInCount} <span className="text-xs font-normal text-slate-400">({stats.checkInPercentage}%)</span>
          </div>
          <p className="text-[11px] text-emerald-400/80 mt-0.5">Verified at gates</p>
        </div>

        {/* Teams Formed */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Teams Formed</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{stats.teamsCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Active rosters</p>
        </div>

        {/* Project Submissions */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Submissions</span>
            <Send className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">{stats.submissionsCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">In judging pipeline</p>
        </div>

        {/* Active Judges */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active Judges</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{stats.judgesCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Specialized jury</p>
        </div>

        {/* Judging Progress */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Judging Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{stats.judgingProgressPercentage}%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">{stats.totalEvaluations} reviews submitted</p>
        </div>

        {/* Average Score */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-300">{stats.averageScore}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all tracks</p>
        </div>

        {/* Broadcasts Sent */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Broadcasts</span>
            <Radio className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300">{announcements.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Push announcements</p>
        </div>
      </div>

      {/* Main Split: Live Status & Fast Operations + Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Operations Hub */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Operation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setActiveTab('check-in')}
              className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Attendee Check-In Station</h4>
                  <p className="text-xs text-slate-400">Simulate badge QR scanning</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => setActiveTab('broadcast')}
              className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Broadcast Announcement</h4>
                  <p className="text-xs text-slate-400">Instant push to participants</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => setActiveTab('judging')}
              className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Judging Matrix & Oversight</h4>
                  <p className="text-xs text-slate-400">Monitor score variance</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => setActiveTab('analytics')}
              className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Deep Analytics Suite</h4>
                  <p className="text-xs text-slate-400">Real-time telemetry charts</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Quick Attendance Snapshot Bar */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Live Attendance Velocity</h3>
                <p className="text-xs text-slate-400">
                  {stats.checkedInCount} of {stats.totalRegistered} participants checked in ({stats.checkInPercentage}%)
                </p>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-lg">
                {stats.checkInPercentage}%
              </span>
            </div>

            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.checkInPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Col: Live Activity Feed */}
        <div>
          <LiveActivityFeed maxItems={8} />
        </div>
      </div>
    </div>
  );
};
