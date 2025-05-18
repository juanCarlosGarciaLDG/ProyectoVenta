import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

function NavBar({ onCartClick, onHistoryClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Walmart</span>
        </div>
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <button className="btn" onClick={onCartClick} style={{ fontSize: 28 }}>
            <FaShoppingCart size={32} />
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn" onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: 28 }}>
              <FaUserCircle size={32} />
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '2.5rem',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                zIndex: 10,
                minWidth: 300
              }}>
                <div
                  style={{
                    padding: '0.9rem 1.5rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    color: '#222', // <-- fuerza el color oscuro
                    background: '#fff'
                  }}
                  onClick={() => { setMenuOpen(false); onHistoryClick(); }}
                >
                  Historial de compras
                </div>
                <div
                  style={{ padding: '0.9rem 1.5rem', cursor: 'pointer', color: 'red' }}
                  onClick={() => { setMenuOpen(false); onLogout(); }}
                >
                  Cerrar sesión
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;