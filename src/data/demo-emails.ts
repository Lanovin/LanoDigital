/**
 * Ukázková schránka pro demo třídění. Maily vychází z eval sady projektu
 * `trideni_mailu` (vzorky.json + zlatý standard). Výsledky jsou předpočítané,
 * aby demo běželo bez API klíče a nestálo nic.
 */
export type EmailCategory = "akce_nutna" | "dulezite_info" | "k_precteni" | "nepodstatne" | "podezrele";

export const emailCategories: Record<
  EmailCategory,
  { name: string; short: string; tone: string; dot: string }
> = {
  akce_nutna: { name: "Vyžaduje akci", short: "Akce", tone: "bg-rust text-cream", dot: "bg-rust" },
  dulezite_info: { name: "Důležité, bez akce", short: "Info", tone: "bg-sky text-cream", dot: "bg-sky" },
  k_precteni: { name: "K přečtení", short: "Číst", tone: "bg-moss text-cream", dot: "bg-moss" },
  nepodstatne: { name: "Nepodstatné", short: "Šum", tone: "bg-ink/70 text-cream", dot: "bg-ink/60" },
  podezrele: { name: "Podezřelé", short: "Podvod", tone: "bg-ink text-paper", dot: "bg-ink" },
};

export type DemoEmail = {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  time: string;
  result: { category: EmailCategory; confidence: number; reason: string };
};

export const demoEmails: DemoEmail[] = [
  {
    id: "m01",
    fromName: "Jana Kratochvílová",
    from: "j.kratochvilova@vyzkum-brno.cz",
    subject: "Připomínky k rozpočtu — potřebuju do pátku",
    preview: "Můžeš se prosím podívat hlavně na položku 3 (externí služby)? Potřebovala bych to uzavřít do pátku…",
    time: "9:14",
    result: { category: "akce_nutna", confidence: 0.96, reason: "Přímá prosba o kontrolu s termínem do pátku." },
  },
  {
    id: "m02",
    fromName: "Alza.cz",
    from: "newsletter@alza.cz",
    subject: "🔥 Jen dnes: až 40 % sleva na notebooky!",
    preview: "Nenechte si ujít největší slevy roku! Akce platí do půlnoci.",
    time: "6:02",
    result: { category: "nepodstatne", confidence: 0.98, reason: "Hromadná slevová akce e-shopu, žádný dopad." },
  },
  {
    id: "m03",
    fromName: "ČSOB",
    from: "no-reply@csob.cz",
    subject: "Výpis z účtu za srpen 2026",
    preview: "Výpis z Vašeho účtu za období 1.–31. 8. 2026 je k dispozici v internetovém bankovnictví.",
    time: "včera",
    result: { category: "dulezite_info", confidence: 0.94, reason: "Doklad k uchování, nic po mně nechce." },
  },
  {
    id: "m04",
    fromName: "Česká pošta",
    from: "info@ceska-posta-dorucovani.info",
    subject: "Zásilka nebyla doručena — doplaťte 49 Kč",
    preview: "Kvůli nedostatečnému poštovnému je nutné doplatit 49 Kč do 24 hodin… ZAPLATIT NYNÍ",
    time: "11:47",
    result: { category: "podezrele", confidence: 0.97, reason: "Podvržená doména, naléhavost, platba přes cizí odkaz." },
  },
  {
    id: "m06",
    fromName: "GitHub",
    from: "notifications@github.com",
    subject: "[org/projekt] Pull request #142 čeká na vaše review",
    preview: "@kolega požádal o vaše review na PR #142. PR blokuje release naplánovaný na 28. 8.",
    time: "8:30",
    result: { category: "akce_nutna", confidence: 0.85, reason: "Automatická notifikace, ale obsahuje konkrétní úkol, který blokuje release." },
  },
  {
    id: "m07",
    fromName: "The Pragmatic Engineer",
    from: "newsletter@pragmaticengineer.com",
    subject: "Jak velké firmy řeší on-call rotace",
    preview: "V tomto vydání: rozbor on-call praktik ve Stripe, Datadog a Shopify.",
    time: "včera",
    result: { category: "k_precteni", confidence: 0.92, reason: "Odborný newsletter bez termínu a dopadu." },
  },
  {
    id: "m10",
    fromName: "Fakturoid",
    from: "noreply@fakturoid.cz",
    subject: "Faktura 2026-0341 je po splatnosti",
    preview: "Faktura na částku 18 500 Kč byla splatná 20. 8. 2026 a dosud nebyla uhrazena. Doporučujeme odeslat upomínku.",
    time: "10:00",
    result: { category: "akce_nutna", confidence: 0.93, reason: "Nezaplacená faktura, je potřeba poslat upomínku." },
  },
  {
    id: "m11",
    fromName: "Google",
    from: "no-reply@accounts.google.com",
    subject: "Nové přihlášení k vašemu účtu",
    preview: "Zaznamenali jsme přihlášení. Zařízení: Windows, Chrome. Pokud jste to byli vy, nemusíte nic dělat.",
    time: "včera",
    result: { category: "dulezite_info", confidence: 0.81, reason: "Legitimní doména a text výslovně říká, že není potřeba nic dělat." },
  },
  {
    id: "m12",
    fromName: "Petr Malý",
    from: "p.maly@dodavatel-it.cz",
    subject: "Nabídka spolupráce — cloudová infrastruktura",
    preview: "Oslovuji Vás s nabídkou služeb v oblasti cloudové infrastruktury. Měl byste zájem o krátký hovor?",
    time: "před 3 dny",
    result: { category: "nepodstatne", confidence: 0.78, reason: "Osobně psané, ale nevyžádaná studená nabídka." },
  },
  {
    id: "m14",
    fromName: "Netflix",
    from: "info@netflix-ucet-overeni.com",
    subject: "Váš účet bude pozastaven",
    preview: "Aktualizujte platební údaje zde… Zadejte prosím číslo karty a CVV pro ověření.",
    time: "3:12",
    result: { category: "podezrele", confidence: 0.99, reason: "Cizí doména, žádost o číslo karty a CVV." },
  },
  {
    id: "m15",
    fromName: "Notion",
    from: "team@makenotion.com",
    subject: "Novinky ve verzi 2.48",
    preview: "Vylepšené databázové pohledy, rychlejší vyhledávání a nový editor vzorců.",
    time: "před týdnem",
    result: { category: "k_precteni", confidence: 0.9, reason: "Changelog nástroje, který používám. Bez termínu." },
  },
  {
    id: "m13",
    fromName: "Finanční správa",
    from: "podatelna@fs.gov.cz",
    subject: "Výzva k podání dodatečného daňového přiznání",
    preview: "Vyzýváme k podání dodatečného daňového přiznání za rok 2025 ve lhůtě 15 dnů od doručení.",
    time: "před 4 dny",
    result: { category: "akce_nutna", confidence: 0.95, reason: "Úřední výzva s lhůtou 15 dnů." },
  },
];
