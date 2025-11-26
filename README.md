# St. Margaret's Bay Woodland Conservation Area Website

A comprehensive web application for the St. Margaret's Bay Woodland Conservation Area featuring an interactive chatbot, events booking system, gallery, and educational content about local flora and fauna.

## 👥 Authors

- **Abdiaziz Muse** (A00471783)
- **Bhabin Chudal** (A00464169)
- **Sparsh Mehra** (A00472261)
- **Sadikshya Oli** (A00457938)
- **Tongol Banguot** (A00479259)
- **S M Riyad Farhan** (A00470224)

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
- **React Router DOM 6.27.0** - Navigation and routing
- **Framer Motion 12.23.24** - Advanced animations and transitions
- **Axios 1.13.1** - HTTP client for API calls
- **React Hook Form 7.66.0 + Yup 1.7.1** - Form validation and handling
- **React Hot Toast 2.6.0** - Beautiful toast notifications
- **React Toastify 11.0.5** - Additional toast notifications
- **React Calendar 6.0.0** - Interactive event calendar
- **Date-fns 4.1.0** - Modern date formatting utilities
- **React Icons 5.3.0** - Comprehensive icon library (15k+ icons)
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Material-UI (MUI) 7.3.5** - React component library with speed dial, modals
- **React Leaflet 4.2.1** - Interactive map components (Leaflet 1.9.4)
- **Supabase Client 2.83.0** - Real-time database integration
- **React Query (@tanstack/react-query 5.90.10)** - Server state management

### Backend
- **Python 3.8+** - Backend programming language
- **Flask** - Lightweight REST API server
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **DistilGPT-2** - Fine-tuned AI model for chatbot
- **Transformers (Hugging Face)** - AI model library
- **PyTorch** - Deep learning framework
- **Python-dotenv** - Environment variable management
- **SMTP (Gmail)** - Email service for booking confirmations

### Development Tools
- **Concurrently** - Run multiple npm scripts simultaneously
- **Cross-env** - Cross-platform environment variables

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
git clone https://github.com/yourusername/ReactPoff.git
cd ReactPoff
```

Or download and extract the ZIP file.

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install all required npm packages including:

**Core React Dependencies:**
- `react@18.3.1`, `react-dom@18.3.1` - React framework
- `react-router-dom@6.27.0` - Routing
- `react-scripts@5.0.1` - Build tooling

**UI Libraries:**
- `@mui/material@7.3.5`, `@mui/icons-material@7.3.5` - Material-UI components
- `@emotion/react@11.14.0`, `@emotion/styled@11.14.1` - CSS-in-JS styling
- `framer-motion@12.23.24` - Animation library
- `react-icons@5.3.0` - Icon library

**Data & API:**
- `@supabase/supabase-js@2.83.0` - Supabase client
- `@tanstack/react-query@5.90.10` - Data fetching and caching
- `axios@1.13.1` - HTTP requests

**Forms & Validation:**
- `react-hook-form@7.66.0` - Form handling
- `@hookform/resolvers@5.2.2` - Form validators
- `yup@1.7.1` - Schema validation

**UI Components:**
- `react-calendar@6.0.0` - Calendar component
- `react-hot-toast@2.6.0` - Toast notifications
- `react-toastify@11.0.5` - Additional notifications
- `react-leaflet@4.2.1` - Map components
- `date-fns@4.1.0` - Date utilities

**Dev Dependencies:**
- `tailwindcss@latest` - CSS framework
- `concurrently@latest` - Run multiple commands
- `cross-env@latest` - Cross-platform environment variables

### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `flask` - Web framework for REST APIs
- `flask-cors` - CORS support for React integration
- `transformers` - Hugging Face library for AI models
- `datasets` - Dataset utilities for AI training
- `accelerate` - Model optimization
- `torch` - PyTorch deep learning framework
- `safetensors` - Secure model serialization
- `python-dotenv` - Environment variable management

### Step 4: Configure Environment Variables

#### Frontend Configuration (Create `.env` file)

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com -> Project Settings -> API
REACT_APP_SUPABASE_URL=your-supabase-project-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Configuration
REACT_APP_CHATBOT_API_URL=http://localhost:5000
REACT_APP_EVENTS_API_URL=http://localhost:5001
```

**Note:** You can copy `.env.example` to `.env` as a starting point:
```bash
copy .env.example .env
```

#### Backend Configuration (Edit `config.env` file)

The backend uses `config.env` for configuration. Update the following values:

