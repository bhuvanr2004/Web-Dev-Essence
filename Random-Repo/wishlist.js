// DOM Elements
const wishlistItemsContainer = document.getElementById('wishlist-items');
const wishlistEmptyContainer = document.getElementById('wishlist-empty');
const continueShoppingWishlistBtn = document.getElementById('continue-shopping-wishlist');

// Load wishlist items from local storage
function loadWishlistItems() {
    if (!wishlistItemsContainer) return;
    
    const wishlist = getWishlist();
    
    if (wishlist.length === 0) {
        if (wishlistEmptyContainer) {
            wishlistEmptyContainer.style.display = 'flex';
        }
        return;
    }
    
    // Hide empty message
    if (wishlistEmptyContainer) {
        wishlistEmptyContainer.style.display = 'none';
    }
    
    // Generate wishlist items HTML
    wishlistItemsContainer.innerHTML = '';
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
            <h3 class="wishlist-item-title">${item.name}</h3>
            <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
            <p class="wishlist-item-description">${item.description}</p>
            <div class="wishlist-item-actions">
                <button class="add-to-cart-from-wishlist" data-id="${item.id}">Add to Cart</button>
                <button class="remove-from-wishlist" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        wishlistItemsContainer.appendChild(wishlistItem);
    });
    
    // Add event listeners
    document.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            moveToCart(id);
        });
    });
    
    document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeWishlistItem(id);
        });
    });
}

// Move item from wishlist to cart
function moveToCart(id) {
    // Add to cart
    addToCart(id);
    
    // Remove from wishlist (optional - can keep in both)
    removeWishlistItem(id);
    
    showNotification('Item moved to cart!', 'success');
}

// Remove item from wishlist
function removeWishlistItem(id) {
    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    
    saveWishlist(updatedWishlist);
    loadWishlistItems();
    showNotification('Item removed from wishlist');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load wishlist items
    loadWishlistItems();
    
    // Continue shopping button
    if (continueShoppingWishlistBtn) {
        continueShoppingWishlistBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});