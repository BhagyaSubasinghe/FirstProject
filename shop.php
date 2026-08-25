<?php 
include 'includes/header.php'; 
$category = isset($_GET['category']) ? $_GET['category'] : 'All';
?>

<!-- Banner Section -->
<section class="bg-gray-100 py-12 text-center border-b">
    <h1 class="text-4xl font-bold text-gray-900"><?php echo htmlspecialchars($category); ?> Collection</h1>
    <p class="text-gray-600 mt-2">Explore our premium selection for <?php echo htmlspecialchars($category); ?> fashion.</p>
</section>

<!-- Product Grid Section -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <p class="text-gray-500 col-span-full text-center">Loading products...</p>
    </div>
</section>

<script>
    const currentCategory = "<?php echo htmlspecialchars($category); ?>";
</script>

<?php include 'includes/footer.php'; ?>