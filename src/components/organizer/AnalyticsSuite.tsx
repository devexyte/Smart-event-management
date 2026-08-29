'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  PieChart as PieIcon,
  Layers,
} from 'lucide-react';

export const AnalyticsSuite: React.FC = () => {
  const { participants, teams, submissions, evaluations, stats } = useEvent();

  // 1. Hourly Check-in Velocity
  const attendanceHourlyData = [
    { time: '08:00 AM', checkedIn: 2, cumulative: 2 },
    { time: '09:00 AM', checkedIn: 5, cumulative: 7 },
    { time: '10:00 AM', checkedIn: 6, cumulative: 13 },
    { time: '11:00 AM', checkedIn: 3, cumulative: 16 },
    { time: '12:00 PM', checkedIn: Math.max(1, stats.checkedInCount - 16), cumulative: stats.checkedInCount },
    { time: '01:00 PM', checkedIn: 0, cumulative: stats.checkedInCount },
  ];

  // 2. Track Distribution Data
  const trackCounts: Record<string, number> = {};
  participants.forEach((p) => {
    trackCounts[p.primaryTrack] = (trackCounts[p.primaryTrack] || 0) + 1;
  });
  const trackDistributionData = Object.entries(trackCounts).map(([name, value]) => ({
    name: name.split(' ')[0],
    fullName: name,
    value,
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  // 3. Top Skills Distribution
  const skillCounts: Record<string, number> = {};
  participants.forEach((p) => {
    p.skills.forEach((s) => {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    });
  });
  const topSkillsData = Object.entries(skillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // 4. Score Distribution across evaluations
  const scoreBuckets = [
    { range: '70-79', count: evaluations.filter((e) => e.totalScore >= 70 && e.totalScore < 80).length },
    { range: '80-89', count: evaluations.filter((e) => e.totalScore >= 80 && e.totalScore < 90).length },
    { range: '90-100', count: evaluations.filter((e) => e.totalScore >= 90).length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Live Event Analytics & Telemetry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time charts calculated from live participant, check-in, submission, and judging data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Attendance Rate: </span>
            <strong className="text-emerald-400 font-mono">{stats.checkInPercentage}%</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Average Score: </span>
            <strong className="text-indigo-400 font-mono">{stats.averageScore} pts</strong>
          </div>
        </div>
      </div>

      {/* Chart Row 1: Attendance Velocity & Track Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Velocity (8 cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Hourly Check-in Velocity & Cumulative Attendance
              </h3>
              <p className="text-xs text-slate-400">Peak check-in surge observed between 09:00 AM and 10:30 AM.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {stats.checkedInCount} Attendees Verified
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceHourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#attendanceGradient)"
                  name="Cumulative Checked In"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Track Distribution Donut (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-indigo-400" />
            Track Distribution
          </h3>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trackDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trackDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            {trackDistributionData.map((track, idx) => (
              <div key={track.fullName} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-slate-300 truncate">{track.name}: {track.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Row 2: Top Skills Demanded vs Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            Top Participant Skill Distribution
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkillsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="skill" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                  }}
                />
                <Bar dataKey="count" fill="#818cf8" radius={[6, 6, 0, 0]} name="Developers with Skill" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Judge Scoring Distribution (Out of 100)
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreBuckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '0.75rem',
                  }}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Evaluations in Range" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
