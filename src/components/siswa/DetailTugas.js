import React from "react";

export default function DetailTugas({ tugas }) {
  if (!tugas) return null;

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '1.5rem',
        marginTop: '1.5rem',
        marginLeft: '2.5rem',
        maxWidth: '900px',
      }}
    >
      {/* Header Tugas */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#fbbc05',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
          }}
        >
          <img src="/images/logo-tugas.png" alt="Logo Tugas" style={{ width: '18px' }} />
        </div>
        <h2 style={{ fontSize: '1rem', fontWeight: '600' }}>{tugas.judul}</h2>
      </div>

      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        Dibuat: {new Date(tugas.tanggal_dibuat).toLocaleDateString()}
      </p>

      <p style={{
        fontSize: '0.875rem',
        color: '#444',
        marginTop: '0.25rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid #ccc',
      }}>
        {tugas.poin} Poin &nbsp;&nbsp;|&nbsp;&nbsp; Tenggat: {new Date(tugas.deadline).toLocaleDateString()}
      </p>

      <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#333' }}>
        <p>{tugas.deskripsi}</p>
      </div>

      {/* Panel Kirim Jawaban dan Komentar */}
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Panel Upload / Tugas */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fafafa',
          }}
        >
          <div
            style={{
              color: '#333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <span>Status Tugas</span>
            <span style={{ color: 'green', fontWeight: 500 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                viewBox="0 0 16 16"
                style={{ marginRight: '4px', verticalAlign: 'middle' }}
              >
                <path d="M13.485 1.929a1 1 0 0 1 1.415 1.414l-8.5 8.5a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L6 9.086l7.485-7.157z" />
              </svg>
              Dikerjakan
            </span>
          </div>

          <button
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '0.9rem',
            }}
          >
            <span style={{ color: '#4285f4', fontSize: '1.2rem' }}>＋</span>
            Tambah atau buat
          </button>
          <button
            style={{
              width: '100%',
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '0.4rem',
              cursor: 'pointer',
            }}
          >
            Tandai Selesai
          </button>
        </div>

        {/* Komentar Pribadi */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/images/logo-profile.png"
              alt="Profil"
              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
            Komentar Pribadi
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              placeholder="Tambahkan komentar pribadi"
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '20px',
                border: '1px solid #ccc',
              }}
            />
            <img
              src="/images/logo-kirim.png"
              alt="Kirim"
              style={{
                width: '28px',
                height: '28px',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
