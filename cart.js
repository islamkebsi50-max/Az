// Aznaf Market - Shopping Cart Page

// ==========================================
// Configuration
// ==========================================

const WHATSAPP_PHONE = "213658479384";
let customerLocationLink = "";

// formatPrice helper function (uses global CURRENCY_SYMBOL from script.js)
function formatPrice(price) {
    if (typeof CURRENCY_SYMBOL !== 'undefined') {
        return `${price.toFixed(2)} ${CURRENCY_SYMBOL}`;
    }
    return `${price.toFixed(2)} د.ج`;
}

// ==========================================
// Translations (same as main script)
// ==========================================

const translations = {
    ar: {
        nav_home: "الرئيسية",
        nav_shop: "المتجر",
        nav_cart: "السلة",
        nav_contact: "اتصل بنا",
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
        modal_clear_title: "إفراغ السلة",
        modal_clear_msg: "هل أنت متأكد من إفراغ السلة؟ لا يمكن التراجع عن هذا الإجراء.",
        modal_cancel: "إلغاء",
        modal_confirm: "نعم، إفراغ السلة",
        search_placeholder: "ابحث عن المنتجات...",
        lang_toggle: "English",
        remove: "حذف",
        product: "منتج",
        delivery_address: "عنوان التسليم",
        location_saved: "✅ تم حفظ الموقع",
        location_share: "📍 مشاركة موقعي للاستلام",
        location_error: "تعذر الحصول على الموقع، يرجى تفعيل GPS"
    },
    en: {
        nav_home: "Home",
        nav_shop: "Shop",
        nav_cart: "Cart",
        nav_contact: "Contact",
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
        modal_clear_title: "Clear Cart",
        modal_clear_msg: "Are you sure you want to clear your cart? This action cannot be undone.",
        modal_cancel: "Cancel",
        modal_confirm: "Yes, Clear Cart",
        search_placeholder: "Search for products...",
        lang_toggle: "عربي",
        remove: "Remove",
        product: "Product",
        delivery_address: "Delivery Address",
        location_saved: "✅ Location Saved",
        location_share: "📍 Share my delivery location",
        location_error: "Could not get location, please enable GPS"
    }
};

let currentLang = 'ar';

function t(key) {
    return translations[currentLang] && translations[currentLang][key] 
        ? translations[currentLang][key] 
        : key;
}

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
    
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = translations[lang].lang_toggle;
    }
    
    // Re-render cart
    renderCart();
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
// Cart State & LocalStorage
// ==========================================

let cart = [];
const TAX_RATE = 0.10;

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
    try {
        localStorage.setItem('aznaf_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// ==========================================
// DOM Elements
// ==========================================

let themeToggle;
let cartItemsContainer;
let emptyCartMessage;
let subtotalEl;
let taxEl;
let totalEl;
let checkoutBtn;
let clearCartBtn;

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Cache elements
    themeToggle = document.getElementById('theme-toggle');
    cartItemsContainer = document.getElementById('cart-items');
    emptyCartMessage = document.getElementById('empty-cart');
    subtotalEl = document.getElementById('subtotal');
    taxEl = document.getElementById('tax');
    totalEl = document.getElementById('total');
    checkoutBtn = document.getElementById('checkout-btn');
    clearCartBtn = document.getElementById('clear-cart-btn');
    
    // Initialize
    initLanguage();
    initTheme();
    loadCartFromLocalStorage();
    renderCart();
    setupEventListeners();
    setupLanguageToggle();
});

function setupEventListeners() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', handleClearCart);
    }
    
    // Setup location button listener
    const locationBtn = document.getElementById('btn-get-location');
    if (locationBtn) {
        locationBtn.addEventListener('click', handleGetLocation);
    }
    
    // Setup modal listeners
    setupModalListeners();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
}

// ==========================================
// Cart Rendering
// ==========================================

