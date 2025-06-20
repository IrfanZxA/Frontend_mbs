import React from 'react';

const ManajemenSiswa = ({ isSidebarOpen }) => {
  return (
    <div
      style={{
        padding: '20px',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <h2>Manajemen Siswa</h2>
      <p>Halaman ini untuk mengelola data siswa.</p>
    </div>
  );
};

export default ManajemenSiswa;
