<?php include 'includes/header.php'; ?>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items List -->
        <div class="lg:col-span-2 space-y-4" id="cart-items-container">
            <!-- Dynamic Cart Items -->
        </div>

        <!-- Order Summary -->
        <div class="bg-white p-6 rounded-lg shadow-sm h-fit border border-gray-100">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            <div class="space-y-3 text-sm border-b pb-4">
                <div class="flex justify-between">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-medium" id="cart-subtotal">$0.00</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Delivery Fee</span>
                    <span class="font-medium" id="cart-delivery">$5.00</span>
                </div>
            </div>
            <div class="flex justify-between text-lg font-bold my-4">
                <span>Total</span>
                <span id="cart-total">$0.00</span>
            </div>
            <button onclick="window.location.href='checkout.php'" class="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-medium">Proceed to Checkout</button>
            <button onclick="clearCart()" class="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition font-medium mt-2 text-sm">Clear Cart</button>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>