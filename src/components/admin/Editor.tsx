"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Check,
  Database,
  ExternalLink,
  FileJson,
  Loader2,
  LogOut,
  RotateCcw,
  Save,
  Search,
} from "lucide-react";
import { SECTIONS } from "@/content/labels";
import type { Content } from "@/content/schema";
import { Node, type Path } from "./Fields";

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; at: string }
  | { kind: "error"; message: string };

export type Uloziste = {
  driver: "supabase" | "file";
  ok: boolean;
  detail: string;
  ulozeno: boolean;
  zmeneno: string | null;
};

/** Po jak dlouhém tichu se uloží samo. */
const AUTOSAVE_MS = 1500;

function setIn(obj: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const next = [...obj];
    next[head as number] = setIn(next[head as number], rest, value);
    return next;
  }
  const src = (obj ?? {}) as Record<string, unknown>;
  return { ...src, [head]: setIn(src[head as string], rest, value) };
}

export function Editor({
  initial,
  defaults,
  uloziste,
}: {
  initial: Content;
  defaults: Content;
  uloziste: Uloziste;
}) {
  const router = useRouter();
  const [content, setContent] = useState<Content>(initial);
  const [saved, setSaved] = useState<Content>(initial);
  const [section, setSection] = useState<keyof Content>("site");
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [autosave, setAutosave] = useState(true);

  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(saved), [content, saved]);

  const change = useCallback((path: Path, value: unknown) => {
    setContent((c) => setIn(c, path, value) as Content);
  }, []);

  // Ukládá se předaný snímek a za "hotovo" se označí právě on — ne odpověď
  // serveru. Kdyby se stav přepsal odpovědí, ztratila by se písmena napsaná
  // během ukládání.
  const save = useCallback(async (snapshot: Content) => {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: snapshot }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Uložení se nepovedlo.");
      setSaved(snapshot);
      setStatus({ kind: "saved", at: new Date().toLocaleTimeString("cs-CZ") });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Uložení se nepovedlo." });
    }
  }, []);

  const resetAll = useCallback(async () => {
    if (!confirm("Opravdu vrátit všechny texty na původní znění? Uložené změny se smažou.")) return;
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/content", { method: "DELETE" });
      const json = (await res.json()) as { ok: boolean; content?: Content; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Nepovedlo se.");
      setContent(json.content ?? defaults);
      setSaved(json.content ?? defaults);
      setStatus({ kind: "saved", at: new Date().toLocaleTimeString("cs-CZ") });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Nepovedlo se." });
    }
  }, [defaults]);

  // Automatické ukládání: chvíli po posledním ťuknutí do klávesnice.
  useEffect(() => {
    if (!autosave || !dirty || status.kind === "saving") return;
    const t = setTimeout(() => void save(content), AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [content, autosave, dirty, status.kind, save]);

  // Ctrl+S ukládá hned, i když je automatika vypnutá.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty) void save(content);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [content, dirty, save]);

  // Pojistka proti zavření karty s neuloženými změnami.
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const current = SECTIONS.find((s) => s.key === section)!;

  return (
    <div className="min-h-dvh bg-paper">
      {/* horní lišta */}
      <header className="sticky top-0 z-20 border-b border-line-strong bg-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-ink">
              Lano<span className="text-rust">Digital</span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-3">administrace</span>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <StatusChip status={status} dirty={dirty} autosave={autosave} />
            <a
              href={current.preview}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-line-strong bg-cream px-3 py-2 text-sm font-semibold hover:bg-white"
            >
              <ExternalLink className="size-4" /> Zobrazit web
            </a>
            <button
              type="button"
              onClick={() => void save(content)}
              disabled={!dirty || status.kind === "saving"}
              className="inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-rust-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status.kind === "saving" ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Uložit
            </button>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.replace("/admin/login");
                router.refresh();
              }}
              title="Odhlásit"
              className="inline-flex size-9 items-center justify-center border border-line-strong bg-cream hover:bg-white"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {!uloziste.ok && (
        <div className="border-b border-rust/30 bg-rust/10">
          <p className="mx-auto flex max-w-7xl items-start gap-2 px-4 py-3 text-sm text-rust-deep">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>
              <b>Úložiště nefunguje.</b> {uloziste.detail} Do té doby se změny neuloží.
            </span>
          </p>
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[15rem_1fr]">
        {/* levý sloupec */}
        <aside className="md:sticky md:top-20 md:self-start">
          <nav className="border border-line-strong bg-cream">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSection(s.key)}
                className={`flex w-full items-center justify-between gap-2 border-b border-line px-3 py-2.5 text-left text-sm last:border-b-0 ${
                  s.key === section ? "bg-ink font-semibold text-cream" : "hover:bg-white"
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>

          <label className="mt-3 flex cursor-pointer items-center gap-2 border border-line-strong bg-cream px-3 py-2 text-xs font-semibold text-ink-2">
            <input
              type="checkbox"
              checked={autosave}
              onChange={(e) => setAutosave(e.target.checked)}
              className="size-4 accent-[var(--rust)]"
            />
            Ukládat automaticky
          </label>

          <button
            type="button"
            onClick={() => void resetAll()}
            className="mt-2 inline-flex w-full items-center justify-center gap-1.5 border border-line-strong bg-cream px-3 py-2 text-xs font-semibold text-ink-2 hover:bg-white hover:text-rust-deep"
          >
            <RotateCcw className="size-3.5" /> Vrátit vše na původní
          </button>

          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-ink-3">
            {uloziste.driver === "supabase" ? (
              <Database className="mt-0.5 size-3.5 shrink-0" />
            ) : (
              <FileJson className="mt-0.5 size-3.5 shrink-0" />
            )}
            <span>
              {uloziste.driver === "supabase" ? (
                <>
                  Ukládá se do <b>databáze Supabase</b>. Změny se na webu projeví hned po uložení.
                </>
              ) : (
                <>
                  Ukládá se do souboru <code className="font-mono">content/site.json</code>. Na nasazeném webu
                  nastavte Supabase, jinak se změny neuloží.
                </>
              )}
            </span>
          </p>
        </aside>

        {/* editor */}
        <main className="min-w-0">
          <div className="border border-line-strong bg-cream px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-ink">{current.title}</h1>
                <p className="mt-1 text-sm text-ink-2">{current.hint}</p>
              </div>
              <label className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Hledat v této části…"
                  className="w-56 border border-line-strong bg-white py-2 pl-8 pr-3 text-sm outline-none focus:border-ink"
                />
              </label>
            </div>

            <div className="pt-2">
              <Node
                value={content[section]}
                fallback={defaults[section]}
                path={[section]}
                onChange={change}
                filter={filter}
              />
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink-3">
            Nadpisy: nový řádek se zalomí. Ukázková data tří dem (maily, doklady, inzeráty) se tady needitují, jsou to vstupy pro výpočet,
            ne texty webu.
          </p>
        </main>
      </div>
    </div>
  );
}

function StatusChip({ status, dirty, autosave }: { status: Status; dirty: boolean; autosave: boolean }) {
  if (status.kind === "error") {
    return (
      <span className="inline-flex max-w-md items-start gap-1.5 bg-rust/10 px-2.5 py-1.5 text-xs leading-snug text-rust-deep">
        <AlertCircle className="mt-px size-3.5 shrink-0" /> {status.message}
      </span>
    );
  }
  if (status.kind === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 font-mono text-[11px] text-ink-2">
        <Loader2 className="size-3.5 animate-spin" /> ukládám…
      </span>
    );
  }
  if (dirty) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 font-mono text-[11px] text-rust-deep">
        <span className="size-1.5 rounded-full bg-rust" />
        {autosave ? "ukládá se za okamžik" : "neuložené změny"}
      </span>
    );
  }
  if (status.kind === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 font-mono text-[11px] text-moss">
        <Check className="size-3.5" /> uloženo {status.at}
      </span>
    );
  }
  return null;
}
