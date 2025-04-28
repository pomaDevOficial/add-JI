// Array para almacenar los productos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    listaCarrito.innerHTML = ''; // Limpiar el carrito visualmente

    // Si el carrito está vacío, mostrar un mensaje
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<tr><td colspan="4">El carrito está vacío.</td></tr>';
    } else {
        // Si el carrito tiene productos, crear las filas
        carrito.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.img}" alt="${producto.nombre}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><button class="eliminar" data-id="${producto.id}">Eliminar</button></td>
            `;
            listaCarrito.appendChild(row);
        });
    }
    // Reasignar los eventos de eliminar después de actualizar el carrito
    asignarEventosEliminar();

    // Guardar carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

}

// Función para agregar un producto al carrito
function agregarAlCarrito(elemento) {
    const id = elemento.dataset.id;
    const nombre = elemento.dataset.nombre;
    const descripcion = elemento.dataset.descripcion;
    const precio = elemento.dataset.precio;
    const img = elemento.dataset.img;

    const producto = { id, nombre, descripcion, precio, img };

    carrito.push(producto);
    actualizarCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(id) {
    // Eliminar producto con el id dado
    carrito = carrito.filter(producto => producto.id !== id);

    // Mostrar el carrito actualizado en la consola para ver el cambio
    console.log("Carrito actualizado:", carrito);

    // Actualizar carrito y vista
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito(); // Actualizar la vista del carrito
}

// Función para asignar eventos de eliminar a los botones
function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(button => {
        // Se asegura de que no se agreguen múltiples eventos al mismo botón
        button.removeEventListener('click', handleEliminarClick);
        button.addEventListener('click', handleEliminarClick);
    });
}

// Manejar evento de eliminación
function handleEliminarClick(e) {
    // const id = parseInt(e.target.dataset.id);
    // // Verificar si el id se está enviando correctamente
    // console.log("Botón de eliminar clickeado con id:", id);
    // eliminarDelCarrito(id);
    const id = e.target.dataset.id; // Obtener el id del producto desde el botón
    console.log("Botón de eliminar clickeado con id:", id);  // Verificar en la consola
    eliminarDelCarrito(id); 
}

// Escuchar clics en el carrito para vaciarlo
document.querySelector('#vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
});

// Función para inicializar la página
function inicializar() {
    // Agregar el evento al botón "agregar" de cada producto
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', (e) => {
            const productoElement = e.target.closest('.ofert-1');
            agregarAlCarrito(productoElement);
        });
    });

    // Actualizar el carrito al cargar la página
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', inicializar);
