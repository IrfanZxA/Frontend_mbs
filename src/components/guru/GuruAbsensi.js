import React, { useState } from 'react';

const GuruAbsensi = () => {
  const [selectedInputKelas, setSelectedInputKelas] = useState('');
  const [selectedRekapKelas, setSelectedRekapKelas] = useState('');
  const [showInputForm, setShowInputForm] = useState(false);
  const [showRekapForm, setShowRekapForm] = useState(false);

  const kelasOptions = [
    'Kelas 7A', 'Kelas 7B', 'Kelas 7C', 'Kelas 7D',
    'Kelas 8A', 'Kelas 8B', 'Kelas 8C', 'Kelas 8D',
    'Kelas 9A', 'Kelas 9B', 'Kelas 9C', 'Kelas 9D',
  ];

  const siswaList = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    nama: '', // akan diisi backend
  }));

  const [absensiData, setAbsensiData] = useState({});
  const [rekapData, setRekapData] = useState({}); // Dummy rekap data

  const handleChangeInputKelas = (value) => {
    setSelectedInputKelas(value);
    setShowInputForm(!!value);
  };

  const handleChangeRekapKelas = (value) => {
    setSelectedRekapKelas(value);
    setShowRekapForm(!!value);
  };

  const handleRadioChange = (id, status) => {
    setAbsensiData((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* BOX INPUT ABSENSI */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="inputKelas" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
          Menginput Absensi
        </label>
        <select
          id="inputKelas"
          value={selectedInputKelas}
          onChange={(e) => handleChangeInputKelas(e.target.value)}
          style={{ padding: '8px', width: '200px', borderRadius: '5px' }}
        >
          <option value="">Pilih Kelas</option>
          {kelasOptions.map((kelas, index) => (
            <option key={index} value={kelas}>{kelas}</option>
          ))}
        </select>
      </div>

      {/* POPUP INPUT ABSENSI */}
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
                <th style={thStyle}>Alfa</th>
              </tr>
            </thead>
            <tbody>
              {siswaList.map((siswa, index) => (
                <tr key={siswa.id}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}></td>
                  <td style={tdStyle}>
                    <input
                      type="radio"
                      name={`absensi-${siswa.id}`}
                      checked={absensiData[siswa.id] === 'Hadir'}
                      onChange={() => handleRadioChange(siswa.id, 'Hadir')}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="radio"
                      name={`absensi-${siswa.id}`}
                      checked={absensiData[siswa.id] === 'Izin'}
                      onChange={() => handleRadioChange(siswa.id, 'Izin')}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="radio"
                      name={`absensi-${siswa.id}`}
                      checked={absensiData[siswa.id] === 'Alfa'}
                      onChange={() => handleRadioChange(siswa.id, 'Alfa')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BOX REKAP ABSENSI */}
      <div>
        <label htmlFor="rekapKelas" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
          Rekap Absensi
        </label>
        <select
          id="rekapKelas"
          value={selectedRekapKelas}
          onChange={(e) => handleChangeRekapKelas(e.target.value)}
          style={{ padding: '8px', width: '200px', borderRadius: '5px' }}
        >
          <option value="">Pilih Kelas</option>
          {kelasOptions.map((kelas, index) => (
            <option key={index} value={kelas}>{kelas}</option>
          ))}
        </select>
      </div>

      {/* POPUP REKAP ABSENSI */}
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
                <th style={thStyle}>Alfa</th>
              </tr>
            </thead>
            <tbody>
              {siswaList.map((siswa, index) => (
                <tr key={siswa.id}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}></td>
                  <td style={tdStyle}>{rekapData[siswa.id]?.Hadir || '-'}</td>
                  <td style={tdStyle}>{rekapData[siswa.id]?.Izin || '-'}</td>
                  <td style={tdStyle}>{rekapData[siswa.id]?.Alfa || '-'}</td>
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
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
  maxWidth: '1000px',
  width: '100%',
  marginTop: '20px',
  marginBottom: '30px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
};

export default GuruAbsensi;
