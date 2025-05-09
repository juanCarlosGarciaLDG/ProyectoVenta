<?php
require_once __DIR__ . '/../controllers/productosController.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Content-Type: application/json');

$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER["REQUEST_METHOD"];

// Procesar solo rutas que comiencen con /api/productos
if (strpos($request_uri, '/api/productos') === 0) {
    // Rutas personalizadas
    if ($request_method === "POST" && $request_uri === '/api/productos/Crear') {
        ProductosController::create();
    } elseif ($request_method === "DELETE" && preg_match('/\/api\/productos\/Eliminar\/(\d+)/', $request_uri, $matches)) {
        $id = filter_var($matches[1], FILTER_VALIDATE_INT);
        if (!$id) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["error" => "ID inválido"]);
            exit;
        }
        ProductosController::delete($id);
    } elseif ($request_method === "PUT" && preg_match('/\/api\/productos\/Modificar\/(\d+)/', $request_uri, $matches)) {
        $id = filter_var($matches[1], FILTER_VALIDATE_INT);
        if (!$id) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["error" => "ID inválido"]);
            exit;
        }
        ProductosController::update($id);

    // Ruta específica para obtener todos los productos
    } elseif ($request_method === "GET" && $request_uri === '/api/productos') {
        ProductosController::index();
    } elseif ($request_method === "GET" && preg_match('/\/api\/productos\/(\d+)/', $request_uri, $matches)) {
        $id = filter_var($matches[1], FILTER_VALIDATE_INT);
        if (!$id) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["error" => "ID inválido"]);
            exit;
        }
        ProductosController::show($id);
    } 


    else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Ruta no encontrada en productos"]);
    }
}
?>