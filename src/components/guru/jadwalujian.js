import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JadwalUjian = () => {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [kelasList, setKelasList] = useState([]);
  const [jadwalUjian, setJadwalUjian] = useState([]);

  // Ambil daftar kelas dari backend
  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/kelas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setKelasList(res.data);
      } catch (err) {
        console.error('Gagal ambil data kelas:', err);
      }
    };

    fetchKelas();
  }, []);

  // Ambil jadwal ujian berdasarkan kelas yang dipilih
  useEffect(() => {
    if (!selectedKelas) return;

    const fetchJadwalUjian = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/guru/jadwal-ujian/${selectedKelas}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setJadwalUjian(res.data);
      } catch (err) {
        console.error('Gagal ambil jadwal ujian:', err);
        setJadwalUjian([]);
      }
    };

    fetchJadwalUjian();
  }, [selectedKelas]);

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
            {kelasList.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.nama_kelas}
              </option>
            ))}
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
            <tbody>
              {jadwalUjian.length === 0 ? (
                [...Array(6)].map((_, idx) => (
                  <tr key={idx}>
                    <td style={{ height: '40px' }}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              ) : (
                jadwalUjian.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.hari}</td>
                    <td>{item.jam_mulai} - {item.jam_selesai}</td>
                    <td>{item.nama_mapel}</td>
                    <td>{item.pengawas}</td>
                    <td>{item.keterangan || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalUjian;
