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
                <Frame /> Kontrak
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Nomor</strong>
                  <p className="ml-4 mt-1">Masukkan nomor kontrak yang menjadi identitas kegiatan rehabilitasi.</p>
                </div>
                <div>
                  <strong>2. Nilai</strong>
                  <p className="ml-4 mt-1">Masukkan nilai anggaran yang tercantum dalam kontrak</p>
                </div>
                <div>
                  <strong>3. Tipe</strong>
                  <p className="ml-4 mt-1">Pilih tipe pelaksanaan kegiatan.</p>
                </div>
                <div>
                  <strong>4. Penerima Manfaat</strong>
                  <p className="ml-4 mt-1">Pilih penerima manfaat kegiatan</p>
                </div>
                <div>
                  <strong>5. Tanggal Kontrak</strong>
                  <p className="ml-4 mt-1">Masukkan tanggal resmi penandatanganan kontrak.</p>
                </div>
                <div>
                  <strong>6. Dokumen</strong>
                  <p className="ml-4 mt-1">Unggah file dokumen kontrak kerja sama</p>
                </div>
                <div>
                  <strong>7. Status</strong>
                  <p className="ml-4 mt-1">Status dari pelaksana kegiatan</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">
            
              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Nomor</Label>
                <Input id="kode-pp" placeholder="KONTRAK_001" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Nilai</Label>
                <Input id="kode-pp" placeholder="1.000.000" readOnly />
              </div>


              <div className="space-y-3">
                <Label className="text-green-800">Tipe</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="KONTRAKTUAL, SWAKELOLA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">KONTRAKTUAL</SelectItem>
                    <SelectItem value="jabar">SWAKELOLA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Penerima Manfaat</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="KPH, TN, CA, BKSDA, IPHPS, KHDTK" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">KPH</SelectItem>
                    <SelectItem value="jabar">TN</SelectItem>
                    <SelectItem value="jabar">CA</SelectItem>
                    <SelectItem value="jabar">BKSDA</SelectItem>
                    <SelectItem value="jabar">IPHPS</SelectItem>
                    <SelectItem value="jabar">KHDTK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Tanggal Kontrak</label>
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
                <label className="text-green-800 font-semibold">Unggah Dokumen</label>
                <div
                  {...getRootProps()}
                  className="border border-green-400 border-dashed rounded-lg p-6 text-center bg-white-50 cursor-pointer hover:bg-green-100 transition"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center text-green-800">
                    <svg
                      className="w-10 h-10 mb-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-4 4m4-4l4 4M12 4v8" />
                    </svg>
                    {isDragActive ? (
                      <p>Letakkan file di sini...</p>
                    ) : (
                      <>
                        <p>Klik atau seret file ke area ini untuk mengunggah</p>
                        <p className="text-sm text-gray-500">Format dokumen hanya *.pdf</p>
                      </>
                    )}
                  </div>
                </div>

                {selectedFile && (
                  <p className="text-sm text-green-700">File terpilih: {selectedFile.name}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Status</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Disetujui" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Disetujui</SelectItem>
                    <SelectItem value="jabar">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>  
          </div>

        </div>
    </>
  );
}
