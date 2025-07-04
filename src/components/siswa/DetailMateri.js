import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailTugas from './DetailTugas';

export default function DetailMateri() {
  const { kode_mapel } = useParams();
  const [materiList, setMateriList] = useState([]);
  const [namaMapel, setNamaMapel] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMateriId, setSelectedMateriId] = useState(null);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/siswa/materi', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data.filter(m => m.kode_mapel === kode_mapel);
        setMateriList(filtered);
        if (filtered.length > 0) {
          setNamaMapel(filtered[0].nama_mapel);
        }
        setLoading(false);
      } catch (err) {
        console.error('Gagal ambil materi:', err);
        setLoading(false);
      }
    };

    fetchMateri();
  }, [kode_mapel]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Container Box */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '900px',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#add8e6',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {namaMapel || 'Mata Pelajaran'}<br />Kelas 7
          </div>
          <img src="/images/logo-bukuwarna.png" alt="Books" style={{ height: '80px' }} />
        </div>

        {/* List Materi */}
        <div style={{ padding: '1.5rem' }}>
          {materiList.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: '#888' }}>
              Belum ada materi untuk mapel ini.
            </p>
          ) : (
            materiList.map((materi) => (
              <div key={materi.id} style={{ marginBottom: '1.5rem' }}>
                {/* Materi Item */}
                <div
                  onClick={() => setSelectedMateriId(materi.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedMateriId === materi.id ? '#eef6fb' : 'transparent',
                    padding: '10px',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#add8e6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '10px',
                    }}
                  >
                    <img
                      src="/images/logo-materi.png"
                      alt="Logo Materi"
                      style={{ width: '18px', height: '18px' }}
                    />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '2px' }}>
                      {materi.judul}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>
                      {new Date(materi.tanggal_upload).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Jika Dipilih, Tampilkan File + Tugas */}
                {selectedMateriId === materi.id && (
                  <div style={{ marginTop: '1rem', marginLeft: '2.5rem' }}>
                    {materi.file_url && (
                      <div
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '0.75rem',
                          padding: '1rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          marginBottom: '1rem',
                        }}
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/${materi.file_url.replace(/\\/g, '/')}`,
                            '_blank'
                          )
                        }
                      >
                        <img
                          src="/images/logo-pdf.png"
                          alt="PDF Logo"
                          style={{
                            width: '40px',
                            height: '40px',
                            marginBottom: '0.5rem',
                          }}
                        />
                        <div style={{ fontSize: '0.875rem' }}>
                          {materi.file_url.split('/').pop()}
                        </div>
                      </div>
                    )}

                    {/* Kalau nanti kamu punya data tugas dari backend: */}
                    {/* <DetailTugas tugas={materi.tugas} /> */}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
