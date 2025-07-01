import React, { useState } from 'react';
import axios from 'axios';

const GuruAbsensi = () => {
  const [selectedInputKelas, setSelectedInputKelas] = useState('');
  const [selectedRekapKelas, setSelectedRekapKelas] = useState('');
  const [showInputForm, setShowInputForm] = useState(false);
  const [showRekapForm, setShowRekapForm] = useState(false);
  const [inputSiswaList, setInputSiswaList] = useState([]);
  const [rekapSiswaList, setRekapSiswaList] = useState([]);
  const [absensiData, setAbsensiData] = useState({});
  const [rekapData, setRekapData] = useState({});

  const kelasOptions = [
    'Kelas 7A', 'Kelas 7B', 'Kelas 7C', 'Kelas 7D',
    'Kelas 8A', 'Kelas 8B', 'Kelas 8C', 'Kelas 8D',
    'Kelas 9A', 'Kelas 9B', 'Kelas 9C', 'Kelas 9D',
  ];

  const handleChangeInputKelas = async (value) => {
    setSelectedInputKelas(value);
    setShowInputForm(!!value);
    setAbsensiData({});
    if (!value) return;

    const kelasId = kelasOptions.indexOf(value) + 1;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://localhost:5000/absensi/siswa/${kelasId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Data siswa dari backend:", res.data);
      setInputSiswaList(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil siswa:", err);
      alert("Gagal mengambil data siswa");
    }
  };

  const handleChangeRekapKelas = async (value) => {
    setSelectedRekapKelas(value);
    setShowRekapForm(!!value);
    if (!value) return;

    const kelasId = kelasOptions.indexOf(value) + 1;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://localhost:5000/absensi/rekap/${kelasId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = {};
      res.data.forEach((item) => {
        formatted[item.siswa_id] = {
          nama: item.nama_lengkap,
          Hadir: item.hadir,
          Izin: item.izin,
          Alpha: item.alpha,
        };
      });

      setRekapData(formatted);
      setRekapSiswaList(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil rekap absensi:", err);
      alert("Gagal mengambil rekap absensi");
    }
  };

  const handleRadioChange = (id, status) => {
    setAbsensiData((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleSubmitAbsensi = async () => {
    const token = localStorage.getItem("token");
    const tanggal = new Date().toISOString().split("T")[0];
    const kelasId = kelasOptions.indexOf(selectedInputKelas) + 1;
    const jadwalId = 1;

    const payload = inputSiswaList
      .filter((siswa) => siswa.id)
      .map((siswa) => ({
        siswa_id: siswa.id,
        jadwal_id: jadwalId,
        tanggal,
        status: absensiData[siswa.id] || "Alpha",
      }));

    console.log("📦 Payload absensi yang dikirim:", payload);

    try {
      await axios.post("http://localhost:5000/absensi/bulk", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Absensi berhasil disimpan");
    } catch (err) {
      console.error("❌ Gagal simpan absensi:", err);
      alert("❌ Gagal menyimpan absensi");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* INPUT ABSENSI */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="inputKelas" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '18px' }}>
          Menginput Absensi
        </label>
        <select
          id="inputKelas"
          value={selectedInputKelas}
          onChange={(e) => handleChangeInputKelas(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '6px', fontSize: '16px' }}
        >
          <option value="">Pilih Kelas</option>
          {kelasOptions.map((kelas, index) => (
            <option key={index} value={kelas}>{kelas}</option>
          ))}
        </select>
      </div>

      {showInputForm && (
        <div style={popupStyle}>
          <h3>Form Input Absensi</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Nama</th>
                <th style={thStyle}>Hadir</th>
                <th style={thStyle}>Izin</th>
                <th style={thStyle}>Alpha</th>
              </tr>
            </thead>
            <tbody>
              {inputSiswaList.map((siswa, index) => (
                <tr key={`siswa-${siswa.id}`}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{siswa.nama_lengkap}</td>
                  {["Hadir", "Izin", "Alpha"].map((status) => (
                    <td style={tdStyle} key={`${siswa.id}-${status}`}>
                      <input
                        type="radio"
                        name={`absensi-${siswa.id}`}
                        value={status}
                        checked={absensiData[siswa.id] === status}
                        onChange={(e) => handleRadioChange(siswa.id, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmitAbsensi}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              borderRadius: '6px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Simpan Absensi
          </button>
        </div>
      )}

      {/* REKAP */}
      <div style={{ marginTop: '40px' }}>
        <label htmlFor="rekapKelas" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '18px' }}>
          Rekap Absensi
        </label>
        <select
          id="rekapKelas"
          value={selectedRekapKelas}
          onChange={(e) => handleChangeRekapKelas(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '6px', fontSize: '16px' }}
        >
          <option value="">Pilih Kelas</option>
          {kelasOptions.map((kelas, index) => (
            <option key={index} value={kelas}>{kelas}</option>
          ))}
        </select>
      </div>

      {showRekapForm && (
        <div style={popupStyle}>
          <h3>Rekap Absensi Kelas {selectedRekapKelas}</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Nama</th>
                <th style={thStyle}>Hadir</th>
                <th style={thStyle}>Izin</th>
                <th style={thStyle}>Alpha</th>
              </tr>
            </thead>
            <tbody>
              {rekapSiswaList.map((item, index) => (
                <tr key={`rekap-${item.siswa_id}`}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{item.nama_lengkap}</td>
                  <td style={tdStyle}>{rekapData[item.siswa_id]?.Hadir ?? 0}</td>
                  <td style={tdStyle}>{rekapData[item.siswa_id]?.Izin ?? 0}</td>
                  <td style={tdStyle}>{rekapData[item.siswa_id]?.Alpha ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const popupStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  maxWidth: '100%',
  width: '100%',
  marginTop: '20px',
  marginBottom: '30px',
  fontSize: '16px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
  fontSize: '16px',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
  fontSize: '15px',
};

export default GuruAbsensi;
