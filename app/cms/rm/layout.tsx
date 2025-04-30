"use client";
import "../../globals.css";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, SidebarOpen, SidebarClose, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: "",
    submenus: [],
    url: "/dashboard",
  },
  {
    title: "Transaksi",
    icon: "",
    submenus: [],
    url: "/transaksi",
  },
  {
    title: "Administrasi",
    icon: "",
    submenus: [
      { name: "Persemaian", url: "/cms" },
      { name: "Kebun Bibit Rakyat", url: "/administrasi/kebun-bibit-rakyat" },
      { name: "Kebun Bibit Desa", url: "/administrasi/kebun-bibit-desa" },
      { name: "Sumber Benih", url: "/administrasi/sumber-benih" },
      { name: "Bibit Produktif", url: "/administrasi/bibit-produktif" },
      { name: "Mata Air", url: "/administrasi/mata-air" },
      { name: "Pengguna", url: "/administrasi/pengguna" },
      { name: "Pembangunan SB dan SDG", url: "/administrasi/pembangunan-sb-dan-sdg" },
    ],
  },
  {
    title: "Report",
    icon: "",
    submenus: [],
    url: "/report",
  },
  {
    title: "Masterdata",
    icon: "",
    submenus: [],
    url: "/masterdata",
  },
  {
    title: "Dokumen",
    icon: "",
    submenus: [],
    url: "/dokumen",
  },
  {
    title: "Konten",
    icon: "",
    submenus: [],
    url: "/konten",
  },
  {
    title: "Setting",
    icon: "",
    submenus: [],
    url: "/setting",
  },
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.submenus.some((submenu) => submenu.url === pathname)) {
        setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
      }
    });
  }, [pathname]);

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
        <header className="flex items-center justify-between bg-white p-2 shadow-sm">
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
            {collapsed ? <SidebarOpen /> : <SidebarClose />}
          </Button>
        </header>

        {/* Page Content */}
        <main className="p-2 overflow-auto h-full">{children}</main>
      </div>
    </div>
  );
}

type Submenu = {
  name: string;
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
    <nav className="flex flex-col gap-2 px-2">
      {sidebarItems.map((item) => {
        const isActive = item.url && pathname.startsWith(item.url);
        return (
          <div key={item.title}>
            <Button
              variant="ghost"
              className={`flex items-center gap-2 py-2 w-full justify-start text-white text-md hover:text-white hover:bg-[#074D28] ${isActive ? "bg-[#074D28]" : ""}`}
              onClick={() => item.submenus.length > 0 && toggleMenu(item.title)}>
              <span>{item.icon}</span>
              {!collapsed && <span>{item.title}</span>}
              {!collapsed && item.submenus.length > 0 && (openMenus[item.title] ? <Minus className="ml-auto h-4 w-4" /> : <Plus className="ml-auto h-4 w-4" />)}
            </Button>
            {!collapsed && openMenus[item.title] && (
              <div className="ml-8 flex flex-col gap-1">
                {item.submenus.map((submenu: Submenu) => (
                  <Link
                    href={submenu.url}
                    key={submenu.name}
                    className={`text-md py-1 ${pathname === submenu.url ? "text-white font-bold bg-white/10" : "text-white/80 hover:text-white"}`}>
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
