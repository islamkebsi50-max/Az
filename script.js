// ==========================================
// AZNAF MARKET - Main Application
// ==========================================

// Configuration
const WHATSAPP_PHONE = "213673425055";
const CURRENCY_SYMBOL = "د.ج";
const TAX_RATE = 0.10;

// ==========================================
// Translations
// ==========================================

const translations = {
    ar: {
        // Navigation
        nav_home: "الرئيسية",
        nav_shop: "المتجر",
        nav_cart: "السلة",
        nav_contact: "اتصل بنا",
        
        // Hero Section
        hero_title: "توابل ومكسرات فاخرة من جميع أنحاء العالم",
        hero_subtitle: "اكتشف مجموعتنا المختارة بعناية من التوابل الأصيلة والمكسرات الطازجة والمنتجات الغذائية المميزة. جودة تتذوقها في كل قضمة.",
        hero_btn: "تسوق الآن",
        hero_nuts: "أجود أنواع المكسرات الطازجة",
        hero_spices: "نكهات وتوابل أصلية",
        hero_food: "منتجات غذائية أساسية لكل منزل",
        hero_cosmetics: "الجمال والعناية الشخصية",
        hero_baby: "راحة طفلك أولويتنا",
        hero_drinks: "انتعاش ومشروبات متنوعة",
        
        // Categories
        cat_all: "الكل",
        cat_nuts: "مكسرات",
        cat_spices: "توابل",
        cat_food: "منتجات غذائية",
        cat_cosmetics: "مستحضرات تجميل",
        cat_diapers: "حفاضات أطفال",
        cat_drinks: "مشروبات",
        
        // Products Section
        sect_featured: "المنتجات المميزة",
        view_all: "عرض الكل",
        add_to_cart: "أضف إلى السلة",
        added_to_cart: "تمت الإضافة ✓",
        no_products: "لا توجد منتجات",
        
        // Features
        feat_shipping: "شحن مجاني",
        feat_shipping_desc: "للطلبات فوق 50$",
        feat_payment: "دفع آمن",
        feat_payment_desc: "دفع آمن 100%",
        feat_returns: "إرجاع سهل",
        feat_returns_desc: "سياسة إرجاع 30 يوم",
        feat_support: "دعم 24/7",
        feat_support_desc: "فريق دعم متخصص",
        
        // Footer
        footer_desc: "مصدرك الموثوق للتوابل والمكسرات والمنتجات الغذائية الفاخرة.",
        footer_links: "روابط سريعة",
        footer_about: "من نحن",
        footer_categories: "الأصناف",
        footer_contact: "اتصل بنا",
        footer_address: "نارة منعة باتنة",
        footer_rights: "© 2024 أزناف ماركت. جميع الحقوق محفوظة.",
        
        // About Page
        about_title: "من نحن",
        about_subtitle: "قصة نجاح AZ Market",
        about_story_title: "قصتنا",
        about_story_p1: "نحن متجر جزائري رائد متخصص في توفير أجود أنواع المكسرات، التوابل، والمنتجات الغذائية. هدفنا هو إيصال الجودة العالمية إلى باب منزلك.",
        about_story_p2: "مع سنوات من الخبرة والالتزام بالتميز، نقدم منتجات منتقاة بعناية من أفضل المصادر العالمية، مع ضمان الجودة والأصالة في كل منتج.",
        about_why_title: "لماذا تختار AZ Market؟",
        about_why_subtitle: "أفضل الخدمات والمنتجات لك",
        about_card1_title: "توصيل سريع",
        about_card1_desc: "نغطي 58 ولاية جزائرية مع توصيل سريع وآمن",
        about_card2_title: "جودة مضمونة",
        about_card2_desc: "منتجات أصلية 100% من أفضل المصادر العالمية",
        about_card3_title: "دفع آمن",
        about_card3_desc: "الدفع عند الاستلام والعديد من خيارات الدفع الآمنة",
        
        // Cart
        cart_title: "سلة التسوق",
        cart_items: "عناصر السلة",
        cart_empty: "السلة فارغة",
        continue_shopping: "متابعة التسوق",
        order_summary: "ملخص الطلب",
        cart_subtotal: "المجموع الفرعي:",
        cart_tax: "الضريبة (10%):",
        cart_shipping: "الشحن:",
        free: "مجاني",
        cart_total: "المجموع:",
        checkout_btn: "طلب عبر واتس أب",
        clear_cart: "إفراغ السلة",
        
        // Modal
        modal_clear_title: "إفراغ السلة",
        modal_clear_msg: "هل أنت متأكد من إفراغ السلة؟ لا يمكن التراجع عن هذا الإجراء.",
        modal_cancel: "إلغاء",
        modal_confirm: "نعم، إفراغ السلة",
        
        // Search
        search_placeholder: "ابحث عن المنتجات...",
        
        // Toast
        toast_added: "تمت إضافة المنتج للسلة!",
        
        // Language
        lang_toggle: "English",
        
        // Admin Panel
        admin_panel: "لوحة الإدارة",
        admin_add_product: "إضافة منتج جديد",
        admin_label_name_ar: "اسم المنتج (العربية) *",
        admin_label_name_en: "اسم المنتج (الإنجليزية) *",
        admin_label_category: "التصنيف *",
        admin_label_price: "السعر (د.ج) *",
        admin_label_desc_ar: "الوصف (العربية - اختياري)",
        admin_label_desc_en: "الوصف (الإنجليزية - اختياري)",
        admin_label_badge: "الشارة (اختياري)",
        admin_label_image: "صورة المنتج *",
        admin_btn_add: "إضافة المنتج",
        admin_btn_cancel: "إلغاء",
        admin_btn_update: "تحديث المنتج",
        admin_products_list: "المنتجات",
        admin_loading: "جاري تحميل المنتجات...",
        admin_no_products: "لا توجد منتجات بعد",
        
        // Admin Placeholders
        admin_ph_name_ar: "مثال: لوز فاخر",
        admin_ph_name_en: "مثال: Premium Almonds (اكتبه بالإنجليزية)",
        admin_ph_price: "0.00",
        admin_ph_desc_ar: "أدخل وصف المنتج بالعربية هنا...",
        admin_ph_desc_en: "أدخل الوصف بالإنجليزية (اختياري)...",
        
        // Upload text
        admin_upload_text: "اسحب الصورة هنا أو انقر للاختيار",
        admin_upload_hint: "PNG, JPG, WEBP (حد أقصى 32MB)",
        admin_remove_image: "إزالة الصورة",
        admin_uploading: "جاري رفع الصورة...",
        
        // Admin Dropdown Options
        admin_opt_select_category: "اختر التصنيف",
        admin_opt_nuts: "المكسرات",
        admin_opt_spices: "البهارات",
        admin_opt_food: "منتجات غذائية",
        admin_opt_cosmetics: "مستحضرات التجميل",
        admin_opt_diapers: "حفاضات الأطفال",
        admin_opt_drinks: "المشروبات",
        admin_opt_no_badge: "بدون شارة",
        admin_opt_sale: "تخفيض",
        admin_opt_premium: "مميز",
        admin_opt_organic: "عضوي",
        admin_opt_bestseller: "الأكثر مبيعًا",
        admin_opt_new: "جديد",
        admin_opt_value_pack: "عرض خاص",
        admin_opt_all_categories: "جميع الفئات",
        admin_opt_baby: "حفاضات الأطفال",
        
        // Admin Inventory Management
        admin_manage_inventory: "إدارة المخزون",
        admin_filter_category: "تصفية حسب الفئة",
        admin_delete_category: "حذف الفئة",
        admin_delete_category_products: "حذف الفئة",
        admin_products_tab: "المنتجات",
        admin_inventory_tab: "إدارة المخزون",
        admin_delete_all_confirm: "هل أنت متأكد من حذف جميع المنتجات في",
        admin_delete_all_cannot_undo: "لا يمكن التراجع عن هذا الإجراء",
        admin_orders_tab: "الطلبات",
        admin_orders_title: "الطلبات",
        admin_no_orders: "لا توجد طلبات",
        admin_config_warning_title: "تنبيه: الإعدادات غير مكتملة",
        admin_config_warning_msg: "يرجى تحديث ملف firebase-config.js بمفاتيح Firebase و imgbb API الخاصة بك.",
        admin_delete_confirm_title: "تأكيد الحذف",
        admin_delete_confirm_msg: "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
        admin_modal_cancel: "إلغاء",
        admin_modal_delete: "نعم، احذف",
        admin_demo_btn: "Demo",
        admin_delete_all_btn: "حذف الكل",
        
        // Contact Page
        contact_title: "اتصل بنا",
        contact_desc: "تواصل معنا. نود أن نسمع منك!",
        contact_form_name: "الاسم الكامل",
        contact_form_email: "عنوان البريد الإلكتروني",
        contact_form_message: "الرسالة",
        contact_form_send: "إرسال الرسالة",
        contact_info_title: "معلومات التواصل",
        contact_phone: "الهاتف",
        contact_email: "البريد الإلكتروني",
        contact_address: "العنوان",
        contact_address_line1: "نارة منعة",
        contact_address_line2: "باتنة",
        
        // Status Page
        status_title: "حالة الطلب",
        status_pending: "⏳ الطلب قيد المراجعة",
        status_approved: "✅ تم الموافقة على الطلب!",
        order_id: "رقم الطلب",
        order_time: "وقت الطلب",
        customer_info: "معلومات العميل",
        customer_name: "الاسم:",
        customer_phone: "الهاتف:",
        order_items: "المنتجات",
        order_total: "المجموع:",
        status_timeline: "تطور الطلب",
        step_pending: "قيد المراجعة",
        step_pending_desc: "تم استقبال طلبك وقيد المراجعة",
        step_approved: "تم الموافقة",
        step_approved_desc: "سيتم إبلاغك عند الموافقة",
        status_auto_refresh: "يتم تحديث الحالة تلقائياً كل 5 ثواني",
        back_to_cart: "العودة للسلة",
        
        // My Orders Page
        my_orders_title: "طلباتي",
        no_orders: "لا توجد طلبات"
    },
    en: {
        // Navigation
        nav_home: "Home",
        nav_shop: "Shop",
        nav_cart: "Cart",
        nav_contact: "Contact",
        
        // Hero Section
        hero_title: "Premium Spices & Nuts from Around the World",
        hero_subtitle: "Discover our handpicked selection of authentic spices, fresh nuts, and specialty food products. Quality you can taste in every bite.",
        hero_btn: "Shop Now",
        hero_nuts: "Premium Fresh Nuts",
        hero_spices: "Authentic Spices",
        hero_food: "Quality Food Products",
        hero_cosmetics: "Beauty & Care",
        hero_baby: "Baby's Comfort First",
        hero_drinks: "Refreshing Beverages",
        
        // Categories
        cat_all: "All",
        cat_nuts: "Nuts",
        cat_spices: "Spices",
        cat_food: "Food Products",
        cat_cosmetics: "Cosmetics",
        cat_diapers: "Baby Diapers",
        cat_drinks: "Drinks",
        
        // Products Section
        sect_featured: "Featured Products",
        view_all: "View All",
        add_to_cart: "Add to Cart",
        added_to_cart: "Added ✓",
        no_products: "No products found",
        
        // Features
        feat_shipping: "Free Shipping",
        feat_shipping_desc: "On orders over $50",
        feat_payment: "Secure Payment",
        feat_payment_desc: "100% secure checkout",
        feat_returns: "Easy Returns",
        feat_returns_desc: "30-day return policy",
        feat_support: "24/7 Support",
        feat_support_desc: "Dedicated support team",
        
        // Footer
        footer_desc: "Your trusted source for premium spices, nuts, and specialty food products.",
        footer_links: "Quick Links",
        footer_about: "About Us",
        footer_categories: "Categories",
        footer_contact: "Contact Us",
        footer_address: "123 Market Street, NY",
        footer_rights: "© 2024 Aznaf Market. All rights reserved.",
        
        // About Page
        about_title: "About Us",
        about_subtitle: "AZ Market Success Story",
        about_story_title: "Our Story",
        about_story_p1: "We are a leading Algerian store specializing in providing the finest types of nuts, spices, and food products. Our goal is to deliver world-class quality to your doorstep.",
        about_story_p2: "With years of experience and commitment to excellence, we offer carefully selected products from the best global sources, with guaranteed quality and authenticity in every product.",
        about_why_title: "Why Choose AZ Market?",
        about_why_subtitle: "Best Services and Products for You",
        about_card1_title: "Fast Delivery",
        about_card1_desc: "We cover 58 Algerian states with fast and safe delivery",
        about_card2_title: "Guaranteed Quality",
        about_card2_desc: "100% authentic products from the best international sources",
        about_card3_title: "Secure Payment",
        about_card3_desc: "Cash on Delivery and many secure payment options",
        
        // Cart
        cart_title: "Shopping Cart",
        cart_items: "Cart Items",
        cart_empty: "Your cart is empty",
        continue_shopping: "Continue Shopping",
        order_summary: "Order Summary",
        cart_subtotal: "Subtotal:",
        cart_tax: "Tax (10%):",
        cart_shipping: "Shipping:",
        free: "Free",
        cart_total: "Total:",
        checkout_btn: "Order via WhatsApp",
        clear_cart: "Clear Cart",
        
        // Modal
        modal_clear_title: "Clear Cart",
        modal_clear_msg: "Are you sure you want to clear your cart? This action cannot be undone.",
        modal_cancel: "Cancel",
        modal_confirm: "Yes, Clear Cart",
        
        // Search
        search_placeholder: "Search for products...",
        
        // Toast
        toast_added: "Item added to cart!",
        
        // Language
        lang_toggle: "عربي",
        
        // Admin Panel
        admin_panel: "Admin Panel",
        admin_add_product: "Add New Product",
        admin_label_name_ar: "Product Name (Arabic) *",
        admin_label_name_en: "Product Name (English) *",
        admin_label_category: "Category *",
        admin_label_price: "Price (DZD) *",
        admin_label_desc_ar: "Description (Arabic - Optional)",
        admin_label_desc_en: "Description (English - Optional)",
        admin_label_badge: "Badge (Optional)",
        admin_label_image: "Product Image *",
        admin_btn_add: "Add Product",
        admin_btn_cancel: "Cancel",
        admin_btn_update: "Update Product",
        admin_products_list: "Products",
        admin_loading: "Loading products...",
        admin_no_products: "No products yet",
        
        // Admin Placeholders
        admin_ph_name_ar: "Ex: Almonds",
        admin_ph_name_en: "Ex: Premium Almonds",
        admin_ph_price: "0.00",
        admin_ph_desc_ar: "Arabic Description...",
        admin_ph_desc_en: "English Description...",
        
        // Upload text
        admin_upload_text: "Drag image here or click to select",
        admin_upload_hint: "PNG, JPG, WEBP (max 32MB)",
        admin_remove_image: "Remove Image",
        admin_uploading: "Uploading image...",
        
        // Admin Dropdown Options
        admin_opt_select_category: "Choose Category",
        admin_opt_nuts: "Nuts",
        admin_opt_spices: "Spices",
        admin_opt_food: "Food Products",
        admin_opt_cosmetics: "Cosmetics",
        admin_opt_diapers: "Baby Diapers",
        admin_opt_drinks: "Drinks",
        admin_opt_no_badge: "No Badge",
        admin_opt_sale: "Sale",
        admin_opt_premium: "Premium",
        admin_opt_organic: "Organic",
        admin_opt_bestseller: "Bestseller",
        admin_opt_new: "New",
        admin_opt_value_pack: "Value Pack",
        admin_opt_all_categories: "All Categories",
        admin_opt_baby: "Baby Diapers",
        
        // Admin Inventory Management
        admin_manage_inventory: "Manage Inventory",
        admin_filter_category: "Filter by Category",
        admin_delete_category: "Delete Category",
        admin_delete_category_products: "Delete Category",
        admin_products_tab: "Products",
        admin_inventory_tab: "Manage Inventory",
        admin_delete_all_confirm: "Are you sure you want to delete all products in",
        admin_delete_all_cannot_undo: "This action cannot be undone",
        admin_orders_tab: "Orders",
        admin_orders_title: "Orders",
        admin_no_orders: "No orders found",
        admin_config_warning_title: "Warning: Incomplete Configuration",
        admin_config_warning_msg: "Please update firebase-config.js with your Firebase and imgbb API keys.",
        admin_delete_confirm_title: "Confirm Delete",
        admin_delete_confirm_msg: "Are you sure you want to delete this product? This action cannot be undone.",
        admin_modal_cancel: "Cancel",
        admin_modal_delete: "Yes, Delete",
        admin_demo_btn: "Demo",
        admin_delete_all_btn: "Delete All",
        
        // Contact Page
        contact_title: "Contact Us",
        contact_desc: "Get in touch with our team. We'd love to hear from you!",
        contact_form_name: "Full Name",
        contact_form_email: "Email Address",
        contact_form_message: "Message",
        contact_form_send: "Send Message",
        contact_info_title: "Contact Information",
        contact_phone: "Phone",
        contact_email: "Email",
        contact_address: "Address",
        contact_address_line1: "Naara Manaa",
        contact_address_line2: "Batna",
        
        // Status Page
        status_title: "Order Status",
        status_pending: "⏳ Order Under Review",
        status_approved: "✅ Order Approved!",
        order_id: "Order Number",
        order_time: "Order Time",
        customer_info: "Customer Information",
        customer_name: "Name:",
        customer_phone: "Phone:",
        order_items: "Items",
        order_total: "Total:",
        status_timeline: "Order Progress",
        step_pending: "Under Review",
        step_pending_desc: "Your order has been received and is under review",
        step_approved: "Approved",
        step_approved_desc: "You will be notified when your order is approved",
        status_auto_refresh: "Status updates automatically every 5 seconds",
        back_to_cart: "Back to Cart",
        
        // My Orders Page
        my_orders_title: "My Orders",
        no_orders: "No orders"
    }
};

