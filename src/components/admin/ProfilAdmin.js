import React, { useState, useEffect } from 'react';
import InformasiProfil from './profil/InformasiProfil';
import GantiPassword from './profil/GantiPassword';
import axios from 'axios';

const ProfilAdmin = () => {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/profil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfil(res.data);
      } catch (err) {
        console.error('Gagal ambil profil', err);
      }
    };

    fetchProfil();
  }, []);

  return (
    <div className="container mt-4">
      <h4>Profil</h4>
      {profil && (
        <div className="row mt-3">
          <div className="col-md-6">
            <InformasiProfil profil={profil} />
          </div>
          <div className="col-md-6">
            <GantiPassword />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilAdmin;
