import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "../ui/alert";

const heroSlides = [
  {
    id: 1,
    imageUrl: "/hero/pepdas.jpeg",
    title: "Komisi IV DPR RI Dukung Upaya Pemerintah dalam Merehabilitasi Mangrove",
    subtitle:
      "Mengakhiri Masa Persidangan I Tahun Sidang 2024–2025, Komisi IV DPR RI melakukan kunjungan kerja reses di Persemaian Mangrove G20 di Pemogan, Denpasar Selatan, Denpasar.",
  },
  {
    id: 2,
    imageUrl: "/hero2.jpg",
    title: "Program Penanaman Mangrove Nasional",
    subtitle: "Kolaborasi antara pemerintah, masyarakat, dan swasta untuk restorasi ekosistem pesisir.",
  },
  {
    id: 3,
    imageUrl: "/hero3.jpg",
    title: "Edukasi dan Aksi Nyata di Lapangan",
    subtitle: "Pelibatan aktif masyarakat lokal untuk menjaga dan menanam mangrove demi masa depan berkelanjutan.",
  },
  {
    id: 4,
    imageUrl: "/hero4.jpg",
    title: "Peran Strategis Mangrove di Tengah Perubahan Iklim",
    subtitle: "Mangrove sebagai benteng alami yang memperkuat ketahanan pesisir terhadap abrasi dan banjir rob.",
  },
];

export default function HeroCarousel() {
  return (
    <>
      <div className="relative w-full h-full overflow-hidden mb-5">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id} className="h-full">
                <div className="relative w-full h-[86vh] bg-cover bg-center flex items-center justify-start text-white" style={{ backgroundImage: `url(${slide.imageUrl})` }}>
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <div className="container lg:mx-10 px-4 relative z-20 max-w-4xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{slide.title}</h1>
                    <p className="text-base md:text-lg text-white/80 mb-6">{slide.subtitle}</p>
                    {/* <div className="flex flex-col sm:flex-row gap-4 ">
                      <Button variant="outline" className="bg-white text-green-700 font-semibold">
                        🗺️ Peta Mangrove Nasional
                      </Button>
                      <Button variant="destructive">📥 Ajukan Permintaan Bibit</Button>
                    </div> */}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 z-30 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 z-30 -translate-y-1/2" />
        </Carousel>

        <Alert className="bg-amber-100 rounded-none p-2">
          <AlertTitle>
            <strong>Pengumuman</strong> : Penggunaan pakaian dinas akan di seragamkan per 1 Mei 2025 (running text)
          </AlertTitle>
        </Alert>
      </div>
    </>
  );
}
