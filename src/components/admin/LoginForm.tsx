"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, LogIn } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [heslo, setHeslo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heslo }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Přihlášení se nepovedlo.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Přihlášení se nepovedlo.");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm border border-line-strong bg-cream p-6 sm:p-8">
        <span className="font-display text-2xl font-extrabold tracking-[-0.04em] text-ink">
          Lano<span className="text-rust">Digital</span>
        </span>
        <h1 className="mt-4 font-display text-xl font-bold text-ink">Administrace</h1>
        <p className="mt-1 text-sm text-ink-2">Zadejte heslo a můžete přepisovat texty webu.</p>

        <label htmlFor="heslo" className="mt-6 block text-sm font-semibold text-ink">
          Heslo
        </label>
        <input
          id="heslo"
          type="password"
          value={heslo}
          onChange={(e) => setHeslo(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 w-full border border-line-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-ink/10"
        />

        {error && (
          <p className="mt-3 flex items-start gap-2 bg-rust/10 px-3 py-2 text-sm leading-snug text-rust-deep">
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || heslo.length === 0}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-rust-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
          Přihlásit
        </button>
      </form>
    </div>
  );
}
