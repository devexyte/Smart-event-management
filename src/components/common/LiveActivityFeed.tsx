'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import { formatTimeAgo } from '@/lib/utils';
import {
  Activity,
  CheckCircle2,
  Users,
  Send,
  Award,
  Bell,
  UserPlus,
} from 'lucide-react';

export const LiveActivityFeed: React.FC<{ maxItems?: number }> = ({ maxItems = 8 }) => {
  const { activityLogs } = useEvent();
  const displayLogs = activityLogs.slice(0, maxItems);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'check_in':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'team_create':
      case 'team_join':
        return <Users className="w-4 h-4 text-indigo-400" />;
      case 'submission':
        return <Send className="w-4 h-4 text-cyan-400" />;
      case 'evaluation':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'announcement':
        return <Bell className="w-4 h-4 text-rose-400" />;
      case 'connection':
        return <UserPlus className="w-4 h-4 text-purple-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-slate-900">Live Event Feed</h3>
        </div>
        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wider font-semibold">
          Real-time
        </span>
      </div>

      <div className="space-y-3">
        {displayLogs.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">No recent activity</p>
        ) : (
          displayLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-all text-xs"
            >
              <div className="mt-0.5 p-1 rounded-lg bg-white border border-slate-200 shrink-0 shadow-2xs">
                {getLogIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-slate-900 truncate">{log.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {formatTimeAgo(log.timestamp)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed break-words">
                  {log.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
