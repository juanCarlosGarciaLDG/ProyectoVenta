<?php
require_once __DIR__ . '/../services/ProductoService.php';
require_once __DIR__ . '/../services/ClienteService.php';
require_once __DIR__ . '/../config/db.php';

class ComprasController {
    public static function realizarCompra() {
        echo json_encode(["debug" => "Inicio del método realizarCompra"]);
        $db = (new Database())->getConnection();
        echo json_encode(["debug" => "Conexión a la base de datos establecida"]);
    
        $cart = json_decode(file_get_contents("php://input"), true);
        if (empty($cart) || !isset($cart['productos']) || !isset($cart['cliente'])) {
            echo json_encode(["error" => "Datos incompletos para realizar la compra"]);
            http_response_code(400);
            return;
        }
        echo json_encode(["debug" => "Datos del carrito recibidos"]);

        $productos = $cart['productos'];
        $cliente = $cart['cliente']; // Datos del cliente (nombre, correo, teléfono)
        $total = 0;

        try {
            $db->beginTransaction();

            // Verificar si el cliente ya existe
            $id_cliente = ClienteService::obtenerORegistrarCliente($cliente);

            // Registrar la venta en la tabla `ventas`
            $queryVenta = "INSERT INTO ventas (fecha, id_cliente, total) VALUES (NOW(), ?, ?)";
            $stmtVenta = $db->prepare($queryVenta);

            // Calcular el total de la compra
            foreach ($productos as $item) {
                $producto = ProductoService::obtenerPorId($item['id']);
                if (!$producto || $producto['stock'] < $item['cantidad']) {
                    throw new Exception("Stock insuficiente para el producto con ID " . $item['id']);
                }
                $total += $producto['precio'] * $item['cantidad'];
            }

            $stmtVenta->execute([$id_cliente, $total]);
            $id_venta = $db->lastInsertId();

            // Actualizar el stock de los productos
            foreach ($productos as $item) {
                $success = ProductoService::actualizarStock($item['id'], -$item['cantidad']);
                if (!$success) {
                    throw new Exception("Error al actualizar el stock del producto con ID " . $item['id']);
                }
            }

            $db->commit();
            echo json_encode(["message" => "Compra realizada con éxito", "id_venta" => $id_venta]);
        } catch (Exception $e) {
            $db->rollBack();
            echo json_encode(["error" => $e->getMessage()]);
            http_response_code(400);
        }
    }
}
?>