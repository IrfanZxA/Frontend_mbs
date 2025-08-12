// src/pages/admin/ProfilAdmin.js
import React from "react";
import InformasiProfil from "../../shared/profil/InformasiProfil";
import GantiPassword from "../../shared/profil/GantiPassword";

export default function ProfilAdmin() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <InformasiProfil role="admin" />
        <GantiPassword role="admin" />
      </div>
    </div>
  );
}
