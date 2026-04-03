# Command Center Reference

This file preserves the exact Command Center implementation that was removed from the live LEM Holding landing page.

Use this as a copy/paste reference for later reuse or study.

## Required Context

The component below expected these existing items in the same file:

- `Division` type
- `accentStyles`
- `revealUp`
- `staggerParent`
- `motion` from `framer-motion`
- `Image` from `next/image`
- React `useState`

## Component Code

```tsx
function CommandCenter({ divisions }: { divisions: Division[] }) {
  const [activeName, setActiveName] = useState(divisions[0]?.name ?? "");
  const activeDivision = divisions.find((division) => division.name === activeName) ?? divisions[0];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      variants={staggerParent}
      className="mt-16 rounded-[2.5rem] border border-white/60 bg-stone-950 px-6 py-8 text-white shadow-[0_40px_110px_-58px_rgba(0,0,0,0.88)] sm:px-8"
    >
      <motion.div variants={revealUp} className="text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-300">Command center</p>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">One hub. Three working lines.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-stone-300">
          LEM Holding connects planning, living, and supply in one operating system. Hover each node and the system opens up.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div variants={revealUp} className="command-shell">
          <div className="command-hub">
            <div className="text-xs uppercase tracking-[0.28em] text-teal-200">Core</div>
            <div className="mt-3 text-3xl font-bold text-white">LEM Holding</div>
            <div className="mt-3 text-sm leading-relaxed text-stone-300">Powering Solutions. Enabling Possibilities.</div>
            <div className="command-pulse command-pulse-a" aria-hidden />
            <div className="command-pulse command-pulse-b" aria-hidden />
          </div>

          <svg className="pointer-events-none absolute inset-0 hidden md:block" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden>
            <path d="M500 270 C340 250 280 180 172 116" className="command-link-path" />
            <path d="M500 270 C660 236 738 150 844 126" className="command-link-path" />
            <path d="M500 270 C642 320 740 408 818 496" className="command-link-path" />
          </svg>

          <div className="command-node-grid">
            {divisions.map((division) => {
              const accent = accentStyles[division.accent];
              const isActive = division.name === activeDivision.name;

              return (
                <button
                  key={division.name}
                  type="button"
                  onMouseEnter={() => setActiveName(division.name)}
                  onFocus={() => setActiveName(division.name)}
                  className={`command-node ${isActive ? "command-node-active" : ""}`}
                  style={{ boxShadow: isActive ? `0 0 0 1px ${accent.edge}, 0 28px 72px -40px ${accent.edge}` : undefined }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="command-node-logo">
                        {division.logoPath ? (
                          <Image src={division.logoPath} alt={`${division.name} logo`} width={40} height={40} className="h-10 w-10 object-contain" />
                        ) : (
                          <span className="text-[10px] font-bold tracking-[0.18em] text-teal-100">LEM</span>
                        )}
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-teal-200/80">{division.eyebrow}</div>
                        <div className="mt-1 text-xl font-bold text-white">{division.name}</div>
                      </div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${accent.chip}`}>
                      {division.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">{division.promise}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={revealUp} className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-[0.22em] text-teal-300">Active node</div>
          <div className="mt-4 flex items-center gap-4">
            <div className="command-active-logo">
              {activeDivision.logoPath ? (
                <Image src={activeDivision.logoPath} alt={`${activeDivision.name} logo`} width={56} height={56} className="h-14 w-14 object-contain" />
              ) : (
                <span className="text-xs font-bold tracking-[0.18em] text-teal-100">LEM</span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-white">{activeDivision.name}</h3>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">{activeDivision.description}</p>
          <div className="mt-8 space-y-3">
            {[
              activeDivision.promise,
              activeDivision.status === "Live" ? "Ready for use now." : "This division is being prepared for launch.",
              "Connected back into the wider LEM service system.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm leading-relaxed text-stone-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
```

## CSS Reference

These classes were the dedicated CSS pieces that supported the Command Center visual system.

```css
.command-shell {
  position: relative;
  min-height: 38rem;
  border-radius: 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at 50% 30%, rgba(45, 212, 191, 0.08), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  overflow: hidden;
}

.command-hub {
  position: absolute;
  left: 50%;
  top: 43%;
  z-index: 2;
  width: 15rem;
  height: 15rem;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  border: 1px solid rgba(45, 212, 191, 0.25);
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.14), transparent 34%),
    linear-gradient(180deg, rgba(15, 118, 110, 0.24), rgba(2, 6, 23, 0.88));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 0 1px rgba(20, 184, 166, 0.12), 0 28px 90px -42px rgba(0, 0, 0, 0.74);
}

.command-pulse {
  position: absolute;
  inset: -7%;
  border-radius: 9999px;
  border: 1px solid rgba(45, 212, 191, 0.16);
  animation: pulse-ring 3.8s ease-out infinite;
}

.command-pulse-b {
  animation-delay: 1.5s;
}

.command-link-path {
  fill: none;
  stroke: rgba(45, 212, 191, 0.35);
  stroke-width: 2;
  stroke-dasharray: 10 10;
  animation: command-flow 12s linear infinite;
}

.command-node-grid {
  position: absolute;
  inset: 0;
}

.command-node {
  position: absolute;
  width: 15rem;
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  padding: 1rem;
  text-align: left;
  backdrop-filter: blur(12px);
  transition: transform 280ms ease, border-color 280ms ease, background-color 280ms ease, box-shadow 280ms ease;
}

.command-node-logo,
.command-active-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.command-node-logo {
  height: 3rem;
  width: 3rem;
}

.command-active-logo {
  height: 4rem;
  width: 4rem;
}

.command-node:hover,
.command-node:focus-visible,
.command-node-active {
  transform: translateY(-0.35rem) scale(1.02);
  border-color: rgba(45, 212, 191, 0.28);
  background: rgba(255, 255, 255, 0.1);
}

.command-node:nth-child(1) {
  left: 2rem;
  top: 3rem;
}

.command-node:nth-child(2) {
  right: 1.75rem;
  top: 4rem;
}

.command-node:nth-child(3) {
  right: 3.25rem;
  bottom: 3rem;
}

@keyframes command-flow {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -160;
  }
}

@media (prefers-reduced-motion: reduce) {
  .command-link-path,
  .command-pulse {
    animation: none;
  }
}

@media (max-width: 1023px) {
  .command-shell {
    min-height: 44rem;
  }

  .command-hub {
    top: 32%;
  }

  .command-node:nth-child(1) {
    left: 1rem;
    top: 2rem;
  }

  .command-node:nth-child(2) {
    right: 1rem;
    top: 2rem;
  }

  .command-node:nth-child(3) {
    left: 50%;
    right: auto;
    bottom: 2rem;
    transform: translateX(-50%);
  }
}

@media (max-width: 767px) {
  .command-shell {
    min-height: auto;
    padding: 1rem;
  }

  .command-hub,
  .command-node-grid,
  .command-link-path {
    position: relative;
    inset: auto;
    left: auto;
    top: auto;
    right: auto;
    bottom: auto;
    transform: none;
  }

  .command-hub {
    width: 100%;
    height: auto;
    min-height: 13rem;
    margin-bottom: 1rem;
  }

  .command-node-grid {
    display: grid;
    gap: 1rem;
  }

  .command-node {
    position: relative;
    width: 100%;
    left: auto;
    right: auto;
    top: auto;
    bottom: auto;
    transform: none;
  }
}
```

## Notes

- The right-hand "Active node" panel used mostly Tailwind utility classes directly in the component.
- The node glow color came from `accentStyles[division.accent].edge`.
- The pulse animation depended on the existing `pulse-ring` keyframes already present in the stylesheet.