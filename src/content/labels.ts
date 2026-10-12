import type { Content } from "./schema";

/**
 * České popisky polí pro administraci.
 *
 * Editor umí vykreslit formulář sám podle tvaru dat, tenhle soubor jen
 * pojmenovává pole česky a určuje, co se má chovat jinak (víceřádkové pole,
 * výběr z možností, zamčená hodnota). Když sem popisek chybí, editor si
 * název odvodí z klíče; nic se nerozbije, jen to bude méně hezké.
 *
 * Cesta se píše s tečkami a `*` zastupuje pořadí v seznamu:
 *   `sluzby.services.*.tagline`
 */

export type FieldKind = "text" | "long" | "select" | "color" | "locked" | "bool";

export type FieldConfig = {
  label?: string;
  hint?: string;
  kind?: FieldKind;
  options?: string[];
  /** Seznam s pevným počtem položek, nejde přidávat ani mazat. */
  fixed?: boolean;
};

export type Section = {
  key: keyof Content;
  title: string;
  hint: string;
  /** Kam na webu se kouknout, aby bylo vidět, co se mění. */
  preview: string;
};

export const SECTIONS: Section[] = [
  { key: "site", title: "Web a kontakt", hint: "Název, adresa, kontaktní údaje a položky menu.", preview: "/" },
  { key: "home", title: "Úvodní stránka", hint: "Nadpis, podnadpis, běžící pás, hotové weby, jak vzniká web a AI systémy. Balíčky se mění v části Služby.", preview: "/" },
  { key: "sluzby", title: "Služby", hint: "Balíčky webů, další služby, co dostanete a co ne, průběh spolupráce a zásady.", preview: "/sluzby" },
  { key: "systemyPage", title: "Systémy: přehled", hint: "Texty stránky se seznamem systémů a karta na konci.", preview: "/systemy" },
  { key: "systems", title: "Systémy: obsah", hint: "Popis každého systému, kroky, co umí a neumí, bezpečnost.", preview: "/systemy" },
  { key: "systemDetail", title: "Systémy: detail", hint: "Popisky, které se opakují na detailu každého systému.", preview: "/systemy/trideni-mailu" },
  { key: "webyPage", title: "Weby: stránka", hint: "Úvod stránky s referencemi a postup, jak weby děláte.", preview: "/weby" },
  { key: "weby", title: "Weby: reference", hint: "Jednotlivé hotové weby a jejich popis.", preview: "/weby" },
  { key: "about", title: "O mně", hint: "Medailonek, cesta, zásady a nástroje.", preview: "/o-mne" },
  { key: "kontakt", title: "Kontakt", hint: "Texty kontaktní stránky a popisky formuláře.", preview: "/kontakt" },
  { key: "footer", title: "Patička", hint: "Text a nadpisy sloupců v patičce.", preview: "/" },
];

const ICONS = ["bot", "globe", "chat", "spark", "mail", "file", "search", "calendar", "clock", "pin", "check"];

