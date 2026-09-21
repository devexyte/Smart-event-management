'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { VolunteerAssignment } from '@/types';
import {
  UserCheck,
  Plus,
  Trash2,
  Calendar,
  Mail,
  Shield,
  Clock,
  User,
  CheckCircle2,
} from 'lucide-react';

export const VolunteerManagement: React.FC = () => {
  const { events, users, volunteers, assignVolunteer, removeVolunteer, addToast } = useEvent();

  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || 'evt-1');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<VolunteerAssignment['role']>('Registration Desk');

  const availableStudents = users.filter((u) => u.role === 'student');
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const eventVolunteers = volunteers.filter((v) => v.eventId === selectedEventId);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) {
      addToast('Student Required', 'Please select a student to assign.', 'error');
      return;
    }

    // Check if student is already assigned to this event
    const exists = eventVolunteers.some((v) => v.studentId === selectedStudentId);
    if (exists) {
      addToast('Already Assigned', 'This student is already assigned to this event.', 'info');
      return;
    }

    assignVolunteer(selectedEventId, selectedStudentId, selectedRole);
    setSelectedStudentId('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-emerald-400" />
            <span>Volunteer Assignment & Coordination (FR20)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Recruit student coordinators and assign operational roles across registration gates, AV support, and stage management.
          </p>
        </div>

        {/* Event Selector Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500 max-w-xs"
          >
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignment Form & Current Volunteer Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Assign Card */}
        <div className="bg-[#131d31] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 h-fit">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Assign Student Volunteer</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Assigning for: <strong className="text-slate-200">{selectedEvent?.title}</strong>
          </p>

          <form onSubmit={handleAssign} className="space-y-3.5 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Select Student Candidate</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Choose Candidate --</option>
                {availableStudents.map((stu) => (
                  <option key={stu.id} value={stu.id}>
                    {stu.name} ({stu.studentIdNumber || stu.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Designated Volunteer Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Registration Desk">Registration Desk (QR Pass Validation)</option>
                <option value="Technical Support">Technical Support (Wi-Fi, Workstations & Power)</option>
                <option value="Stage & Audio-Visual">Stage & Audio-Visual Management</option>
                <option value="Hospitality & Usher">Hospitality & Ushering</option>
                <option value="Logistics">Logistics & Refreshments</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Confirm Assignment</span>
            </button>
          </form>
        </div>

        {/* Right Column: Assigned Roster */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Assigned Crew for Selected Event ({eventVolunteers.length})
            </h3>
            <span className="text-xs text-slate-400">Status: Active</span>
          </div>

          {eventVolunteers.length === 0 ? (
            <div className="bg-[#131d31] border border-slate-800 rounded-xl p-8 text-center space-y-2">
              <UserCheck className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-300 font-semibold">No volunteers assigned yet</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Use the form on the left to allocate student volunteers to key operational stations.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventVolunteers.map((vol) => (
                <div
                  key={vol.id}
                  className="bg-[#131d31] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {vol.studentName[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs text-white truncate">
                          {vol.studentName}
                        </h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {vol.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {vol.studentEmail} • Assigned by {vol.assignedBy}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeVolunteer(vol.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
                    title="Remove volunteer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
