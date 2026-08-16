"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Quiet Loop Digital — home"
          onClick={() => setOpen(false)}
        >
          {/* two files: dark ink for light backgrounds, light ink for dark */}
          <Image
            src="/brand/logo-dark.svg"
            alt="Quiet Loop Digital"
            width={168}
            height={45}
            priority
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/brand/logo-light.svg"
            alt="Quiet Loop Digital"
            width={168}
            height={45}
            priority
            className="hidden h-8 w-auto dark:block"
          />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[15px] transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2 text-[15px] font-medium text-bg transition-opacity hover:opacity-85"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-ink sm:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-bg sm:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3 text-center font-medium text-bg"
            >
              Start a project
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
