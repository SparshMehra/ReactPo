// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

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

