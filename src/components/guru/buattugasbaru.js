import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BuatTugasBaru = () => {
  const [kelasList, setKelasList] = useState([]);
  const [form, setForm] = useState({
    judul: '',
    deskripsi: '',
    poin: '',
    kelasId: '',
    tenggat: '',
    file: null,
  });

  const fileInputRef = useRef();

  useEffect(() => {
  const fetchKelasGuru = async () => {
    try {
      const res = await axios.get('http://localhost:5000/guru/kelas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setKelasList(res.data);
    } catch (err) {
      console.error('Gagal ambil kelas guru', err); 
    }
  };

  fetchKelasGuru();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('judul', form.judul);
      data.append('deskripsi', form.deskripsi);
      data.append('poin', form.poin);
      data.append('kelas_id', form.kelasId);
      data.append('tenggat', form.tenggat);
      data.append('link_drive', form.link_drive);
      data.append('link_eksternal', form.link_eksternal);
      if (form.file) data.append('file', form.file);

 await axios({
  method: 'post',
  url: 'http://localhost:5000/tugas',
  data: data,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
});
      alert('Tugas berhasil ditambahkan!');

      // Reset form
      setForm({
        judul: '',
        deskripsi: '',
        poin: '',
        kelasId: '',
        tenggat: '',
        file: null,
        link_drive: '',
        link_eksternal: '',
      });
    } catch (err) {
      console.error('Gagal kirim tugas:', err);
      alert('Gagal mengirim tugas');
    }
  };


  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', maxWidth: '500px' }}>
      <h4 style={{ marginBottom: '1.5rem' }}>Buat Tugas Baru</h4>

      <div className="mb-3">
        <label>Judul</label>
        <input
          type="text"
          className="form-control"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          placeholder="Judul"
        />
      </div>

      <div className="mb-3">
        <label>Deskripsi</label>
        <textarea
          className="form-control"
          rows="3"
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
        />
      </div>

      <div className="mb-3">
        <label>Lampiran (Opsional)</label>
        <div
          className="p-3 mt-2 border rounded d-flex justify-content-end gap-2"
          style={{ backgroundColor: '#f9f9f9' }}
        >
{/* Tombol Google Drive */}
<button
  className="btn btn-light border"
  title="Google Drive"
  onClick={() => {
    const url = prompt("Masukkan link Google Drive:");
    if (url) {
      setForm(prev => ({ ...prev, link_drive: url }));
    }
  }}
>
  <img
    src="https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
    alt="Drive"
    width={20}
  />
</button>
          {/* Tombol Upload File */}
          <button className="btn btn-light border" title="Unggah File" onClick={handleUploadClick}>
            <i className="bi bi-upload"></i>
          </button>
{/* Tombol Tambah Link */}
<button
  className="btn btn-light border"
  title="Tambahkan Link Eksternal"
  onClick={() => {
    const url = prompt("Masukkan link eksternal:");
    if (url) {
      setForm(prev => ({ ...prev, link_eksternal: url }));
    }
  }}
>
  <i className="bi bi-link-45deg"></i>
</button>
          {/* Hidden file input */}
          <input
            type="file"
            accept=".pdf,.docx,.pptx,.png,.jpg,.jpeg"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        {/* Nama file jika ada */}
        {form.file && (
          <div className="mt-2">
            <small className="text-muted">File dipilih: {form.file.name}</small>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label>Poin</label>
        <input
          type="number"
          className="form-control"
          name="poin"
          value={form.poin}
          onChange={handleChange}
          placeholder="Poin"
        />
      </div>

      <div className="mb-3">
        <label>Kelas</label>
        <select
          className="form-select"
          name="kelasId"
          value={form.kelasId}
          onChange={handleChange}
        >
          <option value="">Pilih Kelas</option>
          {kelasList.map(k => (
            <option key={k.id} value={k.id}>{k.nama_kelas}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Tenggat</label>
        <input
          type="date"
          className="form-control"
          name="tenggat"
          value={form.tenggat}
          onChange={handleChange}
        />
      </div>

      {form.link_drive && (
  <div className="mt-2">
    <small className="text-muted">Link Drive: {form.link_drive}</small>
  </div>
)}

{form.link_eksternal && (
  <div className="mt-1">
    <small className="text-muted">Link Eksternal: {form.link_eksternal}</small>
  </div>
)}

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={!form.judul || !form.kelasId || !form.tenggat}
      >
        Tugaskan
      </button>
    </div>
  );
};

export default BuatTugasBaru;
