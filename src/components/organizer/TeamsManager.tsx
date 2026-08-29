'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Users,
  Search,
  Trophy,
  Crown,
  Send,
  Layers,
  Sparkles,
} from 'lucide-react';

export const TeamsManager: React.FC = () => {
  const { teams, submissions, participants } = useEvent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');

  const filtered = teams.filter((team) => {
    if (selectedTrack !== 'all' && team.track !== selectedTrack) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        team.name.toLowerCase().includes(q) ||
        team.tagline.toLowerCase().includes(q) ||
        team.members.some((m) => m.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Hackathon Teams Management ({teams.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor team formations, member rosters, track distributions, and submission links.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 font-mono">
          Avg Team Size: 2.8 Members
        </span>
      </div>

      {/* Grid of Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((team) => {
          const sub = submissions.find((s) => s.id === team.submissionId);

          return (
            <div
              key={team.id}
              className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {team.track}
                  </span>
                  {team.rank && (
                    <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> #{team.rank}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-white">{team.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{team.tagline}</p>

                {/* Members List */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Roster ({team.members.length}/{team.maxMembers})
                  </span>
                  <div className="space-y-1.5">
                    {team.members.map((m) => (
                      <div
                        key={m.participantId}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-200 truncate">{m.name}</span>
                          {m.isLeader && (
                            <span title="Leader"><Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" /></span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Linked Submission Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Project Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    sub?.status === 'evaluated'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : sub?.status === 'submitted'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {sub ? sub.status.replace('_', ' ') : 'No Submission'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
