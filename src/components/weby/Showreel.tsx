"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Globe } from "lucide-react";
import type { Shot } from "./SitePreview";

export type Reel = {
  slug: string;
  name: string;
  kind: string;
  url: string;
  display: string;
  desktop: Shot;
  mobile: Shot;
};

/** Jak dlouho se jeden web ukazuje. Za tu dobu se stránka projede shora dolů. */
const INTERVAL_MS = 9000;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Přehlídka hotových webů do úvodu: počítač a vedle něj telefon, v obou se
 * sama projíždí skutečná stránka. Po čase se přepne na další web.
 *
 * Projíždění je čisté CSS: rám je kontejner (`container-type: size`), takže
 * obrázek se dá posunout přesně o „svou výšku minus výšku rámu“ (`100cqh`),
 * ať je stránka vysoká jakkoli. Přepnutí na další web řídí konec animace
 * proužku pod názvem, takže pauza (najetí myší) zastaví obojí naráz
 * a nic se nerozejde.
 *
 * Obrázky se načítají postupně: aktuální web a předem ten další.
 */
export function Showreel({ items }: { items: Reel[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const current = items[idx];
  const next = items[(idx + 1) % items.length];

  // Další web se stáhne dopředu, aby se po přepnutí neukázal prázdný rám.
  useEffect(() => {
    for (const shot of [next?.desktop, next?.mobile]) {
      if (shot) new window.Image().src = shot.src;
    }
  }, [next]);

  if (!current) return null;

  const play = paused || reduced ? "paused" : "running";
  const advance = () => setIdx((i) => (i + 1) % items.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative pb-[9%] pr-[16%]">
        {/* počítač */}
        <figure className="card overflow-hidden !shadow-[var(--shadow-lift)]">
          <div className="flex items-center gap-2 border-b border-line bg-cream-2/70 px-3 py-2">
            <span className="flex shrink-0 gap-1" aria-hidden>
              <i className="size-2 rounded-full bg-ink/25" />
              <i className="size-2 rounded-full bg-ink/25" />
              <i className="size-2 rounded-full bg-ink/25" />
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/70 px-2 py-0.5 font-mono text-[11px] text-ink-2">
              <Globe className="size-3 shrink-0" />
              <span className="truncate">{current.display}</span>
            </span>
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-line-strong bg-cream hover:bg-white"
              title={`Otevřít ${current.display}`}
            >
              <ArrowUpRight className="size-3" />
              <span className="sr-only">Otevřít {current.display}</span>
            </a>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden bg-cream-2 [container-type:size]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ScrollShot shot={current.desktop} alt={`Stránka ${current.name}`} play={play} eager={idx === 0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </figure>

        {/* telefon */}
        <div className="absolute bottom-0 right-0 w-[30%] min-w-[96px]">
          <div className="rounded-[1.4rem] border-2 border-ink bg-cream p-[5px] shadow-[var(--shadow-lift)] sm:rounded-[1.9rem] sm:p-[7px]">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1rem] bg-cream-2 [container-type:size] sm:rounded-[1.4rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                >
                  <ScrollShot
                    shot={current.mobile ?? current.desktop}
                    alt={`Stránka ${current.name} na mobilu`}
                    play={play}
                    eager={idx === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <span aria-hidden className="absolute left-1/2 top-1.5 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-ink" />
            </div>
          </div>
        </div>
      </div>

      {/* přepínač webů s ukazatelem času */}
      <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
        {items.map((it, i) => {
          const active = i === idx;
          return (
            <li key={it.slug}>
              <button
                type="button"
                onClick={() => setIdx(i)}
                aria-pressed={active}
                className="group block w-full text-left"
              >
                <span className="relative block h-[2px] overflow-hidden bg-line-strong">
                  {active && (
                    <span
                      key={idx}
                      className={`absolute inset-y-0 left-0 bg-rust ${reduced ? "w-full" : "reel-progress"}`}
                      style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: play }}
                      onAnimationEnd={reduced ? undefined : advance}
                    />
                  )}
                </span>
                <span
                  className={`mt-2 block font-display text-[0.95rem] font-bold leading-tight transition-colors ${
                    active ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
                  }`}
                >
                  {it.name}
                </span>
                <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-ink-3">
                  {it.kind.split(" · ")[0]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ScrollShot({
  shot,
  alt,
  play,
  eager,
}: {
  shot: Shot;
  alt: string;
  play: "paused" | "running";
  eager: boolean;
}) {
  if (!shot) return <div className="h-full bg-gradient-to-br from-paper-soft to-paper" />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- snímky jsou předem zmenšené, viz SitePreview
    <img
      src={shot.src}
      alt={alt}
      width={shot.width}
      height={shot.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className="reel-scroll absolute left-0 top-0 w-full max-w-none"
      style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: play }}
    />
  );
}
