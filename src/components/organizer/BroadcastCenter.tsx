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
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-400" />
            Announcement & Broadcast Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch urgent venue notices, schedule adjustments, and submission milestones directly to participant devices.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono self-start flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          Notification Service Active
        </span>
      </div>

      {/* Broadcast Composer Form */}
      <form onSubmit={handleBroadcast} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5 border border-rose-500/30">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-400" />
          <span>Compose New Broadcast Alert</span>
        </h3>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Announcement Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. ⚠️ VENUE UPDATE: Keynote Moved to Grand Ballroom C"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Broadcast Message Body <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={3}
            required
            placeholder="Write clear and actionable instructions for participants..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Priority */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
              className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="normal">Normal (Informational)</option>
              <option value="high">High (Time-sensitive)</option>
              <option value="critical">Critical (Immediate Alert)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
              className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
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
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Sender Identity</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="accent-indigo-500 rounded"
            />
            <span>Pin to top of participant dashboard</span>
          </label>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Publish Broadcast Now</span>
          </button>
        </div>
      </form>

      {/* Broadcast History */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Sent Broadcast History ({announcements.length})</h3>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      ann.priority === 'critical'
                        ? 'bg-rose-500/20 text-rose-300'
                        : ann.priority === 'high'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ann.priority}
                  </span>
                  <span className="font-semibold text-white">{ann.title}</span>
                </div>
                <p className="text-slate-300">{ann.message}</p>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">
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
