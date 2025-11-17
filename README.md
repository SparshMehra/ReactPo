# St. Margaret's Bay Woodland Conservation Area Website

A comprehensive web application for the St. Margaret's Bay Woodland Conservation Area featuring an interactive chatbot, events booking system, gallery, and educational content about local flora and fauna.

## 🌟 Features

- **Interactive Homepage** with forest conservation information
- **AI-Powered Chatbot** using fine-tuned DistilGPT-2 model for answering visitor questions
- **Events & Booking System** with calendar integration and email confirmations
- **Image Gallery** showcasing the conservation area
- **Flora Information** with detailed descriptions of local plant species
- **Contact Form** for visitor inquiries
- **Dark Mode Support** for comfortable viewing
- **Accessibility Features** including text-to-speech and keyboard navigation
- **Responsive Design** that works on all devices

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - UI framework
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **React Hook Form + Yup** - Form validation
- **React Toastify** - Notifications
- **React Calendar** - Event calendar
- **Date-fns** - Date formatting utilities
- **React Icons** - Icon library
- **Tailwind CSS** - Styling framework
- **Material-UI** - Additional UI components

### Backend
- **Python Flask** - REST API server
- **DistilGPT-2** - Fine-tuned chatbot model
- **Transformers** - Hugging Face library for AI model
- **SMTP** - Email service for booking confirmations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
git clone https://github.com/Prezzo-K/ReactPoff.git
cd ReactPoff
```

Or download and extract the ZIP file.

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install all required npm packages including:
- react, react-dom, react-router-dom
- axios, react-hook-form, yup
- react-calendar, date-fns
- react-toastify, react-icons
- tailwindcss, @mui/material
- concurrently, cross-env (dev dependencies)

### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- Flask and Flask-CORS
- transformers and torch
- python-dotenv
- smtplib (for email)

### Step 4: Configure Environment Variables

The project uses a `config.env` file for environment configuration. The file is already present with the following settings:

```env
# Flask API Configuration
FLASK_APP=events_api.py
FLASK_ENV=development
FLASK_PORT=5001

# Email Configuration (Gmail SMTP)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Application URLs
FRONTEND_URL=http://localhost:3070
ADMIN_EMAIL=admin@woodlandconservation.ca

# Booking Configuration
MAX_ATTENDEES_PER_BOOKING=10
BOOKING_CANCELLATION_HOURS=24
```

**Important:** For email functionality to work, you need to:
1. Use a Gmail account
2. Enable 2-Factor Authentication
3. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
4. Update `SMTP_USERNAME`, `SMTP_PASSWORD`, and `EMAIL_FROM` with your credentials

### Step 5: Verify Project Structure

Ensure you have these key directories and files:
```
ReactPoff/
├── public/              # Static files
├── src/                 # React source code
│   ├── components/      # React components
│   │   ├── events/      # Event booking components
│   │   ├── chatbot/     # Chatbot components
│   │   ├── pages/       # Page components
│   │   └── UI/          # Reusable UI components
│   ├── services/        # API service files
│   └── utils/           # Utility functions
├── data/                # JSON data files
│   ├── events.json      # Events data
│   └── bookings.json    # Bookings data
├── utils/               # Python utilities
│   └── email_service.py # Email service
├── distilgpt2-finetuned/ # AI model files
├── chatbot_api.py       # Chatbot API server
├── events_api.py        # Events API server
├── config.env           # Environment configuration
├── package.json         # npm dependencies
└── requirements.txt     # Python dependencies
```

## ▶️ Running the Application

### Option 1: Using npm start (Recommended)

This will start all three services simultaneously:

```bash
npm start
```

This command runs:
1. **Chatbot API** on `http://localhost:5000`
2. **Events API** on `http://localhost:5001`
3. **React Frontend** on `http://localhost:3070`

The browser will automatically open to `http://localhost:3070`.

### Option 2: Running Services Individually

If you prefer to run services separately:

**Terminal 1 - Chatbot API:**
```bash
npm run start:backend
# or directly: python chatbot_api.py
```

