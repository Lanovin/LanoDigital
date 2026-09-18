"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { NavItem } from "@/content/schema";
import { Wordmark } from "./Wordmark";

export function Nav({ name, nav, cta }: { name: string; nav: NavItem[]; cta: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`transition-[background,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open ? "bg-paper/85 backdrop-blur-md shadow-[0_1px_0_var(--line)]" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <Link href="/" onClick={close} className="text-[1.45rem] leading-none" aria-label={`${name}, domů`}>
            <Wordmark name={name} />
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Hlavní navigace">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition-colors hover:bg-ink/8 ${
                    active ? "text-ink" : "text-ink-2"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-1/2 -bottom-[3px] size-1.5 -translate-x-1/2 rounded-full bg-rust" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={cta.href} className="btn btn-ink hidden sm:inline-flex">
              {cta.label}
              <ArrowUpRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-cream/70"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="md:hidden border-t border-line">
            <div className="container-x flex flex-col py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-ink/8"
                >
                  {item.label}
                </Link>
              ))}
              <Link href={cta.href} onClick={close} className="btn btn-ink mt-2 justify-center">
                {cta.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
