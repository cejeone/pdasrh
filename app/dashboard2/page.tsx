"use client";

import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, MoreHorizontal, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(dummyData.length / rowsPerPage);

  const paginatedData = dummyData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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

        {/* Kartu Statistik */}
        <h2 className="font-bold text-[#306149]">Tanaman Paling Banyak Dibibitkan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl border p-4 shadow-sm bg-white">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-xs text-green-600">+2.01% dari bulan lalu</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" className="text-sm flex items-center gap-1">
              Cari berdasarkan <ChevronDown className="w-4 h-4" />
            </Button>
            <Input placeholder="Search..." className="w-48" />
            <Button variant="outline" className="text-sm">
              <SlidersHorizontal className="w-4 h-4" /> BPDAS
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-sm flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4" /> Status
            </Button>
            <Button variant="outline" className="text-sm">
              Perintah
            </Button>
            <Button variant="outline" className="text-sm">
              <SlidersHorizontal className="w-4 h-4" /> View
            </Button>
          </div>
        </div>

        {/* Tabel */}
        <div className="rounded-xl border bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-4 px-2">
                  <Checkbox />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>PERSEMAIAN PERMANEN</TableHead>
                <TableHead>TAHUN</TableHead>
                <TableHead>BULAN</TableHead>
                <TableHead>PENERIMA</TableHead>
                <TableHead>KOTA</TableHead>
                <TableHead>JUMLAH BIBIT</TableHead>
                <TableHead>AKSI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id} className="hover:bg-green-50">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.persemaian}</TableCell>
                  <TableCell>{item.tahun}</TableCell>
                  <TableCell>{item.bulan}</TableCell>
                  <TableCell>{item.penerima}</TableCell>
                  <TableCell>{item.kota}</TableCell>
                  <TableCell>{item.jumlah}</TableCell>
                  <TableCell>
                    <MoreHorizontal size={16} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between p-4 text-sm text-gray-700">
            <div>0 of {dummyData.length} row(s) selected.</div>
            <div className="flex items-center gap-2">
              <span>Row per page</span>
              <select value={rowsPerPage} onChange={(e) => setRowsPerPage(parseInt(e.target.value))} className="border rounded px-2 py-1">
                {[10, 25, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button variant="ghost" size="icon" onClick={() => handleChangePage(1)}>
                &#xab;
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleChangePage(currentPage - 1)}>
                &#8249;
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleChangePage(currentPage + 1)}>
                &#8250;
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleChangePage(totalPages)}>
                &#xbb;
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const tabItems = ["Kepegawaian", "Perbenihan", "Mata Air", "Penghijauan", "Persemaian", "IPPKH", "Pelaku Usaha"];

const stats = [
  { label: "Stok Bibit", value: "1.928" },
  { label: "Persemaian", value: "198" },
  { label: "BPDAS", value: "73" },
  { label: "Jenis Bibit", value: "943" },
  { label: "Target", value: "1.278.424" },
  { label: "Realisasi", value: "1.278.424" },
];

// const tableData = [
//     { id: 1, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 2, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
//     { id: 3, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 4, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
//     { id: 5, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 6, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
//     { id: 7, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 8, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
//     { id: 9, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 10, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
//     { id: 11, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 12, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
//     { id: 13, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 1000 },
//     { id: 14, persemaian: "KODIM 0308 / PARIAMAN", tahun: 2025, bulan: "JAN", penerima: "BUSRA", kota: "AGAM", jumlah: 5000 },
// ];

const dummyData = Array.from({ length: 101 }, (_, index) => ({
  id: index + 1,
  persemaian: "KODIM 0308 / PARIAMAN",
  tahun: 2025,
  bulan: "JAN",
  penerima: "BUSRA",
  kota: "AGAM",
  jumlah: 1500,
}));
