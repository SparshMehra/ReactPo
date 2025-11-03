import React from 'react';
import { formatDate, formatTime, getRelativeDate } from '../../utils/dateHelpers';
import { EVENT_CATEGORIES, DIFFICULTY_LEVELS } from '../../config/config';

const EventCard = ({ event, onBookNow, onLearnMore }) => {
  const category = EVENT_CATEGORIES[event.category] || EVENT_CATEGORIES['guided-tour'];
  const difficulty = DIFFICULTY_LEVELS[event.difficulty] || DIFFICULTY_LEVELS['easy'];

  const isFull = event.spotsAvailable === 0;
  const isAlmostFull = event.spotsAvailable > 0 && event.spotsAvailable <= 5;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500">
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        {/* Category Badge */}
        <div className={`absolute top-3 left-3 bg-${category.color}-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </div>

        {/* Status Badge */}
        {isFull && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Fully Booked
          </div>
        )}
        {isAlmostFull && !isFull && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            Almost Full!
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-5">
        {/* Date and Time */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm mb-2">
          <span>📅</span>
          <span className="font-semibold">{getRelativeDate(event.date)}</span>
          <span className="text-gray-400">•</span>
          <span>{formatTime(event.startTime)}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Capacity */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>👥</span>
              <span>Capacity</span>
            </span>
            <span className={`font-semibold ${isFull ? 'text-red-500' : isAlmostFull ? 'text-orange-500' : 'text-green-500'}`}>
              {event.spotsAvailable}/{event.capacity} spots
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>📍</span>
              <span>Location</span>
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-200 truncate ml-2">
              {event.location}
            </span>
          </div>

          {/* Difficulty */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>{difficulty.icon}</span>
              <span>Difficulty</span>
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {difficulty.label}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onLearnMore(event)}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Learn More
          </button>
          <button
            onClick={() => onBookNow(event)}
            disabled={isFull}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isFull
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:shadow-lg'
            }`}
          >
            {isFull ? 'Fully Booked' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

