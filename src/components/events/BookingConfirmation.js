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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden animate-fade-in">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4 animate-bounce">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed! 🎉</h2>
          <p className="text-lg opacity-90">We're excited to see you at the event!</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Confirmation Code */}
          <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-30 border-2 border-dashed border-yellow-400 dark:border-yellow-600 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Your Confirmation Code</p>
            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 tracking-wider">
              {booking.confirmationCode}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Please save this code. You'll need it for check-in.
            </p>
          </div>

          {/* Event Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Event Details</h3>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🎫</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Event</p>
                <p className="font-semibold text-gray-900 dark:text-white">{event.title}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Date & Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatDate(event.date)} at {formatTime(event.startTime)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Location</p>
                <p className="font-semibold text-gray-900 dark:text-white">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">👥</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Attendees</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {booking.attendeeInfo.numberOfAttendees} {booking.attendeeInfo.numberOfAttendees === 1 ? 'person' : 'people'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Contact Email</p>
                <p className="font-semibold text-gray-900 dark:text-white">{booking.attendeeInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>ℹ️</span>
              <span>Important Information</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>A confirmation email has been sent to {booking.attendeeInfo.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Please arrive 10 minutes before the event start time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Bring your confirmation code for check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>To cancel, please contact us at least 24 hours in advance</span>
              </li>
            </ul>
          </div>

          {/* What to Bring */}
          {event.requirements && event.requirements.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>🎒</span>
                <span>Don't Forget to Bring</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                {event.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 py-3 px-6 border border-green-500 text-green-600 dark:text-green-400 rounded-lg font-semibold transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-900 dark:hover:bg-opacity-30 flex items-center justify-center gap-2"
            >
              <span>📅</span>
              <span>Add to Calendar</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-200 hover:from-green-600 hover:to-blue-600 hover:shadow-lg"
            >
              Done
            </button>
          </div>

          {/* Footer Message */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p>Questions? Contact us at info@woodlandconservation.ca</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

