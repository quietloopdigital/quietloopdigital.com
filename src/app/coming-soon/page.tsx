import type { Metadata } from "next";
import Image from "next/image";

const LINE = "Always running. Never noisy. Something new is on the way.";

/**
 * Two rings, each with a short arc of orange running round it.
 *
 * The arcs are half a cycle apart, so they always sit on opposite sides of
 * the mark. That's done with a negative animation-delay rather than a
 * rotate() — a CSS animation replaces any transform attribute, so offsetting
 * the start of the timeline is the only thing that survives.
 *
 * strokeDasharray is "arc gap", and the two have to add up to the ring's
 * circumference or the dash repeats.
 */
const SPIN = 8; // seconds — must match the ql-orbit keyframe duration

const RINGS = [
  { r: 92, arc: 58, delay: "0s" },
  // far enough out to clear the mark — the logo fills roughly r=50
  { r: 73, arc: 46, delay: `-${SPIN / 2}s` }, // half a cycle behind → always opposite
] as const;

/**
 * The root layout carries real SEO metadata — keywords, an OG description
 * naming the services and the city. All of that has to be overridden here,
 * or it leaks in the page source and in link previews even though nothing
 * on screen says it.
 */
export const metadata: Metadata = {
  title: "Quiet Loop Digital — coming soon",
  description: LINE,
  keywords: [],
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Quiet Loop Digital",
    title: "Quiet Loop Digital",
    description: LINE,
  },
  twitter: {
    card: "summary",
    title: "Quiet Loop Digital",
    description: LINE,
  },
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
            {RINGS.map((ring) => {
              const circumference = 2 * Math.PI * ring.r;
              return (
                <g key={ring.r}>
                  <circle
                    cx="100"
                    cy="100"
                    r={ring.r}
                    fill="none"
                    stroke="#2e2d29"
                    strokeWidth="1.5"
                  />
                  <circle
                    className="ql-orbit"
                    style={{ animationDelay: ring.delay }}
                    cx="100"
                    cy="100"
                    r={ring.r}
                    fill="none"
                    stroke="#faa220"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${ring.arc} ${circumference - ring.arc}`}
                  />
                </g>
              );
            })}
          </svg>

          <Image
            src="/brand/icon-light.svg"
            alt="Quiet Loop Digital"
            width={128}
            height={128}
            priority
            className="relative h-24 w-24 sm:h-26 sm:w-26"
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
