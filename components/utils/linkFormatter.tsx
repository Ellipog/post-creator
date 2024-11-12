export async function formatUrl(url: string): Promise<string> {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";

    // Try to fetch the title
    try {
      const response = await fetch(
        `${baseUrl}/api/get-title?url=${encodeURIComponent(url)}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return url;
      }

      const data = await response.json();
      if (data.error) {
        return url;
      }

      return data.title || url;
    } catch {
      return url;
    }
  } catch {
    return url;
  }
}

export function getFaviconUrl(url: string): string {
  try {
    // Add http:// if the URL doesn't start with a protocol
    const fullUrl = url.startsWith("http") ? url : `http://${url}`;
    const urlObj = new URL(fullUrl);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&size=32`;
  } catch (error) {
    console.error("Error getting favicon URL:", error);
    return "";
  }
}
