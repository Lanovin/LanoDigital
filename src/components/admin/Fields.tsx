"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, GripVertical, Plus, RotateCcw, Trash2, Lock } from "lucide-react";
import { fallbackLabel, fieldConfig, itemTitle, type FieldConfig } from "@/content/labels";

export type Path = (string | number)[];
export type Change = (path: Path, value: unknown) => void;

type Common = {
  value: unknown;
  fallback: unknown;
  path: Path;
  onChange: Change;
  filter: string;
};

/* ─── pomocné ─────────────────────────────────────────────────────── */

export function atPath(root: unknown, path: Path): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string | number, unknown>)[key];
  }, root);
}

/** Nová prázdná položka podle vzoru: texty prázdné, struktura zachovaná. */
export function blankLike(sample: unknown): unknown {
  if (Array.isArray(sample)) return sample.length ? [blankLike(sample[0])] : [];
  if (sample && typeof sample === "object") {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blankLike(v)]));
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Sedí na hledaný výraz cokoli v téhle části obsahu? */
export function subtreeMatches(value: unknown, path: Path, filter: string): boolean {
  if (!filter) return true;
  const q = norm(filter);
  const cfg = fieldConfig(path);
  const label = cfg.label ?? fallbackLabel(String(path[path.length - 1] ?? ""));
  if (norm(label).includes(q)) return true;
  if (typeof value === "string") return norm(value).includes(q);
  if (typeof value === "number" || typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.some((v, i) => subtreeMatches(v, [...path, i], filter));
  if (value && typeof value === "object") {
    return Object.entries(value).some(([k, v]) => subtreeMatches(v, [...path, k], filter));
  }
  return false;
}

/* ─── jedno pole ──────────────────────────────────────────────────── */

const inputCls =
  "w-full border border-line-strong bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10";

function Label({
  path,
  cfg,
  changed,
  onReset,
}: {
  path: Path;
  cfg: FieldConfig;
  changed: boolean;
  onReset: () => void;
}) {
  const label = cfg.label ?? fallbackLabel(String(path[path.length - 1] ?? ""));
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {cfg.kind === "locked" && (
        <span className="inline-flex items-center gap-1 border border-line-strong px-1.5 py-px font-mono text-[10px] text-ink-3">
          <Lock className="size-3" /> mění se v kódu
        </span>
      )}
      {changed && (
        <button
          type="button"
          onClick={onReset}
          title="Vrátit na původní text"
          className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-ink-3 hover:text-rust-deep"
        >
          <RotateCcw className="size-3" /> původní
        </button>
      )}
    </div>
  );
}

