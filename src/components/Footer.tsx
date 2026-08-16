import Image from "next/image";
import Link from "next/link";

const EMAIL = "info@quietloopdigital.com";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL = [
  { href: "https://www.linkedin.com/in/quiet-loop-digital/", label: "LinkedIn" },
  { href: "https://www.instagram.com/quietloopdigital", label: "Instagram" },
  { href: "https://github.com/quietloopdigital", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Image
              src="/brand/logo-dark.svg"
              alt="Quiet Loop Digital"
              width={168}
              height={45}
              className="h-8 w-auto dark:hidden"
            />
            <Image
              src="/brand/logo-light.svg"
              alt="Quiet Loop Digital"
              width={168}
              height={45}
              className="hidden h-8 w-auto dark:block"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Design, development and DevOps for startups. One person, the whole
              loop.
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Pages
              </h2>
              <ul className="flex flex-col gap-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[15px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Elsewhere
              </h2>
              <ul className="flex flex-col gap-2">
                {SOCIAL.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[14px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Quiet Loop Digital · Ahmedabad, India</p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-brand-deep transition-opacity hover:opacity-80"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
