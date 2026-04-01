import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="relative bg-white text-[#0f1626] w-full">
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
