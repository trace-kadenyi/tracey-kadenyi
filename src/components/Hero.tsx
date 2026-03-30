"use client";

import dynamic from "next/dynamic";
import { meta, socials } from "@/lib/data";
import { ArrowDown, Download } from "lucide-react";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
});

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden m-0 p-0"
    >
      <ParticleCanvas />

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,59,63,0.05) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="relative max-w-6xl mx-auto px-6 w-full pt-24"
        style={{ zIndex: 2 }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <span className="block w-8 h-px bg-em" />
          <span className="font-mono text-em text-xs tracking-[0.2em] uppercase">
            {meta.title} · {meta.location}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black text-ink leading-[1.05] mb-6 animate-fade-up"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          I build things
          <br />
          that <span className="text-em text-glow italic">actually work.</span>
        </h1>

        {/* Subheading */}
        <p className="text-ink-muted text-lg max-w-xl leading-relaxed mb-10 animate-fade-up delay-200 anim-hidden">
          {meta.bio}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16 animate-fade-up delay-300 anim-hidden">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3.5 bg-em text-base font-display font-bold text-sm tracking-wide rounded-lg hover:bg-em-deep transition-colors duration-200"
          >
            View my work
          </button>
          <a
            href={meta.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 border border-edge-strong text-ink-muted hover:text-em hover:border-em text-sm font-sans tracking-wide rounded-lg transition-all duration-200"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6 animate-fade-up delay-400 anim-hidden">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-ink-faint hover:text-em transition-colors duration-200 tracking-wide"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-ink-faint hover:text-em transition-colors duration-300 animate-fade-in delay-700"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
