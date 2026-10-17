import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Section";
import { WebPreview } from "@/components/weby/WebCard";
import { getContent } from "@/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const { webyPage } = await getContent();
  return { title: webyPage.metaTitle, description: webyPage.metaDescription };
}

export default async function WebyPage() {
  const { webyPage, weby } = await getContent();

  return (
    <div className="container-x pt-12 sm:pt-20">
      <SectionHeading title={webyPage.title} lead={webyPage.lead} />

      <div className="mt-12 space-y-16">
        {weby.map((w, i) => (
          <Reveal
            key={w.slug}
            as="article"
            id={w.slug}
            className={`grid scroll-mt-24 gap-8 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <WebPreview web={w} priority={i === 0} />
            <div>
              <p className="eyebrow">{w.kind}</p>
              <h2 className="mt-2 text-3xl font-bold">{w.name}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{w.description}</p>
              <ul className="mt-5 space-y-2">
                {w.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-moss" />
                    {h}
                  </li>
                ))}
              </ul>
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-6">
                {w.display} <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="pt-24">
        <SectionHeading title={webyPage.howTitle} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {webyPage.how.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="card p-6">
              <span className="font-mono text-xs text-rust-deep">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/kontakt" className="btn btn-rust">
            {webyPage.ctaButton} <ArrowUpRight className="size-4" />
          </Link>
          <Link href="/sluzby#balicky" className="btn btn-cream">
            {webyPage.pricesButton}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
