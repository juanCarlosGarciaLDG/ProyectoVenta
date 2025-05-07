<?php
require_once __DIR__ . '/../src/routes/productosRoutes.php';

require_once 'middleware/AuthMiddleware.php';
AuthMiddleware::verificarToken();

require_once 'middleware/LoggingMiddleware.php';
LoggingMiddleware::registrarSolicitud();

require_once 'middleware/Cors.php';
Cors::permitirOrigen();
?>