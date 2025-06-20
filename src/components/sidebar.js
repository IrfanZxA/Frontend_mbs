// src/components/sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSiswaDropdownOpen, setIsSiswaDropdownOpen] = useState(false);

  const role = localStorage.getItem('role'); // ✅ gunakan 'role' agar konsisten

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSiswaDropdown = (e) => {
    e.stopPropagation();
    setIsSiswaDropdownOpen(!isSiswaDropdownOpen);
  };

 const sidebarStyle = {
  width: '250px',
  height: '100vh',
  backgroundColor: '#ffffff', // sudah putih untuk semua role
  transition: 'margin-left 0.3s ease',
  marginLeft: isOpen ? '0' : '-250px',
  padding: '1rem',
  flexShrink: 0,
  borderRight: '1px solid #ddd',
  color: '#000', // teks hitam untuk semua role
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  paddingTop: '60px',
};


  if (!role) return null; // jika belum login, jangan tampilkan sidebar

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
          {role === 'admin' && (
            <>
              <li className="sidebar-item" onClick={() => navigate('/dashboard-akademik')}>
                Akademik
              </li>
              <li className="sidebar-item" onClick={toggleDropdown}>
                Manajemen Akademik
              </li>
              {isDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/EditorAkademik')}>
                    Editor Akademik
                  </li>
                  <li className="sidebar-subitem" onClick={toggleSiswaDropdown}>
                    Manajemen Siswa
                  </li>
                  {isSiswaDropdownOpen && (
                    <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                      <li className="sidebar-subitem" onClick={() => navigate('/TambahSiswaBaru')}>Tambah Siswa</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/EditBiodataSiswa')}>Edit Biodata</li>
                      <li className="sidebar-subitem" onClick={() => navigate('/NonaktifkanAkun')}>Nonaktifkan Akun</li>
                    </ul>
                  )}
                  <li className="sidebar-subitem" onClick={() => navigate('/ManajemenGuru')}>
                    Manajemen Guru
                  </li>
                </ul>
              )}
            </>
          )}

          {/* === SISWA SIDEBAR === */}
          {role === 'siswa' && (
            <>
              <li className="sidebar-item" onClick={() => navigate('/siswa/dashboard')}>
                Akademik
              </li>
              <li className="sidebar-item" onClick={toggleDropdown}>
                Manajemen Akademik
              </li>
              {isDropdownOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                  <li className="sidebar-subitem" onClick={() => navigate('/siswa/kelas')}>Kelas</li>
                  <li className="sidebar-subitem" onClick={() => navigate('/siswa/materi')}>Materi</li>
                </ul>
              )}
            </>
          )}

          {/* === GLOBAL MENU === */}
          <li className="sidebar-item">Penilaian</li>
          <li className="sidebar-item">Presensi</li>
          <li className="sidebar-item">Pengaturan</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
