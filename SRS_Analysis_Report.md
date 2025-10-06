# Software Requirements Specification (SRS) Report
## Woodland Conservation Area Web Application
### Project: ReactPoff

---

**Document Version:** 1.0  
**Date:** October 6, 2025  
**Project Type:** React Single Page Application  
**Team Members:**
- Marko Ostrovitsa (A00448932) - Navigation & App Structure
- Lakshay Bansal (A00467478) - Homepage, About, Contact
- Kunal Singla (A00461346) - Gallery & Flora/Fauna/Fungi
- Bhanu Prakash (A00468530) - Sitemap Directions & Flora Data
- Cole Turner (A00469026) - Sitemap UI & Flora Components

---

## Executive Summary

The Woodland Conservation Area web application is a React-based informational platform designed to showcase St. Margaret's Bay Area Woodland Conservation Site in Halifax, Nova Scotia. The application provides visitors with educational content about the 200-acre natural conservation area, featuring interactive maps, galleries, information about local flora/fauna/fungi, and accessibility features including text-to-speech functionality.

**Core Technologies:**
- React 18.3.1
- React Router DOM 6.27.0
- Tailwind CSS 3.4.14
- React Leaflet 4.2.1 (for mapping)
- React Icons 5.3.0

---

## 1. PRIORITIZED TASKS AND FEATURES

### Phase 1: Core MVP Features (COMPLETED ✓)

**Priority: CRITICAL - Status: IMPLEMENTED**

1. ✓ **Navigation System**
   - Responsive navigation bar with mobile menu
   - Dark/light mode toggle
   - Logo integration
   - Route-based navigation

2. ✓ **Homepage**
   - Dynamic day/night background based on theme
   - Interactive feature cards (Nature, Education, Volunteer)
   - Quick facts section (500+ acres, 200+ species, 10,000+ visitors)
   - Visitor reviews section
   - Call-to-action buttons

3. ✓ **About Page**
   - Comprehensive information about the conservation site
   - Text-to-speech accessibility feature
   - Accordion sections for Flora/Fauna and Heritage/Legacy
   - Hero image display
   - Expandable mission statement

4. ✓ **Contact Page**
   - Contact form (Name, Email, Message)
   - Text-to-speech for form labels
   - Social media integration (Facebook, Instagram, Twitter)
   - Contact information display
   - Gradient background design

5. ✓ **Gallery**
   - Grid-based image display (9 pre-loaded images)
   - Image upload functionality
   - Drag-and-drop upload interface
   - Hover effects and animations
   - Responsive grid layout

6. ✓ **Flora/Fauna/Fungi Page**
   - Interactive catalog of local species
   - Category filtering (All, Flora, Fauna, Fungi)
   - Modal view for detailed information
   - Sample data for 5 species:
     - Red Maple (Flora)
     - Star-nosed Mole (Fauna)
     - Golden Oyster Mushroom (Fungi)
     - Birch Tree (Flora)
     - Eastern Chipmunk (Fauna)

7. ✓ **Site Map**
   - Interactive map with image overlay
   - 5 Points of Interest (POI):
     - Trailhead
     - Farmhouse Foundation
     - Well
     - Sitting Area
     - Coastal Yellow Birch
   - "Get Directions" feature (Google Maps integration)
   - "You Are Here" location marker
   - Custom POI icons

8. ✓ **Dark Mode Implementation**
   - Application-wide dark/light theme toggle
   - Persistent theme across all pages
   - Dynamic background changes
   - Icon-based toggle (Sun/Moon)

### Phase 2: Critical Improvements (HIGH PRIORITY)

**Priority: HIGH - Status: PENDING**

9. **Missing Page Implementations**
   - Ecosystem page (linked in navigation but not implemented)
   - Natural Burial page (linked in navigation but not implemented)
   - eCommerce page (linked in navigation but not implemented)
   - **Estimated Effort:** 2-3 weeks

10. **Form Functionality**
    - Contact form submission handler
    - Form validation (email format, required fields)
    - Success/error messages
    - Backend API integration or email service
    - **Estimated Effort:** 1 week

11. **Gallery Backend Integration**
    - Persistent storage for uploaded images
    - Image compression/optimization
    - Image deletion functionality
    - Image metadata (date, uploader, description)
    - **Estimated Effort:** 1-2 weeks

12. **Flora/Fauna/Fungi Database**
    - Complete species database (currently only 5 entries)
    - Search functionality
    - Admin interface for adding/editing species
    - Scientific names and classifications
    - Conservation status information
    - **Estimated Effort:** 2 weeks

13. **Site Map Enhancements**
    - Real GPS location detection
    - Trail routing functionality
    - Distance calculations
    - Trail difficulty ratings
    - Weather information integration
    - **Estimated Effort:** 2 weeks

### Phase 3: Quality Assurance & Testing (MEDIUM PRIORITY)

**Priority: MEDIUM - Status: PENDING**

14. **Testing Infrastructure**
    - Unit tests for all components
    - Integration tests for user flows
    - End-to-end testing (Cypress/Playwright)
    - Test coverage reporting (target: 80%+)
    - **Estimated Effort:** 3 weeks

15. **Accessibility Improvements**
    - WCAG 2.1 Level AA compliance audit
    - Keyboard navigation for all interactive elements
    - ARIA labels for all controls
    - Screen reader optimization
    - Color contrast validation
    - Alternative text for all images
    - **Estimated Effort:** 2 weeks

16. **Error Handling**
    - Error boundaries for React components
    - User-friendly error messages
    - 404 page for invalid routes
    - Offline fallback page
    - API error handling
    - **Estimated Effort:** 1 week

17. **Performance Optimization**
    - Image lazy loading
    - Code splitting by route
    - Bundle size optimization
    - React.memo for expensive components
    - Lighthouse score optimization (target: 90+)
    - **Estimated Effort:** 1-2 weeks

### Phase 4: Documentation & Developer Experience (MEDIUM PRIORITY)

**Priority: MEDIUM - Status: PENDING**

18. **Documentation**
    - Component documentation (JSDoc/Storybook)
    - API documentation
    - User manual/help section
    - Deployment guide
    - Contribution guidelines
    - **Estimated Effort:** 2 weeks

19. **Code Quality Tools**
    - ESLint custom configuration
    - Prettier setup
    - Husky pre-commit hooks
    - Git commit message standards
    - **Estimated Effort:** 3 days

20. **CI/CD Pipeline**
    - Automated testing on PR
    - Build verification
    - Deployment automation
    - Environment management (dev, staging, prod)
    - **Estimated Effort:** 1 week

### Phase 5: Extended Features (LOW PRIORITY)

**Priority: LOW - Status: FUTURE**

21. **User Accounts & Authentication**
    - User registration/login
    - Profile management
    - Favorite locations/species
    - Visit history tracking
    - **Estimated Effort:** 3 weeks

