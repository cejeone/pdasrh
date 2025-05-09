"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IconArrowLeft, IconBorderOuter } from "@tabler/icons-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    SquareDashed,
    Frame,
    Save,
    CircleX,
    CircleDollarSign,
    Sprout,
} from "lucide-react";

export default function Create() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
                <Frame /> Dokumentasi
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Foto Lapangan Pelaksanaan Kegiatan</strong>
                  <p className="ml-4 mt-1">Unggah dokumentasi dalam bentuk gambar atau foto yang relevan dengan kegiatan. (Format yang didukung: JPG, PNG).</p>
                </div>
                <div>
                  <strong>2. Catatan</strong>
                  <p className="ml-4 mt-1">Masukkan keterangan atau deskripsi tambahan terkait foto yang diunggah.</p>
                </div>
                <div>
                  <strong>3. Video Lapangan Pelaksanaan Kegiatan</strong>
                  <p className="ml-4 mt-1">Unggah dokumentasi dalam bentuk video yang mendukung laporan atau kegiatan. (Format yang didukung: MP4, AVI).</p>
                </div>
                <div>
                  <strong>4. Catatan</strong>
                  <p className="ml-4 mt-1">Masukkan keterangan atau deskripsi tambahan terkait video yang diunggah.</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">
              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Foto Lapangan</label>
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
                        <p className="text-sm text-gray-500">Format dokumen hanya *jpg,*png</p>
                      </>
                    )}
                  </div>
                </div>

                {selectedFile && (
                  <p className="text-sm text-green-700">File terpilih: {selectedFile.name}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Catatan</Label>
                <Textarea placeholder="Masukkan catatan" />
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Video Lapangan</label>
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
                        <p className="text-sm text-gray-500">Format dokumen hanya *mp4</p>
                      </>
                    )}
                  </div>
                </div>

                {selectedFile && (
                  <p className="text-sm text-green-700">File terpilih: {selectedFile.name}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Catatan</Label>
                <Textarea placeholder="Masukkan catatan" />
              </div>

            </div>  
          </div>

        </div>
    </>
  );
}