function renderCart() {
    if (!cartItemsContainer || !emptyCartMessage) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (clearCartBtn) clearCartBtn.disabled = true;
        updateCartSummary();
        return;
    }
    
    emptyCartMessage.classList.add('hidden');
    if (checkoutBtn) checkoutBtn.disabled = false;
    if (clearCartBtn) clearCartBtn.disabled = false;
    
    const itemsHTML = cart.map(item => `
        <div class="bg-white dark:bg-dark-card rounded-xl shadow p-3 sm:p-4 flex gap-2 sm:gap-4">
            <!-- Image -->
            <div class="flex-shrink-0">
                <img 
                    src="${item.image || 'https://via.placeholder.com/100x100?text=Product'}"
                    alt="${item.name}"
                    class="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded-lg"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/100x100?text=Product'"
                >
            </div>
            
            <!-- Item Details -->
            <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-xs sm:text-base text-gray-900 dark:text-white mb-1 truncate">${item.name}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">${item.category || t('product')}</p>
                <p class="text-sm sm:text-lg font-bold text-primary-600 dark:text-primary-400">${formatPrice(item.price * item.quantity)}</p>
            </div>
            
            <!-- Quantity Adjuster -->
            <div class="flex flex-col items-center justify-center gap-1 sm:gap-2 flex-shrink-0">
                <button 
                    class="qty-increase bg-primary-500 hover:bg-primary-600 text-white w-7 sm:w-8 h-7 sm:h-8 rounded flex items-center justify-center transition-all"
                    data-product-id="${item.id}"
                    title="Increase quantity"
                >
                    <i class="fas fa-plus text-xs sm:text-sm"></i>
                </button>
                <span class="text-sm sm:text-lg font-bold w-6 sm:w-8 text-center">${item.quantity}</span>
                <button 
                    class="qty-decrease bg-red-500 hover:bg-red-600 text-white w-7 sm:w-8 h-7 sm:h-8 rounded flex items-center justify-center transition-all"
                    data-product-id="${item.id}"
                    title="Decrease quantity"
                >
                    <i class="fas fa-minus text-xs sm:text-sm"></i>
                </button>
                <button
                    class="remove-item mt-1 sm:mt-2 text-gray-400 hover:text-red-500 transition-colors text-xs whitespace-nowrap"
                    data-product-id="${item.id}"
                    title="Remove item"
                >
                    ${t('remove')}
                </button>
            </div>
        </div>
    `).join('');
    
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.qty-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            const item = cart.find(i => String(i.id) === productId);
            if (item) {
                item.quantity += 1;
                saveCartToLocalStorage();
                renderCart();
            }
        });
    });
    
    document.querySelectorAll('.qty-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            const item = cart.find(i => String(i.id) === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCartToLocalStorage();
                renderCart();
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            cart = cart.filter(i => String(i.id) !== productId);
            saveCartToLocalStorage();
            renderCart();
        });
    });
    
    updateCartSummary();
}

// ==========================================
// Cart Summary
// ==========================================

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// ==========================================
// Location Handler
// ==========================================

function handleGetLocation() {
    const locationBtn = document.getElementById('btn-get-location');
    if (!locationBtn) return;
    
    if (navigator.geolocation) {
        locationBtn.disabled = true;
        locationBtn.style.opacity = '0.5';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                customerLocationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                
                // Update button to show location saved
                const span = locationBtn.querySelector('span');
                if (span) {
                    span.textContent = currentLang === 'ar' ? '✅ تم حفظ الموقع' : '✅ Location Saved';
                }
                locationBtn.style.borderColor = '#10b981';
                locationBtn.style.backgroundColor = '#ecfdf5';
                locationBtn.style.color = '#059669';
                locationBtn.classList.add('dark:bg-green-900/20', 'dark:text-green-400');
                locationBtn.disabled = true;
            },
            (error) => {
                alert(t('location_error'));
                locationBtn.disabled = false;
                locationBtn.style.opacity = '1';
            }
        );
    } else {
        alert(currentLang === 'ar' ? 'المتصفح لا يدعم خاصية الموقع' : 'Your browser does not support geolocation');
    }
}

