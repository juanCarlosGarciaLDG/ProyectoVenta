<?php
require_once __DIR__ . '/../controllers/productosController.php';

$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER["REQUEST_METHOD"];

// Rutas personalizadas
if ($request_method === "POST" && $request_uri === '/api/productos/Crear') {
    ProductosController::create();
} elseif ($request_method === "DELETE" && preg_match('/\/api\/productos\/Eliminar\/(\d+)/', $request_uri, $matches)) {
    $id = $matches[1];
    ProductosController::delete($id);
} elseif ($request_method === "PUT" && preg_match('/\/api\/productos\/Modificar\/(\d+)/', $request_uri, $matches)) {
    $id = $matches[1];
    ProductosController::update($id);

// Rutas existentes
} elseif ($request_method === "GET" && $request_uri === '/api/productos') {
    ProductosController::index();
} elseif ($request_method === "GET" && preg_match('/\/api\/productos\/(\d+)/', $request_uri, $matches)) {
    $id = $matches[1];
    ProductosController::show($id);
} else {
    header("HTTP/1.1 404 Not Found");
}
?>