// truncate title helper func
export function truncateTitle(title: string, maxLength: number = 60) {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength).trimEnd() + "...";
}
