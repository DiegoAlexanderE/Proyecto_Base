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
    updateCartPanel();
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
    updateCartPanel();
}

// Función para actualizar el panel del carrito
function updateCartPanel() {
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

// Mostrar/Ocultar el panel del carrito
function toggleCartPanel() {
    const cartPanel = document.getElementById('cart-panel');
    const paymentPanel = document.getElementById('payment-panel');
    cartPanel.classList.toggle('active');
    paymentPanel.classList.remove('active'); // Cerrar payment panel si está abierto
}

// Mostrar/Ocultar el panel de métodos de pago
function togglePaymentPanel() {
    const cartPanel = document.getElementById('cart-panel');
    const paymentPanel = document.getElementById('payment-panel');
    paymentPanel.classList.toggle('active');
    cartPanel.classList.remove('active'); // Cerrar cart panel si está abierto
}

// Función para manejar la selección de método de pago
function selectPayment(method) {
    alert(`Método de pago seleccionado: ${method}`);
    // Aquí puedes agregar lógica para procesar el pago
}

// Escuchar clicks en los botones y el carrito
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Actualizar contador al cargar la página
    updateCartPanel(); // Actualizar panel del carrito al cargar

    // Botones "Agregar al Carrito"
    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const nombre = this.getAttribute('data-producto');
            const precio = parseInt(this.getAttribute('data-precio'));
            agregarAlCarrito(nombre, precio);
        });
    });

    // Toggle cart panel
    const cartToggle = document.getElementById('floating-cart-toggle');
    const cartNavToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    cartToggle.addEventListener('click', toggleCartPanel);
    cartNavToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCartPanel();
    });
    closeCart.addEventListener('click', toggleCartPanel);

    // Toggle payment panel
    const buyBtn = document.getElementById('buy-btn');
    const closePayment = document.getElementById('close-payment');
    buyBtn.addEventListener('click', togglePaymentPanel);
    closePayment.addEventListener('click', togglePaymentPanel);
});
