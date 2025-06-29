import React, { useState } from 'react';
import { FaFolderOpen } from 'react-icons/fa';

const GuruMateri = () => {
  const kelasOptions = [
    'Kelas 7A', 'Kelas 7B', 'Kelas 7C', 'Kelas 7D',
    'Kelas 8A', 'Kelas 8B', 'Kelas 8C', 'Kelas 8D',
    'Kelas 9A', 'Kelas 9B', 'Kelas 9C', 'Kelas 9D'
  ];

  const [kelas, setKelas] = useState('');
  const [mapel, setMapel] = useState('');
  const [bab, setBab] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        <span style={{ fontSize: '12px', color: '#888' }}>Contoh: Maksimal ukuran file 50 MB</span>

        <div style={formGroup}>
          <label>Kelas</label>
          <select style={inputStyle} value={kelas} onChange={(e) => setKelas(e.target.value)}>
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((kls, i) => (
              <option key={i} value={kls}>{kls}</option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label>Mata Pelajaran</label>
          <input type="text" style={inputStyle} value={mapel} onChange={(e) => setMapel(e.target.value)} />
        </div>

        <div style={formGroup}>
          <label>Materi / Bab</label>
          <input type="text" style={inputStyle} value={bab} onChange={(e) => setBab(e.target.value)} />
        </div>

        <div style={formGroup}>
          <label>Deskripsi</label>
          <input type="text" style={inputStyle} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
        </div>

        <button style={uploadButton}>
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
  maxWidth: '500px'
};

const formGroup = {
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '4px'
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
  width: '100%'
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
  marginTop: '10px'
};

export default GuruMateri;
