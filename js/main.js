// LocalStorage helpers
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElem = document.getElementById('cart-count');
    if(countElem) countElem.textContent = count;
}

// Backend API හරහා Product Data ලබා ගැනීම
async function fetchProducts() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    try {
        const catParam = typeof currentCategory !== 'undefined' ? currentCategory : 'All';
        const response = await fetch(`../backend/api/products.php?category=${catParam}`);
        const result = await response.json();

        grid.innerHTML = '';
        if(!result.success || result.data.length === 0) {
            grid.innerHTML = '<p class="col-span-full text-center text-gray-500">No products available in this category.</p>';
            return;
        }

        result.data.forEach(product => {
            grid.innerHTML += `
                <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col justify-between">
                    <img src="assets/products/${product.image}" alt="${product.name}" class="w-full h-64 object-cover" onerror="this.src='assets/images/logo.jpg'">
                    <div class="p-4 flex flex-col flex-grow justify-between">
                        <div>
                            <h3 class="font-semibold text-lg text-gray-800">${product.name}</h3>
                            <p class="text-sm text-gray-500">Size: ${product.sizes}</p>
                            <p class="text-lg font-bold text-gray-900 mt-2">$${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                        <button onclick='addToCart(${JSON.stringify(product)})' class="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition text-sm font-medium">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    } catch(err) {
        grid.innerHTML = '<p class="col-span-full text-center text-red-500">Failed to load products.</p>';
    }
}

function addToCart(product) {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if(existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1, price: parseFloat(product.price) });
    }

    saveCart(cart);
    alert(`${product.name} added to cart!`);
}

// Render Cart Page
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if(!container) return;

    const cart = getCart();
    if(cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
        document.getElementById('cart-subtotal').textContent = '$0.00';
        document.getElementById('cart-total').textContent = '$0.00';
        return;
    }

    let subtotal = 0;
    container.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        container.innerHTML += `
            <div class="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div class="flex items-center space-x-4">
                    <img src="assets/products/${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded" onerror="this.src='assets/images/logo.jpg'">
                    <div>
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-500">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="changeQty(${index}, -1)" class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">-</button>
                    <span class="px-2 font-medium">${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)" class="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">+</button>
                </div>
                <div class="font-bold text-gray-800">$${itemTotal.toFixed(2)}</div>
                <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });

    const delivery = 5.00;
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${(subtotal + delivery).toFixed(2)}`;
}

function changeQty(index, delta) {
    let cart = getCart();
    cart[index].quantity += delta;
    if(cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart(cart);
    renderCartPage();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartPage();
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    renderCartPage();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    fetchProducts();
    renderCartPage();
});