"use client";

import { useRef, useEffect, useState } from "react";

export default function ProjectsHeader() {
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
