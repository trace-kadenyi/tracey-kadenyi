import type { Post } from "@/types";

// truncate title helper func
export function truncateTitle(title: string, maxLength: number = 60) {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength).trimEnd() + "...";
}

// format date helper func
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// strip html helper func
// strip html helper func
export function stripHtml(html: string, maxLength: number = 140) {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (
    (lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() +
    "..."
  );
}

// getthumbnail helper func
export function getThumbnail(item: Post) {
  // Try the thumbnail field first
  if (item.thumbnail && item.thumbnail.startsWith("http"))
    return item.thumbnail;
  // Fall back to extracting first image from description
  const match = item.description.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}
