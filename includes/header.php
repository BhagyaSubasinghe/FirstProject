<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nadiyas Clothing | Premium Fashion</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 text-gray-800 flex flex-col min-h-screen">

    <!-- Navigation Bar -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="index.php">
                        <img class="h-14 w-auto rounded object-cover" src="assets/images/logo.jpg" alt="Nadiyas Clothing">
                    </a>
                </div>

                <!-- Nav Links -->
                <div class="hidden md:flex space-x-8 items-center font-medium">
                    <a href="index.php" class="text-gray-700 hover:text-black transition">Home</a>
                    <a href="about.php" class="text-gray-700 hover:text-black transition">About</a>
                    
                    <!-- Dropdown -->
                    <div class="relative group">
                        <a href="shop.php?category=All" class="text-gray-700 hover:text-black flex items-center py-5 transition">
                            Shop <i class="fa-solid fa-chevron-down ml-1 text-xs"></i>
                        </a>
                        <div class="absolute left-0 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block border border-gray-100">
                            <a href="shop.php?category=Men" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Collection</a>
                            <a href="shop.php?category=Women" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women's Collection</a>
                            <a href="shop.php?category=Unisex" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Unisex Collection</a>
                            <a href="shop.php?category=Kids" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kids Collection</a>
                        </div>
                    </div>

                    <a href="contact.php" class="text-gray-700 hover:text-black transition">Contact</a>
                </div>

                <!-- Cart Icon -->
                <div class="flex items-center space-x-4">
                    <a href="cart.php" class="relative text-gray-700 hover:text-black p-2">
                        <i class="fa-solid fa-bag-shopping text-2xl"></i>
                        <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">0</span>
                    </a>
                </div>

            </div>
        </div>
    </nav>