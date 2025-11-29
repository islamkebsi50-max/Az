// Aznaf Market - Admin Panel JavaScript
// Note: CURRENCY_SYMBOL is defined in script.js

// ==========================================
// Firebase & imgbb Initialization
// ==========================================

// db is declared in script.js and shared globally
let firebaseInitialized = false;

function initFirebase() {
    try {
        if (typeof firebaseConfig !== 'undefined' && isFirebaseConfigured()) {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            firebaseInitialized = true;
            console.log('Firebase initialized successfully');
            return true;
        } else {
            console.log('Firebase not configured');
            showConfigWarning();
            return false;
        }
    } catch (error) {
        if (error.code === 'app/duplicate-app') {
            db = firebase.firestore();
            firebaseInitialized = true;
            return true;
        }
        console.error('Firebase initialization error:', error);
        showConfigWarning();
        return false;
    }
}

function showConfigWarning() {
    document.getElementById('config-warning').classList.remove('hidden');
}

// ==========================================
// imgbb API Integration
// ==========================================

async function uploadToImgbb(file) {
    if (typeof imgbbApiKey === 'undefined' || !imgbbApiKey || imgbbApiKey === 'YOUR_IMGBB_API_KEY') {
        throw new Error('imgbb API key not configured');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to upload image to imgbb');
    }

    const data = await response.json();
    
    if (data.success) {
        return data.data.url;
    } else {
        throw new Error(data.error?.message || 'Image upload failed');
    }
}

// ==========================================
// DOM Elements
// ==========================================

let productForm;
let productIdInput;
let nameArInput;
let nameEnInput;
let descArInput;
let descEnInput;
let productCategoryInput;
let productPriceInput;
let productBadgeInput;
let productImageInput;
let productImageUrlInput;
let uploadArea;
let uploadPlaceholder;
let imagePreviewContainer;
let imagePreview;
let imageName;
let removeImageBtn;
let uploadProgress;
let progressBar;
let progressPercent;
let submitBtn;
let submitText;
let cancelEditBtn;
let productsList;
let productsCount;
let refreshBtn;
let deleteModal;
let confirmDeleteBtn;
let cancelDeleteBtn;
let themeToggle;
let statusContainer;

let selectedFile = null;
let productToDelete = null;
let categoryToDelete = null;
let shouldDeleteAll = false;
let isEditing = false;

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initLanguage();
    initTheme();
    
    // Wait for Firebase to be initialized from script.js
    if (!db || typeof db === 'undefined') {
        setTimeout(() => {
            if (!firebaseInitialized) {
                initFirebase();
            }
            initEventListeners();
            setupLanguageToggle();
            loadProducts();
        }, 500);
    } else {
        firebaseInitialized = true;
        initEventListeners();
        setupLanguageToggle();
        loadProducts();
    }
});

function cacheElements() {
    productForm = document.getElementById('product-form');
    productIdInput = document.getElementById('product-id');
    nameArInput = document.getElementById('name_ar');
    nameEnInput = document.getElementById('name_en');
    descArInput = document.getElementById('desc_ar') || { value: '' };
    descEnInput = document.getElementById('desc_en') || { value: '' };
    productCategoryInput = document.getElementById('product-category');
    productPriceInput = document.getElementById('product-price');
    productBadgeInput = document.getElementById('product-badge');
    productImageInput = document.getElementById('product-image');
    productImageUrlInput = document.getElementById('product-image-url');
    uploadArea = document.getElementById('upload-area');
    uploadPlaceholder = document.getElementById('upload-placeholder');
    imagePreviewContainer = document.getElementById('image-preview-container');
    imagePreview = document.getElementById('image-preview');
    imageName = document.getElementById('image-name');
    removeImageBtn = document.getElementById('remove-image');
    uploadProgress = document.getElementById('upload-progress');
    progressBar = document.getElementById('progress-bar');
    progressPercent = document.getElementById('progress-percent');
    submitBtn = document.getElementById('submit-btn');
    submitText = document.getElementById('submit-text');
    cancelEditBtn = document.getElementById('cancel-edit-btn');
    productsList = document.getElementById('products-list');
    productsCount = document.getElementById('products-count');
    refreshBtn = document.getElementById('refresh-btn');
    deleteModal = document.getElementById('delete-modal');
    confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    themeToggle = document.getElementById('theme-toggle');
    statusContainer = document.getElementById('status-container');
}

