'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  QrCode,
  Users,
  Send,
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { LiveActivityFeed } from '../common/LiveActivityFeed';

interface OverviewProps {
  setActiveTab: (tab: string) => void;
}

export const ParticipantOverview: React.FC<OverviewProps> = ({ setActiveTab }) => {
  const { currentParticipant, teams, submissions, announcements, eventInfo } = useEvent();

  if (!currentParticipant) return null;

  const userTeam = teams.find((t) => t.id === currentParticipant.teamId);
  const userSubmission = submissions.find((s) => s.teamId === userTeam?.id);
  const latestAnnouncement = announcements[0];

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 border border-blue-600 shadow-sm text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={currentParticipant.avatar}
              alt={currentParticipant.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Welcome back, {currentParticipant.name}! 👋
                </h1>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium border flex items-center gap-1.5 ${
                    currentParticipant.checkInStatus === 'checked_in'
                      ? 'bg-emerald-500/20 text-emerald-100 border-emerald-300/40'
                      : 'bg-amber-500/20 text-amber-100 border-amber-300/40'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentParticipant.checkInStatus === 'checked_in'
                        ? 'bg-emerald-300'
                        : 'bg-amber-300 animate-pulse'
                    }`}
                  />
                  {currentParticipant.checkInStatus === 'checked_in' ? 'Checked In' : 'Not Checked In'}
                </span>
              </div>
              <p className="text-sm text-blue-100 mt-1">
                {currentParticipant.role} • <span className="text-white font-medium">{currentParticipant.primaryTrack}</span>
              </p>
              <p className="text-xs text-blue-200 mt-0.5 font-mono">
                Reg Pass ID: <span className="text-white font-bold">{currentParticipant.qrToken}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('qr-pass')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
            >
              <QrCode className="w-4 h-4" />
              <span>Show My Pass</span>
            </button>
            <button
              onClick={() => setActiveTab('matchmaker')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-400/40 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <Users className="w-4 h-4" />
              <span>Find Teammates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical/Latest Announcement Notification Banner if any */}
      {latestAnnouncement && (
        <div
          onClick={() => setActiveTab('announcements')}
          className={`cursor-pointer flex items-center justify-between p-4 rounded-2xl border transition-all ${
            latestAnnouncement.priority === 'critical'
              ? 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-900'
              : 'bg-white border-slate-200 hover:border-blue-300 text-slate-900 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl shrink-0 ${
                latestAnnouncement.priority === 'critical' ? 'bg-rose-100 text-rose-600' : 'bg-blue-50 text-blue-600'
              }`}
            >
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">{latestAnnouncement.title}</span>
                {latestAnnouncement.priority === 'critical' && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">
                    Critical
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 truncate max-w-xl">{latestAnnouncement.message}</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      )}

      {/* Key Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Check-in Status */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Attendance Status</span>
              <QrCode className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {currentParticipant.checkInStatus === 'checked_in' ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700">Verified & Checked In</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-700">Not Checked In</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => setActiveTab('qr-pass')}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-4 flex items-center gap-1 self-start"
          >
            {currentParticipant.checkInStatus === 'checked_in' ? 'View QR Pass' : 'Open QR for Scanning'} &rarr;
          </button>
        </div>

        {/* Card 2: Team Status */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Team Membership</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 truncate">
              {userTeam ? userTeam.name : 'No Team Assigned'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {userTeam ? `${userTeam.members.length}/${userTeam.maxMembers} Members active` : 'Find or build a team'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab(userTeam ? 'my-team' : 'matchmaker')}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-4 flex items-center gap-1 self-start"
          >
            {userTeam ? 'Manage Team Roster' : 'Match with Teammates'} &rarr;
          </button>
        </div>

        {/* Card 3: Submission Status */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Project Submission</span>
              <Send className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 capitalize flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  userSubmission?.status === 'evaluated'
                    ? 'bg-emerald-500'
                    : userSubmission?.status === 'submitted'
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
                }`}
              />
              {userSubmission ? userSubmission.status.replace('_', ' ') : 'Not Submitted'}
            </div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              {userSubmission ? userSubmission.title : 'Submission window open'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('submission')}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-4 flex items-center gap-1 self-start"
          >
            {userSubmission ? 'View Submission' : 'Submit Project'} &rarr;
          </button>
        </div>

        {/* Card 4: Submission Countdown */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Deadline Countdown</span>
              <Clock className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900">
              19h : 22m : 40s
            </div>
            <p className="text-xs text-slate-500 mt-1">Hacking concludes 10:00 AM</p>
          </div>
          <div className="text-xs text-slate-500 mt-4">
            Day 1 • Ruia College Auditorium
          </div>
        </div>
      </div>

      {/* Main Content Split: Skills & Teammates preview + Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Profile & Skills Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Your Skills & Interests Profile</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              These skill tags power the smart matchmaking engine to recommend teammates looking for your exact strengths.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                  Technical Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentParticipant.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                  Domains & Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentParticipant.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                  Bio / Pitch
                </label>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  "{currentParticipant.bio}"
                </p>
              </div>
            </div>
          </div>

          {/* Current Team Snapshot */}
          {userTeam && (
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Your Team</span>
                  <h3 className="text-lg font-bold text-slate-900">{userTeam.name}</h3>
                  <p className="text-xs text-slate-500">{userTeam.tagline}</p>
                </div>
                {userTeam.aggregateScore && (
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Current Score</span>
                    <span className="text-xl font-bold font-mono text-emerald-600">
                      {userTeam.aggregateScore} pts
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {userTeam.members.map((member) => (
                  <div
                    key={member.participantId}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-slate-900 truncate">{member.name}</p>
                        {member.isLeader && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700">
                            Lead
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Activity Stream */}
        <div>
          <LiveActivityFeed maxItems={6} />
        </div>
      </div>
    </div>
  );
};
