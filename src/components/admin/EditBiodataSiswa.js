import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBiodataSiswa = ({ isSidebarOpen }) => {
  const [searchNama, setSearchNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [kelasList, setKelasList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [siswaId, setSiswaId] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const [formData, setFormData] = useState({
    nama_lengkap: '',
    nis: '',
    kelas: '',
    alamat: '',
    tanggal_lahir: '',
    orang_tua: '',
    no_hp: '',
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/kelas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKelasList(res.data);
      } catch (err) {
        console.error("Gagal ambil data kelas", err);
      }
    };
    fetchKelas();
  }, []);

  const handleCari = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/siswa?nama=${searchNama}&kelas_id=${kelas}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const siswa = res.data[0];
      if (!siswa) return alert("Data siswa tidak ditemukan");

      setSiswaId(siswa.id);
      const newData = {
        nama_lengkap: siswa.nama_lengkap || '',
        nis: siswa.username || '',
        kelas: siswa.kelas_id || '',
        alamat: siswa.alamat || '',
        tanggal_lahir: siswa.tanggal_lahir?.split("T")[0] || '',
        orang_tua: siswa.orang_tua_nama || '',
        no_hp: siswa.no_hp || '',
      };
      setFormData(newData);
      setInitialData(newData);
      setShowPopup(true);
    } catch (err) {
      console.error("Gagal cari siswa:", err);
      alert("Terjadi kesalahan saat pencarian.");
    }
  };

  const handleEditClick = () => setShowEditForm(true);

  const handleReset = () => {
    if (initialData) {
      setFormData(initialData);
    }
  };

  const handleSave = async () => {
  if (!formData.nama_lengkap || !formData.kelas || !formData.orang_tua || !formData.tanggal_lahir) {
    alert("Harap lengkapi semua kolom wajib: nama, kelas, orang tua, dan tanggal lahir.");
    return;
  }

  // Validasi no_hp jika diisi
  if (formData.no_hp && (!/^\d+$/.test(formData.no_hp) || formData.no_hp.length < 10)) {
    alert("Nomor telepon hanya boleh berisi angka dan minimal 10 digit.");
    return;
  }

  try {
    await axios.put(`http://localhost:5000/siswa/${siswaId}`, {
      nama_lengkap: formData.nama_lengkap,
      tanggal_lahir: formData.tanggal_lahir,
      kelas_id: formData.kelas,
      alamat: formData.alamat,
      orang_tua: formData.orang_tua,
      no_hp: formData.no_hp,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setShowEditForm(false);
    setShowPopup(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (err) {
    console.error("Gagal simpan perubahan:", err);
    alert("Gagal menyimpan perubahan.");
  }
};

  return (
    <div style={{
      padding: '30px',
      marginLeft: isSidebarOpen ? '250px' : '10px',
      transition: 'margin-left 0.3s ease',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 60px)',
      position: 'relative',
    }}>
      {/* FORM CARI */}
      <div style={{ filter: showPopup || showEditForm || showSuccess ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease', zIndex: 0 }}>
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', width: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img src="/images/logo-pensil.png" alt="Edit Icon" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            <h4 style={{ margin: 0 }}>Edit Biodata Siswa</h4>
          </div>

          <label style={labelStyle}>Nama Siswa</label>
          <input
            type="text"
            placeholder="Contoh: Aditya"
            value={searchNama}
            onChange={(e) => setSearchNama(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Kelas</label>
          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            style={inputStyle}
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((k) => (
              <option key={k.id} value={k.id}>{k.nama_kelas}</option>
            ))}
          </select>

          <div style={{ textAlign: 'right' }}>
            <button onClick={handleCari} style={buttonStyle}>Cari</button>
          </div>
        </div>
      </div>

      {/* POPUP INFO */}
      {showPopup && (
        <div style={popupStyle}>
          <h4>Data Siswa</h4>
          <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '20px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{formData.nama_lengkap}</strong>
              <div>Kelas ID: {formData.kelas}</div>
            </div>
            <button onClick={handleEditClick} style={buttonStyle}>
              <img src="/images/logo-pensil.png" alt="Edit" style={{ width: '14px', height: '14px', marginRight: '5px' }} />
              Edit
            </button>
          </div>

          <div style={{ textAlign: 'right', marginTop: '15px' }}>
            <button onClick={() => setShowPopup(false)} style={buttonStyle}>Kembali</button>
          </div>
        </div>
      )}

      {/* FORM EDIT */}
      {showEditForm && (
        <div style={{ ...popupStyle, width: '420px' }}>
          <h4 style={{ marginBottom: '15px' }}>Mengedit Biodata Siswa</h4>
          <input placeholder="Nama Lengkap" value={formData.nama_lengkap} onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })} style={inputStyle} />
          <input placeholder="NIS / NISN" value={formData.nis} disabled style={{ ...inputStyle, backgroundColor: '#eee' }} />
          <input placeholder="Alamat" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} style={inputStyle} />
          <input type="date" value={formData.tanggal_lahir} onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })} style={inputStyle} />
          <input placeholder="Nama Orang Tua" value={formData.orang_tua} onChange={(e) => setFormData({ ...formData, orang_tua: e.target.value })} style={inputStyle} />
          <input placeholder="Nomor Telepon" value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} style={inputStyle} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button style={buttonStyle} onClick={handleReset}>Reset</button>
            <button style={buttonStyle} onClick={() => setShowEditForm(false)}>Batal</button>
            <button style={{ ...buttonStyle, backgroundColor: '#0d6efd', color: 'white' }} onClick={handleSave}>Simpan</button>
          </div>
        </div>
      )}

      {/* SUKSES NOTIFIKASI */}
      {showSuccess && (
        <div style={popupStyle}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
          <div style={{ fontSize: '16px' }}>Perubahan berhasil disimpan</div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '14px',
};

const labelStyle = {
  fontSize: '14px',
  display: 'block',
  marginBottom: '6px',
  marginTop: '12px',
};

const buttonStyle = {
  padding: '6px 14px',
  fontSize: '14px',
  border: '1px solid #444',
  borderRadius: '4px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const popupStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  zIndex: 30,
  width: '400px',
};

export default EditBiodataSiswa;