export const FIELDS: Record<string, FieldConfig> = {
  // ── Web a kontakt ────────────────────────────────────────────────
  "site.name": { label: "Název agentury", hint: "Zobrazuje se vlevo nahoře a v patičce." },
  "site.tagline": { label: "Podtitul", hint: "Přidá se za název v titulku prohlížeče." },
  "site.description": { label: "Popis webu", kind: "long", hint: "Text pro vyhledávače a náhled odkazu." },
  "site.url": { label: "Adresa webu", hint: "Použije se v sitemapě a náhledu odkazu. Včetně https://" },
  "site.owner": { label: "Kontaktní údaje" },
  "site.owner.name": { label: "Jméno" },
  "site.owner.role": { label: "Role" },
  "site.owner.email": { label: "E-mail", hint: "Sem chodí poptávky z formuláře." },
  "site.owner.location": { label: "Kde působíte" },
  "site.nav": { label: "Položky menu" },
  "site.nav.*.label": { label: "Text" },
  "site.nav.*.href": { label: "Odkaz" },
  "site.cta": { label: "Hlavní tlačítko v menu" },
  "site.cta.label": { label: "Text" },
  "site.cta.href": { label: "Odkaz" },

  // ── Úvodní stránka ───────────────────────────────────────────────
  "home.heroTitle": { label: "Hlavní nadpis", kind: "long", hint: "Nový řádek zalomí text." },
  "home.heroLead": { label: "Podnadpis", kind: "long" },
  "home.heroPrimary": { label: "Tlačítko: hotové weby" },
  "home.heroSecondary": { label: "Tlačítko: konzultace" },
  "home.marquee": { label: "Běžící pás", hint: "Krátká slova, která pod nadpisem jezdí dokola." },
  "home.webyEyebrow": { label: "Hotové weby: štítek" },
  "home.webyTitle": { label: "Hotové weby: nadpis", kind: "long" },
  "home.webyLead": { label: "Hotové weby: text", kind: "long" },
  "home.webyMore": { label: "Hotové weby: odkaz pod dlaždicemi" },
  "home.webyDetailLabel": { label: "Hotové weby: odkaz u každého webu" },
  "home.buildEyebrow": { label: "Jak vzniká web: štítek" },
  "home.buildTitle": { label: "Jak vzniká web: nadpis", kind: "long" },
  "home.buildLead": { label: "Jak vzniká web: text", kind: "long" },
  "home.buildSteps": {
    label: "Jak vzniká web: čtyři kroky",
    fixed: true,
    hint: "Kroky jsou navázané na obrázek vedle (náčrt, rozvržení, vzhled, spuštění), proto jsou vždycky čtyři.",
  },
  "home.systemsEyebrow": { label: "AI systémy: štítek" },
  "home.systemsTitle": { label: "AI systémy: nadpis", kind: "long" },
  "home.systemsLead": { label: "AI systémy: text", kind: "long" },
  "home.systemsDetailLabel": { label: "AI systémy: odkaz u každého systému" },
  "home.systemsButton": { label: "AI systémy: tlačítko pod seznamem" },
  "home.aboutEyebrow": { label: "O mně: štítek" },
  "home.aboutTitle": { label: "O mně: nadpis", kind: "long" },
  "home.aboutText": { label: "O mně: text", kind: "long" },
  "home.aboutButton": { label: "O mně: tlačítko" },
  "home.aboutStats": { label: "Čísla v tmavém bloku" },
  "home.aboutStats.*.value": { label: "Číslo" },
  "home.aboutStats.*.label": { label: "Popis" },
  "home.ctaTitle": { label: "Závěrečná výzva: nadpis" },
  "home.ctaText": { label: "Závěrečná výzva: text", kind: "long" },
  "home.ctaButton": { label: "Závěrečná výzva: tlačítko" },

  // ── Služby ───────────────────────────────────────────────────────
  "sluzby.metaTitle": { label: "Titulek stránky", hint: "Zobrazí se v záložce prohlížeče a ve vyhledávání." },
  "sluzby.metaDescription": { label: "Popis pro vyhledávače", kind: "long" },
  "sluzby.eyebrow": { label: "Štítek nad nadpisem" },
  "sluzby.title": { label: "Nadpis", kind: "long" },
  "sluzby.lead": { label: "Úvodní text", kind: "long" },
  "sluzby.packagesEyebrow": { label: "Balíčky: štítek" },
  "sluzby.packagesTitle": { label: "Balíčky: nadpis", kind: "long" },
  "sluzby.packagesLead": { label: "Balíčky: text", kind: "long" },
  "sluzby.packages": { label: "Balíčky webů", hint: "Ukazují se tady i na úvodní stránce." },
  "sluzby.packages.*.name": { label: "Název balíčku" },
  "sluzby.packages.*.tagline": { label: "Pro koho je", kind: "long" },
  "sluzby.packages.*.bullets": { label: "Co je součástí" },
  "sluzby.packages.*.example": {
    label: "Ukázka (název souboru náhledu reference)",
    hint: "Třeba mikaauto. Musí sedět s polem „Název souboru náhledu“ u reference v části Weby. Prázdné = bez ukázky.",
  },
  "sluzby.packages.*.featured": { label: "Zvýraznit (tmavý blok)", kind: "bool" },
  "sluzby.packagesNote": { label: "Balíčky: poznámka pod nimi", kind: "long" },
  "sluzby.packagesExampleLabel": { label: "Balíčky: slovo před ukázkou" },
  "sluzby.packagesButton": { label: "Balíčky: text tlačítka" },
  "sluzby.extrasEyebrow": { label: "Další služby: štítek" },
  "sluzby.extrasTitle": { label: "Další služby: nadpis" },
  "sluzby.services": { label: "Další služby (AI, konzultace)" },
  "sluzby.services.*.icon": { label: "Ikona", kind: "select", options: ICONS },
  "sluzby.services.*.name": { label: "Název služby" },
  "sluzby.services.*.tagline": { label: "Jedna věta" },
  "sluzby.services.*.text": { label: "Popis", kind: "long" },
  "sluzby.services.*.bullets": { label: "Co je součástí" },
  "sluzby.services.*.href": { label: "Odkaz tlačítka" },
  "sluzby.services.*.cta": { label: "Text tlačítka" },
  "sluzby.scopeEyebrow": { label: "Co jde a co ne: štítek" },
  "sluzby.scopeTitle": { label: "Co jde a co ne: nadpis", kind: "long" },
  "sluzby.scopeLead": { label: "Co jde a co ne: text", kind: "long" },
  "sluzby.scopeCanLabel": { label: "Nadpis sloupce „dá se“" },
  "sluzby.scopeCan": { label: "Co dostanete" },
  "sluzby.scopeCannotLabel": { label: "Nadpis sloupce „nedá se“" },
  "sluzby.scopeCannot": { label: "Co nedostanete" },
  "sluzby.processEyebrow": { label: "Průběh: štítek" },
  "sluzby.processTitle": { label: "Průběh: nadpis" },
  "sluzby.process": { label: "Kroky spolupráce" },
  "sluzby.process.*.number": { label: "Číslo kroku" },
  "sluzby.process.*.title": { label: "Název kroku" },
  "sluzby.process.*.text": { label: "Popis", kind: "long" },
  "sluzby.principlesEyebrow": { label: "Zásady: štítek" },
  "sluzby.principlesTitle": { label: "Zásady: nadpis" },
  "sluzby.principles": { label: "Zásady" },
  "sluzby.principles.*.bold": { label: "Tučný začátek" },
  "sluzby.principles.*.text": { label: "Zbytek věty", kind: "long" },

  // ── Systémy ──────────────────────────────────────────────────────
  "systemyPage.metaTitle": { label: "Titulek stránky" },
  "systemyPage.metaDescription": { label: "Popis pro vyhledávače", kind: "long" },
  "systemyPage.eyebrow": { label: "Štítek nad nadpisem" },
  "systemyPage.title": { label: "Nadpis", kind: "long" },
  "systemyPage.lead": { label: "Úvodní text", kind: "long" },
  "systemyPage.flowLabel": { label: "Popisek nad kroky" },
  "systemyPage.detailButton": { label: "Text tlačítka na detail" },
  "systemyPage.flowEyebrow": { label: "Jak to funguje: štítek" },
  "systemyPage.flowTitle": { label: "Jak to funguje: nadpis", kind: "long" },
  "systemyPage.flowLead": { label: "Jak to funguje: text", kind: "long" },
  "systemyPage.flowCards": { label: "Tři kartičky pod schématem" },
  "systemyPage.bonusBadge": { label: "Karta na konci: štítek" },
  "systemyPage.bonusTitle": { label: "Karta na konci: nadpis" },
  "systemyPage.bonusText": { label: "Karta na konci: text", kind: "long" },
  "systemyPage.bonusButton": { label: "Karta na konci: tlačítko", hint: "Vede na kontaktní formulář." },

  "systemDetail.backLabel": { label: "Odkaz zpět" },
  "systemDetail.systemLabel": { label: "Slovo před číslem systému" },
  "systemDetail.stepLabel": { label: "Slovo před číslem kroku" },
  "systemDetail.demoEyebrow": { label: "Ukázka: štítek" },
  "systemDetail.demoTitle": { label: "Ukázka: nadpis" },
  "systemDetail.demoLead": { label: "Ukázka: text", kind: "long" },
  "systemDetail.forWhomLabel": { label: "Nadpis „pro koho“" },
  "systemDetail.outputsLabel": { label: "Nadpis „co dostanete“" },
  "systemDetail.limitsLabel": { label: "Nadpis „co to neumí“" },
  "systemDetail.safetyLabel": { label: "Nadpis bezpečnosti" },
  "systemDetail.insightsLabel": { label: "Nadpis „proč se na to dá spolehnout“" },
  "systemDetail.ctaEyebrow": { label: "Výzva: štítek" },
  "systemDetail.ctaTitle": { label: "Výzva: nadpis", kind: "long" },
  "systemDetail.ctaButton": { label: "Výzva: tlačítko" },
  "systemDetail.nextPrefix": { label: "Text před dalším systémem" },

  systems: {
    fixed: true,
    hint: "Systémy jsou tři a každý je navázaný na svoji interaktivní ukázku v kódu. Texty se mění tady, přidat čtvrtý jde jen v kódu.",
  },
  "systems.*.slug": { label: "Adresa a napojení na ukázku", kind: "locked", hint: "Mění se jen v kódu, je na to navázaná interaktivní ukázka." },
  "systems.*.name": { label: "Název systému" },
  "systems.*.short": { label: "Jedna věta" },
  "systems.*.pitch": { label: "Odstavec pro zákazníka", kind: "long" },
  "systems.*.forWhom": { label: "Pro koho to je", kind: "long" },
  "systems.*.insights": { label: "Proč se na to dá spolehnout" },
  "systems.*.insights.*.title": { label: "Nadpis" },
  "systems.*.insights.*.text": { label: "Text", kind: "long" },
  "systems.*.steps": { label: "Kroky toku dat" },
  "systems.*.steps.*.label": { label: "Název kroku" },
  "systems.*.steps.*.who": {
    label: "Kdo krok dělá",
    kind: "select",
    options: ["vstup", "model", "kod", "vystup"],
    hint: "vstup = co přijde, model = AI, kod = kontrola výpočtem, vystup = výsledek",
  },
  "systems.*.steps.*.note": { label: "Poznámka pod krokem" },
  "systems.*.outputs": { label: "Co dostanete" },
  "systems.*.limits": { label: "Co to neumí", hint: "Hranice systému. Zákazník hned ví, co od něj nečekat." },
  "systems.*.safety": { label: "Bezpečnost" },
  "systems.*.metricValue": { label: "Číslo do rámečku" },
  "systems.*.metricLabel": { label: "Popis čísla" },

  // ── Weby ─────────────────────────────────────────────────────────
  "webyPage.metaTitle": { label: "Titulek stránky" },
  "webyPage.metaDescription": { label: "Popis pro vyhledávače", kind: "long" },
  "webyPage.eyebrow": { label: "Štítek nad nadpisem" },
  "webyPage.title": { label: "Nadpis", kind: "long" },
  "webyPage.lead": { label: "Úvodní text", kind: "long" },
  "webyPage.howEyebrow": { label: "Postup: štítek" },
  "webyPage.howTitle": { label: "Postup: nadpis" },
  "webyPage.how": { label: "Kroky postupu" },
  "webyPage.ctaButton": { label: "Text tlačítka dole" },
  "webyPage.pricesButton": { label: "Tlačítko na balíčky webů" },

  weby: { hint: "Přidat referenci jde. Náhledy se hledají v public/weby/ podle názvu níž; bez nich se ukáže barevná náhrada." },
  "weby.*.slug": { label: "Název souboru náhledu", hint: "Hledají se soubory public/weby/<název>.jpg, -full.jpg a -mobile.jpg." },
  "weby.*.name": { label: "Název webu" },
  "weby.*.url": { label: "Adresa" },
  "weby.*.display": { label: "Adresa v liště náhledu" },
  "weby.*.kind": { label: "Typ projektu" },
  "weby.*.short": { label: "Jedna věta" },
  "weby.*.description": { label: "Popis", kind: "long" },
  "weby.*.highlights": { label: "Co web umí" },
  "weby.*.accent": { label: "Barva náhradního náhledu", kind: "color" },
  "weby.*.live": { label: "Jde spustit živě v rámu", kind: "bool" },
  "weby.*.liveNote": { label: "Poznámka pod obrázkovým náhledem", kind: "long", hint: "Nepovinné. Když je prázdné, nic se pod náhledem nezobrazí." },

  // ── O mně ────────────────────────────────────────────────────────
  "about.metaTitle": { label: "Titulek stránky" },
  "about.metaDescription": { label: "Popis pro vyhledávače", kind: "long" },
  "about.eyebrow": { label: "Štítek nad nadpisem" },
  "about.title": { label: "Nadpis", kind: "long" },
  "about.lead": { label: "Úvodní text", kind: "long" },
  "about.profileInitials": { label: "Iniciály v tmavém bloku" },
  "about.profileStats": { label: "Čísla v tmavém bloku" },
  "about.profileStats.*.label": { label: "Popis" },
  "about.profileStats.*.value": { label: "Hodnota" },
  "about.profileButton": { label: "Tlačítko v tmavém bloku" },
  "about.pathEyebrow": { label: "Cesta: štítek" },
  "about.pathTitle": { label: "Cesta: nadpis" },
  "about.path": { label: "Etapy" },
  "about.path.*.period": { label: "Období" },
  "about.path.*.title": { label: "Nadpis" },
  "about.path.*.text": { label: "Text", kind: "long" },
  "about.beliefsEyebrow": { label: "Zásady: štítek" },
  "about.beliefsTitle": { label: "Zásady: nadpis" },
  "about.beliefs": { label: "Zásady" },
  "about.ctaTitle": { label: "Závěr: nadpis" },
  "about.ctaText": { label: "Závěr: text", kind: "long" },
  "about.ctaButton": { label: "Závěr: tlačítko" },

  // ── Kontakt ──────────────────────────────────────────────────────
  "kontakt.metaTitle": { label: "Titulek stránky" },
  "kontakt.metaDescription": { label: "Popis pro vyhledávače", kind: "long" },
  "kontakt.eyebrow": { label: "Štítek nad nadpisem" },
  "kontakt.title": { label: "Nadpis", kind: "long" },
  "kontakt.lead": { label: "Úvodní text", kind: "long" },
  "kontakt.info": { label: "Body vedle formuláře" },
  "kontakt.info.*.icon": { label: "Ikona", kind: "select", options: ICONS },
  "kontakt.info.*.title": { label: "Nadpis" },
  "kontakt.info.*.text": { label: "Text", hint: "Necháte-li prázdné u e-mailu a místa, doplní se údaje z části Web a kontakt." },
  "kontakt.formNameLabel": { label: "Formulář: jméno" },
  "kontakt.formEmailLabel": { label: "Formulář: e-mail" },
  "kontakt.formCompanyLabel": { label: "Formulář: firma" },
  "kontakt.formCompanyPlaceholder": { label: "Formulář: firma, šedý text" },
  "kontakt.formInterestLabel": { label: "Formulář: co zajímá" },
  "kontakt.formMessageLabel": { label: "Formulář: zpráva" },
  "kontakt.formMessagePlaceholder": { label: "Formulář: zpráva, šedý text", kind: "long" },
  "kontakt.formWhenLabel": { label: "Formulář: termín" },
  "kontakt.formWhenPlaceholder": { label: "Formulář: termín, šedý text" },
  "kontakt.formSubmit": { label: "Formulář: tlačítko" },
  "kontakt.formNote": { label: "Formulář: poznámka pod tlačítkem", kind: "long" },
  "kontakt.formSuccessTitle": { label: "Po odeslání: nadpis" },
  "kontakt.formSuccessText": { label: "Po odeslání: text", kind: "long" },
  "kontakt.formSuccessAgain": { label: "Po odeslání: tlačítko" },

  // ── Patička ──────────────────────────────────────────────────────
  "footer.text": { label: "Text v patičce", kind: "long" },
  "footer.navLabel": { label: "Nadpis sloupce s menu" },
  "footer.contactLabel": { label: "Nadpis sloupce s kontaktem" },
};

