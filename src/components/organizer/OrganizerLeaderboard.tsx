'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import { useEvent } from '@/context/EventContext';
import { LeaderboardView } from '../participant/LeaderboardView';
import {
  Trophy,
  Sparkles,
  Download,
  FileSpreadsheet,
  Award,
} from 'lucide-react';
import { playChime } from '@/lib/utils';

export const OrganizerLeaderboard: React.FC = () => {
  const { teams, submissions, addToast } = useEvent();

  const handleCelebrateWinners = () => {
    playChime('celebrate');

    // Confetti cannon
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    addToast('🎉 Winners Finalized!', 'TechNova 2026 champions have been declared!', 'success');
  };

  const handleExportCSV = () => {
    const headers = ['Rank,Team Name,Track,Score,Evaluations,Leader'];
    const rows = teams.map((t, idx) =>
      `"${idx + 1}","${t.name}","${t.track}","${t.aggregateScore || 0}","${t.totalEvaluations}","${t.members[0]?.name || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'technova_2026_leaderboard_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Export Generated', 'Leaderboard results downloaded as CSV.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar for Organizers */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Organizer Results Finalization & Award Ceremonies
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Lock final leaderboard standings and export verified scores for the closing presentation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleCelebrateWinners}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Finalize & Reveal Winners</span>
          </button>
        </div>
      </div>

      {/* Embedded Live Leaderboard */}
      <LeaderboardView />
    </div>
  );
};
