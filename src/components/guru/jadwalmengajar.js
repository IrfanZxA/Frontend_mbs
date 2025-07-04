import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JadwalMengajar = () => {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const today = new Date();
  const currentDayName = days[today.getDay() - 1]; // 0 = Minggu

  const mapelColors = {
    Matematika: '#e1f5fe',
    IPA: '#f1f8e9',
    Bahasa: '#fce4ec',
    PKN: '#fff3e0',
    Agama: '#ede7f6',
    Olahraga: '#e0f2f1',
  };

  const [jadwalData, setJadwalData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data jadwal dari backend
  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const token = localStorage.getItem('token'); // pastikan token ada
        const res = await axios.get('http://localhost:5000/guru/jadwal', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        // Transformasi data ke bentuk: { waktu: '07.00 - 09.00', { Senin: { kelas, mapel } } }
        const jamUnik = [...new Set(data.map(j => `${j.jam_mulai} - ${j.jam_selesai}`))];
        const mapJadwal = jamUnik.map(jam => {
          const entry = {};
          entry.waktu = jam;

          days.forEach(day => {
            const found = data.find(
              j => `${j.jam_mulai} - ${j.jam_selesai}` === jam && j.hari === day
            );
            if (found) {
              entry[day] = {
                kelas: found.nama_kelas,
                mapel: found.nama_mapel,
              };
            }
          });

          return entry;
        });

        setJadwalData(mapJadwal);
      } catch (err) {
        console.error('Gagal mengambil jadwal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJadwal();
  }, []);

  // Hitung total jam
  const totalJam = jadwalData.reduce((total, row) => {
    days.forEach(day => {
      if (row[day]) total += 1;
    });
    return total;
  }, 0) * 1.5; // misalnya tiap slot 1.5 jam

  // Jadwal hari ini
  const jadwalHariIni = jadwalData
    .map(row => ({
      waktu: row.waktu,
      data: row[currentDayName]
    }))
    .filter(item => item.data);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="container-fluid">
        <h5>Manajemen Akademik</h5>
        <h3 className="mb-1">Jadwal Mengajar</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>Informasi Jadwal Mengajar & Kelas</p>

        {/* 🔔 Jadwal Hari Ini */}
        <div className="alert alert-info mt-3" role="alert">
          <strong>Jadwal Hari Ini ({currentDayName}):</strong>
          {jadwalHariIni.length > 0 ? (
            <ul className="mb-0">
              {jadwalHariIni.map((item, i) => (
                <li key={i}>
                  {item.waktu} - Kelas {item.data.kelas} ({item.data.mapel})
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-1">Tidak ada jadwal hari ini.</div>
          )}
        </div>

        {/* 📊 Tabel Jadwal */}
        <div className="p-3 border rounded shadow-sm mt-4" style={{ background: '#fff' }}>
          {loading ? (
            <p>Memuat jadwal...</p>
          ) : (
            <table className="table table-bordered text-center mb-0">
              <thead className="table-light">
                <tr>
                  <th>Waktu</th>
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jadwalData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.waktu}</td>
                    {days.map((day) => {
                      const cell = row[day];
                      const isToday = day === currentDayName;
                      const bgColor = cell?.mapel ? mapelColors[cell.mapel] || '#f0f0f0' : 'transparent';

                      return (
                        <td
                          key={day}
                          style={{
                            backgroundColor: isToday ? '#c8e6c9' : bgColor,
                            fontSize: '14px',
                            verticalAlign: 'middle'
                          }}
                        >
                          {cell && (
                            <>
                              <strong>{cell.kelas}</strong>
                              <div style={{ fontSize: '12px', color: '#555' }}>{cell.mapel}</div>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 🕓 Total Jam */}
        <div className="mt-3" style={{ fontSize: '14px', color: '#444' }}>
          Total Jam Mengajar Minggu Ini: <strong>{totalJam} jam</strong>
        </div>
      </div>
    </div>
  );
};

export default JadwalMengajar;
