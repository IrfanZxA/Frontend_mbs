import React from 'react';

const Pengumpulan = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h5 className="mb-3">Pengumpulan</h5>

      {/* Filter Form */}
      <div className="d-flex gap-2 mb-3 flex-wrap align-items-end">
        <div>
          <label className="form-label">Judul</label>
          <input type="text" className="form-control" placeholder="Judul" />
        </div>
        <div>
          <label className="form-label">Kelas</label>
          <select className="form-select">
            <option>Pilih</option>
            {/* Tambahkan daftar kelas jika diperlukan */}
          </select>
        </div>
        <div>
          <label className="form-label">Status Pengumpulan</label>
          <select className="form-select">
            <option>Pilih</option>
            {/* Tambahkan status jika diperlukan */}
          </select>
        </div>
        <button className="btn btn-outline-secondary">Cari</button>
      </div>

      {/* Tabel Data */}
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Status</th>
            <th>Tanggal Upload</th>
            <th>File</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
          {/* Kosongkan tabel seperti contoh */}
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td><button className="btn btn-light btn-sm">......</button></td>
              <td><button className="btn btn-light btn-sm">......</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Aksi Export */}
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-primary" disabled>
          Download semua tugas dalam Zip
        </button>
        <button className="btn btn-outline-success">
          Export Nilai ke Excel
        </button>
      </div>
    </div>
  );
};

export default Pengumpulan;
