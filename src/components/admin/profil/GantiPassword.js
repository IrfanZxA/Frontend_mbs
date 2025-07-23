import React, { useState } from 'react';
import axios from 'axios';

const GantiPassword = () => {
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [pesan, setPesan] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordBaru !== konfirmasi) {
      setPesan('Konfirmasi password tidak cocok');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('/admin/password', {
        password_lama: passwordLama,
        password_baru: passwordBaru,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPesan('Password berhasil diubah');
      setPasswordLama('');
      setPasswordBaru('');
      setKonfirmasi('');
    } catch (err) {
      console.error(err);
      setPesan('Gagal mengganti password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-white">
      <h6>Ganti Password</h6>
      <div className="mb-2">
        <input
          type="password"
          className="form-control"
          placeholder="Password Lama"
          value={passwordLama}
          onChange={(e) => setPasswordLama(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          className="form-control"
          placeholder="Password Baru"
          value={passwordBaru}
          onChange={(e) => setPasswordBaru(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          className="form-control"
          placeholder="Konfirmasi Password Baru"
          value={konfirmasi}
          onChange={(e) => setKonfirmasi(e.target.value)}
          required
        />
      </div>
      {pesan && <p className="text-danger small">{pesan}</p>}
      <button type="submit" className="btn btn-primary btn-sm">Simpan Password</button>
      <button type="button" className="btn btn-danger btn-sm ms-2">Log Out</button>
    </form>
  );
};

export default GantiPassword;
