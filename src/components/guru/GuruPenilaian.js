// GuruPenilaian.js
import React, { useState } from 'react';
import axios from 'axios';

const GuruPenilaian = () => {
  const kelasOptions = [
    'Kelas 7A', 'Kelas 7B', 'Kelas 7C', 'Kelas 7D',
    'Kelas 8A', 'Kelas 8B', 'Kelas 8C', 'Kelas 8D',
    'Kelas 9A', 'Kelas 9B', 'Kelas 9C', 'Kelas 9D',
  ];

  const [selectedKelasInput, setSelectedKelasInput] = useState('');
  const [selectedKelasRekap, setSelectedKelasRekap] = useState('');
  const [siswaList, setSiswaList] = useState([]);
  const [namaSiswa, setNamaSiswa] = useState('');
  const [jenisPenilaian, setJenisPenilaian] = useState('');
  const [nilai, setNilai] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [showEditNotif, setShowEditNotif] = useState(false);
  const [rekapPopupOpen, setRekapPopupOpen] = useState(false);
  const [listTugas, setListTugas] = useState([]);
  const [selectedTugasId, setSelectedTugasId] = useState('');
  const [rekapNilai, setRekapNilai] = useState([]);
  const [editData, setEditData] = useState(null);

  const isFormComplete =
    namaSiswa && selectedKelasInput && jenisPenilaian && nilai &&
    (jenisPenilaian === 'Tugas' ? selectedTugasId : true);

  const handleChangeKelasInput = async (kelasValue) => {
    setSelectedKelasInput(kelasValue);
    setNamaSiswa('');
    const kelasId = kelasOptions.indexOf(kelasValue) + 1;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://localhost:5000/absensi/siswa/${kelasId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiswaList(res.data);

      const tugasRes = await axios.get(`http://localhost:5000/tugas/guru`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListTugas(tugasRes.data);
    } catch (err) {
      alert("Gagal ambil data siswa atau tugas");
    }
  };

  const handleSubmit = async () => {
    if (!isFormComplete) return;

    const token = localStorage.getItem("token");
    const mapel_id = localStorage.getItem("mapel_id");
    const tanggal = new Date().toISOString().split("T")[0];
    const kelas_id = kelasOptions.indexOf(selectedKelasInput) + 1;

    const payload = {
      siswa_id: namaSiswa,
      mapel_id,
      kategori: jenisPenilaian,
      nilai: parseInt(nilai),
      tanggal,
      kelas_id,
    };

    if (jenisPenilaian === 'Tugas') {
      payload.tugas_id = selectedTugasId;
    }

    try {
      await axios.post("http://localhost:5000/nilai", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
      setNamaSiswa('');
      setJenisPenilaian('');
      setSelectedTugasId('');
      setNilai('');
    } catch (err) {
      alert("Gagal menyimpan nilai!");
      console.error(err);
    }
  };

  const handleRekapChange = async (e) => {
    const selected = e.target.value;
    setSelectedKelasRekap(selected);
    const kelasId = kelasOptions.indexOf(selected) + 1;

    if (selected) {
      setRekapPopupOpen(true);
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`http://localhost:5000/nilai/rekap/${kelasId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRekapNilai(res.data);
      } catch (err) {
        alert("Gagal ambil rekap nilai");
      }
    }
  };

  const openEditPopup = (item) => {
    setEditData(item);
    setJenisPenilaian(item.kategori);
    setNilai(item.nilai);
    setSelectedTugasId(item.tugas_id || '');
    setEditPopupOpen(true);
  };

  const handleEditSave = async () => {
    const token = localStorage.getItem("token");
    const mapel_id = localStorage.getItem("mapel_id");
    const tanggal = new Date().toISOString().split("T")[0];

    const payload = {
      siswa_id: editData.siswa_id,
      mapel_id,
      kategori: jenisPenilaian,
      nilai: parseInt(nilai),
      tanggal,
      kelas_id: editData.kelas_id
    };

    if (jenisPenilaian === 'Tugas') {
      payload.tugas_id = selectedTugasId;
    }

    try {
      await axios.put(`http://localhost:5000/nilai/${editData.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEditNotif(true);
      setTimeout(() => {
        setShowEditNotif(false);
        setEditPopupOpen(false);
        handleRekapChange({ target: { value: selectedKelasRekap } });
      }, 2000);
    } catch (err) {
      alert("Gagal mengupdate nilai!");
    }
  };

  return (
    <div style={{ padding: '20px', marginLeft: '150px', position: 'relative' }}>
      <h2>Penilaian</h2>
      {showNotif && <div style={notifStyle}>Nilai berhasil disimpan!</div>}

      <div style={boxStyle}>
        <h4>Input Nilai</h4>
        <div style={formGroup}>
          <label>Kelas</label>
          <select style={inputStyle} value={selectedKelasInput} onChange={(e) => handleChangeKelasInput(e.target.value)}>
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((kelas, i) => <option key={i} value={kelas}>{kelas}</option>)}
          </select>
        </div>

        <div style={formGroup}>
          <label>Nama Siswa</label>
          <select style={inputStyle} value={namaSiswa} onChange={(e) => setNamaSiswa(e.target.value)}>
            <option value="">Pilih Siswa</option>
            {siswaList.map((siswa) => (
              <option key={siswa.id} value={siswa.id}>{siswa.nama_lengkap}</option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label>Jenis Penilaian</label>
          <div>
            <label><input type="radio" name="penilaian" value="Tugas" onChange={(e) => setJenisPenilaian(e.target.value)} /> Tugas</label>
            <label style={{ marginLeft: '15px' }}><input type="radio" name="penilaian" value="UTS" onChange={(e) => setJenisPenilaian(e.target.value)} /> UTS</label>
            <label style={{ marginLeft: '15px' }}><input type="radio" name="penilaian" value="UAS" onChange={(e) => setJenisPenilaian(e.target.value)} /> UAS</label>
          </div>
        </div>

        {jenisPenilaian === 'Tugas' && (
          <div style={formGroup}>
            <label>Nama Tugas</label>
            <select style={inputStyle} value={selectedTugasId} onChange={(e) => setSelectedTugasId(e.target.value)}>
              <option value="">Pilih Tugas</option>
              {listTugas.map((tugas) => (
                <option key={tugas.id} value={tugas.id}>{tugas.judul}</option>
              ))}
            </select>
          </div>
        )}

        <div style={formGroup}>
          <label>Nilai</label>
          <input type="text" style={{ ...inputStyle, width: '100px' }} value={nilai} onChange={(e) => setNilai(e.target.value)} />
        </div>

        <button style={isFormComplete ? buttonStyle : disabledButtonStyle} disabled={!isFormComplete} onClick={handleSubmit}>
          Simpan Nilai
        </button>
      </div>

      <div style={boxStyle}>
        <h4>Rekapan Nilai</h4>
        <div style={formGroup}>
          <label>Kelas</label>
          <select style={inputStyle} value={selectedKelasRekap} onChange={handleRekapChange}>
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((kelas, i) => <option key={i} value={kelas}>{kelas}</option>)}
          </select>
        </div>
      </div>

      {rekapPopupOpen && (
        <div style={modalOverlay}>
          <div style={popupStyle}>
            <h4>Rekapan Nilai - {selectedKelasRekap}</h4>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>No</th>
                  <th style={thStyle}>Nama</th>
                  <th style={thStyle}>Tugas</th>
                  <th style={thStyle}>UTS</th>
                  <th style={thStyle}>UAS</th>
                  <th style={thStyle}>Rata - rata</th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rekapNilai.map((item, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>{item.nama_lengkap}</td>
                    <td style={tdStyle}>{item.tugas || '-'}</td>
                    <td style={tdStyle}>{item.uts || '-'}</td>
                    <td style={tdStyle}>{item.uas || '-'}</td>
                    <td style={tdStyle}>{item.rata_rata}</td>
                    <td style={tdStyle}><button style={editBtn} onClick={() => openEditPopup(item)}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setRekapPopupOpen(false)} style={{ marginTop: '16px' }}>Tutup</button>
          </div>
        </div>
      )}

      {editPopupOpen && (
        <div style={modalOverlay}>
          <div style={popupStyle}>
            <h4>Edit Nilai</h4>
            <div style={formGroup}><label>Nama Siswa</label><input type="text" style={inputStyle} value={editData?.nama_lengkap || ''} disabled /></div>
            <div style={formGroup}>
              <label>Jenis Penilaian</label>
              <div>
                <label><input type="radio" name="edit_penilaian" value="Tugas" checked={jenisPenilaian === 'Tugas'} onChange={(e) => setJenisPenilaian(e.target.value)} /> Tugas</label>
                <label style={{ marginLeft: '15px' }}><input type="radio" name="edit_penilaian" value="UTS" checked={jenisPenilaian === 'UTS'} onChange={(e) => setJenisPenilaian(e.target.value)} /> UTS</label>
                <label style={{ marginLeft: '15px' }}><input type="radio" name="edit_penilaian" value="UAS" checked={jenisPenilaian === 'UAS'} onChange={(e) => setJenisPenilaian(e.target.value)} /> UAS</label>
              </div>
            </div>
            {jenisPenilaian === 'Tugas' && (
              <div style={formGroup}>
                <label>Nama Tugas</label>
                <select style={inputStyle} value={selectedTugasId} onChange={(e) => setSelectedTugasId(e.target.value)}>
                  <option value="">Pilih Tugas</option>
                  {listTugas.map((tugas) => (
                    <option key={tugas.id} value={tugas.id}>{tugas.judul}</option>
                  ))}
                </select>
              </div>
            )}
            <div style={formGroup}><label>Nilai</label><input type="text" style={{ ...inputStyle, width: '100px' }} value={nilai} onChange={(e) => setNilai(e.target.value)} /></div>
            <div style={{ marginTop: '16px' }}>
              <button onClick={() => setEditPopupOpen(false)} style={{ marginRight: '10px' }}>Batal</button>
              <button onClick={handleEditSave} style={buttonStyle}>Simpan</button>
            </div>
            {showEditNotif && <div style={notifStyle}>Perubahan berhasil disimpan</div>}
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '4px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const popupStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '800px',
  width: '100%',
  maxHeight: '80vh',
  overflowY: 'auto'
};

const boxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '20px',
  backgroundColor: '#fafafa',
  maxWidth: '500px'
};

const formGroup = {
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column'
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer'
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#cce0f5',
  cursor: 'not-allowed'
};

const notifStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '14px 24px',
  borderRadius: '8px',
  border: '1px solid #c3e6cb',
  boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
  zIndex: 9999,
  fontWeight: 'bold',
  fontSize: '16px'
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f2f2f2'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px'
};

const editBtn = {
  padding: '5px 10px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default GuruPenilaian;
