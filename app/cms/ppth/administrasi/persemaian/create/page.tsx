"use client";

import { useState } from "react";
import { z } from "zod";
import { create } from "zustand";

import { IconBorderOuter, IconCircleX, IconDeviceFloppy, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// === Zustand Store (lokal)
type FormState = {
  kodePP: string;
  namaPP: string;
  bpdas: string;
  target: string;
  realisasi: string;

  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  alamat: string;
  telepon: string;

  keterangan: string;
  setField: (field: keyof FormState, value: string) => void;
};
const usePersemaianForm = create<FormState>((set) => ({
  kodePP: "",
  namaPP: "",
  bpdas: "",
  target: "",
  realisasi: "",

  provinsi: "",
  kabupaten: "",
  kecamatan: "",
  kelurahan: "",
  alamat: "",
  telepon: "",

  keterangan: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

// === Zod Schema
const persemaianFormSchema = z.object({
  kodePP: z.string().min(1, "wajib diisi"),
  namaPP: z.string().min(1, " wajib diisi"),
  bpdas: z.string().min(1, "wajib dipilih"),
  target: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Target harus angka > 0",
  }),
  realisasi: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Realisasi harus berupa angka",
  }),

  provinsi: z.string().min(1, "wajib diisi"),
  kabupaten: z.string().min(1, "wajib diisi"),
  kecamatan: z.string().min(1, "wajib diisi"),
  kelurahan: z.string().min(1, "wajib diisi"),
  alamat: z.string().min(1, "wajib diisi"),
  telepon: z.string().min(1, "wajib diisi"),

  keterangan: z.string().min(1, "wajib diisi"),
});

