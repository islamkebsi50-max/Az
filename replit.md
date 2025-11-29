# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. The application provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it focuses on delivering a clean, performant user interface without backend dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 29, 2025)

### Admin Panel Translation Complete
- All form labels now have `data-lang-key` attributes
- All input placeholders now have `data-lang-placeholder` attributes
- Placeholders translate dynamically when language is switched
- Header text fixed with `whitespace-nowrap` to prevent wrapping
- Example placeholders:
  - Arabic name: "مثال: لوز فاخر"
  - English name: "Example: Premium Almonds"
  - Price: "0.00"
  - Descriptions in both languages

### Mobile Menu Fix
- Fixed mobile menu not closing when clicking navigation links
- Added click listeners to all menu links in `setupUIControls()` function
- Menu now properly closes and icon resets after link selection

### Contact Page
- Created new `contact.html` page with fully bilingual support
- Features include contact form (Name, Email, Message) and contact information cards
- Integrated with WhatsApp API for form submissions
- Consistent design and translations with main site
- Contact link in navigation now points to `/contact.html`

### Translations
- Added 30+ new translation keys including Contact page and Admin placeholders
- Supports Arabic/English toggle with RTL/LTR switching
- All form labels and placeholders are translatable via `data-lang-key` and `data-lang-placeholder` attributes

## System Architecture

### Frontend Architecture

**Technology Stack**
- **HTML5**: Semantic markup for structure
- **Tailwind CSS (CDN)**: Utility-first CSS framework for styling with custom theme configuration
- **Vanilla JavaScript**: Client-side logic without framework dependencies
- **Font Awesome (CDN)**: Icon library for UI elements
- **Firebase Firestore (CDN)**: Cloud database for dynamic product management

**Design Patterns**
- Single Page Application (SPA) approach with client-side rendering
- Component-based structure using JavaScript objects for product data
- Full bilingual support (Arabic/English) with RTL/LTR layout switching
- Dark mode support using Tailwind's dark mode class strategy
- Responsive-first design with mobile menu toggle functionality

**Styling Approach**
- Custom color palette with primary orange/brown tones (50-900 scale)
- Dark theme colors defined for consistent theming
- Custom CSS animations (fadeIn, slideInUp, pulse) for enhanced UX
- Hidden scrollbars for category navigation sections
- Hover effects and transitions for interactive elements

**State Management**
- Client-side product data stored in JavaScript arrays with Firebase Firestore integration
- Product objects contain: id, name, category, price, image URL, and optional badge
- Categories include: Nuts, Spices, Food Products, Cosmetics, Baby Diapers, and Drinks
- Theme preference stored in localStorage for persistence across sessions
- Graceful fallback to local product data when Firebase is not configured

**UI Components**
- Sticky header with navigation
- Mobile-responsive menu with hamburger toggle
- Hero section with hover scale animations
- Product grid/card layout
- Category filtering system
- Badge system for product highlights (Sale, Premium, Organic)
- Admin panel (admin.html) for product management with Arabic RTL interface

### Data Architecture

**Product Data Structure**
```javascript
{
  id: number,
  name: string,
  category: string (nuts|spices|food),
  price: number,
  image: string (Unsplash CDN URL),
  badge: string|null (Sale|Premium|Organic)
}
```

**Image Strategy**
- Unsplash CDN for product images with optimized parameters (400x400, cropped)
- Reduces hosting requirements and ensures high-quality imagery

**Accessibility Considerations**
- Semantic HTML structure
- Smooth color transitions for theme changes (300ms duration)
- Mobile-first responsive breakpoints
- Touch-friendly interactive elements

## External Dependencies

### CDN Services
- **Tailwind CSS** (cdn.tailwindcss.com): Core styling framework with runtime configuration
- **Font Awesome 6.4.2** (cdnjs.cloudflare.com): Icon library for UI elements
- **Unsplash** (images.unsplash.com): Product image hosting with URL-based transformations
- **Firebase SDK 10.7.1** (gstatic.com): Firebase App and Firestore libraries

### Third-Party Integrations
- **Firebase Firestore**: Cloud database for dynamic product management
  - Configuration file: `firebase-config.js` (replace placeholder values with your Firebase credentials)
  - Collection name: `products`
  - Required fields: name, category, price, image (or imageUrl)
  - Optional field: badge

- **imgbb**: Image hosting service for product images
  - Get API key from: https://api.imgbb.com/
  - Images uploaded via admin panel are stored on imgbb
  - Image URLs are saved in Firestore product documents

### Admin Panel
- Access via: `/admin.html`
- Features: Add, edit, delete products with bilingual support
- Bilingual form: Separate fields for Arabic (name_ar, desc_ar) and English (name_en, desc_en)
- Image upload: Drag & drop or click to select (via imgbb API)
- Language toggle: Switch between العربية (RTL) and English (LTR) in the admin header
- Currency: Displays د.ج (DZD) for price inputs
- Theme toggle: Dark/Light mode support synchronized with main site
- Synchronized design: Uses same Tailwind CSS theme, colors, and translations as main site
- Note: Currently no authentication - consider adding Firebase Auth for production

### Future Integration Considerations
- Payment gateway integration (Stripe, PayPal) for checkout functionality
- User authentication system using Firebase Auth for admin panel security
- Shopping cart persistence using localStorage or Firestore
- Order management and inventory tracking