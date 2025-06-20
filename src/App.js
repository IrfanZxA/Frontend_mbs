import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Komponen Login
import LoginForm from './components/login/LoginForm';

// Layout siswa
import MainLayout from './components/MainLayout';
import Dashboard from './components/siswa/dashboard';
import DashboardKelas from './components/siswa/dashboard-kelas';
import DashboardMateri from './components/siswa/dashboard-materi';
import BahasaIndonesia from './components/siswa/BahasaIndonesia';
import DetailMateri from './components/siswa/DetailMateri';
import DetailTugas from './components/siswa/DetailTugas';

// Layout admin
import Sidebar from './components/sidebar';
import Header from './components/header';
import DashboardAkademik from './components/admin/dashboard-akademik';
import EditorAkademik from './components/admin/EditorAkademik';
import ManajemenSiswa from './components/admin/ManajemenSiswa';
import ManajemenGuru from './components/admin/ManajemenGuru';
import TambahSiswaBaru from './components/admin/TambahSiswaBaru';
import EditBiodataSiswa from './components/admin/EditBiodataSiswa';
import NonaktifkanAkun from './components/admin/NonaktifkanAkun';

// Layout wrapper untuk admin
const WithLayout = ({ children, toggleSidebar, isSidebarOpen }) => (
  <div className="d-flex">
    <Sidebar isOpen={isSidebarOpen} />
    <div className="flex-grow-1">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      {children}
    </div>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Halaman Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Admin: route awal saat login sebagai admin */}
        <Route
          path="/admin"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <DashboardAkademik isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />

        {/* Admin: halaman-halaman lain */}
        <Route
          path="/dashboard-akademik"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <DashboardAkademik isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/EditorAkademik"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <EditorAkademik isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/ManajemenSiswa"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <ManajemenSiswa isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/ManajemenGuru"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <ManajemenGuru isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/TambahSiswaBaru"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <TambahSiswaBaru isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/EditBiodataSiswa"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <EditBiodataSiswa isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/NonaktifkanAkun"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <NonaktifkanAkun isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />

        {/* Siswa: layout dengan nested routes */}
        <Route path="/siswa" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelas" element={<DashboardKelas />} />
          <Route path="materi" element={<DashboardMateri />} />
          <Route path="bahasa-indonesia" element={<BahasaIndonesia />} />
          <Route path="materi/:id" element={<DetailMateri />} />
          <Route path="tugas/:id" element={<DetailTugas />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        {/* Default: redirect semua ke login */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
