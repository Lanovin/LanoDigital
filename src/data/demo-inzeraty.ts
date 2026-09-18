/**
 * Ukázkové poptávky a nabídka pro demo hledání. Vychází z ukázkového feedu
 * projektu `hledani_inzeratu` (data/inzeraty.xml, data/poptavky.json).
 * Výsledky jsou předpočítané tak, jak je systém vrací.
 */
export type Car = {
  id: string;
  name: string;
  year: number;
  km: number;
  fuel: "nafta" | "benzin" | "hybrid" | "elektro";
  gearbox: "automat" | "manuál";
  body: string;
  price: number;
  city: string;
  features: string[];
  note: string;
};

export const cars: Car[] = [
  { id: "a1", name: "Škoda Octavia Combi 2.0 TDI", year: 2019, km: 112000, fuel: "nafta", gearbox: "automat", body: "kombi", price: 389000, city: "Brno", features: ["tažné zařízení", "navigace", "vyhřívaná sedadla"], note: "Serviska, druhý majitel, nehavarované. Velký kufr." },
  { id: "a2", name: "Škoda Octavia Combi 1.6 TDI", year: 2016, km: 243000, fuel: "nafta", gearbox: "manuál", body: "kombi", price: 199000, city: "Ostrava", features: ["tažné zařízení", "tempomat"], note: "Bývalé firemní, vyšší nájezd, nová STK." },
  { id: "a3", name: "VW Passat Variant 2.0 TDI DSG", year: 2018, km: 134000, fuel: "nafta", gearbox: "automat", body: "kombi", price: 419000, city: "Praha", features: ["tažné zařízení", "adaptivní tempomat", "kůže"], note: "Velmi prostorný kufr, nehavarovaný, po velkém servisu." },
  { id: "a4", name: "Ford Focus Kombi 1.5 EcoBoost", year: 2020, km: 78000, fuel: "benzin", gearbox: "manuál", body: "kombi", price: 355000, city: "Plzeň", features: ["parkovací kamera", "tempomat"], note: "Bez tažného, lze dodatečně namontovat." },
  { id: "a5", name: "BMW 320d Touring", year: 2017, km: 141000, fuel: "nafta", gearbox: "automat", body: "kombi", price: 399000, city: "Praha", features: ["tažné zařízení", "kůže", "navigace"], note: "Závada na turbodmychadle, nepojízdné, odtah nutný." },
  { id: "a6", name: "Toyota Corolla TS 1.8 Hybrid", year: 2021, km: 64000, fuel: "hybrid", gearbox: "automat", body: "kombi", price: 519000, city: "Brno", features: ["tažné zařízení", "adaptivní tempomat"], note: "Spotřeba ve městě pod 5 l, záruka do 2028." },
  { id: "a7", name: "Dacia Duster 1.3 TCe 4x4", year: 2019, km: 96000, fuel: "benzin", gearbox: "manuál", body: "SUV", price: 329000, city: "Hradec Králové", features: ["tažné zařízení", "4x4", "vyhřívaná sedadla"], note: "Pohon všech kol, výborné na sníh, levná údržba." },
  { id: "a8", name: "Mazda 3 2.0 Skyactiv-G", year: 2019, km: 71000, fuel: "benzin", gearbox: "manuál", body: "hatchback", price: 349000, city: "Olomouc", features: ["head-up displej", "LED světla"], note: "Malý kufr, spíš pro jednotlivce nebo pár." },
  { id: "a9", name: "Škoda Fabia Combi 1.0 TSI", year: 2018, km: 88000, fuel: "benzin", gearbox: "manuál", body: "kombi", price: 259000, city: "Pardubice", features: ["klimatizace", "tempomat"], note: "Úsporné městské auto, kufr 530 l." },
  { id: "a10", name: "Peugeot 5008 2.0 BlueHDi 7 míst", year: 2018, km: 128000, fuel: "nafta", gearbox: "automat", body: "MPV", price: 429000, city: "Praha", features: ["tažné zařízení", "7 sedadel", "panorama"], note: "Sedmimístná verze, ideální pro velkou rodinu." },
  { id: "a11", name: "Hyundai i30 Kombi 1.6 CRDi", year: 2020, km: 103000, fuel: "nafta", gearbox: "manuál", body: "kombi", price: 379000, city: "Zlín", features: ["tažné zařízení", "couvací kamera"], note: "Tovární záruka do 2027, kufr 602 l, nehavarované." },
  { id: "a12", name: "Tesla Model 3 Long Range", year: 2020, km: 89000, fuel: "elektro", gearbox: "automat", body: "sedan", price: 649000, city: "Praha", features: ["autopilot", "panorama"], note: "Dojezd přes 500 km, baterie 94 %." },
  { id: "a16", name: "Audi A4 Avant 2.0 TDI", year: 2015, km: 284000, fuel: "nafta", gearbox: "automat", body: "kombi", price: 279000, city: "Ústí n. L.", features: ["navigace", "xenony"], note: "Po havárii, neautorizovaný servis, dovoz z Německa." },
  { id: "a17", name: "Citroën Berlingo 1.5 BlueHDi", year: 2019, km: 119000, fuel: "nafta", gearbox: "manuál", body: "dodávka", price: 339000, city: "Brno", features: ["tažné zařízení", "přepážka", "posuvné dveře"], note: "Užitková verze, nákladový prostor 3,3 m³." },
  { id: "a18", name: "Škoda Superb Combi 2.0 TDI DSG", year: 2018, km: 147000, fuel: "nafta", gearbox: "automat", body: "kombi", price: 449000, city: "Brno", features: ["tažné zařízení", "navigace", "el. víko kufru"], note: "Největší kufr ve třídě (660 l), nehavarované." },
  { id: "a19", name: "Nissan Qashqai 1.3 DIG-T", year: 2020, km: 67000, fuel: "benzin", gearbox: "automat", body: "SUV", price: 469000, city: "Praha", features: ["panorama", "couvací kamera"], note: "Pohon předních kol, není 4x4." },
  { id: "a20", name: "SEAT Leon ST 2.0 TDI", year: 2019, km: 145000, fuel: "nafta", gearbox: "manuál", body: "kombi", price: 335000, city: "Brno", features: ["tažné zařízení", "navigace"], note: "Sesterský vůz Octavie, kufr 587 l, nehavarované." },
];

