import React, { useState, useEffect } from "react";
import GantiPassword from "./GantiPassword";

export default function InformasiProfil({ role }) {
  const [tab, setTab] = useState("informasi");
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    // TODO: Ambil data profil dari backend
    setProfil({
      nama_lengkap: "Nama Contoh",
      username: "username123",
      role: role || "admin",
      email: "contoh@email.com",
      no_hp: "081234567890",
      foto_url: null
    });
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleGantiPassword = (data) => {
    console.log("Data ganti password:", data);
    // TODO: Kirim ke backend
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header profil */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profil?.foto_url ? (
            <img src={profil.foto_url} alt="Profil" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 text-sm">Foto</span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{profil?.nama_lengkap}</h2>
          <p className="text-gray-500 capitalize">{profil?.role}</p>
          <div className="mt-3 flex gap-3">
            <button className="px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
              Ganti Foto
            </button>
            <button className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded">
              Edit Informasi
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setTab("informasi")}
          className={`flex-1 py-2 text-center font-medium ${
            tab === "informasi"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Informasi Profil
        </button>
        <button
          onClick={() => setTab("password")}
          className={`flex-1 py-2 text-center font-medium ${
            tab === "password"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Ganti Password
        </button>
      </div>

      {/* Tab Content */}
      {tab === "informasi" && (
        <div className="space-y-3 text-sm">
          <p><span className="font-semibold">Username:</span> {profil?.username}</p>
          <p><span className="font-semibold">Email:</span> {profil?.email}</p>
          <p><span className="font-semibold">No HP:</span> {profil?.no_hp}</p>
        </div>
      )}
      {tab === "password" && <GantiPassword onGantiPassword={handleGantiPassword} />}

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full border border-red-500 text-red-500 rounded-lg py-2 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
