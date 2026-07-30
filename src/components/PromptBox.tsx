"use client";

import { useState } from "react";

export default function PromptBox({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-semibold text-white/50">
          실습 프롬프트 예시
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
        >
          {copied ? "✅ 복사됨" : "📋 프롬프트 복사하기"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap px-4 py-4 text-[13px] leading-relaxed text-white/90 font-mono">
        {prompt}
      </pre>
    </div>
  );
}
