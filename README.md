# LanoDigital – web

Prezentační web agentury LanoDigital: webové stránky, e-shopy a aplikace, k tomu AI systémy.
Next.js (App Router), TypeScript, Tailwind 4, Motion.

```bash
npm install
npm run dev        # web na http://localhost:3000, administrace na /admin
npm run build      # produkční build
npm start          # spustí build
```

## Administrace

Všechny texty webu se mění na **`/admin`** — nadpisy, popisy služeb, systémy,
reference, kontaktní údaje i popisky formuláře.

**Zapnutí:** zkopírujte `.env.example` do `.env.local` a nastavte heslo:

```
ADMIN_PASSWORD=vase-tajne-heslo
```

Bez hesla je administrace vypnutá — kdyby běžela bez něj, mohl by po nasazení
texty přepsat kdokoli, kdo adresu uhodne. Heslo si zvolte delší než `admin`;
je to jediná zábrana mezi internetem a obsahem webu.

**Jak to funguje:**

- Píše se do políček a **ukládá se samo** — vteřinu a půl po posledním úhozu.
  Automatiku jde vypnout přepínačem vlevo; pak ukládá tlačítko nebo `Ctrl+S`.
- Web čte obsah tak, že **uložené texty přiloží na výchozí** ze
  `src/content/defaults.ts`. Takže když v kódu přibude nové pole, starý uložený
  obsah se nerozbije; a když se uložené smaže, web se vrátí k původním textům.
- Po uložení se stránky přegenerují samy, F5 stačí.
- U každého změněného pole je „původní“ na vrácení jedné hodnoty, vlevo dole
  „Vrátit vše na původní“.

**Zápis nadpisů:** nový řádek se zalomí, nic jiného se v textech neinterpretuje.
Nadpisy jsou jednobarevné, hvězdičky se na webu zahodí. Na webu schválně nejsou
konkrétní ceny ani malé štítky nad nadpisy.

**Co se v administraci needituje:** ukázková data tří dem (maily, doklady,
inzeráty). Nejsou to texty webu, ale vstupy, na kterých dema počítají — žijí
v `src/data/demo-*.ts`.

## Kam se obsah ukládá

Dvě možnosti, vybírá se sama podle toho, co je v prostředí. Administrace vlevo
dole vždycky ukazuje, která je zrovna aktivní.

| Kdy | Kam | K čemu |
|---|---|---|
| `SUPABASE_URL` + `SUPABASE_SECRET_KEY` jsou nastavené | databáze Supabase | nasazený web, funguje i na Vercelu |
| nejsou nastavené | soubor `content/site.json` | vývoj u sebe, bez zakládání čehokoli |

### Nastavení Supabase

