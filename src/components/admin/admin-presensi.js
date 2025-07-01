import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

const AdminPresensi = () => {
  const bulanList = [
    'Januari 2025', 'Februari 2025', 'Maret 2025', 'April 2025',
    'Mei 2025', 'Juni 2025', 'Juli 2025', 'Agustus 2025',
    'September 2025', 'Oktober 2025', 'November 2025', 'Desember 2025'
  ];

  const grafikList = ['Chart', 'Diagram', 'Pie'];

  const [kelasList, setKelasList] = useState([]);
  const [kelas, setKelas] = useState('');
  const [bulan, setBulan] = useState('');
  const [grafik, setGrafik] = useState('Chart');
  const [guru, setGuru] = useState('');
  const [rentang, setRentang] = useState('');
  const [data, setData] = useState([]);
  const [guruData, setGuruData] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [rentangList, setRentangList] = useState([]);

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

  useEffect(() => {
    setRentangList(generateMonthlyRanges());
  }, []);

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const res = await fetch("http://localhost:5000/kelas");
        const data = await res.json();
        setKelasList(data);
      } catch (err) {
        console.error("Gagal ambil kelas", err);
      }
    };
    fetchKelas();
  }, []);

  useEffect(() => {
    const fetchGuruList = async () => {
      try {
        const res = await fetch("http://localhost:5000/guru");
        const data = await res.json();
        setGuruList(data);
      } catch (err) {
        console.error("Gagal ambil list guru", err);
      }
    };
    fetchGuruList();
  }, []);

  useEffect(() => {
    const fetchRekapSiswa = async () => {
      if (!kelas || !bulan) return;

      const [namaBulan, tahun] = bulan.split(' ');
      const bulanMap = {
        Januari: '01', Februari: '02', Maret: '03', April: '04',
        Mei: '05', Juni: '06', Juli: '07', Agustus: '08',
        September: '09', Oktober: '10', November: '11', Desember: '12'
      };
      const bulanFormatted = `${tahun}-${bulanMap[namaBulan]}`;

      try {
        const res = await fetch(`http://localhost:5000/absensi/rekap-siswa?kelas_id=${kelas}&bulan=${bulanFormatted}`);
        const json = await res.json();
        const formatData = json.map(d => ({
          tanggal: new Date(d.tanggal).getDate().toString(),
          hadir: Number(d.hadir),
          izin: Number(d.izin),
          tidakHadir: Number(d.tidak_hadir),
        }));
        setData(formatData);
      } catch (err) {
        console.error("Gagal ambil rekap absensi siswa", err);
      }
    };

    fetchRekapSiswa();
  }, [kelas, bulan]);

  useEffect(() => {
    const fetchAbsensiGuru = async () => {
      if (!guru || !rentang) return;

      const [startText, endText] = rentang.split(' - ');
      const formatDate = (str) => {
        const [tanggal, bulanNama, tahun] = str.split(' ');
        const bulanMap = {
          Januari: '01', Februari: '02', Maret: '03', April: '04',
          Mei: '05', Juni: '06', Juli: '07', Agustus: '08',
          September: '09', Oktober: '10', November: '11', Desember: '12'
        };
        return `${tahun}-${bulanMap[bulanNama]}-${tanggal.padStart(2, '0')}`;
      };
      const start = formatDate(startText);
      const end = formatDate(endText);

      try {
        const res = await fetch(`http://localhost:5000/absensi/guru?nama=${encodeURIComponent(guru)}&start=${start}&end=${end}`);
        const data = await res.json();
        setGuruData(data);
      } catch (err) {
        console.error("Gagal ambil data absensi guru", err);
      }
    };

    fetchAbsensiGuru();
  }, [guru, rentang]);

  const renderChart = () => {
    if (grafik === 'Pie') {
      const total = data.reduce((acc, curr) => {
        acc.hadir += curr.hadir;
        acc.izin += curr.izin;
        acc.tidakHadir += curr.tidakHadir;
        return acc;
      }, { hadir: 0, izin: 0, tidakHadir: 0 });
      const pieData = [
        { name: 'Hadir', value: total.hadir },
        { name: 'Izin', value: total.izin },
        { name: 'Tidak Hadir', value: total.tidakHadir }
      ];
      const COLORS = ['#4caf50', '#ffc107', '#f44336'];
      return (
        <PieChart width={300} height={250}>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    } else if (grafik === 'Diagram') {
      return (
        <LineChart width={400} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tanggal" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="hadir" stroke="#4caf50" />
          <Line type="monotone" dataKey="izin" stroke="#ffc107" />
          <Line type="monotone" dataKey="tidakHadir" stroke="#f44336" />
        </LineChart>
      );
    }
    return (
      <BarChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tanggal" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hadir" fill="#4caf50" />
        <Bar dataKey="izin" fill="#ffc107" />
        <Bar dataKey="tidakHadir" fill="#f44336" />
      </BarChart>
    );
  };

  const totalEfektif = data.length;
  const totalHadir = data.reduce((acc, d) => acc + d.hadir, 0);
  const totalIzin = data.reduce((acc, d) => acc + d.izin, 0);
  const totalTH = data.reduce((acc, d) => acc + d.tidakHadir, 0);

  const totalGuru = guruData.length;
  const totalGuruIzin = guruData.filter(d => d.status.toLowerCase().includes('izin')).length;
  const totalGuruTH = guruData.filter(d => d.status.toLowerCase().includes('tidak hadir')).length;
  const totalGuruHadir = totalGuru - totalGuruIzin - totalGuruTH;
  const persenHadir = totalGuru ? Math.round((totalGuruHadir / totalGuru) * 100) : 0;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#2471AE' }}>Monitoring Kehadiran</h2>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '350px', padding: '1rem', background: '#fff', borderRadius: '10px' }}>
          <h4>Grafik Kehadiran Siswa</h4>
          <select value={kelas} onChange={e => setKelas(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Kelas</option>
            {kelasList.map(k => (
              <option key={k.id} value={k.id}>{k.nama_kelas}</option>
            ))}
          </select>
          <select value={bulan} onChange={e => setBulan(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Bulan</option>
            {bulanList.map(b => <option key={b}>{b}</option>)}
          </select>
          <select value={grafik} onChange={e => setGrafik(e.target.value)} className="form-select mb-2">
            {grafikList.map(g => <option key={g}>{g}</option>)}
          </select>

          {kelas && bulan && data.length > 0 && renderChart()}

          <div className="mt-3">
            <strong>Ringkasan Bulanan</strong>
            <p>Total Hari Efektif: {totalEfektif}</p>
            <p>Hadir: {totalHadir}</p>
            <p>Izin: {totalIzin}</p>
            <p>Tidak hadir: {totalTH}</p>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '350px', padding: '1rem', background: '#fff', borderRadius: '10px' }}>
          <h4>Statistik Absensi Guru</h4>
          <select value={guru} onChange={e => setGuru(e.target.value)} className="form-select mb-2">
            <option value="">Pilih Guru</option>
            {guruList.map(g => (
              <option key={g.id} value={g.nama_lengkap}>{g.nama_lengkap}</option>
            ))}
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
              {guruData.map((g, i) => (
                <tr key={i}>
                  <td>{g.tanggal}</td>
                  <td>{g.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2">
            <p><strong>Total Kehadiran:</strong> {persenHadir}%</p>
            <p><strong>Izin:</strong> {totalGuruIzin} hari</p>
            <p><strong>Tidak Hadir:</strong> {totalGuruTH} hari</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPresensi;
