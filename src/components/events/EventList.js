/**
 * EventList Component
 *
 * @file EventList.js
 * @author Abdiaziz Muse (A00471783) - Events UI, booking flow integration
 * @description Displays a grid of event cards with loading skeletons and empty state.
 */

import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, onBookNow, onLearnMore, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-300 dark:bg-gray-700" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          No Events Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or check back later for new events.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onBookNow={onBookNow}
          onLearnMore={onLearnMore}
        />
      ))}
    </div>
  );
};

export default EventList;