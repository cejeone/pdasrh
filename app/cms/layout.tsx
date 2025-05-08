"use client";
import "../globals.css";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plus, Minus, MapPin, File, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconChartHistogram, IconDatabase, IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconTransformPoint } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sidebar data
const sidebarItems = [
  {
    groupTitle: "MENU RH",
    items: [
      {
        title: "Dasbor",
        icon: <IconChartHistogram className="w-4 h-4" />,
        url: "/rh/dasbor",
        submenus: [],
      },
      {
        title: "Peta",
        icon: <MapPin className="w-4 h-4" />,
        url: "/rh/peta",
        submenus: [],
      },
      {
        title: "Tabular",
        icon: <IconDatabase className="w-4 h-4" />,
        url: "/rh/tabular",
        submenus: [],
      },
      {
        title: "Rencana Kerja",
        icon: <IconTransformPoint className="w-4 h-4" />,
        url: "/rh/rencana-kerja",
        submenus: [
          { name: "Program", url: "/rh/rencana-kerja/program", icon: <File className="w-4 h-4" /> },
          { name: "Kegiatan", url: "/rh/rencana-kerja/kegiatan", icon: <File className="w-4 h-4" /> },
          { name: "Monitoring & Evaluasi", url: "/rh/rencana-kerja/monitoring-evaluasi", icon: <File className="w-4 h-4" /> },
          { name: "Serah Terima", url: "/rh/rencana-kerja/serah-terima", icon: <File className="w-4 h-4" /> },
        ],
      },
      {
        title: "Dokumen",
        icon: <File className="w-4 h-4" />,
        url: "/rh/dokumen",
        submenus: [],
      },
      {
        title: "Konten",
        icon: <Newspaper className="w-4 h-4" />,
        url: "/rh/konten",
        submenus: [],
      },
    ],
  },

  // superadmin
  {
    groupTitle: "SUPER ADMIN",
    items: [
      {
        title: "Master Data",
        icon: <IconTransformPoint className="w-4 h-4" />,
        url: "",
        submenus: [
          { name: "Pelaku Usaha", url: "/master-data/pelaku-usaha", icon: <File className="w-4 h-4" /> },
          { name: "Kelompok Masyarakat", url: "/master-data/kelompok-masyarakat", icon: <File className="w-4 h-4" /> },
          { name: "Struktur Wilayah", url: "/master-data/struktur-wilayah", icon: <File className="w-4 h-4" /> },
          { name: "SPAS", url: "/master-data/spas", icon: <File className="w-4 h-4" /> },
        ],
      },
      {
        title: "Organisasi",
        icon: <IconTransformPoint className="w-4 h-4" />,
        url: "",
        submenus: [
          { name: "Eselon I", url: "/organisasi/eselon-i", icon: <File className="w-4 h-4" /> },
          { name: "Eselon II", url: "/organisasi/eselon-ii", icon: <File className="w-4 h-4" /> },
          { name: "BPDAS", url: "/organisasi/bpdas", icon: <File className="w-4 h-4" /> },
          { name: "UPTD", url: "/organisasi/uptd", icon: <File className="w-4 h-4" /> },
        ],
      },
      {
        title: "Institusi",
        icon: <File className="w-4 h-4" />,
        url: "/institusi",
        submenus: [],
      },
      {
        title: "LOV",
        icon: <Newspaper className="w-4 h-4" />,
        url: "/lov",
        submenus: [],
      },
      {
        title: "Konfigurasi Sistem",
        icon: <Newspaper className="w-4 h-4" />,
        url: "/konfigurasi-sistem",
        submenus: [],
      },
      {
        title: "Integrasi",
        icon: <Newspaper className="w-4 h-4" />,
        url: "/integrasi",
        submenus: [],
      },
      {
        title: "Manajemen Pengguna",
        icon: <IconTransformPoint className="w-4 h-4" />,
        url: "",
        submenus: [
          { name: "Pengguna", url: "/manajemen-pengguna/pengguna", icon: <File className="w-4 h-4" /> },
          { name: "Peran", url: "/manajemen-pengguna/peran", icon: <File className="w-4 h-4" /> },
        ],
      },
    ],
  },
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/cms/, "");

  // Open matched menu on load
  useEffect(() => {
    const newOpenMenus: { [key: string]: boolean } = {};

    for (const group of sidebarItems) {
      for (const item of group.items) {
        const isMatched = item.submenus.some((submenu) => pathname.startsWith(submenu.url));
        if (isMatched) {
          const menuKey = `${group.groupTitle}-${item.title}`;
          newOpenMenus[menuKey] = true;
        }
      }
    }

    setOpenMenus(newOpenMenus);
  }, [pathname]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // cegah render di server

  const toggleMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({
      [menuKey]: !prev[menuKey],
    }));
  };

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
        <main className="px-4 py-2 overflow-auto h-full">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  collapsed,
  toggleMenu,
  openMenus,
  pathname,
}: {
  collapsed: boolean;
  toggleMenu: (menuKey: string) => void;
  openMenus: { [key: string]: boolean };
  pathname: string;
}) {
  const CMS_PREFIX = "/cms";
  return (
    <nav className="flex flex-col gap-2 px-2 overflow-y-auto">
      {sidebarItems.map((group) => (
        <div key={group.groupTitle}>
          <p className="text-xs text-white/60 font-bold px-2 pt-4 pb-1 uppercase">{group.groupTitle}</p>
          {group.items.map((item) => {
            const menuKey = `${group.groupTitle}-${item.title}`;
            const isOpen = openMenus[menuKey];
            const hasSubmenus = item.submenus.length > 0;
            const isActive = item.url && (pathname === item.url || pathname.startsWith(item.url + "/"));

            const menuButton = hasSubmenus ? (
              <Button
                variant="ghost"
                className={`flex items-center gap-2 py-2 w-full justify-start text-white text-md font-light hover:text-white hover:bg-[#074D28] ${isOpen ? "bg-[#074D28]" : ""}`}
                onClick={() => toggleMenu(menuKey)}>
                <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-2 w-full"}`}>
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.title}</span>}
                  {!collapsed && hasSubmenus && <span className="ml-auto">{isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>}
                </div>
              </Button>
            ) : (
              <Link
                href={CMS_PREFIX + item.url}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "justify-start"
                } gap-2 py-2 px-4 rounded-md w-full  text-white text-md font-light hover:text-white hover:bg-[#074D28] ${isActive ? "bg-[#074D28] font-bold" : ""}`}>
                <span className="shrink-0 w-4 h-4">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );

            return (
              <div key={menuKey}>
                {collapsed ? (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>{menuButton}</TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  menuButton
                )}

                {!collapsed && hasSubmenus && isOpen && (
                  <div className="ml-8 flex flex-col gap-1 py-1">
                    {item.submenus.map((submenu) => (
                      <Link
                        href={CMS_PREFIX + submenu.url}
                        key={submenu.name}
                        className={`text-md py-1 font-light flex items-center gap-2 ${
                          pathname.startsWith(submenu.url) ? "text-white font-bold" : "text-white/80 hover:text-white"
                        }`}>
                        <span className="shrink-0 w-4 h-4">{submenu.icon}</span>
                        {submenu.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
