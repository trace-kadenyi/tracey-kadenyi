"use client";
import { useEffect, useState, useRef } from "react";

import type { Post } from "@/types";
import { useVisible } from "@/hooks/useVisible";
import FeaturedPost from "./FeaturedPost";
import TopReads from "./TopReads";
import { getCachedPosts, setCachedPosts } from "@/lib/blogCache";
import SubHeading from "./SubHeading";

export default function Blog() {
  const [latest, setLatest] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible = useVisible(sectionRef);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setReady(true), 120);
      return () => clearTimeout(t);
    }
  }, [loading]);

  useEffect(() => {
    const cached = getCachedPosts();
    if (cached && cached.length > 0) {
      setLatest(cached[0]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 11000);

    fetch("/api/blog", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const first: Post | undefined = Array.isArray(data.items)
          ? data.items[0]
          : undefined;
        if (first?.link) {
          setCachedPosts([first]);
          setLatest(first);
        }
      })
      .catch(() => {
        // Silent on purpose: "Top reads" covers the empty state.
      })
      .finally(() => {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <section id="blog" ref={sectionRef}>
      <div className="px-[8%] py-20 relative overflow-hidden min-h-[420px] bg-[#f9f9f7] dark:bg-gradient-to-b dark:from-[#0f1626] dark:via-[#0f1626] dark:to-[#0f131a]">
        {/* Background word */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black whitespace-nowrap select-none pointer-events-none tracking-[-0.04em] text-[rgba(15,22,38,0.025)] dark:text-[rgba(255,255,255,0.02)]/70"
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
            className="font-display font-black text-[#0f1626] dark:text-gray-300 leading-none tracking-[-0.03em] mb-12"
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

          {ready && (
            <>
              {/* Latest post (only when the feed worked) */}
              {latest && (
                <div>
                  <SubHeading visible={visible}>Latest</SubHeading>
                  <FeaturedPost post={latest} visible={visible} />
                </div>
              )}

              {/* Always shown, independent of the feed */}
              <TopReads visible={visible} spaced={!!latest} />

              {/* View all link */}
              <div
                className="mt-10 flex items-center gap-3"
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
                  className="font-mono text-[#4a5568] dark:text-gray-400 hover:text-[#ff3b3f] text-xs tracking-[0.12em] uppercase no-underline transition-colors duration-200 cursor-default"
                >
                  All articles →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
