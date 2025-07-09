import React from 'react';
import { useNavigate } from 'react-router-dom';

const PenilaianOrtu = () => {
  const navigate = useNavigate();

  // ⬇️ Ganti dengan data real mapel dari backend kalau bisa
  const subjects = [
    { no: 1, name: 'Bahasa Indonesia', code: 'A1', mapelId: 1 },
    { no: 2, name: 'Bahasa Inggris', code: 'A2', mapelId: 2 },
    { no: 3, name: 'Agama', code: 'A3', mapelId: 3 },
    { no: 4, name: 'Matematika', code: 'A4', mapelId: 4 },
    { no: 5, name: 'Prakarya', code: 'A5', mapelId: 5 },
    { no: 6, name: 'Olahraga', code: 'A6', mapelId: 6 },
    { no: 7, name: 'PPKN', code: 'A7', mapelId: 7 },
    { no: 8, name: 'TIK', code: 'A8', mapelId: 8 },
    { no: 9, name: 'Biologi', code: 'A9', mapelId: 9 },
    { no: 10, name: 'Fisika', code: 'A10', mapelId: 10 },
    { no: 11, name: 'Kimia', code: 'A11', mapelId: 11 },
    { no: 12, name: 'Seni Budaya', code: 'A12', mapelId: 12 },
    { no: 13, name: 'Sejarah', code: 'A13', mapelId: 13 },
    { no: 14, name: 'Akidah akhlak', code: 'A14', mapelId: 14 },
  ];

const handleClick = (mapelId) => {
  navigate(`/orang-tua/penilaian/${mapelId}`);
};

  return (
    <div className="container-fluid mt-4" style={{ maxWidth: '900px' }}>
      <h5 className="mb-3">Penilaian</h5>

      <div
        className="p-3 mb-3 rounded"
        style={{
          backgroundColor: '#d2e8f7',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(255, 255, 255, 0.07)',
          color: 'white',
        }}
      >
        "Nilai Tugas, Uts/Uas, Rata" nilai mata pelajaran
      </div>

      <p>Pilih mata pelajaran untuk melihat nilai</p>

      <div className="table-responsive">
        <table
          className="table"
          style={{
            backgroundColor: 'white',
            borderCollapse: 'collapse',
            width: '100%',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#d9d9d9', textAlign: 'center' }}>
              <th style={{ backgroundColor: '#d9d9d9', width: '80px' }}>No</th>
              <th style={{ backgroundColor: '#d2e8f7', border: '2px solid white' }}>Mata pelajaran</th>
              <th style={{ backgroundColor: '#d9d9d9', width: '100px' }}>Kode</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.no} style={{ textAlign: 'center' }}>
                <td style={{ backgroundColor: '#d9d9d9', border: '2px solid white' }}>{subject.no}</td>
                <td
                  style={{
                    backgroundColor: '#d2e8f7',
                    border: '2px solid white',
                    cursor: 'pointer',
                    color: 'black',
                  }}
                  onClick={() => handleClick(subject.mapelId)}
                >
                  {subject.name}
                </td>
                <td style={{ backgroundColor: '#d9d9d9', border: '2px solid white' }}>{subject.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenilaianOrtu;
