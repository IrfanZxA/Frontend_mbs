import React, { useState, useEffect } from 'react';

const AdminPresensi = () => {
  const kelasList = [
    '7A', '7B', '7C', '7D',
    '8A', '8B', '8C', '8D',
    '9A', '9B', '9C', '9D'
  ];

  const bulanList = [
    'Januari 2025', 'Februari 2025', 'Maret 2025', 'April 2025',
    'Mei 2025', 'Juni 2025', 'Juli 2025', 'Agustus 2025',
    'September 2025', 'Oktober 2025', 'November 2025', 'Desember 2025'
  ];

  const grafikList = ['Chart', 'Diagram', 'Pie'];
  const guruList = []; // akan diisi backend

  const generateMonthlyRanges = () => {
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const ranges = [];
    for (let i = 0; i < 12; i++) {
      const start = `1 ${monthNames[i]} 2025`;
      const daysInMonth = new Date(2025, i + 1, 0).getDate();
      const end = `${daysInMonth} ${monthNames[i]} 2025`;
      ranges.push(`${start} - ${end}`);
    }
    return ranges;
  };

  const [kelas, setKelas] = useState('');
  const [bulan, setBulan] = useState('');
  const [grafik, setGrafik] = useState('Chart');
  const [guru, setGuru] = useState('');
  const [rentang, setRentang] = useState('');
  const [rentangList, setRentangList] = useState([]);

  useEffect(() => {
    setRentangList(generateMonthlyRanges());
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#2471AE' }}>Monitoring Kehadiran</h2>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {/* BOX GRAFIK SISWA */}
        <div style={{ flex: 1, minWidth: '350px', padding: '1rem', background: '#fff', borderRadius: '10px' }}>
          <h4>Grafik Kehadiran Siswa</h4>
          <select value={kelas} onChange={e => setKelas(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Kelas</option>
            {kelasList.map(k => <option key={k}>{k}</option>)}
          </select>
          <select value={bulan} onChange={e => setBulan(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Bulan</option>
            {bulanList.map(b => <option key={b}>{b}</option>)}
          </select>
          <select value={grafik} onChange={e => setGrafik(e.target.value)} className="form-select mb-2">
            {grafikList.map(g => <option key={g}>{g}</option>)}
          </select>

          {/* Grafik tidak ditampilkan (ditangani backend) */}
          <div className="mt-3">
            <strong>Ringkasan Bulanan</strong>
            <p>Total Hari Efektif: -</p>
            <p>Hadir: -</p>
            <p>Izin: -</p>
            <p>Tidak hadir: -</p>
          </div>
        </div>

        {/* BOX GURU */}
        <div style={{ flex: 1, minWidth: '350px', padding: '1rem', background: '#fff', borderRadius: '10px' }}>
          <h4>Statistik Absensi Guru</h4>
          <select value={guru} onChange={e => setGuru(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Guru</option>
            {guruList.map(g => <option key={g}>{g}</option>)}
          </select>
          <select value={rentang} onChange={e => setRentang(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Rentang Waktu</option>
            {rentangList.map(r => <option key={r}>{r}</option>)}
          </select>

          <table className="table table-sm mt-2">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Kosong - akan diisi backend */}
            </tbody>
          </table>

          <div className="mt-2">
            <p><strong>Total Kehadiran:</strong> -</p>
            <p><strong>Izin:</strong> -</p>
            <p><strong>Tidak Hadir:</strong> -</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPresensi;
