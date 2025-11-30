// Aznaf Market - Admin Orders Management

let allOrders = [];

async function loadOrders() {
    try {
        // Load from localStorage
        allOrders = JSON.parse(localStorage.getItem('aznaf_orders') || '[]');
        
        // Try to load from Firebase
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('orders').orderBy('timestamp', 'desc').get();
            allOrders = snapshot.docs.map(doc => doc.data());
            console.log('Orders loaded from Firebase:', allOrders.length);
        }
        
        // Auto-delete orders older than 1 day
        deleteOldOrders();
        
        renderOrders();
    } catch (error) {
        console.error('Error loading orders:', error);
        allOrders = JSON.parse(localStorage.getItem('aznaf_orders') || '[]');
        renderOrders();
    }
}

function deleteOldOrders() {
    // Keep all orders - do not delete automatically
    // Orders are kept indefinitely
}

function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    if (allOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-inbox text-4xl mb-3"></i>
                <p>لا توجد طلبات</p>
            </div>
        `;
        return;
    }
    
    const html = allOrders.map(order => `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <p class="font-bold text-lg">${order.id}</p>
                    <p class="text-xs text-gray-500">${new Date(order.timestamp).toLocaleString('ar-EG')}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                    order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }">
                    ${order.status === 'pending' ? 'قيد الانتظار' : order.status === 'completed' ? 'موافق عليه' : 'إلغاء'}
                </span>
            </div>
            
            <div class="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <p class="font-semibold">${order.customer.name}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">${order.customer.phone}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">${order.customer.address}</p>
            </div>
            
            <div class="mb-3 max-h-32 overflow-y-auto">
                ${order.items.map(item => `
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} د.ج
                    </p>
                `).join('')}
            </div>
            
            <div class="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <span class="font-semibold">المجموع:</span>
                <span class="font-bold text-lg text-primary-600 dark:text-primary-400">${order.total.toFixed(2)} د.ج</span>
            </div>
            
            <div class="flex gap-2">
                ${order.status === 'pending' ? `
                    <button class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors confirm-order" data-order-id="${order.id}">
                        <i class="fas fa-check me-1"></i>الموافقة
                    </button>
                ` : ''}
                <a href="status.html?id=${order.id}" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors text-center">
                    <i class="fas fa-eye me-1"></i>عرض الحالة
                </a>
                <button class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors delete-order" data-order-id="${order.id}">
                    <i class="fas fa-trash me-1"></i>حذف
                </button>
            </div>
        </div>
    `).join('');
    
    ordersList.innerHTML = html;
    
    // Add event listeners
    document.querySelectorAll('.confirm-order').forEach(btn => {
        btn.addEventListener('click', () => confirmOrder(btn.dataset.orderId));
    });
    
    document.querySelectorAll('.delete-order').forEach(btn => {
        btn.addEventListener('click', () => deleteOrder(btn.dataset.orderId));
    });
}

async function confirmOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    order.status = 'completed';
    order.confirmedAt = new Date().toISOString();
    
    // Save to Firebase
    try {
        if (typeof db !== 'undefined') {
            await db.collection('orders').doc(orderId).update({ status: 'completed', confirmedAt: order.confirmedAt });
        }
    } catch (error) {
        console.error('Error updating order:', error);
    }
    
    localStorage.setItem('aznaf_orders', JSON.stringify(allOrders));
    renderOrders();
}

async function deleteOrder(orderId) {
    allOrders = allOrders.filter(o => o.id !== orderId);
    
    try {
        if (typeof db !== 'undefined') {
            await db.collection('orders').doc(orderId).delete();
        }
    } catch (error) {
        console.error('Error deleting order:', error);
    }
    
    localStorage.setItem('aznaf_orders', JSON.stringify(allOrders));
    renderOrders();
}

async function deleteOrderFromDB(orderId) {
    try {
        if (typeof db !== 'undefined') {
            await db.collection('orders').doc(orderId).delete();
        }
    } catch (error) {
        console.error('Error auto-deleting old order:', error);
    }
}

// Load orders when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

// Refresh orders every 30 seconds
setInterval(loadOrders, 30000);
