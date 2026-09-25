import type { Content } from "./schema";

/**
 * Výchozí obsah webu — texty, se kterými web vznikl.
 *
 * Administrace do tohohle souboru nikdy nesahá. Ukládá jen to, co se změnilo,
 * do `content/site.json`, a při čtení se obojí spojí. Díky tomu jde v adminu
 * kdykoli dát „vrátit na výchozí“ a je jasné, co je původní text.
 *
 * Zápis nadpisů: hvězdičky dělají oranžové zvýraznění (`*takhle*`),
 * nový řádek se zalomí. Nic jiného se neinterpretuje.
 */
export const DEFAULT_CONTENT: Content = {
  site: {
    name: "LanoDigital",
    tagline: "Systémy, které za vás udělají práci.",
    description:
      "LanoDigital staví AI systémy a webové stránky pro malé firmy a živnostníky. Třídění pošty, přepis faktur, hledání v nabídce a k tomu weby, které se dobře čtou.",
    url: "https://lanodigital.cz",
    owner: {
      name: "Štěpán Lano",
      role: "zakladatel, vývojář",
      email: "kontakt@lanodigital.cz",
      location: "Česko",
    },
    nav: [
      { label: "Služby", href: "/sluzby" },
      { label: "Ukázky", href: "/systemy" },
      { label: "Weby", href: "/weby" },
      { label: "O mně", href: "/o-mne" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    cta: { label: "Konzultace zdarma", href: "/kontakt" },
  },

  home: {
    heroEyebrow: "AI workflow · webové stránky",
    heroTitle: "Stavíme systémy,\nkteré za vás *udělají práci*.",
    heroLead:
      "Pošta, faktury, poptávky. Věci, které dnes někdo přepisuje ručně. Postavím vám AI systém, který je přečte, zkontroluje a připraví k rozhodnutí. A když potřebujete web, udělám i ten.",
    heroPrimary: "Vyzkoušet ukázky",
    heroSecondary: "Konzultace zdarma",
    marquee: [
      "třídění pošty",
      "přepis faktur",
      "hledání v nabídce",
      "webové stránky",
      "kontrola dokladů",
      "automatizace",
      "přehledy, které se dají číst",
    ],
    systemsEyebrow: "Ukázky systémů",
    systemsTitle: "Tři systémy, které si můžete *rozkliknout*.",
    systemsLead:
      "Místo slibů si to vyzkoušejte. Každá ukázka přehrává, co systém opravdu udělal se vzorovými daty. Klikněte, sledujte a podívejte se, proč rozhodl tak, jak rozhodl.",
    systemsDetailLabel: "Co to umí a neumí",
    webyEyebrow: "Webové stránky",
    webyTitle: "Weby a aplikace, *které někdo používá*.",
    webyLead:
      "Od prezentačního webu až po aplikaci s účty a platbami kartou. Projeďte si je rovnou tady. Mika Auto se dá spustit naživo přímo v dlaždici.",
    webyMore: "Více o tom, jak weby dělám →",
    flowEyebrow: "Jak to funguje",
    flowTitle: "Přečte, zkontroluje, připraví. *Rozhodujete vy.*",
    flowLead:
      "Všechny systémy fungují stejně. AI přečte to, čemu by jinak musel rozumět člověk: mail, fakturu, poptávku. Co se dá spočítat nebo ověřit, se pak zkontroluje zvlášť. A když něco nesedí, systém to řekne, místo aby to schoval.",
    flowCards: [
      {
        title: "AI čte, výpočet kontroluje",
        text: "Jestli 44 200 × 0,21 je opravdu 9 282, se neodhaduje. Spočítá se to obyčejným výpočtem, pokaždé stejně.",
      },
      {
        title: "Pokaždé stejný výsledek",
        text: "Výstup má vždycky stejnou podobu: stejné sloupce, stejné kategorie. Dá se na něj spolehnout a dál s ním pracovat.",
      },
      {
        title: "Nic se neděje bez vás",
        text: "Systémy navrhují, ne jednají. Nic neodesílají, neplatí ani nemažou. Poslední slovo máte vždycky vy.",
      },
    ],
    aboutEyebrow: "Kdo za tím stojí",
    aboutTitle: "Jsem Štěpán Lano. Stavím věci, které se dají vyzkoušet.",
    aboutText:
      "Je mi 18 a poslední rok stavím systémy, které za lidi dělají opakovanou práci s poštou a doklady. U každého vím, jak často se trefí, a každý si můžete vyzkoušet. LanoDigital je způsob, jak to dělat i pro vás.",
    aboutButton: "Víc o mně",
    aboutStats: [
      { value: "3", label: "systémy k vyzkoušení" },
      { value: "3", label: "weby a aplikace online" },
      { value: "30 min", label: "první konzultace zdarma" },
    ],
    ctaTitle: "Máte něco, co se dnes dělá ručně?",
    ctaText:
      "Pojďme si to na půl hodiny projít. Řeknu vám rovnou, jestli má smysl to automatizovat a co byste na konci dostali.",
    ctaButton: "Domluvit konzultaci zdarma",
  },

  sluzby: {
    metaTitle: "Služby",
    metaDescription:
      "AI systémy a automatizace, webové stránky a konzultace pro malé firmy a živnostníky. Co umím, co ne, jak spolupráce probíhá a kolik to stojí.",
    eyebrow: "Služby",
    title: "Tři věci, které umím *dobře*.",
    lead: "Nedělám všechno. Dělám AI systémy, které za vás udělají opakovanou práci s poštou a doklady, weby, které se dobře čtou, a konzultace, po kterých víte, na čem jste.",
    services: [
      {
        icon: "bot",
        name: "AI systémy a automatizace",
        tagline: "Systém, který přečte, zkontroluje a připraví k rozhodnutí.",
        text: "Třídění pošty, přepis faktur a účtenek, hledání v nabídce podle poptávky, příprava podkladů. Postavím systém na míru tomu, s čím pracujete, s kontrolou, která zachytí chyby AI, a s přehledem, kterému rozumíte.",
        bullets: [
          "Rozbor toho, co se dnes dělá ručně",
          "Vyzkoušení na vzorku vašich dat",
          "Kontrola čísel a údajů, ne slepá důvěra v AI",
          "Předem změřená přesnost, ne odhad",
          "Zprovoznění a návod, jak s tím pracovat",
        ],
        price: "od 15 000 Kč",
        href: "/systemy",
        cta: "Podívat se na ukázky",
      },
      {
        icon: "globe",
        name: "Webové stránky",
        tagline: "Rychlé, čitelné, s kontaktem na dosah palce.",
        text: "Prezentační weby pro živnostníky a malé firmy. Návrh, texty, spuštění. Bez zbytečností, ale s charakterem, aby web vypadal jako vy, ne jako šablona.",
        bullets: [
          "Návrh struktury a vzhledu",
          "Navržený hlavně pro mobil",
          "Nastavení pro vyhledávače a rychlé načtení",
          "Kontaktní formulář, mapa, ceník",
          "Zprovoznění na vaší doméně",
        ],
        price: "od 8 000 Kč",
        href: "/weby",
        cta: "Hotové weby",
      },
      {
        icon: "chat",
        name: "Konzultace a audit",
        tagline: "Půl hodiny, po které víte, jestli to má smysl.",
        text: "Projdeme, co ve firmě zabírá čas. Řeknu vám rovnou, co se dá automatizovat, co ne a proč. A taky kolik by to zhruba stálo. Bez závazků.",
        bullets: [
          "Online nebo osobně",
          "Konkrétní návrh, ne obecné rady",
          "Odhad ceny a času",
          "Když to nedává smysl, řeknu to",
        ],
        price: "první zdarma",
        href: "/kontakt",
        cta: "Domluvit termín",
      },
    ],
    scopeEyebrow: "Co jde a co ne",
    scopeTitle: "Ne všechno se vyplatí *automatizovat*.",
    scopeLead:
      "AI není kouzlo. Nejvíc pomůže u práce, která se pořád opakuje a má podobnou podobu. Tady je, co zvládne dobře a kde je lepší to nechat na člověku.",
    scopeCanLabel: "Dá se automatizovat",
    scopeCan: [
      "Práce, která se opakuje každý den nebo týden: pošta, faktury, objednávky, poptávky",
      "Přepisování z papíru, fotky, PDF nebo mailu do tabulky",
      "Třídění a hledání: co spěchá, co je důležité, co se zákazníkovi hodí",
      "Kontrola, jestli čísla a údaje sedí",
      "Příprava podkladů a návrhů, které pak jen schválíte",
    ],
    scopeCannotLabel: "Co automatizovat nejde nebo se nevyplatí",
    scopeCannot: [
      "Rozhodování za vás. Systém navrhne, rozhodujete vy",
      "Věci, které se dějí jednou za čas. Tam se automatizace nezaplatí",
      "Práce úplně bez chyb. AI se občas splete, proto je v každém systému kontrola a u sporných věcí upozornění",
      "Systém bez podkladů. Když není ani vzorek toho, co se zpracovává, není na čem stavět",
      "Jednání s lidmi. Odpovědi zákazníkům, reklamace a dohody zůstávají na vás",
    ],
    processEyebrow: "Jak spolupráce probíhá",
    processTitle: "Pět kroků. Platíte, až když vidíte výsledky.",
    process: [
      {
        number: "01",
        title: "Schůzka",
        text: "Popíšete, co se dělá ručně a co vás na tom štve. Já se ptám, s čím pracujete, kolik toho je a co chcete mít na konci.",
      },
      {
        number: "02",
        title: "Návrh",
        text: "Dostanete jednu stránku: co systém udělá, co ne, kde bude kontrola a kolik to bude stát.",
      },
      {
        number: "03",
        title: "Vyzkoušení na vašem vzorku",
        text: "Nejdřív na malém vzorku. Uvidíte výsledky a jak často se systém trefí dřív, než zaplatíte celé.",
      },
      {
        number: "04",
        title: "Spuštění",
        text: "Systém zprovozním tam, kde vám to vyhovuje: u vás na počítači, nebo online. A ukážu vám, jak s ním pracovat.",
      },
      {
        number: "05",
        title: "Provoz a úpravy",
        text: "Když se něco změní, třeba přibude nový druh faktur nebo nová kategorie pošty, systém upravím. A hlídám, jestli pořád funguje, jak má.",
      },
    ],
    principlesEyebrow: "Zásady",
    principlesTitle: "Na čem trvám, i když to zákazník nechce slyšet.",
    principles: [
      { bold: "AI čte, výpočet kontroluje.", text: "Co se dá spočítat, se neodhaduje." },
      { bold: "Systém navrhuje, ne jedná.", text: "Nic se neodesílá, neplatí ani nemaže bez vás." },
      { bold: "Přesnost se měří, ne slibuje.", text: "Před spuštěním zkusíme systém na vašem vzorku a uvidíte, jak často se trefí." },
      {
        bold: "Vaše doklady a maily jsou citlivé.",
        text: "Ke zpracování je dostane jen AI model, nikdo další, a výsledky zůstávají u vás.",
      },
    ],
  },

  systemyPage: {
    metaTitle: "Ukázky systémů",
    metaDescription:
      "Tři ukázky AI systémů, které si můžete vyzkoušet: třídění pošty, čtení faktur a hledání v nabídce. U každého je vidět, co umí a co ne.",
    eyebrow: "Ukázky systémů",
    title: "Co za vás může *udělat AI*.",
    lead: "Tři systémy, na kterých si vyzkoušíte, co AI ve firmě zvládne: roztřídit poštu, přepsat faktury a najít v nabídce to, co zákazník chce. U každého najdete, co umí, co neumí a jak je to s vašimi daty.",
    flowLabel: "jak to probíhá",
    detailButton: "Detail a ukázka",
    bonusBadge: "a další",
    bonusTitle: "Nevidíte tu, co řešíte vy?",
    bonusText:
      "Tyhle tři systémy jsou ukázky, ne hotový katalog. Když se u vás opakuje něco podobného, třeba objednávky, rezervace nebo přepisování údajů mezi programy, dá se to postavit na míru. Na konzultaci vám řeknu, jestli to má smysl.",
    bonusButton: "Probrat můj případ",
  },

  systemDetail: {
    backLabel: "Všechny ukázky",
    systemLabel: "Systém",
    stepLabel: "krok",
    demoEyebrow: "Vyzkoušejte",
    demoTitle: "Ukázka na vzorových datech",
    demoLead: "Ukázka přehrává skutečný výsledek systému na vzorových datech. Klikněte a sledujte.",
    forWhomLabel: "Pro koho",
    outputsLabel: "Co dostanete",
    limitsLabel: "Co to neumí",
    safetyLabel: "Vaše data a bezpečnost",
    insightsLabel: "Proč se na to dá spolehnout",
    ctaEyebrow: "Chcete něco podobného?",
    ctaTitle: "Postavím to na vašich datech. Nejdřív vyzkoušení, pak faktura.",
    ctaButton: "Domluvit konzultaci",
    nextPrefix: "Další:",
  },

  systems: [
    {
      slug: "trideni-mailu",
      name: "Třídění pošty",
      short: "Pošta roztříděná podle toho, co spěchá. U každého mailu i důvod.",
      pitch:
        "Systém projde schránku a rozdělí maily na to, co čeká na vaši reakci, co je jen pro informaci, co můžete klidně přeskočit a co vypadá jako podvod. U každého mailu napíše proč. Nic nemaže ani nepřesouvá, jen doporučuje.",
      forWhom:
        "Pro každého, komu denně chodí desítky mailů a mezi newslettery se ztrácí faktura po splatnosti nebo dotaz od zákazníka. Ráno vidíte těch pár věcí, které opravdu čekají na odpověď.",
      insights: [
        {
          title: "Vždycky řekne proč",
          text: "U každého mailu je krátké zdůvodnění. Hned vidíte, jestli systém pochopil, o co jde, a nemusíte mu věřit naslepo.",
        },
        {
          title: "Kategorie podle vás",
          text: "Co je pro vás „spěchá“ a co „počká“, se nastaví podle vaší firmy. Když se dvě kategorie pletou, upraví se jejich popis, ne celý systém.",
        },
        {
          title: "Přesnost je změřená",
          text: "Před spuštěním systém vyzkoušíme na vzorku vašich mailů, které předem roztřídíte sami. Uvidíte, v kolika případech se shodne s vámi.",
        },
        {
          title: "Nic se neztratí",
          text: "Když systém nějaký mail nezvládne zařadit, řekne to a mail označí. Nic nezmizí potichu.",
        },
      ],
      steps: [
        { label: "Přijde pošta", who: "vstup", note: "systém schránku jen čte" },
        { label: "AI roztřídí", who: "model", note: "kategorie, důvod a jak si je jistá" },
        { label: "Kontrola", who: "kod", note: "žádný mail nesmí chybět" },
        { label: "Přehled", who: "vystup", note: "maily seřazené podle toho, co spěchá" },
      ],
      outputs: [
        "Přehled mailů rozdělený podle toho, co spěchá",
        "U každého mailu krátké zdůvodnění",
        "Upozornění na podezřelé maily a podvody",
        "Změřenou přesnost na vašem vzorku",
      ],
      limits: [
        "Neodpovídá za vás, odpovědi píšete sami",
        "Nemaže ani nepřesouvá maily ve schránce",
        "Neví předem, co je pro vás důležité. Kategorie se nastavují spolu s vámi",
        "Občas se splete, proto je u každého mailu důvod a jistota",
      ],
      safety: [
        "Do schránky nic nezapisuje, jen čte",
        "Připojuje se zvláštním heslem, ne vaším hlavním",
        "Obsah mailů dostane k roztřídění jen AI model, nikdo další",
      ],
      metricValue: "26 z 30",
      metricLabel: "mailů v testu zařadil stejně jako člověk",
    },
    {
      slug: "cteni-dokladu",
      name: "Čtení dokladů",
      short: "Faktury a účtenky z fotek a PDF do přehledné tabulky pro účetní.",
      pitch:
        "Do složky nahrajete faktury a účtenky: fotky z mobilu, skeny, PDF z mailu. Dostanete tabulku pro účetní, přehled splatností a seznam dokladů, u kterých něco nesedí.",
      forWhom:
        "Pro živnostníky a malé firmy, kde se doklady sbírají v krabici a na konci měsíce je někdo přepisuje ručně. Systém je přepíše, přepočítá a řekne, co zaplatit a kdy.",
      insights: [
        {
          title: "AI čte, výpočet kontroluje",
          text: "Číslo z papíru přečte AI. Jestli základ, DPH a celková částka sedí, se ale ověří obyčejným výpočtem. Když se AI splete, přijde se na to.",
        },
        {
          title: "Kontrola IČO a čísla účtu",
          text: "Špatně přečtené IČO nebo číslo účtu vypadá stejně věrohodně jako správné. Systém ho ověří podle kontrolních číslic a chybu označí hned, ne až při placení.",
        },
        {
          title: "Když čísla nesedí, čte znovu",
          text: "AI dostane doklad ještě jednou i se seznamem toho, co nesedělo. Opravu pak znovu přepočítá výpočet, takže AI nemůže čísla jen upravit, aby to vyšlo.",
        },
        {
          title: "Žádná faktura dvakrát",
          text: "Stejná faktura ve dvou souborech se nezapočítá dvakrát. A tabulka se v Excelu otevře správně, s češtinou i desetinnou čárkou.",
        },
      ],
      steps: [
        { label: "Fotky a PDF", who: "vstup", note: "stačí je nahrát do složky" },
        { label: "AI přepíše", who: "model", note: "dodavatel, položky, DPH, splatnost" },
        { label: "Kontrola", who: "kod", note: "přepočet, IČO, číslo účtu, duplicity" },
        { label: "Tabulka a přehled", who: "vystup", note: "pro účetní i pro vás" },
      ],
      outputs: [
        "Tabulku pro účetní, která se otevře v Excelu",
        "Přehled, co a kdy zaplatit",
        "Seznam dokladů, u kterých něco nesedí",
        "Upozornění na faktury, které přišly dvakrát",
      ],
      limits: [
        "Nic neplatí a nic neposílá do banky",
        "Nenahrazuje účetní, jen jí ušetří přepisování",
        "Z nečitelné fotky čísla nevyčaruje. Takový doklad označí ke kontrole",
        "Sám nezapisuje do účetního programu, výstupem je tabulka",
      ],
      safety: [
        "Nic se nikam neplatí ani neodesílá",
        "Doklady dostane k přečtení jen AI model, nikdo další",
        "Tabulka je ošetřená, aby podvržený doklad nemohl v Excelu nic spustit",
      ],
      metricValue: "2 ze 7",
      metricLabel: "dokladů v ukázce mělo problém (chybu v DPH a duplicitu) a systém je našel sám",
    },
    {
      slug: "hledani-inzeratu",
      name: "Hledání v nabídce",
      short: "Auta z nabídky podle toho, co zákazník napsal do mailu.",
      pitch:
        "Přijde mail: „Sháníme kombík pro rodinu, dvě děti a pes, do 400 tisíc, tažné nutnost.“ Systém z něj pozná, co zákazník chce, projde nabídku a řekne, co se hodí, co jen částečně a co vůbec. U každého auta i proč.",
      forWhom:
        "Pro autobazary a prodejce s nabídkou, kterým chodí poptávky volným textem. Místo ručního hledání dostane obchodník předvybraný seznam s vysvětlením.",
      insights: [
        {
          title: "Nejdřív pochopí, pak hledá",
          text: "Systém si nejdřív ujasní, co zákazník chce: cenu, palivo, karoserii a co auto musí mít. Teprve pak prochází nabídku. Oba kroky jsou vidět, takže poznáte, kde se případně spletl.",
        },
        {
          title: "Auto těsně nad rozpočet nezahodí",
          text: "Auto za 419 tisíc při rozpočtu 400 nezmizí. Dostane poznámku „těsně“, protože zákazník si ho stejně rád prohlédne.",
        },
        {
          title: "Napojí se na vaši nabídku",
          text: "Auta se načítají z exportu vaší inzerce. Když změníte portál nebo formát, upraví se nastavení, ne celý systém.",
        },
        {
          title: "Umí říct „nic nemáme“",
          text: "Student s rozpočtem 150 tisíc nedostane nejlevnější auto za 199. Dostane odpověď, že nic neodpovídá, a vysvětlení, které přání je moc přísné.",
        },
      ],
      steps: [
        { label: "Poptávka mailem", who: "vstup", note: "zákazník píše vlastními slovy" },
        { label: "AI pochopí přání", who: "model", note: "cena, palivo, karoserie, co musí mít" },
        { label: "Předvýběr", who: "kod", note: "hodí se / těsně / vypadlo" },
        { label: "Doporučení s důvodem", who: "vystup", note: "hodí se / částečně / ne" },
      ],
      outputs: [
        "Seznam aut s vysvětlením, proč se hodí nebo ne",
        "Přehled, co zákazníkům nejčastěji vyřazuje auta",
        "Podklad pro odpověď zákazníkovi",
      ],
      limits: [
        "Zákazníkovi sám nic neposílá, odpovídá obchodník",
        "Nezná auta, která nejsou ve vaší nabídce",
        "Co zákazník nenapíše, si nedomýšlí. Nejasnosti vypíše",
      ],
      safety: [
        "Zákazníkovi se nic neodesílá, je to návrh, ne odpověď",
        "Poštu jen čte, nic v ní nemění",
        "Poptávky dostane ke zpracování jen AI model, nikdo další",
      ],
      metricValue: "17 → 3",
      metricLabel: "ze 17 aut v ukázkové nabídce vybral 3, které se hodí rodině s dětmi a psem",
    },
  ],

  webyPage: {
    metaTitle: "Weby",
    metaDescription:
      "Weby a aplikace od LanoDigital: Cargent, mikaauto.cz a Lanovín. Rychlé, čitelné na mobilu, s kontaktem na dosah palce.",
    eyebrow: "Webové stránky",
    title: "Weby, které se *čtou*.\nAplikace, které *fungují*.",
    lead: "Živnostník nebo malá firma potřebuje web, který za pár vteřin řekne, co děláte, kde jste a jak vás oslovit. Někdy je ale potřeba aplikace, která opravdu něco počítá, jako Cargent níž. Náhledy se dají projet, Mika Auto i spustit naživo.",
    howEyebrow: "Jak weby dělám",
    howTitle: "Co dostanete a jak to probíhá.",
    how: [
      {
        title: "Návrh a struktura",
        text: "Nejdřív co má web říct a komu. Pak teprve barvy. Dostanete náčrt rozvržení stránek a texty, které schválíte.",
      },
      {
        title: "Stavba",
        text: "Podle potřeby jednoduchý web, nebo web s formuláři a administrací, kde si texty měníte sami. Vždycky tak, aby fungoval hlavně na mobilu.",
      },
      {
        title: "Spuštění a předání",
        text: "Doména, hosting, nastavení pro vyhledávače, měření návštěvnosti. Předám i s návodem, jak si upravit texty sami.",
      },
    ],
    ctaButton: "Chci web",
  },

  weby: [
    {
      slug: "cargent",
      name: "Cargent",
      url: "https://www.cargent.cz",
      display: "cargent.cz",
      kind: "Webová aplikace · oceňování ojetých vozů",
      short: "AI, která z aktuálních inzerátů spočítá tržní cenu ojetého vozu.",
      description:
        "Vlastní aplikace, která běží naostro. Zadáte auto, systém prohledá inzertní portály, vybere podobné vozy a vrátí tržní cenu s rozpětím i se seznamem inzerátů, ze kterých vychází. Ocenění má čtyři úrovně, od rychlé ceny po podrobný posudek s VIN a srovnáním podle regionu. Za tím stojí celá aplikace, ne jen stránka: uživatelské účty, předplacený kredit a platby kartou.",
      highlights: [
        "Cena z inzerátů, které jsou na trhu právě teď, i s odkazy na ně",
        "Čtyři úrovně ocenění: od ceny s rozpětím po posudek s VIN",
        "Rozbor, co cenu ovlivňuje: stav, výbava, servisní historie, nehody",
        "Předplacený kredit, platba kartou, kredit nevyprší",
        "Nástroje pro autobazary: popisky inzerátů, hlídání trhu a vyhledávání nabídek",
      ],
      accent: "#2563eb",
      live: false,
      liveNote: "",
    },
    {
      slug: "mikaauto",
      name: "Mika Auto",
      url: "https://mikaauto.cz",
      display: "mikaauto.cz",
      kind: "Firemní web · autobazar",
      short: "Web pro autobazar: nabídka vozů, služby, financování, rychlý kontakt.",
      description:
        "Prezentační web pro autobazar v Praze-Čakovicích. Cíl byl jednoduchý: aby zákazník během pár vteřin viděl nabídku vozů, věděl, že jsou prověřené, a měl po ruce telefon. Tmavý elegantní vzhled, nabídka, která se sama načítá z inzerce, a partneři financování hned na úvodní stránce.",
      highlights: [
        "Nabídka vozů s detaily a fotogalerií",
        "Pohodlné procházení na mobilu",
        "Partneři financování a pojištění",
        "Kontakt, otevírací doba a mapa bez hledání",
        "Rychlé načtení",
      ],
      accent: "#2d5d8f",
      live: true,
      liveNote: "",
    },
    {
      slug: "lanovin",
      name: "Lanovín",
      url: "https://lanovin.infinityfree.io/",
      display: "lanovin.infinityfree.io",
      kind: "Osobní projekt · vinařství",
      short: "Prezentace rodinného vinařství s nabídkou vín a příběhem.",
      description:
        "Osobní projekt: web pro rodinné vinařství z jižní Moravy. Důraz na atmosféru: fotografie z vinice, klidné patkové písmo a jednoduchá nabídka vín. Ukázka toho, že i malý web může mít charakter.",
      highlights: [
        "Vzhled postavený na fotografiích",
        "Nabídka vín, galerie a ubytování",
        "Příběh vinařství místo obecných frází",
      ],
      accent: "#8a2810",
      live: false,
      liveNote: "",
    },
  ],

  about: {
    metaTitle: "O mně",
    metaDescription:
      "Štěpán Lano, 18 let. Stavím AI systémy, které šetří práci s poštou a doklady, a webové stránky pro malé firmy. Kdo jsem a jak pracuju.",
    eyebrow: "O mně",
    title: "Jsem Štěpán Lano. Je mi 18 a stavím systémy, které *jdou vyzkoušet*.",
    lead: "LanoDigital je moje agentura na AI systémy a webové stránky. Vznikla z osobních projektů: chtěl jsem pochopit, jak se takové systémy staví od základů a jak se pozná, že opravdu fungují. Ty projekty si můžete vyzkoušet na tomhle webu a stejný přístup nabízím vám.",
    profileInitials: "ŠL",
    profileStats: [
      { label: "věk", value: "18" },
      { label: "projektů k vyzkoušení", value: "6" },
    ],
    profileButton: "Napsat e-mail",
    pathEyebrow: "Jak jsem se k tomu dostal",
    pathTitle: "Od webů k systémům.",
    path: [
      {
        period: "Začátek",
        title: "Weby pro známé",
        text: "První weby jsem dělal pro lidi kolem sebe, pro autoservis a rodinné vinařství. Naučil jsem se, že web musí hlavně fungovat na mobilu a mít kontakt hned nahoře.",
      },
      {
        period: "Pak",
        title: "AI systémy od základů",
        text: "Postavil jsem tři systémy: třídění pošty, čtení dokladů a hledání v nabídce aut. U každého jsem změřil, jak často se trefí, a přidal kontroly, které chyby AI zachytí.",
      },
      {
        period: "Teď",
        title: "LanoDigital",
        text: "Stejné věci dělám pro firmy: systém, který přečte, co se dnes přepisuje ručně, a web, který se dá číst. Nejdřív vyzkoušení na vašich datech, pak faktura.",
      },
    ],
    beliefsEyebrow: "Čemu věřím",
    beliefsTitle: "Čtyři věci, které se v mé práci opakují.",
    beliefs: [
      {
        title: "Ukázat, ne slibovat",
        text: "Všechno, co na tomhle webu je, si můžete rozkliknout a vyzkoušet. Systém, který se nedá pustit, je jen prezentace.",
      },
      {
        title: "AI se nevěří naslepo",
        text: "AI umí skvěle číst, ale počítat by za vás neměla. Co se dá spočítat, spočítá obyčejný výpočet. A jak často se systém trefí, se měří, ne odhaduje.",
      },
      {
        title: "Malé věci, pořádně",
        text: "Radši tři systémy, které fungují a u kterých vím proč, než deset polovičatých. Stejně tak weby.",
      },
      {
        title: "Bezpečnost od začátku",
        text: "Doklady a maily jsou citlivé. Systémy je jen čtou, ke zpracování je dostane jen AI model a nic za vás neodesílají ani neplatí.",
      },
    ],
    ctaTitle: "Pojďme se potkat.",
    ctaText: "Půl hodiny online nebo osobně. Přineste, co vás štve, já přinesu návrh, jak to vyřešit.",
    ctaButton: "Domluvit konzultaci",
  },

  kontakt: {
    metaTitle: "Kontakt a konzultace",
    metaDescription:
      "Domluvte si konzultaci zdarma. Napište, co se u vás dělá ručně, a do dvou pracovních dnů se ozvu s návrhem termínu.",
    eyebrow: "Kontakt · konzultace zdarma",
    title: "Napište, co vás *zdržuje*.",
    lead: "Stačí pár vět. Do dvou pracovních dnů se ozvu s návrhem termínu na půlhodinovou schůzku, online nebo osobně.",
    info: [
      {
        icon: "calendar",
        title: "Co se stane po odeslání",
        text: "Přečtu si to, připravím pár otázek a pošlu dva nebo tři termíny.",
      },
      { icon: "clock", title: "Jak dlouho to trvá", text: "Schůzka 30 minut. Návrh řešení do týdne od schůzky." },
      { icon: "mail", title: "Radši e-mail?", text: "" },
      { icon: "pin", title: "Kde", text: "" },
    ],
    formNameLabel: "Jméno",
    formEmailLabel: "E-mail",
    formCompanyLabel: "Firma / projekt",
    formCompanyPlaceholder: "nepovinné",
    formInterestLabel: "Co vás zajímá",
    formMessageLabel: "Co byste chtěli vyřešit?",
    formMessagePlaceholder:
      "Stačí pár vět. Co se dnes dělá ručně, kolik času to bere a co byste chtěli mít hotové na konci.",
    formWhenLabel: "Kdy se vám hodí schůzka?",
    formWhenPlaceholder: "např. příští týden odpoledne, online",
    formSubmit: "Domluvit schůzku",
    formNote: "První konzultace je zdarma a bez závazků. Údaje použiju jen k odpovědi.",
    formSuccessTitle: "Díky, mám to.",
    formSuccessText: "Ozvu se do dvou pracovních dnů s návrhem termínu.",
    formSuccessAgain: "Poslat další zprávu",
  },

  footer: {
    text: "Malá agentura na AI systémy a webové stránky pro živnostníky a malé firmy. Stavím věci, které se dají vyzkoušet, ne prezentace o tom, co by šlo.",
    navLabel: "Navigace",
    contactLabel: "Kontakt",
  },
};
