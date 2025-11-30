// Aznaf Market - Order Status Tracking Page
// Note: Uses translations and language functions from script.js

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
