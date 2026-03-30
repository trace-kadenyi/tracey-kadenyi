"use client";

import "./globals.css";
import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
      <head>
        <title>Tracey Kadenyi — Full-Stack Developer</title>
        <meta
          name="description"
          content="Full-stack web developer specialising in MERN stack, Next.js, and building things that matter."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="noise" style={{ margin: 0, padding: 0 }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* Custom cursor — hidden on touch devices via CSS */}
          {mounted && (
            <>
              {/* Dot */}
              <div
                ref={cursorDotRef}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: 12,
                  height: 12,
                  background: "#ff3b3f",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  zIndex: 99999,
                  transition: "transform 0.05s linear",
                  mixBlendMode: "difference",
                }}
              />
              {/* Glow */}
              <div
                ref={cursorGlowRef}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: 400,
                  height: 400,
                  background:
                    "radial-gradient(circle, rgba(255,59,63,0.05) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  zIndex: 9998,
                  transition: "transform 0.15s ease-out",
                }}
              />
            </>
          )}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
