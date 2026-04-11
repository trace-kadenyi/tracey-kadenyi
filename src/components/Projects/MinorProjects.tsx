import { ExternalLink, Code2 } from "lucide-react";
import { minorProjects } from "@/lib/data";

export default function MinorProjects() {
  return (
    <div className="bg-white dark:bg-[#0f131a] px-[6%] py-10 border-t border-[rgba(15,22,38,0.06)] dark:border-[rgba(255,255,255,0.04)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-6 h-px bg-[#ff3b3f] shrink-0" />
          <span className="font-mono text-[#ff3b3f] text-[11px] tracking-[0.18em] uppercase">
            Also built
          </span>
        </div>

        {/* List */}
        <div className="flex flex-col">
          {minorProjects.map((project, i) => (
            <div
              key={project.id}
              className="group flex items-start flex-col gap-7 sm:flex-row sm:gap-3 justify-between py-5 border-t border-[rgba(15,22,38,0.06)] dark:border-[rgba(255,255,255,0.04)] first:border-t-0"
            >
              {/* Left — title + description */}
              <div className="flex items-start gap-6 flex-1 min-w-0">
                <span className="font-mono text-[10px] text-[#9aa5b4] dark:text-[#3d444d] tracking-[0.1em] shrink-0 mt-1">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-black text-[#0f1626] dark:text-[#e6edf3] text-base mb-1 group-hover:text-[#ff3b3f] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[#4a5568] dark:text-[#8b949e] text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded text-[#ff3b3f] tracking-[0.05em]"
                        style={{
                          background: "rgba(255,59,63,0.06)",
                          border: "1px solid rgba(255,59,63,0.15)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — links */}
              <div className="flex items-center gap-4 ml-8 shrink-0">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-[#4a5568] dark:text-[#8b949e] hover:text-[#ff3b3f] no-underline tracking-[0.08em] uppercase transition-colors duration-200"
                >
                  <ExternalLink size={11} />
                  Live
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-[#4a5568] dark:text-[#8b949e] hover:text-[#ff3b3f] no-underline tracking-[0.08em] uppercase transition-colors duration-200"
                >
                  <Code2 size={11} />
                  Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
