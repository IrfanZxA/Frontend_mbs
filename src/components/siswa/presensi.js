import React, { useState } from 'react';

const DashboardPresensi = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6); // Juli

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#2471AE' }}>Selamat Datang di Halaman Presensi</h2>
      <p>
        Di sini kamu dapat melihat kehadiran harianmu. Fitur presensi akan ditampilkan di sini.
      </p>

      {/* Dropdown Kelas & Semester */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ padding: '6px' }}
        >
          <option value="">Pilih Kelas</option>
          {['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D', '9A', '9B', '9C', '9D'].map((kelas) => (
            <option key={kelas} value={kelas}>{kelas}</option>
          ))}
        </select>

        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          style={{ padding: '6px' }}
        >
          <option value="">Pilih Semester</option>
          <option value="semester1">Semester 1</option>
          <option value="semester2">Semester 2</option>
        </select>
      </div>

      {/* Navigasi Bulan */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        <button
          onClick={handlePrevMonth}
          disabled={currentMonthIndex === 0}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            paddingRight: '16px',
          }}
        >
          &#8249;
        </button>
        <span style={{ minWidth: '80px', textAlign: 'center' }}>{months[currentMonthIndex]}</span>
        <button
          onClick={handleNextMonth}
          disabled={currentMonthIndex === months.length - 1}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            paddingLeft: '16px',
          }}
        >
          &#8250;
        </button>
      </div>

      {/* Tabel Presensi */}
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={cellStyle}>No</th>
              <th style={cellStyle}>Tanggal</th>
              <th style={cellStyle}>Hadir</th>
              <th style={cellStyle}>Izin</th>
              <th style={cellStyle}>Alpa</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(7)].map((_, i) => (
              <tr key={i}>
                <td style={cellStyle}>{i + 1}</td>
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
};

export default DashboardPresensi;