// ==========================================
// Actions
// ==========================================

function handleCheckout() {
    if (cart.length === 0) {
        alert(t('cart_empty'));
        return;
    }
    
    // Show address form
    const addressForm = document.getElementById('address-form-container');
    if (addressForm.classList.contains('hidden')) {
        addressForm.classList.remove('hidden');
        addressForm.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Validate address form
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    
    if (!customerName || !customerPhone || !customerAddress) {
        alert(currentLang === 'ar' ? 'يرجى ملء جميع حقول العنوان' : 'Please fill all address fields');
        return;
    }
    
    // Create order object
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    const order = {
        id: 'ORD-' + Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        subtotal: subtotal,
        tax: tax,
        total: total
    };
    
    // Save to localStorage and Firebase
    saveOrderToDatabase(order);
    
    // Show WhatsApp message
    let message = currentLang === 'ar' 
        ? `مرحباً، أريد طلب:\n\nالاسم: ${customerName}\nالهاتف: ${customerPhone}\nالعنوان: ${customerAddress}\n\n`
        : `Hello, I would like to order:\n\nName: ${customerName}\nPhone: ${customerPhone}\nAddress: ${customerAddress}\n\n`;
    
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) : ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += currentLang === 'ar'
        ? `\nالمجموع الكلي: ${formatPrice(total)}\nرقم الطلب: ${order.id}`
        : `\nTotal: ${formatPrice(total)}\nOrder #: ${order.id}`;
    
    // Add location link if available
    if (customerLocationLink) {
        message += currentLang === 'ar'
            ? `\n\n📍 موقع الاستلام:\n${customerLocationLink}`
            : `\n\n📍 Delivery Location:\n${customerLocationLink}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    
    // Clear cart, location, and reset form
    cart = [];
    customerLocationLink = '';
    saveCartToLocalStorage();
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';
    document.getElementById('address-form-container').classList.add('hidden');
    
    // Reset location button
    const locationBtn = document.getElementById('btn-get-location');
    if (locationBtn) {
        locationBtn.disabled = false;
        locationBtn.style.opacity = '1';
        locationBtn.style.borderColor = '#3b82f6';
        locationBtn.style.backgroundColor = 'transparent';
        locationBtn.style.color = '#2563eb';
        locationBtn.querySelector('span').textContent = currentLang === 'ar' ? '📍 مشاركة موقعي للاستلام' : '📍 Share my delivery location';
    }
    
    renderCart();
    
    // Open WhatsApp and redirect to tracking page
    window.open(whatsappURL, '_blank');
    
    // Redirect to status tracking page after 1 second
    setTimeout(() => {
        window.location.href = `status.html?id=${order.id}`;
    }, 1000);
}

// Save order to Firebase and localStorage
async function saveOrderToDatabase(order) {
    try {
        // Save to localStorage for backup
        let orders = JSON.parse(localStorage.getItem('aznaf_orders') || '[]');
        orders.push(order);
        localStorage.setItem('aznaf_orders', JSON.stringify(orders));
        
        // Try to save to Firebase
        if (typeof db !== 'undefined') {
            await db.collection('orders').doc(order.id).set(order);
            console.log('Order saved to Firebase:', order.id);
        }
    } catch (error) {
        console.log('Order saved locally (Firebase unavailable):', order.id);
    }
}

// ==========================================
// Custom Modal Functions
// ==========================================

function showConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) return;
    
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function hideConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) return;
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function setupModalListeners() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', hideConfirmModal);
    }
    
    if (modalCancel) {
        modalCancel.addEventListener('click', hideConfirmModal);
    }
    
    if (modalConfirm) {
        modalConfirm.addEventListener('click', () => {
            cart = [];
            saveCartToLocalStorage();
            renderCart();
            hideConfirmModal();
        });
    }
}

function handleClearCart() {
    showConfirmModal();
}
