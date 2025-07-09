import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PresensiOrtu = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6); // Juli
  const [showPopup, setShowPopup] = useState(false);
  const [presensiData, setPresensiData] = useState([]);
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [suratFile, setSuratFile] = useState(null);

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  useEffect(() => {
    const fetchPresensi = async () => {
      try {
        const bulan = currentMonthIndex + 1;
        const res = await axios.get(`http://localhost:5000/orang-tua/presensi?bulan=${bulan}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPresensiData(res.data);
      } catch (error) {
        console.error('Gagal ambil data presensi:', error);
      }
    };

    fetchPresensi();
  }, [currentMonthIndex]);

  // Lock scroll saat popup terbuka
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) setCurrentMonthIndex(currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < months.length - 1) setCurrentMonthIndex(currentMonthIndex + 1);
  };

  const handleKirimIzin = async () => {
    if (!tanggalMulai || !tanggalSelesai || !keterangan) {
      alert("Lengkapi semua data izin terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("tanggal_mulai", tanggalMulai);
    formData.append("tanggal_selesai", tanggalSelesai);
    formData.append("keterangan", keterangan);
    if (suratFile) {
      formData.append("file", suratFile);
    }

    try {
      await axios.post("http://localhost:5000/siswa/ajukan-izin", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Pengajuan izin berhasil dikirim!");
      // Reset dan tutup popup
      setTanggalMulai('');
      setTanggalSelesai('');
      setKeterangan('');
      setSuratFile(null);
      setShowPopup(false);
    } catch (error) {
      console.error("Gagal kirim izin:", error);
      alert("Gagal mengirim pengajuan izin!");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#2471AE' }}>Selamat Datang di Halaman Presensi</h2>
      <p>Di sini kamu dapat melihat kehadiran harianmu.</p>

      {/* Semester & Ajukan Izin */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          {currentMonthIndex >= 6
            ? '📘 Semester 1 (Juli – Desember)'
            : '📙 Semester 2 (Januari – Juni)'}
        </p>
        <button
          onClick={() => setShowPopup(true)}
          style={{ padding: '6px 12px', background: 'white', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'normal' }}
        >
          Ajukan Izin Online
        </button>
      </div>

      {/* Navigasi Bulan */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
        <button
          onClick={handlePrevMonth}
          disabled={currentMonthIndex === 0}
          style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', paddingRight: '16px' }}
        >
          ◀
        </button>
        <span style={{ minWidth: '120px', textAlign: 'center', fontSize: '16px' }}>{months[currentMonthIndex]}</span>
        <button
          onClick={handleNextMonth}
          disabled={currentMonthIndex === months.length - 1}
          style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', paddingLeft: '16px' }}
        >
          ▶
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
            {presensiData.length > 0 ? (
              presensiData.map((item, index) => {
                const tanggal = new Date(item.tanggal).toLocaleDateString('id-ID');
                return (
                  <tr key={index}>
                    <td style={cellStyle}>{index + 1}</td>
                    <td style={cellStyle}>{tanggal}</td>
                    <td style={cellStyle}>{item.status === 'Hadir' ? '✔️' : ''}</td>
                    <td style={cellStyle}>{item.status === 'Izin' ? '✔️' : ''}</td>
                    <td style={cellStyle}>{item.status === 'Alpha' ? '✔️' : ''}</td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="5" style={cellStyle}>Tidak ada data presensi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Ajukan Izin */}
      {showPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, overscrollBehavior: 'contain'
        }}>
          <div style={{
            width: '90%', maxWidth: '500px', maxHeight: '90vh',
            overflowY: 'auto', background: 'white', padding: '20px 30px 10px 30px',
            borderRadius: '8px', position: 'relative',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)', fontFamily: 'Segoe UI, sans-serif'
          }}>
            {/* Tombol Close */}
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute', top: '10px', right: '15px',
                background: 'none', border: 'none', fontSize: '18px',
                cursor: 'pointer', color: '#999'
              }}
              title="Tutup"
            >
              ❌
            </button>

            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <h5>Ajukan Izin</h5>
            </div>

            <label>Tanggal Mulai</label>
            <input
              type="date"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              style={inputStyle}
            />

            <label>Tanggal Selesai</label>
            <input
              type="date"
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
              style={inputStyle}
            />

            <label>Keterangan Izin</label>
            <input
              type="text"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Keterangan Izin"
              style={inputStyle}
            />

            <div style={{ marginTop: '10px' }}>
              <label><strong>Upload Surat Izin</strong></label><br />
              <input
                type="file"
                onChange={(e) => setSuratFile(e.target.files[0])}
                style={{ marginTop: '5px' }}
              />
              <p style={{ fontSize: '12px', color: '#666' }}>Jika ada surat izin</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
              <button
                onClick={handleKirimIzin}
                style={{ padding: '6px 16px', border: '1px solid #007bff', background: '#007bff', color: 'white', cursor: 'pointer' }}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0 15px 0',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
};

export default PresensiOrtu;