22. **Advanced Features**
    - Virtual tour (360° images)
    - Audio guides for trails
    - Species identification tool (image recognition)
    - Event calendar and booking system
    - Newsletter subscription
    - Multi-language support (French for Nova Scotia)
    - **Estimated Effort:** 6-8 weeks

23. **eCommerce Implementation**
    - Product catalog (merchandise, donations)
    - Shopping cart
    - Payment processing (Stripe/PayPal)
    - Order management
    - **Estimated Effort:** 4 weeks

24. **Analytics & Monitoring**
    - Google Analytics integration
    - Error tracking (Sentry)
    - Performance monitoring
    - User behavior analytics
    - A/B testing framework
    - **Estimated Effort:** 1 week

25. **Social Features**
    - User reviews and ratings
    - Photo sharing community
    - Trail condition reports
    - Wildlife sighting reports
    - **Estimated Effort:** 3 weeks

---

## 2. DETAILED SOFTWARE REQUIREMENTS

### 2.1 Functional Requirements

#### FR-1: Navigation System
- **FR-1.1**: The system SHALL provide a responsive navigation bar accessible on all pages
- **FR-1.2**: The system SHALL support mobile navigation with hamburger menu for screens < 768px
- **FR-1.3**: The system SHALL provide navigation to: Homepage, About, Site Map, Gallery, Ecosystem, Flora/Fauna/Fungi, Natural Burial, eCommerce, and Contact
- **FR-1.4**: The system SHALL display logo in navigation bar
- **FR-1.5**: The system SHALL maintain navigation state across page transitions
- **FR-1.6**: The system SHALL highlight active navigation link
- **FR-1.7**: The system SHALL support smooth transitions for mobile menu (slide-in/slide-out)

#### FR-2: Theme Management
- **FR-2.1**: The system SHALL provide dark/light mode toggle accessible from navigation
- **FR-2.2**: The system SHALL persist theme preference across page navigation
- **FR-2.3**: The system SHALL update all page elements according to selected theme
- **FR-2.4**: The system SHALL use moon icon for light mode and sun icon for dark mode
- **FR-2.5**: The system SHALL apply theme changes within 300ms

#### FR-3: Homepage Features
- **FR-3.1**: The system SHALL display dynamic background image based on theme (day/night forest)
- **FR-3.2**: The system SHALL display site title "Woodland Conservation Area" prominently
- **FR-3.3**: The system SHALL provide three interactive feature cards:
  - Explore Nature (with tree icon)
  - Conservation Education (with leaf icon)
  - Volunteer & Support (with seedling icon)
- **FR-3.4**: The system SHALL display Quick Facts section with:
  - 500+ Acres of Protected Land
  - 200+ Wildlife Species
  - 10,000+ Annual Visitors
- **FR-3.5**: The system SHALL provide "Explore Now" call-to-action button
- **FR-3.6**: The system SHALL apply gradient overlay to background images for text readability

#### FR-4: About Page Features
- **FR-4.1**: The system SHALL display comprehensive information about St. Margaret's Bay Area Woodland Conservation Site
- **FR-4.2**: The system SHALL provide text-to-speech functionality for main content
- **FR-4.3**: The system SHALL allow users to pause/resume text-to-speech
- **FR-4.4**: The system SHALL use soft female voice at 1.4 pitch and 0.9 rate for speech
- **FR-4.5**: The system SHALL provide accordion sections for:
  - Flora & Fauna details
  - Heritage & Legacy information
- **FR-4.6**: The system SHALL display hero image (outlook.jpg)
- **FR-4.7**: The system SHALL provide expandable mission statement section
- **FR-4.8**: The system SHALL toggle accordion state on user click

#### FR-5: Contact Page Features
- **FR-5.1**: The system SHALL provide contact form with fields:
  - Name (text input)
  - Email (email input)
  - Message (textarea)
- **FR-5.2**: The system SHALL provide text-to-speech for form labels
- **FR-5.3**: The system SHALL display contact information:
  - Phone number with icon
  - Email address with icon
  - Physical address with icon
- **FR-5.4**: The system SHALL provide social media links:
  - Facebook
  - Instagram
  - Twitter
- **FR-5.5**: The system SHALL apply gradient background (green-300 to green-500)
- **FR-5.6**: The system SHALL provide visual feedback on form field focus

#### FR-6: Gallery Features
- **FR-6.1**: The system SHALL display pre-loaded images in responsive grid (1/2/3 columns)
- **FR-6.2**: The system SHALL support image upload via file input
- **FR-6.3**: The system SHALL support drag-and-drop image upload
- **FR-6.4**: The system SHALL accept multiple image files
- **FR-6.5**: The system SHALL display image name on hover
- **FR-6.6**: The system SHALL apply hover scale effect (105%) to images
- **FR-6.7**: The system SHALL support image formats: jpg, png, gif, webp
- **FR-6.8**: The system SHALL add uploaded images to existing gallery
- **FR-6.9**: The system SHALL read uploaded files as data URLs

#### FR-7: Flora/Fauna/Fungi Features
- **FR-7.1**: The system SHALL display catalog of local species with:
  - Image
  - Name
  - Category (Flora/Fauna/Fungi)
  - Description
- **FR-7.2**: The system SHALL provide category filter buttons:
  - All (default)
  - Flora
  - Fauna
  - Fungi
- **FR-7.3**: The system SHALL filter displayed items based on selected category
- **FR-7.4**: The system SHALL highlight active filter button
- **FR-7.5**: The system SHALL open modal with detailed information on item click
- **FR-7.6**: The system SHALL close modal on close button click or outside click
- **FR-7.7**: The system SHALL apply hover scale effect to grid items
- **FR-7.8**: The system SHALL display items in responsive grid (1/2/3 columns)

#### FR-8: Site Map Features
- **FR-8.1**: The system SHALL display interactive map with custom image overlay
- **FR-8.2**: The system SHALL display Points of Interest (POI) with custom icons:
  - Trailhead (hiking icon)
  - Farmhouse Foundation (farm icon)
  - Well (water-well icon)
  - Sitting Area (sitting icon)
  - Coastal Yellow Birch (birch icon)
- **FR-8.3**: The system SHALL open popup on POI marker click with:
  - POI name
  - "Get Directions" button
- **FR-8.4**: The system SHALL integrate with Google Maps for directions
- **FR-8.5**: The system SHALL provide "YOU ARE HERE" button to show user location
- **FR-8.6**: The system SHALL display user location marker when activated
- **FR-8.7**: The system SHALL disable map interactions: zoom, scroll, drag, double-click
- **FR-8.8**: The system SHALL constrain map view to bounds [0,0] to [546,648]
- **FR-8.9**: The system SHALL open Google Maps directions in new tab

