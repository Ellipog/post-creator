import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Add protocol if missing
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;

    try {
      const response = await fetch(fullUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PostCreator/1.0)",
        },
      });

      if (!response.ok) {
        return NextResponse.json({ title: url });
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Try different methods to get the title in order of preference
      const title =
        $('meta[property="og:title"]').attr("content") || // Open Graph title
        $('meta[name="twitter:title"]').attr("content") || // Twitter title
        $("title").text() || // Regular HTML title
        url; // Fallback to original URL

      return NextResponse.json({ title: title.trim() });
    } catch {
      // If fetch fails, return the original URL
      return NextResponse.json({ title: url });
    }
  } catch {
    // If anything else fails, return the URL from search params
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") || "";
    return NextResponse.json({ title: url });
  }
}
