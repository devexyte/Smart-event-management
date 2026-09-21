'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Compass,
  Ticket,
  Calendar,
  Bookmark,
  Award,
  Users,
  CalendarPlus,
  QrCode,
  UserCheck,
  Radio,
  FileText,
  Building2,
  CheckSquare,
  Layers,
  BarChart3,
  Code2,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentRole, registrations, currentUser, stats, events } = useEvent();

  const userRegistrationsCount = registrations.filter(
    (r) => r.studentId === currentUser.id && r.status !== 'cancelled'
  ).length;

  const userBookmarksCount = currentUser.bookmarkedEventIds?.length || 0;

  const getMenuItems = () => {
    // 1. STUDENT MENU
    if (currentRole === 'student' || currentRole === 'participant') {
      return [
        { id: 'catalogue', label: 'Event Catalogue', icon: Compass },
        {
          id: 'registrations',
          label: 'My Registrations',
          icon: Ticket,
          badge: userRegistrationsCount > 0 ? `${userRegistrationsCount}` : undefined,
          badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200',
        },
        { id: 'calendar', label: 'Calendar & Schedule', icon: Calendar },
        {
          id: 'bookmarks',
          label: 'Saved & Bookmarks',
          icon: Bookmark,
          badge: userBookmarksCount > 0 ? `${userBookmarksCount}` : undefined,
          badgeColor: 'bg-slate-100 text-slate-600 border border-slate-200',
        },
        { id: 'certificates', label: 'My Certificates', icon: Award },
        { id: 'hackathon-hub', label: 'Hackathon Project Hub', icon: Code2 },
      ];
    }

    // 2. ORGANIZER MENU
    if (currentRole === 'organizer') {
      return [
        { id: 'overview', label: 'Operations Overview', icon: BarChart3 },
        {
          id: 'events',
          label: 'Events & Creation',
          icon: CalendarPlus,
          badge: `${events.length}`,
          badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        },
        {
          id: 'check-in',
          label: 'QR Check-In Station',
          icon: QrCode,
          badge: `${stats.checkedInAttendees}/${stats.totalRegistrations}`,
          badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200',
        },
        { id: 'volunteers', label: 'Volunteer Management', icon: UserCheck },
        { id: 'broadcast', label: 'Live Broadcast Center', icon: Radio },
        { id: 'reports', label: 'Event Reports & Exports', icon: FileText },
        { id: 'hackathon-oversight', label: 'Hackathon Oversight', icon: Code2 },
      ];
    }

    // 3. ADMIN MENU
    return [
      { id: 'overview', label: 'Executive Dashboard', icon: BarChart3 },
      {
        id: 'approvals',
        label: 'Event Approvals Queue',
        icon: CheckSquare,
        badge: stats.pendingApprovalsCount > 0 ? `${stats.pendingApprovalsCount}` : undefined,
        badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200 font-bold',
      },
      { id: 'master-data', label: 'Categories & Venues', icon: Building2 },
      { id: 'users', label: 'User & Account Admin', icon: Users },
      { id: 'audit-reports', label: 'Audit Logs & Reports', icon: FileText },
    ];
  };

  const menuItems = getMenuItems();

  const getRoleAccent = () => {
    switch (currentRole) {
      case 'student':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          activeItem: 'bg-blue-600 text-white font-semibold shadow-xs',
          label: 'Student Portal',
        };
      case 'organizer':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          activeItem: 'bg-emerald-600 text-white font-semibold shadow-xs',
          label: 'Organizer Suite',
        };
      case 'admin':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          activeItem: 'bg-amber-600 text-white font-semibold shadow-xs',
          label: 'Principal & Admin',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          activeItem: 'bg-blue-600 text-white',
          label: 'Portal Mode',
        };
    }
  };

  const accent = getRoleAccent();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sticky top-20 shadow-xs">
        {/* Active Role Label */}
        <div className="px-3 py-2 mb-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800">
            {accent.label}
          </span>
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${accent.badge}`}>
            {currentRole.toUpperCase()}
          </span>
        </div>

        {/* Role Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? accent.activeItem
                    : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/60 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-mono shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Campus Info / Stats Pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 px-2 pb-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span>Published Events</span>
            <span className="font-semibold text-slate-800">{stats.publishedEvents}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Overall Check-in</span>
            <span className="font-semibold text-emerald-600">{stats.checkInPercentage}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
