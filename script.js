// Aznaf Market - Main JavaScript with Firebase Integration

// ==========================================
// Firebase Initialization
// ==========================================

let db = null;
let firebaseInitialized = false;

// Initialize Firebase if configured
function initFirebase() {
    try {
        // Check if Firebase config is properly set up
        if (typeof firebaseConfig !== 'undefined' && isFirebaseConfigured()) {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            firebaseInitialized = true;
            console.log('Firebase initialized successfully');
            return true;
        } else {
            console.log('Firebase not configured - using local product data');
            return false;
        }
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// ==========================================
// Local Product Data (Fallback)
// ==========================================

const localProducts = [
    {
        id: 1,
        name: "Premium Almonds",
        category: "nuts",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 2,
        name: "Organic Cashews",
        category: "nuts",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&h=400&fit=crop",
        badge: "Sale"
    },
    {
        id: 3,
        name: "Saffron Threads",
        category: "spices",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Ground Turmeric",
        category: "spices",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1615485290399-f10f394a7c6e?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 5,
        name: "Organic Honey",
        category: "food",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
        badge: "Organic"
    },
    {
        id: 6,
        name: "Extra Virgin Olive Oil",
        category: "food",
        price: 22.99,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 7,
        name: "Argan Oil Serum",
        category: "cosmetics",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
        badge: "Bestseller"
    },
    {
        id: 8,
        name: "Natural Face Cream",
        category: "cosmetics",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 9,
        name: "Baby Diapers Pack",
        category: "diapers",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
        badge: "Value Pack"
    },
    {
        id: 10,
        name: "Organic Baby Wipes",
        category: "diapers",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1584839404042-8bc21d240e46?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 11,
        name: "Fresh Orange Juice",
        category: "drinks",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 12,
        name: "Green Tea Collection",
        category: "drinks",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
        badge: "New"
    }
];

// Products arrays - will be populated from Firestore or local data
let products = [];
let allProducts = []; // Global storage for all products (used for instant search)

// ==========================================
// Firestore Functions
// ==========================================

async function fetchProducts() {
    // Show loading state
    showLoadingState();
    
    // Try to fetch from Firestore if initialized
    if (firebaseInitialized && db) {
        try {
            const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
            
            if (!snapshot.empty) {
                products = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name || 'Unnamed Product',
                        category: data.category || 'uncategorized',
                        price: parseFloat(data.price) || 0,
                        image: data.image || data.imageUrl || 'https://via.placeholder.com/400x400?text=Product',
                        badge: data.badge || null,
                        description: data.description || ''
                    };
                });
                // Store in global array for instant search
                allProducts = [...products];
                console.log(`Fetched ${products.length} products from Firestore (ordered by newest first)`);
                return products;
            } else {
                console.log('No products in Firestore, using local data');
                products = [...localProducts];
                allProducts = [...localProducts];
                return products;
            }
        } catch (error) {
            console.error('Error fetching products from Firestore:', error);
            console.log('Falling back to local product data');
            products = [...localProducts];
            allProducts = [...localProducts];
            return products;
        }
    } else {
        // Use local products if Firebase is not configured
        console.log('Using local product data');
        products = [...localProducts];
        allProducts = [...localProducts];
        return products;
    }
}

// Show loading skeleton while fetching products
function showLoadingState() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    const skeletonCount = 12;
    const skeletonHTML = Array(skeletonCount).fill('').map(() => `
        <div class="product-card bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-md animate-pulse">
            <div class="product-image aspect-square bg-gray-300 dark:bg-gray-700"></div>
            <div class="p-4">
                <div class="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                <div class="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                <div class="flex items-center justify-between">
                    <div class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div class="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    `).join('');
    
    productGrid.innerHTML = skeletonHTML;
}

// ==========================================
// Cart State
// ==========================================

let cart = [];
let cartCount = 0;

