// components/ProgramLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconBorderOuter } from "@tabler/icons-react";
import {
  SquareDashed,
  CircleDollarSign,
  Sprout,
  Save,
  CircleX,
} from "lucide-react";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function ProgramLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/bibit")) return "bibit";
    if (pathname.includes("/skema")) return "skema";
    if (pathname.includes("/pagu-anggaran")) return "pagu";
    return "program";
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: "program", label: "Program", icon: <IconBorderOuter />, path: "program" },
    { id: "skema", label: "Skema", icon: <SquareDashed />, path: "skema" },
    { id: "pagu", label: "Pagu Anggaran", icon: <CircleDollarSign />, path: "pagu-anggaran" },
    { id: "bibit", label: "Bibit", icon: <Sprout />, path: "bibit" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <div className="text-sm text-base-gray mb-1">
            Rencana Kerja / Program / Buat Data
          </div>
          <div className="flex items-center gap-2 mb-1">
            <IconBorderOuter />
            <h1 className="text-2xl font-bold text-secondary-green">
              Program
            </h1>
          </div>
          <p className="text-sm text-base-gray">
            Form untuk membuat data program
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="green">
            <Save /> Simpan
          </Button>
          <Link href= "/cms/rh/rencana-kerja/program">
            <Button variant="outline">
              <CircleX /> Batal
            </Button>
          </Link>
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
            onClick={() => router.push(`/cms/rh/rencana-kerja/program/create/${tab.path}`)}
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
