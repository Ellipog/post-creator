"use client";

import { useEffect, useState } from "react";
import { formatUrl, getFaviconUrl } from "@/components/utils/linkFormatter";
import { LinkComponent } from "@/components/LinkComponent";

interface AsyncLinkFormatterProps {
  text: string;
}

export function AsyncLinkFormatter({ text }: AsyncLinkFormatterProps) {
  const [formattedParts, setFormattedParts] = useState<React.ReactNode[]>([
    text,
  ]);

  useEffect(() => {
    const urlRegex =
      /(https?:\/\/[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
    const parts = text.split(urlRegex);

    async function formatParts() {
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
    }

    formatParts();
  }, [text]);

  return <>{formattedParts}</>;
}
