import type { Post } from "@/types";

const FEED = "https://medium.com/feed/@tracekadenyi";
const UA = "Mozilla/5.0 (compatible; PortfolioFeedFetcher/1.0)";

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  if (!m) return "";
  return m[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1").trim();
}

async function fromMedium(): Promise<Post[]> {
  const res = await fetch(FEED, {
    cache: "no-store",
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Medium responded ${res.status}`);

  const xml = await res.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items.slice(0, 5).map((item) => {
    const content = tag(item, "content:encoded");
    return {
      title: tag(item, "title"),
      link: tag(item, "link").split("?")[0],
      pubDate: tag(item, "pubDate"),
      description: content,
      content,
      thumbnail: content.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "",
    };
  });
}

async function fromRss2Json(): Promise<Post[]> {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED)}`,
    { cache: "no-store", signal: AbortSignal.timeout(8000) },
  );
  const data = await res.json();
  if (data.status !== "ok" || !Array.isArray(data.items)) {
    throw new Error(`rss2json: ${data.message ?? "bad response"}`);
  }
  return data.items;
}

export async function GET() {
  const errors: string[] = [];

  for (const source of [fromMedium, fromRss2Json]) {
    try {
      const items = await source();
      if (items.length > 0) {
        return Response.json(
          { items, source: source.name },
          {
            headers: {
              "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
            },
          },
        );
      }
      errors.push(`${source.name}: returned no items`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[api/blog] ${source.name} failed:`, err);
      errors.push(`${source.name}: ${message}`);
    }
  }

  // Temporary debug output; remove once the feed is stable
  return Response.json({ items: [], errors }, { status: 502 });
}
