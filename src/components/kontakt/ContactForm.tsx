"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { Content } from "@/content/schema";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; delivered: boolean }
  | { kind: "error"; message: string };

const ZAJEM = [
  { value: "system", label: "AI systém / automatizace" },
  { value: "web", label: "Webové stránky" },
  { value: "oboji", label: "Obojí" },
  { value: "nevim", label: "Ještě nevím, chci to probrat" },
];

export function ContactForm({ t }: { t: Content["kontakt"] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Odeslání se nepovedlo.");
      setStatus({ kind: "ok", delivered: Boolean(json.delivered) });
      form.reset();
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Odeslání se nepovedlo." });
    }
  }

  if (status.kind === "ok") {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-moss" />
        <h3 className="mt-3 text-2xl font-bold">{t.formSuccessTitle}</h3>
        <p className="mt-2 text-ink-2">
          {t.formSuccessText}
          {!status.delivered && (
            <span className="mt-2 block text-xs text-ink-3">
              (Odesílání e-mailu ještě není nastavené – zpráva se zapsala do logu serveru.)
            </span>
          )}
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="btn btn-cream mt-6">
          {t.formSuccessAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.formNameLabel} name="jmeno" required autoComplete="name" />
        <Field label={t.formEmailLabel} name="email" type="email" required autoComplete="email" />
        <Field
          label={t.formCompanyLabel}
          name="firma"
          placeholder={t.formCompanyPlaceholder}
          autoComplete="organization"
        />
        <div>
          <Label htmlFor="zajem">{t.formInterestLabel}</Label>
          <select id="zajem" name="zajem" className={inputCls} defaultValue="system">
            {ZAJEM.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="zprava">{t.formMessageLabel}</Label>
        <textarea
          id="zprava"
          name="zprava"
          required
          minLength={10}
          rows={5}
          placeholder={t.formMessagePlaceholder}
          className={inputCls}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="termin">{t.formWhenLabel}</Label>
        <input id="termin" name="termin" className={inputCls} placeholder={t.formWhenPlaceholder} />
      </div>
      {/* past na roboty */}
      <div className="hidden" aria-hidden>
        <label>
          Web <input name="web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-rust/10 px-3 py-2 text-sm text-rust-deep">
          <AlertCircle className="size-4" /> {status.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-rust disabled:opacity-60">
          {status.kind === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {t.formSubmit}
        </button>
        <p className="text-xs text-ink-3">{t.formNote}</p>
      </div>
    </form>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-xl border border-line-strong bg-white/70 px-3.5 py-2.5 text-sm outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10 placeholder:text-ink-3/70";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-rust"> *</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputCls}
      />
    </div>
  );
}
