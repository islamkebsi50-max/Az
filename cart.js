// Aznaf Market - Shopping Cart Page

// ==========================================
// Configuration
// ==========================================

const WHATSAPP_PHONE_NUMBER = '213673425055'; // Replace with actual Algerian WhatsApp number
const CURRENCY_SYMBOL = 'د.ج';

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
    
    // Initialize theme
    initTheme();
    
    // Load cart from localStorage
    loadCartFromLocalStorage();
    
    // Render cart
    renderCart();
    
    // Setup event listeners
    setupEventListeners();
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
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        checkoutBtn.disabled = true;
        clearCartBtn.disabled = true;
        updateCartSummary();
        return;
    }
    
    emptyCartMessage.classList.add('hidden');
    checkoutBtn.disabled = false;
    clearCartBtn.disabled = false;
    
    const itemsHTML = cart.map(item => `
        <div class="bg-white dark:bg-dark-card rounded-xl shadow p-4 flex gap-4">
            <!-- Image -->
            <div class="flex-shrink-0">
                <img 
                    src="${item.image || 'https://via.placeholder.com/100x100?text=Product'}"
                    alt="${item.name}"
                    class="w-24 h-24 object-cover rounded-lg"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/100x100?text=Product'"
                >
            </div>
            
            <!-- Item Details -->
            <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">${item.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">${item.category || 'Product'}</p>
                <p class="text-lg font-bold text-primary-600 dark:text-primary-400">${CURRENCY_SYMBOL}${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            
            <!-- Quantity Adjuster -->
            <div class="flex flex-col items-center justify-center gap-2">
                <button 
                    class="qty-increase bg-primary-500 hover:bg-primary-600 text-white w-8 h-8 rounded flex items-center justify-center transition-all"
                    data-product-id="${item.id}"
                    title="Increase quantity"
                >
                    <i class="fas fa-plus text-sm"></i>
                </button>
                <span class="text-lg font-bold w-8 text-center">${item.quantity}</span>
                <button 
                    class="qty-decrease bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center transition-all"
                    data-product-id="${item.id}"
                    title="Decrease quantity"
                >
                    <i class="fas fa-minus text-sm"></i>
                </button>
                <button
                    class="remove-item mt-2 text-gray-400 hover:text-red-500 transition-colors text-xs"
                    data-product-id="${item.id}"
                    title="Remove item"
                >
                    Remove
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
    
    subtotalEl.textContent = `${CURRENCY_SYMBOL}${subtotal.toFixed(2)}`;
    taxEl.textContent = `${CURRENCY_SYMBOL}${tax.toFixed(2)}`;
    totalEl.textContent = `${CURRENCY_SYMBOL}${total.toFixed(2)}`;
}

// ==========================================
// Actions
// ==========================================

function handleCheckout() {
    if (cart.length === 0) {
        alert('سلتك فارغة!');
        return;
    }
    
    // Build cart message in Arabic
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    let message = 'سلام عليكم، أريد طلب هذه المنتجات من متجر أزنف:\n\n';
    cart.forEach(item => {
        message += `- ${item.name} (${item.quantity} كجم) - ${CURRENCY_SYMBOL}${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nالمجموع الكلي (شامل الضريبة 10%): ${CURRENCY_SYMBOL}${total.toFixed(2)}`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Clear cart after checkout
    cart = [];
    saveCartToLocalStorage();
    renderCart();
}

function handleClearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCartToLocalStorage();
        renderCart();
    }
}