1. Na [supabase.com](https://supabase.com) založte projekt (zdarma stačí).
2. **SQL Editor → New query** → vložte celý soubor [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   Založí tabulku `site_content`, zamkne ji a přidá časové razítko.
3. Do `.env.local` doplňte:
   ```
   SUPABASE_URL=https://<id-projektu>.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_...
   ```
   `SUPABASE_URL` je **Project URL** (Project Settings → Data API).
   Klíč je v **Project Settings → API Keys** v sekci **Secret keys** — ten,
   co začíná na `sb_secret_`. Publishable klíč (`sb_publishable_`) je určený
   do prohlížeče a na zápis nestačí.

   > Starší projekty mají místo toho `service_role` klíč (začíná na `eyJ`).
   > Funguje taky — vložte ho na stejné místo, nebo do
   > `SUPABASE_SERVICE_ROLE_KEY`. Web bere obojí.
4. Ověřte, že to sedí:
   ```bash
   npm run obsah:test
   ```
   Skript zkusí číst i zapisovat a řekne, co případně chybí.

**Tajný klíč je tajný.** Obchází pravidla přístupu, takže patří jen do
`.env.local` a do proměnných prostředí na hostingu. Nikdy mu nedávejte předponu
`NEXT_PUBLIC_` — s ní by ho Next.js poslal do prohlížeče. Tabulka má zapnuté RLS
bez jediného pravidla, takže se k ní anonymním ani přihlašovacím klíčem nikdo
nedostane; čte a píše do ní jedině server.

### Přenos obsahu

```bash
npm run obsah:nahraj   # content/site.json → Supabase (po přechodu na databázi)
npm run obsah:stahni   # Supabase → content/site.json (záloha)
```

### Když databáze nejede

Web se nerozbije: ukáže výchozí texty z kódu, do logu napíše proč a
v administraci se objeví červený pruh s příčinou. Čekání je omezené na deset
vteřin, takže nic nezůstane viset.

## Co kde je

```
content/site.json         uložené texty, když se neukládá do Supabase
supabase/schema.sql       tabulka pro obsah — pustit v SQL editoru Supabase
scripts/obsah.mjs         npm run obsah:test / :nahraj / :stahni
src/
  app/
    (site)/               veřejný web – navigace a patička
      page.tsx            úvod: přehlídka webů, hotové weby, „jak vzniká web“, balíčky, AI systémy
      sluzby/             balíčky webů, další služby, co ode mě čekat, průběh, zásady
      systemy/            AI systémy: přehled, animace, schéma + detail (/systemy/<slug>) s ukázkou
      weby/               reference webů
      o-mne/              o Štěpánovi
      kontakt/            formulář na domluvení schůzky
    admin/                administrace a přihlášení
    api/
      kontakt/route.ts    odeslání formuláře (Resend, nebo jen log)
      admin/              přihlášení, odhlášení, čtení a zápis obsahu
    layout.tsx            html, písma, styly
    sitemap.ts, robots.ts SEO
  content/
    schema.ts             tvar obsahu – co všechno jde měnit
    defaults.ts           výchozí texty webu
    store.ts              čtení a zápis: Supabase, nebo soubor
    labels.ts             české popisky polí pro administraci
  components/
    hero/MarbleRun.tsx    animace kuličky na /systemy (SVG + SMIL, bez JS)
    flow/FlowDiagram.tsx  schéma na /systemy: vstup → AI agent → kód ověří → výstupy
    demos/                tři interaktivní ukázky AI systémů
    weby/                 náhledy referencí (SitePreview), přehlídka na úvodu (Showreel),
                          „jak vzniká web“ (WebBuilder), balíčky (Packages)
    admin/                editor obsahu
    site/                 navigace, patička, nadpisy sekcí, wordmark, ikony
  data/demo-*.ts          ukázková data a předpočítané výsledky pro dema
  lib/admin-auth.ts       přihlášení do administrace
```

## Ukázky bez API klíče

Dema na webu běží na **předpočítaných výsledcích** ze skutečných běhů projektů
ve složce `ai workflows test`. Nevolají žádný model, takže nestojí nic a klíč
k API nikdy neopustí váš počítač.

## Náhledy referencí

Dlaždice na `/weby` a na úvodu (a přehlídka v úvodu stránky) ukazují hotové weby dvěma způsoby:

- **Obrázek** — celá stránka jako jeden vysoký snímek, dá se jím projet.
  Soubory jsou v `public/weby/`:
  `<slug>.jpg` (úvodní obrazovka), `<slug>-full.jpg` (celá stránka, desktop),
  `<slug>-mobile.jpg` (celá stránka, mobilní podoba). Rozměry si web přečte
  ze souborů sám, takže po přefocení není co dopisovat. Když soubor chybí,
  ukáže se barevná náhrada.
- **Živě** — skutečný web v rámu, dá se v něm klikat i scrollovat. Načte se
  **až po kliknutí**, takže do té doby nestojí ani jeden požadavek.
  Zapíná se přepínačem `live` u reference v administraci.

Živý náhled nefunguje u webů, jejichž hosting to zakazuje. `lanovin.infinityfree.io`
je ten případ: InfinityFree si před zobrazením ověřuje vlastní cookie, kterou
prohlížeč v cizím rámu zablokuje. Po přesunu na běžný hosting by šel spustit taky.

## Co doplnit

- **IČO a sídlo** do patičky a stránka se zásadami zpracování osobních údajů
  (formulář sbírá jméno a e-mail).
- **Logo** – až bude, vyměňte obsah `components/site/Wordmark.tsx`
  (a `app/icon.tsx`, `app/opengraph-image.tsx`).
- **Fotka** do „O mně“ místo iniciál (nepovinné).

Hotové a nastavené: doména `www.lanodigital.cz`, e-mail `info@lanodigital.cz`,
odesílání formuláře přes Resend (doména ověřená v Resendu), náhled při sdílení
(`app/opengraph-image.tsx`) a favicon (`app/icon.tsx`).

## Nasazení

Kdekoli, kde běží Node (`npm run build && npm start`), Vercel včetně.
Do proměnných prostředí na hostingu patří:

| Proměnná | Nutná? | K čemu |
|---|---|---|
| `ADMIN_PASSWORD` | ano | bez ní je administrace vypnutá |
| `SUPABASE_URL` | ano | aby šlo ukládat texty na nasazeném webu |
| `SUPABASE_SECRET_KEY` | ano | totéž; tajný klíč (`sb_secret_…`), nikdy do kódu |
| `RESEND_API_KEY` | ano | bez ní se poptávka jen zaloguje a nikam nedojde |
| `CONTACT_TO` | ano | kam chodí poptávky (`info@lanodigital.cz`) |
| `CONTACT_FROM` | ano | odesílatel, např. `LanoDigital <web@lanodigital.cz>`; doména musí být ověřená v Resendu (jejich DNS záznamy: CNAME s tečkou na konci hodnoty!) |
| `ADMIN_SECRET` | ne | podpis přihlašovací cookie |

Bez těch proměnných se web postaví a poběží — jen pojede na výchozích textech
z kódu a administrace bude vypnutá. Nic nespadne.

### Vercel

Root Directory nechte prázdný, aplikace je v kořeni repozitáře. Framework
si Vercel pozná sám (Next.js), build i start jsou výchozí.

Proměnné nastavte v **Project Settings → Environment Variables** pro všechna
prostředí (Production, Preview, Development). Přidání proměnné samo o sobě
nasazení nepřegeneruje — projeví se až při dalším nasazení.

**Nasazení spouští push do `main`.** Když projekt vznikl připojením
existujícího repozitáře, Vercel commit, který v něm už byl, zpětně nenasadí a
čeká na první nový push. Dá se to obejít tlačítkem *Redeploy* v záložce
Deployments, nebo prostě commitnout cokoli dalšího.
