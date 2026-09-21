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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>Administrative Audit Log & System Intelligence (FR23, FR26, NFR9)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official immutable audit trail of dean approvals, registration status changes, gate verifications, and operational metrics.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print Audit Summary</span>
        </button>
      </div>

      {/* KPI Highlights Bar (FR26) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-200 transition-all">
          <span className="text-xs text-slate-500 font-medium">Campus Events Registry</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">{stats.totalEvents}</span>
            <span className="text-xs text-slate-400">({stats.publishedEvents} active)</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-200 transition-all">
          <span className="text-xs text-slate-500 font-medium">Total Registrations</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-mono">{stats.totalRegistrations}</span>
            <span className="text-xs text-slate-400">students enrolled</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-200 transition-all">
          <span className="text-xs text-slate-500 font-medium">Verified Gate Check-In</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-600 font-mono">{stats.checkInPercentage}%</span>
            <span className="text-xs text-slate-400">attendance rate</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-200 transition-all">
          <span className="text-xs text-slate-500 font-medium">Workshop Revenue</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600 font-mono">₹{stats.totalRevenue}</span>
            <span className="text-xs text-slate-400">collected</span>
          </div>
        </div>
      </div>

      {/* System Audit Trail (NFR9) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Campus Audit Action Log (NFR9)</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            Tamper-Evident History
          </span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start justify-between gap-4 text-xs hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">{log.title}</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{log.description}</p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400 shrink-0">
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