// Current language
let currentLang = 'ar';

// ==========================================
// Language Functions
// ==========================================

function initLanguage() {
    const savedLang = localStorage.getItem('aznaf_lang') || 'ar';
    setLanguage(savedLang, false);
}

function setLanguage(lang, save = true) {
    currentLang = lang;
    
    if (save) {
        localStorage.setItem('aznaf_lang', lang);
    }
    
    // Update HTML dir and lang attributes
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update all placeholders with data-lang-placeholder (input, textarea)
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    // Update all option elements with data-lang-key (dropdown options)
    document.querySelectorAll('option[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update language toggle button - show opposite language shortcut
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
    
    // Re-render products to update button text
    if (typeof renderProducts === 'function' && products.length > 0) {
        renderProducts(products);
    }
    
    // Reinitialize Swiper to fix image display on language change (RTL/LTR)
    if (typeof window.reinitHeroSwiper === 'function') {
        setTimeout(() => {
            window.reinitHeroSwiper();
        }, 100);
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

// Get translation helper
function t(key) {
    return translations[currentLang] && translations[currentLang][key] 
        ? translations[currentLang][key] 
        : key;
}

// ==========================================
// Category Translations
// ==========================================

const categoryLabels = {
    ar: {
        'nuts': 'مكسرات',
        'spices': 'توابل',
        'food': 'منتجات غذائية',
        'cosmetics': 'مستحضرات تجميل',
        'diapers': 'حفاضات أطفال',
        'drinks': 'مشروبات'
    },
    en: {
        'nuts': 'Nuts',
        'spices': 'Spices',
        'food': 'Food Products',
        'cosmetics': 'Cosmetics',
        'diapers': 'Baby Diapers',
        'drinks': 'Drinks'
    }
};

function getCategoryLabel(categoryCode) {
    return categoryLabels[currentLang] && categoryLabels[currentLang][categoryCode]
        ? categoryLabels[currentLang][categoryCode]
        : categoryCode;
}

// ==========================================
// Price Formatting Function
// ==========================================

function formatPrice(price) {
    return `${price.toFixed(2)} ${CURRENCY_SYMBOL}`;
}

// ==========================================
// Cart State
// ==========================================

let cart = [];

function loadCartFromLocalStorage() {
    try {
        const saved = localStorage.getItem('aznaf_cart');
        cart = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('aznaf_cart', JSON.stringify(cart));
}

// ==========================================
// Admin Secret Access (5 clicks on logo)
// ==========================================

let logoClickCount = 0;
let logoClickTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            logoClickCount++;
            
            clearTimeout(logoClickTimeout);
            logoClickTimeout = setTimeout(() => {
                logoClickCount = 0;
            }, 5000);
            
            if (logoClickCount === 5) {
                window.location.href = 'admin.html';
                logoClickCount = 0;
            }
        });
    }
});

