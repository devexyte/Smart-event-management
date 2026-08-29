'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Award,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Layers,
} from 'lucide-react';

export const JudgingOversight: React.FC = () => {
  const { teams, judges, submissions, evaluations, stats } = useEvent();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-amber-400" />
            Judging Oversight & Evaluation Audit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Audit rubric breakdowns, score distributions, and judge calibration across all tracks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Total Evaluations: </span>
            <strong className="text-amber-400 font-mono">{evaluations.length} Scored</strong>
          </div>
        </div>
      </div>

      {/* Evaluations Detailed Audit Cards */}
      <div className="space-y-4">
        {evaluations.map((ev) => {
          const sub = submissions.find((s) => s.id === ev.submissionId);
          const team = teams.find((t) => t.id === ev.teamId);

          return (
            <div
              key={ev.id}
              className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {sub?.track}
                    </span>
                    <h3 className="font-bold text-base text-white">{sub?.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Team: <strong className="text-slate-200">{team?.name}</strong> • Judge: <strong className="text-amber-300">{ev.judgeName}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Score</span>
                  <span className="text-2xl font-black font-mono text-amber-400">
                    {ev.totalScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </span>
                </div>
              </div>

              {/* Rubric Breakdown Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Innovation</span>
                  <strong className="font-mono text-amber-400">{ev.rubric.innovation} / 20</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Technical Depth</span>
                  <strong className="font-mono text-amber-400">{ev.rubric.technicalImplementation} / 25</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Problem Fit</span>
                  <strong className="font-mono text-amber-400">{ev.rubric.problemRelevance} / 20</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">UX & Design</span>
                  <strong className="font-mono text-amber-400">{ev.rubric.userExperience} / 15</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Impact & Scale</span>
                  <strong className="font-mono text-amber-400">{ev.rubric.impactAndFeasibility} / 20</strong>
                </div>
              </div>

              {/* Feedback Quote */}
              <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                "{ev.feedback}"
              </div>

              {/* Strengths & Improvements tags */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                {ev.strengths.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    ✓ {s}
                  </span>
                ))}
                {ev.improvementAreas.map((imp, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  >
                    • {imp}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
