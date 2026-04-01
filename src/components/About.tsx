"use client";

import { useRef, useEffect, useState } from "react";
import { featuredSkills, skillGroups } from "@/lib/data";

function SkylineChart({ visible }: { visible: boolean }) {
  const maxHeight = 180;

  return (
    <div className="w-full">
      {/* Columns */}
      <div
        className="flex items-end gap-3 md:gap-5"
        style={{ height: `${maxHeight}px` }}
      >
        {featuredSkills.map((skill, i) => {
          const height = (skill.level / 100) * maxHeight;
          const isAccent = i === 1 || i === 4;
          return (
            <div
              key={skill.name}
              className="flex-1 flex flex-col items-center justify-end"
            >
              <div
                className={`w-full rounded-t-md ${isAccent ? "bg-[#ff3b3f]" : "bg-[#0f1626]"}`}
                style={{
                  height: visible ? `${height}px` : "0px",
                  transition: `height 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Baseline */}
      <div className="w-full h-px bg-[rgba(15,22,38,0.15)] mb-3" />

      {/* Labels */}
      <div className="flex gap-3 md:gap-5">
        {featuredSkills.map((skill, i) => (
          <div
            key={skill.name}
            className="flex-1 text-center"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ease ${0.4 + i * 0.08}s`,
            }}
          >
            <span className="font-mono text-[9px] md:text-[10px] text-[#0f1626] tracking-[0.08em] uppercase leading-tight block">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  useEffect(() => {
    const topObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTopVisible(true);
      },
      { threshold: 0.2 },
    );
    const bottomObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBottomVisible(true);
      },
      { threshold: 0.15 },
    );
    if (topRef.current) topObs.observe(topRef.current);
    if (bottomRef.current) bottomObs.observe(bottomRef.current);
    return () => {
      topObs.disconnect();
      bottomObs.disconnect();
    };
  }, []);

  const stats = [
    { value: "4+", label: "Years of experience" },
    { value: "10+", label: "Collaborators across 5 countries" },
    { value: "3", label: "Products in production" },
  ];

  return (
    <section id="about">
      {/* ── Top half — white ── */}
      <div
        ref={topRef}
        className="px-[8%] pt-20 pb-20 relative overflow-hidden"
        style={{ background: "#f9f9f7" }}
      >
        {/* Background word */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black whitespace-nowrap select-none pointer-events-none tracking-[-0.04em] text-[rgba(15,22,38,0.025)]"
          style={{ fontSize: "clamp(8rem, 18vw, 16rem)" }}
        >
          SKILLS
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{
              opacity: topVisible ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <span className="block w-6 h-px bg-[#ff3b3f] shrink-0" />
            <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.18em] uppercase">
              About me
            </span>
          </div>

          {/* Statement + Chart side by side */}
          <div className="grid grid-cols-2 gap-[80px] items-center">
            {/* Left — statement */}
            <div
              style={{
                opacity: topVisible ? 1 : 0,
                transform: topVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.97)",
                transition:
                  "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <h2
                className="font-display font-black text-[#0f1626] leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                I build scalable systems that turn complex ideas into reliable
                products.
              </h2>
              <p
                className="font-sans text-[#4a5568] text-base leading-relaxed"
                style={{
                  opacity: topVisible ? 1 : 0,
                  transition: "opacity 0.8s ease 0.4s",
                }}
              >
                Full-stack JavaScript/TypeScript engineer with 4+ years building
                SaaS platforms in remote, cross-functional teams. Specialising
                in multi-tenant architecture, RBAC, and RESTful API design.
              </p>
            </div>

            {/* Right — skyline chart */}
            <div
              style={{
                opacity: topVisible ? 1 : 0,
                transform: topVisible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              <SkylineChart visible={topVisible} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom half — navy ── */}
      <div
        ref={bottomRef}
        className="bg-[#0f1626] px-[8%] pt-20 pb-24 relative overflow-hidden"
      >
        {/* Background word */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black whitespace-nowrap select-none pointer-events-none tracking-[-0.04em] text-[rgba(255,255,255,0.02)]"
          style={{ fontSize: "clamp(8rem, 18vw, 16rem)" }}
        >
          STACK
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Stat cards */}
          <div
            className="grid grid-cols-3 gap-6 mb-16"
            style={{
              opacity: bottomVisible ? 1 : 0,
              transform: bottomVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="border border-[rgba(255,59,63,0.15)] rounded-xl p-6 hover:border-[rgba(255,59,63,0.35)] transition-colors duration-300"
                style={{
                  opacity: bottomVisible ? 1 : 0,
                  transform: bottomVisible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `opacity 0.7s ease ${0.15 + i * 0.1}s, transform 0.7s ease ${0.15 + i * 0.1}s, border-color 0.3s ease`,
                }}
              >
                <div
                  className="font-display font-black text-[#ff3b3f] leading-none mb-2"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
                >
                  {stat.value}
                </div>
                <div className="font-sans text-[rgba(255,255,255,0.45)] text-sm leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Skill tags by group */}
          <div className="space-y-6">
            {skillGroups.map((group, gi) => (
              <div
                key={group.label}
                className="flex flex-wrap items-start gap-3"
                style={{
                  opacity: bottomVisible ? 1 : 0,
                  transform: bottomVisible
                    ? "translateX(0)"
                    : "translateX(-20px)",
                  transition: `opacity 0.6s ease ${0.4 + gi * 0.08}s, transform 0.6s ease ${0.4 + gi * 0.08}s`,
                }}
              >
                <span className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] tracking-[0.15em] uppercase w-24 shrink-0 pt-1">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-3 py-1.5 rounded border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] tracking-[0.06em] hover:border-[rgba(255,59,63,0.3)] hover:text-white transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-6 mt-14"
            style={{
              opacity: bottomVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <a
              href="mailto:treykadenyi@gmail.com"
              className="px-7 py-3 bg-[#ff3b3f] hover:bg-[#e02e32] text-white font-display font-bold text-sm tracking-[0.04em] rounded-lg no-underline transition-colors duration-200"
            >
              Get in touch
            </a>
            <a
              href="https://www.linkedin.com/in/tracey-kadenyi/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[rgba(255,255,255,0.35)] hover:text-[#ff3b3f] text-xs tracking-[0.1em] uppercase no-underline transition-colors duration-200"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
