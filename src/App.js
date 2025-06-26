import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Komponen Login
import LoginForm from './components/login/LoginForm';

// Layout guru
import GuruAkademik from './components/guru/GuruAkademik';
import GuruAbsensi from './components/guru/GuruAbsensi';
import GuruPenilaian from './components/guru/GuruPenilaian';
import GuruMateri from './components/guru/GuruMateri';
import GuruTugas from './components/guru/GuruTugas';
import GuruJadwalMengajar from './components/guru/GuruJadwalMengajar';
import GuruPengaturan from './components/guru/GuruPengaturan';

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
        <Route path="/login" element={<LoginForm />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <DashboardAkademik isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/dashboard-akademik"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <DashboardAkademik isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/ManajemenAkademik/EditorAkademik"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <EditorAkademik isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/ManajemenAkademik/ManajemenSiswa"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <ManajemenSiswa isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/ManajemenAkademik/ManajemenGuru"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <ManajemenGuru isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/ManajemenAkademik/ManajemenSiswa/TambahSiswaBaru"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <TambahSiswaBaru isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/ManajemenAkademik/ManajemenSiswa/EditBiodataSiswa"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <EditBiodataSiswa isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />
        <Route
          path="/admin/ManajemenAkademik/ManajemenSiswa/NonaktifkanAkun"
          element={
            <WithLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
              <NonaktifkanAkun isSidebarOpen={isSidebarOpen} />
            </WithLayout>
          }
        />

        {/* Siswa */}
        <Route path="/siswa" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelas" element={<DashboardKelas />} />
          <Route path="materi" element={<DashboardMateri />} />
          <Route path="bahasa-indonesia" element={<BahasaIndonesia />} />
          <Route path="materi/:id" element={<DetailMateri />} />
          <Route path="tugas/:id" element={<DetailTugas />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        {/* Guru: gunakan MainLayout agar sidebar & konten responsif */}
        <Route path="/guru" element={<MainLayout />}>
          <Route path="akademik" element={<GuruAkademik />} />
          <Route path="manajemenakademik/absensi" element={<GuruAbsensi />} />
          <Route path="manajemenakademik/penilaian" element={<GuruPenilaian />} />
          <Route path="materi&tugas/materi" element={<GuruMateri />} />
          <Route path="materi&tugas/tugas" element={<GuruTugas />} />
          <Route path="jadwal" element={<GuruJadwalMengajar />} />
          <Route path="pengaturan" element={<GuruPengaturan />} />
          <Route index element={<Navigate to="akademik" />} />
        </Route>

        {/* Default: redirect semua ke login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
