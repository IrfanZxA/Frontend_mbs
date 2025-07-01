import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const [dataNilai1, setDataNilai1] = useState([]);
  const [dataNilai2, setDataNilai2] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);

  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);

  const kelasOptions = ['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D', '9A', '9B', '9C', '9D'];

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

  useEffect(() => {
    const fetchMapel = async () => {
      try {
        const res = await axios.get('http://localhost:5000/mapel');
        setMapelOptions(res.data.map((item) => item.nama_mapel));
      } catch (err) {
        console.error('Gagal fetch mapel', err);
        setMapelOptions([]);
      }
    };
    fetchMapel();
  }, []);

const fetchNilaiPerMapel = async () => {
  try {
    const res = await axios.get('http://localhost:5000/nilai/laporan-mapel', {
      params: { kelas: kelas1, mapel: mapel1, semester: semester1 },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setDataNilai1(res.data);
    setShowModal1(true);
  } catch (err) {
    console.error('Gagal fetch nilai per mapel', err);
    setDataNilai1([]);
  }
};

const fetchRekapNilai = async () => {
  try {
    const res = await axios.get('http://localhost:5000/nilai/rekap', {
      params: { kelas: kelas2, semester: semester2 },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setDataNilai2(res.data);
    setShowModal2(true);
  } catch (err) {
    console.error('Gagal fetch rekap nilai', err);
    setDataNilai2([]);
  }
};

  const renderTable = (data) => (
    <table className="table table-bordered table-sm text-center">
      <thead className="table-light">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Nilai Tugas</th>
          <th>Nilai UTS</th>
          <th>Nilai UAS</th>
          <th>Rata-rata</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan="6">Tidak ada data</td></tr>
        ) : (
          data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.nama_siswa || item.nama_lengkap}</td>
              <td>{item.tugas ?? '-'}</td>
              <td>{item.uts ?? '-'}</td>
              <td>{item.uas ?? '-'}</td>
              <td>{item.rata_rata ?? '-'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <>
      <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', ...blurStyle }}>
        <h2 style={{ color: '#2471AE' }}>Selamat Datang di Halaman Penilaian</h2>
        <p>Di sini kamu dapat melihat laporan nilai berdasarkan mata pelajaran dan semester.</p>

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
              onClick={fetchNilaiPerMapel}
              disabled={!isForm1Valid || isLoading}
            >
              {isLoading ? 'Memuat...' : 'Cari'}
            </button>
          </div>
        </div>

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
              onClick={fetchRekapNilai}
              disabled={!isForm2Valid}
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {showModal1 && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h6 className="fw-bold mb-3">Laporan Nilai per Mata Pelajaran</h6>
            <p className="small text-muted mb-3">
              <strong>Kelas:</strong> {kelas1}<br />
              <strong>Mata Pelajaran:</strong> {mapel1}<br />
              <strong>Semester:</strong> {semester1}
            </p>
            <div className="table-responsive">{renderTable(dataNilai1)}</div>
            <div className="text-end mt-3">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal1(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {showModal2 && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h6 className="fw-bold mb-3">Rekapan Nilai Akhir per Semester</h6>
            <p className="small text-muted mb-3">
              <strong>Kelas:</strong> {kelas2}<br />
              <strong>Semester:</strong> {semester2}
            </p>
            <div className="table-responsive">{renderTable(dataNilai2)}</div>
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
