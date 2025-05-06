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
  ref_kegiatan: string;
  nomor: string;
  kontrak: string;
  rantek: string;
  pelaksana: string;
  tanggal: string;
  deskripsi: string;
  path_lampiran: string;
  status: string;
  setField: (field: keyof FormState, value: string) => void;
};

const refKegiatanList = [{ id: "kegiatan-1", kontrak: "K-001", rantek: "R-001", pelaksana: "Kelompok Tani A" }];

const useMonitoringForm = create<FormState>((set) => ({
  id: "MONEV_001",
  ref_kegiatan: "",
  nomor: "",
  kontrak: "",
  rantek: "",
  pelaksana: "",
  tanggal: "",
  deskripsi: "",
  path_lampiran: "",
  status: "",
  setField: (field, value) => {
    set((state) => ({ ...state, [field]: value }));
    if (field === "ref_kegiatan") {
      const ref = refKegiatanList.find((r) => r.id === value);
      if (ref) {
        set({ kontrak: ref.kontrak, rantek: ref.rantek, pelaksana: ref.pelaksana });
      }
    }
  },
}));

const monitoringFormSchema = z.object({
  id: z.string().min(1, "Wajib diisi"),
  ref_kegiatan: z.string().min(1, "Wajib dipilih"),
  nomor: z.string().min(1, "Wajib diisi"),
  kontrak: z.string().min(1, "Wajib diisi"),
  rantek: z.string().min(1, "Wajib diisi"),
  pelaksana: z.string().min(1, "Wajib diisi"),
  tanggal: z.string().min(1, "Wajib diisi"),
  deskripsi: z.string().min(1, "Wajib diisi"),
  path_lampiran: z.string().min(1, "Wajib diisi"),
  status: z.string().min(1, "Wajib diisi"),
});

export default function MonitoringForm() {
  const form = useMonitoringForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = monitoringFormSchema.safeParse(form);
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
            <Breadcrumbs items={[{ label: "Rencana Kerja", href: "#" }, { label: "Monitoring & Evaluasi", href: "#" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Monitoring & Evaluasi</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data Monitoring & Evaluasi</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="submit" variant="green" onClick={handleSubmit}>
              <IconDeviceFloppy /> Simpan
            </Button>
            <Link href="/cms/rh/rencana-kerja/monitoring-evaluasi">
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
              <InfoItem number="1" title="ID" description="Nomor ID monev, otomatis dibuat oleh sistem." />
              <InfoItem number="2" title="Ref Kegiatan" description="Pilih kegiatan dari daftar kegiatan yang sudah tersedia." />
              <InfoItem number="3" title="Nomor" description="Masukkan nomor dokumen." />
              <InfoItem number="4" title="Kontrak" description="Secara otomatis terisi berdasarkan Ref Kegiatan yang dipilih." />
              <InfoItem number="5" title="Rantek" description="Secara otomatis terisi berdasarkan Ref Kegiatan yang dipilih." />
              <InfoItem number="6" title="Pelaksana" description="Secara otomatis terisi berdasarkan kelompok tani yang terkait." />
              <InfoItem number="7" title="Tanggal" description="Masukkan tanggal pelaksanaan monitoring dan evaluasi." />
              <InfoItem number="8" title="Deskripsi" description="Masukkan keterangan tambahan atau ringkasan hasil monitoring." />
              <InfoItem number="9" title="Unggah Dokumen" description="Upload file dokumen hasil monitoring dan evaluasi." />
              <InfoItem number="10" title="Status" description="Pilih status hasil Monev." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <InputField label="ID" value={form.id} onChange={() => {}} error={errors.id} disabled />
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Ref Kegiatan</Label>
                      <Select value={form.ref_kegiatan} onValueChange={(val) => form.setField("ref_kegiatan", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih referensi" />
                        </SelectTrigger>
                        <SelectContent>
                          {refKegiatanList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ref_kegiatan && <p className="text-red-500 text-sm">{errors.ref_kegiatan}</p>}
                    </div>
                    <InputField label="Nomor" value={form.nomor} onChange={(e) => form.setField("nomor", e.target.value)} error={errors.nomor} />
                    <InputField label="Kontrak" value={form.kontrak} onChange={() => {}} error={errors.kontrak} disabled />
                    <InputField label="Rantek" value={form.rantek} onChange={() => {}} error={errors.rantek} disabled />
                    <InputField label="Pelaksana" value={form.pelaksana} onChange={() => {}} error={errors.pelaksana} disabled />
                    <InputField label="Tanggal" value={form.tanggal} onChange={(e) => form.setField("tanggal", e.target.value)} error={errors.tanggal} type="date" />

                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Deskripsi</Label>
                      <Textarea className="border-border" value="" onChange={(e) => form.setField("deskripsi", e.target.value)} placeholder="Masukkan Deskripsi"></Textarea>
                    </div>

                    <InputFile
                      id="path_lampiran"
                      name="path_lampiran[]"
                      label="Unggah Dokumen"
                      multiple={false}
                      accept={{ "application/pdf": [".pdf"] }}
                      maxSize={2 * 1024 * 1024}
                    />

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
