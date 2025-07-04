// MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [profil, setProfil] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Ambil role dan token dari localStorage
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // ✅ Validasi akses halaman sesuai role
  useEffect(() => {
    const validRoles = ['admin', 'siswa', 'guru'];
    const pathRole = location.pathname.split('/')[1]; // ex: /guru/materi-tugas => "guru"

    // Kalau role ga cocok dengan path atau token kosong
    if (!token || !validRoles.includes(role) || role !== pathRole) {
      localStorage.clear();
      navigate('/login');
    }
  }, [location.pathname, navigate, role, token]);

  // ✅ Fetch profil pengguna sesuai role
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !role) return;

      try {
        const response = await fetch(`http://localhost:5000/${role}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          navigate('/login');
          return;
        }

        const data = await response.json();
        setProfil(data);
      } catch (error) {
        console.error('Gagal ambil profil:', error);
        localStorage.clear();
        navigate('/login');
      }
    };

    fetchProfile();
  }, [role, token, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Header toggleSidebar={toggleSidebar} profil={profil} />
      </div>

      {/* Konten */}
      <div
        style={{
          paddingLeft: isSidebarOpen ? '250px' : '0',
          paddingTop: '64px',
          paddingRight: '1rem',
          paddingBottom: '1rem',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          transition: 'padding-left 0.3s ease',
        }}
      >
        <Outlet context={{ isSidebarOpen }} />
      </div>
    </div>
  );
};

export default MainLayout;
