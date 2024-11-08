import { LinkComponent } from "@/components/LinkComponent";

export async function formatUrl(url: string): Promise<string> {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/get-title?url=${encodeURIComponent(url)}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.title || new URL(url).hostname;
  } catch (error) {
    console.error("Error fetching title:", error);
    const urlObj = new URL(url.startsWith("http") ? url : `http://${url}`);
    return urlObj.hostname.replace(/^www\./, "");
  }
}

export function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `http://${url}`);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&size=32`;
  } catch (error) {
    console.error("Error getting favicon URL:", error);
    return "";
  }
}
