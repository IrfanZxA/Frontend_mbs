import React, { useState } from 'react';

const EditBiodataSiswa = ({ isSidebarOpen }) => {
  const [searchNama, setSearchNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleSave = () => {
    setShowEditForm(false);
    setShowPopup(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div
      style={{
        padding: '30px',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)',
        position: 'relative',
      }}
    >
      {/* Blur area */}
      <div
        style={{
          filter: showPopup || showEditForm || showSuccess ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease',
          zIndex: 0,
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '400px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img src="/images/logo-pensil.png" alt="Edit Icon" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            <h4 style={{ margin: 0 }}>Edit Biodata Siswa</h4>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Pencarian</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Nama"
                value={searchNama}
                onChange={(e) => setSearchNama(e.target.value)}
                style={{ width: '100%', padding: '8px 30px 8px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Kelas</label>
            <input
              type="text"
              placeholder=""
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              onClick={() => setShowPopup(true)}
              style={{ padding: '6px 14px', fontSize: '14px', border: '1px solid #444', borderRadius: '4px', backgroundColor: '#fff', cursor: 'pointer' }}
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Data Siswa Popup */}
      {showPopup && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', borderRadius: '8px', zIndex: 10 }}>
          <h4>Data Siswa</h4>
          <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '20px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <strong>Aditya Ramadhan</strong>
                <div>Kelas : 7 A</div>
              </div>
              
              <button
                onClick={handleEditClick}
                style={{
                  padding: '4px 10px',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px' // jarak antara ikon dan teks dalam tombol
                }}
              >
                <img
                  src="/images/logo-pensil.png"
                  alt="Edit"
                  style={{ width: '14px', height: '14px' }}
                />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Popup */}
      {showEditForm && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', width: '400px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img src="/images/logo-pensil.png" alt="Edit Icon" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            <h4 style={{ margin: 0 }}>Mengedit Biodata Siswa</h4>
          </div>
          <input placeholder="Nama Lengkap" value="Aditya Ramadhan" style={inputStyle} />
          <input placeholder="NIS / NISN" value="123456789" style={inputStyle} />
          <input placeholder="Kelas" value="7 A" style={inputStyle} />
          <input placeholder="Alamat" value="Jl. Merpati No. 12" style={inputStyle} />
          <input placeholder="Tempat, Tanggal Lahir" style={inputStyle} type="date" />
          <input placeholder="Nama Orang Tua" value="Budi Ramadhan" style={inputStyle} />
          <input placeholder="Nomor Telepon" style={inputStyle} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button style={buttonStyle}>Reset</button>
            <button style={{ ...buttonStyle, backgroundColor: '#0d6efd', color: 'white' }} onClick={handleSave}>Simpan</button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.2)', textAlign: 'center', zIndex: 30 }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
          <div style={{ fontSize: '16px' }}>Perubahan berhasil disimpan</div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '6px 14px',
  border: '1px solid #444',
  borderRadius: '4px',
  backgroundColor: '#fff',
  cursor: 'pointer',
};

export default EditBiodataSiswa;
