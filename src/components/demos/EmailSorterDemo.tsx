"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, RotateCcw, Inbox, Sparkles } from "lucide-react";
import { demoEmails, emailCategories, type DemoEmail, type EmailCategory } from "@/data/demo-emails";

type Phase = "idle" | "running" | "done";

const ORDER: EmailCategory[] = ["akce_nutna", "podezrele", "dulezite_info", "k_precteni", "nepodstatne"];

export function EmailSorterDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = () => {
    clear();
    setPhase("running");
    setDoneIds([]);
    setSelected(null);
    demoEmails.forEach((e, i) => {
      timers.current.push(
        window.setTimeout(() => setActive(e.id), i * 420),
        window.setTimeout(() => {
          setDoneIds((d) => [...d, e.id]);
        }, i * 420 + 300),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setActive(null);
        setPhase("done");
      }, demoEmails.length * 420 + 200),
    );
  };

  const reset = () => {
    clear();
    setPhase("idle");
    setDoneIds([]);
    setActive(null);
    setSelected(null);
  };

  const pending = demoEmails.filter((e) => !doneIds.includes(e.id));
  const sorted = demoEmails.filter((e) => doneIds.includes(e.id));
  const selectedEmail = demoEmails.find((e) => e.id === selected) ?? null;

  return (
    <div className="card overflow-hidden">
      {/* hlavička okna */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-cream-2/70 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="size-2.5 rounded-full bg-rust/70" />
            <i className="size-2.5 rounded-full bg-paper-deep" />
            <i className="size-2.5 rounded-full bg-moss/70" />
          </span>
          <span className="font-mono text-xs text-ink-3">trideni_mailu · ukázková schránka · 12 mailů</span>
        </div>
        <div className="flex items-center gap-2">
          {phase === "idle" && (
            <button type="button" onClick={run} className="btn btn-ink !py-2.5 !px-4 text-sm">
              <Play className="size-4" /> Roztřídit schránku
            </button>
          )}
          {phase === "running" && (
            <span className="inline-flex items-center gap-2 font-mono text-xs text-rust-deep">
              <Sparkles className="size-4 animate-blink" /> model třídí… {doneIds.length}/{demoEmails.length}
            </span>
          )}
          {phase === "done" && (
            <button type="button" onClick={reset} className="btn btn-cream !py-2.5 !px-4 text-sm">
              <RotateCcw className="size-4" /> Znovu
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_1.25fr]">
        {/* Schránka */}
        <div className="border-b border-line md:border-b-0 md:border-r">
          <p className="flex items-center gap-2 px-4 pt-4 pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 sm:px-5">
            <Inbox className="size-3.5" /> Doručené <span className="ml-auto">{pending.length}</span>
          </p>
          <ul className="demo-scroll max-h-[22rem] overflow-y-auto px-2 pb-3 sm:px-3">
            <AnimatePresence initial={false}>
              {pending.map((e) => (
                <motion.li
                  key={e.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
                  className={`mb-1 rounded-xl px-3 py-2.5 transition-colors ${
                    active === e.id ? "bg-paper/60 ring-1 ring-rust/50" : "hover:bg-paper/30"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-semibold">{e.fromName}</span>
                    <span className="shrink-0 font-mono text-[10px] text-ink-3">{e.time}</span>
                  </div>
                  <p className="truncate text-sm text-ink-2">{e.subject}</p>
                  <p className="truncate text-xs text-ink-3">{e.preview}</p>
                </motion.li>
              ))}
            </AnimatePresence>
            {pending.length === 0 && (
              <li className="px-3 py-10 text-center text-sm text-ink-3">Schránka je prázdná, všechno je roztříděné.</li>
            )}
          </ul>
        </div>

        {/* Roztříděno */}
        <div className="p-4 sm:p-5">
          {sorted.length === 0 ? (
            <div className="flex h-full min-h-[14rem] flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong text-center text-sm text-ink-3">
              <p className="max-w-xs">Klikněte na <strong className="text-ink">Roztřídit schránku</strong>. Každý mail dostane kategorii, důvod a jistotu.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ORDER.map((cat) => {
                const items = sorted.filter((e) => e.result.category === cat);
                if (items.length === 0) return null;
                const meta = emailCategories[cat];
                return (
                  <motion.div key={cat} layout className="rounded-2xl border border-line bg-white/50 p-2.5">
                    <div className="mb-1.5 flex items-center gap-2 px-1">
                      <span className={`size-2 rounded-full ${meta.dot}`} />
                      <span className="text-xs font-semibold">{meta.name}</span>
                      <span className="ml-auto font-mono text-[10px] text-ink-3">{items.length}</span>
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      <AnimatePresence initial={false}>
                        {items.map((e) => (
                          <motion.li
                            key={e.id}
                            layout
                            initial={{ opacity: 0, scale: 0.85, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 380, damping: 26 }}
                          >
                            <button
                              type="button"
                              onClick={() => setSelected(selected === e.id ? null : e.id)}
                              className={`max-w-[15rem] truncate rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors ${
                                selected === e.id ? "border-ink bg-ink text-cream" : "border-line-strong bg-cream hover:bg-white"
                              }`}
                              title={e.subject}
                            >
                              <span className="font-semibold">{e.fromName}</span>
                              <span className={selected === e.id ? "text-cream/70" : "text-ink-3"}> · {e.subject}</span>
                            </button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          )}

          <AnimatePresence>
            {selectedEmail && <ReasonCard key={selectedEmail.id} email={selectedEmail} />}
          </AnimatePresence>

          {phase === "done" && !selectedEmail && (
            <p className="mt-3 text-xs text-ink-3">Klikněte na mail a uvidíte, proč skončil tam, kde skončil.</p>
          )}
        </div>
      </div>

      {phase === "done" && <Summary />}
    </div>
  );
}

function ReasonCard({ email }: { email: DemoEmail }) {
  const meta = emailCategories[email.result.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="mt-3 rounded-2xl bg-ink p-4 text-cream"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${meta.tone}`}>{meta.name}</span>
        <span className="font-mono text-[11px] text-cream/60">jistota {Math.round(email.result.confidence * 100)} %</span>
        <span className="ml-auto font-mono text-[11px] text-cream/50">{email.from}</span>
      </div>
      <p className="mt-2 text-sm font-semibold">{email.subject}</p>
      <p className="mt-1 text-sm text-cream/80">
        <span className="text-paper">Proč: </span>
        {email.result.reason}
      </p>
    </motion.div>
  );
}

function Summary() {
  const count = (c: EmailCategory) => demoEmails.filter((e) => e.result.category === c).length;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-cream-2/70 px-4 py-3 font-mono text-[11px] text-ink-2 sm:px-5"
    >
      <span>
        <b className="text-rust-deep">{count("akce_nutna")}</b> vyžaduje akci
      </span>
      <span>
        <b>{count("podezrele")}</b> podezřelé
      </span>
      <span>
        <b>{count("dulezite_info")}</b> k založení
      </span>
      <span>
        <b>{count("k_precteni") + count("nepodstatne")}</b> na později nebo smazat
      </span>
      <span className="ml-auto text-ink-3">2 volání · dávky po 10 · schéma vynucené přes API</span>
    </motion.div>
  );
}
