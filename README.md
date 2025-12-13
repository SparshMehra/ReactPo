# 🌲 St. Margaret's Bay Woodland Conservation Area

A modern web application for the St. Margaret's Bay Woodland Conservation Area featuring an AI-powered chatbot, events booking system, image gallery, and educational content about local flora and fauna.

## 🌐 Live Demo

**Production URL:** http://ugdev.cs-smu.ca:8742/

---

## 👥 Authors

| Name | Student ID | Contributions |
|------|------------|---------------|
| **Abdiaziz Muse** | A00471783 | Lead UI/UX, Chatbot, Events System, Animations, Dark Mode |
| **Bhabin Chudal** | A00464169 | Backend APIs, Database, Email Services |
| **Sparsh Mehra** | A00472261 | Features Development, Testing, Documentation |
| **Sadikshya Oli** | A00457938 | E-commerce System, Shopping Cart |
| **Tongol Banguot** | A00479259 | Sitemap, Content Management |
| **S M Riyad Farhan** | A00470224 | Content Management, Data Integration, QA |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Interactive Homepage** | Hero section with animations and nature theme |
| 🤖 **AI Chatbot** | Fine-tuned DistilGPT-2 with rule-based fallback |
| 📅 **Events & Booking** | Calendar integration with email confirmations |
| 🖼️ **Image Gallery** | Showcase of the conservation area |
| 🌿 **Flora & Fauna** | Educational content about local species |
| 🌙 **Dark Mode** | Full theme support with smooth transitions |
| ♿ **Accessibility** | Text size adjustment, keyboard navigation |
| 📱 **Responsive Design** | Works on all devices |

---

## 🚀 Quick Start (Server)

**For ugdev.cs-smu.ca or similar Linux servers.**

### One-Command Setup

```bash
# 1. Connect to server
ssh group26B@ugdev.cs-smu.ca

# 2. Go to project folder
cd ~/ReactPoff

# 3. Make script executable (first time only)
chmod +x start.sh

# 4. Run the app
./start.sh
```

The script automatically:
- ✅ Creates Python virtual environment
- ✅ Installs dependencies
- ✅ Starts all services
- ✅ Shows clickable URL

### Access the App

**🌐 http://ugdev.cs-smu.ca:8742/**

### Server Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 8742 | http://ugdev.cs-smu.ca:8742 |
| Events API | 8743 | http://ugdev.cs-smu.ca:8743 |
| Chatbot API | 8744 | http://ugdev.cs-smu.ca:8744 |

### Stop the App

Press `Ctrl+C` in the terminal.

> ⚠️ **Note on Chatbot:** PyTorch requires ~5GB which exceeds server storage. The chatbot automatically uses an intelligent **rule-based fallback** covering 150+ topics.

---

## 🛠️ Manual Setup (Development)

### Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/))
- **npm** (comes with Node.js)

### Step 1: Get the Code

```bash
git clone https://github.com/yourusername/ReactPoff.git
cd ReactPoff
```

### Step 2: Install Dependencies

```bash
# Frontend
npm install

# Backend (choose one):

# Option A: Full (with ML chatbot, ~5GB)
pip install -r requirements.txt

# Option B: Minimal (rule-based chatbot, ~10MB) ✅ Recommended for ugdev servers if space is an issue
pip install -r requirements-server.txt
```

> 💡 **Recommendation:** Use **Option B** for server deployments. We could not install PyTorch on ugdev due to storage limits. The rule-based chatbot works great!

### Step 3: Configure Environment

Create `.env` file in root directory:

```env
# Supabase (optional)
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-key
```

Edit `config.env` for backend:

```env
FLASK_PORT=8743
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
FRONTEND_URL=http://localhost:8742
```

### Step 4: Run the App

```bash
npm start
```

This starts all three services simultaneously.

---

## 📁 Project Structure

```
ReactPoff/
├── src/                    # React source code
│   ├── components/
│   │   ├── chatbot/        # Chatbot UI
│   │   ├── events/         # Event booking
│   │   ├── pages/          # Page components
│   │   └── UI/             # Reusable components
│   ├── services/           # API services
│   ├── config/             # Configuration
│   └── assets/             # Images
├── data/                   # JSON data files
│   ├── events.json
│   └── bookings.json
├── distilgpt2-finetuned/   # AI model files
├── chatbot_api.py          # Chatbot Flask API
├── events_api.py           # Events Flask API
├── start.sh                # Quick start script
├── config.env              # Backend config
├── requirements.txt        # Full Python deps
└── requirements-server.txt # Minimal Python deps
```

---

## 📄 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero section |
| `/about` | About the conservation area |
| `/events` | Browse and book events |
| `/gallery` | Photo gallery |
| `/flora` | Local flora information |
| `/contact` | Contact form |
| `/sitemap` | Site navigation |
| `/ecommerce` | Merchandise shop |
| `/cart` | Shopping cart |

---

## 🤖 Chatbot Modes

### ML Model Mode (Full Installation)
- Uses fine-tuned DistilGPT-2
- Requires PyTorch (~5GB)
- AI-generated responses

### Rule-Based Fallback (Minimal Installation)
- Intelligent keyword matching
- 150+ topics covered
- Instant responses
- No ML dependencies needed

The chatbot auto-detects which mode to use at startup.

---

## 🔧 Troubleshooting

### Port in Use
```bash
lsof -i :8742
kill -9 <PID>
```

### Events Not Loading
1. Check `data/events.json` exists
2. Verify Events API is running on port 8743
3. Check browser console for errors

### Chatbot Not Working
1. Check if chatbot API is running on port 8744
2. For ML mode: verify `distilgpt2-finetuned/` folder exists
3. Check Python console for errors

### Virtual Environment Issues
```bash
deactivate
rm -rf .env
python3 -m venv .env
source .env/bin/activate
pip install -r requirements-server.txt
```

---

## 🛠️ Technologies

### Frontend
- React 18.3, React Router 6.27
- Tailwind CSS, Material-UI
- Framer Motion (animations)
- Axios, React Query

### Backend
- Python 3.8+, Flask
- DistilGPT-2 (chatbot)
- Gmail SMTP (emails)

---

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on Google Account
2. Generate App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Add to `config.env`:
   ```env
   SMTP_PASSWORD=your-16-char-app-password
   ```

---

## 📦 Build for Production

```bash
npm run build
```

Creates optimized build in `build/` directory.

---

## 🖼️ Image Credits

Some images on this website are sourced from the following:

1. **"Natural History of the French Village Conservation Woodland: A Report to the French Village Conservation Woodland Committee"**
   - Authors: David Patriquin, Jess Lewis, Livy Fraser, Liam Holwell, Rohan Kariyawansa
   - Date: November 2021

2. **[iNaturalist.org](https://www.inaturalist.org)**

All images are used for educational purposes only and will be individually cited.

---

## 📄 License

Academic project for educational purposes.

---

**Last Updated:** December 4, 2025 | **Version:** 2.6.0 | **Status:** Production Ready ✨

