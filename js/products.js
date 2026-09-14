let products = [];


// ==========================================
// LOAD PRODUCTS FROM PHP API
// ==========================================

const productsReady = fetch(
    "../backend/api/products.php"
)
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

        console.error(error);

        alert(
            "Unable to load products. " +
            "Please check the PHP server."
        );

        return [];

    });