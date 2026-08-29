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
      <div className="glass-panel p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-amber-500/30">
        <div>
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Organizer Results Finalization & Award Ceremonies
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Lock final leaderboard standings and export verified scores for the closing presentation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleCelebrateWinners}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Finalize & Reveal Winners 🎉</span>
          </button>
        </div>
      </div>

      {/* Embedded Live Leaderboard */}
      <LeaderboardView />
    </div>
  );
};
