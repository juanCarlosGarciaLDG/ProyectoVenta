<?php
require_once __DIR__ . '/../config/db.php';

class ProductoService {
    public static function obtenerTodos() {
        $db = (new Database())->getConnection();
        $query = "SELECT * FROM productos";
        $stmt = $db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerPorId($id) {
        $db = (new Database())->getConnection();
        $query = "SELECT * FROM productos WHERE id_producto = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function crearProducto($nombre_producto, $precio, $stock, $id_categoria) {
        $db = (new Database())->getConnection();
        $query = "INSERT INTO productos (nombre_producto, precio, stock, id_categoria) VALUES (?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        return $stmt->execute([$nombre_producto, $precio, $stock, $id_categoria]);
    }

    public static function actualizarProducto($id, $nombre_producto, $precio, $stock, $id_categoria) {
        $db = (new Database())->getConnection();
        $query = "UPDATE productos SET nombre_producto = ?, precio = ?, stock = ?, id_categoria = ? WHERE id_producto = ?";
        $stmt = $db->prepare($query);
        return $stmt->execute([$nombre_producto, $precio, $stock, $id_categoria, $id]);
    }

    public static function eliminarProducto($id) {
        $db = (new Database())->getConnection();
        $query = "DELETE FROM productos WHERE id_producto = ?";
        $stmt = $db->prepare($query);
        return $stmt->execute([$id]);
    }
}
?>