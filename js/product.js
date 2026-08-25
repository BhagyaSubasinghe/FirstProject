// ==========================================
// NADIYAS CLOTHING PRODUCT PAGE
// ==========================================

const API_URL =
    "http://localhost/nadiyas/backend/api/products.php";


let productData = null;


// ==========================================
// GET PRODUCT ID FROM URL
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    urlParams.get("id");


// ==========================================
// LOAD PRODUCT
// ==========================================

async function loadProduct() {

    if (!productId) {

        document.getElementById("loading")
            .style.display = "none";

        document.getElementById("error-message")
            .style.display = "block";

        document.getElementById("error-message")
            .textContent =
            "Product ID is missing.";

        return;
    }


    try {

        const response =
            await fetch(
                API_URL + "?id=" + productId
            );


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        const result =
            await response.json();


        if (!result.success ||
            !result.data) {

            throw new Error(
                "Product not found"
            );

        }


        productData =
            result.data;


        displayProduct();


    } catch (error) {

        console.error(error);


        document.getElementById("loading")
            .style.display = "none";


        document.getElementById("error-message")
            .style.display = "block";


        document.getElementById("error-message")
            .textContent =
            "Unable to connect to product API.";

    }

}


// ==========================================
// DISPLAY PRODUCT
// ==========================================

function displayProduct() {

    document.getElementById("loading")
        .style.display = "none";


    document.getElementById("product-container")
        .style.display = "flex";


    document.getElementById("product-name")
        .textContent =
        productData.name;


    document.getElementById("product-price")
        .textContent =
        "$" +
        Number(productData.price)
            .toFixed(2);


    document.getElementById("product-category")
        .textContent =
        "Category: " +
        productData.category;


    document.getElementById("product-description")
        .textContent =
        productData.description;


    document.getElementById("product-stock")
        .textContent =
        productData.stock;


    // ======================================
    // IMAGE
    // ======================================

    document.getElementById("product-image")
        .src =
        getProductImage(
            productData
        );


    // ======================================
    // SIZES
    // ======================================

    const sizeSelect =
        document.getElementById(
            "product-size"
        );


    sizeSelect.innerHTML =
        '<option value="">Select Size</option>';


    const sizes =
        productData.sizes
            .split(",");


    sizes.forEach(size => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            size.trim();

        option.textContent =
            size.trim();

        sizeSelect.appendChild(
            option
        );

    });

}


// ==========================================
// PRODUCT IMAGE
// ==========================================

function getProductImage(product) {

    const image =
        product.image;


    if (!image) {

        return "";

    }


    // Try to use category
    // folders for existing images

    const category =
        String(product.category)
            .toLowerCase();


    if (category === "men") {

        return "../assest/mens/" + image;

    }


    if (category === "women") {

        return "../assest/womens/dreses/" + image;

    }


    if (category === "unisex") {

        return "../assest/unisex/" + image;

    }


    if (category === "kids") {

        return "../assest/kids/" + image;

    }


    return "../assest/" + image;

}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addProductToCart() {

    if (!productData) {

        alert(
            "Product is not loaded."
        );

        return;

    }


    const size =
        document.getElementById(
            "product-size"
        ).value;


    if (!size) {

        alert(
            "Please select a size."
        );

        return;

    }


    if (
        Number(productData.stock) <= 0
    ) {

        alert(
            "This product is out of stock."
        );

        return;

    }


    const product = {

        id:
            Number(productData.id),

        name:
            productData.name,

        price:
            Number(productData.price),

        image:
            getProductImage(productData),

        category:
            productData.category,

        size:
            size,

        quantity:
            1

    };


    addToCart(product);

}


// ==========================================
// BUY NOW
// ==========================================

function buyNow() {

    if (!productData) {

        alert(
            "Product is not loaded."
        );

        return;

    }


    const size =
        document.getElementById(
            "product-size"
        ).value;


    if (!size) {

        alert(
            "Please select a size."
        );

        return;

    }


    const product = {

        id:
            Number(productData.id),

        name:
            productData.name,

        price:
            Number(productData.price),

        image:
            getProductImage(productData),

        category:
            productData.category,

        size:
            size,

        quantity:
            1

    };


    localStorage.setItem(
        "nadiyas_cart",
        JSON.stringify([product])
    );


    window.location.href =
        "checkout.html";

}


// ==========================================
// LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadProduct
);