#### FR-9: Accessibility Features
- **FR-9.1**: The system SHALL provide text-to-speech for About page content
- **FR-9.2**: The system SHALL provide text-to-speech for Contact form labels
- **FR-9.3**: The system SHALL provide volume icons to indicate speech state
- **FR-9.4**: The system SHALL support keyboard navigation for all interactive elements
- **FR-9.5**: The system SHALL maintain focus indicators on interactive elements
- **FR-9.6**: The system SHALL provide alternative text for images (PENDING)

### 2.2 Non-Functional Requirements

#### NFR-1: Performance
- **NFR-1.1**: Initial page load SHALL complete within 3 seconds on 3G connection
- **NFR-1.2**: Route transitions SHALL complete within 500ms
- **NFR-1.3**: Image hover effects SHALL render at 60fps
- **NFR-1.4**: Text-to-speech SHALL initiate within 200ms of user action
- **NFR-1.5**: Theme toggle SHALL apply changes within 300ms
- **NFR-1.6**: Gallery image grid SHALL render without layout shift
- **NFR-1.7**: Map interactions SHALL respond within 100ms
- **NFR-1.8**: Bundle size SHALL remain under 1MB (gzipped)

#### NFR-2: Usability
- **NFR-2.1**: Interface SHALL be intuitive without requiring training
- **NFR-2.2**: Navigation SHALL be accessible within 2 clicks from any page
- **NFR-2.3**: Mobile menu SHALL be operable with one hand
- **NFR-2.4**: Touch targets SHALL be minimum 44x44 pixels
- **NFR-2.5**: Color contrast SHALL meet WCAG AA standards (4.5:1 for text)
- **NFR-2.6**: Text-to-speech voice SHALL be clear and natural
- **NFR-2.7**: Form inputs SHALL provide clear validation feedback
- **NFR-2.8**: Error messages SHALL be user-friendly and actionable

#### NFR-3: Compatibility
- **NFR-3.1**: Application SHALL support Chrome (last 2 versions)
- **NFR-3.2**: Application SHALL support Firefox (last 2 versions)
- **NFR-3.3**: Application SHALL support Safari (last 2 versions)
- **NFR-3.4**: Application SHALL support Edge (last 2 versions)
- **NFR-3.5**: Application SHALL be responsive from 320px to 4K (3840px) width
- **NFR-3.6**: Application SHALL support portrait and landscape orientations
- **NFR-3.7**: Text-to-speech SHALL work on browsers supporting Web Speech API
- **NFR-3.8**: Map functionality SHALL work on browsers supporting HTML5 Canvas

#### NFR-4: Scalability
- **NFR-4.1**: Gallery SHALL support minimum 100 images without performance degradation
- **NFR-4.2**: Flora/Fauna/Fungi catalog SHALL support minimum 200 species
- **NFR-4.3**: Site map SHALL support minimum 20 POI markers
- **NFR-4.4**: Navigation SHALL support up to 15 menu items
- **NFR-4.5**: Component structure SHALL support future feature additions

#### NFR-5: Maintainability
- **NFR-5.1**: Code SHALL follow React best practices
- **NFR-5.2**: Components SHALL be modular and reusable
- **NFR-5.3**: All components SHALL include author attribution comments
- **NFR-5.4**: Styling SHALL use Tailwind CSS utility classes
- **NFR-5.5**: File structure SHALL separate components, assets, and configuration
- **NFR-5.6**: Code SHALL be self-documenting with clear variable names
- **NFR-5.7**: Dependencies SHALL be kept up-to-date for security

#### NFR-6: Security
- **NFR-6.1**: Application SHALL not expose sensitive data in client code
- **NFR-6.2**: File uploads SHALL validate file types
- **NFR-6.3**: File uploads SHALL have size limits (recommended: 5MB per file)
- **NFR-6.4**: Form inputs SHALL sanitize user input to prevent XSS
- **NFR-6.5**: External links SHALL use rel="noopener noreferrer"
- **NFR-6.6**: Dependencies SHALL be scanned for vulnerabilities regularly

#### NFR-7: Reliability
- **NFR-7.1**: Application SHALL handle missing images gracefully
- **NFR-7.2**: Application SHALL handle speech synthesis unavailability
- **NFR-7.3**: Application SHALL maintain state consistency across navigation
- **NFR-7.4**: Application SHALL recover from JavaScript errors without full reload
- **NFR-7.5**: Map SHALL display fallback content if image overlay fails
- **NFR-7.6**: Gallery SHALL handle upload errors with user feedback

#### NFR-8: Localization (Future)
- **NFR-8.1**: Application SHOULD support English (current)
- **NFR-8.2**: Application SHOULD support French for Quebec/Nova Scotia users
- **NFR-8.3**: Text-to-speech SHOULD support multiple languages
- **NFR-8.4**: Date/time formats SHOULD respect user locale

---

## 3. UML USE CASE DIAGRAMS

### Diagram 1: "Visitor Information & Navigation System"
**Assigned to: Marko Ostrovitsa (A00448932) - Frontend Developer**

**Description**: This use case covers how visitors interact with the website's navigation, explore content, and customize their viewing experience through theme selection.

```
┌─────────────────────────────────────────────────────────────┐
│         Visitor Information & Navigation System              │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │              │
                    │   Website    │
                    │   Visitor    │
                    │              │
                    └──────┬───────┘
                           │
                           │ interacts with
                           │
        ┌──────────────────┼────────────────────┐
        │                  │                    │
        ▼                  ▼                    ▼
   ┌─────────┐      ┌──────────┐        ┌──────────┐
   │Navigate │      │View      │        │Toggle    │
   │Website  │      │Content   │        │Dark Mode │
   └────┬────┘      └────┬─────┘        └──────────┘
        │                │
        │                │
        │includes        │includes
        │                │
        ▼                ▼
   ┌─────────┐      ┌──────────┐
   │Access   │      │Browse    │
   │Mobile   │      │Homepage  │
   │Menu     │      │Features  │
   └─────────┘      └────┬─────┘
                         │
                         │extends
                         │
                         ▼
                    ┌──────────┐
                    │View Quick│
                    │Facts     │
                    └──────────┘

Primary Use Cases:
1. Navigate Website: Visitor uses navigation bar to access different sections
   - Access pages: Homepage, About, Gallery, Flora/Fauna, Sitemap, Contact
   - Desktop navigation: Direct menu links
   - Mobile navigation: Hamburger menu
   
2. Access Mobile Menu: On small screens, visitor opens/closes hamburger menu
   - Tap hamburger icon to open menu
   - View all navigation options
   - Tap link or close icon to dismiss

3. Toggle Dark Mode: Visitor switches between light and dark themes
   - Click sun/moon icon in navigation
   - Theme applies across all pages
   - Visual preference persists during session

4. View Content: Visitor explores information about conservation area
   - Read about the 200-acre woodland site
   - Learn about conservation efforts
   - Discover visitor information

5. Browse Homepage Features: Visitor explores interactive cards
   - Explore Nature section
   - Conservation Education information
   - Volunteer & Support opportunities

6. View Quick Facts: Visitor sees statistical highlights
   - 500+ acres of protected land
   - 200+ wildlife species
   - 10,000+ annual visitors
```

