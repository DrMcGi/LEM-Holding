import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const divisions = [
  {
    name: "LEM Accommodation",
    status: "Live",
    description:
      "Reliable home-away-from-home rentals designed for comfort, convenience, and peace of mind.",
    href: "https://lem-accommodation.vercel.app",
    cta: "Visit LEM Accommodation",
    logoFile: "LEM-Accommodation_Logo.png",
  },
  {
    name: "LEM Projects",
    status: "Coming Soon",
    description:
      "Critical operational and strategic project solutions that help businesses move faster and smarter.",
    href: "#",
    cta: "Launching Soon",
    logoFile: "LEM-Projects_Logo.png",
  },
  {
    name: "LEM Enterprise",
    status: "Coming Soon",
    description:
      "Efficient procurement and delivery of essential goods that keep operations running every day.",
    href: "#",
    cta: "Launching Soon",
    logoFile: "LEM-Enterprise_Logo.png",
  },
];

const divisionsWithAssets = divisions.map((division) => {
  const logoDiskPath = path.join(process.cwd(), "public", "logos", division.logoFile);
  const logoPath = fs.existsSync(logoDiskPath) ? `/logos/${division.logoFile}` : null;

  return {
    ...division,
    logoPath,
  };
});

const holdingLogoDiskPath = path.join(process.cwd(), "public", "logos", "LEM-Holding_Logo.png");
const holdingLogoPath = fs.existsSync(holdingLogoDiskPath) ? "/logos/LEM-Holding_Logo.png" : null;

export default function Home() {
  return (
    <main className="relative isolate overflow-x-hidden">
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="holding-logo-stage mx-auto mb-6 w-full max-w-xs">
            <div className="holding-logo-aura" aria-hidden />
            <div className="holding-logo-frame">
              {holdingLogoPath ? (
                <Image
                  src={holdingLogoPath}
                  alt="LEM Holding logo"
                  width={420}
                  height={240}
                  priority
                  className="holding-logo-image"
                />
              ) : (
                <div className="holding-logo-fallback">LEM Holding</div>
              )}
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.22em] text-teal-700">LEM Holding</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-stone-900 sm:text-6xl">
            Powering Solutions. Enabling Possibilities.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-700 sm:text-xl">
            A dynamic powerhouse bringing together three strong divisions to deliver a seamless,
            end-to-end service experience.
          </p>
        </div>

        <div className="crawl-stage mx-auto mt-10 h-44 max-w-4xl rounded-3xl border border-teal-200/70 bg-white/65 px-4 py-4 shadow-sm">
          <div className="crawl-text space-y-3 text-center text-base font-medium text-stone-700 sm:text-lg">
            <p>
              Through <span className="font-semibold text-teal-800">LEM Projects</span>, we provide
              critical operational and strategic solutions that drive performance.
            </p>
            <p>
              <span className="font-semibold text-teal-800">LEM Accommodation</span> offers a reliable
              home away from home with comfort and convenience.
            </p>
            <p>
              <span className="font-semibold text-teal-800">LEM Enterprise</span> ensures efficient
              delivery of essential goods for daily operations.
            </p>
            <p className="font-semibold text-amber-700">
              From strategy to supply, from planning to living - LEM Holding is your trusted partner in progress.
            </p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-center text-3xl font-bold text-stone-900 sm:text-4xl">Our Divisions</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-stone-700">
            One-stop service provider bridging expert solutions with practical on-the-ground support.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {divisionsWithAssets.map((division) => {
              const isLive = division.status === "Live";

              return (
                <article
                  key={division.name}
                  className="division-card rounded-3xl border border-black/10 bg-white/90 p-6 shadow-md"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-teal-200 bg-teal-50 shadow-sm">
                      {division.logoPath ? (
                        <Image
                          src={division.logoPath}
                          alt={`${division.name} logo`}
                          fill
                          sizes="56px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <span className="text-xs font-bold tracking-[0.14em] text-teal-800">LEM</span>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isLive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {division.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-stone-900">{division.name}</h3>
                  <p className="mt-3 min-h-24 leading-relaxed text-stone-700">{division.description}</p>

                  {isLive ? (
                    <Link
                      href={division.href}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                      {division.cta}
                    </Link>
                  ) : (
                    <span className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-stone-300 bg-stone-100 px-4 py-3 text-sm font-semibold text-stone-500">
                      {division.cta}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
