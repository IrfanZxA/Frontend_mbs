import React from 'react';
import { useNavigate } from 'react-router-dom';

const BahasaIndonesia = () => {
  const navigate = useNavigate();

  const items = [
    {
      type: 'Materi Baru',
      title: 'Pertemuan 5 Bahasa Indonesia, Bab 3',
      date: '19 Juli',
    },
    {
      type: 'Tugas Baru',
      title: 'Tugas 2 bahasa indonesia, Bab 2',
      date: '14 Juli',
    },
    {
      type: 'Materi Baru',
      title: 'Pertemuan 4 Bahasa Indonesia, Bab 2',
      date: '14 Juli',
    },
    {
      type: 'Tugas Baru',
      title: 'Tugas 1 bahasa indonesia, Bab 1',
      date: '8 Juli',
    },
    {
      type: 'Materi Baru',
      title: 'Pertemuan 1 Bahasa Indonesia, Bab 1',
      date: '7 Juli',
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#add8e6',
          padding: '1.5rem 2rem',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '900px',
          margin: '0 auto 15px',
        }}
      >
        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Bahasa Indonesia<br />Kelas 7
        </div>
        <img src="/images/logo-bukuwarna.png" alt="Books" style={{ height: '80px' }} />
      </div>

      {/* List Box */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {items.map((item, index) => {
          const isMateri = item.type === 'Materi Baru';
          const isTugas = item.type === 'Tugas Baru';

          // Logo yang berbeda
          const logoSrc = isMateri
            ? '/images/logo-materi.png'
            : '/images/logo-tugas.png';

          // Cek apakah bisa diklik
          const isClickable = isMateri || isTugas;

          // Fungsi klik dinamis
          const handleClick = () => {
            if (isMateri) {
              const match = item.title.match(/Pertemuan (\d+)/i);
              const pertemuanId = match ? match[1] : 'unknown';
              navigate(`/siswa/materi/${pertemuanId}`);
            } else if (isTugas) {
              const match = item.title.match(/Tugas (\d+)/i);
              const tugasId = match ? match[1] : 'unknown';
              navigate(`/siswa/tugas/${tugasId}`);
            }
          };

          return (
            <div
              key={index}
              onClick={handleClick}
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                cursor: isClickable ? 'pointer' : 'default',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (isClickable) e.currentTarget.style.backgroundColor = '#f0f8ff';
              }}
              onMouseLeave={(e) => {
                if (isClickable) e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: '#add8e6',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '48px',
                    width: '48px',
                    marginRight: '1rem',
                  }}
                >
                  <img
                    src={logoSrc}
                    alt="Icon"
                    style={{ height: '24px', width: '24px' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>
                    {item.type} : {item.title}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#777' }}>{item.date}</div>
                </div>
              </div>

              <img
                src="/images/logo-titiktiga.png"
                alt="Menu"
                style={{ height: '20px', cursor: 'pointer' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BahasaIndonesia;
