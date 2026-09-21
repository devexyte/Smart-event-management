'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { EventItem, EventCategory } from '@/types';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Bookmark,
  Ticket,
  CheckCircle2,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  X,
  Sparkles,
} from 'lucide-react';
import { EventDetailModal } from './EventDetailModal';

export const EventCatalogue: React.FC = () => {
  const {
    events,
    categories,
    venues,
    currentUser,
    registrations,
    registerForEvent,
    toggleBookmark,
  } = useEvent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [activeDetailEvent, setActiveDetailEvent] = useState<EventItem | null>(null);

  // User registrations set for quick lookup
  const registeredEventIds = new Set(
    registrations
      .filter((r) => r.studentId === currentUser.id && r.status !== 'cancelled')
      .map((r) => r.eventId)
  );

  const bookmarkedEventIds = new Set(currentUser.bookmarkedEventIds || []);

  // Filter only published or ongoing events for student catalogue (FR7)
  const publishedEvents = events.filter(
    (e) => e.status === 'published' || e.status === 'ongoing'
  );

  const filteredEvents = publishedEvents.filter((event) => {
    // Category filter
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;

    // Venue filter
    if (selectedVenue !== 'all' && event.venueId !== selectedVenue) return false;

    // Price filter
    if (selectedPriceFilter === 'free' && event.price > 0) return false;
    if (selectedPriceFilter === 'paid' && event.price === 0) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = event.title.toLowerCase().includes(q);
      const matchDesc = event.description.toLowerCase().includes(q);
      const matchVenue = event.venueName.toLowerCase().includes(q);
      const matchTags = event.tags?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchVenue || matchTags;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Campus Event Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore academic symposiums, competitive hackathons, hands-on workshops, and campus cultural fests.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 block">Available Events</span>
            <span className="text-xl font-bold text-slate-900 font-mono">
              {filteredEvents.length} / {publishedEvents.length}
            </span>
          </div>
        </div>

        {/* Search & Filter Bar (FR7) */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Keyword Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, technology, topic, or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Venue Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            >
              <option value="all">All Campus Venues</option>
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedPriceFilter}
              onChange={(e) => setSelectedPriceFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free Events Only</option>
              <option value="paid">Paid Workshops & Summits</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-medium text-[11px] shrink-0 uppercase tracking-wider">
            Categories:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Events
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No matching events found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or resetting your venue and category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedVenue('all');
              setSelectedPriceFilter('all');
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((event) => {
            const isRegistered = registeredEventIds.has(event.id);
            const isBookmarked = bookmarkedEventIds.has(event.id);
            const isFull = event.registeredCount >= event.capacity;
            const capacityPercentage = Math.min(
              100,
              Math.round((event.registeredCount / event.capacity) * 100)
            );

            return (
              <div
                key={event.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col group"
              >
                {/* Banner Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-600/95 text-white shadow-xs backdrop-blur-sm">
                    {event.category}
                  </span>

                  {/* Bookmark Button (FR19) */}
                  <button
                    onClick={() => toggleBookmark(event.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white shadow-xs'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Save event'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/95 text-emerald-700 font-mono shadow-xs">
                      {event.price === 0 ? 'Free' : `₹${event.price}`}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{event.venueName}</span>
                    </div>

                    {/* Capacity Meter */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span>Capacity: {event.registeredCount} / {event.capacity} seats</span>
                        <span className="font-mono">{capacityPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            capacityPercentage >= 90
                              ? 'bg-rose-500'
                              : capacityPercentage >= 70
                              ? 'bg-amber-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${capacityPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveDetailEvent(event)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    {isRegistered ? (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Registered</span>
                      </span>
                    ) : isFull ? (
                      <span className="text-[11px] text-rose-600 font-medium">Full</span>
                    ) : (
                      <button
                        onClick={() => registerForEvent(event.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Register</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Details Modal */}
      {activeDetailEvent && (
        <EventDetailModal
          event={activeDetailEvent}
          onClose={() => setActiveDetailEvent(null)}
          onRegister={() => registerForEvent(activeDetailEvent.id)}
          isRegistered={registeredEventIds.has(activeDetailEvent.id)}
        />
      )}
    </div>
  );
};
