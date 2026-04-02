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
