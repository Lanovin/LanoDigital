import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Content } from "@/content/schema";
import { Reveal } from "@/components/site/Section";

/**
 * Tři balíčky webů vedle sebe. Ostré rohy jako ceník v novinách;
 * zvýrazněný balíček je tmavá plocha bez stínu a bez podsvícení.
 * Ukázka u balíčku vede na odpovídající referenci na stránce Weby.
 */
export function Packages({ sluzby, weby }: { sluzby: Content["sluzby"]; weby: Content["weby"] }) {
  return (
    <>
      <div className="grid border border-line-strong md:grid-cols-3">
        {sluzby.packages.map((p, i) => {
          const example = weby.find((w) => w.slug === p.example);
          const dark = p.featured;
          return (
            <Reveal
              key={p.name}
              as="article"
              delay={i * 0.08}
              className={`flex flex-col p-6 sm:p-7 ${
                dark ? "card-ink" : "bg-cream/70"
              } ${i > 0 ? "border-t border-line-strong md:border-l md:border-t-0" : ""}`}
            >
              <span className={`font-mono text-xs ${dark ? "text-paper" : "text-rust-deep"}`}>0{i + 1}</span>
              <h3 className={`mt-2 text-2xl font-bold leading-tight ${dark ? "text-cream" : ""}`}>{p.name}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-cream/75" : "text-ink-2"}`}>{p.tagline}</p>
              <ul className={`mt-5 space-y-2.5 border-t pt-5 ${dark ? "border-cream/20" : "border-line"}`}>
                {p.bullets.map((b) => (
                  <li key={b} className={`flex gap-2 text-sm ${dark ? "text-cream/90" : ""}`}>
                    <Check className={`mt-0.5 size-4 shrink-0 ${dark ? "text-paper" : "text-moss"}`} /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                {example && (
                  <Link
                    href={`/weby#${example.slug}`}
                    className={`mb-4 flex items-center justify-between gap-3 border px-3 py-2.5 text-sm transition-colors ${
                      dark ? "border-cream/20 hover:border-cream/50" : "border-line-strong hover:bg-cream"
                    }`}
                  >
                    <span className={dark ? "text-cream/70" : "text-ink-3"}>
                      {sluzby.packagesExampleLabel}:{" "}
                      <b className={dark ? "text-cream" : "text-ink"}>{example.name}</b>
                    </span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                )}
                <Link href="/kontakt" className={`btn w-full justify-center ${dark ? "btn-rust" : "btn-ink"}`}>
                  {sluzby.packagesButton} <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
      {sluzby.packagesNote && (
        <Reveal className="mt-4">
          <p className="font-mono text-xs text-ink-3">{sluzby.packagesNote}</p>
        </Reveal>
      )}
    </>
  );
}
