'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { EventItem } from '@/types';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Users,
  AlertTriangle,
  Send,
  Eye,
  X,
} from 'lucide-react';
import { EventDetailModal } from '@/components/student/EventDetailModal';

export const EventApprovalsQueue: React.FC = () => {
  const { events, approveEvent, rejectEvent, addToast } = useEvent();

  const [inspectEvent, setInspectEvent] = useState<EventItem | null>(null);
  const [rejectingEvent, setRejectingEvent] = useState<EventItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Events awaiting admin review (FR4)
  const pendingEvents = events.filter((e) => e.status === 'pending_approval');
  const pastReviewedEvents = events.filter(
    (e) => e.status === 'published' || e.status === 'rejected'
  );

  const handleConfirmReject = () => {
    if (!rejectingEvent) return;
    if (!rejectionReason.trim()) {
      addToast('Reason Required', 'Please provide feedback explaining why the event was returned.', 'error');
      return;
    }
    rejectEvent(rejectingEvent.id, rejectionReason.trim());
    setRejectingEvent(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-amber-400" />
            <span>Event Approvals & Dean Oversight (FR4)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review proposed campus events, verify faculty safety standards and venue conflicts, and approve or reject submissions.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-right shrink-0">
          <span className="text-[11px] text-slate-400 block uppercase">Pending Review</span>
          <span className="text-xl font-mono font-bold text-amber-400">
            {pendingEvents.length} Events
          </span>
        </div>
      </div>

      {/* Pending Queue */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Pending Administrative Submissions ({pendingEvents.length})</span>
        </h3>

        {pendingEvents.length === 0 ? (
          <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-10 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-semibold text-sm text-white">All Clear!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              There are currently no events waiting in the approval queue. Organizers can submit drafts for dean review at any time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#131d31] border border-amber-500/30 rounded-2xl p-6 shadow-md space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Event Proposal Breakdown */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
                        {event.category}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono">
                        Submitted by: {event.organizerName}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                        {event.price === 0 ? 'Free Entry' : `Fee: ₹${event.price}`}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white truncate">
                      {event.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {event.venueName}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        Requested Capacity: {event.capacity} seats
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Actions (FR4) */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => setInspectEvent(event)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </button>

                    <button
                      onClick={() => approveEvent(event.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>

                    <button
                      onClick={() => {
                        setRejectingEvent(event);
                        setRejectionReason('');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject with Feedback</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Feedback Modal (FR4) */}
      {rejectingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131d31] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Return Submission for Revision</span>
              </h3>
              <button
                onClick={() => setRejectingEvent(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Specify reason for rejecting <strong className="text-white">{rejectingEvent.title}</strong>. This feedback will be sent back to the organizer.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Rejection Justification / Correction Required *
              </label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Schedule clashes with university mid-term exams; please adjust dates to after Nov 15th."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingEvent(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Event Modal */}
      {inspectEvent && (
        <EventDetailModal
          event={inspectEvent}
          onClose={() => setInspectEvent(null)}
          onRegister={() => {}}
          isRegistered={false}
        />
      )}
    </div>
  );
};
