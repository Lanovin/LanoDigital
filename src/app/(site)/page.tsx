import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, FileText, Search, Sparkles } from "lucide-react";
import { MarbleRun } from "@/components/hero/MarbleRun";
import { FlowDiagram } from "@/components/flow/FlowDiagram";
import { EmailSorterDemo } from "@/components/demos/EmailSorterDemo";
import { InvoiceReaderDemo } from "@/components/demos/InvoiceReaderDemo";
import { CarFinderDemo } from "@/components/demos/CarFinderDemo";
import { WebPreview } from "@/components/weby/WebCard";
import { Reveal, RichText, SectionHeading } from "@/components/site/Section";
import { getContent } from "@/content/store";

const DEMOS = {
  "trideni-mailu": { anchor: "trideni", icon: Mail, Demo: EmailSorterDemo },
  "cteni-dokladu": { anchor: "doklady", icon: FileText, Demo: InvoiceReaderDemo },
  "hledani-inzeratu": { anchor: "inzeraty", icon: Search, Demo: CarFinderDemo },
} as const;

export default async function HomePage() {
  const { home, systems, weby, site } = await getContent();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-x relative pt-6 sm:pt-10">
          <Reveal>
            <MarbleRun className="mx-auto max-w-5xl" />
          </Reveal>

          <div className="mx-auto mt-6 max-w-4xl text-center sm:mt-10">
            <Reveal delay={0.1}>
              <p className="eyebrow">{home.heroEyebrow}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <h1 className="mt-4 text-[2.25rem] font-extrabold leading-[0.98] sm:text-6xl md:text-[4.6rem]">
                <RichText text={home.heroTitle} />
              </h1>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">{home.heroLead}</p>
            </Reveal>
            <Reveal delay={0.38} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#systemy" className="btn btn-ink">
                {home.heroPrimary} <ArrowRight className="size-4" />
              </a>
              <Link href={site.cta.href} className="btn btn-cream">
                {home.heroSecondary}
              </Link>
            </Reveal>
          </div>
        </div>

        {/* běžící pás */}
        <div className="mt-14 overflow-hidden border-y border-line bg-cream/40 py-3 sm:mt-20">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-ink-2">
            {[...home.marquee, ...home.marquee].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                {t} <span className="size-1.5 rounded-full bg-rust" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTÉMY ─────────────────────────────────────────── */}
      <section id="systemy" className="container-x scroll-mt-24 pt-20 sm:pt-28">
        <SectionHeading eyebrow={home.systemsEyebrow} title={home.systemsTitle} lead={home.systemsLead} />

        <div className="mt-12 space-y-20">
          {systems.map((s, i) => {
            const demo = DEMOS[s.slug];
            if (!demo) return null;
            const { anchor, icon: Icon, Demo } = demo;
            return (
              <div key={s.slug} id={anchor} className="scroll-mt-24">
                <Reveal className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-ink text-cream">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs text-ink-3">
                        0{i + 1} / 0{systems.length}
                      </span>
                    </div>
                    <h3 className="mt-3 text-3xl font-bold">{s.name}</h3>
                    <p className="mt-2 text-ink-2">{s.pitch}</p>
                  </div>
                  <Link href={`/systemy/${s.slug}`} className="btn btn-cream shrink-0">
                    {home.systemsDetailLabel} <ArrowUpRight className="size-4" />
                  </Link>
                </Reveal>
                <Reveal delay={0.1}>
                  <Demo />
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WEBY ─────────────────────────────────────────────── */}
      <section id="weby" className="container-x scroll-mt-24 pt-24 sm:pt-32">
        <SectionHeading eyebrow={home.webyEyebrow} title={home.webyTitle} lead={home.webyLead} />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {weby.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.1}>
              <WebPreview web={w} note={false} />
              <div className="mt-4">
                <p className="eyebrow">{w.kind}</p>
                <h3 className="mt-1 text-2xl font-bold">{w.name}</h3>
                <p className="mt-1.5 text-ink-2">{w.short}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <Link href="/weby" className="prose-link font-semibold">
            {home.webyMore}
          </Link>
        </Reveal>
      </section>

      {/* ── JAK TO FUNGUJE ───────────────────────────────────── */}
      <section id="jak-to-funguje" className="container-x scroll-mt-24 pt-24 sm:pt-32">
        <SectionHeading eyebrow={home.flowEyebrow} title={home.flowTitle} lead={home.flowLead} />
        <Reveal className="card mt-10 px-4 py-10 sm:px-8 sm:py-12">
          <FlowDiagram />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {home.flowCards.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="rounded-2xl border border-line bg-cream/60 p-5">
              <Sparkles className="size-5 text-rust" />
              <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── O MNĚ (upoutávka) ─────────────────────────────────── */}
      <section className="container-x pt-24 sm:pt-32">
        <Reveal className="card-ink px-6 py-10 sm:px-12 sm:py-14">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="eyebrow !text-paper">{home.aboutEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold text-cream sm:text-4xl">
                <RichText text={home.aboutTitle} highlight="text-paper" />
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/75">{home.aboutText}</p>
              <Link href="/o-mne" className="btn btn-cream mt-6">
                {home.aboutButton} <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {home.aboutStats.map((s) => (
                <li key={s.label} className="border border-cream/20 px-4 py-3">
                  <span className="font-display text-3xl font-bold text-paper">{s.value}</span>
                  <span className="block text-sm text-cream/70">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ── ZÁVĚREČNÁ VÝZVA ──────────────────────────────────── */}
      <section className="container-x pt-20 sm:pt-24">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            <RichText text={home.ctaTitle} />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-2">{home.ctaText}</p>
          <Link href="/kontakt" className="btn btn-rust mt-8 text-base">
            {home.ctaButton} <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
