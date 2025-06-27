// MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [profil, setProfil] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      try {
        const response = await fetch(`http://localhost:5000/${role}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setProfil(data);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
      }
    };

    fetchProfile();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const pathRole = location.pathname.split('/')[1]; // ambil segmen pertama path: /admin/xxx → admin
    const validRoles = ['admin', 'siswa', 'guru'];
    
    if (!validRoles.includes(pathRole)) {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

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

      {/* Konten Utama */}
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
