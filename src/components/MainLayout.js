import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    if (!storedRole) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      {/* Sidebar tetap */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1000 }}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Header tetap di atas, menembus sidebar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Header toggleSidebar={toggleSidebar} />
      </div>

      {/* Konten utama (di bawah header, dan bergeser dari sidebar) */}
      <div
  style={{
    marginLeft: isSidebarOpen ? '250px' : '0',
    padding: '64px 1rem 1rem 1rem', // top right bottom left
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    transition: 'margin-left 0.3s ease',
  }}
>
  <Outlet />
</div>

    </div>
  );
};

export default MainLayout;
