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
                <Frame /> Skema Tanam
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Kategori</strong>
                  <p className="ml-4 mt-1">Pilih kategori yang sesuai dari masterdata yang telah tersedia</p>
                </div>
                <div>
                  <strong>2. Skema</strong>
                  <p className="ml-4 mt-1">Masukkan skema yang sesuai untuk program ini.</p>
                </div>
                <div>
                  <strong>3. Target Luas</strong>
                  <p className="ml-4 mt-1">Masukkan luas lahan yang menjadi target untuk pelaksanaan kegiatan dalam satuan hektar (HA).</p>
                </div>
                <div>
                  <strong>4. Status</strong>
                  <p className="ml-4 mt-1">Pilih status dari program tersebut</p>
                </div>
                <div>
                  <strong>5. Keterangan</strong>
                  <p className="ml-4 mt-1">Masukkan keterangan tambahan terkait program</p>
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
                    <SelectItem value="jabar">Intensif</SelectItem>
                    <SelectItem value="jabar">Insentif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="kode-pp" className="text-green-800 font-semibold">Skema Btg/Ha</label>
                <Input id="kode-pp" placeholder="400" />
              </div>

              <div className="space-y-3">
                <label htmlFor="kode-pp" className="text-green-800 font-semibold">Target Luas</label>
                <Input id="kode-pp" placeholder="250" />
              </div>


              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Status</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="---Pilih Status---" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Disetujui</SelectItem>
                    <SelectItem value="jabar">Tidak disetujui</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Keterangan</label>
                <Textarea placeholder="Program disetujui setelah revisi" />
              </div>

            </div>  
          </div>

        </div>
    </>
  );
}
