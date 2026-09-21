'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import { Bookmark, Calendar, MapPin, Ticket, Eye, Trash2 } from 'lucide-react';

interface BookmarkedEventsViewProps {
  onOpenDetails: (event: any) => void;
  onNavigateToCatalogue: () => void;
}

export const BookmarkedEventsView: React.FC<BookmarkedEventsViewProps> = ({
  onOpenDetails,
  onNavigateToCatalogue,
}) => {
  const { events, currentUser, toggleBookmark, registerForEvent, registrations } = useEvent();

  const bookmarkedIds = new Set(currentUser.bookmarkedEventIds || []);
  const bookmarkedEvents = events.filter((e) => bookmarkedIds.has(e.id));

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
            <Bookmark className="w-6 h-6 text-amber-500" />
            <span>Saved & Bookmarked Events (FR19)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of upcoming campus events, seminars, and competitions you plan to register for.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          {bookmarkedEvents.length} Saved Event{bookmarkedEvents.length === 1 ? '' : 's'}
        </span>
      </div>

      {bookmarkedEvents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No saved events yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any event card in the catalogue to save it here for fast access.
          </p>
          <button
            onClick={onNavigateToCatalogue}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Explore Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookmarkedEvents.map((event) => {
            const isRegistered = registeredEventIds.has(event.id);

            return (
              <div
                key={event.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                    {event.category}
                  </span>

                  <button
                    onClick={() => toggleBookmark(event.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-amber-500 text-white shadow-md hover:bg-amber-600 transition-colors"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-white" />
                  </button>

                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/90 text-emerald-700 font-mono shadow-xs backdrop-blur-xs">
                      {event.price === 0 ? 'Free' : `₹${event.price}`}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="truncate">{event.venueName}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                    <button
                      onClick={() => onOpenDetails(event)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Details</span>
                    </button>

                    {isRegistered ? (
                      <span className="text-xs font-semibold text-emerald-600">
                        ✓ Registered
                      </span>
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
    </div>
  );
};
