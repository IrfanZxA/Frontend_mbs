import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardMateri = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('14');

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/siswa/materi', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 🔄 Kelompokkan berdasarkan nama_mapel + kode_mapel
        const mapelMap = new Map();

        res.data.forEach((materi) => {
          const key = `${materi.nama_mapel}#${materi.kode_mapel}`;
          if (!mapelMap.has(key)) {
            mapelMap.set(key, {
              name: materi.nama_mapel,
              code: materi.kode_mapel,
            });
          }
        });

        // 🚀 Ubah ke array seperti initialSubjects
        const groupedSubjects = Array.from(mapelMap.values()).map((mapel, index) => ({
          no: index + 1,
          name: mapel.name,
          code: mapel.code,
        }));

        setSubjects(groupedSubjects);
      } catch (err) {
        console.error('Gagal ambil materi:', err);
      }
    };

    fetchMateri();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setSubjects((prev) => [...prev]); // tetap pakai yang udah ada
    } else {
      const filtered = subjects.filter((subject) =>
        subject.name.toLowerCase().includes(value.toLowerCase()) ||
        subject.code.toLowerCase().includes(value.toLowerCase())
      );
      setSubjects(filtered);
    }
  };

  const handleShowEntriesChange = (e) => {
    setShowEntries(e.target.value);
  };

  const displayedSubjects = subjects.slice(0, parseInt(showEntries) || subjects.length);

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-100"
      style={{ paddingLeft: '80px', paddingRight: '10rem' }}
    >
      {/* Filter */}
      <div
        style={{
          backgroundColor: '#add8e6',
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          padding: '1rem 2rem',
          maxWidth: '900px',
          margin: '1.5rem auto 1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="showEntries" className="text-gray-700 font-semibold">Show</label>
          <input
            id="showEntries"
            type="number"
            min="1"
            max={subjects.length}
            value={showEntries}
            onChange={handleShowEntriesChange}
            className="border border-gray-300 rounded px-2 w-16 h-8 text-center"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="searchTerm" className="text-gray-700 font-semibold">Cari</label>
          <input
            id="searchTerm"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari mata pelajaran atau kode..."
            className="border border-gray-300 rounded px-3 h-8 w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto 2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 text-center text-gray-700 font-medium"
                  style={{
                    backgroundColor: '#D9D9D9',
                    width: '200px',
                    borderBottom: '2px solid white',
                    borderRight: '2px solid white',
                  }}
                >
                  No
                </th>
                <th
                  className="py-2 px-4 text-center text-gray-700 font-medium"
                  style={{
                    backgroundColor: '#add8e6',
                    width: '500px',
                    borderBottom: '2px solid white',
                    borderRight: '2px solid white',
                  }}
                >
                  Mata Pelajaran
                </th>
                <th
                  className="py-2 px-4 text-center text-gray-700 font-medium"
                  style={{
                    backgroundColor: '#D9D9D9',
                    width: '200px',
                    borderBottom: '2px solid white',
                  }}
                >
                  Kode
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedSubjects.map((subject) => (
                <tr key={subject.no}>
                  <td
                    className="py-2 px-4 text-center"
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderTop: '2px solid white',
                      borderRight: '2px solid white',
                    }}
                  >
                    {subject.no}
                  </td>
                  <td
                    className="py-2 px-4 text-center"
                    style={{
                      backgroundColor: '#add8e6',
                      borderTop: '2px solid white',
                      borderRight: '2px solid white',
                    }}
                  >
                    <Link
                      to={`/siswa/materi/${subject.code}`}
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      {subject.name}
                    </Link>
                  </td>
                  <td
                    className="py-2 px-4 text-center"
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderTop: '2px solid white',
                    }}
                  >
                    {subject.code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardMateri;
