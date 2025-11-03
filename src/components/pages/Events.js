// Author: Implementation of Events & Booking System
// Purpose: Main events page displaying all conservation area events with booking functionality

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventService from '../../services/eventService';
import EventFilters from '../events/EventFilters';
import EventList from '../events/EventList';
import EventDetails from '../events/EventDetails';
import BookingForm from '../events/BookingForm';
import BookingConfirmation from '../events/BookingConfirmation';

const Events = () => {
  // State management
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    date: 'upcoming',
    search: '',
  });

  // Modal states
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch events on component mount and when filters change
  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.getEvents(filters);
      setEvents(response.events || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLearnMore = (event) => {
    setSelectedEvent(event);
    setShowDetails(true);
  };

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setShowDetails(false);
    setShowBookingForm(true);
  };

  const handleProceedToBook = (event) => {
    setShowDetails(false);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (attendeeInfo) => {
    try {
      setSubmitting(true);
      const response = await eventService.createBooking(selectedEvent.id, attendeeInfo);

      if (response.success) {
        setCurrentBooking(response.booking);
        setShowBookingForm(false);
        setShowConfirmation(true);
        toast.success('Booking confirmed! Check your email for details.');

        // Refresh events to update capacity
        fetchEvents();
      } else {
        toast.error(response.error || 'Booking failed');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      const errorMessage = err.response?.data?.error || 'Failed to create booking. Please try again.';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedEvent(null);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    if (!showConfirmation) {
      setSelectedEvent(null);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedEvent(null);
    setCurrentBooking(null);
  };

  return (
    <div className="min-h-screen bg-yellow-100 dark:bg-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Events & Activities
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Join us for exciting conservation events, educational workshops, and outdoor adventures
            at St. Margaret's Bay Woodland Conservation Area
          </p>
        </div>

        {/* Filters */}
        <EventFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Events Count */}
        {!loading && !error && (
          <div className="mb-6 text-gray-700 dark:text-gray-300">
            <p className="text-lg">
              {events.length === 0 ? (
                'No events found'
              ) : (
                <>
                  Showing <span className="font-bold">{events.length}</span>{' '}
                  {events.length === 1 ? 'event' : 'events'}
                </>
              )}
            </p>
          </div>
        )}

        {/* Events List */}
        <EventList
          events={events}
          onBookNow={handleBookNow}
          onLearnMore={handleLearnMore}
          loading={loading}
        />

        {/* Event Details Modal */}
        {showDetails && selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onClose={handleCloseDetails}
            onProceedToBook={handleProceedToBook}
          />
        )}

        {/* Booking Form Modal */}
        {showBookingForm && selectedEvent && (
          <BookingForm
            event={selectedEvent}
            onSubmit={handleBookingSubmit}
            onClose={handleCloseBookingForm}
            submitting={submitting}
          />
        )}

        {/* Booking Confirmation Modal */}
        {showConfirmation && currentBooking && selectedEvent && (
          <BookingConfirmation
            booking={currentBooking}
            event={selectedEvent}
            onClose={handleCloseConfirmation}
          />
        )}

        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Additional Info Section */}
        {!loading && events.length > 0 && (
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Event Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>📋</span>
                  <span>Registration</span>
                </h3>
                <p className="text-sm">
                  All events are free and open to the public. Registration is required for
                  capacity management and safety.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>❌</span>
                  <span>Cancellation</span>
                </h3>
                <p className="text-sm">
                  Please cancel at least 24 hours in advance if you can't attend. This helps
                  others join from the waitlist.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>📞</span>
                  <span>Contact</span>
                </h3>
                <p className="text-sm">
                  Questions about an event? Email us at info@woodlandconservation.ca or call
                  (902) 555-0100.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

