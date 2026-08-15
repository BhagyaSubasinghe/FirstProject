// =====================================================
// NADIYAS CLOTHING - SHOPPING CART
// =====================================================


// -----------------------------------------------------
// CART STORAGE KEY
// -----------------------------------------------------

const CART_KEY = "nadiyas_cart";


// -----------------------------------------------------
// DELIVERY FEE
// -----------------------------------------------------

const DELIVERY_FEE = 5;


// -----------------------------------------------------
// GET CART FROM LOCAL STORAGE
// -----------------------------------------------------

function getCart() {

    const cart = localStorage.getItem(CART_KEY);

    if (!cart) {
        return [];
    }

    try {

        return JSON.parse(cart);

    } catch (error) {

        console.error("Invalid cart data:", error);

        return [];

    }
}


// -----------------------------------------------------
// SAVE CART
// -----------------------------------------------------

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


// -----------------------------------------------------
// UPDATE CART COUNT
// -----------------------------------------------------

function updateCartCount() {

    const cart = getCart();

    let totalQuantity = 0;

    cart.forEach(item => {

        totalQuantity += Number(item.quantity);

    });


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent = totalQuantity;

    }

}


// -----------------------------------------------------
// FORMAT PRICE
// -----------------------------------------------------

function formatPrice(price) {

    return "$" + Number(price).toFixed(2);

}


// -----------------------------------------------------
// DISPLAY CART
// -----------------------------------------------------

function displayCart() {

    const cart = getCart();

    const cartItems =
        document.getElementById("cart-items");

    const emptyCart =
        document.getElementById("empty-cart");

    const cartSummary =
        document.getElementById("cart-summary");


    if (!cartItems) {
        return;
    }


    // Clear existing items

    cartItems.innerHTML = "";


    // -------------------------------------------------
    // EMPTY CART
    // -------------------------------------------------

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartSummary.style.display = "none";

        updateCartCount();

        return;

    }


    // -------------------------------------------------
    // CART HAS PRODUCTS
    // -------------------------------------------------

    emptyCart.style.display = "none";

    cartSummary.style.display = "block";


    let subtotal = 0;


    cart.forEach(item => {

        const price =
            Number(item.price);

        const quantity =
            Number(item.quantity);


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        // Create cart item

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-product-image">

                <div class="cart-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Category: ${item.category || "N/A"}
                    </p>

                    <p>
                        Size: ${item.size || "N/A"}
                    </p>

                    <p>
                        Price:
                        ${formatPrice(price)}
                    </p>

                </div>

            </div>


            <div class="cart-quantity">

                <button
                    type="button"
                    onclick="decreaseQuantity(${item.id}, '${item.size || ""}')">

                    −

                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    type="button"
                    onclick="increaseQuantity(${item.id}, '${item.size || ""}')">

                    +

                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </div>


            <div class="cart-remove">

                <button
                    type="button"
                    onclick="removeFromCart(${item.id}, '${item.size || ""}')">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // -------------------------------------------------
    // CALCULATE TOTAL
    // -------------------------------------------------

    const total =
        subtotal + DELIVERY_FEE;


    document.getElementById("subtotal")
        .textContent =
        formatPrice(subtotal);


    document.getElementById("delivery-fee")
        .textContent =
        formatPrice(DELIVERY_FEE);


    document.getElementById("total")
        .textContent =
        formatPrice(total);


    updateCartCount();

}


// -----------------------------------------------------
// ADD PRODUCT TO CART
// -----------------------------------------------------

function addToCart(product) {

    const cart = getCart();


    // Product ID

    const productId =
        Number(product.id);


    // Selected size

    const selectedSize =
        product.size || "";


    // Check if same product + size exists

    const existingProduct =
        cart.find(item =>

            Number(item.id) === productId &&
            item.size === selectedSize

        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            category: product.category || "",

            size: selectedSize,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();


    alert(
        product.name +
        " has been added to your cart."
    );

}


// -----------------------------------------------------
// INCREASE QUANTITY
// -----------------------------------------------------

function increaseQuantity(id, size) {

    const cart = getCart();


    const item =
        cart.find(product =>

            Number(product.id) === Number(id) &&
            product.size === size

        );


    if (item) {

        item.quantity += 1;

    }


    saveCart(cart);

    displayCart();

}


// -----------------------------------------------------
// DECREASE QUANTITY
// -----------------------------------------------------

function decreaseQuantity(id, size) {

    const cart = getCart();


    const item =
        cart.find(product =>

            Number(product.id) === Number(id) &&
            product.size === size

        );


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity -= 1;

    } else {

        const index =
            cart.indexOf(item);

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

}


// -----------------------------------------------------
// REMOVE PRODUCT
// -----------------------------------------------------

function removeFromCart(id, size) {

    let cart = getCart();


    cart = cart.filter(product =>

        !(
            Number(product.id) === Number(id) &&
            product.size === size
        )

    );


    saveCart(cart);

    displayCart();

}


// -----------------------------------------------------
// CLEAR CART
// -----------------------------------------------------

function clearCart() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) {
        return;
    }


    localStorage.removeItem(CART_KEY);


    displayCart();

    updateCartCount();

}


// -----------------------------------------------------
// GO TO CHECKOUT
// -----------------------------------------------------

function goToCheckout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// -----------------------------------------------------
// RUN WHEN PAGE LOADS
// -----------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);