"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { meta } from "@/lib/data";
import { startScrolling } from "@/hooks/useScrolling";


const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


const handleNav = (id: string) => {
  setMobileOpen(false);

  const target = document.getElementById(id);
  if (!target) return;

  // Flag that we're doing programmatic scrolling
  startScrolling();

  const navHeight = 64;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
};

  const textColor = isDark ? "#e6edf3" : "#0f1626";
  const logoColor = isDark ? "#e6edf3" : "#0f1626";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled
            ? isDark
              ? "rgba(13, 17, 23, 0.95)"
              : "rgba(255, 255, 255, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(255,255,255,0.02)"
              : "1px solid rgba(15,22,38,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <span
            className="font-display font-bold text-lg tracking-widest uppercase transition-colors duration-300"
            style={{ color: logoColor }}
          >
            {meta.shortName}
          </span>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.id)}
                className="text-sm tracking-wide transition-colors duration-200 font-sans text-[#0f1626] dark:text-[#e6edf3]  hover:text-[#ff3b3f]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 text-[#0f1626] dark:text-[#e6edf3] hover:text-[#ff3b3f] border border-[rgba(15,22,38,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:border-[#ff3b3f]/50"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-[#0f1626] dark:text-[#e6edf3] hover:text-[#ff3b3f] transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: isDark
            ? "rgba(13, 17, 23, 0.97)"
            : "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {links.map((link, i) => (
          <button
            key={link.label}
            onClick={() => handleNav(link.id)}
            style={{
              animationDelay: `${i * 60}ms`,
            }}
            className="font-display text-[#0f1626] dark:text-[#e6edf3]  font-bold hover:text-[#ff3b3f] transition-colors duration-200 tracking-wide"
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
