import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Frame } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const beritaUtama = {
  title: "Penghijauan Nasional Capai Target Kuartal I Tahun 2025",
  date: "15 Maret 2025",
  description: "Program penghijauan nasional telah mencapai target luasan penanaman hijau pada kuartal pertama tahun ini. ",
  image: "/img/images.webp",
  link: "/berita/penghijauan nasional",
};

const beritaLainnya = [
  {
    title: "Peningkatan Infrastruktur Hijau di Papua Barat",
    date: "15 Maret 2025",
    image: "/img/image3.jpg",
    link: "/berita/partisipasi-masyarakat",
  },
  {
    title: "Teknologi Modern Dorong Efisiensi Program Penghijauan",
    date: "15 Maret 2025",
    image: "/img/image3.jpg",
    link: "/berita/pembangunan-mentawir-1",
  },
  {
    title: "Teknologi Modern Dorong Efisiensi Program Penghijauan",
    date: "15 Maret 2025",
    image: "/img/image3.jpg",
    link: "/berita/pembangunan-mentawir-2",
  },
];

const dashboard = [
  {
    id: 1,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
  {
    id: 2,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
  {
    id: 3,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
  {
    id: 4,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
  {
    id: 5,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
  {
    id: 6,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
  {
    id: 7,
    title: "PP BONE",
    year: "2025",
    count: "5.000.000",
    desc: "Batang",
  },
];

const photo = [
  {
    id: 1,
    image: "/img/bibit.png",
    title: "Penghijauan Jawa Barat",
  },
  {
    id: 2,
    image: "/img/konservasi.jpg",
    title: "Konservasi Sumber Air Jawa Tengah",
  },
  {
    id: 3,
    image: "/img/sapih-benih.jpg",
    title: "Pembibitan Jawa Tengah",
  },
];

export default function Reboisasi() {
  return (
    <section className="relative w-full mx-auto lg:px-16 px-4 py-8">
      <h4 className="text-2xl md:text-2xl font-bold text-base-gray mb-6 text-end">Reboisasi melalui program KBR</h4>
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

      <Carousel className="w-full mb-6">
        <CarouselContent>
          {photo.map((item) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
              <Card className="text-center p-0 shadow-none">
                <CardContent className="flex flex-col justify-center items-center py-0 px-0">
                  <div className="relative mb-2 w-full" style={{ height: "300px" }}>
                    <Image src={item.image} alt={item.title} fill className="rounded-sm object-cover" sizes="100vw" />
                  </div>

                  <span className="text-sm mb-2">{item.title}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>

      {/* dashboard */}
      <Carousel className="w-full">
        <CarouselContent>
          {dashboard.map((item) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Card className="text-center p-0 shadow-none border-none bg-gradient-to-b from-[#FFFFFF] to-[#D7FBD7]">
                <CardContent className="flex flex-col justify-center items-center py-4 px-0">
                  <span className="font-bold text-md"> {item.title}</span>
                  <span className="font-light text-sm text-base-gray">{item.year}</span>
                  <Frame size={40} className="text-secondary-green mb-1" />
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
