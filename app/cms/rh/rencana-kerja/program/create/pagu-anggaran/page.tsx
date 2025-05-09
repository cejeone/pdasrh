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
  { id: 1, kategori: "P0", sumberAnggaran: "APBN", tahunAnggaran: 2025, pagu: 10000000, status: "disetujui" },
  { id: 2, kategori: "P1", sumberAnggaran: "FOLU", tahunAnggaran: 2025, pagu: 10000000, status: "disetujui" },
  { id: 3, kategori: "P2", sumberAnggaran: "HIBAH", tahunAnggaran: 2025, pagu: 10000000, status: "disetujui" },
  { id: 4, kategori: "P1", sumberAnggaran: "HIBAH", tahunAnggaran: 2025, pagu: 10000000, status: "disetujui" },
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
      <Frame /> Pagu Anggaran
      </h2>
      <p className="text-sm text-gray-600 mb-4">Data anggaran untuk kegiatan rehabilitasi</p>

      <div className="flex gap-2 mb-4">
        <Input placeholder="Cari..." className="max-w-xs" />
        <Button variant="outline">Kategori</Button>
        <div className="ml-auto flex gap-2">
         <Link href="/cms/rh/rencana-kerja/program/create/pagu-anggaran/pagu-anggaran">
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
              <TableHead>Sumber Anggaran</TableHead>
              <TableHead>Tahun Anggaran</TableHead>
              <TableHead>Pagu</TableHead>
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
                <TableCell>{data.sumberAnggaran}</TableCell>
                <TableCell>{data.tahunAnggaran}</TableCell>
                <TableCell>{data.pagu}</TableCell>
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
