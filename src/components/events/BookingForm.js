import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDate, formatTime } from '../../utils/dateHelpers';

// Validation schema
const bookingSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'Must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9\s\-\+\(\)]+$/, 'Invalid phone number'),
  numberOfAttendees: yup.number().required('Number of attendees is required').min(1, 'At least 1 attendee').max(10, 'Maximum 10 attendees'),
  specialRequirements: yup.string(),
  agreedToTerms: yup.boolean().oneOf([true], 'You must agree to terms and conditions'),
});

const BookingForm = ({ event, onSubmit, onClose, submitting }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      numberOfAttendees: 1,
      agreedToTerms: false,
    },
  });

  const numberOfAttendees = watch('numberOfAttendees');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Book Your Spot</h2>
              <p className="text-sm opacity-90">{event.title}</p>
              <p className="text-sm opacity-75">
                {formatDate(event.date)} • {formatTime(event.startTime)}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={submitting}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('firstName')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="John"
                disabled={submitting}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('lastName')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Doe"
                disabled={submitting}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="john.doe@example.com"
              disabled={submitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Confirmation email will be sent to this address
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="(902) 555-0123"
              disabled={submitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Number of Attendees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Attendees <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                {...register('numberOfAttendees')}
                min="1"
                max={Math.min(10, event.spotsAvailable)}
                className={`w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.numberOfAttendees ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                disabled={submitting}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                (Max: {Math.min(10, event.spotsAvailable)} for this event)
              </span>
            </div>
            {errors.numberOfAttendees && (
              <p className="mt-1 text-sm text-red-500">{errors.numberOfAttendees.message}</p>
            )}
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Special Requirements (Optional)
            </label>
            <textarea
              {...register('specialRequirements')}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="E.g., wheelchair accessible, dietary restrictions, etc."
              disabled={submitting}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Let us know if you have any accessibility needs or special requests
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register('agreedToTerms')}
                className="mt-1 w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                disabled={submitting}
              />
              <div className="flex-1">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" className="text-green-600 dark:text-green-400 hover:underline">
                    terms and conditions
                  </a>{' '}
                  and understand the{' '}
                  <a href="/cancellation-policy" target="_blank" className="text-green-600 dark:text-green-400 hover:underline">
                    cancellation policy
                  </a>
                  . <span className="text-red-500">*</span>
                </label>
                {errors.agreedToTerms && (
                  <p className="mt-1 text-sm text-red-500">{errors.agreedToTerms.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-200 hover:from-green-600 hover:to-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

