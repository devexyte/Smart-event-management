'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  FileText,
  Shield,
  BarChart3,
  Calendar,
  Users,
  CheckCircle2,
  DollarSign,
  Clock,
  Printer,
  TrendingUp,
} from 'lucide-react';

export const AdminAuditReports: React.FC = () => {
  const { events, registrations, users, venues, stats, activityLogs } = useEvent();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-amber-400" />
            <span>Administrative Audit Log & System Intelligence (FR23, FR26, NFR9)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official immutable audit trail of dean approvals, registration status changes, gate verifications, and operational metrics.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Audit Summary</span>
        </button>
      </div>

      {/* KPI Highlights Bar (FR26) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131d31] border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Campus Events Registry</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-white font-mono">{stats.totalEvents}</span>
            <span className="text-xs text-slate-500">({stats.publishedEvents} active)</span>
          </div>
        </div>

        <div className="bg-[#131d31] border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Total Registrations</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-400 font-mono">{stats.totalRegistrations}</span>
            <span className="text-xs text-slate-500">students enrolled</span>
          </div>
        </div>

        <div className="bg-[#131d31] border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Verified Gate Check-In</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-400 font-mono">{stats.checkInPercentage}%</span>
            <span className="text-xs text-slate-500">attendance rate</span>
          </div>
        </div>

        <div className="bg-[#131d31] border border-slate-800 rounded-xl p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-medium">Workshop Revenue</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-400 font-mono">₹{stats.totalRevenue}</span>
            <span className="text-xs text-slate-500">collected</span>
          </div>
        </div>
      </div>

      {/* System Audit Trail (NFR9) */}
      <div className="bg-[#131d31] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Campus Audit Action Log (NFR9)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Tamper-Evident History</span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-900/70 border border-slate-800/80 rounded-xl flex items-start justify-between gap-4 text-xs hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-200">{log.title}</h4>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">{log.description}</p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-500 shrink-0">
                {new Date(log.timestamp).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
