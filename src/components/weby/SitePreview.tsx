"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe, ImageIcon, Loader2, MousePointerClick, MoveVertical, RotateCw, Play, Info } from "lucide-react";

export type Shot = { src: string; width: number; height: number } | null;

type Props = {
  name: string;
  url: string;
  display: string;
  accent: string;
  live: boolean;
  liveNote?: string;
  /** Úvodní obrazovka — plakát, než se načte cokoli dalšího. */
  poster: Shot;
  /** Celá stránka jako jeden vysoký obrázek — tímhle se dá projet. */
  full: Shot;
  /** Totéž v mobilní podobě webu. Na telefonu je desktopový snímek nečitelný. */
  mobile?: Shot;
  /** Ukázat pod dlaždicí vysvětlující poznámku. Na rozcestníku se vypíná,
   *  aby dvě dlaždice vedle sebe zůstaly stejně vysoké. */
  note?: boolean;
  priority?: boolean;
};

/**
 * Náhled hotového webu v rámečku prohlížeče.
 *
 * Dva režimy:
 *  - **obrázek** — celá stránka jako jeden vysoký snímek, dá se jím projet.
 *    Načte se jako obyčejný obrázek, takže nic nezdržuje.
 *  - **živě** — skutečný web v `<iframe>`. Mountuje se **až po kliknutí**,
 *    takže do té doby nestojí ani jeden požadavek. Vykresluje se v šířce
 *    desktopu a zmenší se transformací, aby se vešel do dlaždice.
 */
