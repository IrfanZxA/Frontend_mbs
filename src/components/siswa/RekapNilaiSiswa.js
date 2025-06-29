import React from 'react';
import { useParams } from 'react-router-dom';

const RekapNilaiSiswa = () => {
  const { kodeMapel } = useParams();

  return (
    <div className="container mt-4">
      <h2>Rekap Nilai</h2>
      <p>Menampilkan nilai untuk mata pelajaran dengan kode: <strong>{kodeMapel}</strong></p>

      <div className="row mt-4">
        {/* Tabel Nilai Tugas */}
        <div className="col-md-7 mb-4">
          <div className="border p-3 rounded bg-white">
            <h6><strong>Nilai Tugas</strong></h6>
            <table className="table table-bordered mt-2">
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>No</th>
                  <th>Nama Tugas</th>
                  <th>Tanggal Pengumpulan</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                {/* Baris kosong untuk backend isi nanti */}
                {[...Array(10)].map((_, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Nilai UTS/UAS */}
        <div className="col-md-5 mb-4">
          <div className="border p-3 rounded bg-white">
            <h6><strong>Nilai Uts/Uas</strong></h6>
            <table className="table table-bordered mt-2">
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>No</th>
                  <th>Uts/Uas</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                {/* Baris kosong untuk backend isi nanti */}
                {[...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapNilaiSiswa;
