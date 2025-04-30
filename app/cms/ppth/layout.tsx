"use client";
import "../../globals.css";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  IconAdjustments,
  IconDatabase,
  IconFileAnalytics,
  IconFileCode2,
  IconFiles,
  IconLayoutGrid,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconSettings,
  IconTransformPoint,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";

const sidebarItems = [
  {
    title: "Analitik",
    icon: <IconLayoutGrid />,
    submenus: [
      {
        name: "Dasbor",
        icon: "",
        url: "/cms/ppth/analitik/dashboard",
      },
      {
        name: "Tabular",
        icon: "",
        url: "/cms/ppth/analitik/tabular",
      },
      {
        name: "Peta",
        icon: "",
        url: "/cms/ppth/analitik/peta",
      },
    ],
    url: "/cms/ppth/analitik",
  },
  {
    title: "Transaksi",
    icon: <IconTransformPoint />,
    submenus: [
      {
        name: "Stok Bibit",
        icon: "",
        url: "/cms/ppth/transaksi/stok-bibit",
      },
      {
        name: "Distribusi",
        icon: "",
        url: "/cms/ppth/transaksi/distribusi",
      },
      {
        name: "Perijinan",
        icon: "",
        url: "/cms/ppth/transaksi/perijinan",
      },
      {
        name: "PNBP",
        icon: "",
        url: "/cms/ppth/transaksi/pnbp",
      },
      {
        name: "Penghijauan",
        icon: "",
        url: "/cms/ppth/transaksi/penghijauan",
      },
    ],
    url: "/cms/ppth/transaksi",
  },
  {
    title: "Administrasi",
    icon: <IconAdjustments />,
    submenus: [
      {
        name: "Persemaian",
        icon: "",
        url: "/cms/ppth/administrasi/persemaian",
      },
      {
        name: "Kebun Bibit Rakyat",
        icon: "",
        url: "/cms/ppth/administrasi/kebun-bibit-rakyat",
      },
      {
        name: "Kebun Bibit Desa",
        icon: "",
        url: "/cms/ppth/administrasi/kebun-bibit-desa",
      },
      {
        name: "Sumber Benih",
        icon: "",
        url: "/cms/ppth/administrasi/sumber-benih",
      },
      {
        name: "Bibit Produktif",
        icon: "",
        url: "/cms/ppth/administrasi/bibit-produktif",
      },
      {
        name: "Mata Air",
        icon: "",
        url: "/cms/ppth/administrasi/mata-air",
      },
      {
        name: "Pengguna",
        icon: "",
        url: "/cms/ppth/administrasi/pengguna",
      },
      {
        name: "Pembangunan SB dan SDG",
        icon: "",
        url: "/cms/ppth/administrasi/pembangunan-sb-dan-sdg",
      },
    ],
    url: "/cms/ppth/administrasi",
  },
  {
    title: "Report",
    icon: <IconFileAnalytics />,
    submenus: [
      {
        name: "Stok Bibit",
        icon: "",
        url: "/cms/ppth/report/stok-bibit",
      },
      {
        name: "Sumber Benih",
        icon: "",
        url: "/cms/ppth/report/sumber-benih",
      },
      {
        name: "Pengedar",
        icon: "",
        url: "/cms/ppth/report/pengedar",
      },
      {
        name: "Pelaku Usaha",
        icon: "",
        url: "/cms/ppth/report/pelaku-usaha",
      },
      {
        name: "HOK",
        icon: "",
        url: "/cms/ppth/report/hok",
      },
    ],
  },
  {
    title: "Masterdata",
    icon: <IconDatabase />,
    submenus: [
      {
        name: "BPDAS",
        icon: "",
        url: "/cms/ppth/master-data/bpdas",
      },
      {
        name: "Pelaku Usaha",
        icon: "",
        url: "/cms/ppth/master-data/pelaku-usaha",
      },
      {
        name: "Pengedar",
        icon: "",
        url: "/cms/ppth/master-data/pengedar",
      },
      {
        name: "UPTD",
        icon: "",
        url: "/cms/ppth/master-data/uptd",
      },
      {
        name: "Jenis Benih",
        icon: "",
        url: "/cms/ppth/master-data/jenis-benih",
      },
      {
        name: "Struktur Wilayah",
        icon: "",
        url: "/cms/ppth/master-data/struktur-wilayah",
      },
    ],
  },
  {
    title: "Dokumen",
    icon: <IconFiles />,
    submenus: [
      {
        name: "Eksplorer",
        icon: "",
        url: "/cms/ppth/dokumen/eksplorer",
      },
    ],
  },
  {
    title: "Konten",
    icon: <IconFileCode2 />,
    submenus: [
      {
        name: "Berita",
        icon: "",
        url: "/cms/ppth/konten/berita",
      },
      {
        name: "Pengumuman",
        icon: "",
        url: "/cms/ppth/konten/pengumuman",
      },
      {
        name: "Blog",
        icon: "",
        url: "/cms/ppth/konten/blog",
      },
      {
        name: "Publikasi",
        icon: "",
        url: "/cms/ppth/konten/publikasi",
      },
    ],
  },
  {
    title: "Setting",
    icon: <IconSettings />,
    submenus: [
      {
        name: "Konfigurasi",
        icon: "",
        url: "/cms/ppth/setting/konfigurasi",
      },
      {
        name: "Log Aktivitas",
        icon: "",
        url: "/cms/ppth/setting/log-aktivitas",
      },
      {
        name: "Kontak",
        icon: "",
        url: "/cms/ppth/setting/kontak",
      },
    ],
  },
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // ✅ Panggil semua useEffect di atas
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // hanya jalan saat mounted
    sidebarItems.forEach((item) => {
      if (item.submenus.some((submenu) => submenu.url === pathname)) {
        setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
      }
    });
  }, [mounted, pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`bg-base-green text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"} hidden md:flex flex-col`}>
        <div className="flex items-center justify-center p-4">
          <Link href="/">
            <Image src={collapsed ? "/KEMENHUT.svg" : "/logo-pdasrh-white.svg"} alt="Logo" width={collapsed ? 25 : 200} height={collapsed ? 25 : 50} />
          </Link>
        </div>
        <SidebarContent collapsed={collapsed} toggleMenu={toggleMenu} openMenus={openMenus} pathname={pathname} />
        {/* <div className="p-2 mt-auto">
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <SidebarOpen /> : <SidebarClose />}
          </Button>
        </div> */}
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-2 shadow-sm">
          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4 w-64">
                <SidebarContent collapsed={false} toggleMenu={toggleMenu} openMenus={openMenus} pathname={pathname} />
              </SheetContent>
            </Sheet>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="hidden md:inline-flex">
            {collapsed ? <IconLayoutSidebarLeftExpand size={24} /> : <IconLayoutSidebarLeftCollapse size={24} />}
          </Button>
          <div className="nav-right flex gap-3">
            <ThemeToggle />

            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-1 overflow-auto h-full">{children}</main>
      </div>
    </div>
  );
}

