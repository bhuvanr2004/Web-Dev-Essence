// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const nav1st = document.getElementById('nav-1st');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.querySelector('.search-bar');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const shoeSlider = document.getElementById('shoe-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shopNowBtn = document.getElementById('shop-now-btn');

// Local Storage Functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// Update UI counters
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function updateWishlistCount() {
    const wishlist = getWishlist();
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Load products into the slider
function loadProducts() {
    if (!shoeSlider) return;
    
    shoeSlider.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'shoe-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="card-actions">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="add-to-wishlist" data-id="${product.id}"><i class="ri-heart-line"></i></button>
            </div>
        `;
        shoeSlider.appendChild(card);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToWishlist(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showNotification('Added to cart successfully!', 'success');
}

// Add product to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const wishlist = getWishlist();
    const existingItem = wishlist.find(item => item.id === productId);
    
    if (!existingItem) {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description
        });
        
        saveWishlist(wishlist);
        showNotification('Added to wishlist!', 'success');
    } else {
        showNotification('Item already in wishlist!', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'ri-check-line' : 'ri-error-warning-line';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);
}

// Slider navigation
function scrollSlider(direction) {
    if (!shoeSlider) return;
    
    const cardWidth = shoeSlider.querySelector('.shoe-card').offsetWidth + 30; // card width + gap
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    shoeSlider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counts
    updateCartCount();
    updateWishlistCount();
    
    // Load products
    loadProducts();
    
    // Menu toggle for mobile
    if (menuToggle && nav1st) {
        menuToggle.addEventListener('click', function() {
            nav1st.classList.toggle('active');
        });
    }
    
    // Search icon click
    if (searchIcon && searchBar) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }
    
    // Slider navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            scrollSlider('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            scrollSlider('next');
        });
    }
    
    // Shop now button
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            window.location.href = '#shoe-slider';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav1st && nav1st.classList.contains('active') && !e.target.closest('#nav-1st') && !e.target.closest('.menu-toggle')) {
            nav1st.classList.remove('active');
        }
    });
    
    // Handle responsiveness with window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav1st) {
            nav1st.classList.remove('active');
        }
    });
});