// Load cart from localStorage on startup
function loadCartFromLocalStorage() {
    try {
        const saved = localStorage.getItem('aznaf_cart');
        if (saved) {
            cart = JSON.parse(saved);
            cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        cart = [];
        cartCount = 0;
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    try {
        localStorage.setItem('aznaf_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

// ==========================================
// DOM Elements
// ==========================================

let productGrid;
let cartCountElement;
let themeToggle;
let mobileMenuBtn;
let mobileMenu;
let mobileSearchBtn;
let mobileSearch;
let toast;
let toastMessage;
let categoryBtns;

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Cache DOM elements
    productGrid = document.getElementById('product-grid');
    cartCountElement = document.getElementById('cart-count');
    themeToggle = document.getElementById('theme-toggle');
    mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileMenu = document.getElementById('mobile-menu');
    mobileSearchBtn = document.getElementById('mobile-search-btn');
    mobileSearch = document.getElementById('mobile-search');
    toast = document.getElementById('toast');
    toastMessage = document.getElementById('toast-message');
    categoryBtns = document.querySelectorAll('.category-btn');
    
    // Load cart from localStorage first
    loadCartFromLocalStorage();
    
    // Initialize theme
    initTheme();
    
    // Initialize Firebase
    initFirebase();
    
    // Fetch and render products
    await fetchProducts();
    renderProducts('all');
    
    // Update cart count display
    updateCartCount();
    
    // Set up event listeners
    initEventListeners();
    
    // Initialize instant search functionality
    initializeInstantSearch();
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
// Event Listeners
// ==========================================

function initEventListeners() {
    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Mobile Search Toggle
    if (mobileSearchBtn && mobileSearch) {
        mobileSearchBtn.addEventListener('click', () => {
            mobileSearch.classList.toggle('hidden');
        });
    }
    
    // Category Buttons
    if (categoryBtns) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.category;
                renderProducts(category);
            });
        });
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
// Product Rendering
// ==========================================

function renderProducts(category) {
    if (!productGrid) return;
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400">No products found in this category.</p>
            </div>
        `;
        return;
    }
    
    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            addToCart(productId);
        });
    });
}

// Create Product Card HTML
function createProductCard(product) {
    const badgeColors = {
        'Sale': 'bg-red-500',
        'Premium': 'bg-purple-500',
        'Organic': 'bg-green-500',
        'Bestseller': 'bg-blue-500',
        'Value Pack': 'bg-orange-500',
        'New': 'bg-teal-500'
    };
    
    const categoryLabels = {
        'nuts': 'Nuts',
        'spices': 'Spices',
        'food': 'Food Products',
        'cosmetics': 'Cosmetics',
        'diapers': 'Baby Diapers',
        'drinks': 'Drinks'
    };
    
    // Handle image URL - ensure it's valid
    let imageUrl = product.image || product.imageUrl || '';
    if (!imageUrl || imageUrl === '') {
        imageUrl = 'https://via.placeholder.com/400x400?text=Product';
    }
    
    // Handle price - ensure it's a number
    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
    
    return `
        <div class="product-card bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-md">
            <div class="product-image relative aspect-square overflow-hidden">
                ${product.badge ? `
                    <span class="absolute top-3 left-3 ${badgeColors[product.badge] || 'bg-gray-500'} text-white text-xs font-semibold px-3 py-1 rounded-full z-10 sale-badge">
                        ${product.badge}
                    </span>
                ` : ''}
                <img 
                    src="${imageUrl}" 
                    alt="${product.name}"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/400x400?text=Product'"
                >
            </div>
            <div class="p-4">
                <span class="text-xs text-primary-500 dark:text-primary-400 font-medium uppercase tracking-wide">
                    ${categoryLabels[product.category] || product.category || 'Product'}
                </span>
                <h3 class="font-semibold text-gray-900 dark:text-white mt-1 mb-2 truncate">
                    ${product.name}
                </h3>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-gray-900 dark:text-white price-tag">
                        $${price.toFixed(2)}
                    </span>
                    <button 
                        class="add-to-cart-btn bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-full shadow-md"
                        data-product-id="${product.id}"
                        aria-label="Add ${product.name} to cart"
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// Cart Functions
// ==========================================

function addToCart(productId) {
    // Handle both string and number IDs (Firestore uses strings)
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;
    
    const existingItem = cart.find(item => String(item.id) === String(productId));
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    cartCount += 1;
    updateCartCount();
    saveCartToLocalStorage(); // Save to localStorage
    showToast(`${product.name} تمت إضافته إلى السلة! 🛒`);
}

function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.classList.add('pulse');
        setTimeout(() => {
            cartCountElement.classList.remove('pulse');
        }, 400);
    }
}

// ==========================================
// Toast Notification
// ==========================================

function showToast(message) {
    if (toastMessage && toast) {
        toastMessage.textContent = message;
        toast.classList.add('toast-show');
        
        setTimeout(() => {
            toast.classList.remove('toast-show');
        }, 3000);
    }
}

// ==========================================
// Smooth Scrolling
// ==========================================

// ==========================================
// Instant Live Search Functionality
// ==========================================

function performInstantSearch(query) {
    if (!query || query.trim().length === 0) {
        // Empty search - show all products
        categoryBtns.forEach(b => b.classList.remove('active'));
        const allBtn = Array.from(categoryBtns).find(btn => btn.dataset.category === 'all');
        if (allBtn) allBtn.classList.add('active');
        renderProducts('all');
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    if (!productGrid || allProducts.length === 0) return;
    
    // Prioritize products that START with search term, then include products that contain it
    const exactStarts = allProducts.filter(p => 
        p.name.toLowerCase().startsWith(searchTerm)
    );
    
    const includes = allProducts.filter(p => 
        !p.name.toLowerCase().startsWith(searchTerm) && 
        p.name.toLowerCase().includes(searchTerm)
    );
    
    const categoryMatches = allProducts.filter(p =>
        !p.name.toLowerCase().includes(searchTerm) &&
        p.category && p.category.toLowerCase().includes(searchTerm)
    );
    
    const descriptionMatches = allProducts.filter(p =>
        !p.name.toLowerCase().includes(searchTerm) &&
        (!p.category || !p.category.toLowerCase().includes(searchTerm)) &&
        p.description && p.description.toLowerCase().includes(searchTerm)
    );
    
    // Combine results with priority: starts with > includes > category > description
    const filteredProducts = [...exactStarts, ...includes, ...categoryMatches, ...descriptionMatches];
    
    // Remove duplicates by ID
    const uniqueProducts = Array.from(new Map(filteredProducts.map(p => [p.id, p])).values());
    
    // Remove active state from category buttons during search
    categoryBtns.forEach(b => b.classList.remove('active'));
    
    if (uniqueProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400">لا توجد منتجات تطابق "${query}"</p>
            </div>
        `;
        return;
    }
    
    // Render filtered products immediately
    productGrid.innerHTML = uniqueProducts.map(product => createProductCard(product)).join('');
    
    // Attach event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            addToCart(productId);
        });
    });
}

// Initialize instant search with event listeners
function initializeInstantSearch() {
    // Desktop search input - instant on every keystroke
    const desktopSearchInput = document.querySelector('div.flex-1 input[placeholder="Search for products..."]');
    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('input', (e) => {
            performInstantSearch(e.target.value);
        });
    }
    
    // Mobile search input - instant on every keystroke
    const mobileSearchInput = document.querySelector('#mobile-search input[placeholder="Search for products..."]');
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            performInstantSearch(e.target.value);
        });
    }
}

// ==========================================
// Smooth Scrolling
// ==========================================

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            try {
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('open');
                    }
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.log('Invalid selector:', href);
            }
        }
    }
});
