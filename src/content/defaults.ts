import type { Content } from "./schema";

/**
 * Výchozí obsah webu — texty, se kterými web vznikl.
 *
 * Administrace do tohohle souboru nikdy nesahá. Ukládá jen to, co se změnilo,
 * do `content/site.json`, a při čtení se obojí spojí. Díky tomu jde v adminu
 * kdykoli dát „vrátit na výchozí“ a je jasné, co je původní text.
 *
 * Zápis nadpisů: nový řádek se zalomí. Nic jiného se neinterpretuje.
 */
export const DEFAULT_CONTENT: Content = {
  site: {
    name: "LanoDigital",
    tagline: "Weby, které řeknou, co děláte.",
    description:
      "LanoDigital navrhuje a staví webové stránky, e-shopy a aplikace pro malé firmy a živnostníky. Rychlé, čitelné na mobilu, s kontaktem na dosah palce. A když se hodí, i AI systémy, které ušetří ruční práci.",
    url: "https://www.lanodigital.cz",
    owner: {
      name: "Štěpán Lano",
      role: "zakladatel, vývojář",
      email: "info@lanodigital.cz",
      location: "Česko",
    },
    nav: [
      { label: "Weby", href: "/weby" },
      { label: "Služby", href: "/sluzby" },
      { label: "AI systémy", href: "/systemy" },
      { label: "O mně", href: "/o-mne" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    cta: { label: "Konzultace zdarma", href: "/kontakt" },
  },

  home: {
    heroTitle: "Weby, které řeknou, co děláte.\nZa pár vteřin.",
    heroLead:
      "Navrhnu a postavím web pro vaši firmu: od jednoduché prezentace po e-shop s kalkulačkou. Rychlý, čitelný na mobilu a s kontaktem na dosah palce. Hotové weby si můžete projet hned tady.",
    heroPrimary: "Prohlédnout hotové weby",
    heroSecondary: "Konzultace zdarma",
    marquee: [
      "prezentační weby",
      "e-shopy",
      "webové aplikace",
      "navržené pro mobil",
      "texty, které se dají číst",
      "kalkulačky a formuláře",
      "administrace pro vaše texty",
      "a k tomu AI systémy",
    ],
    webyTitle: "Weby a aplikace, které někdo používá.",
    webyLead:
      "Od prezentačního webu přes e-shop až po aplikaci s účty a platbami kartou. Projeďte si je rovnou tady. Mika Auto a Vinylpodlahy.cz se dají spustit naživo přímo v dlaždici.",
    webyMore: "Více o tom, jak weby dělám →",
    webyDetailLabel: "Co web umí",
    buildTitle: "Od náčrtu po spuštění. Klikněte si to.",
    buildLead:
      "Web nezačíná barvami, ale tím, co má říct. Projděte si čtyři kroky, kterými prochází každý web, který dělám. Vpravo vidíte, jak se z nápadu stává hotová stránka.",
    buildSteps: [
      {
        title: "Náčrt",
        text: "Na schůzce projdeme, co děláte, kdo jsou vaši zákazníci a co mají na webu najít jako první. Z toho vznikne náčrt.",
      },
      {
        title: "Rozvržení",
        text: "Kde bude nabídka, kde ceník, kde kontakt. Ještě bez barev, aby šlo o obsah, ne o vzhled. Dostanete ho ke schválení i s texty.",
      },
      {
        title: "Vzhled",
        text: "Barvy, písmo, fotky. Aby web vypadal jako vy, ne jako šablona. Vzhled schvalujete dřív, než se začne stavět.",
      },
      {
        title: "Spuštění",
        text: "Web běží na vaší doméně, rychle se načte i na mobilu a najdou ho vyhledávače. Předám ho i s návodem, jak si upravit texty.",
      },
    ],
    systemsTitle: "Když se u vás něco přepisuje ručně.",
    systemsLead:
      "Kromě webů stavím systémy, které přečtou poštu, faktury nebo poptávky a připraví je k rozhodnutí. Tři ukázky si můžete vyzkoušet.",
    systemsDetailLabel: "Vyzkoušet",
    systemsButton: "Všechny AI systémy",
    aboutTitle: "Jsem Štěpán Lano. Stavím věci, které se dají vyzkoušet.",
    aboutText:
      "Je mi 18 a weby dělám od prvních projektů pro lidi kolem sebe. Dnes za mnou je firemní web, e-shop s kalkulačkou i vlastní aplikace s platbami kartou. Každý si tady můžete projet. LanoDigital je způsob, jak to dělat i pro vás.",
    aboutButton: "Víc o mně",
    aboutStats: [
      { value: "4", label: "weby a aplikace online" },
      { value: "3", label: "AI systémy k vyzkoušení" },
      { value: "30 min", label: "první konzultace zdarma" },
    ],
    ctaTitle: "Potřebujete nový web?\nNebo předělat ten starý?",
    ctaText:
      "Pojďme si to na půl hodiny projít. Řeknu vám rovnou, co by web měl umět, jak dlouho to potrvá a kolik to bude stát.",
    ctaButton: "Domluvit konzultaci zdarma",
  },
  sluzby: {
    metaTitle: "Služby",
    metaDescription:
      "Webové stránky, e-shopy a aplikace pro malé firmy a živnostníky. Tři balíčky, co v nich dostanete a jak spolupráce probíhá. K tomu AI systémy a konzultace.",
    title: "Weby pro malé firmy.\nUdělané pořádně.",
    lead: "Dělám hlavně webové stránky: od jednoduché prezentace po e-shop s kalkulačkou. A když se u vás něco pořád přepisuje ručně, umím postavit i AI systém, který to udělá za vás.",
    packagesTitle: "Tři velikosti webu. Vyberte, co potřebujete.",
    packagesLead:
      "Nevíte, který se k vám hodí? Nevadí. Na konzultaci to projdeme a doporučím ten nejmenší, který vám bude stačit.",
    packages: [
      {
        name: "Prezentační web",
        tagline: "Pro živnostníky a malé firmy, které potřebují, aby je lidé našli a ozvali se.",
        bullets: [
          "Návrh struktury, vzhledu a textů",
          "Navržený hlavně pro mobil",
          "Kontakt, mapa, otevírací doba, ceník",
          "Nastavení pro vyhledávače a rychlé načtení",
          "Zprovoznění na vaší doméně",
        ],
        example: "lanovin",
        featured: false,
      },
      {
        name: "Web, který si spravujete sami",
        tagline: "Pro firmy, kde se nabídka, ceny nebo novinky mění a nechcete kvůli tomu volat programátora.",
        bullets: [
          "Všechno z prezentačního webu",
          "Administrace, kde si texty a fotky měníte sami",
          "Nabídka, která se načítá sama, třeba z vaší inzerce",
          "Formuláře a poptávky rovnou do mailu",
          "Návod a pomoc, když si nebudete vědět rady",
        ],
        example: "mikaauto",
        featured: true,
      },
      {
        name: "E-shop nebo aplikace",
        tagline: "Když má web něco počítat, prodávat nebo hlídat: košík, kalkulačka, účty, platby kartou.",
        bullets: [
          "Návrh toho, jak bude zákazník nakupovat",
          "Kalkulačky a konfigurátory na míru",
          "Košík, doprava a platby kartou",
          "Uživatelské účty a předplacený kredit",
          "Napojení na sklad nebo dodavatele",
        ],
        example: "vinylpodlahy",
        featured: false,
      },
    ],
    packagesNote: "Cenu vám řeknu po první konzultaci, předem a písemně. Konzultace je zdarma.",
    packagesExampleLabel: "Například",
    packagesButton: "Chci tenhle",
    extrasTitle: "Co ještě umím.",
    services: [
      {
        icon: "bot",
        name: "AI systémy a automatizace",
        tagline: "Systém, který přečte, zkontroluje a připraví k rozhodnutí.",
        text: "Třídění pošty, přepis faktur a účtenek, hledání v nabídce podle poptávky. Postavím systém na míru tomu, s čím pracujete, s kontrolou, která zachytí chyby AI, a s přehledem, kterému rozumíte.",
        bullets: [
          "Rozbor toho, co se dnes dělá ručně",
          "Vyzkoušení na vzorku vašich dat",
          "Kontrola čísel a údajů, ne slepá důvěra v AI",
          "Zprovoznění a návod, jak s tím pracovat",
        ],
        href: "/systemy",
        cta: "Vyzkoušet ukázky",
      },
      {
        icon: "chat",
        name: "Konzultace a audit webu",
        tagline: "Půl hodiny, po které víte, na čem jste.",
        text: "Projdeme váš současný web, nebo to, co ve firmě zabírá čas. Řeknu vám rovnou, co bych změnil, co nechal a kolik by to zhruba stálo. Bez závazků.",
        bullets: [
          "Online nebo osobně",
          "Konkrétní návrh, ne obecné rady",
          "Odhad ceny a času",
          "Když to nedává smysl, řeknu to",
        ],
        href: "/kontakt",
        cta: "Domluvit termín",
      },
    ],
    scopeTitle: "Co dostanete. A co ne.",
    scopeLead:
      "Ať víte předem, na čem jste. Dělám weby pro malé firmy a živnostníky, pořádně a bez zbytečností.",
    scopeCanLabel: "Co dostanete",
    scopeCan: [
      "Web navržený podle vaší firmy, ne podle šablony",
      "Texty, které srozumitelně řeknou, co děláte a pro koho",
      "Web, který funguje hlavně na mobilu, protože tam vás lidé hledají",
      "Nastavení pro vyhledávače, aby vás lidé našli",
      "Zprovoznění na doméně a předání s návodem",
    ],
    scopeCannotLabel: "Co ode mě nedostanete",
    scopeCannot: [
      "Slib prvního místa na Googlu. Ten vám poctivě nedá nikdo",
      "Web z šablony, který vypadá jako sto dalších",
      "Efekty a animace, které web zpomalí a nic neřeknou",
      "Velké portály pro stovky lidí. Na to jsou větší agentury",
    ],
    processTitle: "Pět kroků. Každý schvalujete vy.",
    process: [
      {
        number: "01",
        title: "Schůzka",
        text: "Popíšete, co děláte a co má web umět. Já se ptám, kdo jsou vaši zákazníci a co mají na webu najít jako první.",
      },
      {
        number: "02",
        title: "Rozvržení a texty",
        text: "Dostanete rozvržení stránek a texty. Ještě bez barev, aby šlo o obsah. Upravujeme, dokud to nesedí.",
      },
      {
        number: "03",
        title: "Vzhled",
        text: "Barvy, písmo a fotky podle vaší firmy. Vzhled vidíte a schvalujete dřív, než se začne stavět.",
      },
      {
        number: "04",
        title: "Stavba a spuštění",
        text: "Web postavím, vyzkouším na mobilu i počítači a spustím na vaší doméně. Nastavím vyhledávače a měření návštěvnosti.",
      },
      {
        number: "05",
        title: "Předání a péče",
        text: "Ukážu vám, jak si upravit texty. A když se něco změní, třeba přibude služba nebo nová fotka, pomůžu.",
      },
    ],
    principlesTitle: "Na čem trvám u každého webu.",
    principles: [
      { bold: "Mobil na prvním místě.", text: "Většina lidí vás najde v telefonu, takže web se navrhuje nejdřív pro něj." },
      { bold: "Kontakt na dosah palce.", text: "Telefon a formulář nesmí být schované. Zákazník je nemá hledat." },
      { bold: "Rychlost není bonus.", text: "Web, který se dlouho načítá, lidé zavřou dřív, než zjistí, co děláte." },
      { bold: "Nejdřív obsah, pak barvy.", text: "Hezký web, který neřekne, co děláte, je jen obrázek." },
    ],
  },

  systemyPage: {
    metaTitle: "AI systémy",
    metaDescription:
      "Tři ukázky AI systémů, které si můžete vyzkoušet: třídění pošty, čtení faktur a hledání v nabídce. U každého je vidět, co umí a co ne.",
    title: "Co za vás může udělat AI.",
    lead: "Tři systémy, na kterých si vyzkoušíte, co AI ve firmě zvládne: roztřídit poštu, přepsat faktury a najít v nabídce to, co zákazník chce. U každého najdete, co umí, co neumí a jak je to s vašimi daty.",
    flowLabel: "jak to probíhá",
    detailButton: "Detail a ukázka",
    flowTitle: "Přečte, zkontroluje, připraví. Rozhodujete vy.",
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
    bonusBadge: "a další",
    bonusTitle: "Nevidíte tu, co řešíte vy?",
    bonusText:
      "Tyhle tři systémy jsou ukázky, ne hotový katalog. Když se u vás opakuje něco podobného, třeba objednávky, rezervace nebo přepisování údajů mezi programy, dá se to postavit na míru. Na konzultaci vám řeknu, jestli to má smysl.",
    bonusButton: "Probrat můj případ",
  },

  systemDetail: {
    backLabel: "Všechny ukázky",
    stepLabel: "krok",
    demoTitle: "Ukázka na vzorových datech",
    demoLead: "Ukázka přehrává skutečný výsledek systému na vzorových datech. Klikněte a sledujte.",
    forWhomLabel: "Pro koho",
    outputsLabel: "Co dostanete",
    limitsLabel: "Co to neumí",
    safetyLabel: "Vaše data a bezpečnost",
    insightsLabel: "Proč se na to dá spolehnout",
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
      "Weby, e-shop a aplikace od LanoDigital: Cargent, vinylpodlahy.cz, mikaauto.cz a Lanovín. Rychlé, čitelné na mobilu, s kontaktem na dosah palce.",
    title: "Weby, které se čtou.\nAplikace, které fungují.",
    lead: "Živnostník nebo malá firma potřebuje web, který za pár vteřin řekne, co děláte, kde jste a jak vás oslovit. Někdy je ale potřeba aplikace, která opravdu něco počítá, jako Cargent nebo kalkulačka na Vinylpodlahy.cz níž. Náhledy se dají projet, Mika Auto a Vinylpodlahy.cz i spustit naživo.",
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
    pricesButton: "Balíčky webů",
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
      slug: "vinylpodlahy",
      name: "Vinylpodlahy.cz",
      url: "https://www.vinylpodlahy.cz",
      display: "vinylpodlahy.cz",
      kind: "E-shop · vinylové a SPC podlahy",
      short: "E-shop s podlahami, kde kalkulačka spočítá celý projekt a vloží ho do košíku.",
      description:
        "Vlastní e-shop s vinylovými a SPC podlahami. Zákazník nemusí nic počítat: zadá rozměry místnosti, odpoví na pár otázek a kalkulačka mu doporučí vhodné podlahy s cenou celého projektu, včetně balení s prořezem, podložky, lišt a dopravy. Celý projekt pak vloží do košíku jedním tlačítkem. K tomu katalog s filtry, vzorky zdarma a poptávka pokládky. Zboží posílají velkoobchodní partneři přímo zákazníkovi, takže e-shop ukazuje skutečnou dostupnost v metrech a termín dodání ve dnech.",
      highlights: [
        "Kalkulačka projektu: z rozměrů místnosti hotový košík i s příslušenstvím",
        "Katalog s filtry podle typu, tloušťky, zátěže, podlahového topení i koupelny",
        "Doprava spočítaná podle hmotnosti, balík i paleta, vidět už u produktu",
        "Vzorky zdarma a poptávka pokládky u podlaháře z okolí",
        "Skutečná dostupnost v m² a termín dodání ve dnech",
      ],
      accent: "#b85c38",
      live: true,
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
      "Štěpán Lano, 18 let. Stavím webové stránky, e-shopy a aplikace pro malé firmy a k tomu AI systémy, které šetří ruční práci. Kdo jsem a jak pracuju.",
    title: "Jsem Štěpán Lano. Je mi 18 a stavím systémy, které jdou vyzkoušet.",
    lead: "LanoDigital je moje agentura na webové stránky a AI systémy. Vznikla z osobních projektů: chtěl jsem pochopit, jak se takové systémy staví od základů a jak se pozná, že opravdu fungují. Ty projekty si můžete vyzkoušet na tomhle webu a stejný přístup nabízím vám.",
    profileInitials: "ŠL",
    profileStats: [
      { label: "věk", value: "18" },
      { label: "projektů k vyzkoušení", value: "7" },
    ],
    profileButton: "Napsat e-mail",
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
        text: "Stejné věci dělám pro firmy: hlavně weby, které za pár vteřin řeknou, co děláte, a když se hodí, i systém, který přečte, co se dnes přepisuje ručně.",
      },
    ],
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
      "Domluvte si konzultaci zdarma. Napište, jaký web potřebujete nebo co se u vás dělá ručně, a do dvou pracovních dnů se ozvu s návrhem termínu.",
    title: "Kontakt",
    lead: "Napište e-mail, nebo vyplňte formulář. Do dvou pracovních dnů se ozvu.",
    emailTitle: "E-mail",
    emailText: "Napište mi přímo.",
    formBlockTitle: "Kontaktní formulář",
    formBlockText: "Pár vět o tom, co potřebujete. Ozvu se s návrhem termínu schůzky.",
    formNameLabel: "Jméno",
    formEmailLabel: "E-mail",
    formCompanyLabel: "Firma / projekt",
    formCompanyPlaceholder: "nepovinné",
    formInterestLabel: "Co vás zajímá",
    formMessageLabel: "Co byste chtěli vyřešit?",
    formMessagePlaceholder:
      "Stačí pár vět. Co děláte, jestli už nějaký web máte a co by měl ten nový umět. Nebo co se u vás dělá ručně a kolik času to bere.",
    formWhenLabel: "Kdy se vám hodí schůzka?",
    formWhenPlaceholder: "např. příští týden odpoledne, online",
    formSubmit: "Domluvit schůzku",
    formNote: "První konzultace je zdarma a bez závazků. Údaje použiju jen k odpovědi.",
    formSuccessTitle: "Díky, mám to.",
    formSuccessText: "Ozvu se do dvou pracovních dnů s návrhem termínu.",
    formSuccessAgain: "Poslat další zprávu",
  },

  footer: {
    text: "Malá agentura na webové stránky pro živnostníky a malé firmy. A když se hodí, i AI systémy, které ušetří ruční práci. Stavím věci, které se dají vyzkoušet.",
    navLabel: "Navigace",
    contactLabel: "Kontakt",
  },
};
