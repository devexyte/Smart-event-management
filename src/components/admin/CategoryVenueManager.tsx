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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span>Campus Category & Venue Registry (FR21)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain authorized event classifications and campus physical facilities, capacities, and specs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('venues')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'venues'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Campus Venues ({venues.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
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
            <h3 className="text-sm font-bold text-slate-900">Registered Physical Venues</h3>
            <button
              onClick={() => handleOpenVenueModal()}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Campus Venue</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{venue.name}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      {venue.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{venue.building}</span>
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Max Capacity: <strong className="font-mono text-slate-900">{venue.capacity} seats</strong></span>
                  </div>

                  {venue.facilities && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {venue.facilities.map((fac, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenVenueModal(venue)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Edit Venue"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete venue "${venue.name}"?`)) deleteVenue(venue.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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
            <h3 className="text-sm font-bold text-slate-900">Event Classifications</h3>
            <button
              onClick={() => handleOpenCategoryModal()}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                    <span className="text-xs font-mono text-slate-500">
                      {cat.eventCount} Events
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenCategoryModal(cat)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove category "${cat.name}"?`)) deleteCategory(cat.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingVenue ? 'Edit Venue' : 'Create Campus Venue'}
              </h3>
              <button onClick={() => setShowVenueModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVenue} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Venue Name *</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. Dr. APJ Abdul Kalam Hall"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Building / Campus Location</label>
                <input
                  type="text"
                  value={venueBuilding}
                  onChange={(e) => setVenueBuilding(e.target.value)}
                  placeholder="e.g. Science & Technology Complex, 1st Floor"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Seating Capacity</label>
                <input
                  type="number"
                  value={venueCapacity}
                  onChange={(e) => setVenueCapacity(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Facilities (comma separated)</label>
                <input
                  type="text"
                  value={venueFacilities}
                  onChange={(e) => setVenueFacilities(e.target.value)}
                  placeholder="4K Projector, Surround Audio, Central AC"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVenueModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Category Name *</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Sports, Robotics"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Category scope..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
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
