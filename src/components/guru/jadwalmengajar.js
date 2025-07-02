import React, { useState } from 'react';

const JadwalMengajar = () => {
  const [selectedKelas, setSelectedKelas] = useState('7C');
  const [currentDayIndex, setCurrentDayIndex] = useState(3); // Default Kamis

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const jadwalData = [
    ['07.00 - 09.00', { Selasa: '7 A', Jumat: '7 B', Kamis: '7 A' }],
    ['10.00 - 12.00', { Kamis: '7 D' }],
    ['13.00 - 14.00', { Rabu: '7 C' }],
  ];

  const navigateDay = (dir) => {
    setCurrentDayIndex((prev) =>
      dir === 'prev' ? (prev - 1 + days.length) % days.length : (prev + 1) % days.length
    );
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="container-fluid">
        <h5>Manajemen Akademik</h5>
        <h3 className="mb-1">Jadwal Mengajar</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>Informasi Jadwal Mengajar & Kelas</p>

        {/* Dropdown Kelas */}
        <div className="mb-3 mt-3" style={{ maxWidth: '250px' }}>
          <label>Kelas</label>
          <select
            className="form-select"
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
          >
            <option value="7A">7 A</option>
            <option value="7B">7 B</option>
            <option value="7C">7 C</option>
            <option value="7D">7 D</option>
          </select>
        </div>

        {/* Navigasi Hari */}
        <div
          className="d-flex align-items-center justify-content-between p-2 border rounded mb-4"
          style={{ backgroundColor: '#ADD8E6' }}
        >
          <button className="btn btn-light border" onClick={() => navigateDay('prev')}>
            &lt;
          </button>
          <div className="text-center" style={{ flex: 1 }}>
            <strong>{days[currentDayIndex]}</strong>
            <div style={{ fontSize: '12px', color: '#555' }}>
              07.00 - 09.00 &nbsp; | &nbsp; R - 7A
            </div>
          </div>
          <button className="btn btn-light border" onClick={() => navigateDay('next')}>
            &gt;
          </button>
        </div>

        {/* Jadwal Table Box */}
        <div className="p-3 border rounded shadow-sm" style={{ background: '#fff' }}>
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
              {jadwalData.map(([waktu, mapHari], idx) => (
                <tr key={idx}>
                  <td>{waktu}</td>
                  {days.map((day) => (
                    <td key={day}>
                      {mapHari[day] && (
                        <>
                          <strong>{mapHari[day]}</strong>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            R - {mapHari[day]}
                          </div>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalMengajar;