**Terminal 2 - Events API:**
```bash
npm run start:events
# or directly: python events_api.py
```

**Terminal 3 - React Frontend:**
```bash
npm run start:frontend
# or directly: cross-env PORT=3070 react-scripts start
```

### Option 3: Using Batch Files (Windows)

Double-click any of these files:
- `START_HERE.bat` - Starts all services
- `start_both.bat` - Starts both backend APIs
- `start_backend.bat` - Starts chatbot API only
- `start_frontend.bat` - Starts React app only

## 🌐 Accessing the Application

Once running, you can access:

- **Website**: http://localhost:3070
- **Chatbot API**: http://localhost:5000
- **Events API**: http://localhost:5001

### Available Pages:
- **/** - Homepage
- **/about** - About the conservation area
- **/events** - Browse and book events
- **/gallery** - Photo gallery
- **/flora** - Local flora information
- **/contact** - Contact form
- **/sitemap** - Site navigation

## 🎯 Key Features Guide

### Events & Booking System

1. Navigate to `/events`
2. Browse available events with filters (date, category, difficulty)
3. Click on an event to view details
4. Fill out the booking form
5. Receive instant confirmation with a unique confirmation code
6. Get a confirmation email (if SMTP is configured)
7. Download an `.ics` calendar file to add to your calendar

### Chatbot

- Click the chatbot bubble in the bottom-right corner
- Ask questions about the conservation area
- The AI responds using a fine-tuned model trained on conservation data

### Accessibility Features

- **Dark Mode Toggle** in the navigation bar
- **Text-to-Speech** buttons on various elements
- **Keyboard Navigation** support
- **Screen Reader** friendly

## 🔧 Troubleshooting

### Port Already in Use

If you get a port conflict error:

**Frontend (3070):**
- Change the port in `package.json` under `start:frontend` script
- Update `FRONTEND_URL` in `config.env`

**Backend APIs (5000, 5001):**
- Change ports in `chatbot_api.py` and `events_api.py`
- Update API URLs in `src/config/config.js`

### Email Not Sending

If confirmation emails aren't being sent:
1. Verify your Gmail credentials in `config.env`
2. Make sure you're using an App Password, not your regular Gmail password
3. Check the console for email-related errors
4. See `EMAIL_CONFIGURATION_GUIDE.md` for detailed instructions

### Chatbot Not Responding

If the chatbot doesn't work:
1. Ensure `distilgpt2-finetuned/` directory exists with model files
2. Check that the chatbot API is running on port 5000
3. Verify the API URL in `src/components/chatbot/ChatbotWindow.js`

### Events Not Loading

If events don't appear:
1. Check that `data/events.json` exists
2. Ensure the Events API is running on port 5001
3. Check browser console for API errors
4. Verify API URL in `src/services/eventService.js`

### Build Errors

If you encounter build errors:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For Python issues
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory ready for deployment.

## 🧪 Running Tests

```bash
npm test
```

## 📝 Environment Configuration

Key configuration files:
- **config.env** - Backend configuration (API ports, email settings)
- **src/config/config.js** - Frontend API endpoints
- **package.json** - Scripts and dependencies
- **tailwind.config.js** - Tailwind CSS configuration

## 📚 Additional Documentation

- `EVENTS_IMPLEMENTATION_SUMMARY.md` - Events system architecture
- `EVENTS_SETUP_AND_TESTING.md` - Events testing guide
- `EMAIL_CONFIGURATION_GUIDE.md` - Email setup instructions
- `IMPLEMENTATION_GUIDE.md` - Development guide

## 🤝 Contributing

This project was developed by:
- Marko Ostrovitsa
- Lakshay Bansal
- And team

## 📄 License

This project is part of an academic assignment.

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review the additional documentation files
3. Check browser console and terminal logs for error messages
4. Ensure all dependencies are properly installed
5. Verify environment configuration in `config.env`

## 🎉 Enjoy!

You're all set! The application should now be running and ready to explore.


### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

