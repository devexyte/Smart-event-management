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
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Hackathon Teams Management ({teams.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor team formations, member rosters, track distributions, and submission links.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono">
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
              className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {team.track}
                  </span>
                  {team.rank && (
                    <span className="text-xs font-bold font-mono text-amber-600 flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> #{team.rank}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900">{team.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{team.tagline}</p>

                {/* Members List */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Roster ({team.members.length}/{team.maxMembers})
                  </span>
                  <div className="space-y-1.5">
                    {team.members.map((m) => (
                      <div
                        key={m.participantId}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-800 truncate">{m.name}</span>
                          {m.isLeader && (
                            <span title="Leader"><Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" /></span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 truncate max-w-[100px]">{m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Linked Submission Status */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Project Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    sub?.status === 'evaluated'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : sub?.status === 'submitted'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
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
