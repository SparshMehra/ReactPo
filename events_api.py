"""
Events & Booking API for Woodland Conservation Area

@file events_api.py
@author Abdiaziz Muse (A00471783)
@description Flask REST API server for managing conservation area events and bookings
             with email confirmation system and real-time availability tracking.

Features:
- Complete CRUD operations for events and bookings
- Real-time capacity and availability management
- Booking code generation and validation
- Email confirmation system with SendGrid
- Admin endpoints for booking management
- CORS enabled for React frontend
- JSON file-based data persistence
- Error handling and validation

Endpoints:
- GET /api/events - List all events with optional filters
- GET /api/events/<id> - Get specific event details
- POST /api/bookings - Create new booking with email confirmation
- GET /api/bookings/<code> - Get booking by confirmation code
- DELETE /api/bookings/<code> - Cancel booking
- DELETE /api/admin/bookings - Reset all bookings (admin)
- POST /api/admin/email/test - Test email configuration
- GET /api/health - Health check endpoint

Flask REST API for managing events and bookings with email notifications
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
import random
import string
from dotenv import load_dotenv
import sys
from pathlib import Path

# Add src/utils to the Python path
sys.path.insert(0, str(Path(__file__).parent / 'src'))

from utils.email_service import EmailService

# Load configuration from config.env file
load_dotenv('config.env')

# Initialize email service
email_service = EmailService()

app = Flask(__name__)
CORS(app, origins=['http://localhost:3070'])

# Data file paths
EVENTS_FILE = './data/events.json'
BOOKINGS_FILE = './data/bookings.json'


def load_json_file(filepath):
    """Load data from JSON file"""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {'events': [], 'lastId': 0} if 'events' in filepath else {'bookings': [], 'lastId': 0}
    except json.JSONDecodeError:
        print(f"Error decoding JSON from {filepath}")
        return {'events': [], 'lastId': 0} if 'events' in filepath else {'bookings': [], 'lastId': 0}


def save_json_file(filepath, data):
    """Save data to JSON file"""
    try:
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving to {filepath}: {e}")
        return False


def generate_confirmation_code():
    """Generate a unique confirmation code (e.g., WCA-12345)"""
    random_num = ''.join(random.choices(string.digits, k=5))
    return f"WCA-{random_num}"


def validate_booking_data(data):
    """Validate booking request data"""
    required_fields = ['eventId', 'attendeeInfo']
    attendee_required = ['firstName', 'lastName', 'email', 'phone', 'numberOfAttendees']
    
    # Check required fields
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    # Check attendee info
    attendee_info = data['attendeeInfo']
    for field in attendee_required:
        if field not in attendee_info or not attendee_info[field]:
            return False, f"Missing required attendee field: {field}"
    
    # Validate email format (basic)
    email = attendee_info['email']
    if '@' not in email or '.' not in email:
        return False, "Invalid email format"
    
    # Validate number of attendees
    try:
        num_attendees = int(attendee_info['numberOfAttendees'])
        if num_attendees < 1 or num_attendees > int(os.getenv('MAX_ATTENDEES_PER_BOOKING', 10)):
            return False, f"Number of attendees must be between 1 and {os.getenv('MAX_ATTENDEES_PER_BOOKING', 10)}"
    except (ValueError, TypeError):
        return False, "Invalid number of attendees"
    
    return True, None


@app.route('/api/events', methods=['GET'])
def get_events():
    """
    Get all events or filtered events
    Query params: category, date, status, search
    """
    try:
        data = load_json_file(EVENTS_FILE)
        events = data.get('events', [])
        
        # Apply filters
        category = request.args.get('category')
        date_filter = request.args.get('date')
        status = request.args.get('status')
        search = request.args.get('search', '').lower()
        
        filtered_events = events
        
        # Filter by category
        if category and category != 'all':
            filtered_events = [e for e in filtered_events if e.get('category') == category]
        
        # Filter by date
        today = datetime.now().date()
        if date_filter == 'upcoming':
            filtered_events = [e for e in filtered_events 
                             if datetime.strptime(e['date'], '%Y-%m-%d').date() >= today]
        elif date_filter == 'past':
            filtered_events = [e for e in filtered_events 
                             if datetime.strptime(e['date'], '%Y-%m-%d').date() < today]
        elif date_filter and date_filter not in ['all', 'upcoming', 'past']:
            # Specific date filter
            filtered_events = [e for e in filtered_events if e.get('date') == date_filter]
        
        # Filter by status
        if status:
            filtered_events = [e for e in filtered_events if e.get('status') == status]
        
        # Search filter
        if search:
            filtered_events = [e for e in filtered_events 
                             if search in e.get('title', '').lower() 
                             or search in e.get('description', '').lower()
                             or search in str(e.get('tags', [])).lower()]
        
        # Sort by date (upcoming first)
        filtered_events.sort(key=lambda x: x.get('date', ''))
        
        return jsonify({
            'success': True,
            'events': filtered_events,
            'count': len(filtered_events)
        }), 200
        
    except Exception as e:
        print(f"Error getting events: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to retrieve events',
            'code': 'INTERNAL_ERROR'
        }), 500


@app.route('/api/events/<event_id>', methods=['GET'])
def get_event(event_id):
    """Get single event by ID"""
    try:
        data = load_json_file(EVENTS_FILE)
        events = data.get('events', [])
        
        event = next((e for e in events if e['id'] == event_id), None)
        
        if not event:
            return jsonify({
                'success': False,
                'error': 'Event not found',
                'code': 'NOT_FOUND'
            }), 404
        
        return jsonify({
            'success': True,
            'event': event
        }), 200
        
    except Exception as e:
        print(f"Error getting event: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to retrieve event',
            'code': 'INTERNAL_ERROR'
        }), 500


@app.route('/api/bookings', methods=['POST'])
def create_booking():
    """Create a new booking"""
    try:
        booking_data = request.get_json()
        
        # Validate input
        is_valid, error_msg = validate_booking_data(booking_data)
        if not is_valid:
            return jsonify({
                'success': False,
                'error': error_msg,
                'code': 'VALIDATION_ERROR'
            }), 400
        
        event_id = booking_data['eventId']
        num_attendees = int(booking_data['attendeeInfo']['numberOfAttendees'])
        
        # Load events and check if event exists
        events_data = load_json_file(EVENTS_FILE)
        events = events_data.get('events', [])
        event = next((e for e in events if e['id'] == event_id), None)
        
        if not event:
            return jsonify({
                'success': False,
                'error': 'Event not found',
                'code': 'NOT_FOUND'
            }), 404
        
        # Check if event is open
        if event.get('status') != 'open':
            return jsonify({
                'success': False,
                'error': 'Event is not open for booking',
                'code': 'EVENT_CLOSED'
            }), 400
        
        # Check capacity
        spots_available = event.get('spotsAvailable', 0)
        if spots_available < num_attendees:
            return jsonify({
                'success': False,
                'error': f'Not enough spots available. Only {spots_available} spots left.',
                'code': 'CAPACITY_FULL'
            }), 409
        
        # Generate confirmation code
        confirmation_code = generate_confirmation_code()
        
        # Load bookings
        bookings_data = load_json_file(BOOKINGS_FILE)
        bookings = bookings_data.get('bookings', [])
        last_id = bookings_data.get('lastId', 0)
        
        # Create booking object
        new_booking = {
            'id': f"bkg_{str(last_id + 1).zfill(3)}",
            'eventId': event_id,
            'confirmationCode': confirmation_code,
            'attendeeInfo': {
                'firstName': booking_data['attendeeInfo']['firstName'],
                'lastName': booking_data['attendeeInfo']['lastName'],
                'email': booking_data['attendeeInfo']['email'],
                'phone': booking_data['attendeeInfo']['phone'],
                'numberOfAttendees': num_attendees,
                'specialRequirements': booking_data['attendeeInfo'].get('specialRequirements', '')
            },
            'status': 'confirmed',
            'bookingDate': datetime.utcnow().isoformat() + 'Z',
            'reminderSent': False,
            'createdAt': datetime.utcnow().isoformat() + 'Z',
            'updatedAt': datetime.utcnow().isoformat() + 'Z'
        }
        
        # Add booking to list
        bookings.append(new_booking)
        bookings_data['bookings'] = bookings
        bookings_data['lastId'] = last_id + 1
        
        # Update event capacity
        event['spotsAvailable'] -= num_attendees
        event['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        events_data['events'] = events
        
        # Save both files
        if not save_json_file(BOOKINGS_FILE, bookings_data):
            return jsonify({
                'success': False,
                'error': 'Failed to save booking',
                'code': 'INTERNAL_ERROR'
            }), 500
        
        if not save_json_file(EVENTS_FILE, events_data):
            return jsonify({
                'success': False,
                'error': 'Failed to update event capacity',
                'code': 'INTERNAL_ERROR'
            }), 500
        
        # Send confirmation email (non-blocking for client UX)
        email_sent = email_service.send_booking_confirmation(new_booking, event)

        return jsonify({
            'success': True,
            'booking': new_booking,
            'confirmationCode': confirmation_code,
            'emailSent': bool(email_sent),
            'emailError': email_service.last_error if not email_sent else None,
            'message': 'Booking created successfully'
        }), 201
        
    except Exception as e:
        print(f"Error creating booking: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to create booking',
            'code': 'INTERNAL_ERROR'
        }), 500


@app.route('/api/bookings/<confirmation_code>', methods=['GET'])
def get_booking(confirmation_code):
    """Get booking by confirmation code"""
    try:
        bookings_data = load_json_file(BOOKINGS_FILE)
        bookings = bookings_data.get('bookings', [])
        
        booking = next((b for b in bookings if b['confirmationCode'] == confirmation_code), None)
        
        if not booking:
            return jsonify({
                'success': False,
                'error': 'Booking not found',
                'code': 'NOT_FOUND'
            }), 404
        
        # Also get event details
        events_data = load_json_file(EVENTS_FILE)
        events = events_data.get('events', [])
        event = next((e for e in events if e['id'] == booking['eventId']), None)
        
        return jsonify({
            'success': True,
            'booking': booking,
            'event': event
        }), 200
        
    except Exception as e:
        print(f"Error getting booking: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to retrieve booking',
            'code': 'INTERNAL_ERROR'
        }), 500


@app.route('/api/bookings/<confirmation_code>', methods=['DELETE'])
def cancel_booking(confirmation_code):
    """Cancel a booking"""
    try:
        # Load bookings
        bookings_data = load_json_file(BOOKINGS_FILE)
        bookings = bookings_data.get('bookings', [])
        
        booking = next((b for b in bookings if b['confirmationCode'] == confirmation_code), None)
        
        if not booking:
            return jsonify({
                'success': False,
                'error': 'Booking not found',
                'code': 'NOT_FOUND'
            }), 404
        
        if booking['status'] == 'cancelled':
            return jsonify({
                'success': False,
                'error': 'Booking already cancelled',
                'code': 'ALREADY_CANCELLED'
            }), 400
        
        # Load events and restore capacity
        events_data = load_json_file(EVENTS_FILE)
        events = events_data.get('events', [])
        event = next((e for e in events if e['id'] == booking['eventId']), None)
        
        if event:
            event['spotsAvailable'] += booking['attendeeInfo']['numberOfAttendees']
            event['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
            events_data['events'] = events
            save_json_file(EVENTS_FILE, events_data)
        
        # Update booking status
        booking['status'] = 'cancelled'
        booking['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        bookings_data['bookings'] = bookings
        
        if not save_json_file(BOOKINGS_FILE, bookings_data):
            return jsonify({
                'success': False,
                'error': 'Failed to cancel booking',
                'code': 'INTERNAL_ERROR'
            }), 500
        
        # Send cancellation email
        if event:
            email_service.send_cancellation_email(booking, event)
        
        return jsonify({
            'success': True,
            'message': 'Booking cancelled successfully',
            'booking': booking
        }), 200
        
    except Exception as e:
        print(f"Error cancelling booking: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to cancel booking',
            'code': 'INTERNAL_ERROR'
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'Events API is running',
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'email': {
            'configured': bool(os.getenv('SMTP_USERNAME')),
            'from': os.getenv('EMAIL_FROM') or os.getenv('SMTP_USERNAME'),
            'server': os.getenv('SMTP_SERVER'),
            'port': int(os.getenv('SMTP_PORT', 587))
        }
    }), 200


# Simple admin token check (optional)
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN')


def require_admin(req):
    if not ADMIN_TOKEN:
        return True  # No token configured; allow for local use
    token = req.headers.get('x-admin-token') or req.args.get('admin_token')
    return token == ADMIN_TOKEN


@app.route('/api/admin/email/test', methods=['POST'])
def admin_send_test_email():
    if not require_admin(request):
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    payload = request.get_json(silent=True) or {}
    to_email = payload.get('to')
    sent = email_service.send_test_email(to_email)
    return jsonify({
        'success': bool(sent),
        'error': email_service.last_error if not sent else None
    }), (200 if sent else 500)


@app.route('/api/admin/bookings', methods=['DELETE'])
def admin_clear_bookings():
    """Hard delete all bookings and optionally reset spots for all events. Use carefully."""
    if not require_admin(request):
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401

    reset_spots = request.args.get('resetSpots', 'false').lower() == 'true'

    # Clear bookings
    bookings_data = {'bookings': [], 'lastId': 0}
    save_ok = save_json_file(BOOKINGS_FILE, bookings_data)

    if not save_ok:
        return jsonify({'success': False, 'error': 'Failed to clear bookings file'}), 500

    # Optionally reset event spotsAvailable to capacity
    if reset_spots:
        events_data = load_json_file(EVENTS_FILE)
        changed = False
        for e in events_data.get('events', []):
            if 'capacity' in e:
                e['spotsAvailable'] = e.get('capacity', e.get('spotsAvailable', 0))
                e['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
                changed = True
        if changed:
            save_json_file(EVENTS_FILE, events_data)

    return jsonify({'success': True, 'message': 'Bookings cleared', 'resetSpots': reset_spots}), 200


@app.route('/api/contact', methods=['POST'])
def send_contact_message():
    """Send contact form message via email"""
    try:
        data = request.json

        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400

        # Send email using email service
        email_sent = email_service.send_contact_form_email(data)

        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Your message has been sent successfully. We will get back to you soon!'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to send email. Email service may not be configured.'
            }), 500

    except Exception as e:
        print(f"Error processing contact form: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('./data', exist_ok=True)
    
    port = int(os.getenv('FLASK_PORT', 5001))
    print(f"\n>> Events API starting on port {port}...")
    print(f">> Events file: {EVENTS_FILE}")
    print(f">> Bookings file: {BOOKINGS_FILE}")
    print(f">> Email service: {'Configured' if os.getenv('SMTP_USERNAME') else 'Not configured (update config.env file)'}")
    print(f"\nAPI Endpoints:")
    print(f"  GET    http://localhost:{port}/api/events")
    print(f"  GET    http://localhost:{port}/api/events/<id>")
    print(f"  POST   http://localhost:{port}/api/bookings")
    print(f"  GET    http://localhost:{port}/api/bookings/<code>")
    print(f"  DELETE http://localhost:{port}/api/bookings/<code>")
    print(f"  DELETE http://localhost:{port}/api/admin/bookings?resetSpots=true")
    print(f"  POST   http://localhost:{port}/api/admin/email/test")
    print(f"  GET    http://localhost:{port}/api/health")
    print(f"\n>> Ready to accept requests!\n")

    app.run(debug=True, host='0.0.0.0', port=port)
