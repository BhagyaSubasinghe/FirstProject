<!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <!-- About -->
                <div>
                    <img src="assets/images/logo.jpg" alt="Logo" class="h-12 w-auto mb-4 rounded">
                    <p class="text-sm text-gray-400">
                        Nadiyas Clothing takes pride in its Sri Lankan roots while offering a world-class retail experience with trendy and comfortable fashion.
                    </p>
                </div>

                <!-- Information -->
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">INFORMATION</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="about.php" class="hover:underline">About Us</a></li>
                        <li><a href="#" class="hover:underline">FAQ</a></li>
                        <li><a href="#" class="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" class="hover:underline">Terms &amp; Conditions</a></li>
                        <li><a href="#" class="hover:underline">Delivery Details</a></li>
                        <li><a href="#" class="hover:underline">Return Policy</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">GET IN TOUCH</h3>
                    <p class="text-sm"><i class="fa-solid fa-location-dot mr-2"></i> Colombo 07, Sri Lanka</p>
                    <p class="text-sm mt-2"><i class="fa-solid fa-phone mr-2"></i> +94 77 404 9047</p>
                    <p class="text-sm mt-2"><i class="fa-solid fa-envelope mr-2"></i> care@nadiyasclothing.lk</p>
                    <div class="flex space-x-4 mt-4 text-xl">
                        <a href="#" class="hover:text-white"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="hover:text-white"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" class="hover:text-white"><i class="fa-brands fa-whatsapp"></i></a>
                        <a href="#" class="hover:text-white"><i class="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>

                <!-- Newsletter -->
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">SUBSCRIBE TO NEWSLETTER</h3>
                    <form class="space-y-2" onsubmit="event.preventDefault();">
                        <input type="email" placeholder="Enter your email" class="w-full px-3 py-2 text-gray-900 rounded focus:outline-none" required>
                        <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition">Subscribe</button>
                    </form>
                </div>

            </div>
            <div class="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
                &copy; <?php echo date("Y"); ?> Nadiyas Clothing. All rights reserved.
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>