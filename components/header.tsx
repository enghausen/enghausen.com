"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeImage } from "@/components/theme-image";

const items = [
  { href: "/cv", label: "cv" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8">
      <Link href="/" aria-label="enghausen — home">
        <ThemeImage
          light="/logo-light.svg"
          dark="/logo-dark.svg"
          alt="enghausen"
          className="h-8 w-auto"
        />
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {items.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? "text-brand-safe"
                  : "text-muted transition-colors hover:text-ink"
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
