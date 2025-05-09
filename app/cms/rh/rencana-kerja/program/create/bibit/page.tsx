'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Frame,} from "lucide-react";
import Link from "next/link";

const dummyData = [
  { id: 1, kategori: "HH", nama: "Jati", sumberBibit: "Persemaian 1", jumlah: 1000, status: "siap tanam" },
  { id: 2, kategori: "HHBK", nama: "Petai", sumberBibit: "Persemaian 2", jumlah: 1000, status: "siap tanam" },
  { id: 3, kategori: "HHBK", nama: "Mangga", sumberBibit: "Persemaian 3", jumlah: 1000, status: "siap tanam" },
  { id: 4, kategori: "HHBK", nama: "Mangga", sumberBibit: "Persemaian 4", jumlah: 1000, status: "siap tanam" },
];

export default function SkemaPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-green-800 mb-1 flex items-center gap-2">
      <Frame /> Bibit
      </h2>
      <p className="text-sm text-gray-600 mb-4">Data jumlah bibit HH dan HHBK untuk kegiatan rehabilitasi</p>

      <div className="flex gap-2 mb-4">
        <Input placeholder="Cari..." className="max-w-xs" />
        <Button variant="outline">Kategori</Button>
        <div className="ml-auto flex gap-2">
        <Link href="/cms/rh/rencana-kerja/program/create/bibit/jenis-bibit">
          <Button variant="outline">
            <IconPlus className="w-4 h-4 mr-1" /> Tambah
          </Button>
        </Link>
          <Button variant="destructive">
            <IconTrash className="w-4 h-4 mr-1" /> Hapus
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={selectedRows.length === dummyData.length}
                  onCheckedChange={() => {
                    setSelectedRows(
                      selectedRows.length === dummyData.length
                        ? []
                        : dummyData.map((d) => d.id)
                    );
                  }}
                />
              </TableHead>
              <TableHead>No.</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Sumber Bibit</TableHead>
              <TableHead>Jumlah (BTG)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(data.id)}
                    onCheckedChange={() => toggleSelect(data.id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.kategori}</TableCell>
                <TableCell>{data.nama}</TableCell>
                <TableCell>{data.sumberBibit}</TableCell>
                <TableCell>{data.jumlah}</TableCell>
                <TableCell>
                  <Badge variant="default">{data.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost">...</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-bold">TOTAL</TableCell>
              <TableCell className="font-bold">3000</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>{selectedRows.length} dari {dummyData.length} baris terpilih.</span>
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
  );
}
