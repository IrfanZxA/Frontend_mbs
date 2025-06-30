import React, { useState } from 'react';

const AdminPenilaian = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [kelas1, setKelas1] = useState('');
  const [mapel1, setMapel1] = useState('');
  const [semester1, setSemester1] = useState('');
  const isForm1Valid = kelas1 && mapel1 && semester1;

  const [kelas2, setKelas2] = useState('');
  const [semester2, setSemester2] = useState('');
  const isForm2Valid = kelas2 && semester2;

  const kelasOptions = ['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D', '9A', '9B', '9C', '9D'];
  const mapelOptions = ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS'];

  const blurStyle = showModal1 || showModal2 ? { filter: 'blur(4px)', transition: '0.3s ease' } : {};

 const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.3)',
  display: 'grid',
  placeItems: 'center',
  zIndex: 1000,
};



  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '700px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
  };

  const renderTable = () => (
    <table className="table table-bordered table-sm text-center">
      <thead className="table-light">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Nilai Tugas</th>
          <th>Nilai UTS</th>
          <th>Nilai UAS</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(6)].map((_, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-outline-primary btn-sm" disabled>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', ...blurStyle }}>
        <h2 style={{ color: '#2471AE' }}>Selamat Datang di Halaman Penilaian</h2>
        <p>Di sini kamu dapat melihat laporan nilai berdasarkan mata pelajaran dan semester.</p>

        {/* Laporan Nilai per Mata Pelajaran */}
        <div className="card p-3 mb-4">
          <h6 className="mb-3 fw-bold">Laporan Nilai per Mata Pelajaran</h6>
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              <select className="form-select" value={kelas1} onChange={(e) => setKelas1(e.target.value)}>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={mapel1} onChange={(e) => setMapel1(e.target.value)}>
                <option value="">Pilih Mata Pelajaran</option>
                {mapelOptions.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={semester1} onChange={(e) => setSemester1(e.target.value)}>
                <option value="">Pilih Semester</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div className="text-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowModal1(true)}
              disabled={!isForm1Valid}
            >
              Cari
            </button>
          </div>
        </div>

        {/* Rekapan Nilai Akhir */}
        <div className="card p-3">
          <h6 className="mb-3 fw-bold">Rekapan Nilai Akhir per Semester</h6>
          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <select className="form-select" value={kelas2} onChange={(e) => setKelas2(e.target.value)}>
                <option value="">Pilih Kelas</option>
                {kelasOptions.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <select className="form-select" value={semester2} onChange={(e) => setSemester2(e.target.value)}>
                <option value="">Pilih Semester</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div className="text-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowModal2(true)}
              disabled={!isForm2Valid}
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Modal 1 */}
      {showModal1 && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h6 className="fw-bold mb-3">Laporan Nilai per Mata Pelajaran</h6>
            <p className="small text-muted mb-3">
              <strong>Kelas:</strong> {kelas1}<br />
              <strong>Mata Pelajaran:</strong> {mapel1}<br />
              <strong>Semester:</strong> {semester1}
            </p>
            <div className="table-responsive">{renderTable()}</div>
            <div className="text-end mt-3">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal1(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2 */}
      {showModal2 && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h6 className="fw-bold mb-3">Rekapan Nilai Akhir per Semester</h6>
            <p className="small text-muted mb-3">
              <strong>Kelas:</strong> {kelas2}<br />
              <strong>Semester:</strong> {semester2}
            </p>
            <div className="table-responsive">{renderTable()}</div>
            <div className="text-end mt-3">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal2(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPenilaian;
