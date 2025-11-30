# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. It provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it delivers a clean, performant user interface with a focus on a professional e-commerce store appearance. The platform supports full bilingual functionality (Arabic/English) and features a product management admin panel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- **HTML5**: Semantic markup
- **Tailwind CSS (CDN)**: Utility-first styling with custom theme
- **Vanilla JavaScript**: Client-side logic
- **Font Awesome (CDN)**: Icon library

**Design Patterns**
- Single Page Application (SPA) approach
- Component-based structure for product data
- Full bilingual support (Arabic/English) with RTL/LTR switching
- Dark mode support
- Responsive-first design with mobile menu
- Custom color palette with primary orange/brown tones
- Custom CSS animations for enhanced UX
- Hidden scrollbars for navigation
- Hover effects and transitions for interactive elements

**State Management**
- Client-side product data stored in JavaScript arrays with Firebase Firestore integration.
- Product objects include: id, name, category, price, image URL, and optional badge.
- Categories: Nuts, Spices, Food Products, Cosmetics, Baby Diapers, Drinks.
- Theme preference stored in localStorage.
- Graceful fallback to local product data if Firebase is not configured.

**UI/UX Decisions**
- Professional product card design with fixed image heights and proper spacing.
- Responsive product grid (2-column mobile, 4-column desktop).
- Dynamic background color for product sections based on selected category (with dark mode support and smooth transitions).
- Color-coded category navigation buttons and demo product images for consistent branding and visual identification.
- Sticky header with navigation.
- Mobile-responsive menu with hamburger toggle, replaced by a back arrow on secondary pages (contact, cart) for improved mobile UX.
- Admin panel (admin.html) for product management with Arabic RTL interface, featuring bilingual forms and an image upload system.
- Contact page (`contact.html`) with bilingual form and contact cards, integrated with WhatsApp API.
- Language toggle redesigned for minimal, clean text (showing opposite language shortcut).

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
- Unsplash CDN for product images (optimized 400x400).
- imgbb for admin-uploaded product images.

## External Dependencies

### CDN Services
- **Tailwind CSS** (cdn.tailwindcss.com)
- **Font Awesome 6.4.2** (cdnjs.cloudflare.com)
- **Unsplash** (images.unsplash.com)
- **Firebase SDK 10.7.1** (gstatic.com): Firebase App and Firestore libraries.

### Third-Party Integrations
- **Firebase Firestore**: Cloud database for dynamic product management.
  - Collection name: `products`.
  - Required fields: name, category, price, image (or imageUrl).
  - Optional field: badge.
  - `firebase-config.js` for credentials.
- **imgbb**: Image hosting service for product images uploaded via the admin panel.
- **WhatsApp API**: For contact form submissions on the `contact.html` page.

### Admin Panel
- **Access**: `/admin.html`
- **Features**: Add, edit, delete products with bilingual support (Arabic/English).
- **Image Upload**: Drag & drop or click to select (using imgbb API).
- **Language Toggle**: Switches between العربية (RTL) and English (LTR).
- **Currency Display**: د.ج (DZD).
- **Theme Toggle**: Synchronized with main site.
- **Demo Data Generation**: `generateDemoData()` function creates 12 unique, context-aware, color-coded products (2 per category) per click, saving them to Firestore. This includes:
    - Category-specific brands, items, and realistic price ranges.
    - Color-coded `placehold.co` image URLs.
    - Automatic Arabic translations.
- **Note**: No authentication currently implemented.