import React from "react";

import { featuredSkills } from "@/lib/data";

export default function SkylineChart({ visible }: { visible: boolean }) {
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
                className={`w-full rounded-t-md ${isAccent ? "bg-[#ff3b3f]" : "bg-[#0f1626] dark:bg-gray-700"}`}
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
      <div className="w-full h-px bg-[rgba(15,22,38,0.15)] dark:bg-[rgba(255,255,255,0.1)] mb-3" />

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
            <span className="font-mono text-[9px] md:text-[10px] text-[#0f1626] dark:text-[#8b949e] tracking-[0.08em]  leading-tight block">
              <>
                <span className="hidden [@media(max-width:370px)]:inline">
                  {skill.short}
                </span>
                <span className="[@media(max-width:370px)]:hidden uppercase">
                  {skill.name}
                </span>
              </>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