export type Verdict = "hodi_se" | "castecne" | "nehodi_se";
export type Prefilter = "prosel" | "tesne" | "vypadl";

export type DemoPoptavka = {
  id: string;
  label: string;
  from: string;
  subject: string;
  body: string;
  criteria: { label: string; value: string }[];
  nejasnosti: string[];
  prefilter: Record<string, { state: Prefilter; why?: string }>;
  ranking: { carId: string; verdict: Verdict; why: string }[];
  emptyReasons?: { count: number; reason: string }[];
};

export const demoPoptavky: DemoPoptavka[] = [
  {
    id: "p1",
    label: "Rodina, kombík, tažné",
    from: "novakova.jana@email.cz",
    subject: "Dotaz - rodinné auto",
    body:
      "Sháníme s manželem auto pro rodinu. Máme dvě děti (6 a 9 let) a labradora, takže potřebujeme hlavně velký kufr. Kombík by asi byl ideální. Rozpočet do 400 tisíc, naftu bychom brali, ročně najedeme kolem 25 tisíc km. Automat by byl fajn, ale není to podmínka. Nutnost je tažné zařízení, vozíme vozík na kola. Prosím nic hodně najetého, ideálně do 150 tisíc km.",
    criteria: [
      { label: "cena max", value: "400 000 Kč" },
      { label: "karoserie", value: "kombi" },
      { label: "palivo", value: "nafta" },
      { label: "nájezd max", value: "150 000 km" },
      { label: "musí mít", value: "tažné zařízení" },
      { label: "výhodou", value: "automat" },
      { label: "kontext", value: "2 děti, pes, chalupa, moře, 25 tis. km/rok" },
    ],
    nejasnosti: ["Nejstarší přijatelný rok výroby zákaznice neuvedla."],
    prefilter: {
      a1: { state: "prosel" },
      a11: { state: "prosel" },
      a20: { state: "prosel" },
      a5: { state: "prosel" },
      a3: { state: "tesne", why: "cena 419 000 je o 5 % nad rozpočtem" },
      a2: { state: "vypadl", why: "nájezd 243 000 km" },
      a18: { state: "vypadl", why: "cena 449 000 Kč" },
      a10: { state: "vypadl", why: "karoserie MPV" },
      a4: { state: "vypadl", why: "palivo benzin" },
      a6: { state: "vypadl", why: "cena 519 000 Kč, hybrid" },
      a7: { state: "vypadl", why: "SUV, benzin" },
      a8: { state: "vypadl", why: "hatchback, benzin" },
      a9: { state: "vypadl", why: "benzin" },
      a12: { state: "vypadl", why: "sedan, elektro, cena" },
      a16: { state: "vypadl", why: "nájezd 284 000 km" },
      a17: { state: "vypadl", why: "dodávka" },
      a19: { state: "vypadl", why: "SUV, benzin, cena" },
    },
    ranking: [
      { carId: "a1", verdict: "hodi_se", why: "Kombi s tažným a automatem, nafta, 112 tis. km, pod rozpočtem. Serviska a garážované, přesně to, co rodina popsala." },
      { carId: "a11", verdict: "hodi_se", why: "Kufr 602 l, tažné, tovární záruka do 2027. Manuál je jen preference, ne podmínka." },
      { carId: "a20", verdict: "hodi_se", why: "Stejná technika jako Octavia, kufr 587 l, tažné, o 54 tisíc levnější. Manuál." },
      { carId: "a3", verdict: "castecne", why: "Splňuje všechno včetně automatu, ale je 19 tisíc nad rozpočtem. Stojí za nabídnutí s poznámkou o ceně." },
      { carId: "a5", verdict: "nehodi_se", why: "Parametry sedí, ale auto je nepojízdné se závadou na turbu. Pro rodinu bez zkušenosti s opravami nevhodné." },
    ],
  },
  {
    id: "p2",
    label: "Student, první auto, do 150 tisíc",
    from: "tomas.student@seznam.cz",
    subject: "první auto",
    body:
      "Dobrý den, hledám svoje první auto. Jsem student, takže rozpočet je bohužel jen do 150 tisíc. Ideálně něco malého do města, benzin, nízká spotřeba, ať se to dá uživit. Máte něco takového? Díky, Tomáš",
    criteria: [
      { label: "cena max", value: "150 000 Kč" },
      { label: "palivo", value: "benzin" },
      { label: "výhodou", value: "malé, nízká spotřeba" },
      { label: "kontext", value: "první auto, město, student" },
    ],
    nejasnosti: ["Karoserie ani značka neuvedena.", "Nájezd a rok neuvedeny."],
    prefilter: Object.fromEntries(cars.map((c) => [c.id, { state: "vypadl" as Prefilter, why: c.fuel !== "benzin" ? `palivo ${c.fuel}` : `cena ${c.price.toLocaleString("cs-CZ")} Kč výrazně přesahuje 150 000 Kč` }])),
    ranking: [],
    emptyReasons: [
      { count: 17, reason: "cena výrazně přesahuje 150 000 Kč" },
      { count: 12, reason: "palivo nafta / hybrid / elektro není mezi požadovanými (benzin)" },
    ],
  },
  {
    id: "p6",
    label: "SUV 4x4 do hor, benzin",
    from: "j.bezdek@volny.cz",
    subject: "SUV do hor",
    body:
      "Zdravím, hledám SUV s pohonem všech kol, bydlíme v horách a v zimě je to bez toho peklo. Benzin, nafta mi v tomhle nájezdu nedává smysl, najedu tak 12 tisíc ročně. Do 450 tisíc. Nic po havárii. Díky, Bezděk",
    criteria: [
      { label: "cena max", value: "450 000 Kč" },
      { label: "karoserie", value: "SUV" },
      { label: "palivo", value: "benzin" },
      { label: "musí mít", value: "pohon všech kol" },
      { label: "nesmí mít", value: "po havárii" },
      { label: "kontext", value: "hory, zima, 12 tis. km/rok" },
    ],
    nejasnosti: ["Převodovka neuvedena, bereme obě."],
    prefilter: {
      a7: { state: "prosel" },
      a19: { state: "tesne", why: "cena 469 000 je o 4 % nad rozpočtem" },
      ...Object.fromEntries(cars.filter((c) => !["a7", "a19"].includes(c.id)).map((c) => [c.id, { state: "vypadl" as Prefilter, why: c.body !== "SUV" ? `karoserie ${c.body}` : "palivo" }])),
    },
    ranking: [
      { carId: "a7", verdict: "hodi_se", why: "Jediné SUV s pohonem všech kol a benzinem v nabídce. Tažné, vyhřívaná sedadla, levná údržba, na hory ideální." },
      { carId: "a19", verdict: "nehodi_se", why: "Cena by ještě prošla, ale inzerát výslovně uvádí pohon předních kol. Bez 4x4 zákazníkovi nepomůže." },
    ],
  },
];

export const verdictMeta: Record<Verdict, { label: string; cls: string }> = {
  hodi_se: { label: "hodí se", cls: "bg-moss text-cream" },
  castecne: { label: "částečně", cls: "bg-paper-deep text-ink" },
  nehodi_se: { label: "nehodí se", cls: "bg-rust text-cream" },
};
