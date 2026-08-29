'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  LayoutDashboard,
  QrCode,
  Users,
  UserPlus,
  Send,
  Bell,
  Trophy,
  ClipboardCheck,
  BarChart3,
  Radio,
  FileCode,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentRole, announcements, stats, currentParticipant } = useEvent();

  const getMenuItems = () => {
    if (currentRole === 'participant') {
      return [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        {
          id: 'qr-pass',
          label: 'My QR Pass',
          icon: QrCode,
          badge: currentParticipant?.checkInStatus === 'checked_in' ? 'Verified' : 'Unchecked',
          badgeColor: currentParticipant?.checkInStatus === 'checked_in' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300',
        },
        { id: 'matchmaker', label: 'Find Teammates', icon: UserPlus, highlight: true },
        { id: 'my-team', label: 'My Team', icon: Users },
        { id: 'submission', label: 'Project Submission', icon: Send },
        {
          id: 'announcements',
          label: 'Announcements',
          icon: Bell,
          badge: `${announcements.length}`,
          badgeColor: 'bg-indigo-500/20 text-indigo-300',
        },
        { id: 'leaderboard', label: 'Live Leaderboard', icon: Trophy },
      ];
    }

    if (currentRole === 'judge') {
      return [
        { id: 'overview', label: 'Judge Overview', icon: LayoutDashboard },
        { id: 'assigned', label: 'Assigned Submissions', icon: FileCode, badge: `${stats.submissionsCount}`, badgeColor: 'bg-amber-500/20 text-amber-300' },
        { id: 'matrix', label: 'Judging Progress', icon: ClipboardCheck },
        { id: 'leaderboard', label: 'Live Leaderboard', icon: Trophy },
      ];
    }

    // Organizer Menu
    return [
      { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
      {
        id: 'check-in',
        label: 'Attendees & Check-in',
        icon: QrCode,
        badge: `${stats.checkedInCount}/${stats.totalRegistered}`,
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
      },
      { id: 'teams', label: 'Teams Management', icon: Users, badge: `${stats.teamsCount}` },
      { id: 'submissions', label: 'Submissions Hub', icon: Send, badge: `${stats.submissionsCount}` },
      { id: 'judging', label: 'Judging Oversight', icon: ClipboardCheck, badge: `${stats.judgingProgressPercentage}%` },
      { id: 'broadcast', label: 'Broadcast Center', icon: Radio },
      { id: 'analytics', label: 'Analytics Suite', icon: BarChart3 },
      { id: 'leaderboard', label: 'Live Leaderboard', icon: Trophy },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 backdrop-blur-xl sticky top-20 shadow-xl">
        {/* Role badge */}
        <div className="px-3 py-2 mb-2 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                currentRole === 'participant'
                  ? 'bg-indigo-400 shadow-sm shadow-indigo-400'
                  : currentRole === 'judge'
                  ? 'bg-amber-400 shadow-sm shadow-amber-400'
                  : 'bg-emerald-400 shadow-sm shadow-emerald-400'
              }`}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {currentRole} Mode
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">TechNova 26</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? currentRole === 'participant'
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-md font-semibold'
                      : currentRole === 'judge'
                      ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30 shadow-md font-semibold'
                      : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-md font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? currentRole === 'participant'
                          ? 'text-indigo-400'
                          : currentRole === 'judge'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium shrink-0 ${
                      item.badgeColor || 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick event stats pill */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 px-3 pb-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span>Check-in Rate</span>
            <span className="font-mono text-emerald-400 font-semibold">{stats.checkInPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${stats.checkInPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
