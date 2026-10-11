"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Globe, Lock, Phone } from "lucide-react";
import type { TitleText } from "@/content/schema";

/** Co je v adresním řádku v jednotlivých krocích. */
const ADDRESS = ["nápad na papíře", "rozvržení stránky", "návrh vzhledu", "vase-firma.cz"];
const AUTOPLAY_MS = 4200;

/**
 * „Jak vzniká web“: jedna a tatáž stránka ve čtyřech podobách.
 *
 * 0 náčrt — čárkované obrysy s popisky, trochu nakřivo jako tužkou,
 * 1 rozvržení — šedé bloky, už rovně, ale bez barev,
 * 2 vzhled — barvy, písmo, skutečné texty,
 * 3 spuštění — totéž na doméně a vedle i v telefonu.
 *
 * Stránka patří vymyšlené „Vaší firmě“, schválně žádné skutečné. Kroky se
 * přepínají samy, dokud na ně návštěvník neklikne; pak už je to na něm.
 */
export function WebBuilder({ steps }: { steps: TitleText[] }) {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setStage((s) => (s + 1) % ADDRESS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [stage, auto]);

  const pick = (i: number) => {
    setAuto(false);
    setStage(i);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      {/* kroky */}
      <ol className="order-2 space-y-2 lg:order-1">
        {steps.slice(0, ADDRESS.length).map((s, i) => {
          const active = i === stage;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={active}
                className={`w-full border-l-2 px-4 py-3 text-left transition-colors ${
                  active ? "border-rust bg-cream/70" : "border-line-strong hover:bg-cream/40"
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className={`font-mono text-xs ${active ? "text-rust-deep" : "text-ink-3"}`}>0{i + 1}</span>
                  <span className={`font-display text-xl font-bold ${active ? "text-ink" : "text-ink-2"}`}>{s.title}</span>
                </span>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.span
                      className="block overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <span className="block pl-8 pt-1.5 text-sm leading-relaxed text-ink-2">{s.text}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>

      {/* stránka */}
      <div className="relative order-1 pb-6 pr-6 sm:pb-8 sm:pr-10 lg:order-2">
        <figure className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-cream-2/70 px-3 py-2">
            <span className="flex shrink-0 gap-1" aria-hidden>
              <i className="size-2 rounded-full bg-ink/25" />
              <i className="size-2 rounded-full bg-ink/25" />
              <i className="size-2 rounded-full bg-ink/25" />
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/70 px-2 py-0.5 font-mono text-[11px] text-ink-2">
              {stage === 3 ? <Lock className="size-3 shrink-0 text-moss" /> : <Globe className="size-3 shrink-0" />}
              <span className="truncate">{ADDRESS[stage]}</span>
              {stage === 3 && (
                <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-moss">
                  <i className="size-1.5 rounded-full bg-moss" /> online
                </span>
              )}
            </span>
          </div>
          <Mock stage={stage} />
        </figure>

        {/* telefon přijede až při spuštění */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              className="absolute bottom-0 right-0 w-[26%] min-w-[92px]"
              initial={{ opacity: 0, y: 24, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <PhoneMock />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── vymyšlená stránka ve čtyřech podobách ─────────────────────────── */

const GREEN = "#23453b";
const SAND = "#f3ece0";
const GOLD = "#d9a441";

function Mock({ stage }: { stage: number }) {
  const sketch = stage === 0;
  const designed = stage >= 2;
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden p-[4%] transition-colors duration-700"
      style={{ background: designed ? SAND : stage === 1 ? "#fbf5ec" : "var(--cream)" }}
    >
      {/* papírové linky v náčrtu */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: sketch ? 1 : 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0 23px, rgba(45,93,143,0.12) 23px 24px)",
        }}
      />

      <div className="relative flex h-full flex-col gap-[4%]">
        {/* hlavička */}
        <div className="flex items-center justify-between gap-2">
          <Blk stage={stage} label="logo" tilt={-2} className="h-[1.6em] w-[22%]">
            <span className="font-display text-[clamp(9px,1.5vw,15px)] font-extrabold tracking-tight" style={{ color: GREEN }}>
              Vaše firma
            </span>
          </Blk>
          <div className="flex flex-1 items-center justify-end gap-[3%]">
            {["Služby", "Ceník", "O nás"].map((t, i) => (
              <Blk key={t} stage={stage} label={i === 0 ? "menu" : ""} tilt={1} className="hidden h-[1.1em] w-[11%] sm:flex">
                <span className="text-[clamp(7px,1vw,11px)] font-medium" style={{ color: GREEN }}>
                  {t}
                </span>
              </Blk>
            ))}
            <Blk stage={stage} label="telefon" tilt={2} className="h-[1.7em] w-[20%]" fill={GREEN}>
              <span className="inline-flex items-center gap-1 text-[clamp(7px,1vw,11px)] font-semibold text-white">
                <Phone className="size-[1em]" /> Zavolat
              </span>
            </Blk>
          </div>
        </div>

        {/* úvod */}
        <div className="grid flex-[1.4] grid-cols-[1.2fr_1fr] gap-[4%]">
          <div className="flex flex-col justify-center gap-[6%]">
            <Blk stage={stage} label="nadpis: co děláte" tilt={-1} className="h-[34%] w-full" align="start">
              <span
                className="font-display text-[clamp(11px,2.3vw,24px)] font-bold leading-[1.05]"
                style={{ color: GREEN }}
              >
                Kuchyně na míru.
                <br />
                Do tří měsíců.
              </span>
            </Blk>
            <Blk stage={stage} label="pro koho a proč vy" tilt={0.5} className="h-[22%] w-[85%]" align="start">
              <span className="text-[clamp(7px,1vw,11px)] leading-snug" style={{ color: `${GREEN}cc` }}>
                Navrhneme, vyrobíme a namontujeme. Zaměření zdarma, cena předem.
              </span>
            </Blk>
            <Blk stage={stage} label="tlačítko" tilt={-1.5} className="h-[16%] w-[42%]" fill={GOLD}>
              <span className="text-[clamp(7px,1vw,11px)] font-bold" style={{ color: GREEN }}>
                Nezávazná poptávka
              </span>
            </Blk>
          </div>
          <Blk stage={stage} label="fotka z dílny" tilt={1.5} className="h-full w-full" fill={GREEN}>
            <Illustration />
          </Blk>
        </div>

        {/* tři karty */}
        <div className="grid flex-1 grid-cols-3 gap-[3%]">
          {[
            ["Kuchyně", "od návrhu po montáž"],
            ["Vestavěné skříně", "každý centimetr využitý"],
            ["Reference", "120 hotových zakázek"],
          ].map(([t, s], i) => (
            <Blk key={t} stage={stage} label={["služba", "služba", "reference"][i]} tilt={[-1, 1.2, -0.6][i]} className="h-full w-full" fill="#ffffff" align="start">
              <span className="flex h-full flex-col justify-end">
                <span className="font-display text-[clamp(8px,1.2vw,13px)] font-bold" style={{ color: GREEN }}>
                  {t}
                </span>
                <span className="text-[clamp(6px,0.85vw,10px)]" style={{ color: `${GREEN}aa` }}>
                  {s}
                </span>
              </span>
            </Blk>
          ))}
        </div>

        {/* kontakt */}
        <Blk stage={stage} label="kontakt a mapa" tilt={0.8} className="h-[9%] w-full" fill={GREEN}>
          <span className="flex w-full items-center justify-between px-[2%] text-[clamp(6px,0.9vw,10px)] text-white/85">
            <span>Dílenská 12, Brno</span>
            <span className="font-semibold text-white">+420 600 000 000</span>
          </span>
        </Blk>
      </div>
    </div>
  );
}

/**
 * Jeden kus stránky. V náčrtu čárkovaný obrys s popiskem, v rozvržení šedý
 * blok, od vzhledu dál skutečný obsah. Přechod mezi podobami je plynulý
 * (barvy, natočení), obsah se jen prolne.
 */
function Blk({
  stage,
  label,
  tilt = 0,
  fill,
  align = "center",
  className = "",
  children,
}: {
  stage: number;
  label: string;
  tilt?: number;
  fill?: string;
  align?: "center" | "start";
  className?: string;
  children: ReactNode;
}) {
  const sketch = stage === 0;
  const wire = stage === 1;
  const designed = stage >= 2;
  return (
    <div
      className={`relative flex items-center overflow-hidden rounded-[3px] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
      style={{
        transform: sketch ? `rotate(${tilt}deg)` : "none",
        border: sketch ? "1.5px dashed rgba(26,18,12,0.5)" : "1.5px solid transparent",
        background: designed ? (fill ?? "transparent") : wire ? "rgba(26,18,12,0.09)" : "transparent",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {designed ? (
          <motion.div
            key="obsah"
            className={`flex h-full w-full items-center ${align === "center" ? "justify-center" : "justify-start p-[6%]"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {children}
          </motion.div>
        ) : (
          label && (
            <motion.span
              key="popisek"
              className={`truncate px-1 font-mono text-[clamp(6px,0.85vw,10px)] ${sketch ? "text-sky" : "text-ink-3"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.span>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

/** Jednoduchá kresba místo fotky: pracovní deska, skříňky, lampa. */
function Illustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="200" height="160" fill={GREEN} />
      <rect x="20" y="22" width="70" height="40" fill="none" stroke={SAND} strokeOpacity="0.5" strokeWidth="2" />
      <rect x="110" y="22" width="70" height="40" fill="none" stroke={SAND} strokeOpacity="0.5" strokeWidth="2" />
      <line x1="55" y1="22" x2="55" y2="62" stroke={SAND} strokeOpacity="0.35" strokeWidth="2" />
      <line x1="145" y1="22" x2="145" y2="62" stroke={SAND} strokeOpacity="0.35" strokeWidth="2" />
      <rect x="10" y="92" width="180" height="8" fill={GOLD} />
      <rect x="20" y="100" width="50" height="60" fill="none" stroke={SAND} strokeOpacity="0.5" strokeWidth="2" />
      <rect x="75" y="100" width="50" height="60" fill="none" stroke={SAND} strokeOpacity="0.5" strokeWidth="2" />
      <rect x="130" y="100" width="50" height="60" fill="none" stroke={SAND} strokeOpacity="0.5" strokeWidth="2" />
      <line x1="100" y1="0" x2="100" y2="70" stroke={SAND} strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M88 70 L112 70 L106 80 L94 80 Z" fill={GOLD} />
      <circle cx="100" cy="84" r="3" fill={GOLD} fillOpacity="0.8" />
    </svg>
  );
}

function PhoneMock() {
  return (
    <div className="rounded-[1.3rem] border-2 border-ink bg-cream p-[5px] shadow-[var(--shadow-lift)]">
      <div className="relative flex aspect-[9/18] flex-col gap-[5%] overflow-hidden rounded-[0.95rem] p-[9%] pt-[18%]" style={{ background: SAND }}>
        <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-1/3 -translate-x-1/2 rounded-full bg-ink" />
        <span className="font-display text-[clamp(7px,1.1vw,11px)] font-extrabold" style={{ color: GREEN }}>
          Vaše firma
        </span>
        <span className="font-display text-[clamp(8px,1.3vw,13px)] font-bold leading-[1.05]" style={{ color: GREEN }}>
          Kuchyně na míru. Do tří měsíců.
        </span>
        <span className="h-[22%] w-full rounded-[3px]" style={{ background: GREEN }} />
        <span className="h-[4%] w-full rounded-[2px]" style={{ background: `${GREEN}22` }} />
        <span className="h-[4%] w-3/4 rounded-[2px]" style={{ background: `${GREEN}22` }} />
        <span
          className="mt-auto flex h-[11%] w-full items-center justify-center gap-1 rounded-[3px] text-[clamp(6px,0.9vw,9px)] font-bold text-white"
          style={{ background: GREEN }}
        >
          <Phone className="size-[1em]" /> Zavolat
        </span>
      </div>
    </div>
  );
}
