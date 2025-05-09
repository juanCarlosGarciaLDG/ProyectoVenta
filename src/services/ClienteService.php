<?php
require_once __DIR__ . '/../config/db.php';

class ClienteService {
    public static function obtenerORegistrarCliente($cliente) {
        $db = (new Database())->getConnection();

        // Verificar si el cliente ya existe
        $queryCheck = "SELECT id_cliente FROM clientes WHERE correo = ?";
        $stmtCheck = $db->prepare($queryCheck);
        $stmtCheck->execute([$cliente['correo']]);
        $id_cliente = $stmtCheck->fetchColumn();

        if ($id_cliente) {
            return $id_cliente; // Cliente ya existe
        }

        // Registrar un nuevo cliente
        $queryInsert = "INSERT INTO clientes (nombre_cliente, correo, telefono) VALUES (?, ?, ?)";
        $stmtInsert = $db->prepare($queryInsert);
        $stmtInsert->execute([$cliente['nombre_cliente'], $cliente['correo'], $cliente['telefono']]);

        return $db->lastInsertId(); // Retornar el ID del nuevo cliente
    }
}
?>