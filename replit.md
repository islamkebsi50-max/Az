# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. It provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it delivers a clean, performant user interface with a focus on a professional e-commerce store appearance. The platform supports full bilingual functionality (Arabic/English) and features a product management admin panel.

## User Preferences

Preferred communication style: Simple, everyday language (Arabic).

## Recent Changes (November 30, 2025)

### ✅ Real-Time Order Tracking System - Complete Implementation

**Order Tracking Page (`status.html`):**
- ✅ Created new `status.html` page with real-time order tracking
- ✅ Real-time Firebase listener (`onSnapshot`) updates order status automatically
- ✅ Status badges: Yellow "⏳ الطلب قيد المراجعة" for pending, Green "✅ تم الموافقة!" for completed
- ✅ Displays order details: ID, time, customer info, items, and total
- ✅ Order progress timeline showing pending and approved steps
- ✅ Bilingual support (Arabic/English) with automatic RTL/LTR switching
- ✅ Auto-refresh every 5 seconds with fallback to localStorage
- ✅ Responsive design for all devices

**Checkout Flow Updated (`cart.js`):**
- ✅ After checkout, saves order to Firestore with `status: 'pending'`
- ✅ Automatically redirects to `status.html?id=ORDER_ID` after order placement
- ✅ Preserves WhatsApp integration (opens in new tab before redirect)
- ✅ Order includes: customer info (name, phone, address), items, total, timestamp

**Admin Order Management (`admin-orders.js` & `admin.html`):**
- ✅ Orders tab displays all orders from Firestore collection
- ✅ "Approve" button changes order status from 'pending' to 'completed'
- ✅ "View Status" button links to order tracking page
- ✅ "Delete" button removes completed orders
- ✅ Status badges show yellow for pending, green for completed/approved
- ✅ Orders auto-delete 1 day after confirmation
- ✅ Real-time updates with Firebase integration

**Translations Added:**
- ✅ 20+ new translation keys for status page (Arabic + English)
- ✅ Status page translations: order_id, order_time, customer_info, order_items, status_timeline, etc.
- ✅ Admin translations updated: admin_orders_title, admin_no_orders, status badges

**Files Created/Modified:**
- ✅ `status.html` - New order tracking page
- ✅ `status.js` - Real-time tracking logic with Firebase listener
- ✅ `cart.js` - Updated handleCheckout to redirect to status page
- ✅ `admin-orders.js` - Updated confirmOrder to use 'completed' status, added "View Status" link
- ✅ `script.js` - Added 20+ translation keys for status page
- ✅ `my-orders.html` - New customer orders dashboard
- ✅ `my-orders.js` - Customer orders listing with real-time updates
- ✅ Removed automatic order deletion (orders kept indefinitely)
- ✅ Added "My Orders" link to navigation and footer

---

## Previous Changes (November 30, 2025)

### ✅ Hero Slider with Real Unsplash Images - 6 Category Showcase

**Hero Slider Implementation:**
- ✅ Swiper.js library integrated for smooth slider functionality
- ✅ 6 high-quality Unsplash images - one for each category
- ✅ Dark overlay (bg-black/50) ensures text readability over images
- ✅ Each slide displays category name and "Shop Now" button
- ✅ Autoplay every 5 seconds with smooth 800ms transitions
- ✅ Navigation arrows (visible on desktop only, hidden on mobile)
- ✅ Pagination dots for direct slide selection

**Slide Categories & Images:**
1. Nuts - Premium fresh pistachios and nuts
2. Spices - Vibrant colorful authentic spices
3. Food - Canned beans, legumes, grains (chickpeas, lentils, pasta)
4. Cosmetics - Premium beauty and skincare products
5. Baby - Happy healthy smiling baby
6. Drinks - Colorful carbonated soft drinks and sodas

**Mobile Optimization:**
- ✅ Arrows hidden on mobile (class: `hidden md:flex`)
- ✅ Users can swipe to navigate on mobile
- ✅ Responsive text sizes: sm on mobile → xl on desktop
- ✅ Slider height: 400px (mobile) → full screen (desktop)

---

### ✅ Hero Slider with Custom AI-Generated Images - Perfect Match

**Final Hero Slider Configuration:**
- ✅ 6 custom AI-generated images perfectly matching each category title
- ✅ Nuts: Premium fresh pistachios and nuts
- ✅ Spices: Vibrant colorful authentic spices
- ✅ Food: Fresh grocery market display
- ✅ Cosmetics: Premium beauty and skincare products
- ✅ Baby: Happy healthy smiling baby
- ✅ Drinks: Fresh colorful refreshing beverages
- ✅ Dark overlay (50% opacity) for text readability
- ✅ Arabic titles only - no buttons on slides
- ✅ Auto-play every 3 seconds with smooth transitions
- ✅ Navigation arrows (desktop only)
- ✅ Pagination dots for category selection
- ✅ Responsive on all devices

---

### ✅ Dense Mobile Header Layout - All Icons Visible & Compact

**Mobile Header Optimization:**
- ✅ Brand shortened to **"AZ Market"** (from "AznafMarket")
- ✅ All icons fit in ONE row on mobile: Menu | EN | 🌙 | 🔍 | 🛒
- ✅ Fixed flexbox: `flex-nowrap` prevents wrapping
- ✅ Compact button sizing: 40x40px (touch-friendly minimum)
- ✅ Icon gaps: `gap-1` for dense packing
- ✅ Applied to ALL pages: index.html, cart.html, contact.html

**Header Structure:**
- Left: Menu Button + Logo (gap-1)
- Center: Search Bar (Desktop only)
- Right: Search Icon + Theme Toggle + Language + Cart (gap-1)

