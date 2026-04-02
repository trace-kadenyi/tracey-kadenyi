import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <main className="relative bg-white text-[#0f1626] w-full">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Blog />
    </main>
  );
}