// ==========================================
// Theme Management
// ==========================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
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
    themeToggle.addEventListener('click', toggleTheme);
    
    uploadArea.addEventListener('click', () => productImageInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    productImageInput.addEventListener('change', handleFileSelect);
    removeImageBtn.addEventListener('click', removeSelectedImage);
    
    productForm.addEventListener('submit', handleFormSubmit);
    cancelEditBtn.addEventListener('click', resetForm);
    
    refreshBtn.addEventListener('click', loadProducts);
    
    const demoBtnEl = document.getElementById('demo-data-btn');
    if (demoBtnEl) {
        demoBtnEl.addEventListener('click', generateDemoData);
    }
    
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
    
    // Inventory Management
    const filterCategory = document.getElementById('inventory-filter-category');
    const deleteCategoryBtn = document.getElementById('delete-category-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    if (filterCategory) {
        filterCategory.addEventListener('change', (e) => renderAdminProducts(e.target.value));
        // Initial render after a small delay to allow Firebase to initialize
        setTimeout(() => renderAdminProducts('all'), 800);
    }
    if (deleteCategoryBtn) {
        deleteCategoryBtn.addEventListener('click', openDeleteCategoryModal);
    }
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', openDeleteAllModal);
    }
}

// ==========================================
// File Upload Handling
// ==========================================

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showStatus('يرجى اختيار ملف صورة صالح', 'error');
        return;
    }
    
    if (file.size > 32 * 1024 * 1024) {
        showStatus('حجم الملف كبير جدًا (الحد الأقصى 32MB)', 'error');
        return;
    }
    
    selectedFile = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imageName.textContent = file.name;
        uploadPlaceholder.classList.add('hidden');
        imagePreviewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function removeSelectedImage(e) {
    e.stopPropagation();
    selectedFile = null;
    productImageInput.value = '';
    productImageUrlInput.value = '';
    imagePreview.src = '';
    imageName.textContent = '';
    uploadPlaceholder.classList.remove('hidden');
    imagePreviewContainer.classList.add('hidden');
}

