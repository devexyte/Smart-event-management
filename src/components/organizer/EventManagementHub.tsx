'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { EventItem, EventStatus } from '@/types';
import {
  CalendarPlus,
  Plus,
  Edit3,
  Trash2,
  Archive,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  CheckSquare,
  Users,
  MapPin,
  Calendar,
  Send,
  Sparkles,
} from 'lucide-react';
import { EventCreationModal } from './EventCreationModal';

export const EventManagementHub: React.FC = () => {
  const {
    events,
    submitEventForApproval,
    updateEvent,
    deleteEvent,
    archiveEvent,
    addToast,
  } = useEvent();

  const [statusFilter, setStatusFilter] = useState<'all' | EventStatus>('all');
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const filteredEvents = events.filter((e) => {
    if (statusFilter === 'all') return true;
    return e.status === statusFilter;
  });

  const handleStateTransition = (event: EventItem, newStatus: EventStatus) => {
    updateEvent(event.id, { status: newStatus });
    addToast('Lifecycle Updated', `"${event.title}" is now ${newStatus.toUpperCase()}.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarPlus className="w-6 h-6 text-blue-600" />
            <span>Event Management & Lifecycle (FR3, FR5, FR6, FR24)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create draft events, request administrative approvals, update schedules, and manage the event lifecycle.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingEvent(null);
            setShowCreationModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event (FR3)</span>
        </button>
      </div>

      {/* Status Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-2 text-xs shadow-2xs">
        <span className="text-slate-400 px-2 font-medium text-[11px] uppercase tracking-wider">
          Filter Status:
        </span>
        {[
          { id: 'all', label: `All Events (${events.length})` },
          { id: 'published', label: 'Published / Active' },
          { id: 'pending_approval', label: 'Pending Approval' },
          { id: 'draft', label: 'Drafts' },
          { id: 'completed', label: 'Completed' },
          { id: 'archived', label: 'Archived' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === tab.id
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Table / Cards */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          return (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Event Info */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {event.category}
                    </span>

                    {/* Status Pills */}
                    {event.status === 'published' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ● Published & Live
                      </span>
                    )}
                    {event.status === 'pending_approval' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                        ⏳ Pending Admin Review
                      </span>
                    )}
                    {event.status === 'draft' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        Draft
                      </span>
                    )}
                    {event.status === 'completed' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        ✓ Completed
                      </span>
                    )}
                    {event.status === 'rejected' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        ✕ Returned for Revision
                      </span>
                    )}
                    {event.status === 'archived' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        Archived
                      </span>
                    )}

                    <span className="text-xs text-slate-500 font-mono">
                      {event.registeredCount} / {event.capacity} Registered
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 truncate">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {new Date(event.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {event.venueName}
                    </span>
                    <span className="font-mono text-emerald-600 font-semibold">
                      {event.price === 0 ? 'Free' : `₹${event.price}`}
                    </span>
                  </div>

                  {event.rejectionReason && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                      <strong>Admin Rejection Note:</strong> {event.rejectionReason}
                    </div>
                  )}
                </div>

                {/* Actions & Lifecycle Transitions (FR5, FR6, FR24) */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0">
                  {/* Edit Event Details (FR5) */}
                  <button
                    onClick={() => {
                      setEditingEvent(event);
                      setShowCreationModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit (FR5)</span>
                  </button>

                  {/* Submit for Approval if in draft or rejected */}
                  {(event.status === 'draft' || event.status === 'rejected') && (
                    <button
                      onClick={() => submitEventForApproval(event.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Approval</span>
                    </button>
                  )}

                  {/* Lifecycle Transitions (FR24) */}
                  {event.status === 'published' && (
                    <button
                      onClick={() => handleStateTransition(event, 'completed')}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  )}

                  {/* Archive Event (FR6) */}
                  {event.status !== 'archived' && event.status !== 'draft' && (
                    <button
                      onClick={() => archiveEvent(event.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Archive className="w-3.5 h-3.5 text-slate-500" />
                      <span>Archive</span>
                    </button>
                  )}

                  {/* Delete Draft Event (FR6) */}
                  {event.status === 'draft' && (
                    <button
                      onClick={() => {
                        if (confirm(`Permanently delete draft "${event.title}"?`)) {
                          deleteEvent(event.id);
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Creation / Edit Modal */}
      {showCreationModal && (
        <EventCreationModal
          initialEvent={editingEvent}
          onClose={() => {
            setShowCreationModal(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
};
