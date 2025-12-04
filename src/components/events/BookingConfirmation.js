/**
 * BookingForm Component
 *
 * @file BookingConfirmation.js
 * @author Abdiaziz Muse (A00471783)
 * @description Modal confirmation dialog shown after successful booking. Includes attendee details, event summary, and add-to-calendar action.
 *               Displays confirmation code, reminders, and action buttons.
 */
import React from 'react';
import { formatDate, formatTime } from '../../utils/dateHelpers';

const BookingConfirmation = ({ booking, event, onClose }) => {
  const handleAddToCalendar = () => {
    // Create iCal format
    const eventDate = event.date.replace(/-/g, '');
    const startTime = event.startTime.replace(':', '') + '00';
    const endTime = event.endTime.replace(':', '') + '00';

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate}T${startTime}
DTEND:${eventDate}T${endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `event-${booking.confirmationCode}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full my-8 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
        {/* Success Header */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, transparent 10%, rgba(255,255,255,0.1) 20%)'
          }}></div>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-3 animate-bounce">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-1">Booking Confirmed! 🎉</h2>
            <p className="text-sm opacity-90">See you at the event!</p>
            <p className="text-xs opacity-80 mt-2 bg-white bg-opacity-20 rounded-full px-3 py-1 inline-block">
              📧 You'll receive a confirmation email in ~10 seconds
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Confirmation Code */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900 dark:to-amber-900 dark:bg-opacity-30 border-2 border-dashed border-yellow-400 dark:border-yellow-600 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-semibold">Confirmation Code</p>
            <p className="text-3xl font-black text-yellow-600 dark:text-yellow-400 tracking-wider">
              {booking.confirmationCode}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Save this code for check-in
            </p>
          </div>

          {/* Event Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4 space-y-2.5">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span>📋</span> Event Details
            </h3>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🎫</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">{event.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">📅</span>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {formatDate(event.date)} • {formatTime(event.startTime)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">📍</span>
              <p className="font-medium text-gray-700 dark:text-gray-200">{event.location}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">👥</span>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {booking.attendeeInfo.numberOfAttendees} {booking.attendeeInfo.numberOfAttendees === 1 ? 'person' : 'people'}
              </p>
            </div>
          </div>

          {/* Important Info - Compact */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 dark:bg-opacity-30 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
              <span>ℹ️</span> Quick Reminders
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5 text-sm">✓</span>
                <span>Confirmation email sent to {booking.attendeeInfo.email} (check inbox in ~10 sec)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5 text-sm">✓</span>
                <span>Arrive 10 min early with your code</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5 text-sm">✓</span>
                <span>Cancel 24h in advance if needed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <button
            onClick={handleAddToCalendar}
            className="flex-1 py-2.5 px-4 border-2 border-green-500 text-green-600 dark:text-green-400 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-30 flex items-center justify-center gap-2"
          >
            <span>📅</span>
            <span>Add to Calendar</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-lg font-bold text-sm transition-all duration-200 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 hover:shadow-lg"
          >
            Done ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

