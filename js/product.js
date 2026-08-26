// Location: frontend/js/product.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const container = document.getElementById('product-details');

    if (!productId) {
        if (container) {
            container.innerHTML = `<p class="text-red-500 text-lg font-semibold">Product ID එකක් ලබා දී නොමැත. (URL එක අගට ?id=1 ලෙස එක් කරන්න)</p>`;
        }
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/products.php`);
        const result = await response.json();

        if (result.success) {
            const product = result.data.find(p => p.id == productId);

            if (product && container) {
                // assest/ + DB එකේ තියෙන path එක එකතු වේ (උදා: assest/mens/image1.jpg)
                container.innerHTML = `
                    <div class="w-full md:w-1/2 flex justify-center">
                        <img src="assest/${product.image}" alt="${product.name}" class="w-full max-w-md h-auto rounded-lg shadow-md object-cover">
                    </div>
                    <div class="w-full md:w-1/2 space-y-4">
                        <h2 class="text-3xl font-bold text-gray-900">${product.name}</h2>
                        <p class="text-sm text-gray-500 uppercase tracking-wide">Category: ${product.category}</p>
                        <p class="text-2xl font-bold text-indigo-600">LKR ${product.price}</p>
                        <p class="text-gray-600">Sizes: <span class="font-semibold">${product.sizes}</span></p>
                        <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                            Add to Cart
                        </button>
                    </div>
                `;
            } else if (container) {
                container.innerHTML = `<p class="text-red-500">Product එක සොයා ගැනීමට නොහැකි විය.</p>`;
            }
        }
    } catch (error) {
        if (container) {
            container.innerHTML = `<p class="text-red-500">Backend Server එක සම්බන්ධ කර ගැනීමට අපොහොසත් විය.</p>`;
        }
    }
});