'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Layers,
  Sparkles,
} from 'lucide-react';

export const JudgingProgressMatrix: React.FC = () => {
  const { teams, judges, submissions, evaluations, stats } = useEvent();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-amber-400" />
            Judging Progress & Evaluation Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Global evaluation status showing score assignments across all jury members.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Total Evaluations: </span>
            <strong className="text-amber-400 font-mono">{evaluations.length} completed</strong>
          </div>
        </div>
      </div>

      {/* Progress Bar Banner */}
      <div className="glass-panel p-6 rounded-3xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Overall Event Judging Completion</span>
          <span className="font-mono font-bold text-amber-400 text-sm">
            {stats.judgingProgressPercentage}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, stats.judgingProgressPercentage)}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400">
          {submissions.length} submitted projects being evaluated by {judges.length} domain judges.
        </p>
      </div>

      {/* Matrix Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4 w-48">Project / Team</th>
                <th className="py-4 px-3">Track</th>
                {judges.map((j) => (
                  <th key={j.id} className="py-4 px-3 text-center min-w-[130px]">
                    <div className="truncate font-bold text-slate-300">{j.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{j.track.split(' ')[0]}</div>
                  </th>
                ))}
                <th className="py-4 px-4 text-right">Avg Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {submissions.map((sub) => {
                const team = teams.find((t) => t.id === sub.teamId);
                const subEvals = evaluations.filter((e) => e.submissionId === sub.id);

                return (
                  <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Project & Team */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-white truncate max-w-[180px]">{sub.title}</div>
                      <div className="text-[11px] text-slate-400">{team?.name}</div>
                    </td>

                    {/* Track */}
                    <td className="py-4 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[10px]">
                        {sub.track.split(' ')[0]}
                      </span>
                    </td>

                    {/* Judges Scoring Matrix */}
                    {judges.map((judge) => {
                      const evalRecord = subEvals.find((e) => e.judgeId === judge.id);
                      const isAssigned = judge.assignedSubmissionIds.includes(sub.id);

                      if (evalRecord) {
                        return (
                          <td key={judge.id} className="py-4 px-3 text-center">
                            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-xs inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {evalRecord.totalScore}
                            </span>
                          </td>
                        );
                      }

                      if (isAssigned) {
                        return (
                          <td key={judge.id} className="py-4 px-3 text-center">
                            <span className="px-2 py-1 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400" />
                              Pending
                            </span>
                          </td>
                        );
                      }

                      return (
                        <td key={judge.id} className="py-4 px-3 text-center text-slate-600 font-mono text-xs">
                          —
                        </td>
                      );
                    })}

                    {/* Aggregate Score */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-sm text-emerald-400">
                      {team?.aggregateScore ? `${team.aggregateScore} pts` : '—'}
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
