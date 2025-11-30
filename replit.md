# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. It provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it delivers a clean, performant user interface with a focus on a professional e-commerce store appearance. The platform supports full bilingual functionality (Arabic/English) and features a product management admin panel.

## User Preferences

Preferred communication style: Simple, everyday language (Arabic).

## Recent Changes (November 30, 2025)

### ✅ Vercel Deployment Configuration - Complete Setup

**Deployment Structure:**
- ✅ All static files organized in `public/` directory
- ✅ `vercel.json` configured for static HTML deployment
- ✅ `.vercelignore` excludes unnecessary files (config.py, .git, etc.)
- ✅ `package.json` added for Vercel recognition
- ✅ All image paths verified and working locally
- ✅ Local server (`config.py`) serves from `public/` directory

**Ready for Production:**
1. Push to GitHub
2. Redeploy on Vercel
3. Site goes live!

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

✅ **Ready for Vercel Deployment:**
- ✅ All files organized in `public/` directory for Vercel
- ✅ `vercel.json` configuration complete
- ✅ `.vercelignore` file excludes build files
- ✅ `package.json` for Vercel project recognition
- ✅ All static assets verified and working
- ✅ Real-time order tracking system implemented
- ✅ Customer order dashboard created
- ✅ Dense mobile header with all icons visible
- ✅ Fully responsive design optimized for all devices
- ✅ Dark mode support for better accessibility
- ✅ Bilingual interface (Arabic/English) with proper text direction

**To Deploy on Vercel:**
1. Push changes to GitHub
2. In Vercel Dashboard → Click "Redeploy"
3. Wait 1-2 minutes for build
4. Site goes live! 🚀

