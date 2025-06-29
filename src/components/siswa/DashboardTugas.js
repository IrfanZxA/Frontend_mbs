import React, { useEffect, useState } from 'react';

const DashboardTugas = () => {
  const [tugas, setTugas] = useState([]);

  useEffect(() => {
    const fetchTugas = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/siswa/tugas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Gagal mengambil data tugas');

        const data = await response.json();
        setTugas(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchTugas();
  }, []);

  return (
    <div className="p-4">
      <h3 className="mb-4 fw-bold">Daftar Tugas</h3>
      {tugas.length === 0 ? (
        <p>Tidak ada tugas untuk saat ini.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th>Judul Tugas</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tugas.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama_mapel}</td>
                  <td>{item.judul}</td>
                  <td>{new Date(item.tanggal_deadline).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardTugas;
