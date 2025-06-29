import React, { useState, useEffect } from 'react';

const EditorAkademik = ({ isSidebarOpen }) => {
  const [mapelList, setMapelList] = useState([]);
  const [selectedMapelId, setSelectedMapelId] = useState('');
  const [selectedKode, setSelectedKode] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [judul, setJudul] = useState('');
  const [materiDeskripsi, setMateriDeskripsi] = useState('');
  const [file, setFile] = useState(null);
  const [deleteMapelId, setDeleteMapelId] = useState('');

  useEffect(() => {
    const fetchMapel = async () => {
      const res = await fetch("http://localhost:5000/mapel");
      const data = await res.json();
      setMapelList(data);
    };
    fetchMapel();
  }, []);

  useEffect(() => {
    const selected = mapelList.find((m) => m.id === parseInt(selectedMapelId));
    if (selected) {
      setDeskripsi(selected.deskripsi || '');
      setSelectedKode(selected.kode_mapel || '');
    } else {
      setDeskripsi('');
      setSelectedKode('');
    }
  }, [selectedMapelId, mapelList]);

  const handleSave = async () => {
    const res = await fetch(`http://localhost:5000/mapel/${selectedMapelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kode_mapel: selectedKode,
        nama_mapel: '',
        kelompok: '',
        jam_pelajaran: '',
        deskripsi,
      }),
    });
    const result = await res.json();
    alert('Deskripsi berhasil diperbarui!');
  };

  const handleUploadMateri = async () => {
    if (!judul || !materiDeskripsi || !file) {
      alert("Semua field wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", materiDeskripsi);
    formData.append("file", file);
    formData.append("guru_id", 1); // dummy
    formData.append("jadwal_id", 1); // dummy
    formData.append("tanggal_upload", new Date().toISOString());

    try {
      const res = await fetch("http://localhost:5000/materi", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        alert("Materi berhasil diupload!");
        setJudul("");
        setMateriDeskripsi("");
        setFile(null);
      } else {
        alert("Gagal upload: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  const handleDelete = async () => {
    if (!deleteMapelId) return alert('Pilih mata pelajaran yang ingin dihapus');
    const confirm = window.confirm('Yakin ingin menghapus mata pelajaran ini?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/mapel/${deleteMapelId}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    alert('Mapel berhasil dihapus!');
    setDeleteMapelId('');
    // Refresh data
    const updated = await fetch("http://localhost:5000/mapel");
    setMapelList(await updated.json());
  };

  return (
    <div
      style={{
        paddingLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'padding-left 0.3s ease',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      <div style={{ marginTop: '20px', marginLeft: '20px' }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'gray', margin: '0 0 10px 0' }}>
          Dashboard Edit Data
        </p>
        <h3 style={{ fontSize: '16px', margin: '0 0 5px 0' }}>Tambah Data Mata Pelajaran</h3>
        <p style={{ fontSize: '13px', color: 'gray', marginBottom: '20px' }}>
          Menambahkan mata pelajaran baru ke dalam sistem akademik
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px' }}>
        {/* Box Kiri */}
        <div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              width: '300px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              marginTop: '10px',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>Edit Deskripsi Kurikulum</h4>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px' }}>
              Mengubah deskripsi mata pelajaran yang ada di dalam kurikulum
            </p>

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Pilih Mata Pelajaran
            </label>
            <select
              value={selectedMapelId}
              onChange={(e) => setSelectedMapelId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '15px',
              }}
            >
              <option value="">-- Pilih --</option>
              {mapelList.map((mapel) => (
                <option key={mapel.id} value={mapel.id}>
                  {mapel.nama_mapel}
                </option>
              ))}
            </select>

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Kode Mata Pelajaran
            </label>
            <input
              type="text"
              value={selectedKode}
              readOnly
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '15px',
                backgroundColor: '#e8f0fe',
              }}
            />

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Edit Deskripsi Kurikulum
            </label>
            <textarea
              rows="4"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '20px',
                backgroundColor: '#e8f0fe',
              }}
            />

            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Box Kanan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '-40px', marginBottom: '1px' }}>
          {/* Upload/Edit Materi */}
          <div style={{ backgroundColor: '#fff', padding: '20px', width: '300px', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Upload/Edit Materi Pembelajaran</h4>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px' }}>
              Mengunggah dan mengedit materi pembelajaran untuk mata pelajaran ini.
            </p>

            <label style={{ fontSize: '14px' }}>Judul</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />

            <label style={{ fontSize: '14px' }}>Deskripsi</label>
            <textarea
              rows={3}
              value={materiDeskripsi}
              onChange={(e) => setMateriDeskripsi(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '10px',
              }}
            />

            <label style={{ fontSize: '14px' }}>File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                width: '100%',
                padding: '5px',
                marginBottom: '20px',
              }}
            />

            <button
              onClick={handleUploadMateri}
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Simpan
            </button>
          </div>

          {/* Hapus Mata Pelajaran */}
          <div style={{ backgroundColor: '#fff', padding: '20px', width: '300px', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Hapus Mata Pelajaran Lama</h4>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '10px' }}>
              Menghapus data mata pelajaran yang sudah tidak digunakan
            </p>
            <p style={{ fontSize: '13px', color: 'gray', marginBottom: '10px' }}>
              Data yang dihapus tidak dapat dipulihkan
            </p>

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Pilih Mata Pelajaran
            </label>
            <select
              value={deleteMapelId}
              onChange={(e) => setDeleteMapelId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '20px',
              }}
            >
              <option value="">-- Pilih --</option>
              {mapelList.map((mapel) => (
                <option key={mapel.id} value={mapel.id}>
                  {mapel.nama_mapel}
                </option>
              ))}
            </select>

            <button
              onClick={handleDelete}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorAkademik;
