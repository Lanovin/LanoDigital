import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, FileText, Search } from "lucide-react";
import { Showreel, type Reel } from "@/components/weby/Showreel";
import { WebBuilder } from "@/components/weby/WebBuilder";
import { Packages } from "@/components/weby/Packages";
import { WebPreview, findShot } from "@/components/weby/WebCard";
import { Reveal, RichText, SectionHeading } from "@/components/site/Section";
import { getContent } from "@/content/store";

const SYSTEM_ICONS = { "trideni-mailu": Mail, "cteni-dokladu": FileText, "hledani-inzeratu": Search } as const;

/** Pořadí webů v úvodní přehlídce: nejdřív to, co nejvíc ukáže. */
const REEL_ORDER = ["vinylpodlahy", "mikaauto", "cargent", "lanovin"];

export default async function HomePage() {
  const { home, systems, weby, sluzby, site } = await getContent();

  const reel: Reel[] = [...weby]
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map((w) => ({
      slug: w.slug,
      name: w.name,
      kind: w.kind,
      url: w.url,
      display: w.display,
      desktop: findShot(`${w.slug}-full`) ?? findShot(w.slug),
      mobile: findShot(`${w.slug}-mobile`),
    }));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative">
        <div className="container-x grid gap-12 pt-8 sm:pt-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <h1 className="text-[2.35rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-[3.6rem]">
                <RichText text={home.heroTitle} />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">{home.heroLead}</p>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#weby" className="btn btn-ink">
                {home.heroPrimary} <ArrowRight className="size-4" />
              </a>
              <Link href={site.cta.href} className="btn btn-cream">
                {home.heroSecondary}
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Showreel items={reel} />
          </Reveal>
        </div>

        {/* běžící pás */}
        <div className="mt-16 overflow-hidden border-y border-line bg-cream/40 py-3 sm:mt-20">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-ink-2">
            {[...home.marquee, ...home.marquee].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                {t} <span className="size-1.5 rounded-full bg-rust" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOTOVÉ WEBY ──────────────────────────────────────── */}
      <section id="weby" className="container-x scroll-mt-24 pt-20 sm:pt-28">
        <SectionHeading eyebrow={home.webyEyebrow} title={home.webyTitle} lead={home.webyLead} />
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {weby.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 0.1}>
              <WebPreview web={w} note={false} />
              <div className="mt-5 flex gap-4">
                <span className="font-mono text-xs leading-7 text-rust-deep">0{i + 1}</span>
                <div className="min-w-0">
                  <p className="eyebrow">{w.kind}</p>
                  <h3 className="mt-1 text-2xl font-bold">{w.name}</h3>
                  <p className="mt-1.5 text-ink-2">{w.short}</p>
                  <Link href={`/weby#${w.slug}`} className="prose-link mt-2 inline-block text-sm font-semibold">
                    {home.webyDetailLabel}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link href="/weby" className="prose-link font-semibold">
            {home.webyMore}
          </Link>
        </Reveal>
      </section>

      {/* ── JAK VZNIKÁ WEB ───────────────────────────────────── */}
      <section id="jak-vznika-web" className="container-x scroll-mt-24 pt-24 sm:pt-32">
        <SectionHeading eyebrow={home.buildEyebrow} title={home.buildTitle} lead={home.buildLead} />
        <Reveal className="mt-12">
          <WebBuilder steps={home.buildSteps} />
        </Reveal>
      </section>

      {/* ── BALÍČKY ──────────────────────────────────────────── */}
      <section id="balicky" className="container-x scroll-mt-24 pt-24 sm:pt-32">
        <SectionHeading eyebrow={sluzby.packagesEyebrow} title={sluzby.packagesTitle} lead={sluzby.packagesLead} />
        <div className="mt-12">
          <Packages sluzby={sluzby} weby={weby} />
        </div>
      </section>

      {/* ── AI SYSTÉMY (menší sekce) ─────────────────────────── */}
      <section id="systemy" className="container-x scroll-mt-24 pt-24 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow={home.systemsEyebrow} title={home.systemsTitle} lead={home.systemsLead} />
          <Reveal delay={0.08} className="self-end">
            <ul className="border-t border-line-strong">
              {systems.map((s) => {
                const Icon = SYSTEM_ICONS[s.slug] ?? Search;
                return (
                  <li key={s.slug} className="border-b border-line-strong">
                    <Link
                      href={`/systemy/${s.slug}`}
                      className="group flex items-center gap-4 py-4 transition-colors hover:bg-cream/40 sm:px-2"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center border border-line-strong bg-cream">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg font-bold">{s.name}</span>
                        <span className="block text-sm text-ink-2">{s.short}</span>
                      </span>
                      <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ink-2 group-hover:text-rust-deep sm:inline-flex">
                        {home.systemsDetailLabel} <ArrowUpRight className="size-4" />
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 sm:hidden" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/systemy" className="btn btn-cream mt-6">
              {home.systemsButton} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── O MNĚ (upoutávka) ─────────────────────────────────── */}
      <section className="container-x pt-24 sm:pt-32">
        <Reveal className="card-ink px-6 py-10 sm:px-12 sm:py-14">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="eyebrow !text-paper">{home.aboutEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold text-cream sm:text-4xl">
                <RichText text={home.aboutTitle} />
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

function rank(slug: string) {
  const i = REEL_ORDER.indexOf(slug);
  return i === -1 ? REEL_ORDER.length : i;
}
