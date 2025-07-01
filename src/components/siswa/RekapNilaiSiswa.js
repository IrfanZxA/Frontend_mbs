import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RekapNilaiSiswa = () => {
  const { mapelId } = useParams(); // harusnya mapelId bukan kodeMapel
  const [nilaiTugas, setNilaiTugas] = useState([]);
  const [nilaiUjian, setNilaiUjian] = useState([]);

  useEffect(() => {
    const fetchNilai = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('mapelId:', mapelId);

        const response = await axios.get(`http://localhost:5000/nilai/siswa/${mapelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { tugas = [], ujian = [] } = response.data;
        setNilaiTugas(tugas);
        setNilaiUjian(ujian);
      } catch (error) {
        console.error('Gagal mengambil nilai:', error);
      }
    };

    fetchNilai();
  }, [mapelId]);

  return (
    <div className="container mt-4">
      <h2>Rekap Nilai</h2>
      <p>Menampilkan nilai untuk mata pelajaran ID: <strong>{mapelId}</strong></p>

      <div className="row mt-4">
        {/* Tabel Nilai Tugas */}
        <div className="col-md-7 mb-4">
          <div className="border p-3 rounded bg-white">
            <h6><strong>Nilai Tugas</strong></h6>
            <table className="table table-bordered mt-2">
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>No</th>
                  <th>Nama Tugas</th>
                  <th>Tanggal Pengumpulan</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                {nilaiTugas.length > 0 ? (
                  nilaiTugas.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.judul}</td>
                      <td>{item.tanggal_deadline}</td>
                      <td>{item.nilai}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center">Belum ada nilai tugas</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Nilai Ujian */}
        <div className="col-md-5 mb-4">
          <div className="border p-3 rounded bg-white">
            <h6><strong>Nilai Uts/Uas</strong></h6>
            <table className="table table-bordered mt-2">
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>No</th>
                  <th>Kategori</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                {nilaiUjian.length > 0 ? (
                  nilaiUjian.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.kategori}</td>
                      <td>{item.nilai}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="text-center">Belum ada nilai ujian</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapNilaiSiswa;
