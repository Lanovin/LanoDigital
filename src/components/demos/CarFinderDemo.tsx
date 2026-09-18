"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, RotateCcw, Mail, Filter, Bot, SearchX } from "lucide-react";
import { cars, demoPoptavky, verdictMeta, type Prefilter } from "@/data/demo-inzeraty";

type Phase = "idle" | "criteria" | "prefilter" | "ranking" | "done";

const PRE: Record<Prefilter, { label: string; cls: string }> = {
  prosel: { label: "prošel", cls: "bg-moss" },
  tesne: { label: "těsně", cls: "bg-paper-deep" },
  vypadl: { label: "vypadl", cls: "bg-ink/25" },
};

export function CarFinderDemo() {
  const [activeId, setActiveId] = useState(demoPoptavky[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shownCriteria, setShownCriteria] = useState(0);
  const [shownRank, setShownRank] = useState(0);
  const timers = useRef<number[]>([]);

  const poptavka = demoPoptavky.find((p) => p.id === activeId)!;

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const reset = () => {
    clear();
    setPhase("idle");
    setShownCriteria(0);
    setShownRank(0);
  };

  const choose = (id: string) => {
    reset();
    setActiveId(id);
  };

  const run = () => {
    clear();
    setPhase("criteria");
    setShownCriteria(0);
    setShownRank(0);
    let t = 500;
    poptavka.criteria.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setShownCriteria(i + 1), t + i * 220));
    });
    t += poptavka.criteria.length * 220 + 500;
    timers.current.push(window.setTimeout(() => setPhase("prefilter"), t));
    t += 1400;
    timers.current.push(window.setTimeout(() => setPhase("ranking"), t));
    t += 700;
    poptavka.ranking.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setShownRank(i + 1), t + i * 420));
    });
    t += poptavka.ranking.length * 420 + 300;
    timers.current.push(window.setTimeout(() => setPhase("done"), t));
  };

  const counts = (["prosel", "tesne", "vypadl"] as Prefilter[]).map((s) => ({
    s,
    n: cars.filter((c) => poptavka.prefilter[c.id]?.state === s).length,
  }));
  const running = phase !== "idle" && phase !== "done";

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-cream-2/70 px-4 py-3 sm:px-5">
        <span className="font-mono text-xs text-ink-3">hledani_inzeratu · feed 17 aut · 3 ukázkové poptávky</span>
        {phase === "idle" && (
          <button type="button" onClick={run} className="btn btn-ink !py-2.5 !px-4 text-sm">
            <Play className="size-4" /> Najít auta
          </button>
        )}
        {running && (
          <span className="inline-flex items-center gap-2 font-mono text-xs text-rust-deep">
            <Bot className="size-4 animate-blink" />
            {phase === "criteria" && "model čte poptávku…"}
            {phase === "prefilter" && "kód filtruje nabídku…"}
            {phase === "ranking" && "model posuzuje vhodnost…"}
          </span>
        )}
        {phase === "done" && (
          <button type="button" onClick={reset} className="btn btn-cream !py-2.5 !px-4 text-sm">
            <RotateCcw className="size-4" /> Znovu
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-[1fr_1.3fr]">
        {/* poptávka */}
        <div className="border-b border-line p-4 sm:p-5 md:border-b-0 md:border-r">
          <div className="flex flex-wrap gap-1.5">
            {demoPoptavky.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p.id)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  p.id === activeId ? "border-ink bg-ink text-cream" : "border-line-strong bg-cream hover:bg-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-white/60 p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] text-ink-3">
              <Mail className="size-3.5" /> {poptavka.from}
            </div>
            <p className="mt-1 text-sm font-semibold">{poptavka.subject}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{poptavka.body}</p>
          </div>

          {/* krok 1: kritéria */}
          <AnimatePresence>
            {phase !== "idle" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                  <Bot className="size-3.5" /> 1 · co zákazník chce
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {poptavka.criteria.slice(0, shownCriteria).map((c) => (
                    <motion.li
                      key={c.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-lg border border-line-strong bg-cream px-2 py-1 text-xs"
                    >
                      <span className="font-mono text-[10px] text-ink-3">{c.label} </span>
                      <span className="font-semibold">{c.value}</span>
                    </motion.li>
                  ))}
                </ul>
                {shownCriteria >= poptavka.criteria.length && poptavka.nejasnosti.length > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-ink-3">
                    <span className="font-mono text-rust-deep">nejasnosti:</span> {poptavka.nejasnosti.join(" ")}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* kroky 2 a 3 */}
        <div className="p-4 sm:p-5">
          {phase === "idle" && (
            <div className="flex h-full min-h-[14rem] items-center justify-center rounded-2xl border border-dashed border-line-strong text-center text-sm text-ink-3">
              <p className="max-w-xs">Vyberte poptávku a klikněte na <strong className="text-ink">Najít auta</strong>. Uvidíte kritéria, předfiltr a posouzení každého auta.</p>
            </div>
          )}

          <AnimatePresence>
            {(phase === "prefilter" || phase === "ranking" || phase === "done") && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                  <Filter className="size-3.5" /> 2 · předfiltr v kódu zadarmo
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cars.map((c, i) => {
                    const st = poptavka.prefilter[c.id]?.state ?? "vypadl";
                    return (
                      <motion.span
                        key={c.id}
                        title={`${c.name}: ${PRE[st].label}${poptavka.prefilter[c.id]?.why ? ": " + poptavka.prefilter[c.id]?.why : ""}`}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 22 }}
                        className={`size-5 rounded-md ${PRE[st].cls}`}
                      />
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-2">
                  {counts.map(({ s, n }) => (
                    <span key={s} className="inline-flex items-center gap-1.5">
                      <i className={`size-2.5 rounded-sm ${PRE[s].cls}`} /> {n}× {PRE[s].label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(phase === "ranking" || phase === "done") && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                  <Bot className="size-3.5" /> 3 · posouzení s důvodem
                </p>
                {poptavka.ranking.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 rounded-2xl bg-ink p-4 text-cream">
                    <p className="flex items-center gap-2 font-semibold"><SearchX className="size-4 text-paper" /> Nabídce nic neodpovídá.</p>
                    <p className="mt-1 text-sm text-cream/75">Systém nic nedoporučí jen proto, aby něco doporučil. Místo toho řekne, které kritérium vyřazuje nejvíc:</p>
                    <ul className="mt-2 space-y-1 font-mono text-xs">
                      {poptavka.emptyReasons?.map((r) => (
                        <li key={r.reason}><span className="text-paper">{r.count}×</span> {r.reason}</li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {poptavka.ranking.slice(0, shownRank).map((r) => {
                      const car = cars.find((c) => c.id === r.carId)!;
                      const v = verdictMeta[r.verdict];
                      return (
                        <motion.li
                          key={r.carId}
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="rounded-2xl border border-line bg-white/60 p-3"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${v.cls}`}>{v.label}</span>
                            <span className="text-sm font-semibold">{car.name}</span>
                            <span className="ml-auto font-mono text-xs text-ink-3">{car.price.toLocaleString("cs-CZ")} Kč</span>
                          </div>
                          <p className="mt-1 font-mono text-[10px] text-ink-3">
                            {car.year} · {car.km.toLocaleString("cs-CZ")} km · {car.fuel} · {car.gearbox} · {car.city}
                          </p>
                          <p className="mt-1.5 text-sm text-ink-2">{r.why}</p>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-line bg-cream-2/70 px-4 py-3 font-mono text-[11px] text-ink-2 sm:px-5">
          2 volání modelu · předfiltr ušetřil {counts.find((c) => c.s === "vypadl")?.n} inzerátů · nic se zákazníkovi neposílá, obchodník rozhoduje
        </motion.div>
      )}
    </div>
  );
}
