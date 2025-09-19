let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar producto
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    updateCartCount();
    alert(`${nombre} añadido al carrito`);
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-icon');
    const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Función para vaciar el carrito
function clearCart() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    updateCartCount();
    updateCartPage();
}

// Función para actualizar la página del carrito
function updateCartPage() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
        cartItems.appendChild(li);
        total += producto.precio * producto.cantidad;
    });
    
    cartTotal.textContent = `Total: $${total}`;
}

// Escuchar clicks en los botones "Agregar al Carrito"
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Actualizar contador al cargar la página
    updateCartPage(); // Actualizar página del carrito si está en carrito.html
    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const nombre = this.getAttribute('data-producto');
            const precio = parseInt(this.getAttribute('data-precio'));
            agregarAlCarrito(nombre, precio);
        });
    });
});