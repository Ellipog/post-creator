import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PostCreator/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Try different methods to get the title in order of preference
    const title =
      $('meta[property="og:title"]').attr("content") || // Open Graph title
      $('meta[name="twitter:title"]').attr("content") || // Twitter title
      $("title").text() || // Regular HTML title
      new URL(url).hostname; // Fallback to hostname

    return NextResponse.json({ title: title.trim() });
  } catch (error) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    console.error("Error fetching title:", error);
    return NextResponse.json(
      { error: "Failed to fetch title", url },
      { status: 500 }
    );
  }
}
