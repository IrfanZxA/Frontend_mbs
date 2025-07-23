import React from 'react';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini


const Header = ({ toggleSidebar, profil }) => {
  const navigate = useNavigate();
  const getNamaLengkap = (profil) => {
    if (!profil) return 'Profil';
    if (profil.nama_lengkap) return profil.nama_lengkap;
    if (profil.admin?.nama_lengkap) return profil.admin.nama_lengkap;
    if (profil.guru?.nama_lengkap) return profil.guru.nama_lengkap;
    if (profil.siswa?.nama_lengkap) return profil.siswa.nama_lengkap;
    if (profil.orang_tua?.nama_lengkap) return profil.orang_tua.nama_lengkap;
    return 'Profil';
  };

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
      {/* Kiri: Tombol Hamburger */}
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
      <div className="d-flex align-items-center"
               style={{ cursor: 'pointer' }}
         onClick={() => navigate('/admin/profil')}
         >
        <img
          src="/images/logo-profile.png"
          alt="Profil"
          height="30"
          className="me-2"
          style={{ borderRadius: '50%' }}
        />
        <span className="fw-semibold">
          {getNamaLengkap(profil)}
        </span>
      </div>
    </header>
  );
};

export default Header;
