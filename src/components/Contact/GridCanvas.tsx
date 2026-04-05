"use client";

import { useEffect, useRef } from "react";

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.42;
      const vx = w / 2; // vanishing point x
      const vy = horizon; // vanishing point y

      // How many vertical lines
      const numV = 16;
      // How many horizontal lines
      const numH = 18;

      // Grid line color
      const lineColor = (alpha: number) => `rgba(255, 59, 63, ${alpha})`;
      const lineColorWhite = (alpha: number) => `rgba(255, 255, 255, ${alpha})`;

      // ── Vertical lines radiating from vanishing point ──
      for (let i = 0; i <= numV; i++) {
        const spread = w * 1.6;
        const x = (i / numV) * spread - spread / 2 + vx;

        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(x, h);

        // Center lines slightly brighter
        const distFromCenter = Math.abs(i - numV / 2) / (numV / 2);
        const alpha = 0.12 - distFromCenter * 0.08;
        ctx.strokeStyle =
          i === numV / 2
            ? lineColor(0.25)
            : lineColorWhite(Math.max(alpha, 0.02));
        ctx.lineWidth = i === numV / 2 ? 1 : 0.5;
        ctx.stroke();
      }

      // ── Horizontal lines with perspective spacing ──
      for (let i = 0; i < numH; i++) {
        // Perspective: lines get closer together near horizon
        const t = Math.pow((i + (offset % 1)) / numH, 1.8);
        const y = horizon + t * (h - horizon);

        if (y < horizon) continue;

        const alpha = t * 0.18;

        // Width of horizontal line at this depth
        const spread = w * 1.6;
        const leftX = vx - (spread / 2) * t;
        const rightX = vx + (spread / 2) * t;

        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.strokeStyle = lineColorWhite(Math.min(alpha, 0.15));
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Horizon glow ──
      const grad = ctx.createRadialGradient(vx, vy, 0, vx, vy, w * 0.6);
      grad.addColorStop(0, "rgba(255, 59, 63, 0.08)");
      grad.addColorStop(0.5, "rgba(255, 59, 63, 0.03)");
      grad.addColorStop(1, "rgba(255, 59, 63, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // ── Top fade ──
      const topFade = ctx.createLinearGradient(0, 0, 0, horizon);
      topFade.addColorStop(0, "rgba(15, 22, 38, 1)");
      topFade.addColorStop(1, "rgba(15, 22, 38, 0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, w, horizon);

      // ── Bottom fade ──
      const bottomFade = ctx.createLinearGradient(0, h - 80, 0, h);
      bottomFade.addColorStop(0, "rgba(15, 22, 38, 0)");
      bottomFade.addColorStop(1, "rgba(15, 22, 38, 1)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, h - 80, w, 80);

      // Animate — move horizontal lines toward viewer
      offset += 0.08;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
