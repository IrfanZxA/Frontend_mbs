import React, { useState } from 'react';
import CardBox from './cardbox';
import Sidebar from '../sidebar';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex">
      {/* ========== TOMBOL HAMBURGER DI HEADER SAJA ========== */}
      {/* Jika ingin ditampilkan di header atas, pindahkan tombol ini ke dalam Sidebar atau Header */}
      {/* <button
        className="btn btn-light position-absolute m-2"
        onClick={toggleSidebar}
        style={{ zIndex: 1000 }}
      >
        <i className="bi bi-list fs-4"></i>
      </button> */}

      {/* Sidebar */}
      {showSidebar && (
        <div className="bg-white border-end p-3" style={{ width: '200px', height: '100vh' }}>
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="p-4" style={{ flexGrow: 1, backgroundColor: '#f9f9f9' }}>
        <h5>Selamat Datang</h5>

        {/* Welcome + Calendar */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="bg-white d-flex justify-content-between align-items-center p-4 rounded shadow-sm h-100">
              <div>
                <h5 className="fw-bold">Hallo Walid.</h5>
                <p className="text-muted">
                  Kami di sini untuk mendukung Anda dalam perjalanan belajar Anda. Ikuti kelas-kelas Anda dan teruslah maju menuju tujuan Anda.
                </p>
              </div>
              <img src="/images/human-sitting.png" alt="Human Illustration" height="120" />
            </div>
          </div>
          <div className="col-md-4">
            <CardBox title="Kalender" icon="calendar3">
              {/* ICON START */}
              <div className="d-flex justify-content-around mb-2">
                <i className="bi bi-calendar-event fs-4 text-primary"></i>
                <i className="bi bi-calendar-check fs-4 text-success"></i>
                <i className="bi bi-calendar-x fs-4 text-danger"></i>
              </div>
              {/* ICON END */}
              <div className="text-center">
                <strong>September 2025</strong>
                <p className="mb-0">3 | 4 | 13</p>
              </div>
            </CardBox>
          </div>
        </div>

        {/* 3 Cards Below */}
        <div className="row">
          {/* Box Tugas & Ujian */}
          <div className="col-md-4 mb-4">
            <CardBox title="Pengingat Tugas & Ujian" icon="clipboard-check-fill">
              <ul className="ps-3 small">
                {/* ICON START */}
                <li>
                  <i className="bi bi-journal-text me-2 text-primary"></i>
                  Tugas Matematika - <span className="text-muted">3 Juli</span>
                </li>
                <li>
                  <i className="bi bi-journal-text me-2 text-success"></i>
                  Tugas Sejarah - <span className="text-muted">4 Juli</span>
                </li>
                <li>
                  <i className="bi bi-clipboard2-check-fill me-2 text-danger"></i>
                  Ujian Biologi - <span className="text-muted">13 Juli</span>
                </li>
                {/* ICON END */}
              </ul>
            </CardBox>
          </div>

          {/* Box Jadwal Pelajaran */}
          <div className="col-md-4 mb-4">
            <CardBox title="Jadwal Pelajaran Hari Ini" icon="clock-fill">
              <ul className="ps-3 small">
                {/* ICON START */}
                <li>
                  <i className="bi bi-clock me-2 text-info"></i>
                  Matematika: 07.00 - 09.00
                </li>
                <li>
                  <i className="bi bi-clock me-2 text-warning"></i>
                  Fisika: 10.00 - 12.00
                </li>
                <li>
                  <i className="bi bi-clock me-2 text-success"></i>
                  Bahasa Indonesia: 13.00 - 15.00
                </li>
                {/* ICON END */}
              </ul>
            </CardBox>
          </div>

          {/* Box Timeline Akademik */}
          <div className="col-md-4 mb-4">
            <CardBox title="Timeline Akademik" icon="journal-text">
              {/* ICON START */}
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
              {/* ICON END */}
            </CardBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
