import React, { useState } from 'react';

const TambahDataGuru = () => {
  const [showNotif, setShowNotif] = useState(false);

  const handleSimpan = () => {
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000); // hilang setelah 3 detik
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', maxWidth: '500px', position: 'relative' }}>
      <h5 className="mb-4">Manajemen Guru</h5>
      <h6 className="mb-3">➕ Tambah Data Guru</h6>

      <div className="mb-3">
        <label>Nama Lengkap</label>
        <input type="text" className="form-control" placeholder="Nama Lengkap" />
      </div>

      <div className="mb-3">
        <label>NIP / NIK</label>
        <input type="text" className="form-control" placeholder="NIP / NIK" />
      </div>

      <div className="mb-3">
        <label>Mata Pelajaran</label>
        <input type="text" className="form-control" placeholder="Mata Pelajaran" />
      </div>

      <div className="mb-3">
        <label>Jadwal Mengajar</label>
        <input type="text" className="form-control" placeholder="Jadwal Mengajar" />
      </div>

      <div className="mb-3">
        <label>Jenis Kelamin</label>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="laki" />
          <label className="form-check-label" htmlFor="laki">Laki - laki</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" id="perempuan" />
          <label className="form-check-label" htmlFor="perempuan">Perempuan</label>
        </div>
      </div>

      <div className="mb-3">
        <label>Nomor Telepon</label>
        <input type="text" className="form-control" placeholder="Nomor Telepon" />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" placeholder="Email" />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-light border">Reset</button>
        <button className="btn btn-primary" onClick={handleSimpan}>Simpan</button>
      </div>

      {/* Notifikasi */}
      {showNotif && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d6efff', // biru muda
    color: '#000',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-in-out'
  }}>
    <span style={{ fontSize: '20px' }}>✅</span>
    <span>Perubahan berhasil disimpan</span>
  </div>
)}

          
    </div>
  );
};

export default TambahDataGuru;
