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
  UserCheck,
  Clock,
  Scan,
  Calendar,
} from 'lucide-react';
import { RegistrationRecord } from '@/types';

export const AttendeeCheckInStation: React.FC = () => {
  const { events, registrations, checkInWithQR, stats, addToast } = useEvent();

  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || 'all');
  const [manualToken, setManualToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'checked_in' | 'not_checked_in'>('all');
  const [lastVerifiedReg, setLastVerifiedReg] = useState<RegistrationRecord | null>(null);
  const [verificationFeedback, setVerificationFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Filter registrations for selected event
  const currentRegistrations = registrations.filter((r) => {
    if (selectedEventId !== 'all' && r.eventId !== selectedEventId) return false;
    if (r.status === 'cancelled') return false;
    if (statusFilter !== 'all' && r.checkInStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentIdNumber.toLowerCase().includes(q) ||
        r.studentEmail.toLowerCase().includes(q) ||
        r.qrToken.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInScope = registrations.filter((r) =>
    selectedEventId === 'all' ? r.status !== 'cancelled' : r.eventId === selectedEventId && r.status !== 'cancelled'
  );
  const checkedInInScope = totalInScope.filter((r) => r.checkInStatus === 'checked_in');
  const checkInRate =
    totalInScope.length > 0 ? Math.round((checkedInInScope.length / totalInScope.length) * 100) : 0;

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;

    const result = checkInWithQR(manualToken.trim(), selectedEventId === 'all' ? undefined : selectedEventId);
    setVerificationFeedback(result);
    if (result.registration) {
      setLastVerifiedReg(result.registration);
    }
    setManualToken('');
  };

  const handleSimulateRowScan = (token: string) => {
    const result = checkInWithQR(token, selectedEventId === 'all' ? undefined : selectedEventId);
    setVerificationFeedback(result);
    if (result.registration) {
      setLastVerifiedReg(result.registration);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <QrCode className="w-6 h-6 text-blue-600" />
            <span>Gate QR Scanner & Attendance Verification (FR16)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time registration token verification, duplicate prevention, and attendance recording.
          </p>
        </div>

        {/* Event Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4 text-slate-500" />
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="py-2 px-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-blue-600 max-w-xs font-medium"
          >
            <option value="all">All Campus Events</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Verification Terminal & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Scanner Terminal */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Scan className="w-4 h-4 text-blue-600" />
            <span>Barcode & QR Pass Input Console</span>
          </h3>

          <form onSubmit={handleManualCheckIn} className="flex gap-2">
            <input
              type="text"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              placeholder="Scan barcode or paste student pass token (e.g. RUIA26-EVT1-AARAV-CS084)..."
              className="flex-1 p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Verify Attendee</span>
            </button>
          </form>

          {/* Feedback banner */}
          {verificationFeedback && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                verificationFeedback.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {verificationFeedback.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold">{verificationFeedback.message}</p>
                {lastVerifiedReg && (
                  <p className="text-[11px] text-slate-600 mt-1">
                    Student: <strong className="text-slate-900">{lastVerifiedReg.studentName}</strong> (ID: {lastVerifiedReg.studentIdNumber}) • Event: {lastVerifiedReg.eventTitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setVerificationFeedback(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Check-in Metric Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 block font-medium uppercase tracking-wider">
              Gate Check-In Velocity
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {checkedInInScope.length}
              </span>
              <span className="text-sm text-slate-500">/ {totalInScope.length} registered</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Verified Rate</span>
              <span className="font-mono text-blue-600 font-bold">{checkInRate}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${checkInRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Attendee Check-In Roster Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by student name, ID number, or token..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalInScope.length})
            </button>
            <button
              onClick={() => setStatusFilter('checked_in')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'checked_in'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Checked In ({checkedInInScope.length})
            </button>
            <button
              onClick={() => setStatusFilter('not_checked_in')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'not_checked_in'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({totalInScope.length - checkedInInScope.length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left divide-y divide-slate-100">
            <thead>
              <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">Student ID</th>
                <th className="py-2.5 px-3">Event Title</th>
                <th className="py-2.5 px-3">QR Token</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {currentRegistrations.map((r) => {
                const isCheckedIn = r.checkInStatus === 'checked_in';

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{r.studentName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{r.studentIdNumber}</td>
                    <td className="py-2.5 px-3 truncate max-w-xs text-slate-700">{r.eventTitle}</td>
                    <td className="py-2.5 px-3 font-mono text-blue-700 text-[11px]">{r.qrToken}</td>
                    <td className="py-2.5 px-3">
                      {isCheckedIn ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Checked In</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 w-fit block">
                          Pending Gate
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {!isCheckedIn ? (
                        <button
                          onClick={() => handleSimulateRowScan(r.qrToken)}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-2xs"
                        >
                          Check-In
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Verified'}
                        </span>
                      )}
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
