"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";
import { Mail, Bot, ShieldCheck, Table2, FileText, BellRing, CalendarClock, RotateCcw } from "lucide-react";

type NodeKind = "trigger" | "model" | "code" | "output";

type FlowNode = {
  id: string;
  kind: NodeKind;
  title: string;
  sub: string;
  icon: ComponentType<{ className?: string }>;
};

type Edge = { from: string; to: string; label?: string; dashed?: boolean };

const NODES: FlowNode[] = [
  { id: "in", kind: "trigger", title: "Přijde vstup", sub: "e-mail · doklad · poptávka", icon: Mail },
  { id: "ai", kind: "model", title: "AI agent", sub: "přečte, pochopí, strukturuje", icon: Bot },
  { id: "code", kind: "code", title: "Kód ověří", sub: "schéma · aritmetika · kontrolní součty", icon: ShieldCheck },
  { id: "o1", kind: "output", title: "Tabulka", sub: "CSV pro účetní", icon: Table2 },
  { id: "o2", kind: "output", title: "Report", sub: "HTML s důvody", icon: FileText },
  { id: "o3", kind: "output", title: "Upozornění", sub: "co nesedí, co zaplatit", icon: BellRing },
  { id: "o4", kind: "output", title: "Kalendář", sub: "splatnosti, termíny", icon: CalendarClock },
];

const EDGES: Edge[] = [
  { from: "in", to: "ai" },
  { from: "ai", to: "code" },
  { from: "code", to: "ai", label: "nesedí? zeptá se znovu", dashed: true },
  { from: "code", to: "o1" },
  { from: "code", to: "o2" },
  { from: "code", to: "o3" },
  { from: "code", to: "o4" },
];

const KIND_STYLE: Record<NodeKind, { box: string; icon: string; tag: string }> = {
  trigger: { box: "bg-cream border-line-strong", icon: "bg-paper text-ink", tag: "spouštěč" },
  model: { box: "bg-ink text-cream border-ink", icon: "bg-rust text-cream", tag: "Claude" },
  code: { box: "bg-cream border-line-strong", icon: "bg-moss text-cream", tag: "čistý kód" },
  output: { box: "bg-cream border-line-strong", icon: "bg-sky text-cream", tag: "výstup" },
};

type Path = { d: string; label?: string; dashed?: boolean; lx: number; ly: number; vertical?: boolean };