type Submenu = {
  name: string;
  icon: string;
  url: string;
};

function SidebarContent({
  collapsed,
  toggleMenu,
  openMenus,
  pathname,
}: {
  collapsed: boolean;
  toggleMenu: (menu: string) => void;
  openMenus: { [key: string]: boolean };
  pathname: string;
}) {
  return (
    <nav className="flex flex-col gap-2 px-2 overflow-y-auto">
      {sidebarItems.map((item) => {
        const isActive = item.url && pathname.startsWith(item.url);
        return (
          <div key={item.title}>
            <Button
              variant="ghost"
              className={`flex items-center gap-2 py-2 w-full justify-start text-white text-md font-light hover:text-white hover:bg-[#074D28] ${isActive ? "bg-[#074D28]" : ""}`}
              onClick={() => item.submenus.length > 0 && toggleMenu(item.title)}>
              <span>{item.icon}</span>
              {!collapsed && <span>{item.title}</span>}
              {!collapsed && item.submenus.length > 0 && (openMenus[item.title] ? <Minus className="ml-auto h-4 w-4" /> : <Plus className="ml-auto h-4 w-4" />)}
            </Button>
            {!collapsed && openMenus[item.title] && (
              <div className="ml-8 flex flex-col gap-1 py-2">
                {item.submenus.map((submenu: Submenu) => (
                  <Link
                    href={submenu.url}
                    key={submenu.name}
                    className={`text-md py-2 font-light ${pathname === submenu.url ? "text-white font-bold" : "text-white/80 hover:text-white"}`}>
                    <span>{submenu.icon}</span>
                    {submenu.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
