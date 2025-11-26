/**
 * BookingForm Component
 *
 * @file BookingForm.js
 * @author Abdiaziz Muse (A00471783)
 * @description Modal booking form with validation for event registration.
 *              Includes form validation, error handling, and attendee information collection.
 *
 * Features:
 * - React Hook Form integration with Yup validation
 * - Required fields: first name, last name, email, phone, number of attendees
 * - Optional special requirements field
 * - Real-time validation with error messages
 * - Submit loading state
 * - Modal overlay with backdrop blur
 * - Event details summary in header
 * - Responsive design
 *
 * @param {Object} event - Event object for booking
 * @param {Function} onSubmit - Callback with attendee information
 * @param {Function} onClose - Callback to close modal
 * @param {boolean} submitting - Loading state for form submission
 * @returns {JSX.Element} Booking form modal
 */

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDate, formatTime } from '../../utils/dateHelpers';

// Validation schema
const bookingSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'Must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9\s\-+()]+$/, 'Invalid phone number'),
  numberOfAttendees: yup.number().required('Number of attendees is required').min(1, 'At least 1 attendee').max(10, 'Maximum 10 attendees'),
  specialRequirements: yup.string(),
  agreedToTerms: yup.boolean().oneOf([true], 'You must agree to terms and conditions'),
});

const BookingForm = ({ event, onSubmit, onClose, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      numberOfAttendees: 1,
      agreedToTerms: false,
    },
  });


  const handleFormSubmit = (data) => {
    onSubmit({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      numberOfAttendees: parseInt(data.numberOfAttendees),
      specialRequirements: data.specialRequirements || '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, transparent 10%, rgba(255,255,255,0.1) 20%)'
          }}></div>
          <div className="relative flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-1">Book Your Spot 🎉</h2>
              <p className="text-sm opacity-90 font-medium">{event.title}</p>
              <p className="text-xs opacity-75 mt-1">
                {formatDate(event.date)} • {formatTime(event.startTime)}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={submitting}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('firstName')}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="John"
                disabled={submitting}
              />
              {errors.firstName && (
                <p className="mt-0.5 text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('lastName')}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Doe"
                disabled={submitting}
              />
              {errors.lastName && (
                <p className="mt-0.5 text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="john.doe@example.com"
                disabled={submitting}
              />
              {errors.email && (
                <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register('phone')}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="(902) 555-0123"
                disabled={submitting}
              />
              {errors.phone && (
                <p className="mt-0.5 text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Number of Attendees */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Attendees <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('numberOfAttendees')}
              min="1"
              max={Math.min(10, event.spotsAvailable)}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all ${
                errors.numberOfAttendees ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              disabled={submitting}
            />
            {errors.numberOfAttendees && (
              <p className="mt-0.5 text-xs text-red-500">{errors.numberOfAttendees.message}</p>
            )}
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Special Requirements (Optional)
            </label>
            <textarea
              {...register('specialRequirements')}
              rows="2"
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all"
              placeholder="Any special needs?"
              disabled={submitting}
            />
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register('agreedToTerms')}
                className="mt-0.5 w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                disabled={submitting}
              />
              <div className="flex-1">
                <label className="text-xs text-gray-700 dark:text-gray-300">
                  I agree to the terms & cancellation policy <span className="text-red-500">*</span>
                </label>
                {errors.agreedToTerms && (
                  <p className="mt-0.5 text-xs text-red-500">{errors.agreedToTerms.message}</p>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons - Fixed at bottom */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex-1 py-2.5 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            onClick={handleSubmit(handleFormSubmit)}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-lg font-bold text-sm transition-all duration-200 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Confirm Booking</span>
                <span>✓</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

