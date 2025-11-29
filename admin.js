// Aznaf Market - Admin Panel JavaScript

// ==========================================
// Configuration
// ==========================================

const CURRENCY_SYMBOL = 'د.ج';

// ==========================================
// Firebase & imgbb Initialization
// ==========================================

let db = null;
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
let productNameInput;
let productCategoryInput;
let productPriceInput;
let productDescriptionInput;
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
let isEditing = false;

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initTheme();
    initFirebase();
    initEventListeners();
    loadProducts();
});

function cacheElements() {
    productForm = document.getElementById('product-form');
    productIdInput = document.getElementById('product-id');
    productNameInput = document.getElementById('product-name');
    productCategoryInput = document.getElementById('product-category');
    productPriceInput = document.getElementById('product-price');
    productDescriptionInput = document.getElementById('product-description') || { value: '' };
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
    
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
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
    
    const name = productNameInput.value.trim();
    const category = productCategoryInput.value;
    const price = parseFloat(productPriceInput.value);
    const description = productDescriptionInput.value.trim() || '';
    const badge = productBadgeInput.value || null;
    
    if (!name || !category || isNaN(price)) {
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
        name,
        category,
        price,
        description,
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
    if (!firebaseInitialized) {
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
    
    return `
        <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl transition-colors">
            <img 
                src="${product.image || 'https://via.placeholder.com/80x80?text=No+Image'}" 
                alt="${product.name}"
                class="w-16 h-16 object-cover rounded-lg"
                onerror="this.src='https://via.placeholder.com/80x80?text=Error'"
            >
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-semibold truncate">${product.name}</h3>
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
        productNameInput.value = product.name || '';
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
        
        productNameInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Edit product error:', error);
        showStatus('فشل تحميل بيانات المنتج', 'error');
    }
}

function openDeleteModal(productId) {
    productToDelete = productId;
    deleteModal.classList.remove('hidden');
    deleteModal.classList.add('flex');
}

function closeDeleteModal() {
    productToDelete = null;
    deleteModal.classList.add('hidden');
    deleteModal.classList.remove('flex');
}

async function confirmDelete() {
    if (!productToDelete) return;
    
    try {
        confirmDeleteBtn.disabled = true;
        confirmDeleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        await db.collection('products').doc(productToDelete).delete();
        
        showStatus('تم حذف المنتج بنجاح', 'success');
        closeDeleteModal();
        loadProducts();
        
    } catch (error) {
        console.error('Delete error:', error);
        showStatus('فشل حذف المنتج: ' + error.message, 'error');
    } finally {
        confirmDeleteBtn.disabled = false;
        confirmDeleteBtn.innerHTML = 'نعم، احذف';
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
