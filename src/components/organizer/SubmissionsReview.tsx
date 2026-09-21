'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Send,
  GitBranch,
  Globe,
  Video,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Award,
  ExternalLink,
} from 'lucide-react';
import { ProjectSubmission } from '@/types';

export const SubmissionsReview: React.FC = () => {
  const { submissions, teams, evaluations } = useEvent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');

  const filtered = submissions.filter((sub) => {
    if (selectedTrack !== 'all' && sub.track !== selectedTrack) return false;
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
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Hackathon Project Submissions ({submissions.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review code repositories, architecture designs, live demos, and pitch recordings.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono">
          {submissions.filter((s) => s.status === 'evaluated').length} / {submissions.length} Evaluated
        </span>
      </div>

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((sub) => {
          const team = teams.find((t) => t.id === sub.teamId);
          const subEvals = evaluations.filter((e) => e.submissionId === sub.id);

          return (
            <div
              key={sub.id}
              className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {sub.track}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-1.5">{sub.title}</h3>
                    <p className="text-xs text-slate-500">Team: <strong className="text-slate-800">{sub.teamName}</strong></p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase inline-block ${
                        sub.status === 'evaluated'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                    {team?.aggregateScore && (
                      <span className="block text-xs font-mono font-bold text-blue-600 mt-1">
                        Avg: {team.aggregateScore} pts
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">{sub.problemStatement}</p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {sub.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Evaluations counter */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <span className="text-slate-500">Judge Evaluations:</span>
                  <span className="font-mono font-bold text-blue-700">
                    {subEvals.length} Reviews logged
                  </span>
                </div>
              </div>

              {/* Links Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  {sub.repoUrl && (
                    <a
                      href={sub.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
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
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                  {sub.videoUrl && (
                    <a
                      href={sub.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video</span>
                    </a>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 font-mono">
                  {sub.submittedAt ? new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Draft'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
