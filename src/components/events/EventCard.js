import React from 'react';
import { motion } from 'framer-motion';
import { formatTime, getRelativeDate } from '../../utils/dateHelpers';
import { EVENT_CATEGORIES, DIFFICULTY_LEVELS } from '../../config/config';

const EventCard = ({ event, onBookNow, onLearnMore }) => {
  const category = EVENT_CATEGORIES[event.category] || EVENT_CATEGORIES['guided-tour'];
  const difficulty = DIFFICULTY_LEVELS[event.difficulty] || DIFFICULTY_LEVELS['easy'];

  const isFull = event.spotsAvailable === 0;
  const isAlmostFull = event.spotsAvailable > 0 && event.spotsAvailable <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden h-full flex flex-col group"
    >
      {/* Event Image */}
      <div className="relative h-56 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
        {event.imageUrl && (
          <motion.img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        {/* Category Badge with Glassmorphism */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute top-3 left-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-neutral-100 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg border border-white/20"
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.label}</span>
        </motion.div>

        {/* Status Badge */}
        {isFull && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
          >
            ⛔ Fully Booked
          </motion.div>
        )}
        {isAlmostFull && !isFull && (
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 0 rgba(255, 165, 0, 0)',
                '0 0 0 10px rgba(255, 165, 0, 0.2)',
                '0 0 0 0 rgba(255, 165, 0, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
          >
            🔥 Almost Full!
          </motion.div>
        )}

        {/* Enhanced Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />

        {/* Floating Particles Effect */}
        <motion.div
          className="absolute bottom-5 left-5 right-5 text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          {event.title.split(' ').slice(0, 3).join(' ')}...
        </motion.div>
      </div>

      {/* Event Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Date and Time */}
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm mb-3">
          <span>📅</span>
          <span className="font-semibold">{getRelativeDate(event.date)}</span>
          <span className="text-neutral-400">•</span>
          <span>{formatTime(event.startTime)}</span>
        </div>

        {/* Title */}
        <h3 className="heading-xs mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="body-base text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2.5 mb-5">
          {/* Capacity */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <span>👥</span>
              <span>Capacity</span>
            </span>
            <span className={`font-semibold ${isFull ? 'text-red-500' : isAlmostFull ? 'text-orange-500' : 'text-primary-600 dark:text-primary-400'}`}>
              {event.spotsAvailable}/{event.capacity} spots
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <span>📍</span>
              <span>Location</span>
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate ml-2">
              {event.location}
            </span>
          </div>

          {/* Difficulty */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <span>{difficulty.icon}</span>
              <span>Difficulty</span>
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {difficulty.label}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <motion.button
            onClick={() => onLearnMore(event)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 px-4 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl font-medium transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
          >
            Learn More
          </motion.button>
          <motion.button
            onClick={() => onBookNow(event)}
            disabled={isFull}
            whileHover={!isFull ? { scale: 1.02 } : {}}
            whileTap={!isFull ? { scale: 0.98 } : {}}
            className={`flex-1 py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 ${
              isFull
                ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-soft hover:shadow-soft-lg'
            }`}
          >
            {isFull ? 'Fully Booked' : 'Book Now'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;


/**
 * EventCard Component
 *
 * @file EventCard.js
 * @author Abdiaziz Muse (A00471783) - Events UI, booking flow integration
 * @description Displays a single event card with details, availability, and actions.
 */