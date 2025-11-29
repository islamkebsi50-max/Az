// ==========================================
// AZNAF MARKET - Main Application
// ==========================================

// Configuration
const WHATSAPP_PHONE = "213673425055";
const CURRENCY_SYMBOL = "د.ج";
const TAX_RATE = 0.10;

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
        
        // Check if Firebase config is valid (not empty strings or placeholders)
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
        productGrid.innerHTML = '<p class="text-center text-gray-500">No products found</p>';
        return;
    }

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow';
        
        card.innerHTML = `
            <div class="relative overflow-hidden bg-gray-100 h-48">
                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onerror="this.src='https://via.placeholder.com/400x400?text=Product+Image'"
                >
                ${product.badge ? `<span class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">${product.badge}</span>` : ''}
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white mb-2">${product.name}</h3>
                <p class="text-primary-500 font-bold text-xl mb-3">${formatPrice(product.price)}</p>
                <button 
                    class="add-to-cart-btn w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg transition-colors"
                    data-product-id="${product.id}"
                    data-product-name="${product.name}"
                    data-product-price="${product.price}"
                    data-product-image="${product.image}"
                >
                    أضف إلى السلة
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
    btn.textContent = 'تمت الإضافة ✓';
    setTimeout(() => {
        btn.textContent = 'أضف إلى السلة';
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
    initTheme();
    loadCartFromLocalStorage();
    updateCartBadge();
    setupSearch();
    setupCategoryFilters();
    setupUIControls();
    initFirebase();
});

// ==========================================
// Export for cart.js
// ==========================================

window.formatPrice = formatPrice;
window.addToCart = addToCart;
