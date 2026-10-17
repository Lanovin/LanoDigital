import type { Metadata } from "next";
import { Reveal, SectionHeading } from "@/components/site/Section";
import { Icon } from "@/components/site/Icon";
import { ContactForm } from "@/components/kontakt/ContactForm";
import { getContent } from "@/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const { kontakt } = await getContent();
  return { title: kontakt.metaTitle, description: kontakt.metaDescription };
}

export default async function KontaktPage() {
  const { kontakt, site } = await getContent();

  /** Prázdný text u e-mailu a místa se doplní z kontaktních údajů. */
  const fill = (icon: string, text: string) => {
    if (text.trim()) return text;
    if (icon === "mail") return site.owner.email;
    if (icon === "pin") return `${site.owner.location} · online kamkoli`;
    return text;
  };

  return (
    <div className="container-x pt-12 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeading title={kontakt.title} lead={kontakt.lead} />
          <Reveal delay={0.1} className="mt-8 space-y-4">
            {kontakt.info.map((i) => {
              const text = fill(i.icon, i.text);
              return (
                <div key={i.title} className="flex gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-cream">
                    <Icon name={i.icon} className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{i.title}</p>
                    <p className="text-sm text-ink-2">
                      {i.icon === "mail" ? (
                        <a href={`mailto:${text}`} className="prose-link">
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <ContactForm t={kontakt} />
        </Reveal>
      </div>
    </div>
  );
}
