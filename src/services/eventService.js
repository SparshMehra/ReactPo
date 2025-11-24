/**
 * Event Service
 *
 * @file eventService.js
 * @author Abdiaziz Muse (A00471783) - Events/booking integration and API wiring
 * @description Axios-based client for events and bookings API used by the React app.
 */
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Event Service - Handles all API calls related to events and bookings
 */
const eventService = {
  /**
   * Get all events with optional filters
   * @param {Object} filters - Filter options (category, date, status, search)
   * @returns {Promise} Array of events
   */
  async getEvents(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.date) {
        params.append('date', filters.date);
      }
      if (filters.status) {
        params.append('status', filters.status);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }

      const response = await api.get(`/api/events?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  /**
   * Get single event by ID
   * @param {string} eventId - Event ID
   * @returns {Promise} Event object
   */
  async getEventById(eventId) {
    try {
      const response = await api.get(`/api/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  /**
   * Create a new booking
   * @param {string} eventId - Event ID
   * @param {Object} attendeeInfo - Attendee information
   * @returns {Promise} Booking object with confirmation code
   */
  async createBooking(eventId, attendeeInfo) {
    try {
      const response = await api.post('/api/bookings', {
        eventId,
        attendeeInfo,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  /**
   * Get booking by confirmation code
   * @param {string} confirmationCode - Booking confirmation code
   * @returns {Promise} Booking object with event details
   */
  async getBooking(confirmationCode) {
    try {
      const response = await api.get(`/api/bookings/${confirmationCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  /**
   * Cancel a booking
   * @param {string} confirmationCode - Booking confirmation code
   * @returns {Promise} Cancellation confirmation
   */
  async cancelBooking(confirmationCode) {
    try {
      const response = await api.delete(`/api/bookings/${confirmationCode}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  /**
   * Health check
   * @returns {Promise} API health status
   */
  async healthCheck() {
    try {
      const response = await api.get('/api/health');
      return response.data;
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  },
};

export default eventService;

