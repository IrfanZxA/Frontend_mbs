// DetailMateri.js
import React from "react";

export default function DetailMateri() {
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
            Bahasa Indonesia<br />Kelas 7
          </div>
          <img src="/images/logo-bukuwarna.png" alt="Books" style={{ height: '80px' }} />
        </div>

        {/* Materi */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
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
            <h2 style={{ fontSize: '1rem', fontWeight: '600' }}>
              Materi Baru : Pertemuan 1 Bahasa Indonesia, Bab 1
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>1 Juli</p>

          {/* File List */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* PDF */}
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              <img
                src="/images/logo-pdf.png"
                alt="PDF Logo"
                style={{ width: '40px', height: '40px', marginBottom: '0.5rem' }}
              />
              <div style={{ fontSize: '0.875rem' }}>Bahasa Indonesia (Materi Bab 1).pdf</div>
            </div>

            {/* PowerPoint */}
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              <img
                src="/images/logo-ppt.png"
                alt="PPT Logo"
                style={{ width: '40px', height: '40px', marginBottom: '0.5rem' }}
              />
              <div style={{ fontSize: '0.875rem' }}>Bahasa Indonesia (Materi Bab 1).pptx</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
