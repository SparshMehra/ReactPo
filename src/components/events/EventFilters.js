/**
 * EventFilters Component
 *
 * @file EventFilters.js
 * @author Abdiaziz Muse (A00471783)
 * @description Filter panel for event listings with category, date, and search filters.
 *              Includes debounced search input and active filter indicators.
 *
 * Features:
 * - Category dropdown with all event types
 * - Date filter (upcoming, past, all)
 * - Debounced search input (500ms delay)
 * - Active filter badges with clear buttons
 * - Responsive grid layout
 * - Dark mode support
 *
 * @param {Object} filters - Current filter state object
 * @param {Function} onFilterChange - Callback when filters are updated
 * @returns {JSX.Element} Event filters panel
 */

import React, { useState } from 'react';
import { EVENT_CATEGORIES } from '../../config/config';

const EventFilters = ({ filters, onFilterChange }) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Debounce search
    const timeoutId = setTimeout(() => {
      onFilterChange({ ...filters, search: value });
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
              <option key={key} value={key}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <select
            value={filters.date || 'upcoming'}
            onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Dates</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past Events</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.category !== 'all' || filters.search) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>

          {filters.category && filters.category !== 'all' && (
            <button
              onClick={() => onFilterChange({ ...filters, category: 'all' })}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              <span>{EVENT_CATEGORIES[filters.category]?.label}</span>
              <span className="font-bold">×</span>
            </button>
          )}

          {filters.search && (
            <button
              onClick={() => {
                setSearchInput('');
                onFilterChange({ ...filters, search: '' });
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <span>"{filters.search}"</span>
              <span className="font-bold">×</span>
            </button>
          )}

          <button
            onClick={() => {
              setSearchInput('');
              onFilterChange({ category: 'all', date: 'upcoming', search: '' });
            }}
            className="text-sm text-red-600 dark:text-red-400 hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;

