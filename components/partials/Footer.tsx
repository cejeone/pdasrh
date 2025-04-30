import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-green text-white py-10">
      <div className=" flex flex-col md:flex-row justify-between gap-8 relative w-full mx-auto lg:px-16 px-4 py-8">
        {/* Left side */}
        <div className="flex flex-col gap-4 max-w-full">
          <div className="flex items-start gap-3">
            <div className="">
              {/* Placeholder for Logo */}
              <Image src="/KEMENHUT.svg" alt="" width={73} height={73} className="h-full" />
            </div>
            <div>
              <h3>Kementerian Kehutanan</h3>
              <h2 className="font-bold text-lg">Direktorat Jenderal Pengelolaan DAS dan Rehabilitasi Hutan</h2>
              <p className="text-sm">Gedung Manggala Wanabakti Blok 1 Lt. 12 dan Lt. 13, Jl. Gatot Subroto Senayan, Jakarta 10270, Indonesia</p>
              <div className="contact mt-5">
                <div className="text-sm">
                  <p>Telp: +62 (021) 5730125, 5730106</p>
                  {/* <p>Email: pdas.rh@mail.kemenhut.id</p> */}
                </div>
                <div className="flex gap-4 mt-4 text-base-gray">
                  <Twitter className="w-5 h-5 hover:text-white" />
                  <Instagram className="w-5 h-5 hover:text-white" />
                  <Youtube className="w-5 h-5 hover:text-white" />
                  <Facebook className="w-5 h-5 hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="right-side">
          <div className="flex gap-4 mt-2 md:mt-0 text-base-gray mb-5 justify-end">
            <Link href="" className="hover:text-white">
              Sigap
            </Link>
            <span>|</span>
            <Link href="" className="hover:text-white">
              Lapor
            </Link>
            <span>|</span>
            <Link href="" className="hover:text-white">
              OSS
            </Link>
            <span>|</span>
            <Link href="" className="hover:text-white">
              Planologi
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-end">
            <p>Sekretariat Direktorat Jenderal</p>
            <p>Direktorat Perencanaan dan Evaluasi Pengelolaan DAS</p>
            <p>Direktorat Teknik Konservasi Tanah dan Reklamasi Hutan</p>
            <p>Direktorat Rehabilitasi Hutan</p>
            <p>Direktorat Rehabilitasi Mangrove</p>
          </div>
        </div>
      </div>

      <div className="relative w-full mx-auto lg:px-16 py-8 px-4 mt-8 flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-4 text-xs">
        <p className="text-base-gray">Copyright © Direktorat PDAS - 2025. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-base-gray ">
          <Link href="" className="hover:text-white">
            Bantuan
          </Link>
          <span>|</span>
          <Link href="" className="hover:text-white">
            Kebijakan
          </Link>
          <span>|</span>
          <Link href="" className="hover:text-white">
            Perlindungan Data
          </Link>
        </div>
      </div>
    </footer>
  );
}
