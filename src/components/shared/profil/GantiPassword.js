import React, { useState } from "react";

export default function GantiPassword({ onGantiPassword }) {
  const [form, setForm] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.passwordBaru !== form.konfirmasiPassword) {
      alert("Konfirmasi password tidak sama!");
      return;
    }
    onGantiPassword(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <div>
        <label className="block font-medium text-gray-600">Password Lama</label>
        <input
          type="password"
          name="passwordLama"
          value={form.passwordLama}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-600">Password Baru</label>
        <input
          type="password"
          name="passwordBaru"
          value={form.passwordBaru}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-600">Konfirmasi Password Baru</label>
        <input
          type="password"
          name="konfirmasiPassword"
          value={form.konfirmasiPassword}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2"
      >
        Simpan Password
      </button>
    </form>
  );
}
