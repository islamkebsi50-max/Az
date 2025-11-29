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
        footer_address: "123 شارع السوق، نيويورك",
        footer_rights: "© 2024 أزناف ماركت. جميع الحقوق محفوظة.",
        
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
        contact_address: "العنوان"
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
        contact_address: "Address"
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
    
    // Update select options if needed
    document.querySelectorAll('select[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            // For selects, update the label elsewhere (already handled above)
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
            return;
        }

        await firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        
        console.log('Firebase initialized successfully');
        await fetchProducts();
        renderProducts();
    } catch (error) {
        console.error('Firebase initialization error:', error);
        loadLocalProducts();
        renderProducts();
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
        card.className = 'bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow';
        
        // Get product name in current language
        let displayName = product.name || '';
        if (currentLang === 'en') {
            displayName = product.name_en || product.name_ar || product.name || '';
        } else {
            displayName = product.name_ar || product.name || '';
        }
        
        card.innerHTML = `
            <div class="relative overflow-hidden bg-gray-100 h-48">
                <img 
                    src="${product.image}" 
                    alt="${displayName}"
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onerror="this.src='https://via.placeholder.com/400x400?text=Product+Image'"
                >
                ${product.badge ? `<span class="absolute top-3 end-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">${product.badge}</span>` : ''}
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-2">${displayName}</h3>
                <p class="text-primary-500 font-bold text-xl mb-3">${formatPrice(product.price)}</p>
                <button 
                    class="add-to-cart-btn w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg transition-colors"
                    data-product-id="${product.id}"
                    data-product-name="${displayName}"
                    data-product-price="${product.price}"
                    data-product-image="${product.image}"
                >
                    ${t('add_to_cart')}
                </button>
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
    
    renderProducts(filtered);
}

// ==========================================
// Search Functionality
// ==========================================

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        let filtered = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            (product.category && product.category.toLowerCase().includes(query))
        );
        
        if (currentCategory !== 'all') {
            filtered = filtered.filter(product => {
                const productCategory = (product.category || '').toLowerCase();
                return productCategory === currentCategory || 
                       productCategory.includes(currentCategory);
            });
        }
        
        renderProducts(filtered);
    };
    
    if (searchInput) {
        searchInput.addEventListener('keyup', handleSearch);
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keyup', handleSearch);
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
