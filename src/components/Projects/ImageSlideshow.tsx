"use client";

import { useState, useCallback, useEffect } from "react";

interface Props {
  images: string[];
  visible: boolean;
}

export default function ImageSlideshow({ images, visible }: Props) {
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
      className="relative w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <img
            src={src}
            alt={`screenshot ${i + 1}`}
            className="w-full h-full object-cover object-top block"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(15,22,38,0.5) 0%, transparent 50%)",
        }}
      />

      {/* Dots */}
      <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-[6px] rounded-[3px] border-none cursor-pointer p-0"
            style={{
              width: i === current ? "20px" : "6px",
              background: i === current ? "#ff3b3f" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Paused indicator */}
      {paused && (
        <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.1em] uppercase text-white/40">
          paused
        </div>
      )}
    </div>
  );
}
