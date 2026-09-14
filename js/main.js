function formatPrice(price) {

    return "Rs. " +
        Number(price).toLocaleString("en-LK") +
        ".00";

}


function getCart() {

    return JSON.parse(
        localStorage.getItem("nadiyasCart")
    ) || [];

}


function updateCartCount() {

    const cart = getCart();


    const count = cart.reduce(

        (total, item) =>
            total + item.quantity,

        0

    );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent = count;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

    }
);