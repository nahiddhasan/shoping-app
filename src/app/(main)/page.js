import Accesories from "@/components/Accessories";
import Featured from "@/components/Featured";
import FeaturedBottom from "@/components/FeaturedBottom";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Hype from "@/components/Hype";
import Navbar from "@/components/Navbar";
import NewItem from "@/components/NewItem";
import Showcase from "@/components/Showcase";
import Sponsor from "@/components/Sponsor";

export default function Home() {
  return (
    <main >
      <Navbar/>
      <Hero/>
      <Sponsor />
      <Featured />
      <Hype/>
      <NewItem/>
      <FeaturedBottom/>
      <Accesories/>
      <Showcase/>
      <Footer/>
    </main>
  )
}
