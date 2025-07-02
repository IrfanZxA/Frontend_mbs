import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


const BuatTugasBaru = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '1.5rem' }}>Buat Tugas Baru</h4>

      <div className="mb-3">
        <label>Judul</label>
        <input type="text" className="form-control" placeholder="Judul" />
      </div>

      <div className="mb-3">
        <label>Deskripsi</label>
        <textarea className="form-control" rows="3" placeholder="Deskripsi" />
      </div>

      <div className="mb-3">
        <label>Lampiran (Opsional)</label>
        <div
          className="p-3 mt-2 border rounded d-flex justify-content-end gap-2"
          style={{ backgroundColor: '#f9f9f9' }}
        >
          <button className="btn btn-light border" title="Google Drive">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
              alt="Drive"
              width={20}
            />
          </button>
          <button className="btn btn-light border" title="Unggah File">
            <i className="bi bi-upload"></i>
          </button>
          <button className="btn btn-light border" title="Tambahkan Link">
            <i className="bi bi-link-45deg"></i>
          </button>
          
        </div>
      </div>

      <div className="mb-3">
        <label>Poin</label>
        <input type="number" className="form-control" placeholder="Poin" />
      </div>

      <div className="mb-3">
        <label>Kelas</label>
        <select className="form-select">
          <option value="">Pilih Kelas</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Tenggat</label>
        <input type="date" className="form-control" />
      </div>

      <button className="btn btn-primary" disabled>Tugaskan</button>
    </div>
  );
};

export default BuatTugasBaru;
