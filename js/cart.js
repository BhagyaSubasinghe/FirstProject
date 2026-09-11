function addToCart(productId, size, quantity = 1) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        alert("Product not found.");
        return;
    }

    if (!size) {
        alert("Please select a size.");
        return;
    }

    let cart = JSON.parse(
        localStorage.getItem("nadiyasCart")
    ) || [];


    const existingItem = cart.find(
        item =>
            item.productId === productId &&
            item.size === size
    );


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: quantity
        });

    }


    localStorage.setItem(
        "nadiyasCart",
        JSON.stringify(cart)
    );


    alert("Product added to cart!");

    updateCartCount();
}


function removeFromCart(index) {

    let cart = JSON.parse(
        localStorage.getItem("nadiyasCart")
    ) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "nadiyasCart",
        JSON.stringify(cart)
    );


    displayCart();
    updateCartCount();
}


function updateQuantity(index, change) {

    let cart = JSON.parse(
        localStorage.getItem("nadiyasCart")
    ) || [];


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }


    localStorage.setItem(
        "nadiyasCart",
        JSON.stringify(cart)
    );


    displayCart();
    updateCartCount();
}


function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    const summary =
        document.getElementById("cart-summary");


    if (!cartContainer) {
        return;
    }


    const cart = JSON.parse(
        localStorage.getItem("nadiyasCart")
    ) || [];


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>

                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>

                <a href="women.html" class="black-btn">
                    Start Shopping
                </a>
            </div>
        `;

        if (summary) {
            summary.innerHTML = "";
        }

        return;
    }


    let subtotal = 0;


    cartContainer.innerHTML = cart.map(
        (item, index) => {

            const itemTotal =
                item.price * item.quantity;

            subtotal += itemTotal;


            return `
                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h3>${item.name}</h3>

                        <p>Size: ${item.size}</p>

                        <p class="cart-price">
                            ${formatPrice(item.price)}
                        </p>

                    </div>


                    <div class="quantity-control">

                        <button
                            onclick="updateQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="updateQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <div class="cart-item-total">

                        <strong>
                            ${formatPrice(itemTotal)}
                        </strong>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;
        }
    ).join("");


    const delivery = subtotal >= 10000 ? 0 : 350;

    const total = subtotal + delivery;


    if (summary) {

        summary.innerHTML = `

            <h2>Order Summary</h2>

            <div class="summary-row">
                <span>Subtotal</span>
                <strong>
                    ${formatPrice(subtotal)}
                </strong>
            </div>


            <div class="summary-row">

                <span>Delivery</span>

                <strong>
                    ${
                        delivery === 0
                        ? "FREE"
                        : formatPrice(delivery)
                    }
                </strong>

            </div>


            <div class="summary-total">

                <span>Total</span>

                <strong>
                    ${formatPrice(total)}
                </strong>

            </div>


            <a
                href="checkout.html"
                class="checkout-btn"
            >
                Proceed to Checkout
            </a>

        `;
    }
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();
        updateCartCount();

    }
);