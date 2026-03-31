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
      className="relative min-h-screen flex items-center overflow-hidden px-[6%] py-20"
      style={{ background: bg }}
    >
      {/* Giant background number */}
      <div
        className="absolute top-1/2 -translate-y-1/2 font-display font-black leading-none select-none pointer-events-none tracking-[-0.05em]"
        style={{
          left: isEven ? "-1%" : "auto",
          right: isEven ? "auto" : "-1%",
          fontSize: "clamp(14rem, 25vw, 26rem)",
          color: isEven ? "rgba(255,59,63,0.05)" : "rgba(15,22,38,0.04)",
        }}
      >
        0{index + 1}
      </div>

      {/* Mouse glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,59,63,0.07) 0%, transparent 55%)`,
          transition: "background 0.2s ease",
        }}
      />

      {/* Grid */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-2 gap-[72px] items-center">
        {/* Text */}
        <div
          className="flex flex-col"
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
          <div className="flex items-center gap-[10px] mb-5">
            <span className="block w-5 h-px bg-[#ff3b3f] shrink-0" />
            <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.18em] uppercase">
              {project.tagline}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-display font-black leading-none mb-5 tracking-[-0.03em]"
            style={{
              color: fg,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            className="font-sans text-[0.95rem] leading-[1.75] mb-6 max-w-[400px]"
            style={{ color: fgMuted }}
          >
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="list-none p-0 flex flex-col gap-2 mb-7">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="font-sans text-[0.85rem] px-3 py-2 rounded-md flex items-start gap-[10px]"
                style={{
                  color: fgMuted,
                  background: highlightBg,
                  border: `1px solid ${highlightBorder}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <span className="text-[#ff3b3f] shrink-0 mt-px">→</span>
                {h}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 rounded text-[#ff3b3f] tracking-[0.05em]"
                style={{
                  background: "rgba(255,59,63,0.08)",
                  border: "1px solid rgba(255,59,63,0.18)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-3 bg-[#ff3b3f] text-white font-display font-bold text-[13px] rounded-lg no-underline tracking-[0.04em]"
            >
              <ExternalLink size={13} />
              Live site
            </a>
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-3 font-display font-bold text-[13px] rounded-lg no-underline tracking-[0.04em]"
              style={{
                border: `1px solid ${isEven ? "rgba(255,255,255,0.2)" : "rgba(15,22,38,0.2)"}`,
                color: fg,
              }}
            >
              <Code2 size={13} />
              Source
            </a>
          </div>
        </div>

        {/* Slideshow card */}
        <div
          className="perspective-[1000px]"
          style={{
            order: isEven ? 2 : 1,
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.95)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          <div
            className="rounded-[20px] overflow-hidden h-[340px]"
            style={{
              border: `1px solid ${borderCol}`,
              boxShadow: isEven
                ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,59,63,0.1)"
                : "0 32px 80px rgba(15,22,38,0.15)",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.2s ease-out",
              transformStyle: "preserve-3d",
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
