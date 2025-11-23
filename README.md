# St. Margaret's Bay Woodland Conservation Area Website

A comprehensive web application for the St. Margaret's Bay Woodland Conservation Area featuring an interactive chatbot, events booking system, gallery, and educational content about local flora and fauna.

## 🌟 Features

- **Interactive Homepage** with forest conservation information
- **AI-Powered Chatbot** using fine-tuned DistilGPT-2 model for answering visitor questions
- **Events & Booking System** with calendar integration and email confirmations
- **Image Gallery** showcasing the conservation area
- **Flora Information** with detailed descriptions of local plant species
- **Contact Form** with modern UI and dark mode support
- **Dark Mode Support** for comfortable viewing in all lighting conditions
- **Accessibility Features** including text-to-speech and keyboard navigation
- **Responsive Design** that works seamlessly on all devices
- **Modern UI** with smooth animations and transitions
- **Supabase Integration** for scalable data storage

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - Modern UI framework with hooks
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **React Hook Form + Yup** - Form validation
- **React Hot Toast** - Beautiful toast notifications
- **React Calendar** - Interactive event calendar
- **Date-fns** - Date formatting utilities
- **React Icons** - Comprehensive icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **React Leaflet** - Interactive map components
- **Supabase Client** - Real-time database integration
- **React Query** - Server state management

