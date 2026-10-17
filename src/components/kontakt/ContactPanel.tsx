"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Mail, MessageSquare } from "lucide-react";
import type { Content } from "@/content/schema";
import { ContactForm } from "./ContactForm";

/**
 * Dva bloky: e-mail (odkaz) a kontaktní formulář (tlačítko, které formulář
 * rozbalí pod bloky). Linky kolem bloků při najetí myší jsou v `globals.css`
 * (`.contact-block`).
 */
export function ContactPanel({ t, email }: { t: Content["kontakt"]; email: string }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      // až se formulář rozbalí, přejede se na něj a první políčko dostane kurzor
      window.setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        formRef.current?.querySelector<HTMLInputElement>("input[name=jmeno]")?.focus({ preventScroll: true });
      }, 320);
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <a href={`mailto:${email}`} className="contact-block group flex min-h-48 flex-col">
          <span className="flex items-start justify-between gap-4">
            <span className="inline-flex size-12 items-center justify-center bg-ink text-cream">
              <Mail className="size-6" />
            </span>
            <ArrowUpRight className="contact-arrow size-6 text-ink-2" />
          </span>
          <span className="mt-auto pt-8">
            <span className="block font-display text-2xl font-bold">{t.emailTitle}</span>
            <span className="mt-1 block break-all font-mono text-sm text-rust-deep">{email}</span>
            {t.emailText && <span className="mt-2 block text-sm text-ink-2">{t.emailText}</span>}
          </span>
        </a>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="kontaktni-formular"
          className="contact-block group flex min-h-48 flex-col"
        >
          <span className="flex items-start justify-between gap-4">
            <span className="inline-flex size-12 items-center justify-center bg-ink text-cream">
              <MessageSquare className="size-6" />
            </span>
            <ChevronDown className={`contact-arrow size-6 text-ink-2 transition-transform ${open ? "rotate-180" : ""}`} />
          </span>
          <span className="mt-auto pt-8">
            <span className="block font-display text-2xl font-bold">{t.formBlockTitle}</span>
            {t.formBlockText && <span className="mt-2 block text-sm text-ink-2">{t.formBlockText}</span>}
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="kontaktni-formular"
            ref={formRef}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="pt-8">
              <ContactForm t={t} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
