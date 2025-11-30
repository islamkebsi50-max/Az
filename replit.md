# Aznaf Market - E-commerce Platform

## Overview

Aznaf Market is a premium e-commerce platform specializing in spices, nuts, and specialty food items. The application provides a modern, responsive shopping experience with product browsing, categorization, and a dark mode theme toggle. Built as a client-side web application using vanilla JavaScript and Tailwind CSS, it focuses on delivering a clean, performant user interface without backend dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 30, 2025)

### Dynamic Background Color Based on Category Selection
- Products section background color now changes based on selected category
- Color backgrounds for better visibility:
  - 🟠 **Nuts** → Orange-100 (light orange)
  - 🔴 **Spices** → Red-100 (light red)
  - 🟢 **Food** → Green-100 (light green)
  - 🟡 **Drinks** → Yellow-100 (light yellow)
  - 🟣 **Cosmetics** → Purple-100 (light purple)
  - 🔵 **Baby** → Blue-100 (light blue)
  - 🟠 **All** → Gray-100 (light gray)
- Dark mode support with darker hues for proper contrast (40% opacity)
- Smooth transition animation when changing categories
- Background color matching for consistent branding

### Color-Coded Category Buttons
- Updated category navigation buttons on homepage with category-specific colors:
  - 🟠 **Nuts** → Orange
  - 🔴 **Spices** → Red
  - 🟢 **Food** → Green
  - 🟡 **Drinks** → Gold/Yellow
  - 🟣 **Cosmetics** → Purple
  - 🔵 **Baby** → Blue
  - 🟠 **All** → Orange
- White text on colored background for maximum contrast
- Hover effects with darker shade of each color
- Improved visual navigation and category identification
- Consistent styling with demo product images color scheme

### Demo Product Images - Color-Coded by Category
- Product images now display with category-specific background colors
- Format: `https://placehold.co/400/[COLOR]/white?text=[PRODUCT_NAME]`
- Each category has distinct visual color for quick identification
- Colors match the category button colors for consistent branding

## Previous Changes (November 29, 2025)

### Critical Bug Fix - Removed Duplicate Firebase DB Declaration
- Removed duplicate `let db = null;` from admin.js that was causing JavaScript error
- admin.js and script.js now share same global `db` variable
- Fixed error: "Identifier 'db' has already been declared"
- Admin panel now runs without errors

### Language Toggle Button Redesigned
- Updated styling to minimal, clean text (removed background box)
- Changed button text logic to show opposite language shortcut
- Arabic active → Shows "EN" | English active → Shows "AR"
- Hover effects with orange color matching brand theme
- Applied consistently across index.html, cart.html, and admin.html

### Admin Panel Translation Complete - 100%
- **Form Labels** - All have `data-lang-key` attributes
- **Input Placeholders** - All have `data-lang-placeholder` attributes
- **Dropdown Options** - Categories & Badges with full translations:
  - Category: "المكسرات" ↔ "Nuts", "البهارات" ↔ "Spices", etc.
  - Badges: "تخفيض" ↔ "Sale", "مميز" ↔ "Premium", "عضوي" ↔ "Organic", etc.
- **Upload Section** - Text translates: "اسحب الصورة" ↔ "Drag image"
- **Buttons** - All translatable: "إضافة" ↔ "Add", "إلغاء" ↔ "Cancel", "إزالة الصورة" ↔ "Remove Image"
- **Progress Messages** - "جاري رفع الصورة..." ↔ "Uploading image..."
- **Section Titles** - "المنتجات" ↔ "Products"
- Dynamic update on language toggle without page refresh
- Example placeholders:
  - Arabic name: "مثال: لوز فاخر" ↔ "Ex: Almonds"
  - English name: "مثال: Premium Almonds" ↔ "Ex: Premium Almonds"
  - Price: "0.00" (both languages)
  - Descriptions with full translations

### Admin Header Layout Fixed
- Restructured header with proper flexbox layout
- **Left Side:** Back arrow + brand name grouped together with `flex items-center gap-2`
- **Center:** Responsive title "Admin" (mobile) / "Admin Panel" (desktop) with `hidden sm:inline`
- **Right Side:** Theme toggle + language toggle grouped with `flex items-center gap-3`
- Added `px-4 py-3` spacing for breathing room
- Eliminated overlapping text on mobile devices
- Smooth responsive behavior across all screen sizes

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
- Back arrow navigation added for easy return to homepage

