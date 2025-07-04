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
        setTugas(Array.isArray(data) ? data : data.data); // ⬅️ ambil .data jika perlu
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

  const [currentDate, setCurrentDate] = useState(new Date());
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const renderCalendar = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
  const lastDate = new Date(year, month + 1, 0).getDate();

  const calendar = [];
  let day = 1 - ((firstDayIndex + 6) % 7); // Adjust so Monday is first

  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if (day > 0 && day <= lastDate) {
        const isToday = new Date().getDate() === day &&
          new Date().getMonth() === month &&
          new Date().getFullYear() === year;
        row.push(
          <td key={j}>
            <div style={isToday ? styles.dayActive : styles.day}>
              {day.toString().padStart(2, '0')}
            </div>
          </td>
        );
      } else {
        row.push(<td key={j}></td>);
      }
      day++;
    }
    calendar.push(<tr key={i}>{row}</tr>);
  }
  return calendar;
};

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
              <div style={styles.container}>
                <div style={styles.header}>
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} style={styles.navButton}>
                    &lt;
                  </button>
                  <strong>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</strong>
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} style={styles.navButton}>
                    &gt;
                  </button>
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderCalendar()}
                  </tbody>
                </table>
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

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '0 12px'
  },
  navButton: {
    border: 'none',
    backgroundColor: '#eee',
    borderRadius: '4px',
    padding: '2px 8px',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  day: {
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    margin: 'auto',
    lineHeight: '28px'
  },
  dayActive: {
    backgroundColor: '#b00020',
    color: '#fff',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    margin: 'auto',
    lineHeight: '28px',
    fontWeight: 'bold'
  },
  muted: {
    color: '#ccc'
  }
};

export default Dashboard;
