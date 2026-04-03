"use client";
import { useEffect, useState, useRef } from "react";

import type { Post } from "@/types";
import { useVisible } from "@/hooks/useVisible";
import FeaturedPost from "./FeaturedPost";
import BlogPostCard from "./BlogPostCard";

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
        className="px-[8%] py-24 relative overflow-hidden min-h-[600px]"
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
              {featured && <FeaturedPost post={featured} visible={visible} />}

              {/* Smaller posts */}
              <div className="grid grid-cols-2 gap-6">
                {rest.map((post, i) => (
                  <BlogPostCard
                    key={post.link}
                    post={post}
                    index={i}
                    visible={visible}
                  />
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
                className="font-mono text-[#4a5568] hover:text-[#ff3b3f] text-xs tracking-[0.12em] uppercase no-underline transition-colors duration-200 cursor-default"
              >
                All articles →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
