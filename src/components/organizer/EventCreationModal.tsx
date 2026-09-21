'use client';

import React, { useState, useEffect } from 'react';
import { useEvent } from '@/context/EventContext';
import { EventCategory, EventItem, ScheduleSession } from '@/types';
import {
  X,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface EventCreationModalProps {
  initialEvent?: EventItem | null;
  onClose: () => void;
}

export const EventCreationModal: React.FC<EventCreationModalProps> = ({
  initialEvent,
  onClose,
}) => {
  const { createDraftEvent, updateEvent, submitEventForApproval, venues, categories, addToast } =
    useEvent();

  const isEditing = !!initialEvent;

  const [title, setTitle] = useState(initialEvent?.title || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [category, setCategory] = useState<EventCategory>(initialEvent?.category || 'Technical');
  const [venueId, setVenueId] = useState(initialEvent?.venueId || (venues[0]?.id || 'ven-1'));
  const [startDate, setStartDate] = useState(
    initialEvent?.startDate ? initialEvent.startDate.split('T')[0] : '2026-11-15'
  );
  const [endDate, setEndDate] = useState(
    initialEvent?.endDate ? initialEvent.endDate.split('T')[0] : '2026-11-16'
  );
  const [deadline, setDeadline] = useState(
    initialEvent?.registrationDeadline ? initialEvent.registrationDeadline.split('T')[0] : '2026-11-10'
  );
  const [capacity, setCapacity] = useState(initialEvent?.capacity || 100);
  const [price, setPrice] = useState(initialEvent?.price || 0);
  const [bannerImage, setBannerImage] = useState(
    initialEvent?.bannerImage ||
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
  );
  const [tagsInput, setTagsInput] = useState(initialEvent?.tags?.join(', ') || 'Campus, Technical');

  // Schedule timeline builder state
  const [scheduleItems, setScheduleItems] = useState<ScheduleSession[]>(
    initialEvent?.scheduleTimeline || [
      { id: 's-1', time: '10:00 AM', title: 'Opening & Keynote Session', room: 'Main Stage' },
      { id: 's-2', time: '02:00 PM', title: 'Hands-on Interactive Lab', room: 'Lab Workstations' },
    ]
  );

  const handleAddScheduleItem = () => {
    const newItem: ScheduleSession = {
      id: `s-${Date.now()}`,
      time: '11:00 AM',
      title: 'New Activity Session',
      room: 'Main Venue',
    };
    setScheduleItems([...scheduleItems, newItem]);
  };

  const handleRemoveScheduleItem = (id: string) => {
    setScheduleItems(scheduleItems.filter((item) => item.id !== id));
  };

  const handleScheduleChange = (id: string, field: keyof ScheduleSession, value: string) => {
    setScheduleItems(
      scheduleItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (submitForApproval: boolean) => {
    if (!title.trim()) {
      addToast('Title Required', 'Please enter a valid event title.', 'error');
      return;
    }

    const selectedVenue = venues.find((v) => v.id === venueId) || venues[0];
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      venueId: selectedVenue.id,
      venueName: selectedVenue.name,
      building: selectedVenue.building,
      bannerImage,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      registrationDeadline: new Date(deadline).toISOString(),
      capacity: Number(capacity) || 50,
      price: Number(price) || 0,
      tags,
      scheduleTimeline: scheduleItems,
    };

    if (isEditing && initialEvent) {
      updateEvent(initialEvent.id, payload);
      if (submitForApproval && initialEvent.status === 'draft') {
        submitEventForApproval(initialEvent.id);
      }
    } else {
      const newId = createDraftEvent(payload as any);
      if (submitForApproval) {
        submitEventForApproval(newId);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0 bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Modify Event Details (FR5)' : 'Create New Campus Event (FR3)'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft your event specs, set capacity quotas, assign venues, and define session timelines.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-slate-700">Event Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Cloud Architecture Masterclass"
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Event Description *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline objectives, syllabus, target audience, and expected takeaways..."
              className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Venue & Capacity & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Assigned Venue *</label>
              <select
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (Cap: {v.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Maximum Capacity *</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Entry Fee (₹, 0 = Free) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Dates & Deadlines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Event Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Event End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Registration Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Banner URL & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Banner Image URL</label>
              <input
                type="text"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Workshop, Hands-on, AI"
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Schedule Timeline Builder (FR11) */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800">
                Event Agenda & Session Breakdown (FR11)
              </label>
              <button
                type="button"
                onClick={handleAddScheduleItem}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Session</span>
              </button>
            </div>

            <div className="space-y-2">
              {scheduleItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                >
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleScheduleChange(item.id, 'time', e.target.value)}
                      placeholder="e.g. 10:00 AM"
                      className="w-full p-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleScheduleChange(item.id, 'title', e.target.value)}
                      placeholder="Session Title"
                      className="w-full p-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={item.room || ''}
                      onChange={(e) => handleScheduleChange(item.id, 'room', e.target.value)}
                      placeholder="Room / Stage"
                      className="w-full p-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveScheduleItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save & Submit' : 'Submit for Approval'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
