"use client";

import { useRef, useEffect, useState } from "react";
import { ExternalLink, Code2 } from "lucide-react";

import { projects } from "@/lib/data";
import ImageSlideshow from "./ImageSlideshow";
import ProjectsHeader from "./ProjectsHeader";

function ProjectScene({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const isEven = index % 2 === 0;
  const bg = isEven ? "#0f1626" : "#ffffff";
  const fg = isEven ? "#ffffff" : "#0f1626";
  const fgMuted = isEven ? "rgba(255,255,255,0.55)" : "#4a5568";
  const borderCol = isEven ? "rgba(255,59,63,0.2)" : "rgba(15,22,38,0.08)";
  const highlightBg = isEven ? "rgba(255,59,63,0.08)" : "rgba(15,22,38,0.04)";
  const highlightBorder = isEven
    ? "rgba(255,59,63,0.15)"
    : "rgba(15,22,38,0.1)";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 16, y: (x - 0.5) * -16 });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: bg,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "80px 6%",
      }}
    >
      {/* Giant background number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: isEven ? "-1%" : "auto",
          right: isEven ? "auto" : "-1%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(14rem, 25vw, 26rem)",
          color: isEven ? "rgba(255,59,63,0.05)" : "rgba(15,22,38,0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}
      >
        0{index + 1}
      </div>

      {/* Mouse glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,59,63,0.07) 0%, transparent 55%)`,
          pointerEvents: "none",
          transition: "background 0.2s ease",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "72px",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <div
          style={{
            order: isEven ? 1 : 2,
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.97)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1px",
                background: "#ff3b3f",
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
              {project.tagline}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              color: fg,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              lineHeight: 1,
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              color: fgMuted,
              fontSize: "0.95rem",
              lineHeight: 1.75,
              marginBottom: "24px",
              maxWidth: "400px",
            }}
          >
            {project.description}
          </p>

          {/* Highlights */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 28px 0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {project.highlights.map((h, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: fgMuted,
                  padding: "8px 12px",
                  background: highlightBg,
                  border: `1px solid ${highlightBorder}`,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <span
                  style={{ color: "#ff3b3f", flexShrink: 0, marginTop: "1px" }}
                >
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "32px",
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "rgba(255,59,63,0.08)",
                  color: "#ff3b3f",
                  border: "1px solid rgba(255,59,63,0.18)",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "12px" }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                background: "#ff3b3f",
                color: "#ffffff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "13px",
                borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              <ExternalLink size={13} />
              Live site
            </a>
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                border: `1px solid ${isEven ? "rgba(255,255,255,0.2)" : "rgba(15,22,38,0.2)"}`,
                color: fg,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "13px",
                borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              <Code2 size={13} />
              Source
            </a>
          </div>
        </div>

        {/* Slideshow card */}
        <div
          style={{
            order: isEven ? 2 : 1,
            perspective: "1000px",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.95)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: `1px solid ${borderCol}`,
              boxShadow: isEven
                ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,59,63,0.1)"
                : "0 32px 80px rgba(15,22,38,0.15)",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.2s ease-out",
              transformStyle: "preserve-3d",
              height: "340px",
            }}
          >
            <ImageSlideshow images={project.images} visible={visible} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <ProjectsHeader />
      {projects.map((project, index) => (
        <ProjectScene key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
