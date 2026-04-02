"use client";

import dynamic from "next/dynamic";
import { meta, socials } from "@/lib/data";
import { ArrowDown, Download } from "lucide-react";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
    >
      <ParticleCanvas />

      <div className="relative z-10 max-w-[680px] pl-[8%] pr-[5%] pt-24 pb-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-7">
          <span className="block w-6 h-px bg-[#ff3b3f] shrink-0" />
          <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.18em] uppercase font-medium">
            Tracey Kadenyi · {meta.title}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black text-[#0f1626] leading-[1.2] mb-5"
          style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
        >
          I solve problems— <br />
          <span className="text-[0.9em] tracking-tighter">
            ; one line of code at a time.
          </span>
        </h1>

        {/* Bio */}
        <p className="font-sans text-[#4a5568] text-base leading-[1.75] max-w-[520px] mb-9">
          {meta.bio}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-9">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3 bg-[#ff3b3f] hover:bg-[#e02e32] text-white font-display font-bold text-sm tracking-[0.04em] rounded-lg border-none cursor-pointer transition-colors duration-200"
          >
            View my work
          </button>
          <a
            href={meta.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3 border border-[rgba(15,22,38,0.2)] text-[#4a5568] font-sans text-sm tracking-[0.04em] rounded-lg no-underline"
          >
            <Download size={13} />
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-7">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#9aa5b4] no-underline tracking-[0.08em]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#9aa5b4]">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ArrowDown size={13} />
      </div>
    </section>
  );
}
