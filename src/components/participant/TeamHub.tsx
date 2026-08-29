'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Users,
  Plus,
  Crown,
  UserPlus,
  Send,
  Layers,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface TeamHubProps {
  setActiveTab: (tab: string) => void;
}

export const TeamHub: React.FC<TeamHubProps> = ({ setActiveTab }) => {
  const {
    currentParticipant,
    teams,
    participants,
    submissions,
    createOrUpdateTeam,
    acceptConnectionRequest,
    addToast,
  } = useEvent();

  const [isCreating, setIsCreating] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamTagline, setTeamTagline] = useState('');
  const [teamTrack, setTeamTrack] = useState('AI & Intelligent Systems');
  const [lookingRole, setLookingRole] = useState('Frontend Developer');

  if (!currentParticipant) return null;

  const userTeam = teams.find((t) => t.id === currentParticipant.teamId);
  const userSubmission = submissions.find((s) => s.teamId === userTeam?.id);

  // Incoming requests
  const incomingRequests = participants.filter((p) =>
    currentParticipant.connectionRequestsReceived.includes(p.id)
  );

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      addToast('Team Name Required', 'Please provide a valid team name.', 'error');
      return;
    }

    createOrUpdateTeam({
      name: teamName.trim(),
      tagline: teamTagline.trim() || 'Innovating for TechNova 2026',
      track: teamTrack,
      lookingForRoles: [lookingRole],
    });

    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* If in a team, show full team hub */}
      {userTeam ? (
        <>
          {/* Team Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {userTeam.track}
                  </span>
                  {userTeam.rank && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      Rank #{userTeam.rank}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{userTeam.name}</h1>
                <p className="text-sm text-slate-300 mt-1">{userTeam.tagline}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Leaderboard Score</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {userTeam.aggregateScore ? `${userTeam.aggregateScore} pts` : 'Pending review'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('submission')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{userSubmission ? 'Manage Submission' : 'Submit Project'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Members Roster */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Team Roster ({userTeam.members.length}/{userTeam.maxMembers} Members)
              </h2>
              <button
                onClick={() => setActiveTab('matchmaker')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Invite More Teammates</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTeam.members.map((member) => (
                <div
                  key={member.participantId}
                  className="glass-panel p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-sm text-white truncate">{member.name}</h4>
                      {member.isLeader && (
                        <span title="Team Leader"><Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" /></span>
                      )}
                    </div>
                    <p className="text-xs text-indigo-300 truncate">{member.role}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {member.isLeader ? 'Leader & Founder' : 'Active Contributor'}
                    </p>
                  </div>
                </div>
              ))}

              {/* Open Slots */}
              {Array.from({ length: userTeam.maxMembers - userTeam.members.length }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab('matchmaker')}
                  className="cursor-pointer border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center group transition-all"
                >
                  <UserPlus className="w-6 h-6 text-slate-600 group-hover:text-indigo-400 mb-1 transition-colors" />
                  <p className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                    Open Teammate Slot
                  </p>
                  <p className="text-[10px] text-slate-500">Click to discover matching candidates</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Submission Card Preview */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Linked Hackathon Project
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {userSubmission ? userSubmission.title : 'No Project Submitted Yet'}
                </h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  userSubmission?.status === 'evaluated'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : userSubmission?.status === 'submitted'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {userSubmission ? userSubmission.status.replace('_', ' ') : 'Draft / Not Submitted'}
              </span>
            </div>

            {userSubmission ? (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-300 leading-relaxed">{userSubmission.problemStatement}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {userSubmission.techStack.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                You can start drafting your problem statement, solution description, and architecture notes anytime.
              </p>
            )}
          </div>
        </>
      ) : (
        /* If no team yet, show Create / Join Callout */
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-3xl text-center max-w-xl mx-auto space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">You are not in a team yet</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                Form a new team as leader, or discover participants looking for teammates to collaborate on TechNova 2026.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsCreating(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Team</span>
              </button>
              <button
                onClick={() => setActiveTab('matchmaker')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Find Teammates</span>
              </button>
            </div>
          </div>

          {/* Create Team Modal */}
          {isCreating && (
            <div className="glass-panel p-6 rounded-3xl max-w-xl mx-auto space-y-4 border-indigo-500/40 animate-in fade-in-50">
              <h3 className="font-bold text-base text-white">Create Your Hackathon Team</h3>
              <form onSubmit={handleCreateTeamSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ApexInnovators"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Project Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. AI-driven logistics router"
                    value={teamTagline}
                    onChange={(e) => setTeamTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Hackathon Track</label>
                    <select
                      value={teamTrack}
                      onChange={(e) => setTeamTrack(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="AI & Intelligent Systems">AI & Intelligent Systems</option>
                      <option value="Web3 & Fintech">Web3 & Fintech</option>
                      <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                      <option value="Sustainable Tech">Sustainable Tech</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Looking for Role</label>
                    <select
                      value={lookingRole}
                      onChange={(e) => setLookingRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Architect">Backend Architect</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="AI / ML Engineer">AI / ML Engineer</option>
                      <option value="Smart Contract Dev">Smart Contract Dev</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                  >
                    Register Team
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Incoming Connection Invites Section */}
      {incomingRequests.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-purple-400" />
            Pending Teammate Invitations ({incomingRequests.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {incomingRequests.map((sender) => (
              <div
                key={sender.id}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">{sender.name}</h4>
                    <p className="text-[11px] text-indigo-300 truncate">{sender.role}</p>
                    <p className="text-[10px] text-slate-400">{sender.primaryTrack}</p>
                  </div>
                </div>

                <button
                  onClick={() => acceptConnectionRequest(sender.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
