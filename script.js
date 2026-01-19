// Men's Clothing Products - 24+ items across categories
const products = [
    // Suits (8 items)
    { id: 1, name: "Hugo Boss Classic Suit", price: 1299, icon: "👔", rating: 4.9, category: "suits", sizes: "38R-46L", color: "Navy" },
    { id: 2, name: "Armani Slim Fit Suit", price: 1499, icon: "👔", rating: 4.8, category: "suits", sizes: "36S-44R", color: "Charcoal" },
    { id: 3, name: "Gucci Tuxedo", price: 2999, icon: "🎩", rating: 5.0, category: "suits", sizes: "38R-48L", color: "Black" },
    { id: 4, name: "Zara Modern Suit", price: 399, icon: "👔", rating: 4.7, category: "suits", sizes: "36S-44L", color: "Gray" },
    { id: 5, name: "Ralph Lauren Plaid Suit", price: 899, icon: "👔", rating: 4.8, category: "suits", sizes: "38R-46R", color: "Plaid" },
    { id: 6, name: "Tom Ford Peak Lapel", price: 4999, icon: "👔", rating: 4.9, category: "suits", sizes: "40R-50L", color: "Midnight" },
    { id: 7, name: "H&M Wedding Suit", price: 199, icon: "👔", rating: 4.6, category: "suits", sizes: "36S-44R", color: "Ivory" },
    { id: 8, name: "Canali Cashmere Suit", price: 3499, icon: "👔", rating: 5.0, category: "suits", sizes: "38R-46L", color: "Blue" },

    // Shirts (8 items)
    { id: 9, name: "Brooks Brothers Dress Shirt", price: 129, icon: "👕", rating: 4.8, category: "shirts", sizes: "S-XXL", color: "White" },
    { id: 10, name: "Paul Fredrick Oxford", price: 89, icon: "👕", rating: 4.7, category: "shirts", sizes: "15-18", color: "Light Blue" },
    { id: 11, name: "Tommy Hilfiger Casual", price: 69, icon: "👕", rating: 4.6, category: "shirts", sizes: "S-XXL", color: "Navy" },
    { id: 12, name: "Banana Republic Linen", price: 99, icon: "👕", rating: 4.8, category: "shirts", sizes: "S-XXL", color: "White" },
    { id: 13, name: "Van Heusen Non-Iron", price: 59, icon: "👕", rating: 4.7, category: "shirts", sizes: "14.5-17", color: "Blue" },
    { id: 14, name: "Ralph Lauren Polo", price: 119, icon: "👕", rating: 4.9, category: "shirts", sizes: "S-XXL", color: "Pink" },
    { id: 15, name: "Uniqlo Airism Shirt", price: 39, icon: "👕", rating: 4.6, category: "shirts", sizes: "S-3XL", color: "Gray" },
    { id: 16, name: "Burberry Check Shirt", price: 499, icon: "👕", rating: 4.9, category: "shirts", sizes: "15-17", color: "Check" },

    // Jackets (4 items)
    { id: 17, name: "Patagonia Fleece", price: 149, icon: "🧥", rating: 4.8, category: "jackets", sizes: "S-XXL", color: "Black" },
    { id: 18, name: "Levi's Denim Jacket", price: 89, icon: "🧥", rating: 4.7, category: "jackets", sizes: "S-XXL", color: "Blue" },
    { id: 19, name: "Moncler Puffer", price: 1599, icon: "🧥", rating: 4.9, category: "jackets", sizes: "S-XXL", color: "Black" },
    { id: 20, name: "The North Face", price: 199, icon: "🧥", rating: 4.8, category: "jackets", sizes: "S-XXXL", color: "Green" },

    // Pants (4 items)
    { id: 21, name: "Bonobos Chinos", price: 129, icon: "👖", rating: 4.8, category: "pants", sizes: "28-40", color: "Khaki" },
    { id: 22, name: "Levi's 511 Slim", price: 79, icon: "👖", rating: 4.7, category: "pants", sizes: "28-38", color: "Dark Wash" },
    { id: 23, name: "J.Crew Ludlow", price: 149, icon: "👖", rating: 4.8, category: "pants", sizes: "28-36", color: "Navy" },
    { id: 24, name: "Uniqlo Slim Fit", price: 39, icon: "👖", rating: 4.6, category: "pants", sizes: "28-42", color: "Black" }
];

let cart = [];
let currentCategory = 'all';
let isCartOpen = false;

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartCount = document.getElementById('cartCount');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    setupEventListeners();
    setupCategoryFilters();
    smoothScrolling();
});

// Event Listeners
function setupEventListeners() {
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', checkout);
    cartModal.addEventListener('click', (e) => e.target === cartModal && toggleCart());
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isCartOpen) toggleCart();
    });
}

// Category filtering
function setupCategoryFilters() {
    document.querySelectorAll('.category-card, .footer-section a[data-category]').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterProducts(category);
            smoothScrollTo('#products');
        });
    });
}

function filterProducts(category) {
    currentCategory = category;
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}

// Render products
function renderProducts(productsToShow = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    
    // Animate new cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        });
    }, 100);
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    return `
        <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
            <div class="product-image">${product.icon}</div>
            ${product.new ? '<div class="product-badge">NEW</div>' : ''}
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-size">${product.sizes} | ${product.color}</div>
                <div class="product-rating">
                    <span class="star">${stars}</span>
                    <span class="rating-text">${product.rating}</span>
                </div>
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> Add to Bag
                </button>
            </div>
        </div>
    `;
}

// Cart functionality (same as music shop but branded)
document.addEventListener('click', function(e) {
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
        e.stopPropagation();
        const productId = parseInt(addBtn.dataset.productId);
        addToCart(productId);
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCount();
    showNotification(`${product.name} added to bag! 👔`, 'success');
    playAddSound();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? 'flex' : 'none';
}

function toggleCart() {
    isCartOpen = !isCartOpen;
    cartModal.classList.toggle('active');
    if (isCartOpen) {
        renderCart();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <h3>Your bag is empty</h3>
                <p>Browse our collection of premium menswear</p>
            </div>
        `;
        document.getElementById('cartTotal').textContent = '$0.00';
        return;
    }

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <div style="font-size: 3rem;">${item.icon}</div>
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString()} × ${item.quantity}</p>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button onclick="updateCartQuantity(${item.id}, -1)">−</button>
                <span style="font-weight: bold; width: 30px;">${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px;">
                    Remove
                </button>
            </div>
        </div>
    `).join('');

    document.getElementById('cartTotal').textContent = `Total: $${total.toLocaleString()}.00`;
}

function updateCartQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(id);
        else {
            renderCart();
            updateCartCount();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) return showNotification('Your bag is empty!', 'warning');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join('\n');
    
    if (confirm(`Order Summary:\n\n${itemsList}\n\nTotal: $${total.toLocaleString()}.00\n\nProceed to checkout?`)) {
        showNotification('Order placed successfully! Your style is on the way 👔✨', 'success');
        cart = [];
        toggleCart();
        updateCartCount();
    }
}

function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 140px; right: 25px; background: ${type === 'success' ? '#27ae60' : '#f39c12'};
        color: white; padding: 1.5rem 2.5rem; border-radius: 16px; z-index: 3000;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3); font-weight: 600; animation: slideIn 0.5s ease;
        max-width: 400px;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 4000);
}

function playAddSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 523;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    } catch(e) {}
}

function smoothScrollTo(selector) {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            smoothScrollTo(a.getAttribute('href'));
        });
    });
}
