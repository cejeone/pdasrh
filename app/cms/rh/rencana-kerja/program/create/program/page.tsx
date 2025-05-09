"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IconArrowLeft, IconBorderOuter } from "@tabler/icons-react";
import { useState } from "react";
import {
    SquareDashed,
    Frame,
    Save,
    CircleX,
    CircleDollarSign,
    Sprout,
} from "lucide-react";
import Link from "next/link";


export default function Create() {

    // Tabs
    const [activeTab, setActiveTab] = useState("program");

    const tabs = [
    { id: "program", label: "Program", icon: <IconBorderOuter /> },
    { id: "skema", label: "Skema", icon: <SquareDashed /> },
    { id: "pagu", label: "Pagu Anggaran", icon: <CircleDollarSign /> },
    { id: "bibit", label: "Bibit", icon: <Sprout /> },
    ];

  return (
    <>
        {/* Body Form */}
        <div className="p-6 space-y-6">
          {/* Informasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Deskripsi */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                <Frame /> Informasi
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. ID</strong>
                  <p className="ml-4 mt-1">Nomor ID program, otomatis dibuat oleh sistem</p>
                </div>
                <div>
                  <strong>2. Kategori</strong>
                  <p className="ml-4 mt-1">Pilih jenis program yang akan disimpan.</p>
                </div>
                <div>
                  <strong>3. Nama</strong>
                  <p className="ml-4 mt-1">Tulis nama program sesuai dokumen rencana kerja atau surat tugas.</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">
              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">ID</Label>
                <Input id="kode-pp" placeholder="PROGAM_001" readOnly />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Kategori</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="RHL, RDAS, RM, UPSA, Penghijauan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rhl">RHL</SelectItem>
                    <SelectItem value="rdas">RDAS</SelectItem>
                    <SelectItem value="rm">RM</SelectItem>
                    <SelectItem value="upsa">UPSA</SelectItem>
                    <SelectItem value="penghijauan">Penghijauan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Nama</Label>
                <Textarea placeholder="Penghijauan DAS Serayu" />
              </div>

            </div>  
          </div>

          {/* Detail Program */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Deskripsi */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                <Frame /> Detail Program
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Fungsi Kawasan</strong>
                  <p className="ml-4 mt-1">Pilih fungsi kawasan hutan sesuai aturan yang berlaku.</p>
                </div>
                <div>
                  <strong>2. Tahun Rencana</strong>
                  <p className="ml-4 mt-1">Masukkan tahun kapan program akan dilaksanakan. Ditulis dalam forma tahun (YYYY).</p>
                </div>
                <div>
                  <strong>3. Total Anggaran</strong>
                  <p className="ml-4 mt-1">Pilih atau isi sumber dana yang digunakan untuk progam.</p>
                </div>
                <div>
                  <strong>4. Total Bibit</strong>
                  <p className="ml-4 mt-1">Masukkkan jumlah bibit yang akan ditanam per hektar.</p>
                </div>
                <div>
                  <strong>5. Target Luas</strong>
                  <p className="ml-4 mt-1">Masukkan luas lahan yang menjadi target program dalam satuan hektar.</p>
                </div>
                <div>
                  <strong>6. Status</strong>
                  <p className="ml-4 mt-1">Status dari program (aktif, selesai, atau tertunda).</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">
              <div className="space-y-3">
                <Label className="text-green-800">Fungsi Kawasan</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="HK/HL/HP/HPT/APL" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hk">HK</SelectItem>
                    <SelectItem value="hl">HL</SelectItem>
                    <SelectItem value="hp">HP</SelectItem>
                    <SelectItem value="hpt">HPT</SelectItem>
                    <SelectItem value="apl">APL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="tahun-rencana" className="text-green-800">Tahun Rencana</Label>
                <Input id="tahun-rencana" placeholder="2025" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="total-anggaran" className="text-green-800">Total Anggaran</Label>
                <Input id="total-anggaran" placeholder="100.000.000" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="total-bibit" className="text-green-800">Total Bibit</Label>
                <Input id="total-bibit" placeholder="400" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="target-luas" className="text-green-800">Target Luas</Label>
                <Input id="target-luas" placeholder="50" />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Status</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Status---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="tidak-aktif">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>   
            </div>  
          </div>
        </div>
    </>
  );
}
