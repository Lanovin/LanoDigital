import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_CONTENT } from "./defaults";
import type { Content } from "./schema";

/**
 * Úložiště obsahu.
 *
 * Dvě možnosti, vybírá se podle toho, co je v prostředí:
 *
 *  1. **Supabase** — když jsou nastavené `SUPABASE_URL` a tajný klíč.
 *     Tohle je varianta pro nasazený web: databáze je mimo server, takže
 *     administrace funguje i tam, kde se na disk psát nedá (Vercel).
 *  2. **Soubor** `content/site.json` — když Supabase nastavený není.
 *     Vývoj u sebe na počítači, bez nutnosti cokoli zakládat.
 *
 * Čtení vždycky spojí uložený obsah s výchozím (`defaults.ts`), takže:
 *  - když ještě nic uloženého není, web běží na výchozích textech,
 *  - když v kódu přibude nové pole, ve starém uloženém obsahu nechybí,
 *  - když se úložiště nepovede přečíst, web nespadne — jen použije výchozí.
 *
 * Servisní klíč k Supabase se používá **jen na serveru** (soubor má
 * `server-only`). Do prohlížeče se nikdy nedostane a nesmí mít předponu
 * `NEXT_PUBLIC_`, jinak by ho Next.js do balíčku pro prohlížeč vložil.
 */

export const CONTENT_FILE = path.join(process.cwd(), "content", "site.json");

/** Tabulka a řádek, kde obsah v Supabase bydlí. */
export const TABLE = "site_content";
export const ROW_ID = "default";

export type Driver = "supabase" | "file";

/**
 * Tajný klíč k Supabase.
 *
 * Supabase klíče přejmenovala: dřív `service_role`, dnes „Secret key“
 * (`sb_secret_…`). Bereme obojí, ať nezáleží na tom, jak se proměnná
 * v prostředí jmenuje a jak stará je dokumentace, podle které se to nastavovalo.
 */
export function secretKey(): string | undefined {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || undefined;
}

export function driver(): Driver {
  return process.env.SUPABASE_URL && secretKey() ? "supabase" : "file";
}

let client: SupabaseClient | null = null;

/** Kolik nejdéle čekat na databázi, než to vzdáme. */
const TIMEOUT_MS = 10_000;

function supabase(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, secretKey()!, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        // Kdyby databáze přestala odpovídat (ne odmítla — mlčela), čekalo by
        // se bez limitu a s ním i vykreslení stránky. Radši se to vzdá a web
        // ukáže výchozí texty.
        fetch: (input, init) =>
          fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(TIMEOUT_MS) }),
      },
    });
  }
  return client;
}

/* ── spojení uloženého s výchozím ──────────────────────────────────── */

/** Hluboké spojení. Pole se nespojují po prvcích — přepíšou se celá. */
function merge<T>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }
  if (typeof base === "object" && typeof patch === "object" && !Array.isArray(patch)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
      if (!(k in out)) continue; // neznámé klíče se ignorují, schéma je pán
      out[k] = merge(out[k], v);
    }
    return out as T;
  }
  // primitiv: převezmi jen když sedí typ
  return (typeof patch === typeof base ? patch : base) as T;
}

/* ── čtení ─────────────────────────────────────────────────────────── */

function readFile(): unknown {
  try {
    return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code !== "ENOENT") {
      console.warn(`[obsah] ${CONTENT_FILE} nejde přečíst (${e.message}). Beru výchozí texty.`);
    }
    return null;
  }
}

async function readSupabase(): Promise<unknown> {
  const { data, error } = await supabase().from(TABLE).select("content").eq("id", ROW_ID).maybeSingle();
  if (error) {
    console.warn(`[obsah] Supabase nejde přečíst (${error.message}). Beru výchozí texty.`);
    return null;
  }
  return data?.content ?? null;
}

/**
 * Obsah webu. V rámci jednoho požadavku (nebo jednoho generování stránky)
 * se úložiště čte jen jednou.
 */
export const getContent = cache(async (): Promise<Content> => {
  const stored = driver() === "supabase" ? await readSupabase() : readFile();
  return merge(DEFAULT_CONTENT, stored);
});

