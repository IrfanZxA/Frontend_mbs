import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Pengumpulan = () => {
  const { tugasId } = useParams();
  console.log("Tugas ID dari URL:", tugasId);

  const [pengumpulan, setPengumpulan] = useState([]);
  const [kelasList, setKelasList] = useState([]);

  const [filterJudul, setFilterJudul] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Ambil data kelas untuk dropdown
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
        console.error('Gagal ambil data kelas', err);
      }
    };
    fetchKelas();
  }, []);

  // Ambil data pengumpulan tugas
  useEffect(() => {
    const fetchPengumpulan = async () => {
      if (!tugasId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/guru/tugas/${tugasId}/pengumpulan`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log("Data pengumpulan dari backend:", res.data);
        setPengumpulan(res.data);
      } catch (err) {
        console.error('Gagal fetch pengumpulan', err);
        if (err.response) {
          console.log("Status:", err.response.status);
          console.log("Data:", err.response.data);
        }
      }
    };

    fetchPengumpulan();
  }, [tugasId]);

  const filteredData = pengumpulan.filter((item) => {
    const matchJudul = filterJudul === '' || item.judul?.toLowerCase().includes(filterJudul.toLowerCase());
    const matchKelas = filterKelas === '' || item.nama_kelas === filterKelas;
    const matchStatus = filterStatus === '' ||
      (filterStatus === 'sudah' && item.file_url) ||
      (filterStatus === 'belum' && !item.file_url);
    return matchJudul && matchKelas && matchStatus;
  });

  // 🔍 Debug log
  useEffect(() => {
    console.log("Filtered data:", filteredData);
  }, [filteredData]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h5 className="mb-3">Pengumpulan</h5>

      {/* Filter Form */}
      <div className="d-flex gap-2 mb-3 flex-wrap align-items-end">
        <div>
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            placeholder="Judul"
            value={filterJudul}
            onChange={(e) => setFilterJudul(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Kelas</label>
          <select
            className="form-select"
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
          >
            <option value="">Pilih</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id} value={kelas.nama_kelas}>
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Status Pengumpulan</label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Pilih</option>
            <option value="sudah">Sudah</option>
            <option value="belum">Belum</option>
          </select>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setFilterJudul('');
            setFilterKelas('');
            setFilterStatus('');
          }}
          disabled={!filterJudul && !filterKelas && !filterStatus}
        >
          Reset
        </button>
      </div>

      {/* Tabel Pengumpulan */}
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Judul</th>
            <th>Status</th>
            <th>Tanggal Upload</th>
            <th>File</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">Tidak ada data pengumpulan</td>
            </tr>
          ) : (
            filteredData.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.nama_lengkap}</td>
                <td>{item.nama_kelas}</td>
                <td>{item.judul ?? '-'}</td>
                <td>{item.file_url ? 'Sudah' : 'Belum'}</td>
                <td>
                  {item.tanggal_kumpul
                    ? new Date(item.tanggal_kumpul).toLocaleString('id-ID')
                    : '-'}
                </td>
                <td>
                  {item.file_url ? (
                    <a
                      className="btn btn-sm btn-outline-primary"
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat File
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td>{item.nilai ?? '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Tombol Aksi */}
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
