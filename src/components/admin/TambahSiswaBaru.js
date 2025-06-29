import React, { useEffect, useState } from 'react';

const TambahSiswaBaru = ({ isSidebarOpen }) => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nis, setNis] = useState('');
  const [usernameStatus, setUsernameStatus] = useState(null); // 'available' | 'taken' | null
  const [kelasId, setKelasId] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [namaOrtu, setNamaOrtu] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [kelasList, setKelasList] = useState([]);
  const [nikOrtu, setNikOrtu] = useState('');
  const token = localStorage.getItem("token");

  // ✅ Ambil daftar kelas
  useEffect(() => {
    const fetchKelas = async () => {
      const res = await fetch('http://localhost:5000/kelas');
      const data = await res.json();
      setKelasList(data);
    };
    fetchKelas();
  }, []);

  // ✅ Cek username (NIS/NISN) apakah tersedia
  useEffect(() => {
    const timer = setTimeout(() => {
      if (nis.trim()) {
        fetch(`http://localhost:5000/siswa/cek-username/${nis}`)
          .then(res => res.json())
          .then(data => {
            setUsernameStatus(data.available ? 'available' : 'taken');
          })
          .catch(() => setUsernameStatus(null));
      } else {
        setUsernameStatus(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [nis]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSiswa = {
  username: nis,
  password_hash: nis,
  nama_lengkap: namaLengkap,
  tempat_lahir: tempatLahir,
  tanggal_lahir: tanggalLahir,
  jenis_kelamin: jenisKelamin,
  kelas_id: parseInt(kelasId),
  nama_ortu: namaOrtu,
  nik: nikOrtu,
  alamat,
  no_hp: telepon, 
};

    try {
      const res = await fetch("http://localhost:5000/siswa", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newSiswa),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.error?.toLowerCase().includes("duplicate")) {
          alert("Username sudah digunakan. Gunakan username lain.");
        } else {
          alert("Gagal menambahkan siswa: " + result.error);
        }
        return;
      }

      alert('Siswa berhasil ditambahkan!');
      setNamaLengkap('');
      setNis('');
      setKelasId('');
      setTempatLahir('');
      setTanggalLahir('');
      setJenisKelamin('L');
      setNamaOrtu('');
      setAlamat('');
      setTelepon('');
      setUsernameStatus(null);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menambahkan siswa.');
    }
  };

  return (
    <div
      style={{
        padding: '30px 20px',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h4 style={{ marginBottom: '20px' }}>Manajemen Siswa</h4>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <form onSubmit={handleSubmit}>
            <label>Nama Lengkap</label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
              style={inputStyle}
            />

            <label>NIS / NISN</label>
            <input
              type="text"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              required
              style={{
                ...inputStyle,
                borderColor: usernameStatus === 'taken' ? 'red' : '#ccc',
              }}
            />
            {usernameStatus === 'taken' && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>
                Username sudah dipakai
              </p>
            )}
            {usernameStatus === 'available' && (
              <p style={{ color: 'green', fontSize: '12px', marginTop: '-10px' }}>
                Username tersedia
              </p>
            )}

            <label>Kelas</label>
            <select
              value={kelasId}
              onChange={(e) => setKelasId(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">-- Pilih Kelas --</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.nama_kelas}
                </option>
              ))}
            </select>

            <label>Tempat Lahir</label>
            <input
              type="text"
              value={tempatLahir}
              onChange={(e) => setTempatLahir(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Tanggal Lahir</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Jenis Kelamin</label>
            <select
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
              style={inputStyle}
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>

            <label>Nama Orang Tua</label>
            <input
              type="text"
              value={namaOrtu}
              onChange={(e) => setNamaOrtu(e.target.value)}
              required
              style={inputStyle}
            />

            <label>NIK Orang Tua</label>
            <input
              type="text"
              value={nikOrtu}
              onChange={(e) => setNikOrtu(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Alamat</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
              style={inputStyle}
            />

            <label>Nomor Telepon</label>
            <input
              type="text"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              required
              style={inputStyle}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="submit" style={submitButton}>
                Simpan
              </button>
              <button type="reset" style={resetButton}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  marginBottom: '15px',
};

const submitButton = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const resetButton = {
  backgroundColor: '#f1f1f1',
  color: '#000',
  border: '1px solid #ccc',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default TambahSiswaBaru;
