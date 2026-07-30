"use client";

import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/content";

type HeaderLink = { href: string; label: string };

type HeaderProps = {
  navLinks?: HeaderLink[];
  ctaHref?: string;
  ctaLabel?: string;
  logoHref?: string;
};

export default function Header({
  navLinks = NAV_LINKS,
  ctaHref = "#practice",
  ctaLabel = "실습 시작하기",
  logoHref = "#top",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[72px] border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <a href={logoHref} className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/daedong-logo.svg"
            alt="대동모빌리티"
            width={160}
            height={20}
            priority
            className="h-5 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden md:inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-colors"
        >
          {ctaLabel}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴 열기"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-surface hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-white"
          >
            {ctaLabel}
          </a>
        </nav>
      )}
    </header>
  );
}
