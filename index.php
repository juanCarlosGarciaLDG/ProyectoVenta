<?php
// Verificar si el archivo de rutas existe
if (!file_exists(__DIR__ . '/src/routes/productosRoutes.php')) {
    die('Error: El archivo productosRoutes.php no se encuentra en la ruta especificada.');
}

// Incluir archivo de rutas
require_once __DIR__ . '/src/routes/productosRoutes.php';
require_once __DIR__ . '/src/routes/comprasRoutes.php';
require_once __DIR__ . '/src/routes/tokenRoutes.php';
// Incluir autoload de Composer
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    die('Error: El autoload de Composer no se encontró. Ejecuta "composer install".');
}
require_once __DIR__ . '/vendor/autoload.php';

// No generar ni mostrar el token JWT aquí
?>