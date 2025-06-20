import React, { useState } from 'react';

const NonaktifkanAkun = ({ isSidebarOpen }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    nis: '',
    kelas: '',
    status: '',
    alasan: '',
    tanggal: '',
  });

  const handleCariClick = () => {
    setShowPopup(true);
    setFormData({
      nama: 'Aditya Ramadhan',
      nis: '123456789',
      kelas: '7 A',
      status: 'Aktif',
      alasan: '',
      tanggal: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => setShowPopup(false);

  const handleNonaktifkanAkun = () => {
    setShowPopup(false);
    setShowSuccessPopup(true);
  };

  return (
    <div
      style={{
        padding: '20px',
        marginLeft: isSidebarOpen ? '250px' : '10px',
        transition: 'margin-left 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Form utama */}
      <div
        style={{
          maxWidth: '450px',
          margin: '40px auto',
          padding: '25px 30px',
          borderRadius: '8px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src="/images/logo-nonaktif.png"
            alt="Nonaktif"
            style={{ width: '18px', height: '18px', marginRight: '8px' }}
          />
          <h4 style={{ margin: 0 }}>Nonaktifkan Akun Siswa</h4>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Pencarian Siswa</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Nama"
              style={{
                width: '100%',
                padding: '8px 30px 8px 10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              🔍
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Status akun</label>
          <input
            type="text"
            placeholder=""
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleCariClick}
            style={{
              padding: '6px 16px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cari
          </button>
        </div>
      </div>

      {/* POPUP FORM */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '450px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src="/images/logo-nonaktif.png"
                alt="Nonaktif"
                style={{ width: '18px', height: '18px', marginRight: '8px' }}
              />
              <h4 style={{ margin: 0 }}>Nonaktifkan Akun Siswa</h4>
            </div>

            <table style={{ width: '100%', marginBottom: '15px' }}>
              <tbody>
                <tr>
                  <td><strong>Nama</strong> :</td>
                  <td>{formData.nama}</td>
                </tr>
                <tr>
                  <td>NIS / NISN :</td>
                  <td>{formData.nis}</td>
                </tr>
                <tr>
                  <td>Kelas :</td>
                  <td>{formData.kelas}</td>
                </tr>
                <tr>
                  <td>Status Akun :</td>
                  <td>{formData.status}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginBottom: '10px' }}>
              <label>Alasan Penonaktifan</label>
              <input
                type="text"
                name="alasan"
                value={formData.alasan}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '5px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Tanggal Nonaktif</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '5px',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={handleClose}
                style={{
                  padding: '6px 12px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
              <button
                onClick={handleNonaktifkanAkun}
                style={{
                  padding: '6px 14px',
                  background: '#0d6efd',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Nonaktifkan Akun
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP KONFIRMASI BERHASIL */}
      {showSuccessPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              maxWidth: '300px',
            }}
          >
            <i className="bi bi-exclamation-circle-fill" style={{ fontSize: '2rem', color: '#dc3545', marginBottom: '10px' }}></i>
            <h4 style={{ marginBottom: '10px' }}>Akun berhasil dinonaktifkan</h4>
            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                marginTop: '10px',
                padding: '8px 20px',
                border: 'none',
                background: '#007bff',
                color: '#fff',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonaktifkanAkun;
