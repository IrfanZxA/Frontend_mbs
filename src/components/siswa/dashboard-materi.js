import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardMateri = () => {
  const initialSubjects = [
    { no: 1, name: 'Bahasa Indonesia', code: 'A1' },
    { no: 2, name: 'Bahasa Inggris', code: 'A2' },
    { no: 3, name: 'Agama', code: 'A3' },
    { no: 4, name: 'Matematika', code: 'A4' },
    { no: 5, name: 'Prakarya', code: 'A5' },
    { no: 6, name: 'Olahraga', code: 'A6' },
    { no: 7, name: 'PPKN', code: 'A7' },
    { no: 8, name: 'TIK', code: 'A8' },
    { no: 9, name: 'Biologi', code: 'A9' },
    { no: 10, name: 'Fisika', code: 'A10' },
    { no: 11, name: 'Kimia', code: 'A11' },
    { no: 12, name: 'Seni Budaya', code: 'A12' },
    { no: 13, name: 'Sejarah', code: 'A13' },
    { no: 14, name: 'Akidah akhlak', code: 'A14' },
  ];

  const [subjects, setSubjects] = useState(initialSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState('14');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setSubjects(initialSubjects);
    } else {
      const filteredSubjects = initialSubjects.filter(subject =>
        subject.name.toLowerCase().includes(value.toLowerCase()) ||
        subject.code.toLowerCase().includes(value.toLowerCase())
      );
      setSubjects(filteredSubjects);
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
            max={initialSubjects.length}
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
                    {subject.name === 'Bahasa Indonesia' ? (
                      <Link
                        to="/siswa/bahasa-indonesia"
                        style={{ color: 'black', textDecoration: 'none' }}
                      >
                        {subject.name}
                      </Link>
                    ) : (
                      subject.name
                    )}
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
