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

      <div
        className="relative z-10"
        style={{
          maxWidth: "680px",
          paddingLeft: "8%",
          paddingRight: "5%",
          paddingTop: "96px",
          paddingBottom: "80px",
        }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3"
          style={{ marginBottom: "28px" }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "#ff3b3f",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "#ff3b3f",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {meta.title} · {meta.status}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            color: "#0f1626",
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Tracey Kadenyi — full-stack engineer.
        </h1>

        {/* Bio */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "#4a5568",
            fontSize: "1rem",
            lineHeight: 1.75,
            maxWidth: "520px",
            marginBottom: "36px",
          }}
        >
          {meta.bio}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "12px 28px",
              background: "#ff3b3f",
              color: "#ffffff",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.04em",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#e02e32")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#ff3b3f")}
          >
            View my work
          </button>
          <a
            href={meta.resumeUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 28px",
              border: "1px solid rgba(15,22,38,0.2)",
              color: "#4a5568",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              letterSpacing: "0.04em",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            <Download size={13} />
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "#9aa5b4",
                textDecoration: "none",
                letterSpacing: "0.08em",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "#9aa5b4",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <ArrowDown size={13} />
      </div>
    </section>
  );
}
