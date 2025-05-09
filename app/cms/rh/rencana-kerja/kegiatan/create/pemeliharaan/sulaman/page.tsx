"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
                <Frame /> Sulaman
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Kategori</strong>
                  <p className="ml-4 mt-1">Pilih kategori kegiatan dari masterdata PPTH yang sesuai dengan kegiatan penyulaman</p>
                </div>
                <div>
                  <strong>2. Waktu Penyulaman</strong>
                  <p className="ml-4 mt-1">Pilih waktu atau tahap pelaksanaan penyulaman berdasarkan jadwal yang sudah direncanakan.</p>
                </div>
                <div>
                  <strong>3. Nama Bibit</strong>
                  <p className="ml-4 mt-1">Pilih nama bibit dari masterdata PPTH yang akan digunakan untuk kegiatan penyulaman</p>
                </div>
                <div>
                  <strong>4. Sumber Bibit</strong>
                  <p className="ml-4 mt-1">Pilih sumber bibit dari masterdata PPTH yang akan digunakan untuk kegiatan penyulaman</p>
                </div>
                <div>
                  <strong>5. Jumlah Bibit</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah bibit yang direncanakan untuk menggantikan tanaman yang mati atau rusak.</p>
                </div>
                <div>
                  <strong>6. Kondisi Tanaman</strong>
                  <p className="ml-4 mt-1">Pilih kondisi tanaman hasil penyulaman</p>
                </div>
                <div>
                  <strong>7. Jumlah Tanaman Hidup</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah tanaman yang berhasil hidup setelah penyulaman</p>
                </div>
                <div>
                  <strong>8. Jumlah HOK Perempuan</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah Hari Orang Kerja (HOK) perempuan yang terlibat dalam kegiatan penyulaman</p>
                </div>
                <div>
                  <strong>9. Jumlah HOK Laki-Laki</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah Hari Orang Kerja (HOK) laki-laki yang terlibat dalam kegiatan penyulaman</p>
                </div>
                <div>
                  <strong>10. Keterangan</strong>
                  <p className="ml-4 mt-1">Masukkan catatan tambahan terkait pelaksanaan atau hasil penyulaman</p>
                </div>
                <div>
                  <strong>11. Status</strong>
                  <p className="ml-4 mt-1">Pilih status kegiatan penyulaman, misalnya sudah terpenuhi, tidak terpenuhi</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">

            <div className="space-y-3">
                <Label className="text-green-800">Kategori</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sulaman 1, Sulaman 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Sulaman 1</SelectItem>
                    <SelectItem value="jabar">Sulaman 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            <div className="space-y-3">
                <label className="text-green-800 font-semibold">Waktu Penyulaman</label>
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
                <Label className="text-green-800">Nama Bibit</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Jati" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Jati</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Sumber Bibit</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Persemaian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Persemaian 1</SelectItem>
                    <SelectItem value="jabar">Persemaian 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            
              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Jumlah Bibit</Label>
                <Input id="kode-pp" placeholder="100" />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Kondisi Tanaman</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Persemaian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Sehat</SelectItem>
                    <SelectItem value="jabar">Sakit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Jumlah Tanaman Hidup</Label>
                <Input id="kode-pp" placeholder="10" readOnly />
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Jumlah HOK Perempuan</Label>
                <Input id="kode-pp" placeholder="10" readOnly />
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Jumlah HOK Laki-Laki</Label>
                <Input id="kode-pp" placeholder="10" readOnly />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Keterangan</Label>
                <Textarea placeholder="Masukkan" />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Status</Label>
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
