import React from 'react';
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
import BuatTugasBaru from './components/guru/buattugasbaru';
import Pengumpulan from './components/guru/pengumpulan';
import JadwalMengajar from './components/guru/jadwalmengajar';
import JadwalUjian from './components/guru/jadwalujian';

// Layout siswa
import MainLayout from './components/MainLayout';
import Dashboard from './components/siswa/dashboard';
import DashboardKelas from './components/siswa/dashboard-kelas';
import DashboardMateri from './components/siswa/dashboard-materi';
import BahasaIndonesia from './components/siswa/BahasaIndonesia';
import DetailMateri from './components/siswa/DetailMateri';
import DetailTugas from './components/siswa/DetailTugas';
import Penilaian from './components/siswa/Penilaian';
import DashboardPresensi from './components/siswa/presensi';
import DashboardTugas from './components/siswa/DashboardTugas';
import RekapNilaiSiswa from './components/siswa/RekapNilaiSiswa';

// Layout admin
import DashboardAkademik from './components/admin/dashboard-akademik';
import EditorAkademik from './components/admin/EditorAkademik';
import ManajemenSiswa from './components/admin/ManajemenSiswa';
import TambahSiswaBaru from './components/admin/TambahSiswaBaru';
import EditBiodataSiswa from './components/admin/EditBiodataSiswa';
import NonaktifkanAkun from './components/admin/NonaktifkanAkun';
import ManajemenGuru from './components/admin/ManajemenGuru';
import AdminPenilaian from './components/admin/admin-penilaian';
import AdminPresensi from './components/admin/admin-presensi';
import AdminPengaturan from './components/admin/admin-pengaturan';
import TambahDataGuru from './components/admin/tambahdataguru';
import EditJadwalGuru from './components/admin/editjadwalguru';
import HapusGuruKeluar from './components/admin/hapusgurukeluar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginForm />} />

        {/* === Admin Layout === */}
        <Route path="/admin" element={<MainLayout />}>
          <Route path="dashboard-akademik" element={<DashboardAkademik />} />
          <Route path="ManajemenAkademik/EditorAkademik" element={<EditorAkademik />} />
          <Route path="ManajemenAkademik/ManajemenSiswa" element={<ManajemenSiswa />} />
          <Route path="ManajemenAkademik/ManajemenSiswa/TambahSiswaBaru" element={<TambahSiswaBaru />} />
          <Route path="ManajemenAkademik/ManajemenSiswa/EditBiodataSiswa" element={<EditBiodataSiswa />} />
          <Route path="ManajemenAkademik/ManajemenSiswa/NonaktifkanAkun" element={<NonaktifkanAkun />} />
          <Route path="ManajemenAkademik/ManajemenGuru" element={<ManajemenGuru />} />
          <Route path="ManajemenAkademik/ManajemenGuru/TambahDataGuru" element={<TambahDataGuru />} />
          <Route path="ManajemenAkademik/ManajemenGuru/EditJadwalGuru" element={<EditJadwalGuru />} />
          <Route path="ManajemenAkademik/ManajemenGuru/HapusGuruKeluar" element={<HapusGuruKeluar />} />
          <Route index element={<Navigate to="dashboard-akademik" />} />
          <Route path="admin-penilaian" element={<AdminPenilaian />} />
          <Route path="admin-presensi" element={<AdminPresensi />} />
          <Route path="admin-pengaturan" element={<AdminPengaturan />} />
        </Route>

        {/* === Siswa Layout === */}
        <Route path="/siswa" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelas" element={<DashboardKelas />} />
          <Route path="materi" element={<DashboardMateri />} />
          <Route path="penilaian" element={<Penilaian />} />
          <Route path="penilaian/:mapelId" element={<RekapNilaiSiswa />} />
          <Route path="presensi" element={<DashboardPresensi />} />
          <Route path="bahasa-indonesia" element={<BahasaIndonesia />} />
          <Route path="materi/:kode_mapel" element={<DetailMateri />} />
          <Route path="tugas/:id" element={<DetailTugas />} />
          <Route path="tugas" element={<DashboardTugas />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

          {/* === GURU Layout === */}
       <Route path="/guru" element={<MainLayout />}>
        <Route path="akademik" element={<GuruAkademik />} />
        <Route path="manajemenakademik/absensi" element={<GuruAbsensi />} />
        <Route path="manajemenakademik/penilaian" element={<GuruPenilaian />} />
        <Route path="materi&tugas/materi" element={<GuruMateri />} />
        <Route path="materi&tugas/tugas" element={<GuruTugas />} />
        <Route path="materi&tugas/buattugasbaru" element={<BuatTugasBaru />} />
        <Route path="materi&tugas/pengumpulan" element={<Pengumpulan />} />
        <Route path="jadwal/jadwalmengajar" element={<JadwalMengajar />} />
        <Route path="jadwal/jadwalujian" element={<JadwalUjian />} />
        <Route path="pengaturan" element={<GuruPengaturan />} />
        <Route index element={<Navigate to="akademik" />} />
      </Route>



        {/* Default redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