---

### Diagram 2: "Educational Content & Accessibility System"
**Assigned to: Lakshay Bansal (A00467478) - Content & Accessibility Specialist**

**Description**: This use case focuses on how visitors access educational content about the conservation area and utilize accessibility features like text-to-speech.

```
┌─────────────────────────────────────────────────────────────┐
│       Educational Content & Accessibility System             │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │              │
                    │   Visitor    │
                    │  (including  │
                    │   visually   │
                    │   impaired)  │
                    └──────┬───────┘
                           │
                           │ accesses
                           │
        ┌──────────────────┼────────────────────┐
        │                  │                    │
        ▼                  ▼                    ▼
   ┌─────────┐      ┌──────────┐        ┌──────────┐
   │Read     │      │Listen to │        │Submit    │
   │About    │      │Content   │        │Contact   │
   │Page     │      │(TTS)     │        │Form      │
   └────┬────┘      └────┬─────┘        └────┬─────┘
        │                │                   │
        │                │                   │
        │includes        │includes           │includes
        │                │                   │
        ▼                ▼                   ▼
   ┌─────────┐      ┌──────────┐        ┌──────────┐
   │Expand   │      │Pause/    │        │Hear Form │
   │Mission  │      │Resume    │        │Labels    │
   │Statement│      │Speech    │        │(TTS)     │
   └─────────┘      └──────────┘        └──────────┘
        │                                    
        ▼                                    
   ┌─────────┐      
   │View     │      
   │Accordion│      
   │Sections │      
   └─────────┘      
        │
        │includes
        ▼
   ┌─────────┐
   │Learn    │
   │Flora &  │
   │Fauna    │
   └─────────┘

Primary Use Cases:
1. Read About Page: Visitor learns about St. Margaret's Bay Conservation Site
   - View hero image of woodland outlook
   - Read site description and history
   - Access location information (Halifax, Nova Scotia)
   - Learn about 200-acre ecosystem

2. Expand Mission Statement: Visitor reads full conservation mission
   - Click "Show More" to expand
   - Read complete mission details
   - Click "Show Less" to collapse

3. View Accordion Sections: Visitor explores detailed topics
   - Click accordion headers to expand/collapse
   - Flora & Fauna section: Species information
   - Heritage & Legacy section: Historical context

4. Learn Flora & Fauna: Visitor discovers biodiversity
   - Learn about local species
   - Understand conservation importance
   - Access species catalogs

5. Listen to Content (Text-to-Speech): Visitor hears page content
   - Click volume icon to start speech
   - System reads about page content
   - Soft female voice (pitch 1.4, rate 0.9)
   - Clear and natural pronunciation

6. Pause/Resume Speech: Visitor controls audio playback
   - Click volume icon to pause active speech
   - Click again to resume
   - Visual indicator shows speech state

7. Submit Contact Form: Visitor reaches out to conservation area
   - Fill in name, email, message fields
   - Review contact information
   - Access social media links

8. Hear Form Labels (TTS): Visitor hears form instructions
   - Click speaker icon next to labels
   - Hear field purpose ("Please enter a name")
   - Accessible form completion
```

---

### Diagram 3: "Media Management & Species Catalog System"
**Assigned to: Kunal Singla (A00461346) - Media & Content Manager**

**Description**: This use case illustrates how visitors interact with the gallery system and explore the flora/fauna/fungi catalog with filtering capabilities.

```
┌─────────────────────────────────────────────────────────────┐
│        Media Management & Species Catalog System             │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │              │
                    │   Visitor /  │
                    │ Contributor  │
                    │              │
                    └──────┬───────┘
                           │
                           │ uses
                           │
        ┌──────────────────┼────────────────────┐
        │                  │                    │
        ▼                  ▼                    ▼
   ┌─────────┐      ┌──────────┐        ┌──────────┐
   │Browse   │      │Upload    │        │Explore   │
   │Gallery  │      │Images    │        │Species   │
   └────┬────┘      └────┬─────┘        │Catalog   │
        │                │               └────┬─────┘
        │                │                    │
        │includes        │includes            │includes
        │                │                    │
        ▼                ▼                    ▼
   ┌─────────┐      ┌──────────┐        ┌──────────┐
   │View     │      │Drag &    │        │Filter by │
   │Image    │      │Drop      │        │Category  │
   │Details  │      │Files     │        └────┬─────┘
   └─────────┘      └──────────┘             │
                         │                    │includes
                         │                    │
                         ▼                    ▼
                    ┌──────────┐        ┌──────────┐
                    │Select    │        │View      │
                    │Multiple  │        │Species   │
                    │Files     │        │Details   │
                    └──────────┘        └────┬─────┘
                                             │
                                             │extends
                                             │
                                             ▼
                                        ┌──────────┐
                                        │View in   │
                                        │Modal     │
                                        └──────────┘

Primary Use Cases:
1. Browse Gallery: Visitor views forest and landscape images
   - View grid of images (1/2/3 columns based on screen size)
   - See image names on hover
   - Enjoy hover animations (scale effect)
   - Browse pre-loaded gallery (9 images)

2. View Image Details: Visitor examines specific image
   - Hover over image to see overlay
   - View image name
   - See enlarged preview on hover (110% scale)

3. Upload Images: Contributor adds photos to gallery
   - Access upload section at bottom of gallery
   - Share woodland photos with community
   - Contribute to visual documentation

4. Drag & Drop Files: Contributor uses convenient upload
   - Drag image files to upload zone
   - See upload area highlight on drag over
   - Drop files to initiate upload

5. Select Multiple Files: Contributor uploads multiple images
   - Click "Upload Images" button
   - Select multiple files from file picker
   - Upload all selected images at once
   - Support for jpg, png, gif formats

6. Explore Species Catalog: Visitor learns about local biodiversity
   - Browse Flora, Fauna, and Fungi species
   - View species images and names
   - Access comprehensive species information
   - Current catalog: 5 species
     * Red Maple (Flora)
     * Star-nosed Mole (Fauna)
     * Golden Oyster Mushroom (Fungi)
     * Birch Tree (Flora)
     * Eastern Chipmunk (Fauna)

7. Filter by Category: Visitor narrows species view
   - Click "All" to see all species (default)
   - Click "Flora" to see only plants
   - Click "Fauna" to see only animals
   - Click "Fungi" to see only mushrooms
   - Active filter highlighted visually

8. View Species Details: Visitor learns about specific species
   - Click on species card in grid
   - Read full description
   - View larger image
   - Learn about habitat and characteristics

9. View in Modal: Visitor sees detailed species information
   - Modal opens with species data
   - Includes image, name, category, description
   - Close modal by clicking X or outside area
   - Smooth transition animations
```

---

### Diagram 4: "Interactive Mapping & Wayfinding System"
**Assigned to: Bhanu Prakash (A00468530) & Cole Turner (A00469026) - GIS Specialists**

