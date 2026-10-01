let products = [];


const staticProducts = [
    ["Women Dress 1", "Women", "images/women/w1.jpg"],
    ["Women Dress 2", "Women", "images/women/w2.jpg"],
    ["Women Dress 3", "Women", "images/women/w3.jpg"],
    ["Women Dress 4", "Women", "images/women/women d4.jpg"],
    ["Women Dress 5", "Women", "images/women/women d5.jpg"],
    ["Women Dress 6", "Women", "images/women/women d6.jpg"],
    ["Women Top 1", "Women", "images/women/women t1.jpg"],
    ["Women Top 2", "Women", "images/women/women t2.jpg"],
    ["Women Top 3", "Women", "images/women/women t3.jpg"],
    ["Women Top 4", "Women", "images/women/women t4.jpg"],
    ["Women Top 5", "Women", "images/women/women t5.jpg"],
    ["Women Top 6", "Women", "images/women/women t6.jpg"],
    ["Men Shirt 1", "Men", "images/men/m1.jpg"],
    ["Men Shirt 2", "Men", "images/men/m2.jpg"],
    ["Men Shirt 3", "Men", "images/men/mens3.jpg"],
    ["Men Shirt 4", "Men", "images/men/mens4.jpg"],
    ["Men Shirt 5", "Men", "images/men/mens5.jpg"],
    ["Men Shirt 6", "Men", "images/men/mens6.jpg"],
    ["Kids Outfit 1", "Kids", "images/kids/k1.jpg"],
    ["Kids Outfit 2", "Kids", "images/kids/k2.jpg"],
    ["Kids Outfit 3", "Kids", "images/kids/k3.jpg"],
    ["Kids Outfit 4", "Kids", "images/kids/kid b 4.jpg"],
    ["Kids Outfit 5", "Kids", "images/kids/kid b 5.jpg"],
    ["Kids Outfit 6", "Kids", "images/kids/kid b 6.jpg"],
    ["Kids Outfit 7", "Kids", "images/kids/kid b 7.webp"],
    ["Unisex Style 1", "Unisex", "images/unisex/u1.jpg"],
    ["Unisex Style 2", "Unisex", "images/unisex/u2.jpg"],
    ["Unisex Style 3", "Unisex", "images/unisex/u3.jpg"]
].map((item, index) => ({
    id: index + 1,
    name: item[0],
    category: item[1],
    description: `A comfortable ${item[1].toLowerCase()} style from the Nadiyas collection.`,
    price: 3500 + (index % 6) * 500,
    image: item[2],
    stock: 10,
    sizes: ["S", "M", "L", "XL"]
}));


// ==========================================
// LOAD PRODUCTS FROM PHP API
// ==========================================

const canUseApi =
    window.location.protocol === "http:" &&
    !window.location.hostname.endsWith("github.io");


const productsReady = (canUseApi
    ? fetch("../backend/api/products.php")
    : Promise.reject(new Error("Static catalog mode")))
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Unable to connect to server."
            );
        }

        return response.json();

    })
    .then(data => {

        if (!data.success) {

            throw new Error(
                data.message ||
                "Unable to load products."
            );

        }


        products = data.products;


        console.log(
            "Products loaded:",
            products
        );


        return products;

    })
    .catch(error => {

        products = staticProducts;

        return products;

    });