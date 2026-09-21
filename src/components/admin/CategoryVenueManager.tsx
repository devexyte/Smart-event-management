'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import { CategoryItem, VenueItem } from '@/types';
import {
  Building2,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Layers,
  MapPin,
  Users,
  X,
} from 'lucide-react';

export const CategoryVenueManager: React.FC = () => {
  const {
    categories,
    venues,
    createOrUpdateVenue,
    deleteVenue,
    createOrUpdateCategory,
    deleteCategory,
    addToast,
  } = useEvent();

  const [activeTab, setActiveTab] = useState<'venues' | 'categories'>('venues');

  // Venue form state
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<VenueItem | null>(null);
  const [venueName, setVenueName] = useState('');
  const [venueBuilding, setVenueBuilding] = useState('');
  const [venueCapacity, setVenueCapacity] = useState(100);
  const [venueFacilities, setVenueFacilities] = useState('');

  // Category form state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleOpenVenueModal = (venue?: VenueItem) => {
    if (venue) {
      setEditingVenue(venue);
      setVenueName(venue.name);
      setVenueBuilding(venue.building);
      setVenueCapacity(venue.capacity);
      setVenueFacilities(venue.facilities.join(', '));
    } else {
      setEditingVenue(null);
      setVenueName('');
      setVenueBuilding('');
      setVenueCapacity(100);
      setVenueFacilities('Central AC, Audio PA, Projector');
    }
    setShowVenueModal(true);
  };

  const handleSaveVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venueName.trim()) {
      addToast('Name Required', 'Please provide a venue name.', 'error');
      return;
    }

    const payload: VenueItem = {
      id: editingVenue ? editingVenue.id : `ven-${Date.now()}`,
      name: venueName.trim(),
      building: venueBuilding.trim() || 'Central Campus Block',
      capacity: Number(venueCapacity) || 100,
      facilities: venueFacilities.split(',').map((f) => f.trim()).filter(Boolean),
      status: 'available',
    };

    createOrUpdateVenue(payload);
    setShowVenueModal(false);
  };

  const handleOpenCategoryModal = (cat?: CategoryItem) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryName(cat.name);
      setCategoryDescription(cat.description);
    } else {
      setEditingCategory(null);
      setCategoryName('');
      setCategoryDescription('');
    }
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      addToast('Name Required', 'Please enter a category name.', 'error');
      return;
    }

    const payload: CategoryItem = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: categoryName.trim(),
      description: categoryDescription.trim() || 'Campus events category.',
      icon: 'Tag',
      color: '#2563eb',
      eventCount: editingCategory ? editingCategory.eventCount : 0,
    };

    createOrUpdateCategory(payload);
    setShowCategoryModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#131d31] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-amber-400" />
            <span>Campus Category & Venue Registry (FR21)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain authorized event classifications and campus physical facilities, capacities, and specs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('venues')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'venues'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Campus Venues ({venues.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Event Categories ({categories.length})
          </button>
        </div>
      </div>

      {/* VENUES VIEW */}
      {activeTab === 'venues' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Registered Physical Venues</h3>
            <button
              onClick={() => handleOpenVenueModal()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Campus Venue</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-[#131d31] border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-white">{venue.name}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      {venue.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{venue.building}</span>
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>Max Capacity: <strong className="font-mono text-white">{venue.capacity} seats</strong></span>
                  </div>

                  {venue.facilities && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {venue.facilities.map((fac, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenVenueModal(venue)}
                    className="p-1.5 text-slate-400 hover:text-white"
                    title="Edit Venue"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete venue "${venue.name}"?`)) deleteVenue(venue.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                    title="Delete Venue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORIES VIEW */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Event Classifications</h3>
            <button
              onClick={() => handleOpenCategoryModal()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#131d31] border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{cat.name}</span>
                    <span className="text-xs font-mono text-slate-400">
                      {cat.eventCount} Events
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenCategoryModal(cat)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove category "${cat.name}"?`)) deleteCategory(cat.id);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Venue Modal */}
      {showVenueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131d31] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingVenue ? 'Edit Venue' : 'Create Campus Venue'}
              </h3>
              <button onClick={() => setShowVenueModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVenue} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Venue Name *</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. Dr. APJ Abdul Kalam Hall"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Building / Campus Location</label>
                <input
                  type="text"
                  value={venueBuilding}
                  onChange={(e) => setVenueBuilding(e.target.value)}
                  placeholder="e.g. Science & Technology Complex, 1st Floor"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Seating Capacity</label>
                <input
                  type="number"
                  value={venueCapacity}
                  onChange={(e) => setVenueCapacity(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Facilities (comma separated)</label>
                <input
                  type="text"
                  value={venueFacilities}
                  onChange={(e) => setVenueFacilities(e.target.value)}
                  placeholder="4K Projector, Surround Audio, Central AC"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVenueModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                >
                  Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131d31] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Category Name *</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Sports, Robotics"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Description</label>
                <textarea
                  rows={2}
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Category scope..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
