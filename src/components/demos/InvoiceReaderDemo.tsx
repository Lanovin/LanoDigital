"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Image as ImageIcon, Play, RotateCcw, ScanLine, Calculator, Check, X, RefreshCw } from "lucide-react";
import { demoDoklady, dokladStavy, type DemoDoklad } from "@/data/demo-doklady";

type Step = "waiting" | "reading" | "checking" | "retry" | "done";
type Phase = "idle" | "running" | "done";

const czk = (n: number) => n.toLocaleString("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function InvoiceReaderDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [steps, setSteps] = useState<Record<string, Step>>({});
  const [open, setOpen] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const set = (id: string, s: Step) => setSteps((prev) => ({ ...prev, [id]: s }));

  const run = () => {
    clear();
    setPhase("running");
    setOpen(null);
    setSteps(Object.fromEntries(demoDoklady.map((d) => [d.id, "waiting" as Step])));
    // souběžnost 3 – jako v projektu
    let t = 0;
    demoDoklady.forEach((d, i) => {
      const start = Math.floor(i / 3) * 1500 + (i % 3) * 180;
      const retry = d.result.stav === "nesedi";
      timers.current.push(
        window.setTimeout(() => set(d.id, "reading"), start),
        window.setTimeout(() => set(d.id, "checking"), start + 800),
      );
      if (retry) {
        timers.current.push(
          window.setTimeout(() => set(d.id, "retry"), start + 1150),
          window.setTimeout(() => set(d.id, "done"), start + 2100),
        );
        t = Math.max(t, start + 2100);
      } else {
        timers.current.push(window.setTimeout(() => set(d.id, "done"), start + 1200));
        t = Math.max(t, start + 1200);
      }
    });
    timers.current.push(window.setTimeout(() => setPhase("done"), t + 250));
  };

  const reset = () => {
    clear();
    setPhase("idle");
    setSteps({});
    setOpen(null);
  };

  const doneDocs = demoDoklady.filter((d) => steps[d.id] === "done");
  const toPayCzk = doneDocs
    .filter((d) => d.result.stav !== "duplicita" && d.result.mena === "CZK" && d.result.splatnost && d.result.sDph)
    .reduce((s, d) => s + (d.result.sDph ?? 0), 0);
  const toPayEur = doneDocs
    .filter((d) => d.result.stav !== "duplicita" && d.result.mena === "EUR" && d.result.sDph)
    .reduce((s, d) => s + (d.result.sDph ?? 0), 0);
  const problems = doneDocs.filter((d) => d.result.stav === "nesedi" || d.result.stav === "ke_kontrole").length;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-cream-2/70 px-4 py-3 sm:px-5">
        <span className="font-mono text-xs text-ink-3">Čtení dokladů · ukázková složka · 7 souborů</span>
        {phase === "idle" && (
          <button type="button" onClick={run} className="btn btn-ink !py-2.5 !px-4 text-sm">
            <Play className="size-4" /> Přečíst doklady
          </button>
        )}
        {phase === "running" && (
          <span className="inline-flex items-center gap-2 font-mono text-xs text-rust-deep">
            <ScanLine className="size-4 animate-blink" /> čtu doklady {doneDocs.length}/{demoDoklady.length}
          </span>
        )}
        {phase === "done" && (
          <button type="button" onClick={reset} className="btn btn-cream !py-2.5 !px-4 text-sm">
            <RotateCcw className="size-4" /> Znovu
          </button>
        )}
      </div>

      {/* složka */}
      <div className="grid gap-2.5 p-4 sm:grid-cols-4 sm:p-5 lg:grid-cols-7">
        {demoDoklady.map((d) => (
          <DocCard key={d.id} doc={d} step={steps[d.id] ?? "waiting"} idle={phase === "idle"} onClick={() => steps[d.id] === "done" && setOpen(open === d.id ? null : d.id)} selected={open === d.id} />
        ))}
      </div>

      {/* tabulka */}
      {doneDocs.length > 0 && (
        <div className="border-t border-line">
          <div className="demo-scroll overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-cream-2/70 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
                <tr>
                  <th className="px-4 py-2 font-medium sm:px-5">soubor</th>
                  <th className="px-3 py-2 font-medium">stav</th>
                  <th className="px-3 py-2 font-medium">dodavatel</th>
                  <th className="px-3 py-2 font-medium">splatnost</th>
                  <th className="px-3 py-2 text-right font-medium">celkem</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {demoDoklady.filter((d) => steps[d.id] === "done").map((d) => {
                    const s = dokladStavy[d.result.stav];
                    return (
                      <motion.tr
                        key={d.id}
                        initial={{ opacity: 0, backgroundColor: "rgba(230,166,108,0.5)" }}
                        animate={{ opacity: 1, backgroundColor: "rgba(230,166,108,0)" }}
                        transition={{ duration: 0.8 }}
                        className={`cursor-pointer border-t border-line align-top hover:bg-paper/25 ${open === d.id ? "bg-paper/25" : ""}`}
                        onClick={() => setOpen(open === d.id ? null : d.id)}
                      >
                        <td className="px-4 py-2 font-mono text-xs sm:px-5">{d.file}</td>
                        <td className="px-3 py-2"><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.cls}`}>{s.label}</span></td>
                        <td className="px-3 py-2">{d.result.dodavatel}<span className="block font-mono text-[10px] text-ink-3">{d.result.cislo ? `${d.result.typ} · ${d.result.cislo}` : d.result.typ}</span></td>
                        <td className="px-3 py-2 font-mono text-xs">{d.result.splatnost ?? "neuvedena"}</td>
                        <td className="px-3 py-2 text-right font-mono text-xs">{d.result.sDph !== null ? `${czk(d.result.sDph)} ${d.result.mena === "EUR" ? "€" : "Kč"}` : "bez ceny"}</td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <AnimatePresence>
            {open && <Detail key={open} doc={demoDoklady.find((d) => d.id === open)!} />}
          </AnimatePresence>
        </div>
      )}

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3 border-t border-line bg-cream-2/70 p-4 sm:grid-cols-3 sm:p-5">
          <Stat label="K zaplacení (bez duplicity)" value={`${czk(toPayCzk)} Kč`} sub={toPayEur ? `+ ${czk(toPayEur)} €` : undefined} />
          <Stat label="Doklady, kde něco nesedí" value={String(problems)} sub="AI přečetla správně, chyba je přímo na dokladu" tone="rust" />
          <Stat label="Stejné doklady podruhé" value="0 Kč" sub="už přečtené doklady se znovu neplatí" />
        </motion.div>
      )}
      {phase === "idle" && (
        <p className="border-t border-line px-4 py-3 text-xs text-ink-3 sm:px-5">Klikněte na <strong className="text-ink">Přečíst doklady</strong>. AI přepíše, výpočet zkontroluje. U jednoho dokladu je schválně chyba.</p>
      )}
    </div>
  );
}

function DocCard({ doc, step, idle, onClick, selected }: { doc: DemoDoklad; step: Step; idle: boolean; onClick: () => void; selected: boolean }) {
  const Icon = doc.kind === "pdf" ? FileText : ImageIcon;
  const st = dokladStavy[doc.result.stav];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col rounded-xl border bg-white/60 p-2.5 text-left transition-all ${
        step === "reading" || step === "checking" || step === "retry" ? "border-rust/60 shadow-[0_0_0_3px_rgba(184,57,26,0.15)]" : selected ? "border-ink" : "border-line"
      } ${step === "done" ? "cursor-pointer hover:bg-white" : "cursor-default"}`}
    >
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-ink-3" />
        <span className="mono-tag !border-0 !px-0 !text-[9px] uppercase text-ink-3">{doc.kind}</span>
      </div>
      {/* mini „papír“ */}
      <div className="mt-2 rounded-md border border-line bg-cream px-2 py-1.5">
        <p className="truncate text-[10px] font-semibold leading-tight">{doc.glance.supplier}</p>
        <div className="mt-1 space-y-[3px]">
          <span className="block h-[3px] w-4/5 rounded bg-ink/15" />
          <span className="block h-[3px] w-3/5 rounded bg-ink/15" />
          <span className="block h-[3px] w-2/3 rounded bg-ink/15" />
        </div>
        <p className="mt-1.5 text-right font-mono text-[10px]">{doc.glance.total}</p>
        <AnimatePresence>
          {(step === "reading" || step === "retry") && (
            <motion.span
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: ["0%", "100%"], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute left-2 right-2 h-[2px] bg-rust/80 shadow-[0_0_8px_var(--rust)]"
            />
          )}
        </AnimatePresence>
      </div>
      <p className="mt-2 truncate text-[11px] text-ink-2">{doc.label}</p>
      <div className="mt-1 h-4 font-mono text-[10px]">
        {idle && <span className="text-ink-3">čeká</span>}
        {!idle && step === "waiting" && <span className="text-ink-3">ve frontě</span>}
        {step === "reading" && <span className="text-rust-deep">AI čte…</span>}
        {step === "checking" && <span className="inline-flex items-center gap-1 text-moss"><Calculator className="size-3" /> přepočítávám…</span>}
        {step === "retry" && <span className="inline-flex items-center gap-1 text-rust-deep"><RefreshCw className="size-3 animate-spin" /> čtu znovu</span>}
        {step === "done" && <span className={`rounded-full px-1.5 py-[1px] text-[9px] font-semibold ${st.cls}`}>{st.label}</span>}
      </div>
    </button>
  );
}

function Detail({ doc }: { doc: DemoDoklad }) {
  const r = doc.result;
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
      <div className="grid gap-4 border-t border-line bg-ink p-4 text-cream sm:grid-cols-[1.2fr_1fr] sm:p-5">
        <div>
          <p className="font-mono text-[11px] text-cream/60">{doc.file} · jistota {Math.round(r.jistota * 100)} %</p>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <dt className="text-cream/60">dodavatel</dt><dd>{r.dodavatel}</dd>
            <dt className="text-cream/60">IČO</dt><dd className="font-mono">{r.ico ?? "neuvedeno"}</dd>
            <dt className="text-cream/60">základ</dt><dd className="font-mono">{r.bezDph !== null ? czk(r.bezDph) : "neuvedeno"}</dd>
            <dt className="text-cream/60">DPH</dt><dd className="font-mono">{r.dph !== null ? czk(r.dph) : "neuvedeno"}</dd>
            <dt className="text-cream/60">celkem</dt><dd className="font-mono">{r.sDph !== null ? `${czk(r.sDph)} ${r.mena}` : "neuvedeno"}</dd>
          </dl>
          {r.nalezy.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {r.nalezy.map((n) => (
                <li key={n} className="flex gap-2 text-sm text-paper"><span aria-hidden>!</span>{n}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="font-mono text-[11px] text-cream/60">kontroly výpočtem, pokaždé stejně</p>
          <ul className="mt-2 space-y-1.5">
            {r.checks.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm">
                <span className={`inline-flex size-5 items-center justify-center rounded-full ${c.ok ? "bg-moss" : "bg-rust"}`}>
                  {c.ok ? <Check className="size-3" /> : <X className="size-3" />}
                </span>
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "rust" }) {
  return (
    <div className="rounded-2xl border border-line bg-cream px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{label}</p>
      <p className={`mt-1 font-display text-2xl font-bold ${tone === "rust" ? "text-rust" : ""}`}>{value}</p>
      {sub && <p className="text-xs text-ink-3">{sub}</p>}
    </div>
  );
}
