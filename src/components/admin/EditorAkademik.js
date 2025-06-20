import React from 'react';

const EditorAkademik = ({ isSidebarOpen }) => {
  return (
    <div
      style={{
        paddingLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'padding-left 0.3s ease',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      {/* Judul & Subjudul */}
      <div style={{ marginTop: '20px', marginLeft: '20px' }}>
        <p
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'gray',
            margin: '0 0 10px 0',
          }}
        >
          Dashboard Edit Data
        </p>
        <h3 style={{ fontSize: '16px', margin: '0 0 5px 0' }}>
          Tambah Data Mata Pelajaran
        </h3>
        <p style={{ fontSize: '13px', color: 'gray', marginBottom: '20px' }}>
          Menambahkan mata pelajaran baru ke dalam sistem akademik
        </p>
      </div>

      {/* Konten Box */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '40px',
        }}
      >
        {/* Box Kiri */}
        <div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              width: '300px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              marginTop: '10px',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>Edit Deskripsi Kurikulum</h4>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px' }}>
              Mengubah deskripsi mata pelajaran yang ada di dalam kurikulum
            </p>

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Nama Mata Pelajaran
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '15px',
                backgroundColor: '#e8f0fe',
              }}
            />

            <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Kode
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '20px',
                backgroundColor: '#e8f0fe',
              }}
            />

            <button
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Tambah
            </button>
          </div>
        </div>

        {/* Box Kanan (2 & 3 dinaikkan sedikit) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            marginTop: '-40px', // dinaikkan sedikit
            marginBottom:'1px',
          }}
        >
          {/* Box 2 */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              width: '300px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>Upload/Edit Materi Pembelajaran</h4>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px' }}>
              Mengunggah dan mengedit materi pembelajaran untuk mata pelajaran ini.
            </p>

            <div
              style={{
                border: '1px solid #ccc',
                backgroundColor: '#e0efff',
                borderRadius: '6px',
                textAlign: 'center',
                padding: '20px',
                marginBottom: '20px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '14px' }}>📤 Pilih file atau seret ke sini</span>
            </div>

            <button
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Simpan
            </button>
          </div>

          {/* Box 3 */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              width: '300px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>Hapus Mata Pelajaran Lama</h4>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '10px' }}>
              Menghapus data mata pelajaran yang sudah tidak digunakan
            </p>
            <p style={{ fontSize: '13px', color: 'gray', marginBottom: '20px' }}>
              Data yang dihapus tidak dapat dipulihkan
            </p>

            <button
              style={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorAkademik;