### Secondary Pages Navigation Flow Updated
- **Replaced Hamburger Menu with Back Arrow** on `contact.html` and `cart.html`
- Back arrow links directly to `index.html` (homepage)
- Applied only to mobile view (`lg:hidden` class)
- Desktop view still shows AznafMarket brand name on left
- Consistent styling with other header icons (same size, dark gray color)
- Improves mobile UX with clear navigation path back to homepage
- Homepage (index.html) retains original hamburger menu for navigation

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

### Generate Demo Data Feature - Context-Aware Procedural Generation with Color-Coded Images (November 29, 2025)
- Added green "Demo" button in admin panel (Products section header)
- `generateDemoData()` function uses **Context-Aware Procedural Generation** to create 100% unique products:

**Context-Aware Generation Details:**
- **6 Category-Specific Data Sets:**
  - **Food (🟢 Green):** Soummam, Cevital, Bimo brands | Semoule, Pasta, Couscous, Lentils, Rice, Flour items | Prices: 150-280 د.ج
  - **Drinks (🟡 Gold):** Candia, Ifri, Cevital brands | Milk, Orange Juice, Coffee, Tea, Mineral Water items | Prices: 100-250 د.ج
  - **Cosmetics (🟣 Purple):** Elio, Omo, Safina brands | Face Cream, Soap, Shampoo, Toothpaste items | Prices: 120-280 د.ج
  - **Baby (🔵 Blue):** Bimo, Candia, Elio brands | Diapers, Baby Wipes, Baby Formula items | Prices: 150-450 د.ج
  - **Nuts (🟠 Orange):** Soummam, Safina, Ngaous brands | Almonds, Walnuts, Pistachios, Cashews items | Prices: 380-520 د.ج
  - **Spices (🔴 Red):** Soummam, Cevital, Safina brands | Saffron, Cumin, Paprika, Cinnamon items | Prices: 200-950 د.ج

- **Color-Coded Image URLs:**
  - Each product image uses format: `https://placehold.co/400/[COLOR]/white?text=[PRODUCT_NAME]`
  - Colors are category-specific for easy visual identification
  - Text is white on colored background for contrast

- **Random Logic:**
  - Each click generates **12 unique products (2 per category)**
  - **Product name formula:** Brand + Item + " #" + Random Number (e.g., "Soummam Semoule #4829")
  - Category STRICTLY matches product type (no mixing)
  - Price matches realistic category range
  - Image color matches category theme
  - Arabic translations auto-generated for all items

- Saves all products to Firestore automatically
- Shows success message: "✓ تم إضافة 12 منتج جديد (2 لكل فئة)!"
- Auto-refreshes product list after insertion

**Example Generated Products:**
- "Soummam Pasta #2847" (180 د.ج) - food (green background)
- "Candia Milk #5193" (120 د.ج) - drinks (gold background)
- "Omo Soap #1042" (150 د.ج) - cosmetics (purple background)
- "Bimo Diapers #7564" (320 د.ج) - baby (blue background)
- "Safina Almonds #3921" (450 د.ج) - nuts (orange background)
- "Cevital Saffron #8765" (950 د.ج) - spices (red background)

**Key Benefits:**
- **100% Unique Products:** Random number suffix ensures no duplicate product names
- **Click 50 times → 600 different products** (2 per category × 6 categories × 50 clicks)
- **Context-Aware:** Brands and items match category semantically
- **Color-Coded Visualization:** Each category has distinct background color for quick identification
- **Bilingual Support:** Automatic Arabic/English naming
- **Realistic Pricing:** Each category has appropriate price ranges
- **Algerian Focus:** Uses authentic Algerian brand names

### Future Integration Considerations
- Payment gateway integration (Stripe, PayPal) for checkout functionality
- User authentication system using Firebase Auth for admin panel security
- Shopping cart persistence using localStorage or Firestore
- Order management and inventory tracking