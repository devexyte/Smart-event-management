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
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-blue-600" />
            Judging Oversight & Evaluation Audit
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Audit rubric breakdowns, score distributions, and judge calibration across all tracks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
            <span className="text-slate-600">Total Evaluations: </span>
            <strong className="text-blue-700 font-mono">{evaluations.length} Scored</strong>
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
              className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {sub?.track}
                    </span>
                    <h3 className="font-bold text-base text-slate-900">{sub?.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Team: <strong className="text-slate-800">{team?.name}</strong> • Judge: <strong className="text-blue-600">{ev.judgeName}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Score</span>
                  <span className="text-2xl font-black font-mono text-blue-600">
                    {ev.totalScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </span>
                </div>
              </div>

              {/* Rubric Breakdown Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Innovation</span>
                  <strong className="font-mono text-slate-900">{ev.rubric.innovation} / 20</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Technical Depth</span>
                  <strong className="font-mono text-slate-900">{ev.rubric.technicalImplementation} / 25</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Problem Fit</span>
                  <strong className="font-mono text-slate-900">{ev.rubric.problemRelevance} / 20</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">UX & Design</span>
                  <strong className="font-mono text-slate-900">{ev.rubric.userExperience} / 15</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Impact & Scale</span>
                  <strong className="font-mono text-slate-900">{ev.rubric.impactAndFeasibility} / 20</strong>
                </div>
              </div>

              {/* Feedback Quote */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                "{ev.feedback}"
              </div>

              {/* Strengths & Improvements tags */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                {ev.strengths.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    ✓ {s}
                  </span>
                ))}
                {ev.improvementAreas.map((imp, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200"
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
