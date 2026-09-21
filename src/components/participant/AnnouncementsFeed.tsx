'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { formatTimeAgo } from '@/lib/utils';
import {
  Bell,
  AlertTriangle,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Pin,
  Tag,
  Search,
} from 'lucide-react';
import { AnnouncementCategory } from '@/types';

export const AnnouncementsFeed: React.FC = () => {
  const { announcements } = useEvent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = announcements.filter((ann) => {
    if (selectedCategory !== 'all' && ann.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ann.title.toLowerCase().includes(q) ||
        ann.message.toLowerCase().includes(q) ||
        ann.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Announcements' },
    { id: 'venue', label: 'Venue Updates' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'submission', label: 'Submissions' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'general', label: 'General' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Live Event Announcements & Alerts
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time broadcasts from Ramnarain Ruia Autonomous College organizing committee.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono self-start">
          {announcements.length} Total Broadcasts
        </span>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl shadow-xs">
            <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-700">No announcements match this filter</h3>
          </div>
        ) : (
          filtered.map((ann) => {
            const isCritical = ann.priority === 'critical';
            const isHigh = ann.priority === 'high';

            let cardBorder = 'border-slate-200 bg-white';
            let priorityBadge = 'bg-slate-100 text-slate-600 border border-slate-200';

            if (isCritical) {
              cardBorder = 'border-rose-200 bg-rose-50/40';
              priorityBadge = 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse';
            } else if (isHigh) {
              cardBorder = 'border-amber-200 bg-amber-50/40';
              priorityBadge = 'bg-amber-100 text-amber-800 border border-amber-200';
            }

            return (
              <div
                key={ann.id}
                className={`p-5 sm:p-6 rounded-3xl border ${cardBorder} shadow-xs transition-all relative overflow-hidden`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {ann.pinned && (
                      <span className="p-1 rounded-lg bg-blue-100 text-blue-700" title="Pinned Announcement">
                        <Pin className="w-3.5 h-3.5" />
                      </span>
                    )}

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityBadge}`}>
                      {ann.priority}
                    </span>

                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-medium capitalize">
                      {ann.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 shrink-0">
                    {formatTimeAgo(ann.timestamp)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{ann.title}</h3>

                {/* Message */}
                <p className="text-xs text-slate-600 leading-relaxed break-words">{ann.message}</p>

                {/* Author Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Broadcast by: <strong className="text-slate-800">{ann.author}</strong></span>
                  <span className="font-mono text-[10px]">
                    {new Date(ann.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
