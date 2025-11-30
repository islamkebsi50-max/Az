// Aznaf Market - Order Status Tracking Page

// ==========================================
// Translations
// ==========================================

const translations = {
    ar: {
        status_title: "حالة الطلب",
        status_pending: "⏳ الطلب قيد المراجعة",
        status_approved: "✅ تم الموافقة على الطلب!",
        order_id: "رقم الطلب",
        order_time: "وقت الطلب",
        customer_info: "معلومات العميل",
        customer_name: "الاسم:",
        customer_phone: "الهاتف:",
        delivery_address: "العنوان:",
        order_items: "المنتجات",
        order_total: "المجموع:",
        loading: "جاري التحميل...",
        continue_shopping: "متابعة التسوق",
        back_to_cart: "العودة للسلة",
        status_timeline: "تطور الطلب",
        step_pending: "قيد المراجعة",
        step_pending_desc: "تم استقبال طلبك وقيد المراجعة",
        step_approved: "تم الموافقة",
        step_approved_desc: "سيتم إبلاغك عند الموافقة",
        status_auto_refresh: "يتم تحديث الحالة تلقائياً كل 5 ثواني",
        footer_desc: "مصدرك الموثوق للتوابل والمكسرات والمنتجات الغذائية الفاخرة."
    },
    en: {
        status_title: "Order Status",
        status_pending: "⏳ Order Under Review",
        status_approved: "✅ Order Approved!",
        order_id: "Order Number",
        order_time: "Order Time",
        customer_info: "Customer Information",
        customer_name: "Name:",
        customer_phone: "Phone:",
        delivery_address: "Address:",
        order_items: "Items",
        order_total: "Total:",
        loading: "Loading...",
        continue_shopping: "Continue Shopping",
        back_to_cart: "Back to Cart",
        status_timeline: "Order Progress",
        step_pending: "Under Review",
        step_pending_desc: "Your order has been received and is under review",
        step_approved: "Approved",
        step_approved_desc: "You will be notified when your order is approved",
        status_auto_refresh: "Status updates automatically every 5 seconds",
        footer_desc: "Your trusted source for premium spices, nuts, and specialty food items."
    }
};

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
    
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang, true);
}

// ==========================================
// Theme Functions
// ==========================================

function initTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ==========================================
// Order Tracking
// ==========================================

let orderId = null;
let unsubscribe = null;

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    setupLanguageToggle();
    
    // Get order ID from URL
    const params = new URLSearchParams(window.location.search);
    orderId = params.get('id');
    
    if (!orderId) {
        showError('Invalid order ID');
        return;
    }
    
    // Setup theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Start tracking order
    trackOrder();
    
    // Auto-refresh every 5 seconds if no Firebase
    if (typeof db === 'undefined') {
        setInterval(trackOrder, 5000);
    }
});

function trackOrder() {
    if (!orderId || typeof db === 'undefined') {
        // Fallback: load from localStorage
        loadOrderFromLocalStorage();
        return;
    }
    
    // Use real-time listener for Firebase
    if (unsubscribe) {
        unsubscribe();
    }
    
    unsubscribe = db.collection('orders').doc(orderId).onSnapshot(
        (doc) => {
            if (doc.exists) {
                updateOrderDisplay(doc.data());
            } else {
                // Try localStorage as fallback
                loadOrderFromLocalStorage();
            }
        },
        (error) => {
            console.error('Error tracking order:', error);
            loadOrderFromLocalStorage();
        }
    );
}

function loadOrderFromLocalStorage() {
    try {
        const orders = JSON.parse(localStorage.getItem('aznaf_orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        if (order) {
            updateOrderDisplay(order);
        }
    } catch (error) {
        console.error('Error loading order:', error);
    }
}

function updateOrderDisplay(order) {
    if (!order) return;
    
    // Update order ID
    document.getElementById('order-id').textContent = order.id;
    
    // Update order time
    const timeEl = document.getElementById('order-time');
    if (order.timestamp) {
        const date = new Date(order.timestamp);
        timeEl.textContent = date.toLocaleString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
    }
    
    // Update customer info
    document.getElementById('customer-name').textContent = order.customer?.name || '-';
    document.getElementById('customer-phone').textContent = order.customer?.phone || '-';
    document.getElementById('customer-address').textContent = order.customer?.address || '-';
    
    // Update order items
    const itemsEl = document.getElementById('order-items');
    if (order.items && order.items.length > 0) {
        itemsEl.innerHTML = order.items.map(item => `
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
                <span>${item.name} x${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)} د.ج</span>
            </div>
        `).join('');
    }
    
    // Update total
    const totalEl = document.getElementById('order-total');
    if (order.total) {
        totalEl.textContent = `${order.total.toFixed(2)} د.ج`;
    }
    
    // Update status badge and timeline
    updateStatusDisplay(order.status);
}

function updateStatusDisplay(status) {
    const badge = document.getElementById('status-badge');
    const stepPending = document.getElementById('step-pending');
    const stepApproved = document.getElementById('step-approved');
    
    if (status === 'completed') {
        // Order approved
        badge.className = 'inline-block px-6 py-3 rounded-full font-bold text-lg mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
        badge.innerHTML = '<i class="fas fa-check-circle me-2"></i><span data-lang-key="status_approved">✅ تم الموافقة على الطلب!</span>';
        
        stepPending.classList.remove('opacity-50');
        stepApproved.classList.remove('opacity-50');
        
        stepApproved.querySelector('.w-10').className = 'w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center';
    } else {
        // Order pending
        badge.className = 'inline-block px-6 py-3 rounded-full font-bold text-lg mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
        badge.innerHTML = '<i class="fas fa-hourglass-half animate-spin me-2"></i><span data-lang-key="status_pending">⏳ الطلب قيد المراجعة</span>';
        
        stepPending.classList.remove('opacity-50');
        stepApproved.classList.add('opacity-50');
        
        stepApproved.querySelector('.w-10').className = 'w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 flex items-center justify-center';
    }
    
    // Update data-lang-key
    const badgeSpan = badge.querySelector('[data-lang-key]');
    if (badgeSpan) {
        const key = status === 'completed' ? 'status_approved' : 'status_pending';
        badgeSpan.textContent = translations[currentLang][key];
    }
}

function showError(message) {
    const details = document.getElementById('order-details');
    if (details) {
        details.innerHTML = `
            <div class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                <p class="text-lg font-bold text-red-700 dark:text-red-300">${message}</p>
                <a href="index.html" class="mt-4 inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                    العودة للرئيسية
                </a>
            </div>
        `;
    }
}
