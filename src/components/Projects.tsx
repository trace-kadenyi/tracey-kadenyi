"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { projects } from "@/lib/data";
import { ExternalLink, Code2 } from "lucide-react";

function ImageSlideshow({
  images,
  visible,
}: {
  images: string[];
  visible: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!visible || paused || images.length <= 1) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [visible, paused, next, images.length]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <img
            src={src}
            alt={`screenshot ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        </div>
      ))}

      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(15,22,38,0.5) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          zIndex: 2,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "#ff3b3f" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {paused && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          paused
        </div>
      )}
    </div>
  );
}

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

// Cinematic section header
function ProjectsHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        padding: "120px 6% 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background word */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(8rem, 18vw, 18rem)",
          color: "rgba(15,22,38,0.03)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        WORK
      </div>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "20px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span
            style={{
              display: "block",
              width: "32px",
              height: "1px",
              background: "#ff3b3f",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "#ff3b3f",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Selected work
          </span>
          <span
            style={{
              display: "block",
              width: "32px",
              height: "1px",
              background: "#ff3b3f",
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            color: "#0f1626",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(30px) scale(0.95)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Projects
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "#4a5568",
            fontSize: "1rem",
            marginTop: "16px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          Two real products. Shipped.
        </p>
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
