'use client';

import React, { useState } from 'react';
import { EventItem } from '@/types';
import { useEvent } from '@/context/EventContext';
import {
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Tag,
  Ticket,
  Send,
  Sparkles,
} from 'lucide-react';

interface EventDetailModalProps {
  event: EventItem;
  onClose: () => void;
  onRegister: () => void;
  isRegistered: boolean;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister,
  isRegistered,
}) => {
  const { addToast } = useEvent();
  const [queryMessage, setQueryMessage] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryMessage.trim()) return;
    addToast('Query Dispatched', `Your question was sent to organizer ${event.organizerContact.name}.`, 'success');
    setQueryMessage('');
    setShowContactForm(false);
  };

  const isFull = event.registeredCount >= event.capacity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#131d31] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-6">
        {/* Banner image header */}
        <div className="relative h-48 sm:h-64 shrink-0 overflow-hidden bg-slate-900">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131d31] via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header text badge */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-600 text-white shadow-sm">
                {event.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 drop-shadow-md">
                {event.title}
              </h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-base sm:text-xl font-bold text-emerald-400">
                {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Meta Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Schedule</span>
                <span className="font-semibold text-slate-200">
                  {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block uppercase">Venue</span>
                <span className="font-semibold text-slate-200 truncate block">
                  {event.venueName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Capacity</span>
                <span className="font-semibold text-slate-200">
                  {event.registeredCount} / {event.capacity} seats ({Math.round((event.registeredCount / event.capacity) * 100)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Event Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Schedule Agenda Timeline (FR11) */}
          {event.scheduleTimeline && event.scheduleTimeline.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
                Activity Schedule & Timeline
              </h3>
              <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80 bg-slate-900/60">
                {event.scheduleTimeline.map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-200">{item.title}</p>
                        {item.description && <p className="text-slate-400 mt-0.5">{item.description}</p>}
                        {item.speaker && (
                          <p className="text-[11px] text-blue-300 mt-1">Speaker: {item.speaker}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="font-mono text-slate-400 block">{item.time}</span>
                      {item.room && <span className="text-[11px] text-slate-500 block">{item.room}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organizer Contact Channel (FR13) */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Event Organizer Contact (FR13)
                </span>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">
                  {event.organizerContact?.name || event.organizerName}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {event.organizerContact?.email || 'events@ruiacollege.edu'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {event.organizerContact?.phone || '+91 98000 00000'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {event.organizerContact?.department || 'Campus Affairs'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shrink-0"
              >
                {showContactForm ? 'Hide Form' : 'Send Participant Query'}
              </button>
            </div>

            {showContactForm && (
              <form onSubmit={handleSendQuery} className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                <textarea
                  rows={2}
                  value={queryMessage}
                  onChange={(e) => setQueryMessage(e.target.value)}
                  placeholder="Type your question regarding venue, eligibility, or equipment..."
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Submit Query</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1527] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Close
          </button>

          {isRegistered ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>You are already registered for this event</span>
            </div>
          ) : isFull ? (
            <span className="text-xs text-rose-400 font-semibold">
              Registration Closed (Capacity Full)
            </span>
          ) : (
            <button
              onClick={() => {
                onRegister();
                onClose();
              }}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Register Now {event.price > 0 ? `(₹${event.price})` : '(Free)'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
