import {
  formatDate,
  getThumbnail,
  stripHtml,
  truncateTitle,
} from "@/utils/text";
import { BlogPostCardProps } from "@/types";

export default function BlogPostCard({
  post,
  index: i,
  visible,
}: BlogPostCardProps) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group no-underline cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${0.35 + i * 0.1}s, transform 0.8s ease ${0.35 + i * 0.1}s`,
      }}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden border border-[rgba(15,22,38,0.08)] group-hover:border-[rgba(255,59,63,0.3)] transition-all duration-300 h-full flex flex-col"
        style={{ boxShadow: "0 4px 24px rgba(15,22,38,0.06)" }}
      >
        {/* Thumbnail */}
        <div
          className="relative bg-[#0f1626]"
          style={{ height: "160px", flexShrink: 0 }}
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
                <span className="font-display font-black text-[rgba(255,59,63,0.2)] text-6xl">
                  T
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <span className="font-mono text-[#ff3b3f] text-[10px] tracking-[0.15em] uppercase mb-3 block">
              {formatDate(post.pubDate)}
            </span>
            <h3
              className="font-display font-black text-[#0f1626] leading-[1.2] mb-3 group-hover:text-[#ff3b3f] transition-colors duration-200"
              style={{ fontSize: "1.1rem" }}
            >
              {truncateTitle(post.title, 55)}
            </h3>
            <p className="font-sans text-[#4a5568] text-sm leading-relaxed">
              {stripHtml(post.description)}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
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
