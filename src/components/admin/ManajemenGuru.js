import React from 'react';

const ManajemenGuru = ({ isSidebarOpen }) => {
  return (
    <div
      style={{
        padding: '20px',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <h2>Manajemen Guru</h2>
      <p>Halaman ini untuk mengelola data guru.</p>
    </div>
  );
};

export default ManajemenGuru;
