import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import CartView from './components/CartView';
import PurchaseHistory from './components/PurchaseHistory';
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import AddProvider from './components/AddProvider';
import EditProducts from './components/EditProducts';
import EditCategories from './components/EditCategories';
import EditProviders from './components/EditProviders';
import ProvidersView from './components/ProvidersView';
import CategoriesView from './components/CategoriesView';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historial, setHistorial] = useState([]); // Simulado, luego lo traes del backend
  const [isAdmin, setIsAdmin] = useState(true); // Cambia a false para ocultar
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showEditProducts, setShowEditProducts] = useState(false);
  const [showEditCategories, setShowEditCategories] = useState(false);
  const [showEditProviders, setShowEditProviders] = useState(false);
  const [showProvidersView, setShowProvidersView] = useState(false);
  const [showCategoriesView, setShowCategoriesView] = useState(false);

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

  const handleCartClick = () => {
    setShowCart(true);
    setShowHistory(false);
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowAddProvider(false);
    setShowEditProducts(false);
    setShowEditCategories(false);
    setShowEditProviders(false);
    setShowProvidersView(false);
    setShowCategoriesView(false);
  };

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

  const handleShowProviders = () => {
    setShowProvidersView(true);
    setShowCategoriesView(false);
    setShowCart(false);
    setShowHistory(false);
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowAddProvider(false);
    setShowEditProducts(false);
    setShowEditCategories(false);
    setShowEditProviders(false);
    // ...oculta cualquier otra vista
  };

  const handleBackToHome = () => {
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowAddProvider(false);
    setShowEditProducts(false);
    setShowEditCategories(false);
    setShowEditProviders(false);
    setShowProvidersView(false);
    setShowCategoriesView(false);
    setShowCart(false);
    setShowHistory(false);
  };

  return (
    <div>
      <NavBar
        onCartClick={handleCartClick}
        onHistoryClick={handleHistoryClick}
        onLogout={handleLogout}
        onAddProduct={() => { setShowAddProduct(true); setShowAddCategory(false); setShowAddProvider(false); setShowCart(false); setShowHistory(false); }}
        onAddCategory={() => { setShowAddCategory(true); setShowAddProduct(false); setShowAddProvider(false); setShowCart(false); setShowHistory(false); }}
        onAddProvider={() => { setShowAddProvider(true); setShowAddProduct(false); setShowAddCategory(false); setShowCart(false); setShowHistory(false); }}
        onShowProviders={() => {
          setShowProvidersView(true);
          setShowCategoriesView(false);
          setShowCart(false);
          setShowHistory(false);
        }}
        onShowCategories={() => {
          setShowCategoriesView(true);
          setShowProvidersView(false);
          setShowCart(false);
          setShowHistory(false);
        }}
        isAdmin={isAdmin}
      />
      {showAddProduct && <AddProduct onBack={handleBackToHome} />}
      {showAddCategory && <AddCategory onBack={handleBackToHome} />}
      {showAddProvider && <AddProvider onBack={handleBackToHome} />}
      {showEditProducts && <EditProducts onBack={handleBackToHome} />}
      {showEditCategories && <EditCategories onBack={handleBackToHome} />}
      {showEditProviders && <EditProviders onBack={handleBackToHome} />}
      {showProvidersView && <ProvidersView onBack={handleBackToHome} />}
      {showCategoriesView && <CategoriesView onBack={handleBackToHome} />}
      {showHistory && <PurchaseHistory historial={historial} onBack={handleBackToHome} />}
      {showCart && (
        <CartView
          cart={cart}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          onPay={handlePay}
          onBack={handleBackToHome}
        />
      )}
      {!showCart && !showHistory && !showAddProduct && !showAddCategory && !showAddProvider && !showEditProducts && !showEditCategories && !showEditProviders && !showProvidersView && !showCategoriesView && (
        <>
          {isAdmin && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', margin: '2rem 2rem 1.5rem 0' }}>
              <button
                style={{
                  background: '#FFD600',
                  color: '#222',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.7rem 1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                onClick={() => setShowAddProduct(true)}
              >
                + Agregar producto
              </button>
              <button
                style={{
                  background: '#0071ce',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.7rem 1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                onClick={() => setShowEditProducts(true)}
              >
                Editar productos
              </button>
            </div>
          )}
          <SearchBar value={busqueda} onChange={setBusqueda} onSearch={handleSearch} />
          <ProductList productos={productosFiltrados} onAddToCart={handleAddToCart} />
        </>
      )}
    </div>
  );
}

export default App;

