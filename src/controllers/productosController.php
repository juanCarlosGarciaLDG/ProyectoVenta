<?php
require_once __DIR__ . '/../services/ProductoService.php';

class ProductosController {
    public static function index() {
        $productos = ProductoService::obtenerTodos();
        header('Content-Type: application/json');
        echo json_encode($productos);
    }

    public static function show($id) {
        $producto = ProductoService::obtenerPorId($id);
        header('Content-Type: application/json');
        echo json_encode($producto);
    }

    public static function create() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (ProductoService::crearProducto($data['nombre_producto'], $data['precio'], $data['stock'], $data['id_categoria'])) {
            echo json_encode(["message" => "Producto creado"]);
        } else {
            echo json_encode(["message" => "Error al crear producto"]);
        }
    }

    public static function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        if (ProductoService::actualizarProducto($id, $data['nombre_producto'], $data['precio'], $data['stock'], $data['id_categoria'])) {
            echo json_encode(["message" => "Producto actualizado"]);
        } else {
            echo json_encode(["message" => "Error al actualizar producto"]);
        }
    }

    public static function delete($id) {
        if (ProductoService::eliminarProducto($id)) {
            echo json_encode(["message" => "Producto eliminado"]);
        } else {
            echo json_encode(["message" => "Error al eliminar producto"]);
        }
    }
}
?>