/** Obecné popisky pro klíče, které se opakují napříč obsahem. */
const COMMON: Record<string, string> = {
  title: "Nadpis",
  text: "Text",
  label: "Popisek",
  name: "Název",
  href: "Odkaz",
  value: "Hodnota",
  url: "Adresa",
  short: "Jedna věta",
  description: "Popis",
  eyebrow: "Štítek",
  lead: "Úvodní text",
  cta: "Tlačítko",
  icon: "Ikona",
  period: "Období",
  bold: "Tučný začátek",
  number: "Číslo",
};

/** Cesta v datech → klíč do tabulky výše (pořadí v seznamu se nahradí `*`). */
export function pathKey(path: (string | number)[]): string {
  return path.map((p) => (typeof p === "number" ? "*" : p)).join(".");
}

export function fieldConfig(path: (string | number)[]): FieldConfig {
  const key = pathKey(path);
  if (FIELDS[key]) return FIELDS[key];
  const last = path[path.length - 1];
  if (typeof last === "string" && COMMON[last]) return { label: COMMON[last] };
  return {};
}

/** Název pole, když ho nikdo nepojmenoval: `heroTitle` → `Hero title`. */
export function fallbackLabel(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Podle čeho se položka seznamu pojmenuje v přehledu. */
export function itemTitle(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    for (const k of ["name", "title", "label", "bold", "period", "number", "slug"]) {
      const v = o[k];
      if (typeof v === "string" && v.trim()) return v.length > 60 ? v.slice(0, 60) + "…" : v;
    }
  }
  if (typeof item === "string" && item.trim()) return item;
  return `Položka ${index + 1}`;
}