/** Je něco uloženého, nebo web jede na výchozích textech? */
export async function hasSavedContent(): Promise<boolean> {
  if (driver() === "file") return fs.existsSync(CONTENT_FILE);
  const { data } = await supabase().from(TABLE).select("id").eq("id", ROW_ID).maybeSingle();
  return Boolean(data);
}

/* ── zápis ─────────────────────────────────────────────────────────── */

export type SaveResult = { ok: true } | { ok: false; error: string };

function saveToFile(merged: Content): SaveResult {
  try {
    fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
    // zápis přes dočasný soubor: při pádu uprostřed nezůstane půlka JSONu
    const tmp = `${CONTENT_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(merged, null, 2) + "\n", "utf8");
    fs.renameSync(tmp, CONTENT_FILE);
    return { ok: true };
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code === "EROFS" || e.code === "EACCES" || e.code === "EPERM") {
      return {
        ok: false,
        error:
          "Server nemá kam zapisovat (disk je jen pro čtení). Tohle potkává hosting typu Vercel. Nastavte SUPABASE_URL a SUPABASE_SECRET_KEY a obsah se bude ukládat do databáze.",
      };
    }
    return { ok: false, error: `Uložení se nepovedlo: ${e.message}` };
  }
}

async function saveToSupabase(merged: Content): Promise<SaveResult> {
  const { error } = await supabase()
    .from(TABLE)
    .upsert({ id: ROW_ID, content: merged, updated_at: new Date().toISOString() }, { onConflict: "id" });

  if (!error) return { ok: true };

  // Nejčastější chyba při prvním spuštění: tabulka ještě není založená.
  const chybiTabulka = error.code === "42P01" || /relation .* does not exist|could not find the table/i.test(error.message);
  return {
    ok: false,
    error: chybiTabulka
      ? `V Supabase chybí tabulka „${TABLE}“. Pusťte v SQL editoru skript ze souboru supabase/schema.sql.`
      : `Uložení do Supabase se nepovedlo: ${error.message}`,
  };
}

/** Uloží obsah. Ukládá se celý, ne jen rozdíl — ať je čitelný a úplný. */
export async function saveContent(next: unknown): Promise<SaveResult> {
  const merged = merge(DEFAULT_CONTENT, next);
  return driver() === "supabase" ? saveToSupabase(merged) : saveToFile(merged);
}

/** Smaže uložený obsah — web se vrátí na výchozí texty. */
export async function resetContent(): Promise<SaveResult> {
  if (driver() === "file") {
    try {
      fs.rmSync(CONTENT_FILE, { force: true });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: `Vrácení na výchozí se nepovedlo: ${(err as Error).message}` };
    }
  }
  const { error } = await supabase().from(TABLE).delete().eq("id", ROW_ID);
  return error ? { ok: false, error: `Vrácení na výchozí se nepovedlo: ${error.message}` } : { ok: true };
}

/* ── diagnostika ───────────────────────────────────────────────────── */

export type Diagnostika = {
  driver: Driver;
  ok: boolean;
  detail: string;
  ulozeno: boolean;
  zmeneno: string | null;
};

/** Ověří, že se do úložiště dá číst i psát. Používá `npm run obsah:test` a administrace. */
export async function checkStorage(): Promise<Diagnostika> {
  if (driver() === "file") {
    const je = fs.existsSync(CONTENT_FILE);
    return {
      driver: "file",
      ok: true,
      detail: `Soubor ${CONTENT_FILE}`,
      ulozeno: je,
      zmeneno: je ? fs.statSync(CONTENT_FILE).mtime.toISOString() : null,
    };
  }
  const { data, error } = await supabase().from(TABLE).select("id, updated_at").eq("id", ROW_ID).maybeSingle();
  if (error) {
    const chybiTabulka = error.code === "42P01" || /relation .* does not exist|could not find the table/i.test(error.message);
    return {
      driver: "supabase",
      ok: false,
      detail: chybiTabulka
        ? `Připojeno, ale chybí tabulka „${TABLE}“ — pusťte supabase/schema.sql v SQL editoru.`
        : error.message,
      ulozeno: false,
      zmeneno: null,
    };
  }
  return {
    driver: "supabase",
    ok: true,
    detail: `Supabase, tabulka ${TABLE}`,
    ulozeno: Boolean(data),
    zmeneno: (data?.updated_at as string) ?? null,
  };
}
