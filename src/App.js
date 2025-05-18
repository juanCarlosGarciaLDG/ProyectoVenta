import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import CartView from './components/CartView';
import PurchaseHistory from './components/PurchaseHistory';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historial, setHistorial] = useState([]); // Simulado, luego lo traes del backend

  useEffect(() => {
    fetch('http://localhost/ProyectoVenta/public/api/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setProductosFiltrados(data);
      });
  }, []);

  useEffect(() => {
    if (showHistory) {
      // Simulación de historial de compras
      setHistorial([
        {
          id: 1,
          nombre: 'Ticket 1',
          total: 120.50,
          fecha: '2024-06-01',
          estado: 'en bodega'
        },
        {
          id: 2,
          nombre: 'Ticket 2',
          total: 89.99,
          fecha: '2024-06-10',
          estado: 'en camino'
        },
        {
          id: 3,
          nombre: 'Ticket 3',
          total: 45.00,
          fecha: '2024-06-15',
          estado: 'entregado'
        }
      ]);
    }
  }, [showHistory]);

  const handleAddToCart = (producto) => {
    setCart(prev => {
      const found = prev.find(item => item.id === producto.id);
      if (found) {
        // Limita al stock disponible
        if (found.cantidad < producto.stock) {
          return prev.map(item =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
          );
        } else {
          alert('No hay más stock disponible para este producto');
          return prev;
        }
      }
      if (producto.stock > 0) {
        return [...prev, { ...producto, cantidad: 1 }];
      } else {
        alert('Producto sin stock');
        return prev;
      }
    });
  };

  const handleRemoveFromCart = (producto) => {
    setCart(prev => {
      const found = prev.find(item => item.id === producto.id);
      if (found.cantidad <= 1) {
        return prev.filter(item => item.id !== producto.id);
      }
      return prev.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
    });
  };

  const handleSearch = () => {
    const filtro = productos.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(filtro);
  };

  const handleCartClick = () => setShowCart(true);
  const handleBackToShop = () => setShowCart(false);

  const handleHistoryClick = () => {
    // Aquí puedes hacer fetch al backend para traer el historial real
    setShowHistory(true);
  };

  const handleLogout = () => {
    // Lógica de logout
    alert('Cerrar sesión');
  };

  const handlePay = async () => {
    const response = await fetch('http://localhost/ProyectoVenta/public/api/compras/realizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carrito: cart })
    });
    const data = await response.json();
    if (data.success) {
      alert('¡Compra realizada!');
      setCart([]);
      setShowCart(false);
      // Recargar productos para actualizar stock en la vista principal
      fetch('http://localhost/ProyectoVenta/public/api/productos')
        .then(res => res.json())
        .then(data => {
          setProductos(data);
          setProductosFiltrados(data);
        });
    } else {
      alert(data.message || 'Error al realizar la compra');
    }
  };

  return (
    <div>
      <NavBar
        onCartClick={handleCartClick}
        onHistoryClick={handleHistoryClick}
        onLogout={handleLogout}
      />
      {showHistory ? (
        <PurchaseHistory historial={historial} onBack={() => setShowHistory(false)} />
      ) : showCart ? (
        <CartView
          cart={cart}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          onPay={handlePay}
          onBack={handleBackToShop}
        />
      ) : (
        <>
          <SearchBar value={busqueda} onChange={setBusqueda} onSearch={handleSearch} />
          <ProductList productos={productosFiltrados} onAddToCart={handleAddToCart} />
        </>
      )}
    </div>
  );
}

export default App;