export function FlowDiagram() {
  const wrap = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = () => {
    const root = wrap.current;
    if (!root) return;
    const rb = root.getBoundingClientRect();
    const rect = (id: string) => {
      const el = root.querySelector<HTMLElement>(`[data-node="${id}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left - rb.left, top: r.top - rb.top, right: r.right - rb.left, bottom: r.bottom - rb.top, w: r.width, h: r.height };
    };
    const out: Path[] = [];
    for (const e of EDGES) {
      const a = rect(e.from);
      const b = rect(e.to);
      if (!a || !b) continue;
      const horizontal = b.left >= a.right - 8 || a.left >= b.right - 8;
      // Ve svislém rozložení jsou výstupy pod sebou v jednom rámečku –
      // kreslí se jen jedna šipka do skupiny, ne řetěz mezi výstupy.
      if (!horizontal && e.to.startsWith("o") && e.to !== "o1") continue;
      let d = "";
      let lx = 0;
      let ly = 0;
      if (e.dashed) {
        // zpětná smyčka: oblouk pod uzly
        if (horizontal) {
          const sx = a.left + a.w * 0.5, sy = a.bottom;
          const tx = b.left + b.w * 0.5, ty = b.bottom;
          const dip = Math.max(a.bottom, b.bottom) + 44;
          d = `M ${sx} ${sy} C ${sx} ${dip}, ${tx} ${dip}, ${tx} ${ty}`;
          lx = (sx + tx) / 2;
          ly = dip - 6;
        } else {
          const sx = a.right, sy = a.top + a.h * 0.5;
          const tx = b.right, ty = b.top + b.h * 0.5;
          const bulge = Math.max(a.right, b.right) + 22;
          d = `M ${sx} ${sy} C ${bulge} ${sy}, ${bulge} ${ty}, ${tx} ${ty}`;
          lx = bulge + 8;
          ly = (sy + ty) / 2;
        }
      } else if (horizontal) {
        const forward = b.left >= a.right - 8;
        const sx = forward ? a.right : a.left, sy = a.top + a.h / 2;
        const tx = forward ? b.left : b.right, ty = b.top + b.h / 2;
        const dx = (tx - sx) * 0.5;
        d = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
      } else {
        const sx = a.left + a.w / 2, sy = a.bottom;
        const tx = b.left + b.w / 2, ty = b.top;
        const dy = (ty - sy) * 0.5;
        d = `M ${sx} ${sy} C ${sx} ${sy + dy}, ${tx} ${ty - dy}, ${tx} ${ty}`;
      }
      out.push({ d, label: e.label, dashed: e.dashed, lx, ly, vertical: !horizontal });
    }
    setPaths(out);
    setSize({ w: rb.width, h: rb.height });
  };

  useLayoutEffect(measure, []);
  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // po načtení fontů
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const main = NODES.filter((n) => n.kind !== "output");
  const outputs = NODES.filter((n) => n.kind === "output");

  return (
    <div ref={wrap} className="relative pb-14 md:pb-16">
      <svg
        className="pointer-events-none absolute inset-0 overflow-visible"
        width={size.w || "100%"}
        height={size.h || "100%"}
        aria-hidden
      >
        <defs>
          <marker id="fd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" />
          </marker>
        </defs>
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="none" stroke="var(--ink)" strokeOpacity={p.dashed ? 0.35 : 0.28} strokeWidth="2" markerEnd="url(#fd-arrow)" strokeDasharray={p.dashed ? "5 6" : undefined} />
            {!p.dashed && (
              <path d={p.d} fill="none" stroke="var(--rust)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 14" className="animate-dash" />
            )}
            {p.label && (
              <text
                x={p.lx}
                y={p.ly}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--rust-deep)"
                letterSpacing="0.5"
                transform={p.vertical ? `rotate(-90 ${p.lx} ${p.ly})` : undefined}
                dominantBaseline={p.vertical ? "hanging" : undefined}
              >
                {p.vertical ? "nesedí? znovu" : p.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="grid gap-x-10 gap-y-12 md:grid-cols-[1fr_1fr_1fr_1.1fr] md:items-center">
        {main.map((n) => (
          <div key={n.id} className="flex justify-center md:block">
            <NodeCard node={n} />
          </div>
        ))}
        <div className="relative mx-auto grid w-full max-w-[19rem] gap-4 rounded-3xl border border-dashed border-line-strong p-3 pt-5 md:max-w-none md:border-0 md:p-0">
          <span className="absolute -top-2.5 left-4 rounded-full bg-cream px-2 font-mono text-[10px] uppercase tracking-wider text-ink-3 md:hidden">
            výstupy
          </span>
          {outputs.map((n) => (
            <NodeCard key={n.id} node={n} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function NodeCard({ node, compact = false }: { node: FlowNode; compact?: boolean }) {
  const s = KIND_STYLE[node.kind];
  const Icon = node.icon;
  return (
    <div
      data-node={node.id}
      className={`relative w-full max-w-[17rem] rounded-2xl border shadow-[var(--shadow-card)] ${s.box} ${compact ? "px-4 py-3" : "px-5 py-4"}`}
    >
      <div className="flex items-center gap-3">
        <span className={`inline-flex ${compact ? "size-9" : "size-11"} shrink-0 items-center justify-center rounded-xl ${s.icon}`}>
          <Icon className={compact ? "size-4" : "size-5"} />
        </span>
        <div className="min-w-0">
          <p className={`font-display font-bold leading-tight ${compact ? "text-[0.98rem]" : "text-lg"}`}>{node.title}</p>
          <p className={`text-xs leading-snug ${node.kind === "model" ? "text-cream/70" : "text-ink-3"}`}>{node.sub}</p>
        </div>
      </div>
      <span
        className={`absolute -top-2.5 right-3 mono-tag !py-[1px] ${
          node.kind === "model" ? "bg-rust border-rust text-cream" : "bg-paper border-line-strong"
        }`}
      >
        {s.tag}
      </span>
      {node.kind === "code" && (
        <span className="absolute -bottom-3 left-4 inline-flex items-center gap-1 rounded-full bg-paper px-2 py-[2px] font-mono text-[10px] text-ink-2">
          <RotateCcw className="size-3" /> 1 opravný pokus
        </span>
      )}
      {node.kind === "model" && (
        <span aria-hidden className="absolute -left-1 top-1/2 size-2 -translate-y-1/2 rounded-full bg-paper animate-blink" />
      )}
    </div>
  );
}
