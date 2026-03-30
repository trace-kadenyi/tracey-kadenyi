import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-base text-ink">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-em font-mono text-sm tracking-widest uppercase">
          Tracey Kadenyi — coming soon
        </p>
      </div>
    </main>
  );
}
