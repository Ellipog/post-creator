"use client";

import { Link } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
interface LinkComponentProps {
  href: string;
  title: string;
  faviconUrl: string;
}

export function LinkComponent({ href, title, faviconUrl }: LinkComponentProps) {
  const [showFallbackIcon, setShowFallbackIcon] = useState(false);

  return (
    <div className="relative group inline-block max-w-[24rem]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-200 hover:bg-blue-300 transition-all duration-200 rounded-md px-1.5 py-0.5 h-[1.5rem] inline-flex items-center gap-1.5 whitespace-nowrap max-w-full"
      >
        {!showFallbackIcon ? (
          <Image
            src={faviconUrl}
            alt=""
            className="w-3.5 h-3.5 flex-shrink-0"
            onError={() => setShowFallbackIcon(true)}
            height={0}
            width={0}
          />
        ) : (
          <Link className="w-3.5 h-3.5 flex-shrink-0" />
        )}
        <span className="overflow-hidden text-[1rem] text-ellipsis">
          {title}
        </span>
      </a>
    </div>
  );
}