**Description**: This use case demonstrates how visitors interact with the conservation area map, discover points of interest, and get directions to locations.

```
┌─────────────────────────────────────────────────────────────┐
│       Interactive Mapping & Wayfinding System                │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │              │
                    │   Visitor    │
                    │   (Onsite/   │
                    │   Planning)  │
                    └──────┬───────┘
                           │
                           │ uses
                           │
        ┌──────────────────┼────────────────────┐
        │                  │                    │
        ▼                  ▼                    ▼
   ┌─────────┐      ┌──────────┐        ┌──────────┐
   │View     │      │Discover  │        │Get       │
   │Site Map │      │Points of │        │Directions│
   └────┬────┘      │Interest  │        └────┬─────┘
        │           └────┬─────┘             │
        │                │                   │
        │includes        │includes           │uses
        │                │                   │
        ▼                ▼                   ▼
   ┌─────────┐      ┌──────────┐      ┌──────────┐
   │See      │      │Click POI │      │Open      │
   │Location │      │Marker    │      │Google    │
   │Marker   │      └────┬─────┘      │Maps      │
   └─────────┘           │            └──────────┘
                         │includes
                         │
                         ▼
                    ┌──────────┐
                    │View POI  │
                    │Details   │
                    └──────────┘

                    ┌──────────────┐
                    │              │
                    │Google Maps   │
                    │   System     │
                    │  (External)  │
                    └──────┬───────┘
                           │
                           │ provides
                           │
                           ▼
                    ┌──────────┐
                    │Turn-by-  │
                    │Turn      │
                    │Directions│
                    └──────────┘

Primary Use Cases:
1. View Site Map: Visitor explores conservation area layout
   - View custom map with woodland image overlay
   - See trail system and pathways
   - Identify key locations
   - Map size: 648x546 pixels
   - Simple coordinate system for custom image

2. See Location Marker: Visitor identifies their position
   - Click "YOU ARE HERE" button
   - Red marker with person emoji appears
   - Simulated location on map (fixed coordinates)
   - Helps orientation on trails

3. Discover Points of Interest: Visitor finds notable locations
   - View 5 POI markers on map:
     * Trailhead (starting point)
     * Farmhouse Foundation (historical site)
     * Well (water source)
     * Sitting Area (rest spot)
     * Coastal Yellow Birch (notable tree)
   - Each POI has custom icon
   - Visual landmarks for navigation

4. Click POI Marker: Visitor selects location to learn more
   - Click any POI icon on map
   - Marker responds to click
   - Popup appears with information
   - Interactive map experience

5. View POI Details: Visitor reads location information
   - Popup displays POI name
   - Brief description (if available)
   - "Get Directions" button visible
   - Close popup by clicking elsewhere

6. Get Directions: Visitor plans route to location
   - Click "Get Directions" button in POI popup
   - System opens Google Maps in new tab
   - Pre-filled origin (default user location)
   - Pre-filled destination (POI GPS coordinates)
   - Driving mode selected by default

7. Open Google Maps: External navigation system
   - New browser tab opens
   - Google Maps interface loads
   - Route calculated automatically
   - Full Google Maps functionality available

8. Turn-by-Turn Directions: Visitor follows route guidance
   - Google Maps provides detailed route
   - Distance and time estimates
   - Alternative routes if available
   - Real-time navigation support

POI GPS Coordinates:
- Trailhead: 44.625028°N, 63.921417°W
- Farmhouse Foundation: 44.625833°N, 63.920972°W
- Well: 44.624022°N, 63.920028°W
- Sitting Area: 44.625028°N, 63.920417°W
- Coastal Yellow Birch: 44.624000°N, 63.920056°W

Map Features:
- Fixed bounds (no panning)
- Zoom disabled
- Scroll zoom disabled
- Double-click zoom disabled
- Dragging disabled
- Custom image overlay (rewildingBirch222.jpg)
- Leaflet mapping library
- Responsive design
```

---

## 4. CURRENT SYSTEM ANALYSIS

### 4.1 Implemented Features Summary

**Completed Components (8/11 pages):**
1. ✓ Navigation - Fully responsive with mobile menu and theme toggle
2. ✓ Homepage - Dynamic backgrounds, feature cards, quick facts
3. ✓ About - Text-to-speech, accordions, mission statement
4. ✓ Contact - Form with TTS labels, social media links
5. ✓ Gallery - Image display, upload functionality
6. ✓ Flora/Fauna/Fungi - Catalog with filtering and modal view
7. ✓ Site Map - Interactive map with POI and directions
8. ✗ Ecosystem - Link exists, page not implemented
9. ✗ Natural Burial - Link exists, page not implemented
10. ✗ eCommerce - Link exists, page not implemented
11. Sitemap (appears to be implemented based on routing)

**Key Technical Implementations:**
- React Router for navigation
- Tailwind CSS for styling
- React Icons for icon library
- React Leaflet for mapping
- Web Speech API for text-to-speech
- FileReader API for image uploads
- Responsive design (mobile-first approach)
- Dark mode with system-wide state management

**Accessibility Features:**
- Text-to-speech on About and Contact pages
- Soft female voice (customized pitch and rate)
- Visual feedback (hover effects, transitions)
- Mobile-responsive design
- Touch-friendly interface (large touch targets)

### 4.2 Missing Implementations

**Critical Missing Features:**
1. **Backend Integration**
   - No API endpoints for data persistence
   - Contact form doesn't submit anywhere
   - Gallery uploads not saved (client-side only)
   - No database for species catalog

2. **Three Incomplete Pages**
   - Ecosystem page
   - Natural Burial page
   - eCommerce page

3. **Form Validation**
   - No input validation on contact form
   - No error handling for invalid emails
   - No required field enforcement
   - No success/failure messages

4. **Error Handling**
   - No error boundaries
   - No 404 page
   - No offline fallback
   - No graceful degradation for failed features

5. **Testing**
   - No test files (beyond default setupTests.js)
   - No test coverage
   - No E2E tests

6. **SEO & Meta Tags**
   - No dynamic page titles
   - No meta descriptions
   - No Open Graph tags
   - No structured data

### 4.3 Code Quality Observations

**Strengths:**
- Clear author attribution in all files
- Consistent file naming conventions
- Good component separation
- Descriptive variable names
- Purpose comments at file headers
- Modular component structure

**Areas for Improvement:**
- PropTypes or TypeScript for type checking
- More inline code comments for complex logic
- Extraction of magic numbers to constants
- Environment variables for configuration
- Consistent spacing and formatting
- Error boundary implementation
- Loading states for async operations

### 4.4 Technical Debt

**High Priority:**
1. Missing page implementations (3 pages)
2. Non-functional contact form
3. Gallery uploads not persisted
4. No error handling
5. No testing infrastructure

