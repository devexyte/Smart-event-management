'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { EventItem } from '@/types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  Eye,
} from 'lucide-react';
import { EventDetailModal } from './EventDetailModal';
import { EventRegistrationModal } from './EventRegistrationModal';

export const EventCalendarView: React.FC = () => {
  const { events, registerForEvent, registrations, currentUser } = useEvent();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeEventModal, setActiveEventModal] = useState<EventItem | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);

  // Filter published events and sort by date ascending
  const publishedEvents = events
    .filter((e) => e.status === 'published' || e.status === 'ongoing')
    .filter((e) => (selectedCategory === 'all' ? true : e.category === selectedCategory))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const registeredEventIds = new Set(
    registrations
      .filter((r) => r.studentId === currentUser.id && r.status !== 'cancelled')
      .map((r) => r.eventId)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
            <span>Event Calendar & Schedule Timeline</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological schedule of all official campus dates, session breakdowns, stages, and activity timelines.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
          >
            <option value="all">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Workshop">Workshops</option>
            <option value="Seminar">Seminars</option>
            <option value="Cultural">Cultural</option>
            <option value="Academic">Academic</option>
          </select>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-32 before:w-0.5 before:bg-slate-200">
        {publishedEvents.map((event) => {
          const eventDate = new Date(event.startDate);
          const dateLabel = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          const dayLabel = eventDate.toLocaleDateString('en-US', {
            weekday: 'short',
          });
          const yearLabel = eventDate.getFullYear();

          return (
            <div key={event.id} className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 items-start group">
              {/* Date Stamp Marker (Desktop) */}
              <div className="hidden sm:flex flex-col items-end w-24 shrink-0 text-right pr-4 pt-1">
                <span className="text-sm font-extrabold text-blue-600 font-mono uppercase">
                  {dateLabel}
                </span>
                <span className="text-xs text-slate-500 font-medium">{dayLabel}, {yearLabel}</span>
              </div>

              {/* Timeline Bullet Node */}
              <div className="absolute left-4 sm:left-32 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 z-10 group-hover:scale-125 transition-transform shadow-xs" />

              {/* Event Content Card */}
              <div className="ml-8 sm:ml-0 flex-1 bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {event.category}
                      </span>
                      <span className="text-xs text-emerald-600 font-mono font-semibold">
                        {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveEventModal(event)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium self-start sm:self-auto transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Sessions</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {event.venueName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    {event.registeredCount} / {event.capacity} Registered
                  </span>
                </div>

                {/* Agenda Snippet */}
                {event.scheduleTimeline && event.scheduleTimeline.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Scheduled Sessions:
                    </span>
                    <div className="space-y-1.5">
                      {event.scheduleTimeline.slice(0, 3).map((session, sIdx) => (
                        <div key={session.id || sIdx} className="flex items-start justify-between text-xs gap-2">
                          <div className="flex items-center gap-2 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span className="font-medium">{session.title}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 shrink-0">
                            {session.time}
                          </span>
                        </div>
                      ))}
                      {event.scheduleTimeline.length > 3 && (
                        <p className="text-[10px] text-blue-600 font-medium pt-1">
                          + {event.scheduleTimeline.length - 3} more sessions in detailed schedule
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {activeEventModal && (
        <EventDetailModal
          event={activeEventModal}
          onClose={() => setActiveEventModal(null)}
          onRegister={() => setRegisteringEvent(activeEventModal)}
          isRegistered={registeredEventIds.has(activeEventModal.id)}
        />
      )}

      {/* Event Registration & Payment Modal */}
      <EventRegistrationModal
        event={registeringEvent}
        isOpen={!!registeringEvent}
        onClose={() => setRegisteringEvent(null)}
      />
    </div>
  );
};