export function SitePreview({ name, url, display, accent, live, liveNote, poster, full, mobile, note = true, priority }: Props) {
  const [mode, setMode] = useState<"shot" | "live">("shot");
  const [loaded, setLoaded] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setBox({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Jak široký "prohlížeč" se webu podstrčí.
  //
  // Na širokou dlaždici jde desktopová šířka a zmenší se transformací.
  // Na užší se web vykreslí rovnou v šířce dlaždice — responzivní layout se
  // postará o zbytek a text zůstane ostrý a čitelný v původní velikosti.
  // Zvětšovat rám nahoru by jen nafouklo písmo a rozbilo kliknutelné plochy.
  const renderW = box.w >= 900 ? 1280 : Math.max(360, box.w);
  const scale = box.w > 0 ? box.w / renderW : 1;
  const frameH = scale > 0 ? Math.round(box.h / scale) : 0;

  const startLive = () => {
    setLoaded(false);
    setMode("live");
  };

  return (
    <figure className="card group overflow-hidden">
      {/* lišta prohlížeče */}
      <div className="flex items-center gap-2 border-b border-line bg-cream-2/70 px-3 py-2">
        <span className="flex shrink-0 gap-1" aria-hidden>
          <i className="size-2 rounded-full bg-ink/25" />
          <i className="size-2 rounded-full bg-ink/25" />
          <i className="size-2 rounded-full bg-ink/25" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/70 px-2 py-0.5 font-mono text-[11px] text-ink-2">
          <Globe className="size-3 shrink-0" />
          <span className="truncate">{display}</span>
          {mode === "live" && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-rust-deep">
              <i className="size-1.5 rounded-full bg-rust animate-blink" /> živě
            </span>
          )}
        </span>
        {mode === "live" && (
          <button
            type="button"
            onClick={() => {
              setLoaded(false);
              setNonce((n) => n + 1);
            }}
            title="Načíst znovu od začátku"
            className="inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-line-strong bg-cream hover:bg-white"
          >
            <RotateCw className="size-3" />
            <span className="sr-only">Načíst znovu</span>
          </button>
        )}
      </div>

      {/* plocha náhledu – čtverec */}
      <div ref={wrapRef} className="relative aspect-square overflow-hidden bg-cream-2">
        {mode === "shot" ? (
          <div
            className="demo-scroll absolute inset-0 overflow-y-auto overscroll-contain"
            onScroll={() => setScrolled(true)}
          >
            {full ? (
              /* Art direction: na telefonu má smysl ukázat mobilní podobu webu,
                 protože desktopový snímek zmenšený na 350 px se nedá přečíst.
                 `<picture>` stáhne jen tu variantu, která odpovídá — proto tady
                 není `next/image`, ten výběr podle média neumí. Snímky jsou
                 předem zmenšené a komprimované, takže se o nic nepřichází. */
              <picture>
                {mobile && (
                  <source media="(max-width: 639px)" srcSet={mobile.src} width={mobile.width} height={mobile.height} />
                )}
                <img
                  src={full.src}
                  alt={`Náhled celé stránky ${name}`}
                  width={full.width}
                  height={full.height}
                  loading={priority ? "eager" : "lazy"}
                  fetchPriority={priority ? "high" : "auto"}
                  decoding="async"
                  className="w-full"
                />
              </picture>
            ) : poster ? (
              <Image src={poster.src} alt={`Náhled webu ${name}`} width={poster.width} height={poster.height} className="w-full" />
            ) : (
              <Placeholder name={name} accent={accent} />
            )}
          </div>
        ) : (
          <>
            <iframe
              key={nonce}
              src={url}
              title={`Živý náhled webu ${name}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setLoaded(true)}
              style={{
                width: renderW,
                height: frameH || renderW,
                transform: scale === 1 ? undefined : `scale(${scale})`,
                transformOrigin: "top left",
              }}
              className="absolute left-0 top-0 border-0 bg-white"
            />
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center bg-cream-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-3">
                  <Loader2 className="size-4 animate-spin" /> načítám web…
                </span>
              </div>
            )}
          </>
        )}

        {/* nápověda ke scrollování */}
        {mode === "shot" && full && !scrolled && (
          <span className="pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cream shadow-[var(--shadow-card)] transition-opacity duration-300">
            <MoveVertical className="size-3 animate-float" /> projeďte stránku
          </span>
        )}

        {/* spuštění živého webu */}
        {mode === "shot" && live && (
          <button
            type="button"
            onClick={startLive}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-xs font-semibold text-cream shadow-[var(--shadow-card)] backdrop-blur-sm transition hover:bg-ink hover:-translate-y-0.5"
          >
            <Play className="size-3.5" /> Spustit živě
          </button>
        )}
      </div>

      {/* patka */}
      {/* Pevná výška patky drží dvě dlaždice vedle sebe stejně vysoké,
          i když jedna má přepínač a druhá jen poznámku. */}
      <figcaption className="flex min-h-[3.25rem] flex-wrap items-center gap-x-3 gap-y-2 border-t border-line px-3 py-2.5">
        {live ? (
          <div className="flex items-center gap-1 rounded-full border border-line-strong bg-cream p-0.5">
            <Toggle active={mode === "shot"} onClick={() => setMode("shot")} icon={ImageIcon} label="Obrázek" />
            <Toggle active={mode === "live"} onClick={startLive} icon={MousePointerClick} label="Živě" />
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-3" title={liveNote}>
            <Info className="size-3.5" /> jen obrázkový náhled
          </span>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-sm font-semibold hover:text-rust-deep"
        >
          Otevřít <ArrowUpRight className="size-3.5" />
        </a>
      </figcaption>

      {note && mode === "live" && (
        <p className="border-t border-line bg-cream-2/60 px-3 py-2 text-[11px] leading-snug text-ink-3">
          Tohle je opravdu ten web, ne obrázek. Dá se v něm klikat i scrollovat.
        </p>
      )}
      {note && !live && liveNote && (
        <p className="border-t border-line bg-cream-2/60 px-3 py-2 text-[11px] leading-snug text-ink-3">{liveNote}</p>
      )}
    </figure>
  );
}

function Toggle({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
        active ? "bg-ink text-cream" : "text-ink-2 hover:bg-ink/8"
      }`}
    >
      <Icon className="size-3.5" /> {label}
    </button>
  );
}

function Placeholder({ name, accent }: { name: string; accent: string }) {
  return (
    <div className="h-full p-5" style={{ background: `linear-gradient(135deg, ${accent} 0%, var(--ink) 100%)` }}>
      <span className="font-display text-lg font-bold text-cream">{name}</span>
      <div className="mt-6 h-3 w-2/3 rounded bg-cream/80" />
      <div className="mt-2 h-3 w-1/2 rounded bg-cream/50" />
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-md bg-cream/15" />
        ))}
      </div>
    </div>
  );
}
