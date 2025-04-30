"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Image from "next/image";

const navItems = [
  { label: "Beranda", href: "/" },
  {
    label: "Dasbor",
    subItems: [
      { label: "Web Development", href: "/layanan/web" },
      { label: "Mobile App", href: "/layanan/mobile" },
      { label: "UI/UX Design", href: "/layanan/uiux" },
    ],
  },
  {
    label: "Peta",
    subItems: [
      { label: "Persemaian", href: "/peta/persemaian" },
      { label: "Penghijauan", href: "/peta/penghijauan" },
      { label: "Sumber Benih", href: "/peta/sumber-benih" },
      { label: "Perijinan", href: "/peta/perijinan" },
    ],
  },
  {
    label: "Data",
    subItems: [
      { label: "Sumber Benih", href: "/data/sumber-benih" },
      { label: "Sertifikasi dan Peredaran", href: "/data/sertifikasi-peredaran" },
      { label: "Persemaian", href: "/data/persemaian" },
    ],
  },
  {
    label: "Dokumen",
    subItems: [
      { label: "Peraturan", href: "/dokumen/peraturan" },
      { label: "Publikasi", href: "/dokumen/publikasi" },
    ],
  },
  {
    label: "Organisasi",
    subItems: [
      { label: "Sekditjen", href: "/organisasi/sekditjen" },
      { label: "Direktorat PEPDAS", href: "/organisasi/direktorat-pepdas" },
      { label: "Direktorat RM", href: "/organisasi/direktorat-rm" },
      { label: "Direktorat PPTH", href: "/organisasi/direktorat-ppth" },
      { label: "Direktorat TKTRH", href: "/organisasi/direktorat-tktrh" },
      { label: "Direktorat RH", href: "/organisasi/direktorat-rh" },
    ],
  },
  {
    label: "Profil",
    subItems: [
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi dan Misi", href: "/profil/visi-misi" },
      { label: "Tugas dan Fungsi", href: "/profil/tugas-fungsi" },
      { label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
    ],
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white flex items-center justify-between px-6 py-4 shadow-sm">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">
          <Image src="/logo-pdasrh.svg" width={250} height={100} alt="" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
        {navItems.map((item) =>
          item.subItems ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                {item.label}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {item.subItems.map((sub) => (
                  <DropdownMenuItem key={sub.href}>
                    <Link href={sub.href}>{sub.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link key={item.href} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigasi</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 text-base font-medium">
              {navItems.map((item) =>
                item.subItems ? (
                  <Accordion type="single" collapsible key={item.label}>
                    <AccordionItem value={item.label}>
                      <AccordionTrigger className="text-left py-2">{item.label}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-4">
                          {item.subItems.map((sub) => (
                            <SheetClose asChild key={sub.href}>
                              <Link href={sub.href}>{sub.label}</Link>
                            </SheetClose>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </SheetClose>
                )
              )}

              <SheetClose asChild>
                <Button variant="green" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Tombol login (desktop) */}
      <div className="hidden md:block">
        <Link href="/login">
          <Button>Masuk</Button>
        </Link>
      </div>
    </header>
  );
}
