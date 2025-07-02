import React, { useState } from 'react';

const JadwalUjian = () => {
  const [selectedKelas, setSelectedKelas] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="container-fluid">
        <h3>Jadwal Ujian</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>Informasi Jadwal Ujian & Kelas</p>

        {/* Dropdown Kelas */}
        <div className="mb-4" style={{ maxWidth: '250px' }}>
          <label>Kelas</label>
          <select
            className="form-select"
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
          >
            <option value="">Pilih Kelas</option>
            <option value="7A">7 A</option>
            <option value="7B">7 B</option>
            <option value="7C">7 C</option>
            <option value="7D">7 D</option>
          </select>
        </div>

        {/* Tabel Jadwal Ujian */}
        <div className="table-responsive">
          <table className="table table-bordered" style={{ minWidth: '600px' }}>
            <thead className="table-light text-center">
              <tr>
                <th>Hari / Tanggal</th>
                <th>Jam</th>
                <th>Mata Pelajaran</th>
                <th>Pengawas</th>
                <th>Ket</th>
              </tr>
            </thead>
            <tbody style={{ height: '200px' }}>
              {/* 6 baris kosong seperti pada gambar */}
              {[...Array(6)].map((_, idx) => (
                <tr key={idx}>
                  <td style={{ height: '40px' }}></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalUjian;
