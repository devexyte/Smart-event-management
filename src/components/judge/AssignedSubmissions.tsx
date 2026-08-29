'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  FileCode,
  CheckCircle2,
  Clock,
  Award,
  Search,
  ExternalLink,
  GitBranch,
  Globe,
  Sliders,
  Layers,
} from 'lucide-react';
import { ScoringStudioModal } from './ScoringStudioModal';

interface AssignedSubmissionsProps {
  initialSelectedId?: string | null;
}

export const AssignedSubmissions: React.FC<AssignedSubmissionsProps> = ({
  initialSelectedId = null,
}) => {
  const { currentJudge, submissions, evaluations, teams } = useEvent();
  const [selectedSubId, setSelectedSubId] = useState<string | null>(initialSelectedId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'evaluated'>('all');

  if (!currentJudge) return null;

  const assigned = submissions.filter((s) => currentJudge.assignedSubmissionIds.includes(s.id));
  const myEvaluations = evaluations.filter((e) => e.judgeId === currentJudge.id);
  const completedIds = myEvaluations.map((e) => e.submissionId);

  const filtered = assigned.filter((sub) => {
    const isEvaluated = completedIds.includes(sub.id);
    if (filterStatus === 'pending' && isEvaluated) return false;
    if (filterStatus === 'evaluated' && !isEvaluated) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        sub.title.toLowerCase().includes(q) ||
        sub.teamName.toLowerCase().includes(q) ||
        sub.techStack.some((t) => t.toLowerCase().includes(q))
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
            <FileCode className="w-5 h-5 text-amber-400" />
            Assigned Project Submissions ({assigned.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Projects allocated for your technical review in {currentJudge.track}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterStatus === 'all' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            All ({assigned.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterStatus === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Pending ({assigned.length - myEvaluations.length})
          </button>
          <button
            onClick={() => setFilterStatus('evaluated')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filterStatus === 'evaluated' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Scored ({myEvaluations.length})
          </button>
        </div>
      </div>

      {/* Grid of Assigned Submissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((sub) => {
          const team = teams.find((t) => t.id === sub.teamId);
          const myEval = myEvaluations.find((e) => e.submissionId === sub.id);

          return (
            <div
              key={sub.id}
              className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300">
                      {sub.track}
                    </span>
                    <h3 className="font-bold text-base text-white mt-1.5">{sub.title}</h3>
                    <p className="text-xs text-slate-400">Team: <strong className="text-slate-200">{team?.name}</strong></p>
                  </div>

                  {myEval ? (
                    <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs text-right">
                      <span>{myEval.totalScore} / 100</span>
                      <span className="block text-[9px] font-normal text-emerald-400">Scored</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
                      Pending
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  {sub.problemStatement}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {sub.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-mono text-indigo-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 text-xs pt-2 border-t border-slate-800/80 text-slate-400">
                  {sub.repoUrl && (
                    <a
                      href={sub.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {sub.demoUrl && (
                    <a
                      href={sub.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedSubId(sub.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  myEval
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-600/30'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>{myEval ? 'Review & Edit Scores' : 'Evaluate & Score Project'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Evaluation Studio Modal */}
      {selectedSubId && (
        <ScoringStudioModal
          submissionId={selectedSubId}
          onClose={() => setSelectedSubId(null)}
        />
      )}
    </div>
  );
};
