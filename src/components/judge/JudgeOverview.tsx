'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Award,
  FileCode,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface JudgeOverviewProps {
  setActiveTab: (tab: string) => void;
  onOpenEvaluation: (submissionId: string) => void;
}

export const JudgeOverview: React.FC<JudgeOverviewProps> = ({ setActiveTab, onOpenEvaluation }) => {
  const { currentJudge, submissions, evaluations, teams } = useEvent();

  if (!currentJudge) return null;

  // Submissions assigned to this judge
  const assigned = submissions.filter((s) => currentJudge.assignedSubmissionIds.includes(s.id));
  const myEvaluations = evaluations.filter((e) => e.judgeId === currentJudge.id);
  const completedIds = myEvaluations.map((e) => e.submissionId);
  const pending = assigned.filter((s) => !completedIds.includes(s.id));

  const averageScoreAwarded =
    myEvaluations.length > 0
      ? (myEvaluations.reduce((acc, curr) => acc + curr.totalScore, 0) / myEvaluations.length).toFixed(1)
      : '—';

  return (
    <div className="space-y-6">
      {/* Judge Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-md border border-blue-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <img
              src={currentJudge.avatar}
              alt={currentJudge.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Judge Portal: {currentJudge.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30">
                  Senior Evaluator
                </span>
              </div>
              <p className="text-sm text-blue-100 mt-1">
                {currentJudge.title} • <span className="font-semibold text-white">{currentJudge.company}</span>
              </p>
              <p className="text-xs text-blue-100/90 mt-0.5">
                Assigned Track Specialty: <span className="text-white font-semibold">{currentJudge.track}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('assigned')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <FileCode className="w-4 h-4 text-blue-700" />
              <span>Review Submissions ({assigned.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Assigned */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Assigned Projects</span>
            <FileCode className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">{assigned.length}</div>
          <p className="text-xs text-slate-400 mt-1">In your evaluation queue</p>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Evaluations Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">{myEvaluations.length}</div>
          <p className="text-xs text-slate-400 mt-1">Scored & submitted</p>
        </div>

        {/* Card 3: Pending */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Pending Evaluation</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600">{pending.length}</div>
          <p className="text-xs text-slate-400 mt-1">Awaiting your scores</p>
        </div>

        {/* Card 4: Average Score */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Your Average Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {averageScoreAwarded} {averageScoreAwarded !== '—' && 'pts'}
          </div>
          <p className="text-xs text-slate-400 mt-1">Across 100 max points</p>
        </div>
      </div>

      {/* Assigned Queue Quick Action Table */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Your Evaluation Queue</h3>
            <p className="text-xs text-slate-500">Click any project to inspect technical details and score against the 5-point rubric.</p>
          </div>
          <button
            onClick={() => setActiveTab('assigned')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <span>View All</span> &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {assigned.map((sub) => {
            const team = teams.find((t) => t.id === sub.teamId);
            const myEval = myEvaluations.find((e) => e.submissionId === sub.id);

            return (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {sub.track}
                    </span>
                    {myEval ? (
                      <span className="text-[10px] font-bold font-mono text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Scored: {myEval.totalScore}/100
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold font-mono text-amber-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Review
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{sub.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{sub.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-semibold">{team?.name || 'Team'}</span>
                  <button
                    onClick={() => onOpenEvaluation(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      myEval
                        ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    <span>{myEval ? 'Edit Evaluation' : 'Score Project'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
