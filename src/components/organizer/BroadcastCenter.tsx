'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Radio,
  Send,
  AlertTriangle,
  Bell,
  MapPin,
  Clock,
  Pin,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { AnnouncementCategory, AnnouncementPriority } from '@/types';
import { formatTimeAgo } from '@/lib/utils';

export const BroadcastCenter: React.FC = () => {
  const { announcements, publishAnnouncement, addToast } = useEvent();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<AnnouncementPriority>('normal');
  const [category, setCategory] = useState<AnnouncementCategory>('general');
  const [author, setAuthor] = useState('Vikram Malhotra (Lead Organizer)');
  const [isPinned, setIsPinned] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      addToast('Fields Required', 'Please enter a title and message for the announcement.', 'error');
      return;
    }

    publishAnnouncement({
      title: title.trim(),
      message: message.trim(),
      priority,
      category,
      author: author.trim() || 'TechNova Organizing Committee',
      pinned: isPinned,
    });

    setTitle('');
    setMessage('');
    setIsPinned(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-blue-600" />
            Announcement & Broadcast Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dispatch urgent venue notices, schedule adjustments, and submission milestones directly to participant devices.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono self-start flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          Notification Service Active
        </span>
      </div>

      {/* Broadcast Composer Form */}
      <form onSubmit={handleBroadcast} className="bg-white p-6 sm:p-8 rounded-3xl space-y-5 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Compose New Broadcast Alert</span>
        </h3>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Announcement Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. ⚠️ VENUE UPDATE: Keynote Moved to Grand Ballroom C"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Broadcast Message Body <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            required
            placeholder="Write clear and actionable instructions for participants..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Priority */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="normal">Normal (Informational)</option>
              <option value="high">High (Time-sensitive)</option>
              <option value="critical">Critical (Immediate Alert)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="general">General</option>
              <option value="venue">Venue Update</option>
              <option value="schedule">Schedule Shift</option>
              <option value="submission">Submission Reminder</option>
              <option value="mentorship">Mentorship</option>
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Sender Identity</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Pin to top of participant dashboard</span>
          </label>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Publish Broadcast Now</span>
          </button>
        </div>
      </form>

      {/* Broadcast History */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-slate-900">Sent Broadcast History ({announcements.length})</h3>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      ann.priority === 'critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : ann.priority === 'high'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {ann.priority}
                  </span>
                  <span className="font-semibold text-slate-900">{ann.title}</span>
                </div>
                <p className="text-slate-600">{ann.message}</p>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">
                  By: {ann.author} • {formatTimeAgo(ann.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
