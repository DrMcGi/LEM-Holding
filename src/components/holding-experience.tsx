"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

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
            <span>Accommodation</span>
            <span>Supply</span>
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.div variants={revealUp} className="final-mark">
              <div className="text-xs uppercase tracking-[0.24em] text-teal-300">Final frame</div>
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
              <motion.div variants={revealUp} className="relative z-10 mt-8 flex flex-wrap gap-3">
                <MagneticAnchor href="mailto:info@lemprojects.co.za" label="Start a conversation" variant="secondary" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
}
