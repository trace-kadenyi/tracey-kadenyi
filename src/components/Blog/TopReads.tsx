"use client";
import { topArticles } from "@/lib/data";
import SubHeading from "./SubHeading";

export default function TopReads({
  visible,
  spaced = true,
}: {
  visible: boolean;
  spaced?: boolean;
}) {
  return (
    <div className={spaced ? "mt-10" : ""}>
      {/* Eyebrow */}
      <SubHeading visible={visible}>Top reads</SubHeading>

      <ol className="flex flex-col">
        {topArticles.map((article, i) => (
          <li key={article.href}>
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="group no-underline cursor-default grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8 py-7  border-[rgba(15,22,38,0.1)] dark:border-gray-800 last:border-b hover:border-t-[rgba(255,59,63,0.4)] transition-colors duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.8s ease ${0.1 + i * 0.12}s, transform 0.8s ease ${0.1 + i * 0.12}s`,
              }}
            >
              {/* Number */}
              <span
                className="font-display font-black leading-none select-none text-[rgba(15,22,38,0.12)] dark:text-[rgba(255,255,255,0.12)] group-hover:text-[#ff3b3f] transition-colors duration-300"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <div className="min-w-0">
                <span className="font-mono text-[#ff3b3f] text-[10px] tracking-[0.15em] uppercase mb-2 block">
                  {article.topic}
                </span>
                <h3
                  className="font-display font-black text-[#0f1626] dark:text-gray-300 leading-[1.2] mb-2 group-hover:text-[#ff3b3f] transition-colors duration-200"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                >
                  {article.title}
                </h3>
                <p className="font-sans text-[#4a5568] dark:text-gray-400 text-sm leading-relaxed max-w-[60ch]">
                  {article.blurb}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="font-mono text-[#ff3b3f] text-xs tracking-[0.1em] uppercase">
                    Read on Medium
                  </span>
                  <span className="text-[#ff3b3f] group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </div>
              </div>

              {/* Thumbnail (md and up). Gradient shows if the image fails */}
              <div className="hidden md:block relative w-48 h-28 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-[#0f1626] to-[#1d2a44] border border-[rgba(15,22,38,0.08)] dark:border-gray-800">
                <img
                  loading="lazy"
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
