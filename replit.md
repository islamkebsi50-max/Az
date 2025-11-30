# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. It provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it delivers a clean, performant user interface with a focus on a professional e-commerce store appearance. The platform supports full bilingual functionality (Arabic/English) and features a product management admin panel.

## User Preferences

Preferred communication style: Simple, everyday language (Arabic).

## Recent Changes (November 30, 2025)

### ✅ Vercel Deployment - Production Ready Setup

**Build Configuration for Vercel:**
- ✅ `build.js` - Substitutes Firebase and imgbb environment variables at build time
- ✅ `package.json` - Defines npm build script for Vercel
- ✅ `vercel.json` - Configured with buildCommand: "npm run build"
- ✅ Environment variables properly injected during deployment
- ✅ Firebase and imgbb API keys automatically configured

**Deployment Flow:**
1. Push to GitHub → Vercel auto-detects changes
2. Vercel runs `npm run build` → Substitutes environment variables
3. Static site deployed → All secrets injected from Vercel settings
4. Site goes live with full Firebase + imgbb functionality

---

## System Architecture

### Frontend Architecture

**Technology Stack**
- **HTML5**: Semantic markup with responsive viewport configuration
- **Tailwind CSS (CDN)**: Utility-first styling with responsive breakpoints
- **Vanilla JavaScript**: Client-side logic (no frameworks)
- **Font Awesome (CDN)**: Icon library with responsive sizing

**Design Patterns**
- Single Page Application (SPA) approach
- Component-based structure for product data
- Full bilingual support (Arabic/English) with RTL/LTR switching
- Dark mode support with localStorage persistence
- **Mobile-first responsive design** with all breakpoints covered
- **Dense mobile header** with all navigation icons visible
- Custom color palette: Primary orange/brown with category-specific colors
- Custom CSS animations for enhanced UX
- Hidden scrollbars for category navigation
- Smooth transitions and hover effects

**State Management**
- Client-side product data in JavaScript arrays
- Firebase Firestore integration for dynamic products
- LocalStorage for theme preference and language selection
- Cart data stored in browser's LocalStorage
- Graceful fallback to local data if Firebase unavailable

**UI/UX Decisions**
- Professional product card design with responsive image heights
- Adaptive responsive grids: 2-col mobile, 3-col tablet, 4-col desktop
- Dynamic category-based background colors (with smooth transitions)
- Color-coded category buttons with icons
- Sticky header with adaptive sizing and dense mobile layout
- Mobile menu with hamburger toggle (hidden on desktop)
- Admin panel for product management with bilingual support
- Contact page with form and business information
- Shopping cart with WhatsApp integration
- Real-time order tracking system with customer dashboard
- Responsive footer with organized links

### Data Architecture

**Product Data Structure**
```javascript
{
  id: number,
  name: string | name_ar + name_en,
  category: string (nuts|spices|food|cosmetics|baby|drinks),
  price: number (DZD currency),
  image: string (CDN URL),
  badge: string|null (Sale|Premium|Organic)
}
```

**Order Data Structure**
```javascript
{
  id: string (ORD-timestamp),
  customer: { name, phone, address },
  items: [{ name, quantity, price }],
  total: number,
  status: string ('pending' | 'completed'),
  timestamp: number
}
```

**Image Strategy**
- Unsplash CDN for default product images
- imgbb for admin-uploaded images
- Responsive image sizing for different devices
- AI-generated images for hero slider (6 category images)

### Database

**Firebase Firestore**
- Collection: `products` - Product catalog
- Collection: `orders` - Customer orders with real-time tracking
- Fields: name, name_ar, name_en, category, price, image, badge, status, customer info

## External Dependencies

### CDN Services
- **Tailwind CSS**: cdn.tailwindcss.com (utility CSS framework)
- **Font Awesome 6.4.2**: Icons library (cdnjs.cloudflare.com)
- **Unsplash**: Product image CDN
- **Firebase SDK 10.7.1**: Authentication and Firestore

### Third-Party Integrations
- **Firebase Firestore**: Cloud database for products and orders
- **imgbb**: Image upload service for admin panel
- **WhatsApp API**: Contact form and checkout integration
- **localStorage**: Browser storage for cart and preferences

### Admin Panel
- **Access**: `/admin.html`
- **Features**: Add, edit, delete products (bilingual: Arabic RTL + English LTR)
- **Image Upload**: Drag-and-drop with imgbb integration
- **Order Management**: Approve/reject orders with real-time Firebase sync
- **Language Toggle**: Arabic ↔ English with RTL/LTR switching
- **Currency**: DZD (د.ج)
- **Demo Data**: Generate 12 unique products per category with realistic data

---

## Deployment Status

✅ **Ready for Vercel Deployment - Final Steps:**

**Configuration Complete:**
- ✅ `vercel.json` - build command configured
- ✅ `package.json` - build script defined
- ✅ `build.js` - environment variable substitution
- ✅ `.gitignore` - proper file exclusions
- ✅ All static assets verified
- ✅ Firebase + imgbb secrets configured in Replit

**To Deploy on Vercel:**
1. In Replit, push your changes:
   ```bash
   git add .
   git commit -m "Add Vercel build configuration"
   git push origin main
   ```

2. In Vercel Dashboard:
   - Click **"Redeploy"** on your project
   - Wait 1-2 minutes for build to complete
   - Site goes live with Firebase + imgbb fully functional! 🚀

**No More Warning Messages:**
- ✅ Firebase will be properly configured
- ✅ imgbb API key will be available
- ✅ Admin panel will fully function
- ✅ All features will work on production

---

## File Structure

```
├── index.html              # Main product page
├── admin.html              # Admin panel
├── cart.html               # Shopping cart
├── status.html             # Order status tracker
├── my-orders.html          # Customer order history
├── about.html              # About Us page
├── contact.html            # Contact page
│
├── script.js               # Main app logic + translations
├── cart.js                 # Cart functionality
├── status.js               # Order status logic
├── my-orders.js            # Customer orders dashboard
├── admin.js                # Admin panel logic
├── admin-orders.js         # Admin order management
├── firebase-config.js      # Firebase configuration (env vars)
├── style.css               # Global styles
│
├── build.js                # Build script for Vercel
├── config.py               # Local development server
├── package.json            # npm configuration
├── vercel.json             # Vercel deployment config
│
├── images/                 # Product images (8 files)
└── public/                 # Static assets for Vercel (optional)
```

