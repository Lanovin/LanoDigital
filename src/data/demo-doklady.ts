/**
 * Ukázkové doklady pro demo čtení. Vychází z ukázkových vzorků projektu
 * `cteni_dokladu` a z jeho skutečného výstupu (doklady.csv).
 */
export type DokladStav = "ok" | "nesedi" | "ke_kontrole" | "duplicita";

export type DemoDoklad = {
  id: string;
  file: string;
  kind: "pdf" | "jpg";
  label: string;
  /** Co je na dokladu vidět v miniatuře. */
  glance: { supplier: string; total: string };
  result: {
    stav: DokladStav;
    typ: "faktura" | "uctenka" | "jine";
    cislo: string | null;
    dodavatel: string;
    ico: string | null;
    splatnost: string | null;
    mena: "CZK" | "EUR";
    bezDph: number | null;
    dph: number | null;
    sDph: number | null;
    jistota: number;
    nalezy: string[];
    checks: { label: string; ok: boolean }[];
  };
};

export const demoDoklady: DemoDoklad[] = [
  {
    id: "d1",
    file: "faktura-webhosting.pdf",
    kind: "pdf",
    label: "Běžná faktura",
    glance: { supplier: "WEBHOSTING CZ s.r.o.", total: "8 094,90 Kč" },
    result: {
      stav: "ok",
      typ: "faktura",
      cislo: "2026-0417",
      dodavatel: "WEBHOSTING CZ s.r.o.",
      ico: "26349175",
      splatnost: "26. 8. 2026",
      mena: "CZK",
      bezDph: 6690,
      dph: 1404.9,
      sDph: 8094.9,
      jistota: 0.97,
      nalezy: [],
      checks: [
        { label: "základ + DPH = celkem", ok: true },
        { label: "sazba 21 % × základ", ok: true },
        { label: "IČO 26349175 – kontrolní součet", ok: true },
        { label: "IBAN odpovídá číslu účtu", ok: true },
      ],
    },
  },
  {
    id: "d2",
    file: "faktura-stavebniny.pdf",
    kind: "pdf",
    label: "Faktura s chybou",
    glance: { supplier: "Stavebniny Hrubý s.r.o.", total: "54 028,00 Kč" },
    result: {
      stav: "nesedi",
      typ: "faktura",
      cislo: "2600841",
      dodavatel: "Stavebniny Hrubý s.r.o.",
      ico: "28571347",
      splatnost: "2. 9. 2026",
      mena: "CZK",
      bezDph: 44200,
      dph: 9828,
      sDph: 54028,
      jistota: 0.95,
      nalezy: ["Sazba 21 % ze základu 44 200,00 je 9 282,00, na dokladu je daň 9 828,00.", "Druhé čtení nepomohlo – chyba je na papíře, ne v přepisu."],
      checks: [
        { label: "základ + DPH = celkem", ok: true },
        { label: "sazba 21 % × základ", ok: false },
        { label: "IČO 28571347 – kontrolní součet", ok: true },
      ],
    },
  },
  {
    id: "d3",
    file: "faktura-catering.pdf",
    kind: "pdf",
    label: "Dvě sazby DPH",
    glance: { supplier: "Bistro U Lípy s.r.o.", total: "32 072,00 Kč" },
    result: {
      stav: "ok",
      typ: "faktura",
      cislo: "FV2608/2026",
      dodavatel: "Bistro U Lípy s.r.o.",
      ico: "47182059",
      splatnost: "27. 9. 2026",
      mena: "CZK",
      bezDph: 27800,
      dph: 4272,
      sDph: 32072,
      jistota: 0.97,
      nalezy: [],
      checks: [
        { label: "rekapitulace 12 % + 21 %", ok: true },
        { label: "součet položek = základ", ok: true },
        { label: "IČO 47182059 – kontrolní součet", ok: true },
      ],
    },
  },
  {
    id: "d4",
    file: "faktura-webhosting-kopie.pdf",
    kind: "pdf",
    label: "Kopie téže faktury",
    glance: { supplier: "WEBHOSTING CZ s.r.o.", total: "8 094,90 Kč" },
    result: {
      stav: "duplicita",
      typ: "faktura",
      cislo: "2026-0417",
      dodavatel: "WEBHOSTING CZ s.r.o.",
      ico: "26349175",
      splatnost: "26. 8. 2026",
      mena: "CZK",
      bezDph: 6690,
      dph: 1404.9,
      sDph: 8094.9,
      jistota: 0.97,
      nalezy: ["Stejné číslo dokladu od stejného dodavatele už je ve faktura-webhosting.pdf. Do součtu se nepočítá."],
      checks: [
        { label: "základ + DPH = celkem", ok: true },
        { label: "dodavatel + číslo dokladu unikátní", ok: false },
      ],
    },
  },
  {
    id: "d5",
    file: "invoice-eur.pdf",
    kind: "pdf",
    label: "Zahraniční v EUR",
    glance: { supplier: "Nordwind Kreativ GmbH", total: "3 450,00 €" },
    result: {
      stav: "ok",
      typ: "faktura",
      cislo: "2026-0891",
      dodavatel: "Nordwind Kreativ GmbH",
      ico: null,
      splatnost: "4. 9. 2026",
      mena: "EUR",
      bezDph: 3450,
      dph: 0,
      sDph: 3450,
      jistota: 0.95,
      nalezy: [],
      checks: [
        { label: "reverse charge – DPH 0", ok: true },
        { label: "IBAN DE10… – modulo 97", ok: true },
      ],
    },
  },
  {
    id: "d6",
    file: "uctenka-kavarna-foto.jpg",
    kind: "jpg",
    label: "Fotka účtenky z mobilu",
    glance: { supplier: "KAVÁRNA ZRNKO s.r.o.", total: "318,00 Kč" },
    result: {
      stav: "ok",
      typ: "uctenka",
      cislo: "2026/09/0142",
      dodavatel: "KAVÁRNA ZRNKO s.r.o.",
      ico: "11946270",
      splatnost: null,
      mena: "CZK",
      bezDph: 283.93,
      dph: 34.07,
      sDph: 318,
      jistota: 0.82,
      nalezy: [],
      checks: [
        { label: "ceny s DPH – zpětný přepočet", ok: true },
        { label: "IČO 11946270 – kontrolní součet", ok: true },
      ],
    },
  },
  {
    id: "d7",
    file: "dodaci-list.pdf",
    kind: "pdf",
    label: "Dodací list (není doklad)",
    glance: { supplier: "Stavebniny Hrubý s.r.o.", total: "—" },
    result: {
      stav: "ok",
      typ: "jine",
      cislo: "DL-2026-0912",
      dodavatel: "Stavebniny Hrubý s.r.o.",
      ico: "28571347",
      splatnost: null,
      mena: "CZK",
      bezDph: null,
      dph: null,
      sDph: null,
      jistota: 0.96,
      nalezy: [],
      checks: [{ label: "bez cen – nic se nedopočítává", ok: true }],
    },
  },
];

export const dokladStavy: Record<DokladStav, { label: string; cls: string }> = {
  ok: { label: "v pořádku", cls: "bg-moss text-cream" },
  nesedi: { label: "nesedí", cls: "bg-rust text-cream" },
  ke_kontrole: { label: "ke kontrole", cls: "bg-paper-deep text-ink" },
  duplicita: { label: "duplicita", cls: "bg-ink text-paper" },
};
