import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RichText, SectionHeading } from "@/components/site/Section";
import { getContent } from "@/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getContent();
  return { title: about.metaTitle, description: about.metaDescription };
}

export default async function OMnePage() {
  const { about, site } = await getContent();

  return (
    <div className="container-x pt-12 sm:pt-20">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-start">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

        <Reveal delay={0.1} className="card-ink p-6 sm:p-8">
          <div className="flex size-24 items-center justify-center bg-paper font-display text-4xl font-extrabold text-ink">
            {about.profileInitials}
          </div>
          <p className="mt-5 text-xl font-bold text-cream">{site.owner.name}</p>
          <p className="text-cream/70">
            {site.owner.role} · {site.owner.location}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {about.profileStats.map((s) => (
              <div key={s.label} className="border border-cream/20 p-3">
                <dt className="text-cream/50">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-paper">{s.value}</dd>
              </div>
            ))}
          </dl>
          <a href={`mailto:${site.owner.email}`} className="btn btn-cream mt-6 w-full justify-center">
            {about.profileButton}
          </a>
        </Reveal>
      </div>

      <section className="pt-20">
        <SectionHeading eyebrow={about.pathEyebrow} title={about.pathTitle} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {about.path.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="card p-6">
              <span className="font-mono text-xs text-rust-deep">{s.period}</span>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-20">
        <SectionHeading eyebrow={about.beliefsEyebrow} title={about.beliefsTitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {about.beliefs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06} className="rounded-2xl border border-line bg-cream/60 p-5">
              <h3 className="text-lg font-bold">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-20">
        <Reveal>
          <p className="eyebrow">{about.toolsLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {about.tools.map((t) => (
              <li key={t} className="rounded-full border border-line-strong bg-cream px-3 py-1.5 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="pt-20">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <RichText text={about.ctaTitle} />
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-2">{about.ctaText}</p>
          <Link href="/kontakt" className="btn btn-rust mt-6">
            {about.ctaButton} <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
