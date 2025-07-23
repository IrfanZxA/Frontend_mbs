import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardAkademik = ({ isSidebarOpen }) => {
  const [profil, setProfil] = useState(null);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataGuru, setDataGuru] = useState([]);
  const [dataNilai, setDataNilai] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
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
  }, []);

  useEffect(() => {
    const fetchDataNilai = async () => {
      try {
        const res = await fetch(`http://localhost:5000/nilai/laporan-mapel?kelas=7A&mapel=Matematika&semester=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        const formatted = result.map(item => ({
          nama: item.nama_siswa || item.nama_lengkap,
          rata_rata: item.rata_rata ?? 0,
        }));

        setDataNilai(formatted);
      } catch (err) {
        console.error("Gagal ambil data nilai", err);
      }
    };

    const fetchDataSiswa = async () => {
      try {
        const res = await fetch("http://localhost:5000/absensi/statistik-siswa");
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
      }
    };

    fetchDataNilai();
    fetchDataSiswa();
    fetchDataGuru();
  }, [token]);

  return (
    <div
      style={{
        ...styles.container,
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <h2 style={styles.header}>Dashboard Akademik</h2>

      <div style={styles.boxContainer}>
        {/* Box 1 - Rekap Nilai Siswa */}
        <div style={styles.box}>
          <h3 style={styles.title}>Rekap Nilai Siswa</h3>
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

        {/* Box 2 - Statistik Absen Siswa */}
        <div style={styles.box}>
          <h3 style={styles.title}>Statistik Absen Siswa</h3>
          {Array.isArray(dataSiswa) && dataSiswa.length > 0 ? (
            <PieChart width={300} height={250}>
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

        {/* Box 3 - Statistik Absensi Guru */}
        <div style={styles.box}>
          <h3 style={styles.title}>Statistik Absensi Guru</h3>
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
      <div style={styles.notificationContainer}>
        <div style={styles.notificationHeader}>
          <img src="/images/logo-lonceng.png" alt="Notifikasi" style={styles.bellIcon} />
          <span style={styles.notificationTitle}>Notifikasi</span>
        </div>

        <div style={styles.notificationCard}>
          <div>
            <strong>Pengajuan Perubahan Data Akademik</strong>
            <p style={styles.notificationSub}>Permintaan untuk memperbarui profil sekolah</p>
          </div>
          <span style={styles.arrow}>&#8250;</span>
        </div>

        <div style={styles.notificationCard}>
          <div>
            <strong>Laporan dari wali kelas / guru</strong>
            <p style={styles.notificationSub}>Laporan absensi bulanan telah tersedia</p>
          </div>
          <span style={styles.arrow}>&#8250;</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#6B7280',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
  },
  box: {
    flex: '1 1 30%',
    backgroundColor: '#F4F6F8',
    borderRadius: '6px',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
    padding: '16px',
    minWidth: '300px',
  },
  title: {
    fontSize: '16px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  notificationContainer: {
    backgroundColor: '#ECEFF1',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '30px',
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  notificationHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  bellIcon: {
    fontSize: '18px',
    marginRight: '8px',
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: '#37474F',
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: '12px 16px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '12px',
    cursor: 'pointer',
  },
  notificationSub: {
    fontSize: '12px',
    color: '#78909C',
    margin: '4px 0 0 0',
  },
  arrow: {
    fontSize: '20px',
    color: '#455A64',
  },
};

export default DashboardAkademik;
