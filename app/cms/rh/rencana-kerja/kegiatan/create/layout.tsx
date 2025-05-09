// components/ProgramLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconBorderOuter } from "@tabler/icons-react";
import {
  Files,
  Image,
  Sprout,
  Save,
  CircleX,
} from "lucide-react";

type Props = {
  children: ReactNode;
};

export default function ProgramLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/rancangan-teknis")) return "rancangan";
    if (pathname.includes("/kontrak")) return "kontrak";
    if (pathname.includes("/pemeliharaan")) return "pemeliharaan";
    if (pathname.includes("/dokumentasi")) return "dokumentasi";
    return "kegiatan";
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: "kegiatan", label: "Kegiatan", icon: <IconBorderOuter />, path: "kegiatan" },
    { id: "rancangan", label: "Rancangan Teknis", icon: <Files />, path: "rancangan-teknis" },
    { id: "kontrak", label: "Kontrak", icon: <Files />, path: "kontrak" },
    { id: "pemeliharaan", label: "Pemeliharaan", icon: <Sprout />, path: "pemeliharaan" },
    { id: "dokumentasi", label: "Dokumentasi", icon: <Image />, path: "dokumentasi" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <div className="text-sm text-base-gray mb-1">
            Rencana Kerja / Kegiatan / Buat Data
          </div>
          <div className="flex items-center gap-2 mb-1">
            <IconBorderOuter />
            <h1 className="text-2xl font-bold text-secondary-green">
              Kegiatan
            </h1>
          </div>
          <p className="text-sm text-base-gray">
            Form untuk membuat data kegiatan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="green">
            <Save /> Simpan
          </Button>
          <Button variant="outline">
            <CircleX /> Batal
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 border-b bg-muted-green ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t ${
              activeTab === tab.id
                ? "bg-white border border-b-0 text-green-800"
                : "text-gray-500 hover:text-green-700"
            }`}
            onClick={() => router.push(`/cms/rh/rencana-kerja/kegiatan/create/${tab.path}`)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
