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
          {/* Informasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Deskripsi */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                <Frame /> Informasi Umum
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. ID</strong>
                  <p className="ml-4 mt-1">Nomor ID program, otomatis dibuat oleh sistem</p>
                </div>
                <div>
                  <strong>2. Program</strong>
                  <p className="ml-4 mt-1">Pilih nama program dari daftar yang tersedia, sesuai dengan program rehabilitasi yang berjalan.</p>
                </div>
                <div>
                  <strong>3. Jenis Kegiatan</strong>
                  <p className="ml-4 mt-1">Pilih salah satu jenis kegiatan: P0 (Penanaman), P1 (Pemeliharaan 1), atau P2 (Pemeliharaan 2).</p>
                </div>
                <div>
                  <strong>4. Ref P0</strong>
                  <p className="ml-4 mt-1">Pilih referensi kegiatan penanaman (P0) yang berkaitan dengan kegiatan pemeliharaan P1 atau P2.</p>
                </div>
                <div>
                  <strong>5. Nama Kegiatan</strong>
                  <p className="ml-4 mt-1">Masukkan nama lengkap kegiatan rehabilitasi sesuai dengan dokumen rencana kerja atau SK penugasan.</p>
                </div>
                <div>
                  <strong>6. BPDAS</strong>
                  <p className="ml-4 mt-1">Pilih nama Balai Pengelolaan Daerah Aliran Sungai (BPDAS) yang bertanggung jawab terhadap kegiatan.</p>
                </div>
                <div>
                  <strong>7. DAS</strong>
                  <p className="ml-4 mt-1">Pilih nama Daerah Aliran Sungai (DAS) tempat kegiatan dilaksanakan, berdasarkan peta DAS nasional.</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">
              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">ID</Label>
                <Input id="kode-pp" placeholder="KEGIATAN_0011" readOnly />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Program</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="P-0001" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rhl">P-0001</SelectItem>
                    <SelectItem value="rdas">P-0002</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Jenis Kegiatan</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="P0, P1, P2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p0">P0</SelectItem>
                    <SelectItem value="p1">P1</SelectItem>
                    <SelectItem value="p2">P2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Ref P0, P1</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="P0-00001-2025" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p0">P0-00001-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Nama Kegiatan</Label>
                <Textarea placeholder="Penghijauan DAS Serayu" />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">BPDAS</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="BPDAS CILIWUNG" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rhl">BPDAS CILIWUNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">DAS</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="DAS CILIWUNG" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rhl">DAS CILIWUNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>  
          </div>

          {/* Lokus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Deskripsi */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                <Frame /> Lokus
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Provinsi</strong>
                  <p className="ml-4 mt-1">Pilih provinsi tempat kegiatan dilaksanakan.</p>
                </div>
                <div>
                  <strong>2. Kabupaten/Kota</strong>
                  <p className="ml-4 mt-1">Pilih nama Kabupaten atau kota sesuai dengan lokasi kegiatan.</p>
                </div>
                <div>
                  <strong>3. Kecamatan</strong>
                  <p className="ml-4 mt-1">Pilih nama kecamatan tempat kegiatan berlangsung. Data ini akan menyesuaikan berdasarkan kabupaten/kota yang telah dipilih.</p>
                </div>
                <div>
                  <strong>4. Kelurahan/Desa</strong>
                  <p className="ml-4 mt-1">Pilih nama kelurahan atau desa lokasi kegiatan. Nama akan muncul berdasarkan kecamatan yang dipilih.</p>
                </div>
                <div>
                  <strong>5. Alamat</strong>
                  <p className="ml-4 mt-1">Masukkan alamat lengkap lokasi kegiatan, jika diperlukan tambahkan nama dusun, jalan, atau titik koordinat untuk keperluan pemetaan.</p>
                </div>
                <div>
                  <strong>6. Map Area</strong>
                  <p className="ml-4 mt-1">Unggah file shapefile (SHP) untuk menampilkan batas wilayah atau area lokasi secara akurat.</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Input */}
            <div className="border rounded-lg p-6 space-y-5">
              <div className="space-y-3">
                <Label className="text-green-800">Provinsi</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih salah satu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Jawa Barat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Kabupaten/Kota</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih salah satu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Bandung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Kecamatan</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih salah satu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Baleendah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Kelurahan/Desa</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih salah satu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jabar">Manggahang</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Alamat</Label>
                <Textarea placeholder="Tulis alamat nya disini bos" />
              </div>

              <div className="space-y-3">
                <label className="text-green-800 font-semibold">Map Area</label>
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
                        <p className="text-sm text-gray-500">Format dokumen hanya *.shp</p>
                      </>
                    )}
                  </div>
                </div>

                {selectedFile && (
                  <p className="text-sm text-green-700">File terpilih: {selectedFile.name}</p>
                )}
              </div>

            </div>  
          </div>

          {/* Detail Kegiatan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Deskripsi */}
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg text-green-800 flex items-center gap-2">
                <Frame /> Detail Kegiatan
              </h2>

              <div className="space-y-3 text-sm text-gray-800">
                <div>
                  <strong>1. Fungsi Kawasan</strong>
                  <p className="ml-4 mt-1">Pilih fungsi kawasan hutan sesuai dengan tata guna lahan dan ketentuan regulasi kehutanan</p>
                </div>
                <div>
                  <strong>2. Skema</strong>
                  <p className="ml-4 mt-1">Pilih jenis skema kegiatan, seperti intensif atau insentif, sesuai dengan perencanaan.</p>
                </div>
                <div>
                  <strong>3. Tahun Kegiatan</strong>
                  <p className="ml-4 mt-1">Masukkan tahun perencanaan pelaksanaan kegiatan RHL. Ditulis dalam format tahun (YYYY)</p>
                </div>
                <div>
                  <strong>4. Sumber Anggaran</strong>
                  <p className="ml-4 mt-1">Pilih sumber dana kegiatan dari masterdata yang tersedia</p>
                </div>
                <div>
                  <strong>5. Total Bibit</strong>
                  <p className="ml-4 mt-1">Masukkan jumlah total batang bibit per hektar (BTG/HA) yang direncanakan ditanam</p>
                </div>
                <div>
                  <strong>6. Total Luas</strong>
                  <p className="ml-4 mt-1">Masukkan luas area rehabilitasi dalam satuan hektar (HA)</p>
                </div>
                <div>
                  <strong>7. Penerima Manfaat</strong>
                  <p className="ml-4 mt-1">Pilih nama kelompok atau individu penerima manfaat dari masterdata</p>
                </div>
                <div>
                  <strong>8. Pelaksana</strong>
                  <p className="ml-4 mt-1">Pilih nama pelaksana kegiatan</p>
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
                    <SelectItem value="rhl">HK</SelectItem>
                    <SelectItem value="rdas">HL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Skema</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="AGROFORESTRY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rhl">AGROFORESTRY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Tahun Kegiatan</Label>
                <Input id="kode-pp" placeholder="2025" readOnly />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Sumber Anggaran</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="APBN" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apbn">APBN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Total Bibit</Label>
                <Input id="kode-pp" placeholder="1000" readOnly />
              </div>

              <div className="space-y-3">
                <Label htmlFor="kode-pp" className="text-green-800">Total Luas</Label>
                <Input id="kode-pp" placeholder="10" readOnly />
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Penerima Manfaat</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="KPH, TN, CA, BKSDA, IPHPS, KHDTK" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apbn">KPH</SelectItem>
                    <SelectItem value="apbn">TN</SelectItem>
                    <SelectItem value="apbn">CA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-800">Pelaksana</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="KELOMPOK TANI HUTAN MANDIRI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apbn">KELOMPOK TANI HUTAN MANDIRI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>  
          </div>

        </div>
    </>
  );
}
