const API_URL = "http://localhost:5000/api/productos";
const cart = [];
// Función para obtener los productos
async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    renderProducts(products);
}

// Función para renderizar los productos en la tabla
function renderProducts(products) {
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id_producto}</td>
            <td>${product.nombre_producto}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td>${product.id_categoria}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para crear un producto
async function createProduct(event) {
    event.preventDefault();
    const nombre_producto = document.querySelector("#nombre_producto").value;
    const precio = document.querySelector("#precio").value;
    const stock = document.querySelector("#stock").value;
    const id_categoria = document.querySelector("#id_categoria").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre_producto,
            precio,
            stock,
            id_categoria
        })
    });

    const result = await response.json();
    alert(result.message || result.error);
    fetchProducts(); // Actualizar la lista de productos
}

// Función para filtrar productos
function filterProducts(event) {
    const searchTerm = event.target.value.toLowerCase();
    const rows = document.querySelectorAll("#productTable tbody tr");
    rows.forEach(row => {
        const id = row.children[0].textContent.toLowerCase();
        const name = row.children[1].textContent.toLowerCase();
        if (id.includes(searchTerm) || name.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Inicializar eventos
document.querySelector("#productForm").addEventListener("submit", createProduct);
document.querySelector("#searchInput").addEventListener("input", filterProducts);

// Cargar productos al cargar la página
fetchProducts();

function addToCart(productId, productName, productPrice) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
        cart[productIndex].total = cart[productIndex].quantity * productPrice;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            total: productPrice
        });
    }
    renderCart();
}
async function fetchAvailableProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    renderAvailableProducts(products);
}
// Función para renderizar productos disponibles
function renderAvailableProducts(products) {
    const tableBody = document.querySelector("#availableProductsTable tbody");
    tableBody.innerHTML = ""; // Limpiar tabla
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id_producto}</td>
            <td>${product.nombre_producto}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td><button onclick="addToCart(${product.id_producto}, '${product.nombre_producto}', ${product.precio})">Agregar</button></td>
        `;
        tableBody.appendChild(row);
    });
}
// Función para agregar productos al carrito
function addToCart(productId, productName, productPrice) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
        cart[productIndex].total = cart[productIndex].quantity * productPrice;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            total: productPrice
        });
    }
    renderCart();
}
// Función para renderizar el carrito
function renderCart() {
    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = ""; // Limpiar la tabla
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
            <td><button onclick="removeFromCart(${item.id})">Eliminar</button></td>
        `;
        cartTableBody.appendChild(row);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    renderCart();
}

// Función para finalizar la compra
function checkout() {
    const response = fetch(`${API_URL}/Comprar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cart)
    });
    response.then(res => res.json()).then(result => {
        alert(result.message || result.error);
        cart.length = 0; // Vaciar el carrito
        renderCart();
        fetchProducts(); // Actualizar la lista de productos
    });
}

// Evento para el botón de finalizar compra
document.querySelector("#checkoutButton").addEventListener("click", checkout);

fetchAvailableProducts();