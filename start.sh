#!/bin/bash
# ============================================================================
# Woodland Conservation Area - Quick Start Script
#
# @file start.sh
# @author Abdiaziz Muse (A00471783)
# @description Automated startup script for the Woodland Conservation application.
#              Activates virtual environment, installs dependencies if needed,
#              and starts all services with clickable URLs.
#
# Usage:
#     chmod +x start.sh
#     ./start.sh
#
# ============================================================================

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Server configuration
SERVER_HOST="ugdev.cs-smu.ca"
FRONTEND_PORT=8742
EVENTS_PORT=8743
CHATBOT_PORT=8744

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║   ${BOLD}🌲 Woodland Conservation Area - Quick Start 🌲${NC}${GREEN}              ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found!${NC}"
    echo -e "${YELLOW}   Please run this script from the ReactPoff project directory.${NC}"
    exit 1
fi

echo -e "${CYAN}📁 Working directory: $(pwd)${NC}"
echo ""

# Step 1: Create virtual environment if it doesn't exist
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}Step 1: Setting up Python virtual environment...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -d ".env" ]; then
    echo -e "${YELLOW}⚙️  Creating virtual environment...${NC}"
    python3 -m venv .env
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to create virtual environment${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "${GREEN}✅ Virtual environment already exists${NC}"
fi

# Activate virtual environment
echo -e "${YELLOW}⚙️  Activating virtual environment...${NC}"
source .env/bin/activate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to activate virtual environment${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Virtual environment activated${NC}"
echo ""

# Step 2: Install Python dependencies
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}Step 2: Installing Python dependencies...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check if flask is installed
python3 -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚙️  Installing Python packages (minimal - server mode)...${NC}"
    pip install -r requirements-server.txt --quiet
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Python dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Python dependencies installed (rule-based chatbot mode)${NC}"
else
    echo -e "${GREEN}✅ Python dependencies already installed${NC}"
fi
echo ""

# Step 3: Install Node.js dependencies
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}Step 3: Checking Node.js dependencies...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚙️  Installing Node.js packages (this may take a few minutes)...${NC}"
    npm install --silent
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Node.js dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Node.js dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Node.js dependencies already installed${NC}"
fi
echo ""

# Step 4: Display startup information
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}Step 4: Starting application...${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║   ${BOLD}🌲 APPLICATION STARTING... 🌲${NC}${GREEN}                                ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║   ${CYAN}Click the link below to open the application:${NC}${GREEN}              ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║   ${BOLD}${BLUE}➡️  http://${SERVER_HOST}:${FRONTEND_PORT}/${NC}${GREEN}                      ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║   ${NC}${BOLD}Services:${NC}${GREEN}                                                   ║${NC}"
echo -e "${GREEN}║   • Frontend:    ${CYAN}http://${SERVER_HOST}:${FRONTEND_PORT}${NC}${GREEN}               ║${NC}"
echo -e "${GREEN}║   • Events API:  ${CYAN}http://${SERVER_HOST}:${EVENTS_PORT}${NC}${GREEN}               ║${NC}"
echo -e "${GREEN}║   • Chatbot API: ${CYAN}http://${SERVER_HOST}:${CHATBOT_PORT}${NC}${GREEN}               ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}║   ${YELLOW}Press Ctrl+C to stop all services${NC}${GREEN}                          ║${NC}"
echo -e "${GREEN}║                                                                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Start the application
npm start

