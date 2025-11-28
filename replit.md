# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. The application provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it focuses on delivering a clean, performant user interface without backend dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- **HTML5**: Semantic markup for structure
- **Tailwind CSS (CDN)**: Utility-first CSS framework for styling with custom theme configuration
- **Vanilla JavaScript**: Client-side logic without framework dependencies
- **Font Awesome (CDN)**: Icon library for UI elements

**Design Patterns**
- Single Page Application (SPA) approach with client-side rendering
- Component-based structure using JavaScript objects for product data
- Dark mode support using Tailwind's dark mode class strategy
- Responsive-first design with mobile menu toggle functionality

**Styling Approach**
- Custom color palette with primary orange/brown tones (50-900 scale)
- Dark theme colors defined for consistent theming
- Custom CSS animations (fadeIn, slideInUp, pulse) for enhanced UX
- Hidden scrollbars for category navigation sections
- Hover effects and transitions for interactive elements

**State Management**
- Client-side product data stored in JavaScript arrays
- Product objects contain: id, name, category, price, image URL, and optional badge
- Categories include: Nuts, Spices, Food Products, Cosmetics, Baby Diapers, and Drinks
- Theme preference stored in localStorage for persistence across sessions
- No backend API calls - all data is static client-side

**UI Components**
- Sticky header with navigation
- Mobile-responsive menu with hamburger toggle
- Hero section with hover scale animations
- Product grid/card layout
- Category filtering system
- Badge system for product highlights (Sale, Premium, Organic)

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

### Third-Party Integrations
- None currently implemented (no payment processors, analytics, or backend services)

### Future Integration Considerations
- Potential for backend API integration for dynamic product management
- Payment gateway integration (Stripe, PayPal) for checkout functionality
- Database storage for product inventory and order management
- User authentication system for account management
- Shopping cart persistence using localStorage or backend API