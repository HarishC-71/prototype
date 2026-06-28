import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar glass">
      <div style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>
        ProApp
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span>Welcome, <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user?.name || 'User'}</span></span>
        <button onClick={logout} className="btn btn-danger btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
