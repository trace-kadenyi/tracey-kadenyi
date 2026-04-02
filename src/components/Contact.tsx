"use client";

import { useRef } from "react";
import { useVisible } from "@/hooks/useVisible";
import { socials, meta } from "@/lib/data";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible = useVisible(sectionRef, 0.2);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#0f1626] relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-[8%] py-24 flex flex-col items-start gap-10">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span className="block w-6 h-px bg-[#ff3b3f] shrink-0" />
          <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.18em] uppercase">
            Contact
          </span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.15s",
          }}
        >
          <a
            href={`mailto:${meta.email}`}
            className="px-8 py-4 bg-[#ff3b3f] hover:bg-[#e02e32] text-white font-display font-bold text-sm tracking-[0.04em] rounded-lg no-underline transition-colors duration-200"
          >
            Get in touch
          </a>
          <a
            href={meta.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,59,63,0.4)] text-[rgba(255,255,255,0.6)] hover:text-white font-display font-bold text-sm tracking-[0.04em] rounded-lg no-underline transition-all duration-200"
          >
            View CV
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(255,255,255,0.06)]" />

        {/* Socials */}
        <div
          className="flex flex-wrap items-center gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[rgba(255,255,255,0.35)] hover:text-[#ff3b3f] tracking-[0.1em] uppercase no-underline transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
