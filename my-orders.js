// Aznaf Market - Customer Orders Dashboard

let allOrders = [];

// ==========================================
// Language Functions
// ==========================================

function initLanguage() {
    const savedLang = localStorage.getItem('aznaf_lang') || 'ar';
    setLanguage(savedLang, false);
}

function setLanguage(lang, save = true) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    if (save) {
        localStorage.setItem('aznaf_lang', lang);
    }
    
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

function toggleLanguage() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang, true);
    renderOrders();
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
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
// Load Orders
// ==========================================

async function loadOrders() {
    try {
        // Load from localStorage
        allOrders = JSON.parse(localStorage.getItem('aznaf_orders') || '[]');
        
        // Try to load from Firebase
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('orders').orderBy('timestamp', 'desc').get();
            allOrders = snapshot.docs.map(doc => ({...doc.data(), docId: doc.id}));
            console.log('Orders loaded from Firebase:', allOrders.length);
        }
        
        renderOrders();
    } catch (error) {
        console.error('Error loading orders:', error);
        allOrders = JSON.parse(localStorage.getItem('aznaf_orders') || '[]');
        renderOrders();
    }
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;
    
    if (allOrders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-inbox text-5xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p class="text-lg text-gray-500 dark:text-gray-400" data-lang-key="no_orders">لا توجد طلبات</p>
                <a href="index.html" class="mt-4 inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg transition-all" data-lang-key="continue_shopping">متابعة التسوق</a>
            </div>
        `;
        return;
    }
    
    const html = allOrders.map(order => `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <p class="font-bold text-lg">${order.id}</p>
                    <p class="text-xs text-gray-500">${new Date(order.timestamp).toLocaleString(currentLang === 'ar' ? 'ar-EG' : 'en-US')}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                    order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }">
                    ${order.status === 'pending' ? (currentLang === 'ar' ? 'قيد الانتظار' : 'Pending') : order.status === 'completed' ? (currentLang === 'ar' ? 'موافق عليه' : 'Approved') : (currentLang === 'ar' ? 'إلغاء' : 'Cancelled')}
                </span>
            </div>
            
            <div class="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <p class="font-semibold">${order.customer?.name || '-'}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">${order.customer?.phone || '-'}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">${order.customer?.address || '-'}</p>
            </div>
            
            <div class="mb-4 max-h-40 overflow-y-auto">
                ${order.items?.map(item => `
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} د.ج
                    </p>
                `).join('') || ''}
            </div>
            
            <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <span class="font-semibold">${currentLang === 'ar' ? 'المجموع:' : 'Total:'}</span>
                <span class="font-bold text-lg text-primary-600 dark:text-primary-400">${order.total?.toFixed(2) || '0.00'} د.ج</span>
            </div>
            
            <a href="status.html?id=${order.id}" class="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors text-center block">
                <i class="fas fa-eye me-1"></i>${currentLang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
            </a>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    setupLanguageToggle();
    
    // Setup theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Load orders
    loadOrders();
    
    // Refresh orders every 30 seconds
    setInterval(loadOrders, 30000);
});
