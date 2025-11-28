// Aznaf Market - Main JavaScript

// Product Data
const products = [
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

// Cart State
let cart = [];
let cartCount = 0;

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCountElement = document.getElementById('cart-count');
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileSearchBtn = document.getElementById('mobile-search-btn');
const mobileSearch = document.getElementById('mobile-search');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const categoryBtns = document.querySelectorAll('.category-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProducts('all');
    initEventListeners();
});

// Theme Management
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

// Event Listeners
function initEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('open');
    });
    
    // Mobile Search Toggle
    mobileSearchBtn.addEventListener('click', () => {
        mobileSearch.classList.toggle('hidden');
    });
    
    // Category Buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            renderProducts(category);
        });
    });
    
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

// Render Products
function renderProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.productId);
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
    
    return `
        <div class="product-card bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-md">
            <div class="product-image relative aspect-square overflow-hidden">
                ${product.badge ? `
                    <span class="absolute top-3 left-3 ${badgeColors[product.badge] || 'bg-gray-500'} text-white text-xs font-semibold px-3 py-1 rounded-full z-10 sale-badge">
                        ${product.badge}
                    </span>
                ` : ''}
                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x400?text=Product'"
                >
            </div>
            <div class="p-4">
                <span class="text-xs text-primary-500 dark:text-primary-400 font-medium uppercase tracking-wide">
                    ${categoryLabels[product.category]}
                </span>
                <h3 class="font-semibold text-gray-900 dark:text-white mt-1 mb-2 truncate">
                    ${product.name}
                </h3>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-gray-900 dark:text-white price-tag">
                        $${product.price.toFixed(2)}
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

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    cartCount += 1;
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    cartCountElement.textContent = cartCount;
    cartCountElement.classList.add('pulse');
    setTimeout(() => {
        cartCountElement.classList.remove('pulse');
    }, 400);
}

// Show Toast Notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('toast-show');
    
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
