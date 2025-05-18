import React from 'react';

function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '60%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px 0 0 4px', outline: 'none' }}
      />
      <button
        className="btn"
        onClick={onSearch}
        style={{ background: '#002d62', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;