import React, { useState, useEffect } from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import axios from 'axios';

const GuruMateri = () => {
  const [kelas, setKelas] = useState('');
  const [mapel, setMapel] = useState('');
  const [bab, setBab] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState(null);
  const [kelasList, setKelasList] = useState([]);
  const [mapelList, setMapelList] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/kelas');
        setKelasList(res.data);
      } catch (err) {
        console.error('Gagal ambil data kelas:', err);
      }
    };

    const fetchMapel = async () => {
      try {
        const res = await axios.get('http://localhost:5000/mapel');
        setMapelList(res.data);
      } catch (err) {
        console.error('Gagal ambil data mapel:', err);
      }
    };

    fetchKelas();
    fetchMapel();
  }, []);

const handleUploadMateri = async () => {
  if (!kelas || !mapel || !bab || !deskripsi || !file) {
    alert('Semua field harus diisi');
    return;
  }

  const formData = new FormData();
  formData.append('jadwal_id', mapel); // mapel = jadwal_id
  formData.append('judul', bab);
  formData.append('deskripsi', deskripsi);
  formData.append('file', file);

  const token = localStorage.getItem("token");

  try {
    const res = await axios.post('http://localhost:5000/materi', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    alert('Materi berhasil diupload!');
    setKelas('');
    setMapel('');
    setBab('');
    setDeskripsi('');
    setFile(null);
  } catch (err) {
    console.error("Gagal upload materi:", err);
    alert('Gagal upload materi');
  }
};

  return (
    <div style={{ padding: '20px', marginLeft: '150px' }}>
      <h2>Materi</h2>

      <div style={boxStyle}>
        <h4>Upload Materi</h4>
        <p>Tambah File Pembelajaran</p>
        <p style={{ fontSize: '12px', color: 'gray' }}>Jenis File : PDF, PPT, DOC, Video</p>

<label htmlFor="fileInput" style={fileBox}>
  <FaFolderOpen size={24} color="#f4b400" style={{ marginRight: '8px' }} />
  Pilih File
  <input
    type="file"
    id="fileInput"
    style={{ display: 'none' }}
    onChange={handleFileChange}
  />
</label>

{/* Tampilkan nama file jika ada */}
{file && (
  <div style={{ marginTop: '8px', fontSize: '13px', color: '#333' }}>
    File dipilih: <strong>{file.name}</strong>
  </div>
)}

<span style={{ fontSize: '12px', color: '#888' }}>
  Contoh: Maksimal ukuran file 50 MB
</span>

        <div style={formGroup}>
          <label>Kelas</label>
          <select style={inputStyle} value={kelas} onChange={(e) => setKelas(e.target.value)}>
            <option value="">Pilih Kelas</option>
            {kelasList.map((kls) => (
              <option key={kls.id} value={kls.id}>
                {kls.nama_kelas}
              </option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label>Mata Pelajaran</label>
          <select style={inputStyle} value={mapel} onChange={(e) => setMapel(e.target.value)}>
            <option value="">Pilih Mapel</option>
            {mapelList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nama_mapel}
              </option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label>Materi / Bab</label>
          <input
            type="text"
            style={inputStyle}
            value={bab}
            onChange={(e) => setBab(e.target.value)}
          />
        </div>

        <div style={formGroup}>
          <label>Deskripsi</label>
          <input
            type="text"
            style={inputStyle}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        <button style={uploadButton} onClick={handleUploadMateri}>
          <FaFolderOpen style={{ marginRight: '8px' }} /> Upload
        </button>
      </div>
    </div>
  );
};

const boxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#fafafa',
  maxWidth: '500px',
};

const formGroup = {
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '4px',
};

const fileBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px',
  marginTop: '10px',
  marginBottom: '10px',
  border: '1px dashed #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  fontWeight: 'bold',
  width: '100%',
};

const uploadButton = {
  padding: '8px 16px',
  backgroundColor: '#cce0f5',
  color: '#007bff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginTop: '10px',
};

export default GuruMateri;
