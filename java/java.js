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
    alert(`${nombre} añadido al carrito`);
}

// Escuchar clicks en los botones "Comprar"
document.querySelectorAll('.comprar-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const nombre = this.getAttribute('data-producto');
        const precio = parseInt(this.parentElement.querySelector('p').textContent.replace(/\D/g, ''));
        agregarAlCarrito(nombre, precio);
    });
});
