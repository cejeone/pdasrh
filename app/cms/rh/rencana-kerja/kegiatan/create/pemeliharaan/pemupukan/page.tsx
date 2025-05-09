"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IconArrowLeft, IconBorderOuter } from "@tabler/icons-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"


import {
    SquareDashed,
    Frame,
    Save,
    CircleX,
    CircleDollarSign,
    Sprout,
    Calendar as CalendarIcon
} from "lucide-react";

export default function Create() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date())

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const shpFile = acceptedFiles.find((file) => file.name.endsWith(".shp"));
    if (shpFile) {
      setSelectedFile(shpFile);
    } else {
      alert("Format dokumen hanya *.shp");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/octet-stream": [".shp"],
    },
    multiple: false,
  });

  return (
    <>
        {/* Body Form */}
        <div className="p-6 space-y-6">
          {/* Lokus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Deskripsi */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                <Frame /> Pemupukan
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Jenis</strong>
                  <p className="ml-4 mt-1">Pilih jenis pemupukan</p>
                </div>
                <div>
                  <strong>2. Waktu Pemupukan</strong>
                  <p className="ml-4 mt-1">Pilih waktu atau tahap pelaksanaan pemupukan berdasarkan jadwal yang sudah direncanakan.</p>
                </div>
                <div>
                  <strong>3. Jumlah Pupuk</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah pupuk yang direncanakan untuk menggantikan tanaman yang mati atau rusak.</p>
                </div>
                <div>
                  <strong>4. Satuan</strong>
                  <p className="ml-4 mt-1">Pilih satuan pupuk</p>
                </div>
                <div>
                  <strong>5. Keterangan</strong>
                  <p className="ml-4 mt-1">Masukkan catatan tambahan terkait pelaksanaan atau hasil penyulaman</p>
                </div>
                <div>
                  <strong>6. Status</strong>
                  <p className="ml-4 mt-1">Pilih status kegiatan penyulaman, misalnya sudah terpenuhi, tidak terpenuhi</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">

            <div className="space-y-3">
                <label className="text-green-800 font-semibold">Jenis</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Jenis---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Pestisida</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            <div className="space-y-3">
                <label className="text-green-800 font-semibold">Waktu Pemupukan</label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                        !date ? "text-muted-foreground" : ""
                        }`}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                </Popover>
            </div>

              <div className="space-y-3">
                <label htmlFor="kode-pp" className="text-green-800 font-semibold">Jumlah Pupuk</label>
                <Input id="kode-pp" placeholder="100" />
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Satuan</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Satuan---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Liter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Keterangan</label>
                <Textarea placeholder="Masukkan" />
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Status</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Disetujui" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Terpenuhi</SelectItem>
                    <SelectItem value="jabar">Tidak terpenuhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>  
          </div>

        </div>
    </>
  );
}
