"use client";

import { useState } from "react";
import { z } from "zod";
import { create } from "zustand";

import { IconCircleX, IconDeviceFloppy, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { List } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import InputField from "@/components/InputField";
import InputFile from "@/components/InputFile";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// === Zustand Store ===
type FormState = {
  id: string;
  nomor_bast: string;
  kegiatan: string;
  kontrak: string;
  tanggal: string;
  deskripsi: string;
  dokumen: string;
  status: string;
  setField: (field: keyof FormState, value: string) => void;
};

const useDokumenForm = create<FormState>((set) => ({
  id: "",
  nomor_bast: "",
  kegiatan: "",
  kontrak: "",
  tanggal: "",
  deskripsi: "",
  dokumen: "",
  status: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

const dokumenFormSchema = z.object({
  id: z.string().min(1, "Wajib diisi"),
  nomor_bast: z.string().min(1, "Wajib diisi"),
  kegiatan: z.string().min(1, "Wajib diisi"),
  kontrak: z.string().min(1, "Wajib diisi"),
  tanggal: z.string().min(1, "Wajib diisi"),
  deskripsi: z.string().min(1, "Wajib diisi"),
  dokumen: z.string().min(1, "Wajib diisi"),
  status: z.string().min(1, "Wajib diisi"),
});

export default function MonitoringForm() {
  const form = useDokumenForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = dokumenFormSchema.safeParse(form);
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
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Dokumen", href: "#" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Dokumen</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data dokumen</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="submit" variant="green" onClick={handleSubmit}>
              <IconDeviceFloppy /> Simpan
            </Button>
            <Link href="/cms/rh/dokumen">
              <Button variant="outline">
                <IconCircleX /> Batal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="mb-2" />

      {/* Form Section */}
      <main className="overflow-auto h-full">
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Informasi</h5>
              </div>
              <InfoItem number="1" title="Nomor BAST" description="Masukkan nomor dokumen resmi BAST yang mencatat proses serah terima hasil kegiatan." />
              <InfoItem number="2" title="Kegiatan" description="Pilih kegiatan yang berkaitan dari daftar kegiatan yang telah terdaftar di sistem." />
              <InfoItem number="4" title="Kontrak" description="Terisi otomatis berdasarkan kegiatan yang dipilih. Tidak perlu diisi manual." />
              <InfoItem number="5" title="Tanggal" description="Pilih tanggal pelaksanaan serah terima kegiatan." />
              <InfoItem number="6" title="Deskripsi" description="Masukkan keterangan atau ringkasan isi dokumen BAST, seperti ruang lingkup kegiatan yang diserahterimakan." />
              <InfoItem number="7" title="Unggah Dokumen BAST" description="Upload dokumen resmi Berita Acara Serah Terima (dalam format PDF)." />
              <InfoItem number="8" title="Status" description="Pilih status dokumen BAST." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <InputField label="Nomor BAST" value={form.nomor_bast} onChange={(e) => form.setField("nomor_bast", e.target.value)} error={errors.nomor_bast} />
                    <InputField label="Kontrak" value={form.kontrak} onChange={() => {}} error={errors.kontrak} disabled />
                    <InputField label="Tanggal" value={form.tanggal} onChange={(e) => form.setField("tanggal", e.target.value)} error={errors.tanggal} type="date" />

                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Deskripsi</Label>
                      <Textarea className="border-border" value="" onChange={(e) => form.setField("deskripsi", e.target.value)} placeholder="Masukkan Deskripsi"></Textarea>
                    </div>

                    <InputFile id="dokumen" name="dokumen[]" label="Unggah Dokumen BAST" multiple={false} accept={{ "application/pdf": [".pdf"] }} maxSize={2 * 1024 * 1024} />

                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Status</Label>
                      <Select value={form.status} onValueChange={(val) => form.setField("status", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diterima">Diterima</SelectItem>
                          <SelectItem value="ditolak">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
