import React from 'react';
import { formatTime, getRelativeDate, formatDate } from '../../utils/dateHelpers';
import { EVENT_CATEGORIES, DIFFICULTY_LEVELS } from '../../config/config';

const EventDetails = ({ event, onClose, onProceedToBook }) => {
  if (!event) return null;

  const category = EVENT_CATEGORIES[event.category] || EVENT_CATEGORIES['guided-tour'];
  const difficulty = DIFFICULTY_LEVELS[event.difficulty] || DIFFICULTY_LEVELS['easy'];
  const isFull = event.spotsAvailable === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  {category.icon} {category.label}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  {difficulty.icon} {difficulty.label}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span>📅 {getRelativeDate(event.date)}</span>
                <span>🕐 {formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Event Image */}
          {event.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              About This Event
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-2xl">📍</span>
                <span className="font-semibold">Location</span>
              </div>
              <p className="text-gray-900 dark:text-white ml-8">{event.location}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-2xl">👥</span>
                <span className="font-semibold">Capacity</span>
              </div>
              <p className={`ml-8 font-bold ${isFull ? 'text-red-500' : 'text-green-500'}`}>
                {event.spotsAvailable} of {event.capacity} spots available
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-2xl">👶</span>
                <span className="font-semibold">Age Restriction</span>
              </div>
              <p className="text-gray-900 dark:text-white ml-8">{event.ageRestriction}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-2xl">💰</span>
                <span className="font-semibold">Price</span>
              </div>
              <p className="text-gray-900 dark:text-white ml-8 font-bold">
                {event.price === 0 ? 'Free' : `$${event.price}`}
              </p>
            </div>
          </div>

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>🎒</span>
                <span>What to Bring</span>
              </h3>
              <ul className="space-y-2">
                {event.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor Info */}
          {event.instructor && (
            <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>👨‍🏫</span>
                <span>Instructor</span>
              </h3>
              <div className="flex items-start gap-4">
                {event.instructor.photo && (
                  <img
                    src={event.instructor.photo}
                    alt={event.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    {event.instructor.name}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {event.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-6 rounded-b-2xl border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Close
            </button>
            <button
              onClick={() => onProceedToBook(event)}
              disabled={isFull}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:shadow-lg'
              }`}
            >
              {isFull ? 'Event is Full' : 'Proceed to Booking →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

