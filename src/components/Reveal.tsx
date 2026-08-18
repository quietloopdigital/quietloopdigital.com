"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms to wait after the element enters view — used to stagger a row of cards */
  delay?: number;
  className?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  // Unknowable on the server; the client re-reads the real value on its
  // first render anyway, so this only affects what the very first paint
  // looks like before hydration settles.
  return false;
}

/**
 * Fades and lifts its children the first time they scroll into view.
 * Uses IntersectionObserver rather than an animation library — the whole
 * thing is ~1KB and there is nothing to keep updated.
 *
 * Reduced-motion is read via useSyncExternalStore rather than checked
 * inside the effect: that keeps `shown` itself untouched for that case
 * (combined with reducedMotion at render time instead), so the only
 * setState call left is the one inside the observer's own callback —
 * exactly the "subscribe, then setState when the external thing changes"
 * shape React's rules want, not a synchronous set on mount.
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const visible = shown || reducedMotion;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
