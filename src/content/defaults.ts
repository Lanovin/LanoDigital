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
      "LanoDigital staví AI workflow a webové stránky pro malé firmy a živnostníky. Třídění pošty, čtení faktur, hledání v nabídce a k tomu weby, které se dobře čtou.",
    url: "https://lanodigital.cz",
    owner: {
      name: "Štěpán Lano",
      role: "zakladatel, vývojář",
      email: "kontakt@lanodigital.cz",
      location: "Česko",
    },
    nav: [
      { label: "Služby", href: "/sluzby" },
      { label: "Systémy", href: "/systemy" },
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
      "čtení faktur",
      "hledání v nabídce",
      "webové stránky",
      "AI agenti",
      "automatizace",
      "reporty, které se dají číst",
    ],
    systemsEyebrow: "Ukázky systémů",
    systemsTitle: "Tři systémy, které si můžete *rozkliknout*.",
    systemsLead:
      "Žádné prezentace o tom, co by šlo. Každá ukázka běží přímo tady na ukázkových datech: klikněte, sledujte, co se s nimi stane, a přečtěte si, proč systém rozhodl tak, jak rozhodl.",
    systemsDetailLabel: "Jak je to postavené",
    webyEyebrow: "Webové stránky",
    webyTitle: "Weby a aplikace, *které někdo používá*.",
    webyLead:
      "Od prezentačního webu po SaaS, který si zákazníci platí. Projeďte si je rovnou tady. Mika Auto se dá spustit naživo přímo v dlaždici.",
    webyMore: "Více o tom, jak weby dělám →",
    flowEyebrow: "Jak to funguje",
    flowTitle: "Vstup, agent, kontrola, výstup. *Bez kouzel.*",
    flowLead:
      "Každý systém má stejnou kostru. Model dělá to, co umí jen model: čte a rozumí. Kód dělá to, co má dělat kód: počítá, ověřuje a hlídá. A když něco nesedí, systém to řekne, místo aby to schoval.",
    flowCards: [
      {
        title: "Model čte, kód počítá",
        text: "Ověřit, že 44 200 × 0,21 je 9 282, umí kód zadarmo a pokaždé stejně. Model se na to neptáme.",
      },
      {
        title: "Schéma je kontrakt",
        text: "Tvar odpovědi se posílá do API jako povinný formát. Nic nepadá na nečekaném JSONu.",
      },
      {
        title: "Nic se neděje bez vás",
        text: "Systémy doporučují, ne jednají. Do schránky nezapisují, nic neplatí, nic neposílají.",
      },
    ],
    aboutEyebrow: "Kdo za tím stojí",
    aboutTitle: "Jsem Štěpán Lano. Stavím věci, které se dají vyzkoušet.",
    aboutText:
      "Je mi 18 a poslední rok jsem strávil tím, že stavím AI workflow od základů: bez frameworků, s evalem a s kódem, který modelu nevěří. LanoDigital je způsob, jak to dělat i pro vás.",
    aboutButton: "Víc o mně",
    aboutStats: [
      { value: "3", label: "systémy k vyzkoušení" },
      { value: "3", label: "weby a aplikace online" },
      { value: "0", label: "prezentací o tom, co by šlo" },
    ],
    ctaTitle: "Máte něco, co se dnes dělá ručně?",
    ctaText:
      "Pojďme si to na půl hodiny projít. Řeknu vám rovnou, jestli to má smysl automatizovat, a co by na konci mělo vypadnout.",
    ctaButton: "Domluvit konzultaci zdarma",
  },

  sluzby: {
    metaTitle: "Služby",
    metaDescription:
      "AI workflow a automatizace, webové stránky a konzultace. Co dělám, jak spolupráce probíhá a co dostanete na konci.",
    eyebrow: "Služby",
    title: "Tři věci, které umím *dobře*.",
    lead: "Nedělám všechno. Dělám AI systémy nad firemními daty, weby, které se čtou, a konzultace, po kterých víte, na čem jste.",
    services: [
      {
        icon: "bot",
        name: "AI workflow a automatizace",
        tagline: "Systém, který přečte, zkontroluje a připraví k rozhodnutí.",
        text: "Třídění pošty, přepis faktur a účtenek, hledání v katalogu podle poptávky, příprava podkladů. Postavím agentní workflow na míru vašim datům, s kontrolou v kódu, evalem a reportem, který se dá číst.",
        bullets: [
          "Analýza toho, co se dnes dělá ručně",
          "Prototyp na vašich vzorových datech",
          "Kontroly v kódu, ne jen v promptu",
          "Měřená přesnost, ne pocit",
          "Nasazení a předání s dokumentací",
        ],
        price: "od 15 000 Kč",
        href: "/systemy",
        cta: "Podívat se na ukázky",
      },
      {
        icon: "globe",
        name: "Webové stránky",
        tagline: "Rychlé, čitelné, s kontaktem na dosah palce.",
        text: "Prezentační weby pro živnostníky a malé firmy. Návrh, texty, nasazení. Bez zbytečností, ale s charakterem, aby web vypadal jako vy, ne jako šablona.",
        bullets: [
          "Návrh struktury a designu",
          "Mobil na prvním místě",
          "Základní SEO a rychlé načtení",
          "Kontaktní formulář, mapa, ceník",
          "Nasazení na hosting a doménu",
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
    processEyebrow: "Jak spolupráce probíhá",
    processTitle: "Pět kroků. Platíte, až když vidíte výsledky.",
    process: [
      {
        number: "01",
        title: "Schůzka",
        text: "Popíšete, co se dělá ručně a co vás na tom štve. Já se ptám na data, objem a co má na konci vypadnout.",
      },
      {
        number: "02",
        title: "Návrh",
        text: "Dostanete jednu stránku: co systém udělá, co ne, kde bude kontrola a kolik to bude stát.",
      },
      {
        number: "03",
        title: "Prototyp na vašich datech",
        text: "Nejdřív na vzorku. Uvidíte výsledky a přesnost dřív, než zaplatíte celé.",
      },
      {
        number: "04",
        title: "Nasazení",
        text: "Systém běží tam, kde ho potřebujete: u vás na počítači, na serveru, nebo jako web.",
      },
      {
        number: "05",
        title: "Provoz a ladění",
        text: "Prompt se ladí proti evalu, ne podle pocitu. Když se změní data, změní se konfigurace, ne kód.",
      },
    ],
    principlesEyebrow: "Zásady",
    principlesTitle: "Na čem trvám, i když to zákazník nechce slyšet.",
    principles: [
      { bold: "Model čte, kód počítá.", text: "Co se dá ověřit aritmetikou, se modelu neptáme." },
      { bold: "Systém doporučuje, ne jedná.", text: "Nic se neodesílá, neplatí ani nemaže bez vás." },
      { bold: "Bez evalu je „vylepšil jsem prompt“ jen pocit.", text: "Přesnost se měří na vašich datech." },
      { bold: "Vaše doklady a maily jsou citlivé.", text: "Zůstávají u vás, do gitu ani na cizí server nejdou." },
    ],
  },

  systemyPage: {
    metaTitle: "Systémy",
    metaDescription:
      "Osobní projekty a AI workflow, které si můžete rozkliknout: třídění pošty, čtení dokladů, hledání v nabídce.",
    eyebrow: "Systémy a osobní projekty",
    title: "Co jsem postavil a *jak*.",
    lead: "Tři agentní workflow na společné kostře: zdroj dat za rozhraním, schéma jako kontrakt, kontrola v kódu a trace každého běhu. Každý z nich řeší jinou doménu a na každém je něco, co se jinde nevidí.",
    flowLabel: "tok dat",
    detailButton: "Detail a ukázka",
    bonusBadge: "04 · bonus",
    bonusTitle: "Přehled: jeden web nad všemi třemi",
    bonusText:
      "Malý server bez frameworku, který čte výsledky všech tří nástrojů z disku, skládá z nich stránky a umí je spustit tlačítkem. Příkazy se nikdy neskládají z požadavku, spouštět jde jen z localhostu a exportuje se do statického HTML na libovolný hosting.",
  },

  systemDetail: {
    backLabel: "Všechny systémy",
    systemLabel: "Systém",
    stepLabel: "krok",
    demoEyebrow: "Vyzkoušejte",
    demoTitle: "Ukázka na vzorových datech",
    demoLead: "Stejná data, stejné výsledky, jaké systém vrací. Klikněte a sledujte.",
    forWhomLabel: "Pro koho",
    outputsLabel: "Co vypadne na konci",
    safetyLabel: "Bezpečnost",
    insightsLabel: "Co je na tom netriviální",
    ctaEyebrow: "Chcete něco podobného?",
    ctaTitle: "Postavím to na vašich datech. Nejdřív prototyp, pak faktura.",
    ctaButton: "Domluvit konzultaci",
    nextPrefix: "Další:",
  },

  systems: [
    {
      slug: "trideni-mailu",
      name: "Třídění pošty",
      short: "Pošta do kategorií, u každého mailu i důvod.",
      pitch:
        "Systém přečte schránku, rozhodne, co je potřeba řešit, co je jen informace a co je šum. Ke každému mailu napíše proč. Do schránky nikdy nezapisuje, jen doporučuje.",
      forWhom:
        "Pro kohokoli, komu denně chodí desítky mailů a část z nich je faktura po splatnosti schovaná mezi newslettery. Ráno vidíte pět věcí, které opravdu čekají na odpověď.",
      insights: [
        {
          title: "Schéma je kontrakt, ne prosba",
          text: "Tvar odpovědi se posílá modelu jako povinný formát. Model jiný tvar vrátit nemůže, takže nic nepadá v produkci na nečekaném JSONu.",
        },
        {
          title: "Kategorie žijí v konfiguraci",
          text: "Když se pletou dvě kategorie, upraví se popis a příklady v YAML, ne kód. Prompt se z toho staví za běhu.",
        },
        {
          title: "Měří se přesnost",
          text: "Třicet ručně označených mailů a matice záměn. Změna promptu buď zvedne číslo, nebo ne. A je to vidět hned, ne za měsíc.",
        },
        {
          title: "Nic se neztratí potichu",
          text: "Když model nějaký mail vynechá, systém to hlásí a v reportu je označený jako neklasifikovaný. Tiché zahození vstupu je nejčastější chyba LLM pipeline.",
        },
      ],
      steps: [
        { label: "Přijde pošta", who: "vstup", note: "IMAP jen pro čtení, nebo ukázková data" },
        { label: "AI agent roztřídí", who: "model", note: "5 kategorií, důvod, jistota" },
        { label: "Kód ověří", who: "kod", note: "párování podle ID, chybějící se hlásí" },
        { label: "Report", who: "vystup", note: "tabulka, HTML, trace každého běhu" },
      ],
      outputs: [
        "Tabulka v konzoli",
        "HTML report",
        "Eval s přesností a maticí záměn",
        "Historie štítků mezi běhy",
      ],
      safety: [
        "Do schránky se nikdy nezapisuje",
        "Heslo aplikace, ne hlavní heslo",
        "Obsah mailů je nedůvěryhodný vstup, escapuje se",
      ],
      metricValue: "86,7 %",
      metricLabel: "přesnost na 30 ručně označených mailech",
    },
    {
      slug: "cteni-dokladu",
      name: "Čtení dokladů",
      short: "Faktury a účtenky z fotek a PDF do tabulky pro účetní.",
      pitch:
        "Do složky nasypete faktury a účtenky: fotky z mobilu, skeny, PDF z mailu. Ven vypadne tabulka pro účetní, kalendář splatností a seznam dokladů, u kterých něco nesedí.",
      forWhom:
        "Pro živnostníky a malé firmy, kde se doklady sbírají v krabici a na konci měsíce je někdo přepisuje ručně. Systém přepíše, spočítá a řekne, co zaplatit a kdy.",
      insights: [
        {
          title: "Model čte, kód počítá",
          text: "Přečíst číslo z papíru umí model. Ověřit, že 44 200 × 0,21 je 9 282, umí kód, a to zadarmo, pokaždé stejně a nedá se ukecat. Systém tak pozná, když se spletl.",
        },
        {
          title: "Kontrolní součty IČO, IBAN a čísla účtu",
          text: "Špatně přečtené IČO vypadá stejně důvěryhodně jako správné. Kontrolní číslice ho odhalí okamžitě, ne za měsíc při saldokontu.",
        },
        {
          title: "Opravný dotaz s pojistkou",
          text: "Když čísla nesedí, doklad jde modelu ještě jednou se seznamem rozporů. Kód pak porovná, co se změnilo, aby model čísla jen „nedorovnal“.",
        },
        {
          title: "Duplicity a CSV, které se opravdu otevře",
          text: "Stejná faktura ve dvou souborech se nezapočítá dvakrát. CSV má BOM, středníky a desetinnou čárku, aby ho Excel přečetl správně.",
        },
      ],
      steps: [
        { label: "Fotky a PDF", who: "vstup", note: "složka, typ se pozná z obsahu" },
        { label: "AI agent přepíše", who: "model", note: "položky, DPH, splatnost, účet" },
        { label: "Kód přepočítá", who: "kod", note: "aritmetika, kontrolní součty, duplicity" },
        { label: "Tabulka + kalendář", who: "vystup", note: "CSV pro účetní, HTML report" },
      ],
      outputs: [
        "CSV pro účetní",
        "HTML report s kalendářem splatností",
        "Přepis každého dokladu jako JSON",
        "Seznam dokladů, u kterých něco nesedí",
      ],
      safety: [
        "Nic se nikam neposílá, nic se neplatí",
        "Doklad je nedůvěryhodný vstup, hlídají se i vzorce v CSV",
        "Druhý běh na stejných souborech stojí nula",
      ],
      metricValue: "0 Kč",
      metricLabel: "za druhý běh, hotové doklady se neplatí znovu",
    },
    {
      slug: "hledani-inzeratu",
      name: "Hledání v nabídce",
      short: "Auta z inzertního feedu podle toho, co zákazník napsal mailem.",
      pitch:
        "Přijde mail: „Sháníme kombík pro rodinu, dvě děti a pes, do 400 tisíc, tažné nutnost.“ Systém z něj vytáhne kritéria, projde nabídku a řekne, co se hodí, co jen částečně a co vůbec. U každého auta i proč.",
      forWhom:
        "Pro autobazary a prodejce s katalogem, kterým chodí poptávky volným textem. Místo ručního hledání dostane obchodník předvybraný seznam s odůvodněním.",
      insights: [
        {
          title: "Dvě volání místo jednoho",
          text: "„Co zákazník chce“ a „hodí se mu tohle auto“ jsou dvě různé úlohy. Rozdělené se dají číst, ladit a opravovat nezávisle.",
        },
        {
          title: "Předfiltr v kódu, měkký na okrajích",
          text: "Porovnat 419 000 s 400 000 umí kód zadarmo. Auto těsně za hranicí se ale nevyhodí. Jde modelu s poznámkou, protože zákazník si ho stejně prohlédne.",
        },
        {
          title: "Feed je za mapováním, ne v kódu",
          text: "Nový inzertní feed se rozchodí úpravou jednoho YAML souboru. Kódování, složené názvy, cena s DPH i bez. Všechno je popsané, ne zadrátované.",
        },
        {
          title: "„Nic jsem nenašel“ je správná odpověď",
          text: "Student s rozpočtem 150 tisíc nedostane nejlevnější auto za 199. Dostane, že nic neodpovídá, a seznam důvodů, které kritérium je moc přísné.",
        },
      ],
      steps: [
        { label: "Poptávka mailem", who: "vstup", note: "volný text od zákazníka" },
        { label: "AI vytáhne kritéria", who: "model", note: "cena, palivo, karoserie, musí mít" },
        { label: "Kód předfiltruje", who: "kod", note: "prošel / těsně / vypadl" },
        { label: "AI posoudí + report", who: "vystup", note: "hodí se / částečně / ne, s důvodem" },
      ],
      outputs: [
        "Report s odůvodněním u každého auta",
        "Statistika, co nejčastěji vyřazuje",
        "Přehled v konzoli",
      ],
      safety: [
        "Nic se neodesílá zákazníkovi, je to návrh, ne odpověď",
        "IMAP jen pro čtení",
        "Nejasnosti se vypisují, ne domýšlí",
      ],
      metricValue: "~10 %",
      metricLabel: "ceny za tokeny z cache díky stabilnímu promptu",
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
        text: "Nejdřív co má web říct a komu. Pak teprve barvy. Dostanete drátěný model a texty, které schválíte.",
      },
      {
        title: "Stavba",
        text: "Podle projektu buď statický web na levném hostingu, nebo Next.js s formuláři a administrací. Mobil na prvním místě.",
      },
      {
        title: "Nasazení a předání",
        text: "Doména, hosting, základní SEO, měření návštěvnosti. Předám i s návodem, jak si upravit texty sami.",
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
      kind: "SaaS · oceňování ojetých vozů",
      short: "AI agent, který z aktuálních inzerátů spočítá tržní cenu ojetého vozu.",
      description:
        "Vlastní SaaS, který běží naostro. Zadáte auto, agent prohledá inzertní portály, vybere srovnatelné vozy a vrátí tržní cenu s pásmem i se seznamem inzerátů, ze kterých vychází. Ocenění má čtyři úrovně od rychlé ceny po znalecký posudek s VIN a regionálním srovnáním. Za tím stojí celá aplikace, ne jen stránka: uživatelské účty, kredit v tokenech a platby kartou přes Stripe.",
      highlights: [
        "Cena z inzerátů, které jsou na trhu právě teď, a odkazy na ně",
        "Čtyři úrovně ocenění: od ceny s pásmem po posudek s VIN a riziky modelu",
        "Rozbor faktorů: stav, výbava, servisní historie i nehodovost zvlášť",
        "Kredit v tokenech, platba kartou přes Stripe, tokeny nevyprší",
        "Nástroje pro autobazary: generátor popisků, monitoring trhu a skaut nabídek",
      ],
      accent: "#2563eb",
      live: false,
      liveNote:
        "Živý náhled tady nejde: Cargent posílá hlavičku X-Frame-Options, takže se do cizího rámu vložit nedá. U aplikace s přihlášením je to správné nastavení. Náhled je proto obrázkový a web se otevře v novém okně.",
    },
    {
      slug: "mikaauto",
      name: "Mika Auto",
      url: "https://mikaauto.cz",
      display: "mikaauto.cz",
      kind: "Firemní web · autobazar",
      short: "Web pro autobazar: nabídka vozů, služby, financování, rychlý kontakt.",
      description:
        "Prezentační web pro autobazar v Praze-Čakovicích. Cíl byl jednoduchý: aby zákazník během pár vteřin viděl nabídku vozů, věděl, že jsou prověřené, a měl po ruce telefon. Tmavý elegantní vzhled, nabídka tažená z inzertního feedu a partneři financování hned na úvodní stránce.",
      highlights: [
        "Nabídka vozů s detaily a fotogalerií",
        "Responzivní layout, mobil na prvním místě",
        "Partneři financování a pojištění",
        "Kontakt, otevírací doba a mapa bez hledání",
        "Nasazeno na Vercelu, rychlé načtení",
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
        "Osobní projekt: web pro rodinné vinařství z jižní Moravy. Důraz na atmosféru: fotografie z vinice, klidná patková typografie a jednoduchá nabídka vín. Ukázka toho, že i malý web na levném hostingu může mít charakter.",
      highlights: [
        "Atmosférický design postavený na fotografiích",
        "Nabídka vín, galerie a ubytování",
        "Příběh vinařství místo obecných frází",
        "Nasazení na bezplatném hostingu",
      ],
      accent: "#8a2810",
      live: false,
      liveNote:
        "Živý náhled tady nejde: bezplatný hosting InfinityFree si před zobrazením ověřuje vlastní cookie a tu prohlížeč v cizím rámu zablokuje. Náhled je proto obrázkový. Po přesunu na běžný hosting by šel web spustit přímo tady.",
    },
  ],

  about: {
    metaTitle: "O mně",
    metaDescription:
      "Štěpán Lano, 18 let. Stavím AI workflow od základů a weby, které se čtou. Kdo jsem, jak pracuju a čemu věřím.",
    eyebrow: "O mně",
    title: "Jsem Štěpán Lano. Je mi 18 a stavím systémy, které *jdou vyzkoušet*.",
    lead: "LanoDigital je moje agentura na AI workflow a webové stránky. Vznikla z osobních projektů: chtěl jsem pochopit, jak se agentní systémy staví od základů, bez frameworků, a jak se pozná, že fungují. Ty projekty jsou teď na tomhle webu a stejný přístup nabízím vám.",
    profileInitials: "ŠL",
    profileStats: [
      { label: "věk", value: "18" },
      { label: "projektů online", value: "6" },
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
        title: "AI workflow od základů",
        text: "Postavil jsem tři agentní systémy: třídění pošty, čtení dokladů a hledání v inzerátech. Bez frameworků, s evalem, s kontrolou v kódu. U každého je README s tím, proč je postavený tak, jak je.",
      },
      {
        period: "Teď",
        title: "LanoDigital",
        text: "Stejné věci dělám pro firmy: systém, který přečte, co se dnes přepisuje ručně, a web, který se dá číst. Nejdřív prototyp na vašich datech, pak faktura.",
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
        title: "Modelu se nevěří, ověřuje se",
        text: "Jazykový model je skvělý čtenář a mizerný účetní. Co se dá spočítat, spočítá kód. Co se dá změřit, změří eval.",
      },
      {
        title: "Malé věci, pořádně",
        text: "Radši tři systémy, které fungují a mají README s důvody, než deset polovičatých. Stejně tak weby.",
      },
      {
        title: "Bezpečnost je součást návrhu",
        text: "Doklady a maily jsou citlivé. Systémy jen čtou, nic neposílají, a klíče k API nikdy nekončí na internetu.",
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
      "Stačí pár vět. Co se dnes dělá ručně, kolik času to bere, co by mělo vypadnout na konci.",
    formWhenLabel: "Kdy se vám hodí schůzka?",
    formWhenPlaceholder: "např. příští týden odpoledne, online",
    formSubmit: "Domluvit schůzku",
    formNote: "První konzultace je zdarma a bez závazků. Údaje použiju jen k odpovědi.",
    formSuccessTitle: "Díky, mám to.",
    formSuccessText: "Ozvu se do dvou pracovních dnů s návrhem termínu.",
    formSuccessAgain: "Poslat další zprávu",
  },

  footer: {
    text: "Malá agentura na AI workflow a webové stránky. Stavím věci, které jsou vidět a dají se vyzkoušet, ne prezentace o tom, co by šlo.",
    navLabel: "Navigace",
    contactLabel: "Kontakt",
  },
};
