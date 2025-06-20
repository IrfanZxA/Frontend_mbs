import React from 'react';

const TambahSiswaBaru = ({ isSidebarOpen }) => {
  return (
    <div
      style={{
        padding: '30px 20px',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Judul Halaman */}
      <h4 style={{ marginBottom: '20px' }}>Manajemen Siswa</h4>

      {/* Container untuk form, diposisikan ke tengah */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          {/* Subjudul dengan ikon gambar */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img
              src="/images/logo-tambahsiswa.png"
              alt="Tambah Siswa"
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            <h4 style={{ margin: 0 }}>Tambah Siswa Baru</h4>
          </div>

          {/* Form Input */}
          <form>
            {[
              'Nama Lengkap',
              'NIS / NISN',
              'Kelas',
              'Alamat',
              'Tempat, Tanggal Lahir',
              'Nama Orang Tua',
              'Nomor Telepon',
            ].map((label, index) => {
              const isDateInput = label === 'Tempat, Tanggal Lahir';
              return (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      marginBottom: '5px',
                    }}
                  >
                    {label}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={isDateInput ? 'date' : 'text'}
                      style={{
                        width: '100%',
                        padding: '8px',
                        paddingRight: isDateInput ? '35px' : '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}
                    />
                   
                  </div>
                </div>
              );
            })}

            {/* Tombol Aksi */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Simpan
              </button>
              <button
                type="reset"
                style={{
                  backgroundColor: '#f1f1f1',
                  color: '#000',
                  border: '1px solid #ccc',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahSiswaBaru;
