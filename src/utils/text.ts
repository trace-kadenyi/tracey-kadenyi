import type { Post } from "@/types";

// truncate title helper func
export function truncateTitle(title: string, maxLength: number = 60) {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength).trimEnd() + "...";
}

// format date helper func
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// strip html helper func
export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").slice(0, 140) + "...";
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
