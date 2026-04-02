"use client";

import { useEffect, useState, useRef } from "react";

interface Post {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  content: string;
}

function useVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").slice(0, 140) + "...";
}

function getThumbnail(item: Post) {
  // Try the thumbnail field first
  if (item.thumbnail && item.thumbnail.startsWith("http"))
    return item.thumbnail;
  // Fall back to extracting first image from description
  const match = item.description.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible = useVisible(sectionRef);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) setPosts(data.items.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [featured, ...rest] = posts;

  return (
    <section id="blog" ref={sectionRef}>
      <div
        className="px-[8%] pt-24 pb-24 relative overflow-hidden"
        style={{ background: "#f9f9f7" }}
      >
        {/* Background word */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black whitespace-nowrap select-none pointer-events-none tracking-[-0.04em] text-[rgba(15,22,38,0.025)]"
          style={{ fontSize: "clamp(8rem, 18vw, 16rem)" }}
        >
          BLOG
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <span className="block w-6 h-px bg-[#ff3b3f] shrink-0" />
            <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.18em] uppercase">
              Writing
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-display font-black text-[#0f1626] leading-none tracking-[-0.03em] mb-16"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.97)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            From the blog
          </h2>

          {loading && (
            <div className="flex items-center gap-3 text-[#9aa5b4]">
              <div
                className="w-4 h-4 rounded-full border-2 border-[rgba(15,22,38,0.1)] border-t-[#ff3b3f]"
                style={{ animation: "spin 0.8s linear infinite" }}
              />
              <span className="font-mono text-xs tracking-widest uppercase">
                Loading posts
              </span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              {/* Featured post */}
              {featured && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group no-underline"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    transition:
                      "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                  }}
                >
                  <div
                    className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[rgba(15,22,38,0.08)] group-hover:border-[rgba(255,59,63,0.3)] transition-all duration-300"
                    style={{ boxShadow: "0 4px 24px rgba(15,22,38,0.06)" }}
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden bg-[#0f1626]"
                      style={{ height: "280px" }}
                    >
                      {getThumbnail(featured) ? (
                        <img
                          src={getThumbnail(featured)!}
                          alt={featured.title}
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-display font-black text-[rgba(255,59,63,0.2)] text-8xl">
                            T
                          </span>
                        </div>
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, rgba(249,249,247,0.1))",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="bg-white p-10 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[#ff3b3f] text-[10px] tracking-[0.15em] uppercase mb-4 block">
                          Featured · {formatDate(featured.pubDate)}
                        </span>
                        <h3
                          className="font-display font-black text-[#0f1626] leading-[1.15] mb-4 group-hover:text-[#ff3b3f] transition-colors duration-200"
                          style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
                        >
                          {featured.title}
                        </h3>
                        <p className="font-sans text-[#4a5568] text-sm leading-relaxed">
                          {stripHtml(featured.description)}
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
              )}

              {/* Smaller posts */}
              <div className="grid grid-cols-2 gap-6">
                {rest.map((post, i) => (
                  <a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group no-underline"
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
                        className="relative overflow-hidden bg-[#0f1626]"
                        style={{ height: "160px" }}
                      >
                        {getThumbnail(post) ? (
                          <img
                            src={getThumbnail(post)!}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-display font-black text-[rgba(255,59,63,0.2)] text-6xl">
                              T
                            </span>
                          </div>
                        )}
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
                            {post.title}
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
                ))}
              </div>
            </div>
          )}

          {/* View all link */}
          {!loading && (
            <div
              className="mt-12 flex items-center gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.8s ease 0.6s",
              }}
            >
              <span className="block w-6 h-px bg-[rgba(15,22,38,0.15)]" />
              <a
                href="https://medium.com/@tracekadenyi"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[#4a5568] hover:text-[#ff3b3f] text-xs tracking-[0.12em] uppercase no-underline transition-colors duration-200"
              >
                All articles on Medium →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