**Medium Priority:**
1. Hard-coded data (should be from API/database)
2. No loading states
3. No input validation
4. Missing accessibility features (alt text)
5. No performance optimization

**Low Priority:**
1. No code splitting
2. No lazy loading
3. No PWA features
4. No analytics
5. No monitoring

---

## 5. SELF-CRITIQUE AND ANALYSIS

### 5.1 Assumptions Made

1. **Project Purpose**: Assumed this is a real-world conservation area website for St. Margaret's Bay, Halifax, NS. It could be a student project or prototype.

2. **Target Audience**: Assumed primary users are:
   - General public interested in nature
   - Tourists planning visits
   - Local residents
   - Conservation enthusiasts
   - Educators and students
   
   However, specific user personas are not documented.

3. **Data Accuracy**: Assumed the quick facts (500+ acres, 200+ species, 10,000+ visitors) are accurate. These should be verified with actual conservation area data.

4. **GPS Coordinates**: Assumed the POI coordinates are accurate for the actual locations. These should be verified on-site.

5. **Content Completeness**: Assumed the current 5 species in the flora/fauna catalog is a starting point and should be expanded to match the "200+ species" claim.

6. **Browser Support**: Assumed modern browser support. Text-to-speech may not work on all browsers (Web Speech API support varies).

7. **Deployment Environment**: Assumed deployment to a standard web server. No specific hosting requirements documented.

8. **Business Model**: Assumed non-profit educational site. eCommerce page suggests some commercial aspects (merchandise/donations).

9. **Team Structure**: Assumed student team project based on multiple authors and academic ID numbers (A00...).

10. **Timeline**: Assumed active development project. No project timeline or milestones documented.

### 5.2 Potential Missing Elements

#### 5.2.1 Requirements Documentation
- User stories for each feature
- Acceptance criteria for testing
- Performance benchmarks with metrics
- Security requirements and threat model
- Compliance requirements (accessibility, privacy)
- Browser compatibility matrix
- Device testing matrix

#### 5.2.2 User Experience
- User journey maps
- Wireframes for missing pages
- Style guide and design system
- Content strategy
- Information architecture
- Usability testing results
- User feedback mechanism

#### 5.2.3 Technical Architecture
- System architecture diagram
- Data flow diagrams
- Database schema (when implemented)
- API specifications (when implemented)
- Deployment architecture
- Environment configurations
- Third-party integrations documentation

#### 5.2.4 Content Management
- Content update procedures
- Image optimization workflow
- Species data sources
- Content review process
- Translation workflow (for future i18n)

#### 5.2.5 Operations
- Deployment procedures
- Rollback procedures
- Monitoring and alerting
- Backup and recovery
- Performance optimization plan
- Scaling strategy

#### 5.2.6 Legal and Compliance
- Privacy policy
- Terms of service
- Cookie policy
- Image copyright/licensing
- Accessibility statement
- GDPR compliance (if applicable)

#### 5.2.7 Quality Assurance
- Test plan
- Test cases
- Bug tracking process
- Code review process
- QA environment setup

### 5.3 Gaps in Current Analysis

1. **No User Research Data**: Analysis is based on code only, not on actual user needs or feedback.

2. **No Competitive Analysis**: No comparison with similar conservation area websites.

3. **No Analytics**: No data on current usage patterns (if site is already deployed).

4. **No Performance Metrics**: No baseline performance measurements.

5. **No Accessibility Audit**: While some features exist, no comprehensive WCAG audit performed.

6. **No Security Assessment**: No security testing or vulnerability scanning results.

7. **No Budget/Resource Constraints**: No information about available resources for implementing recommendations.

8. **No Success Metrics**: No defined KPIs or success criteria for the project.

### 5.4 How Humans Can Improve This Output

#### 5.4.1 Immediate Actions

1. **Stakeholder Interviews**
   - Interview conservation area management
   - Understand primary goals and objectives
   - Identify priority features
   - Clarify budget and timeline

2. **User Research**
   - Interview potential visitors
   - Conduct usability testing on current site
   - Create user personas
   - Map user journeys
   - Identify pain points

3. **Content Audit**
   - Verify all factual information
   - Source accurate species data
   - Obtain proper image licensing
   - Verify GPS coordinates
   - Collect missing content for incomplete pages

4. **Technical Review**
   - Conduct code review with team
   - Identify quick wins vs. long-term improvements
   - Assess current performance
   - Review security implications
   - Plan refactoring strategy

