import Link from "next/link";
import { Rss } from "lucide-react";
import { ThemeImage } from "@/components/theme-image";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-3xl px-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-muted/25 pt-8">
        <Link href="/" aria-label="enghausen — home">
          <ThemeImage
            light="/logo-light.svg"
            dark="/logo-dark.svg"
            alt="enghausen"
            className="h-6 w-auto"
          />
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          <a
            href="https://github.com/enghausen/enghausen.com"
            className="transition-colors hover:text-ink"
          >
            source
          </a>
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-1 transition-colors hover:text-ink"
            aria-label="RSS feed"
          >
            <Rss className="h-4 w-4" aria-hidden />
            rss
          </a>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted">
        © {new Date().getFullYear()} Morten Rode Enghausen. Code is MIT;
        content and brand assets are all rights reserved.
      </p>
    </footer>
  );
}
