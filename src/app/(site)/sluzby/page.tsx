import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, RichText, SectionHeading } from "@/components/site/Section";
import { Icon } from "@/components/site/Icon";
import { getContent } from "@/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const { sluzby } = await getContent();
  return { title: sluzby.metaTitle, description: sluzby.metaDescription };
}

export default async function SluzbyPage() {
  const { sluzby } = await getContent();

  return (
    <div className="container-x pt-12 sm:pt-20">
      <SectionHeading eyebrow={sluzby.eyebrow} title={sluzby.title} lead={sluzby.lead} />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {sluzby.services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08} as="article" className="card flex flex-col p-6 sm:p-7">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-ink text-cream">
              <Icon name={s.icon} className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold">{s.name}</h2>
            <p className="mt-1 font-medium text-rust-deep">{s.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.text}</p>
            <ul className="mt-4 space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-moss" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-3 pt-6">
              <span className="font-mono text-xs text-ink-3">{s.price}</span>
              <Link href={s.href} className="btn btn-cream !px-4 !py-2.5 text-sm">
                {s.cta} <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="pt-24 sm:pt-28">
        <SectionHeading eyebrow={sluzby.processEyebrow} title={sluzby.processTitle} />
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {sluzby.process.map((p, i) => (
            <Reveal key={p.number} as="li" delay={i * 0.07} className="relative rounded-2xl border border-line bg-cream/60 p-5">
              <span className="font-mono text-xs text-rust-deep">{p.number}</span>
              <h3 className="mt-2 text-lg font-bold leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="pt-24 sm:pt-28">
        <Reveal className="card-ink px-6 py-10 sm:px-12 sm:py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow !text-paper">{sluzby.principlesEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold text-cream">
                <RichText text={sluzby.principlesTitle} highlight="text-paper" />
              </h2>
            </div>
            <ul className="space-y-4 text-cream/80">
              {sluzby.principles.map((p) => (
                <li key={p.bold}>
                  <b className="text-cream">{p.bold}</b> {p.text}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