5. **Prioritization Workshop**
   - Involve all stakeholders
   - Use MoSCoW method (Must, Should, Could, Won't)
   - Consider business value vs. effort
   - Create realistic roadmap

#### 5.4.2 Strategic Improvements

1. **Define Clear Objectives**
   - What does success look like?
   - Who are the primary users?
   - What actions should users take?
   - How will success be measured?

2. **Create User Personas**
   - Tourist planning visit
   - Local nature enthusiast
   - Educator seeking resources
   - Volunteer wanting to help
   - Researcher studying ecosystem

3. **Map User Journeys**
   - Discovery: How do users find the site?
   - Exploration: What do they look for?
   - Engagement: What actions do they take?
   - Return: Why would they come back?

4. **Establish KPIs**
   - Page views and unique visitors
   - Average session duration
   - Contact form submissions
   - Direction requests from map
   - Gallery contributions
   - Social media engagement

5. **Create Content Strategy**
   - Regular blog posts about conservation
   - Seasonal updates
   - Event calendar
   - News and announcements
   - Educational resources

#### 5.4.3 Technical Improvements

1. **Backend Development**
   - Choose backend technology (Node.js, Python, etc.)
   - Design database schema
   - Create REST or GraphQL API
   - Implement authentication if needed
   - Set up file storage for uploads

2. **Complete Missing Pages**
   - **Ecosystem Page**: 
     - Describe woodland ecosystem
     - Food web diagram
     - Climate and soil information
     - Conservation challenges
   
   - **Natural Burial Page**:
     - Explain natural burial concept
     - Available options
     - Environmental benefits
     - Booking information
   
   - **eCommerce Page**:
     - Conservation area merchandise
     - Donation options
     - Membership programs
     - Shopping cart functionality

3. **Implement Comprehensive Testing**
   - Unit tests for all components
   - Integration tests for user flows
   - E2E tests for critical paths
   - Visual regression testing
   - Performance testing
   - Accessibility testing

4. **Add Monitoring and Analytics**
   - Google Analytics or privacy-focused alternative
   - Error tracking (Sentry, Rollbar)
   - Performance monitoring (Lighthouse CI)
   - Uptime monitoring
   - User behavior analytics

5. **Optimize Performance**
   - Image optimization (WebP, lazy loading)
   - Code splitting by route
   - Caching strategy
   - CDN for static assets
   - Minification and compression

#### 5.4.4 Design Improvements

1. **Visual Design Audit**
   - Ensure consistent spacing
   - Verify color contrast ratios
   - Create design system/style guide
   - Improve typography hierarchy
   - Add visual interest without clutter

2. **Accessibility Enhancements**
   - Add alt text to all images
   - Ensure keyboard navigation works everywhere
   - Test with screen readers
   - Add skip navigation links
   - Improve focus indicators

3. **Mobile Experience**
   - Test on real devices
   - Optimize touch targets
   - Improve mobile performance
   - Consider mobile-specific features

4. **Progressive Enhancement**
   - Ensure basic functionality without JavaScript
   - Provide fallbacks for unsupported features
   - Consider offline functionality

### 5.5 Validation Questions for Stakeholders

1. **Vision & Goals**
   - What is the primary goal of this website?
   - What does success look like in 6 months? 1 year?
   - Who is the target audience?
   - What actions should visitors take?

2. **Content**
   - What should be on the Ecosystem page?
   - What is the natural burial program?
   - What will be sold in eCommerce?
   - Who will maintain and update content?

3. **Features**
   - Which features are must-haves for launch?
   - Are there features not yet discussed that are needed?
   - What integrations are required (payment, CRM, etc.)?

4. **Resources**
   - What is the budget for development?
   - What is the timeline for launch?
   - Who will maintain the site post-launch?
   - Are there hosting preferences?

5. **Data**
   - Are the quick facts accurate?
   - Where can we get comprehensive species data?
   - Are POI locations and coordinates correct?
   - Do we have permission to use all images?

6. **Compliance**
   - Are there accessibility requirements?
   - Any legal requirements (privacy policy, etc.)?
   - Language requirements (English/French)?

### 5.6 Risk Analysis

#### High Risk Items

1. **Incomplete Navigation Links**
   - **Risk**: Users click links that go nowhere (Ecosystem, Natural Burial, eCommerce)
   - **Impact**: Poor user experience, loss of credibility
   - **Mitigation**: Either implement pages or remove links

2. **Non-Functional Contact Form**
   - **Risk**: Users submit forms but nothing happens
   - **Impact**: Frustrated users, missed opportunities
   - **Mitigation**: Implement form handling or add "Coming Soon" message

3. **Gallery Uploads Not Saved**
   - **Risk**: Users upload images that disappear on refresh
   - **Impact**: Wasted effort, user disappointment
   - **Mitigation**: Add warning message or implement persistence

4. **No Error Handling**
   - **Risk**: App crashes on errors, poor user experience
   - **Impact**: Loss of users, poor perception
   - **Mitigation**: Implement error boundaries and graceful fallbacks

#### Medium Risk Items

1. **Hard-Coded Data**
   - **Risk**: Difficult to update, not scalable
   - **Impact**: High maintenance burden
   - **Mitigation**: Move to database/CMS

2. **Text-to-Speech Browser Support**
   - **Risk**: Feature doesn't work in some browsers
   - **Impact**: Accessibility feature fails
   - **Mitigation**: Add browser detection and fallback message

3. **No Input Validation**
   - **Risk**: Users enter invalid data
   - **Impact**: Poor data quality, potential security issues
   - **Mitigation**: Add comprehensive validation

#### Low Risk Items

1. **Missing Alt Text**
   - **Risk**: Accessibility issues
   - **Impact**: Screen reader users miss content
   - **Mitigation**: Add descriptive alt text

2. **No Analytics**
   - **Risk**: No visibility into usage
   - **Impact**: Can't measure success or improve
   - **Mitigation**: Implement analytics

---

## 6. IMPLEMENTATION ROADMAP

### Phase 1: Critical Fixes (Week 1-2)

**Goal**: Make existing features functional and reliable

1. **Complete Missing Pages** (3-4 days)
   - Create Ecosystem.js component
   - Create NaturalBurial.js component
   - Create Ecommerce.js component
   - Add basic content and layouts
   - Add routes in App.js

2. **Implement Contact Form** (2-3 days)
   - Set up EmailJS or similar service
   - Add form validation
   - Add submit handler
   - Add success/error messages
   - Test email delivery

3. **Add Error Handling** (2-3 days)
   - Create error boundary component
   - Add error handling to async operations
   - Create 404 page
   - Add loading states
   - Test error scenarios

4. **Fix Navigation Links** (1 day)
   - Ensure all links work
   - Update paths in Navigation.js
   - Test all navigation flows

### Phase 2: Data & Backend (Week 3-5)

**Goal**: Add persistence and dynamic data

1. **Backend Setup** (1 week)
   - Choose tech stack (recommend: Node.js + Express + MongoDB)
   - Set up API structure
   - Create database schema
   - Implement authentication (if needed)
   - Deploy backend

2. **Gallery Backend** (3-4 days)
   - Implement image upload API
   - Add cloud storage (AWS S3, Cloudinary)
   - Create image retrieval API
   - Update Gallery component to use API
   - Add image deletion feature

3. **Species Database** (3-4 days)
   - Create species database schema
   - Import comprehensive species data
   - Create CRUD API for species
   - Update Flora component to use API
   - Add admin interface for species management

4. **Form Processing** (2 days)
   - Connect contact form to backend
   - Store form submissions
   - Send email notifications
   - Add spam protection

### Phase 3: Testing & Quality (Week 6-7)

**Goal**: Ensure reliability and quality

1. **Testing Infrastructure** (3-4 days)
   - Set up Jest and React Testing Library
   - Write unit tests for components
   - Set up Cypress for E2E tests
   - Create test utilities
   - Set up coverage reporting

2. **Accessibility Audit** (2-3 days)
   - Run automated accessibility tests
   - Manual testing with screen readers
   - Fix identified issues
   - Add missing alt text
   - Improve keyboard navigation

3. **Performance Optimization** (2-3 days)
   - Implement image lazy loading
   - Add code splitting
   - Optimize bundle size
   - Run Lighthouse audits
   - Fix performance issues

### Phase 4: Enhancement & Polish (Week 8-10)

**Goal**: Improve user experience and add features

1. **Content Expansion** (1 week)
   - Complete all page content
   - Add more species to catalog (target: 50+)
   - Add educational content
   - Improve About page content
   - Add FAQ section

2. **Feature Enhancements** (1 week)
   - Add search functionality to species catalog
   - Implement trail ratings on map
   - Add visitor reviews system
   - Implement newsletter signup
   - Add event calendar

3. **SEO & Meta Tags** (2-3 days)
   - Add dynamic page titles
   - Add meta descriptions
   - Add Open Graph tags
   - Create sitemap.xml
   - Implement structured data

4. **Analytics & Monitoring** (2-3 days)
   - Implement Google Analytics
   - Set up error tracking
   - Configure performance monitoring
   - Create dashboards
   - Set up alerts

### Phase 5: Launch Preparation (Week 11-12)

**Goal**: Prepare for production launch

1. **Final Testing** (3-4 days)
   - Full QA pass
   - Cross-browser testing
   - Device testing
   - Load testing
   - Security review

2. **Documentation** (2-3 days)
   - User documentation
   - Admin documentation
   - Deployment documentation
   - Maintenance procedures

3. **Deployment** (2-3 days)
   - Set up production environment
   - Configure CDN
   - Set up CI/CD pipeline
   - Deploy to production
   - Monitor initial launch

4. **Post-Launch** (Ongoing)
   - Monitor analytics
   - Gather user feedback
   - Fix bugs
   - Plan next iteration

---

## 7. CONCLUSION

The Woodland Conservation Area web application is a well-structured React project with solid foundations in place. The team has successfully implemented 8 of 11 planned pages with good component architecture and modern technologies.

**Strengths:**
- Clean code structure with clear ownership
- Responsive design with mobile support
- Innovative accessibility features (text-to-speech)
- Interactive mapping system
- User-friendly interfaces
- Dark mode implementation

**Critical Gaps:**
- Three missing pages (Ecosystem, Natural Burial, eCommerce)
- Non-functional contact form
- No data persistence
- Missing error handling
- No testing infrastructure

**Recommended Next Steps:**
1. Complete the three missing pages (highest priority)
2. Implement backend for data persistence
3. Add comprehensive error handling
4. Implement form validation and submission
5. Create testing infrastructure
6. Conduct accessibility audit
7. Optimize performance
8. Add analytics and monitoring

**Timeline Estimate:**
- Minimum Viable Product (MVP) fixes: 2 weeks
- Full backend integration: 5 weeks
- Testing and quality assurance: 2 weeks
- Enhanced features and polish: 3 weeks
- **Total to production-ready: 12 weeks**

**Budget Estimate (Rough):**
- Development: 480 hours @ $50-100/hr = $24,000-48,000
- Backend hosting: $50-200/month
- Third-party services: $50-100/month
- Domain and SSL: $100/year

**Success Metrics to Track:**
- Page views and unique visitors
- Average session duration
- Contact form submissions
- Direction requests from map
- Gallery photo contributions
- User feedback scores
- Accessibility compliance score
- Performance scores (Lighthouse)

This SRS provides a comprehensive roadmap for taking the project from its current state to a production-ready, professional conservation area website that serves its community effectively.

---

## 8. APPENDICES

### Appendix A: Technology Stack Details

**Frontend:**
- React 18.3.1
- React Router DOM 6.27.0
- Tailwind CSS 3.4.14
- React Icons 5.3.0
- React Leaflet 4.2.1
- Leaflet (mapping library)

**Testing (Planned):**
- Jest
- React Testing Library
- Cypress or Playwright

**Build Tools:**
- Create React App 5.0.1
- Webpack (via CRA)
- Babel (via CRA)

**Deployment (Recommended):**
- Frontend: Vercel, Netlify, or AWS Amplify
- Backend: AWS, Digital Ocean, or Heroku
- Database: MongoDB Atlas or PostgreSQL
- Storage: AWS S3 or Cloudinary

### Appendix B: Browser Support Matrix

| Browser | Version | Support Status |
|---------|---------|----------------|
| Chrome  | Latest 2 | ✓ Full Support |
| Firefox | Latest 2 | ✓ Full Support |
| Safari  | Latest 2 | ✓ Full Support |
| Edge    | Latest 2 | ✓ Full Support |
| Mobile Safari | iOS 13+ | ✓ Full Support |
| Chrome Mobile | Latest | ✓ Full Support |
| Internet Explorer | 11 | ✗ Not Supported |

**Note**: Text-to-speech feature requires Web Speech API support. May not work in all browsers.

### Appendix C: Accessibility Compliance Checklist

**WCAG 2.1 Level AA Requirements:**

- [ ] 1.1.1 Non-text Content (Alt text)
- [x] 1.3.1 Info and Relationships (Semantic HTML)
- [x] 1.4.3 Contrast (Minimum) - Needs audit
- [x] 1.4.4 Resize text (Responsive design)
- [ ] 2.1.1 Keyboard (Full keyboard navigation)
- [ ] 2.1.2 No Keyboard Trap
- [ ] 2.4.1 Bypass Blocks (Skip navigation)
- [x] 2.4.2 Page Titled
- [x] 2.4.3 Focus Order
- [ ] 2.4.4 Link Purpose
- [ ] 3.1.1 Language of Page
- [ ] 3.2.1 On Focus
- [ ] 3.2.2 On Input
- [ ] 3.3.1 Error Identification
- [ ] 3.3.2 Labels or Instructions
- [x] 4.1.1 Parsing
- [x] 4.1.2 Name, Role, Value

### Appendix D: File Structure

```
ReactPoff/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/              # Images and media
│   ├── components/          # React components
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── flora.js
│   │   ├── gallery.js
│   │   ├── Homepage.js
│   │   ├── LocationLookup.js
│   │   ├── Navigation.js
│   │   └── Sitemap.js
│   ├── App.css
│   ├── App.js              # Main app component
│   ├── App.test.js
│   ├── index.css
│   ├── index.js            # Entry point
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── nohup.out

Recommended additions:
├── src/
│   ├── components/
│   │   ├── Ecosystem.js     # NEW
│   │   ├── NaturalBurial.js # NEW
│   │   └── Ecommerce.js     # NEW
│   ├── utils/               # NEW - Utility functions
│   ├── hooks/               # NEW - Custom React hooks
│   ├── services/            # NEW - API services
│   ├── contexts/            # NEW - React contexts
│   └── constants/           # NEW - App constants
├── tests/                   # NEW - Test files
├── .env.example             # NEW - Environment variables template
└── cypress/                 # NEW - E2E tests
```

### Appendix E: Team Member Contributions

**Marko Ostrovitsa (A00448932)**
- App.js - Main application structure
- Navigation.js - Navigation system

**Lakshay Bansal (A00467478)**
- Homepage.js - Landing page
- About.js - About page with TTS
- Contact.js - Contact form

**Kunal Singla (A00461346)**
- gallery.js - Image gallery
- flora.js - Species catalog (with Cole Turner & Bhanu Prakash)

**Bhanu Prakash (A00468530)**
- Sitemap.js - Directions functionality
- flora.js - Species data

**Cole Turner (A00469026)**
- Sitemap.js - Map UI and interactions
- flora.js - Flora components

### Appendix F: External Resources

**Documentation:**
- React: https://react.dev/
- React Router: https://reactrouter.com/
- Tailwind CSS: https://tailwindcss.com/
- Leaflet: https://leafletjs.com/
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

**Tools:**
- Create React App: https://create-react-app.dev/
- React Icons: https://react-icons.github.io/react-icons/
- React Leaflet: https://react-leaflet.js.org/

**Testing:**
- Jest: https://jestjs.io/
- React Testing Library: https://testing-library.com/react
- Cypress: https://www.cypress.io/

---

**End of Document**

*This SRS was generated through comprehensive code analysis of the ReactPoff project. All recommendations should be validated with stakeholders and adjusted based on project constraints and priorities.*

