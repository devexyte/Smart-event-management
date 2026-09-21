'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { X, Star, MessageSquare, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  eventId: string;
  eventTitle: string;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  eventId,
  eventTitle,
  onClose,
}) => {
  const { submitFeedback } = useEvent();

  const [overallRating, setOverallRating] = useState(5);
  const [contentRating, setContentRating] = useState(5);
  const [venueRating, setVenueRating] = useState(5);
  const [organizationRating, setOrganizationRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(eventId, {
      rating: overallRating,
      contentRating,
      venueRating,
      organizationRating,
      reviewText: reviewText.trim() || 'No additional comments provided.',
    });
    onClose();
  };

  const renderStarSelector = (value: number, setValue: (v: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setValue(star)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Star
            className={`w-5 h-5 ${
              star <= value
                ? 'text-amber-500 fill-amber-500'
                : 'text-slate-300'
            }`}
          />
        </button>
      ))}
      <span className="text-xs text-slate-500 ml-2 font-mono">({value}/5)</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              Event Feedback & Rating
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">
              {eventTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Overall Rating */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <label className="font-semibold text-slate-800 block">Overall Experience Rating</label>
            {renderStarSelector(overallRating, setOverallRating)}
          </div>

          {/* Sub Criteria Ratings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="text-[11px] font-medium text-slate-600 block">Content Quality</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    onClick={() => setContentRating(s)}
                    className={`w-4 h-4 cursor-pointer ${
                      s <= contentRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="text-[11px] font-medium text-slate-600 block">Venue & Facilities</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    onClick={() => setVenueRating(s)}
                    className={`w-4 h-4 cursor-pointer ${
                      s <= venueRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="text-[11px] font-medium text-slate-600 block">Organization</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    onClick={() => setOrganizationRating(s)}
                    className={`w-4 h-4 cursor-pointer ${
                      s <= organizationRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Qualitative Review Comments */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 block">
              Written Feedback & Suggestions (Optional)
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What went well? Any areas where the organizers could improve next time?"
              className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