### Backend
- **Python Flask** - Lightweight REST API server
- **DistilGPT-2** - Fine-tuned AI model for chatbot
- **Transformers** - Hugging Face library for AI
- **SMTP** - Email service for booking confirmations
- **Python-dotenv** - Environment variable management
- **Flask-CORS** - Cross-Origin Resource Sharing support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning) - [Download](https://git-scm.com/)
- **Supabase Account** (for database features) - [Sign up](https://supabase.com/)

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

**Core Dependencies:**
- `react`, `react-dom` - React framework
- `react-router-dom` - Routing
- `@supabase/supabase-js` - Supabase client
- `@tanstack/react-query` - Data fetching and caching
- `axios` - HTTP requests
- `react-hook-form`, `@hookform/resolvers`, `yup` - Form handling
- `react-calendar`, `date-fns` - Date/calendar components
- `react-hot-toast` - Notifications
- `react-icons` - Icon library
- `react-leaflet` - Interactive maps
- `@mui/material`, `@emotion/react`, `@emotion/styled` - Material-UI components

**Dev Dependencies:**
- `tailwindcss` - CSS framework
- `concurrently` - Run multiple commands
- `cross-env` - Cross-platform environment variables

### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `Flask` - Web framework
- `Flask-CORS` - CORS support
- `transformers` - AI model library
- `torch` - PyTorch for AI
- `python-dotenv` - Environment variables

### Step 4: Configure Environment Variables

#### Create `.env` File

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration:

```env
# ==================================
# FRONTEND ENVIRONMENT VARIABLES
# ==================================

# Supabase Configuration
# Get these from: https://app.supabase.com -> Project Settings -> API
REACT_APP_SUPABASE_URL=your-supabase-project-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Configuration
REACT_APP_CHATBOT_API_URL=http://localhost:5000
REACT_APP_EVENTS_API_URL=http://localhost:5001

# ==================================
# BACKEND ENVIRONMENT VARIABLES
# ==================================

# Flask API Configuration
FLASK_APP=events_api.py
FLASK_ENV=development
FLASK_PORT=5001

# Email Configuration (Gmail SMTP)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com

# Application URLs
FRONTEND_URL=http://localhost:3070
ADMIN_EMAIL=admin@woodlandconservation.ca

# Booking Configuration
MAX_ATTENDEES_PER_BOOKING=10
BOOKING_CANCELLATION_HOURS=24
```

#### Setting Up Supabase

1. **Create a Supabase Project:**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Fill in your project details
   - Wait for the project to be created

2. **Get Your API Credentials:**
   - Go to Project Settings (⚙️ icon)
   - Click on "API" in the sidebar
   - Copy your **Project URL** and **anon/public key**
   - Add them to your `.env` file

3. **Set Up Database Tables** (if needed):
   - Go to the Table Editor
   - Create necessary tables for your application
   - Set up Row Level Security (RLS) policies

#### Setting Up Gmail SMTP (for Email Notifications)

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification
   - Follow the setup process

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Name it "Woodland Conservation"
   - Copy the 16-character password
   - Add it to `SMTP_PASSWORD` in `.env`

3. **Update Email Settings:**
   - Set `SMTP_USERNAME` to your Gmail address
   - Set `EMAIL_FROM` to the same Gmail address
   - Keep `SMTP_SERVER` as `smtp.gmail.com`
   - Keep `SMTP_PORT` as `587`

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
│   ├── utils/           # Utility functions
│   ├── supabase.js      # Supabase client config
│   └── index.css        # Global styles with animations
├── data/                # JSON data files
│   ├── events.json      # Events data
│   └── bookings.json    # Bookings data
├── utils/               # Python utilities
│   └── email_service.py # Email service
├── distilgpt2-finetuned/ # AI model files
├── chatbot_api.py       # Chatbot API server
├── events_api.py        # Events API server
├── .env                 # Environment variables (DO NOT COMMIT)
├── .env.example         # Environment variables template
├── config.env           # Legacy config (deprecated)
├── package.json         # npm dependencies
├── requirements.txt     # Python dependencies
└── README.md           # This file
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

If you prefer to run services separately for debugging:

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
- **/** - Homepage with hero section and features
- **/about** - About the conservation area
- **/events** - Browse and book events
- **/gallery** - Photo gallery
- **/flora** - Local flora information
- **/contact** - Contact form with modern UI
- **/sitemap** - Interactive site map
- **/ecoveg** - Ecosystem and vegetation info
- **/ecommerce** - Conservation merchandise shop
- **/cart** - Shopping cart
- **/natural-burial** - Natural burial information

## 🎯 Key Features Guide

### Events & Booking System

1. Navigate to `/events`
2. Browse available events with filters (date, category, difficulty)
3. Click on an event to view details
4. Fill out the booking form
5. Receive instant confirmation with a unique confirmation code
6. Get a confirmation email (if SMTP is configured)
7. Download an `.ics` calendar file to add to your calendar

### AI Chatbot

- Click the chatbot bubble in the bottom-right corner
- Ask questions about the conservation area
- The AI responds using a fine-tuned model trained on conservation data
- Get instant answers about trails, wildlife, events, and more

### Contact Form

- Navigate to `/contact`
- Modern form with animations and dark mode support
- Text fields are fully visible in both light and dark modes
- Form validation with helpful error messages
- Smooth animations and hover effects
- Includes operating hours and location information

### Dark Mode

- Toggle in the navigation bar (moon/sun icon)
- Persists across page refreshes
- All components properly themed
- Smooth 300ms transitions
- Custom scrollbar styling

### Shopping Cart

- Browse merchandise at `/ecommerce`
- Add items to cart with quantity controls
- View cart at `/cart`
- Manage quantities and remove items
- See real-time total calculations
- Persistent cart using localStorage

### Accessibility Features

- **Text-to-Speech** buttons on various elements
- **Keyboard Navigation** support throughout
- **Screen Reader** friendly with ARIA labels
- **High Contrast** mode compatible
- **Focus States** on all interactive elements
- **Responsive Design** for all screen sizes

## 🔧 Troubleshooting

### Port Already in Use

If you get a port conflict error:

**Frontend (3070):**
- Change the port in `package.json` under `start:frontend` script
- Update `FRONTEND_URL` in `.env`

**Backend APIs (5000, 5001):**
- Change ports in `chatbot_api.py` and `events_api.py`
- Update `REACT_APP_CHATBOT_API_URL` and `REACT_APP_EVENTS_API_URL` in `.env`

### Email Not Sending

If confirmation emails aren't being sent:
1. Verify your Gmail credentials in `.env`
2. Make sure you're using an **App Password**, not your regular Gmail password
3. Check that 2-Factor Authentication is enabled
4. Check the console for email-related errors
5. Verify `SMTP_SERVER` and `SMTP_PORT` settings

### Supabase Connection Issues

If you can't connect to Supabase:
1. Verify your Supabase URL and key in `.env`
2. Check that your Supabase project is active
3. Verify network connectivity
4. Check browser console for specific error messages
5. Ensure Row Level Security (RLS) policies are configured correctly

### Chatbot Not Responding

If the chatbot doesn't work:
1. Ensure `distilgpt2-finetuned/` directory exists with model files
2. Check that the chatbot API is running on port 5000
3. Verify `REACT_APP_CHATBOT_API_URL` in `.env`
4. Check Python dependencies are installed
5. Look for errors in the Python console

### Events Not Loading

If events don't appear:
1. Check that `data/events.json` exists
2. Ensure the Events API is running on port 5001
3. Check browser console for API errors
4. Verify `REACT_APP_EVENTS_API_URL` in `.env`
5. Check Python console for backend errors

### Text Fields Not Visible in Dark Mode

This should now be fixed! But if you still have issues:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh the page (Ctrl+Shift+R)
3. Check that Material-UI theme is properly configured
4. Verify dark mode class is being applied to body element

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

### Environment Variables Not Loading

If environment variables aren't working:
1. Ensure `.env` file is in the root directory
2. Restart the development server
3. Check that variables start with `REACT_APP_` for frontend
4. Verify no typos in variable names
5. On Windows, make sure there are no extra spaces

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory ready for deployment.

**Before deploying:**
1. Update `.env` with production URLs
2. Set `FLASK_ENV=production`
3. Update `FRONTEND_URL` to your production domain
4. Configure production Supabase project
5. Set up production email credentials
6. Test all features in production mode

## 🧪 Running Tests

```bash
npm test
```

Runs the test suite in interactive watch mode.

## 📝 Environment Configuration Files

### `.env`
Main environment configuration file (Git-ignored for security)
- Contains actual credentials and API keys
- Must be created from `.env.example`
- Never commit this file to version control

### `.env.example`
Template file showing required environment variables
- Safe to commit to Git
- Used as reference for setting up `.env`
- Contains placeholder values

### `config.env` (Deprecated)
Legacy configuration file
- Still used by Python backend
- Will be migrated to `.env` in future updates
- Contains Flask and email settings

## 📚 Additional Documentation

- `EVENTS_IMPLEMENTATION_SUMMARY.md` - Events system architecture
- `EVENTS_SETUP_AND_TESTING.md` - Events testing guide
- `EMAIL_CONFIGURATION_GUIDE.md` - Detailed email setup
- `IMPLEMENTATION_GUIDE.md` - Development guide
- `UI_IMPROVEMENTS_README.md` - UI/UX improvements documentation
- `CHANGES_SUMMARY.md` - Summary of recent changes
- `NAVIGATION_DARKMODE_IMPROVEMENTS.md` - Dark mode implementation guide

## 🎨 UI/UX Features

### Modern Design Elements
- **Gradient Backgrounds** - Smooth, adaptive gradients throughout
- **Smooth Animations** - 300ms transitions on interactive elements
- **Hover Effects** - Scale transforms and shadow elevations
- **Glass Morphism** - Semi-transparent containers with backdrop blur
- **Custom Scrollbars** - Themed for both light and dark modes

### Animation Library
Built-in CSS animations:
- `fadeIn` - Smooth entry animation
- `slideIn` - Side entry animation
- `pulse` - Attention-grabbing effect
- `spin-slow` - Slow rotation for icons

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Color Palette

**Light Mode:**
- Primary: Green-600 to Green-700
- Secondary: Yellow-500 to Yellow-600
- Background: Green-50 → White → Blue-50
- Text: Gray-900 to Gray-600

**Dark Mode:**
- Primary: Green-400 (high contrast)
- Secondary: Yellow-500
- Background: Gray-900 → Gray-800
- Text: White to Gray-300

## 🤝 Contributing

This project was developed by:
- **Marko Ostrovitsa** (A00448932) - Navigation, Layout, UI/UX
- **Lakshay Bansal** (A00467478) - Contact Form, Accessibility
- **Sadikshya Oli** - E-commerce, Shopping Cart
- **Bhanu Prakash** (A00468530) - Site Map, Location Services
- **Cole Turner** (A00469026) - Map Integration, UI Design

## 📄 License

This project is part of an academic assignment for educational purposes.

## 🔐 Security Notes

- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Use App Passwords for Gmail (never regular passwords)
- Enable Row Level Security in Supabase
- Validate all user inputs server-side
- Use HTTPS in production
- Keep dependencies updated

## 🆘 Need Help?

If you encounter issues:

1. **Check Troubleshooting Section** - Most common issues are covered above
2. **Review Documentation** - Check additional documentation files
3. **Check Console Logs** - Browser console and terminal logs provide valuable info
4. **Verify Environment Variables** - Ensure all variables in `.env` are correct
5. **Check Dependencies** - Run `npm install` and `pip install -r requirements.txt`
6. **Restart Services** - Sometimes a simple restart fixes issues
7. **Clear Cache** - Clear browser cache and restart dev server

### Common Commands

```bash
# Restart everything
npm start

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Check for errors
npm test

# Build for production
npm run build

# Update dependencies
npm update
pip install --upgrade -r requirements.txt
```

## 🎉 You're All Set!

The application should now be running with:
- ✅ Modern, animated UI
- ✅ Perfect dark mode support
- ✅ Visible text fields in all themes
- ✅ Working Supabase integration
- ✅ Secure environment variable management
- ✅ Email notifications configured
- ✅ All features functional

**Enjoy exploring the Woodland Conservation Area!** 🌲🦌🌿

---

**Last Updated:** November 23, 2025  
**Version:** 2.0.0  
**Status:** Production Ready ✨

