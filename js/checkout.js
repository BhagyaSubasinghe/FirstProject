// ==========================================
// CHECKOUT
// ==========================================

const CART_KEY =
    "nadiyas_cart";


const DELIVERY_FEE =
    5;


const ORDER_API =
    "http://localhost/nadiyas/backend/api/orders.php";


// ==========================================
// GET CART
// ==========================================

function getCheckoutCart() {

    const data =
        localStorage.getItem(CART_KEY);


    if (!data) {

        return [];

    }


    try {

        return JSON.parse(data);

    } catch {

        return [];

    }

}


// ==========================================
// PRICE
// ==========================================

function price(value) {

    return "$" +
        Number(value).toFixed(2);

}


// ==========================================
// DISPLAY ORDER
// ==========================================

function displayCheckout() {

    const cart =
        getCheckoutCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        window.location.href =
            "cart.html";

        return;

    }


    const container =
        document.getElementById(
            "checkout-items"
        );


    let subtotal = 0;


    container.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        subtotal += itemTotal;


        const div =
            document.createElement(
                "div"
            );


        div.innerHTML = `

            <p>

                ${item.name}

                -
                Size: ${item.size}

                -
                Qty: ${item.quantity}

                -
                ${price(itemTotal)}

            </p>

        `;


        container.appendChild(div);

    });


    const total =
        subtotal + DELIVERY_FEE;


    document.getElementById(
        "checkout-subtotal"
    ).textContent =
        price(subtotal);


    document.getElementById(
        "checkout-delivery"
    ).textContent =
        price(DELIVERY_FEE);


    document.getElementById(
        "checkout-total"
    ).textContent =
        price(total);

}


// ==========================================
// PLACE ORDER
// ==========================================

async function placeOrder(event) {

    event.preventDefault();


    const cart =
        getCheckoutCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const customerName =
        document.getElementById(
            "customer-name"
        ).value.trim();


    const email =
        document.getElementById(
            "customer-email"
        ).value.trim();


    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const postalCode =
        document.getElementById(
            "postal-code"
        ).value.trim();


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const total =
        subtotal + DELIVERY_FEE;


    const orderData = {

        customer_name:
            customerName,

        email:
            email,

        phone:
            phone,

        address:
            address,

        city:
            city,

        postal_code:
            postalCode,

        payment_method:
            "Cash on Delivery",

        delivery_fee:
            DELIVERY_FEE,

        subtotal:
            subtotal,

        total:
            total,

        items:
            cart

    };


    try {

        const response =
            await fetch(
                ORDER_API,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            orderData
                        )

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            alert(
                result.message ||
                "Unable to place order."
            );

            return;

        }


        // Clear cart

        localStorage.removeItem(
            CART_KEY
        );


        alert(
            "Order placed successfully!"
        );


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(error);


        alert(
            "Unable to connect to order API."
        );

    }

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckout();


        document
            .getElementById(
                "checkout-form"
            )
            .addEventListener(
                "submit",
                placeOrder
            );

    }
);