import React, { useState, useEffect } from 'react';

const DashboardKelas = () => {
  const [currentDay, setCurrentDay] = useState('SENIN');
  const [jadwalMingguan, setJadwalMingguan] = useState({});
  const [dailySchedule, setDailySchedule] = useState([]);

  useEffect(() => {
    const fetchJadwalMingguan = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/siswa/jadwal-mingguan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const grouped = {};
      data.forEach(item => {
        const hari = item.hari.trim().toUpperCase(); // tambahkan trim()
        if (!grouped[hari]) grouped[hari] = [];
        grouped[hari].push({
          nama_mapel: item.nama_mapel,
          teacher: item.nama_guru, // ✅ gunakan teacher
          time: `${item.jam_mulai.slice(0, 5)} - ${item.jam_selesai.slice(0, 5)}`, // ✅ pakai 'time'
          room: 'R-7A',
        });
      });

      setJadwalMingguan(grouped);
      console.log("📅 HARI DALAM GROUPED:", Object.keys(grouped));
Object.keys(grouped).forEach(hari => {
  console.log(`📌 Hari Key Asli: '${hari}' | Panjang: ${hari.length}`);
});
    };

    fetchJadwalMingguan();
  }, []);

  useEffect(() => {
    setDailySchedule(jadwalMingguan[currentDay] || []);
    console.log("📚 Jadwal Mingguan:", jadwalMingguan);
    console.log("📅 Hari sekarang:", currentDay);
    console.log("📆 Jadwal Hari Ini:", jadwalMingguan[currentDay]);
  }, [currentDay, jadwalMingguan]);

  const handlePrevDay = () => {
    const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
    const currentIndex = days.indexOf(currentDay);
    if (currentIndex > 0) {
      setCurrentDay(days[currentIndex - 1]);
    }
  };

  const handleNextDay = () => {
    const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
    const currentIndex = days.indexOf(currentDay);
    if (currentIndex < days.length - 1) {
      setCurrentDay(days[currentIndex + 1]);
    }
  };

  const Clock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  );

  const MapMarker = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );

  const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div style={{ padding: '0.5rem', maxWidth: '100%', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '0.25rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', padding: '0.5rem' }}>
        <h1 style={{ fontSize: '0.875rem', fontWeight: '600' }}>Jadwal Pelajaran</h1>
        <p style={{ color: '#6B7280', fontSize: '0.675rem', marginBottom: '0.5rem' }}>Informasi jadwal pelajaran & jadwal kelas</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <button onClick={handlePrevDay} style={buttonStyle}><ChevronLeft /></button>
          <h2 style={{ fontSize: '0.75rem', fontWeight: '500' }}>{currentDay}</h2>
          <button onClick={handleNextDay} style={buttonStyle}><ChevronRight /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {dailySchedule.length === 0 ? (
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Tidak ada jadwal hari ini</div>
          ) : (
            dailySchedule.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#F9FAFB', borderRadius: '0.25rem', padding: '0.375rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontWeight: '500', fontSize: '0.75rem' }}>{item.nama_mapel}</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.625rem' }}>{item.teacher}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#6B7280' }}>
                      <Clock />
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.625rem' }}>{item.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#6B7280' }}>
                      <MapMarker />
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.625rem' }}>{item.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '0.5rem',
  borderRadius: '50%',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
};

export default DashboardKelas;
