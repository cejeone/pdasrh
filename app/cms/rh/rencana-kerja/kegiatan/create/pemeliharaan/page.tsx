'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Frame } from "lucide-react";
import Link from "next/link";

const sulamanData = [
  { id: 1, jenis: "Jati", sumber: "Persemaian 1", jumlah: 1000, status: "terpenuhi" },
  { id: 2, jenis: "Mahoni", sumber: "Persemaian 2", jumlah: 1000, status: "terpenuhi" },
  { id: 3, jenis: "Meranti", sumber: "Persemaian 4", jumlah: 1000, status: "terpenuhi" },
];

const pemupukanData = [
  { id: 1, jenis: "Pupuk NPK", satuan: "KG", jumlah: 1000, status: "terpenuhi" },
  { id: 2, jenis: "Pestisida", satuan: "Liter", jumlah: 1000, status: "terpenuhi" },
  { id: 3, jenis: "Fungisida", satuan: "Liter", jumlah: 1000, status: "terpenuhi" },
];

export default function PemeliharaanPage() {
  const [selectedSulaman, setSelectedSulaman] = useState<number[]>([]);
  const [selectedPemupukan, setSelectedPemupukan] = useState<number[]>([]);

  const toggleSelect = (id: number, type: 'sulaman' | 'pemupukan') => {
    if (type === 'sulaman') {
      setSelectedSulaman(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setSelectedPemupukan(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }
  };

  const totalSulaman = sulamanData.reduce((sum, d) => sum + d.jumlah, 0);
  const totalPemupukan = pemupukanData.reduce((sum, d) => sum + d.jumlah, 0);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-1">
          <Frame /> Pemeliharaan (Upkeep)
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Data jumlah bibit kayu dan HHBK untuk kegiatan sulaman dan pemupukan
        </p>
      </div>

      {/* === SULAMAN KAYU === */}
      <div className="border rounded-lg p-4 space-y-4 shadow-sm">
        <div>
          <h3 className="text-base font-semibold text-green-700 mb-1 flex items-center gap-2">
            <Frame /> Sulaman Kayu
          </h3>
          <p className="text-sm text-gray-600">Data sulaman jumlah bibit kayu.</p>
        </div>

        <div className="flex justify-between items-center">
          <Input placeholder="Cari..." className="max-w-xs" />
          <div className="flex gap-2">
            <Link href="/cms/rh/rencana-kerja/kegiatan/create/pemeliharaan/sulaman">
                <Button variant="outline"><IconPlus className="w-4 h-4 mr-1" /> Tambah</Button>
            </Link>
            <Button variant="destructive"><IconTrash className="w-4 h-4 mr-1" /> Remove</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox checked={selectedSulaman.length === sulamanData.length} onCheckedChange={() =>
                setSelectedSulaman(selectedSulaman.length === sulamanData.length ? [] : sulamanData.map(d => d.id))} /></TableHead>
              <TableHead>No.</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Sumber Bibit</TableHead>
              <TableHead>Jumlah (BTG)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sulamanData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell><Checkbox checked={selectedSulaman.includes(data.id)} onCheckedChange={() => toggleSelect(data.id, 'sulaman')} /></TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.jenis}</TableCell>
                <TableCell>{data.sumber}</TableCell>
                <TableCell>{data.jumlah}</TableCell>
                <TableCell><Badge variant="default">{data.status}</Badge></TableCell>
                <TableCell><Button variant="ghost" size="icon">...</Button></TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-bold">TOTAL</TableCell>
              <TableCell className="font-bold">{totalSulaman}</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="text-sm text-gray-600 flex justify-between items-center">
          <span>{selectedSulaman.length} dari {sulamanData.length} baris dipilih</span>
          <div className="flex gap-2 items-center">
            <span>Baris per Halaman</span>
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>Halaman 2 dari 11</span>
            <Button variant="outline" size="icon">«</Button>
            <Button variant="outline" size="icon">‹</Button>
            <Button variant="outline" size="icon">›</Button>
            <Button variant="outline" size="icon">»</Button>
          </div>
        </div>
      </div>

      {/* === PEMUPUKAN === */}
      <div className="border rounded-lg p-4 space-y-4 shadow-sm">
        <div>
          <h3 className="text-base font-semibold text-green-700 mb-1 flex items-center gap-2">
            <Frame /> Pemupukan
          </h3>
          <p className="text-sm text-gray-600">Data jumlah pemupukan</p>
        </div>

        <div className="flex justify-between items-center">
          <Input placeholder="Cari..." className="max-w-xs" />
          <div className="flex gap-2">
            <Link href="/cms/rh/rencana-kerja/kegiatan/create/pemeliharaan/pemupukan">
                <Button variant="outline"><IconPlus className="w-4 h-4 mr-1" /> Tambah</Button>
            </Link>
            <Button variant="destructive"><IconTrash className="w-4 h-4 mr-1" /> Remove</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox checked={selectedPemupukan.length === pemupukanData.length} onCheckedChange={() =>
                setSelectedPemupukan(selectedPemupukan.length === pemupukanData.length ? [] : pemupukanData.map(d => d.id))} /></TableHead>
              <TableHead>No.</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Jumlah (BTG)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pemupukanData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell><Checkbox checked={selectedPemupukan.includes(data.id)} onCheckedChange={() => toggleSelect(data.id, 'pemupukan')} /></TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.jenis}</TableCell>
                <TableCell>{data.satuan}</TableCell>
                <TableCell>{data.jumlah}</TableCell>
                <TableCell><Badge variant="default">{data.status}</Badge></TableCell>
                <TableCell><Button variant="ghost" size="icon">...</Button></TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-bold">TOTAL</TableCell>
              <TableCell className="font-bold">{totalPemupukan}</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="text-sm text-gray-600 flex justify-between items-center">
          <span>{selectedPemupukan.length} dari {pemupukanData.length} baris dipilih</span>
          <div className="flex gap-2 items-center">
            <span>Baris per Halaman</span>
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>Halaman 2 dari 11</span>
            <Button variant="outline" size="icon">«</Button>
            <Button variant="outline" size="icon">‹</Button>
            <Button variant="outline" size="icon">›</Button>
            <Button variant="outline" size="icon">»</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
