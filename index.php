<?php
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Configuración del token
$key = "clave_secreta";
$data = [
    "iat" => time(),  // Tiempo de emisión
    "exp" => time() + 3600,  // Expiración a 1 hora
    "data" => [
        "user_id" => 123,
        "role" => "admin"
    ]
];

// Generar el token JWT
$jwt = JWT::encode($data, $key, 'HS256');
echo "Token JWT generado: " . $jwt;

// Decodificar el token JWT (usando la clase Key)
$decoded = JWT::decode($jwt, new Key($key, 'HS256'));
echo "<br>Datos decodificados:<br>";
print_r($decoded);
?>