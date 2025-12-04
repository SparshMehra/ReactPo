import { format, parseISO, isAfter, isBefore } from 'date-fns';

/**
 * Format date to display format
 * @param {string} dateString - ISO date string
 * @param {string} formatString - Format pattern
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, formatString = 'MMMM dd, yyyy') => {
  try {
    return format(parseISO(dateString), formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format time to display format
 * @param {string} timeString - Time in HH:MM format
 * @returns {string} Formatted time (e.g., "2:00 PM")
 */
export const formatTime = (timeString) => {
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

/**
 * Check if event date is upcoming
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if event is in the future
 */
export const isUpcoming = (dateString) => {
  try {
    const eventDate = parseISO(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(eventDate, today) || format(eventDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error checking if upcoming:', error);
    return false;
  }
};

/**
 * Check if event date is in the past
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if event is in the past
 */
export const isPast = (dateString) => {
  try {
    const eventDate = parseISO(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(eventDate, today);
  } catch (error) {
    console.error('Error checking if past:', error);
    return false;
  }
};

/**
 * Get relative date description
 * @param {string} dateString - ISO date string
 * @returns {string} Relative description (e.g., "Today", "Tomorrow", "In 3 days")
 */
export const getRelativeDate = (dateString) => {
  try {
    const eventDate = parseISO(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);

    const diffTime = eventDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays <= 7) return `In ${diffDays} days`;

    return formatDate(dateString, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Error getting relative date:', error);
    return dateString;
  }
};

/**
 * Combine date and time into full datetime string
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @returns {string} ISO datetime string
 */
export const combineDateAndTime = (date, time) => {
  try {
    const [hours, minutes] = time.split(':');
    const dateObj = parseISO(date);
    dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return dateObj.toISOString();
  } catch (error) {
    console.error('Error combining date and time:', error);
    return null;
  }
};

/**
 * Check if booking cancellation is allowed (24 hours before event)
 * @param {string} eventDate - Event date
 * @param {string} eventTime - Event start time
 * @param {number} hoursBeforeEvent - Hours before event when cancellation closes
 * @returns {boolean} True if cancellation is still allowed
 */
export const canCancelBooking = (eventDate, eventTime, hoursBeforeEvent = 24) => {
  try {
    const eventDateTime = combineDateAndTime(eventDate, eventTime);
    if (!eventDateTime) return false;

    const eventDateObj = new Date(eventDateTime);
    const now = new Date();
    const hoursUntilEvent = (eventDateObj.getTime() - now.getTime()) / (1000 * 60 * 60);

    return hoursUntilEvent > hoursBeforeEvent;
  } catch (error) {
    console.error('Error checking cancellation eligibility:', error);
    return false;
  }
};

/**
 * Format date range
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  try {
    const start = formatDate(startDate, 'MMM dd');
    const end = formatDate(endDate, 'MMM dd, yyyy');
    return `${start} - ${end}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return `${startDate} - ${endDate}`;
  }
};
// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://ugdev.cs-smu.ca:8743';

// Booking Configuration
export const MAX_ATTENDEES_PER_BOOKING = 10;
export const BOOKING_CANCELLATION_HOURS = 24;

// Pagination
export const EVENTS_PER_PAGE = 9;

// Calendar Configuration
export const CALENDAR_START_TIME = '06:00';
export const CALENDAR_END_TIME = '20:00';

// Event Categories
export const EVENT_CATEGORIES = {
  'all': {
    label: 'All Events',
    icon: '🌲',
    color: 'gray'
  },
  'guided-tour': {
    label: 'Guided Tours',
    icon: '🥾',
    color: 'green'
  },
  'workshop': {
    label: 'Educational Workshops',
    icon: '📚',
    color: 'blue'
  },
  'volunteer': {
    label: 'Volunteer Activities',
    icon: '🤝',
    color: 'orange'
  },
  'wildlife': {
    label: 'Wildlife Watching',
    icon: '🦉',
    color: 'purple'
  },
  'seasonal': {
    label: 'Seasonal Events',
    icon: '🍂',
    color: 'amber'
  },
  'family': {
    label: 'Family Activities',
    icon: '👨‍👩‍👧‍👦',
    color: 'pink'
  },
  'conservation': {
    label: 'Conservation Projects',
    icon: '🌱',
    color: 'emerald'
  }
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  'easy': {
    label: 'Easy',
    icon: '⭐',
    color: 'green'
  },
  'beginner': {
    label: 'Beginner',
    icon: '⭐',
    color: 'green'
  },
  'moderate': {
    label: 'Moderate',
    icon: '⭐⭐',
    color: 'yellow'
  },
  'hard': {
    label: 'Hard',
    icon: '⭐⭐⭐',
    color: 'red'
  }
};