function Leaf({ value, fallback, path, onChange }: Omit<Common, "filter">) {
  const cfg = fieldConfig(path);
  const changed = JSON.stringify(value) !== JSON.stringify(fallback);
  const reset = () => onChange(path, fallback);
  const hint = cfg.hint;

  if (typeof value === "boolean") {
    return (
      <div className="py-2">
        <Label path={path} cfg={cfg} changed={changed} onReset={reset} />
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(path, e.target.checked)}
            className="size-4 accent-[var(--rust)]"
          />
          {value ? "zapnuto" : "vypnuto"}
        </label>
        {hint && <p className="mt-1 text-xs text-ink-3">{hint}</p>}
      </div>
    );
  }

  const text = String(value ?? "");

  return (
    <div className="py-2">
      <Label path={path} cfg={cfg} changed={changed} onReset={reset} />
      {cfg.kind === "select" ? (
        <select value={text} onChange={(e) => onChange(path, e.target.value)} className={inputCls}>
          {(cfg.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : cfg.kind === "color" ? (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={/^#[0-9a-f]{6}$/i.test(text) ? text : "#000000"}
            onChange={(e) => onChange(path, e.target.value)}
            className="size-9 cursor-pointer border border-line-strong bg-white"
          />
          <input value={text} onChange={(e) => onChange(path, e.target.value)} className={`${inputCls} font-mono`} />
        </div>
      ) : cfg.kind === "locked" ? (
        <input value={text} readOnly disabled className={`${inputCls} cursor-not-allowed bg-cream-2 text-ink-3`} />
      ) : cfg.kind === "long" || text.length > 80 ? (
        <textarea
          value={text}
          rows={Math.min(8, Math.max(2, Math.ceil(text.length / 70) + 1))}
          onChange={(e) => onChange(path, e.target.value)}
          className={`${inputCls} resize-y leading-relaxed`}
        />
      ) : (
        <input value={text} onChange={(e) => onChange(path, e.target.value)} className={inputCls} />
      )}
      {hint && <p className="mt-1 text-xs text-ink-3">{hint}</p>}
    </div>
  );
}

/* ─── seznam textů ────────────────────────────────────────────────── */

function StringList({ value, fallback, path, onChange }: Omit<Common, "filter">) {
  const items = value as string[];
  const cfg = fieldConfig(path);
  const label = cfg.label ?? fallbackLabel(String(path[path.length - 1] ?? ""));
  const changed = JSON.stringify(value) !== JSON.stringify(fallback);

  const set = (next: string[]) => onChange(path, next);
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };

  return (
    <div className="py-3">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="font-mono text-[10px] text-ink-3">{items.length}</span>
        {changed && (
          <button
            type="button"
            onClick={() => onChange(path, fallback)}
            className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-ink-3 hover:text-rust-deep"
          >
            <RotateCcw className="size-3" /> původní
          </button>
        )}
      </div>
      {cfg.hint && <p className="mb-2 text-xs text-ink-3">{cfg.hint}</p>}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                set(next);
              }}
              className={inputCls}
            />
            <div className="flex shrink-0">
              <IconBtn title="Nahoru" onClick={() => move(i, -1)} disabled={i === 0}>
                <ChevronUp className="size-3.5" />
              </IconBtn>
              <IconBtn title="Dolů" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
                <ChevronDown className="size-3.5" />
              </IconBtn>
              <IconBtn title="Smazat" onClick={() => set(items.filter((_, j) => j !== i))} danger>
                <Trash2 className="size-3.5" />
              </IconBtn>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => set([...items, ""])}
        className="mt-2 inline-flex items-center gap-1.5 border border-line-strong bg-cream px-2.5 py-1.5 text-xs font-semibold hover:bg-white"
      >
        <Plus className="size-3.5" /> Přidat
      </button>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex size-8 items-center justify-center border border-line-strong bg-cream transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 ${
        danger ? "hover:text-rust-deep" : ""
      } -ml-px first:ml-0`}
    >
      {children}
    </button>
  );
}

/* ─── seznam bloků ────────────────────────────────────────────────── */

function ObjectList({ value, fallback, path, onChange, filter }: Common) {
  const items = value as unknown[];
  const cfg = fieldConfig(path);
  const label = cfg.label ?? fallbackLabel(String(path[path.length - 1] ?? ""));
  const [open, setOpen] = useState<number | null>(items.length === 1 ? 0 : null);
  // Když je seznam celou sekcí, nadpis už je v hlavičce stránky.
  const heading = path.length > 1;
  const fixed = cfg.fixed === true;

  const set = (next: unknown[]) => onChange(path, next);
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
    setOpen(j);
  };

  const template = (fallback as unknown[])?.[0] ?? items[0];

  return (
    <section className="py-3">
      {heading && (
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-display text-lg font-bold text-ink">{label}</h3>
          <span className="font-mono text-[10px] text-ink-3">{items.length}</span>
        </div>
      )}
      {cfg.hint && <p className="mb-2 text-xs text-ink-3">{cfg.hint}</p>}

      <ul className="space-y-2">
        {items.map((item, i) => {
          if (!subtreeMatches(item, [...path, i], filter)) return null;
          const expanded = open === i || Boolean(filter);
          return (
            <li key={i} className="border border-line-strong bg-cream">
              <div className="flex items-center gap-2 px-3 py-2">
                <GripVertical className="size-4 shrink-0 text-ink-3" />
                <button
                  type="button"
                  onClick={() => setOpen(expanded && !filter ? null : i)}
                  className="flex-1 truncate text-left text-sm font-semibold text-ink"
                >
                  {itemTitle(item, i)}
                </button>
                <div className="flex shrink-0">
                  <IconBtn title="Nahoru" onClick={() => move(i, -1)} disabled={i === 0}>
                    <ChevronUp className="size-3.5" />
                  </IconBtn>
                  <IconBtn title="Dolů" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
                    <ChevronDown className="size-3.5" />
                  </IconBtn>
                  {!fixed && (
                    <IconBtn
                      title="Smazat celou položku"
                      danger
                      onClick={() => {
                        if (confirm(`Smazat „${itemTitle(item, i)}“?`)) set(items.filter((_, j) => j !== i));
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </IconBtn>
                  )}
                </div>
              </div>
              {expanded && (
                <div className="border-t border-line bg-white/60 px-4 py-2">
                  <Node
                    value={item}
                    fallback={(fallback as unknown[])?.[i] ?? blankLike(template)}
                    path={[...path, i]}
                    onChange={onChange}
                    filter={filter}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {template !== undefined && !fixed && (
        <button
          type="button"
          onClick={() => {
            set([...items, blankLike(template)]);
            setOpen(items.length);
          }}
          className="mt-2 inline-flex items-center gap-1.5 border border-line-strong bg-cream px-2.5 py-1.5 text-xs font-semibold hover:bg-white"
        >
          <Plus className="size-3.5" /> Přidat položku
        </button>
      )}
    </section>
  );
}

/* ─── rozcestník podle typu hodnoty ───────────────────────────────── */

export function Node({ value, fallback, path, onChange, filter }: Common) {
  if (!subtreeMatches(value, path, filter)) return null;

  if (Array.isArray(value)) {
    const strings = value.every((v) => typeof v === "string");
    return strings ? (
      <StringList value={value} fallback={fallback} path={path} onChange={onChange} />
    ) : (
      <ObjectList value={value} fallback={fallback} path={path} onChange={onChange} filter={filter} />
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const isNested = path.length > 1;
    const cfg = fieldConfig(path);
    const label = cfg.label ?? fallbackLabel(String(path[path.length - 1] ?? ""));
    const body = (
      <div className={isNested ? "" : "space-y-1"}>
        {entries.map(([k, v]) => (
          <Node
            key={k}
            value={v}
            fallback={(fallback as Record<string, unknown>)?.[k]}
            path={[...path, k]}
            onChange={onChange}
            filter={filter}
          />
        ))}
      </div>
    );
    // vnořený objekt (např. kontaktní údaje) dostane rámeček s názvem
    if (isNested && typeof path[path.length - 1] === "string") {
      return (
        <fieldset className="my-2 border border-line px-3 pb-2">
          <legend className="px-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">{label}</legend>
          {body}
        </fieldset>
      );
    }
    return body;
  }

  return <Leaf value={value} fallback={fallback} path={path} onChange={onChange} />;
}
