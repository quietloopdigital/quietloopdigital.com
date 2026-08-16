"use client";

import { useState } from "react";

/**
 * The four services arranged on a ring, with a signal travelling around it.
 * The motion is deliberately slow and continuous — the brand is "quiet loop",
 * so the animation should read as something running steadily, not something
 * demanding attention.
 */

const NODES = [
  { id: "ux", label: "UI/UX Design", short: "Design what it does", pos: "top" },
  { id: "gfx", label: "Graphic Design", short: "Make it look real", pos: "right" },
  { id: "dev", label: "Web Development", short: "Build it", pos: "bottom" },
  { id: "ops", label: "DevOps", short: "Ship it, keep it up", pos: "left" },
] as const;

const PLACEMENT: Record<string, string> = {
  top: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-center",
  right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-center",
  bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 text-center",
  left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
};

const DOTS: Record<string, { cx: number; cy: number }> = {
  top: { cx: 160, cy: 40 },
  right: { cx: 280, cy: 160 },
  bottom: { cx: 160, cy: 280 },
  left: { cx: 40, cy: 160 },
};

export default function LoopDiagram() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[26rem] px-10 py-10 sm:px-14">
      <div className="relative aspect-square">
        <svg
          viewBox="0 0 320 320"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* the ring itself */}
          <circle
            cx="160"
            cy="160"
            r="120"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />

          {/* the signal going round — 8s, linear, never stops */}
          <circle
            className="ql-orbit"
            cx="160"
            cy="160"
            r="120"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70 684"
          />

          {/* a node per service */}
          {NODES.map((n) => {
            const d = DOTS[n.pos];
            const on = active === n.id;
            return (
              <g key={n.id}>
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={on ? 9 : 6}
                  fill={on ? "var(--brand)" : "var(--bg)"}
                  stroke={on ? "var(--brand)" : "var(--line-strong)"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            aria-hidden="true"
            className="ql-spin text-3xl leading-none text-brand"
          >
            ↻
          </span>
          <p className="mt-3 font-display text-lg font-semibold">One loop</p>
          <p className="mt-1 max-w-[9rem] text-[13px] leading-snug text-ink-soft">
            Design, build, ship, improve — then again.
          </p>
        </div>

        {/* labels sit outside the ring so the type stays real text */}
        {NODES.map((n) => (
          <button
            key={n.id}
            type="button"
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            className={`absolute w-32 rounded-md px-1 py-1 transition-colors ${PLACEMENT[n.pos]}`}
          >
            <span
              className={`block text-[13px] font-semibold transition-colors ${
                active === n.id ? "text-brand-deep" : "text-ink"
              }`}
            >
              {n.label}
            </span>
            <span className="mt-0.5 block text-[11px] leading-snug text-ink-faint">
              {n.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
