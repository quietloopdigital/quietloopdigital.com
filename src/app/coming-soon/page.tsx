import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiet Loop Digital — coming soon",
  description: "Always running. Never noisy. Something new is on the way.",
  robots: { index: false, follow: false },
};

/**
 * Holding page. Deliberately says almost nothing — no services, no address,
 * no contact. Just the mark, the loop, and a line that carries the brand.
 *
 * It commits to one dark look rather than following the viewer's theme; a
 * single striking screen reads better here, and the orange only really glows
 * against ink.
 */
export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#121211] text-[#eceae5]">
      {/* a warm pool of light behind the mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #faa220 0%, rgba(250,162,32,0.25) 45%, transparent 70%)",
        }}
      />

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* mark, with the loop running around it */}
        <div className="relative mb-14 flex h-48 w-48 items-center justify-center sm:h-60 sm:w-60">
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
            width={128}
            height={128}
            priority
            className="relative h-28 w-28 sm:h-32 sm:w-32"
          />
        </div>

        <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Quietly building.
        </h1>

        <p className="mt-7 font-display text-xl text-[#faa220] sm:text-2xl">
          Always running. Never noisy.
        </p>

        <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-[#78766f]">
          Something new is on the way.
        </p>
      </main>

      <footer className="relative border-t border-[#232320] px-6 py-6 text-center">
        <p className="text-[13px] text-[#78766f]">
          © {new Date().getFullYear()} Quiet Loop Digital
        </p>
      </footer>
    </div>
  );
}
