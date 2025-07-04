import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const GuruAkademik = () => {
  const { isSidebarOpen } = useOutletContext();
  const [jumlahKelas, setJumlahKelas] = useState(0);
  const [jumlahSiswa, setJumlahSiswa] = useState(0);
  const [rataRataNilai, setRataRataNilai] = useState([]);
  const [jadwalHariIni, setJadwalHariIni] = useState([]);

  const chartData = {
    labels: rataRataNilai.map((item) => item.nama_kelas),
    datasets: [
      {
        label: 'Rata - Rata Nilai',
        data: rataRataNilai.map((item) => item.rata_rata),
        backgroundColor: '#4C9AFF',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        display: false,
      },
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchJumlahKelas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/guru/jumlah-kelas-hari-ini", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJumlahKelas(res.data.jumlah_kelas);
      } catch (err) {
        console.error("Gagal ambil jumlah kelas:", err);
      }
    };

    const fetchJumlahSiswa = async () => {
      try {
        const res = await axios.get("http://localhost:5000/guru/siswa-aktif", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJumlahSiswa(res.data.total_siswa);
      } catch (err) {
        console.error("Gagal ambil jumlah siswa:", err);
      }
    };

    const fetchRataRataNilai = async () => {
      try {
        const res = await axios.get("http://localhost:5000/guru/rata-rata-nilai", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRataRataNilai(res.data);
      } catch (err) {
        console.error("Gagal ambil rata-rata nilai:", err);
      }
    };

    const fetchJadwalHariIni = async () => {
      try {
        const res = await axios.get("http://localhost:5000/guru/jadwal-harian", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJadwalHariIni(res.data);
      } catch (err) {
        console.error("Gagal ambil jadwal harian:", err);
      }
    };

    fetchJumlahKelas();
    fetchJumlahSiswa();
    fetchRataRataNilai();
    fetchJadwalHariIni();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h4>Dashboard</h4>
      <p>Selamat Datang, Guru</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <img src="/images/logo-guru.png" alt="Guru" style={{ width: '80px', margin: '0 auto' }} />
            <h4 className="mt-3">{jumlahKelas}</h4>
            <p>Kelas</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <img src="/images/logo-murid.png" alt="Murid" style={{ width: '80px', margin: '0 auto' }} />
            <h4 className="mt-3">{jumlahSiswa}</h4>
            <p>Siswa Aktif</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Statistik nilai</h5>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Jadwal Mengajar Hari Ini</h5>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Kelas</th>
              <th>Mata Pelajaran</th>
            </tr>
          </thead>
          <tbody>
            {jadwalHariIni.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">Tidak ada jadwal hari ini</td>
              </tr>
            ) : (
              jadwalHariIni.map((jadwal, index) => (
                <tr key={index}>
                  <td>{jadwal.jam_mulai} - {jadwal.jam_selesai}</td>
                  <td>{jadwal.nama_kelas}</td>
                  <td>{jadwal.nama_mapel}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuruAkademik;
