import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const roleFromPath = currentPath.split('/')[1];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSiswaDropdownOpen, setIsSiswaDropdownOpen] = useState(false);
  const [isGuruDropdownOpen, setIsGuruDropdownOpen] = useState(false);
  const [isMateriDropdownOpen, setIsMateriDropdownOpen] = useState(false);
  const [isTugasDropdownOpen, setIsTugasDropdownOpen] = useState(false);
  const [isJadwalDropdownOpen, setIsJadwalDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSiswaDropdownOpen(false);
    setIsGuruDropdownOpen(false);
  };

  const toggleSiswaDropdown = (e) => {
    e.stopPropagation();
    setIsSiswaDropdownOpen(prev => !prev);
  };

  const toggleGuruDropdown = (e) => {
    e.stopPropagation();
    setIsGuruDropdownOpen(prev => !prev);
  };

  const toggleMateriDropdown = (e) => {
    e.stopPropagation();
    setIsMateriDropdownOpen(prev => !prev);
  };

  const toggleTugasDropdown = (e) => {
    e.stopPropagation();
    setIsTugasDropdownOpen(prev => !prev);
  };

  const toggleJadwalDropdown = (e) => {
    e.stopPropagation();
    setIsJadwalDropdownOpen(prev => !prev);
  };

  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    backgroundColor: '#ffffff',
    transition: 'margin-left 0.3s ease',
    marginLeft: isOpen ? '0' : '-250px',
    padding: '1rem',
    flexShrink: 0,
    borderRight: '1px solid #ddd',
    color: '#000',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    paddingTop: '60px',
  };

  return (
    <>
      <style>{`
        .sidebar-item {
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease, color 0.2s ease;
          cursor: pointer;
          color: inherit;
        }

        .sidebar-item:hover {
          background-color: #2471AE;
          color: white;
        }

        .sidebar-subitem {
          font-size: 14px;
          margin-top: 5px;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 4px;
        }

        .sidebar-subitem:hover {
          background-color: #eee;
        }
      `}</style>

      <div style={sidebarStyle}>
        <ul className="list-unstyled">

          {/* === ADMIN SIDEBAR === */}
          {roleFromPath === 'admin' && (
            <>
              <li className="sidebar-item" onClick={() => navigate('/admin/dashboard-akademik')}>Akademik</li>
              <li className="sidebar-item" onClick={toggleDropdown}>Manajemen Akademik</li>
              {isDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/EditorAkademik')}>Editor Akademik</li>
                  <li className="sidebar-subitem" onClick={toggleSiswaDropdown}>Manajemen Siswa</li>
                  {isSiswaDropdownOpen && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/ManajemenSiswa/TambahSiswaBaru')}>Tambah Siswa</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/ManajemenSiswa/EditBiodataSiswa')}>Edit Biodata</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/ManajemenSiswa/NonaktifkanAkun')}>Nonaktifkan Akun</li>
                    </ul>
                  )}
                  <li className="sidebar-subitem" onClick={toggleGuruDropdown}>Manajemen Guru</li>
                  {isGuruDropdownOpen && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/ManajemenGuru/TambahDataGuru')}>Tambah Data Guru</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/ManajemenGuru/EditJadwalGuru')}>Edit Jadwal Guru</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/admin/ManajemenAkademik/ManajemenGuru/HapusGuruKeluar')}>Hapus Guru Keluar</li>
                    </ul>
                  )}
                </ul>
              )}
              <li className="sidebar-item" onClick={() => navigate('/admin/admin-penilaian')}>Penilaian</li>
              <li className="sidebar-item" onClick={() => navigate('/admin/admin-presensi')}>Presensi</li>
              <li className="sidebar-item" onClick={() => navigate('/admin/admin-pengaturan')}>Pengaturan</li>
            </>
          )}

          {/* === SISWA === */}
          {roleFromPath === 'siswa' && (
            <>
              <li className="sidebar-item" onClick={() => navigate('/siswa/dashboard')}>Akademik</li>
              <li className="sidebar-item" onClick={toggleDropdown}>Manajemen Akademik</li>
              {isDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/siswa/kelas')}>Kelas</li>
                  <li className="sidebar-subitem" onClick={() => navigate('/siswa/materi')}>Materi</li>
                </ul>
              )}
              <li className="sidebar-item" onClick={() => navigate('/siswa/penilaian')}>Penilaian</li>
              <li className="sidebar-item" onClick={() => navigate('/siswa/presensi')}>Presensi</li>
              <li className="sidebar-item" onClick={() => navigate('/siswa/pengaturan')}>Pengaturan</li>
            </>
          )}

          {/* === GURU === */}
          {roleFromPath === 'guru' && (
            <>
              <li className="sidebar-item" onClick={() => navigate('/guru/akademik')}>Akademik</li>
              <li className="sidebar-item" onClick={toggleDropdown}>Manajemen Akademik</li>
              {isDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/guru/manajemenakademik/absensi')}>Absensi</li>
                  <li className="sidebar-subitem" onClick={() => navigate('/guru/manajemenakademik/penilaian')}>Penilaian</li>
                </ul>
              )}
              <li className="sidebar-item" onClick={toggleMateriDropdown}>Materi & Tugas</li>
              {isMateriDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/guru/materi&tugas/materi')}>Materi</li>
                  <li className="sidebar-subitem" onClick={toggleTugasDropdown}>Tugas</li>
                  {isTugasDropdownOpen && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li className="sidebar-subitem" onClick={() => navigate('/guru/materi&tugas/buattugasbaru')}>Buat Tugas Baru</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/guru/materi&tugas/pengumpulan')}>Pengumpulan</li>
                    </ul>
                  )}
                </ul>
              )}
              <li className="sidebar-item" onClick={toggleJadwalDropdown}>Jadwal</li>
              {isJadwalDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/guru/jadwal/jadwalmengajar')}>Jadwal Mengajar</li>
                  <li className="sidebar-subitem" onClick={() => navigate('/guru/jadwal/jadwalujian')}>Jadwal Ujian</li>
                </ul>
              )}
              <li className="sidebar-item" onClick={() => navigate('/guru/pengaturan')}>Pengaturan</li>
            </>
          )}

        </ul>
      </div>
    </>
  );
};

export default Sidebar;