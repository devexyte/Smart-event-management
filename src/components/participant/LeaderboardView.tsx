'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Search,
  Filter,
  Layers,
  Award,
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { teams, submissions, evaluations } = useEvent();
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = [
    'all',
    'AI & Intelligent Systems',
    'Web3 & Fintech',
    'Healthcare & Biotech',
    'Sustainable Tech',
  ];

  // Filtered teams sorted by aggregate score descending
  const filteredTeams = teams
    .filter((t) => {
      if (selectedTrack !== 'all' && t.track !== selectedTrack) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => (b.aggregateScore || 0) - (a.aggregateScore || 0));

  const topThree = filteredTeams.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Real-Time Scoring Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Live Hackathon Leaderboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rankings recalculate instantly when judges submit rubric scores.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono self-start flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Live Aggregation
        </span>
      </div>

      {/* Top 3 Podium Visuals */}
      {topThree.length >= 3 && selectedTrack === 'all' && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-end">
          {/* #2 Silver (Left) */}
          <div className="bg-white border-2 border-slate-300 p-6 rounded-3xl order-2 md:order-1 text-center relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-600">
              <Medal className="w-6 h-6 text-slate-600" />
            </div>
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 inline-block mb-2">
              #2 SILVER
            </span>
            <h3 className="font-bold text-base text-slate-900 truncate">{topThree[1].name}</h3>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{topThree[1].tagline}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{topThree[1].totalEvaluations} reviews</span>
              <span className="text-xl font-bold font-mono text-slate-800">
                {topThree[1].aggregateScore} pts
              </span>
            </div>
          </div>

          {/* #1 Gold (Center - Taller) */}
          <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 p-7 rounded-3xl order-1 md:order-2 text-center relative overflow-hidden shadow-md scale-[1.03] ring-1 ring-amber-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-3 text-amber-600 shadow-sm">
              <Trophy className="w-8 h-8 text-amber-600" />
            </div>
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 inline-block mb-2">
              🏆 #1 GOLD LEADER
            </span>
            <h3 className="font-bold text-lg text-slate-900 truncate">{topThree[0].name}</h3>
            <p className="text-xs text-amber-800 truncate mt-0.5">{topThree[0].tagline}</p>
            <div className="mt-5 pt-3 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">{topThree[0].totalEvaluations} reviews</span>
              <span className="text-2xl font-black font-mono text-amber-600">
                {topThree[0].aggregateScore} pts
              </span>
            </div>
          </div>

          {/* #3 Bronze (Right) */}
          <div className="bg-white border-2 border-amber-200 p-6 rounded-3xl order-3 text-center relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-3 text-amber-700">
              <Medal className="w-6 h-6 text-amber-700" />
            </div>
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 inline-block mb-2">
              #3 BRONZE
            </span>
            <h3 className="font-bold text-base text-slate-900 truncate">{topThree[2].name}</h3>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{topThree[2].tagline}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{topThree[2].totalEvaluations} reviews</span>
              <span className="text-xl font-bold font-mono text-amber-700">
                {topThree[2].aggregateScore} pts
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrack(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTrack === t
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'all' ? 'All Tracks' : t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Ranking Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Team & Project</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4 text-center">Members</th>
                <th className="py-3.5 px-4 text-center">Evaluations</th>
                <th className="py-3.5 px-4 text-right">Aggregate Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeams.map((team, idx) => {
                const sub = submissions.find((s) => s.id === team.submissionId);
                const rankDelta = (team.previousRank || idx + 1) - (idx + 1);

                return (
                  <tr
                    key={team.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      idx === 0
                        ? 'bg-amber-50/40'
                        : idx === 1
                        ? 'bg-slate-50/40'
                        : idx === 2
                        ? 'bg-amber-50/20'
                        : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 font-bold font-mono">
                        <span
                          className={`text-sm ${
                            idx === 0
                              ? 'text-amber-600 font-extrabold'
                              : idx === 1
                              ? 'text-slate-600'
                              : idx === 2
                              ? 'text-amber-700'
                              : 'text-slate-400'
                          }`}
                        >
                          #{idx + 1}
                        </span>

                        {rankDelta > 0 && (
                          <span className="text-[10px] text-emerald-600 flex items-center" title="Moved up">
                            <TrendingUp className="w-3 h-3" />+{rankDelta}
                          </span>
                        )}
                        {rankDelta < 0 && (
                          <span className="text-[10px] text-rose-600 flex items-center" title="Moved down">
                            <TrendingDown className="w-3 h-3" />
                            {rankDelta}
                          </span>
                        )}
                        {rankDelta === 0 && (
                          <span className="text-[10px] text-slate-400" title="No change">
                            <Minus className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Team & Project */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-sm text-slate-900">{team.name}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-sm">
                        {sub ? sub.title : team.tagline}
                      </div>
                    </td>

                    {/* Track */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-medium text-[11px]">
                        {team.track}
                      </span>
                    </td>

                    {/* Members */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center -space-x-1.5">
                        {team.members.map((m) => (
                          <img
                            key={m.participantId}
                            src={m.avatar}
                            alt={m.name}
                            title={`${m.name} (${m.role})`}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                        ))}
                      </div>
                    </td>

                    {/* Evaluations */}
                    <td className="py-4 px-4 text-center font-mono text-slate-600">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px]">
                        {team.totalEvaluations} reviews
                      </span>
                    </td>

                    {/* Aggregate Score */}
                    <td className="py-4 px-4 text-right">
                      <span className="text-base font-bold font-mono text-blue-600">
                        {team.aggregateScore !== undefined && team.aggregateScore > 0
                          ? `${team.aggregateScore} pts`
                          : '—'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
