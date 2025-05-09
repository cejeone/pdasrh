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
import Link from "next/link";


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
                <Frame /> Jenis Bibit
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Kategori</strong>
                  <p className="ml-4 mt-1">Pilih kategori jenis bibit dari masterdata PPTH yang sesuai dengan jenis bibit yang akan digunakan dalam program rehabilitasi hutan</p>
                </div>
                <div>
                  <strong>2. Nama Bibit</strong>
                  <p className="ml-4 mt-1">Pilih nama bibit dari masterdata PPTH yang sesuai dengan jenis bibit yang akan ditanam</p>
                </div>
                <div>
                  <strong>3. Sumber Bibit</strong>
                  <p className="ml-4 mt-1">Pilih sumber bibit dari masterdata PPTH yang menunjukkan asal atau penyedia bibit</p>
                </div>
                <div>
                  <strong>4. Jumlah</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah bibit yang direncanakan untuk ditanam dalam program rehabilitasi hutan</p>
                </div>
                <div>
                  <strong>5. Status</strong>
                  <p className="ml-4 mt-1">Pilih status bibit yang menggambarkan apakah bibit tersebut siap untuk ditanam atau sedang dalam proses</p>
                </div>
                <div>
                  <strong>6. Keterangan</strong>
                  <p className="ml-4 mt-1">Masukkan informasi tambahan yang relevan terkait bibit yang akan digunakan dalam program ini.</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">

            <div className="space-y-3">
                <label className="text-green-800 font-semibold">Kategori</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Kategori---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Kayu</SelectItem>
                    <SelectItem value="jabar">Non Kayu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="kode-pp" className="text-green-800 font-semibold">Nama Bibit</label>
                <Input id="kode-pp" placeholder="Jati" />
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Sumber Bibit</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Kategori---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Persemaian 1</SelectItem>
                    <SelectItem value="jabar">Persemaian 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="kode-pp" className="text-green-800 font-semibold">Jumlah</label>
                <Input id="kode-pp" placeholder="1000" />
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Status</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Status---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Siap ditanam</SelectItem>
                    <SelectItem value="jabar">Dalam Proses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Keterangan</label>
                <Textarea placeholder="Bibit sudah sesuai dengan spesifikasi dan siap ditanam pada lokasi yang ditentukan." />
              </div>

            </div>  
          </div>

        </div>
    </>
  );
}
