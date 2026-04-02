import {
  getThumbnail,
  formatDate,
  truncateTitle,
  stripHtml,
} from "@/utils/text";
import type { FeaturedPostProps } from "@/types";

export default function FeaturedPost({ post, visible }: FeaturedPostProps) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group no-underline cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
      }}
    >
      <div
        className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[rgba(15,22,38,0.08)] group-hover:border-[rgba(255,59,63,0.3)] transition-all duration-300"
        style={{ boxShadow: "0 4px 24px rgba(15,22,38,0.06)" }}
      >
        {/* Image */}
        <div
          className="relative bg-[#0f1626]"
          style={{ height: "280px", flexShrink: 0 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {getThumbnail(post) ? (
              <img
                src={getThumbnail(post)!}
                alt={post.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ willChange: "transform" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display font-black text-[rgba(255,59,63,0.2)] text-8xl">
                  T
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-10 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[#ff3b3f] text-[10px] tracking-[0.15em] uppercase mb-4 block">
              Featured · {formatDate(post.pubDate)}
            </span>
            <h3
              className="font-display font-black text-[#0f1626] leading-[1.15] mb-4 group-hover:text-[#ff3b3f] transition-colors duration-200"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
            >
              {truncateTitle(post.title, 85)}
            </h3>
            <p className="font-sans text-[#4a5568] text-sm leading-relaxed">
              {stripHtml(post.description)}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <span className="font-mono text-[#ff3b3f] text-xs tracking-[0.1em] uppercase">
              Read on Medium
            </span>
            <span className="text-[#ff3b3f] group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
