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
      className="bg-white relative overflow-hidden px-[6%] pt-[120px] pb-[80px]"
    >
      {/* Background WORK text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black whitespace-nowrap select-none pointer-events-none tracking-[-0.04em]"
        style={{
          fontSize: "clamp(8rem, 18vw, 18rem)",
          color: "rgba(15,22,38,0.03)",
        }}
      >
        WORK
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-3 mb-5"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span className="block w-8 h-px bg-[#ff3b3f]" />
          <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.2em] uppercase">
            Selected work
          </span>
          <span className="block w-8 h-px bg-[#ff3b3f]" />
        </div>

        {/* Title */}
        <h2
          className="font-display font-black leading-none tracking-[-0.03em] text-[#0f1626]"
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
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

        {/* Subtext */}
        {/* <p
          className="font-sans text-[#4a5568] text-base mt-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          Two real products. Shipped.
        </p> */}
      </div>
    </div>
  );
}
