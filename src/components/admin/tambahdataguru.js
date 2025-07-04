import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TambahDataGuru = () => {
const [formData, setFormData] = useState({
  nama_lengkap: '',
  nip: '',
  username: '',
  password: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  no_hp: '',
  alamat: '',
  mapel_id: ''
});


  const [jadwalList, setJadwalList] = useState([]);
  const [showJadwalForm, setShowJadwalForm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);

  const [showNotif, setShowNotif] = useState(false);
  const [showError, setShowError] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      const kelasRes = await axios.get('http://localhost:5000/kelas');
      const mapelRes = await axios.get('http://localhost:5000/mapel');
      setKelasOptions(kelasRes.data);
      setMapelOptions(mapelRes.data);
    };
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJadwalChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...jadwalList];
    updated[index][name] = value;
    setJadwalList(updated);
  };

  const addJadwalRow = () => {
    setJadwalList([...jadwalList, {
      kelas_id: '',
      mapel_id: '',
      hari: '',
      jam_mulai: '',
      jam_selesai: ''
    }]);
  };

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token"); // ambil token dari localStorage

    await axios.post(
      'http://localhost:5000/admin/guru',
      {
        ...formData,
        jadwal: jadwalList
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ kirim token ke backend
        },
      }
    );

    setShowNotif(true);
    setShowError(false);
    setTimeout(() => setShowNotif(false), 3000);

    // Reset form
    setFormData({
      nama_lengkap: '',
      nip: '',
      username: '',
      password: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      no_hp: '',
      alamat: '',
      mapel_id: ''
    });
    setJadwalList([]);
    setShowJadwalForm(false);
  } catch (err) {
    console.error('Gagal tambah guru:', err);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }
};

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h4>Tambah Data Guru</h4>
      <div className="mb-3">
        <label>Nama Lengkap</label>
        <input className="form-control" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleFormChange} />
      </div>
      <div className="mb-3">
        <label>NIP</label>
        <input className="form-control" name="nip" value={formData.nip} onChange={handleFormChange} />
      </div>
 <div className="mb-3">
  <label>Jenis Kelamin</label><br />
  <input type="radio" name="jenis_kelamin" value="L" checked={formData.jenis_kelamin === 'L'} onChange={handleFormChange} /> Laki-laki
  <input type="radio" name="jenis_kelamin" value="P" checked={formData.jenis_kelamin === 'P'} onChange={handleFormChange} className="ms-3" /> Perempuan
</div>
      <div className="mb-3">
        <label>No HP</label>
        <input className="form-control" name="no_hp" value={formData.no_hp} onChange={handleFormChange} />
      </div>
      <div className="mb-3">
  <label>Username</label>
  <input className="form-control" name="username" value={formData.username} onChange={handleFormChange} />
</div>

<div className="mb-3 position-relative">
  <label>Password</label>
  <input
    className="form-control pe-5"
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleFormChange}
    placeholder="Masukkan password akun guru"
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: 'absolute',
      right: '12px',
      top: '68%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '1.25rem',
      color: '#666'
    }}
  >
    {showPassword ? (
      <i className="bi bi-eye-slash-fill"></i>
    ) : (
      <i className="bi bi-eye-fill"></i>
    )}
  </span>
</div>


<div className="mb-3">
  <label>Tempat Lahir</label>
  <input className="form-control" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleFormChange} />
</div>

<div className="mb-3">
  <label>Tanggal Lahir</label>
  <input className="form-control" type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleFormChange} />
</div>

<div className="mb-3">
  <label>Alamat</label>
  <textarea className="form-control" name="alamat" rows={2} value={formData.alamat} onChange={handleFormChange}></textarea>
</div>

<div className="mb-3">
  <label>Mata Pelajaran</label>
  <select className="form-control" name="mapel_id" value={formData.mapel_id} onChange={handleFormChange}>
    <option value="">-- Pilih Mapel --</option>
    {mapelOptions.map(m => (
      <option key={m.id} value={m.id}>{m.nama_mapel}</option>
    ))}
  </select>
</div>

      {/* Tombol Tampilkan Form Jadwal */}
      {!showJadwalForm && (
        <button className="btn btn-outline-primary mb-4" onClick={() => {
          setShowJadwalForm(true);
          setJadwalList([{ kelas_id: '', mapel_id: '', hari: '', jam_mulai: '', jam_selesai: '' }]);
        }}>
          + Tambah Jadwal Mengajar
        </button>
      )}

      {/* Jadwal Section */}
      {showJadwalForm && (
        <>
          <h5>Jadwal Mengajar</h5>
          {jadwalList.map((jadwal, idx) => (
            <div key={idx} className="border p-3 mb-3 rounded">
              <div className="mb-2">
                <label>Kelas</label>
                <select className="form-control" name="kelas_id" value={jadwal.kelas_id} onChange={(e) => handleJadwalChange(idx, e)}>
                  <option value="">-- Pilih Kelas --</option>
                  {kelasOptions.map(k => (
                    <option key={k.id} value={k.id}>{k.nama_kelas}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label>Mapel</label>
                <select className="form-control" name="mapel_id" value={jadwal.mapel_id} onChange={(e) => handleJadwalChange(idx, e)}>
                  <option value="">-- Pilih Mapel --</option>
                  {mapelOptions.map(m => (
                    <option key={m.id} value={m.id}>{m.nama_mapel}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label>Hari</label>
                <select className="form-control" name="hari" value={jadwal.hari} onChange={(e) => handleJadwalChange(idx, e)}>
                  <option value="">-- Pilih Hari --</option>
                  {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(hari => (
                    <option key={hari} value={hari}>{hari}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label>Jam Mulai</label>
                <input className="form-control" type="time" name="jam_mulai" value={jadwal.jam_mulai} onChange={(e) => handleJadwalChange(idx, e)} />
              </div>
              <div className="mb-2">
                <label>Jam Selesai</label>
                <input className="form-control" type="time" name="jam_selesai" value={jadwal.jam_selesai} onChange={(e) => handleJadwalChange(idx, e)} />
              </div>
            </div>
          ))}

          <button className="btn btn-outline-secondary mb-3" onClick={addJadwalRow}>+ Jadwal Baru</button>
        </>
      )}

      {/* Tombol Submit */}
      <div className="mt-4">
        <button className="btn btn-primary" onClick={handleSubmit}>Simpan</button>
      </div>

      {/* Notifikasi */}
      {showNotif && <div className="alert alert-success mt-3">✅ Guru berhasil ditambahkan!</div>}
      {showError && <div className="alert alert-danger mt-3">❌ Gagal menambahkan guru!</div>}
    </div>
  );
};

export default TambahDataGuru;
