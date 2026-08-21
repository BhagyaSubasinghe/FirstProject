function addToCart(product) {
    let cart = getCart();
    
    
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += product.quantity || 1;
        cart[existingIndex].totalPrice = cart[existingIndex].price * cart[existingIndex].quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            size: product.size || 'M',
            image: product.image,
            quantity: product.quantity || 1,
            totalPrice: parseFloat(product.price) * (product.quantity || 1)
        });
    }

    saveCart(cart);
    alert(`${product.name} added to cart!`);
}