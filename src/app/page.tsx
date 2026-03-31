import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative bg-base text-ink w-full">
      <Navbar />
      <Hero />
      <Projects />
    </main>
  );
}