// === Page Component
export default function Create() {
  const { kodePP, namaPP, bpdas, target, realisasi, provinsi, kabupaten, kecamatan, kelurahan, alamat, telepon, keterangan, setField } = usePersemaianForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = persemaianFormSchema.safeParse({
      kodePP,
      namaPP,
      bpdas,
      target,
      realisasi,

      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      alamat,
      telepon,

      keterangan,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};
      Object.entries(fieldErrors).forEach(([key, val]) => {
        if (val) newErrors[key] = val[0];
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("✅ Submit data:", result.data);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col px-4 py-3 ">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm text-base-gray">Administrasi / Persemaian / Tambah Data</div>
            <div className="flex items-center gap-2">
              <IconBorderOuter />
              <h1 className="text-2xl font-bold text-secondary-green">Tambah Data Persemaian</h1>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data persemaian</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="submit" variant="green">
              <IconDeviceFloppy /> Simpan
            </Button>
            <Link href="/cms/ppth/administrasi/persemaian">
              <Button variant="outline">
                <IconCircleX /> Batal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="mb-2" />

      {/* Form Section */}
      <main className="p-4 overflow-auto h-full">
        <form onSubmit={handleSubmit}>
          {/* informasi */}
          <Card className="border border-border p-4 mb-2">
            <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
              <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
                <div className="title text-base-green flex items-center gap-1">
                  <IconFrame />
                  <h5 className=" font-bold">Informasi</h5>
                </div>

                <InfoItem number="1" title="Kode PP" description="Masukkan kode unik yang diberikan untuk setiap Persemaian Permanen" />
                <InfoItem number="2" title="Nama PP" description="Masukkan nama resmi dari Persemaian Permanen yang terdaftar." />
                <InfoItem number="3" title="Nama BPDAS" description="Pilih nama BPDAS yang mengelola persemaian tersebut." />
                <InfoItem number="4" title="Target" description="Masukkan jumlah bibit yang direncanakan untuk ditanam atau didistribusikan." />
                <InfoItem number="5" title="Realisasi" description="Masukkan jumlah bibit yang benar-benar telah ditanam atau didistribusikan." />
              </div>

              <div className="col-span-12 lg:col-span-6 space-y-4">
                <Card>
                  <CardContent className="space-y-4">
                    <InputField label="Kode PP" value={kodePP} onChange={(e) => setField("kodePP", e.target.value)} error={errors.kodePP} />
                    <InputField label="Nama PP" value={namaPP} onChange={(e) => setField("namaPP", e.target.value)} error={errors.namaPP} />
                    <div>
                      <Label className=" text-secondary-green mb-2 font-bold">Nama BPDAS</Label>
                      <Select value={bpdas} onValueChange={(val) => setField("bpdas", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BPDASHL BUKITTINGGI">BPDASHL BUKITTINGGI</SelectItem>
                          <SelectItem value="BPDASHL PADANG">BPDASHL PADANG</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.bpdas && <p className="text-red-500 text-sm">{errors.bpdas}</p>}
                    </div>
                    <InputField label="Target" value={target} onChange={(e) => setField("target", e.target.value)} type="number" error={errors.target} />
                    <InputField label="Realisasi" value={realisasi} onChange={(e) => setField("realisasi", e.target.value)} type="number" error={errors.realisasi} />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* alamat */}
          <Card className="border border-border p-4 mb-2">
            <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
              <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
                <div className="title text-base-green flex items-center gap-1">
                  <IconFrame />
                  <h5 className=" font-bold">Alamat</h5>
                </div>

                <InfoItem number="1" title="Provinsi" description="Pilih nama provinsi tempat Persemaian Permanen berada." />
                <InfoItem number="2" title="Kabupaten/Kota" description="Pilih nama kab/kota tempat Persemaian Permanen berada." />
                <InfoItem number="3" title="Kecamatan" description="Pilih nama kecamatan tempat Persemaian Permanen berada." />
                <InfoItem number="4" title="Kelurahan/Desa" description="Pilih nama kelurahan/desa tempat Persemaian Permanen berada." />
                <InfoItem number="5" title="Alamat" description="Masukkan alamat lengkap Persemaian Permanen, termasuk nomor jalan atau patokan lokasi.." />
                <InfoItem number="6" title="Telepon" description="Masukkan nomor telepon yang dapat dihubungi untuk informasi terkait Persemaian Permanen." />
              </div>

              <div className="col-span-12 lg:col-span-6 space-y-4">
                <Card>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className=" text-secondary-green mb-2 font-bold">Provinsi</Label>
                      <Select value={provinsi} onValueChange={(val) => setField("provinsi", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">Jawa Timur</SelectItem>
                          <SelectItem value="002">Jawa Tengah</SelectItem>
                          <SelectItem value="003">Jawa Barat</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.provinsi && <p className="text-red-500 text-sm">{errors.provinsi}</p>}
                    </div>

                    <div>
                      <Label className=" text-secondary-green mb-2 font-bold">Kabupaten/Kota</Label>
                      <Select value={kabupaten} onValueChange={(val) => setField("kabupaten", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">Jawa Timur</SelectItem>
                          <SelectItem value="002">Jawa Tengah</SelectItem>
                          <SelectItem value="003">Jawa Barat</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.kabupaten && <p className="text-red-500 text-sm">{errors.kabupaten}</p>}
                    </div>

                    <div>
                      <Label className=" text-secondary-green mb-2 font-bold">Kecamatan</Label>
                      <Select value={kecamatan} onValueChange={(val) => setField("kecamatan", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">Jawa Timur</SelectItem>
                          <SelectItem value="002">Jawa Tengah</SelectItem>
                          <SelectItem value="003">Jawa Barat</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.kecamatan && <p className="text-red-500 text-sm">{errors.kecamatan}</p>}
                    </div>

                    <div>
                      <Label className=" text-secondary-green mb-2 font-bold">Kelurahan/Desa</Label>
                      <Select value={kelurahan} onValueChange={(val) => setField("kelurahan", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">Jawa Timur</SelectItem>
                          <SelectItem value="002">Jawa Tengah</SelectItem>
                          <SelectItem value="003">Jawa Barat</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.kelurahan && <p className="text-red-500 text-sm">{errors.kelurahan}</p>}
                    </div>

                    <InputField label="Alamat" value={alamat} onChange={(e) => setField("alamat", e.target.value)} error={errors.alamat} />
                    <InputField label="Telepon" value={telepon} onChange={(e) => setField("telepon", e.target.value)} error={errors.telepon} />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* deskripsi */}
          <Card className="border border-border p-4 mb-2">
            <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
              <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
                <div className="title text-base-green flex items-center gap-1">
                  <IconFrame />
                  <h5 className=" font-bold">Deskripsi</h5>
                </div>

                <InfoItem number="1" title="Keterangan" description="Masukan Informai yang relevan terkait pembibitan yang dilakukan" />
              </div>

              <div className="col-span-12 lg:col-span-6 space-y-4">
                <Card>
                  <CardContent className="space-y-4">
                    <Label className="text-secondary-green mb-2 font-bold">Keterangan</Label>
                    <Textarea className="border-border" value="" onChange={(e) => setField("keterangan", e.target.value)} placeholder="Masukkan Keterangan"></Textarea>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* rancangan teknis */}
          {/* dokumentasi */}
          {/* peta lokasi */}
        </form>
      </main>
    </div>
  );
}

// Komponen InfoItem untuk sisi kiri
function InfoItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div>
      <h4 className="font-semibold text-base-green">
        {number}. {title}
      </h4>
      <p className="ml-4 text-sm text-base-green">{description}</p>
    </div>
  );
}

// Komponen InputField (reusable)
function InputField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}) {
  const computedPlaceholder = placeholder ?? `Masukkan ${label}`;

  return (
    <div>
      <Label className="text-secondary-green mb-2 font-bold">{label}</Label>
      <Input value={value} onChange={onChange} type={type} className="border-border" placeholder={computedPlaceholder} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
