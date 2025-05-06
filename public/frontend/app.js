const API_URL = "http://localhost:5000/api/productos";

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