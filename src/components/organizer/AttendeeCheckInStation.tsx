'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Search,
  Camera,
  X,
  Sparkles,
  UserCheck,
  Clock,
  RefreshCw,
  Scan,
} from 'lucide-react';
import { Participant } from '@/types';
import { formatTimeAgo } from '@/lib/utils';

export const AttendeeCheckInStation: React.FC = () => {
  const { participants, stats, checkInParticipant, addToast } = useEvent();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'checked_in' | 'not_checked_in'>('all');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedScannerParticipantId, setSelectedScannerParticipantId] = useState<string>('');
  const [isScanningActive, setIsScanningActive] = useState(false);

  const filtered = participants.filter((p) => {
    if (statusFilter !== 'all' && p.checkInStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.qrToken.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSimulatedScan = (participantId: string) => {
    setIsScanningActive(true);
    setTimeout(() => {
      checkInParticipant(participantId);
      setIsScanningActive(false);
    }, 600);
  };

  const pendingParticipants = participants.filter((p) => p.checkInStatus === 'not_checked_in');

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <QrCode className="w-4 h-4" />
              <span>Gate & Attendance Control</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Attendee Verification & QR Check-In
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time check-in station for verifying badge QR codes and issuing wristbands.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right">
              <span className="text-[10px] text-slate-400 font-medium block">Total Verified</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {stats.checkedInCount} / {stats.totalRegistered} ({stats.checkInPercentage}%)
              </span>
            </div>

            <button
              onClick={() => {
                if (pendingParticipants.length > 0) {
                  setSelectedScannerParticipantId(pendingParticipants[0].id);
                }
                setIsScannerOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Camera className="w-4 h-4" />
              <span>Open QR Scanner Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              statusFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-950/60 text-slate-400'
            }`}
          >
            All Attendees ({participants.length})
          </button>
          <button
            onClick={() => setStatusFilter('checked_in')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              statusFilter === 'checked_in' ? 'bg-emerald-600 text-white' : 'bg-slate-950/60 text-slate-400'
            }`}
          >
            Checked In ({stats.checkedInCount})
          </button>
          <button
            onClick={() => setStatusFilter('not_checked_in')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              statusFilter === 'not_checked_in' ? 'bg-emerald-600 text-white' : 'bg-slate-950/60 text-slate-400'
            }`}
          >
            Not Checked In ({participants.length - stats.checkedInCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, pass token, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Table of Attendees */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Participant</th>
                <th className="py-3.5 px-4">Pass ID / Token</th>
                <th className="py-3.5 px-4">Track & Role</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Time</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((p) => {
                const isChecked = p.checkInStatus === 'checked_in';

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Participant Avatar & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{p.name}</div>
                          <div className="text-[10px] text-slate-400">{p.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* QR Token */}
                    <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                      {p.qrToken}
                    </td>

                    {/* Track & Role */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{p.role}</div>
                      <div className="text-[10px] text-indigo-300">{p.primaryTrack}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 border ${
                          isChecked
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                        {isChecked ? 'Checked In' : 'Not Checked In'}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-[11px]">
                      {p.checkInTime ? formatTimeAgo(p.checkInTime) : '—'}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      {isChecked ? (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSimulatedScan(p.id)}
                          className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1 ml-auto"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Check In</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive QR Scanner Simulator Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-base text-white">
                <Scan className="w-5 h-5 text-emerald-400" />
                <span>Interactive QR Scanner Simulator</span>
              </div>
              <button
                onClick={() => setIsScannerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative aspect-video bg-slate-950 rounded-2xl border-2 border-dashed border-emerald-500/50 flex flex-col items-center justify-center overflow-hidden shadow-inner">
              {/* Animated laser line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] scanner-laser" />

              {/* Viewfinder Target Box */}
              <div className="w-36 h-36 border-2 border-emerald-400/80 rounded-2xl relative flex items-center justify-center bg-emerald-500/5">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400 -mt-1 -ml-1" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400 -mt-1 -mr-1" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400 -mb-1 -ml-1" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400 -mb-1 -mr-1" />

                <QrCode className="w-16 h-16 text-emerald-400/40 animate-pulse" />
              </div>

              <span className="absolute bottom-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded">
                Camera Feed #01 • 1080p 60fps
              </span>
            </div>

            {/* Participant selector to simulate scanning */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Select Participant Badge to Scan
                </label>
                <select
                  value={selectedScannerParticipantId}
                  onChange={(e) => setSelectedScannerParticipantId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {participants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.qrToken}) — {p.checkInStatus === 'checked_in' ? '✓ Checked In' : 'Pending'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                disabled={isScanningActive}
                onClick={() => handleSimulatedScan(selectedScannerParticipantId || participants[0].id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isScanningActive ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Cryptographic QR Token...</span>
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4" />
                    <span>Scan Badge & Verify Entry</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
