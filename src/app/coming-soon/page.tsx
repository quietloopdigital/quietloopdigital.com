import type { Metadata } from "next";
import Image from "next/image";

const LINE = "Always running. Never noisy. Something new is on the way.";

const R = 92; // radius of the grey ring
const TUBE = 12; // how far the signal swings around that ring
const TRAIL_LENGTH = 48;

/**
 * The travelling signal, modelled as a helix wrapping around the grey ring
 * — treating the ring as a tube rather than a line.
 *
 * Two angles per dot: `theta` is how far along the ring it sits, `phi` is
 * where it is around the tube. phi gives both a radial offset (visible, the
 * dot moves in and out) and a depth, z (invisible, but it drives everything
 * that sells the third dimension):
 *
 *   near the viewer  →  larger, brighter, drawn over the ring
 *   behind the ring  →  smaller, dimmer, drawn under it
 *
 * That last part — the ring actually occluding the dots behind it — is what
 * stops this reading as a flat squiggle.
 */
type Dot = { cx: number; cy: number; size: number; opacity: number };

const behind: Dot[] = [];
const front: Dot[] = [];

for (let i = 0; i < TRAIL_LENGTH; i++) {
  const t = i / (TRAIL_LENGTH - 1); // 0 → 1 along the trail

  const theta = (-90 + t * 120) * (Math.PI / 180); // 120° of the ring
  const phi = t * Math.PI * 6; // three full turns around the tube

  const r = R + TUBE * Math.cos(phi);
  const z = Math.sin(phi); // −1 behind … +1 in front

  const taper = Math.sin(t * Math.PI); // 0 at both ends, 1 in the middle
  const depth = (z + 1) / 2; // 0 far … 1 near

  const dot: Dot = {
    cx: 100 + r * Math.cos(theta),
    cy: 100 + r * Math.sin(theta),
    size: (0.7 + taper * 3.1) * (0.58 + depth * 0.56),
    opacity: (0.14 + taper * 0.86) * (0.4 + depth * 0.6),
  };

  (z < 0 ? behind : front).push(dot);
}

const TRAIL_BEHIND = behind;
const TRAIL_FRONT = front;

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
            {/* the far half of the helix — drawn first, so the ring covers it */}
            <g className="ql-orbit-c">
              {TRAIL_BEHIND.map((d, i) => (
                <circle
                  key={`b${i}`}
                  cx={d.cx}
                  cy={d.cy}
                  r={d.size}
                  fill="#faa220"
                  opacity={d.opacity}
                />
              ))}
            </g>

            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="#2e2d29"
              strokeWidth="1.5"
            />

            {/* the near half — over the ring, and glowing */}
            <g
              className="ql-orbit-c"
              style={{ filter: "drop-shadow(0 0 3.5px rgba(250,162,32,0.55))" }}
            >
              {TRAIL_FRONT.map((d, i) => (
                <circle
                  key={`f${i}`}
                  cx={d.cx}
                  cy={d.cy}
                  r={d.size}
                  fill="#faa220"
                  opacity={d.opacity}
                />
              ))}
            </g>
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
