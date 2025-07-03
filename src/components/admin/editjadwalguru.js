import React from 'react';

const EditJadwalGuru = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Header dengan ikon pensil */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#6c757d', fontSize: '16px' }}>
        <img 
          src="/images/logo-pensil.png" 
          alt="Edit" 
          style={{ width: '16px', height: '16px', marginRight: '8px' }} 
        />
        <span>Edit Jadwal Guru</span>
      </div>

      {/* Box tabel */}
      <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }}>
        <table className="table table-bordered" style={{ marginBottom: '1rem' }}>
          <thead>
            <tr>
              <th style={{ fontWeight: 'normal', fontSize: '14px' }}>Nama</th>
              <th style={{ fontWeight: 'normal', fontSize: '14px' }}>NIP / NIK</th>
              <th style={{ fontWeight: 'normal', fontSize: '14px' }}>Mata Pelajaran</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                <button className="btn btn-light btn-sm border">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Tombol cari */}
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-light btn-sm border" disabled>Cari</button>
        </div>
      </div>
    </div>
  );
};

export default EditJadwalGuru;
