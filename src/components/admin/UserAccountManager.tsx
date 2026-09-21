'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { UserAccount } from '@/types';
import {
  Users,
  Search,
  Shield,
  GraduationCap,
  CalendarCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Ban,
} from 'lucide-react';

export const UserAccountManager: React.FC = () => {
  const { users, updateUserRole, toggleUserStatus, registrations } = useEvent();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'organizer' | 'admin'>('all');

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        (u.studentIdNumber && u.studentIdNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-400" />
            <span>Campus User & Role Administration (FR25)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage student registrations, grant organizer permissions, assign administrative privileges, and manage account statuses.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-slate-400 block">Total Campus Accounts</span>
          <span className="text-xl font-bold text-white font-mono">{users.length} Users</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#131d31] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, email, department, or student ID..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 w-full sm:w-auto justify-center">
          {(['all', 'student', 'organizer', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
                roleFilter === r
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}s
            </button>
          ))}
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-[#131d31] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left divide-y divide-slate-800">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">User Profile</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Student / Staff ID</th>
                <th className="py-2.5 px-3">Role Authorization (FR25)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Account Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredUsers.map((user) => {
                const regCount = registrations.filter((r) => r.studentId === user.id).length;

                return (
                  <tr key={user.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-700"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-slate-300 truncate max-w-xs">
                      {user.department}
                    </td>

                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                      {user.studentIdNumber || 'Staff / Faculty'}
                    </td>

                    {/* Role Dropdown (FR25) */}
                    <td className="py-2.5 px-3">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as any)}
                        className="py-1 px-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="student">Student</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    {/* Account Status */}
                    <td className="py-2.5 px-3">
                      {user.status === 'active' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Toggle Status Action */}
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          user.status === 'active'
                            ? 'text-rose-400 hover:bg-rose-950/40'
                            : 'text-emerald-400 hover:bg-emerald-950/40'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
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