// ==========================================
// Theme Management
// ==========================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ==========================================
// Firebase Integration
// ==========================================

let db = null;
let products = [];

async function initFirebase() {
    try {
        const firebaseConfig = window.firebaseConfig;
        
        console.log('Firebase Config Check:', {
            exists: !!firebaseConfig,
            projectId: firebaseConfig?.projectId,
            apiKey: firebaseConfig?.apiKey?.substring(0, 10)
        });
        
        if (!firebaseConfig || !firebaseConfig.projectId || firebaseConfig.projectId === '' || firebaseConfig.projectId.includes('%')) {
            console.log('Firebase not configured, using local data');
            loadLocalProducts();
            renderProducts();
            handleURLParameters();
            return;
        }

        await firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        
        console.log('Firebase initialized successfully');
        await fetchProducts();
        renderProducts();
        handleURLParameters();
    } catch (error) {
        console.error('Firebase initialization error:', error);
        loadLocalProducts();
        renderProducts();
        handleURLParameters();
    }
}

async function fetchProducts() {
    try {
        if (!db) {
            loadLocalProducts();
            return;
        }

        const snapshot = await db.collection('products')
            .orderBy('createdAt', 'desc')
            .get();
        
        products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log(`Fetched ${products.length} products from Firestore (ordered by newest first)`);
    } catch (error) {
        console.error('Error fetching products:', error);
        loadLocalProducts();
    }
}

