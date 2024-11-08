"use client";

import { useEffect, useState } from "react";
import { formatUrl, getFaviconUrl } from "@/components/utils/linkFormatter";
import { LinkComponent } from "@/components/LinkComponent";
import { Loader2 } from "lucide-react";

interface AsyncLinkFormatterProps {
  text: string;
}

export function AsyncLinkFormatter({ text }: AsyncLinkFormatterProps) {
  const [formattedParts, setFormattedParts] = useState<React.ReactNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlRegex =
      /(https?:\/\/[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
    const parts = text.split(urlRegex);

    async function formatParts() {
      setIsLoading(true);
      const formattedParts = await Promise.all(
        parts.map(async (part, i) => {
          if (part && part.match(urlRegex)) {
            const href = part.startsWith("http") ? part : `http://${part}`;
            const title = await formatUrl(part);
            return (
              <LinkComponent
                key={i}
                href={href}
                title={title}
                faviconUrl={getFaviconUrl(href)}
              />
            );
          }
          return part;
        })
      );
      setFormattedParts(formattedParts);
      setIsLoading(false);
    }

    formatParts();
  }, [text]);

  if (isLoading) {
    const urlRegex =
      /(https?:\/\/[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
    const parts = text.split(urlRegex);

    return (
      <>
        {parts.map((part, i) => {
          if (part && part.match(urlRegex)) {
            return (
              <span
                key={i}
                className="bg-blue-200 rounded-md px-1.5 py-0.5 h-[1.5rem] inline-flex items-center gap-1.5"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-blue-800 text-[14px]">Loading...</span>
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }

  return <>{formattedParts}</>;
}
