import React, { useState, useEffect } from 'react';
import CardBox from './cardbox';
import Sidebar from '../sidebar';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const [profil, setProfil] = useState(null);
  const [tugas, setTugas] = useState([]);
  const [jadwalHariIni, setJadwalHariIni] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${role}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setProfil(data);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
      }
    };

    const fetchTugas = async () => {
      try {
        const response = await fetch('http://localhost:5000/siswa/tugas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setTugas(data);
      } catch (error) {
        console.error('Gagal mengambil data tugas:', error);
      }
    };

    const fetchJadwal = async () => {
      try {
        const response = await fetch("http://localhost:5000/siswa/jadwal-hari-ini", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setJadwalHariIni(data);
      } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
      }
    };

    fetchProfile();
    fetchTugas();
    fetchJadwal();
  }, []);

  return (
    <div className="d-flex">
      <div className="p-4" style={{ flexGrow: 1, backgroundColor: '#f9f9f9' }}>
        <h5>Selamat Datang</h5>

        <div className="row mb-4">
          <div className="col-md-8">
            <div className="bg-white d-flex justify-content-between align-items-center p-4 rounded shadow-sm h-100">
              <div>
                <h5 className="fw-bold">Hallo {profil?.nama_lengkap || '...'}</h5>
                <p className="text-muted">
                  Kami di sini untuk mendukung Anda dalam perjalanan belajar Anda.
                </p>
              </div>
              <img src="/images/human-sitting.png" alt="Human Illustration" height="120" />
            </div>
          </div>
          <div className="col-md-4">
            <CardBox title="Kalender" icon="calendar3">
              <div className="d-flex justify-content-around mb-2">
                <i className="bi bi-calendar-event fs-4 text-primary"></i>
                <i className="bi bi-calendar-check fs-4 text-success"></i>
                <i className="bi bi-calendar-x fs-4 text-danger"></i>
              </div>
              <div className="text-center">
                <strong>September 2025</strong>
                <p className="mb-0">3 | 4 | 13</p>
              </div>
            </CardBox>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <CardBox title="Pengingat Tugas & Ujian" icon="clipboard-check-fill">
              <ul className="ps-3 small">
                {tugas.length === 0 ? (
                  <li className="text-muted">Tidak ada tugas saat ini</li>
                ) : (
                  tugas.map((item, index) => (
                    <li key={index}>
                      <i className="bi bi-journal-text me-2 text-primary"></i>
                      {item.judul} - <span className="text-muted">{item.tanggal_deadline}</span>
                    </li>
                  ))
                )}
              </ul>
            </CardBox>
          </div>

          <div className="col-md-4 mb-4">
            <CardBox title="Jadwal Pelajaran Hari Ini" icon="clock-fill">
              <ul className="ps-3 small">
                {Array.isArray(jadwalHariIni) && jadwalHariIni.length === 0 ? (
                  <li className="text-muted">Tidak ada jadwal hari ini</li>
                ) : (
                  jadwalHariIni.map((item, index) => (
                    <li key={index}>
                      <i className="bi bi-clock me-2 text-info"></i>
                      {item.nama_mapel}: {item.jam_mulai.slice(0, 5)} - {item.jam_selesai.slice(0, 5)}
                    </li>
                  ))
                )}
              </ul>
            </CardBox>
          </div>

          <div className="col-md-4 mb-4">
            <CardBox title="Timeline Akademik" icon="journal-text">
              <div className="small">
                <p className="mb-1"><strong>September</strong></p>
                <ul className="ps-3">
                  <li>
                    <i className="bi bi-star-fill text-warning me-2"></i>
                    Guru Sejarah: Silahkan baca bab 3
                  </li>
                  <li>
                    <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                    Tugas Biologi: dikumpulkan besok!
                  </li>
                </ul>
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
