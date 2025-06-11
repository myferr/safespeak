"use client";

import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
// Import more languages as needed

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "tsx", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically load Prism theme stylesheet
    const cssId = "prism-theme-style";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/prism.css"; // Ensure this file exists in /public
      link.id = cssId;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const lang = language === "tsx" ? "typescript" : language;
    const grammar = Prism.languages[lang] || Prism.languages.javascript;
    const highlightedCode = Prism.highlight(code, grammar, lang);
    setHighlighted(highlightedCode);
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative rounded-lg w-lg border bg-muted/50">
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-sm font-medium">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-6 w-6 p-0"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}
      {highlighted && (
        <pre className="overflow-x-auto p-4">
          <code
            className={`language-${language} text-sm`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      )}
    </div>
  );
}
