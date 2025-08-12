import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer
} from 'recharts';

const kelasOptions = ['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D', '9A', '9B', '9C', '9D'];

const DashboardAkademik = ({ isSidebarOpen }) => {
  const [profil, setProfil] = useState(null);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataGuru, setDataGuru] = useState([]);
  const [dataNilai, setDataNilai] = useState([]);

  // State kelas untuk filter nilai dan absen siswa
  const [kelasNilai, setKelasNilai] = useState('7A');
  const [kelasAbsen, setKelasAbsen] = useState('7A');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      const role = localStorage.getItem('role');

      try {
        const response = await fetch(`http://localhost:5000/${role}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProfil(data);
      } catch (error) {
        console.error('Gagal mengambil profil admin:', error);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    const fetchDataNilai = async () => {
      try {
        const res = await fetch(`http://localhost:5000/nilai/laporan-mapel?kelas=${kelasNilai}&mapel=Matematika&semester=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (!Array.isArray(result)) {
          console.error("Data nilai bukan array:", result);
          setDataNilai([]);
          return;
        }

        const formatted = result.map(item => ({
          nama: item.nama_lengkap || item.nama_siswa,
          rata_rata: item.rata_rata ?? 0,
        }));

        setDataNilai(formatted);
      } catch (err) {
        console.error("Gagal ambil data nilai", err);
        setDataNilai([]);
      }
    };

    const fetchDataSiswa = async () => {
      try {
        const res = await fetch(`http://localhost:5000/absensi/statistik-siswa?kelas=${kelasAbsen}`);
        const result = await res.json();

        const total = {
          hadir: Number(result.hadir || 0),
          izin: Number(result.izin || 0),
          tidakHadir: Number(result.tidak_hadir || 0),
        };

        const formatted = [
          { name: "Hadir", value: total.hadir },
          { name: "Izin", value: total.izin },
          { name: "Tidak Hadir", value: total.tidakHadir },
        ];
        setDataSiswa(formatted);
      } catch (err) {
        console.error("Gagal ambil statistik absen siswa", err);
        setDataSiswa([]);
      }
    };

    const fetchDataGuru = async () => {
      try {
        const res = await fetch("http://localhost:5000/absensi/statistik-guru");
        const result = await res.json();
        const formatted = [
          { name: "Hadir", jumlah: result.hadir || 0 },
          { name: "Izin", jumlah: result.izin || 0 },
          { name: "Tidak Hadir", jumlah: result.tidak_hadir || 0 },
        ];
        setDataGuru(formatted);
      } catch (err) {
        console.error("Gagal ambil statistik guru", err);
        setDataGuru([]);
      }
    };

    fetchDataNilai();
    fetchDataSiswa();
    fetchDataGuru();
  }, [kelasNilai, kelasAbsen, token]);

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <h2 style={{ color: '#6B7280', marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
        Dashboard Akademik
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
        {/* Box Rekap Nilai Siswa */}
        <div style={{
          flex: '1 1 30%',
          backgroundColor: '#F4F6F8',
          borderRadius: '6px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
          padding: '16px',
          minWidth: '300px',
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px', textAlign: 'center' }}>Rekap Nilai Siswa</h3>

          {/* Dropdown kelas untuk rekap nilai */}
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <select
              value={kelasNilai}
              onChange={e => setKelasNilai(e.target.value)}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            >
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>

          {Array.isArray(dataNilai) && dataNilai.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataNilai}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rata_rata" fill="#4caf50" name="Rata-rata" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: 'center', marginTop: 40 }}>Tidak ada data nilai</p>
          )}
        </div>

        {/* Box Statistik Absen Siswa */}
        <div style={{
          flex: '1 1 30%',
          backgroundColor: '#F4F6F8',
          borderRadius: '6px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
          padding: '16px',
          minWidth: '300px',
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px', textAlign: 'center' }}>Statistik Absen Siswa</h3>

          {/* Dropdown kelas untuk absen siswa */}
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <select
              value={kelasAbsen}
              onChange={e => setKelasAbsen(e.target.value)}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            >
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>

          {Array.isArray(dataSiswa) && dataSiswa.length > 0 ? (
            <PieChart width={500} height={250}>
              <Pie
                data={dataSiswa}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {dataSiswa.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === "Hadir"
                        ? "#4caf50"
                        : entry.name === "Izin"
                        ? "#ffc107"
                        : "#f44336"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <p style={{ textAlign: 'center', marginTop: 40 }}>Tidak ada data absen siswa</p>
          )}
        </div>

        {/* Box Statistik Absensi Guru */}
        <div style={{
          flex: '1 1 30%',
          backgroundColor: '#F4F6F8',
          borderRadius: '6px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
          padding: '16px',
          minWidth: '300px',
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px', textAlign: 'center' }}>Statistik Absensi Guru</h3>
          {Array.isArray(dataGuru) && dataGuru.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataGuru}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: 'center', marginTop: 40 }}>Tidak ada data absen guru</p>
          )}
        </div>
      </div>

      {/* Notifikasi Section */}
      <div style={{
        backgroundColor: '#ECEFF1',
        padding: '16px',
        borderRadius: '8px',
        marginTop: '30px',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <img src="/images/logo-lonceng.png" alt="Notifikasi" style={{ fontSize: '18px', marginRight: '8px' }} />
          <span style={{ fontWeight: 'bold', color: '#37474F' }}>Notifikasi</span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '12px 16px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '12px',
          cursor: 'pointer',
        }}>
          <div>
            <strong>Pengajuan Perubahan Data Akademik</strong>
            <p style={{ fontSize: '12px', color: '#78909C', margin: '4px 0 0 0' }}>Permintaan untuk memperbarui profil sekolah</p>
          </div>
          <span style={{ fontSize: '20px', color: '#455A64' }}>&#8250;</span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '12px 16px',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '12px',
          cursor: 'pointer',
        }}>
          <div>
            <strong>Laporan dari wali kelas / guru</strong>
            <p style={{ fontSize: '12px', color: '#78909C', margin: '4px 0 0 0' }}>Laporan absensi bulanan telah tersedia</p>
          </div>
          <span style={{ fontSize: '20px', color: '#455A64' }}>&#8250;</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardAkademik;