// ==========================================
// Form Handling
// ==========================================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!firebaseInitialized) {
        showStatus('Firebase غير مكوّن. يرجى تحديث الإعدادات.', 'error');
        return;
    }
    
    const nameAr = nameArInput.value.trim();
    const nameEn = nameEnInput.value.trim();
    const descAr = descArInput.value.trim() || '';
    const descEn = descEnInput.value.trim() || '';
    const category = productCategoryInput.value;
    const price = parseFloat(productPriceInput.value);
    const badge = productBadgeInput.value || null;
    
    if (!nameAr || !nameEn || !category || isNaN(price)) {
        showStatus('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    let imageUrl = productImageUrlInput.value;
    
    if (selectedFile) {
        try {
            submitBtn.disabled = true;
            uploadProgress.classList.remove('hidden');
            updateProgress(10);
            
            imageUrl = await uploadToImgbb(selectedFile);
            updateProgress(100);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            uploadProgress.classList.add('hidden');
        } catch (error) {
            console.error('Image upload error:', error);
            showStatus('فشل رفع الصورة: ' + error.message, 'error');
            submitBtn.disabled = false;
            uploadProgress.classList.add('hidden');
            return;
        }
    }
    
    if (!imageUrl && !isEditing) {
        showStatus('يرجى اختيار صورة للمنتج', 'error');
        return;
    }
    
    const productData = {
        name_ar: nameAr,
        name_en: nameEn,
        name: nameAr,
        desc_ar: descAr,
        desc_en: descEn,
        category,
        price,
        badge,
        image: imageUrl,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        submitBtn.disabled = true;
        
        if (isEditing && productIdInput.value) {
            await db.collection('products').doc(productIdInput.value).update(productData);
            showStatus('تم تحديث المنتج بنجاح', 'success');
        } else {
            productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('products').add(productData);
            showStatus('تمت إضافة المنتج بنجاح', 'success');
        }
        
        resetForm();
        loadProducts();
    } catch (error) {
        console.error('Save error:', error);
        showStatus('فشل حفظ المنتج: ' + error.message, 'error');
    } finally {
        submitBtn.disabled = false;
    }
}

function updateProgress(percent) {
    progressBar.style.width = percent + '%';
    progressPercent.textContent = percent + '%';
}

function resetForm() {
    productForm.reset();
    productIdInput.value = '';
    productImageUrlInput.value = '';
    selectedFile = null;
    isEditing = false;
    
    uploadPlaceholder.classList.remove('hidden');
    imagePreviewContainer.classList.add('hidden');
    cancelEditBtn.classList.add('hidden');
    submitText.textContent = 'إضافة المنتج';
    submitBtn.querySelector('i').className = 'fas fa-plus ml-2';
}

// ==========================================
// Products Management
// ==========================================

async function loadProducts() {
    if (typeof db === 'undefined' || !db) {
        productsList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-circle text-3xl mb-3 text-yellow-500"></i>
                <p>Firebase غير مكوّن</p>
                <p class="text-sm">يرجى تحديث ملف firebase-config.js</p>
            </div>
        `;
        return;
    }
    
    productsList.innerHTML = `
        <div class="text-center py-8 text-gray-500">
            <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
            <p>جاري تحميل المنتجات...</p>
        </div>
    `;
    
    try {
        const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
        
        if (snapshot.empty) {
            productsList.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-box-open text-3xl mb-3"></i>
                    <p>لا توجد منتجات بعد</p>
                    <p class="text-sm">أضف منتجك الأول من النموذج</p>
                </div>
            `;
            productsCount.textContent = '0';
            return;
        }
        
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        productsCount.textContent = products.length;
        productsList.innerHTML = products.map(product => createProductItem(product)).join('');
        
        document.querySelectorAll('.edit-product-btn').forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.dataset.id));
        });
        
        document.querySelectorAll('.delete-product-btn').forEach(btn => {
            btn.addEventListener('click', () => openDeleteModal(btn.dataset.id));
        });
        
    } catch (error) {
        console.error('Load products error:', error);
        productsList.innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-circle text-3xl mb-3"></i>
                <p>فشل تحميل المنتجات</p>
                <p class="text-sm">${error.message}</p>
            </div>
        `;
    }
}

function createProductItem(product) {
    const categoryLabels = {
        'nuts': 'المكسرات',
        'spices': 'البهارات',
        'food': 'منتجات غذائية',
        'cosmetics': 'مستحضرات التجميل',
        'diapers': 'حفاضات الأطفال',
        'drinks': 'المشروبات'
    };
    
    const badgeColors = {
        'Sale': 'bg-red-500',
        'Premium': 'bg-purple-500',
        'Organic': 'bg-green-500',
        'Bestseller': 'bg-blue-500',
        'Value Pack': 'bg-orange-500',
        'New': 'bg-teal-500'
    };
    
    // Get bilingual product name (showing Arabic version in admin)
    const displayName = product.name_ar || product.name || '';
    
    return `
        <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl transition-colors">
            <img 
                src="${product.image || 'https://via.placeholder.com/80x80?text=No+Image'}" 
                alt="${displayName}"
                class="w-16 h-16 object-cover rounded-lg"
                onerror="this.src='https://via.placeholder.com/80x80?text=Error'"
            >
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-semibold truncate">${displayName}</h3>
                    ${product.badge ? `<span class="${badgeColors[product.badge] || 'bg-gray-500'} text-white text-xs px-2 py-0.5 rounded-full">${product.badge}</span>` : ''}
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">${categoryLabels[product.category] || product.category}</p>
                <p class="text-primary-500 font-bold">${product.price?.toFixed(2) || '0.00'} ${CURRENCY_SYMBOL}</p>
            </div>
            <div class="flex gap-2">
                <button 
                    class="edit-product-btn p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    data-id="${product.id}"
                    title="تعديل"
                >
                    <i class="fas fa-edit"></i>
                </button>
                <button 
                    class="delete-product-btn p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    data-id="${product.id}"
                    title="حذف"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

async function editProduct(productId) {
    try {
        const doc = await db.collection('products').doc(productId).get();
        
        if (!doc.exists) {
            showStatus('المنتج غير موجود', 'error');
            return;
        }
        
        const product = doc.data();
        
        productIdInput.value = productId;
        nameArInput.value = product.name_ar || product.name || '';
        nameEnInput.value = product.name_en || '';
        descArInput.value = product.desc_ar || '';
        descEnInput.value = product.desc_en || '';
        productCategoryInput.value = product.category || '';
        productPriceInput.value = product.price || '';
        productBadgeInput.value = product.badge || '';
        productImageUrlInput.value = product.image || '';
        
        if (product.image) {
            imagePreview.src = product.image;
            imageName.textContent = 'الصورة الحالية';
            uploadPlaceholder.classList.add('hidden');
            imagePreviewContainer.classList.remove('hidden');
        }
        
        isEditing = true;
        submitText.textContent = 'تحديث المنتج';
        submitBtn.querySelector('i').className = 'fas fa-save ml-2';
        cancelEditBtn.classList.remove('hidden');
        
        nameArInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Edit product error:', error);
        showStatus('فشل تحميل بيانات المنتج', 'error');
    }
}

function openDeleteModal(productId) {
    productToDelete = productId;
    deleteModal.classList.remove('hidden');
    
    // Trigger animation
    setTimeout(() => {
        const modalContent = document.getElementById('modal-content');
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
}

function closeDeleteModal() {
    productToDelete = null;
    categoryToDelete = null;
    shouldDeleteAll = false;
    
    // Reset modal text to default
    const modalTitle = document.querySelector('#modal-content h3');
    const modalMsg = document.querySelector('#modal-content p');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    
    modalTitle.textContent = 'تأكيد الحذف';
    modalMsg.textContent = 'هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.';
    confirmBtn.textContent = 'نعم، احذف';
    
    const modalContent = document.getElementById('modal-content');
    
    if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
    }
    
    setTimeout(() => {
        deleteModal.classList.add('hidden');
    }, 300);
}

async function confirmDelete() {
    // Check if deleting a product
    if (productToDelete) {
        try {
            confirmDeleteBtn.disabled = true;
            confirmDeleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            await db.collection('products').doc(productToDelete).delete();
            
            showStatus('تم حذف المنتج بنجاح', 'success');
            closeDeleteModal();
            loadProducts();
            
            // Refresh inventory if visible
            const filterCategory = document.getElementById('inventory-filter-category');
            if (filterCategory) {
                renderAdminProducts(filterCategory.value);
            }
            
            // Reload products globally on all pages
            if (window.reloadProductsGlobally) {
                await window.reloadProductsGlobally();
            }
            
        } catch (error) {
            console.error('Delete error:', error);
            showStatus('فشل حذف المنتج: ' + error.message, 'error');
        } finally {
            confirmDeleteBtn.disabled = false;
            confirmDeleteBtn.innerHTML = 'نعم، احذف';
        }
    }
    // Check if deleting a category
    else if (categoryToDelete) {
        await deleteAllInCategory();
    }
    // Check if deleting all products
    else if (shouldDeleteAll) {
        await deleteAllProductsFunc();
    }
}

// ==========================================
// Generate Demo Data
// ==========================================

async function generateDemoData() {
    const demoProducts = [
        // Food Products (8 items)
        { name_ar: "سميد سفينة", name_en: "Safina Semoule", category: "food", price: 110, image: "https://placehold.co/400" },
        { name_ar: "إندومي دجاج كاري", name_en: "Indomie Chicken Curry", category: "food", price: 65, image: "https://placehold.co/400" },
        { name_ar: "لافاش الضاحكة - 32 حصة", name_en: "La Vache Qui Rit - 32 portions", category: "food", price: 980, image: "https://placehold.co/400" },
        { name_ar: "عدس SOS 1 كيلو", name_en: "SOS Lentils 1kg", category: "food", price: 320, image: "https://placehold.co/400" },
        { name_ar: "زيت التونة إيزابيل", name_en: "Isabel Tuna Oil", category: "food", price: 350, image: "https://placehold.co/400" },
        { name_ar: "مايونيز هاينز", name_en: "Heinz Mayonnaise", category: "food", price: 550, image: "https://placehold.co/400" },
        { name_ar: "فاصوليا بيضاء ثيكا", name_en: "Thika White Beans", category: "food", price: 290, image: "https://placehold.co/400" },
        { name_ar: "كسكس عمور بن عمور", name_en: "Amor Benamor Couscous", category: "food", price: 170, image: "https://placehold.co/400" },
        
        // Other Categories (1 item each)
        { name_ar: "لوز فاخر", name_en: "Premium Almonds", category: "nuts", price: 450, image: "https://placehold.co/400" },
        { name_ar: "زعفران أصيل", name_en: "Pure Saffron", category: "spices", price: 950, image: "https://placehold.co/400" },
        { name_ar: "قهوة عربية أصيلة", name_en: "Arabic Coffee", category: "drinks", price: 420, image: "https://placehold.co/400" },
        { name_ar: "كريم العناية الطبيعي", name_en: "Natural Care Cream", category: "cosmetics", price: 280, image: "https://placehold.co/400" },
        { name_ar: "حفاضات ناعمة", name_en: "Soft Baby Diapers", category: "baby", price: 320, image: "https://placehold.co/400" }
    ];

    if (typeof db === 'undefined' || !db) {
        showStatus("Firebase غير متصل!", "error");
        return;
    }

    let count = 0;
    demoProducts.forEach((product) => {
        db.collection("products").add({...product, createdAt: new Date()}).then(() => {
            count++;
            if (count === demoProducts.length) {
                showStatus(`✓ تم إضافة ${demoProducts.length} منتج (8 جزائري + 5 فئات)!`, "success");
                loadProducts();
            }
        }).catch(error => {
            showStatus("خطأ: " + error.message, "error");
        });
    });
}

// ==========================================
// Inventory Management (Filter & Delete)
// ==========================================

async function renderAdminProducts(filterCategory = 'all') {
    const inventoryProducts = document.getElementById('inventory-products');
    const deleteCategoryBtn = document.getElementById('delete-category-btn');
    
    if (typeof db === 'undefined' || !db) {
        inventoryProducts.innerHTML = '<div class="col-span-full text-center py-8 text-red-500"><i class="fas fa-exclamation-circle text-3xl mb-3"></i><p>Firebase غير متصل</p></div>';
        return;
    }

    inventoryProducts.innerHTML = '<div class="col-span-full text-center py-8"><i class="fas fa-spinner fa-spin text-3xl mb-3"></i><p>جاري التحميل...</p></div>';
    
    try {
        // Get all products (no ordering to avoid Firebase index requirement)
        const snapshot = await db.collection('products').get();
        
        if (snapshot.empty) {
            inventoryProducts.innerHTML = '<div class="col-span-full text-center py-8 text-gray-500"><i class="fas fa-box-open text-3xl mb-3"></i><p>لا توجد منتجات</p></div>';
            deleteCategoryBtn.classList.add('hidden');
            return;
        }

        // Sort and filter in JavaScript
        let products = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        products.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        if (filterCategory !== 'all') {
            products = products.filter(p => p.category === filterCategory);
        }
        
        if (products.length === 0) {
            inventoryProducts.innerHTML = '<div class="col-span-full text-center py-8 text-gray-500"><i class="fas fa-box-open text-3xl mb-3"></i><p>لا توجد منتجات</p></div>';
            deleteCategoryBtn.classList.add('hidden');
            return;
        }
        
        deleteCategoryBtn.classList.toggle('hidden', filterCategory === 'all');

        inventoryProducts.innerHTML = products.map(product => {
            const displayName = product.name_ar || product.name || '';
            return `
                <div class="bg-gray-50 dark:bg-dark-bg p-3 rounded-lg border border-gray-200 dark:border-dark-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <img src="${product.image || 'https://via.placeholder.com/80x80?text=No+Image'}" alt="${displayName}" class="w-20 h-20 object-cover rounded mb-2">
                    <h3 class="font-semibold text-sm truncate max-w-full">${displayName}</h3>
                    <p class="text-primary-500 font-bold text-sm">${product.price?.toFixed(2) || '0.00'} ${CURRENCY_SYMBOL}</p>
                    <button class="delete-inventory-product-btn mt-2 px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.delete-inventory-product-btn').forEach(btn => {
            btn.addEventListener('click', () => openDeleteModal(btn.dataset.id));
        });
    } catch (error) {
        console.error('Render error:', error);
        inventoryProducts.innerHTML = '<div class="col-span-full text-center py-8 text-red-500"><i class="fas fa-exclamation-circle text-3xl mb-3"></i><p>خطأ: ' + error.message + '</p></div>';
    }
}


function openDeleteCategoryModal() {
    const filterCategory = document.getElementById('inventory-filter-category').value;
    if (filterCategory === 'all') return;
    
    categoryToDelete = filterCategory;
    productToDelete = null;
    shouldDeleteAll = false;
    
    // Update modal text for category deletion
    const modalTitle = document.querySelector('#modal-content h3');
    const modalMsg = document.querySelector('#modal-content p');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    
    modalTitle.textContent = 'حذف الفئة';
    modalMsg.textContent = 'هل أنت متأكد من حذف جميع المنتجات في هذه الفئة؟ لا يمكن التراجع عن هذا الإجراء.';
    confirmBtn.textContent = 'نعم، احذف الفئة';
    
    deleteModal.classList.remove('hidden');
    setTimeout(() => {
        const modalContent = document.getElementById('modal-content');
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
}

function openDeleteAllModal() {
    shouldDeleteAll = true;
    productToDelete = null;
    categoryToDelete = null;
    
    // Update modal text for deleting all products
    const modalTitle = document.querySelector('#modal-content h3');
    const modalMsg = document.querySelector('#modal-content p');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    
    modalTitle.textContent = 'حذف الكل';
    modalMsg.textContent = 'هل أنت متأكد من حذف جميع المنتجات من جميع الفئات؟ لا يمكن التراجع عن هذا الإجراء.';
    confirmBtn.textContent = 'نعم، احذف الكل';
    
    deleteModal.classList.remove('hidden');
    setTimeout(() => {
        const modalContent = document.getElementById('modal-content');
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
}

async function deleteAllInCategory() {
    if (!categoryToDelete) return;
    
    try {
        confirmDeleteBtn.disabled = true;
        confirmDeleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        const snapshot = await db.collection('products').where('category', '==', categoryToDelete).get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        
        showStatus('تم حذف الفئة بنجاح', 'success');
        closeDeleteModal();
        document.getElementById('inventory-filter-category').value = 'all';
        renderAdminProducts('all');
        loadProducts();
        
        // Reload products globally on all pages
        if (window.reloadProductsGlobally) {
            await window.reloadProductsGlobally();
        }
    } catch (error) {
        showStatus('خطأ: ' + error.message, 'error');
    } finally {
        confirmDeleteBtn.disabled = false;
        confirmDeleteBtn.innerHTML = 'نعم، احذف الفئة';
    }
}

async function deleteAllProductsFunc() {
    try {
        confirmDeleteBtn.disabled = true;
        confirmDeleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        const snapshot = await db.collection('products').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        
        showStatus('تم حذف جميع المنتجات بنجاح', 'success');
        closeDeleteModal();
        document.getElementById('inventory-filter-category').value = 'all';
        renderAdminProducts('all');
        loadProducts();
        
        // Reload products globally on all pages
        if (window.reloadProductsGlobally) {
            await window.reloadProductsGlobally();
        }
    } catch (error) {
        showStatus('خطأ: ' + error.message, 'error');
    } finally {
        confirmDeleteBtn.disabled = false;
        confirmDeleteBtn.innerHTML = 'نعم، احذف الكل';
    }
}

// ==========================================
// Status Messages
// ==========================================

function showStatus(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-circle'
    };
    
    const statusEl = document.createElement('div');
    statusEl.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up`;
    statusEl.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    statusContainer.appendChild(statusEl);
    
    setTimeout(() => {
        statusEl.style.opacity = '0';
        statusEl.style.transform = 'translateY(-20px)';
        setTimeout(() => statusEl.remove(), 300);
    }, 4000);
}

// ==========================================
// Tab Navigation
// ==========================================

function initTabNavigation() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Hide all tabs and remove active state
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Show selected tab and set active state
            document.getElementById(tabName + '-tab').classList.add('active');
            btn.classList.add('active');
            
            // Reload products if inventory tab is opened
            if (tabName === 'inventory') {
                setTimeout(() => renderAdminProducts('all'), 300);
            }
        });
    });
}

// Call tab navigation init after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabNavigation);
} else {
    initTabNavigation();
}
