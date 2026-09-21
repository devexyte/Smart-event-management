'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useEvent } from '@/context/EventContext';
import { UserRole } from '@/types';
import {
  GraduationCap,
  CalendarCheck,
  Building2,
  Bell,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Shield,
  User,
} from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    currentUser,
    currentRole,
    setRole,
    switchUser,
    users,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    stats,
    resetToDemoData,
  } = useEvent();

  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const personaRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setShowPersonaMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0d1527]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Institution Header */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-wide">
                RC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight text-white">
                    CampusFlow
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Smart Event Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Ramnarain Ruia Autonomous College • Matunga, Mumbai
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Role Switcher Segmented Control (FR1 & FR2) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => {
                setRole('student');
                // If current user is not a student, pick a default student
                if (currentUser.role !== 'student') {
                  const student = users.find((u) => u.role === 'student');
                  if (student) switchUser(student.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                currentRole === 'student'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => {
                setRole('organizer');
                // If current user is not an organizer, pick a default organizer
                if (currentUser.role !== 'organizer') {
                  const organizer = users.find((u) => u.role === 'organizer');
                  if (organizer) switchUser(organizer.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                currentRole === 'organizer'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Organizer</span>
            </button>

            <button
              onClick={() => {
                setRole('admin');
                // If current user is not an admin, pick default admin
                if (currentUser.role !== 'admin') {
                  const admin = users.find((u) => u.role === 'admin');
                  if (admin) switchUser(admin.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                currentRole === 'admin'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Admin</span>
              {stats.pendingApprovalsCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Right Controls: Notifications, Persona Selector & Reset */}
          <div className="flex items-center gap-2.5">
            {/* Notification Center Dropdown (FR12) */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#131d31] border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Notifications ({notifications.length})
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No notifications at this time.
                      </div>
                    ) : (
                      notifications.slice(0, 6).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-800/60 transition-colors ${
                            !notif.read ? 'bg-blue-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-slate-200">{notif.title}</p>
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">
                            {formatTimeAgo(notif.timestamp)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Active User Persona Selector (FR1, FR2) */}
            <div className="relative" ref={personaRef}>
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
                title="Switch active user profile"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-700"
                />
                <div className="text-left hidden md:block">
                  <p className="font-semibold text-slate-200 truncate max-w-[120px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize">
                    {currentUser.role}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#131d31] border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona (Testing)
                  </div>

                  <div className="max-h-72 overflow-y-auto py-1">
                    {users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          switchUser(user.id);
                          setShowPersonaMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs hover:bg-slate-800 transition-colors ${
                          user.id === currentUser.id
                            ? 'bg-blue-600/20 text-blue-300 font-semibold'
                            : 'text-slate-300'
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold text-slate-200">{user.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {user.role.toUpperCase()} • {user.department}
                          </p>
                        </div>
                        {user.id === currentUser.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-800 mt-1 bg-slate-900/50">
                    <p className="text-[10px] text-slate-400 px-1">
                      Current student ID: <span className="font-mono text-slate-300">{currentUser.studentIdNumber || 'N/A'}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (confirm('Reset platform data back to initial Ramnarain Ruia Autonomous College demo state?')) {
                  resetToDemoData();
                }
              }}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset to default dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
