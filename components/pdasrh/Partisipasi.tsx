import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const beritaUtama = {
  title: "Peran Dunia Usaha dalam Rehabilitasi Hutan dan Lahan Kritis",
  date: "15 Maret 2025",
  description: "Pelaku usaha kini semakin sadar akan pentingnya peran mereka dalam menjaga kelestarian lingkungan. Melalui program CSR",
  image: "/img/pelaku_usaha_3.jpeg",
  link: "/berita/kunjungan-presiden",
};

const beritaLainnya = [
  {
    title: "Kemitraan Persemaian Permanen dan Dunia Usaha: Kolaborasi Hijau untuk Masa Depan",
    date: "15 Maret 2025",
    image: "/img/pelaku_usaha_1.jpg",
    link: "/berita/partisipasi-masyarakat",
  },
  {
    title: "Peluang dan Tantangan Bagi Dunia Usaha di Sektor Kehutanan",
    date: "15 Maret 2025",
    image: "/img/pelaku_usaha.webp",
    link: "/berita/pembangunan-mentawir-1",
  },
  {
    title: "Peluang dan Tantangan Bagi Dunia Usaha di Sektor Kehutanan",
    date: "15 Maret 2025",
    image: "/img/pelaku_usaha.webp",
    link: "/berita/pembangunan-mentawir-2",
  },
];

const dashboard = [
  {
    id: 1,
    title: "Perhutani Green Indonesia",
    count: "150",
    image: "/img/logo/perhutani.svg",
    desc: "Hektar",
  },
  {
    id: 2,
    title: "PT Sang Hyang Seri",
    count: "150",
    image: "/img/logo/sang_hyang.svg",
    desc: "Hektar",
  },
  {
    id: 3,
    title: "PT Rimba Makmur Utama (RMU)",
    count: "150",
    image: "/img/logo/rmu.svg",
    desc: "Hektar",
  },
  {
    id: 4,
    title: "PT. Musi Hutan Persada",
    count: "150",
    image: "/img/logo/mhp.svg",
    desc: "Hektar",
  },
  {
    id: 5,
    title: "PT Inhutani I – V",
    count: "150",
    image: "/img/logo/inhutani.svg",
    desc: "Hektar",
  },
];

export default function Partisipasi() {
  return (
    <section className="relative w-full mx-auto lg:px-16 px-4 py-8">
      <h4 className="text-2xl md:text-2xl font-bold text-base-gray mb-6">Partisipasi Pelaku Usaha</h4>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
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
      </div>

      {/* dashboard */}
      <Carousel className="w-full">
        <CarouselContent>
          {dashboard.map((item) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Card className="text-center p-0 shadow-none  h-[200px]">
                {" "}
                <CardContent className="flex flex-col justify-center items-center py-4 px-0 h-full">
                  <span className="font-bold text-md mb-3">{item.title}</span>
                  <div className="w-[60px] h-[60px] flex items-center justify-center mb-2">
                    {" "}
                    <Image src={item.image} alt={item.title} width={50} height={50} className="object-contain max-h-full" />
                  </div>
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