**Icon Sizing:**
- All icons: `text-base sm:text-lg` (compact on mobile)
- Buttons: `w-10 h-10 p-1.5` (fixed square buttons)
- Language: `text-xs font-bold px-1.5`

### ✅ Complete Mobile-First Responsive Design - All Pages & Devices

**All Pages Now Fully Responsive:**
- ✅ index.html - Main store page
- ✅ cart.html - Shopping cart page
- ✅ contact.html - Contact/information page
- ✅ admin.html - Product management panel

**Responsive Breakpoints Implemented:**
- Mobile (< 640px): Compact layout, small fonts, stacked grids
- Tablet (640px - 1024px): Medium layout, scaled fonts, adapted grids
- Desktop (1024px+): Full layout, large fonts, multi-column grids

**Main Page (index.html) - Fully Responsive:**
- Product Grid: `grid-cols-2 (mobile) → sm:grid-cols-3 (tablet) → lg:grid-cols-4 (desktop)`
- Hero Section: Heights 350px → 450px → 500px with responsive typography
- Category Buttons: `text-xs → sm:text-sm` with responsive padding/gaps
- Features Grid: `grid-cols-2 (mobile) → lg:grid-cols-4 (desktop)`
- All fonts: Responsive scaling from small (text-xs/text-sm) to large (text-xl/text-2xl)

**Cart Page (cart.html) - Fully Responsive:**
- Header: Responsive icon sizes and padding for all devices
- Cart Items: `w-16 sm:w-24` image sizes with responsive spacing
- Order Summary: Sticky positioning adjusted (top-20 mobile, top-24 desktop)
- Form Elements: Responsive padding, text sizes, spacing throughout
- Buttons: `py-2 sm:py-3` with adaptive font sizes

**Contact Page (contact.html) - Fully Responsive:**
- Title Sizes: `text-2xl (mobile) → sm:text-4xl → md:text-5xl (desktop)`
- Form Fields: Responsive padding and text sizes
- Contact Cards: Compact on mobile with adjusted spacing
- Footer: `grid-cols-1 → sm:grid-cols-2 → md:grid-cols-4`
- Icons: Responsive sizing with proper flex-shrink properties

**CSS Media Queries - Comprehensive Coverage:**
```css
@media (max-width: 640px)     /* Mobile */
@media (641px - 768px)         /* Tablet (Portrait) */
@media (769px+)                /* Tablet (Landscape) & Desktop */
@media (1024px+)               /* Desktop */
```

**Key Responsive Patterns Used:**
- Tailwind breakpoints: `sm:`, `md:`, `lg:` prefixes
- Responsive text sizes: `text-xs → text-sm → text-base → text-lg → text-2xl`
- Adaptive spacing: `p-2/p-3/p-4`, `gap-1/gap-2/gap-3/gap-4`, `mb-2/mb-4/mb-6`
- Flexible grids: Transform columns based on screen size
- Touch-friendly: Min sizes of 44px (mobile buttons, links)
- Image optimization: Proper aspect ratios and lazy loading

**Result:** Professional e-commerce experience works perfectly on:
- ✅ Small phones (320px - 480px)
- ✅ Large phones (480px - 640px)  
- ✅ Tablets (640px - 1024px)
- ✅ Desktops (1024px+)

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

**Image Strategy**
- Unsplash CDN for default product images
- imgbb for admin-uploaded images
- Responsive image sizing for different devices

### Database

**Firebase Firestore**
- Collection: `products`
- Fields: name, name_ar, name_en, category, price, image, badge
- Auto-generated product demo data with category-specific brands

## External Dependencies

### CDN Services
- **Tailwind CSS**: cdn.tailwindcss.com (utility CSS framework)
- **Font Awesome 6.4.2**: Icons library (cdnjs.cloudflare.com)
- **Unsplash**: Product image CDN
- **Firebase SDK 10.7.1**: Authentication and Firestore

### Third-Party Integrations
- **Firebase Firestore**: Cloud database for products
- **imgbb**: Image upload service for admin panel
- **WhatsApp API**: Contact form integration
- **localStorage**: Browser storage for cart and preferences

### Admin Panel
- **Access**: `/admin.html`
- **Features**: Add, edit, delete products (bilingual: Arabic RTL + English LTR)
- **Image Upload**: Drag-and-drop with imgbb integration
- **Language Toggle**: Arabic ↔ English with RTL/LTR switching
- **Currency**: DZD (د.ج)
- **Demo Data**: Generate 12 unique products per category with realistic data

---

## Bug Fixes (November 30, 2025 - Latest)

### ✅ Fixed JavaScript Errors & Data Display Issues
- ✅ Removed duplicate `translations` object declarations in status.js and my-orders.js
- ✅ Both pages now use global translations from script.js
- ✅ Fixed language switching functionality
- ✅ Order data now displays correctly in status page and my-orders dashboard
- ✅ Status badges show correctly (pending = yellow, completed = green)
- ✅ Customer information displays properly

**Files Fixed:**
- ✅ `status.js` - Removed duplicate translations, now uses global scope
- ✅ `my-orders.js` - Removed duplicate translations, now uses global scope
- ✅ Both pages now inherit currentLang and setLanguage from script.js

---

## Deployment Status

✅ **Production Ready:**
- ✅ Dense mobile header with all navigation icons visible and compact
- ✅ Fully responsive design optimized for all devices
- ✅ Mobile-first approach ensures fast loading on mobile networks
- ✅ Dark mode support for better accessibility
- ✅ Bilingual interface (Arabic/English) with proper text direction
- ✅ All pages tested and functional
- ✅ Performance optimized with Tailwind CSS CDN

**Ready to Deploy:** The application is ready to be published to production with Replit's deployment tools.
