import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Package } from "lucide-react";
import { Reveal, RichText, SectionHeading } from "@/components/site/Section";
import { EmailSorterDemo } from "@/components/demos/EmailSorterDemo";
import { InvoiceReaderDemo } from "@/components/demos/InvoiceReaderDemo";
import { CarFinderDemo } from "@/components/demos/CarFinderDemo";
import { getContent } from "@/content/store";
import { DEFAULT_CONTENT } from "@/content/defaults";

const DEMO = {
  "trideni-mailu": EmailSorterDemo,
  "cteni-dokladu": InvoiceReaderDemo,
  "hledani-inzeratu": CarFinderDemo,
} as const;

const WHO = {
  vstup: { cls: "bg-paper text-ink", label: "vstup" },
  model: { cls: "bg-rust text-cream", label: "AI model" },
  kod: { cls: "bg-moss text-cream", label: "kód" },
  vystup: { cls: "bg-sky text-cream", label: "výstup" },
} as const;

type Params = { slug: string };

/** Adresy se berou z výchozího obsahu — jsou navázané na ukázky v kódu. */
export function generateStaticParams(): Params[] {
  return DEFAULT_CONTENT.systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = (await getContent()).systems.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.short } : {};
}

export default async function SystemDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { systems, systemDetail } = await getContent();
  const s = systems.find((x) => x.slug === slug);
  if (!s) notFound();

  const Demo = DEMO[s.slug];
  const idx = systems.findIndex((x) => x.slug === s.slug);
  const next = systems[(idx + 1) % systems.length];

  return (
    <div className="container-x pt-10 sm:pt-16">
      <Link href="/systemy" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
        <ArrowLeft className="size-4" /> {systemDetail.backLabel}
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <SectionHeading eyebrow={`${systemDetail.systemLabel} 0${idx + 1}`} title={s.name} lead={s.pitch} />
        {s.metricValue && (
          <Reveal className="card px-6 py-5">
            <span className="font-display text-4xl font-bold text-rust">{s.metricValue}</span>
            <span className="mt-1 block text-sm text-ink-2">{s.metricLabel}</span>
          </Reveal>
        )}
      </div>

      {/* tok dat */}
      <Reveal className="mt-12">
        <ol className="grid gap-3 md:grid-cols-4">
          {s.steps.map((st, i) => (
            <li key={st.label} className="relative rounded-2xl border border-line bg-cream/70 p-4">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${WHO[st.who].cls}`}>
                  {WHO[st.who].label}
                </span>
                <span className="font-mono text-[10px] text-ink-3">
                  {systemDetail.stepLabel} {i + 1}
                </span>
              </div>
              <p className="mt-2 text-lg font-bold leading-tight">{st.label}</p>
              <p className="text-sm text-ink-3">{st.note}</p>
              {i < s.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-cream md:inline-flex"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      {/* ukázka */}
      {Demo && (
        <section className="pt-16">
          <SectionHeading eyebrow={systemDetail.demoEyebrow} title={systemDetail.demoTitle} lead={systemDetail.demoLead} />
          <Reveal className="mt-8">
            <Demo />
          </Reveal>
        </section>
      )}

      {/* pro koho + zajímavosti */}
      <section className="grid gap-8 pt-20 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow">{systemDetail.forWhomLabel}</p>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">{s.forWhom}</p>
          <div className="mt-6 space-y-5">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                <Package className="size-3.5" /> {systemDetail.outputsLabel}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {s.outputs.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-rust">•</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                <ShieldCheck className="size-3.5" /> {systemDetail.safetyLabel}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {s.safety.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-moss">•</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">{systemDetail.insightsLabel}</p>
          </Reveal>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {s.insights.map((ins, i) => (
              <Reveal key={ins.title} delay={i * 0.06} className="card p-5">
                <h3 className="text-lg font-bold leading-tight">{ins.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{ins.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20">
        <Reveal className="card-ink flex flex-col items-start gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="eyebrow !text-paper">{systemDetail.ctaEyebrow}</p>
            <p className="mt-2 text-2xl font-bold text-cream">
              <RichText text={systemDetail.ctaTitle} highlight="text-paper" />
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-rust">
              {systemDetail.ctaButton} <ArrowUpRight className="size-4" />
            </Link>
            {next && next.slug !== s.slug && (
              <Link href={`/systemy/${next.slug}`} className="btn btn-cream">
                {systemDetail.nextPrefix} {next.name}
              </Link>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
