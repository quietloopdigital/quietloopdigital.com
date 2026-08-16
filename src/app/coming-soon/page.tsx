import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiet Loop Digital — coming soon",
  description:
    "A one-person studio doing design, development and DevOps for startups. Ahmedabad, India. Site launching soon.",
  robots: { index: false, follow: false },
};

const EMAIL = "info@quietloopdigital.com";

const SERVICES = [
  "UI/UX Design",
  "Graphic Design",
  "Web Development",
  "DevOps",
];

const SOCIAL = [
  { href: "https://www.linkedin.com/in/quiet-loop-digital/", label: "LinkedIn" },
  { href: "https://www.instagram.com/quietloopdigital", label: "Instagram" },
  { href: "https://github.com/quietloopdigital", label: "GitHub" },
];

/**
 * Holding page. It deliberately commits to one dark look rather than
 * following the viewer's theme — a single striking screen reads better
 * here than something that adapts, and the orange only really glows
 * against ink.
 */
export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#121211] text-[#eceae5]">
      {/* a warm pool of light behind the mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[36%] h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #faa220 0%, rgba(250,162,32,0.25) 45%, transparent 70%)",
        }}
      />

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        {/* mark, with the loop running around it */}
        <div className="relative mb-12 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="#2e2d29"
              strokeWidth="1.5"
            />
            <circle
              className="ql-orbit"
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="#faa220"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="58 520"
            />
          </svg>

          <Image
            src="/brand/icon-light.svg"
            alt="Quiet Loop Digital"
            width={110}
            height={110}
            priority
            className="relative h-24 w-24 sm:h-28 sm:w-28"
          />
        </div>

        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[#faa220]">
          Ahmedabad, India
        </p>

        <h1 className="font-display text-4xl leading-[1.06] font-semibold tracking-tight sm:text-6xl">
          Quietly building.
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#a3a19a]">
          Quiet Loop Digital is a one-person studio doing design, development
          and DevOps for startups. The website is on its way — the work already
          is.
        </p>

        {/* the four things, as a quiet row */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#78766f]">
          {SERVICES.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span>{s}</span>
              {i < SERVICES.length - 1 && (
                <span aria-hidden="true" className="text-[#faa220]">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-12 rounded-full border border-[#faa220]/45 px-7 py-3 font-medium text-[#faa220] transition-all hover:-translate-y-0.5 hover:bg-[#faa220] hover:text-[#121211]"
        >
          {EMAIL}
        </a>
      </main>

      <footer className="relative border-t border-[#232320] px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 text-[13px] text-[#78766f] sm:flex-row">
          <p>© {new Date().getFullYear()} Quiet Loop Digital</p>
          <ul className="flex gap-6">
            {SOCIAL.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#eceae5]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
