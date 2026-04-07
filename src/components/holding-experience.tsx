"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type Division = {
  name: string;
  status: string;
  description: string;
  href: string;
  cta: string;
  logoFile: string;
  logoPath: string | null;
  eyebrow: string;
  accent: "teal" | "amber" | "stone";
  promise: string;
};

type HoldingExperienceProps = {
  divisions: Division[];
  holdingLogoPath: string | null;
};

type MagneticLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

type MagneticAnchorProps = MagneticLinkProps & {
  target?: string;
  rel?: string;
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const accentStyles: Record<Division["accent"], { glow: string; chip: string; ring: string; edge: string }> = {
  teal: {
    glow: "from-teal-500/25 via-cyan-300/10 to-transparent",
    chip: "bg-teal-100 text-teal-700 border-teal-200",
    ring: "shadow-[0_0_0_1px_rgba(13,148,136,0.18),0_20px_45px_-30px_rgba(15,118,110,0.55)]",
    edge: "rgba(20,184,166,0.55)",
  },
  amber: {
    glow: "from-amber-400/25 via-orange-300/10 to-transparent",
    chip: "bg-amber-100 text-amber-700 border-amber-200",
    ring: "shadow-[0_0_0_1px_rgba(245,158,11,0.18),0_20px_45px_-30px_rgba(245,158,11,0.55)]",
    edge: "rgba(245,158,11,0.52)",
  },
  stone: {
    glow: "from-stone-400/30 via-white/10 to-transparent",
    chip: "bg-stone-200 text-stone-700 border-stone-300",
    ring: "shadow-[0_0_0_1px_rgba(120,113,108,0.18),0_20px_45px_-30px_rgba(87,83,78,0.45)]",
    edge: "rgba(168,162,158,0.58)",
  },
};

function MagneticLink({ href, label, variant = "primary", fullWidth = false }: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 190, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 190, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetLeft = event.clientX - bounds.left;
    const offsetTop = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--glow-x", `${offsetLeft}px`);
    event.currentTarget.style.setProperty("--glow-y", `${offsetTop}px`);

    offsetX.set((offsetLeft / bounds.width - 0.5) * 14);
    offsetY.set((offsetTop / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      className={fullWidth ? "flex w-full" : "inline-flex"}
    >
      <Link href={href} className={`magnetic-button ${variant === "secondary" ? "magnetic-button-secondary" : ""}`}>
        <span className="relative z-10">{label}</span>
      </Link>
    </motion.div>
  );
}

function MagneticAnchor({ href, label, variant = "primary", target, rel }: MagneticAnchorProps) {
  const prefersReducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 190, damping: 18, mass: 0.4 });
  const springY = useSpring(offsetY, { stiffness: 190, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetLeft = event.clientX - bounds.left;
    const offsetTop = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--glow-x", `${offsetLeft}px`);
    event.currentTarget.style.setProperty("--glow-y", `${offsetTop}px`);

    offsetX.set((offsetLeft / bounds.width - 0.5) * 14);
    offsetY.set((offsetTop / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <a href={href} target={target} rel={rel} className={`magnetic-button ${variant === "secondary" ? "magnetic-button-secondary" : ""}`}>
        <span className="relative z-10">{label}</span>
      </a>
    </motion.div>
  );
}

function ContactIcon({ kind }: { kind: "whatsapp" | "phone" | "mail" }) {
  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M20.52 3.48A11.84 11.84 0 0 0 12.07 0C5.55 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.91L0 24l6.47-1.7a11.8 11.8 0 0 0 5.6 1.43h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.16-1.23-6.12-3.39-8.43Zm-8.45 18.26h-.01a9.8 9.8 0 0 1-4.98-1.36l-.36-.21-3.84 1 1.03-3.74-.24-.38a9.82 9.82 0 0 1-1.5-5.23C2.17 6.41 6.58 2 12 2c2.62 0 5.08 1.01 6.93 2.86a9.72 9.72 0 0 1 2.88 6.94c0 5.42-4.41 9.84-9.74 9.84Zm5.4-7.38c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.94 1.15-.17.2-.35.22-.64.08-.29-.15-1.24-.45-2.35-1.43-.87-.77-1.45-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.59-.91-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.08-.79.37-.27.29-1.04 1.01-1.04 2.47 0 1.45 1.06 2.86 1.2 3.05.15.2 2.08 3.18 5.05 4.46.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.56-.34Z" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.58.11.35.03.74-.25 1.01l-2.2 2.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-7.47 4.67a1 1 0 0 1-1.06 0L4 8.24V6l8 5 8-5v2.24Z" />
    </svg>
  );
}

function ContactChip({ href, icon, value }: { href?: string; icon: ReactNode; value: string }) {
  const content = (
    <>
      <span className="text-teal-200">{icon}</span>
      <span>{value}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-2 text-sm font-semibold text-stone-100 transition hover:border-teal-300/40 hover:bg-white/10"
      >
        {content}
      </a>
    );
  }

  return <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-2 text-sm font-semibold text-stone-100">{content}</div>;
}

function DivisionCard({ division, index }: { division: Division; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useSpring(rotateY, { stiffness: 170, damping: 18, mass: 0.5 });
  const y = useSpring(rotateX, { stiffness: 170, damping: 18, mass: 0.5 });

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const percentX = pointerX / bounds.width - 0.5;
    const percentY = pointerY / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", `${pointerX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${pointerY}px`);

    rotateX.set(percentY * -10);
    rotateY.set(percentX * 12);
  };

  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const accent = accentStyles[division.accent];
  const isLive = division.status === "Live";
  const launchChipClass = isLive ? "bg-emerald-100 text-emerald-700" : accentStyles.amber.chip;

  return (
    <motion.article
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.06 }}
      style={prefersReducedMotion ? undefined : { rotateX: y, rotateY: x }}
      whileHover={prefersReducedMotion ? undefined : { y: -12, scale: 1.018 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetRotation}
      className={`division-card group relative overflow-hidden rounded-4xl border border-white/60 bg-white/85 p-6 backdrop-blur-sm ${accent.ring}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} opacity-70`} />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-b-full bg-white/35 blur-2xl" />
      <div className="division-card-reflection" aria-hidden />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/80 shadow-sm">
            {division.logoPath ? (
              <Image
                src={division.logoPath}
                alt={`${division.name} logo`}
                fill
                sizes="64px"
                className="object-contain p-2.5"
              />
            ) : (
              <span className="text-xs font-bold tracking-[0.16em] text-teal-800">LEM</span>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${accent.chip}`}>
              {division.eyebrow}
            </span>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${launchChipClass}`}>
              {division.status}
            </span>
          </div>
        </div>

        <h3 className="min-h-22 max-w-[14ch] text-3xl font-bold leading-tight text-stone-900">{division.name}</h3>
        <p className="mt-3 min-h-18 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{division.promise}</p>
        <p className="mt-5 min-h-28 text-base leading-relaxed text-stone-700">{division.description}</p>

        <div className="mt-auto pt-6">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.edge}, transparent)` }} />

          <div className="mt-6 flex min-h-7 items-center gap-3 text-xs uppercase tracking-[0.2em] text-stone-400">
            <span className="signal-dot" />
            <span>LEM network active</span>
          </div>

          {isLive ? (
            <div className="mt-6 w-full">
              <MagneticLink href={division.href} label={division.cta} fullWidth />
            </div>
          ) : (
            <span className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 transition duration-300 group-hover:border-amber-400 group-hover:bg-amber-100">
              {division.cta}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function HoldingExperience({ divisions, holdingLogoPath }: HoldingExperienceProps) {
  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb-teal -left-24 top-24" />
        <div className="ambient-orb ambient-orb-amber -right-32 top-120" />
        <div className="mesh-cloud mesh-cloud-teal left-[12%] top-28" />
        <div className="mesh-cloud mesh-cloud-amber right-[8%] top-168" />
        <div className="mesh-cloud mesh-cloud-stone bottom-32 left-[28%]" />
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section id="divisions" className="mt-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerParent}
            className="rounded-[2.25rem] border border-white/60 bg-white/55 px-5 py-8 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:px-8 sm:py-10"
          >
            <motion.div variants={revealUp} className="text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Division access</p>
              <h1 className="mt-4 text-4xl font-bold text-stone-900 sm:text-5xl">Three strong divisions. One clear system.</h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
                LEM Holding is your gateway into the group. Choose the division you need and move directly into the right service line.
              </p>
            </motion.div>

            <motion.div variants={staggerParent} className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {divisions.map((division, index) => (
                <DivisionCard key={division.name} division={division} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.28 }}
          variants={staggerParent}
          className="final-frame mt-14 overflow-hidden rounded-[2.5rem] border border-white/60 px-6 py-10 text-white shadow-[0_40px_110px_-55px_rgba(0,0,0,0.8)] sm:px-10"
        >
          <div className="closing-aurora" aria-hidden />
          <div className="final-ghost-grid" aria-hidden>
            <span>Projects</span>
            <span>Strategy</span>
            <span>Execution</span>
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.div variants={revealUp} className="final-mark">
              <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Contact us</div>
              <div className="final-mark-shell mt-5">
                {holdingLogoPath ? (
                  <Image src={holdingLogoPath} alt="LEM Holding logo" width={360} height={220} className="mx-auto h-auto w-full max-w-[16rem] object-contain" />
                ) : (
                  <div className="holding-logo-fallback">LEM Holding</div>
                )}
              </div>
              <div className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
                Powering Solutions. Enabling Possibilities.
              </div>
            </motion.div>

            <div>
              <motion.h2 variants={revealUp} className="relative z-10 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                From strategy to supply, from planning to living - LEM Holding is your trusted partner in progress.
              </motion.h2>
              <motion.p variants={revealUp} className="relative z-10 mt-6 max-w-3xl text-lg leading-relaxed text-stone-200">
                One group built to support business performance, daily operations, and reliable living with one clear standard of service.
              </motion.p>
              <motion.div variants={revealUp} className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
                <MagneticAnchor href="mailto:info@lemprojects.co.za" label="Start a conversation" variant="secondary" />
                <ContactChip href="https://wa.me/27764807410" icon={<ContactIcon kind="whatsapp" />} value="0764807410" />
                <ContactChip href="tel:0823740090" icon={<ContactIcon kind="phone" />} value="0823740090" />
                <ContactChip icon={<ContactIcon kind="mail" />} value="info@lemprojects.co.za" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
