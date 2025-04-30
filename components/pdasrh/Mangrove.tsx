import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const beritaUtama = {
  title: "Kunjungan Presiden di Persemaian Mentawir",
  date: "15 Maret 2025",
  description:
    "Kementerian LHK meningkatkan kapasitas sumber benih melalui pemangkasan pohon induk, penambahan label genetik, serta pemetaan zona adaptif berdasarkan pendekatan ASDG.",
  image: "/img/ppth.png",
  link: "/berita/kunjungan-presiden",
};

const beritaLainnya = [
  {
    title: "Partisipasi Masyarakat Kab. Penajem dalam pembangunan Persemaian Mentawir",
    date: "15 Maret 2025",
    image: "/img/partisipasi.png",
    link: "/berita/partisipasi-masyarakat",
  },
  {
    title: "Pembangunan Persemaian Mentawir di IKN",
    date: "15 Maret 2025",
    image: "/img/partisipasi.png",
    link: "/berita/pembangunan-mentawir-1",
  },
  {
    title: "Pembangunan Persemaian Mentawir di IKN",
    date: "15 Maret 2025",
    image: "/img/partisipasi.png",
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

export default function Mangrove() {
  return (
    <section className="relative w-full mx-auto lg:px-16 px-4 py-8">
      <h4 className="text-2xl md:text-2xl font-bold text-base-gray mb-6">Peta Mangrove Nasional</h4>
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
              <Card className="text-center p-0 shadow-none border-none bg-gradient-to-b from-[#FFFFFF] to-[#FEE5A6]">
                <CardContent className="flex flex-col justify-center items-center py-4 px-0">
                  <span className="font-bold text-md"> {item.title}</span>
                  <span className="font-light text-sm text-base-gray">{item.year}</span>
                  <Home size={40} className="text-secondary-green mb-1" />
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
