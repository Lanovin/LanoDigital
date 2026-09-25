/**
 * Tvar veškerého textového obsahu webu.
 *
 * Tohle je jediné místo, kde je popsané, co všechno jde přes administraci
 * měnit. Výchozí hodnoty (tedy texty, se kterými web vznikl) jsou vedle
 * v `defaults.ts`; uložené změny se na ně jen přiloží, takže když sem
 * přibude nové pole, starý uložený obsah se nerozbije.
 *
 * Co tady schválně NENÍ: ukázková data tří dem (maily, doklady, inzeráty).
 * Nejsou to texty webu, ale vstupy, na kterých dema počítají — žijí
 * v `src/data/demo-*.ts` a mění se v kódu.
 */

/** Ikony, které jde vybrat u služeb a kontaktních bodů. */
export type IconName =
  | "bot"
  | "globe"
  | "chat"
  | "spark"
  | "mail"
  | "file"
  | "search"
  | "calendar"
  | "clock"
  | "pin"
  | "check";

export type NavItem = { label: string; href: string };
export type TitleText = { title: string; text: string };

export type SystemStep = {
  label: string;
  /** Kdo krok dělá: vstup / model / kód / výstup. Řídí barvu štítku. */
  who: "vstup" | "model" | "kod" | "vystup";
  note: string;
};

export type SystemContent = {
  /** Napojení na ukázku a adresu stránky. Needitovatelné. */
  slug: "trideni-mailu" | "cteni-dokladu" | "hledani-inzeratu";
  name: string;
  short: string;
  pitch: string;
  forWhom: string;
  insights: TitleText[];
  steps: SystemStep[];
  outputs: string[];
  /** Co systém neumí nebo schválně nedělá. */
  limits: string[];
  safety: string[];
  metricValue: string;
  metricLabel: string;
};

export type WebRef = {
  /** Určuje, které screenshoty z `public/weby/` se použijí. Needitovatelné. */
  slug: string;
  name: string;
  url: string;
  display: string;
  kind: string;
  short: string;
  description: string;
  highlights: string[];
  accent: string;
  live: boolean;
  liveNote: string;
};

export type Content = {
  site: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    owner: { name: string; role: string; email: string; location: string };
    nav: NavItem[];
    cta: NavItem;
  };

  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroPrimary: string;
    heroSecondary: string;
    marquee: string[];
    systemsEyebrow: string;
    systemsTitle: string;
    systemsLead: string;
    systemsDetailLabel: string;
    webyEyebrow: string;
    webyTitle: string;
    webyLead: string;
    webyMore: string;
    flowEyebrow: string;
    flowTitle: string;
    flowLead: string;
    flowCards: TitleText[];
    aboutEyebrow: string;
    aboutTitle: string;
    aboutText: string;
    aboutButton: string;
    aboutStats: { value: string; label: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };

  sluzby: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    services: {
      icon: IconName;
      name: string;
      tagline: string;
      text: string;
      bullets: string[];
      price: string;
      href: string;
      cta: string;
    }[];
    /** Sekce „co jde a co ne“: co se automatizovat dá a co ne. */
    scopeEyebrow: string;
    scopeTitle: string;
    scopeLead: string;
    scopeCanLabel: string;
    scopeCan: string[];
    scopeCannotLabel: string;
    scopeCannot: string[];
    processEyebrow: string;
    processTitle: string;
    process: { number: string; title: string; text: string }[];
    principlesEyebrow: string;
    principlesTitle: string;
    principles: { bold: string; text: string }[];
  };

  systemyPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    flowLabel: string;
    detailButton: string;
    bonusBadge: string;
    bonusTitle: string;
    bonusText: string;
    bonusButton: string;
  };

  systemDetail: {
    backLabel: string;
    systemLabel: string;
    stepLabel: string;
    demoEyebrow: string;
    demoTitle: string;
    demoLead: string;
    forWhomLabel: string;
    outputsLabel: string;
    limitsLabel: string;
    safetyLabel: string;
    insightsLabel: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaButton: string;
    nextPrefix: string;
  };

  systems: SystemContent[];

  webyPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    howEyebrow: string;
    howTitle: string;
    how: TitleText[];
    ctaButton: string;
  };

  weby: WebRef[];

  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    profileInitials: string;
    profileStats: { label: string; value: string }[];
    profileButton: string;
    pathEyebrow: string;
    pathTitle: string;
    path: { period: string; title: string; text: string }[];
    beliefsEyebrow: string;
    beliefsTitle: string;
    beliefs: TitleText[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };

  kontakt: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    info: { icon: IconName; title: string; text: string }[];
    formNameLabel: string;
    formEmailLabel: string;
    formCompanyLabel: string;
    formCompanyPlaceholder: string;
    formInterestLabel: string;
    formMessageLabel: string;
    formMessagePlaceholder: string;
    formWhenLabel: string;
    formWhenPlaceholder: string;
    formSubmit: string;
    formNote: string;
    formSuccessTitle: string;
    formSuccessText: string;
    formSuccessAgain: string;
  };

  footer: {
    text: string;
    navLabel: string;
    contactLabel: string;
  };
};
