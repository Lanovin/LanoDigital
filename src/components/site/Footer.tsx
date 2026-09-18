import Link from "next/link";
import type { Content } from "@/content/schema";
import { Wordmark } from "./Wordmark";

export function Footer({ site, footer }: { site: Content["site"]; footer: Content["footer"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24">
      <div className="container-x">
        <div className="card-ink px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link href="/" className="text-3xl">
                <Wordmark name={site.name} light />
              </Link>
              <p className="mt-4 max-w-sm text-cream/75 leading-relaxed">{footer.text}</p>
            </div>
            <div>
              <p className="eyebrow !text-paper">{footer.navLabel}</p>
              <ul className="mt-3 space-y-2">
                {site.nav.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="text-cream/85 hover:text-cream">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow !text-paper">{footer.contactLabel}</p>
              <ul className="mt-3 space-y-2 text-cream/85">
                <li>{site.owner.name}</li>
                <li>
                  <a href={`mailto:${site.owner.email}`} className="hover:text-cream">
                    {site.owner.email}
                  </a>
                </li>
                <li>{site.owner.location}</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-cream/15 pt-6 text-sm text-cream/55">
            <span>
              © {year} {site.name}
            </span>
          </div>
        </div>
      </div>
      <div className="h-8" />
    </footer>
  );
}
