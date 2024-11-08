"use client";

import { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import { Check, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CodeBlockModuleProps {
  data: string;
  language: string;
  position: string;
  postLength: number;
  postIndex: number;
}

export function CodeBlockModule({
  data,
  language,
  position,
  postLength,
  postIndex,
}: CodeBlockModuleProps) {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [isClient, data]);

  const positionClass =
    position === "left"
      ? "justify-start"
      : position === "center"
      ? "justify-center"
      : position === "right"
      ? "justify-end"
      : "";

  const margin =
    postIndex === 0 ? "mb-3" : postIndex === postLength - 1 ? "mt-3" : "my-3";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full flex ${positionClass} ${margin}`} key={postIndex}>
      <div className="w-full max-w-[600px] rounded-lg overflow-hidden bg-[#1E1E1E] shadow-lg">
        <div className="relative group">
          <pre className="!m-0 !bg-transparent p-4" suppressHydrationWarning>
            <code
              ref={codeRef}
              className={`block language-${language}`}
              suppressHydrationWarning
            >
              {data}
            </code>
          </pre>
          <CopyToClipboard text={data} onCopy={handleCopy}>
            <button
              className="absolute right-2 top-2 p-2 rounded-md 
              bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-200
              opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-200"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
