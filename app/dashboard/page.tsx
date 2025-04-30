"use client";

import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";
import dynamic from "next/dynamic";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Dynamic import untuk Leaflet map
const Map = dynamic(() => import("@/components/partials/Map"), { ssr: false });

const barData = [
  { year: "2021", target: 60000, realisasi: 45000 },
  { year: "2022", target: 80000, realisasi: 70000 },
  { year: "2023", target: 90000, realisasi: 85000 },
  { year: "2024", target: 50000, realisasi: 40000 },
];

const pieData = [
  { name: "Mahoni", value: 400 },
  { name: "Sengon", value: 600 },
  { name: "Petai", value: 200 },
  { name: "Akasia", value: 100 },
];

const provinsiData = [
  { provinsi: "Jawa Barat", jumlah: 3000 },
  { provinsi: "Jawa Tengah", jumlah: 2000 },
  { provinsi: "Aceh", jumlah: 20 },
  { provinsi: "Jambi", jumlah: 10 },
  { provinsi: "Riau", jumlah: 12 },
  { provinsi: "Lampung", jumlah: 12 },
  { provinsi: "Bengkulu", jumlah: 12 },
];

const COLORS = ["#f97316", "#22c55e", "#059669", "#78350f"];

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="px-6 py-4 bg-gray-50 min-h-screen space-y-6">
        {/* Tab Navigasi */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabItems.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${item === "Perbenihan" ? "bg-green-700 text-white" : "bg-green-100 text-green-900 hover:bg-green-200"}`}>
              {item}
            </button>
          ))}
        </div>

        {/* Dropdown Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          {dropdownFilters.map((label, index) => (
            <select key={index} className="border border-gray-300 text-sm rounded-lg p-2 w-40 bg-white focus:ring-green-500 focus:border-green-500">
              <option>{label}</option>
              {/* Tambah opsi lainnya nanti */}
            </select>
          ))}
        </div>

        {/* Top Grid */}
        <div className="flex gap-2">
          {/* Kolom 1: Statistik Kecil */}
          <div className="flex flex-col gap-2">
            <StatCard label="Persemaian" value="5,234" unit="Batang" />
            <StatCard label="KBR" value="5,234" unit="Hektar" />
            <StatCard label="KBD" value="5,234" unit="Hektar" />
            <StatCard label="Bibit Produktif" value="17K" unit="Hektar" />
            <StatCard label="Sumber Benih" value="5K" unit="Hektar" />
          </div>

          {/* Kolom 2: Chart Batang */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="bg-white p-4 rounded-xl shadow h-[310px]">
              <h3 className="text-sm font-semibold mb-2">Provinsi dengan Jumlah Pembibitan Tertinggi</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={provinsiData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="provinsi" type="category" />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#0f766e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl shadow h-[310px]">
              <h3 className="text-sm font-semibold mb-2">Produksi Bibit Setiap Tahun</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="target" fill="#10b981" name="Target" />
                  <Bar dataKey="realisasi" fill="#f97316" name="Realisasi" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Kolom 3: Peta */}
          <div className="w-[600px] bg-white p-4 rounded-xl shadow flex flex-col h-[620px]">
            <h3 className="text-sm font-semibold mb-2">Peta Interaktif</h3>
            <div className="h-full w-full rounded-md overflow-hidden">
              <Map />
            </div>
          </div>
        </div>

        {/* Grid Bawah: Donut + Statistik Tambahan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Donut Chart */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-semibold mb-2">Tanaman Paling Banyak Dibibitkan</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Grid Statistik Tambahan */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <InfoBox label="Dalam Kawasan" value="24.000" unit="Hektar" />
            <InfoBox label="Luar Kawasan" value="435.000" unit="Hektar" />
            <InfoBox label="Distribusi" value="234" icon="🌲" unit="Lokasi" />
            <InfoBox label="Stok" value="2.455" unit="Batang" />
            <InfoBox label="Pelaku Usaha" value="1.434" icon="💧" unit="Unit" />
            <InfoBox label="Perijinan" value="1.234" icon="🪪" unit="Ijin" />
            <InfoBox label="PNBP" value="432" icon="💰" unit="Juta Rupiah" />
            <InfoBox label="Sertifikasi" value="12.000" icon="🌲" unit="Hektar" />
            <InfoBox label="UPTD" value="943" unit="Lokasi Pembibitan" />
            <InfoBox label="ASDG" value="4.234" unit="Lokasi Pembibitan" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const StatCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div className="bg-white px-3 py-2 rounded-lg shadow text-center w-[180px] h-[120px] flex flex-col justify-center">
    <div className="text-[20px] text-black-500 font-bold">{label}</div>
    <div className="text-lg font-semibold text-orange-500 leading-tight">{value}</div>
    <div className="text-[10px] text-black-400">{unit}</div>
  </div>
);

const InfoBox = ({ label, value, unit, icon }: { label: string; value: string; unit?: string; icon?: string }) => (
  <div className="bg-white p-3 rounded-xl shadow text-center flex flex-col justify-center">
    <div className="text-[15px] text-black-500 font-bold flex justify-center items-center gap-1">
      {icon && <span>{icon}</span>} {label}
    </div>
    <div className="text-lg font-semibold text-emerald-600">{value}</div>
    {unit && <div className="text-xs text-gray-400">{unit}</div>}
  </div>
);

const tabItems = ["Kepegawaian", "Perbenihan", "Mata Air", "Penghijauan", "Persemaian", "IPPKH", "Pelaku Usaha"];

const dropdownFilters = ["Provinsi", "Kab/Kot", "BPDASLH"];
