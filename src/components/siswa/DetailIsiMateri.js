import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailIsiMateri({ materi, onBack }) {
  const [tugasList, setTugasList] = useState([]);

  useEffect(() => {
    const fetchTugas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/siswa/materi/${materi.id}/tugas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTugasList(res.data);
      } catch (err) {
        console.error('Gagal ambil tugas:', err);
      }
    };

    if (materi?.id) {
      fetchTugas();
    }
  }, [materi]);

  if (!materi) return null;

  const fileList = materi.file_url
    ? materi.file_url.split(',').map(f => f.trim())
    : [];

  return (
    <div style={{ padding: '1.5rem' }}>
      {/* Tombol kembali */}
      <button
        onClick={onBack}
        style={{
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#add8e6',
          border: 'none',
          borderRadius: '0.5rem',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        ← Kembali ke daftar materi
      </button>

      {/* Box detail materi */}
      <div
        style={{
          backgroundColor: '#f2f9ff',
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          border: '1px solid #dbe9f5',
        }}
      >
        {/* Header Judul */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#bcdffb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <img src="/images/logo-materi.png" alt="Materi" style={{ width: '18px' }} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: '600' }}>
              {materi.judul}
            </h2>
            <p style={{ fontSize: '0.85rem', margin: 0, color: '#666' }}>
              {new Date(materi.tanggal_upload).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
        </div>

        {/* Deskripsi Materi */}
        <p style={{ fontSize: '0.95rem', color: '#444', marginBottom: '1rem' }}>
          {materi.deskripsi}
        </p>

        {/* Daftar File */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {fileList.map((file, index) => {
            const filename = file.split('/').pop();
            const ext = filename.split('.').pop().toLowerCase();
            const isPDF = ext === 'pdf';
            const isPPT = ['ppt', 'pptx'].includes(ext);

            return (
              <div
                key={index}
                onClick={() =>
                  window.open(`http://localhost:5000/${file.replace(/\\/g, '/')}`, '_blank')
                }
                style={{
                  flex: '1 1 200px',
                  border: '1px solid #ccc',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <img
                  src={
                    isPDF
                      ? '/images/logo-pdf.png'
                      : isPPT
                      ? '/images/logo-ppt.png'
                      : '/images/logo-file.png'
                  }
                  alt="File"
                  style={{ width: '36px', height: '36px' }}
                />
                <div>
                  <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>{filename}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    {isPDF
                      ? 'PDF'
                      : isPPT
                      ? 'Microsoft PowerPoint'
                      : 'Dokumen'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Daftar Tugas */}
        {tugasList.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Tugas Terkait Materi</h3>
            {tugasList.map((tugas, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #dbe9f5',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginTop: '1rem',
                  backgroundColor: '#fff',
                }}
              >
                <h4 style={{ margin: 0 }}>{tugas.judul}</h4>
                <p style={{ margin: '0.25rem 0', color: '#555' }}>{tugas.deskripsi}</p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>
                  Deadline: {new Date(tugas.tanggal_deadline).toLocaleDateString('id-ID')}
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>
                  Poin: {tugas.poin || 0}
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>
                  File dikumpulkan:{' '}
                  {tugas.file_kumpul ? (
                    <a href={tugas.file_kumpul} target="_blank" rel="noreferrer">
                      Lihat
                    </a>
                  ) : (
                    'Belum dikumpulkan'
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
