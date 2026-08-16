import Link from "next/link";
import Reveal from "@/components/Reveal";
import LoopDiagram from "@/components/LoopDiagram";

const EMAIL = "info@quietloopdigital.com";

const SERVICES = [
  {
    n: "01",
    title: "UI/UX Design",
    body: "Before anything gets built, we work out what it should actually do. Wireframes, user flows and screens your users won't need a tutorial for.",
  },
  {
    n: "02",
    title: "Graphic Design",
    body: "Logo, colours, typography — the visual system that makes you look like a real company instead of a side project.",
  },
  {
    n: "03",
    title: "Web Development",
    body: "Fast, modern websites and web apps. Built to load quickly, work on every screen, and be easy to change when your product changes.",
  },
  {
    n: "04",
    title: "DevOps",
    body: "Deployment, automation, monitoring. The part nobody sees — and that's the point. Your site stays up and updates ship safely.",
  },
];

const TICKER = [
  "UI/UX Design",
  "Graphic Design",
  "Web Development",
  "DevOps",
  "Brand Identity",
  "Landing Pages",
  "Web Apps",
  "CI/CD",
];

const REASONS = [
  {
    title: "Direct",
    body: "You message me. I reply. There is no account manager in between and nothing gets lost in a handoff.",
  },
  {
    title: "Fast",
    body: "No coordination overhead between four people. A design change can ship the same day you ask for it.",
  },
  {
    title: "Honest pricing",
    body: "You pay for the work — not for four salaries, an office and a sales team.",
  },
];

const PROCESS = [
  { step: "Talk", body: "What are you actually trying to solve? First call is free." },
  { step: "Design", body: "Wireframe first, visuals after. You approve before any code starts." },
  { step: "Build", body: "You see progress every few days, not all at once at the end." },
  { step: "Ship", body: "Live, fast, and monitored — so problems reach me before they reach you." },
  { step: "Improve", body: "We look at how people actually use it, and loop back." },
];

export default function Home() {
  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-brand-deep">
              Ahmedabad, India
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="max-w-4xl text-4xl leading-[1.08] font-semibold sm:text-6xl">
              Design to deploy.
              <br />
              <span className="text-ink-soft">One person. No handoffs.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              I build websites and web apps for startups — the interface, the
              code, and the infrastructure it runs on. Based in Ahmedabad,
              working with founders anywhere.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-ink px-7 py-3 font-medium text-bg transition-all hover:opacity-85 hover:-translate-y-0.5"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-line-strong px-7 py-3 font-medium text-ink transition-all hover:bg-surface hover:-translate-y-0.5"
              >
                See what I do
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ticker ---------------- */}
      <section
        className="ql-marquee-wrap overflow-hidden border-b border-line bg-surface py-4"
        aria-hidden="true"
      >
        <div className="ql-marquee flex w-max gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-sm tracking-wide text-ink-faint"
            >
              {t}
              <span className="text-brand">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- the loop ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Four things. One loop.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Most studios do one piece and hand you off to someone else for
                the rest. I do the whole cycle — which means nothing gets lost in
                translation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LoopDiagram />
          </Reveal>

          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <article className="group h-full bg-bg p-8 transition-colors hover:bg-surface sm:p-10">
                  <span className="font-mono text-xs tracking-[0.14em] text-brand-deep">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <span className="mt-3 block h-px w-8 bg-brand transition-all duration-500 group-hover:w-16" />
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- why one person ---------------- */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                No account manager. No handoff.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                When four people build one product, most of the time goes into
                keeping them in sync. When one person does it, that time goes
                into the work. You talk to whoever is writing the code — because
                that&apos;s the same person.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">How it goes</h2>
          </Reveal>

          <ol className="mt-12 flex flex-col">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 70}>
                <li className="group flex gap-6 border-t border-line py-6 transition-colors last:border-b hover:bg-surface sm:gap-10">
                  <span className="w-8 shrink-0 pt-1 font-mono text-sm text-brand-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-10">
                    <h3 className="w-32 shrink-0 text-lg font-semibold">
                      {p.step}
                    </h3>
                    <p className="leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
              Got something to build?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Tell me what you&apos;re working on. If I&apos;m not the right
              fit, I&apos;ll say so — and point you somewhere better.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="rounded-full bg-ink px-7 py-3 font-medium text-bg transition-all hover:opacity-85 hover:-translate-y-0.5"
              >
                Start a project
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                className="text-brand-deep underline-offset-4 transition-opacity hover:underline"
              >
                {EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
