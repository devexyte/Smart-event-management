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
      <div className="p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-md border border-blue-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-blue-100 bg-white/15 px-2.5 py-0.5 rounded-full backdrop-blur-xs font-medium">
                {eventInfo.currentDay}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {eventInfo.name} Operations Hub
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              {eventInfo.venue} • {eventInfo.dates} • Total Prize: <strong className="text-white font-semibold">{eventInfo.prizePool}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('check-in')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold shadow-sm transition-all flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-blue-700" />
              <span>Launch QR Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className="px-4 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/30 text-xs font-semibold transition-all flex items-center gap-2 shadow-xs"
            >
              <Radio className="w-4 h-4 text-rose-300" />
              <span>Broadcast Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8-Metric Command Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Registrations */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Registrations</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{stats.totalRegistered}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">100% capacity filled</p>
        </div>

        {/* Checked In */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Checked In</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            {stats.checkedInCount} <span className="text-xs font-normal text-slate-500">({stats.checkInPercentage}%)</span>
          </div>
          <p className="text-[11px] text-emerald-600/80 mt-0.5">Verified at gates</p>
        </div>

        {/* Teams Formed */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Teams Formed</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{stats.teamsCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Active rosters</p>
        </div>

        {/* Project Submissions */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Submissions</span>
            <Send className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600">{stats.submissionsCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">In judging pipeline</p>
        </div>

        {/* Active Judges */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Active Judges</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{stats.judgesCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Specialized jury</p>
        </div>

        {/* Judging Progress */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Judging Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600">{stats.judgingProgressPercentage}%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">{stats.totalEvaluations} reviews submitted</p>
        </div>

        {/* Average Score */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-600">{stats.averageScore}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all tracks</p>
        </div>

        {/* Broadcasts Sent */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-medium">
            <span>Broadcasts</span>
            <Radio className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600">{announcements.length}</div>
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
              className="bg-white border border-slate-200 hover:border-blue-300 p-5 rounded-2xl cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Attendee Check-In Station</h4>
                  <p className="text-xs text-slate-500">Simulate badge QR scanning</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div
              onClick={() => setActiveTab('broadcast')}
              className="bg-white border border-slate-200 hover:border-blue-300 p-5 rounded-2xl cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Broadcast Announcement</h4>
                  <p className="text-xs text-slate-500">Instant push to participants</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div
              onClick={() => setActiveTab('volunteers')}
              className="bg-white border border-slate-200 hover:border-blue-300 p-5 rounded-2xl cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Volunteer Management</h4>
                  <p className="text-xs text-slate-500">Assign shifts & gate duties</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div
              onClick={() => setActiveTab('events-hub')}
              className="bg-white border border-slate-200 hover:border-blue-300 p-5 rounded-2xl cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Event Hub & Propose</h4>
                  <p className="text-xs text-slate-500">Create & manage activities</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Quick Attendance Snapshot Bar */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Live Attendance Velocity</h3>
                <p className="text-xs text-slate-500">
                  {stats.checkedInCount} of {stats.totalRegistered} participants checked in ({stats.checkInPercentage}%)
                </p>
              </div>
              <span className="font-mono font-bold text-blue-600 text-lg">
                {stats.checkInPercentage}%
              </span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
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
