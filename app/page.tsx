import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";
import AwasCarousel from "@/components/pdasrh/AwasCarousel";
import HeroCarousel from "@/components/pdasrh/HeroCarousel";
import Persemaian from "@/components/pdasrh/Persemaian";
import Reboisasi from "@/components/pdasrh/Reboisasi";
import Mangrove from "@/components/pdasrh/Mangrove";
import Reklamasi from "@/components/pdasrh/Reklamasi";
import Partisipasi from "@/components/pdasrh/Partisipasi";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroCarousel></HeroCarousel>
      <AwasCarousel></AwasCarousel>
      <Persemaian></Persemaian>
      <Reboisasi></Reboisasi>
      <Mangrove></Mangrove>
      <Reklamasi></Reklamasi>
      <Partisipasi></Partisipasi>
      <Footer />
    </>
  );
}
