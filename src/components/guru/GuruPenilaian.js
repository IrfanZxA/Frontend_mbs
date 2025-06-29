import React, { useState } from 'react';

const GuruPenilaian = () => {
  const kelasOptions = [
    'Kelas 7A', 'Kelas 7B', 'Kelas 7C', 'Kelas 7D',
    'Kelas 8A', 'Kelas 8B', 'Kelas 8C', 'Kelas 8D',
    'Kelas 9A', 'Kelas 9B', 'Kelas 9C', 'Kelas 9D',
  ];

  const [selectedKelasInput, setSelectedKelasInput] = useState('');
  const [selectedKelasRekap, setSelectedKelasRekap] = useState('');
  const [namaSiswa, setNamaSiswa] = useState('');
  const [jenisPenilaian, setJenisPenilaian] = useState('');
  const [namaTugas, setNamaTugas] = useState('');
  const [nilai, setNilai] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [showEditNotif, setShowEditNotif] = useState(false);
  const [rekapPopupOpen, setRekapPopupOpen] = useState(false);

  const isFormComplete = namaSiswa && selectedKelasInput && jenisPenilaian && namaTugas && nilai;

  const handleSubmit = () => {
    if (isFormComplete) {
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
    }
  };

  const handleEditSave = () => {
    setShowEditNotif(true);
    setTimeout(() => {
      setShowEditNotif(false);
      setEditPopupOpen(false);
    }, 2000);
  };

  const handleRekapChange = (e) => {
    setSelectedKelasRekap(e.target.value);
    if (e.target.value) {
      setRekapPopupOpen(true);
    }
  };

  return (
    <div style={{ padding: '20px', marginLeft: '150px', position: 'relative' }}>
      <h2>Penilaian</h2>

      {showNotif && <div style={notifStyle}>Nilai berhasil disimpan!</div>}

      <div style={boxStyle}>
        <h4>Input Nilai</h4>

        <div style={formGroup}>
          <label>Nama Siswa</label>
          <input type="text" style={inputStyle} value={namaSiswa} onChange={(e) => setNamaSiswa(e.target.value)} />
        </div>

        <div style={formGroup}>
          <label>Kelas</label>
          <select style={inputStyle} value={selectedKelasInput} onChange={(e) => setSelectedKelasInput(e.target.value)}>
            <option value="">Pilih Kelas</option>
            {kelasOptions.map((kelas, i) => <option key={i} value={kelas}>{kelas}</option>)}
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

        <div style={formGroup}>
          <label>Nama Tugas</label>
          <input type="text" style={inputStyle} value={namaTugas} onChange={(e) => setNamaTugas(e.target.value)} />
        </div>

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
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}></td>
                    <td style={tdStyle}>
                      <button style={editBtn} onClick={() => setEditPopupOpen(true)}>Edit</button>
                    </td>
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
          <div style={modalBox}>
            <h4>Edit Nilai</h4>
            <div style={formGroup}><label>Nama Siswa</label><input type="text" style={inputStyle} /></div>
            <div style={formGroup}>
              <label>Jenis Penilaian</label>
              <div>
                <label><input type="radio" name="edit_penilaian" /> Tugas</label>
                <label style={{ marginLeft: '15px' }}><input type="radio" name="edit_penilaian" /> UTS</label>
                <label style={{ marginLeft: '15px' }}><input type="radio" name="edit_penilaian" /> UAS</label>
              </div>
            </div>
            <div style={formGroup}><label>Nama Tugas</label><input type="text" style={inputStyle} /></div>
            <div style={formGroup}><label>Nilai</label><input type="text" style={{ ...inputStyle, width: '100px' }} /></div>
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

// Style constants...
// (style objects seperti boxStyle, formGroup, inputStyle, buttonStyle, etc tetap tidak berubah)




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

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '4px'
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
  fontSize: '16px',
};

const popupStyle = {
  border: '1px solid #ccc',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  maxWidth: '1000px',
  width: '100%',
  marginTop: '20px',
  marginLeft: '-50px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px',
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
};

const editBtn = {
  padding: '4px 8px',
  border: '1px solid #007bff',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalBox = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '8px',
  width: '400px',
  position: 'relative'
};

export default GuruPenilaian;
