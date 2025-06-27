import React from 'react';

const Header = ({ toggleSidebar, profil }) => {
  return (
    <header
      className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        height: '55px',
        width: '100%',
        
        flexShrink: 0,
      }}
    >
      {/* Kiri: Tombol Hamburger dan Judul */}
      <div className="d-flex align-items-center">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #888',
            color: '#333',
            padding: '2px 8px',
            borderRadius: '6px',
            fontSize: '20px',
            marginRight: '16px',
            cursor: 'pointer',
          }}
        >
          &#9776;
        </button>
        
      </div>

      {/* Tengah: Logo */}
      <div>
        <img src="/images/ppm-prambanan.png" alt="Logo PPM" height="28" />
      </div>

      {/* Kanan: Profil */}
      <div className="d-flex align-items-center">
        <img
          src="/images/logo-profile.png"
          alt="Profil"
          height="30"
          className="me-2"
          style={{ borderRadius: '50%' }}
        />
        <span className="fw-semibold">
  {profil?.admin?.nama_lengkap || profil?.guru?.nama_lengkap || profil?.siswa?.nama_lengkap || 'Profil'}
</span>
      </div>
    </header>
  );
};

export default Header;
