import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GuruTugas = () => {
  const [tugasList, setTugasList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTugas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/guru/tugas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTugasList(res.data);
      } catch (err) {
        console.error('Gagal ambil daftar tugas', err);
      }
    };

    fetchTugas();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Daftar Tugas</h2>
      {tugasList.length === 0 ? (
        <p>Belum ada tugas tersedia.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Kelas</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tugasList.map((tugas, i) => (
              <tr key={tugas.id}>
                <td>{i + 1}</td>
                <td>{tugas.judul}</td>
                <td>{tugas.nama_kelas}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate('/guru/materi&tugas/pengumpulan', {
                      state: { tugasId: tugas.id }
                    })}
                  >
                    Lihat Pengumpulan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuruTugas;
