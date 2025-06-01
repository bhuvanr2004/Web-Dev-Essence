// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const continueShoppingBtn = document.getElementById('continue-shopping');

// Load cart items from local storage
function loadCartItems() {
    if (!cartItemsContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty" id="cart-empty">
                <i class="ri-shopping-bag-line"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
            </div>
        `;
        
        // Hide summary if cart is empty
        const summaryElement = document.querySelector('.cart-summary');
        if (summaryElement) {
            summaryElement.style.display = 'none';
        }
        
        return;
    }
    
    // Show summary if cart has items
    const summaryElement = document.querySelector('.cart-summary');
    if (summaryElement) {
        summaryElement.style.display = 'block';
    }
    
    // Generate cart items HTML
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <p class="cart-item-description">${item.description}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
            <div class="cart-item-total">$${itemTotal}</div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            increaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeCartItem(id);
        });
    });
    
    // Update summary
    updateCartSummary();
}

// Update quantity in cart
function updateQuantity(id, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    saveCart(cart);
    loadCartItems();
}

// Increase quantity
function increaseQuantity(id) {
    updateQuantity(id, 1);
}

// Decrease quantity
function decreaseQuantity(id) {
    updateQuantity(id, -1);
}

// Remove item from cart
function removeCartItem(id) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    
    saveCart(updatedCart);
    loadCartItems();
    showNotification('Item removed from cart');
}

// Update cart summary
function updateCartSummary() {
    if (!subtotalElement || !shippingElement || !totalElement) return;
    
    const cart = getCart();
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate shipping
    const shipping = subtotal > 0 ? 10 : 0; // Free shipping over a certain amount could be implemented here
    
    // Calculate total
    const total = subtotal + shipping;
    
    // Update UI
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free';
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    loadCartItems();
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // In a real app, this would navigate to checkout page
            showNotification('Proceeding to checkout...');
        });
    }
    
    // Continue shopping button
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});