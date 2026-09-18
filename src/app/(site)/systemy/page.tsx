import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, FileText, Search, LayoutDashboard } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/Section";
import { getContent } from "@/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const { systemyPage } = await getContent();
  return { title: systemyPage.metaTitle, description: systemyPage.metaDescription };
}

const ICONS = { "trideni-mailu": Mail, "cteni-dokladu": FileText, "hledani-inzeratu": Search } as const;
const WHO = {
  vstup: "bg-paper text-ink",
  model: "bg-rust text-cream",
  kod: "bg-moss text-cream",
  vystup: "bg-sky text-cream",
} as const;

export default async function SystemyPage() {
  const { systemyPage, systems } = await getContent();

  return (
    <div className="container-x pt-12 sm:pt-20">
      <SectionHeading eyebrow={systemyPage.eyebrow} title={systemyPage.title} lead={systemyPage.lead} />

      <div className="mt-12 grid gap-6">
        {systems.map((s, i) => {
          const Icon = ICONS[s.slug] ?? Search;
          return (
            <Reveal key={s.slug} as="article" delay={i * 0.06} className="card grid gap-6 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-cream">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">{s.name}</h2>
                <p className="mt-2 text-ink-2">{s.pitch}</p>
                <p className="mt-3 text-sm text-ink-3">{s.forWhom}</p>
                <div className="mt-5">
                  <Link href={`/systemy/${s.slug}`} className="btn btn-ink !px-4 !py-2.5 text-sm">
                    {systemyPage.detailButton} <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-white/50 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">{systemyPage.flowLabel}</p>
                <ol className="mt-3 space-y-2">
                  {s.steps.map((st, j) => (
                    <li key={st.label} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] ${WHO[st.who]}`}
                      >
                        {j + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-tight">{st.label}</p>
                        <p className="text-xs text-ink-3">{st.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                {s.metricValue && (
                  <p className="mt-4 border-t border-line pt-3">
                    <span className="font-display text-2xl font-bold text-rust">{s.metricValue}</span>
                    <span className="block text-xs text-ink-3">{s.metricLabel}</span>
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}

        <Reveal as="article" className="rounded-[var(--radius-blob)] border border-dashed border-line-strong p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong bg-cream text-ink">
              <LayoutDashboard className="size-5" />
            </span>
            <span className="font-mono text-xs text-ink-3">{systemyPage.bonusBadge}</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold">{systemyPage.bonusTitle}</h2>
          <p className="mt-2 max-w-2xl text-ink-2">{systemyPage.bonusText}</p>
        </Reveal>
      </div>
    </div>
  );
}