```env
FLASK_APP=events_api.py
FLASK_ENV=development
FLASK_PORT=5001

# Email Configuration - Update these values to enable email sending
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com

FRONTEND_URL=http://localhost:3070
ADMIN_EMAIL=admin@woodlandconservation.ca
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
   - Add it to `SMTP_PASSWORD` in `config.env`

3. **Update Email Settings in config.env:**
   - Set `SMTP_USERNAME` to your Gmail address
   - Set `EMAIL_FROM` to the same Gmail address
   - Keep `SMTP_SERVER` as `smtp.gmail.com`
   - Keep `SMTP_PORT` as `587`

### Step 5: Verify Project Structure

Ensure you have these key directories and files:

```
ReactPoff/
├── public/              # ✅ REQUIRED - Static files (favicon, manifest, index.html)
├── src/                 # ✅ REQUIRED - React source code
│   ├── components/      # React components
│   │   ├── chatbot/     # Chatbot components (ChatbotBubble, ChatbotWindow)
│   │   ├── events/      # Event booking components
│   │   ├── features/    # Feature-specific components (gallery, user)
│   │   ├── pages/       # Page components (Homepage, Events, Gallery, etc.)
│   │   └── UI/          # Reusable UI components (Button, Card, etc.)
│   ├── services/        # API service files (eventService.js)
│   ├── utils/           # Frontend utility functions (dateHelpers.js)
│   ├── assets/          # Images and media files
│   ├── config/          # Configuration files
│   ├── supabase.js      # Supabase client configuration
│   ├── App.js           # Main React component
│   ├── index.js         # React entry point
│   └── index.css        # Global styles with animations
├── utils/               # Backend Python utilities
│   └── email_service.py # Email service for bookings
├── data/                # JSON data files
│   ├── events.json      # Events data
│   └── bookings.json    # Bookings data
├── distilgpt2-finetuned/ # Fine-tuned AI model files
│   ├── config.json
│   ├── model.safetensors
│   ├── tokenizer.json
│   └── vocab.json
├── build/               # ⚠️ AUTO-GENERATED - Created by 'npm run build' (not in Git)
├── chatbot_api.py       # Chatbot API server (Port 5000)
├── events_api.py        # Events & Booking API server (Port 5001)
├── config.env           # Backend environment configuration
├── .env                 # Frontend environment variables (create from .env.example)
├── .env.example         # Environment variables template
├── package.json         # npm dependencies and scripts
├── requirements.txt     # Python dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

**Important Notes:**
- ✅ **`public/` is REQUIRED** - Contains essential files like `index.html`, `manifest.json`, favicon
- ✅ **`src/` is REQUIRED** - Your React application source code
- ⚠️ **`build/` is AUTO-GENERATED** - Created by `npm run build`, not tracked in Git
- 🔒 **`.env` must be created** - Copy from `.env.example` and fill in your values

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
1. Verify your Gmail credentials in `config.env`
2. Make sure you're using an **App Password**, not your regular Gmail password
3. Check that 2-Factor Authentication is enabled
4. Check the console for email-related errors
5. Verify `SMTP_SERVER` and `SMTP_PORT` settings in `config.env`

### Supabase Connection Issues

If you can't connect to Supabase:
1. Verify your Supabase URL and key in `.env`
2. Check that your Supabase project is active
3. Verify network connectivity
4. Check browser console for specific error messages
5. Ensure Row Level Security (RLS) policies are configured correctly

### Chatbot Not Responding

If the chatbot doesn't work:
1. Ensure `distilgpt2-finetuned/` directory exists with model files:
   - `config.json`
   - `model.safetensors`
   - `tokenizer.json`
   - `vocab.json`
   - `merges.txt`
2. Check that the chatbot API is running on port 5000
3. Verify `REACT_APP_CHATBOT_API_URL` in `.env`
4. Check Python dependencies are installed:
   ```bash
   pip install transformers torch flask flask-cors
   ```
5. Look for errors in the Python console
6. Check if PyTorch is properly installed:
   ```bash
   python -c "import torch; print(torch.__version__)"
   ```
7. If GPU issues, the model will automatically fall back to CPU

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

### Python Module Import Errors

If you get `ModuleNotFoundError`:

```bash
# Windows PowerShell
pip install -r requirements.txt

# Verify Python version (needs 3.8+)
python --version

# Check if modules are installed
pip list | Select-String -Pattern "flask|transformers|torch"

# If still having issues, try:
pip uninstall flask flask-cors transformers torch
pip install flask flask-cors transformers torch
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
2. Set `FLASK_ENV=production` in `config.env`
3. Update `FRONTEND_URL` to your production domain
4. Configure production Supabase project
5. Set up production email credentials
6. Test all features in production mode
7. Run `npm test` to ensure all tests pass
8. Optimize images and assets for faster loading

**Deployment Checklist:**
- [ ] Environment variables configured for production
- [ ] Supabase RLS policies properly set
- [ ] Email service tested and working
- [ ] All API endpoints secured
- [ ] CORS configured for production domain
- [ ] SSL/HTTPS enabled
- [ ] Error tracking configured
- [ ] Analytics integrated (if needed)

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

### `config.env`
Backend configuration file
- Contains Python backend settings
- Includes Flask and email SMTP configuration
- Not tracked in Git for security

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

## 🤝 Project Team

This project was developed by:
- **Abdiaziz Muse** (A00471783) - Lead UI/UX, Chatbot Integration, Events System, Animations, Dark Mode
- **Bhabin Chudal** (A00464169) - Backend APIs, Database Integration, Code Cleanup, Email Services
- **Sparsh Mehra** (A00472261) - Features Development, Testing, Documentation
- **Sadikshya Oli** (A00457938) - E-commerce System, Shopping Cart, Payment Integration
- **Tongol Banguot** (A00479259) - Sitemap, Content Management
- **S M Riyad Farhan** (A00470224) - Content Management, Data Integration, Quality Assurance

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

### Quick Reference

**Main Files to Edit:**
- `src/App.js` - Main React application and routing
- `src/components/pages/` - Page components (Homepage, Events, Contact, etc.)
- `chatbot_api.py` - Chatbot API server (Port 5000)
- `events_api.py` - Events & Booking API server (Port 5001)
- `config.env` - Backend configuration
- `.env` - Frontend environment variables

**Key Directories:**
- `src/components/chatbot/` - Chatbot UI components
- `src/components/events/` - Event and booking components
- `src/components/UI/` - Reusable UI components
- `src/services/` - API service files
- `data/` - JSON data files for events and bookings
- `distilgpt2-finetuned/` - AI model files

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

**Last Updated:** November 26, 2024
**Version:** 2.5.0
**Status:** Production Ready ✨

