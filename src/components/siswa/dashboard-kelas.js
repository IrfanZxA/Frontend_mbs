import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const DashboardKelas = () => {
  const [currentDay, setCurrentDay] = useState('SENIN');

  const dailySchedule = [
    {
      subject: 'Matematika',
      teacher: 'Bu Siti',
      time: '07:00 - 09:00',
      room: 'R-7A'
    },
    {
      subject: 'Fisika',
      teacher: 'Bpk. Budi',
      time: '10:00 - 12:00',
      room: 'R-7A'
    },
    {
      subject: 'Bahasa Indonesia',
      teacher: 'Bpk. Ahmad',
      time: '13:00 - 14:00',
      room: 'R-7A'
    }
  ];

  const weeklySchedule = {
    headers: ['Waktu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
    schedule: [
      {
        time: '07:00 - 09:00',
        subjects: [
          { name: 'MTK', room: 'R-7A' },
          { name: 'B.Ing', room: 'R-7A' },
          { name: 'Bio', room: 'R-7A' },
          { name: 'PKY', room: 'R-7A' },
          { name: 'PAI', room: 'R-7A' }
        ]
      },
      {
        time: '10:00 - 12:00',
        subjects: [
          { name: 'FIS', room: 'R-7A' },
          { name: 'KIM', room: 'R-7A' },
          { name: 'OR', room: 'R-7A' },
          { name: 'TIK', room: 'R-7A' },
          { name: 'FIS', room: 'R-7A' }
        ]
      },
      {
        time: '13:00 - 14:00',
        subjects: [
          { name: 'B.Ind', room: 'R-7A' },
          { name: 'SEJ', room: 'R-7A' },
          { name: 'PKN', room: 'R-7A' },
          { name: 'SB', room: 'R-7A' },
          { name: '-', room: '-' }
        ]
      }
    ]
  };

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

  return (
    <div style={{
      padding: '0.5rem',
      maxWidth: '100%',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.25rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        padding: '0.5rem'
      }}>
        <h1 style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '0.125rem'
        }}>Jadwal Pelajaran</h1>
        <p style={{
          color: '#6B7280',
          fontSize: '0.675rem',
          marginBottom: '0.5rem'
        }}>Informasi jadwal pelajaran & jadwal kelas</p>

        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
           <button
  onClick={handlePrevDay}
  style={{
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
  }}
>
  <ChevronLeft />
</button>

<h2
  style={{
    fontSize: '0.75rem',
    fontWeight: '500',
    margin: '0 1rem',
  }}
>
  {currentDay}
</h2>

<button
  onClick={handleNextDay}
  style={{
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
  }}
>
  <ChevronRight />
</button>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {dailySchedule.map((item, index) => (
              <div key={index} style={{
                backgroundColor: '#F9FAFB',
                borderRadius: '0.25rem',
                padding: '0.375rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ fontWeight: '500', fontSize: '0.75rem' }}>{item.subject}</h3>
                    <p style={{
                      color: '#6B7280',
                      fontSize: '0.625rem'
                    }}>{item.teacher}</p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#6B7280'
                    }}>
                      <Clock />
                      <span style={{
                        marginLeft: '3rem',
                        fontSize: '0.625rem'
                      }}>{item.time}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#6B7280'
                    }}>
                      <MapMarker />
                      <span style={{
                        marginLeft: '2rem',
                        marginRight: '2rem',
                        fontSize: '0.625rem'
                      }}>{item.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.625rem'
          }}>
            <thead>
              <tr>
                {weeklySchedule.headers.map((header, index) => (
                  <th key={index} style={{
                    padding: '0.25rem',
                    textAlign: 'left',
                    borderBottom: '1px solid #E5E7EB',
                    fontWeight: '500'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklySchedule.schedule.map((timeSlot, index) => (
                <tr key={index}>
                  <td style={{
                    padding: '0.25rem',
                    borderBottom: '1px solid #E5E7EB'
                  }}>{timeSlot.time}</td>
                  {timeSlot.subjects.map((subject, subIndex) => (
                    <td key={subIndex} style={{
                      padding: '0.25rem',
                      borderBottom: '1px solid #E5E7EB'
                    }}>
                      <div style={{ fontWeight: '500' }}>{subject.name}</div>
                      <div style={{
                        color: '#6B7280',
                        fontSize: '0.625rem'
                      }}>{subject.room}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardKelas;