export async function GET() {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tracekadenyi&api_key=&order_by=pubDate",
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ items: [] }, { status: 500 });
  }
}
