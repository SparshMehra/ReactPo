"""
Email Service for Event Booking Confirmations

@file email_service.py
@author Bhabin Chudal (A00464169) - Database/utils integration, cleanup
@author Abdiaziz Muse (A00471783) - Events email workflow, maintenance
@description SMTP email utilities used by the events API to send confirmations
             and cancellations. Loads configuration from environment variables.
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
# Optional dotenv import for environments where it's available
try:
    from dotenv import load_dotenv  # type: ignore
    load_dotenv('config.env')
except Exception:
    # If python-dotenv isn't installed or loading fails, proceed with environment defaults
    pass


class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.username = os.getenv('SMTP_USERNAME')
        self.password = os.getenv('SMTP_PASSWORD')
        # Prefer explicit EMAIL_FROM, else fall back to username
        self.from_email = os.getenv('EMAIL_FROM') or self.username
        self.admin_email = os.getenv('ADMIN_EMAIL')
        self.frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3070')
        self.last_error = None

    def _build_message(self, subject: str, to_email: str, html_body: str):
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = self.from_email or (self.username or '')
        msg['To'] = to_email
        # BCC admin for visibility if configured
        if self.admin_email:
            msg['Bcc'] = self.admin_email
        return msg

    def _send(self, msg: MIMEMultipart):
        """Send a prepared email message via SMTP. Returns True/False and sets last_error."""
        if not self.username or not self.password:
            self.last_error = "Email credentials not configured (SMTP_USERNAME/SMTP_PASSWORD)."
            print(f"Warning: {self.last_error} Skipping email send.")
            return False
        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.username, self.password)
                server.send_message(msg)
            # Success
            self.last_error = None
            return True
        except Exception as e:
            self.last_error = str(e)
            print(f"Error sending email: {self.last_error}")
            return False

    def send_booking_confirmation(self, booking_data, event_data):
        """
        Send booking confirmation email to attendee (and BCC admin if configured)
        """
        try:
            attendee_email = booking_data['attendeeInfo']['email']
            subject = f"Booking Confirmed: {event_data.get('title', 'Your Event')}"
            html_body = self._create_confirmation_email_html(booking_data, event_data)
            msg = self._build_message(subject, attendee_email, html_body)
            # Attach HTML body
            msg.attach(MIMEText(html_body, 'html'))
            sent = self._send(msg)
            if sent:
                print(f"Confirmation email sent to {attendee_email} (SMTP: {self.smtp_server}, From: {self.from_email})")
            return sent
        except Exception as e:
            self.last_error = str(e)
            print(f"Error preparing confirmation email: {self.last_error}")
            return False

    def send_cancellation_email(self, booking_data, event_data):
        """
        Send booking cancellation email to attendee (and BCC admin if configured)
        """
        try:
            attendee_email = booking_data['attendeeInfo']['email']
            subject = f"Booking Cancelled: {event_data.get('title', 'Your Event')}"
            html_body = self._create_cancellation_email_html(booking_data, event_data)
            msg = self._build_message(subject, attendee_email, html_body)
            msg.attach(MIMEText(html_body, 'html'))
            sent = self._send(msg)
            if sent:
                print(f"Cancellation email sent to {attendee_email} (SMTP: {self.smtp_server}, From: {self.from_email})")
            return sent
        except Exception as e:
            self.last_error = str(e)
            print(f"Error preparing cancellation email: {self.last_error}")
            return False

    def send_test_email(self, to_email: str = None):
        """Send a simple test email to verify SMTP configuration."""
        to_addr = to_email or self.admin_email or self.from_email or self.username
        if not to_addr:
            self.last_error = "No recipient available for test email. Configure ADMIN_EMAIL or EMAIL_FROM."
            print(self.last_error)
            return False
        subject = "Test Email - Events API"
        html_body = f"""
            <html><body>
            <h2>✅ Email Test Successful</h2>
            <p>This is a test email from the Events API.</p>
            <ul>
                <li>SMTP Server: {self.smtp_server}</li>
                <li>From: {self.from_email or self.username}</li>
                <li>To: {to_addr}</li>
                <li>Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</li>
            </ul>
            <p>If you received this, your email configuration works.</p>
            </body></html>
        """
        try:
            msg = self._build_message(subject, to_addr, html_body)
            msg.attach(MIMEText(html_body, 'html'))
            return self._send(msg)
        except Exception as e:
            self.last_error = str(e)
            print(f"Error preparing test email: {self.last_error}")
            return False

    def _create_confirmation_email_html(self, booking_data, event_data):
        """
        Create HTML email template for booking confirmation (robust to missing fields)
        """
        attendee = booking_data['attendeeInfo']
        confirmation_code = booking_data.get('confirmationCode', 'UNKNOWN')

        # Safe access with defaults
        event_title = event_data.get('title', 'Event')
        event_location = event_data.get('location', 'See website for details')
        requirements = event_data.get('requirements') or []
        difficulty_raw = event_data.get('difficulty') or 'N/A'
        difficulty = difficulty_raw.title() if isinstance(difficulty_raw, str) else str(difficulty_raw)
        age_restriction = event_data.get('ageRestriction', 'All ages')

        # Format date and time safely
        try:
            event_date = datetime.strptime(event_data.get('date', ''), '%Y-%m-%d').strftime('%B %d, %Y')
        except Exception:
            event_date = event_data.get('date', 'TBD')
        try:
            start_time = datetime.strptime(event_data.get('startTime', '00:00'), '%H:%M').strftime('%I:%M %p')
            end_time = datetime.strptime(event_data.get('endTime', '00:00'), '%H:%M').strftime('%I:%M %p')
        except Exception:
            start_time = event_data.get('startTime', 'TBD')
            end_time = event_data.get('endTime', 'TBD')

        # Build requirements HTML separately to avoid complex f-string expressions with backslashes
        if requirements:
            req_items = ''.join([f'<li>{req}</li>' for req in requirements])
            requirements_html = (
                '<div class="requirements">\n'
                '<h3 style="margin-top: 0; color: #0056b3;">What to Bring:</h3>\n'
                '<ul>\n' + req_items + '</ul>\n'                '</div>'
            )
        else:
            requirements_html = ''

        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                .confirmation-code {{ background: #fff3cd; border: 2px dashed #856404; padding: 15px; margin: 20px 0; text-align: center; font-size: 24px; font-weight: bold; color: #856404; border-radius: 5px; }}
                .event-details {{ background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }}
                .detail-row {{ margin: 10px 0; }}
                .detail-label {{ font-weight: bold; color: #667eea; }}
                .requirements {{ background: #e7f3ff; padding: 15px; margin: 20px 0; border-radius: 5px; }}
                .requirements ul {{ margin: 10px 0; padding-left: 20px; }}
                .footer {{ text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }}
                .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Booking Confirmed!</h1>
                    <p>St. Margaret's Bay Woodland Conservation Area</p>
                </div>
                
                <div class="content">
                    <p>Hi {attendee.get('firstName', '')},</p>
                    
                    <p>Thank you for booking with us! We're excited to have you join us for <strong>{event_title}</strong>.</p>
                    
                    <div class="confirmation-code">
                        Confirmation Code: {confirmation_code}
                    </div>
                    
                    <p><em>Please save this confirmation code. You may need it to check in or if you need to contact us about your booking.</em></p>
                    
                    <div class="event-details">
                        <h2 style="margin-top: 0; color: #667eea;">Event Details</h2>
                        
                        <div class="detail-row">
                            <span class="detail-label">📅 Date:</span> {event_date}
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">🕐 Time:</span> {start_time} - {end_time}
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">📍 Location:</span> {event_location}
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">👥 Number of Attendees:</span> {attendee.get('numberOfAttendees', 1)}
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">⭐ Difficulty:</span> {difficulty}
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">👶 Age Restriction:</span> {age_restriction}
                        </div>
                    </div>
                    
                    {requirements_html}
                    
                    <h3>Event Description:</h3>
                    <p>{event_data.get('description', '')}</p>
                    
                    {f'<p><strong>Special Requirements:</strong> {attendee.get("specialRequirements")}</p>' if attendee.get('specialRequirements') else ''}
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{self.frontend_url}/events" class="button">View All Events</a>
                    </div>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                    
                    <h3>Important Information:</h3>
                    <ul>
                        <li>Please arrive 10 minutes before the event start time</li>
                        <li>Check the weather forecast and dress appropriately</li>
                        <li>If you need to cancel, please contact us at least 24 hours in advance</li>
                        <li>Bring your confirmation code for check-in</li>
                    </ul>
                    
                    <p>If you have any questions, please don't hesitate to contact us.</p>
                    
                    <p>We look forward to seeing you!</p>
                    
                    <p>Best regards,<br>
                    <strong>St. Margaret's Bay Woodland Conservation Team</strong></p>
                </div>
                
                <div class="footer">
                    <p>St. Margaret's Bay Area Woodland Conservation Site<br>
                    Halifax, Nova Scotia</p>
                    <p><em>This is an automated confirmation email. Please do not reply to this email.</em></p>
                </div>
            </div>
        </body>
        </html>
        """
        return html
    
    def _create_cancellation_email_html(self, booking_data, event_data):
        """
        Create HTML email template for booking cancellation
        """
        attendee = booking_data['attendeeInfo']
        confirmation_code = booking_data.get('confirmationCode', 'UNKNOWN')
        event_title = event_data.get('title', 'Event')

        try:
            event_date = datetime.strptime(event_data.get('date', ''), '%Y-%m-%d').strftime('%B %d, %Y')
        except Exception:
            event_date = event_data.get('date', 'TBD')
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #dc3545; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                .footer {{ text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }}
                .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Booking Cancelled</h1>
                    <p>St. Margaret's Bay Woodland Conservation Area</p>
                </div>
                
                <div class="content">
                    <p>Hi {attendee.get('firstName', '')},</p>
                    
                    <p>Your booking for <strong>{event_title}</strong> on {event_date} has been successfully cancelled.</p>
                    
                    <p><strong>Cancelled Booking:</strong> {confirmation_code}</p>
                    
                    <p>We're sorry you can't make it this time. We hope to see you at a future event!</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{self.frontend_url}/events" class="button">Browse Other Events</a>
                    </div>
                    
                    <p>Best regards,<br>
                    <strong>St. Margaret's Bay Woodland Conservation Team</strong></p>
                </div>
                
                <div class="footer">
                    <p>St. Margaret's Bay Area Woodland Conservation Site<br>
                    Halifax, Nova Scotia</p>
                </div>
            </div>
        </body>
        </html>
        """
        return html

    def send_contact_form_email(self, form_data):
        """
        Send contact form message to admin and confirmation to sender
        """
        if not self.username or not self.password:
            self.last_error = "Email credentials not configured (SMTP_USERNAME/SMTP_PASSWORD)."
            print(f"Warning: {self.last_error} Skipping email send.")
            return False

        try:
            # Send to admin
            admin_email = self.admin_email or 'admin@woodlandconservation.ca'

            # Create message to admin
            admin_msg = MIMEMultipart('alternative')
            admin_msg['Subject'] = f"New Contact Form Submission from {form_data['name']}"
            admin_msg['From'] = self.from_email or self.username
            admin_msg['To'] = admin_email
            admin_msg['Reply-To'] = form_data['email']

            # Create HTML email body for admin
            admin_html = self._create_contact_admin_email_html(form_data)
            admin_html_part = MIMEText(admin_html, 'html')
            admin_msg.attach(admin_html_part)

            # Create confirmation message to sender
            user_msg = MIMEMultipart('alternative')
            user_msg['Subject'] = "Thank you for contacting St. Margaret's Bay Woodland Conservation"
            user_msg['From'] = self.from_email or self.username
            user_msg['To'] = form_data['email']

            # Create HTML email body for user
            user_html = self._create_contact_user_email_html(form_data)
            user_html_part = MIMEText(user_html, 'html')
            user_msg.attach(user_html_part)

            # Send both emails
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.username, self.password)
                server.send_message(admin_msg)
                server.send_message(user_msg)

            print(f"Contact form email sent from {form_data['email']}")
            self.last_error = None
            return True

        except Exception as e:
            self.last_error = str(e)
            print(f"Error sending contact form email: {self.last_error}")
            return False

    def _create_contact_admin_email_html(self, form_data):
        """Create HTML email for admin notification"""
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                .info-box {{ background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }}
                .message-box {{ background: #e7f3ff; padding: 20px; margin: 20px 0; border-radius: 5px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📧 New Contact Form Submission</h1>
                    <p>St. Margaret's Bay Woodland Conservation</p>
                </div>
                
                <div class="content">
                    <p>You have received a new message from the website contact form.</p>
                    
                    <div class="info-box">
                        <h3 style="margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> {form_data['name']}</p>
                        <p><strong>Email:</strong> <a href="mailto:{form_data['email']}">{form_data['email']}</a></p>
                        <p><strong>Submitted:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                    </div>
                    
                    <div class="message-box">
                        <h3 style="margin-top: 0;">Message</h3>
                        <p>{form_data['message'].replace(chr(10), '<br>')}</p>
                    </div>
                    
                    <p><em>Reply directly to this email to respond to the sender.</em></p>
                </div>
            </div>
        </body>
        </html>
        """
        return html

    def _create_contact_user_email_html(self, form_data):
        """Create HTML confirmation email for user"""
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                .footer {{ text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }}
                .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✉️ Thank You for Reaching Out!</h1>
                    <p>St. Margaret's Bay Woodland Conservation Area</p>
                </div>
                
                <div class="content">
                    <p>Hi {form_data['name']},</p>
                    
                    <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
                    
                    <p><strong>Your message:</strong></p>
                    <p style="background: white; padding: 15px; border-left: 4px solid #667eea; border-radius: 5px;">
                        {form_data['message'].replace(chr(10), '<br>')}
                    </p>
                    
                    <p>Our team typically responds within 1-2 business days. If your inquiry is urgent, please call us at <strong>+1 (123) 456-7890</strong>.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{self.frontend_url}" class="button">Visit Our Website</a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>St. Margaret's Bay Area Woodland Conservation Site<br>
                    Halifax, Nova Scotia<br>
                    📧 info@woodlandconservation.ca | 📞 +1 (123) 456-7890</p>
                </div>
            </div>
        </body>
        </html>
        """
        return html


# Create a singleton instance
email_service = EmailService()
