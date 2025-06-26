import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useOutletContext } from 'react-router-dom';

const GuruAkademik = () => {
  const { isSidebarOpen } = useOutletContext(); // Masih bisa digunakan jika dibutuhkan

  const chartData = {
    labels: ['1A', '1B', '1C', '1D'],
    datasets: [
      {
        label: 'Rata - Rata Nilai',
        data: [30, 50, 70, 60],
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

  return (
    <div className="container-fluid mt-4">
      <h4>Dashboard</h4>
      <p>Selamat Datang, Guru</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <img src="/images/logo-guru.png" alt="Guru" style={{ width: '80px', margin: '0 auto' }} />
            <h4 className="mt-3">5</h4>
            <p>Kelas</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <img src="/images/logo-murid.png" alt="Murid" style={{ width: '80px', margin: '0 auto' }} />
            <h4 className="mt-3">120</h4>
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
        <h5>Jadwal Mengajar Harian, Rabu 23 - Mei - 2025</h5>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Kelas</th>
              <th>Mata Pelajaran</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>07.00 - 09.00</td><td>1 A</td><td>Matematika</td></tr>
            <tr><td>09.00 - 11.00</td><td>1 A</td><td>Matematika</td></tr>
            <tr><td>12.00 - 13.00</td><td>1 A</td><td>Matematika</td></tr>
            <tr><td>13.30 - 14.30</td><td>1 A</td><td>Matematika</td></tr>
            <tr><td>14.30 - 15.30</td><td>1 A</td><td>Matematika</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuruAkademik;
