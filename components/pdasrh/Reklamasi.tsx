import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Copy } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const beritaUtama = {
  title: "Pemanfaatan Tanaman Lokal untuk Konservasi Sumber Air",
  date: "15 Maret 2025",
  description: "Tanaman lokal seperti beringin, gayam, dan aren terbukti efektif menjaga kelembaban tanah dan mendukung ketersediaan air",
  image: "/img/sumber_air_5.webp",
  link: "/berita/penghijauan nasional",
};

const beritaLainnya = [
  {
    title: "Kolaborasi Komunitas Adat dalam Rehabilitasi Hutan",
    date: "15 Maret 2025",
    image: "/img/mata_air1.jpg",
    link: "/berita/partisipasi-masyarakat",
  },
  {
    title: "Pelaku Usaha Didorong Gunakan Skema Green IPPKH",
    date: "15 Maret 2025",
    image: "/img/mata_air_2.jpg",
    link: "/berita/pembangunan-mentawir-1",
  },
  {
    title: "Pelaku Usaha Didorong Gunakan Skema Green IPPKH",
    date: "15 Maret 2025",
    image: "/img/mata_air.jpg",
    link: "/berita/pembangunan-mentawir-2",
  },
];

const dashboard = [
  {
    id: 1,
    title: "BPDAS Jawa Timur",
    year: "2025",
    count: "1.257",
    desc: "Hektar",
  },
  {
    id: 2,
    title: "BPDA Jawa Barat",
    year: "2025",
    count: "250",
    desc: "Hektar",
  },
  {
    id: 3,
    title: "BPDAS Lampung",
    year: "2025",
    count: "394",
    desc: "Hektar",
  },
  {
    id: 4,
    title: "BPDAS Bangka Belitung",
    year: "2025",
    count: "3.293",
    desc: "Hektar",
  },
  {
    id: 5,
    title: "BPDAS Aceh",
    year: "2025",
    count: "7.402",
    desc: "Hektar",
  },
];

export default function Reklamasi() {
  return (
    <section className="relative w-full mx-auto lg:px-16 px-4 py-8">
      <h4 className="text-2xl md:text-2xl font-bold text-base-gray mb-6 text-end">Reklamasi Hutan akibat Tambang</h4>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
        <div className="flex flex-col gap-4 h-full lg:col-span-5">
          {beritaLainnya.map((item, idx) => (
            <Card key={idx} className="flex-1 p-0">
              <CardContent className="flex gap-4 p-4 items-center h-full">
                <Image src={item.image} alt={item.title} width={120} height={100} className="h-full object-cover rounded-sm" />
                <div className="flex flex-col justify-between h-full">
                  <div className="title-date">
                    <p className="text-xs text-base-gray font-medium mb-1">{item.date}</p>
                    <h4 className="text-md font-semibold text-black">{item.title}</h4>
                  </div>
                  <a href={item.link} className="text-secondary-green font-semibold text-sm inline-flex items-center gap-1 mt-1 hover:underline">
                    Baca Selengkapnya <ArrowRight size={14} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-7 p-0 h-full">
          <CardContent className="p-4">
            <div className="relative h-82 mb-5">
              <Image src={beritaUtama.image} alt={beritaUtama.title} layout="fill" objectFit="cover" className="rounded-sm mb-4" />
            </div>

            <p className="text-xs text-base-gray font-medium mb-1">{beritaUtama.date}</p>
            <h3 className="text-lg font-bold mb-2 text-black">{beritaUtama.title}</h3>
            <p className="text-base-gray text-sm mb-4">{beritaUtama.description}</p>
            <a href={beritaUtama.link} className="text-secondary-green font-semibold text-sm inline-flex items-center gap-1 hover:underline">
              Baca Selengkapnya <ArrowRight size={16} />
            </a>
          </CardContent>
        </Card>
      </div>

      {/* dashboard */}
      <Carousel className="w-full">
        <CarouselContent>
          {dashboard.map((item) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Card className="text-center p-0 shadow-none border-none bg-gradient-to-b from-[#FDFFFF] to-[#D1F4FF]">
                <CardContent className="flex flex-col justify-center items-center py-4 px-0">
                  <span className="font-bold text-md"> {item.title}</span>
                  <span className="font-light text-sm text-base-gray">{item.year}</span>
                  <Copy size={40} className="text-base-blue mb-1" />
                  <span className="font-bold text-2xl mt-1">{item.count}</span>
                  <span className="text-sm mt-1">{item.desc}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </section>
  );
}
