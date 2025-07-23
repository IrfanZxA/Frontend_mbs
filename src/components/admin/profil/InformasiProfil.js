import React from 'react';

const InformasiProfil = ({ profil }) => {
  return (
    <div className="p-4 shadow-sm rounded bg-white">
      <div className="text-center mb-3">
        <img
          src="/images/logo-profile.png"
          alt="Foto Profil"
          style={{ width: 80, height: 80, borderRadius: '50%' }}
        />
        <div className="mt-2">
          <button className="btn btn-sm btn-outline-primary">Ganti Foto Profil</button>
        </div>
      </div>
      <p><strong>Nama Lengkap:</strong> {profil.nama_lengkap}</p>
      <p><strong>NIP:</strong> {profil.nip}</p>
      <p><strong>Tempat, Tanggal Lahir:</strong> {profil.tempat_lahir}, {profil.tanggal_lahir}</p>
      <p><strong>Email:</strong> {profil.email}</p>
      <p><strong>No. HP:</strong> {profil.no_hp}</p>
      <button className="btn btn-sm btn-primary mt-2">Edit Informasi</button>
    </div>
  );
};

export default InformasiProfil;