// Function to reload products globally (used by admin panel after changes)
window.reloadProductsGlobally = async function() {
    await fetchProducts();
    renderProducts();
    console.log('Products reloaded globally');
}

function loadLocalProducts() {
    products = [];
}

// ==========================================
// Product Rendering
// ==========================================

function renderProducts(productsToShow = products) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productGrid.innerHTML = `<p class="text-center text-gray-500 col-span-full">${t('no_products')}</p>`;
        return;
    }

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col';
        
        // Get product name in current language
        let displayName = product.name || '';
        if (currentLang === 'en') {
            displayName = product.name_en || product.name_ar || product.name || '';
        } else {
            displayName = product.name_ar || product.name || '';
        }
        
        card.innerHTML = `
            <div class="relative overflow-hidden bg-gray-100 h-24 md:h-28">
                <img 
                    src="${product.image}" 
                    alt="${displayName}"
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onerror="this.src='https://via.placeholder.com/400x400?text=Product+Image'"
                >
                ${product.badge ? `<span class="absolute top-1 end-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">${product.badge}</span>` : ''}
            </div>
            <div class="p-2 flex-1 flex flex-col justify-between">
                <h3 class="font-bold text-xs text-gray-800 dark:text-white truncate mb-1">${displayName}</h3>
                <div>
                    <p class="text-primary-500 font-bold text-sm mb-1">${formatPrice(product.price)}</p>
                    <button 
                        class="add-to-cart-btn w-full bg-primary-500 hover:bg-primary-600 text-white py-1.5 rounded-lg text-xs transition-colors"
                        data-product-id="${product.id}"
                        data-product-name="${displayName}"
                        data-product-price="${product.price}"
                        data-product-image="${product.image}"
                    >
                        ${t('add_to_cart')}
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(card);
    });

    // Attach event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// ==========================================
// Category Filtering
// ==========================================

let currentCategory = 'all';

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            currentCategory = category;
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filterProducts();
        });
    });
}

function filterProducts() {
    let filtered = products;
    
    if (currentCategory !== 'all') {
        filtered = products.filter(product => {
            const productCategory = (product.category || '').toLowerCase();
            return productCategory === currentCategory || 
                   productCategory.includes(currentCategory);
        });
    }
    
    // Change background color based on category
    const productsSection = document.getElementById('products');
    if (productsSection) {
        // Remove all background classes
        productsSection.classList.remove('bg-orange-100', 'bg-red-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-blue-100', 'bg-gray-100', 'dark:bg-orange-900/40', 'dark:bg-red-900/40', 'dark:bg-green-900/40', 'dark:bg-yellow-900/40', 'dark:bg-purple-900/40', 'dark:bg-blue-900/40');
        
        // Add new background class based on category
        const backgroundMap = {
            'all': ['bg-gray-100', 'dark:bg-dark-bg'],
            'nuts': ['bg-orange-100', 'dark:bg-orange-900/40'],
            'spices': ['bg-red-100', 'dark:bg-red-900/40'],
            'food': ['bg-green-100', 'dark:bg-green-900/40'],
            'drinks': ['bg-yellow-100', 'dark:bg-yellow-900/40'],
            'cosmetics': ['bg-purple-100', 'dark:bg-purple-900/40'],
            'baby': ['bg-blue-100', 'dark:bg-blue-900/40']
        };
        
        const bgClasses = backgroundMap[currentCategory] || backgroundMap['all'];
        productsSection.classList.add(...bgClasses);
        productsSection.dataset.category = currentCategory;
    }
    
    renderProducts(filtered);
    
    // Scroll to products section smoothly
    const productsContainer = document.getElementById('products');
    if (productsContainer) {
        productsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==========================================
// Search Functionality
// ==========================================

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // If search is empty, show all products from current category
        if (query === '') {
            filterProducts();
            return;
        }
        
        // Filter products by search query in both Arabic and English names
        let filtered = products.filter(product => {
            const nameAr = (product.name_ar || '').toLowerCase();
            const nameEn = (product.name_en || '').toLowerCase();
            const name = (product.name || '').toLowerCase();
            
            // Check if query matches any name field (Arabic, English, or generic)
            return nameAr.includes(query) || nameEn.includes(query) || name.includes(query);
        });
        
        // Apply category filter if one is selected
        if (currentCategory !== 'all') {
            filtered = filtered.filter(product => {
                const productCategory = (product.category || '').toLowerCase();
                return productCategory === currentCategory || 
                       productCategory.includes(currentCategory);
            });
        }
        
        renderProducts(filtered);
    };
    
    // Use 'input' event for instant/live search on every keystroke
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', handleSearch);
    }
}

// ==========================================
// Cart Operations
// ==========================================

function addToCart(e) {
    const btn = e.target;
    const productId = btn.dataset.productId;
    const productName = btn.dataset.productName;
    const productPrice = parseFloat(btn.dataset.productPrice);
    const productImage = btn.dataset.productImage;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartBadge();

    // Show feedback
    btn.textContent = t('added_to_cart');
    setTimeout(() => {
        btn.textContent = t('add_to_cart');
    }, 1500);
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (badge) {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

// ==========================================
// UI Controls
// ==========================================

function setupUIControls() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
            
            // Toggle menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when any link is clicked
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                
                // Reset menu icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const mobileSearch = document.getElementById('mobile-search');
    if (mobileSearchBtn && mobileSearch) {
        mobileSearchBtn.addEventListener('click', () => {
            mobileSearch.classList.toggle('hidden');
            const input = mobileSearch.querySelector('input');
            if (input && !mobileSearch.classList.contains('hidden')) {
                input.focus();
            }
        });
    }
}

// ==========================================
// Initialization
// ==========================================

// Handle URL parameters (e.g., ?category=nuts)
function handleURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    
    if (category && category !== 'all') {
        currentCategory = category;
        const categoryBtn = document.querySelector(`[data-category="${category}"]`);
        if (categoryBtn) {
            // Remove active class from all category buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to selected category
            categoryBtn.classList.add('active');
            // Filter products
            filterProducts();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    loadCartFromLocalStorage();
    updateCartBadge();
    setupSearch();
    setupCategoryFilters();
    setupUIControls();
    setupLanguageToggle();
    initFirebase();
});

// ==========================================
// Export for cart.js
// ==========================================

window.formatPrice = formatPrice;
window.addToCart = addToCart;
window.translations = translations;
window.currentLang = currentLang;
window.t = t;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
