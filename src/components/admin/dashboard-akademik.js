import React from 'react';
import { useEffect, useState } from 'react';


const DashboardAkademik = ({ isSidebarOpen, setNamaLengkap }) => {
const [profil, setProfil] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    try {
      const response = await fetch(`http://localhost:5000/${role}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProfil(data);
      setNamaLengkap(data?.admin?.nama_lengkap); // kirim ke luar
    } catch (error) {
      console.error('Gagal mengambil profil admin:', error);
    }
  };

  fetchProfile();
}, [setNamaLengkap]);

  return (
    <div
      style={{
        ...styles.container,
        marginLeft: isSidebarOpen ? '250px' : '10px', // Dinamis sesuai sidebar
        transition: 'margin-left 0.3s ease',
      }}
    >
      
      <h2 style={styles.header}>Dashboard Akademik</h2>

      <div style={styles.boxContainer}>
        {/* Box 1 - Rekap Nilai Siswa */}
        <div style={styles.box}>
          <h3 style={styles.title}>Rekap Nilai Siswa</h3>
          <div style={styles.placeholder}>
            <div style={{ ...styles.bar, width: '40%' }} />
            <div style={{ ...styles.bar, width: '90%' }} />
            <div style={{ ...styles.bar, width: '60%' }} />
            <div style={{ ...styles.bar, width: '85%' }} />
          </div>
        </div>

        {/* Box 2 - Statistik Absen Siswa */}
        <div style={styles.box}>
          <h3 style={styles.title}>Statistik Absen Siswa</h3>
          <div style={styles.pieChart} />
        </div>

        {/* Box 3 - Kinerja Guru */}
        <div style={styles.box}>
          <h3 style={styles.title}>Kinerja Guru</h3>
          <div style={styles.chartContainer}>
            {[30, 40, 55, 50, 75, 60, 35].map((height, index) => (
              <div
                key={index}
                style={{ ...styles.chartBar, height: `${height}px` }}
              />
            ))}
          </div>
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
    // marginLeft akan ditimpa oleh prop
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
    minWidth: '220px',
  },
  title: {
    fontSize: '16px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  bar: {
    height: '20px',
    backgroundColor: '#B0BEC5',
    borderRadius: '4px',
  },
  pieChart: {
    width: '100px',
    height: '100px',
    backgroundColor: '#B0BEC5',
    borderRadius: '50%',
    margin: '0 auto',
    marginTop: '20px',
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '5px',
    justifyContent: 'center',
    marginTop: '20px',
    height: '100px',
  },
  chartBar: {
    width: '15px',
    backgroundColor: '#B0BEC5',
    borderRadius: '3px',
  },

  // Notifikasi Styles
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
