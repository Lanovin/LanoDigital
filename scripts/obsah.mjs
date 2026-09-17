#!/usr/bin/env node
/**
 * Kontrola a přenos obsahu webu.
 *
 *   npm run obsah:test    ověří, kam se ukládá a jestli to funguje
 *   npm run obsah:nahraj  pošle content/site.json do Supabase
 *   npm run obsah:stahni  stáhne obsah ze Supabase do content/site.json
 *
 * Skript čte `.env.local` sám, aby šel pustit i bez běžícího serveru.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const KORAN = process.cwd();
const SOUBOR = path.join(KORAN, "content", "site.json");
const TABLE = "site_content";
const ROW_ID = "default";

/* ── načtení .env.local ────────────────────────────────────────────── */
for (const jmeno of [".env.local", ".env"]) {
  const p = path.join(KORAN, jmeno);
  if (!fs.existsSync(p)) continue;
  for (const radek of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = radek.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    const [, klic, hodnota] = m;
    if (process.env[klic] === undefined) {
      process.env[klic] = hodnota.replace(/^["']|["']$/g, "").trim();
    }
  }
}

const URL_ = process.env.SUPABASE_URL;
// Supabase klíče přejmenovala: dřív service_role, dnes „Secret key“ (sb_secret_…).
const KLIC = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const prikaz = process.argv[2] ?? "test";

const ok = (s) => console.log(`  \x1b[32m✓\x1b[0m ${s}`);
const chyba = (s) => console.log(`  \x1b[31m✗\x1b[0m ${s}`);
const info = (s) => console.log(`    ${s}`);

function supabase() {
  return createClient(URL_, KLIC, { auth: { persistSession: false, autoRefreshToken: false } });
}

/* ── test ──────────────────────────────────────────────────────────── */
async function test() {
  console.log("\nÚložiště obsahu\n");

  if (!URL_ || !KLIC) {
    chyba("Supabase není nastavená.");
    info("Chybí " + [!URL_ && "SUPABASE_URL", !KLIC && "SUPABASE_SECRET_KEY"].filter(Boolean).join(" a "));
    info("Web zatím ukládá do souboru content/site.json — což na Vercelu nefunguje.");
    info("Doplňte klíče do .env.local a pusťte to znovu.");
    console.log("");
    process.exit(1);
  }

  ok(`Nastavená Supabase: ${URL_}`);
  if (KLIC.length < 40) chyba("Tajný klíč vypadá moc krátce — nezkopíroval se celý?");
  if (KLIC.startsWith("sb_publishable_")) {
    chyba("Tohle je publishable klíč, ten do serveru nepatří a zápis s ním neprojde.");
    info("Vezměte ten ze sekce Secret keys — začíná na sb_secret_");
  }
  if (KLIC.startsWith("eyJ") && /"role"\s*:\s*"anon"/.test(Buffer.from(KLIC.split(".")[1] ?? "", "base64").toString("utf8"))) {
    chyba("Tohle je starý anon klíč. Potřebujete service_role, nebo nový Secret key.");
  }

  const db = supabase();

  const { data, error } = await db.from(TABLE).select("id, updated_at").eq("id", ROW_ID).maybeSingle();
  if (error) {
    const chybiTabulka = error.code === "42P01" || /does not exist|could not find the table/i.test(error.message);
    chyba(chybiTabulka ? `Chybí tabulka „${TABLE}“.` : `Čtení selhalo: ${error.message}`);
    if (chybiTabulka) info("Pusťte v Supabase → SQL Editor obsah souboru supabase/schema.sql");
    else info("Zkontrolujte, že klíč je tajný (sb_secret_… nebo service_role), ne publishable/anon.");
    console.log("");
    process.exit(1);
  }
  ok(`Tabulka „${TABLE}“ je dostupná pro čtení`);

  // zkušební zápis do vlastního řádku, ať se nesáhne na ostrý obsah
  const zkusebni = "__test__";
  const zapis = await db.from(TABLE).upsert({ id: zkusebni, content: { test: true } }, { onConflict: "id" });
  if (zapis.error) {
    chyba(`Zápis selhal: ${zapis.error.message}`);
    info("Nejspíš je v .env.local publishable/anon klíč místo tajného (sb_secret_… nebo service_role).");
    console.log("");
    process.exit(1);
  }
  await db.from(TABLE).delete().eq("id", zkusebni);
  ok("Zápis i mazání fungují");

  if (data) {
    ok(`Obsah webu je uložený, naposledy ${new Date(data.updated_at).toLocaleString("cs-CZ")}`);
  } else {
    ok("Zatím nic uloženého — web běží na výchozích textech z kódu");
    if (fs.existsSync(SOUBOR)) info("Máte ale content/site.json. Přenesete ho přes: npm run obsah:nahraj");
  }

  console.log("\nVšechno je připravené. Administrace bude ukládat do Supabase.\n");
}

/* ── nahrání ze souboru ────────────────────────────────────────────── */
async function nahraj() {
  if (!URL_ || !KLIC) {
    chyba("Supabase není nastavená, není kam nahrávat.");
    process.exit(1);
  }
  if (!fs.existsSync(SOUBOR)) {
    chyba(`Soubor ${SOUBOR} neexistuje, není co nahrát.`);
    process.exit(1);
  }
  const obsah = JSON.parse(fs.readFileSync(SOUBOR, "utf8"));
  const { error } = await supabase()
    .from(TABLE)
    .upsert({ id: ROW_ID, content: obsah, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (error) {
    chyba(`Nahrání selhalo: ${error.message}`);
    process.exit(1);
  }
  ok("Obsah z content/site.json je v Supabase.");
}

/* ── stažení do souboru ────────────────────────────────────────────── */
async function stahni() {
  if (!URL_ || !KLIC) {
    chyba("Supabase není nastavená, není odkud stahovat.");
    process.exit(1);
  }
  const { data, error } = await supabase().from(TABLE).select("content").eq("id", ROW_ID).maybeSingle();
  if (error) {
    chyba(`Stažení selhalo: ${error.message}`);
    process.exit(1);
  }
  if (!data) {
    chyba("V Supabase zatím nic uloženého není.");
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(SOUBOR), { recursive: true });
  fs.writeFileSync(SOUBOR, JSON.stringify(data.content, null, 2) + "\n", "utf8");
  ok(`Obsah ze Supabase je v ${SOUBOR} (záloha).`);
}

const prikazy = { test, nahraj, stahni };
const fn = prikazy[prikaz];
if (!fn) {
  console.log(`Neznámý příkaz „${prikaz}“. Použijte: test | nahraj | stahni`);
  process.exit(1);
}
await fn();
