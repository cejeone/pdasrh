import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

const data = [
  { id: 1, title: "DAS Ciliwung", level: "RENDAH", color: "bg-secondary-green" },
  { id: 2, title: "DAS Bengawan Solo", level: "TINGGI", color: "bg-base-destructive" },
  { id: 3, title: "DAS Ciliwung", level: "RENDAH", color: "bg-secondary-green" },
  { id: 4, title: "DAS Bengawan Solo", level: "SEDANG", color: "bg-base-orange" },
  { id: 5, title: "DAS Bengawan Solo", level: "TINGGI", color: "bg-base-destructive" },
  { id: 6, title: "DAS Musi Rawa", level: "SEDANG", color: "bg-base-orange" },
];

export default function AwasCarousel() {
  return (
    <div className="relative w-full mx-auto lg:px-16 px-4">
      <div className="judul flex flex-row items-center gap-2 mb-3">
        <h3 className="text-muted-foreground font-bold">Monitoring AWAS</h3>
        <span className="text-muted-foreground">|</span>
        <Link href="/" className="text-muted-foreground text-sm">
          Lihat Keseluruhan
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/" className="text-muted-foreground text-sm">
          Tentang AWAS
        </Link>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/6">
              <Card className="text-center p-0 shadow-none">
                <CardContent className="flex justify-center pt-4 pb-0 px-0">
                  <Clock size={35} className="text-secondary-green mb-1 pr-2" />
                  <div className="desc flex flex-col items-start">
                    <p className="text-sm text-gray-500">16.5 - 55.4 g/m</p>
                    <p className="font-bold italic text-sm mt-1">{item.title}</p>
                  </div>
                </CardContent>
                <CardFooter className={`text-white text-sm font-medium rounded-b-lg py-1 pt-0 mt-0 justify-center ${item.color}`}>
                  <span>{item.level}</span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
